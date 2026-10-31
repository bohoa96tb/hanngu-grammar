# Release log

Chưa có bản phát hành nào.

- 2026-10-29 — Bản thử nghiệm local (chưa phát hành): P00–P04 với 3 bài mẫu.
  Chưa push lên GitHub vì GitHub chưa kết nối (xem checkpoint). Chưa có URL
  Pages, chưa có release ID, chưa có rollback cần thiết vì chưa phát hành gì.
  Khi repo được tạo và workflow Pages chạy thành công, ghi tại đây: phiên bản,
  commit SHA đã kiểm tra, URL live đã kiểm tra, và cách rollback (về commit
  trước qua GitHub Pages redeploy / revert).

- 2026-10-29 — Đẩy lần đầu lên main (P00–P04): head đã xác minh
  `fd8799247ae6ea8abdca29c4a4f9196d78bf1dc5`, 21/22 file. Thiếu duy nhất
  `.github/workflows/pages.yml` do API của GitHub App trả 403 với file workflow.
  Pages chưa bật nên chưa có URL live đã xác minh; rollback: về commit trước
  bằng cách ghi đè file tương ứng qua Contents API (không force-push).

- 2026-10-29 — GitHub Pages live đã xác minh qua text fetch (04:52 UTC):
  https://bohoa96tb.github.io/hanngu-grammar/ — index hiển thị đúng tiêu đề
  và tagline, data/lessons.json đủ 3 bài. Deploy từ nhánh main (không dùng
  workflow Actions, vì file workflow bị 403 qua API). Chưa kiểm tra tương tác
  JS trực tiếp trên live bằng trình duyệt thật.

- 2026-10-29 — P05-01: FSRS thật bằng ts-fsrs 5.4.2 (vendored, MIT).
  Một thẻ cho mỗi bài đã hoàn thành, 4 mức tự đánh giá, event_id chống ghi
  trùng, tiến trình v2 (migrate từ v1), kiểm thử Node 7 passed.

- 2026-10-29 — P09-01 kiểm định: 6/6 bước tương tác đạt trên bản live;
  sửa lỗi nhỏ lịch sử ôn chỉ cập nhật sau khi tải lại trang (nay render lại
  ngay sau khi ghi). Hạn chế còn lại: chưa kiểm tra Android/iOS thật, mic
  thật, tiếp cận 200% bằng công cụ chuyên dụng, E2E tự động.

- 2026-10-29 — P03 mẫu đủ 12 bài (53 bài tập), P06 lô 1: thêm 9 bài HSK1–2
  (很, 吗, 的, 有, 不/没, lượng từ, từ để hỏi, 会/能/可以, 过). Baseline
  0.2-working: chốt phiên bản mục tiêu là đề cương thi 11/2025, nhưng CHƯA
  khóa vì chưa có văn bản gốc để đối chiếu. P09-01 chỉ công nhận phạm vi
  bản thử nghiệm; lỗi console và hiệu năng ghi not_run.

- 2026-10-29 — Baseline 1.0-official-scope: khóa phạm vi theo PDF đề cương
  chính thức (2025-11 发布, 2026-07 实施, 语法大纲 tr.382–400), 50 nhóm;
  sửa cấp 了 sang HSK1, 在/正在 sang HSK1. Quyền phân phối chưa xác minh
  nên repo chỉ diễn đạt lại, không chứa tài liệu gốc. 12 bài mẫu đã rà
  soát đầy đủ theo P03 (batch-04). Live 12 bài chưa xác minh xong — chờ
  vòng trình duyệt bản mới.

- 2026-10-29 — P06 lô 2: thêm 6 bài (在, 着, 是……的, bổ ngữ kết quả, bổ
  ngữ phương hướng, câu phức 虽然/因为), tổng 18 bài, 83 bài tập. Vòng
  qa-02 xác minh lịch sử ôn cập nhật tức thì sau Good và FSRS Good thứ
  hai cho hạn 2 ngày đúng cấu hình thư viện; sửa chân trang và trang
  Giới thiệu (văn bản cũ). Live 18 bài chờ xác minh sau push.

