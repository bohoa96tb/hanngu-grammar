// Hanngu Grammar — app tĩnh, không framework.
// Tiến trình chỉ lưu ở localStorage của trình duyệt này. Không gửi dữ liệu ra ngoài.
// Lịch ôn dùng thư viện ts-fsrs 5.4.2 qua srs.mjs (không phải công thức tự chế).
import * as SRS from "./srs.mjs";
const LS_KEY = "hanngu-progress-v2";
const OLD_LS_KEY = "hanngu-progress-v1";
const PREFS_KEY = "hanngu-prefs-v1";
const CORRUPT_BACKUP_KEY = "hanngu-progress-corrupt-backup";
let lessons = [];
let progressNotice = "";
let progress = loadProgress();
// Tùy chọn hiển thị/đọc: lưu riêng ở hanngu-prefs-v1, độc lập với tiến trình
// học v2 để không làm thay đổi định dạng tiến trình. Đọc khi khởi động,
// lưu ngay khi người dùng đổi.
let prefs = loadPrefs();
// Luyện nói P04-02 (bản cốt lõi): bản thu chỉ giữ trong bộ nhớ của trang này,
// không lưu localStorage, không gửi lên máy chủ, mất khi rời/tải lại trang.
// Không chấm điểm phát âm: người học tự nghe lại và đối chiếu với mẫu.
// Thông báo sau một lần ôn vừa ghi, hiển thị một lần ở lần render Ôn lại
// ngay sau đó (P09 phát hiện: trước đây lịch sử chỉ cập nhật sau khi tải lại).
let lastReviewNote = "";
let speakingRecorder = null;
let speakingChunks = [];
let speakingBlobUrl = null;
let speakingRecording = false;
// Phiên ôn hiện tại (trang Ôn lại): tổng số thẻ đến hạn lúc vào trang và số
// thẻ đã ôn trong phiên; đặt lại khi rời trang Ôn lại.
let reviewSessionTotal = null;
let reviewSessionDone = 0;
// Lỗi tải từng phần: số shard không tải được ở lần loadLessons gần nhất.
let loadErrorInfo = null;
let loadFailed = false;

function emptyProgressV2() {
  return { version: 2, fsrsVersion: SRS.FSRS_VERSION, completedLessons: [], attempts: {}, hints: {}, cards: {}, events: [], reviewLimit: 20 };
}
function migrateProgress(p) {
  // v1 -> v2: giữ nguyên hoàn thành/bài tập/gợi ý; thẻ FSRS bắt đầu trống.
  // Thẻ cũ không tồn tại ở v1 nên không có migration trạng thái FSRS nào.
  if (p.version === 2) {
    return { ...emptyProgressV2(), ...p, cards: p.cards || {}, events: Array.isArray(p.events) ? p.events : [], reviewLimit: p.reviewLimit || 20 };
  }
  return { ...emptyProgressV2(), completedLessons: p.completedLessons || [], attempts: p.attempts || {}, hints: p.hints || {} };
}
function loadProgress() {
  let raw = null;
  try {
    raw = localStorage.getItem(LS_KEY) || localStorage.getItem(OLD_LS_KEY);
  } catch (e) {
    return emptyProgressV2();
  }
  if (!raw) return emptyProgressV2();
  try {
    const p = JSON.parse(raw);
    if (p.version !== 1 && p.version !== 2) throw new Error("Phiên bản tiến trình không khớp");
    return migrateProgress(p);
  } catch (e) {
    // Tiến trình hỏng: KHÔNG lặng lẽ ghi đè. Lưu bản sao nguyên văn vào khóa
    // dự phòng trước khi đặt lại, và báo cho người dùng bằng banner ở mọi trang.
    try { localStorage.setItem(CORRUPT_BACKUP_KEY, raw); } catch (_) { /* bỏ qua nếu không lưu được */ }
    progressNotice = "Dữ liệu tiến trình cũ bị hỏng nên đã được đặt lại từ đầu. Bản sao dữ liệu hỏng đã được lưu dự phòng trên thiết bị này (khóa " + CORRUPT_BACKUP_KEY + ") để có thể khôi phục sau.";
    return emptyProgressV2();
  }
}
function saveProgress() { localStorage.setItem(LS_KEY, JSON.stringify(progress)); }
function loadPrefs() {
  const fallback = { showPinyin: false, speechRate: 1, showMeaning: true };
  try {
    const p = JSON.parse(localStorage.getItem(PREFS_KEY));
    if (!p || typeof p !== "object") return fallback;
    const rate = Number(p.speechRate);
    return {
      showPinyin: !!p.showPinyin,
      speechRate: [0.7, 1, 1.25].includes(rate) ? rate : 1,
      showMeaning: p.showMeaning !== false,
    };
  } catch (e) {
    return fallback;
  }
}
function savePrefs() { try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) { /* bỏ qua */ } }
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function norm(s) { return String(s).replace(/[\s。，、；：？！·…「」『』（）《》"'.?!]/g, ""); }
function setLiveStatus(msg) { const el = document.getElementById("liveStatus"); if (el) el.textContent = msg; }
function difficultyLabel(d) { return d === "easy" ? "Dễ" : d === "hard" ? "Khó" : "Trung bình"; }
const VERDICT_LABELS = {
  sai_ngu_phap: "Sai ngữ pháp",
  doi_nghia: "Đổi nghĩa",
  khac_van_phong: "Khác văn phong",
  thieu_ngu_canh: "Thiếu ngữ cảnh",
  kem_tu_nhien: "Kém tự nhiên",
  thay_duoc_co_dieu_kien: "Đúng trong ngữ cảnh khác",
};
// Nhãn mức nhớ chỉ tiếng Việt (srs.mjs giữ nhãn thư viện cho dữ liệu đã lưu;
// khi hiển thị lịch sử, phần tiếng Anh trong ngoặc được lược bỏ ở render).
const RATING_LABELS_VI = {
  [SRS.Rating.Again]: "Quên rồi",
  [SRS.Rating.Hard]: "Khó",
  [SRS.Rating.Good]: "Nhớ được",
  [SRS.Rating.Easy]: "Dễ dàng",
};
function ratingLabelVi(e) {
  if (e && e.rating && RATING_LABELS_VI[e.rating]) return RATING_LABELS_VI[e.rating];
  return String((e && e.rating_label) || "").replace(/\s*\([^)]*\)\s*/g, "").trim();
}
// Giai đoạn luyện tập: nhận biết → đặt đúng vị trí → tự dùng.
function stageLabel(les, ex) {
  if (ex.type === "choice" || ex.type === "error_spot") return "Nhận biết";
  if (ex.type === "order") return "Đặt đúng vị trí";
  if (ex.type === "fill") {
    const fills = les.exercises.filter((e) => e.type === "fill");
    return fills[fills.length - 1] === ex ? "Tự dùng" : "Đặt đúng vị trí";
  }
  return "";
}
// formula_notes chuẩn hóa dạng "1) Nhãn: ... 2) Nhãn: ..." thì tách thành
// danh sách đánh số; chưa có dạng đó thì hiện nguyên đoạn (an toàn lùi).
function formulaStepsHTML(notes) {
  const t = String(notes || "").trim();
  if (!t) return "";
  const re = /(^|\s)(\d+)\)\s+/g;
  const marks = [];
  let m;
  while ((m = re.exec(t)) !== null) {
    marks.push({ start: m.index + m[1].length, contentStart: m.index + m[0].length, num: Number(m[2]) });
  }
  const sequential = marks.length >= 2 && marks[0].start <= 1 && marks.every((mk, i) => mk.num === i + 1);
  if (!sequential) return `<p>${esc(t)}</p>`;
  const items = marks.map((mk, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].start : t.length;
    return t.slice(mk.contentStart, end).trim();
  }).filter((s) => s);
  if (items.length < 2) return `<p>${esc(t)}</p>`;
  return `<ol class="formula-steps">${items.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`;
}
// Dòng đối chiếu cấp HSK của chính bài (hsk_evidence, D26): hiển thị ở khối
// nguồn cuối trang bài. Bài thiếu trường hoặc status lạ thì không hiện gì
// (validator chịu trách nhiệm bắt lỗi dữ liệu; app không được vỡ trang).
function hskEvidenceHTML(les) {
  const ev = les.hsk_evidence;
  if (!ev || typeof ev !== "object") return "";
  if (ev.status === "verified") {
    return `<p class="note">✓ Đã đối chiếu đề cương HSK 3.0: toàn bộ nội dung thuộc HSK ${les.hsk_level}.</p>`;
  }
  if (ev.status === "partial") {
    const note = ev.note ? ` ${esc(ev.note)}` : "";
    return `<p class="note">◐ Đã đối chiếu đề cương HSK 3.0: phần chính thuộc HSK ${les.hsk_level};${note}</p>`;
  }
  return "";
}
// Một hàng ví dụ dùng chung cho mục A (ví dụ nhanh) và mục C: chữ Hán + nút
// nghe/dừng cạnh câu, Pinyin và nghĩa Việt ẩn/hiện bằng thuộc tính hidden
// theo prefs (không vẽ lại trang khi đổi).
function exampleHTML(e) {
  return `<div class="example">
    <p class="zh example-zh"><span>${esc(e.zh)}</span><span class="btn-row"><button type="button" data-speak="${esc(e.zh)}" aria-label="Nghe câu tiếng Trung">▶ Nghe</button><button type="button" class="secondary" data-stop>■ Dừng</button></span></p>
    ${e.pinyin ? `<p class="pinyin" ${prefs.showPinyin ? "" : "hidden"}>${esc(e.pinyin)}</p>` : ""}
    <p class="example-vi" ${prefs.showMeaning ? "" : "hidden"}>${esc(e.vi)}</p>
  </div>`;
}

