# QA-STD1 — Kiểm định độc lập lô chuẩn hóa std1 (Agent QA, 30/10/2026)

Phương pháp: tự đọc dữ liệu/code thật và tự viết script kiểm chứng, không dùng
báo cáo của Agent Nội dung/Code làm bằng chứng. QA không sửa file sản phẩm.
Phạm vi: 38 bài / 182 bài tập (181 cũ + 1 bài mới prefix-ex5), app.js 904 dòng,
styles.css, index.html, scripts/validate.py, tests/.

## Kết quả lệnh (chạy thật, mục 5 của nhiệm vụ)

- `python3 scripts/validate.py` → **ĐẠT: 38 bài, 38 bài published, 182 bài tập.**
- `python3 -m unittest discover -s tests -v` → **7 tests, OK** (gồm 2 test mới:
  `test_published_without_quick_memory_fails`, `test_unstepped_formula_notes_fails`).
- `node --test tests/test_fsrs.mjs` → **7 pass, 0 fail** (khóa bản ts-fsrs 5.4.2,
  chống ghi trùng event_id, serialize/revive đều đạt).
- `node --check app.js` → **OK**. `BUILD_VERSION = "20261030-std1"` (app.js:802)
  khớp `index.html:26` (`app.js?v=20261030-std1`).

## 1. Sửa chữa mục A/B của nd01-findings đã có trong dữ liệu — ĐẠT (có 1 mục dở dang, xem Q-2)

Kiểm từng ca theo id trực tiếp từ `data/lessons/*.json`:

| Ca | Kết quả kiểm chứng |
|---|---|
| A1 bi-ex4 | ĐẠT — accepted = `['不']`, explanation nói lỗi ở 不, khớp key. |
| A2 le-ex1 | ĐẠT — options nay: `我买了这本书。` (key), `我买这了本书。` (distractor sai mới), `我买书了这本。`, `我了买这本书。`. Đáp án đúng duy nhất; distractor cũ `我买这本书了。` (câu đúng) đã bị loại. (Chuỗi distractor thứ ba trong file là `我买书了这本。`, hơi khác trích dẫn trong findings nhưng vẫn là câu sai — không ảnh hưởng chấm.) |
| A3 mo-ex4 | ĐẠT — đã thêm `他会开车。`/`他会开车`. (explanation vẫn chỉ diễn giải bằng 能 — xem HT-2.) |
| A4 verb-reduplication formula | ĐẠT — bước 2: ABAB （研究研究， 休息休息）; bước 4 Mở rộng: 走来走去 thuộc mẫu V来V去 riêng, không phải trùng điệp. |
| A5 why-ex2 / guo-ex2 / result-ex2 | ĐẠT — lần lượt thêm `他为什么没有来？`, `我没有去过中国。`, `他做完作业了。`. |
| B1 ma-ex1 | ĐẠT — distractor `你是老师？` đã thay bằng `你是吗老师？`; key duy nhất `你是老师吗？`. |
| B1 shide-ex1 | ĐẠT — đề ghi rõ “(nhấn mạnh thời gian; dùng mẫu 是……的)”; key duy nhất. |
| B1 mo-ex1 | ĐẠT — distractor `我能说中文。` đã thay bằng câu sai thật `我说能中文。`. Lưu ý quan sát: distractor `我可以说中文。` vẫn còn; với điều kiện ghi rõ “(kỹ năng đã học)” trong đề, 会 là đáp án duy nhất đúng nghĩa — chấp nhận được. |
| B1 mo-ex2 | ĐẠT — thêm `这里能拍照吗？`; explanation thừa nhận 能 nghe được, đáp án mẫu dùng 可以. |
| B2 le-ex5, bu-ex5, qw-ex2, complex-ex2, complex-ex5, zai-ex5, redup-ex2, redup-ex5, gei-ex5, result-ex5, shide-ex5, bi-ex2 | ĐẠT — mọi biến thể yêu cầu đều có mặt và đúng tiếng Trung: `昨天他去了北京。`/`他昨天去北京了。`; `昨天我没买书。`; `你去哪里？`; biến thể lặp chủ ngữ 他 ở complex-ex2; `…所以我没有去。`; `她正在喝茶。`; `我们想想。`; `你试一试。`; `我送她一支笔。`; `我读完了这本书。`/`我把这本书看完了。`; `我是坐公交车去的。`; `他比我高很多。` (explanation bi-ex2 cũng đã cập nhật nhắc cả 很多）. Không biến thể mới nào trùng distractor hay mâu thuẫn explanation (quét toàn cục: 0 options trùng, mọi choice/error_spot có đúng 1 option khớp accepted). |
| B2 ba-ex2 | ĐẠT — đề ghi “(dùng câu chữ 把）”, không thêm đáp án không-把. |
| B2 ma-ex4 | ĐẠT — explanation ghi nhận `你忙不忙？` cũng đúng (học ở bài sau). |
| B3 gei-ex4, jianyu-ex4 | ĐẠT — explanation viết lại theo đúng key: gei-ex4 “Lỗi ở 一本书： vật đang đứng trước người nhận…”, jianyu-ex4 “Lỗi ở 去： 去 đang đứng trước người được bảo…”. |
| B4 ma-question confusion 2 | ĐẠT — bẫy cũ `是吗。` đã thay bằng `你忙不忙吗？`, verdict `sai_ngu_phap`, explanation đúng (câu hỏi chính-phản không thêm 吗）. |
| B4 bỏ ngưỡng “几 dưới 10” | ĐẠT ở formula cả hai bài: measure-words bước 4 và question-words bước 2 đều đã mềm hóa (“thường khi kỳ vọng số nhỏ” / “không kỳ vọng khoảng số”). |
| B4 complex formula bỏ tuyệt đối | ĐẠT ở formula (bước 4 Mở rộng: một vế có thể lược khi ý đã rõ) — NHƯNG `when_to_use` vẫn giữ câu tuyệt đối, xem lỗi Q-2. |
| B4 result-complement confusion | ĐẠT — `我不做完作业。` có ngữ cảnh đích “(muốn nói 'Tôi chưa làm xong bài tập')”, verdict đổi thành `doi_nghia`, explanation phân biệt rõ nghĩa ‘không làm cho xong’ vs `我没做完作业。`. |
| B4 adverbs confusion | ĐẠT — `我也一杯茶。` verdict đổi thành `thieu_ngu_canh`, explanation nêu ngữ cảnh tỉnh lược khi gọi món. |
| B4 hen formula bỏ 太 | ĐẠT — bước 3 nay dùng 非常 hoặc 真 để nhấn mạnh. |
| B4 measure confusion `三个书` | ĐẠT — verdict `sai_ngu_phap`, explanation “Sai lượng từ: sách phải dùng 本”, khớp cách chấm mw-ex1. |
| B4 zhe-accompanying confusion `他笑着。` | ĐẠT — explanation đổi thành “Chưa thành câu mẫu kèm theo: mẫu này cần động từ thứ hai…”. (verdict giữ `sai_ngu_phap` — chấp nhận được ở mức sư phạm.) |
| B5 bu-ex2 ≠ you-ex2 | ĐẠT — bu-ex2 đổi sang “Tôi không có tiền” (`我没有钱。`), you-ex2 giữ `我没有姐姐。`, hết trùng hệt nhau. |
| B5 prefix-suffix thêm bài về 边 | ĐẠT về tồn tại — prefix-ex5 (fill) `我的家在学校前边。`. Nhưng đáp án còn hẹp, xem Q-3. |

## 2. Biến thể đáp án mới — chất lượng tiếng Trung: ĐẠT

Đã đọc kỹ 21 ca thay đổi được liệt kê ở mục 1 (le-ex1/ex5, mo-ex1/ex2/ex4,
bi-ex2/ex4, qw-ex2, complex-ex2/ex5, zai-ex5, redup-ex2/ex5, gei-ex4/ex5,
result-ex2/ex5, shide-ex1/ex5, ba-ex2, bu-ex2/ex5, why-ex2, guo-ex2,
ma-ex1/ex4 và các confusion đổi verdict). Mọi câu thêm vào đều đúng ngữ pháp
và đúng nghĩa đề yêu cầu; không ca nào tạo đáp án đúng thứ hai trong choice
(quét tự động toàn bộ 38 choice/error_spot: đúng 1 option khớp accepted),
không accepted nào trùng lặp chuỗi, không explanation nào phủ định chính
biến thể vừa thêm (trừ các ghi chú nhỏ HT-2).

## 3. quick_memory 38 bài — ĐẠT

- 38/38 bài published có `quick_memory`, độ dài 63–101 ký tự (trong ngưỡng
  40–110), validator bắt buộc và có test phủ định.
- Đo trùng lặp chuỗi con dài nhất (LCS) giữa quick_memory với objective và
  when_to_use: không bài nào chép nguyên câu. Các trường hợp LCS 20–30 ký tự
  (ba-sentence-1: 30 với objective; shi-de-emphasis: 27; cunxian-chu: 26;
  zhe-accompanying: 26) đều là cụm thuật ngữ cốt lõi của chính mẫu câu
  (ví dụ “đưa tân ngữ lên trước động từ”), phần còn lại của quick_memory là
  móc nhớ khác hẳn (câu hỏi tự kiểm, mũi tên chọn lựa, điều cấm) — đạt yêu
  cầu “chốt, không lặp nguyên phần giải thích”.
- Dạng móc nhớ đúng chuẩn: chẩn đoán vị trí (le), mũi tên chọn từ
  (modal-hui-neng-keyi, zenme-question, yi-jiu-tight…), thao tác + cấm kỵ
  (ma-question, bi-comparison…). Không chứa ví dụ mới sai; các minh họa ngắn
  bên trong （看看/看一看， 没去过, 睡了一个好觉 dạng diễn giải ở separable-verbs)
  đều đúng.

## 4. formula_notes chia bước — ĐẠT về cấu trúc; 1 lỗi kiến thức (xem N-1)

- 38/38 bắt đầu bằng `1)`, có 2–5 bước; validator có quy tắc + test.
- Nhãn bước nhất quán theo họ: họ vị trí/quy tắc （位置 · Cần có sẵn · Phủ định ·
  Câu hỏi · Không dùng · Phân biệt · Mở rộng · Trả lời · Lưu ý · Mức độ) và họ
  nhãn-theo-chủ-điểm （会/能/可以， 怎么/怎么样， 不/没/没有， Mẫu 1/Mẫu 2,
  Nhượng bộ/Nhân quả， Sở hữu/Tồn tại/Tiến hành， 更/还·一样·不比…) — trong mỗi
  bài nhất quán, đọc quét được. Ghi chú tài liệu: danh sách nhãn trong
  docs/schema.md (7 nhãn) hẹp hơn thực tế dữ liệu — xem HT-3.