- 2026-10-29 — Sửa trạng thái baseline: khóa phạm vi nhóm (50 nhóm), chưa
  xác minh đầy đủ danh mục chính thức (baseline-evidence.md). Tách dữ
  liệu thành shard theo cấp (hsk1 14 bài, hsk2 10 bài) thay cho file tổng
  hợp, app/validator đọc qua manifest. Lô 3: thêm 6 bài (tiền tố/hậu tố,
  đại từ, phó từ, 还是, trùng điệp, câu hai tân ngữ 给), tổng 24 bài,
  111 bài tập. Audio TTS phát thực tế vẫn not_run cho cả 24 bài.

- 2026-10-29 — Chẩn đoán 24 bài: shard theo bài (24 file) thay shard theo
  cấp, chế độ ?debug=1 (build, nguồn, số bài từng nguồn, lỗi tải, SW,
  Cache Storage, giọng zh), versioning BUILD_VERSION. App không có
  service worker. TTS là phương án tạm thời (AUD-TTS-01), chưa nghiệm
  thu nghe thực tế.

- 2026-10-29 — Lô 08: đối chiếu chính thức HSK1–2 (52 + 62 mục nhóm;
  không sửa cấp độ 24 bài cũ) và 4 bài mới (想/要, phương vị từ,
  为什么, 一……就……) — tổng 28 bài, 131 bài tập. Cảnh báo thiếu giọng
  zh một lần mỗi lần tải trang (D22). TTS vẫn tạm thời.

- 2026-10-29 — Lô 09: 6 bài mới từ danh mục HSK1–2 đã xác minh
  (不要, ly hợp từ, 怎么/怎么样, 兼语句, 存现2, bổ ngữ 得) — tổng
  34 bài, 161 bài tập. Đối chiếu P01-02 cập nhật cho 28 bài. Các bài
  mới là đã rà soát nội bộ, chưa đạt toàn bộ tiêu chí vì audio chưa
  nghiệm thu.

- 2026-10-29 — Sửa lỗi cảnh báo giọng (D24, build voicewarn2): chờ
  voiceschanged, dòng cảnh báo bền vững trong bài học, bảng chẩn đoán
  phân biệt chưa tải xong với không có giọng. Nghiệm thu qa-06 xác
  nhận build voicewarn live đủ 28 bài ở profile mới.

- 2026-10-30 — Lô chuẩn hóa std1 (PR #7, nhánh batch-std1, merge
  298576ff, build 20261030-std1): nội dung — sửa lỗi chấm sai bi-ex4
  (key 比 → 不) và toàn bộ lỗi đáp án/biến thể theo rà soát ND-01, thêm
  mục F Nhớ nhanh (quick_memory) và công thức chia bước cho 38/38 bài,
  is_open_ended cho 182 bài tập, gán lại độ khó (3 bài hard), thêm
  prefix-ex5; QA vòng 1 bắt thêm lỗi dạy sai vị trí 更 (bi-comparison)
  đã sửa ở ND-03. Giao diện — chấm bài chọn → Kiểm tra → khóa/Làm lại
  cho choice/fill/order, design tokens + badge HSK/độ khó riêng, prefs
  Pinyin/nghĩa/tốc độ lưu bền, TTS có trạng thái và chống phát sau khi
  bấm Dừng, banner lỗi tải/tiến trình hỏng, mục A–F, điều hướng bài
  trước/sau, Ôn tập khóa tự đánh giá tới khi đối chiếu và hiện Nhớ
  nhanh. Validator nâng quy tắc (ĐẠT 38 bài/182 bài tập), unittest 7/7,
  FSRS 7/7. Nghiệm thu live sau merge: đạt bước 1–6 (debug 38/38, luồng
  học/chấm/lưu/ôn trên bài ma-question, tiến trình cũ đọc đúng). Chưa
  kiểm tra: console (not_run), bề rộng 390px bằng trình duyệt thật
  (not_run, mới kiểm tĩnh CSS), audio thiết bị thật (not_run,
  AUD-TTS-01). Rollback: revert merge 298576ff hoặc triển khai lại từ
  f6e505b1.

