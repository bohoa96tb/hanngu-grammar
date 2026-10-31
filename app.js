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
// Một hàng ví dụ (UX pilot 2026-10-31): chữ Hán + MỘT nút nghe/dừng nhỏ
// duy nhất (bấm để nghe, bấm lần nữa để dừng — trạng thái qua class
// .speaking và ký hiệu ▶/■), Pinyin và nghĩa Việt ẩn/hiện theo prefs
// (không vẽ lại trang khi đổi). Không còn nút Dừng riêng chiếm diện tích.
function exampleHTML(e) {
  return `<div class="example">
    <p class="zh example-zh"><span>${esc(e.zh)}</span><button type="button" class="speak-btn" data-speak="${esc(e.zh)}" aria-label="Nghe câu tiếng Trung này">▶</button></p>
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
    btn.textContent = btn.classList.contains("speak-btn") ? "■" : "Đang đọc…";
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

// --- CUR-02 (D28, 2026-10-31): thứ tự giáo trình chính thức ---
// data/curriculum.json là dữ liệu riêng về THỨ TỰ HỌC: levels["1".."6"]
// là danh sách id theo thứ tự học của từng cấp, requires[id] là các bài
// tiên quyết. Số "Bài NN" của một bài = vị trí (1-based) trong danh sách
// của cấp của nó; thứ tự toàn cục = nối các cấp 1→6. ID bài, manifest
// (thứ tự tải) và tiến độ không phụ thuộc vào thứ tự này. Nếu không tải
// được curriculum.json, giao diện FALLBACK về thứ tự manifest (nhóm theo
// cấp của bài) để người học vẫn học bình thường — trạng thái được ghi
// vào debugInfo.curriculumStatus, không hiện banner lỗi mới.
let curriculumData = null;
let curriculumStatus = "chưa tải";
let _orderInfo = null;

function pad2(n) { return String(n).padStart(2, "0"); }

// Bỏ dấu thanh khỏi pinyin (và mọi chuỗi đã lowercase): āáǎà→a … ǖǘǚǜ→ü.
// Dùng chung cho chỉ mục tìm kiếm và truy vấn của người học (G-02), để
// gõ "gao" hay "gāo" đều khớp, gõ tiếng Việt không dấu cũng khớp.
const TONE_MAP = {
  ā: "a", á: "a", ǎ: "a", à: "a", ē: "e", é: "e", ě: "e", è: "e",
  ī: "i", í: "i", ǐ: "i", ì: "i", ō: "o", ó: "o", ǒ: "o", ò: "o",
  ū: "u", ú: "u", ǔ: "u", ù: "u", ǖ: "ü", ǘ: "ü", ǚ: "ü", ǜ: "ü",
  Ā: "a", Á: "a", Ǎ: "a", À: "a", Ē: "e", É: "e", Ě: "e", È: "e",
  Ī: "i", Í: "i", Ǐ: "i", Ì: "i", Ō: "o", Ó: "o", Ǒ: "o", Ò: "o",
  Ū: "u", Ú: "u", Ǔ: "u", Ù: "u", Ǖ: "ü", Ǘ: "ü", Ǚ: "ü", Ǜ: "ü", Ü: "ü",
};
function stripTones(s) {
  return String(s).replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛÜ]/g, (ch) => TONE_MAP[ch] || ch);
}
function normSearch(s) { return stripTones(String(s).toLowerCase()); }

// Bản đồ id -> {level, num, total, gidx}: num là số Bài trong cấp, total
// là số bài published của cấp, gidx là vị trí trong thứ tự toàn cục.
function computeOrderInfo() {
  const info = new Map();
  let g = 0;
  if (curriculumData && curriculumData.levels) {
    for (const lv of [1, 2, 3, 4, 5, 6]) {
      const ids = (curriculumData.levels[String(lv)] || []).filter((id) => lessonById(id));
      ids.forEach((id, idx) => info.set(id, { level: lv, num: idx + 1, total: ids.length, gidx: g++ }));
    }
    // Bài published chưa có trong curriculum (dữ liệu lệch — validator sẽ
    // báo lỗi): xếp nối tiếp cuối cấp của chính bài theo thứ tự manifest
    // để giao diện vẫn chạy, không mất bài khỏi lộ trình.
    const nextNum = {}; const totals = {};
    for (const v of info.values()) { nextNum[v.level] = v.num; totals[v.level] = v.total; }
    for (const l of lessons) {
      if (info.has(l.id)) continue;
      const lv = l.hsk_level;
      const num = (nextNum[lv] || 0) + 1;
      nextNum[lv] = num; totals[lv] = (totals[lv] || 0) + 1;
      info.set(l.id, { level: lv, num, total: 0, gidx: g++ });
    }
    for (const v of info.values()) v.total = totals[v.level] || v.total;
  } else {
    // Fallback: nhóm theo cấp của bài, thứ tự manifest trong cấp.
    for (const lv of [1, 2, 3, 4, 5, 6]) {
      const ls = lessons.filter((l) => l.hsk_level === lv);
      ls.forEach((l, idx) => info.set(l.id, { level: lv, num: idx + 1, total: ls.length, gidx: g++ }));
    }
  }
  return info;
}
function orderInfo() {
  if (!_orderInfo) _orderInfo = computeOrderInfo();
  return _orderInfo;
}
function curriculumOrderedLessons() {
  const info = orderInfo();
  return [...lessons].sort((a, b) => info.get(a.id).gidx - info.get(b.id).gidx);
}
function lessonLabel(l) {
  const oi = orderInfo().get(l.id);
  return oi ? `HSK ${l.hsk_level} · Bài ${pad2(oi.num)}` : `HSK ${l.hsk_level}`;
}
function requiresOf(les) {
  const req = (curriculumData && curriculumData.requires) || {};
  const ids = Array.isArray(req[les.id]) ? req[les.id] : [];
  return ids.map((rid) => lessonById(rid)).filter(Boolean);
}

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
  // UX pilot: "Tiếp tục học" đi theo THỨ TỰ CURRICULUM (không theo thứ
  // tự manifest như trước): bài đang học dở đầu tiên trong lộ trình;
  // nếu không có thì bài chưa hoàn thành đầu tiên trong lộ trình.
  const ordered = curriculumOrderedLessons();
  const inProgress = ordered.find((l) => !progress.completedLessons.includes(l.id)
    && l.exercises.some((ex) => progress.attempts[ex.id]));
  if (inProgress) return inProgress;
  return ordered.find((l) => !progress.completedLessons.includes(l.id)) || null;
}

function renderHome() {
  const app = document.getElementById("app");
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  const level = params.get("level") || "all";
  const statusFilter = params.get("st") || "all";
  // G-02 (CUR-02): truy vấn và chỉ mục đều chuẩn hóa bằng normSearch
  // (lowercase + bỏ dấu thanh) — tìm được bằng chữ Hán, pinyin có dấu
  // hoặc bỏ dấu ("gao"/"gāo"), và tiếng Việt có dấu hoặc không dấu.
  const q = normSearch(params.get("q") || "");
  const lessonStatus = (l) => {
    if (progress.completedLessons.includes(l.id)) return "done";
    return l.exercises.some((ex) => progress.attempts[ex.id]) ? "doing" : "new";
  };
  const filtered = lessons.filter((l) => {
    if (level !== "all" && String(l.hsk_level) !== level) return false;
    if (statusFilter !== "all" && lessonStatus(l) !== statusFilter) return false;
    if (!q) return true;
    const hay = normSearch([l.title_vi, l.pattern, l.objective, l.when_to_use, l.quick_memory || "",
      ...l.examples.map((e) => `${e.zh} ${e.vi} ${e.pinyin || ""}`)].join(" "));
    return hay.includes(q);
  });
  // CUR-02 + UX pilot: danh mục nhóm theo cấp theo thứ tự curriculum,
  // mỗi cấp có thanh tiến độ riêng; hàng bài GỌN (số bài, tên, một dòng
  // mô tả, trạng thái) thay cho thẻ lớn lặp mục tiêu đầy đủ. Đang lọc
  // một cấp thì chỉ hiện cấp đó; đang tìm/lọc thì chỉ hiện cấp còn bài
  // khớp (số Bài NN giữ nguyên số gốc trong cấp, không đánh số lại).
  const info = orderInfo();
  const totalByLevel = {};
  const doneByLevel = {};
  lessons.forEach((l) => {
    totalByLevel[l.hsk_level] = (totalByLevel[l.hsk_level] || 0) + 1;
    if (progress.completedLessons.includes(l.id)) doneByLevel[l.hsk_level] = (doneByLevel[l.hsk_level] || 0) + 1;
  });
  const filtering = q.length > 0 || statusFilter !== "all";
  const visibleLevels = [1, 2, 3, 4, 5, 6].filter((lv) => {
    if (level !== "all") return String(lv) === level;
    if (filtering) return filtered.some((l) => l.hsk_level === lv);
    return true;
  });
  const statusShort = (l) => {
    const st = lessonStatus(l);
    if (st === "done") return `<span class="row-status done">✓ Đã xong</span>`;
    if (st === "doing") {
      const attempted = l.exercises.filter((ex) => progress.attempts[ex.id]).length;
      return `<span class="row-status doing">◐ Đang học ${attempted}/${l.exercises.length}</span>`;
    }
    return `<span class="row-status new">○ Chưa học</span>`;
  };
  const rowHTML = (l) => {
    const oi = info.get(l.id);
    const reqs = requiresOf(l);
    return `
      <article class="card lesson-row">
        <a class="row-main" href="#/lesson/${l.id}">
          <span class="row-num">Bài ${oi ? pad2(oi.num) : ""}</span>
          <span class="row-text">
            <span class="row-title">${esc(l.title_vi)}</span>
            <span class="row-desc">${esc(l.pattern)} · ${esc(l.objective)}</span>
            ${reqs.length ? `<span class="row-req">Cần học trước: ${reqs.map((r) => esc(r.title_vi)).join(", ")}</span>` : ""}
          </span>
          ${statusShort(l)}
        </a>
      </article>`;
  };
  const groupsHTML = visibleLevels.map((lv) => {
    const inLevel = filtered.filter((l) => l.hsk_level === lv)
      .sort((a, b) => info.get(a.id).gidx - info.get(b.id).gidx);
    const total = totalByLevel[lv] || 0;
    const done = doneByLevel[lv] || 0;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const body = inLevel.length ? inLevel.map(rowHTML).join("")
      : `<div class="card"><p>Chưa có bài — đang biên soạn theo đề cương.</p></div>`;
    return `<section class="level-group"><h3>HSK ${lv} <span class="note">(${total} bài)</span></h3>
      <div class="level-progress"><div class="progress-track" role="progressbar" aria-label="Tiến độ HSK ${lv}" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}"><div class="progress-fill" style="width:${pct}%"></div></div><span class="note">${done}/${total} bài đã xong</span></div>
      ${body}</section>`;
  }).join("");
  const cont = continueLesson();
  const totalDone = progress.completedLessons.length;
  const totalPct = lessons.length ? Math.round((totalDone / lessons.length) * 100) : 0;
  let dueCount = 0;
  try { dueCount = SRS.dueCards(progress, lessons, new Date()).filter((x) => x.isDue).length; } catch (e) { dueCount = 0; }
  app.innerHTML = `
    <h2>Danh mục bài học</h2>
    <section class="card continue-card">
      <div class="continue-head"><h3>Tiếp tục học</h3><span class="note">Đã xong ${totalDone}/${lessons.length} bài</span></div>
      <div class="progress-track" role="progressbar" aria-label="Tiến độ toàn bộ" aria-valuemin="0" aria-valuemax="${lessons.length}" aria-valuenow="${totalDone}"><div class="progress-fill" style="width:${totalPct}%"></div></div>
      ${cont ? `<p class="continue-next"><a href="#/lesson/${cont.id}"><strong>${esc(lessonLabel(cont))} — ${esc(cont.title_vi)}</strong></a></p>
      <p><a class="btn-link" href="#/lesson/${cont.id}">Học tiếp bài này</a></p>` : `<p>✓ Bạn đã hoàn thành tất cả bài hiện có.</p>`}
      ${dueCount > 0 ? `<p>Số thẻ đến hạn ôn: <strong>${dueCount}</strong> — <a href="#/review">Đi ôn ngay</a></p>` : `<p class="note">Chưa có thẻ nào đến hạn ôn.</p>`}
    </section>
    <form class="card search-card" id="searchForm" role="search">
      <label for="q">Tìm kiếm (chữ Hán, Pinyin hoặc tiếng Việt)</label>
      <input id="q" type="search" value="${esc(params.get("q") || "")}" placeholder="Ví dụ: 比, bi, gao, so sánh">
      <div class="filters btn-row" role="group" aria-label="Lọc theo cấp">
        ${["all", "1", "2", "3", "4", "5", "6"].map((lv) => `<button type="button" class="${level === lv ? "" : "secondary"}" data-level="${lv}" aria-pressed="${level === lv}">${lv === "all" ? "Tất cả" : "HSK " + lv}</button>`).join("")}
      </div>
      <div class="btn-row">
        <label for="statusSel">Trạng thái
          <select id="statusSel">
            <option value="all" ${statusFilter === "all" ? "selected" : ""}>Tất cả</option>
            <option value="new" ${statusFilter === "new" ? "selected" : ""}>Chưa học</option>
            <option value="doing" ${statusFilter === "doing" ? "selected" : ""}>Đang học</option>
            <option value="done" ${statusFilter === "done" ? "selected" : ""}>Đã xong</option>
          </select>
        </label>
        <button type="submit" id="searchBtn">Tìm</button>
      </div>
    </form>
    ${filtered.length ? groupsHTML : `<div class="card"><p>Không tìm thấy bài phù hợp với bộ lọc hiện tại. Thử từ khác hoặc xóa bộ lọc.</p><p><button type="button" class="secondary" id="clearFiltersBtn">Xóa bộ lọc</button></p></div>`}
    <details class="card">
      <summary><strong>Dữ liệu tiến trình (chỉ trên thiết bị này)</strong></summary>
      <p>Đã hoàn thành ${progress.completedLessons.length}/${lessons.length} bài mẫu.</p>
      <button type="button" id="exportBtn" class="secondary">Xuất tiến trình (JSON)</button>
      <label for="importFile">Nhập tiến trình (sẽ hỏi xác nhận trước khi ghi đè)</label>
      <input id="importFile" type="file" accept=".json,application/json">
      <div id="importMsg"></div>
      <p class="note">Ôn tập dùng thư viện FSRS thật (ts-fsrs 5.4.2, xem trang Ôn lại). Mốc thời gian lưu UTC (ISO); “hôm nay” tính theo múi giờ của thiết bị bạn.</p>
    </details>`;
  const goSearch = () => {
    const v = document.getElementById("q").value;
    const st = document.getElementById("statusSel").value;
    location.hash = `#/?level=${level}&st=${st}&q=${encodeURIComponent(v)}`;
    if ((params.get("q") || "") === v && (params.get("st") || "all") === st) render();
  };
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", (ev) => { ev.preventDefault(); goSearch(); });
  document.getElementById("statusSel").onchange = goSearch;
  document.querySelectorAll("[data-level]").forEach((b) => {
    b.onclick = () => {
      const v = document.getElementById("q").value;
      const st = document.getElementById("statusSel").value;
      location.hash = `#/?level=${b.dataset.level}&st=${st}&q=${encodeURIComponent(v)}`;
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
  let body = "";
  if (ex.type === "choice" || ex.type === "error_spot") {
    if (ex.type === "error_spot") body += `<p class="zh">${esc(payload.sentence_zh || "")}</p><p>Chọn khối sai:</p>`;
    body += `<div class="btn-row options" role="group" aria-label="Lựa chọn đáp án">${(payload.options || []).map((o) => `<button type="button" class="secondary opt-btn" data-opt="${esc(o)}" aria-pressed="false">${esc(o)}</button>`).join("")}</div>
      <p class="btn-row"><button type="button" data-check="${ex.id}">Kiểm tra</button><button type="button" class="secondary" data-retry="${ex.id}" hidden>Làm lại</button></p>`;
  } else if (ex.type === "fill") {
    // UX pilot: KHÔNG hiển thị hint_vi sẵn ở bài fill nữa — trước đây
    // dòng "Mẫu cần dùng: ..." lộ gần như đáp án trước khi người học
    // trả lời. Gợi ý chỉ hiện khi bấm nút "Gợi ý" (và được ghi nhận).
    const pzh = payload.prompt_zh || ex.prompt_zh || "";
    body = `${pzh ? `<p class="zh">${esc(pzh)}</p>` : ""}
      <label class="sr-only" for="fill-${ex.id}">Đáp án</label>
      <input type="text" id="fill-${ex.id}" placeholder="Viết bằng chữ Hán" autocomplete="off">
      <p class="btn-row"><button type="button" data-fill="${ex.id}">Kiểm tra</button><button type="button" class="secondary" data-retry="${ex.id}" hidden>Làm lại</button></p>`;
  } else if (ex.type === "order") {
    body = `<p class="note">Chạm các khối theo thứ tự đúng; chạm khối đã xếp để gỡ ra.</p>
      <div class="btn-row" id="order-pick-${ex.id}" role="group" aria-label="Khối từ để xếp">${(payload.tokens || []).map((t, i) => `<button type="button" class="token" data-idx="${i}" data-tok="${esc(t)}">${esc(t)}</button>`).join("")}</div>
      <p>Câu của bạn:</p>
      <div class="btn-row order-built" id="order-built-${ex.id}"></div>
      <p class="btn-row"><button type="button" data-order="${ex.id}">Kiểm tra</button><button type="button" class="secondary" data-clear-order="${ex.id}">Làm lại</button></p>`;
  }
  return `<section class="exercise" id="ex-${ex.id}">
    <p class="ex-meta"><span class="chip">${esc(stageLabel(les, ex))}</span>${done ? `<span class="note">Lần gần nhất: ${done.lastCorrect ? "✓ Đúng" : "✗ Chưa đúng"}</span>` : ""}</p>
    <p class="ex-prompt">${esc(ex.prompt_vi)}</p>${body}
    <p><button type="button" class="secondary hint-btn" data-hint="${ex.id}">Gợi ý</button></p>
    <div id="hint-${ex.id}"></div>
    <div id="fb-${ex.id}"></div>
  </section>`;
}

// Công thức trực quan: tách mẫu theo dấu "+" thành các ô thành phần
// nối bằng dấu + lớn, để người học thấy cấu trúc câu thay vì một dòng
// chữ dài. Mẫu không có "+" thì hiện một ô duy nhất.
function formulaChipsHTML(pattern) {
  const parts = String(pattern || "").split("+").map((s) => s.trim()).filter((s) => s);
  if (!parts.length) return "";
  return `<div class="formula-chips" aria-label="Công thức: ${esc(pattern)}">${parts.map((p) => `<span class="fchip">${esc(p)}</span>`).join(`<span class="fplus" aria-hidden="true">+</span>`)}</div>`;
}

function renderLesson(id) {
  const les = lessonById(id);
  const app = document.getElementById("app");
  if (!les) { app.innerHTML = "<p>Không tìm thấy bài học.</p><p><a href='#/'>Về danh mục</a></p>"; return; }
  // CUR-02: Bài trước/Bài sau theo THỨ TỰ CURRICULUM toàn cục (bài cuối
  // của một cấp nối sang bài đầu cấp kế tiếp), không theo thứ tự manifest.
  const ordered = curriculumOrderedLessons();
  const idxAll = ordered.findIndex((l) => l.id === id);
  const prev = idxAll > 0 ? ordered[idxAll - 1] : null;
  const next = idxAll >= 0 && idxAll < ordered.length - 1 ? ordered[idxAll + 1] : null;
  const oi = orderInfo().get(id);
  const reqLessons = requiresOf(les);
  // REL-01: bài liên quan — giữ thứ tự trong related_ids, bỏ qua id không
  // tồn tại trong danh sách đã lọc published (lessons) mà không lỗi; vắng/
  // rỗng/không còn id hợp lệ thì không render mục (không hiện thẻ trống).
  const related = (Array.isArray(les.related_ids) ? les.related_ids : [])
    .map((rid) => lessonById(rid))
    .filter(Boolean);
  const attemptedCount = les.exercises.filter((ex) => progress.attempts[ex.id]).length;
  const lessonState = progress.completedLessons.includes(id)
    ? `<span class="chip chip-state done">✓ Đã hoàn thành</span>`
    : attemptedCount > 0
      ? `<span class="chip chip-state doing">◐ Đang học · đã làm ${attemptedCount}/${les.exercises.length} bài tập</span>`
      : `<span class="chip chip-state new">○ Chưa học</span>`;
  const secChips = [
    ["sec-quick", "Hiểu nhanh"],
    ["sec-formula", "Công thức"],
    ["sec-examples", "Ví dụ"],
    ...(les.confusions && les.confusions.length ? [["sec-confuse", "Dễ nhầm"]] : []),
    ["sec-practice", "Luyện tập"],
    ["speak-section", "Luyện nói"],
    ...(les.quick_memory ? [["sec-memory", "Nhớ nhanh"]] : []),
  ];
  app.innerHTML = `
    <p class="crumb"><a href="#/">← Danh mục</a></p>
    <section class="card card-hero">
      <p class="badges"><span class="badge badge-hsk">HSK ${les.hsk_level}</span> <span class="badge badge-diff">Độ khó: ${difficultyLabel(les.difficulty)}</span> ${lessonState}</p>
      <h2>${esc(les.title_vi)}</h2>
      ${oi ? `<p class="hero-number">HSK ${les.hsk_level} · Bài ${pad2(oi.num)}/${oi.total}</p>` : ""}
      ${formulaChipsHTML(les.pattern)}
    </section>
    <nav class="section-nav" aria-label="Các mục trong bài">
      ${secChips.map(([sid, label]) => `<button type="button" class="sec-chip" data-goto="${sid}">${label}</button>`).join("")}
    </nav>
    ${reqLessons.length ? `<section class="card"><h3>Cần học trước</h3>${reqLessons.map((r) => `<p><a href="#/lesson/${esc(r.id)}">${esc(lessonLabel(r))} — ${esc(r.title_vi)}</a></p>`).join("")}</section>` : ""}
    <section class="card" id="sec-quick">
      <h3>Hiểu nhanh</h3>
      <p>${esc(les.when_to_use)}</p>
      <p class="objective-line"><strong>Mục tiêu:</strong> ${esc(les.objective)}</p>
    </section>
    <section class="card" id="sec-formula">
      <h3>Công thức</h3>
      ${formulaChipsHTML(les.pattern)}
      ${formulaStepsHTML(les.formula_notes)}
    </section>
    <section class="card" id="sec-examples">
      <h3>Ví dụ</h3>
      <div class="lesson-controls btn-row" role="group" aria-label="Điều khiển hiển thị và tốc độ đọc">
        <button type="button" class="secondary" id="pinyinBtn" aria-pressed="${prefs.showPinyin}">${prefs.showPinyin ? "Ẩn Pinyin" : "Hiện Pinyin"}</button>
        <button type="button" class="secondary" id="meaningBtn" aria-pressed="${prefs.showMeaning}">${prefs.showMeaning ? "Ẩn nghĩa Việt" : "Hiện nghĩa Việt"}</button>
        <label for="rateSel">Tốc độ đọc <select id="rateSel"><option value="0.7">0.7×</option><option value="1">1×</option><option value="1.25">1.25×</option></select></label>
      </div>
      <p class="note">Giọng đọc là giọng tổng hợp (TTS) của trình duyệt, chỉ đọc câu tiếng Trung.</p>
      <p id="voiceNote" class="voice-note" role="status"></p>
      ${les.examples.map((e) => exampleHTML(e)).join("")}
    </section>
    ${les.confusions && les.confusions.length ? `<section class="card" id="sec-confuse"><h3>Dễ nhầm</h3>
      <p class="note">Bấm vào từng câu để xem vì sao sai hoặc dễ nhầm.</p>
      ${les.confusions.map((c) => `<details class="confusion"><summary><strong>${esc(c.wrong_or_risky)}</strong> <span class="chip chip-verdict">${esc(VERDICT_LABELS[c.verdict] || c.verdict || "")}</span></summary><p>${esc(c.explanation)}</p></details>`).join("")}
    </section>` : ""}
    <section class="card" id="sec-practice">
      <h3>Luyện tập</h3>
      <div class="player-head">
        <span id="playerPos">Câu 1/${les.exercises.length}</span>
        <span id="playerDone" class="note"></span>
      </div>
      <div class="progress-track" role="progressbar" aria-label="Tiến độ luyện tập" aria-valuemin="0" aria-valuemax="${les.exercises.length}" aria-valuenow="0" id="playerTrack"><div class="progress-fill" id="playerBar" style="width:0%"></div></div>
      ${les.exercises.map((ex, i) => exerciseHTML(les, ex, i)).join("")}
      <div class="btn-row player-nav">
        <button type="button" class="secondary" id="playerPrev">← Câu trước</button>
        <button type="button" id="playerNext">Câu tiếp theo →</button>
      </div>
      <div id="playerSummary" hidden></div>
    </section>
    <section class="card" id="speak-section">
      <h3>Luyện nói</h3>
      <ol class="steps" aria-label="Luồng luyện nói">
        <li class="step current" data-step="1">1. Nghe mẫu</li>
        <li class="step" data-step="2">2. Thu âm</li>
        <li class="step" data-step="3">3. Nghe lại</li>
        <li class="step" data-step="4">4. Tự đánh giá</li>
      </ol>
      <label for="speakSel">Chọn câu mẫu để luyện</label>
      <select id="speakSel">${les.examples.map((e, i) => `<option value="${i}">${esc(e.zh)} — ${esc(e.vi)}</option>`).join("")}</select>
      <p class="btn-row">
        <button type="button" id="speakSampleBtn">▶ Nghe mẫu</button>
        <button type="button" id="speakRecordBtn">● Thu âm</button>
        <button type="button" id="speakStopBtn" class="secondary" disabled>Dừng thu</button>
        <button type="button" id="speakPlayBtn" class="secondary" ${speakingBlobUrl ? "" : "disabled"}>▶ Nghe lại bản thu</button>
        <button type="button" id="speakClearBtn" class="secondary" ${speakingBlobUrl ? "" : "disabled"}>Xóa bản thu</button>
      </p>
      <p id="speakStatus" class="note">Chưa có bản thu.</p>
      <p><strong>Tự đánh giá sau khi nghe lại:</strong></p>
      <p class="btn-row" role="group" aria-label="Tự đánh giá phát âm">
        <button type="button" class="secondary" data-selfrate="Chưa giống mẫu — nên thu lại một lần nữa">Chưa giống mẫu</button>
        <button type="button" class="secondary" data-selfrate="Khá giống mẫu — tiếp tục luyện thêm">Khá giống</button>
        <button type="button" class="secondary" data-selfrate="Giống mẫu — tốt, hãy tự nói một câu mới">Giống mẫu</button>
      </p>
      <p><strong>Tự nói theo tình huống:</strong> dùng mẫu câu của bài này để tự nói một câu mới về bản thân (không cần viết ra, có thể thu âm để nghe lại).</p>
      <details>
        <summary>Trợ giúp &amp; lưu ý kỹ thuật</summary>
        <p class="note">Bản thu chỉ ở trong trang này: không lưu, không gửi đi đâu và không được chấm điểm tự động — bạn tự nghe lại và đối chiếu với mẫu. Nếu trình duyệt từ chối microphone hoặc thiết bị không có mic, bạn vẫn học được toàn bộ phần còn lại của bài: nghe mẫu, đọc đuổi không thu âm và tự nói theo tình huống. Giọng mẫu là giọng tổng hợp (TTS) của trình duyệt, không phải người bản ngữ.</p>
      </details>
    </section>
    ${les.quick_memory ? `<section class="card card-memory" id="sec-memory"><h3>F. Nhớ nhanh</h3><p>${esc(les.quick_memory)}</p></section>` : ""}
    ${related.length ? `<section class="card"><h3>Bài liên quan</h3>${related.map((r) => `<p><a href="#/lesson/${esc(r.id)}"><span class="badge badge-hsk">HSK ${esc(String(r.hsk_level))}</span> ${esc(r.title_vi)}</a></p>`).join("")}</section>` : ""}
    <div class="card">
      <button type="button" id="completeBtn">${progress.completedLessons.includes(id) ? "✓ Đã hoàn thành — đánh dấu lại" : "Đánh dấu đã hoàn thành bài này"}</button>
      <button type="button" class="secondary" id="reportBtn">Báo lỗi bài học</button>
      <p id="reportText" class="note"></p>
      <details>
        <summary>Nguồn và thông tin kiểm chứng</summary>
        <p class="note">Nguồn: ${les.sources.map((s) => esc(s.source_id) + " — " + esc(s.note)).join("; ")}. Rà soát: ${esc(les.review ? les.review.reviewer + ", " + les.review.date : "chưa rà soát")}. Phiên bản nội dung: ${les.content_version}.</p>
        ${hskEvidenceHTML(les)}
      </details>
    </div>
    <nav class="lesson-nav" aria-label="Điều hướng bài học">
      ${prev ? `<a class="nav-link" href="#/lesson/${prev.id}">← Bài trước: ${esc(lessonLabel(prev))} — ${esc(prev.title_vi)}</a>` : `<span class="nav-link disabled" aria-disabled="true">← Bài trước</span>`}
      <a class="nav-link" href="#/">Danh mục</a>
      ${next ? `<a class="nav-link" href="#/lesson/${next.id}">Bài sau: ${esc(lessonLabel(next))} — ${esc(next.title_vi)} →</a>` : `<span class="nav-link disabled" aria-disabled="true">Bài sau →</span>`}
    </nav>`;
  // Điều hướng trong bài: nút cuộn tới mục (không dùng href="#..." vì
  // app định tuyến bằng hash — đổi hash sẽ bị hiểu là chuyển trang).
  document.querySelectorAll("[data-goto]").forEach((b) => {
    b.onclick = () => {
      const el = document.getElementById(b.dataset.goto);
      if (el) el.scrollIntoView({ block: "start" });
    };
  });
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
  // Nút nghe/dừng hợp nhất: bấm khi đang đọc (class .speaking) = dừng.
  document.querySelectorAll("[data-speak]").forEach((b) => {
    b.onclick = () => { if (b.classList.contains("speaking")) stopSpeak(); else speak(b.dataset.speak, b); };
  });
  // Luyện nói P04-02: thu âm bằng MediaRecorder của trình duyệt, phát lại bằng
  // thẻ audio tạm; không chấm điểm, không lưu, không gửi bản thu đi đâu.
  const speakStatus = document.getElementById("speakStatus");
  const speakSel = document.getElementById("speakSel");
  const recordBtn = document.getElementById("speakRecordBtn");
  const stopBtn = document.getElementById("speakStopBtn");
  const playBtn = document.getElementById("speakPlayBtn");
  const clearBtn = document.getElementById("speakClearBtn");
  const setSpeakStatus = (t) => { if (speakStatus) speakStatus.textContent = t; };
  const setStep = (n) => {
    document.querySelectorAll("#speak-section .step").forEach((s) => {
      s.classList.toggle("current", Number(s.dataset.step) === n);
    });
  };
  document.getElementById("speakSampleBtn").onclick = (ev) => {
    const b = ev.currentTarget;
    if (b.classList.contains("speaking")) { stopSpeak(); return; }
    setStep(1);
    speak(les.examples[Number(speakSel.value)].zh, b);
  };
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
        setStep(3);
        setSpeakStatus("Đã thu xong. Bấm “Nghe lại bản thu” để tự đối chiếu với mẫu — không có chấm điểm tự động.");
      };
      speakingRecorder.start();
      speakingRecording = true;
      recordBtn.disabled = true; stopBtn.disabled = false;
      recordBtn.classList.add("recording");
      recordBtn.textContent = "● Đang thu…";
      setStep(2);
      setSpeakStatus("Đang thu… Hãy đọc đuổi theo câu mẫu, rồi bấm “Dừng thu”.");
    } catch (e) {
      setSpeakStatus("Không truy cập được microphone (bị từ chối hoặc không có mic). Bạn vẫn học được phần còn lại: nghe mẫu, đọc đuổi không thu âm và tự nói theo tình huống.");
    }
  };
  stopBtn.onclick = () => {
    if (speakingRecorder && speakingRecording) { speakingRecorder.stop(); speakingRecording = false; recordBtn.disabled = false; stopBtn.disabled = true; }
  };
  playBtn.onclick = () => { if (speakingBlobUrl) { setStep(3); new Audio(speakingBlobUrl).play().catch(() => setSpeakStatus("Không phát được bản thu trên trình duyệt này.")); } };
  clearBtn.onclick = () => {
    if (speakingBlobUrl) URL.revokeObjectURL(speakingBlobUrl);
    speakingBlobUrl = null; speakingChunks = [];
    playBtn.disabled = true; clearBtn.disabled = true;
    setStep(1);
    setSpeakStatus("Đã xóa bản thu. Chưa có bản thu.");
  };
  document.querySelectorAll("[data-selfrate]").forEach((b) => {
    b.onclick = () => { setStep(4); setSpeakStatus("Tự đánh giá: " + b.dataset.selfrate + " (chỉ ghi trong trang này, không phải điểm máy chấm)."); };
  });
  document.getElementById("completeBtn").onclick = () => {
    if (!progress.completedLessons.includes(id)) progress.completedLessons.push(id);
    saveProgress(); render();
  };
  document.getElementById("reportBtn").onclick = () => {
    const text = `Báo lỗi bài học — ID: ${les.id}, phiên bản nội dung: ${les.content_version}. Mô tả lỗi: `;
    document.getElementById("reportText").textContent = text + "(hãy sao chép dòng này kèm mô tả lỗi của bạn khi gửi phản hồi)";
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
  };
  // --- Trình luyện tập từng câu (UX pilot) ---
  // Mọi câu vẫn nằm trong DOM (giữ nguyên id ex-/fb-/hint- và toàn bộ cơ
  // chế chấm, ghi attempts/hints như trước); trình chỉ ẩn/hiện từng câu,
  // cập nhật vị trí + thanh tiến độ và dựng TỔNG KẾT từ attempts thật.
  // Không đổi khóa tiến độ, FSRS hay lịch sử làm bài.
  const exSecs = les.exercises.map((ex) => document.getElementById("ex-" + ex.id)).filter(Boolean);
  const posEl = document.getElementById("playerPos");
  const doneEl = document.getElementById("playerDone");
  const barEl = document.getElementById("playerBar");
  const trackEl = document.getElementById("playerTrack");
  const prevBtn = document.getElementById("playerPrev");
  const nextBtn = document.getElementById("playerNext");
  const summaryEl = document.getElementById("playerSummary");
  const doneCount = () => les.exercises.filter((ex) => progress.attempts[ex.id]).length;
  let cur = les.exercises.findIndex((ex) => !progress.attempts[ex.id]);
  if (cur < 0) cur = 0;
  function buildSummary() {
    const wrong = les.exercises.map((ex, i) => ({ ex, i }))
      .filter(({ ex }) => !(progress.attempts[ex.id] && progress.attempts[ex.id].lastCorrect));
    const right = les.exercises.length - wrong.length;
    summaryEl.innerHTML = `<div class="feedback ${wrong.length ? "" : "ok"}">
      <p><strong>Tổng kết lượt luyện:</strong> đúng ở lần gần nhất <strong>${right}/${les.exercises.length}</strong> câu. Tiến độ đã lưu tự động trên thiết bị này; khi sẵn sàng, hãy bấm “Đánh dấu đã hoàn thành bài này” ở cuối trang để đưa bài vào lịch ôn FSRS.</p>
      ${wrong.length ? `<p><strong>Câu cần ôn lại:</strong></p>${wrong.map(({ ex, i }) => `<p><button type="button" class="secondary" data-gotoex="${i}">Câu ${i + 1}: ${esc(ex.prompt_vi)}</button></p>`).join("")}` : `<p>✓ Tất cả các câu đều đúng ở lần làm gần nhất.</p>`}
    </div>`;
    summaryEl.hidden = false;
    summaryEl.querySelectorAll("[data-gotoex]").forEach((b) => {
      b.onclick = () => { cur = Number(b.dataset.gotoex); summaryEl.hidden = true; showCur(); document.getElementById("sec-practice").scrollIntoView({ block: "start" }); };
    });
  }
  function showCur() {
    exSecs.forEach((s, j) => { s.hidden = j !== cur; });
    if (posEl) posEl.textContent = `Câu ${cur + 1}/${les.exercises.length}`;
    const dc = doneCount();
    if (doneEl) doneEl.textContent = `Đã làm ${dc}/${les.exercises.length} câu`;
    if (barEl) barEl.style.width = `${les.exercises.length ? Math.round((dc / les.exercises.length) * 100) : 0}%`;
    if (trackEl) trackEl.setAttribute("aria-valuenow", String(dc));
    if (prevBtn) prevBtn.disabled = cur === 0;
    if (nextBtn) nextBtn.textContent = cur === les.exercises.length - 1 ? "Xem tổng kết" : "Câu tiếp theo →";
  }
  if (prevBtn) prevBtn.onclick = () => { if (cur > 0) { cur -= 1; summaryEl.hidden = true; showCur(); } };
  if (nextBtn) nextBtn.onclick = () => {
    if (cur < les.exercises.length - 1) { cur += 1; summaryEl.hidden = true; showCur(); }
    else { buildSummary(); summaryEl.scrollIntoView({ block: "nearest" }); }
  };
  showCur();
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
      showCur();
      if (doneCount() === les.exercises.length) { buildSummary(); }
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
      if (box) box.innerHTML = `<div class="feedback" role="status">${hint ? `Gợi ý: ${esc(hint)}` : "Bài này không có gợi ý riêng — hãy xem lại mục Công thức ở trên."} (Đã ghi nhận: bạn đã xem gợi ý.)</div>`;
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
const BUILD_VERSION = "20261031-ui1";
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
    <p>Tổng số bài đã tải: ${debugInfo.totalLoaded} · Sau khi lọc published: ${debugInfo.publishedCount} · Số bài đã hoàn thành (chỉ số lượng): ${debugInfo.completedCount} · Lộ trình: ${esc(debugInfo.curriculumStatus || "không rõ")}</p>
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