// Xác định giọng zh (xem D24): danh sách giọng của trình duyệt tải bất
// đồng bộ; getVoices() lúc đầu thường trả về rỗng ngay cả khi sau đó có
// giọng. Vì vậy không được kết luận "không có giọng zh" từ một danh
// sách rỗng chưa sẵn sàng. voicesReady chỉ bật khi sự kiện
// voiceschanged đã kích hoạt hoặc danh sách đã có phần tử.
// Cảnh báo thiếu giọng: chỉ qua dòng #voiceNote bền vững trong bài học và
// live-region trạng thái — không dùng hộp thoại chặn màn hình.
let voicesReady = false;
let zhVoicesList = [];
let voiceWarning = false;
const VOICE_WARN_TEXT = "Trình duyệt này chưa có giọng tiếng Trung. Âm thanh phát ra (nếu có) dùng giọng mặc định của trình duyệt và không được coi là phát âm mẫu chuẩn.";
function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  const vs = window.speechSynthesis.getVoices();
  zhVoicesList = vs.filter((v) => (v.lang || "").toLowerCase().startsWith("zh"));
  if (vs.length > 0) voicesReady = true;
  if (zhVoicesList.length > 0) voiceWarning = false;
}
function updateVoiceNote() {
  const el = document.getElementById("voiceNote");
  if (!el) return;
  el.textContent = (voiceWarning || (voicesReady && zhVoicesList.length === 0)) ? VOICE_WARN_TEXT : "";
}
function ensureVoices(timeoutMs) {
  if (voicesReady) return Promise.resolve();
  return new Promise((res) => {
    const t0 = Date.now();
    const tick = () => {
      refreshVoices();
      if (voicesReady || Date.now() - t0 >= (timeoutMs || 1000)) res();
      else setTimeout(tick, 100);
    };
    tick();
  });
}
if ("speechSynthesis" in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    voicesReady = true;
    refreshVoices();
    updateVoiceNote();
    if (window.__updateDebugVoices) window.__updateDebugVoices();
  };
}
let currentSpeakBtn = null;
// Cờ thế hệ phát âm: stopSpeak() tăng thế hệ; speak() ghi lại thế hệ lúc
// bắt đầu và hủy không phát nếu thế hệ đã đổi trong lúc đang chờ danh sách
// giọng (người dùng bấm Dừng trong cửa sổ chờ ensureVoices ~1 giây).
let speakGeneration = 0;
function clearSpeakingState() {
  document.querySelectorAll("button.speaking").forEach((b) => {
    b.classList.remove("speaking");
    b.removeAttribute("aria-busy");
    if (b.dataset.label) b.textContent = b.dataset.label;
  });
  currentSpeakBtn = null;
}
async function speak(text, btn) {
  if (!("speechSynthesis" in window)) {
    setLiveStatus("Trình duyệt này không hỗ trợ đọc giọng tổng hợp.");
    const vn = document.getElementById("voiceNote");
    if (vn) vn.textContent = "Trình duyệt này không hỗ trợ đọc giọng tổng hợp.";
    return;
  }
  speakGeneration += 1;
  const gen = speakGeneration;
  window.speechSynthesis.cancel();
  clearSpeakingState();
  if (btn) {
    if (!btn.dataset.label) btn.dataset.label = btn.textContent;
    btn.classList.add("speaking");
    btn.textContent = "Đang đọc…";
    btn.setAttribute("aria-busy", "true");
    currentSpeakBtn = btn;
  }
  // Chờ danh sách giọng sẵn sàng (tối đa ~1 giây) rồi mới kết luận có
  // hay không có giọng zh; hết thời gian chờ mà vẫn chưa có sự kiện
  // voiceschanged thì vẫn cảnh báo qua #voiceNote, không đọc lặng.
  await ensureVoices(1000);
  if (gen !== speakGeneration) {
    // Đã bấm Dừng (hoặc chuyển trang) trong lúc chờ danh sách giọng:
    // hủy không phát, và khôi phục nút đang ở trạng thái "Đang đọc…".
    if (btn && currentSpeakBtn === btn) clearSpeakingState();
    return;
  }
  refreshVoices();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN"; u.rate = prefs.speechRate;
  const zhVoice = zhVoicesList[0];
  if (zhVoice) {
    u.voice = zhVoice;
  } else {
    voiceWarning = true;
    updateVoiceNote();
    setLiveStatus(VOICE_WARN_TEXT);
  }
  const finish = () => { if (!btn || currentSpeakBtn === btn) clearSpeakingState(); };
  u.onstart = () => { if (btn && currentSpeakBtn === btn) btn.classList.add("speaking"); };
  u.onend = finish;
  u.onerror = (ev) => {
    finish();
    if (ev && ev.error && ev.error !== "canceled" && ev.error !== "interrupted") {
      setLiveStatus("Không phát được âm thanh. Hãy thử lại.");
    }
  };
  window.speechSynthesis.speak(u);
}
function stopSpeak() {
  speakGeneration += 1;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  clearSpeakingState();
}

function lessonById(id) { return lessons.find((l) => l.id === id); }

function lessonProgressText(l) {
  const total = l.exercises.length;
  if (progress.completedLessons.includes(l.id)) return "✓ Đã hoàn thành";
  const attempted = l.exercises.filter((ex) => progress.attempts[ex.id]);
  if (!attempted.length) return `${l.examples.length} ví dụ · ${total} bài tập`;
  const lastOk = attempted.filter((ex) => progress.attempts[ex.id].lastCorrect).length;
  return `Đã làm ${attempted.length}/${total} bài tập · đúng gần nhất ${lastOk}/${total}`;
}
// Bài tiếp tục học: bài đang học dở (đã có lượt làm, chưa hoàn thành) đầu
// tiên theo thứ tự danh mục; nếu không có thì bài chưa hoàn thành đầu tiên.
function continueLesson() {
  const inProgress = lessons.find((l) => !progress.completedLessons.includes(l.id)
    && l.exercises.some((ex) => progress.attempts[ex.id]));
  if (inProgress) return inProgress;
  return lessons.find((l) => !progress.completedLessons.includes(l.id)) || null;
}

