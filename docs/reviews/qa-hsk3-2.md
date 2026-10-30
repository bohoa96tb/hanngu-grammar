# QA độc lập — lô HSK3-2 (30/10/2026)

Phạm vi: 4 bài mới (complex-hypothesis, complex-condition,
result-complement-2, potential-complement-1), 2 bài sửa
(zhe-continuation, adverbs-du-ye), đối chiếu 5 bài nền
(complex-suiran-yinwei, result-complement, state-complement-de,
yi-jiu-tight, cunxian-chu). QA chỉ kiểm định, không sửa dữ liệu.
Bốn bài mới vẫn là “đã rà soát nội bộ” — audio chưa nghiệm thu trên
thiết bị thật; số lượng bài/test dưới đây chỉ là bằng chứng hệ thống,
không phải bằng chứng chất lượng nội dung.

## Kết luận: ĐẠT CÓ ĐIỀU KIỆN

- Hệ thống: đạt toàn bộ (validator, test, harness 19/19, DOM).
- Nội dung: đáp án/biến thể/lời giải của 20 bài tập mới và 2 bài tập
  thêm (adv-ex6, adv-ex7) đều đúng; không bài tập nào chấm sai.
- Điều kiện: sửa bắt buộc 1 điểm Quan trọng Q-1 (mục 2a — verdict
  “sai ngữ pháp” cho một câu đúng ngữ pháp) trước khi chốt lô.
  Các điểm còn lại mức Hoàn thiện, khuyến nghị sửa cùng vòng.

## 1. Kiểm nội dung 4 bài mới (tự chấm từng bài tập)

### complex-hypothesis
- chyp-ex1 (choice): đáp án duy nhất đúng; 3 phương án nhiễu sai vị
  trí thật. ĐẠT.
- chyp-ex2 (fill): nhận cả hai mẫu （如果……就…… và ……的话，就……),
  khớp prompt_zh hai chỗ trống. ĐẠT.
- chyp-ex3 (order), chyp-ex4 (error_spot, key 的话): đúng, lời giải
  khớp. ĐẠT (typo nhỏ ở lời giải ex4 — xem H-7).
- chyp-ex5 (tự sản xuất): 8 biến thể đúng, nhưng thiếu biến thể hợp lệ
  chính “我周末不忙的话，我就去看你。” — bài nhận “周末我不忙的话…”
  (chủ ngữ sau thời gian) nhưng không nhận “我周末不忙的话…”
  (chủ ngữ trước thời gian), thiếu đối xứng (H-3).
- Ví dụ: cả 5 câu tự nhiên, đúng mẫu. quick_memory là móc cấu trúc
  thật, trừ chữ “luôn” tuyệt đối (Q-1).

### complex-condition
- ccon-ex1 (choice): đáp án duy nhất đúng theo logic cặp
  只有……才……; hai phương án ghép chéo sai thật. Nội dung câu mẫu
  “只有有票” kém tự nhiên — xem điểm 2b (H-1), không phải lỗi chấm.
- ccon-ex2 (fill): chỉ nhận 只要……就…… — chấm công bằng, xem 2d.
- ccon-ex3 (order), ccon-ex4 (error_spot, key 就): đúng. ĐẠT.
- ccon-ex5 (tự sản xuất): phủ biến thể tốt （互联网/网络， 学/学习，
  có/không dấu 。). ĐẠT.
- Confusions ghép chéo hai chiều: đúng bản chất, verdict hợp lý.
  quick_memory (ẩn dụ “một đường duy nhất / hễ có là tới”) là móc
  phân biệt thật. ĐẠT.

### result-complement-2
- res2-ex1…ex5: đáp án đúng và duy nhất hợp lý; ex2 được prompt_zh
  gò sẵn 我没___ nên không oan; ex5 (tự sản xuất) phủ 我姐姐/姐姐.
  ĐẠT.
- Confusions: phủ định bỏ 了， vị trí 到， vị trí 上 — đều đúng.
- Phạm vi 上/住： xem điểm 2e.

