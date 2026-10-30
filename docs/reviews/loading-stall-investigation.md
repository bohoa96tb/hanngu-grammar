# Điều tra hiện tượng kẹt màn hình tải (2026-10-30)

## 1. Hiện tượng gốc

Nghiệm thu live lô HSK3-7 (build `20261030-hsk3g7`) ngày 2026-10-30:
lần tải đầu tiên đứng ở “Đang tải bài học…” khoảng 15 giây, không hiện
nội dung; tải lại trang thì đạt (64/64 bài). Hoa chỉ đạo: ghi thành
issue có bước tái hiện; kiểm tra tải mới, mạng chậm và trường hợp một
file dữ liệu tải thất bại; app phải có thông báo + cách thử lại, không
được tải vô hạn; nếu không tái hiện được thì giữ trạng thái theo dõi,
không tự kết luận nguyên nhân.

## 2. Đọc mã đường tải (app.js, trước khi sửa)

- `index.html` đặt sẵn `<p>Đang tải bài học…</p>` trong `#app`; nội
  dung này chỉ được thay khi `loadLessons()` **kết thúc** (thành công
  → `render()`; ném lỗi → `renderLoadFailure()` có nút “Tải lại trang”).
- `loadLessons()` tải `data/lessons-manifest.json`, rồi tải **tuần tự**
  64 file bài theo danh sách `shards` trong manifest.
- Lỗi HTTP (404/500), lỗi mạng (từ chối kết nối) và lỗi phân tích JSON
  đều làm `fetch()` **kết thúc** (reject): lỗi ở manifest → trang lỗi
  tải toàn phần; lỗi ở một shard → shard đó bị bỏ qua, app hiện banner
  “⚠ Tải thiếu … phần dữ liệu bài học” kèm nút “Thử tải lại”
  (`injectLoadBanner()` / `retryLoad()`). Các đường này đã đúng.
- **Khe hở:** cả hai lần gọi `fetch()` đều không có timeout và không
  có `AbortController`. Nếu máy chủ nhận kết nối nhưng **không bao
  giờ trả lời xong**, promise của `fetch()` không resolve cũng không
  reject → `loadLessons()` không bao giờ kết thúc → dòng “Đang tải
  bài học…” đứng vĩnh viễn, không thông báo, không cách thử lại.
- Tải tuần tự 64 shard khiến độ trễ mạng bị cộng dồn: mỗi shard chậm
  bao nhiêu thì tổng thời gian tải chậm thêm bấy nhiêu.

## 3. Tái hiện bằng harness CDP local

Phương pháp: chrome-headless-shell qua CDP (mẫu theo
`tests/browser-check.mjs`), hồ sơ trình duyệt mới mỗi kịch bản, ghi
mốc thời gian khi danh sách bài / banner / trang lỗi xuất hiện.
Máy chủ tĩnh local; riêng kịch bản treo dùng một máy chủ Node nhận
request nhưng không bao giờ trả lời URL được chỉ định. Các con số
dưới đây là số đo thật của các lần chạy ngày 2026-10-30.

### (a) Tải mới bình thường — hồ sơ sạch, mạng local

- Kết quả: danh sách bài hiện sau **1.745 ms** (66 liên kết bài),
  0 lỗi console.
- Kết luận: **không có lỗi**. Tải mới ở điều kiện bình thường nhanh.

### (b) Mạng chậm — CDP Network.emulateNetworkConditions

Điều kiện: latency 400 ms, tải xuống ~50 KB/s.

- Kết quả: danh sách bài hiện sau **41.479 ms**, đủ bài, 0 lỗi
  console; trong suốt ~41 giây đó màn hình chỉ có dòng “Đang tải bài
  học…”, không có chỉ báo tiến độ.
- Kết luận: **không phải lỗi treo vô hạn** — tải vẫn hoàn thành.
  Nhưng thời gian chờ dài là hệ quả trực tiếp của việc tải tuần tự
  65 request (manifest + 64 shard): ở 400 ms latency, riêng độ trễ
  vòng lặp đã ≈ 26 giây. Kịch bản này cho thấy hiện tượng live ngày
  30/10 (đứng ~15 giây rồi tải lại thì được) **phù hợp với** hành vi
  mạng chậm + tải tuần tự, nhưng đó mới là tính phù hợp, không phải
  bằng chứng nguyên nhân của lần live đó (xem mục 5).

### (c1) Một file bài bị thất bại (404)

Bản sao dự án trong thư mục tạm, xóa `data/lessons/shi-noun-link.json`
(file thật không đổi), tải trang:

- Kết quả: sau **839 ms** trang chủ hiện với phần bài còn lại, kèm
  banner “⚠ Tải thiếu 1 phần dữ liệu bài học — một số bài có thể
  chưa hiển thị.” và nút “Thử tải lại”.
- Kết luận: **đường lỗi này đã được xử lý đúng từ trước**, không cần
  sửa.

### (c2) Kết nối treo — máy chủ không bao giờ trả lời