function renderHome() {
  const app = document.getElementById("app");
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  const level = params.get("level") || "all";
  const q = (params.get("q") || "").toLowerCase();
  const filtered = lessons.filter((l) => {
    if (level !== "all" && String(l.hsk_level) !== level) return false;
    if (!q) return true;
    const hay = [l.title_vi, l.pattern, ...l.examples.map((e) => e.zh + " " + e.vi)].join(" ").toLowerCase();
    return hay.includes(q);
  });
  const cont = continueLesson();
  let dueCount = 0;
  try { dueCount = SRS.dueCards(progress, lessons, new Date()).filter((x) => x.isDue).length; } catch (e) { dueCount = 0; }
  app.innerHTML = `
    <h2>Danh mục bài học</h2>
    <section class="card continue-card">
      <h3>Tiếp tục học</h3>
      ${cont ? `<p><a href="#/lesson/${cont.id}"><strong>${esc(cont.title_vi)}</strong></a></p>
      <p class="note">${esc(cont.objective)}</p>
      <p><a class="btn-link" href="#/lesson/${cont.id}">Học tiếp bài này</a></p>` : `<p>✓ Bạn đã hoàn thành tất cả bài hiện có.</p>`}
      ${dueCount > 0 ? `<p>Số thẻ đến hạn ôn: <strong>${dueCount}</strong> — <a href="#/review">Đi ôn ngay</a></p>` : `<p class="note">Chưa có thẻ nào đến hạn ôn.</p>`}
    </section>
    <p class="note">Bản thử nghiệm: ${lessons.length} bài mẫu. Tìm kiếm mở được bài trực tiếp; không cần học hết bài ôn mới được học bài mới.</p>
    <form class="card" id="searchForm" role="search">
      <label for="q">Tìm kiếm (tiếng Việt, chữ Hán hoặc công thức)</label>
      <input id="q" type="search" value="${esc(params.get("q") || "")}" placeholder="Ví dụ: 比, so sánh, 是">
      <div class="filters btn-row" role="group" aria-label="Lọc theo cấp">
        ${["all", "1", "2", "3", "4", "5", "6"].map((lv) => `<button type="button" class="${level === lv ? "" : "secondary"}" data-level="${lv}" aria-pressed="${level === lv}">${lv === "all" ? "Tất cả" : "HSK " + lv}</button>`).join("")}
      </div>
      <p><button type="submit" id="searchBtn">Tìm</button></p>
    </form>
    ${filtered.length ? filtered.map((l) => `
      <article class="card">
        <p class="badges"><span class="badge badge-hsk">HSK ${l.hsk_level}</span> <span class="badge badge-diff">Độ khó: ${difficultyLabel(l.difficulty)}</span></p>
        <h3><a href="#/lesson/${l.id}">${esc(l.title_vi)}</a></h3>
        <p><span class="zh">${esc(l.pattern)}</span></p>
        <p>${esc(l.objective)}</p>
        <p class="note">${lessonProgressText(l)}</p>
      </article>`).join("") : `<div class="card"><p>Không tìm thấy bài phù hợp với bộ lọc hiện tại. Thử từ khác hoặc xóa bộ lọc.</p><p><button type="button" class="secondary" id="clearFiltersBtn">Xóa bộ lọc</button></p></div>`}
    <div class="card">
      <h3>Tiến trình của bạn (chỉ trên thiết bị này)</h3>
      <p>Đã hoàn thành ${progress.completedLessons.length}/${lessons.length} bài mẫu.</p>
      <button type="button" id="exportBtn" class="secondary">Xuất tiến trình (JSON)</button>
      <label for="importFile">Nhập tiến trình (sẽ hỏi xác nhận trước khi ghi đè)</label>
      <input id="importFile" type="file" accept=".json,application/json">
      <div id="importMsg"></div>
      <p class="note">Ôn tập dùng thư viện FSRS thật (ts-fsrs 5.4.2, xem trang Ôn lại). Mốc thời gian lưu UTC (ISO); “hôm nay” tính theo múi giờ của thiết bị bạn.</p>
    </div>`;
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const v = document.getElementById("q").value;
    location.hash = `#/?level=${level}&q=${encodeURIComponent(v)}`;
    if ((params.get("q") || "") === v) render();
  });
  document.querySelectorAll("[data-level]").forEach((b) => {
    b.onclick = () => {
      const v = document.getElementById("q").value;
      location.hash = `#/?level=${b.dataset.level}&q=${encodeURIComponent(v)}`;
    };
  });
  const clearBtn = document.getElementById("clearFiltersBtn");
  if (clearBtn) clearBtn.onclick = () => { location.hash = "#/"; if ((location.hash || "#/") === "#/") render(); };
  document.getElementById("exportBtn").onclick = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "hanngu-progress-v2.json"; a.click();
  };
  document.getElementById("importFile").onchange = async (ev) => {
    const file = ev.target.files[0]; if (!file) return;
    const msg = document.getElementById("importMsg");
    try {
      const data = JSON.parse(await file.text());
      if ((data.version !== 1 && data.version !== 2) || !Array.isArray(data.completedLessons)) throw new Error("Định dạng không khớp (cần version 1 hoặc 2)");
      if (data.version === 2 && data.cards && typeof data.cards !== "object") throw new Error("Trường cards không hợp lệ");
      if (data.version === 2 && data.events && !Array.isArray(data.events)) throw new Error("Trường events không hợp lệ");
      if (confirm("Ghi đè toàn bộ tiến trình hiện tại bằng file đã nhập?")) { progress = migrateProgress(data); progress.fsrsVersion = SRS.FSRS_VERSION; saveProgress(); render(); }
    } catch (e) {
      if (msg) msg.innerHTML = `<div class="feedback bad" role="alert">✗ Không nhập được: ${esc(e.message)}</div>`;
    }
  };
}

function exerciseHTML(les, ex, idx) {
  const done = progress.attempts[ex.id];
  const payload = ex.payload || {};
  const hint = payload.hint_vi ? String(payload.hint_vi) : "";
  let body = "";
  if (ex.type === "choice" || ex.type === "error_spot") {
    if (ex.type === "error_spot") body += `<p class="zh">${esc(payload.sentence_zh || "")}</p><p>Chọn khối sai:</p>`;
    body += `<div class="btn-row options" role="group" aria-label="Lựa chọn đáp án">${(payload.options || []).map((o) => `<button type="button" class="secondary opt-btn" data-opt="${esc(o)}" aria-pressed="false">${esc(o)}</button>`).join("")}</div>
      <p class="btn-row"><button type="button" data-check="${ex.id}">Kiểm tra</button><button type="button" class="secondary" data-retry="${ex.id}" hidden>Làm lại</button></p>`;
  } else if (ex.type === "fill") {
    const pzh = payload.prompt_zh || ex.prompt_zh || "";
    body = `${pzh ? `<p class="zh">${esc(pzh)}</p>` : ""}${hint ? `<p class="note">Mẫu cần dùng: ${esc(hint)}</p>` : ""}
      <label class="sr-only" for="fill-${ex.id}">Đáp án</label>
      <input type="text" id="fill-${ex.id}" placeholder="Viết bằng chữ Hán" autocomplete="off">
      <p class="btn-row"><button type="button" data-fill="${ex.id}">Kiểm tra</button><button type="button" class="secondary" data-retry="${ex.id}" hidden>Làm lại</button></p>`;
  } else if (ex.type === "order") {
    body = `<p>Chạm hoặc dùng phím để chọn từng khối theo thứ tự đúng; bấm vào khối đã xếp để gỡ ra.</p>
      <div class="btn-row" id="order-pick-${ex.id}" role="group" aria-label="Khối từ để xếp">${(payload.tokens || []).map((t, i) => `<button type="button" class="token" data-idx="${i}" data-tok="${esc(t)}">${esc(t)}</button>`).join("")}</div>
      <p>Câu của bạn:</p>
      <div class="btn-row order-built" id="order-built-${ex.id}"></div>
      <p class="btn-row"><button type="button" data-order="${ex.id}">Kiểm tra</button><button type="button" class="secondary" data-clear-order="${ex.id}">Làm lại</button></p>`;
  }
  return `<section class="card exercise" id="ex-${ex.id}">
    <h4>Bài ${idx + 1} <span class="chip">${esc(stageLabel(les, ex))}</span></h4><p>${esc(ex.prompt_vi)}</p>${body}
    <p><button type="button" class="secondary" data-hint="${ex.id}">Xin gợi ý (sẽ ghi nhận là đã xem gợi ý)</button></p>
    <div id="hint-${ex.id}"></div>
    <div id="fb-${ex.id}">${done ? `<div class="feedback ${done.lastCorrect ? "ok" : "bad"}">Lần làm gần nhất: ${done.lastCorrect ? "✓ Đúng" : "✗ Chưa đúng"}</div>` : ""}</div>
  </section>`;
}

