# QA độc lập — Lô HSK3-8 (2026-10-30)

QA không tham gia soạn; kiểm chứng lại từ file, catalogue và **trực tiếp từ
ảnh trang in của PDF đề cương gốc** (`/tmp/hsk-syllabus.pdf`; ảnh chứng cứ ở
`~/workspace/qa-evidence/`, hai trang 389/390 do QA tự render bằng pdftoppm ở
170 dpi và tự xác nhận số trang in ở chân trang: in 389 = PDF 392, in 390 =
PDF 393). QA không sửa nội dung nào; các điểm cần sửa ghi ở mục "Điều kiện và
khuyến nghị".

**Kết luận toàn lô: ĐẠT.** Không có lỗi Nghiêm trọng, không có lỗi Quan
trọng. Ba điểm Hoàn thiện (không chặn phát hành) ghi ở Phần 2. Audio TTS
thiết bị thật vẫn not_run như mọi lô — các bài mới ở trạng thái "đã rà soát
nội bộ".

---

## Phần 1 — Phúc tra trực quan + sửa đối chiếu: ĐẠT toàn bộ

### 1a. Trang in 391 — gán lại 一会儿……，一会儿……: ĐẠT
Ảnh trang 391 (chân trang "391") cho thấy rõ:
- Hàng **选择复句** chỉ có một dòng: `或者……，或者……`.
- Hàng **并列复句** có đúng ba dòng: `一会儿……，一会儿……` /
  `又……，又……` / `一边……，一边……`.

Đối chiếu file:
- `OFF-H3-42` trong catalogue: title chỉ còn "Câu phức lựa chọn
  （或者……，或者……)", `lesson_ids: [complex-choice]`, note ghi rõ lần sửa
  thứ hai và lý do (lệch hàng trích xuất). ĐÚNG.
- `OFF-H3-43`: title đủ ba thành viên, `lesson_ids: [complex-parallel,
  alternating-actions]`, note truy vết đầy đủ. ĐÚNG.
- `data/lessons/alternating-actions.json`: không còn chỗ nào gán mẫu luân
  phiên cho câu lựa chọn/OFF-H3-42. Lần nhắc duy nhất tới "lựa chọn" là lời
  giải một câu dễ nhầm nói 或者 thuộc khung lựa chọn nên không ghép vào
  khung luân phiên — đó là đối chiếu đúng, không phải gán phạm vi. Nguồn
  của bài đã ghi mẫu thuộc OFF-H3-43 （并列复句） kèm mốc kiểm trực quan
  trang 391. ĐÚNG.

### 1b. Trang in 391 — 概数表达法2 là hai cách độc lập: ĐẠT
Ảnh: hàng `概数表达法2` gồm `(1) 用"大概"表示概数` và `(2) 相邻数词连用表示概数`
— hai cách đánh số riêng, không có dấu hiệu yêu cầu dùng đồng thời.

Đọc lại toàn bộ `approx-numbers-2.json` sau sửa (content_version 2):
- `when_to_use` ghi tường minh hai cách "ĐỘC LẬP với nhau, dùng riêng từng
  cách là đủ, không cần kết hợp cả hai trong một câu".
- `formula_notes` trình bày Mẫu 1 （大概） và Mẫu 2 (hai số kề nhau) tách
  bạch; trường `pattern` nối hai mẫu bằng dấu •, không phải công thức gộp.
- Cả 5 bài tập đều chỉ dùng một cách trong đáp án đúng (apx-ex1/ex4 dùng
  大概； apx-ex2/ex3/ex5 dùng hai số kề nhau); không bài nào ép dùng đồng
  thời và không bài nào chấm sai đáp án chỉ dùng một cách.
Khiếm khuyết "công thức bắt buộc không có trong nguồn" của lô trước đã
được sửa thật, không còn sót.