### potential-complement-1
- pot1-ex1 (choice): 做不完 duy nhất đúng; 不做完/做得不完/做完不
  đều sai thật trong ngữ cảnh này. ĐẠT.
- pot1-ex2 (fill): chỉ nhận 看不见. “看不清” (nhìn không rõ) không
  được nhận nhưng prompt tiếng Việt nói “nhìn không thấy” và hint
  khóa sẵn 看不见 — chấm công bằng, không cần sửa.
- pot1-ex3 (order), pot1-ex4 (error_spot, key 不): đúng. ĐẠT.
- pot1-ex5 (tự sản xuất): 8 biến thể （这道/这个菜 × 太辣了/很辣）
  đủ biến thể chính; có thể thêm họ 吃不下去 (H-7, tùy chọn).
- Ví dụ dùng lại bổ ngữ trạng thái 说得太快/说得很慢 — nhất quán với
  state-complement-de; when_to_use phân biệt hai chữ 得 rõ. ĐẠT.

## 2. Năm điểm biên tập tự khai — kết luận từng điểm

a. **complex-hypothesis “không bỏ 就” — Q-1 QUAN TRỌNG, sửa bắt
   buộc.** Hình thức diễn đạt nhất quán với tiền lệ yi-jiu-tight
   (cùng khung “mẫu cố định, bỏ 就 là mất mẫu”; bước 3 công thức đã
   có chốt chặn “theo mẫu chuẩn của bài” — phần này ĐẠT). Nhưng nền
   ngữ học khác nhau: trong 一……就……， 就 là thành phần cấu trúc
   bắt buộc; còn với 如果/的话， 就 **có thể lược** trong tiếng
   Trung thật （如果明天下雨，我留在家里 là câu đúng ngữ pháp). Ba
   chỗ chưa có chốt chặn và nói tuyệt đối: (1) confusion 1 gán
   verdict `sai_ngu_phap` cho một câu đúng ngữ pháp, lời giải chỉ
   nói “Thiếu 就”; (2) quick_memory: “vế kết quả **luôn** có 就”;
   (3) objective “không quên 就” — chỗ này chấp nhận được vì là mục
   tiêu học tập. Không bài tập nào chấm oan vì điểm này (ex2/ex5 đều
   được scaffold/hint gò theo mẫu), nên không phải lỗi chấm; nhưng
   verdict sai bản chất là dạy quá tuyệt đối, cùng họ với lỗi QA
   vòng 1 lô std1 từng chặn phát hành.
   Sửa đề xuất: confusion 1 đổi verdict → `thay_duoc_co_dieu_kien`
   (đúng tiền lệ complex-suiran-yinwei confusion 3 về việc bỏ 但是）,
   lời giải thêm: “Trong giao tiếp thật có thể lược 就 khi ý đã rõ;
   bài này yêu cầu mẫu đủ để người học nắm chắc.” quick_memory bỏ
   “luôn” → “vế kết quả có 就 đứng đầu (mẫu chuẩn của bài)”. Giữ
   nguyên bước 3 công thức (đã có chốt chặn).
b. **“只有有票 / 只有有钱” — H-1 HOÀN THIỆN, nên sửa.** Cả hai câu
   đúng ngữ pháp nhưng “只有 + 有…” hai chữ 有 kề nhau nghe vụng,
   và đây là câu mẫu người học ghi nhớ (ccon-ex1 đáp án đúng;
   complex-hypothesis confusion 3). Không phải lỗi chấm (đáp án ex1
   vẫn duy nhất đúng theo cặp từ). Đề xuất: ccon-ex1 đổi ngữ cảnh
   sang động từ: “只有买了票，才能进去。” và chỉnh 3 phương án
   nhiễu tương ứng （只要买了票，才能进去。/ 只有买了票，就能进去。/
   买了票只有，才能进去。); hypothesis confusion 3 đổi thành
   “只有钱够了，我才买这辆车”.
