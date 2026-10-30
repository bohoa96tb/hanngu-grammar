# QA-STD2 — Kiểm định độc lập lô std2 (chưa merge)

- Ngày: 2026-10-30. Vai trò: Agent QA, chỉ đọc + chạy kiểm tra, không sửa
  mã/dữ liệu, không đẩy GitHub.
- Căn cứ đọc: `docs/reviews/std2-content-audit.md`,
  `docs/reviews/standardization-2026-10-30.md`, `docs/decisions.md` (D26),
  `docs/schema.md`. Lưu ý tài liệu: file standardization hiện chỉ có các
  mục 0–4 (kết thúc ở 4.3), không có “mục 5”; ghi chép std2 thực tế nằm ở
  D26 + audit + checkpoint. QA đối chiếu theo D26 là chính.
- Phương pháp: tự chấm nội dung bằng kiến thức tiếng Trung trên dữ liệu
  thật (không chỉ đối chiếu báo cáo audit), chạy bộ kiểm tra, chạy harness
  trình duyệt thật, và chạy script CDP riêng gieo tiến độ bản cũ để kiểm
  di trú. Số lượng bài/test chỉ là một phần bằng chứng; kết luận dựa trên
  việc đọc từng ví dụ/bài tập ở các mục 1–6 dưới đây.

## Kết luận: CHƯA ĐẠT — vì đúng 1 lỗi mức Quan trọng (Q1)

Toàn bộ phần còn lại đạt: 8/8 Nhớ nhanh mới, tách bài 了， di trú tiến độ,
hsk_evidence 36/3, harness 19/19, di trú CDP 15/15. Q1 là lỗi chấm oan
biến thể hợp lệ — đúng lớp lỗi mà QA std1 từng kết luận chưa đạt (Q-3 khi
đó) — nên không thể ký đạt khi nó còn tồn tại. Sửa Q1 là thay đổi dữ liệu
một dòng; sau khi sửa chỉ cần QA kiểm lại đúng bài tập đó + validator.

---

## Lỗi theo mức độ

### Nghiêm trọng: không có.

### Quan trọng

- **Q1 — `location-nouns/locnoun-ex5` loại biến thể hợp lệ mà chính bài
  đã công nhận.** Bài tập tự sản xuất “Con chó ở trước cửa” chỉ nhận
  `狗在门前。/狗在门前`. Nhưng bài tập `locnoun-ex6` của cùng bài vừa
  nhận cả `前边` lẫn `前面`, và lời giải của ex6 ghi rõ “nói bằng 前边
  hoặc 前面 đều đúng”. Người học áp dụng đúng điều bài dạy, viết
  `狗在门前面。` hoặc `狗在门前边。`, sẽ bị chấm sai oan. Đây là không
  nhất quán nội bộ trong cùng một bài, ở bài tập tự sản xuất (không có
  khung prompt_zh ép một dạng duy nhất như ex2).
  Sửa: thêm `狗在门前面。/狗在门前面/狗在门前边。/狗在门前边` vào
  `accepted_answers` của locnoun-ex5 (và tăng `content_version`).

### Hoàn thiện (không chặn merge, ghi để Manager cân nhắc)

- H1 — `le-sentence-final-change/le2-ex1`: đáp án `天下雨了` (đúng ngữ
  pháp, kém chuẩn hơn `下雨了`) chưa được nhận. Hint đã chỉ rõ mẫu
  `下雨 + 了` nên mức ảnh hưởng thấp.
- H2 — `le-completion-change/le-ex3` (order): hai thứ tự hoa đề
  `这本书…` xếp được từ bộ token nhưng không nằm trong accepted. Đây là
  cấu trúc ngoài phạm vi HSK1 và ngoài mẫu bài dạy; đề bài đã ghi “có thể
  có hơn một thứ tự đúng” và hai thứ tự được dạy đều được nhận. Chỉ ghi
  nhận, không yêu cầu sửa.
- H3 — Ví dụ có sẵn từ trước lô (không phải thay đổi của std2):
  `complex-suiran-yinwei` ví dụ 3 `虽然他很忙，但是他还是帮我了。` —
  `帮我了` kém tự nhiên hơn `帮了我`. Ngoài phạm vi kết luận của lô này.