function renderLesson(id) {
  const les = lessonById(id);
  const app = document.getElementById("app");
  if (!les) { app.innerHTML = "<p>Không tìm thấy bài học.</p><p><a href='#/'>Về danh mục</a></p>"; return; }
  const idxAll = lessons.findIndex((l) => l.id === id);
  const prev = idxAll > 0 ? lessons[idxAll - 1] : null;
  const next = idxAll >= 0 && idxAll < lessons.length - 1 ? lessons[idxAll + 1] : null;
  const quick = les.examples && les.examples.length ? les.examples[0] : null;
  app.innerHTML = `
    <p><a href="#/">← Danh mục</a></p>
    <section class="card card-hero">
      <p class="badges"><span class="badge badge-hsk">HSK ${les.hsk_level}</span> <span class="badge badge-diff">Độ khó: ${difficultyLabel(les.difficulty)}</span></p>
      <h2>${esc(les.title_vi)}</h2>
      <p class="hero-pattern zh">${esc(les.pattern)}</p>
      <p class="hero-objective"><strong>Mục tiêu:</strong> ${esc(les.objective)}</p>
    </section>
    <section class="card"><h3>A. Dùng khi nào</h3><p>${esc(les.when_to_use)}</p>
      ${quick ? `<p class="note"><strong>Ví dụ nhanh:</strong></p>${exampleHTML(quick)}` : ""}
    </section>
    <section class="card"><h3>B. Cách đặt câu</h3><p class="zh">${esc(les.pattern)}</p>${formulaStepsHTML(les.formula_notes)}</section>
    <section class="card">
      <h3>C. Ví dụ</h3>
      <div class="lesson-controls btn-row" role="group" aria-label="Điều khiển hiển thị và tốc độ đọc">
        <button type="button" class="secondary" id="pinyinBtn" aria-pressed="${prefs.showPinyin}">${prefs.showPinyin ? "Ẩn Pinyin" : "Hiện Pinyin"}</button>
        <button type="button" class="secondary" id="meaningBtn" aria-pressed="${prefs.showMeaning}">${prefs.showMeaning ? "Ẩn nghĩa Việt" : "Hiện nghĩa Việt"}</button>
        <label for="rateSel">Tốc độ đọc <select id="rateSel"><option value="0.7">0.7×</option><option value="1">1×</option><option value="1.25">1.25×</option></select></label>
      </div>
      <p class="note">Âm thanh tiếng Trung chỉ đọc câu tiếng Trung; phần giảng tiếng Việt không trộn vào track này. Giọng đọc là giọng tổng hợp của trình duyệt.</p>
      <p id="voiceNote" class="voice-note" role="status"></p>
      ${les.examples.map((e) => exampleHTML(e)).join("")}
    </section>
    ${les.confusions && les.confusions.length ? `<section class="card"><h3>D. Dễ nhầm</h3>${les.confusions.map((c) => `<div class="confusion"><p><strong>${esc(c.wrong_or_risky)}</strong> <span class="chip chip-verdict">${esc(VERDICT_LABELS[c.verdict] || c.verdict || "")}</span></p><p>${esc(c.explanation)}</p></div>`).join("")}</section>` : ""}
    <section class="card" id="speak-section">
      <h3>Luyện nói</h3>
      <p>1. Nghe mẫu &nbsp;→&nbsp; 2. Đọc đuổi theo mẫu và thu âm &nbsp;→&nbsp; 3. Nghe lại bản thu, tự đối chiếu với mẫu &nbsp;→&nbsp; 4. Tự nói một câu mới theo tình huống bên dưới.</p>
      <label for="speakSel">Chọn câu mẫu để luyện</label>
      <select id="speakSel">${les.examples.map((e, i) => `<option value="${i}">${esc(e.zh)} — ${esc(e.vi)}</option>`).join("")}</select>
      <p class="btn-row">
        <button type="button" id="speakSampleBtn">▶ Nghe mẫu</button>
        <button type="button" id="speakRecordBtn">● Thu âm</button>
        <button type="button" id="speakStopBtn" class="secondary" disabled>Dừng thu</button>
        <button type="button" id="speakPlayBtn" class="secondary" ${speakingBlobUrl ? "" : "disabled"}>▶ Nghe lại bản thu</button>
        <button type="button" id="speakClearBtn" class="secondary" ${speakingBlobUrl ? "" : "disabled"}>Xóa bản thu</button>
      </p>
      <p id="speakStatus" class="note">Chưa có bản thu. Bản thu không được chấm điểm tự động và không gửi đi đâu.</p>
      <p><strong>Tự nói theo tình huống:</strong> Dùng công thức <span class="zh">${esc(les.pattern)}</span> để tự nói một câu mới về bản thân (không cần viết ra, có thể thu âm để nghe lại).</p>
      <p class="note">Nếu trình duyệt từ chối microphone hoặc thiết bị không có mic, bạn vẫn học được toàn bộ phần còn lại của bài: nghe mẫu, đọc đuổi không thu âm và tự nói theo tình huống.</p>
    </section>
    <section><h3>E. Luyện tập</h3><p class="note">Làm theo thứ tự: Nhận biết → Đặt đúng vị trí → Tự dùng. Với câu chọn đáp án: chọn trước rồi bấm “Kiểm tra” — chọn chưa bị tính lượt cho tới khi kiểm tra. Lời giải chỉ hiện sau khi bạn kiểm tra; xin gợi ý chỉ hiện gợi ý, không lộ lời giải, và sẽ được ghi nhận là đã xem gợi ý.</p>
    ${les.exercises.map((ex, i) => exerciseHTML(les, ex, i)).join("")}</section>
    ${les.quick_memory ? `<section class="card card-memory"><h3>F. Nhớ nhanh</h3><p>${esc(les.quick_memory)}</p></section>` : ""}
    <div class="card">
      <button type="button" id="completeBtn">${progress.completedLessons.includes(id) ? "✓ Đã hoàn thành — đánh dấu lại" : "Đánh dấu đã hoàn thành bài này"}</button>
      <button type="button" class="secondary" id="reportBtn">Báo lỗi bài học</button>
      <p id="reportText" class="note"></p>
      <p class="note">Nguồn: ${les.sources.map((s) => esc(s.source_id) + " — " + esc(s.note)).join("; ")}. Rà soát: ${esc(les.review ? les.review.reviewer + ", " + les.review.date : "chưa rà soát")}. Phiên bản nội dung: ${les.content_version}.</p>
      ${hskEvidenceHTML(les)}
    </div>
    <nav class="lesson-nav" aria-label="Điều hướng bài học">
      ${prev ? `<a class="nav-link" href="#/lesson/${prev.id}">← Bài trước: ${esc(prev.title_vi)}</a>` : `<span class="nav-link disabled" aria-disabled="true">← Bài trước</span>`}
      <a class="nav-link" href="#/">Danh mục</a>
      ${next ? `<a class="nav-link" href="#/lesson/${next.id}">Bài sau: ${esc(next.title_vi)} →</a>` : `<span class="nav-link disabled" aria-disabled="true">Bài sau →</span>`}
    </nav>`;
  // Điều khiển hiển thị: chỉ ẩn/hiện trong DOM theo prefs, KHÔNG vẽ lại
  // trang (giữ vị trí cuộn, chữ đang gõ và câu xếp từ đang làm dở).
  const pinyinBtn = document.getElementById("pinyinBtn");
  pinyinBtn.onclick = () => {
    prefs.showPinyin = !prefs.showPinyin; savePrefs();
    document.querySelectorAll(".pinyin").forEach((el) => { el.hidden = !prefs.showPinyin; });
    pinyinBtn.textContent = prefs.showPinyin ? "Ẩn Pinyin" : "Hiện Pinyin";
    pinyinBtn.setAttribute("aria-pressed", String(prefs.showPinyin));
  };
  const meaningBtn = document.getElementById("meaningBtn");
  meaningBtn.onclick = () => {
    prefs.showMeaning = !prefs.showMeaning; savePrefs();
    document.querySelectorAll(".example-vi").forEach((el) => { el.hidden = !prefs.showMeaning; });
    meaningBtn.textContent = prefs.showMeaning ? "Ẩn nghĩa Việt" : "Hiện nghĩa Việt";
    meaningBtn.setAttribute("aria-pressed", String(prefs.showMeaning));
  };
  const rateSel = document.getElementById("rateSel");
  rateSel.value = String(prefs.speechRate);
  rateSel.onchange = (e) => { prefs.speechRate = parseFloat(e.target.value); savePrefs(); };
  updateVoiceNote();
  document.querySelectorAll("[data-speak]").forEach((b) => { b.onclick = () => speak(b.dataset.speak, b); });
  document.querySelectorAll("[data-stop]").forEach((b) => { b.onclick = stopSpeak; });
  // Luyện nói P04-02: thu âm bằng MediaRecorder của trình duyệt, phát lại bằng
  // thẻ audio tạm; không chấm điểm, không lưu, không gửi bản thu đi đâu.
  const speakStatus = document.getElementById("speakStatus");
  const speakSel = document.getElementById("speakSel");
  const recordBtn = document.getElementById("speakRecordBtn");
  const stopBtn = document.getElementById("speakStopBtn");
  const playBtn = document.getElementById("speakPlayBtn");
  const clearBtn = document.getElementById("speakClearBtn");
  const setSpeakStatus = (t) => { if (speakStatus) speakStatus.textContent = t; };
  document.getElementById("speakSampleBtn").onclick = (ev) => speak(les.examples[Number(speakSel.value)].zh, ev.currentTarget);
  recordBtn.onclick = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !("MediaRecorder" in window)) {
      setSpeakStatus("Trình duyệt này không hỗ trợ thu âm. Bạn vẫn có thể nghe mẫu và đọc đuổi không thu âm.");
      return;
    }
    if (speakingRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      speakingChunks = [];
      speakingRecorder = new MediaRecorder(stream);
      speakingRecorder.ondataavailable = (e) => { if (e.data && e.data.size) speakingChunks.push(e.data); };
      speakingRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        recordBtn.classList.remove("recording");
        recordBtn.textContent = "● Thu âm";
        if (speakingBlobUrl) URL.revokeObjectURL(speakingBlobUrl);
        speakingBlobUrl = URL.createObjectURL(new Blob(speakingChunks, { type: speakingRecorder.mimeType || "audio/webm" }));
        playBtn.disabled = false; clearBtn.disabled = false;
        setSpeakStatus("Đã thu xong. Bấm “Nghe lại bản thu” để tự đối chiếu với mẫu — không có chấm điểm tự động.");
      };
      speakingRecorder.start();
      speakingRecording = true;
      recordBtn.disabled = true; stopBtn.disabled = false;
      recordBtn.classList.add("recording");
      recordBtn.textContent = "● Đang thu…";
      setSpeakStatus("Đang thu… Hãy đọc đuổi theo câu mẫu, rồi bấm “Dừng thu”.");
    } catch (e) {
      setSpeakStatus("Không truy cập được microphone (bị từ chối hoặc không có mic). Bạn vẫn học được phần còn lại: nghe mẫu, đọc đuổi không thu âm và tự nói theo tình huống.");
    }
  };
  stopBtn.onclick = () => {
    if (speakingRecorder && speakingRecording) { speakingRecorder.stop(); speakingRecording = false; recordBtn.disabled = false; stopBtn.disabled = true; }
  };
  playBtn.onclick = () => { if (speakingBlobUrl) new Audio(speakingBlobUrl).play().catch(() => setSpeakStatus("Không phát được bản thu trên trình duyệt này.")); };
  clearBtn.onclick = () => {
    if (speakingBlobUrl) URL.revokeObjectURL(speakingBlobUrl);
    speakingBlobUrl = null; speakingChunks = [];
    playBtn.disabled = true; clearBtn.disabled = true;
    setSpeakStatus("Đã xóa bản thu. Chưa có bản thu.");
  };
  document.getElementById("completeBtn").onclick = () => {
    if (!progress.completedLessons.includes(id)) progress.completedLessons.push(id);
    saveProgress(); render();
  };
  document.getElementById("reportBtn").onclick = () => {
    const text = `Báo lỗi bài học — ID: ${les.id}, phiên bản nội dung: ${les.content_version}. Mô tả lỗi: `;
    document.getElementById("reportText").textContent = text + "(hãy sao chép dòng này kèm mô tả lỗi của bạn khi gửi phản hồi)";
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
  };
  // Chấm bài: chọn đáp án và kiểm tra là hai bước riêng (trừ fill/order vốn
  // đã có nút Kiểm tra riêng). Lời giải chỉ hiện sau khi kiểm tra.
  les.exercises.forEach((ex) => {
    const secEl = document.getElementById("ex-" + ex.id);
    if (!secEl) return;
    const fb = () => document.getElementById("fb-" + ex.id);
    const grade = (correct, extraHTML) => {
      const prev = progress.attempts[ex.id] || { correct: 0, total: 0 };
      progress.attempts[ex.id] = { correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1, lastCorrect: correct, hintUsed: !!progress.hints[ex.id] };
      saveProgress();
      fb().innerHTML = `<div class="feedback ${correct ? "ok" : "bad"}" role="status">${correct ? "✓ Đúng rồi." : "✗ Chưa đúng."} ${extraHTML || ""} ${esc(ex.explanation)}</div>`;
    };
    const retryBtn = secEl.querySelector("[data-retry]");
    if (ex.type === "choice" || ex.type === "error_spot") {
      let selected = null;
      let graded = false;
      const optBtns = [...secEl.querySelectorAll("[data-opt]")];
      const checkBtn = secEl.querySelector("[data-check]");
      optBtns.forEach((b) => {
        b.onclick = () => {
          if (graded) return;
          optBtns.forEach((x) => { x.classList.remove("selected"); x.setAttribute("aria-pressed", "false"); });
          b.classList.add("selected");
          b.setAttribute("aria-pressed", "true");
          selected = b;
        };
      });
      if (checkBtn) checkBtn.onclick = () => {
        if (graded) return;
        if (!selected) {
          fb().innerHTML = `<div class="feedback" role="status">Hãy chọn một đáp án trước, rồi bấm “Kiểm tra”.</div>`;
          return;
        }
        const correct = ex.accepted_answers.some((a) => norm(a) === norm(selected.dataset.opt));
        graded = true;
        optBtns.forEach((x) => {
          const isAnswer = ex.accepted_answers.some((a) => norm(a) === norm(x.dataset.opt));
          if (isAnswer) { x.classList.add("correct"); x.textContent = "✓ " + x.dataset.opt; }
          else if (x === selected) { x.classList.add("wrong"); x.textContent = "✗ " + x.dataset.opt; }
          x.disabled = true;
        });
        checkBtn.disabled = true;
        if (retryBtn) retryBtn.hidden = false;
        grade(correct);
      };
      if (retryBtn) retryBtn.onclick = () => {
        graded = false; selected = null;
        optBtns.forEach((x) => {
          x.disabled = false;
          x.classList.remove("selected", "correct", "wrong");
          x.setAttribute("aria-pressed", "false");
          x.textContent = x.dataset.opt;
        });
        checkBtn.disabled = false;
        retryBtn.hidden = true;
        fb().innerHTML = "";
      };
    }
    if (ex.type === "fill") {
      const input = document.getElementById("fill-" + ex.id);
      const fillBtn = secEl.querySelector("[data-fill]");
      // Khóa sau lần Kiểm tra đầu như choice: chấm lại chỉ khi đã bấm
      // "Làm lại" (Q-1 trong docs/reviews/qa-std1.md).
      let graded = false;
      const doGrade = () => {
        if (graded) return;
        graded = true;
        const v = input.value;
        const correct = ex.accepted_answers.some((a) => norm(a) === norm(v));
        input.classList.toggle("input-ok", correct);
        input.classList.toggle("input-bad", !correct);
        input.setAttribute("aria-invalid", String(!correct));
        input.disabled = true;
        if (fillBtn) fillBtn.disabled = true;
        if (retryBtn) retryBtn.hidden = false;
        grade(correct, correct ? "" : `Đáp án đúng: <span class="zh">${esc(ex.accepted_answers[0] || "")}</span>.`);
      };
      if (fillBtn) fillBtn.onclick = doGrade;
      if (input) input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); doGrade(); } });
      if (retryBtn) retryBtn.onclick = () => {
        graded = false;
        input.value = "";
        input.disabled = false;
        if (fillBtn) fillBtn.disabled = false;
        input.classList.remove("input-ok", "input-bad");
        input.removeAttribute("aria-invalid");
        retryBtn.hidden = true;
        fb().innerHTML = "";
        input.focus();
      };
    }
    if (ex.type === "order") {
      // Mỗi khối có data-idx riêng nên token trùng vẫn xử lý đúng: trạng
      // thái "đã dùng" tính theo idx, không theo nội dung khối.
      const pickEl = document.getElementById("order-pick-" + ex.id);
      const builtEl = document.getElementById("order-built-" + ex.id);
      let built = [];
      // Khóa sau lần Kiểm tra đầu như choice: chỉ "Làm lại" mới mở lại
      // (Q-1 trong docs/reviews/qa-std1.md).
      let graded = false;
      const renderBuilt = () => {
        builtEl.innerHTML = built.length
          ? built.map((b, pos) => `<button type="button" class="token built-chip" data-pos="${pos}"${graded ? " disabled" : ""}>${esc(b.tok)}</button>`).join("")
          : `<span class="note">(chưa xếp khối nào — bấm vào khối ở trên để xếp)</span>`;
        builtEl.querySelectorAll("[data-pos]").forEach((chip) => {
          chip.onclick = () => {
            if (graded) return;
            const pos = Number(chip.dataset.pos);
            built.splice(pos, 1);
            renderBuilt();
          };
        });
        pickEl.querySelectorAll(".token").forEach((src) => {
          const used = built.some((b) => b.idx === Number(src.dataset.idx));
          src.disabled = graded || used;
          src.classList.toggle("used", used);
        });
      };
      pickEl.querySelectorAll(".token").forEach((btn) => {
        btn.onclick = () => {
          if (graded) return;
          const idx = Number(btn.dataset.idx);
          if (built.some((b) => b.idx === idx)) return;
          built.push({ idx, tok: btn.dataset.tok });
          renderBuilt();
        };
      });
      renderBuilt();
      const orderBtn = secEl.querySelector("[data-order]");
      if (orderBtn) orderBtn.onclick = () => {
        if (graded) return;
        graded = true;
        orderBtn.disabled = true;
        renderBuilt();
        const seq = built.map((b) => b.tok);
        const correct = ex.accepted_answers.some((a) => JSON.stringify(a) === JSON.stringify(seq));
        grade(correct, correct ? "" : `Đáp án đúng: <span class="zh">${esc((ex.accepted_answers[0] || []).join(""))}</span>.`);
      };
      const clearBtn = secEl.querySelector("[data-clear-order]");
      if (clearBtn) clearBtn.onclick = () => {
        graded = false;
        built = [];
        if (orderBtn) orderBtn.disabled = false;
        renderBuilt();
        fb().innerHTML = "";
      };
    }
    const hintBtn = secEl.querySelector("[data-hint]");
    if (hintBtn) hintBtn.onclick = () => {
      progress.hints[ex.id] = true; saveProgress();
      const hint = ex.payload && ex.payload.hint_vi ? String(ex.payload.hint_vi) : "";
      const box = document.getElementById("hint-" + ex.id);
      if (box) box.innerHTML = `<div class="feedback" role="status">${hint ? `Gợi ý: ${esc(hint)}` : "Bài này không có gợi ý riêng — hãy xem lại mục B. Cách đặt câu ở trên."} (Đã ghi nhận: bạn đã xem gợi ý.)</div>`;
    };
  });
}