### 1c. Trang in 388 — OFF-H2-61 có đúng 3 dòng: ĐẠT
Ảnh trang 388 (khối 数的表达法）: `概数表达法1: (1) 用"几"表示概数
(2) 数词+多+量词 (3) 数词+量词+多` — đúng ba dòng, không hơn.
`approx-numbers-1` phủ đúng ba mẫu đó, không dạy thêm cách nào ngoài phạm
vi (xem chấm chi tiết ở Phần 2). Catalogue `OFF-H2-61` = covered,
lesson_ids [approx-numbers-1], note ghi mốc kiểm trực quan trang 388.

### 1d. Trang in 389 — 程度副词 đủ 8 thành viên: ĐẠT
Ảnh trang 389 tự render (chân trang "389", đầu bảng HSK三级语法）: hàng
程度副词 đọc là `比较、还³、更、特别、挺、有些、越、极` — đếm trực tiếp
được 8 thành viên, gồm cả 还 mà bản ghi cũ bỏ sót.

- Catalogue `OFF-H3-12`: title đã đủ 8, status covered, note ghi nguồn
  trực quan và cách xử lý từng từ. ĐÚNG.
- `adverbs-degree-hsk3` dạy trọng tâm 5 từ chưa có bài （比较/特别/挺/
  有些/极 — 极 ở mức nhận biết văn phong); 更/还 chỉ xử lý ở mức ranh
  giới. QA tự kiểm chứng: bài `bi-comparison-2` thật sự dạy khung
  `比 + 更/还 + tính từ` nên phần "đã phủ ở bài cũ" là có thật; 越 đã phủ
  qua mẫu 越……越…… ở `yue-patterns`. Cách chia này hợp lý và note
  catalogue mô tả trung thực. (Một điểm truy vết nhỏ ghi ở Hoàn thiện
  H-1, Phần 2.)

### 1e. Trang in 390 — khối 固定格式 và OFF-H3-26: ĐẠT
Ảnh trang 390 tự render (chân trang "390"): khối 固定格式 chứa hàng
`（在）……以前/以后/前/后` và hàng riêng `X什么（啊）`, cạnh các hàng
越……越…… / 该……了 / 在……上/下/中…
- `time-frame-patterns` chỉ dạy đúng mẫu mốc thời gian, khớp hàng của nó;
  `when_to_use` tự giới hạn phạm vi trong giỏ và nói rõ X什么（啊） để sau.
- Catalogue `OFF-H3-26` giữ **partial**; note liệt kê đúng: đã phủ
  越……越…… và （在）……以前/以后/前/后； chưa dạy thành bài:
  **X什么（啊）**; hai thành viên còn lại được ghi nguồn phủ chéo
  （在……上/下/中 qua location-nouns; 该……了 qua bài của OFF-H3-04)
  và không tính trùng vào bài của mục này. TRUNG THỰC.

### 1f. Trang in 391 — OFF-H3-07 thu hẹp đúng phạm vi: ĐẠT
Ảnh trang 391: hàng 疑问句 (nhóm 句类） chỉ có `"怎样+动词"的特指问句`.
- Catalogue `OFF-H3-07`: title đã thu hẹp thành "Câu hỏi đặc chỉ với
  怎样+动词"; note phân biệt đúng với dòng 怎样 trong danh sách từ để
  hỏi ở bảng từ loại (trang in 389 — QA thấy dòng đó trên ảnh 389, thuộc
  phạm vi từ loại, không thuộc mục kiểu câu).
- `zenme-yang-question` chỉ dạy 怎样+động từ； 怎么/怎么样 chỉ xuất hiện
  để phân biệt chọn từ, trên nền đã học ở HSK1 (bài tự nói rõ "không dạy
  lại"). Không vượt phạm vi.

### 1g. Tự đếm lại catalogue và số bài (không chép số của ND)
Đếm trực tiếp từ hai file catalogue:
- HSK2: **20 covered / 15 partial / 27 missing** (62 mục) — khớp ND báo.
- HSK3: **29 covered / 4 partial / 17 missing** (50 mục) — khớp ND báo.
- HSK1 không đổi 25/10/17; HSK4 không đổi 1 covered / 33 missing.
Đếm từ `data/lessons-manifest.json`: **HSK1 20, HSK2 17, HSK3 30, HSK4 1
= 68 bài** — khớp ND báo. Vị trí manifest: approx-numbers-1 ở cuối khối
HSK2; approx-numbers-2 trong khối HSK3; ba bài mới còn lại ở cuối khối
HSK3 trước complex-choice. Tài liệu ánh xạ HSK1–2 cũng đã cập nhật
OFF-H2-61.

---

## Phần 2 — Chấm 4 bài mới

### approx-numbers-1 (HSK2, OFF-H2-61): ĐẠT
- Ba mẫu trong công thức, ví dụ, bài tập khớp đúng ba dòng của trang 388:
  几+量词 (gồm 几十/几百）, Số tròn+多+量词， Số+量词+多.
- 5/5 bài tập đáp án duy nhất và đúng: apx1-ex1 （几本书 — các phương án
  còn lại sai vị trí/thiếu lượng từ), apx1-ex2 （两个多小时， mẫu 3),
  apx1-ex3 (khối sai 多 ở cuối cụm), apx1-ex4 （十多块钱， mẫu 2),
  apx1-ex5 （几十支笔）.
