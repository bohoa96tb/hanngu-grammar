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
