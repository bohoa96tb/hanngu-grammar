// Kiểm tra trình duyệt thật bằng Chromium headless qua CDP (không cần thư viện ngoài).
// Chạy: node tests/browser-check.mjs [baseURL] [reportPath]
// Mặc định baseURL = http://127.0.0.1:8901/ (cần máy chủ tĩnh chạy ở thư mục dự án).
// Kiểm tra: tràn ngang ở 360/390/768/1280, lỗi console, thao tác bàn phím,
// nút nghe/dừng hợp nhất (trạng thái, không khẳng định nghe được âm thanh), luồng làm bài
// và lưu tiến độ sau tải lại. Kết quả là JSON; exit 1 nếu có kiểm tra "fail".
// GIỚI HẠN MÔI TRƯỜNG (ghi 30/10/2026): trên VM của Muse, Chromium này chỉ tải
// được địa chỉ localhost — proxy ra ngoài chặn CONNECT của nó
// (ERR_TUNNEL_CONNECTION_FAILED với URL https bên ngoài). Nghiệm thu live dùng
// harness trên bản local + kiểm tra tương tác qua trình duyệt của nền tảng.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const BASE = process.argv[2] || "http://127.0.0.1:8901/";
const REPORT_PATH = process.argv[3] || "";
const PORT = 9333;
// Đường dẫn Chromium: biến môi trường CHROME_BIN, hoặc bản chrome-headless-shell
// đã tải ở ~/workspace/.tools/browsers (bản Chromium tích hợp của nền tảng bị khóa
// chính sách, không khởi chạy trực tiếp được).
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  const root = `${homedir()}/workspace/.tools/browsers/chrome-headless-shell`;
  try {
    for (const v of readdirSync(root)) {
      const p = `${root}/${v}/chrome-headless-shell-linux64/chrome-headless-shell`;
      if (existsSync(p)) return p;
    }
  } catch {}
  return "/opt/meta-chromium/chrome";
}
const CHROME_BIN = findChrome();
const results = [];
const consoleErrors = [];
function record(name, status, detail) {
  results.push({ name, status, detail });
  console.log(`${status === "pass" ? "PASS" : status === "fail" ? "FAIL" : "NOTE"} ${name} — ${detail}`);
}