- H4 — Tài liệu: `standardization-2026-10-30.md` chưa có mục 5 ghi việc
  std2 như kế hoạch tham chiếu; nội dung tương đương đã có ở D26. Nên bổ
  sung hoặc sửa tham chiếu để lần truy vết sau không mất công tìm.

Quan sát không phải lỗi: chữ 更 còn sót đúng 1 chỗ trong `bi-comparison`
— nằm trong `review.notes` (ghi chép thay đổi “bỏ quy tắc vị trí của 更
khỏi bước 3”), là metadata không hiển thị cho người học, không phải nội
dung dạy và không mâu thuẫn với phần còn lại.

---

## 1. Tám quick_memory thay mới (audit §1.3)

Đối chiếu nguyên văn từng mục với dữ liệu: **8/8 khớp từng ký tự**
(adverbs-du-ye, bei-passive-1, bi-comparison, bu-yao-prohibition,
cunxian-chu, measure-words, verb-reduplication, why-question).

Tự chấm chất lượng móc (không chỉ khớp chữ):
- adverbs-du-ye: mũi tên chọn nghĩa theo nghĩa tiếng Việt — đúng cả bốn
  phó từ đều đứng sau chủ ngữ ở mẫu cơ bản. Đạt.
- bei-passive-1: mở bằng câu hỏi “ai chịu tác động” rồi mới tới khung 被，
  kết bằng bẫy động từ đứng trơ. Đạt.
- bi-comparison: bỏ hẳn phần dịch pattern; giữ thứ tự người hơn + bẫy
  没有/不. Đạt (xem thêm mục 3).
- bu-yao-prohibition: cả hai vế đều là phân biệt （不要 cấm vs 要不要 hỏi).
  Đạt.
- cunxian-chu: ba bẫy thật （着 dính động từ, cần số lượng, không dùng 有）
  thay cho bản dịch pattern cũ. Đạt.
- measure-words: thêm lớp chọn lượng từ theo danh từ + bẫy 两/二. Đạt.
- verb-reduplication: vế cuối nay bám đúng bẫy của redup-ex4 (khối lặp bị
  tách sau tân ngữ). Đạt.
- why-question: bỏ vế chép pattern, giữ hai quy tắc dùng được （为什么 bỏ
  吗； trả lời bằng 因为）. Đạt.

## 2. Hai bài 了 sau tách

Đọc toàn văn cả hai file.

**le-completion-change** (giữ ID cũ, medium, content_version 4):
- Đúng 4 bài tập: le-ex1, le-ex3, le-ex4, le-ex5 — le-ex2 đã rời bài. ✓
- Ví dụ: giữ `我买了这本书。`, thêm mới `我喝了一杯水。` và
  `她买了一件衣服。` — cả hai đều là mẫu Động từ + 了 + lượng từ + tân ngữ
  chuẩn, đáp án/nghĩa đúng. Không còn ví dụ nào chứa 了解. ✓
- Confusion 了解 còn ở bài này (bẫy đọc liǎojiě), đúng vị trí audit đề
  xuất. ✓ Grep toàn bộ 39 file: không bài nào còn ví dụ chứa 了解. ✓
- le-ex1: đáp án duy nhất đúng (`我买了这本书。`), ba phương án nhiễu đều
  sai vị trí 了 thật. le-ex3: cả hai thứ tự được nhận đều hợp lệ (xem H2).
  le-ex4: điểm lỗi `买了` đúng và duy nhất hợp lý （没有 + 买 giữ 了).
  le-ex5: đủ biến thể chính, gồm cả dạng `他昨天去北京了。`. ✓
- Công thức/objective/when_to_use đã bỏ hẳn phần 了 cuối câu, có câu dẫn
  sang bài mới. Không mâu thuẫn nội bộ. ✓

**le-sentence-final-change** (bài mới, medium, ngay sau bài cũ trong
manifest):
- Ví dụ: `我饿了。`, `我会说中文了。` (chuyển sang nguyên vẹn),
  `天黑了。` (mới — mẫu đổi trạng thái chuẩn). 3 ví dụ, có ví dụ xuất phát
  từ ý tiếng Việt. ✓
