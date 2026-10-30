# QA lô HSK3-4 + vòng rà soát tính tuyệt đối — 2026-10-30

QA độc lập: tự chấm lại toàn bộ ví dụ/bài tập của 7 bài liên quan, đối chiếu
catalogue và tài liệu ánh xạ từng mục, chạy lại toàn bộ kiểm tra hệ thống.
Không dùng số lượng bài/bài tập làm bằng chứng chất lượng. Các bài mới vẫn là
"đã rà soát nội bộ" — audio TTS trên thiết bị thật chưa nghiệm thu
(AUD-TTS-01 vẫn not_run).

## Kết luận tổng: ĐẠT CÓ ĐIỀU KIỆN

- Phần A (rà soát tính tuyệt đối): ĐẠT — kèm 1 điểm hoàn thiện nhỏ (H-1).
- Phần B (4 bài mới): ĐẠT CÓ ĐIỀU KIỆN — 2 điểm Quan trọng (Q-1, Q-2),
  2 điểm hoàn thiện (H-2, H-3). Không có lỗi chấm sai đáp án ở 20 bài tập mới.
- Phần C (tài liệu ánh xạ): ĐẠT.
- Phần D (hệ thống): ĐẠT — validator, unit test, harness đều xanh.

---

## Phần A — Vòng rà soát tính tuyệt đối (3 bài HSK3-3 đã sửa)

### A.1 shi-de-attitude — ĐẠT

Phân biệt "cần 的 để giữ mẫu khi đã mở 是" với "bỏ cả khung vẫn hợp lệ" nay
rõ và nhất quán ở mọi vị trí người học nhìn thấy:

- `formula_notes` bước 2: "hễ còn giữ 是 mở khung thì 的 ở cuối câu không
  lược được, vì 的 là đầu đóng của chính khung này" — khẳng định được giới
  hạn đúng phạm vi của mẫu.
- `formula_notes` bước 3: ghi tường minh "bỏ hẳn cả khung thì câu vẫn hoàn
  toàn đúng — 他一定会来。 là câu hợp lệ, chỉ không còn sắc thái khẳng
  định chắc nịch mà bài này luyện". Đây đúng là câu Hoa nêu làm chuẩn.
- `quick_memory`: "Đã mở 是 thì phải có 的 chốt cuối cho trọn khung; bỏ
  cả khung （他一定会来） vẫn đúng, chỉ bớt chắc nịch." — không còn câu chữ
  "thiếu 的 là sụp khung" đọc độc lập như quy tắc tuyệt đối.
- Confusion 2 （他是会来。, verdict `sai_ngu_phap`): **verdict đúng hạng**.
  Câu đã mở khung bằng 是 mà không đóng bằng 的 là khuyết trong tiếng
  Trung chuẩn — khác hẳn việc bỏ cả khung. Lời giải nay nói đúng phạm vi
  này và đối chiếu ngay với 他一定会来。 vẫn đúng.
- Lời giải ex1/ex4/ex5 nhất quán: ex4 nói rõ điền 的 là "để giữ đúng mẫu
  đang luyện", không phải quy tắc chung; ex5 ghi tường minh
  我一定会帮你。 "tự nó không sai — chỉ là chưa dùng khung 是……的".
- Không còn chỗ nào trong bài ám chỉ câu bỏ cả khung là sai ngữ pháp.
  Confusion 3 （这件事是我的知道） verdict `sai_ngu_phap` đúng （的 sở hữu
  chen vào khung là sai thật); confusion 1 `doi_nghia` đúng.

### A.2 cunxian-appearance — ĐẠT (kèm H-1)

Khẳng định cũ "bắt buộc có 了" đã được sửa đúng thực tế ngôn ngữ và nhất
quán nội bộ:

- `pattern` dùng "(了)" thay vì "+ 了 +" bắt buộc.
- `formula_notes` bước 5 nêu đúng quy tắc hai nhánh: thường chốt bằng 了
  （新来了, 少了, 丢了）; riêng bổ ngữ xu hướng kép 进来/出来 thì câu vẫn
  trọn dù không có 了 — và dẫn chính ví dụ đầu bài 门口走进来一个人。
  Quy tắc này khớp cả 5 ví dụ (ví dụ 1 và 5 không 了 với 进来/出来;
  ví dụ 2–4 có 了 với 新来/少/丢）.
- Confusion 1 （门口走进一个人。): chẩn đoán đã đổi đúng bản chất — lỗi là
  thiếu bổ ngữ xu hướng kép để chỉ rõ xuất hiện, không phải thiếu 了.
  Verdict `sai_ngu_phap` giữ đúng.
