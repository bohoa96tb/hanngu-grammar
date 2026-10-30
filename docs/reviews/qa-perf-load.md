# QA độc lập: tối ưu tải dữ liệu (song song có giới hạn + timeout bao phủ body) — 2026-10-30

Đối tượng: thay đổi kỹ thuật trong `app.js` theo báo cáo
`docs/reviews/loading-perf-optimization.md` (bối cảnh:
`docs/reviews/loading-stall-investigation.md`). QA **không dùng lại
số đo của agent Code**: toàn bộ số ở mục 2 là số QA tự chạy bằng
harness CDP riêng, máy chủ riêng, hồ sơ trình duyệt sạch (browser
context mới) cho từng kịch bản. QA không sửa `app.js`.

## Kết luận: ĐẠT

Không phát hiện lỗi ở bất kỳ mức độ nào (không Nghiêm trọng, không
Quan trọng, không Hoàn thiện chặn phát hành). Mọi yêu cầu của chỉ
đạo đều được xác nhận bằng cả rà mã lẫn đo thật, trong đó điểm mấu
chốt — timeout bao phủ phần đọc body — đã được tái hiện và xác
nhận hết treo.

## 1. Rà mã (`app.js`: `fetchData`, `loadLessons`, `LOAD_CONCURRENCY = 8`)

- **Thứ tự theo chỉ số manifest:** mỗi worker ghi kết quả vào
  `perShard[i]` đúng vị trí của shard trong manifest; việc ghép
  `sources`/danh sách bài chỉ diễn ra sau `Promise.all`, duyệt
  `perShard` theo thứ tự chỉ số. Thứ tự hiển thị không phụ thuộc
  file nào tải xong trước. (Đo thật ở mục 2 còn xác nhận toàn bộ
  72 ID khớp đúng thứ tự manifest, không chỉ thẻ đầu/cuối.)
- **Timeout bao phủ cả body:** `fetchData()` đặt `setTimeout` →
  `ctrl.abort()` và chỉ `clearTimeout` trong `finally`, tức **sau
  khi** `await r.json()` hoàn tất hoặc văng lỗi. Headers về sớm
  không làm bộ đếm giờ bị hủy; quá 15 giây khi đang đọc body,
  `abort()` hủy thật request và lần đọc dở văng `AbortError` vào
  đúng đường lỗi của shard. Không còn khe hở kiểu bản sửa HSK3-8.
- **Không có đường nuốt lỗi:** shard lỗi → `lessons: null` → cộng
  vào `failedShards` → `loadErrorInfo = { missing }` → banner
  “⚠ Tải thiếu … phần dữ liệu bài học” + nút “Thử tải lại” được
  chèn ở mọi lần `render()`. Manifest lỗi → ngoại lệ văng ra →
  trang lỗi tải toàn phần có nút “Tải lại trang”. Không tồn tại
  nhánh nào bỏ bài lỗi rồi báo tải đầy đủ.
- **`retryLoad()`** gọi lại chính `loadLessons()` nên đi qua cùng
  cơ chế song song + timeout; thành công thì `render()` lại (banner
  vẫn hiện nếu vẫn thiếu), lỗi manifest thì ra trang lỗi tải.
- **Phạm vi thay đổi:** diff `app.js` ở workspace với `app.js` trên
  `main` (bản trước tối ưu) chỉ gồm các hunk ở vùng dòng ~930–987 —
  đúng vùng `fetchData`/`loadLessons`. Không dòng nào chạm
  `localStorage`, tiến độ học, ID bài hay dữ liệu bài;
  `BUILD_VERSION` không đổi. Khớp tuyên bố của báo cáo Code.

## 2. Số đo của QA (harness CDP local, hồ sơ sạch từng kịch bản)

Thiết lập: máy chủ tĩnh Node của QA phục vụ bản thật (cổng 8901);
kịch bản (c) chạy trên **bản sao tạm** ở `/tmp` (xóa
`data/lessons/modal-hui-neng-keyi.json`, 1 bài); kịch bản treo dùng
máy chủ hỏng có chủ đích của QA nhắm vào shard
`data/lessons/bi-comparison-2.json` (1 bài) — (d1) nhận request và
không bao giờ trả lời; (d2) trả headers 200 + đúng 120 byte body
rồi không bao giờ kết thúc (đã kiểm chứng trước bằng curl: file
thường trả 200 ngay, file đích treo đúng chế độ). Mốc đo: từ lúc
điều hướng tới khi danh sách bài dùng được (thẻ bài render; ở
kịch bản lỗi là khi banner tải thiếu xuất hiện cùng danh sách).
Điều kiện mạng chậm: CDP `Network.emulateNetworkConditions`,
latency 400 ms, xuống/lên 51.200 byte/s (~50 KB/s). Số bài hiện
tại: 72.