- 2026-10-30 — Lô std2 (PR #8, nhánh batch-std2, merge 616b63af,
  build 20261030-std2): thêm harness kiểm tra trình duyệt thật bằng
  Chromium headless qua CDP (tests/browser-check.mjs) — tràn ngang ở
  360/390/768/1280, lỗi console, bàn phím, trạng thái nghe/dừng, lưu
  tiến độ; harness bắt và đã sửa lỗi tràn thật ở ô chọn câu mẫu
  (#speakSel) và ô nhập tệp tiến độ. Nội dung: thay 8 mục Nhớ nhanh;
  thêm trạng thái đối chiếu cấp HSK từng bài (hsk_evidence: 36
  verified / 3 partial có ghi chú); bi-comparison bỏ quy tắc 更 của
  HSK3; tách le-completion-change thành hai bài (bài mới
  le-sentence-final-change), chuyển chủ điểm 边 sang location-nouns,
  complex thêm ví dụ và bài tập. Tổng 39 bài / 186 bài tập. QA hai
  vòng (vòng 1 chưa đạt vì locnoun-ex5 chấm oan biến thể, đã sửa) —
  ĐẠT; kiểm tra di trú tiến độ 15/15, không nhân đôi thẻ FSRS.
  Nghiệm thu live sau merge đạt. Giới hạn còn lại: harness chỉ chạy
  được với localhost trên VM hiện tại (proxy chặn CONNECT ra ngoài)
  nên nghiệm thu live dùng trình duyệt nền tảng; TTS thiết bị thật
  vẫn not_run (AUD-TTS-01). Rollback: revert merge 616b63af.

- 2026-10-30 — Lô HSK3-2 (PR #10, nhánh batch-hsk3-2, merge 8c88c2b8,
  build 20261030-hsk3b2): 4 bài HSK3 mới — result-complement-2
  （到/住/走/上）, potential-complement-1 （得/不）, complex-hypothesis
  （如果/的话）, complex-condition （只有……才 đối chiếu 只要……就）;
  zhe-continuation bỏ dạy trùng mẫu tồn hiện (liên kết sang
  cunxian-chu); adverbs-du-ye thêm bài tập 还/再. Tổng 43 bài / 208
  bài tập. QA hai vòng: vòng 1 đạt có điều kiện (diễn đạt tuyệt đối
  về việc lược 就 — đã sửa cùng 7 điểm nhỏ), vòng 2 ĐẠT. Nghiệm thu
  live đạt sau khi Pages triển khai xong (lần kiểm đầu quá sớm gặp
  bản cũ do cache). Audio vẫn not_run. Rollback: revert 8c88c2b8.
- 2026-10-30 — Lô bản đồ HSK5–6 (PR #9, merge ef4cb8a4): thêm
  official-catalogue-hsk5-hsk6.json (31 + 22 mục nhóm, tất cả thiếu)
  và baseline-hsk5-hsk6-mapping.md — đối chiếu phạm vi P01-02 đủ 6
  cấp ở mức mục nhóm (251 mục). question-words đổi hsk_evidence
  thành verified sau khi kiểm tra trực tiếp bản gốc （几/多少 thuộc
  nhóm đại từ để hỏi HSK1).

- 2026-10-30 — Lô HSK3-9 (build 20261030-hsk3i9, nhánh
  batch-hsk3-9): 4 bài HSK3 mới — fixed-pattern-shenme (mẫu cố
  định X什么（啊）; khép nốt OFF-H3-26 → đã phủ), adverbs-
  frequency-hsk3 (OFF-H3-15), adverbs-scope-hsk3 (OFF-H3-13),
  adverbs-mood-hsk3 (OFF-H3-18). Tổng 72 bài / 353 bài tập
  (HSK1 20, HSK2 17, HSK3 34, HSK4 1). Ánh xạ HSK3: 32 đã phủ
  / 4 một phần / 14 thiếu — còn 18 mục chưa phủ đủ (mục 2b).
  Ba hiệu chỉnh catalogue từ kiểm TRỰC QUAN trang in 389 (cả
  Nội dung và QA cùng tự render): giỏ phạm vi có 6 từ — trích
  xuất cũ thiếu 就³; giỏ ngữ khí có thêm 就⁴; và hàng phó từ
  thời gian có 7 thành viên gồm 才¹ (nghĩa "mãi đến lúc đó
  mới") — OFF-H3-14 hạ từ "đã phủ" xuống "một phần", bài
  adverbs-time-hsk3 cũng chuyển bằng chứng sang một phần;
  nhận định "đã phủ H3-14" của các lô HSK3-7/HSK3-8 (dựa trên
  trích xuất thiếu) bị thay thế bởi hiệu chỉnh này, phần chưa
  dạy (nghĩa thời gian của 才¹) theo dõi ở mục 2b. QA vòng 1
  bắt lỗi khóa amd-ex4 mâu thuẫn công thức của chính bài
  (khung 才/就+不…呢 bị khóa chỉ nhận 才) — đã viết lại bài
  tập, phúc tra 5/5 điểm đạt.

- 2026-10-30 — PR KỸ THUẬT hiệu năng tải (build 20261030-perf1,
  tách riêng khỏi lô nội dung): chuyển tải file bài từ tuần tự
  sang song song có giới hạn LOAD_CONCURRENCY = 8 (chọn bằng đo
  thử: mức 4 = 20,1 giây, mức 8 = 19,5 giây, mức 16 = 19,5 giây
  ở mạng chậm 400ms/~50KB/s — cổ chai chuyển sang băng thông).
  Kết quả ghép theo chỉ số manifest nên thứ tự bài không đổi.
  Đo trước/sau cùng điều kiện local (72 bài): mạng chậm 46,4 →
  19,4 giây; tải mới 0,93 → 0,75 giây; lỗi console 0. Sửa thêm
  một khe hở timeout có thật mà yêu cầu của Hoa đã chỉ đúng:
  bản sửa ở lô HSK3-8 hủy bộ đếm giờ ngay khi có headers nên
  một kết nối treo GIỮA BODY vẫn tải vô hạn — nay timeout bao
  phủ tới khi đọc xong body, quá 15 giây thì hủy request thật;
  kịch bản treo-body nay kết thúc bằng banner + nút thử lại ở
  ~15,3 giây (QA độc lập tự đo lại toàn bộ ma trận, khớp).
  Đường lỗi thiếu dữ liệu/nút thử lại giữ nguyên — không bỏ
  bài im lặng. Phân biệt rõ: hai lỗi trên là lỗi đã đo và sửa
  ở local; hiện tượng live ở build 20261030-hsk3g7 vẫn chưa
  xác định nguyên nhân, giữ theo dõi trong ISSUE-LOAD-STALL-01.
  Không đổi dữ liệu bài, ID bài hay tiến độ học.

- 2026-10-30 — Lô HSK3-8 (build 20261030-hsk3h8): 4 bài mới —
  approx-numbers-1 (HSK2, OFF-H2-61 — khép khoảng trống nền số
  ước lượng, liên kết tiên quyết hai chiều với approx-numbers-2),
  zenme-yang-question (OFF-H3-07), time-frame-patterns (thành
  viên mốc thời gian của OFF-H3-26), adverbs-degree-hsk3
  (OFF-H3-12). Tổng 68 bài / 333 bài tập (HSK1: 20, HSK2: 17,
  HSK3: 30, HSK4: 1). Ánh xạ: HSK2 20 đã có / 15 một phần / 27
  thiếu; HSK3 29/4/17 (mục 2b còn 21 mục chưa phủ đủ). Mọi phạm
  vi của lô đều xác minh TRỰC QUAN từ PDF gốc (trang in 388–391)
  theo chỉ đạo của Hoa sau vụ lệch hàng: bắt thêm 3 sai lệch của
  bản trích xuất — (1) 一会儿……，一会儿…… thuộc 并列复句 chứ
  không phải 选择复句 → OFF-H3-42 chỉ còn 或者 (vẫn covered),
  OFF-H3-43 đủ 3 thành viên (thay thế cách gán của lô HSK3-5/6);
  (2) OFF-H3-07 thu hẹp đúng phạm vi thật ("怎样+动词" đặc chỉ);
  (3) OFF-H3-12 có 8 thành viên — bản cũ thiếu 还. Rà bài đã
  phát hành approx-numbers-2 theo trang 391: đề cương ghi hai
  cách độc lập (1) 大概, (2) hai số kề nhau — bài vốn không ép
  dùng đồng thời; đã viết tường minh tính độc lập. QA độc lập
  ĐẠT toàn bộ (tự render và đối chiếu trang 388–391), 3 điểm
  Hoàn thiện đã áp dụng, phúc tra 3/3. KÈM SỬA LỖI KỸ THUẬT:
  điều tra hiện tượng kẹt "Đang tải bài học…" (nghiệm thu lô
  HSK3-7) bằng 3 kịch bản tái hiện — tải mới bình thường; mạng
  chậm chờ 41 giây vì tải tuần tự 65 file (không treo); file
  404 đã có banner + nút thử lại từ trước; KẾT NỐI TREO là lỗi
  xác nhận được (fetch không timeout → tải vô hạn, không thông
  báo) → đã sửa tối thiểu: timeout 15 giây cho mọi fetch dữ
  liệu, đi vào đúng đường lỗi sẵn có (ISSUE-LOAD-STALL-01).
  Hiện tượng live ngày 30/10 không tái hiện nguyên trạng ở
  local nên KHÔNG kết luận nguyên nhân — giữ trạng thái theo
  dõi. CI hai job là điều kiện merge bắt buộc. Audio TTS thiết
  bị thật vẫn not_run; các bài mới là đã rà soát nội bộ.

- 2026-10-30 — Lô HSK3-7 (build 20261030-hsk3g7): 4 bài mới —
  pronouns-others （别人/咱们/别的/其他, OFF-H3-09+10),
  adverbs-time-hsk3 （马上/先/刚/刚刚/一直, OFF-H3-14),
  negation-bubi-buyong （不必/不用, OFF-H3-19), approx-numbers-2
  （大概 + hai số kề nhau, OFF-H3-50). Tổng 64 bài / 313 bài tập
  (HSK1: 20, HSK2: 16, HSK3: 27, HSK4: 1). Ánh xạ: HSK3 27 đã có /
  4 một phần / 19 thiếu (mục 2b còn 23 mục chưa phủ đủ); HSK4
  1/0/33. SỬA ĐỐI CHIẾU QUAN TRỌNG cùng lô: kiểm TRỰC QUAN trang
  in 394 của PDF đề cương gốc (theo yêu cầu của Hoa) xác nhận bản
  trích xuất text trước đây LỆCH HÀNG ở khối câu phức HSK4 —
  连……也/都……，……更…… thuộc 递进复句 (không phải lựa chọn);
  选择复句 chỉ có 不是……，就是……. Đã sửa 7 mục catalogue
  (OFF-H4-23 đến H4-29): OFF-H4-27 → covered và hsk_evidence của
  complex-choice → verified (hủy nhận định "còn thiếu 连…" của
  lô HSK3-6); OFF-H4-26 nhận lại mẫu 连…; các mẫu 不是……，而是……,
  首先……，其次……, ……X是X…… trả về đúng mục. QA độc lập tự xem
  lại ảnh trang 394 và xác nhận toàn bộ, không phát hiện lệch
  thêm trên cùng trang. Phần còn lại của các bảng vẫn dựa trên
  trích xuất text — rủi ro tương tự chưa loại trừ, thuộc xác
  minh sâu P01-02. Phát hiện phụ: OFF-H2-61 （概数 几/多) vẫn
  missing — số ước lượng cấp dưới chưa có bài, bài mới đã ghi
  ranh giới trung thực, để lại cho lô sau. QA nội dung đạt có
  điều kiện → sửa A-1 (confusion về 刚刚 dạy sai vị trí trước
  cụm thời gian xác định), A-2, P-1 → phúc tra 3/3 đạt. CI hai
  job là điều kiện merge bắt buộc. Audio TTS thiết bị thật vẫn
  not_run; các bài mới là đã rà soát nội bộ.

