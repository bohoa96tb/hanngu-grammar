# Báo cáo rà soát lô 04 — Rà soát đầy đủ 12 bài mẫu theo P03 + xác minh baseline gốc (29/10/2026)

## A. Xác minh tài liệu gốc (không suy ra từ tên file)
- Link Examination Syllabus trên chinesetest.cn dẫn tới file PDF của
  中外语言交流合作中心. Text fetch đọc được toàn văn (13.872 dòng):
  bìa ghi "Syllabus for the Chinese Proficiency Test", "2025-11 发布",
  "中外语言交流合作中心 发布", "2026-07 实施".
- Mục lục: 任务大纲 (tr.1), 话题大纲 (tr.55), 词汇大纲 (tr.76),
  汉字大纲 (tr.352), 语法大纲 (tr.382–400: HSK1 tr.382, HSK2 tr.386,
  HSK3 tr.389, HSK4 tr.392, HSK5 tr.395, HSK6 tr.398, HSK7–9 tr.400).
- Phần 语法大纲 HSK1–6 đã đọc hết (từ dòng 12970 tới cuối tài liệu).
  Không cần tải lại bằng cách khác vì text fetch đã trả đủ nội dung;
  không ghi lỗi truy cập (không có timeout hay lỗi nào trong lần này).
- TÁCH BIỆT quyền: (1) Phạm vi đã xác minh theo tài liệu gốc.
  (2) Quyền phân phối CHƯA xác minh — không tìm thấy tuyên bố giấy phép
  cho phép sao chép trong tài liệu. Do đó repo KHÔNG chứa file PDF gốc,
  KHÔNG chứa bảng gốc nguyên văn, KHÔNG sao chép câu ví dụ của đề cương.
  Baseline là diễn đạt lại bằng tiếng Việt kèm tham chiếu nguồn.

## B. Baseline 1.0-official-scope
- Mức nhóm phạm vi (50 nhóm: HSK1 12, HSK2 12, HSK3 10, HSK4 7, HSK5 5,
  HSK6 4), không phải danh sách điểm vi mô có đánh số, vì bản thân
  语法大纲 trình bày theo nhóm, không đánh số từng điểm.
- Số liệu 70/148/244/339/409/459 là cách đếm của nguồn thứ cấp, KHÔNG
  phải số thứ tự trong tài liệu gốc và không dùng làm số mục baseline.
- Trạng thái: covered 4, partial 8, not_started 38 (theo nhóm phạm vi).
- Sửa ánh xạ theo tài liệu gốc:
  * 了 (hoàn thành + biến đổi) thuộc HSK（一级）trong 语法大纲 →
    bài le-completion-change chuyển cấp tạm thời HSK2 → HSK1,
    content_version 1 → 2, độ khó sư phạm giữ medium.
  * 在/正在 (thể tiến hành) thuộc HSK（一级）→ mục planned cũ CUR-ZAI-01
    (cấp 2) nay gộp vào CUR-L1-11, cấp HSK1, chưa có bài riêng.
  * Các bài còn lại đều khớp 语法大纲: 是/很/吗/的/有/不·没/量词/
    词问/能愿 động từ ở HSK1; 比 (比较句1) và 过 (经历态) ở HSK2.

## C. Rà soát 12 bài mẫu theo tiêu chí P03
1. Tính đúng đắn: đã đọc lại toàn bộ ví dụ và đáp án. Không phát hiện lỗi
   kiến thức chặn. Các điểm tinh tế đã ghi đúng mức, không tuyệt đối hóa:
   - 会/能: 能 nói khả năng theo điều kiện, 会 nói kỹ năng đã học; bài ghi
     verdict thay_duoc_co_dieu_kien, không ghi 能 là sai tuyệt đối.
   - 不/没: phân biệt theo thời gian ở mức giảng HSK1; bài ghi rõ 不去
     nói ý định/thói quen, không dùng để nói hành động hôm qua đã không
     xảy ra trong ngữ cảnh bài.
   - 三个书: ghi kem_tu_nhien (nghe hiểu được, kém chuẩn), không ghi sai
     tuyệt đối; chuẩn là 三本书.
   - 几/多少: giảng ở mức HSK1 (几 cho số nhỏ, 多少 cho số lớn/chưa rõ).