// Hồ sơ trình duyệt MỚI mỗi lần chạy: hồ sơ cũ cache app.js/styles.css theo
// cùng URL ?v= và cho kết quả sai lệch (đã gặp ở lô std2).
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
const PROFILE_DIR = mkdtempSync(`${tmpdir()}/hanngu-cdp-`);
// Nếu môi trường có proxy ra ngoài (biến HTTPS_PROXY của VM này), Chromium phải
// dùng --proxy-server tường minh (nó không đọc biến môi trường); kèm bỏ qua lỗi
// chứng chỉ vì proxy chặn TLS bằng CA riêng — chỉ chấp nhận được trong kiểm tra.
const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy || "";
const chrome = spawn(CHROME_BIN, [
  "--headless=new", "--no-sandbox", "--disable-gpu",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${PROFILE_DIR}`,
  ...(PROXY ? [`--proxy-server=${PROXY}`, "--ignore-certificate-errors"] : []),
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitFor(fn, timeout = 15000, step = 200) {
  const t0 = Date.now();
  for (;;) {
    const v = await fn();
    if (v) return v;
    if (Date.now() - t0 > timeout) throw new Error("timeout chờ điều kiện");
    await sleep(step);
  }
}

let ws, msgId = 0;
const pending = new Map();
function send(method, params = {}, sessionId) {
  const id = ++msgId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}

async function main() {
  const version = await waitFor(async () => {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      return await r.json();
    } catch { return null; }
  });
  ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((res) => { ws.onopen = res; });
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) reject(new Error(m.error.message)); else resolve(m.result);
    }
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
      consoleErrors.push("console.error: " + m.params.args.map((a) => a.value || a.description || "").join(" "));
    }
    if (m.method === "Runtime.exceptionThrown") {
      consoleErrors.push("exception: " + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
    }
    if (m.method === "Log.entryAdded" && m.params.entry.level === "error") {
      consoleErrors.push("log: " + m.params.entry.text);
    }
  };
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const S = (method, params) => send(method, params, sessionId);
  await S("Page.enable");
  await S("Runtime.enable");
  await S("Log.enable");

  async function evaluate(expression) {
    const r = await S("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error("evaluate lỗi: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    return r.result.value;
  }
  async function navigate(hash) {
    await S("Page.navigate", { url: BASE + hash });
    await waitFor(() => evaluate(`document.readyState === "complete" && !!document.querySelector("#app") && document.querySelector("#app").children.length > 0`).catch(() => false));
    await sleep(400);
  }
  async function setWidth(width) {
    await S("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
  }
  async function key(keyName, code, vk, text) {
    // Thiếu trường text thì Chromium headless không kích hoạt nút bằng Enter/Space
    // (đã kiểm chứng: thêm text "\r" cho Enter thì click mới phát sinh).
    const extra = text ? { text, unmodifiedText: text } : {};
    await S("Input.dispatchKeyEvent", { type: "keyDown", key: keyName, code, windowsVirtualKeyCode: vk, ...extra });
    await S("Input.dispatchKeyEvent", { type: "keyUp", key: keyName, code, windowsVirtualKeyCode: vk });
    await sleep(120);
  }

  // --- A. Tràn ngang ở 4 bề rộng, trang chủ + trang bài ---
  for (const w of [360, 390, 768, 1280]) {
    await setWidth(w);
    await navigate("#/");
    const home = await evaluate(`(() => {
      const de = document.documentElement;
      let worst = null, worstRight = 0;
      document.querySelectorAll("#app *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > worstRight && r.width > 0) { worstRight = r.right; worst = el.tagName + "." + (el.className || ""); }
      });
      return { scrollWidth: de.scrollWidth, inner: window.innerWidth, worst, worstRight };
    })()`);
    record(`overflow-home-${w}`, home.scrollWidth <= w + 1 ? "pass" : "fail", `scrollWidth=${home.scrollWidth}, worst=${home.worst}@${Math.round(home.worstRight)}`);
    await navigate("#/lesson/ma-question");
    const les = await evaluate(`(() => {
      const de = document.documentElement;
      let worst = null, worstRight = 0;
      document.querySelectorAll("#app *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > worstRight && r.width > 0) { worstRight = r.right; worst = el.tagName + "." + (el.className || ""); }
      });
      return { scrollWidth: de.scrollWidth, inner: window.innerWidth, worst, worstRight };
    })()`);
    record(`overflow-lesson-${w}`, les.scrollWidth <= w + 1 ? "pass" : "fail", `scrollWidth=${les.scrollWidth}, worst=${les.worst}@${Math.round(les.worstRight)}`);
  }

  // --- B. Luồng bài học ở 390px: bàn phím, nghe/dừng, làm bài, lưu tiến độ ---
  await setWidth(390);
  await navigate("#/lesson/ma-question");
  const hasSections = await evaluate(`(() => {
    const t = document.querySelector("#app").innerText;
    return { a: t.includes("Hiểu nhanh"), f: t.includes("Nhớ nhanh"), nav: t.includes("Bài sau") };
  })()`);
  record("lesson-sections", hasSections.a && hasSections.f && hasSections.nav ? "pass" : "fail", JSON.stringify(hasSections));

  // Bàn phím: focus nút lựa chọn đầu tiên bằng Tab từ đầu trang là không ổn định;
  // thay vào đó kiểm tra phần tử nhận focus được và Space/Enter kích hoạt đúng.
  const kb = await evaluate(`(() => {
    const btn = document.querySelector("#ex-ma-ex1 [data-opt]");
    if (!btn) return { found: false };
    btn.focus();
    return { found: true, focused: document.activeElement === btn, tag: btn.tagName };
  })()`);
  record("keyboard-focus-choice", kb.found && kb.focused ? "pass" : "fail", JSON.stringify(kb));
  await key(" ", "Space", 32, " ");
  const afterSpace = await evaluate(`(() => {
    const btn = document.querySelector("#ex-ma-ex1 [data-opt]");
    return { selected: btn.classList.contains("selected"), graded: !!document.querySelector("#fb-ma-ex1 .feedback") };
  })()`);
  record("keyboard-space-selects-not-grades", afterSpace.selected && !afterSpace.graded ? "pass" : "fail", JSON.stringify(afterSpace));
  // Chọn đáp án đúng bằng chuột mô phỏng qua evaluate click, rồi Enter trên nút Kiểm tra
  await evaluate(`(() => {
    const opts = [...document.querySelectorAll("#ex-ma-ex1 [data-opt]")];
    const right = opts.find((b) => b.dataset.opt.includes("你是老师吗"));
    right.click();
  })()`);
  await evaluate(`(() => { const c = document.querySelector("#ex-ma-ex1 [data-check]"); if (c) c.focus(); })()`);
  await key("Enter", "Enter", 13, "\r");
  await sleep(200);
  const graded = await evaluate(`(() => {
    const fb = document.querySelector("#fb-ma-ex1 .feedback");
    return { text: fb ? fb.textContent : "", hasRetry: !!document.querySelector("#ex-ma-ex1 [data-retry]") };
  })()`);
  record("keyboard-enter-grades", graded.text.includes("Đúng") && graded.hasRetry ? "pass" : "fail", graded.text.slice(0, 80));

  // Nghe / dừng: chỉ kiểm trạng thái nút và cảnh báo giọng, không khẳng định nghe được.
  const speakState = await evaluate(`(async () => {
    const btn = document.querySelector("[data-speak]");
    if (!btn) return { found: false };
    const label0 = btn.textContent;
    btn.click();
    await new Promise((r) => setTimeout(r, 350));
    const mid = { label: btn.textContent, speaking: btn.classList.contains("speaking") };
    btn.click(); // UX pilot: nút nghe/dừng hợp nhất — bấm lần nữa để dừng
    await new Promise((r) => setTimeout(r, 150));
    const after = { label: btn.textContent, speaking: btn.classList.contains("speaking") };
    const vn = document.getElementById("voiceNote");
    return { found: true, label0, mid, after, voiceNote: vn ? vn.textContent : "(không có)" };
  })()`);
  record("speak-stop-state", speakState.found && speakState.after.speaking === false ? "pass" : "fail", JSON.stringify(speakState).slice(0, 220));

  // Hoàn thành + tải lại: tiến độ phải giữ
  await evaluate(`(() => { document.getElementById("completeBtn").click(); })()`);
  await sleep(200);
  await S("Page.reload");
  await waitFor(() => evaluate(`!!document.getElementById("completeBtn")`).catch(() => false));
  await sleep(300);
  const persisted = await evaluate(`(() => {
    const raw = localStorage.getItem("hanngu-progress-v2");
    const btn = document.getElementById("completeBtn");
    return { stored: raw ? raw.includes("ma-question") : false, btnText: btn ? btn.textContent : "" };
  })()`);
  record("progress-persists-reload", persisted.stored && persisted.btnText.includes("Đã hoàn thành") ? "pass" : "fail", JSON.stringify(persisted));

  // Prefs: bật Pinyin rồi tải lại, lựa chọn phải giữ
  await evaluate(`(() => { const b = document.getElementById("pinyinBtn"); if (b) b.click(); })()`);
  await sleep(150);
  await S("Page.reload");
  await waitFor(() => evaluate(`!!document.getElementById("pinyinBtn")`).catch(() => false));
  await sleep(300);
  const pref = await evaluate(`(() => {
    const b = document.getElementById("pinyinBtn");
    const py = document.querySelector(".pinyin");
    return { btn: b ? b.textContent : "", pinyinVisible: py ? !py.hidden && py.offsetParent !== null : false, prefs: localStorage.getItem("hanngu-prefs-v1") };
  })()`);
  record("prefs-persist-reload", pref.btn.includes("Ẩn") && pref.pinyinVisible ? "pass" : "fail", JSON.stringify(pref).slice(0, 160));

  // --- C. Ôn lại: khóa rate trước đối chiếu, ghi FSRS ---
  await navigate("#/review");
  const review = await evaluate(`(() => {
    const rate = document.querySelector("[data-rate]");
    const reveal = document.querySelector("[data-reveal]");
    return { hasRate: !!rate, rateDisabled: rate ? rate.disabled : null, hasReveal: !!reveal };
  })()`);
  record("review-rate-locked-before-reveal", review.hasRate && review.rateDisabled === true ? "pass" : "fail", JSON.stringify(review));
  await evaluate(`(() => { document.querySelector("[data-reveal]").click(); })()`);
  await sleep(150);
  const review2 = await evaluate(`(() => {
    const rate = document.querySelector("[data-rate]");
    const rev = document.querySelector("[id^='reveal-']");
    return { rateDisabled: rate ? rate.disabled : null, revealText: rev ? rev.innerText.slice(0, 120) : "" };
  })()`);
  record("review-reveal-shows-quick-memory", review2.rateDisabled === false && review2.revealText.includes("Nhớ nhanh") ? "pass" : "fail", review2.revealText.replace(/\n/g, " ").slice(0, 110));
  await evaluate(`(() => {
    const rates = [...document.querySelectorAll("[data-rate]")];
    const good = rates.find((b) => b.dataset.rate.endsWith(":3")) || rates[2];
    good.click();
  })()`);
  await sleep(400);
  const review3 = await evaluate(`(() => {
    const t = document.querySelector("#app").innerText;
    const ev = JSON.parse(localStorage.getItem("hanngu-progress-v2") || "{}");
    return { noteShown: t.includes("Đã ghi:"), events: (ev.events || []).length };
  })()`);
  record("review-rating-recorded", review3.noteShown && review3.events >= 1 ? "pass" : "fail", JSON.stringify(review3));

  // --- D. REL-01: mục Bài liên quan (le-completion-change -> le-sentence-final-change) ---
  // Dữ liệu related_ids do Agent Nội dung áp dụng: bài nguồn phải có mục
  // "Bài liên quan" chứa link tới bài đích, và bấm link phải tải được bài đích.
  await navigate("#/lesson/le-completion-change");
  const related = await evaluate(`(() => {
    // Chỉ tính link nằm TRONG mục "Bài liên quan": link "Bài sau" ở nav cuối
    // trang có thể trùng href với bài đích và không được tính thay thế.
    const sec = [...document.querySelectorAll("#app section")].find((s) => {
      const h = s.querySelector("h3");
      return h && h.textContent.trim() === "Bài liên quan";
    });
    const link = sec ? sec.querySelector('a[href="#/lesson/le-sentence-final-change"]') : null;
    return { hasSection: !!sec, hasLink: !!link, linkText: link ? link.textContent.trim() : "" };
  })()`);
  if (related.hasSection && related.hasLink) {
    await evaluate(`(() => {
      const sec = [...document.querySelectorAll("#app section")].find((s) => {
        const h = s.querySelector("h3");
        return h && h.textContent.trim() === "Bài liên quan";
      });
      sec.querySelector('a[href="#/lesson/le-sentence-final-change"]').click();
    })()`);
    await sleep(500);
    const relatedTarget = await evaluate(`(() => {
      const h2 = document.querySelector("#app h2");
      return { hash: location.hash, title: h2 ? h2.textContent.trim() : "" };
    })()`);
    record("related-lessons", relatedTarget.hash.includes("le-sentence-final-change") && relatedTarget.title.length > 0 ? "pass" : "fail", JSON.stringify({ ...related, ...relatedTarget }).slice(0, 220));
  } else {
    record("related-lessons", "fail", JSON.stringify(related).slice(0, 220));
  }

  // --- F. CUR-02: lộ trình curriculum + tìm kiếm pinyin (data-driven) ---
  // Kỳ vọng được TÍNH từ dữ liệu thật trên server (manifest + shards +
  // curriculum.json), không hardcode thứ tự cụ thể: harness vẫn đúng khi
  // Agent Nội dung sắp xếp lại curriculum.
  let curData = null;
  let publishedIds = [];
  try {
    curData = await (await fetch(BASE + "data/curriculum.json")).json();
    const manifest = await (await fetch(BASE + "data/lessons-manifest.json")).json();
    for (const rel of manifest.shards) {
      const shard = await (await fetch(BASE + rel)).json();
      for (const l of shard.lessons) if (l.status === "published") publishedIds.push(l.id);
    }
  } catch (e) {
    record("curriculum-data-load", "fail", String(e && e.message ? e.message : e));
  }
  if (curData && publishedIds.length) {
    const lvKeys = ["1", "2", "3", "4", "5", "6"];
    const curOrder = lvKeys.flatMap((k) => curData.levels[k] || []);
    const numOf = (id) => {
      for (const k of lvKeys) {
        const i = (curData.levels[k] || []).indexOf(id);
        if (i >= 0) return { level: k, num: i + 1 };
      }
      return null;
    };
    // F1. Trang chủ: đủ 6 nhóm cấp, tổng thẻ bài = số bài published,
    // thẻ đầu tiên của HSK1 mang nhãn "Bài 01".
    await navigate("#/");
    const homeGroups = await evaluate(`(() => {
      const groups = [...document.querySelectorAll(".level-group")];
      const first = groups.length ? groups[0].querySelector("article") : null;
      return {
        groupCount: groups.length,
        headers: groups.map((g) => { const h = g.querySelector("h3"); return h ? h.textContent.trim() : ""; }),
        cards: document.querySelectorAll("#app article.card").length,
        firstCardText: first ? first.innerText.slice(0, 120) : "",
      };
    })()`);
    record("home-level-groups",
      homeGroups.groupCount === 6 && lvKeys.every((k, i) => homeGroups.headers[i] && homeGroups.headers[i].startsWith("HSK " + (i + 1)))
        && homeGroups.cards === publishedIds.length && homeGroups.firstCardText.includes("Bài 01")
        ? "pass" : "fail",
      JSON.stringify({ groups: homeGroups.groupCount, cards: homeGroups.cards, expectedCards: publishedIds.length, first: homeGroups.firstCardText.replace(/\n/g, " ").slice(0, 60) }));

    // F2. Số bài + điều hướng theo curriculum: le-completion-change.
    const probeId = "le-completion-change";
    const probeInfo = numOf(probeId);
    const probeIdx = curOrder.indexOf(probeId);
    const expectedNext = probeIdx >= 0 && probeIdx < curOrder.length - 1 ? curOrder[probeIdx + 1] : null;
    await navigate(`#/lesson/${probeId}`);
    const lessonNav = await evaluate(`(() => {
      const hero = document.querySelector(".card-hero");
      const navLinks = [...document.querySelectorAll(".lesson-nav a.nav-link")];
      const next = navLinks.find((a) => a.textContent.includes("Bài sau"));
      return { heroText: hero ? hero.innerText : "", nextHref: next ? next.getAttribute("href") : null };
    })()`);
    const pad = (n) => String(n).padStart(2, "0");
    record("lesson-number-nav",
      probeInfo && lessonNav.heroText.includes(`Bài ${pad(probeInfo.num)}`)
        && (!expectedNext || lessonNav.nextHref === `#/lesson/${expectedNext}`)
        ? "pass" : "fail",
      JSON.stringify({ expectedNum: probeInfo ? pad(probeInfo.num) : null, expectedNext, nextHref: lessonNav.nextHref }));

    // F3. Tìm kiếm pinyin: "gao" (bỏ dấu của gāo) ra bi-comparison;
    // "so sanh" (tiếng Việt bỏ dấu) ra ít nhất một bài so sánh.
    await navigate("#/?q=gao");
    const searchGao = await evaluate(`(() => [...document.querySelectorAll('#app article a[href^="#/lesson/"]')].map((a) => a.getAttribute("href")))()`);
    await navigate("#/?q=so%20sanh");
    const searchSoSanh = await evaluate(`(() => [...document.querySelectorAll('#app article a[href^="#/lesson/"]')].map((a) => a.getAttribute("href")))()`);
    record("search-pinyin",
      searchGao.includes("#/lesson/bi-comparison")
        && (searchSoSanh.includes("#/lesson/bi-comparison") || searchSoSanh.includes("#/lesson/bi-comparison-2"))
        ? "pass" : "fail",
      JSON.stringify({ gaoHits: searchGao.length, gaoHasBi: searchGao.includes("#/lesson/bi-comparison"), soSanhHits: searchSoSanh.length }));

    // F4. Tiên quyết: bài đầu tiên có requires trong curriculum phải hiện
    // mục "Cần học trước" chứa link tới tiên quyết đầu tiên của nó.
    const reqEntry = Object.entries(curData.requires || {}).find(([, pres]) => Array.isArray(pres) && pres.length);
    if (!reqEntry) {
      record("prereq-display", "pass", "SKIP — curriculum.json hiện chưa có requires nào");
    } else {
      const [depId, pres] = reqEntry;
      await navigate(`#/lesson/${depId}`);
      const prereq = await evaluate(`(() => {
        const sec = [...document.querySelectorAll("#app section")].find((s) => {
          const h = s.querySelector("h3");
          return h && h.textContent.trim() === "Cần học trước";
        });
        const link = sec ? sec.querySelector('a[href="#/lesson/${pres[0]}"]') : null;
        return { hasSection: !!sec, hasLink: !!link };
      })()`);
      record("prereq-display", prereq.hasSection && prereq.hasLink ? "pass" : "fail",
        JSON.stringify({ depId, firstPrereq: pres[0], ...prereq }));
    }
  }

  // --- E. Lỗi console trong toàn bộ phiên ---
  record("console-errors", consoleErrors.length === 0 ? "pass" : "fail", consoleErrors.length ? consoleErrors.slice(0, 5).join(" | ") : "0 lỗi console/exception trong các trang đã mở");


  // --- APP-01: Đọc & nghe vận dụng (pilot Bài 01) ---
  // Đọc bản ghi học liệu trực tiếp từ máy chủ để rẽ nhánh theo phiên bản
  // schema: v1 = thẻ dẫn link Mandarin Bean (D30); v2 = truyện dùng
  // trong app + luyện nghe câu (D31). Tên 5 kiểm tra cũ giữ nguyên ở
  // cả hai nhánh; các kiểm tra v2 ghi SKIP-pass khi dữ liệu chưa phải
  // v2 (theo tiền lệ prereq-display ở trên).
  let shiApplied = null;
  try { shiApplied = await (await fetch(BASE + "data/applied/shi-noun-link.json")).json(); } catch {}
  const shiMat = shiApplied && shiApplied.reading && shiApplied.reading.material;
  const shiV2 = !!(shiApplied && shiApplied.schema_version === 2 && shiMat && shiMat.access === "in_app");
  await navigate("#/lesson/shi-noun-link");
  await waitFor(async () => evaluate(`!!document.getElementById('sec-applied')`));
  if (shiV2) {
    const shiExtra = shiApplied.reading.extra_external || null;
    const appCard = await evaluate(`(() => { const sec = document.getElementById('sec-applied'); const a = sec.querySelector('.applied-open'); return { src: sec.innerText.includes(${JSON.stringify(shiMat.source_name)}), hasExtra: ${shiExtra ? "true" : "false"}, extraOk: a ? a.href === ${JSON.stringify(shiExtra ? shiExtra.source_url : "")} && a.target === '_blank' : false }; })()`);
    record("applied-section-and-source-link", appCard.src && (!appCard.hasExtra || appCard.extraOk) ? "pass" : "fail", JSON.stringify(appCard));
    // v2: truyện hiển thị ngay trong app ở tab Đọc, kèm tiêu đề gốc.
    const story = await evaluate(`(() => { const sec = document.getElementById('sec-applied'); const st = sec.querySelector('[data-ap-story]'); return { hasStory: !!st, title: sec.innerText.includes(${JSON.stringify(shiMat.title_original || "")}), sents: st ? st.querySelectorAll('.applied-sent').length : 0, targets: st ? st.querySelectorAll('.applied-sent.is-target').length : 0 }; })()`);
    record("applied-v2-story-in-app", story.hasStory && story.title && story.sents > 0 && story.targets > 0 ? "pass" : "fail", JSON.stringify(story));
    // v2: nút bật/tắt Pinyin đổi trạng thái hiển thị thật (mặc định BẬT).
    const pyToggle = await evaluate(`(() => { const py = document.querySelector('#sec-applied .sent-py'); const before = py ? getComputedStyle(py).display : "missing"; document.querySelector('[data-ap-toggle="pinyin"]').click(); const py2 = document.querySelector('#sec-applied .sent-py'); const after = py2 ? getComputedStyle(py2).display : "missing"; return { before, after }; })()`);
    record("applied-v2-pinyin-toggle", pyToggle.before !== "none" && pyToggle.before !== "missing" && pyToggle.after === "none" ? "pass" : "fail", JSON.stringify(pyToggle));
  } else {
    const appCard = await evaluate(`(() => { const a = document.querySelector('.applied-open'); return { ok: !!a && a.href.includes('mandarinbean.com/a-happy-day') && a.target === '_blank', src: document.getElementById('sec-applied').innerText.includes('Mandarin Bean') }; })()`);
    record("applied-section-and-source-link", appCard.ok && appCard.src ? "pass" : "fail", JSON.stringify(appCard));
    record("applied-v2-story-in-app", "pass", "SKIP — dữ liệu shi-noun-link chưa phải schema v2 in_app");
    record("applied-v2-pinyin-toggle", "pass", "SKIP — dữ liệu shi-noun-link chưa phải schema v2 in_app");
  }
  const shiAns = shiApplied && shiApplied.reading && Array.isArray(shiApplied.reading.questions) && shiApplied.reading.questions[0] ? shiApplied.reading.questions[0].answer : 1;
  await evaluate(`document.querySelector('[data-aq="0"] [data-aq-opt="${shiAns}"]').click()`);
  await evaluate(`document.querySelector('[data-aq="0"] [data-aq-check]').click()`);
  const appGrade = await evaluate(`(() => { const fb = document.querySelector('[data-aq="0"] [data-aq-fb]').textContent; const p = JSON.parse(localStorage.getItem('hanngu-progress-v2')); const a = p.applied && p.applied['shi-noun-link']; return { fbOk: fb.includes('Đúng rồi'), saved: !!a && a.reading.answers['0'] && a.reading.answers['0'].ok === true }; })()`);
  record("applied-answer-graded-and-saved", appGrade.fbOk && appGrade.saved ? "pass" : "fail", JSON.stringify(appGrade));
  await evaluate(`document.querySelector('[data-atab="listening"]').click()`);
  if (shiV2) {
    // v2: tab Nghe ban đầu ẨN lời truyện sau nút "Hiện lời để đối chiếu".
    const hidden = await evaluate(`(() => { const st = document.querySelector('#applied-panel [data-ap-story]'); return { storyVisible: !!st && st.offsetParent !== null, reveal: !!document.querySelector('[data-ap-reveal]') }; })()`);
    record("applied-v2-listening-text-hidden", !hidden.storyVisible && hidden.reveal ? "pass" : "fail", JSON.stringify(hidden));
    await evaluate(`document.querySelector('[data-ap-reveal]').click()`);
    const shown = await evaluate(`(() => { const st = document.querySelector('#applied-panel [data-ap-story]'); return !!st && st.offsetParent !== null; })()`);
    record("applied-v2-listening-reveal", shown ? "pass" : "fail", String(shown));
    const appTab = await evaluate(`(() => { const panel = document.getElementById('applied-panel'); return { hasQ: !!panel.querySelector('[data-aq="0"]'), hasStory: !!panel.querySelector('[data-ap-story]') }; })()`);
    record("applied-listening-tab", appTab.hasQ && appTab.hasStory ? "pass" : "fail", JSON.stringify(appTab));
    // v2: khối luyện nghe câu — đúng số câu của dữ liệu (kỳ vọng 5),
    // mỗi câu có nút nghe + nút xem câu; xem câu thì hiện văn bản.
    const shiSp = shiApplied.listening && shiApplied.listening.sentence_practice;
    if (shiSp) {
      const spCheck = await evaluate(`(() => { const items = [...document.querySelectorAll('#applied-panel .applied-sp-item')]; return { n: items.length, allBtns: items.every((it) => !!it.querySelector('[data-ap-src-btn]') && !!it.querySelector('[data-ap-sp-reveal]')) }; })()`);
      record("applied-v2-sentence-practice", spCheck.n === shiSp.items.length && shiSp.items.length === 5 && spCheck.allBtns ? "pass" : "fail", JSON.stringify(spCheck));
      const spReveal = await evaluate(`(() => { const it = document.querySelector('#applied-panel .applied-sp-item'); const before = !!it && !it.querySelector('.applied-sp-text').hidden; it.querySelector('[data-ap-sp-reveal]').click(); const t2 = document.querySelector('#applied-panel .applied-sp-item .applied-sp-text'); return { before, after: !!t2 && !t2.hidden }; })()`);
      record("applied-v2-sentence-reveal", !spReveal.before && spReveal.after ? "pass" : "fail", JSON.stringify(spReveal));
    } else {
      const note = await evaluate(`document.getElementById('applied-panel').innerText.includes('Chưa có phần luyện nghe câu phù hợp')`);
      record("applied-v2-sentence-practice", note ? "pass" : "fail", "không có sentence_practice — thông báo thay thế: " + note);
      record("applied-v2-sentence-reveal", "pass", "SKIP — không có sentence_practice");
    }
    // v2: mọi URL audio đang có trong mục applied (toàn bài, từng đoạn,
    // từng câu luyện) phải lấy được HTTP 200 từ máy chủ. Chỉ kiểm tra
    // đường dữ liệu/phần tử — headless không khẳng định âm thanh phát
    // ra tiếng.
    const srcs = await evaluate(`(() => [...new Set([...document.querySelectorAll('#sec-applied [data-src]')].map((e) => e.dataset.src).filter(Boolean))])()`);
    let audioOk = srcs.length >= 2;
    const statuses = {};
    for (const s of srcs) {
      try {
        let r = await fetch(BASE + s, { method: "HEAD" });
        if (r.status === 405) r = await fetch(BASE + s);
        statuses[s] = r.status;
        if (r.status !== 200) audioOk = false;
      } catch { statuses[s] = "ERR"; audioOk = false; }
    }
    record("applied-v2-audio-urls-200", audioOk ? "pass" : "fail", JSON.stringify(statuses));
  } else {
    const appTab = await evaluate(`(() => { const panel = document.getElementById('applied-panel'); return { hasQ: !!panel.querySelector('[data-aq="0"]'), hint: panel.innerText.includes('nghe trước khi mở bài đọc') }; })()`);
    record("applied-listening-tab", appTab.hasQ && appTab.hint ? "pass" : "fail", JSON.stringify(appTab));
    for (const n of ["applied-v2-listening-text-hidden", "applied-v2-listening-reveal", "applied-v2-sentence-practice", "applied-v2-sentence-reveal", "applied-v2-audio-urls-200"]) {
      record(n, "pass", "SKIP — dữ liệu shi-noun-link chưa phải schema v2 in_app");
    }
  }
  await evaluate(`document.querySelector('[data-applied-done="listening"]').click()`);
  await evaluate(`location.reload()`);
  await sleep(1200);
  await waitFor(async () => evaluate(`!!document.getElementById('sec-applied')`));
  const appPersist = await evaluate(`(() => { const p = JSON.parse(localStorage.getItem('hanngu-progress-v2')); const a = p.applied['shi-noun-link']; return a.listening.done === true && a.reading.answers['0'].ok === true; })()`);
  record("applied-state-persists-after-reload", appPersist ? "pass" : "fail", String(appPersist));
  // Q-1 (QA pilot v2): stamp nội dung của tiến độ applied. Gieo
  // localStorage TRƯỚC khi tải lại trang (app đọc tiến độ lúc khởi
  // động rồi mới render) nên kết quả tất định.
  // (i) State KHÔNG có stamp (tiến độ từ bản APP-01) kèm đáp án +
  // done giả của bộ câu hỏi cũ: dữ liệu hiện tại là schema >= 2 thì
  // state phải bị đặt lại (đáp án/done sạch, giao diện không hiện
  // đáp án cũ) và được gán stamp hiện tại; dữ liệu vẫn là schema 1
  // thì giữ nguyên, chỉ gán stamp.
  const expectedStamp = shiApplied ? `${shiApplied.schema_version || 1}|${shiApplied.checked_date || ""}|${shiMat ? (shiMat.material_id || shiMat.source_url || "") : ""}` : "";
  await evaluate(`(() => { const p = JSON.parse(localStorage.getItem('hanngu-progress-v2')); p.applied = p.applied || {}; p.applied['shi-noun-link'] = { reading: { answers: { '0': { pick: 0, ok: true } }, done: true }, listening: { answers: {}, done: true } }; localStorage.setItem('hanngu-progress-v2', JSON.stringify(p)); })()`);
  await evaluate(`location.reload()`);
  await sleep(1200);
  await waitFor(async () => evaluate(`!!document.getElementById('sec-applied')`));
  const stale = await evaluate(`(() => { const p = JSON.parse(localStorage.getItem('hanngu-progress-v2')); const a = p.applied['shi-noun-link']; const fb = document.querySelector('[data-aq="0"] [data-aq-fb]'); const sel = document.querySelector('[data-aq="0"] .opt.selected'); const doneBtn = document.querySelector('[data-applied-done="reading"]'); return { stamp: a.stamp, ans: Object.keys(a.reading.answers).length, rDone: a.reading.done, lDone: a.listening.done, fbEmpty: !fb || !fb.textContent.trim(), noSel: !sel, doneOff: !!doneBtn && doneBtn.textContent.includes('Đánh dấu đã đọc xong') }; })()`);
  if (shiApplied && Number(shiApplied.schema_version) >= 2) {
    record("applied-stamp-resets-stale-state", stale.stamp === expectedStamp && stale.ans === 0 && !stale.rDone && !stale.lDone && stale.fbEmpty && stale.noSel && stale.doneOff ? "pass" : "fail", JSON.stringify(stale));
  } else {
    record("applied-stamp-resets-stale-state", stale.stamp === expectedStamp && stale.ans === 1 && stale.rDone ? "pass" : "fail", "dữ liệu schema 1 — giữ nguyên tiến độ cũ, chỉ gán stamp: " + JSON.stringify(stale));
  }
  // (ii) State CÓ stamp đúng kèm một đáp án hợp lệ: phải được GIỮ
  // NGUYÊN sau khi tải lại (đáp án còn trong localStorage và phản
  // hồi "Đúng rồi" vẫn hiển thị).
  await evaluate(`(() => { const p = JSON.parse(localStorage.getItem('hanngu-progress-v2')); p.applied['shi-noun-link'] = { reading: { answers: { '0': { pick: ${shiAns}, ok: true } }, done: true }, listening: { answers: {}, done: false }, stamp: ${JSON.stringify(expectedStamp)} }; localStorage.setItem('hanngu-progress-v2', JSON.stringify(p)); })()`);
  await evaluate(`location.reload()`);
  await sleep(1200);
  await waitFor(async () => evaluate(`!!document.getElementById('sec-applied')`));
  const kept = await evaluate(`(() => { const p = JSON.parse(localStorage.getItem('hanngu-progress-v2')); const a = p.applied['shi-noun-link']; const fb = document.querySelector('[data-aq="0"] [data-aq-fb]'); return { kept: !!a.reading.answers['0'] && a.reading.answers['0'].ok === true && a.reading.done === true, fbOk: !!fb && fb.textContent.includes('Đúng rồi') }; })()`);
  record("applied-stamp-keeps-matching-state", kept.kept && kept.fbOk ? "pass" : "fail", JSON.stringify(kept));
  await navigate("#/lesson/ma-question");
  await sleep(1500);
  const appAbsent = await evaluate(`!document.getElementById('sec-applied') && !!document.getElementById('sec-practice')`);
  record("applied-absent-for-lessons-without-material", appAbsent ? "pass" : "fail", String(appAbsent));
  // Lỗi console tính lại SAU toàn bộ luồng applied (mục E ở trên chạy
  // trước khối này) — bảo đảm tương tác đọc/nghe không sinh lỗi mới.
  record("applied-console-errors", consoleErrors.length === 0 ? "pass" : "fail", consoleErrors.length ? consoleErrors.slice(0, 5).join(" | ") : "0 lỗi console/exception sau toàn bộ luồng applied");

  const fails = results.filter((r) => r.status === "fail");
  const report = { base: BASE, at: new Date().toISOString(), engine: "Chromium headless (CDP) tren VM cua Muse — khong phai thiet bi that", results, consoleErrors, verdict: fails.length ? "FAIL" : "PASS" };
  if (REPORT_PATH) writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log("VERDICT:", report.verdict, `(${results.length - fails.length}/${results.length} pass)`);
  await send("Target.closeTarget", { targetId }).catch(() => {});
  ws.close();
  chrome.kill();
  process.exit(fails.length ? 1 : 0);
}

main().catch((e) => {
  console.error("HARNESS ERROR:", e.message);
  try { chrome.kill(); } catch {}
  process.exit(2);
});