- 2026-10-30 — Lô HSK3-6 (build 20261030-hsk3f6): 4 bài mới —
  complex-parallel （并列复句， OFF-H3-43), modal-verbs-hsk3 （能愿
  需要/该/应该/愿意/得， OFF-H3-04), alternating-actions
  （一会儿……，一会儿……, hoàn thiện OFF-H3-42), yue-patterns
  （越……越…… trong giỏ OFF-H3-26). KÈM SỬA CẤP theo chỉ đạo của
  Hoa: bài complex-choice chuyển hsk_level 3 → 4 vì khung chính
  不是……，就是…… thuộc bảng HSK4 — bài nay đứng đầu khối HSK4,
  OFF-H4-27 phủ một phần (còn thiếu Liên……也/都……，……更……);
  OFF-H3-42 đạt covered xuyên cấp （或者 do complex-choice dạy ở
  khối HSK4, 一会儿 do alternating-actions) và không tính khung
  HSK4 vào phủ HSK3. Tổng 60 bài / 293 bài tập (HSK1: 20, HSK2: 16,
  HSK3: 23, HSK4: 1). Ánh xạ sau lô: HSK3 22 đã có / 4 một phần /
  24 thiếu (nhóm ưu tiên cao ở mục 2b đã trống); HSK4 0/1/33.
  Xác minh phạm vi trước soạn bắt thêm: cả 5 động từ năng nguyện
  HSK3 đều chưa từng được dạy ở bài cũ. QA đạt có điều kiện, sửa 2
  điểm Quan trọng: complex-parallel từng gán sai_ngu_phap cho câu
  chỉ có một 又 (thực ra đúng ngữ pháp, đổi nghĩa); modal-verbs-hsk3
  từng khẳng định tuyệt đối "*不得 không tồn tại" ở 4 chỗ (thực tế
  不得 là cách nói trang trọng nghĩa cấm — đã sửa cả 4). Phúc tra
  5/5 đạt. CI hai job là điều kiện merge bắt buộc. Báo cáo QA vòng 1
  của lô HSK3-5 (bị cụt khi ghi) đã gắn ghi chú xử lý dẫn tới báo
  cáo vòng 2 và nhật ký này, không dựng lại phần thiếu. Audio TTS
  thiết bị thật vẫn not_run; các bài mới là đã rà soát nội bộ.