- le-ex2 chuyển sang còn nguyên vẹn: cùng prompt “Tôi đói rồi”,
  prompt_zh `我饿___。`, hint và accepted `我饿了。/我饿了`. Kiểm chứng bổ
  sung ở mục 9: lịch sử attempts của le-ex2 hiển thị trong nhà mới. ✓
- le2-ex1 (tự sản xuất `下雨了。`): đúng, duy nhất theo hint (xem H1).
  le2-ex2 (error_spot thói quen `他每天六点起床了。` → lỗi ở `了`): đúng
  và duy nhất hợp lý; khớp công thức bước 3 và confusion 1 của chính bài.
  le2-ex3 (bài chốt phân biệt): bốn lựa chọn gồm ba câu 了 sau động từ
  (`我买了这本书。`, `他昨天去了北京。`, `我喝了一杯水。`) và một câu 了
  cuối câu (`我会说中文了。`) — đáp án đúng duy nhất, và việc phân biệt
  dựa trên vị trí thật của 了 chứ không dựa vào nghĩa tiếng Việt. Bài
  chốt làm đúng việc phân biệt hai cách dùng. ✓
- Hai confusion đều nhắm đúng lỗi của 了 cuối câu (thói quen hiện tại;
  lạm dụng theo tiếng Việt “đã…rồi”). ✓

## 3. bi-comparison — bỏ quy tắc 更

- Công thức bước 3 nay chỉ còn: “Mở rộng: 也/都 đặt trước 比 （他也比我高）.”
  Không còn quy tắc/ví dụ nào về 更 trong formula, pattern, objective,
  when_to_use, quick_memory (bản mới), ví dụ hay bài tập. ✓
- Toàn file còn đúng 1 ký tự 更 — trong `review.notes` (xem “Quan sát”
  ở trên), không phải nội dung dạy. Confusions không nhắc 更. ✓
- Các phần còn lại nhất quán: quick_memory mới khớp công thức （没有 =
  “không bằng”, cấm 不 sau 比）; bi-ex4 vẫn chấm `不` (bản sửa std1 giữ
  nguyên); `hsk_evidence: verified` khớp hệ quả D26 (bỏ điểm vượt cấp →
  bài thành đủ bằng chứng). ✓

## 4. prefix-suffix / location-nouns — chuyển 边

**prefix-suffix** (còn 第 · 小 · 们）:
- 边 vắng mặt ở mọi trường người học nhìn thấy: title (“Ngữ tố gắn danh
  từ: 第 · 小 · 们”), pattern, objective, formula (3 bước), quick_memory
  (đã bỏ vế 边 theo đúng lưu ý của audit), 3 ví dụ, 4 bài tập
  (prefix-ex1..ex4; prefix-ex5 đã rời bài). Hai ký tự 边 còn lại trong
  file đều nằm ở `review.notes`. 左/右： 0 lần trong toàn file. ✓
- Sàn: 3 ví dụ / 4 bài tập, medium — đạt sàn do validator thực thi (mục 7)
  và phủ đủ ba chủ điểm còn lại. `hsk_evidence: verified` khớp D26 (điểm
  vượt cấp 左/右边 đã bị loại khỏi nội dung). ✓

**location-nouns**:
- Formula thêm bước 4 “Dạng ghép 边”: chỉ dạy `前边/后边`, khẳng định đây
  là dạng từ của 前/后 và vẫn đứng sau danh từ. Toàn file không có 左，
  không có 右 — không dạy lén hai phương vị HSK2. ✓
- Ví dụ phương vị mới `我的家在学校前边。` đúng và khớp mẫu bài dạy; tổng
  4 ví dụ / 6 bài tập, đạt sàn medium. ✓
- locnoun-ex6 (bài chuyển từ prefix-ex5, đã đổi ID theo D26): đáp án đúng,
  nhận đủ 8 biến thể （我的家/我家 × 前边/前面 × có/không dấu 。) — phần
  chuyển giao làm đúng, kể cả việc mở rộng biến thể so với bản std1. ✓
- Ngoại lệ duy nhất của mục này là Q1 ở locnoun-ex5 (xem phần lỗi).

## 5. complex-suiran-yinwei