- Lời giải cx3-ex1 nhất quán với đáp án thật （教室里走出来一个学生。 —
  không 了） và ghi rõ lý do. Các đáp án còn lại (cx3-ex2/ex3/ex5, đều
  thuộc nhóm 少/新来/丢） đều có 了 thật, không mâu thuẫn.

**H-1 (Hoàn thiện)** — `quick_memory` vẫn viết "động từ + 了 ở giữa" như
một thành phần luôn có mặt, chưa phản ánh nhánh không cần 了 của chính
bài. Đây là móc nhớ nên mức hại thấp, nhưng là tàn dư của khẳng định
tuyệt đối vừa sửa ở công thức. Đề xuất sửa thành dạng như "động từ (+ 了)
ở giữa" hoặc nhắc 进来/出来 không cần 了.

### A.3 verb-repetition-sentence, confusion 3 — ĐẠT

Cách diễn đạt mới đúng: dạng rút gọn 她看书累了。 "vẫn gặp trong khẩu
ngữ, không phải câu sai ngữ pháp; chỉ là nghe thiếu nhịp…", verdict giữ
`kem_tu_nhien` — đúng hạng (kết án `sai_ngu_phap` sẽ quá tay, giữ
`kem_tu_nhien` là chuẩn).

### A.4 direction-complement-2 — khẳng định "không cần sửa" ĐÚNG

Kiểm chứng toàn bài: ba điểm vòng rà soát nêu đều khớp nguyên văn —
công thức bước 2 "chỉ dùng cho việc đã bắt đầu rồi" là định nghĩa phạm
vi của nghĩa tiếp tục, confusion 2 tương ứng dùng verdict mềm
`thieu_ngu_canh`; lời giải dir2-ex1 giới hạn phạm vi "không diễn đạt
nghĩa 'bắt đầu hát' **của câu này**" cho 唱得起来; dir2-ex4 ghi nhận
dạng khả năng 看得出来 tồn tại. Không có kết luận nào vượt phạm vi.

---

## Phần B — 4 bài mới

### B.1 complex-progressive — ĐẠT có điều kiện nhẹ (Q-2, H-2)

Tự chấm 5 ví dụ + 5 bài tập: đáp án đúng; confusion 1 xử lý rất đúng
mực (nói rõ câu đảo mức "không sai ngữ pháp", verdict `doi_nghia`);
confusion 3 thừa nhận 而且 đứng một mình vẫn hợp lệ — không tuyệt đối.

- **Điểm tự khai 5 (prog-ex1)** — nhiễu "虽然他会开车，但是他开得很好。":
  **đáp án không tranh cãi**. Cặp 虽然……但是…… đòi hỏi quan hệ đối
  lập kỳ vọng; giữa "biết lái xe" và "lái rất tốt" không có đối lập nào,
  nên câu không thể diễn đạt nghĩa tiến triển mà đề yêu cầu. Khóa đáp án
  不但……而且…… đứng vững; lời giải đã nêu lý do （但是 là chuyển hướng).
- **Q-2 (Quan trọng)** — prog-ex4 (fill "他不但会游泳，___游得很快。")
  chỉ nhận 而且. Biến thể **还** （他不但会游泳，还游得很快。) là cách
  nói đúng và thông dụng của cùng cặp tiến triển, nhưng bị loại. Gợi ý
  của đề chỉ nói "thuộc cặp 不但……，……" mà không ghim 而且. Theo chuẩn
  dự án (biến thể hợp lệ chính bị loại từng là lỗi vòng 1 ở std2), đề
  xuất: thêm 2 biến thể 还 (có/không dấu câu) vào accepted_answers,
  hoặc ghi tường minh trong hint là điền 而且.
- **H-2 (Hoàn thiện)** — prog-ex2 (order) dùng lại nguyên văn ví dụ 3
  （她不但学习好，而且常常帮助同学。) chỉ đổi thành 2 khối xếp thứ tự:
  vừa trùng nguyên văn ví dụ–bài tập trong cùng bài (khác quy ước các lô
  trước), vừa gần như không có độ khó. Đề xuất thay nội dung câu khác
  cùng mẫu và/hoặc chia nhỏ khối hơn.

### B.2 complex-compact — ĐẠT CÓ ĐIỀU KIỆN (Q-1)

