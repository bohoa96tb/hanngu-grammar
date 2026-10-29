# Thư viện FSRS đã khóa phiên bản (vendored, không sửa)

- Gói: `ts-fsrs` phiên bản **5.4.2**, giấy phép MIT (xem `ts-fsrs-5.4.2.LICENSE.txt`).
- Nguồn: npm `ts-fsrs@5.4.2`, file `dist/index.mjs` sao chép nguyên văn thành
  `ts-fsrs-5.4.2.mjs` ngày 2026-10-29, không sửa nội dung.
- App dùng thư viện này qua `srs.mjs`, không dùng công thức tự chế mang tên FSRS.
- Khi nâng cấp phiên bản: thay file, cập nhật `FSRS_VERSION` trong `srs.mjs`,
  chạy lại `node --test tests/test_fsrs.mjs`, và ghi quyết định mới vào
  `docs/decisions.md` (thẻ cũ vẫn giữ nguyên trạng thái theo phiên bản thư viện
  đã tạo ra chúng, trừ khi có migration được kiểm tra).