- Ví dụ mới cho cặp 因为： `因为明天有考试，所以我今天在家学习。` — câu
  đúng, và **không trùng** với bất kỳ câu bài tập nào (đã đối chiếu với
  toàn bộ accepted_answers; hai chỗ trùng ví dụ↔bài tập còn lại là ex1/ex2
  dùng câu ví dụ cũ làm phương án đúng/đáp án điền — đó là thiết kế giàn
  giáo có từ trước std2, không phải ví dụ mới). Ví dụ cân 2 虽然 — 2 因为. ✓
- complex-ex6 (mới, đặt cuối, không đánh số lại ex1–ex5 — ID và nội dung
  5 bài cũ giữ nguyên): đáp án chuẩn
  `虽然下雨，但是我还是去上学了。` đúng; biến thể hợp lệ chính đều được
  nhận （今天下雨， bỏ 了 cuối, ± dấu 。). Dạng lược 但是 không được nhận
  là nhất quán với chính bài (confusion 3 + bước công thức 4: người mới
  dùng đủ cặp) và hint đã nói rõ yêu cầu cặp — không tính là chấm oan. ✓

## 6. hsk_evidence

- Đếm trên dữ liệu thật: **verified 36 · partial 3 · thiếu 0** (trên 39
  bài published) — khớp D26. ✓
- Ba note partial, đọc từng chữ:
  - de-possessive: nêu 得/地 thuộc HSK2, chỉ nhắc để phân biệt, không dạy
    cách dùng — đúng nội dung đã duyệt. ✓
  - modal-xiang-yao: nêu nghĩa “sắp xảy ra” của 要， mẫu đầy đủ thuộc HSK2
    và chưa dạy — đúng. ✓
  - question-words: nêu 几/多少 chưa có mục tương ứng trong danh mục đối
    chiếu của dự án, đang chờ kiểm tra bản gốc — trung thực, không tự
    khẳng định cấp khác. ✓
  Cả ba note trong khoảng 20–220 ký tự theo schema, viết cho người học.
- Đọc mã render (`hskEvidenceHTML` trong app.js): verified →
  “✓ Đã đối chiếu đề cương HSK 3.0: toàn bộ nội dung thuộc HSK n.”;
  partial → “◐ Đã đối chiếu đề cương HSK 3.0: phần chính thuộc HSK n;
  [note]” (note được escape). Thiếu trường/status lạ → không render,
  không vỡ trang. Kiểm chứng hiển thị thật ở mục 10. ✓

## 7. Bộ kiểm tra tự động (chạy thật)

- `python3 scripts/validate.py` → **ĐẠT: 39 bài, 39 bài published, 186
  bài tập**, exit 0. (186 = 182 của std1 + 3 bài tập le2 mới + 1
  complex-ex6; prefix-ex5→locnoun-ex6 là chuyển nhà, không đổi tổng.)
- `python3 -m unittest discover -s tests` → **9 tests, OK**.
- `node --test tests/test_fsrs.mjs` → **7/7 pass**.
- `node --check app.js` → **OK**.

## 8. Harness trình duyệt (tests/browser-check.mjs)

Điều kiện chạy đúng quy định: đã xóa `/tmp/hanngu-cdp-profile` trước
(harness tự tạo hồ sơ tạm mới mỗi lần chạy), máy chủ tĩnh tại thư mục dự
án trên cổng 8901 (đã kiểm tra phục vụ đúng file bài mới), chạy
`node tests/browser-check.mjs http://127.0.0.1:8901/`.

**VERDICT: PASS 19/19, exit 0.** Từng nhóm:
- Tràn ngang: PASS ở cả 360/390/768/1280 cho trang chủ và trang bài
  (scrollWidth không vượt bề rộng ở mọi mức). Đây là kiểm tra trình duyệt
  thật, không phải kiểm tra CSS tĩnh.
- Lỗi console: **0** lỗi console/exception trên các trang đã mở.
- Bàn phím: focus được nút chọn bằng bàn phím; Space chỉ chọn, không chấm;
  Enter mới chấm và hiện phản hồi đúng.
