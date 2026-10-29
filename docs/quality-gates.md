# Cổng chất lượng — chỉ khai báo lệnh đã xác minh tồn tại

## Lệnh đã xác minh (chạy được ngày 29/10/2026, local)

```bash
python3 scripts/validate.py
python3 -m unittest discover -s tests -v
node --test tests/test_fsrs.mjs
python3 -m http.server 8000   # kiểm tra thủ công: mở http://localhost:8000/
```

## Cổng theo giai đoạn (đặc tả §11–§12)

- P00: không còn mơ hồ nơi làm + phạm vi hành động. Bằng chứng: checkpoint,
  task board, requirements có trạng thái thật.
- P01: mỗi mục baseline có nguồn; phần chưa rõ bị chặn rõ, không nhập hàng loạt.
- P02: validator bắt được lỗi cố ý (fixtures sai) và chấp nhận dữ liệu hợp lệ.
- P03: 3 bài mẫu không còn lỗi nghiêm trọng về kiến thức/đáp án; chuẩn bài ghi rõ.
- P04: người dùng hoàn thành được một vòng học trên màn hình ~360px:
  danh mục → bài → luyện tập → kết quả → lưu/tải lại tiến trình.
- P05: không mất/ghi trùng tiến trình; kiểm tra thời gian giả lập và khôi phục đạt.
- P09: không còn lỗi chặn phát hành; hạn chế còn lại công bố rõ trong release log.

## Kiểm tra bắt buộc mỗi lô

- Schema hợp lệ, ID duy nhất, liên kết tồn tại, không placeholder lọt vào bản phát hành.
- Token/spans không vượt chiều dài câu; Pinyin/dấu câu xử lý nhất quán.
- Đáp án/rubric đầy đủ theo loại; bài xếp từ chấp nhận nhiều đáp án hợp lệ nếu có.
- Audio khớp version/hash của câu (khi có audio thu sẵn); file không rỗng.
- Không vô hiệu hóa test để bỏ qua lỗi. Không coi kiểm tra schema là chứng minh
  tiếng Trung đúng — cần rà soát nội dung riêng (xem `docs/reviews/`).

## Phần chưa kiểm tra (ghi `not_run`, không ghi `passed`)

- Android Chrome / Safari iOS thực tế (phát liên tiếp, chuyển tab, khóa màn hình).
- Kiểm tra tiếp cận 200%, tương phản bằng công cụ chuyên dụng.
- Kiểm tra E2E tự động (chưa có hạ tầng trong phiên này).