// fetch() không có hạn chót sẽ treo vĩnh viễn nếu máy chủ nhận kết nối
// nhưng không bao giờ trả lời xong (đã tái hiện bằng máy chủ treo —
// xem docs/reviews/loading-stall-investigation.md): promise không
// resolve cũng không reject nên màn hình "Đang tải bài học…" không bao
// giờ được thay. Mọi lần tải dữ liệu đều qua fetchData() có timeout;
// khi quá hạn, AbortError đi vào đúng các đường lỗi sẵn có (trang lỗi
// tải nếu là manifest, banner tải thiếu nếu là một shard).
const FETCH_TIMEOUT_MS = 15000;
async function fetchData(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) throw new Error("HTTP " + r.status);
    // Đọc thân (body) PHẢI nằm trong cùng hạn chót: fetch() chỉ resolve
    // khi headers về, nên nếu hủy bộ đếm giờ ngay tại đây thì một body
    // bị treo giữa chừng sẽ lọt qua và .json() treo vĩnh viễn (đã tái
    // hiện — xem docs/reviews/loading-perf-optimization.md). Khi quá
    // hạn, abort() hủy thật request/body đang đọc dở.
    const data = await r.json();
    return { status: r.status, data };
  } finally {
    clearTimeout(timer);
  }
}