- Nút nghe/dừng: trạng thái nút và cờ speaking chuyển đúng; dòng cảnh báo
  thiếu giọng zh hiển thị (đây là hành vi đúng theo D24). Harness chỉ kiểm
  trạng thái — **âm thanh thật vẫn not_run** (xem Giới hạn).
- Luồng làm bài + lưu tiến độ: hoàn thành giữ sau tải lại; prefs giữ sau
  tải lại; Ôn tập khóa nút rate trước khi đối chiếu, hiện Nhớ nhanh khi
  đối chiếu, ghi rate thành công.

## 9. Di trú tiến độ sau tách bài (script CDP riêng, chạy thật)

Gieo `hanngu-progress-v2` đúng định dạng bản cũ: người học đã hoàn thành
`le-completion-change` (bài gộp cũ), attempts đủ 5 bài le-ex1..le-ex5
(gồm le-ex2), và một thẻ FSRS thật do chính `srs.mjs` của dự án sinh
(đánh giá Again hai ngày trước, 1 event). Tải app bản mới trên cổng 8901
(hồ sơ `/tmp/hanngu-cdp-profil
...[truncated 2162 chars]
---

## Vòng 2 — Kiểm lại các điểm vòng 1 (2026-10-30)

Phạm vi hẹp, chỉ đọc + chạy kiểm tra, không sửa mã/dữ liệu.

### 1. Q1 — location-nouns/locnoun-ex5: ĐÃ SỬA ĐÚNG

`accepted_answers` hiện có đủ 6 dạng: `狗在门前。/狗在门前/狗在门前面。/
狗在门前面/狗在门前边。/狗在门前边` — tức cả ba gốc `前/前面/前边`
(bài dạy `前`, công thức bước 4 dạy dạng ghép `前边`, và lời giải
locnoun-ex6 công nhận `前面` cũng đúng) × có/không dấu `。`.

Tự chấm biến thể còn lại theo đúng phạm vi bài dạy:
- Dạng chèn `的` (`狗在门的前面。` v.v.): bài không dạy mẫu này — pattern
  và mọi ví dụ đều là danh từ nơi chốn + phương vị trực tiếp, ex6 cũng
  không nhận dạng có `的`. Ngoài phạm vi bài dạy, không tính là chấm oan.
- Dạng bỏ `在` (`狗门前`): không thành câu vị ngữ hoàn chỉnh theo khung
  câu bài dạy (chủ ngữ + `在` + nơi chốn + phương vị, như ex1–ex3).
  Không phải biến thể hợp lệ trong phạm vi bài.
- Các dạng đổi danh từ (`门口`) hoặc `之前/前边儿` đều là từ/cấu trúc
  bài không dạy, không tính.
Kết luận: trong phạm vi bài dạy, không còn biến thể hợp lệ nào của
“Con chó ở trước cửa” bị loại. Q1 khép.

### 2. H1 — le-sentence-final-change/le2-ex1: ĐÃ SỬA

`accepted_answers` hiện có `下雨了。/下雨了/天下雨了。/天下雨了` —
`天下雨了` đã được nhận.

### 3. H3 — complex-suiran-yinwei ví dụ 3: ĐÃ SỬA, NHẤT QUÁN

- zh: `虽然他很忙，但是他还是帮了我。` — đã là `帮了我` (không còn `帮我了`).
- tokens: `…还是/帮/了/我` — ghép lại khớp zh (trừ dấu `。` cuối).
- pinyin: `…háishì bāng le wǒ.` — khớp `帮了我` từng âm tiết.
Ba trường nhất quán với nhau và với nghĩa tiếng Việt. H3 khép.

### 4. Bộ kiểm tra tự động (chạy lại)

- `python3 scripts/validate.py` → ĐẠT: 39 bài, 39 bài published, 186
  bài tập, exit 0.
- `python3 -m unittest discover -s tests` → Ran 9 tests, OK.

### Kết luận vòng 2: ĐẠT — ký phát hành std2

Q1 (lỗi Quan trọng duy nhất của vòng 1) đã sửa đúng và đủ; hai điểm
Hoàn thiện H1, H3 cũng đã sửa và nhất quán. Validator + unittest đạt.
Không còn lỗi chặn phát hành trong phạm vi kiểm lại của vòng 2.