- 2026-10-30 — Lô HSK3-5 (build 20261030-hsk3e5): 4 bài mới —
  complex-sequence （承接复句 先……，然后/接着……, OFF-H3-41),
  complex-choice （选择复句, OFF-H3-42 — phủ một phần), complex-purpose
  （目的复句 为了……, OFF-H3-48), time-since-completion （数量补语3 đúng
  phạm vi chính thức: đã bao lâu kể từ khi việc kết thúc, OFF-H3-32);
  kèm bài quantity-complement-objects (HSK2 — vị trí bổ ngữ số lượng
  khi có tân ngữ, phủ một phần OFF-H2-43). Tổng 56 bài / 273 bài tập.
  Ánh xạ sau lô: HSK3 19 đã có / 4 một phần / 27 thiếu; HSK2 19/15/28.
  QA vòng 1 CHƯA ĐẠT và bắt hai lỗi phạm vi nghiêm trọng (đối chiếu bản
  trích xuất đề cương gốc): bài soạn ban đầu cho OFF-H3-32 dạy lệch chủ
  điểm (vị trí tân ngữ thay vì "kể từ khi kết thúc") → tách thành bài
  HSK2 ở trên + bài dạng 3 đúng phạm vi; OFF-H3-42 hạ xuống một phần vì
  khung chính 不是……，就是…… thuộc bảng HSK4 và mẫu luân phiên
  一会儿……，一会儿…… chưa dạy (ghi vào mục 2b). Vòng sửa bổ sung khối
  nền dạng 2 cho bài vị trí tân ngữ. QA vòng 2 ĐẠT CÓ ĐIỀU KIỆN (một
  lỗi chữ ở hint đã sửa tại chỗ + 2 khuyến nghị đã áp dụng). CI hai job
  là điều kiện merge bắt buộc kể từ lô này. Audio TTS thiết bị thật
  vẫn not_run; các bài mới là đã rà soát nội bộ.

