# Báo cáo rà soát lô 03 — Hoàn thiện 12 bài mẫu + danh mục làm việc baseline (29/10/2026)

## Phạm vi
- 9 bài mới, đều status published, đã qua validator và rà soát nội dung riêng
  (quy-trinh-ra-soat-noi-bo, không khẳng định giáo viên/người bản ngữ duyệt):
  很 (HSK1, dễ), 吗 (HSK1, dễ), 的 (HSK1, dễ), 有 (HSK1, dễ),
  不/没 (HSK1, trung bình), lượng từ (HSK1, trung bình),
  từ để hỏi (HSK1, trung bình), 会/能/可以 (HSK1, trung bình),
  过 (HSK2, trung bình). Tổng: 12 bài, 53 bài tập.
- Đa dạng theo đặc tả P03: bài dễ, bài nhiều điều kiện (lượng từ, từ để
  hỏi), cặp dễ nhầm (是/很, 不/没, 有/在, 会/能/可以), bài nhiều đáp án hợp lệ
  (thời gian trước/sau chủ ngữ ở bài 不/没 và từ để hỏi), cấu trúc nhiều
  cách dùng (了, đã có từ lô 1), kiểm tra đa âm (了/le–liǎo, lô 1).

## Sửa trong quá trình rà soát
- Trùng ví dụ: 这是我的书。 xuất hiện ở cả bài 是 và bài 的 → đổi ví dụ
  đầu bài 的 thành 这是她的笔。 và sửa các bài tập liên quan.
- Ví dụ cụm lượng từ: "一个人。" chỉ là cụm, không phải câu → đổi thành
  我买了三本书。 để ví dụ là câu hoàn chỉnh.
- Không còn ví dụ trùng nhau giữa các bài sau khi sửa.

## Kiểm tra đã chạy
- `python3 scripts/validate.py` → ĐẠT 12 bài, 12 published, 53 bài tập.
- `python3 -m unittest discover -s tests` → 5 passed.
- `node --test tests/test_fsrs.mjs` → 7 passed.
- `node --check app.js` → đạt. (Không chạy lại toàn bộ kiểm thử trình duyệt
  vì không có thay đổi giao diện trong lô này; thay đổi duy nhất là dữ liệu
  bài học, đã qua validator.)

## Baseline — những gì đã làm và chưa làm được
- Đã chốt phiên bản mục tiêu (D15): đề cương thi HSK 3.0 công bố 11/2025,
  phân biệt với chuẩn năng lực 2021 (GF 0025-2021, 48 điểm gộp cấp 1) và
  HSK cũ 2.0. Số tích lũy 70/148/244/339/409/459 chỉ là số liệu nguồn thứ
  cấp (Hanzio, ioChinese, PassHSK) — chưa đối chiếu văn bản gốc.
- Danh mục làm việc 0.2: 12 mục đã có bài + 6 mục HSK2 planned (在, 着,
  是……的, bổ ngữ kết quả, bổ ngữ phương hướng, câu phức 虽然/因为).
  Đây KHÔNG phải baseline hoàn chỉnh; HSK3–6 chưa lập danh mục; tổng số
  mục chưa biết nên không tính phần trăm bao phủ.
- Còn thiếu để khóa: văn bản gốc đề cương thi 11/2025 (sách/PDF chính thức
  từ CTI/CLEC), danh sách đầy đủ cấp 2–6 theo số thứ tự gốc, xác minh điều
  kiện sử dụng lại danh sách gốc, và đối chiếu từng mục (đặc biệt các mục
  có cấp khác nhau giữa chuẩn 2021 và đề cương thi, ví dụ 了 xuất hiện ở
  nhiều điểm trong danh sách HSK1 theo nguồn thứ cấp).

## Hạn chế còn tồn tại
- Cấp HSK của 12 bài vẫn là tạm thời (provisional), dựa trên CGW và nguồn
  thứ cấp, chưa khóa theo đề cương gốc.
- Các trang CGW cụ thể cho 9 bài mới chưa được đối chiếu từng trang trong
  phiên này; rà soát dựa trên kiến thức ngữ pháp chuẩn của các cấu trúc cơ
  bản này và kiểm tra đáp án từng bài tập.
- P06 chưa hoàn thành: 6 bài HSK2 planned chưa biên soạn.
