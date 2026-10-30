# ND-01 — Kết quả rà soát ngữ pháp/đáp án độc lập (Agent Nội dung, 30/10/2026)

Phạm vi: 38 bài / 181 bài tập / 107 confusions. Manager đã tự kiểm chứng
lại các ca nghiêm trọng A1, A2, A4, A5 và ca trùng bài tập trước khi chấp
nhận báo cáo này. Ghi chú kỹ thuật: `norm()` trong app.js xóa dấu câu và
khoảng trắng khi chấm fill/choice nên khác dấu câu không phải lỗi; các lỗi
fill dưới đây đều là chuỗi chữ Hán khác nhau bị loại thật.

## A. Nghiêm trọng — Manager đã xác minh, giao ND-02 sửa
- A1. bi-comparison/bi-ex4: accepted `比` → sửa thành `不`.
- A2. le-completion-change/le-ex1: distractor `我买这本书了。` là câu đúng
  (bài này tự dạy 了 cuối câu). Thay bằng distractor sai thật
  `我买这了本书。` (phương án `我买了书这本。` đã có sẵn trong options).
- A3. modal-hui-neng-keyi/mo-ex4: thêm biến thể `他会开车。`.
- A4. verb-reduplication: formula gán sai `走来走去` là trùng điệp ABAB.
  Sửa theo bản nháp ND-02 (ABAB: 研究研究/休息休息; 走来走去 là mẫu V来V去 riêng).
- A5. Thêm biến thể: why-ex2 `他为什么没有来？`; guo-ex2 `我没有去过中国。`;
  result-ex2 `他做完作业了。`.

## B. Quan trọng — giao ND-02 sửa
- B1. ma-ex1: thay distractor `你是老师？` bằng `你是吗老师？`.
  shide-ex1: ghi rõ "(dùng mẫu 是……的)" trong đề.
  mo-ex1: thay distractor `我能说中文。` bằng câu sai thật `我说能中文。`.
  mo-ex2: thêm `这里能拍照吗？` và sửa explanation thừa nhận 能.
- B2. Thêm biến thể fill: le-ex5 (`昨天他去了北京。`, `他昨天去北京了。`),
  bu-ex5 (`昨天我没买书。`), qw-ex2 (`你去哪里？`), complex-ex2 (lặp chủ ngữ 他),
  complex-ex5 (`…所以我没有去。`), zai-ex5 (`她正在喝茶。`), redup-ex5
  (`你试一试。`), redup-ex2 (`我们想想。`), gei-ex5 (`我送她一支笔。`),
  result-ex5 (`我读完了这本书。`, `我把这本书看完了。`), shide-ex5
  (`我是坐公交车去的。`), bi-ex2 (`他比我高很多。`).
  ba-ex2: ghi rõ "(dùng câu chữ 把)" trong đề thay vì thêm đáp án không 把.
  ma-ex4: explanation ghi nhận `你忙不忙？` cũng đúng (học ở bài sau).
- B3. Viết lại explanation theo đúng khối key: gei-ex4 (key 一本书),
  jianyu-ex4 (key 去). 29/30 error_spot còn lại đã kiểm: key khớp.
- B4. ma-question confusion 2 (`是吗。`): ví dụ sai — thay bằng bẫy
  `你忙不忙吗？` (câu hỏi chính-phản không thêm 吗).
  Bỏ ngưỡng tuyệt đối "几 dưới 10" ở measure-words/question-words:
  "几 thường kỳ vọng số nhỏ, 多少 không kỳ vọng khoảng số".
  complex formula: bỏ tuyên bố tuyệt đối "hai nửa phải đi cùng nhau"
  (bản nháp ND-02 đã mềm hóa + bước Mở rộng).
  result-complement confusion `我不做完作业。`: thêm ngữ cảnh đích và đổi
  verdict thành doi_nghia. adverbs-du-ye confusion `我也一杯茶。`: đổi
  verdict thành thieu_ngu_canh (tỉnh lược 要 khi gọi món).
  hen formula: bỏ 太 khỏi nhóm từ nhấn mạnh (bản nháp đã sửa).
  measure-words confusion `三个书`: thống nhất là sai lượng từ
  (verdict sai_ngu_phap), khớp cách chấm của mw-ex1.
  zhe-accompanying confusion `他笑着。`: sửa cách diễn đạt thành
  "chưa thành câu mẫu kèm theo".
- B5. Bài tập trùng hệt nhau you-ex2 = bu-ex2 (`我没有姐姐。`): đổi bu-ex2
  sang ngữ cảnh khác (Tôi không có tiền — 我没有钱。).
  prefix-suffix: chủ điểm 边 có 0 bài tập — ND-02 thêm 1 bài fill về 边.

## Để lô sau (Manager quyết, không làm trong ND-02)
- Tách bài: le-completion-change (2 bài), prefix-suffix (2 bài),
  complex-suiran-yinwei (2 bài) — xem D25.
- shi-de-emphasis: bổ sung bài tập nơi chốn + phủ định 不是……的 hoặc thu
  hẹp objective. modal-hui-neng-keyi: thêm order/bài đối chiếu cặp từ.
  question-words: bài sản sinh cho 几/多少. jianyu: bài tập cho 让.

## Đã kiểm, không có lỗi
37 order còn lại; các choice có ngữ cảnh tốt: dir-ex1, pron-ex1,
haishi-ex1, complex-ex1.
