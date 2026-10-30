# Báo cáo QA độc lập — Lô HSK3-7 (2026-10-30)

QA tự kiểm chứng từ file + ảnh bằng chứng trực quan, không dựa vào bàn giao.
Kết luận toàn lô: **ĐẠT CÓ ĐIỀU KIỆN** — không có lỗi Nghiêm trọng; 1 điểm
Quan trọng (A-1) cần sửa trước phát hành; 2 điểm Hoàn thiện nên sửa cùng vòng.

---

## Phần 1 — Phúc tra sửa catalogue bằng bằng chứng trực quan: ĐẠT

QA tự mở ảnh `~/workspace/qa-evidence/hsk4-grammar-p394.png` (trang in 394,
đề cương HSK 3.0) và đối chiếu từng dòng khối 复句 với
`docs/official-catalogue-hsk3-hsk4.json` sau sửa. Kết quả — xác nhận toàn bộ:

- (a) OFF-H4-27: ảnh cho thấy mục 选择复句 chỉ có đúng 1 dòng
  不是……，就是……. Catalogue đã bỏ hẳn 连……，status = covered,
  lesson_ids [complex-choice] — ĐÚNG.
- (b) OFF-H4-26: trên ảnh, 递进复句 có 4 dòng: ……，甚至…… /
  不仅/不光……，还/而且…… / ……，并且…… /
  连……也/都……，……更……. Catalogue có đủ 4 thành viên — ĐÚNG.
- (c) OFF-H4-23: trên ảnh 双重否定句 chỉ có "用双重否定表示强调";
  catalogue không còn 不是……，而是…… — ĐÚNG.
- (d) OFF-H4-24: trên ảnh 并列复句 = 不是……，而是…… /
  既……，又/也…… / 一方面……，另一方面……; catalogue khớp,
  không còn 首先……，其次…… — ĐÚNG.
- (e) OFF-H4-25: trên ảnh 承接复句 dòng đầu là 首先……，其次……;
  catalogue đã có — ĐÚNG.
- (f) OFF-H4-28: trên ảnh 转折复句 dòng 4 là ……X是X，就是/不过……;
  catalogue đã có — ĐÚNG.
- (g) OFF-H4-29: trên ảnh 假设复句 có đúng 3 mẫu (……，否则…… /
  要是……，就…… / 要是……，（就）……，否则……), không có X是X;
  catalogue khớp — ĐÚNG.

Các mục khác trên cùng trang ảnh cũng khớp catalogue, không phát hiện lệch thêm:
比较句3 → OFF-H4-22 (A不如B; 跟……相比） ✓; 条件 → OFF-H4-30 ✓;
因果 → OFF-H4-31 ✓; 目的 （……，好……) + 让步 （即使……，也……;
就是……，也……) gộp ở OFF-H4-32 ✓; 紧缩 → OFF-H4-33 (không dấu;
不……也……) ✓; 概数表示法3 → OFF-H4-34 ✓.

Bài complex-choice: `hsk_evidence.status = verified`, note nêu đúng căn cứ
kiểm trực quan trang 394; hai chỗ grep còn nhắc 连/partial nằm trong ghi chép
`review` dạng lịch sử thay đổi ("chuyển từ partial sang verified…") — là nhật
ký sửa đổi tường minh, không phải khẳng định hiện hành mâu thuẫn.

Tự đếm lại từ 3 file catalogue: HSK1 25/10/17; HSK2 19/15/28;
**HSK3 27 covered / 4 partial / 19 missing (50)**; **HSK4 1/0/33 (34)**;
HSK5 0/0/31; HSK6 0/0/22 — khớp số ND báo. Số bài theo cấp từ manifest:
HSK1 20, HSK2 16, HSK3 27, HSK4 1 — tổng 64 ✓.

---

## Phần 2 — Bốn bài mới

### pronouns-others (OFF-H3-09 + H3-10): ĐẠT

