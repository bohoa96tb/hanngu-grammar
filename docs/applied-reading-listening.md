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

## Schema v2 (mở rộng in-app, D31)
Áp dụng từ pilot `shi-noun-link` (2026-10-31). V2 cho phép đưa nội
dung vào TRONG app khi giấy phép cho phép tái sử dụng, thay vì chỉ
dẫn link. **Schema v1 vẫn hiệu lực** cho các bài còn ở chế độ
`link_only` (hiện tại: `bu-mei-negation`, `le-completion-change` —
học liệu Mandarin Bean, `access: "external"`); một file chỉ dùng
một phiên bản, app và validator phân biệt theo trường
`schema_version`.

Trường chung giữ nguyên từ v1: `lesson_id`, `checked_date`,
`qa_status`, `shared`, `shared_note_vi`, và trong mỗi hoạt động:
`guide_vi`, `questions`, `write_prompt_vi` (chỉ ở đọc).

### reading.material — các trường MỚI/BỔ SUNG ở v2
- `material_id`: mã học liệu ổn định (ví dụ `sbc-0089`).
- `title_original`: tiêu đề gốc của truyện.
- `access`: thêm giá trị `"in_app"` (nội dung hiển thị trong app);
  `rights.status` tương ứng là `"reuse_allowed"` và `rights.basis_vi`
  PHẢI nêu căn cứ giấy phép cụ thể (giấy phép ghi ở đâu, bằng chứng
  ở tài liệu nghiên cứu nào).
- `license`: { `text`, `audio`, `evidence` (đường dẫn tài liệu
  nghiên cứu trong repo), `license_url` } — giấy phép văn bản và
  audio ghi TÁCH nhau, không suy từ nhau.
- `attribution`: { `text_by`, `illustration_by`, `translation_by`,
  `narrated_by`, `note_vi` } — ghi công đúng từng lớp đóng góp của
  truyện đó; người đọc audio lấy từ nguồn của audio, không suy từ
  file truyện.
- `audio`: { `kind: "in_app_file"`, `voice` (thêm giá trị
  `"human_verified"` khi có căn cứ nguồn xác minh giọng người thật;
  kèm `voice_basis_vi` nêu căn cứ), `file` (đường dẫn file trong
  repo), `duration_sec` (số giây ĐÃ ĐO từ file thật) }.
- `checks`: { `content`, `audio`, `license` } — trạng thái kiểm tra
  từng mặt (`verified` / `duration_checked` / ...). Không ghi
  `verified` khi chưa thực sự kiểm.
- `content.pages`: mảng đoạn/trang theo đúng thứ tự nguồn. Mỗi
  trang: { `audio_file` (file audio của riêng đoạn đó — dùng file
  cắt theo trang của nguồn, KHÔNG bịa timestamp), `sentences`:
  [{ `zh`, `pinyin`, `vi`, `target` }] }. Văn bản giữ nguyên văn
  nguồn (kể cả lời thoại); `pinyin` và `vi` do dự án biên soạn.
  `target: true` CHỈ cho câu chứa cấu trúc mục tiêu dùng đúng
  nghĩa của bài — dò chữ giống nhau không đủ căn cứ đánh dấu.
- `vocab_support`: như v1 ({ `zh`, `vi` }), chọn từ khó quan trọng
  nhất của truyện.

### reading.extra_external (tùy chọn)
Thẻ "đọc thêm tại nguồn" cho học liệu liên quan nhưng chỉ được dẫn
link: { `source_name`, `source_url`, `title_vi`, `note_vi` }.
Không có câu hỏi riêng cho thẻ này.

### listening.sentence_practice (MỚI ở v2)
Luyện nghe từng câu đúng cấu trúc, tách khỏi truyện chính:
{ `guide_vi`, `voice_label_vi` (nhãn giọng hiển thị cho người học,
ví dụ "Giọng tổng hợp" — bắt buộc khi audio là TTS),
`license_note_vi` (giấy phép của câu + audio + ghi chú bản dịch
Việt của dự án phát hành theo giấy phép nào), `attribution_vi`
(nguồn câu, commit ghim nếu có, tài liệu bằng chứng trong repo),
`items`: [{ `id`, `zh`, `pinyin`, `vi`, `audio_file` }] }.
Mỗi câu phải được ĐỌC và xác nhận cấu trúc bằng mắt trước khi
chọn — nhãn ngữ pháp của nguồn chỉ là gợi ý tìm ứng viên.
`listening.questions` ở v2 hỏi về truyện dùng chung (không phải về
từng câu luyện nghe).

### Quy tắc hiển thị v2
- Tab Đọc: hiện toàn văn theo đoạn kèm audio toàn bài và audio
  từng đoạn; nút bật/tắt Pinyin và dịch Việt; câu `target: true`
  được làm nổi khi bật chế độ tô sáng cấu trúc; ghi công + giấy
  phép hiển thị ngay dưới truyện.
- Tab Nghe: lời ban đầu ẨN; người học nghe audio rồi trả lời
  `listening.questions`, chủ động mở lời khi muốn đối chiếu.
  `sentence_practice` hiện riêng từng câu với nhãn giọng bắt buộc.
- Không tự phát audio; không phát hai audio cùng lúc; học liệu
  `in_app` không hiển thị nút "Mở bài gốc" thay cho trình phát —
  nút nguồn chỉ là thông tin ghi công (trừ `extra_external` là
  thẻ link thuần).
