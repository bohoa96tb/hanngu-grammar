# Báo cáo rà soát lô 10 — Đối chiếu HSK3–4 và 4 bài HSK3 mới (29/10/2026)

## A. Đối chiếu chính thức HSK3–4 (P01-02, phần HSK3–4)
- Nguồn: 语法大纲 trong đề cương thi HSK 3.0 (2025-11 发布, 2026-07
  实施), HSK3 tr.389, HSK4 tr.392; bản trích xuất dùng ngày
  2026-09-25, chưa ghi hash file gốc nên cần đối chiếu lại nếu tài
  liệu có bản sửa.
- Kết quả ghi ở docs/baseline-hsk3-hsk4-mapping.md (diễn giải tiếng
  Việt, không sao chép nguyên văn bảng hay câu ví dụ của đề cương) và
  docs/official-catalogue-hsk3-hsk4.json (danh mục nhóm, giữ riêng với
  nhóm phạm vi của dự án):
  - HSK3: 50 mục nhóm — trước lô 10: 0 đã có, 3 một phần, 47 thiếu;
    sau lô 10: 4 đã có, 4 một phần, 42 thiếu.
  - HSK4: 34 mục nhóm — tất cả thiếu.
  - Các con số này là số mục nhóm do dự án tự chia, KHÔNG phải số
  thứ tự chính thức trong đề cương và KHÔNG dùng để tính phần trăm
  bao phủ vi mô.
- Cập nhật ánh xạ HSK1–2 cho 34 bài: HSK1 52 mục nhóm (25 đã có, 10
  một phần, 17 thiếu), HSK2 62 mục nhóm (19 đã có, 14 một phần, 29
  thiếu), sau khi tính 6 bài lô 09.
- Không cần sửa cấp độ cho 34 bài cũ. P01-02 vẫn in_progress vì
  HSK5–6 chưa đối chiếu.

## B. 4 bài mới lô 10 (HSK3, đã rà soát nội bộ, chưa đạt toàn bộ
tiêu chí vì audio chưa nghiệm thu)
- ba-sentence-1 (把字句 dạng 1): 3 ví dụ, 5 bài tập. Điểm dễ sai
  được dạy: tân ngữ đứng sau 把; động từ không đứng trơ một mình;
  phân biệt với câu bị động.
- bei-passive-1 (被动句 dạng 1): 3 ví dụ, 5 bài tập. Dạy cả dạng lược
  bỏ tác nhân; động từ cần thêm thành phần khác.
- zhe-accompanying (着 kèm theo): 3 ví dụ, 5 bài tập. Tách rõ khỏi
  着 chỉ trạng thái ở HSK2 (bài cũ đã ghi rõ nghĩa này thuộc HSK3).
- bi-comparison-2 (比较句 dạng 2): 3 ví dụ, 5 bài tập. Dạy 更/还
  sau 比, 一样 với 跟, và nghĩa chính xác của 不比 (không hơn, có
  thể bằng).
- Rà soát riêng sau lượt soạn: kiểm tra tokens khớp câu, đúng một
  đáp án đúng cho mỗi trắc nghiệm, tập khối của bài xếp khớp đáp án,
  đáp án lỗi vị trí nằm trong các khối. Validator ĐẠT: 38 bài,
  181 bài tập.