function renderReview() {
  const app = document.getElementById("app");
  const now = new Date();
  const queue = SRS.dueCards(progress, lessons, now);
  const due = queue.filter((q) => q.isDue);
  const upcoming = queue.filter((q) => !q.isDue);
  const limit = progress.reviewLimit || 20;
  const shown = due.slice(0, limit);
  if (reviewSessionTotal === null) reviewSessionTotal = due.length;
  const wrong = lessons.filter((l) => l.exercises.some((ex) => progress.attempts[ex.id] && !progress.attempts[ex.id].lastCorrect));
  const history = [...(progress.events || [])].slice(-10).reverse();
  app.innerHTML = `<h2>Ôn lại theo FSRS</h2>
    ${lastReviewNote ? `<div class="feedback ok">${esc(lastReviewNote)}</div>` : ""}
    <p class="note">Lịch ôn do thư viện <strong>ts-fsrs 5.4.2</strong> tính, không phải công thức tự chế. Mốc thời gian lưu UTC; “hôm nay” theo múi giờ thiết bị của bạn. Mỗi thẻ là một bài đã hoàn thành. Cách ôn: tự nhớ lại công thức trước, bấm “Hiện công thức để đối chiếu”, rồi mới tự đánh giá mức nhớ — các nút đánh giá chỉ mở sau khi đã đối chiếu. Đây là tự đánh giá nhớ lại, không phải máy chấm bài tập. Học bài mới không bị khóa dù còn thẻ đến hạn.</p>
    <div class="card">
      <p><strong>Đã ôn trong phiên này: ${reviewSessionDone} / ${reviewSessionTotal}</strong> thẻ đến hạn lúc vào trang.</p>
      <label for="reviewLimit">Giới hạn số thẻ ôn mỗi ngày (có thể chỉnh)</label>
      <input id="reviewLimit" type="number" min="1" max="100" value="${limit}">
      <p class="note">Đến hạn: ${due.length} thẻ · Hiển thị: ${shown.length} · Còn lại sau giới hạn: ${Math.max(0, due.length - shown.length)}</p>
    </div>
    <section class="card"><h3>Đến hạn ôn (${shown.length})</h3>
      ${shown.length ? shown.map((q) => `
        <div class="card" id="review-${q.lesson.id}">
          <h4><a href="#/lesson/${q.lesson.id}">${esc(q.lesson.title_vi)}</a></h4>
          <p>Trạng thái thẻ: ${esc(SRS.STATE_LABELS[q.serialized ? q.serialized.state : SRS.State.New] || "")} · Lần ôn trước: ${q.serialized && q.serialized.last_review ? new Date(q.serialized.last_review).toLocaleString("vi-VN") : "chưa ôn"}</p>
          <p>Hãy tự nhớ lại công thức này và tự nói một câu dùng nó, rồi mới đối chiếu:</p>
          <p><button type="button" class="secondary" data-reveal="${q.lesson.id}">Hiện công thức để đối chiếu</button></p>
          <div id="reveal-${q.lesson.id}" style="display:none"><p class="zh">${esc(q.lesson.pattern)}</p>${q.lesson.quick_memory ? `<p><strong>Nhớ nhanh:</strong> ${esc(q.lesson.quick_memory)}</p>` : `<p>${esc(q.lesson.objective)}</p>`}</div>
          <p>Tự đánh giá mức nhớ của bạn:</p>
          <p class="btn-row">${[SRS.Rating.Again, SRS.Rating.Hard, SRS.Rating.Good, SRS.Rating.Easy].map((r) => `<button type="button" data-rate="${q.lesson.id}:${r}" disabled>${esc(RATING_LABELS_VI[r])}</button>`).join("")}</p>
          <div id="rated-${q.lesson.id}"></div>
        </div>`).join("") : "<p>Không có thẻ nào đến hạn. Hãy học thêm bài mới, hoặc quay lại khi có thẻ đến hạn.</p>"}
    </section>
    <section class="card"><h3>Sắp đến hạn (${upcoming.length})</h3>
      ${upcoming.length ? upcoming.map((q) => `<p><a href="#/lesson/${q.lesson.id}">${esc(q.lesson.title_vi)}</a> — ${esc(SRS.formatDue(q.due, now))} · ${esc(SRS.STATE_LABELS[q.serialized.state] || "")}</p>`).join("") : "<p>Chưa có thẻ sắp đến hạn.</p>"}
    </section>
    <section class="card"><h3>Lịch sử ôn gần nhất</h3>
      ${history.length ? history.map((e) => `<p>${esc((lessonById(e.card_id) || {}).title_vi || e.card_id)} — ${esc(ratingLabelVi(e))} · ${new Date(e.review).toLocaleString("vi-VN")} · Hạn tiếp theo: ${e.due_after ? new Date(e.due_after).toLocaleString("vi-VN") : ""}</p>`).join("") : "<p>Chưa có lần ôn FSRS nào.</p>"}
    </section>
    <section class="card"><h3>Bài từng làm sai gần nhất (không phải thẻ FSRS)</h3>${wrong.length ? wrong.map((l) => `<p><a href="#/lesson/${l.id}">${esc(l.title_vi)}</a></p>`).join("") : "<p>Chưa có bài nào làm sai — tốt lắm.</p>"}</section>`;
  const limitInput = document.getElementById("reviewLimit");
  if (limitInput) limitInput.onchange = () => {
    const v = Math.max(1, Math.min(100, parseInt(limitInput.value, 10) || 20));
    progress.reviewLimit = v; saveProgress(); render();
  };
  document.querySelectorAll("[data-reveal]").forEach((b) => {
    b.onclick = () => {
      const el = document.getElementById("reveal-" + b.dataset.reveal);
      if (el) el.style.display = "block";
      // Chỉ mở các nút tự đánh giá của thẻ này sau khi đã đối chiếu.
      document.querySelectorAll(`[data-rate^="${b.dataset.reveal}:"]`).forEach((rb) => { rb.disabled = false; });
      b.disabled = true;
    };
  });
  document.querySelectorAll("[data-rate]").forEach((b) => {
    b.onclick = () => {
      const [lessonId, ratingStr] = b.dataset.rate.split(":");
      const rating = Number(ratingStr);
      const result = SRS.applyReview(progress, lessonId, rating, new Date());
      const box = document.getElementById("rated-" + lessonId);
      if (!result.applied) {
        if (box) box.innerHTML = `<div class="feedback">Lần ôn này đã được ghi rồi (chống ghi trùng theo event_id) nên không tính thêm.</div>`;
        return;
      }
      progress.cards = result.cards; progress.events = result.events; saveProgress();
      reviewSessionDone += 1;
      // Render lại ngay để thẻ vừa ôn rời khỏi "Đến hạn", vào "Sắp đến hạn"
      // và lịch sử cập nhật tức thì (không cần tải lại trang như trước P09).
      lastReviewNote = `Đã ghi: ${RATING_LABELS_VI[rating] || ratingLabelVi(result.event)}. Hạn tiếp theo: ${new Date(result.card.due).toLocaleString("vi-VN")}.`;
      render();
      // Cuộn tới thẻ đến hạn tiếp theo để người học không mất vị trí.
      const nextCard = document.querySelector("[id^='review-']");
      if (nextCard) nextCard.scrollIntoView({ block: "start" });
    };
  });
  // HTML đã xây xong từ lastReviewNote, giờ xóa để lần vào Ôn lại sau
  // không hiện lại thông báo cũ.
  lastReviewNote = "";
}

