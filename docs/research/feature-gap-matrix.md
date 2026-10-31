# Ma trận khoảng trống tính năng — hanngu-grammar so với benchmark

- Ngày lập: 2026-10-31. Nguồn benchmark: `docs/research/grammar-platform-benchmark.md` (cùng ngày, có URL + bằng chứng từng mục).
- Quy ước ưu tiên: P0 = lỗi ảnh hưởng học tập/độ ổn định phải sửa trước; P1 = nâng cấp có tác động rõ, làm theo lô; P2 = cải thiện, backlog.
- Mỗi mục: (1) hiện trạng có bằng chứng · (2) vấn đề người học gặp · (3) tham khảo + nguyên lý · (4) giải pháp riêng của hanngu · (5) ưu tiên · (6) tiêu chí nghiệm thu/kiểm thử.

---

## G-01 — Không có liên kết "Bài liên quan" trong trang bài → CHỌN LÀM PILOT
1. Hiện trạng: `app.js` renderLesson chỉ có nav Bài trước/Bài sau theo thứ tự manifest (kiểm chứng mã nguồn 2026-10-31). Schema bài học không có trường quan hệ nào (liệt kê khóa của 72 file data/lessons/*.json: confusions, content_version, difficulty, examples, exercises, formula_notes, hsk_evidence, hsk_level, id, objective, pattern, quick_memory, review, sources, status, title_vi, when_to_use — không có related/prerequisite).
2. Vấn đề: người học học xong 了 hoàn thành không biết có bài 了 cuối câu; học 比 dạng 1 không thấy 比 dạng 2; gặp bẫy ở mục D "Dễ nhầm" nhưng không có đường đi sang bài của cấu trúc bị nhầm. Kiến thức tiên quyết chỉ tồn tại trong tài liệu ánh xạ (docs/baseline-*-mapping.md), không tới được người học.
3. Tham khảo: CGW — hộp "Similar to" ngay đầu bài + "See also" cuối bài (benchmark 1.3); trang hub Uses of "le" (1.4).
4. Giải pháp riêng: thêm trường tùy chọn `related_ids` (tối đa 4, đối xứng hai chiều, phải trỏ bài published có thật) vào schema + validator; render mục "Bài liên quan" ở cuối trang bài (trước nav) hiện tiêu đề + cấp HSK của bài đích; điền dữ liệu cho các họ quan hệ *đã có bằng chứng trong dữ liệu hiện hữu* (cặp tách bài 了, cặp dạng 1/dạng 2, họ bổ ngữ kết quả/khả năng/trạng thái, họ phó từ HSK3, cặp 把/被…). Không suy diễn quan hệ từ tiêu đề một cách máy móc: từng cặp phải đọc được lý do trong confusions/công thức/mapping hiện có, QA độc lập rà từng cặp.
5. Ưu tiên: P1 (pilot của đợt này).
6. Nghiệm thu: validator bắt được related_ids trỏ bài không tồn tại / tự trỏ / không đối xứng / quá 4; unit test cho các trường hợp đó; harness trình duyệt local đạt và có kiểm tra mới: mở bài le-completion-change thấy mục Bài liên quan chứa le-sentence-final-change và bấm sang được; bài không có related_ids không hiện mục trống; tiến độ/FSRS không đổi (không sửa id bài, không sửa exercises).
   - Đường cơ sở trước pilot (2026-10-31, local, bản 72 bài của PR #19): harness `tests/browser-check.mjs` PASS 19/19 (tràn ngang 360/390/768/1280, 0 lỗi console, bàn phím, nghe/dừng theo trạng thái, tiến độ + prefs giữ sau tải lại, cổng ôn tập FSRS).

## G-02 — Tìm kiếm chưa tra được bằng pinyin, chưa tra trong phần giảng
1. Hiện trạng: renderHome lọc theo title_vi, pattern, examples zh+vi (mã nguồn app.js, hàm renderHome). Không có pinyin của ví dụ, không có when_to_use/objective trong chỉ mục.
2. Vấn đề: người học nhớ âm ("jiu", "ba") hoặc nhớ ý ("sắp xếp thời gian") nhưng không nhớ chữ Hán sẽ không tìm thấy bài.
3. Tham khảo: CGW trục từ khóa + trục nghĩa (benchmark 1.1); Yoyo Searchable Course Index (2.3).
4. Giải pháp riêng: mở rộng haystack thêm pinyin (bỏ dấu thanh + giữ nguyên dạng có dấu) của ví dụ, objective và when_to_use; chuẩn hóa truy vấn (lowercase, bỏ dấu thanh pinyin). Chỉ sửa app.js, không sửa dữ liệu.
5. Ưu tiên: P1 (lô sau pilot).
6. Nghiệm thu: harness thêm ca: tìm "jiu" ra bài có 就； tìm một từ trong objective ra đúng bài; tìm không dấu vẫn khớp; không phá ca tìm hiện có.

## G-03 — Phương án nhiễu của bài choice/error_spot chưa có giải thích riêng
1. Hiện trạng: explanation của bài tập tập trung vào đáp án đúng (mẫu dữ liệu exercises; app.js hiện explanation sau Kiểm tra). Chọn sai một phương án nhiễu cụ thể, người học chỉ biết đáp án đúng là gì, không biết vì sao phương án mình chọn sai.
2. Vấn đề: lỗi "đúng nhưng đổi nghĩa" vs "sai ngữ pháp" ở phương án nhiễu là nơi học được nhiều nhất; hiện bị bỏ qua.
3. Tham khảo: Mandarin Bean — đã kiểm chứng trực tiếp bằng trình duyệt thật (benchmark 3.4): mọi câu trong kết quả đều có hộp giải thích + "Correct version:" cho câu sai; Yoyo quiz feedback footer có đáp án đúng + thông tin thêm (2.2, đã xác minh).
4. Giải pháp riêng: KHÔNG sửa hàng loạt 353 bài tập. Thử nghiệm ở lô nội dung sau: thêm trường tùy chọn `option_notes` cho bài choice mới; bài cũ bổ sung dần khi rà soát theo lô. Validator: nếu có option_notes thì phải đủ số phương án.
5. Ưu tiên: P2.
6. Nghiệm thu: bài thí điểm hiển thị ghi chú đúng phương án đã chọn khi sai; validator đạt; QA nội dung rà từng ghi chú.

## G-04 — Audio vẫn là TTS trình duyệt, chưa nghiệm thu thiết bị thật (AUD-TTS-01)
1. Hiện trạng: task-board AUD-TTS-01 in_progress; harness chỉ kiểm tra trạng thái nút Nghe/Dừng và dòng cảnh báo thiếu giọng, không nghe được âm thanh; nghiệm thu thiết bị thật = not_run.
2. Vấn đề: người học nghe mẫu phát âm có thể sai đa âm/không có giọng zh mà app chỉ cảnh báo, chưa có audio đã duyệt.
3. Tham khảo: Yoyo dùng audio người bản ngữ 2 tốc độ (benchmark 2.1–2.2).
4. Giải pháp riêng: giữ trạng thái thật — không đóng AUD-TTS-01 bằng suy đoán. Khi có điều kiện thiết bị thật: chạy danh sách kiểm tra của task-board (giọng zh-CN, phát/dừng, thiếu giọng) trên Android Chrome + iOS Safari rồi mới đổi trạng thái.
5. Ưu tiên: P0 về mặt *trung thực trạng thái* (không phải P0 triển khai trong đợt này — bị chặn bởi thiết bị thật).
6. Nghiệm thu: có biên bản nghe thật từng mục; không có thiết bị thì giữ not_run.

## G-05 — ISSUE-LOAD-STALL-01: hiện tượng live build hsk3g7 chưa rõ nguyên nhân
1. Hiện trạng: task-board trạng thái monitoring. Hai lỗi đã đo đã sửa và phát hành ở perf1 (PR #18): tải tuần tự → song song giới hạn 8; timeout chưa phủ body → phủ tới khi đọc xong body (đo: mạng chậm 46,4s → 19,4s; treo-body kết thúc ~15,3s bằng banner + thử lại).
2. Vấn đề: hiện tượng kẹt tải quan sát trên live ngày 30/10 ở build 20261030-hsk3g7 không tái hiện nguyên trạng ở local — chưa phân loại được thuộc nhóm nào trong 6 nhóm (Pages chưa triển khai / cache CDN-trình duyệt / tải lỗi-dữ liệu không nhất quán / lỗi JS-render / timeout mạng thật / chưa xác định).
3. Tham khảo: không lấy từ benchmark; đây là kỷ luật vận hành nội bộ (yêu cầu mục 9 của chỉ đạo 2026-10-31).
4. Giải pháp riêng: giữ MONITORING/UNRESOLVED cho riêng hiện tượng hsk3g7; tách bạch với hai lỗi timeout đã FIXED có bằng chứng. Khi tái diễn: ghi môi trường, thời gian chờ, ?debug=1, build đang phục vụ rồi mở lại điều tra. Lưu ý: đến 2026-10-31 GitHub Issues của repo đang TRỐNG (0 issue mở — kiểm chứng bằng list_issues) trong khi issue này chỉ tồn tại trong task-board; cần Hoa quyết định có mở GitHub Issue tương ứng hay giữ theo dõi trong task-board (Manager không tự mở issue mới ngoài phạm vi đã chốt nếu chưa được yêu cầu — ghi nhận chênh lệch này trong báo cáo).
5. Ưu tiên: P0 (theo dõi), không chặn pilot.
6. Nghiệm thu: mỗi lần nghiệm thu live đều ghi build + số bài + thời gian tải quan sát; không tuyên bố FIXED cho hiện tượng hsk3g7 khi chưa tái hiện và xác định được nguyên nhân.

## G-06 — Danh mục 72 bài là một danh sách phẳng dài trên điện thoại
1. Hiện trạng: renderHome xuất toàn bộ bài dạng thẻ nối tiếp sau form tìm kiếm (mã nguồn 2026-10-31); đã có lọc HSK + thẻ Tiếp tục học + tiến độ từng bài.
2. Vấn đề: 72 thẻ (và sẽ còn tăng tới HSK6) khiến việc lướt tìm theo cấp trên màn 360px dài; CGW giải quyết bằng bảng theo cấp + pattern (1.2), Yoyo bằng units/levels (2.3).
3. Tham khảo: CGW 1.2; Yoyo 2.3.
4. Giải pháp riêng: nhóm danh mục theo HSK với tiêu đề cấp + số bài + tiến độ của cấp khi không có truy vấn tìm kiếm; giữ nguyên hiển thị phẳng khi đang tìm. Chỉ sửa app.js/styles.css.
5. Ưu tiên: P1 (sau G-02 hoặc gộp một lô UI).
6. Nghiệm thu: harness kiểm tra tràn ngang 4 bề rộng vẫn đạt; ảnh chụp/kiểm tra DOM: đủ 6 tiêu đề cấp khi có dữ liệu, thứ tự bài trong cấp giữ nguyên thứ tự manifest.

## G-07 — Chưa có trang "họ cấu trúc" (hub) cho 了 / 就 / bổ ngữ
1. Hiện trạng: không có trang gom các cách dùng của một cấu trúc xuyên cấp.
2. Vấn đề: người học muốn ôn trọn một họ phải tự mò danh mục.
3. Tham khảo: CGW Uses of "le" (benchmark 1.4).
4. Giải pháp riêng: sau khi G-01 (related_ids) phủ đủ các họ lớn, sinh trang hub tĩnh từ dữ liệu related + manifest, không viết tay thêm nội dung mới ngoài phần giới thiệu ngắn đã qua QA.
5. Ưu tiên: P2.
6. Nghiệm thu: hub liệt kê đúng các bài của họ theo cấp tăng dần; mọi link mở đúng bài; validator/harness đạt.

## G-08 — Nguồn của từng bài chưa truy vết tới vị trí cụ thể (trang/ mục)
1. Hiện trạng: trường sources của bài chỉ có source_id + note mô tả (mẫu bi-comparison: source_id "cgw" + note công thức).
2. Vấn đề: khi có tranh chấp nội dung, rà soát phải tìm lại từ đầu.
3. Tham khảo: CGW ghi nguồn sách kèm số trang trong từng bài (benchmark 1.3).
4. Giải pháp riêng: bổ sung dần trường tùy chọn `locator` trong sources khi các lô nội dung sau chạm vào bài; không sửa ngược hàng loạt.
5. Ưu tiên: P2.
6. Nghiệm thu: bài mới từ lô sau có locator; validator chấp nhận cả bài cũ không có locator.

---

## Thứ tự thực hiện đề xuất
1. P0 vận hành: khép PR #19 theo cổng chất lượng (đang dở từ phiên trước) + giữ G-05 ở monitoring trung thực + G-04 giữ not_run.
2. Pilot P1: G-01 Bài liên quan (đợt này).
3. Lô UI P1 tiếp theo: G-02 (tìm kiếm pinyin) + G-06 (nhóm danh mục theo cấp) — cùng vùng file app.js, làm một lô riêng có harness mở rộng.
4. P2 backlog: G-03, G-07, G-08 — chỉ làm khi tới lô nội dung liên quan.