- **Điểm tự khai 1 (một bài hai mẫu)** — phạm vi hai mẫu **chấp nhận
  được ở mức phân loại**: cả hai đều thuộc mục OFF-H3-49 （紧缩句） của
  catalogue, và việc loại 越……越…… khỏi bài là **đúng** — catalogue
  xếp mẫu đó ở OFF-H3-26, tài liệu ánh xạ mục 2b cũng ghi nhất quán.
  Phân biệt ……了就…… với 一……就…… (yi-jiu-tight) ở bước 4 chặt:
  không có 一, không nhấn "vừa… là ngay", trọng tâm là hoàn thành rồi
  tiếp nối. Status catalogue H3-49 `covered` trung thực với exemplar
  của mục （……了……(就）……); H3-25 `partial` trung thực — bài chỉ phủ
  1 cụm （一……也/都+不/没……) trong giỏ khoảng mười cụm của mục đó.
- **Q-1 (Quan trọng)** — mục tiêu bài tuyên bố người học "dùng được
  **hai** mẫu", nhưng **cả 5/5 bài tập chỉ luyện mẫu 1** （一……也/都）;
  mẫu 2 (……了就……) chỉ xuất hiện ở 1 ví dụ và 1 confusion — không có
  bài tập nhận biết/đặt câu/tự dùng nào. Mục tiêu và kiểm tra lệch
  nhau. Đề xuất một trong hai: (a) đổi ≥1 bài tập hiện tại thành bài
  luyện mẫu 2 (ví dụ fill/choice với ……了就……), hoặc (b) hạ mẫu 2
  trong objective/công thức xuống mức "nhận biết và phân biệt với
  一……就……" và ghi rõ mẫu 1 là mục tiêu chính.
- **Điểm tự khai 2 (compact-ex4 nhận cả 也/都)** — **không gây rối**:
  hint báo trước "也 hoặc 都 đều được", lời giải lặp lại điều đó,
  accepted_answers đủ 4 biến thể. Cách trình bày này là mẫu mực cho
  dạng đáp án kép.
- Confusions xử lý không tuyệt đối tốt: confusion 1 thừa nhận
  他一口水没喝。 vẫn nghe được trong khẩu ngữ (verdict
  `thay_duoc_co_dieu_kien`); confusion 3 thừa nhận câu dài với 然后
  không sai.

### B.3 degree-complement-1 — ĐẠT

- **Điểm tự khai 3 (confusion 坏了)** — xử lý **đúng và không tuyệt
  đối**: 漂亮坏了 verdict `kem_tu_nhien` (không kết án sai ngữ pháp),
  lời giải giới hạn phạm vi （累/忙/饿/气 — trạng thái quá sức/tiêu cực)
  và ghi nhận ngoại lệ khẩu ngữ 高兴坏了 nằm ngoài phạm vi bài. Công
  thức bước 3 nhất quán với cách giới hạn này.
- Cả 5 bài tập đáp án đúng và duy nhất hợp lý (degree-ex1 loại đúng
  hai kiểu chồng đuôi; degree-ex5 nhận biến thể 下课后/下课以后/lược).
- Ranh giới với state-complement-de nêu rõ ở when_to_use và bước 4
  （đuôi cố định chỉ mức độ vs 得 + cụm mở mô tả cách thức) — không
  dạy trùng. OFF-H3-31 khớp catalogue.

### B.4 rhetorical-question — ĐẠT (kèm H-3)

- **Điểm tự khai 4 (dạy thêm 怎么……呢？/谁……呢？ ngoài exemplar
  H3-33)** — hai mẫu thêm **đúng là phản vấn HSK3 thông dụng**:
  我怎么知道呢？ là ví dụ phản vấn kinh điển ở cấp này, và bài xử lý
  mức độ hợp lý （怎么……呢？ dạy đến mức dùng được; 谁……呢？ chỉ ở
  mức nhận biết trong bước 5). Status `covered` cho OFF-H3-33 **chấp
  nhận được**: phạm vi catalogue của mục （不是……吗？) đã được phủ
  đầy đủ; ghi chú nguồn của bài minh bạch rằng 怎么……呢？ là "cùng
  họ phản vấn dạng 1" chứ không nhận là exemplar của mục — không có
  sự thổi phồng phạm vi. Không cần hạ xuống partial.
- **H-3 (Hoàn thiện, tài liệu)** — trường `note` của OFF-H3-33 trong
  catalogue đang trống. Đề xuất ghi chú ngắn kiểu "bài rhetorical-
  question phủ đủ 不是……吗？; dạy thêm 怎么……呢？ (dùng được) và
  谁……呢？ (nhận biết) cùng họ phản vấn" để các vòng rà soát sau
  không phải suy đoán lại phạm vi.
- Bài tập và confusions sạch: rhet-ex1 phân biệt đúng phản vấn với ba
  loại câu hỏi thật; confusion 3 thừa nhận 不是……吗？ còn có cách
  dùng hỏi xác nhận thật và khác biệt nằm ở ngữ cảnh — xử lý không
  tuyệt đối đúng mực; confusion 2 thừa nhận bỏ 呢 không làm câu sai.