- Đã đọc toàn văn 38 formula_notes đối chiếu kiến thức: trừ N-1, các bước
  còn lại đúng (gồm các bản sửa A4, hen bỏ 太， complex bước Mở rộng,
  bi-comparison-2 bước 不比 chỉ “không hơn”).

## 6. Chấm bài (app.js) — ĐẠT phần lớn; 1 lỗi Quan trọng (Q-1)

- choice/error_spot: chọn trước (toggle `.selected` + `aria-pressed`,
  app.js khối xử lý choice ~dòng 565–605), bấm “Kiểm tra” mới chấm; chưa chọn
  thì chỉ hiện nhắc “Hãy chọn một đáp án trước” và **không tính lượt** (không
  gọi `grade()`). Sau chấm: đáp án đúng được tiền tố ✓ + class `correct`,
  đáp án chọn sai tiền tố ✗ + class `wrong`, khóa mọi nút; “Làm lại” reset
  sạch trạng thái và cho chấm lại. ĐẠT.
- fill: `const pzh = payload.prompt_zh || ex.prompt_zh || ""` — đọc **cả hai
  vị trí dữ liệu**. Số liệu thật trong dữ liệu hiện tại: khóa `prompt_zh`
  xuất hiện ở payload 52 lần nhưng 26 khóa là `null`; giá trị thật: **26 ca ở
  payload + 13 ca ở cấp exercise = 39/77 fill có prompt_zh hiển thị** (con số
  “52 ca” trong brief là số khóa gồm cả null — code xử lý đúng cả null).
  `hint_vi` hiển thị dưới nhãn “Mẫu cần dùng:”. Chấm bằng Kiểm tra hoặc Enter;
  đúng/sai có class + `aria-invalid` kèm ký hiệu ở feedback. ĐẠT (trừ Q-1).
- Gợi ý: nút “Xin gợi ý” chỉ hiện `payload.hint_vi` (hoặc câu fallback trỏ về
  mục B), ghi `progress.hints`, **không lộ explanation**. ĐẠT.
- “Lần làm gần nhất” khi mở lại bài: chỉ hiện “✓ Đúng / ✗ Chưa đúng”, không
  kèm explanation. ĐẠT.

## 7. Order với token trùng — ĐẠT

