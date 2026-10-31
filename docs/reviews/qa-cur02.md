# QA độc lập — Lô CUR-02 (lộ trình curriculum + số bài theo cấp + tìm kiếm pinyin G-02)

- Ngày: 2026-10-31
- Phạm vi: chỉ mảng MÃ của CUR-02 (`data/curriculum.json`, thứ tự/số bài
  trong `app.js`, validator `validate_curriculum`, fallback khi thiếu
  curriculum, tìm kiếm `normSearch`). QA tự chạy mọi kiểm tra, không dùng
  kết quả của Agent Code.
- Môi trường: workspace local, Chromium headless qua CDP (cùng cơ chế với
  `tests/browser-check.mjs`), server tĩnh local cổng 8891/8892.

## PHÁN QUYẾT: PASS

Không có lỗi Nghiêm trọng, không có lỗi Quan trọng. 3 ghi chú mức
Hoàn thiện ở cuối (không chặn merge).

## 1. Chạy độc lập toàn bộ cổng kiểm tra

| Kiểm tra | Kết quả thật |
|---|---|
| `node --check app.js` | OK |
| `python3 scripts/validate.py` | ĐẠT: 76 bài, 76 published, 373 bài tập |
| `python3 -m unittest discover -s tests` | 19 tests — OK |
| `node --test tests/test_fsrs.mjs` | 7/7 pass, 0 fail |
| Harness `node tests/browser-check.mjs http://127.0.0.1:8891/` (QA tự bật server) | **PASS 24/24**, gồm cả `home-level-groups`, `lesson-number-nav`, `search-pinyin`, `prereq-display`, `console-errors` (0 lỗi) |

## 2. Đối chiếu số liệu hiển thị bằng tính toán độc lập

QA viết script riêng đọc `data/curriculum.json` + toàn bộ
`data/lessons/*.json` (76 bài): curriculum chứa đúng 76 id, không trùng,
không thiếu, không thừa; mọi bài đều nằm đúng cấp khớp trường
`hsk_level` của chính bài. Kết quả tính độc lập:

- `le-completion-change` = **HSK1 · Bài 21** — khớp harness
  `lesson-number-nav` (expectedNum "21", bài sau là
  `le-sentence-final-change`) và thẻ đầu danh mục "HSK 1 · Bài 01".
- `potential-complement-1` = **HSK3 · Bài 10**; theo thứ tự toàn cục:
  đứng trước là `result-complement-2` (Bài 09), đứng sau là
  `degree-complement-1` (Bài 11).
- `complex-choice` = **HSK4 · Bài 01** (trường `hsk_level` = 4, khớp
  hiệu chỉnh cấp đã ghi nhận trước đây).

Kiểm chứng trên trang đã render thật (không chỉ tin harness):
- Trang `potential-complement-1`: hero "HSK 3 · Bài 10/34", nav
  "← Bài trước: HSK 3 · Bài 09 — result-complement-2", "Bài sau:
  HSK 3 · Bài 11 — degree-complement-1", có mục "Cần học trước". Khớp
  100% với tính toán độc lập.
- Trang `complex-choice`: hero "HSK 4 · Bài 01/1", bài trước nối qua
  ranh giới cấp = `fixed-pattern-shenme` (HSK3 · Bài 34, bài cuối cấp
  3) — thứ tự toàn cục nối cấp hoạt động đúng; không có bài sau (bài
  cuối toàn cục hiện tại).
- Đọc code: `renderLesson` lấy số từ `orderInfo()` (vị trí trong
  `curriculum.json`), prev/next từ `curriculumOrderedLessons()`;
  `renderHome` nhóm theo cấp và sắp thẻ theo `gidx` của curriculum,
  nhãn thẻ qua `lessonLabel()`. Không có đường nào dùng thứ tự manifest
  cho hiển thị khi curriculum tải được.

## 3. Đột biến validator (trên bản sao trong bộ nhớ, không sửa dữ liệu thật)

Gọi trực tiếp `validate_curriculum` từ `scripts/validate.py`:

- Dữ liệu thật: **0 lỗi**.
- (a) Xóa `pronouns-others` khỏi `levels['3']` → báo lỗi:
  "bài published pronouns-others chưa có trong levels". ĐẠT.
- (b) Đổi `requires['potential-complement-1']` thành
  `['complex-compact']` (bài đứng sau) → báo lỗi: "tiên quyết
  complex-compact … phải đứng trước bài potential-complement-1 trong
  thứ tự toàn cục". ĐẠT.
- (c) Thêm id lạ `bai-khong-ton-tai-xyz` vào `levels['2']` → báo lỗi:
  "id lạ trong levels". ĐẠT.

## 4. Fallback khi curriculum.json lỗi/thiếu — kiểm bằng CHẠY THẬT

Ngoài đọc code (`loadLessons` bọc fetch curriculum trong try/catch
riêng: lỗi → `curriculumData = null`, ghi `curriculumStatus`, vẫn tải
manifest + shard bình thường, `computeOrderInfo` có nhánh fallback
nhóm theo cấp theo thứ tự manifest), QA chạy thật:

