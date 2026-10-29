# Báo cáo rà soát lô 08 — Đối chiếu HSK1–2 và 4 bài mới (29/10/2026)

## A. Đối chiếu chính thức HSK1–2 (P01-02, phần HSK1–2)
- Nguồn: 语法大纲 trong đề cương thi HSK 3.0 (2025-11 发布, 2026-07
  实施), HSK1 tr.382, HSK2 tr.386; bản trích xuất dùng ngày 2026-09-25,
  chưa ghi hash file gốc nên cần đối chiếu lại nếu tài liệu có bản sửa.
- Kết quả ghi ở docs/baseline-hsk1-hsk2-mapping.md (diễn giải tiếng
  Việt, không sao chép nguyên văn bảng hay câu ví dụ của đề cương) và
  docs/official-catalogue-hsk1-hsk2.json (danh mục nhóm, giữ riêng với
  nhóm phạm vi của dự án):
  - HSK1: 52 mục nhóm — 20 đã có, 10 một phần, 22 thiếu.
  - HSK2: 62 mục nhóm — 14 đã có, 14 một phần, 34 thiếu.
  - Các con số này là số mục nhóm do dự án tự chia, KHÔNG phải số
  thứ tự chính thức trong đề cương và KHÔNG dùng để tính phần trăm bao
  phủ vi mô.
- Không cần sửa cấp độ cho 24 bài cũ: cả 24 bài đều khớp cấp độ với đề
  cương (kể cả 了 ở HSK1, 在/正在 ở HSK1, 比/过/着/是……的/补语 ở HSK2).
- Hạn chế ghi rõ: bố cục bảng trong bản trích bị nhòe ở một số hàng
  nên nhóm con của một vài phó từ (HSK1: 还/再/也; HSK2: 一起/就/都)
  ghi chú "chưa chắc chắn"; mức từ (từ nào thuộc cấp nào) đọc rõ và
  là căn cứ chính. HSK3–6 chưa đối chiếu — P01-02 vẫn in_progress.

## B. Bài mới đợt này (4 bài, 20 bài tập; tổng 28 bài, 131 bài tập)
- modal-xiang-yao (HSK1, medium): 想/要 + động từ; phân biệt 想 nhẹ
  hơn 要, và 想 + người mang nghĩa "nhớ".
- location-nouns (HSK1, medium): phương vị từ 上/下/里/外/前/后 đứng
  sau danh từ chỉ nơi chốn; 里 nhấn mạnh "trong", 外 là "ngoài".
- why-question (HSK2, medium): 为什么 đứng trước động từ; câu hỏi
  đặc chỉ không dùng 吗; trả lời bằng 因为.
- yi-jiu-tight (HSK2, medium): mẫu cố định 一……就……; 一 trước động
  tác 1, 就 trước động tác 2; phân biệt với 先……，再…… (chỉ thứ tự).
- Lượt rà soát riêng (sau lượt soạn, không phải tự duyệt bài mình vừa
  viết xong mà không kiểm tra lại): kiểm tra bằng script — token nối
  khớp câu đã bỏ dấu, mỗi câu trắc nghiệm đúng một đáp án khớp chuẩn
  hoá, khối xếp thứ tự khớp tập token đáp án, đáp án error_spot nằm
  trong các khối; kiểm tra tay các bẫy nhầm lẫn (đã bỏ một bẫy sai về
  一……就…… trong lúc soạn vì mẫu này chỉ yêu cầu hai việc liền nhau,
  không yêu cầu gần thời điểm hiện tại, và thay bằng đối chiếu
  先……，再……). Validator ĐẠT 28 bài, 28 published, 131 bài tập.
- Trạng thái: 4 bài mới đều là "đã rà soát nội bộ", KHÔNG phải "đạt
  toàn bộ tiêu chí" vì audio TTS chưa nghe kiểm chứng trên thiết bị
  thật (giống 24 bài cũ).

## C. Thay đổi khác trong lô
- Thông báo thiếu giọng zh (D22): speak() hiện cảnh báo một lần mỗi
  lần tải trang khi danh sách giọng đã tải xong mà không có giọng zh,
  thay vì âm thầm dùng giọng mặc định làm mẫu chuẩn. Trường hợp danh
  sách giọng chưa tải xong vẫn chưa xác định được — bảng ?debug=1 ghi
  rõ danh sách giọng zh tìm thấy.
- Không chạy lại kiểm tra qa-04 (tải dữ liệu, danh mục, bài tập đã
  thử, giữ tiến trình) vì không có thay đổi liên quan tới loader hay
  dữ liệu cũ; chỉ chạy validator, unittest và node --check cho thay
  đổi đợt này. Kiểm tra giao diện live cho 28 bài sẽ làm ở vòng nghiệm
  thu sau khi merge, không khẳng định trước.