Đọc code path: mỗi nút nguồn mang `data-idx` riêng; `built` lưu `{idx, tok}`;
trạng thái đã dùng tính theo `idx` (`built.some(b => b.idx === idx)`), nút
nguồn bị `disabled` khi instance đã dùng; chip đã xếp gỡ bằng vị trí `pos`
(`built.splice(pos,1)`) nên trả đúng instance. Mô phỏng nguyên văn logic
bằng Node (script QA riêng, 8 test: dùng cả hai instance 了 trong một câu,
grade đúng với token trùng, gỡ chip giữa trả đúng instance, bấm trùng
instance không nhân đôi, grade sai khi thiếu token) → **8/8 PASS**.
Token là `<button>` (dùng được bàn phím), có class `used` + disabled. ĐẠT.

## 8. TTS / prefs / lỗi tải — ĐẠT (1 ghi chú HT-4)

- `grep alert(` trong app.js + index.html: **0 kết quả**. (Còn `confirm()` ở
  nhập tiến trình — là hộp xác nhận ghi đè có chủ đích, giữ như cũ.)
- prefs: khóa `hanngu-prefs-v1` độc lập; `loadPrefs()` kiểm tra kiểu và chỉ
  nhận tốc độ thuộc {0.7, 1, 1.25}; `savePrefs()` gọi ngay khi đổi.
  Toggle Pinyin/nghĩa Việt chỉ bật/tắt thuộc tính `hidden` trên DOM
  (`.pinyin`, `.example-vi`), **không gọi render()** — giữ vị trí cuộn, chữ
  đang gõ, câu order đang xếp. ĐẠT.
- speak(): gán cả `onstart` (giữ class `speaking`), `onend`, `onerror` (bỏ qua
  `canceled`/`interrupted`, lỗi thật thì báo qua live-region); nút bấm chuyển
  nhãn “Đang đọc…” + `aria-busy`; `stopSpeak()` cancel + dọn trạng thái;
  thiếu giọng zh chỉ báo qua `#voiceNote` + live-region, không hộp thoại. ĐẠT.
- Lỗi tải: `loadLessons()` đếm `failedShards`; có lỗi từng phần →
  `loadErrorInfo` → `injectLoadBanner()` chèn banner `role="alert"` kèm nút
  “Thử tải lại” (`retryLoad()`); lỗi manifest → màn hình lỗi thân thiện có
  nút “Tải lại trang” (đã bỏ thông báo kỹ thuật kiểu chạy máy chủ tĩnh). ĐẠT.
- Tiến trình hỏng: `loadProgress()` lưu nguyên văn dữ liệu hỏng vào khóa
  `hanngu-progress-corrupt-backup` **trước** khi trả tiến trình trống, và đặt
  `progressNotice` hiển thị banner ở trang chủ. ĐẠT.

## 9. Tương thích tiến độ (đối chiếu decisions D14/D20) — ĐẠT

- `LS_KEY = "hanngu-progress-v2"`, `OLD_LS_KEY = "hanngu-progress-v1"` giữ
  nguyên; `migrateProgress()` giữ nguyên logic v1→v2 (giữ completedLessons/
  attempts/hints, thẻ FSRS khởi tạo trống) và v2 đi qua có bổ sung mặc định.
- Cấu trúc `attempts` giữ nguyên `{correct, total, lastCorrect, hintUsed}`;
  FSRS qua `SRS.applyReview` (srs.mjs không đổi, `FSRS_VERSION = ts-fsrs@5.4.2`,
  vendor nguyên văn), chống ghi trùng event_id còn nguyên (test FSRS đạt).
- Xuất tiến trình: JSON v2 như cũ. Nhập: vẫn kiểm version/cards/events và hỏi
  xác nhận trước khi ghi đè; thay đổi duy nhất là lỗi nhập hiện inline thay
  vì hộp thoại — cải thiện, không phải hồi quy.
- Thay đổi hành vi có chủ đích duy nhất: lượt làm của choice/error_spot chỉ
  ghi khi bấm “Kiểm tra” (đúng yêu cầu chuẩn hóa). Không phát hiện thay đổi
  hành vi ngoài ý muốn khác. Chế độ `?debug=1` + `BUILD_VERSION` (D20) giữ
  nguyên cơ chế, chỉ tăng phiên bản.

## 10. Giao diện — ĐẠT

- Badge: một hàm chung `difficultyLabel()` dùng ở cả trang chủ và trang bài;
  badge HSK và badge độ khó tách riêng (`.badge-hsk` / `.badge-diff`). Grep:
  không còn chuỗi “(tạm thời)” trong app.js/index.html.
