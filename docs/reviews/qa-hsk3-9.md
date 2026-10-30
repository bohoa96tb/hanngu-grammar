# QA độc lập — Lô HSK3-9 (4 bài phó từ/mẫu cố định + catalogue + mapping)

- Ngày: 2026-10-30
- Người kiểm: agent QA độc lập (không phải agent Nội dung; mọi phạm vi đều tự kiểm từ bản gốc)
- Đối tượng: `fixed-pattern-shenme`, `adverbs-frequency-hsk3`, `adverbs-scope-hsk3`,
  `adverbs-mood-hsk3`; `docs/official-catalogue-hsk3-hsk4.json`;
  `docs/baseline-hsk3-hsk4-mapping.md`
- QA không tự sửa nội dung; các lỗi dưới đây chuyển agent sửa riêng / Manager.

## Kết luận: ĐẠT CÓ ĐIỀU KIỆN

Điều kiện: (1) sửa khóa đáp án amd-ex4 (lỗi Q1); (2) Manager quyết định về
OFF-H3-14 / 才¹ (lỗi Q2) — nếu bổ sung 才¹ vào mục thì cập nhật trạng thái và
số đếm trong cùng lô. Ba điểm Hoàn thiện không chặn phát hành.

---

## PHẦN 1 — Xác minh phạm vi từ PDF gốc (tự render pdftoppm, tự đọc ảnh)

Trang in 389 = PDF 392; trang in 390 = PDF 393. Nguyên văn các hàng liên quan:

| Hàng | Nguyên văn trên bản in | Kết quả |
|---|---|---|
| 频率副词 | 总、总是、又、常常 | Đúng 4 thành viên — khớp kỳ vọng |
| 范围副词 | 就³、一块儿、一共、只、到处、只是 | Đúng 6 thành viên, **có 就** (mang số 3) — catalogue cũ thiếu 就 là thật |
| 语气副词 | 当然、其实、终于、才²、才³、就⁴ | Đúng như kỳ vọng: 5 từ, 才 có hai nghĩa đánh số 2/3, 就 nghĩa số 4 |
| 时间副词 | **才¹、马上、先、一会儿、刚、刚刚、一直** | **7 thành viên, CÓ 才¹ (nghĩa thời gian), đứng đầu hàng** — xem lỗi Q2 |
| X什么（啊） (trang in 390) | Hàng "X什么（啊）" nằm trong khối **固定格式** của HSK3 (cùng khối: 除了……、从……起、对……来说、一……也/都+不/没……、一点儿也不、越……越……、（在）……以前/以后/前/后、该……了、在……上/下/中） | Khớp khẳng định của agent Nội dung |

Bổ sung: hàng 时间副词 xác nhận độc lập điểm agent Nội dung đã nêu cho
Manager — catalogue OFF-H3-14 hiện định nghĩa giỏ chỉ 6 thành viên
（马上/先/一会儿/刚/刚刚/一直）, thiếu 才¹ so với bản gốc.

## PHẦN 2 — Nội dung 4 bài

### Đã kiểm và đạt
- Phủ phạm vi: cả 4 bài phủ đúng/đủ thành viên theo bản gốc đã xác minh ở
  Phần 1, không đưa cấu trúc ngoài đề cương vào vị trí cấu trúc chính
  (phần "mở rộng hay gặp" 有什么好怕的？ ở fixed-pattern-shenme được ghi rõ
  là mở rộng).
- Ranh giới chống dạy trùng — đã đọc trực tiếp các bài cũ:
  - rhetorical-question chỉ dạy phản vấn nguyên câu 不是……吗？/怎么……呢？,
    không dạy mẫu X什么 — ranh giới của fixed-pattern-shenme đúng.
  - complex-parallel dạy 又……，又……（đồng thời）; bài tần suất phân biệt rõ
    với 又 "lại" — đúng.
  - complex-condition (只有……，才……) và zenme-yang-question (……才能……):
    bài ngữ khí chỉ *nhắc phân biệt*, không dạy lại nghĩa điều kiện — đúng
    tuyên bố.
  - **Nghĩa thời gian của 才 （他十点才来 kiểu "mãi đến… mới"): xác nhận
    CHƯA bài nào dạy.** Quét toàn bộ 72 bài: mọi ví dụ/bài tập chứa 才 chỉ
    thuộc complex-condition/zenme-yang-question (nghĩa điều kiện) và chính
    bài ngữ khí (vai ngữ khí + một confusion nhắc phân biệt). adverbs-time-hsk3
    không chứa mẫu này （才 trong bài đó chỉ xuất hiện trong 刚才）.
  - 一起: khẳng định "đã gặp trong nhiều câu mẫu" của bài phạm vi là đúng
    （一起 xuất hiện trong ví dụ của 8 bài cũ).