| Kịch bản | Thời gian (QA đo) | Bài hiển thị | Banner / thử lại | Lỗi JS | Log mạng |
|---|---|---|---|---|---|
| (a) Tải mới | **669 ms** | 72/72 | — | 0 | 0 |
| (b) Mạng chậm 400 ms, ~50 KB/s | **19.314 ms** | 72/72 | — | 0 | 0 |
| (c) Một shard 404 | **371 ms** | 71/72 | Banner “Tải thiếu 1 phần…” + nút “Thử tải lại” | 0 | 1 (chính file 404) |
| (c) + bấm “Thử tải lại” khi file vẫn 404 | **293 ms** từ lúc bấm tới khi tải lại xong | 71/72 | Banner hiện lại, vẫn ghi thiếu 1 phần, nút vẫn còn | 0 lỗi mới | +1 (lần 404 lặp lại) |
| (d1) Treo trước headers (1 shard) | **15.322 ms** → banner | 71/72 | Banner + nút thử lại | 0 | 0 |
| (d2) Treo giữa body (1 shard) | **15.313 ms** → banner | 71/72 | Banner + nút thử lại | 0 | 0 |

Nhận xét:

- (a)/(b): thứ tự thẻ bài trong DOM **khớp toàn bộ** danh sách ID
  published theo thứ tự manifest (72/72 ID, so sánh cả mảng) —
  thẻ đầu `shi-noun-link`, thẻ cuối `complex-choice`, ở cả hai
  điều kiện mạng. Song song hóa không làm đảo thứ tự.
- (c): banner ghi **đúng số thiếu** (1 phần), số bài hiển thị 71.
  Bấm thử lại trong lúc file vẫn hỏng: lần tải lại kết thúc có
  thông báo (banner hiện lại, trạng thái aria-live báo “Đã tải
  lại…”), **không** biến thành báo thành công đầy đủ và không
  treo. Log mạng duy nhất là chính tài nguyên 404 — không có lỗi
  JS/exception.
- (d2) là điểm quyết định: trên mã trước tối ưu, kịch bản này
  **không bao giờ kết thúc** (headers về, `.json()` treo — theo
  báo cáo Code là vẫn đứng sau 45 giây quan sát). Bản hiện tại
  kết thúc ở ~15,3 giây (timeout 15 giây của chính shard đó +
  phần tải còn lại rất nhanh ở local) bằng banner + nút thử lại
  + 71 bài còn lại. Timeout đã bao phủ cả nhận phản hồi lẫn đọc
  nội dung, và request quá hạn bị hủy thật (lần đọc văng lỗi,
  không treo ngầm).
- Các số đo của QA độc lập và cùng bậc độ lớn với số của agent
  Code (a: 669 so với 683–754 ms; b: 19.314 so với 19.444 ms;
  d1: 15.322 so với 15.302 ms; d2: 15.313 so với 15.219 ms) —
  hai bộ số đo riêng biệt cho kết quả nhất quán. QA không so số
  local với số live để kết luận mức cải thiện.

## 3. Hồi quy (QA tự chạy)

- `tests/browser-check.mjs`: **19/19 PASS**, 0 lỗi console.
- `python3 scripts/validate.py`: ĐẠT — 72 bài, 72 published,
  353 bài tập.
- `python3 -m unittest discover -s tests`: 9 test, OK.
- `node --test tests/test_fsrs.mjs`: 7 pass / 0 fail.
- `node --check app.js`: đạt.

## 4. Ghi chú môi trường (không phải lỗi của thay đổi)

- Trên VM còn sót một máy chủ treo của vòng điều tra trước
  (`/tmp/stall-server.mjs`, cổng 8904, treo theo `lessons-manifest`)
  — chính là loại nhiễu mà báo cáo Code cũng đã gặp. QA tránh
  cổng đó (dùng 8914 cho d2) và kiểm chứng hành vi máy chủ của
  mình bằng curl trước khi đo; máy chủ sót không thuộc phạm vi
  QA nên không tự tắt.
- Một cặp tiến trình `tests/browser-check.mjs` + chrome-headless
  bị treo từ phiên làm việc trước đang giữ cổng CDP 9333 (đã chạy
  ~30 phút, phiên cha đã kết thúc). QA buộc phải tắt cặp tiến
  trình treo này để harness hồi quy chạy được; sau khi tắt, cổng
  trống và harness đạt 19/19. Các máy chủ tạm của QA
  (8901/8902/8903/8914) đã tắt sau khi đo xong.

## 5. Phân biệt với hiện tượng live chưa rõ nguyên nhân

QA xác nhận hai việc đã đo được ở local: tải song song có giới
hạn rút ngắn rõ rệt thời gian chờ trên mạng chậm trong cùng điều
kiện đo, và timeout nay bao phủ cả phần đọc body nên không còn
đường tải vô hạn ở hai biến thể treo đã tái hiện. QA **không**
tuyên bố điều này giải thích hiện tượng live ngày 30/10 ở build
`20261030-hsk3g7`: hiện tượng đó vẫn chưa xác định nguyên nhân và
giữ trạng thái theo dõi trong `ISSUE-LOAD-STALL-01`.
