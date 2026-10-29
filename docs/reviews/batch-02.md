# Báo cáo rà soát lô 02 — P05 FSRS thật (29/10/2026)

## Phạm vi
- Thư viện: `ts-fsrs` 5.4.2, MIT, không phụ thuộc, file `dist/index.mjs`
  vendored nguyên văn thành `vendor/ts-fsrs-5.4.2.mjs` (kèm LICENSE và README).
- Logic thuần: `srs.mjs` — tạo scheduler với `enable_fuzz: false`,
  serialize/revive thẻ (due/last_review dạng ISO UTC), `applyReview` với
  event_id `${card_id}|${reviewISO}|${rating}`, hàng đợi cho bài đã hoàn thành.
- UI: trang Ôn lại — thẻ đến hạn (tự nhớ trước, hiện công thức để đối chiếu,
  rồi tự đánh giá Again/Hard/Good/Easy), giới hạn số thẻ/ngày chỉnh được
  (mặc định 20), thẻ sắp đến hạn, lịch sử ôn, bài làm sai riêng.
- Tiến trình: v2, migrate từ v1 (giữ hoàn thành/bài tập/gợi ý, thẻ bắt đầu
  trống); xuất/nhập chấp nhận v1/v2, kiểm tra cards/events, hỏi xác nhận
  trước khi ghi đè.

## Kiểm tra đã chạy
- `node --test tests/test_fsrs.mjs` → 7 passed: khóa phiên bản + enum thư viện;
  Good từ thẻ mới (Learning, reps=1, due sau thời điểm ôn); thời gian giả lập
  (Good lần 2 tại hạn đẩy hạn xa hơn); Again tại hạn lùi về bước 1 phút;
  serialize/revive; gửi lặp cùng event_id không áp dụng lần 2; hàng đợi
  (bài đã hoàn thành chưa có thẻ là đến hạn ngay, bài chưa hoàn thành không
  vào hàng đợi).
- `python3 scripts/validate.py` → ĐẠT 3 bài, 14 bài tập.
- `python3 -m unittest discover -s tests` → 5 passed.
- `node --check app.js`, `node --check srs.mjs` → đạt.
- Máy chủ tĩnh local → 200 cho index.html, app.js, srs.mjs,
  vendor/ts-fsrs-5.4.2.mjs, data/lessons.json.

## Hạn chế còn tồn tại
1. Một thẻ cho mỗi bài (chưa tách thẻ theo kỹ năng/cách dùng như §9 cho phép).
2. Đánh giá là tự đánh giá nhớ lại, không phải máy chấm bài tập; người học
   có thể tự đánh giá cao hơn thực tế — đây là bản chất của self-rating FSRS,
   đã ghi rõ trong UI.
3. Chưa kiểm tra tương tác ôn tập trực tiếp trên trình duyệt thật và trên
   live; mới kiểm tra logic bằng Node và phục vụ file bằng máy chủ tĩnh.
4. Thẻ tạo bởi phiên bản thư viện cũ (nếu sau này nâng cấp) chưa có migration
   riêng; xem `vendor/README.md`.
