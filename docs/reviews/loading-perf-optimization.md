# Tối ưu tốc độ tải dữ liệu: song song có giới hạn + timeout bao phủ cả body (2026-10-30)

PR kỹ thuật riêng cho hướng xử lý tiếp của `ISSUE-LOAD-STALL-01`
(xem `docs/reviews/loading-stall-investigation.md`). Chỉ sửa `app.js`;
không đổi dữ liệu, không đổi `BUILD_VERSION`, không đụng tiến độ học
hay ID bài.

## 1. Phương pháp đo (trước/sau trong cùng điều kiện)

- Harness CDP với chrome-headless-shell (cùng khung với
  `tests/browser-check.mjs`), **hồ sơ trình duyệt mới cho mỗi lần
  chạy**, máy chủ tĩnh local. Mốc “danh sách dùng được” = trang chủ
  đã render (chỉ xảy ra sau khi `loadLessons()` kết thúc), kèm số thẻ
  bài hiển thị và lỗi console (phân biệt lỗi JS/exception với log
  mạng của chính tài nguyên lỗi).
- Bốn kịch bản như vòng điều tra: (a) tải mới bình thường;
  (b) mạng chậm qua CDP `Network.emulateNetworkConditions`
  (latency 400 ms, ~50 KB/s); (c) một file bài 404 — chạy trên bản
  sao tạm của dự án, file thật không đổi; (d) kết nối treo bằng máy
  chủ Node riêng, tách hai biến thể: **(d1) treo trước khi trả
  headers** và **(d2) trả headers + một mẩu body rồi treo giữa
  chừng khi đọc body**.
- **Số bài tại thời điểm đo là 72** (không phải 68): trong lúc nhiệm
  vụ này chạy, lô nội dung HSK3-9 chạy song song đã thêm 4 bài vào
  workspace chung (manifest đổi từ 68 → 72 shard). Toàn bộ số đo
  trước/sau dưới đây đều được **đo lại trên cùng trạng thái 72 bài**
  và cùng mã nền, nên phép so sánh trước/sau vẫn hợp lệ. Không so
  số local với số live để kết luận mức cải thiện.
- Lưu ý quy trình: hai lần chạy thử đầu tiên của kịch bản (d) bị
  nhiễu vì cổng dự định dùng còn sót máy chủ treo của vòng điều tra
  trước (cấu hình treo khác). Các lần chạy đó bị loại bỏ; mọi số
  trong báo cáo này đều từ thiết lập đã kiểm chứng trực tiếp bằng
  curl trước khi đo (file thường trả nhanh, file chỉ định treo đúng
  chế độ).

## 2. Chọn mức đồng thời bằng đo thử (kịch bản b, mạng chậm)

Mã trước đây tải tuần tự (đồng thời = 1). Quét các mức 4 / 8 / 16,
mỗi mức chạy lặp để thấy nhiễu:

| Mức đồng thời | Lần 1 | Lần 2 |
|---|---|---|
| 1 (tuần tự, mã trước) | 46.423 ms | — |
| 4 | 20.150 ms | 20.172 ms |
| 8 | 19.509 ms | 19.569 ms |
| 16 | 19.479 ms | — |

- Từ mức 8 trở đi kết quả **đứng yên trong nhiễu đo** (16 chỉ hơn 8
  khoảng 0,03–0,09 giây, nhỏ hơn độ dao động giữa hai lần chạy của
  cùng một mức). Nguyên nhân: ở điều kiện bóp băng thông 50 KB/s,
  tổng dung lượng dữ liệu bài là ~634 KB (72 shard + manifest), tức
  riêng truyền tải thuần túy đã cần ~12,7 giây — cổ chai chuyển từ
  độ trễ vòng lặp sang tổng băng thông, thêm kết nối song song
  không giúp nữa.
- **Chốt `LOAD_CONCURRENCY = 8`**: nhanh hơn mức 4 một cách ổn định
  (~0,6 giây ở cả hai lần chạy), bằng mức 16 trong sai số, và giữ số
  kết nối đồng thời ở mức vừa phải cho máy chủ tĩnh lẫn trình duyệt.

## 3. Thay đổi mã (`app.js`)