- Thứ tự trang bài: hero (badge + pattern + mục tiêu) → A. Dùng khi nào (kèm
  ví dụ nhanh examples[0]) → B. Cách đặt câu (bước đánh số qua
  `formulaStepsHTML`, có đường lùi an toàn khi không đúng dạng bước) →
  C. Ví dụ → D. Dễ nhầm (kèm chip nhãn verdict tiếng Việt) → Luyện nói →
  E. Luyện tập (chip giai đoạn Nhận biết → Đặt đúng vị trí → Tự dùng qua
  `stageLabel()`) → F. Nhớ nhanh (chỉ render khi có `quick_memory`; nay
  38/38 có) → hoàn thành/báo lỗi → nav bài trước/sau theo thứ tự mảng
  `lessons` (= thứ tự manifest). Mục A–F đúng thứ tự; khối Luyện nói (không
  thuộc hệ A–F) nằm giữa D và E như bố cục cũ — ghi nhận, không tính lỗi.
- Ôn tập: nút rate `disabled` mặc định, chỉ mở sau khi bấm “Hiện công thức để
  đối chiếu” của chính thẻ đó; phần đối chiếu hiện `pattern` + `quick_memory`
  (fallback objective khi thiếu); có dòng tiến độ phiên ôn; sau khi chấm,
  cuộn tới thẻ đến hạn tiếp theo. Nhãn rate chỉ tiếng Việt.
- Trạng thái rỗng/tìm kiếm/lọc: tìm kiếm dùng `<form>` (Enter hoạt động),
  nút lọc cấp đọc giá trị hiện tại của ô `#q` (không lấy từ khóa cũ từ URL),
  không có kết quả → thẻ rỗng kèm nút “Xóa bộ lọc”; bài không tồn tại, không
  có thẻ đến hạn, tải lỗi đều có màn hình riêng, không trắng trang.
- CSS: đủ biến trạng thái (--success/--error/--warn/--focus/--selected-bg…),
  mọi nút/nav-link/token có min-height var(--tap) = 44px, focus-visible 3px
  cho button/a/input/select/textarea/.token, đúng/sai luôn kèm ký hiệu
  ✓/✗ ngoài màu, **không có position fixed/sticky** (chỉ `.sr-only` absolute),
  có `prefers-reduced-motion`, `.pinyin` dùng --text-muted #475569.
- index.html: `main` đã bỏ aria-live toàn trang; live-region riêng
  `#liveStatus` (sr-only). ĐẠT.

## 11. Phục vụ tĩnh — ĐẠT

`python3 -m http.server 8419` trong thư mục dự án; curl: `/`, `/index.html`,
`/app.js?v=20261030-std1`, `/styles.css`, manifest, 3 file bài bất kỳ
(bi-comparison, le-completion-change, prefix-suffix), `/srs.mjs` → **tất cả
200**; đã tắt server sau kiểm tra. (Kiểm tra bằng curl/máy chủ tĩnh trên máy
tính — không phải trình duyệt thật, không phải thiết bị thật.)

---

## DANH SÁCH LỖI

### Nghiêm trọng
- **N-1 (Nội dung — data/lessons/bi-comparison.json).** `formula_notes` bước 3
  tuyên bố sai kiến thức: “phó từ 也/都/更 đặt **trước** 比 （他也比我高）”. Với
  cấu trúc so sánh, 更 phải đứng **sau** 比， trước tính từ （他比我更高） — và
  chính bài bi-comparison-2 (bước 1) dạy đúng như vậy, nên hai bài mâu thuẫn
  nhau. Ví dụ kèm theo chỉ minh họa 也 nên lỗi nằm ở quy tắc chữ. Học viên áp
  dụng nguyên văn sẽ nói `他更比我高` (sai). Sửa: bỏ 更 khỏi nhóm đặt trước 比
  ở bi-comparison (hoặc ghi rõ 更 đặt sau 比 như bài 2). ND-01 chưa bắt được
  ca này; QA phát hiện khi đọc toàn văn formula. *(Không có bài tập/ví dụ nào
  dùng 更比 — đã quét toàn dữ liệu — nên phạm vi sửa chỉ 1 câu formula.)*

### Quan trọng
- **Q-1 (Code — app.js).** Fill và order **không khóa chấm sau lần Kiểm tra
  đầu**: handler fill (`doGrade`) và order (`data-order`) gọi `grade()` ở mọi
  lần bấm, không có cờ `graded` như choice/error_spot. Hệ quả: (a) bấm Kiểm
  tra hai lần cho cùng một đáp án tính 2 lượt; (b) sau khi trả lời sai,
  feedback đã hiện “Đáp án đúng: …” mà ô nhập/khối xếp vẫn sửa và chấm lại
  được ngay, nên `lastCorrect` bị lật thành đúng trong cùng một lượt học mà
  không qua thao tác “Làm lại” tách bạch như choice. Sửa: áp cùng cơ chế
  khóa + Làm lại của choice cho fill và order.