- 2026-10-30 — Lô HSK3-4 + rà soát tính tuyệt đối (build 20261030-hsk3d4):
  4 bài HSK3 mới — complex-progressive （不但……，而且……, OFF-H3-44),
  complex-compact （紧缩句: 一……也/都…… + ……了就……, OFF-H3-49, đồng
  thời OFF-H3-25 → một phần), degree-complement-1 （得很/极了/坏了,
  OFF-H3-31), rhetorical-question （不是……吗？; 怎么……呢？, OFF-H3-33).
  Tổng 51 bài / 248 bài tập (HSK3: 16 bài). Ánh xạ HSK3 sau lô: 16 đã
  có / 3 một phần / 31 thiếu; tài liệu ánh xạ thêm mục 2b liệt kê đủ 34
  mục còn thiếu/một phần kèm ưu tiên và lý do để lại (căn cứ quyết định
  chuyển HSK4, chưa tự chuyển cấp). Rà soát tính tuyệt đối 4 bài HSK3-3:
  shi-de-attitude phân biệt rõ "cần 的 để giữ mẫu khi đã mở 是" với
  "bỏ cả khung （他一定会来。) vẫn là câu hợp lệ"; cunxian-appearance sửa
  mâu thuẫn nội bộ — bỏ khẳng định "bắt buộc có 了" (với bổ ngữ xu hướng
  kép 进来/出来 câu trọn không cần 了； công thức nay ghi (了));
  verb-repetition-sentence ghi rõ dạng rút gọn tồn tại trong khẩu ngữ;
  direction-complement-2 soi lại không cần sửa. QA hai vòng: vòng 1 ĐẠT
  CÓ ĐIỀU KIỆN (Q-1 bài rút gọn thiếu bài tập cho mẫu 2 → đổi
  compact-ex2; Q-2 prog-ex4 thiếu biến thể 还 → đã thêm; H-1..H-3),
  vòng 2 ĐẠT 5/5. Harness local 19/19. CI: file .github/workflows/ci.yml đã có trên main (commit 1a3b97f,
  do Hoa thêm qua ChatGPT vì API của Muse bị GitHub chặn ghi file
  workflow 403) và ĐÃ CHẠY XANH trên GitHub Actions: run trên main và
  run trên PR #12 (sau cập nhật nhánh từ main) đều Success với hai job
  'Validator và unit test' và 'Kiểm tra trình duyệt (harness local)';
  PR #12 chỉ merge sau khi CI xanh trên commit mới nhất.
  Audio TTS thiết bị thật vẫn not_run; các bài mới là đã rà soát nội bộ.