- Phạm vi đúng cả hai mục; gộp một bài có một mục tiêu chung rõ ràng.
- 别的 vs 其他: ghi là "thiên hướng" và nói tường minh "không phải ranh giới
  cứng" ở ghi chú công thức; rà toàn bài không có chỗ nào biến thành ranh
  giới cứng. 咱们 luôn gồm người nghe, phân biệt với 我们 chính xác.
- Đáp án các bài tập duy nhất và khớp quy tắc; hệ phán quyết nhất quán
  (câu 我们一起走吧 được chấm `thay_duoc_co_dieu_kien`, không gán sai).

**[Hoàn thiện P-1]** pro-ex5 (tự đặt câu "Những người khác đều biết, chỉ mình
tôi không biết") chỉ nhận đáp án dùng 其他人； phương án dùng 别人
（别人都知道，只有我不知道。) cũng đúng và tự nhiên nhưng chưa có trong
accepted_answers. Nên bổ sung biến thể này.

### adverbs-time-hsk3 (OFF-H3-14): ĐẠT CÓ ĐIỀU KIỆN

- 刚/刚刚: bài nói rõ "không có mốc phút cố định", độ dài tương đối theo
  ngữ cảnh — đúng, không gán mốc cứng. Phân biệt 刚才 (trạng ngữ thời điểm)
  với 刚/刚刚 (ngay trước động từ) chính xác. 一直 với động từ điểm kết thúc
  được xử lý đúng （他一直到家了 → sai, sửa bằng 刚）.
- adv-ex5 nhận cả 刚 và 刚刚 — nhất quán với quy tắc bài dạy.

**[Quan trọng A-1]** Confusion 3 dùng câu mẫu 他刚刚三天前回来。 và kết luận
"chọn từ nào cũng được ở câu này". Nội dung bảo vệ (không có mốc phút cố định)
là đúng, nhưng vị trí của 刚刚 TRƯỚC cụm thời gian 三天前 không chuẩn: trật tự
thông dụng là cụm thời gian đứng trước — 他三天前刚回来。 Câu mẫu như hiện tại
dạy người học một trật tự từ không chuẩn và lời giải bỏ qua điểm này. Cần đổi
câu mẫu sang dạng chuẩn (ví dụ 他三天前刚回来。) và giữ nguyên thông điệp "vừa
mới là tương đối".

**[Hoàn thiện A-2]** adv-ex3 (error_spot, câu 他一直看了一下电视。): đáp án
（一下） và lý do mâu thuẫn 一直/一下 đều đúng, nhưng câu "sửa" trong lời giải
（他一直在看电视） thêm 在 không có trong câu gốc — bỏ 一下 khỏi câu gốc chỉ
cho 他一直看了电视. Nên viết lại câu sửa cho khớp thao tác đã nêu hoặc diễn
giải lại cách sửa.

### negation-bubi-buyong (OFF-H3-19): ĐẠT

- Nhất quán hoàn toàn với modal-verbs-hsk3 về 不得： cả hai bài đều nói 不得
  có thật, là cách nói trang trọng trong quy định với nghĩa cấm "không được
  phép" （不得入内）, và "không cần phải" dùng 不用/不必 — không còn khẳng
  định tuyệt đối nào sót (đã grep đối chiếu cả hai file).
- Phân biệt 不用 （日常） / 不必 (trang trọng hơn, cùng nghĩa cốt lõi) đúng
  mức thiên hướng, không tuyệt đối hóa; ranh giới với 不要/别 (cấm) rõ ràng.
- Đáp án duy nhất, explanation khớp; neg-ex4/ex5 nhận cả 不用 và 不必 nhất
  quán với quy tắc.

### approx-numbers-2 (OFF-H3-50): ĐẠT