function renderAbout() {
  document.getElementById("app").innerHTML = `<h2>Giới thiệu &amp; giới hạn</h2>
    <div class="card"><p>Hanngu Grammar giúp người Việt học cách dùng ngữ pháp tiếng Trung: hiểu ý nghĩa, biết lúc nào dùng, đặt thành phần đúng vị trí, phân biệt cách dùng dễ nhầm và tự tạo câu mới.</p>
    <p><strong>Luyện nói bản cốt lõi đã có trong mỗi bài:</strong> nghe mẫu, thu âm, nghe lại, đọc đuổi và tự nói theo tình huống. Bản thu chỉ ở trong trang, không lưu, không gửi đi và <strong>không được chấm điểm tự động</strong>.</p>
    <p><strong>Ôn tập FSRS đã có:</strong> trang Ôn lại dùng thư viện ts-fsrs 5.4.2, một thẻ cho mỗi bài đã hoàn thành, 4 mức tự đánh giá (Quên rồi / Khó / Nhớ được / Dễ dàng), lịch sử event có event_id chống ghi trùng, xuất/nhập tiến trình phiên bản 2.</p>
    <p><strong>Chưa có:</strong> chấm phát âm chuyên sâu, phân tích cú pháp câu bất kỳ, chatbot gia sư, đồng bộ đa thiết bị, đăng nhập, đề thi mô phỏng đầy đủ, audio thu sẵn. Những mục này nằm trong backlog, không có nút giả vờ đã làm.</p>
    <p><strong>Nguồn:</strong> bài mẫu tham khảo Chinese Grammar Wiki (CC BY-NC-SA 3.0) và ghi nguồn trong từng bài. Baseline phạm vi HSK1–6 (1.0-official-scope) đã khóa theo đề cương thi HSK 11/2025; ánh xạ điểm vi mô tiếp tục đối chiếu theo từng lô. Quyền phân phối tài liệu gốc chưa xác minh nên app không sao chép tài liệu gốc — xem <code>docs/curriculum-baseline.json</code> và <code>docs/decisions.md</code> (D15, D16).</p>
    <p><strong>Riêng tư:</strong> không tài khoản, không gửi tiến trình lên máy chủ. Dữ liệu chỉ ở localStorage trên thiết bị của bạn và có thể xuất/nhập.</p></div>`;
}