c. **potential-complement-1 confusion 2 — verdict ĐẠT, lời giải
   H-2 HOÀN THIỆN.** Gán `doi_nghia` (không gán sai ngữ pháp) là
   đúng hạng: “我不能听懂这句话” đúng ngữ pháp, và 能 đặt trước
   động từ thật sự kéo nghĩa về khả năng/điều kiện nói chung. Tuy
   nhiên lời giải nói “sẽ đổi ý sang ‘không có khả năng/không được
   phép nghe hiểu’” hơi quá tay — trong một số ngữ cảnh 不能听懂
   gần nghĩa với 听不懂. Đề xuất thêm một câu chốt: “Câu này không
   sai ngữ pháp; khi nói khả năng nói chung vẫn gặp, nhưng ‘nghe
   câu này mà không hiểu’ (kết quả của lần nghe cụ thể) thì 听不懂
   là dạng chính xác.” Bước 4 công thức (“không thay bằng 能”)
   chấp nhận được vì nói trong phạm vi ý mục tiêu.
d. **ccon-ex2 chỉ nhận 只要……就…… — ĐẠT, không chấm oan.** Ba lớp
   gò đủ rõ: hint ghi thẳng mẫu “只要……，就…… (điền cả hai
   chỗ)”, prompt_zh có hai chỗ trống đúng vị trí cặp từ, và
   prompt_vi dùng “Chỉ cần… tôi sẽ…” — đúng ngữ nghĩa điều kiện
   đủ. Dùng 只有……才…… ở đây sẽ đổi nghĩa và lệch cả chữ “sẽ”
   trong đề. Không cần sửa.
e. **result-complement-2 phạm vi 上/住 — nhất quán, H-6 HOÀN
   THIỆN tùy chọn.** Mọi thứ bài tập đòi đều đã dạy trước trong
   bài: 关上 có ở bước 3 công thức + confusion 3 nên ex3 (xếp câu)
   không quá mức; 记住 có ở bước 3 + ví dụ 3 nên ex4 (tìm lỗi)
   không quá mức; bài tự sản xuất ex5 chỉ đòi 到. Chỉ lệch nhẹ ở
   câu chữ: when_to_use nói 上 “chỉ ở mức nhận biết cơ bản” trong
   khi ex3 bắt xếp câu với 关上 — xếp khối cho sẵn vẫn thuộc nhận
   biết/nửa sản xuất, chấp nhận được; nếu muốn khớp tuyệt đối thì
   sửa when_to_use thành “luyện ở mức xếp câu và nhận diện lỗi”.

## 3. zhe-continuation — tách 存现

- Bước 2 mới ĐẠT mục tiêu chính: chỉ nêu “cũng gặp trong câu tồn
  hiện… chỉ cần nhận biết… học đầy đủ ở cunxian-chu”, không dạy
  lại quy tắc số lượng + danh từ, không dạy cấm dùng 有 — hai quy
  tắc đó nay chỉ còn ở cunxian-chu. Confusions của bài không còn
  mục nào dạy mẫu 存现.
- Tồn dư (H-5 HOÀN THIỆN): (1) when_to_use vẫn liệt kê “nơi chốn +
  động từ + 着 + người/vật (tồn hiện dạng 2)” như một cách dùng
  của chính bài; (2) lời giải zhe-ex3 vẫn phát biểu nguyên quy tắc
  thứ tự tồn hiện (“Thứ tự tồn hiện: nơi chốn → động từ + 着 →
  danh từ”). Vì vậy ghi chú review “không dạy lại nguyên mẫu” và
  “zhe-ex3 vẫn là luyện nhận biết” đúng khoảng chín phần: ex3 xếp
  khối cho sẵn là nhất quán với bước 2 nếu coi là nhận biết, nhưng
  lời giải vẫn dạy lại quy tắc. Đề xuất: rút lời giải ex3 thành
  “Đây là dạng tồn hiện ở bước 2 — mẫu đầy đủ học ở bài
  cunxian-chu.” và rút vế sau của when_to_use thành “cũng gặp
  trong câu tồn hiện (chỉ nhận biết, học kỹ ở bài cunxian-chu)”.

