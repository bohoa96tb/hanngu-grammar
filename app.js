// Hanngu Grammar — app tĩnh, không framework.
// Tiến trình chỉ lưu ở localStorage của trình duyệt này. Không gửi dữ liệu ra ngoài.
// Lịch ôn dùng thư viện ts-fsrs 5.4.2 qua srs.mjs (không phải công thức tự chế).
import * as SRS from "./srs.mjs";
const LS_KEY = "hanngu-progress-v2";
const OLD_LS_KEY = "hanngu-progress-v1";
let lessons = [];
let progress = loadProgress();
let showPinyin = false;
let speechRate = 1;
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
  try {
    const raw = localStorage.getItem(LS_KEY) || localStorage.getItem(OLD_LS_KEY);
    if (!raw) return emptyProgressV2();
    const p = JSON.parse(raw);
    if (p.version !== 1 && p.version !== 2) throw new Error("Phiên bản tiến trình không khớp");
    return migrateProgress(p);
  } catch (e) {
    return emptyProgressV2();
  }
}
function saveProgress() { localStorage.setItem(LS_KEY, JSON.stringify(progress)); }
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function norm(s) { return String(s).replace(/[\s。，、；：？！·…「」『』（）《》"'.?!]/g, ""); }

function speak(text) {
  if (!("speechSynthesis" in window)) { alert("Trình duyệt này không hỗ trợ đọc giọng tổng hợp."); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN"; u.rate = speechRate;
  window.speechSynthesis.speak(u);
}
function stopSpeak() { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }

function lessonById(id) { return lessons.find((l) => l.id === id); }

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
  app.innerHTML = `
    <h2>Danh mục bài học</h2>
    <p class="note">Bản thử nghiệm: ${lessons.length} bài mẫu. Tìm kiếm mở được bài trực tiếp; không cần học hết bài ôn mới được học bài mới.</p>
    <div class="card">
      <label for="q">Tìm kiếm (tiếng Việt, chữ Hán hoặc công thức)</label>
      <input id="q" type="search" value="${esc(params.get("q") || "")}" placeholder="Ví dụ: 比, so sánh, 是">
      <div class="filters" role="group" aria-label="Lọc theo cấp">
        ${["all", "1", "2", "3", "4", "5", "6"].map((lv) => `<button class="${level === lv ? "" : "secondary"}" data-level="${lv}">${lv === "all" ? "Tất cả" : "HSK " + lv}</button>`).join("")}
      </div>
      <button id="searchBtn">Tìm</button>
    </div>
    ${filtered.length ? filtered.map((l) => `
      <article class="card">
        <h3><a href="#/lesson/${l.id}">${esc(l.title_vi)}</a></h3>
        <p>HSK ${l.hsk_level} (tạm thời) · Độ khó: ${l.difficulty === "easy" ? "Dễ" : l.difficulty === "medium" ? "Trung bình" : "Khó"} · ${l.examples.length} ví dụ · ${l.exercises.length} bài tập ${progress.completedLessons.includes(l.id) ? "· ✓ Đã hoàn thành" : ""}</p>
        <p><span class="zh">${esc(l.pattern)}</span></p>
        <p>${esc(l.objective)}</p>
      </article>`).join("") : "<p>Không tìm thấy bài phù hợp. Thử từ khác.</p>"}
    <div class="card">
      <h3>Tiến trình của bạn (chỉ trên thiết bị này)</h3>
      <p>Đã hoàn thành ${progress.completedLessons.length}/${lessons.length} bài mẫu.</p>
      <button id="exportBtn" class="secondary">Xuất tiến trình (JSON)</button>
      <label for="importFile">Nhập tiến trình (sẽ hỏi xác nhận trước khi ghi đè)</label>
      <input id="importFile" type="file" accept=".json,application/json">
      <p class="note">Ôn tập dùng thư viện FSRS thật (ts-fsrs 5.4.2, xem trang Ôn lại). Mốc thời gian lưu UTC (ISO); “hôm nay” tính theo múi giờ của thiết bị bạn.</p>
    </div>`;
  document.getElementById("searchBtn").onclick = () => {
    const v = document.getElementById("q").value;
    location.hash = `#/?level=${level}&q=${encodeURIComponent(v)}`;
  };
  document.querySelectorAll("[data-level]").forEach((b) => {
    b.onclick = () => { location.hash = `#/?level=${b.dataset.level}&q=${encodeURIComponent(params.get("q") || "")}`; };
  });
  document.getElementById("exportBtn").onclick = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "hanngu-progress-v2.json"; a.click();
  };
  document.getElementById("importFile").onchange = async (ev) => {
    const file = ev.target.files[0]; if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if ((data.version !== 1 && data.version !== 2) || !Array.isArray(data.completedLessons)) throw new Error("Định dạng không khớp (cần version 1 hoặc 2)");
      if (data.version === 2 && data.cards && typeof data.cards !== "object") throw new Error("Trường cards không hợp lệ");
      if (data.version === 2 && data.events && !Array.isArray(data.events)) throw new Error("Trường events không hợp lệ");
      if (confirm("Ghi đè toàn bộ tiến trình hiện tại bằng file đã nhập?")) { progress = migrateProgress(data); progress.fsrsVersion = SRS.FSRS_VERSION; saveProgress(); render(); }
    } catch (e) { alert("Không nhập được: " + e.message); }
  };
}

function exerciseHTML(les, ex, idx) {
  const done = progress.attempts[ex.id];
  let body = "";
  if (ex.type === "choice" || ex.type === "error_spot") {
    const opts = ex.type === "choice" ? ex.payload.options : ex.payload.options;
    body = opts.map((o) => `<button class="secondary" data-opt="${esc(o)}">${esc(o)}</button>`).join(" ");
    if (ex.type === "error_spot") body = `<p class="zh">${esc(ex.payload.sentence_zh)}</p><p>Chọn khối sai:</p>` + body;
  } else if (ex.type === "fill") {
    body = `${ex.prompt_zh ? `<p class="zh">${esc(ex.prompt_zh)}</p>` : ""}<input type="text" id="fill-${ex.id}" placeholder="Viết bằng chữ Hán" aria-label="Đáp án"> <button data-fill="${ex.id}">Chấm</button>`;
  } else if (ex.type === "order") {
    body = `<p>Chạm vào khối để xếp, chạm lại khối đã chọn để bỏ ra:</p>
      <div id="order-pick-${ex.id}">${ex.payload.tokens.map((t) => `<span class="token" data-tok="${esc(t)}">${esc(t)}</span>`).join("")}</div>
      <p>Câu của bạn: <span id="order-built-${ex.id}" class="zh"></span></p>
      <button data-order="${ex.id}">Chấm</button>`;
  }
  return `<section class="card" id="ex-${ex.id}">
    <h3>Bài ${idx + 1}</h3><p>${esc(ex.prompt_vi)}</p>${body}
    <p><button class="secondary" data-hint="${ex.id}">Xin gợi ý (sẽ ghi nhận là đã xem gợi ý)</button></p>
    <div id="fb-${ex.id}">${done ? `<div class="feedback ${done.lastCorrect ? "" : "bad"}">Lần làm gần nhất: ${done.lastCorrect ? "Đúng" : "Chưa đúng"} — ${esc(ex.explanation)}</div>` : ""}</div>
  </section>`;
}

function renderLesson(id) {
  const les = lessonById(id);
  const app = document.getElementById("app");
  if (!les) { app.innerHTML = "<p>Không tìm thấy bài học.</p><p><a href='#/'>Về danh mục</a></p>"; return; }
  app.innerHTML = `
    <p><a href="#/">← Danh mục</a></p>
    <h2>${esc(les.title_vi)}</h2>
    <p>HSK ${les.hsk_level} (tạm thời) · Độ khó sư phạm: ${les.difficulty} · Phiên bản nội dung: ${les.content_version}</p>
    <section class="card"><h3>Mục tiêu</h3><p>${esc(les.objective)}</p></section>
    <section class="card"><h3>Khi nào dùng</h3><p>${esc(les.when_to_use)}</p></section>
    <section class="card"><h3>Cách đặt câu</h3><p class="zh">${esc(les.pattern)}</p><p>${esc(les.formula_notes)}</p></section>
    <section class="card">
      <h3>Ví dụ <button class="secondary" id="pinyinBtn">${showPinyin ? "Ẩn Pinyin" : "Hiện Pinyin"}</button>
      <label>Tốc độ đọc <select id="rateSel"><option value="0.7">0.7×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option></select></label></h3>
      <p class="note">Âm thanh tiếng Trung chỉ đọc câu tiếng Trung; phần giảng tiếng Việt không trộn vào track này. Giọng đọc là giọng tổng hợp của trình duyệt.</p>
      ${les.examples.map((e) => `<div class="card">
        <p class="zh">${esc(e.zh)} <button data-speak="${esc(e.zh)}" aria-label="Nghe câu tiếng Trung">▶ Nghe</button> <button class="secondary" data-stop>■ Dừng</button></p>
        ${showPinyin ? `<p class="pinyin">${esc(e.pinyin || "")}</p>` : ""}
        <p>${esc(e.vi)}</p>
      </div>`).join("")}
    </section>
    <section class="card" id="speak-section">
      <h3>Luyện nói</h3>
      <p>1. Nghe mẫu &nbsp;→&nbsp; 2. Đọc đuổi theo mẫu và thu âm &nbsp;→&nbsp; 3. Nghe lại bản thu, tự đối chiếu với mẫu &nbsp;→&nbsp; 4. Tự nói một câu mới theo tình huống bên dưới.</p>
      <label for="speakSel">Chọn câu mẫu để luyện</label>
      <select id="speakSel">${les.examples.map((e, i) => `<option value="${i}">${esc(e.zh)} — ${esc(e.vi)}</option>`).join("")}</select>
      <p>
        <button id="speakSampleBtn">▶ Nghe mẫu</button>
        <button id="speakRecordBtn">● Thu âm</button>
        <button id="speakStopBtn" class="secondary" disabled>Dừng thu</button>
        <button id="speakPlayBtn" class="secondary" ${speakingBlobUrl ? "" : "disabled"}>▶ Nghe lại bản thu</button>
        <button id="speakClearBtn" class="secondary" ${speakingBlobUrl ? "" : "disabled"}>Xóa bản thu</button>
      </p>
      <p id="speakStatus" class="note">Chưa có bản thu. Bản thu không được chấm điểm tự động và không gửi đi đâu.</p>
      <p><strong>Tự nói theo tình huống:</strong> Dùng công thức <span class="zh">${esc(les.pattern)}</span> để tự nói một câu mới về bản thân (không cần viết ra, có thể thu âm để nghe lại).</p>
      <p class="note">Nếu trình duyệt từ chối microphone hoặc thiết bị không có mic, bạn vẫn học được toàn bộ phần còn lại của bài: nghe mẫu, đọc đuổi không thu âm và tự nói theo tình huống.</p>
    </section>
    ${les.confusions && les.confusions.length ? `<section class="card"><h3>Phân biệt / lưu ý</h3>${les.confusions.map((c) => `<p><strong>${esc(c.wrong_or_risky)}</strong> — ${esc(c.explanation)}</p>`).join("")}</section>` : ""}
    <section><h3>Luyện tập</h3><p class="note">Lời giải chỉ hiện sau khi bạn trả lời, hoặc sau khi bạn chủ động xin gợi ý. Xem gợi ý sẽ được ghi nhận và không tính như nhớ độc lập.</p>
    ${les.exercises.map((ex, i) => exerciseHTML(les, ex, i)).join("")}</section>
    <div class="card">
      <button id="completeBtn">${progress.completedLessons.includes(id) ? "✓ Đã hoàn thành — đánh dấu lại" : "Đánh dấu đã hoàn thành bài này"}</button>
      <button class="secondary" id="reportBtn">Báo lỗi bài học</button>
      <p id="reportText" class="note"></p>
      <p class="note">Nguồn: ${les.sources.map((s) => esc(s.source_id) + " — " + esc(s.note)).join("; ")}. Rà soát: ${esc(les.review ? les.review.reviewer + ", " + les.review.date : "chưa rà soát")}.</p>
    </div>`;
  document.getElementById("pinyinBtn").onclick = () => { showPinyin = !showPinyin; render(); };
  document.getElementById("rateSel").value = String(speechRate);
  document.getElementById("rateSel").onchange = (e) => { speechRate = parseFloat(e.target.value); };
  document.querySelectorAll("[data-speak]").forEach((b) => { b.onclick = () => speak(b.dataset.speak); });
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
  document.getElementById("speakSampleBtn").onclick = () => speak(les.examples[Number(speakSel.value)].zh);
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
        if (speakingBlobUrl) URL.revokeObjectURL(speakingBlobUrl);
        speakingBlobUrl = URL.createObjectURL(new Blob(speakingChunks, { type: speakingRecorder.mimeType || "audio/webm" }));
        playBtn.disabled = false; clearBtn.disabled = false;
        setSpeakStatus("Đã thu xong. Bấm “Nghe lại bản thu” để tự đối chiếu với mẫu — không có chấm điểm tự động.");
      };
      speakingRecorder.start();
      speakingRecording = true;
      recordBtn.disabled = true; stopBtn.disabled = false;
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
  // Chấm bài
  les.exercises.forEach((ex) => {
    const fb = () => document.getElementById("fb-" + ex.id);
    const grade = (correct) => {
      const prev = progress.attempts[ex.id] || { correct: 0, total: 0 };
      progress.attempts[ex.id] = { correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1, lastCorrect: correct, hintUsed: !!progress.hints[ex.id] };
      saveProgress();
      fb().innerHTML = `<div class="feedback ${correct ? "" : "bad"}">${correct ? "Đúng rồi." : "Chưa đúng."} ${esc(ex.explanation)}</div>`;
    };
    document.querySelectorAll(`#ex-${ex.id} [data-opt]`).forEach((b) => {
      b.onclick = () => grade(ex.accepted_answers.some((a) => norm(a) === norm(b.dataset.opt)));
    });
    const fillBtn = document.querySelector(`#ex-${ex.id} [data-fill]`);
    if (fillBtn) fillBtn.onclick = () => {
      const v = document.getElementById("fill-" + ex.id).value;
      grade(ex.accepted_answers.some((a) => norm(a) === norm(v)));
    };
    const orderBtn = document.querySelector(`#ex-${ex.id} [data-order]`);
    if (orderBtn) {
      let built = [];
      const pickEl = document.getElementById("order-pick-" + ex.id);
      const builtEl = document.getElementById("order-built-" + ex.id);
      pickEl.querySelectorAll(".token").forEach((t) => {
        t.onclick = () => {
          const tok = t.dataset.tok;
          if (built.includes(tok) && built.filter((x) => x === tok).length <= pickEl.querySelectorAll(".token").length) {
            // bỏ một lần xuất hiện (đơn giản: bỏ lần cuối)
            const idx = built.lastIndexOf(tok); built.splice(idx, 1);
          } else built.push(tok);
          builtEl.textContent = built.join("");
        };
      });
      orderBtn.onclick = () => grade(ex.accepted_answers.some((a) => JSON.stringify(a) === JSON.stringify(built)));
    }
    const hintBtn = document.querySelector(`#ex-${ex.id} [data-hint]`);
    if (hintBtn) hintBtn.onclick = () => {
      progress.hints[ex.id] = true; saveProgress();
      fb().innerHTML = `<div class="feedback">Gợi ý / lời giải: ${esc(ex.explanation)} (Đã ghi nhận: bạn đã xem gợi ý.)</div>`;
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
  const wrong = lessons.filter((l) => l.exercises.some((ex) => progress.attempts[ex.id] && !progress.attempts[ex.id].lastCorrect));
  const history = [...(progress.events || [])].slice(-10).reverse();
  app.innerHTML = `<h2>Ôn lại theo FSRS</h2>
    ${lastReviewNote ? `<div class="feedback">${esc(lastReviewNote)}</div>` : ""}
    <p class="note">Lịch ôn do thư viện <strong>ts-fsrs 5.4.2</strong> tính, không phải công thức tự chế. Mốc thời gian lưu UTC; “hôm nay” theo múi giờ thiết bị của bạn. Mỗi thẻ là một bài đã hoàn thành. Cách ôn: tự nhớ lại công thức trước, bấm “Hiện công thức để đối chiếu”, rồi tự đánh giá mức nhớ — đây là tự đánh giá nhớ lại, không phải máy chấm bài tập. Học bài mới không bị khóa dù còn thẻ đến hạn.</p>
    <div class="card">
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
          <p><button class="secondary" data-reveal="${q.lesson.id}">Hiện công thức để đối chiếu</button></p>
          <div id="reveal-${q.lesson.id}" style="display:none"><p class="zh">${esc(q.lesson.pattern)}</p><p>${esc(q.lesson.objective)}</p></div>
          <p>Tự đánh giá mức nhớ của bạn:</p>
          <p>${[SRS.Rating.Again, SRS.Rating.Hard, SRS.Rating.Good, SRS.Rating.Easy].map((r) => `<button data-rate="${q.lesson.id}:${r}">${esc(SRS.RATING_LABELS[r])}</button>`).join(" ")}</p>
          <div id="rated-${q.lesson.id}"></div>
        </div>`).join("") : "<p>Không có thẻ nào đến hạn. Hãy học thêm bài mới, hoặc quay lại khi có thẻ đến hạn.</p>"}
    </section>
    <section class="card"><h3>Sắp đến hạn (${upcoming.length})</h3>
      ${upcoming.length ? upcoming.map((q) => `<p><a href="#/lesson/${q.lesson.id}">${esc(q.lesson.title_vi)}</a> — ${esc(SRS.formatDue(q.due, now))} · ${esc(SRS.STATE_LABELS[q.serialized.state] || "")}</p>`).join("") : "<p>Chưa có thẻ sắp đến hạn.</p>"}
    </section>
    <section class="card"><h3>Lịch sử ôn gần nhất</h3>
      ${history.length ? history.map((e) => `<p>${esc((lessonById(e.card_id) || {}).title_vi || e.card_id)} — ${esc(e.rating_label)} · ${new Date(e.review).toLocaleString("vi-VN")} · Hạn tiếp theo: ${e.due_after ? new Date(e.due_after).toLocaleString("vi-VN") : ""}</p>`).join("") : "<p>Chưa có lần ôn FSRS nào.</p>"}
    </section>
    <section class="card"><h3>Bài từng làm sai gần nhất (không phải thẻ FSRS)</h3>${wrong.length ? wrong.map((l) => `<p><a href="#/lesson/${l.id}">${esc(l.title_vi)}</a></p>`).join("") : "<p>Chưa có bài nào làm sai — tốt lắm.</p>"}</section>`;
  const limitInput = document.getElementById("reviewLimit");
  if (limitInput) limitInput.onchange = () => {
    const v = Math.max(1, Math.min(100, parseInt(limitInput.value, 10) || 20));
    progress.reviewLimit = v; saveProgress(); render();
  };
  document.querySelectorAll("[data-reveal]").forEach((b) => {
    b.onclick = () => { const el = document.getElementById("reveal-" + b.dataset.reveal); if (el) el.style.display = "block"; };
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
      // Render lại ngay để thẻ vừa ôn rời khỏi "Đến hạn", vào "Sắp đến hạn"
      // và lịch sử cập nhật tức thì (không cần tải lại trang như trước P09).
      lastReviewNote = `Đã ghi: ${result.event.rating_label}. Hạn tiếp theo: ${new Date(result.card.due).toLocaleString("vi-VN")}.`;
      render();
      return;
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
    <p><strong>Nguồn:</strong> bài mẫu tham khảo Chinese Grammar Wiki (CC BY-NC-SA 3.0) và ghi nguồn trong từng bài. Baseline HSK1–6 toàn diện chưa khóa vì chưa đối chiếu được văn bản đề cương gốc — xem <code>docs/curriculum-baseline.json</code> và <code>docs/decisions.md</code> (D04).</p>
    <p><strong>Riêng tư:</strong> không tài khoản, không gửi tiến trình lên máy chủ. Dữ liệu chỉ ở localStorage trên thiết bị của bạn và có thể xuất/nhập.</p></div>`;
}

function render() {
  stopSpeak();
  const hash = location.hash || "#/";
  if (hash.startsWith("#/lesson/")) renderLesson(hash.split("/")[2].split("?")[0]);
  else if (hash.startsWith("#/review")) renderReview();
  else if (hash.startsWith("#/about")) renderAbout();
  else renderHome();
}

fetch("data/lessons.json").then((r) => r.json()).then((d) => {
  lessons = d.lessons.filter((l) => l.status === "published");
  window.addEventListener("hashchange", render);
  render();
}).catch((e) => {
  document.getElementById("app").innerHTML = "<p>Không tải được dữ liệu bài học. Hãy chạy qua máy chủ tĩnh (ví dụ: <code>python3 -m http.server 8000</code>) thay vì mở file trực tiếp trong một số trình duyệt, rồi tải lại trang.</p>";
});
