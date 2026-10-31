# QA độc lập — pilot Đọc & nghe vận dụng (APP-01, 2026-10-31)

Phạm vi: 3 file data/applied/*.json đối chiếu trực tiếp với 3 trang
nguồn Mandarin Bean bằng fetch text; kiểm nhất quán 18 câu hỏi;
manifest và tài liệu schema.

Kết quả: PASS toàn bộ nội dung.
- Cả 18 đáp án đều suy ra được từ văn bản nguồn; phương án nhiễu sai
  rõ ràng; giải thích khớp nội dung, 1–2 câu.
- Bằng chứng cấu trúc đúng: 是 ×2 xác định thân phận (A Happy Day);
  不 cho tính chất + 没有 cho việc không xảy ra (Visiting Sister);
  hai mệnh đề 买+了 hoàn thành (Mother's Day).
- Vị trí đáp án đúng phân bố 6/5/7 (chỉ số 0/1/2); bộ câu hỏi nghe
  khác bộ đọc, không lặp nguyên bộ.
- Manifest khớp đúng 3 file.
- Điểm lệch duy nhất: tài liệu schema dùng tên trường cũ
  (target_structure/duration_label) — ĐÃ sửa đồng bộ theo JSON thực
  tế (target_structure_vi, duration_label_vi, thêm length_label_vi,
  ghi rõ material chỉ ở reading khi shared) ngay trong cùng lô.

Giới hạn của vòng QA này: thời lượng audio và verified_playback
không tự xác minh được qua fetch text (player chỉ hiện 0:00); các
giá trị này dựa trên quan sát player bằng trình duyệt thật ở vòng
khảo sát nguồn (ghi ở docs/research/applied-materials-pilot.md).
Kiểm tra local đi kèm: validator ĐẠT, unit test 25 OK, harness
29/29 (gồm 5 kiểm tra applied mới), 0 lỗi console; ảnh mobile 390px
và desktop đã xem trực tiếp (phát hiện và sửa lỗi nhãn tab "Nghe"
trắng trên nền trắng trước QA).
