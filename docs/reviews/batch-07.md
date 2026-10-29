# Báo cáo rà soát lô 07 — Chẩn đoán 24 bài, shard theo bài, chế độ debug (29/10/2026)

## A. Chẩn đoán có bằng chứng (không đoán cache)
- Tầng nội dung trên main: merge PR #1 (add70467) đúng; manifest và shard
  đủ 24 bài; app.js trên main tải qua manifest — kiểm tra qua API.
- Tầng file trên Pages: manifest và shard hsk2 lấy về mới lúc 06:08 UTC;
  app.js lấy về mới lúc 06:14 UTC và chứa đúng đoạn tải manifest — chứng
  tỏ triển khai cây file mới đã xong, không phải Pages chưa triển khai.
- Tầng giao diện trong hồ sơ trình duyệt kiểm tra: 3 lần tới 06:10 UTC
  vẫn 18 bài dù đã dùng tham số truy vấn mới và tải lại cứng. Vì giao
  diện hiện 18 bài thành công (không báo lỗi tải), code đang chạy vẫn là
  app.js cũ tải file tổng hợp cũ. App KHÔNG có service worker, không có
  webmanifest, không dùng Cache Storage (kiểm tra mã nguồn) — nên cơ chế
  cache còn lại là bộ nhớ đệm HTTP của trình duyệt và CDN của Pages đối
  với các URL đã thay đổi; các URL mới (manifest, shard) chưa từng bị
  cache nên lấy về mới ngay.
- Giới hạn kiểm tra triển khai: công cụ GitHub hiện có không có lệnh xem
  trạng thái deployment của Pages (không có workflow vì Pages triển khai
  từ nhánh, không qua Actions trong repo này); trạng thái triển khai
  được xác minh bằng file thực tế phục vụ trên Pages, không bằng bảng
  trạng thái workflow. Nguồn xuất bản: nhánh main, thư mục gốc (đã xác
  minh khi bật Pages); commit nguồn của main sau merge là add70467.
- Không xóa localStorage tiến trình học để chữa lỗi hiển thị; không coi
  thêm query vào URL trang là bằng chứng mọi tài nguyên đã tải mới
  (query ở URL trang không đổi URL của app.js).

## B. Thay đổi trong lô này
- Shard theo bài: data/lessons/<id>.json (24 file, mỗi file một bài),
  manifest liệt kê theo thứ tự; loader và validator không đổi logic
  (vẫn gộp theo manifest). File mỗi cấp không còn lớn dần theo lô.
- Chế độ chẩn đoán tối thiểu: mở trang với ?debug=1 để hiện bảng gồm
  phiên bản build, URL script, trạng thái service worker, tên Cache
  Storage, danh sách giọng zh-CN, số bài từng nguồn, tổng số bài, số bài
  sau lọc published, số bài đã hoàn thành (chỉ số lượng) và lỗi tải từng
  nguồn. Không hiển thị bí mật hay dữ liệu cá nhân.
- Versioning có bằng chứng: app.js mang BUILD_VERSION và tải manifest/
  shard kèm ?v=BUILD_VERSION; index.html tải app.js kèm ?v=... theo
  phiên bản phát hành. Tác dụng giới hạn: chỉ có hiệu lực khi app.js mới
  đã được tải; không chữa được app.js cũ còn trong bộ nhớ đệm và không
  thay được cache header do Pages tự quản.
- TTS: speak() ưu tiên giọng zh nếu danh sách giọng đã tải; nếu chưa có
  giọng zh vẫn thử đọc theo lang zh-CN và bảng debug ghi rõ danh sách
  giọng zh tìm thấy. Không coi TTS là audio thu sẵn.

## C. Kiểm tra đã chạy
- `python3 scripts/validate.py` → ĐẠT 24 bài, 24 published, 111 bài tập.
- `python3 -m unittest discover -s tests` → 5 passed.
- `node --check app.js` → đạt.
- Không chạy lại kiểm thử FSRS vì không có thay đổi liên quan.
- Kiểm tra phát âm thực tế (nghe được) vẫn not_run cho cả 24 bài.