---

## Phần C — Tài liệu ánh xạ (mục 2b) — ĐẠT

Đối chiếu từng ID với docs/official-catalogue-hsk3-hsk4.json:

- Catalogue HSK3 hiện tại: **16 covered / 3 partial / 31 missing**
  (tổng 50) — khớp đúng số liệu 16/3/31 ghi ở mục 1 của tài liệu
  ánh xạ.
- Mục 2b liệt kê đủ **34 mục** (31 thiếu + 3 một phần): 6 ưu tiên cao
  (H3-04, H3-32, H3-41, H3-42, H3-43, H3-48) + 12 ưu tiên trung bình
  (H3-07, H3-09, H3-10, H3-11, H3-12, H3-13, H3-14, H3-15, H3-17,
  H3-18, H3-19, H3-50) + 16 để lại (H3-01, H3-02, H3-03, H3-05,
  H3-06, H3-08, H3-16, H3-20, H3-21*, H3-22, H3-23, H3-24, H3-25*,
  H3-26, H3-27, H3-45*; * = một phần). Đối chiếu ID theo ID: không
  thiếu, không thừa, không trùng so với catalogue.
- Lý do để lại hợp lý ở các mục dễ gây ngờ: H3-22 (giỏ liên từ —
  không làm bài riêng vì các cặp chính phủ qua từng bài câu phức) và
  H3-16 （一边 lõi sẽ phủ qua H3-43) tham chiếu chéo nhất quán hai
  chiều; H3-26 ghi đúng vị trí catalogue của 越……越…… và khớp với
  quyết định phạm vi của complex-compact; H3-45 (chỉ còn biến thể
  可是） và H3-21 (chỉ còn các nghĩa giới từ phụ) là đánh giá trung
  thực về phần dư nhỏ, kèm hướng xử lý (sửa bài cũ thay vì tốn slot
  bài mới). Không thấy mục nào bị để lại với lý do hời hợt.

---

## Phần D — Hệ thống — ĐẠT

Chạy thật trên máy local tại thời điểm QA:

- `python3 scripts/validate.py` → **ĐẠT: 51 bài, 51 published,
  248 bài tập** (exit 0).
- `python3 -m unittest discover -s tests` → **9 tests OK**.
- `node --test tests/test_fsrs.mjs` → **7/7 pass**.
- `node --check app.js` → OK.
- Harness `node tests/browser-check.mjs http://127.0.0.1:8901/` →
  **PASS 19/19**, 0 lỗi console/exception; gồm tràn ngang ở
  360/390/768/1280, đủ mục A–F, bàn phím, nghe/dừng, lưu tiến độ và
  tùy chọn sau tải lại, khóa chấm ôn tập trước khi mở đáp án.
- DOM qua chrome-headless-shell (cùng bản harness dùng): trang chủ
  render đúng **51 liên kết bài học** duy nhất, đủ cả 4 bài mới
  (complex-progressive, complex-compact, degree-complement-1,
  rhetorical-question) và chuỗi "51 bài".

Phạm vi kiểm lại sau khi sửa Q-1/Q-2 (nếu Manager cho sửa): chỉ cần
đọc lại complex-compact (objective + bài tập thay đổi) và prog-ex4
của complex-progressive, cộng chạy lại validator — không cần QA lại
toàn lô.

## Tổng kết điều kiện phát hành

Sửa Q-1 và Q-2 trước khi coi lô hoàn tất nội dung; H-1, H-2, H-3 là
hoàn thiện nên có thể gộp vào cùng vòng sửa. Ngoài các điểm trên,
không phát hiện lỗi chấm sai, dạy sai, dạy trùng hay kết luận tuyệt
đối quá phạm vi trong phạm vi đã kiểm. Trạng thái các bài giữ nguyên
"đã rà soát nội bộ" cho tới khi audio TTS được nghiệm thu trên thiết
bị thật.

---

## Vòng 2 — Kiểm lại đúng phạm vi đã sửa (2026-10-30)

QA vòng 2 chỉ đọc lại 5 điểm của vòng 1 (Q-1, Q-2, H-1, H-2, H-3) trên
bản đã sửa và chạy lại validator, đúng phạm vi vòng 1 đã vạch. Không
sửa mã/dữ liệu.

### 1. Q-1 (complex-compact, compact-ex2) — ĐẠT

- compact-ex2 nay là order luyện **mẫu 2 ……了就……**: xếp
  [他 / 吃了 / 晚饭 / 就 / 出去散步] thành "Anh ấy ăn tối xong là ra
  ngoài đi dạo." — trước vòng sửa bài tập này luyện mẫu 1.
- Đáp án duy nhất hợp lý: accepted_answers chỉ gồm một thứ tự; các
  cách xếp khác hoặc phá khung 就 đứng đầu phân câu 2, hoặc đổi ý
  khác hẳn nghĩa đích ("xong là…").
- Lời giải phân biệt đúng với 一……就…… (yi-jiu-tight): "mẫu kia có
  一 và nhấn 'vừa… là ngay'; ở đây trọng tâm là việc 1 hoàn thành rồi
  việc 2 tiếp nối" — đúng bản chất hai mẫu.
- Cả bài nay luyện cả hai mẫu: mẫu 1 ở ex1 (choice), ex3
  (error_spot), ex4 + ex5 (fill); mẫu 2 ở ex2 (order), cộng ví dụ 5
  （我吃了饭就去上班。) và confusion của mẫu 2. Objective tuyên bố
  "dùng được hai mẫu" nay khớp với kiểm tra.