- Verdict dùng trong lô (thay_duoc_co_dieu_kien, kem_tu_nhien) nằm trong
  danh sách cho phép của docs/schema.md + scripts/validate.py và có nhãn
  hiển thị trong app.js (VERDICT_LABELS) — hiển thị đúng.
- hsk_evidence của 4 bài (verified, không note): trung thực — QA đã tự
  tái xác minh trực quan cả hai trang nên trạng thái verified có căn cứ.
- Nhất quán nội bộ công thức ↔ ví dụ ↔ đáp án ↔ Nhớ nhanh: đạt ở cả 4 bài,
  trừ lỗi Q1 dưới đây. Các khẳng định tuyệt đối đã rà: bài tần suất nói
  "không nói 不常常" (đúng chuẩn), bài phạm vi xử lý 只/只是 bằng verdict
  thay_duoc_co_dieu_kien thay vì kết luận cứng (đúng mức), bài ngữ khí
  không kết luận câu chờ đợi ngắn là "sai ngữ pháp" mà dùng kem_tu_nhien.

### Lỗi

**Q1 — [Quan trọng] adverbs-mood-hsk3, bài tập amd-ex4: khóa đáp án không
duy nhất, mâu thuẫn công thức của chính bài.**
Câu điền: 我___不去呢！你们去吧。 — accepted_answers chỉ có "才". Nhưng
formula_notes bước 4 của chính bài dạy khung "Chủ ngữ + **才/就** + 不/没 +
Động từ + 呢" và when_to_use nêu 他就是不听 ở cùng vai quả quyết. Câu
我就不去呢！ đúng ngữ pháp, đúng nghĩa quả quyết của prompt, nhưng sẽ bị
chấm sai. Hướng sửa (agent sửa chọn): thêm "就" vào accepted_answers, hoặc
thu hẹp prompt/hint để chỉ còn 才 hợp lệ.

**H1 — [Hoàn thiện] Hai thành viên giỏ không có ví dụ riêng ở mục C.**
就⁴ (ngữ khí) trong adverbs-mood-hsk3 và 只是 trong adverbs-scope-hsk3
không có câu ví dụ riêng trong 5 ví dụ; cả hai vẫn được dạy ở mục A/B
（他就是不听 nêu trong when_to_use; 只是 ở công thức bước 2 + confusion 1)
và có bài tập chạm tới (amd-ex5, asc-ex2) nên không phải lỗ hổng phủ —
nhưng nếu khung 5 ví dụ cho phép cơ cấu lại, nên có ví dụ riêng cho đủ
chuẩn "mỗi thành viên một ví dụ".

**H2 — [Hoàn thiện] adverbs-mood-hsk3: 2/5 bài tập choice có đáp án đúng
trùng nguyên văn ví dụ** (amd-ex1 ← ví dụ 2; amd-ex2 ← ví dụ 3). Mẫu phổ
biến của dự án là đúng 1 bài/bài ở mức Nhận biết (36/68 bài cũ), thường là
ex1. Nên đổi cách diễn đạt một trong hai câu để bài tập kiểm tra vận dụng
quy tắc thay vì nhớ lại ví dụ. (asc-ex1 của bài phạm vi có 1 câu như vậy —
nằm trong chuẩn chung, không tính lỗi.)

