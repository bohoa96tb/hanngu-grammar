# Báo cáo rà soát lô 01 — 3 bài mẫu (29/10/2026)

## Phạm vi lô
- `shi-noun-link` (HSK tạm thời 1, dễ): 是 nối danh từ.
- `bi-comparison` (HSK tạm thời 2, trung bình): 比 so sánh hơn.
- `le-completion-change` (HSK tạm thời 2, trung bình): 了 hoàn thành + đổi trạng thái.

Tiêu chí mẫu theo đặc tả §11/P03, gộp trong 3 bài: một bài dễ, một bài nhiều
điều kiện (比: thứ tự, người hơn, mức chênh lệch, phủ định), một cặp dễ nhầm
(是/很/在; 比/没有), một bài có nhiều đáp án hợp lệ (了: 昨天 đứng trước/sau
chủ ngữ đều đúng), một cấu trúc nhiều cách dùng (了1/了2), một bài kiểm tra
audio đa âm (了 trong 了解 đọc liǎojiě, không phải le).

## Kiểm tra đã chạy
- `python3 scripts/validate.py` → ĐẠT: 3 bài, 3 bài published, 14 bài tập.
- `python3 -m unittest discover -s tests -v` → 5 tests passed (dữ liệu hợp lệ,
  trùng ID, token xếp từ sai, published thiếu review, thiếu ví dụ từ ý tiếng Việt).
- `node --check app.js` → đạt (không in lỗi).
- Máy chủ tĩnh local `python3 -m http.server 8123` → `index.html` 200,
  `data/lessons.json` 200.

## Rà soát nội dung (lượt riêng sau lượt soạn)
- Đối chiếu cấu trúc với Chinese Grammar Wiki qua kết quả tìm kiếm ngày
  29/10/2026: Connecting nouns with shi; Basic comparisons with bi (A2/HSK2);
  Expressing completion with le; Change of state with le.
- Kiểm tra bẫy: 是 trước tính từ; 是/在; 不 sau 比; 比/没有; phủ định 了
  (没/没有, bỏ 了); đa âm 了解.
- Không khẳng định có giáo viên hay người bản ngữ duyệt — trường `review.reviewer`
  ghi đúng là `quy-trinh-ra-soat-noi-bo`.

## Hạn chế còn tồn tại (không giấu)
1. Cấp HSK của 3 bài là tạm thời (D04); baseline toàn diện chưa khóa.
2. Bài 了 gộp 2 cách dùng trong một bài; phiên mở rộng nên tách thành bài nhỏ
   theo §5.1 (đã ghi trong `formula_notes` và review của bài).
3. Chưa nghe kiểm tra TTS thực tế trên Android Chrome/Safari iOS; TTS trình duyệt
   chưa được gắn nhãn “audio đã duyệt” — app ghi rõ là giọng tổng hợp.
4. Chưa kiểm tra thủ công toàn bộ luồng trên màn hình 360px thật; mới kiểm tra
   bằng máy chủ tĩnh và mã nguồn (CSS có breakpoint 420px).
5. Ví dụ trong bài mẫu là bài soạn mới, không sao chép nguyên văn nguồn; vẫn cần
   xác minh lại giấy phép CC BY-NC-SA 3.0 của Chinese Grammar Wiki trước khi
   phát hành thương mại (nếu có).

## Kết luận lô
Đủ điều kiện làm **bản thử nghiệm P04** (3 bài published trong app mẫu).
Không đủ điều kiện để tuyên bố hoàn thành HSK1, HSK2 hay dự án.
