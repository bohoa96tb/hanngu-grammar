# Báo cáo rà soát lô 05 — P06 lô 2: 6 bài HSK1–2 (29/10/2026)

## Nội dung mới (đều published, đã qua validator và rà soát nội dung riêng)
- 在: ở đâu và đang làm gì (HSK1, medium) — vị trí + thể tiến hành.
- 着: trạng thái tiếp diễn (HSK2, medium) — trạng thái kéo dài, tồn hiện
  dạng 2; cố ý CHƯA dạy 着 chỉ hành động kèm theo (thuộc HSK3).
- 是……的: nhấn mạnh (HSK2, medium) — chỉ việc đã xảy ra và đã biết.
- Bổ ngữ kết quả (HSK2, medium) — 完/好/懂/错, phủ định bằng 没.
- Bổ ngữ phương hướng (HSK2, medium) — 来 về phía người nói, 去 rời xa.
- Câu phức 虽然……但是 / 因为……所以 (HSK2, medium) — không ghép nhầm cặp.
Tổng: 18 bài, 83 bài tập.

## Sửa trong quá trình rà soát
- Bài 是……的: mục nhầm lẫn về phủ định ban đầu ghi nhầm câu đúng
  我不是昨天来的 thành câu sai. Đã sửa thành câu sai thật
  我不昨天来的 với giải thích phủ định đúng là 不是……的.
- Đã sửa chân trang (số bài cũ 3) và trang Giới thiệu (baseline cũ) phát
  hiện qua vòng trình duyệt qa-02, vì hai đoạn văn bản đó không tự cập
  nhật theo dữ liệu.

## Kiểm tra đã chạy
- `python3 scripts/validate.py` → ĐẠT 18 bài, 18 published, 83 bài tập.
- `node --check app.js` → đạt (sau khi sửa văn bản Giới thiệu).
- Không chạy lại unittest/FSRS vì không có thay đổi liên quan (theo yêu
  cầu không chạy kiểm thử không liên quan).

## Ánh xạ baseline sau lô 2
- CUR-L1-11 (thể tiến hành) nay có bài 在; CUR-L2-10 (thể kinh nghiệm và
  tiếp diễn) nay có cả 过 và 着; CUR-L2-06 (bổ ngữ) nay có bổ ngữ kết quả
  và phương hướng; CUR-L2-08 (是……的) nay có bài; CUR-L2-09 (câu phức)
  nay có 虽然/因为.
- P06 vẫn chưa hoàn thành: các nhóm HSK1–2 còn lại (tiền tố/hậu tố, đại
  từ đầy đủ, phó từ đầy đủ, cụm từ, thành phần câu đầy đủ, câu phức còn
  lại) vẫn ở trạng thái partial/not_started ở mức nhóm.