Hai biến thể, quan sát 40 giây mỗi biến thể, **trước khi sửa**:

- Treo shard đầu tiên (`shi-noun-link.json`): sau 40 giây trang vẫn
  nguyên “Đang tải bài học…”, không banner, không trang lỗi, không
  nút thử lại.
- Treo manifest (`lessons-manifest.json`): kết quả giống hệt — sau
  40 giây vẫn “Đang tải bài học…”, không thông báo, không thử lại.

- Kết luận: **LỖI XÁC NHẬN ĐƯỢC.** Một request dữ liệu bị treo khiến
  app tải vô hạn đúng như lo ngại trong chỉ đạo. Nguyên nhân ở tầng
  mã đã rõ: `fetch()` không timeout (mục 2).

## 4. Sửa tối thiểu và kiểm chứng lại

Sửa duy nhất ở `app.js` (không đổi `BUILD_VERSION`, không đổi dữ
liệu): thêm `fetchData(url)` dùng `AbortController` với hạn chót
`FETCH_TIMEOUT_MS = 15000` cho mỗi request, dùng cho cả manifest và
từng shard trong `loadLessons()`. Khi quá hạn, `AbortError` đi vào
đúng các đường lỗi sẵn có; `retryLoad()` dùng lại `loadLessons()` nên
cũng được bảo vệ. Không thay đổi hành vi của các đường lỗi khác.

Kiểm chứng sau sửa (cùng bộ máy chủ treo):

- Treo shard: banner “Tải thiếu 1 phần…” + nút “Thử tải lại” hiện ở
  **16.566 ms** (15 giây timeout + phần shard còn lại tải nhanh);
  trang chủ hiện đầy đủ phần bài còn lại.
- Treo manifest: trang “Không tải được bài học” + nút “Tải lại
  trang” hiện ở **15.213 ms**; bấm nút ở 17.236 ms → trang tải lại
  và hiện lại trang lỗi ở **32.392 ms** (≈ 15 giây sau lần bấm) —
  tức lần thử lại cũng kết thúc có thông báo, không treo.
- Hồi quy: kịch bản (a) hiện danh sách sau 886 ms; kịch bản (c1)
  vẫn hiện banner tải thiếu + nút thử lại (585 ms);
  `tests/browser-check.mjs` bản gốc **19/19 PASS**, 0 lỗi console;
  `python3 scripts/validate.py` ĐẠT; `node --check app.js` đạt.

## 5. Kết luận về hiện tượng live ngày 30/10

- Hiện tượng live cụ thể đó **không tái hiện nguyên trạng ở local**
  (tải mới local chỉ 0,9–1,7 giây), nên **không kết luận nguyên
  nhân của lần live đó**. Nó tương thích với hai khả năng đã đo
  được: mạng chậm bị khuếch đại bởi tải tuần tự (kịch bản b), hoặc
  một kết nối tới GitHub Pages bị treo/chập chờn — khả năng thứ hai
  nay đã bị chặn bởi timeout 15 giây: mọi đường tải đều kết thúc
  bằng nội dung, banner tải thiếu, hoặc trang lỗi có nút thử lại.
- Giữ trạng thái **theo dõi (monitoring)** đối với hiện tượng live:
  nếu còn gặp “Đang tải bài học…” quá ~20 giây trên bản phát hành
  có timeout này, ghi lại thời điểm + trang + điều kiện mạng để điều
  tra tiếp; khi đó xem xét thêm việc tải shard song song theo lô
  nhỏ để rút ngắn thời gian chờ trên mạng chậm (chưa làm ở vòng
  này vì chưa có bằng chứng cần thiết và nằm ngoài sửa tối thiểu).

## 6. Đề xuất issue cho task-board (Manager dán vào)

- **id:** `ISSUE-LOAD-STALL-01`
- **title:** Kẹt màn hình tải “Đang tải bài học…”: fetch dữ liệu
  không timeout khiến kết nối treo thành tải vô hạn; hiện tượng
  live 30/10 giữ trạng thái theo dõi
- **mức độ:** Quan trọng
- **trạng thái đề xuất:** open — lỗi treo kết nối đã tái hiện và
  sửa ở bản local (timeout 15 giây cho mọi fetch dữ liệu trong
  `loadLessons()`), chờ Manager phát hành + nghiệm thu live; riêng
  hiện tượng live ngày 30/10/2026 ở build `20261030-hsk3g7` là
  monitoring vì không tái hiện nguyên trạng được ở local.
- **bằng chứng:** `docs/reviews/loading-stall-investigation.md`
  (kịch bản a/b/c1/c2 có số đo; harness gốc 19/19 sau sửa).
- **bước tái hiện lỗi gốc (trước sửa):** phục vụ app bằng máy chủ
  nhận request nhưng không trả lời `data/lessons-manifest.json`
  hoặc một file trong `data/lessons/` → trang đứng ở “Đang tải bài
  học…” quá 40 giây, không thông báo, không nút thử lại.
