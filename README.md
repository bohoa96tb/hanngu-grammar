# hanngu-grammar — Ngữ pháp tiếng Trung HSK1–6 cho người Việt

Ứng dụng web tĩnh, học ngữ pháp tiếng Trung bằng tiếng Việt: bài giảng, ví dụ,
bài tập có lời giải, nghe câu bằng giọng tổng hợp (TTS) của trình duyệt, và
lưu tiến trình trên thiết bị của người học. Không cần tài khoản, không cần máy chủ.

**Trạng thái phiên đầu tiên (29/10/2026): BẢN THỬ NGHIỆM, CHƯA PHẢI DỰ ÁN HOÀN THÀNH.**
Chỉ có 3 bài mẫu đã rà soát (xem `docs/reviews/batch-01.md`). Toàn bộ HSK1–6
chưa được biên soạn, baseline toàn diện chưa khóa. Xem `docs/checkpoint.json`
để biết chính xác việc tiếp theo.

## Chạy local

Không cần build. Mở `index.html` bằng trình duyệt, hoặc chạy máy chủ tĩnh:

```bash
python3 -m http.server 8000
# mở http://localhost:8000/
```

## Kiểm tra

```bash
python3 scripts/validate.py
python3 -m unittest discover -s tests -v
```

## Cấu trúc

- `index.html`, `styles.css`, `app.js` — ứng dụng tĩnh (không framework build).
- `data/lessons.json` — nội dung bài học đã duyệt/bản nháp, theo schema ở `docs/schema.md`.
- `scripts/validate.py` — kiểm tra schema, ID duy nhất, liên kết, placeholder, đáp án.
- `docs/` — đặc tả, yêu cầu, quyết định, nguồn, baseline, task board, checkpoint, cổng chất lượng.

## Những gì CHƯA có (không làm nút giả)

- Chấm phát âm chuyên sâu, phân tích cú pháp câu bất kỳ, chatbot gia sư,
  đồng bộ đa thiết bị, đăng nhập: xem backlog trong `docs/task-board.json`
  (P05 trở đi, trạng thái `planned`/`blocked`).
- Ôn tập FSRS thật: hiện chỉ có danh sách ôn đơn giản theo ngày làm bài;
  **không gọi là FSRS**. Tích hợp thư viện `ts-fsrs` đã khóa phiên bản là task P05.
- Audio thu sẵn: hiện dùng TTS của trình duyệt (giọng tổng hợp, không phải
  người bản ngữ). Audio thu sẵn/Edge-TTS chỉ dùng sau khi xác minh giấy phép
  và điều kiện phân phối.

## Giấy phép

- Mã nguồn trong repo này: MIT (xem `LICENSE`).
- Giấy phép mã nguồn **không** mặc nhiên bao phủ nội dung bài học, ví dụ hay
  audio sao chép từ nguồn khác. Nguồn và tình trạng phân phối của từng nguồn
  xem `docs/source-register.json`. Nội dung bài mẫu là bài soạn mới bằng tiếng
  Việt, tham khảo giải thích công khai của Chinese Grammar Wiki (CC BY-NC-SA 3.0)
  và ghi nguồn trong từng bài; chưa khẳng định an toàn pháp lý tuyệt đối.