- **Q-2 (Nội dung — data/lessons/complex-suiran-yinwei.json).** B4 sửa dở
  dang: `when_to_use` vẫn giữ tuyên bố tuyệt đối “Hai nửa của một cặp phải
  đi cùng nhau.” trong khi formula bước 4 (Mở rộng) đã công nhận một vế có
  thể lược khi ý đã rõ. Mục A là phần người học đọc đầu tiên — cần mềm hóa
  đồng bộ (ví dụ thêm “ở mức cơ bản, hãy dùng đủ cặp” như formula).
- **Q-3 (Nội dung — data/lessons/prefix-suffix.json, prefix-ex5).** Bài fill
  MỚI thêm ở B5 còn hẹp đáp án: chỉ nhận `我的家在学校前边。` (± dấu câu). Đề
  không ghi bắt buộc dùng 前边， trong khi `我的家在学校前面。` và dạng bỏ 的
  `我家在学校前边。` đều đúng và tự nhiên — học viên viết đúng vẫn bị chấm
  sai, đúng loại lỗi lô này đi sửa. Sửa: thêm các biến thể trên, hoặc ghi rõ
  “(dùng 前边）” trong đề.

### Hoàn thiện
- **HT-1 (Nội dung — data/lessons/ba-sentence-1.json).** Bước 3 của
  formula_notes (“3) Chủ ngữ là người chủ động thực hiện.”) không theo định
  dạng “Nhãn: …” như 112 bước còn lại; nội dung đúng, chỉ lệch quy ước trình
  bày (gợi ý nhãn “Chủ ngữ:”).
- **HT-2 (Nội dung).** Vài explanation/hint chưa nhắc biến thể vừa thêm:
  mo-ex4 explanation chỉ diễn giải bằng 能 dù `他会开车。` đã được chấp nhận;
  bi-ex2 hint_vi chỉ nói “Thêm 多了” dù `他比我高很多。` đã được chấp nhận
  (explanation của bi-ex2 thì đã nhắc cả hai). Không gây chấm sai, chỉ thiếu
  nhất quán diễn giải.
- **HT-3 (Manager — docs/schema.md).** Danh sách nhãn bước trong schema.md
  ghi 7 nhãn （位置 · Cần có sẵn · Phủ định · Câu hỏi · Không dùng · Phân biệt ·
  Mở rộng) nhưng dữ liệu dùng bộ nhãn rộng hơn (thêm Chọn từ · Chọn lượng từ ·
  Trả lời · Lưu ý · Mức độ · nhãn-theo-chủ-điểm…). Nên đồng bộ schema.md với
  thực tế đã nghiệm thu để các lô sau không bị lệch chuẩn.
- **HT-4 (Code — app.js, speak()).** Cạnh thời gian hẹp: nếu bấm “Dừng” trong
  lúc `speak()` đang chờ `ensureVoices(1000)` (chỉ xảy ra ở lần nghe đầu khi
  danh sách giọng chưa sẵn sàng), utterance được tạo **sau** lệnh dừng nên
  vẫn phát. Ngoài cửa sổ ~1 giây này, phát/dừng hoạt động đúng.
- **HT-5 (Code — app.js).** Banner tiến trình hỏng (`progressNotice`) chỉ
  render ở trang chủ; nếu người dùng mở thẳng link một bài học, thông báo
  chỉ xuất hiện khi quay về trang chủ. Dữ liệu dự phòng vẫn được lưu đúng.

## KẾT LUẬN: CHƯA ĐẠT để phát hành — cần một vòng sửa ngắn

Đã đạt: toàn bộ lệnh kiểm tra (mục 5 nhiệm vụ); A1–A5 và B1–B5 của ND-01 có
thật trong dữ liệu (trừ phần dở dang Q-2 và đáp án hẹp Q-3 ở chính bài mới);
quick_memory và formula chia bước đạt chuẩn; chấm chọn-trước/kiểm-tra-sau,
order token trùng, prefs/TTS/lỗi tải/backup tiến trình, tương thích tiến độ
v1→v2 + FSRS, giao diện A–F/badge/nav/Ôn tập, phục vụ tĩnh — tất cả có bằng
chứng ĐẠT ở trên.

