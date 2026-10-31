# Schema dữ liệu bài học (v1)

Tệp chạy: các shard theo bài trong `data/lessons/` (ví dụ `shi-noun-link.json`),
mỗi shard là một object có `schema_version: 1` và `lessons: [...]`
(giới hạn một bài mỗi file để file không lớn dần theo lô), liệt kê theo thứ tự trong
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
| `when_to_use` | có | Ý nghĩa trọng tâm, tình huống, điều kiện/hạn chế. Giao diện hiển thị kèm `examples[0]` làm ví dụ nhanh (mục A). |
| `formula_notes` | có | Vị trí thành phần, bắt buộc/tùy chọn. Từ lô chuẩn hóa 30/10/2026: viết dạng bước đánh số trong một chuỗi — `1) <Nhãn>: <một quy tắc>. 2) <Nhãn>: ...`. Bộ nhãn cơ bản: Vị trí · Cần có sẵn · Phủ định · Câu hỏi · Không dùng · Phân biệt · Mở rộng. Ngoài ra được dùng nhãn theo chủ điểm khi bước mô tả một lựa chọn cụ thể (ví dụ: Chọn từ · Mức độ · Trả lời · Lưu ý · Cấu tạo · Mẫu 1/Mẫu 2 · tên từ hoặc mẫu được mô tả như 会, 怎么, Nhượng bộ, Nhân quả). Không chép lại `pattern`. Giao diện tách bước tại ranh giới `N) `. |
| `quick_memory` | có (từ lô chuẩn hóa 30/10/2026) | Mục F “Nhớ nhanh”: 40–110 ký tự, là móc nhớ (thao tác, mũi tên chọn lựa, hoặc câu hỏi tự kiểm); không chép lại `objective`/`when_to_use`, không chứa ví dụ mới. Bài published thiếu trường này là lỗi validator. |
| `hsk_evidence` | có (từ lô std2 30/10/2026) | Trạng thái đối chiếu cấp HSK của chính bài: `{status: "verified" \| "partial", note?: string}`. `verified`: toàn bộ nội dung dạy nằm trong cấp đã ghi theo danh mục đối chiếu của dự án. `partial`: phần chính đúng cấp nhưng có điểm vượt cấp/chưa đủ bằng chứng — bắt buộc có `note` (20–220 ký tự, viết cho người học) nêu rõ điểm đó. App hiển thị thành dòng “Đối chiếu đề cương HSK 3.0” ở khối nguồn cuối bài. Bài published thiếu trường này là lỗi validator. |
| `examples[]` | có, ≥2 (easy) / ≥3 (medium+) | Mỗi ví dụ: `zh`, `vi`, `pinyin` (để kiểm duyệt, UI mặc định ẩn), `tokens` (đơn vị sư phạm do biên tập quyết), `from_vietnamese_intent` (bool — ít nhất 1 ví dụ xuất phát từ ý muốn nói bằng tiếng Việt). |
| `confusions[]` | tùy chọn | Chỉ bẫy có thật. Mỗi mục: `wrong_or_risky`, `verdict` (một trong `sai_ngu_phap`, `doi_nghia`, `khac_van_phong`, `thieu_ngu_canh`, `kem_tu_nhien`, `thay_duoc_co_dieu_kien`), `explanation`. |
| `related_ids[]` | tùy chọn (REL-01, 2026-10-31) | Danh sách id các bài liên quan, tối đa 4 phần tử, không trùng, không chứa id của chính bài. Mọi id phải tồn tại trong tập bài; quan hệ phải đối xứng (nếu A liệt kê B thì B phải liệt kê A); nếu bài nguồn `published` thì bài đích cũng phải `published`. Bài không có trường này vẫn hợp lệ. Giao diện hiển thị thành mục “Bài liên quan” ở cuối bài (sau mục F. Nhớ nhanh), mỗi bài đích một dòng link kèm badge HSK và `title_vi`, giữ thứ tự trong danh sách; id không tồn tại trong danh sách đã lọc `published` thì bị bỏ qua khi hiển thị. |
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

## Curriculum (`data/curriculum.json`) — CUR-02/D28 (2026-10-31)

Thứ tự học chính thức của giáo trình, tách khỏi manifest (thứ tự tải) và
khỏi ID bài (ổn định). Định dạng:

```json
{
  "schema_version": 1,
  "note": "…",
  "levels": { "1": ["<lessonId>", "…"], "2": [], "3": [], "4": [], "5": [], "6": [] },
  "requires": { "<lessonId>": ["<prereqLessonId>", "…"] }
}
```

- `levels[k]` là danh sách id bài của cấp k **theo thứ tự học**. Số hiển
  thị “Bài NN” của một bài = vị trí (1-based, đệm 0 thành 2 chữ số) của
  nó trong danh sách của cấp của nó; thứ tự toàn cục (cho điều hướng
  Bài trước/Bài sau) = nối các danh sách 1→6. Chèn một bài mới có thể
  làm đổi số hiển thị của các bài sau nó trong cùng cấp, nhưng không
  đổi ID, tiến độ, thẻ ôn hay liên kết đã lưu.
- `requires[id]` chỉ ghi bài tiên quyết khi có bằng chứng phụ thuộc
  thật; mọi tiên quyết phải đứng trước bài phụ thuộc trong thứ tự
  toàn cục.
- Validator (`validate_curriculum` trong `scripts/validate.py`) yêu cầu
  file **phải tồn tại** và kiểm tra: `levels` có đủ khóa `"1"`..`"6"`;
  mọi bài `published` xuất hiện đúng một lần và ở đúng cấp theo
  `hsk_level` của bài; không id lạ trong `levels`/`requires`;
  `requires` không tự trỏ, đích phải tồn tại và đứng trước bài phụ
  thuộc. Lỗi mở đầu bằng `curriculum:`.
- Khác với validator, **giao diện có fallback**: nếu app không tải được
  `curriculum.json`, app dùng thứ tự manifest (nhóm theo cấp) và ghi
  trạng thái vào bảng debug — fallback này chỉ áp dụng cho giao diện,
  không áp dụng cho validator.

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
9. `related_ids` (tùy chọn, REL-01 — 2026-10-31): khi có mặt phải là danh sách các chuỗi, không trùng, tối đa 4 phần tử, không chứa id của chính bài, mọi id phải tồn tại, đối xứng hai chiều, và bài `published` chỉ trỏ tới bài `published`.
10. `data/curriculum.json` (CUR-02/D28 — 2026-10-31): file bắt buộc phải tồn tại; xem mục Curriculum ở trên.