// Tải shard SONG SONG CÓ GIỚI HẠN (trước đây tải tuần tự: trên mạng
// chậm, độ trễ của 70+ request bị cộng dồn — đo được ~46 giây cho 72
// bài). Mức đồng thời được chốt bằng đo thử cùng điều kiện mạng chậm
// ở các mức 4/8/16 (xem docs/reviews/loading-perf-optimization.md).
// Kết quả được ghép lại theo đúng thứ tự manifest bằng chỉ số, không
// phụ thuộc file nào tải xong trước; shard lỗi vẫn bị đếm vào
// failedShards để hiện banner tải thiếu như cũ — không âm thầm bỏ bài
// rồi báo tải đầy đủ.
const LOAD_CONCURRENCY = 8;
async function loadLessons() {
  const sources = [];
  let failedShards = 0;
  const manifestUrl = `data/lessons-manifest.json?v=${BUILD_VERSION}`;
  try {
    // CUR-02: tải thêm lộ trình chính thức. Lỗi/thiếu file KHÔNG chặn
    // việc học: curriculumData giữ null và giao diện fallback về thứ tự
    // manifest (xem computeOrderInfo); trạng thái ghi vào biến debug.
    const curriculumUrl = `data/curriculum.json?v=${BUILD_VERSION}`;
    try {
      const cRes = await fetchData(curriculumUrl);
      const c = cRes.data;
      if (!c || typeof c !== "object" || !c.levels || typeof c.levels !== "object") {
        throw new Error("định dạng curriculum.json không hợp lệ");
      }
      curriculumData = {
        levels: c.levels,
        requires: (c.requires && typeof c.requires === "object") ? c.requires : {},
      };
      curriculumStatus = "đã tải data/curriculum.json";
      sources.push({
        url: curriculumUrl, status: cRes.status,
        count: Object.values(c.levels).reduce((n, a) => n + (Array.isArray(a) ? a.length : 0), 0),
        error: null,
      });
    } catch (e) {
      curriculumData = null;
      curriculumStatus = "không tải được curriculum.json — dùng thứ tự manifest";
      sources.push({ url: curriculumUrl, status: "lỗi", count: null, error: String(e && e.message ? e.message : e) });
    }
    const mRes = await fetchData(manifestUrl);
    const m = mRes.data;
    const shardPaths = m.shards || [];
    sources.push({ url: manifestUrl, status: mRes.status, count: shardPaths.length, error: null });
    const perShard = new Array(shardPaths.length).fill(null);
    let nextIndex = 0;
    async function shardWorker() {
      while (nextIndex < shardPaths.length) {
        const i = nextIndex;
        nextIndex += 1;
        const url = `${shardPaths[i]}?v=${BUILD_VERSION}`;
        try {
          const r = await fetchData(url);
          perShard[i] = { url, status: r.status, count: (r.data.lessons || []).length, error: null, lessons: r.data.lessons || [] };
        } catch (e) {
          perShard[i] = { url, status: "lỗi", count: null, error: String(e && e.message ? e.message : e), lessons: null };
        }
      }
    }
    const workers = [];
    for (let k = 0; k < Math.min(LOAD_CONCURRENCY, shardPaths.length); k += 1) workers.push(shardWorker());
    await Promise.all(workers);
    const all = [];
    for (const s of perShard) {
      if (s.lessons) {
        sources.push({ url: s.url, status: s.status, count: s.count, error: null });
        all.push(...s.lessons);
      } else {
        failedShards += 1;
        sources.push({ url: s.url, status: "lỗi", count: null, error: s.error });
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
      curriculumStatus,
      sources,
    };
    lessons = all.filter((l) => l.status === "published");
    _orderInfo = null;
    // Lỗi từng phần không còn bị nuốt im lặng: render() sẽ chèn banner
    // role="alert" kèm nút thử tải lại ở đầu trang.
    loadErrorInfo = failedShards > 0 ? { missing: failedShards } : null;
  } catch (e) {
    debugInfo = {
      build: BUILD_VERSION, scriptUrl: "app.js", swState: "không rõ", cacheNames: "không rõ", zhVoices: "không rõ",
      totalLoaded: 0, publishedCount: 0, completedCount: progress.completedLessons.length,
      curriculumStatus,
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
