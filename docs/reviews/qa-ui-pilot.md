# QA pilot tái thiết kế UX/UI — build 20261031-ui1 (31/10/2026)

Phạm vi: trang danh mục + HSK1 · Bài 01 (shi-noun-link) + bộ bài tập
của Bài 01, mở rộng 1 bài trung bình (bi-comparison) và 1 bài khó
(ba-sentence-1). Nghiên cứu và bảng đối chiếu: docs/research/
ux-redesign-2026-10-31.md; quyết định: D29.

## Kiểm tra của Manager (local, trước QA độc lập)
- Validator ĐẠT 76 bài / 373 bài tập; unit test validator OK;
  node --test FSRS OK; node --check app.js OK.
- Harness trình duyệt thật (tests/browser-check.mjs): 24/24 PASS —
  không tràn ngang 360/390/768/1280, bàn phím (Space chọn, Enter chấm),
  nút nghe/dừng hợp nhất, giữ tiến độ sau tải lại, prefs giữ, Ôn lại
  FSRS, Bài liên quan, nhóm cấp + số bài curriculum, tìm kiếm pinyin,
  tiên quyết, 0 lỗi console. Hai điểm harness được cập nhật theo thiết
  kế mới: nhãn mục "Hiểu nhanh" (thay "Dùng khi nào") và thao tác dừng
  bằng chính nút nghe (thay nút [data-stop] riêng).
- Ảnh trước/sau cùng viewport 390px (DSF 2, profile mới), lưu ngoài
  repo tại ~/workspace/qa-evidence/ux-redesign/: trang danh mục cao
  67.640px → 24.626px; trang Bài 01 cao 12.350px → 8.660px. Đối chiếu
  trực tiếp: mẫu câu còn 2 vị trí (hero + Công thức) thay vì 3; ví dụ
  xuất hiện 1 lần; một nút nghe tròn 44px cho mỗi ví dụ.
- Phóng to 200% (Emulation.setPageScaleFactor=2 ở 390px): trang chủ
  và trang bài đều scrollWidth = innerWidth — không tràn ngang.
- Tương phản theo tokens: chữ chính #1e293b trên nền sáng (~14:1),
  chữ phụ #475569 (~7,5:1), accent #0f766e với chữ trắng (~5,9:1) —
  đạt WCAG AA cho chữ thường; trạng thái luôn kèm ký hiệu/chữ.

## QA độc lập (agent riêng, thao tác CDP thật, profile mới)
- A1 Không mất nội dung: PASS 3/3 bài (shi-noun-link dễ,
  bi-comparison trung bình, ba-sentence-1 khó) — mọi trường
  objective/when_to_use/pattern/formula_notes/ví dụ/confusions/
  quick_memory/sources đều còn trong trang (kể cả trong <details>).
- A2 data/ không đổi: PASS — validator ĐẠT; đọc thử 2 file bài,
  schema/nội dung nguyên vẹn.
- B1 Trình luyện tập Bài 01: PASS — mỗi thời điểm chỉ 1 câu hiện;
  làm trộn đúng/sai 4 câu; tổng kết "đúng gần nhất 2/4" và danh sách
  câu cần ôn (Câu 2, Câu 4) khớp attempts trong localStorage.
- B2 Rò rỉ gợi ý: PASS — hint_vi của shi-ex2/shi-ex4 không có trong
  DOM trước khi bấm "Gợi ý"; hiện đúng sau khi bấm, có ghi nhận.
- B3 Công thức dài HSK3 (adverbs-mood-hsk3, complex-compact) ở 390px:
  PASS — không tràn ngang, đủ thành phần.
- B4 Lọc trạng thái "Đang học" + thanh tiến độ HSK1: PASS — chỉ còn
  đúng bài đang học dở; tiến độ 0/24 khớp dữ liệu (aria-valuenow đúng).
- B5 Tiến độ sau tải lại: PASS — hanngu-progress-v2 giữ version 2,
  đủ khóa, completedLessons giữ nguyên.

## Chưa kiểm chứng (not_run, ghi rõ)
- Âm thanh TTS nghe thực tế trên thiết bị thật: not_run như cũ
  (AUD-TTS-01) — harness/QA chỉ kiểm trạng thái nút và cảnh báo giọng.
- Android Chrome thật: chưa có thiết bị; kiểm bằng Chromium headless
  ở các bề rộng tương ứng + nghiệm thu live qua trình duyệt nền tảng.
