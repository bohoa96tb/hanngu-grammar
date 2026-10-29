# Schema dữ liệu bài học (v1)

Tệp chạy: các shard theo cấp trong `data/lessons/` (ví dụ `hsk1.json`,
`hsk2.json`), mỗi shard là một object có `schema_version: 1`,
`hsk_level` và `lessons: [...]`, liệt kê theo thứ tự trong
`data/lessons-manifest.json`. Shard là nguồn duy nhất; không còn file
tổng hợp `data/lessons.json`. ID bài học ổn định qua các shard, nên
tiến trình học trong localStorage (lưu theo ID bài) không bị ảnh hưởng
khi tách file.

## Lesson

| Trường | Bắt buộc | Ghi chú |
|---|---|---|
| `id` | có | Ổn định, ví dụ `shi-noun-link`. Không đổi khi sửa câu chữ. |
| `title_vi` | có | Tiêu đề tiếng Việt. |
| `pattern` | có | Công thức, ví dụ `Danh từ 1 + 是 + Danh từ 2`. |
| `hsk_level` | có | 1–6, tạm thời cho bài mẫu (xem D04). |
| `difficulty` | có | `easy` \| `medium` \| `hard` — độ khó sư phạm, độc lập cấp HSK. |
| `objective` | có | Sau bài này người học làm được gì. |
| `when_to_use` | có | Ý nghĩa trọng tâm, tình huống, điều kiện/hạn chế. |
| `formula_notes` | có | Vị trí thành phần, bắt buộc/tùy chọn. |
| `examples[]` | có, ≥2 (easy) / ≥3 (medium+) | Mỗi ví dụ: `zh`, `vi`, `pinyin` (để kiểm duyệt, UI mặc định ẩn), `tokens` (đơn vị sư phạm do biên tập quyết), `from_vietnamese_intent` (bool — ít nhất 1 ví dụ xuất phát từ ý muốn nói bằng tiếng Việt). |
| `confusions[]` | tùy chọn | Chỉ bẫy có thật. Mỗi mục: `wrong_or_risky`, `verdict` (một trong `sai_ngu_phap`, `doi_nghia`, `khac_van_phong`, `thieu_ngu_canh`, `kem_tu_nhien`, `thay_duoc_co_dieu_kien`), `explanation`. |
| `exercises[]` | có, đủ sàn theo độ khó | Xem dưới. |
| `sources[]` | có | Mỗi nguồn: `source_id` (khớp `docs/source-register.json`), `note`. |
| `status` | có | `draft` \| `reviewed` \| `published`. Chỉ `published` mới tính là hoàn thành. |
| `content_version` | có | Tăng khi sửa kiến thức/đáp án. |
| `review` | có khi `reviewed`/`published` | `reviewer` (ghi đúng quy trình, không bịa “người bản ngữ”), `date`, `notes`. |

## Exercise

- `id` duy nhất trong bài; `type`: `choice` | `fill` | `order` | `error_spot`.
- `prompt_vi`: đề bài tiếng Việt.
- `prompt_zh` (tùy chọn): đề bài/câu tiếng Trung, không kèm Pinyin mặc định.
- `payload`: theo loại — `choice`: `options[]`; `order`: `tokens[]` (xáo trộn khi hiển thị);
  `fill`: `hint_vi` (tùy chọn); `error_spot`: `sentence_zh`, `options[]` (vị trí nghi ngờ).
- `accepted_answers[]`: đáp án chấp nhận được, ≥1. Bài `order`: mỗi đáp án là danh
  sách token theo thứ tự; chấp nhận nhiều thứ tự hợp lệ.
- `explanation`: phản hồi cụ thể — sai ở đâu, sửa thế nào (không chỉ “Sai”).
- `is_open_ended`: luôn `false` trong v1. Bài mở (viết/nói tự do) có rubric riêng,
  sẽ thêm ở schema v2, không chấm bằng so sánh chuỗi.

## Quy tắc validator (`scripts/validate.py`)

1. JSON hợp lệ, `schema_version == 1`.
2. ID bài và ID bài tập duy nhất; không có chuỗi placeholder
   (`TODO`, `Lorem`, `XXX`, `...` trong trường bắt buộc).
3. Chỉ chữ Hán giản thể trong trường `zh` (validator cảnh báo ký tự phồn thể phổ biến
   trong danh sách kiểm tra; không khẳng định kiểm tra toàn diện).
4. `tokens` nối lại (bỏ khoảng trắng) phải bằng câu `zh` bỏ dấu câu — áp dụng cho
   ví dụ có tokens và bài `order`.
5. Số ví dụ/bài tập đạt sàn theo `difficulty`.
6. Ít nhất một ví dụ có `from_vietnamese_intent == true`.
7. Bài `published` phải có `review` đầy đủ và `sources` không rỗng.
8. `confusions[].verdict` phải thuộc danh sách cho phép.
