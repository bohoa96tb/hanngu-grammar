# Chuẩn hóa toàn bộ nội dung và giao diện — khảo sát và chuẩn áp dụng (30/10/2026)

## 0. Trạng thái thật khi bắt đầu
- GitHub `main` HEAD `f6e505b1` (merge PR #6, lô 10); không có PR đang mở.
- Live https://bohoa96tb.github.io/hanngu-grammar/ khớp local: 38 bài published,
  181 bài tập, build `20261029-voicewarn2`; validator ĐẠT; unittest 5 passed;
  `node --check app.js` đạt.
- `docs/reviews/qa-08.md` + checkpoint cập nhật vẫn chỉ ở local (đẩy cùng lô này).
- Đối chiếu đề cương thi HSK 3.0: nguồn `hsk-official` — đề cương thi công bố
  2025-11, hiệu lực 2026-07, 语法大纲 tr.382–400 (xem docs/source-register.json,
  docs/baseline-evidence.md). Trạng thái: khóa phạm vi ở mức nhóm; danh mục
  HSK1–2 và HSK3–4 đã đối chiếu theo mục nhóm của dự án; HSK5–6 CHƯA đối chiếu;
  quyền phân phối CHƯA xác minh (chỉ diễn giải, không sao chép nguyên văn).
  Không trộn chuẩn năng lực 2021 (GF 0025-2021) hay HSK cũ 2.0.

## 1. NGHIÊM TRỌNG (sai kiến thức / chấm sai / mất dữ liệu / hỏng chức năng)
- N1. `bi-comparison/bi-ex4` (error_spot) chấm sai: câu 他比我不高。 có
  `accepted_answers = ["比"]` nhưng lời giải của chính bài nói lỗi ở chỗ đặt 不
  trước tính từ. Đáp án đúng phải là `不`. (Điều phối viên xác minh trực tiếp
  từ dữ liệu; rà soát ngữ pháp độc lập đang đối chiếu thêm các ca tương tự.)
- N2. Choice/error_spot: bấm chọn = chấm ngay (app.js exerciseHTML + grade).
  Không có bước "chọn → Kiểm tra"; bấm nhầm vẫn tính lượt, làm lệch thống kê
  "bài từng làm sai" ở Ôn tập; sau chấm không đánh dấu đáp án trên nút.
- N3. Fill "tự viết" chỉ khớp chuỗi với thường đúng 2 biến thể (cùng câu ± dấu 。):
  biến thể hợp lệ bị chấm sai oan; `payload.hint_vi` (mẫu cần dùng) không hề
  được render nên người học không biết mẫu bắt buộc.
- N4. Order: logic gỡ token dùng `built.includes(tok)` nên không xếp được câu
  cần cùng một khối 2 lần (tiềm ẩn — dữ liệu hiện tại chưa có token trùng);
  token là `<span>` không dùng bàn phím được, không có trạng thái đã dùng.
- N5. Lỗi tải từng shard bị nuốt im lặng: app hiện thiếu bài mà người dùng
  không biết (chi tiết chỉ có ở `?debug=1`). Lỗi manifest hiện thông báo kỹ
  thuật vô nghĩa với người dùng live. Tiến trình hỏng bị lặng lẽ thay bằng
  tiến trình trống rồi ghi đè ở lần lưu sau.
- N6. `alert()` cho lỗi giọng/không có giọng zh: lặp mỗi lần tải trang (cờ chỉ
  ở bộ nhớ), chặn màn hình trên điện thoại, dù đã có kênh `#voiceNote` tốt hơn.

## 2. QUAN TRỌNG (khó hiểu / khó thao tác / không nhất quán)
- Q1. Thiếu mục F "Nhớ nhanh" ở 38/38 bài (không có trường dữ liệu, không render).
  Ôn tập đang đối chiếu bằng `pattern + objective` dài.
- Q2. `formula_notes` là đoạn văn liền ở 38/38 bài, không chia bước; nhiều bài
  lặp lại `pattern`. `when_to_use` không có ví dụ đi kèm (chuẩn A yêu cầu có).
- Q3. Độ khó không phân tầng: 0 bài `hard`; `ba-sentence-1`, `bei-passive-1`
  đạt 4/4 tiêu chí khó nhưng ghi medium. Độ dài nội dung không theo độ khó
  (objective when formula chồng lấp easy/medium). `why-question` nhẹ hơn mọi
  bài easy nhưng ghi medium; `prefix-suffix`, `pronouns` gộp nhiều mục tiêu
  nhưng ghi easy.
- Q4. Bài gộp nhiều mục tiêu: `le-completion-change` (2 cách dùng 了 + bẫy đa
  âm), `bi-comparison-2` (3 tiểu mẫu), `prefix-suffix` (4 mục rời), `pronouns`
  (2 hệ). Xử lý lô này: chia bước rõ + gán hard tạm cho le; tách bài ghi vào
  quyết định cho lô sau (không đổi ID/gỡ tiến độ trong lô chuẩn hóa giao diện).
- Q5. Thứ tự luyện tập chưa đúng thang: fill viết cả câu đứng thứ 2, order
  (vị trí) đứng sau fill, error_spot (nhận biết) đứng thứ 4. Giao diện không
  gắn nhãn giai đoạn. Gợi ý hiện thẳng lời giải; quay lại bài là lộ lời giải cũ.
- Q6. Pinyin và tốc độ đọc không lưu (biến bộ nhớ); bấm Hiện Pinyin vẽ lại
  toàn trang làm mất vị trí cuộn, chữ đang gõ, câu order đang xếp.
- Q7. Danh sách bài: không có "Tiếp tục học", không tiến độ từng phần; tìm
  kiếm phải bấm nút, lọc cấp lấy từ khóa cũ từ URL; trạng thái rỗng không có
  nút xóa lọc. UI còn ghi "HSK (tạm thời)" dù HSK1–2 đã đối chiếu; trang bài
  in độ khó thô tiếng Anh (`easy/medium/hard`) khác trang chủ.
- Q8. Trang bài: các mục đều là thẻ giống hệt nhau (mục tiêu không nổi bật);
  ví dụ là thẻ lồng thẻ; điều khiển Pinyin/tốc độ nằm trong thẻ `<h3>`;
  không ẩn được nghĩa Việt; không có điều hướng bài trước/sau.
- Q9. Nút Nghe không có trạng thái đang phát/dừng/lỗi (không gán
  onstart/onend/onerror); chờ giọng tối đa ~1 giây mà nút không đổi.
- Q10. Ôn tập: nút tự đánh giá bấm được trước khi đối chiếu công thức; sau
  khi chấm trang vẽ lại và cuộn về đầu; không có tiến độ phiên ôn.
- Q11. `styles.css` chỉ có 5 biến màu; màu trạng thái/focus/token hardcode rải
  rác; thiếu token khoảng cách/bán kính/vùng chạm. Nút choice nối bằng khoảng
  trắng, dính nhau ở 360px; `nav a` vùng chạm ~26px.
- Q12. Đúng/sai ở cấp nút/ô nhập mới chỉ phân biệt bằng màu (feedback chữ thì đạt).
- Q13. Lệch schema–dữ liệu: schema ghi mọi bài tập có `is_open_ended` nhưng
  181/181 bài tập không có trường này.

## 3. HOÀN THIỆN
- H1. `.pinyin` #64748b tương phản sát ngưỡng AA; đưa vào token --text-muted.
- H2. `main` mang aria-live=polite khiến trình đọc màn hình đọc lại cả trang;
  chỉ giữ live-region nhỏ. `select`/`textarea`/`.token` thiếu focus-visible.
- H3. Không có prefers-reduced-motion; nhãn nút rate song ngữ quá dài ở 360px;
  trang bài in "Phiên bản nội dung" kỹ thuật ở vị trí chính; nút Thu âm không
  đổi trạng thái trực quan khi đang thu.

## 4. Chuẩn áp dụng từ lô này (chốt trước khi sửa song song)
### 4.1 Schema (tương thích ngược — tiến độ v2 không đổi)
- Thêm trường bài học `quick_memory`: BẮT BUỘC với bài published, 40–110 ký
  tự, là móc nhớ (thao tác / mũi tên chọn lựa / câu hỏi tự kiểm), không chép
  lại objective/when_to_use, không chứa ví dụ mới. Validator kiểm tra.
- `formula_notes` giữ kiểu chuỗi, quy ước chia bước:
  `1) <Nhãn>: <một quy tắc>. 2) <Nhãn>: ...` — nhãn thuộc bộ: Vị trí · Cần có
  sẵn · Phủ định · Câu hỏi · Không dùng · Mở rộng. Không chép lại pattern.
  Giao diện tách bước tại ranh giới `N) ` để render danh sách.
- Thêm `is_open_ended: false` vào mọi bài tập (khớp schema v1 đã ghi).
- Phân loại lại: ba-sentence-1 → hard; bei-passive-1 → hard;
  le-completion-change → hard (tạm, chờ tách); why-question → easy;
  prefix-suffix → medium; pronouns → medium. Bài sửa nội dung/đáp án tăng
  `content_version`.
- Mục A trên giao diện: hiển thị examples[0] ngay dưới when_to_use (không
  chép ví dụ vào dữ liệu). Mục F render sau Luyện tập; Ôn tập hiện
  quick_memory khi đối chiếu.

### 4.2 Design tokens (styles.css, vanilla, 1 file)
- Màu: --bg, --surface, --ink, --text-muted, --accent, --accent-ink,
  --success, --error, --warn, --focus, --line.
- Chữ/không gian: --radius (12px), --radius-sm (8px), --space-1..4,
  --tap (44px), --content-max (760px). Chữ Hán .zh giữ ≥1.45rem.
- Thành phần dùng chung: .btn / .btn-secondary / .btn-row (flex, gap 8px),
  .badge-hsk / .badge-diff (hai badge tách bạch cấp HSK và độ khó),
  .card / .card-hero, .example (hàng phân cách, không lồng thẻ),
  .feedback.ok/.bad kèm ký hiệu ✓/✗ (không chỉ màu), .token là <button>,
  trạng thái .selected/.correct/.wrong/.speaking/.used.
- Ưu tiên điện thoại: min-height 44px cho mọi nút và nav a; không
  position fixed/sticky che nội dung; focus-visible 3px cho mọi phần tử
  tương tác; tôn trọng prefers-reduced-motion.

### 4.3 Ba bài mẫu (kiểm chứng nội bộ, không dừng xin duyệt)
- Dễ: ma-question. Trung bình: modal-hui-neng-keyi. Nhiều cách dùng/dễ nhầm:
  le-completion-change. Nội dung quick_memory + formula_notes chia bước đã
  soạn ở báo cáo biên soạn (docs/reviews/standardization-2026-10-30.md là
  bản tóm tắt; nguyên văn áp dụng trực tiếp vào dữ liệu ở bước làm mẫu).