**H3 — [Hoàn thiện] fixed-pattern-shenme, confusion 1 + giải thích shm-ex1:
diễn đạt tuyệt đối hơn công thức của chính bài.** Confusion/giải thích nói
câu có chủ ngữ 你 (你看什么？/你怕什么？) "là câu hỏi thật", trong khi
formula_notes bước 4 đã chừa đường "thường". Ngoài đời, 你怕什么？ nói với
ngữ điệu vẫn có thể mang ý bác bỏ. Đáp án khóa vẫn đúng (mẫu bác bỏ rõ ràng
là 怕什么啊？), chỉ nên mềm hoá diễn đạt cho khớp công thức ("ở dạng viết
trung tính, không 啊/không lặp động từ thì đọc là câu hỏi thật").

## PHẦN 3 — Đồng bộ tài liệu (tự đếm từ file, không chép số báo)

- Đếm trực tiếp từ `docs/official-catalogue-hsk3-hsk4.json`:
  **HSK3: 33 covered / 3 partial / 14 missing (tổng 50)** — khớp số agent
  Nội dung báo; **HSK4: 1 / 0 / 33** không đổi. Chưa phủ đủ = 17 mục
  (14 + 3), khớp §2b.
- 3 mục partial đúng như mapping §2 ghi: OFF-H3-45 （虽然……，可是……),
  OFF-H3-21 （把/被）, OFF-H3-25 (cụm cố định).
- OFF-H3-13: title đã sửa thêm 就， status covered, lesson_ids
  [adverbs-scope-hsk3], note ghi bằng chứng trang in 389 ✓.
  OFF-H3-18: title đã sửa thêm 就， covered, lesson_ids
  [adverbs-mood-hsk3], note phân biệt rõ các nghĩa khác của 才/就 ✓.
- OFF-H3-26: covered, lesson_ids [yue-patterns, time-frame-patterns,
  fixed-pattern-shenme] ✓; hai thành viên còn lại của giỏ được note truy
  vết （该……了 qua modal-verbs-hsk3 — QA kiểm tra chéo: bài đó có dạy
  该+động từ+了，该回家了/该走了 ✓; 在……上/下/中 qua location-nouns ✓).
- Mapping §1 (mốc HSK3-9), §2, §2b nhất quán với catalogue; lý do để lại
  OFF-H3-11 (danh sách dài, cần vòng chọn lọc tần suất) và OFF-H3-17
  (nghĩa trừu tượng, cần thiết kế bài phân biệt sắc thái) đã ghi rõ ở §2b ✓.
- Manifest: 72 bài (HSK1 20, HSK2 17, HSK3 34, HSK4 1); vị trí 4 bài mới
  đúng như báo (frequency+scope sau adverbs-time-hsk3; shenme sau
  time-frame-patterns; mood sau adverbs-degree-hsk3, trước complex-choice) ✓.

**Q2 — [Quan trọng] OFF-H3-14: định nghĩa giỏ trong catalogue thiếu 才¹ —
chờ quyết định Manager.** Title/note của OFF-H3-14 chỉ liệt kê 6 thành
viên và ghi status covered, trong khi hàng 时间副词 ở trang in 389 có 7
thành viên gồm 才¹ (xem Phần 1), và nghĩa thời gian của 才 chưa bài nào
dạy (xem Phần 2). Agent Nội dung đã khai báo minh bạch điểm này trong bàn
giao, nhưng catalogue/mapping hiện chưa ghi. Nếu Manager quyết định bổ
sung 才¹ vào OFF-H3-14, trạng thái phải xét lại covered → partial và số
đếm HSK3 thành 32/4/14 (18 mục chưa phủ đủ); nếu theo dõi ở nơi khác, cần
ghi rõ nơi đó. Để nguyên như hiện tại sẽ là phủ quá sự thật so với phạm vi
đề cương. Lỗi này thuộc tài liệu đối chiếu, không thuộc nội dung 4 bài mới.

## PHẦN 4 — Hệ thống (tự chạy)

- `python3 scripts/validate.py` → **ĐẠT: 72 bài, 72 published, 353 bài tập**.
- `python3 -m unittest discover -s tests` → **9 tests OK**.
- `node --test tests/test_fsrs.mjs` → **7 pass / 0 fail**.
- `tests/browser-check.mjs` (http.server 8901 + chrome-headless-shell):
  **PASS 19/19, 0 lỗi console/exception**.
- Kiểm tra tĩnh phụ trợ: đáp án choice của 4 bài đều nằm trong options;
  khối sai của error_spot đều là khối thật trong câu; không ví dụ nào
  trùng nhau trong cùng bài.

---

## Phúc tra vòng sửa (2026-10-30, agent QA — chỉ kiểm lại 5 điểm đã sửa)

**Kết luận phúc tra: 5/5 điểm ĐẠT. Không còn điểm chặn; lô sẵn sàng phát hành.**