1. **Song song có giới hạn**: `loadLessons()` dùng nhóm worker dùng
   chung một bộ đếm chỉ số; tối đa `LOAD_CONCURRENCY` request shard
   cùng lúc. Kết quả từng shard được ghi vào mảng theo **chỉ số
   manifest** và chỉ ghép (`sources`, danh sách bài) sau khi tất cả
   hoàn tất — thứ tự hiển thị luôn đúng thứ tự manifest, không phụ
   thuộc file nào về trước. Shard lỗi vẫn bị đếm vào `failedShards`
   và hiện banner “Tải thiếu … phần dữ liệu bài học” + nút “Thử tải
   lại” như cũ; manifest lỗi vẫn ra trang lỗi tải. Không có đường
   nào bỏ bài lỗi rồi báo thành công đầy đủ.
2. **Timeout bao phủ cả body**: bản sửa ở lô HSK3-8 đặt
   `AbortController` nhưng hủy bộ đếm giờ ngay khi `fetch()` resolve
   — tức mới có headers. Kịch bản (d2) chứng minh khe hở đó là thật
   trên mã trước: headers về, body treo → `.json()` treo vĩnh viễn.
   Nay `fetchData()` chỉ hủy bộ đếm giờ **sau khi đọc xong body**
   (`await r.json()` nằm trong cùng khối timeout) và trả về
   `{ status, data }`; khi quá 15 giây, `abort()` hủy thật
   request/body đang đọc dở và lỗi đi vào đúng các đường lỗi sẵn có.

## 4. Kết quả trước/sau (cùng điều kiện, 72 bài)

| Kịch bản | Trước | Sau | Bài hiển thị | Lỗi console |
|---|---|---|---|---|
| (a) Tải mới | 932 ms | 754 ms (một lần chạy khác: 683 ms) | 72/72 cả hai | 0 / 0 |
| (b) Mạng chậm 400 ms, ~50 KB/s | 46.423 ms | 19.444 ms (các lần quét mức 8: 19.509 / 19.569 ms) | 72/72 cả hai | 0 / 0 |
| (c) Một file bài 404 | 775 ms — banner + nút thử lại | 572 ms — banner + nút thử lại | 71/72 cả hai, banner ghi thiếu 1 phần | 1 log mạng (chính file 404) cả hai; lỗi JS: 0 |
| (d1) Treo trước headers | 15.670 ms — banner | 15.302 ms — banner | 71/72 cả hai | 0 / 0 |
| (d2) Treo giữa body | **không kết thúc** — vẫn “Đang tải bài học…” sau 45.156 ms quan sát | 15.219 ms — banner + nút thử lại | trước: 0; sau: 71/72 | 0 / 0 |

- (b) nhanh hơn ~2,4 lần (−58%) trong cùng điều kiện đo.
- Thứ tự bài sau khi song song hóa đã kiểm chứng ở (a) và (b): thẻ
  đầu là bài đầu manifest, thẻ cuối là bài cuối manifest — khớp thứ
  tự trước khi sửa.
- (d1) không đổi bản chất: vẫn bị cắt bởi timeout 15 giây như bản
  sửa HSK3-8; song song hóa không làm đường lỗi này tệ đi.

## 5. Hồi quy

- `tests/browser-check.mjs`: **19/19 PASS**, 0 lỗi console.
- `python3 scripts/validate.py`: ĐẠT (72 bài, 353 bài tập — số đếm
  hiện tại của workspace).
- `python3 -m unittest discover -s tests`: 9 test, OK.
- `node --test tests/test_fsrs.mjs`: 7 pass / 0 fail.
- `node --check app.js`: đạt.
- Không thêm ca kiểm tra mới vào harness CI: kịch bản treo/bóp mạng
  cần một máy chủ “hỏng có chủ đích” và khẳng định dựa trên thời
  gian chờ, không deterministic trong điều kiện CI hiện tại (máy chủ
  tĩnh thường + không bóp mạng). Phần kiểm chứng này sống trong báo
  cáo điều tra và báo cáo này, chạy lại được bằng cùng quy trình đo
  ở mục 1.

## 6. Phân biệt với hiện tượng live chưa rõ nguyên nhân

Công việc này xử lý hai việc **đã đo và xác nhận được ở local**:
độ trễ do tải tuần tự trên mạng chậm, và khe hở timeout chưa bao
phủ phần đọc body. Nó **không** tuyên bố giải thích hiện tượng live
ngày 30/10 ở build `20261030-hsk3g7` (đứng ~15 giây ở lần tải đầu,
tải lại thì được): hiện tượng đó vẫn **chưa xác định nguyên nhân**
và giữ trạng thái theo dõi trong `ISSUE-LOAD-STALL-01` như vòng
điều tra đã kết luận.