- Câu ex2 （他吃了晚饭就出去散步。) không trùng nguyên văn ví dụ nào
  trong bài (ví dụ 5 là 我吃了饭就去上班。 — cùng mẫu, khác câu).

### 2. Q-2 (complex-progressive, prog-ex4) — ĐẠT

- accepted_answers nay có đủ biến thể 还： "他不但会游泳，还游得很
  快。" và dạng không dấu câu, bên cạnh hai biến thể 而且.
- Lời giải ghi nhận đúng: "Dùng 还… ở đây cũng đúng và thông dụng;
  而且 là dạng đầy đủ của cặp mẫu đang luyện trong bài này." — không
  còn loại biến thể hợp lệ chính, và cách nêu phạm vi (mẫu đang
  luyện vs cách nói đúng nói chung) đúng tinh thần chống tuyệt đối.

### 3. H-1 (cunxian-appearance, quick_memory) — ĐẠT

- quick_memory mới: "Xuất hiện/biến mất: nơi chốn + động từ + bổ ngữ
  + số lượng — thường chốt 了； 进来/出来 thì khỏi cần." — không còn
  khẳng định "động từ + 了 ở giữa" như thành phần luôn có mặt.
- Câu mới đúng thực tế của bài: "thường chốt 了" là khẳng định có
  mức, và nhánh 进来/出来 không cần 了 khớp cả 5 ví dụ (ví dụ 1 và 5
  không 了） lẫn quy tắc ở formula bước 5.
- Độ dài 95 ký tự — trong giới hạn 40–110 của schema (validator cũng
  xác nhận, xem điểm 6).

### 4. H-2 (complex-progressive, prog-ex2) — ĐẠT

- prog-ex2 nay dùng câu mới "Anh ấy không những làm việc nghiêm túc
  mà còn rất hiệu quả.", không còn dùng lại nguyên văn ví dụ 3
  （她不但学习好，而且常常帮助同学。).
- Đủ 5 khối [他 / 不但 / 工作认真 / 而且 / 效率很高] (≥4); đáp án
  duy nhất — khung 不但……而且…… khóa thứ tự, các cách xếp khác đều
  phá khung hoặc vô nghĩa.

### 5. H-3 (catalogue, OFF-H3-33) — ĐẠT

- Mục OFF-H3-33 nay có note: "Bài rhetorical-question dạy thêm
  怎么……呢？ và 谁……呢？ (mức nhận biết) ngoài exemplar 不是……吗？
  của mục này; vẫn phủ đúng phạm vi phản vấn HSK3." — phạm vi dạy
  thêm đã được ghi tường minh, vòng rà soát sau không phải suy đoán.
- File docs/official-catalogue-hsk3-hsk4.json vẫn parse hợp lệ sau
  sửa (đã nạp và đọc lại toàn bộ bằng parser JSON).

### 6. Validator

- `python3 scripts/validate.py` → **ĐẠT: 51 bài, 51 bài published,
  248 bài tập** (exit 0).

### Kết luận vòng 2

Cả 5 điểm **ĐẠT** (Q-1, Q-2, H-1, H-2, H-3). Điều kiện phát hành của
vòng 1 đã được gỡ hết trong phạm vi đã kiểm; lô HSK3-4 + vòng rà
soát tính tuyệt đối đạt QA để phát hành. Trạng thái các bài vẫn là
"đã rà soát nội bộ" — audio TTS trên thiết bị thật chưa nghiệm thu
(AUD-TTS-01 vẫn not_run).