Chưa đạt vì còn **1 lỗi Nghiêm trọng (N-1)** — quy tắc sai về vị trí của 更
trong bi-comparison, mâu thuẫn với bi-comparison-2 — và 3 lỗi Quan trọng
(Q-1 khóa chấm fill/order; Q-2 when_to_use của complex còn tuyệt đối;
Q-3 prefix-ex5 hẹp đáp án). Cả bốn đều là sửa nhỏ, đúng vòng tự sửa vòng 1:
trả N-1, Q-2, Q-3 cho Agent Nội dung; Q-1 cho Agent Code. Sau khi sửa, QA
chỉ cần kiểm lại đúng 4 điểm này + chạy lại validator (không rà lại toàn bộ).

---

## Kiểm lại vòng 2 (QA-02, 30/10/2026) — đúng phạm vi QA-01 đã chốt

Phương pháp như vòng 1: tự đọc file thật, grep/script tự viết, không dùng báo
cáo của agent khác làm bằng chứng. QA không sửa file sản phẩm.

### Verdict từng điểm

**1. N-1 (Nội dung — bi-comparison) — ĐẠT.**
`data/lessons/bi-comparison.json`, formula_notes bước 3 nay ghi: “Mở rộng:
也/都 đặt trước 比 （他也比我高）; riêng 更 đặt sau 比， trước tính từ
（他比我更高）.” — 更 đã đúng vị trí sau 比， nhất quán với bi-comparison-2
bước 1 (“更/还： đứng sau 比， trước tính từ”). Quét toàn `data/`: không còn
chuỗi dạy sai — 0 kết quả cho mẫu `更…trước…比`, `更比`, `也/都/更`; các chỗ
“đặt trước” còn lại đều là quy tắc đúng （不/没 trước động từ ở
bu-mei-negation; 不 trước tính từ ở state-complement-de; lời giải yi-jiu-ex4).

**2. Q-2 (Nội dung — complex-suiran-yinwei) — ĐẠT.**
`when_to_use` không còn câu tuyệt đối: grep “phải đi cùng” trong file bài =
không có (chỉ còn trong tài liệu review). Câu thay thế: “Người mới nên dùng
đủ cả cặp cho rõ ý; trong giao tiếp thật, một vế có thể được lược khi ý đã
rõ.” — đúng sự thật (cả hai cặp 虽然……但是 / 因为……所以 đều lược được một
vế trong giao tiếp khi ý đã rõ) và nhất quán nguyên văn về nội dung với
formula bước 4 Mở rộng (kèm ví dụ 虽然很冷，他还是去跑步了）. Các confusion
“ghép nhầm hai cặp” nói về ghép chéo, không mâu thuẫn với việc lược vế.

**3. Q-3 (Nội dung — prefix-suffix, prefix-ex5) — ĐẠT (1 quan sát HT).**
`accepted_answers` có đúng 6 mục = 3 câu duy nhất sau chuẩn hóa dấu câu
（我的家在学校前边 / 我的家在学校前面 / 我家在学校前边， mỗi câu ± 。). Cả ba
đều đúng tiếng Trung và tự nhiên cho đề “Nhà tôi ở phía trước trường học”.
Explanation khớp các biến thể có mặt: nêu cả hai lựa chọn 前边/前面 và cả hai
dạng 我的家/我家. *Quan sát (không chặn):* tổ hợp chéo `我家在学校前面。`
chưa nằm trong danh sách dù câu chữ explanation có thể khiến người đọc hiểu
là được nhận; nên bổ sung 2 biến thể này ở một lô nội dung sau.

**4. Các HT đã sửa — ĐẠT (cả 4).**
- HT-1: ba-sentence-1 bước 3 nay là “3) Phân biệt: chủ ngữ là người chủ động
  thực hiện, khác câu bị động với 被.” — có nhãn đúng quy ước.
- HT-2a: mo-ex4 explanation ghi nhận đáp án kép rõ ràng （能 = điều kiện/khả
  năng; 会 = kỹ năng đã học), khớp 4 accepted_answers.
- HT-2b: bi-ex2 hint_vi = “Thêm 多了 hoặc 很多 sau tính từ.” và explanation
  cũng ghi nhận cả hai biến thể — hết lệch gợi ý/đáp án.
- HT-3: docs/schema.md (dòng 22) đã đồng bộ bộ nhãn: 7 nhãn cơ bản + nhãn
  theo chủ điểm （Chọn từ · Mức độ · Trả lời · Lưu ý · Cấu tạo · Mẫu 1/Mẫu 2 ·
  nhãn tên từ/mẫu), khớp thực tế dữ liệu đã nghiệm thu.

