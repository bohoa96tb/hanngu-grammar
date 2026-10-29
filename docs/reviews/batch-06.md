# Báo cáo rà soát lô 06 — Tách shard dữ liệu + lô 3 HSK1–2 (29/10/2026)

## A. Tách shard (khắc phục tận gốc giới hạn truyền file)
- Trước: một file data/lessons.json 108 KB (18 bài), khi đẩy qua tham số
  CLI đã vượt 128 KB (đo được 150.885 byte) và phải đẩy dạng thu gọn.
- Sau: data/lessons/hsk1.json (80.029 byte, 14 bài) và
  data/lessons/hsk2.json (64.136 byte, 10 bài), liệt kê theo thứ tự trong
  data/lessons-manifest.json. Shard là nguồn duy nhất; file tổng hợp cũ
  được xóa khỏi repo trong cùng đợt thay đổi.
- app.js tải manifest rồi tải song song các shard và gộp theo thứ tự
  manifest; scripts/validate.py và tests/test_validator.py đọc qua
  manifest. ID bài học không đổi nên tiến trình localStorage (lưu theo
  ID) không bị ảnh hưởng.
- Quy trình xác định từ nay: sửa trực tiếp shard theo cấp, giữ dạng thụt
  lề; không còn bản workspace và bản repo khác nhau, không còn minify
  để nhét file vào tham số CLI.

## B. Lô 3 — 6 bài mới (đều published, đã qua validator và rà soát riêng)
- Tiền tố/hậu tố 第/小/们/边 (HSK1, dễ), Đại từ 这/那 (HSK1, dễ),
  Phó từ 都/也/还/再 (HSK1, trung bình), Câu hỏi lựa chọn 还是 (HSK2,
  trung bình), Động từ trùng điệp (HSK2, trung bình), Câu hai tân ngữ
  với 给 (HSK2, trung bình). Tổng: 24 bài, 111 bài tập.
- Sửa trong rà soát: (1) công thức bài trùng điệp ban đầu viết lan man
  và có dấu hỏi tự vấn — đã viết lại gọn và chính xác; (2) câu trắc
  nghiệm bài 给 ban đầu chứa hai đáp án đúng (mẫu 1 và mẫu 2) nhưng chỉ
  chấp nhận một — đã đổi phương án gây nhiễu thành câu sai thứ tự
  我送他给一本书。 và sửa giải thích.

## C. Kiểm tra đã chạy
- `python3 scripts/validate.py` → ĐẠT 24 bài, 24 published, 111 bài tập.
- `python3 -m unittest discover -s tests` → 5 passed.
- `node --check app.js` → đạt.
- Không chạy lại kiểm thử FSRS vì không có thay đổi liên quan.

## D. Audio — đối chiếu cả 24 bài (không gọi lô hoàn tất toàn bộ tiêu chí)
- Cơ chế audio của app là TTS của trình duyệt (speechSynthesis, zh-CN),
  phát theo yêu cầu từng câu ví dụ, không phải file audio thu sẵn theo
  bài. Vì vậy không có bài nào có "file audio đã tạo" và cũng không có
  bài nào thiếu file audio theo nghĩa đó.
- Trạng thái cho cả 24 bài: nút Nghe mẫu có mặt trong giao diện bài học
  (đã thấy ở bài 是 trong vòng qa-02); việc PHÁT TIẾNG thực tế trên
  trình duyệt/thiết bị thật = not_run cho cả 24 bài (vòng trình duyệt
  không nghe được âm thanh và không bấm thử phát).
- Kết luận: lô 3 đạt các tiêu chí nội dung, validator và luồng học đã
  kiểm tra, nhưng KHÔNG gọi là hoàn tất toàn bộ tiêu chí chừng nào kiểm
  tra phát âm TTS thực tế còn là not_run.