## 4. adverbs-du-ye — adv-ex6, adv-ex7

- adv-ex6: đáp án duy nhất thật. Ba phương án còn lại
  （我还吃饭没 / 还我没吃饭 / 我没还吃饭） đều sai ngữ pháp; đáp án
  “我还没吃饭” khớp prompt “vẫn chưa ăn”. ĐẠT.
- adv-ex7: cả 12 biến thể đều tự nhiên, kể cả các biến thể có 吧/请
  （请你明天再来吧 là lời mời lịch sự + 吧 làm mềm, dùng được).
  Thiếu một biến thể hợp lệ chính (H-4 HOÀN THIỆN): “明天你再来
  吧。” — bài đã nhận “明天你再来。” và “你明天再来吧。” nhưng
  không nhận tổ hợp của chính hai biến thể đó. Đề xuất thêm
  “明天你再来吧。” và bản không dấu 。; tùy chọn thêm “明天再来。”
- adv-ex6/ex7 lấp đúng khoảng trống cũ （还/再 trước đây chỉ có ở
  ví dụ và công thức); không đánh số lại bài cũ. ĐẠT.

## 5. Nhất quán liên bài

- result-complement-2 ↔ result-complement (dạng 1): cùng một quy
  tắc phủ định （没 + động từ + bổ ngữ, bỏ 了）, dạng 2 ghi rõ
  “giống hệt dạng 1” ở cả công thức và lời giải ex2 — không mâu
  thuẫn. Confusion “不做完” (doi_nghia) của dạng 1 và “做不完”
  của potential-complement-1 phân biệt nhất quán (chưa đạt kết
  quả ≠ không làm được).
- potential-complement-1 phân biệt 能 / khả năng bổ ngữ: chính
  xác ở công thức bước 4 (khả năng nói chung, kỹ năng, điều kiện
  bên ngoài ↔ kết quả cụ thể của chính hành động); chỉ cần mềm
  hóa confusion 2 theo H-2.
- Câu phức: đã grep cả 6 file bài mới/sửa — **không file nào chứa
  可是**; không bài nào dùng lén 虽然……可是…… (mẫu HSK3 chưa
  dạy). Hai bài câu phức mới cũng không dùng 虽然， và tham chiếu
  chéo hypothesis ↔ condition khớp nhau hai chiều (giả định chung
  ↔ điều kiện cần/đủ). complex-suiran-yinwei giữ nguyên cặp
  虽然……但是……/因为……所以…… — không mâu thuẫn.
- potential-complement-1 ↔ state-complement-de: ví dụ 说得太快/
  说得很慢 đúng mẫu bổ ngữ trạng thái đã dạy; when_to_use nêu rõ
  hai vai của 得 — nhất quán.

## 6. Kiểm hệ thống (chạy thật 30/10/2026)

- `python3 scripts/validate.py` → **ĐẠT: 43 bài, 43 published,
  208 bài tập** (cả 6 bài đều có hsk_evidence; 4 bài mới = verified).
- `python3 -m unittest discover -s tests` → **9 tests, OK**.
- `node --test tests/test_fsrs.mjs` → **7 pass, 0 fail**.
- `node --check app.js` → OK.
- Harness `node tests/browser-check.mjs http://127.0.0.1:8901/`
  (máy chủ tĩnh đã chạy sẵn; hồ sơ trình duyệt mới mỗi lần chạy)
  → **VERDICT: PASS 19/19**: không tràn ngang ở 360/390/768/1280
  (trang chủ + trang bài), đủ mục A/F + điều hướng, bàn phím
  (focus, Space chọn không chấm, Enter chấm), trạng thái nghe/dừng,
  tiến độ + prefs bền sau tải lại, Ôn tập khóa rate trước khi hiện
  đối chiếu và hiện Nhớ nhanh, **0 lỗi console**.