**5. Q-1 (Code — app.js, khóa chấm fill/order) — ĐẠT.**
Đọc toàn bộ code path chấm trong renderLesson (app.js ~541–690): `grade()`
chỉ có đúng 3 điểm gọi, mỗi điểm có cờ `graded` riêng theo bài tập.
- choice/error_spot: chọn chỉ đổi trạng thái; “Kiểm tra” guard `graded`,
  đặt `graded = true` trước `grade()`, khóa nút chọn + nút Kiểm tra; chỉ
  “Làm lại” mới reset `graded = false`.
- fill: `doGrade()` guard ngay đầu (`if (graded) return; graded = true;`
  trước khi gọi `grade()`), khóa cả ô nhập và nút Kiểm tra; phím Enter đi
  qua cùng `doGrade()` nên cũng bị khóa sau lần đầu; “Làm lại” là đường duy
  nhất mở lại (reset cờ, xóa ô, bật lại nút, focus lại ô).
- order: nút Kiểm tra guard tương tự; sau chấm, chip đã xếp render kèm
  `disabled` và token nguồn `src.disabled = graded || used`, handler của
  chip/token cũng guard `graded`; nút “Làm lại” (data-clear-order) chỉ reset
  trạng thái, không gọi `grade()`.
Không còn đường nào gọi `grade()` lần hai ngoài luồng Kiểm tra → Làm lại →
Kiểm tra; `attempts.total` chỉ tăng bên trong `grade()` nên bấm lại/Enter
lại không tăng lượt.

**6. HT-4 (Code — app.js, speak()) — ĐẠT (1 quan sát HT).**
Cờ thế hệ có thật và đúng cơ chế (app.js:192–195, 211, 224–230, 253–257):
`speak()` chụp `gen = speakGeneration` lúc bắt đầu; sau `await
ensureVoices(1000)` nếu `gen !== speakGeneration` thì return, không tạo
utterance. `stopSpeak()` tăng thế hệ + `cancel()` + `clearSpeakingState()`
(khôi phục nhãn/class/aria-busy của nút); `render()` gọi `stopSpeak()` đầu
tiên nên chuyển trang trong lúc chờ cũng hủy phát và dọn trạng thái nút.
*Quan sát (không chặn, ngoài điều kiện HT-4):* `speak()` không tự tăng thế
hệ khi một lần nghe MỚI bắt đầu, nên hai nút Nghe khác nhau được bấm nối
tiếp trong cùng cửa sổ chờ giọng ~1 giây đầu phiên có thể cùng qua cửa kiểm
tra và xếp hai utterance — nên xử lý ở lô sau (tăng thế hệ ngay đầu speak()).

**7. HT-5 (Code — app.js, banner tiến trình hỏng) — ĐẠT.**
`render()` là phễu duy nhất cho cả bốn tuyến (trang chủ / bài học / Ôn tập /
Giới thiệu) và gọi `injectProgressBanner()` sau khi render tuyến
(app.js:836–847); tuyến lỗi tải `renderLoadFailure()` cũng gọi
`injectProgressBanner()` (app.js:790). Banner chống trùng theo id
`progressBanner`; nút “Đã hiểu” xóa cờ và render lại. Mở thẳng link bài học
nay vẫn thấy banner. ĐẠT.

**8. Chạy lại kiểm tra (output thật, 30/10/2026).**
- `python3 scripts/validate.py` → `ĐẠT: 38 bài, 38 bài published, 182 bài tập.` (exit 0)
- `python3 -m unittest discover -s tests -v` → `Ran 7 tests ... OK`
- `node --test tests/test_fsrs.mjs` → `tests 7, pass 7, fail 0`
- `node --check app.js` → OK (không lỗi cú pháp)
- Nhất quán phiên bản: `BUILD_VERSION = "20261030-std1"` (app.js:854) khớp
  `index.html:26`.

### KẾT LUẬN VÒNG 2: ĐẠT — Manager có thể phát hành lô std1

Cả 7 điểm kiểm lại (N-1, Q-2, Q-3, HT-1/2/3, Q-1, HT-4, HT-5) đều ĐẠT với
bằng chứng từ file thật ở trên; bộ lệnh kiểm tra đạt toàn bộ. Không còn lỗi
Nghiêm trọng hay Quan trọng nào trong phạm vi vòng 2. Hai quan sát mức Hoàn
thiện (tổ hợp chéo `我家在学校前面。` chưa được nhận ở prefix-ex5; hai nút
Nghe bấm nối tiếp trong cửa sổ chờ giọng có thể xếp hai utterance) ghi lại
cho lô sau, không chặn phát hành.