- Nhất quán nội bộ: phân biệt hai vị trí của 多 （二十多个人 = 21–29;
  三个多小时 = hơn 3 tiếng một ít) trình bày giống nhau ở công thức,
  confusion 3 (verdict doi_nghia — đúng, câu không sai ngữ pháp) và
  quick_memory. Khẳng định "số tròn" cho mẫu 2 khớp mọi ví dụ/bài tập.
- Liên kết tiên quyết hai chiều CÓ THẬT trong nội dung: `when_to_use`
  của bài này dẫn lên approx-numbers-2 ở HSK3, và `when_to_use` của
  approx-numbers-2 dẫn ngược về bài này (mục OFF-H2-61) như nền. Bài
  cũng phân biệt đúng 几 ước lượng với 几 để hỏi (question-words).

### zenme-yang-question (HSK3, OFF-H3-07): ĐẠT (1 điểm Hoàn thiện)
- 5/5 bài tập đáp án duy nhất, đúng vị trí 怎样 ngay trước cụm động từ;
  zyq-ex2 kiểm tra chọn 怎么样 cho câu hỏi tình hình — đúng ranh giới.
- Ranh giới ba từ trình bày mềm, không nói cứng: công thức bước 3 thừa
  nhận 怎么/怎样 "nhiều khi thay nhau được" trong câu hỏi cách làm đơn
  giản; confusion về 怎么样？ cuối câu dùng verdict kem_tu_nhien (không
  gán sai ngữ pháp); hai confusion còn lại gán sai_ngu_phap cho
  怎么样+động từ và 怎样 đứng trước chủ ngữ — cả hai đúng.
- **Hoàn thiện Z-1:** zyq-ex5 (điền ___才能考好HSK3?) chỉ nhận 怎样.
  Câu hỏi có nêu tín hiệu "giọng trang trọng" để khóa đáp án theo mẫu
  đang luyện nên không phải lỗi chấm; tuy vậy lời giải không nhắc rằng
  怎么才能……？ cũng là câu đúng ngoài khung bài, trong khi chính công
  thức bước 3 thừa nhận hai từ nhiều khi thay nhau được. Nên bổ sung
  một câu ghi nhận trong explanation cho khớp với công thức.

### time-frame-patterns (HSK3, thành viên của OFF-H3-26): ĐẠT
- Công thức （ mốc + 以前/以后/前/后； dạng gọn 前/后 sau mốc ngắn/thời
  gian; khung đứng trước việc chính, chủ ngữ đứng trước hoặc sau khung)
  khớp toàn bộ ví dụ và đáp án; quick_memory tóm đúng.
- Bài tập có biến thể chấp nhận rộng và đúng: tfp-ex4 nhận cả 前 và
  以前 sau 一年； tfp-ex5 nhận cả 看完电影以后 (biến thể có yếu tố hoàn
  thành trong mốc) — tránh lỗi "đáp án duy nhất giả".
- Về lưu ý 了/的 với mốc là cụm hành động: bài không hề khẳng định cấm
  thêm 了 trong mốc, và đáp án chấp nhận ở ex5 cho thấy điều đó; 的
  thuộc cách dùng định ngữ khác （以前的事）, ngoài phạm vi hàng này.
  Không có khẳng định sai và không thiếu lưu ý nào gây lỗi.
- Phân biệt thời gian/không gian （以前 chỉ mốc thời gian; vị trí dùng
  前面 — confusion 3) nhất quán với bài location-nouns đã học.

### adverbs-degree-hsk3 (HSK3, OFF-H3-12): ĐẠT (2 điểm Hoàn thiện)
- Nội dung dạy đúng và trình bày trung thực về 极： bài nói rõ 极 trước
  tính từ là văn viết trang trọng (confusion 2 verdict khac_van_phong,
  không gán sai ngữ pháp), khẩu ngữ dùng …极了 — khớp bài
  degree-complement-1 đã học.