2. Cách dùng: mỗi bài có when_to_use nêu điều kiện và giới hạn; các cặp
   dễ nhầm đều có confusions với verdict đúng loại (sai_ngu_phap,
   doi_nghia, kem_tu_nhien, thay_duoc_co_dieu_kien).
3. Ánh xạ cấp độ: xem mục B; tất cả 12 bài nay khớp 语法大纲 ở mức nhóm.
4. Bài tự diễn đạt: cả 12 bài đều có 1 bài tập "Tự đặt câu cho tình huống
   mới". GIỚI HẠN: ở schema v1, các bài này vẫn là fill có đáp án chấp
   nhận được (diễn đạt có hướng dẫn), chưa phải sản phẩm tự do chấm bằng
   rubric. Diễn đạt tự do không chấm điểm nằm ở mục Luyện nói (tự nói theo
   tình huống, thu âm nghe lại) — đúng thiết kế, không gọi là đã chấm.
5. Đáp án: mọi bài tập đều có explanation cụ thể (sai ở đâu, sửa thế nào);
   các bài xếp từ có nhiều đáp án hợp lệ đều ghi rõ (了, 不/没, từ để hỏi).
6. Audio: TTS zh-CN của trình duyệt, tốc độ chỉnh được, Pinyin ẩn mặc
   định, giọng tổng hợp (không phải người bản ngữ). KIỂM TRA CHƯA LÀM:
   - TTS đọc đa âm 了解 (liǎojiě) trên trình duyệt thật = not_run.
   - Thu âm MediaRecorder trên thiết bị thật = not_run.
7. Trải nghiệm học: danh mục, tìm kiếm, lọc cấp, bài, luyện tập, hoàn
   thành, ôn FSRS, xuất/nhập đã qua vòng trình duyệt ở bản cũ (commit
   0e9a9904); bản mới cần vòng lại (xem mục D).
8. Câu trùng giữa các bài: việc cùng một câu xuất hiện ở hai bài để minh
   họa hai điểm khác nhau là hợp lệ về mặt sư phạm và KHÔNG được coi là
   lỗi cần sửa chỉ để làm đẹp số liệu. Ví dụ đã đổi ở lô 03 (bài 的) vẫn
   giữ nguyên vì bản thân nó cũng đúng; không sửa thêm vì lý do trùng.

## D. Trạng thái tách bạch (sửa báo cáo cũ)
- Đã duyệt nội dung: 12 bài (rà soát nội bộ, không khẳng định giáo viên/
  người bản ngữ duyệt).
- Đã push main: commit mới nhất trước vòng trình duyệt mới là 86e5230f
  (12 bài) — cộng thêm commit của lô này sau khi push (xem checkpoint).
- Đã xác minh live: CHƯA cho bản 12 bài tại thời điểm viết báo cáo này
  (text fetch trước đó trả bản cache cũ 3 bài). Việc xác minh live sẽ do
  vòng trình duyệt ở bước tiếp theo thực hiện trên giao diện (đếm 12 bài
  trong danh mục), đồng thời loại trừ lỗi đường dẫn dữ liệu: nếu giao diện
  tải đủ 12 bài thì data/lessons.json đã đúng đường dẫn; nếu chỉ thấy 3
  bài thì phải kiểm tra tiếp deployment/Pages trước khi kết luận cache.

## E. FSRS — giải thích hạn Good 10 phút (chuẩn bị cho vòng trình duyệt)
- Thư viện ts-fsrs 5.4.2, tham số mặc định trừ enable_fuzz=false.
- Kiểm tra bằng Node (simulated time): thẻ mới + Good → trạng thái
  Learning (1), learning_steps=1, hạn = thời điểm ôn + 10 phút.
  Good lần 2 tại đúng hạn → trạng thái Review (2), scheduled_days=2,
  hạn sau 2 ngày. Again từ thẻ mới → Learning, hạn +1 phút.
  Easy từ thẻ mới → Review, scheduled_days=8.
- Kết luận: hạn 10 phút sau Good đầu tiên là BƯỚC HỌC (learning step),
  không phải khoảng ôn dài hạn và không phải lỗi; thẻ vẫn ở trạng thái
  Learning. Đánh giá đúng/sai của một lần ôn phải dựa vào trạng thái thẻ
  và bước học, không chỉ vào con số 10 phút.