- Kiểm DOM bổ sung (script CDP riêng, hồ sơ mới): trang chủ có
  **43 liên kết bài duy nhất** (45 liên kết gồm thẻ “Tiếp tục
  học”), đủ 4 bài mới; bài potential-complement-1 mở được, có mục
  A và F, 5 bài tập, và hiện đúng dòng đối chiếu ở khối nguồn:
  “✓ Đã đối chiếu đề cương HSK 3.0: toàn bộ nội dung thuộc HSK 3.”
  Điều hướng kề cũng đúng thứ tự manifest (trước:
  result-complement-2; sau: complex-hypothesis).

## Danh sách lỗi theo mức độ

| Mã | Mức | Vị trí | Việc cần làm |
|---|---|---|---|
| Q-1 | Quan trọng (sửa bắt buộc) | complex-hypothesis: confusions[0], quick_memory | Đổi verdict → thay_duoc_co_dieu_kien + thêm chốt chặn “có thể lược trong giao tiếp”; bỏ “luôn” trong quick_memory (chi tiết mục 2a) |
| H-1 | Hoàn thiện | complex-condition ccon-ex1; complex-hypothesis confusions[2] | Đổi “只有有票/只有有钱” sang ngữ cảnh động từ/tiền đủ (mục 2b) |
| H-2 | Hoàn thiện | potential-complement-1 confusions[1] | Thêm câu chốt “không sai ngữ pháp…” (mục 2c) |
| H-3 | Hoàn thiện | complex-hypothesis chyp-ex5 | Thêm biến thể “我周末不忙的话，我就去看你。” (± 。); tùy chọn thêm họ 如果…的话 |
| H-4 | Hoàn thiện | adverbs-du-ye adv-ex7 | Thêm “明天你再来吧。” (± 。) |
| H-5 | Hoàn thiện | zhe-continuation when_to_use, lời giải zhe-ex3 | Rút hai chỗ còn dạy lại quy tắc 存现 (mục 3) |
| H-6 | Hoàn thiện (tùy chọn) | result-complement-2 when_to_use | Khớp câu chữ “nhận biết cơ bản” với mức luyện của ex3/ex4 (mục 2e) |
| H-7 | Hoàn thiện (lặt vặt) | complex-hypothesis lời giải chyp-ex4; potential-complement-1 pot1-ex5 | Typo “就休息。hoặc” dính chữ — thêm dấu cách/ngắt câu; tùy chọn thêm biến thể 吃不下去 cho ex5 |

Không có lỗi Nghiêm trọng: không đáp án sai, không chấm oan, không
công thức dạy sai vị trí/thành phần ở cả 4 bài mới. Sau khi sửa Q-1
(nên kèm H-1…H-5 trong cùng vòng), lô đủ điều kiện nghiệm thu; các
bài mới vẫn giữ trạng thái “đã rà soát nội bộ” cho tới khi audio
được nghiệm thu trên thiết bị thật.

## Vòng 2 — kiểm lại các điểm vòng 1 (30/10/2026)

QA đọc trực tiếp 6 file bài đã sửa (complex-hypothesis,
complex-condition, potential-complement-1, adverbs-du-ye,
zhe-continuation, result-complement-2) và chạy lại validator.
Kết quả từng điểm:

1. **Q-1 — ĐÃ SỬA ĐẠT.** complex-hypothesis confusions[0]:
   verdict đã đổi thành `thay_duoc_co_dieu_kien`; lời giải mở đầu
   “Câu này không sai ngữ pháp: trong giao tiếp thật có thể lược
   就 khi ý đã rõ, nhất là khi vế điều kiện đã chốt bằng 的话” và
   chốt “bài này dạy mẫu chuẩn đầy đủ… khi luyện tập phải giữ 就”
   — thừa nhận lược 就 hợp lệ ngoài đời nhưng giữ mẫu chuẩn khi
   luyện, đúng đề xuất vòng 1. quick_memory nay là “vế kết quả có
   就 đứng đầu (mẫu chuẩn của bài)” — không còn “luôn”. Quét toàn
   bộ trường dạy học của bài (trừ review.notes): không còn “luôn”;
   phát biểu “không bỏ 就” duy nhất còn lại ở bước 3 công thức đã
   có chốt chặn “theo mẫu chuẩn của bài”; các cụm “bắt buộc phải
   có” còn lại đều nói về 只有……，才…… (đúng bản chất), không
   phải về 就. (“luôn”/“只有有” chỉ còn trong review.notes — nhật
   ký thay đổi, không phải nội dung dạy.)