- Mẫu hai số kề nhau đúng vị trí: cặp số liên tiếp + lượng từ ngay sau
  （七八天、两三个小时、三四天、四五分钟）; các bài tập và lời giải nhất quán.
  大概 đứng trước cụm số lượng, không chen giữa số và lượng từ — đúng.
- Tính trung thực của ranh giới cấp dưới: QA tự grep toàn bộ `data/lessons/`
  — KHÔNG bài cũ nào chứa 左右/前后 trong nội dung dạy; catalogue OFF-H2-61
  vẫn `missing` thật. Cách bài nói "chưa có bài riêng, chỉ mới gặp 几/多少
  ở vai câu hỏi" là trung thực. Note của OFF-H3-50 cũng ghi rõ vai trò phỏng
  đoán của 大概 thuộc OFF-H3-17, không tuyên bố phủ mục đó.

---

## Phần 3 — Kiểm tra hệ thống (chạy thật): ĐẠT

- `python3 scripts/validate.py` → ĐẠT: 64 bài, 64 published, 313 bài tập.
- `python3 -m unittest discover -s tests` → Ran 9 tests, OK.
- `node --test tests/test_fsrs.mjs` → 7 pass / 0 fail.
- `node --check app.js` → OK.
- Harness `tests/browser-check.mjs` (http.server 8901 + chrome-headless-shell
  local) → **19/19 PASS**, gồm đủ 8 ca tràn ngang (360/390/768/1280 ×
  home/lesson), bàn phím, nghe/dừng, lưu tiến độ/prefs, luồng ôn tập FSRS;
  **0 lỗi console/exception**.

Giới hạn còn nguyên như các lô trước: harness chạy local trên VM, không thay
được nghiệm thu live trên Pages; audio TTS thiết bị thật vẫn not_run — các bài
mới giữ trạng thái "đã rà soát nội bộ".

## Điều kiện phát hành

1. Sửa A-1 (bắt buộc): câu mẫu confusion 3 của adverbs-time-hsk3.
2. Nên sửa cùng vòng: A-2, P-1.
3. QA phúc tra chỉ cần kiểm lại đúng các điểm đã sửa.

---

## Phúc tra sau vòng sửa (2026-10-30)

QA phúc tra đúng 3 điểm đã sửa, kiểm trực tiếp trong file; không sửa nội
dung bài học. Validator chạy lại: ĐẠT — 64 bài, 64 published, 313 bài tập.

1. **A-1 — ĐẠT.** Confusion 3 của `adverbs-time-hsk3` nay dùng câu mẫu
   他刚刚三天前回来。 với verdict `sai_ngu_phap` và explanation chỉ rõ lỗi
   là vị trí: cụm thời gian xác định đứng trước, 刚/刚刚 sát động từ —
   dạng đúng 他三天前刚回来。 Thông điệp "刚/刚刚 không có mốc phút cố
   định, độ 'mới' là tương đối" vẫn giữ nguyên và không mâu thuẫn (explanation
   nói tường minh lỗi không nằm ở chỗ "đã ba ngày"); phân biệt 刚才 (trạng
   ngữ thời điểm) với 刚/刚刚 (ngay trước động từ) còn rõ. Formula bước 1
   đã đồng bộ đúng quy tắc này kèm cùng ví dụ; rà toàn bài không còn chỗ
   nào mâu thuẫn cách sửa.
2. **A-2 — ĐẠT.** Explanation adv-ex3 nay ghi câu sửa là 他一直看了电视 —
   khớp từng chữ với thao tác "bỏ đúng khối 一下" khỏi câu gốc
   他一直看了一下电视。, không còn thêm 在.
3. **P-1 — ĐẠT.** pro-ex5 của `pronouns-others` đã có biến thể
   别人都知道，只有我不知道。 (cả bản có và không có dấu 。) trong
   accepted_answers, bên cạnh đáp án 其他人.

Kết luận: 3/3 điểm ĐẠT — lô HSK3-7 đủ điều kiện phát hành về nội dung
trong phạm vi phúc tra này.