- 2026-10-30 — Lô HSK3-3 (build 20261030-hsk3c3): 4 bài HSK3 mới —
  cunxian-appearance （存现句 dạng 3: xuất hiện/biến mất, OFF-H3-38),
  shi-de-attitude （是……的句 dạng 2: nhấn thái độ/quan điểm,
  OFF-H3-39), direction-complement-2 （趋向补语 dạng 2: nghĩa mở
  rộng 起来/下去/出来, OFF-H3-29), verb-repetition-sentence
  （重动句, OFF-H3-40). Tổng 47 bài / 228 bài tập. QA hai vòng:
  vòng 1 ĐẠT CÓ ĐIỀU KIỆN (Q-1: công thức shi-de-attitude ghi
  tường minh 是 lược được khi có từ khẳng định mạnh như 一定, riêng
  的 không lược được; Q-2: đổi shide2-ex4 từ error_spot "thiếu 的"
  thành fill giữ nguyên id; H-1..H-3: sửa dính chữ trong công thức
  cunxian-appearance, thêm biến thể hợp lệ cho cx3-ex5, bổ sung
  phân biệt 唱得起来 trong lời giải dir2-ex1), vòng 2 ĐẠT cả 5
  điểm. Harness trình duyệt local 19/19. Ánh xạ HSK3 sau lô: 12 đã có / 2 một phần / 36 thiếu trên 50 mục nhóm. Audio TTS thiết bị
  thật vẫn not_run (AUD-TTS-01); các bài mới là đã rà soát nội bộ.