2. **H-1 — ĐÃ SỬA ĐẠT.** ccon-ex1: đáp án duy nhất
   “只有买了票，才能进去。”, 3 phương án nhiễu sai thật
   （只要……才能 ghép chéo; 只有……就能 ghép chéo;
   “买了票只有，才能进去。” sai trật tự) — đáp án duy nhất và câu
   mẫu tự nhiên. complex-hypothesis confusions[2] đã đổi ví dụ
   thành “只有钱够了，我才买这辆车”.
3. **H-2 — ĐÃ SỬA ĐẠT.** potential-complement-1 confusions[1]:
   lời giải đã thêm câu chốt “Câu này không sai ngữ pháp; khi nói
   khả năng nói chung vẫn gặp, nhưng ‘nghe câu này mà không hiểu’
   (kết quả của lần nghe cụ thể) thì 听不懂 là dạng chính xác.”;
   verdict giữ `doi_nghia`. ĐẠT.
4. **H-3/H-4 — ĐÃ SỬA ĐẠT.** chyp-ex5 accepted_answers đã có cả
   “我周末不忙的话，我就去看你。” và bản không dấu 。 (tổng 10 biến
   thể). adv-ex7 đã có “明天你再来吧。” và bản không dấu 。
   (tổng 14 biến thể).
5. **H-5 — ĐÃ SỬA ĐẠT.** zhe-continuation when_to_use nay viết
   “着 cũng gặp trong câu tồn hiện (chỉ nhận biết ở bài này, học
   kỹ ở bài cunxian-chu)” — không còn liệt kê mẫu tồn hiện như
   cách dùng của chính bài; lời giải zhe-ex3 đã rút thành “Đây là
   dạng tồn hiện ở bước 2 — mẫu đầy đủ học ở bài cunxian-chu.” —
   không còn phát biểu nguyên quy tắc thứ tự tồn hiện.
6. **H-6/H-7 — ĐÃ SỬA ĐẠT.** result-complement-2 when_to_use nay
   khớp mức dạy: “…+ 上 là đóng lại hoặc đạt trạng thái mặc/vào
   người （关上， 穿上 — ở bài này 上 luyện ở mức xếp câu và nhận
   diện lỗi）” — đúng mức ex3/ex4. Lời giải chyp-ex4 đã hết typo
   dính chữ: “…就休息。Hoặc: 你累了的话，就休息。” (đã có dấu
   chấm/ngắt câu). Quét phụ: không còn “只有有” trong trường dạy
   học của cả hai bài câu phức.
7. **Validator:** `python3 scripts/validate.py` →
   **ĐẠT: 43 bài, 43 bài published, 208 bài tập.**

### Kết luận vòng 2: ĐẠT — ký phát hành lô HSK3-2

Toàn bộ điểm vòng 1 (Q-1 bắt buộc + H-1…H-7 trong phạm vi kiểm
lại) đã sửa đúng hướng và đúng nội dung; không phát sinh lỗi mới
trong phạm vi kiểm lại hẹp này. Lô HSK3-2 đủ điều kiện phát hành.
Giới hạn giữ nguyên: 4 bài mới vẫn là “đã rà soát nội bộ” — audio
chưa nghiệm thu trên thiết bị thật (AUD-TTS-01), không nâng trạng
thái “đạt toàn bộ tiêu chí”.