**Q1 — ĐẠT.** amd-ex4 nay là choice trên khung 这才是… (đề: khẳng định
"Đây mới chính là cách làm đúng."), khóa duy nhất 这才是对的做法。 Rà từng
phương án nhiễu như học viên: 这当然是对的做法 ĐÚNG ngữ pháp nhưng nghĩa
là "đương nhiên là cách làm đúng" (khẳng định điều hiển nhiên) — không
mang ý phân biệt "mới chính là" mà đề yêu cầu, nên không phải đáp án thứ
hai; 这才不是对的做法 lật thành phủ định; 这是才对的做法 sai vị trí 才.
Biến thể cũng đúng 这就是… KHÔNG có trong options (đúng chủ ý của vòng
sửa — confusion 2 của bài vẫn ghi cả hai đều đúng), nên câu hỏi không
gây tranh cãi. Khung 才/就 + 不…呢 không còn bài tập nào khóa mâu thuẫn:
công thức bước 4 dạy cả hai, ví dụ có cả 我才不怕呢 （才） và 他就是不听
（就）, không exercise nào chấm khung này theo một từ duy nhất nữa.

**Q2 — ĐẠT.** Catalogue OFF-H3-14: title đã gồm 才¹, status = partial,
note ghi đủ (phủ 6/7, thành viên thiếu là 才¹ "mãi đến lúc đó mới" —
他十点才来， theo dõi ở §2b) và có câu hiệu chỉnh thay thế nhận định cũ.
adverbs-time-hsk3: hsk_evidence = partial, note 164 ký tự (trong giới
hạn 20–220). Mapping nhất quán ở cả ba chỗ: §1 ghi hiệu chỉnh ĐÃ CÓ →
MỘT PHẦN kèm câu "nhận định 'đã có' của lô HSK3-7 bị thay thế"; §2 có
OFF-H3-14 trong danh sách một phần kèm lý do; §2b mở đầu bằng hiệu
chỉnh THAY THẾ và liệt kê OFF-H3-14 ở phần "Để lại" kèm hướng phủ ở lô
sau. Tự đếm lại trực tiếp từ file catalogue: **HSK3 = 32 covered /
4 partial / 14 missing (tổng 50)** — chưa phủ đủ 18 mục, khớp kỳ vọng;
HSK4 không đổi 1/0/33.

**H1 — ĐẠT.** Ví dụ mới cho 就⁴: 他就是不听。 (adverbs-mood-hsk3, ví dụ 6)
— đúng ngữ pháp, 就是 nhấn khẳng định/cố ý đúng vai ngữ khí của 就⁴ như
when_to_use mô tả, tokens nối khớp nguyên văn. Ví dụ mới cho 只是：
他只是累了，不是生病。 (adverbs-scope-hsk3, ví dụ 6) — đúng ngữ pháp,
只是 mang sắc thái mềm/thanh minh "chỉ mệt thôi, chứ không phải…" đúng
công thức bước 2, tokens nối khớp nguyên văn.

**H2 — ĐẠT.** amd-ex2 đã viết lại: 飞机晚点了三个小时，我们终于上了飞机。
Khóa vẫn duy nhất: 当然/其实 không mang nghĩa "chờ lâu mới thành" mà đề
yêu cầu; phương án cuối thiếu phó từ ngữ khí. Đếm lại số choice có đáp
án đúng trùng nguyên văn ví dụ trong bài: nay chỉ còn **1** (amd-ex1 ←
ví dụ 2 其实，这件事很简单。) — đúng chuẩn dự án.

**H3 — ĐẠT.** Confusion 1 của fixed-pattern-shenme đã bỏ khẳng định
tuyệt đối: "không có 啊 và không lặp động từ thì **thường** là câu hỏi
thật… (ngữ điệu mạnh ngoài đời vẫn có thể làm nó nghe như bác bỏ)".
Giải thích shm-ex1 cũng đã mềm hoá: "ở dạng viết trung tính **thường**
là câu hỏi thật" — khớp mức "thường" của công thức bước 4 ("câu hỏi
thật thường có chủ ngữ…"). Khóa shm-ex1 không đổi （怕什么啊？) và vẫn
đúng — là phương án bác bỏ duy nhất trong bốn options.

**Validator sau vòng sửa:** `python3 scripts/validate.py` → **ĐẠT:
72 bài, 72 bài published, 353 bài tập.** Các sửa không phá cấu trúc.
