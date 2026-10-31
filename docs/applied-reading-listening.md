# Đọc & nghe vận dụng — thiết kế pilot (2026-10-31)

Theo chỉ đạo của Hoa ngày 2026-10-31: sau mỗi bài ngữ pháp có một hoạt
động đọc hiểu và một hoạt động nghe hiểu dùng học liệu THẬT từ nguồn
uy tín (ưu tiên Mandarin Bean, Du Chinese), không tự viết bài rồi ghi
là của nguồn khác. Pilot 3 bài đầu lộ trình:

- Cơ bản: `shi-noun-link` (HSK1 · Bài 01) — 是 xác định A là B.
- Dễ nhầm: `bu-mei-negation` (Bài 16) — 不 (thói quen/hiện tại/tương
  lai/tính chất) vs 没/没有 (việc đã qua, phủ định 有).
- Phức tạp hơn: `le-completion-change` (Bài 21) — Động từ + 了 hoàn
  thành trong khung thời gian; không đồng nhất với thì quá khứ tiếng
  Việt.

## Quyền sử dụng (mặc định thận trọng)
Miễn phí xem ≠ được tái xuất bản. Trừ khi điều khoản của nguồn cho
phép rõ ràng, app KHÔNG sao chép toàn văn/bản dịch/audio của nguồn:
chỉ hiển thị thẻ học liệu (tiêu đề Việt do dự án đặt, tình huống, cấu
trúc đích, nguồn, thời lượng) + nút mở đúng bài tại nguồn. Câu hỏi,
đáp án, giải thích do dự án tự biên soạn từ nội dung đã đọc/nghe kiểm
chứng — đó là nội dung của dự án. Trường `rights` trong dữ liệu ghi
rõ căn cứ đã kiểm tra (ngày, trang điều khoản nếu có).

## Schema: data/applied/<lesson-id>.json (schema_version 1)
Một file cho mỗi bài có học liệu; app tải kèm khi mở bài, thiếu file
thì không hiện mục (không lỗi).

- `lesson_id`, `checked_date`, `qa_status` (internal_review|verified)
- `shared`: true nếu đọc và nghe dùng CÙNG một học liệu.
- `reading` / `listening`: đối tượng hoạt động:
  - `material`: chỉ khai ở `reading`; khi `shared: true`, `listening`
    dùng lại material của `reading` (validator bắt buộc như vậy để
    không lặp thẻ). Gồm { `source_name`, `source_url`, `title_vi`
    (tiêu đề Việt của dự án), `situation_vi` (1 câu),
    `target_structure_vi` (cấu trúc đích + bằng chứng ngắn: số
    lần/vị trí xuất hiện; trích đoạn phục vụ đối chiếu nội bộ nằm ở
    tài liệu nghiên cứu, không đưa toàn văn vào app),
    `length_label_vi` (độ dài văn bản, ví dụ "Khoảng 123 chữ Hán"),
    `duration_label_vi` (thời lượng audio đo được trên trang nguồn
    kèm thời gian học ước tính),
    `access`: "external" (mở tại nguồn) | "embed" | "in_app",
    `rights`: { `status`: "link_only"|"embed_allowed"|"reuse_allowed",
    `basis_vi` }, `audio`: { `kind`:
    "source_page_player"|"none", `voice`: "native_claimed_by_source"|
    "unknown", `verified_playback`: true|false } }
  - `guide_vi`: hướng dẫn 1 câu trước khi đọc/nghe.
  - `questions`: 2–3 câu trắc nghiệm { `prompt_vi`, `options` (3),
    `answer` (chỉ số), `explain_vi` (1–2 câu, liên hệ cấu trúc khi
    hữu ích), `structure_note_vi` (tùy chọn) }. Đáp án đúng phân bố
    vị trí, không dồn một chỗ.
  - `write_prompt_vi` (chỉ ở hoạt động đọc, tùy chọn): gợi ý tự viết
    một câu theo mẫu — không chấm, không lưu đáp án mẫu.

## Tiến độ (không đổi dữ liệu cũ)
`progress.applied[lessonId] = { reading: {answers: {idx: true},
done: bool}, listening: {...} }` — khóa mới trong tiến trình v2,
mặc định {} khi migrate. `done` do người học tự xác nhận sau khi
học tại nguồn (ghi đúng bản chất tự xác nhận ở giao diện: "Đánh dấu
đã đọc xong"). Hoàn thành bài ngữ pháp/FSRS không đổi: người đã
hoàn thành bài vẫn giữ trạng thái; mục mới là bổ sung tùy chọn.

## Giao diện
Mục "Đọc & nghe vận dụng" sau Luyện tập, trước Luyện nói, cùng hệ
thống thiết kế hiện tại (D29): hai tab Đọc/Nghe; mỗi tab: thẻ học
liệu + nút mở nguồn (target _blank, rel noopener) + hướng dẫn 1 câu
+ câu hỏi chấm tại chỗ + nút tự xác nhận hoàn thành hoạt động. Dùng
chung học liệu thì ghi "Đọc và nghe cùng nội dung" và tab Nghe gợi
ý nghe trước khi mở bài đọc; không lặp thẻ. Trả lời được lưu ngay
vào tiến độ nên quay lại từ trang nguồn không mất.
