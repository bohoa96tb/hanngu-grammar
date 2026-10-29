# Release log

Chưa có bản phát hành nào.

- 2026-10-29 — Bản thử nghiệm local (chưa phát hành): P00–P04 với 3 bài mẫu.
  Chưa push lên GitHub vì GitHub chưa kết nối (xem checkpoint). Chưa có URL
  Pages, chưa có release ID, chưa có rollback cần thiết vì chưa phát hành gì.
  Khi repo được tạo và workflow Pages chạy thành công, ghi tại đây: phiên bản,
  commit SHA đã kiểm tra, URL live đã kiểm tra, và cách rollback (về commit
  trước qua GitHub Pages redeploy / revert).

- 2026-10-29 — Đẩy lần đầu lên main (P00–P04): head đã xác minh
  `fd8799247ae6ea8abdca29c4a4f9196d78bf1dc5`, 21/22 file. Thiếu duy nhất
  `.github/workflows/pages.yml` do API của GitHub App trả 403 với file workflow.
  Pages chưa bật nên chưa có URL live đã xác minh; rollback: về commit trước
  bằng cách ghi đè file tương ứng qua Contents API (không force-push).

- 2026-10-29 — GitHub Pages live đã xác minh qua text fetch (04:52 UTC):
  https://bohoa96tb.github.io/hanngu-grammar/ — index hiển thị đúng tiêu đề
  và tagline, data/lessons.json đủ 3 bài. Deploy từ nhánh main (không dùng
  workflow Actions, vì file workflow bị 403 qua API). Chưa kiểm tra tương tác
  JS trực tiếp trên live bằng trình duyệt thật.

- 2026-10-29 — P05-01: FSRS thật bằng ts-fsrs 5.4.2 (vendored, MIT).
  Một thẻ cho mỗi bài đã hoàn thành, 4 mức tự đánh giá, event_id chống ghi
  trùng, tiến trình v2 (migrate từ v1), kiểm thử Node 7 passed.

- 2026-10-29 — P09-01 kiểm định: 6/6 bước tương tác đạt trên bản live;
  sửa lỗi nhỏ lịch sử ôn chỉ cập nhật sau khi tải lại trang (nay render lại
  ngay sau khi ghi). Hạn chế còn lại: chưa kiểm tra Android/iOS thật, mic
  thật, tiếp cận 200% bằng công cụ chuyên dụng, E2E tự động.