- Sắc thái các từ được rào bằng "thường/hay": 有些 đi với điều chưa như
  ý (confusion 1 verdict kem_tu_nhien), 挺 khẩu ngữ hay đi với 的 ở
  cuối, 比较 trung tính. Không có khẳng định tuyệt đối sai.
- 5/5 bài tập đáp án duy nhất theo đúng ý đề (mức độ + văn phong được
  nêu trong prompt), lời giải khớp công thức; adg-ex4 bắt đúng khối 挺
  trong khung 比.
- **Hoàn thiện H-1 (truy vết catalogue):** OFF-H3-12 đạt covered một
  phần nhờ phủ chéo （更/还 ở bi-comparison-2, 越 ở yue-patterns) —
  điều này có ghi trong note nhưng `lesson_ids` chỉ liệt kê
  [adverbs-degree-hsk3]. Để truy vết nhất quán với cách làm ở
  OFF-H3-42/43, nên bổ sung hai bài hỗ trợ vào lesson_ids.
- **Hoàn thiện H-2:** trường `pattern` của bài liệt kê 极 trong cùng
  ô vị trí trước tính từ với các phó từ khẩu ngữ mà không kèm dấu hiệu
  văn viết — nếu chỉ đọc dòng pattern sẽ lệch với chính nội dung bài.
  Nên thêm ghi chú văn phong ngay ở pattern hoặc bỏ 极 khỏi pattern
  và giữ ở phần phân biệt.

---

## Phần 3 — Kiểm tra hệ thống (chạy thật): ĐẠT

| Kiểm tra | Kết quả |
|---|---|
| `python3 scripts/validate.py` | ĐẠT: 68 bài, 68 published, 333 bài tập |
| `python3 -m unittest discover -s tests` | 9 tests, OK |
| `node --test tests/test_fsrs.mjs` | 7 pass / 0 fail |
| `node --check app.js` | OK |
| `tests/browser-check.mjs` (http.server 8901 + chrome-headless-shell) | **19/19 PASS**, console-errors: 0 lỗi |

Ghi chú phạm vi: việc điều tra hiện tượng kẹt màn hình tải thuộc tuyến
riêng của agent Code — QA lô này không đánh giá và không kết luận gì về
nó. Harness trên chạy bản local; nghiệm thu live sau merge là bước của
Manager như thường lệ.

---

## Điều kiện và khuyến nghị

- Phát hành: **không bị chặn** bởi QA. Ba điểm Hoàn thiện (Z-1, H-1,
  H-2) nên xử lý ở vòng sửa ngắn cùng lô hoặc ghi nhận để lô sau, theo
  quyết định của Manager; không điểm nào làm sai lệch nội dung đang
  hiển thị cho người học ở mức Quan trọng trở lên.
- Trạng thái phủ sau lô (QA đã tự đếm): HSK3 còn 17 mục missing + 4
  partial; HSK2 còn 27 missing + 15 partial — tiếp tục theo danh sách
  2b như checkpoint.

## Phúc tra sau vòng sửa (2026-10-30)

Phúc tra đúng 3 điểm Hoàn thiện của vòng 1; validator chạy lại ĐẠT (68 bài, 333 bài tập).

- Z-1 — ĐẠT: explanation của zyq-ex5 (zenme-yang-question) đã ghi nhận rõ câu hỏi dùng 怎么才能……？ cũng đúng trong tiếng Trung thật, chỉ khác mẫu 怎样 đang luyện nên đáp án tại bài chỉ nhận 怎样； đáp án (accepted: 怎样） và verdict không đổi; content_version đã tăng lên 2.
- H-1 — ĐẠT: OFF-H3-12 trong catalogue nay có lesson_ids [adverbs-degree-hsk3, bi-comparison-2, yue-patterns] (liệt kê đầy đủ mọi bài dạy thành viên của mục, gồm bài so sánh và bài 越……越……), status vẫn covered; file JSON hợp lệ.
- H-2 — ĐẠT: adverbs-degree-hsk3 đã gắn dấu hiệu văn viết cho 极 nhất quán ở cả tiêu đề bài （极（văn viết）) và công thức ("极 đặt trước tính từ chỉ thuộc văn viết trang trọng"); các phần khác không đổi, không phát sinh mâu thuẫn.

Kết luận phúc tra: 3/3 ĐẠT; lô đủ điều kiện phát hành trong phạm vi phúc tra này.
