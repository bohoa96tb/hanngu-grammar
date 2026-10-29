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