- Server riêng (cổng 8892) trả **404 chỉ cho `data/curriculum.json`**,
  các file khác bình thường (đã xác minh bằng curl trước khi chạy).
- Kết quả trên trình duyệt thật: danh mục vẫn hiển thị **đủ 76 thẻ, 6
  nhóm cấp**, thẻ đầu "HSK 1 · Bài 01", **không banner lỗi, không
  exception**. Trang bài mở bình thường, nav trước/sau theo thứ tự
  manifest trong cấp.
- Ghi nhận (đúng thiết kế dự phòng, không phải lỗi): ở chế độ fallback
  số bài khác bản chính thức — ví dụ `le-completion-change` hiện
  "Bài 02/24" (thứ tự manifest) thay vì "Bài 21".

## 5. Tìm kiếm — truy vấn bổ sung ngoài harness

Chạy thật trên trình duyệt (server thường), ngoài 2 truy vấn của
harness ("gao", "so sanh"):

- `"bǐ"` (có thanh điệu): **tìm được `bi-comparison`** (vị trí 18/49
  kết quả; truy vấn `"bi"` cho kết quả giống hệt — chuẩn hóa bỏ dấu
  thanh hoạt động hai chiều).
- `"钱"` (chữ Hán): **có `numbers-and-money`** trong 8 kết quả.
- `"thời gian"` (tiếng Việt có dấu): **`time-expressions` là kết quả
  đầu tiên** trong 16 kết quả.

Đọc code `normSearch`/`stripTones`: truy vấn và chỉ mục đều qua cùng
một chuẩn hóa (lowercase + bỏ dấu thanh pinyin); các ký tự tiếng Việt
không nằm trong bảng dấu thanh đi qua nguyên vẹn ở cả hai phía nên
khớp nhau nhất quán.

## 6. Hồi quy

- Trong lần chạy harness của chính QA: `progress-persists-reload`
  PASS, `review-rate-locked-before-reveal` PASS, cùng
  `review-reveal-shows-quick-memory`, `review-rating-recorded`,
  `prefs-persist-reload` đều PASS — tiến độ và khóa chấm ôn tập không
  bị ảnh hưởng.
- Đọc `renderHome`/`renderLesson` và D28: lô này không đổi logic FSRS
  (đếm thẻ đến hạn vẫn gọi `SRS.dueCards` như cũ) và không đổi tiêu
  chí chọn bài của `continueLesson` — đúng kỳ vọng "không đổi hành vi"
  của lô. (Việc `continueLesson` vẫn duyệt theo thứ tự manifest được
  ghi ở H-1 dưới đây.)

## 7. Khớp phiên bản

- `app.js`: `BUILD_VERSION = "20261031-cur1"` (dòng 994).
- `index.html`: `styles.css?v=20261031-cur1` và `app.js?v=20261031-cur1`.
- **Khớp nhau.**

## Ghi chú Hoàn thiện (không chặn)

- **H-1 — "Tiếp tục học" chưa theo thứ tự lộ trình.**
  `continueLesson()` (app.js) vẫn duyệt mảng `lessons` theo thứ tự
  manifest để chọn bài đang học dở/bài chưa hoàn thành đầu tiên, trong
  khi chú thích hàm ghi "theo thứ tự danh mục". Không phải hồi quy
  (D28 không yêu cầu đổi, hành vi cũ giữ nguyên), nhưng sau CUR-02
  người học có thể được gợi ý bài không phải bài kế tiếp theo lộ
  trình. Đề xuất: lô sau đổi nguồn duyệt sang
  `curriculumOrderedLessons()` và sửa chú thích.
- **H-2 — Độ nhiễu của tìm kiếm pinyin ngắn và từ 比较.**
  Truy vấn "bǐ"/"bi" cho 49/76 kết quả vì chuỗi con "bi" xuất hiện
  khắp nơi (tiếng Việt "biết/bị…", âm tiết pinyin) — tìm được bài
  đích nhưng danh sách dài. Ngoài ra tìm "比较" hoặc "bǐjiào" KHÔNG
  ra `bi-comparison`/`bi-comparison-2`: QA kiểm tra dữ liệu, hai bài
  này không chứa chữ 比较 ở bất kỳ trường nào được lập chỉ mục
  (title/pattern/objective/when_to_use/quick_memory/ví dụ) — đây là
  khoảng trống dữ liệu/chỉ mục, không phải lỗi code tìm kiếm. Đề
  xuất: khi biên soạn/bổ sung nội dung, cân nhắc nhắc từ 比较 trong
  objective/when_to_use của hai bài 比.
- **H-3 — Số bài ở chế độ fallback khác số chính thức** (đã nêu ở
  mục 4): đúng thiết kế dự phòng đã tài liệu hóa trong code; chỉ ghi
  nhận để đội hỗ trợ không nhầm khi người dùng báo "số bài lạ" lúc
  mạng lỗi file lộ trình.