function renderLoadFailure() {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="banner banner-error" role="alert">
    <h2>Không tải được bài học</h2>
    <p>Đã xảy ra lỗi khi tải dữ liệu bài học. Hãy kiểm tra kết nối mạng rồi thử lại.</p>
    <p><button type="button" id="reloadBtn">Tải lại trang</button></p>
  </div>`;
  document.getElementById("reloadBtn").onclick = () => location.reload();
  injectProgressBanner();
  renderDebug();
}

// Banner cảnh báo tiến trình hỏng: chèn vào đầu #app ở MỌI trang (không
// chỉ trang chủ) khi cờ progressNotice đang bật. Nút "Đã hiểu" tắt vĩnh
// viễn trong phiên vì progressNotice chỉ đặt một lần lúc khởi động.
function injectProgressBanner() {
  if (!progressNotice) return;
  const app = document.getElementById("app");
  if (!app || document.getElementById("progressBanner")) return;
  const div = document.createElement("div");
  div.id = "progressBanner";
  div.className = "banner banner-warn";
  div.setAttribute("role", "alert");
  div.innerHTML = `<p>${esc(progressNotice)}</p><p><button type="button" class="secondary" id="dismissProgressNotice">Đã hiểu</button></p>`;
  app.prepend(div);
  document.getElementById("dismissProgressNotice").onclick = () => { progressNotice = ""; render(); };
}

function injectLoadBanner() {
  if (!loadErrorInfo) return;
  const app = document.getElementById("app");
  if (!app || document.getElementById("loadBanner")) return;
  const div = document.createElement("div");
  div.id = "loadBanner";
  div.className = "banner banner-error";
  div.setAttribute("role", "alert");
  div.innerHTML = `<p>⚠ Tải thiếu ${loadErrorInfo.missing} phần dữ liệu bài học — một số bài có thể chưa hiển thị.</p><p><button type="button" id="retryLoadBtn">Thử tải lại</button></p>`;
  app.prepend(div);
  document.getElementById("retryLoadBtn").onclick = retryLoad;
}

async function retryLoad() {
  setLiveStatus("Đang tải lại dữ liệu bài học…");
  try {
    await loadLessons();
    loadFailed = false;
    setLiveStatus("Đã tải lại dữ liệu bài học.");
    render();
  } catch (e) {
    loadFailed = true;
    renderLoadFailure();
  }
}

function render() {
  stopSpeak();
  if (loadFailed) { renderLoadFailure(); return; }
  const hash = location.hash || "#/";
  if (!hash.startsWith("#/review")) { reviewSessionTotal = null; reviewSessionDone = 0; }
  if (hash.startsWith("#/lesson/")) renderLesson(hash.split("/")[2].split("?")[0]);
  else if (hash.startsWith("#/review")) renderReview();
  else if (hash.startsWith("#/about")) renderAbout();
  else renderHome();
  injectProgressBanner();
  injectLoadBanner();
  renderDebug();
}

// Phiên bản build: đổi mỗi lần phát hành để URL dữ liệu không bị dùng lại
// bản cũ từ bộ nhớ đệm sau khi app.js mới đã chạy. Lưu ý: tham số này chỉ
// có tác dụng khi app.js mới đã được tải; nó không chữa được app.js cũ
// còn trong bộ nhớ đệm (xem docs/decisions.md D20).
const BUILD_VERSION = "20261030-std2";
const DEBUG = new URLSearchParams(location.search).get("debug") === "1";
let debugInfo = null;

function renderDebug() {
  if (!DEBUG || !debugInfo) return;
  const app = document.getElementById("app");
  if (!app || document.getElementById("debug-panel")) return;
  const sec = document.createElement("section");
  sec.id = "debug-panel";
  const rows = debugInfo.sources.map((s) =>
    `<li>${esc(s.url)} — trạng thái: ${esc(String(s.status))}, số bài: ${s.count ?? "—"}${s.error ? `, lỗi: ${esc(s.error)}` : ""}</li>`).join("");
  sec.innerHTML = `<h2>Chẩn đoán tải dữ liệu (chỉ hiện khi ?debug=1)</h2>
    <p>Phiên bản build: ${esc(debugInfo.build)} · Script: ${esc(debugInfo.scriptUrl)} · Service worker: ${esc(debugInfo.swState)} · Cache Storage: ${esc(debugInfo.cacheNames)} · Giọng zh-CN: ${esc(debugInfo.zhVoices)}</p>
    <p>Tổng số bài đã tải: ${debugInfo.totalLoaded} · Sau khi lọc published: ${debugInfo.publishedCount} · Số bài đã hoàn thành (chỉ số lượng): ${debugInfo.completedCount}</p>
    <ul>${rows}</ul>
    <p>Không hiển thị bí mật hay dữ liệu cá nhân trong bảng này.</p>`;
  app.prepend(sec);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistration().then((r) => {
      const el = sec.querySelector("p");
      if (el && r) el.textContent += " · SW đã đăng ký.";
    }).catch(() => {});
    if ("caches" in window) {
      caches.keys().then((names) => {
        const el = sec.querySelector("p");
        if (el) el.textContent = el.textContent.replace(/Cache Storage: [^·]*/, "Cache Storage: " + (names.length ? names.join(", ") : "trống"));
      }).catch(() => {});
    }
  }
  const updateVoices = () => {
    if (!("speechSynthesis" in window)) return;
    const el = sec.querySelector("p");
    if (!el) return;
    // Phân biệt "chưa tải xong danh sách giọng" với "đã tải xong nhưng
    // không có giọng zh": danh sách rỗng lúc đầu chưa kết luận được gì.
    const txt = !voicesReady
      ? "đang tải danh sách giọng…"
      : (zhVoicesList.length ? zhVoicesList.map((v) => v.name + " (" + v.lang + ")").join(", ") : "không tìm thấy giọng zh");
    el.textContent = el.textContent.replace(/Giọng zh-CN: [^·]*/, "Giọng zh-CN: " + txt);
  };
  if ("speechSynthesis" in window) {
    updateVoices();
    window.__updateDebugVoices = updateVoices;
  }
}

async function loadLessons() {
  const sources = [];
  let failedShards = 0;
  const manifestUrl = `data/lessons-manifest.json?v=${BUILD_VERSION}`;
  try {
    const mr = await fetch(manifestUrl);
    if (!mr.ok) throw new Error("HTTP " + mr.status);
    const m = await mr.json();
    sources.push({ url: manifestUrl, status: mr.status, count: (m.shards || []).length, error: null });
    const all = [];
    for (const s of (m.shards || [])) {
      const url = `${s}?v=${BUILD_VERSION}`;
      try {
        const r = await fetch(url);
        if (!r.ok) throw new Error("HTTP " + r.status);
        const shard = await r.json();
        sources.push({ url, status: r.status, count: (shard.lessons || []).length, error: null });
        all.push(...(shard.lessons || []));
      } catch (e) {
        failedShards += 1;
        sources.push({ url, status: "lỗi", count: null, error: String(e && e.message ? e.message : e) });
      }
    }
    const scriptEl = document.querySelector('script[src*="app.js"]');
    debugInfo = {
      build: BUILD_VERSION,
      scriptUrl: scriptEl ? scriptEl.getAttribute("src") : "app.js",
      swState: ("serviceWorker" in navigator) ? (navigator.serviceWorker.controller ? "đang điều khiển trang" : "không điều khiển trang") : "trình duyệt không hỗ trợ",
      cacheNames: ("caches" in window) ? "đang kiểm tra…" : "không hỗ trợ",
      zhVoices: ("speechSynthesis" in window) ? "đang kiểm tra…" : "không hỗ trợ TTS",
      totalLoaded: all.length,
      publishedCount: all.filter((l) => l.status === "published").length,
      completedCount: progress.completedLessons.length,
      sources,
    };
    lessons = all.filter((l) => l.status === "published");
    // Lỗi từng phần không còn bị nuốt im lặng: render() sẽ chèn banner
    // role="alert" kèm nút thử tải lại ở đầu trang.
    loadErrorInfo = failedShards > 0 ? { missing: failedShards } : null;
  } catch (e) {
    debugInfo = {
      build: BUILD_VERSION, scriptUrl: "app.js", swState: "không rõ", cacheNames: "không rõ", zhVoices: "không rõ",
      totalLoaded: 0, publishedCount: 0, completedCount: progress.completedLessons.length,
      sources: [{ url: manifestUrl, status: "lỗi", count: null, error: String(e && e.message ? e.message : e) }],
    };
    throw e;
  }
}

window.addEventListener("hashchange", () => { render(); });
loadLessons().then(() => {
  render();
}).catch(() => {
  loadFailed = true;
  renderLoadFailure();
});
