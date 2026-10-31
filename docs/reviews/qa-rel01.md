# QA ĐỘC LẬP — REL-01 pilot "Bài liên quan" (`related_ids`)

- Ngày kiểm tra: 2026-10-31
- Vai trò: Agent QA độc lập. Không sửa file nào ngoài báo cáo này. Mọi khẳng định dưới đây do QA tự kiểm chứng từ dữ liệu/mã thật và lệnh tự chạy, không dựa vào lời khẳng định của Agent Nội dung/Code.
- Tiêu chí gốc: `docs/decisions.md` D27; `docs/research/feature-gap-matrix.md` mục G-01; báo cáo bị kiểm tra: `docs/reviews/rel01-pairs.md`.

## KẾT LUẬN: PASS

Không phát hiện lỗi Nghiêm trọng hay Quan trọng. Có 3 ghi nhận mức Hoàn thiện (không chặn merge) ở cuối báo cáo.

Số liệu chính do QA tự đếm từ `data/lessons/*.json` qua manifest: **72 bài, 72 published, 353 bài tập; 37 bài có `related_ids`; 29 cặp duy nhất; tối đa 3 liên kết/bài; lỗi đối xứng/tồn tại/trùng/tự trỏ/published = 0**. Validator ĐẠT; unittest 14/14; FSRS 7/7; harness trình duyệt local **20/20 PASS** gồm `related-lessons`.

---

## 1. Nội dung/sư phạm — đối chiếu bằng chứng của 29 cặp

QA đọc `rel01-pairs.md` rồi tự mở dữ liệu thật (trường `when_to_use`/`objective`/`formula_notes`/`confusions`/`review.notes`/`sources` của hai bài trong cặp) cho **22 cặp** — vượt yêu cầu tối thiểu 10 — rải đủ các họ được giao: họ 了, họ bổ ngữ, họ phó từ HSK3, họ câu phức, cặp 把/被, cặp 越/mức độ. Kết quả: **mọi lý do/bằng chứng Agent Nội dung nêu đều có thật trong dữ liệu**, không phát hiện trích dẫn bịa.

Các cặp đã kiểm chứng trực tiếp (bằng chứng QA tự trích):

| Cặp | Bằng chứng QA tự tìm thấy trong dữ liệu thật |
|---|---|
| le-completion-change ↔ le-sentence-final-change (#1) | `le-sentence-final-change.review.notes`: "bài mới tách từ le-completion-change theo D26"; `le-completion-change.when_to_use` trỏ sang bài "了 cuối câu…"; confusion của bài cuối câu đối chiếu 我买了书 (了 sau động từ) |
| guo-experience ↔ le-completion-change (#2) | `guo-experience.formula_notes` bước 2 nguyên văn: "了 nói hành động hoàn thành trong một khung thời gian; 过 nói kinh nghiệm từng có"; `objective`: "phân biệt 过 với 了"; `confusions[0]` dùng mẫu 我去了中国 |
| ba-sentence-1 ↔ bei-passive-1 (#9) | `ba-sentence-1.formula_notes` bước 3: "khác câu bị động với 被"; confusion của ba dùng câu 被 làm ví dụ sai ý; `bei-passive-1.formula_notes` bước 1: "ngược với câu chữ 把". Catalogue OFF-H3-21 liệt kê cả hai bài (QA tự kiểm `docs/official-catalogue-hsk3-hsk4.json`) |
| result-complement ↔ potential-complement-1 (B1) + potential-complement-1 ↔ state-complement-de (#5) | `potential-complement-1.when_to_use` nguyên văn cả hai vế: "ghép động từ với bổ ngữ kết quả đã học ở bài Bổ ngữ kết quả dạng 1 (完/懂/错), và dùng lại chữ 得 đã gặp ở bài Bổ ngữ trạng thái với 得" |
| yue-patterns ↔ adverbs-degree-hsk3 (#18) + bi-comparison-2 ↔ adverbs-degree-hsk3 (B4) | `adverbs-degree-hsk3.when_to_use` phân biệt mẫu 越……越…… của yue-patterns và 更/还 của bi-comparison-2; catalogue OFF-H3-12 liệt kê cả ba bài (adverbs-degree-hsk3, bi-comparison-2, yue-patterns) — QA tự kiểm |
| adverbs-degree-hsk3 ↔ degree-complement-1 (B5) + degree-complement-1 ↔ state-complement-de (B6) | degree: confusion nhắc "…极了 (đã học ở bài degree-complement-1)"; degree-complement-1 `formula_notes` bước 4: "跑得很快 (bài state-complement-de) mô tả hành động chạy diễn ra thế nào" |
| complex-hypothesis ↔ complex-condition (#16) | hypothesis `when_to_use`/`confusions` đối chiếu trực tiếp 只有……，才…… của condition; cùng mục OFF-H3-47 theo báo cáo |
| hai-shi-choice ↔ complex-choice (#17) | `complex-choice` confusion nguyên văn: "还是 chỉ nối phương án trong câu hỏi lựa chọn (bài hai-shi-choice)" |
| adverbs-time-hsk3 ↔ adverbs-frequency-hsk3 (#14) | frequency `when_to_use` phân biệt 一直 "ở bài adverbs-time-hsk3" theo id |
| adverbs-scope-hsk3 ↔ adverbs-mood-hsk3 (#15) | scope `when_to_use`: "khác 就 nhấn thái độ ở bài adverbs-mood-hsk3" |
| approx-numbers-1 ↔ approx-numbers-2 (#10) + approx-numbers-1 ↔ question-words (B3) | approx-1 `when_to_use` nhắc cả hai chiều: lên HSK3 học tiếp ở approx-numbers-2, và 几 để hỏi "đã học ở bài question-words" |
| shi-de-emphasis ↔ shi-de-attitude (#8) | attitude `when_to_use`: "Dạng 2 của 是……的… Khác dạng 1 (bài shi-de-emphasis)"; catalogue OFF-H3-39 liệt kê cả hai — QA tự kiểm |
| cunxian-chu ↔ cunxian-appearance (#7) + zhe-continuation ↔ cunxian-chu (B2) | appearance `formula_notes` bước 5: "khác tồn hiện tĩnh (cunxian-chu)"; zhe `when_to_use` + `formula_notes` bước 2 + `review.notes` đều trỏ mẫu 存现 đầy đủ sang cunxian-chu; catalogue OFF-H3-38 liệt kê cả hai bài cunxian — QA tự kiểm |
| modal-hui-neng-keyi ↔ modal-xiang-yao (#12), ↔ modal-verbs-hsk3 (#13), modal-xiang-yao ↔ modal-verbs-hsk3 (B8) | `modal-verbs-hsk3.when_to_use` nguyên văn: "modal-xiang-yao đã dạy 想/要 (muốn) và modal-hui-neng-keyi đã dạy 会/能/可以 (có thể) — bài này chỉ đối chiếu khi cần phân biệt, không dạy lại"; xiang-yao `confusions[2]` đối chiếu xin phép bằng 可以 |

### Soi riêng 3 cặp "bổ sung" rủi ro nhất (theo phán đoán QA)

1. **B9 modal-verbs-hsk3 ↔ state-complement-de** — rủi ro cao nhất: quan hệ *chỉ* qua chữ 得 đa âm. QA xác nhận bằng chứng có thật: `modal-verbs-hsk3.formula_notes` bước 5 ("得 trong bài này đọc děi; khác 得 đọc de sau động từ trong bài state-complement-de (说得很好)") và `confusions[2]` lặp lại kèm id bài đích. Đạt tiêu chí bằng chứng đã chốt ở D27 (phân biệt ở confusions/công thức) và có ích thực tế (đọc sai âm → hiểu nhầm cấu trúc), nên **chấp nhận**, nhưng đây là cặp yếu nhất trong 29 — xem ghi nhận Hoàn thiện H-1.
2. **B10 adverbs-scope-hsk3 ↔ complex-hypothesis** — quan hệ qua chữ 就 nối kết quả. Bằng chứng có thật và nằm ngay ở `when_to_use` của scope: "就 ở đây khác 就 nối mệnh đề kết quả trong các khung đã học (如果……就…… ở bài complex-hypothesis)". Đây là ranh giới bắt buộc của chính bài scope, không phải suy diễn từ tiêu đề — **chấp nhận**.
3. **B11 adverbs-mood-hsk3 ↔ complex-condition** — quan hệ qua chữ 才. Bằng chứng có thật: `adverbs-mood-hsk3.when_to_use`: "才 ở đây khác hẳn 才 'chỉ khi… mới' trong 只有……，才…… (bài complex-condition) và ……才能 (bài zenme-yang-question)", lặp lại ở `formula_notes` bước 5 — **chấp nhận**.

Ngoài ra QA kiểm tra thêm cặp bổ sung B7 (potential-complement-1 ↔ modal-hui-neng-keyi): `formula_notes` bước 4 và `confusions[1]` (我不能听懂 vs 我听不懂) đều có thật — quan hệ phân biệt mạnh, chấp nhận.

**Cặp yếu/không nên áp:** ngoài nhận xét H-1 về B9 (yếu nhất nhưng vẫn đạt tiêu chí), **không cặp nào bị QA phản đối**. Danh sách 29 cặp QA tự suy ra từ dữ liệu khớp đúng 29 cặp trong báo cáo; cả 8 cặp bị loại (L1–L8) đều thực sự vắng mặt trong dữ liệu (QA kiểm tra danh sách cặp: không có result-complement-2↔potential, result↔state, cunxian-appearance↔zhe, question-words↔zenme/why, adverbs-du-ye↔time, hypothesis/condition↔complex-suiran-yinwei).

Kiểm tra độc lập bằng script riêng của QA (không dùng mã validator): đối xứng hai chiều đủ, ≤4, không trùng, không tự trỏ, đích tồn tại và published — **0 lỗi**, khớp phần tự kiểm tra mục 4 của `rel01-pairs.md`.

## 2. Phạm vi thay đổi dữ liệu — đối chiếu GitHub main

QA tải bản `main` qua `/opt/hatch/bin/github call-read-tool --name get_file_contents` (ref `main`) cho 3 file đã chạm và so sánh sâu (deep-equal từng khóa) với bản local:

| File | Kết quả |
|---|---|
| `data/lessons/le-completion-change.json` | Chỉ 2 khác biệt: thêm `related_ids = [le-sentence-final-change, guo-experience]`; `content_version` 4 → 5 (đúng +1). Không trường nào khác đổi |
| `data/lessons/adverbs-degree-hsk3.json` | Chỉ 2 khác biệt: thêm `related_ids = [yue-patterns, bi-comparison-2, degree-complement-1]`; `content_version` 2 → 3 (đúng +1) |
| `data/lessons/ba-sentence-1.json` | Chỉ 2 khác biệt: thêm `related_ids = [bei-passive-1]`; `content_version` 4 → 5 (đúng +1) |

`data/lessons-manifest.json` local **giống hệt** bản main. Khẳng định "chỉ thêm `related_ids` + `content_version` +1" của Agent Nội dung: **đúng** trong phạm vi mẫu đã kiểm.

## 3. Mã — render và validator

### app.js (render, dòng 416–421 và 464–466)

- **Id không tồn tại bị bỏ qua an toàn: ĐÚNG.** `related` = `(Array.isArray(les.related_ids) ? les.related_ids : []).map(rid => lessonById(rid)).filter(Boolean)`; `lessons` chỉ chứa bài `published` (dòng 1009: `lessons = all.filter(l => l.status === "published")`), nên id không tồn tại/chưa published cho `undefined` và bị lọc, không lỗi.
- **Rỗng/vắng không render thẻ trống: ĐÚNG.** Mục chỉ render khi `related.length` khác 0 (ternary ở dòng 465), ngược lại chèn chuỗi rỗng.
- **`esc()` đầy đủ trong mục này: ĐÚNG.** Cả ba giá trị động đều qua `esc()`: `esc(r.id)` trong href, `esc(String(r.hsk_level))`, `esc(r.title_vi)`. Hàm `esc` (đầu app.js) thoát `& < > "`.
- **Vị trí: ĐÚNG.** Dòng 464 = mục F. Nhớ nhanh; dòng 465 = mục Bài liên quan; dòng 466 mở thẻ hoàn thành — tức sau F, trước thẻ hoàn thành, đúng đặc tả. Nav Bài trước/Bài sau nằm sau thẻ hoàn thành như cũ.
- `BUILD_VERSION = "20261031-rel1"` (app.js dòng 878); `index.html` dùng `app.js?v=20261031-rel1` và `styles.css?v=20261031-rel1` — khớp nhau.

### scripts/validate.py (dòng 53–56, 157–184)

Đủ **7 tính chất** (giao 6, thực tế có cả kiểm tra kiểu):

1. `list[str]` — dòng 163–165: không phải list hoặc phần tử không phải `str` → lỗi.
2. Không trùng — dòng 169–170.
3. ≤ 4 phần tử — dòng 167–168.
4. Không tự trỏ — dòng 171–172 (và vòng lặp đích bỏ qua `rid == lid` để không sinh lỗi phụ).
5. Đích tồn tại — dòng 176–179 (dùng bản đồ `lesson_by_id` tiền xử lý trước vòng lặp, nhìn được bài nằm sau trong danh sách).
6. Đối xứng — dòng 182–184: đích thiếu trường hoặc không liệt kê lại bài nguồn → lỗi.
7. Nguồn `published` → đích `published` — dòng 180–181.

**Thử nghiệm đột biến do QA tự tạo** (trên bản sao trong bộ nhớ qua `validate.check`, không đụng dữ liệu thật) — chọn 2 tính chất *chưa* có unit test riêng:

- Trùng phần tử (đối xứng đầy đủ để cô lập lỗi): validator bắt đúng — `shi-noun-link: related_ids không được trùng phần tử`.
- Published → draft (đích đổi status thành `draft`, giữ đối xứng): validator bắt đúng — `shi-noun-link: related_ids trỏ tới bài chưa published: le-completion-change`.
- (Thêm, ngoài yêu cầu) `related_ids` là chuỗi thay vì list: bắt đúng — `related_ids phải là danh sách các chuỗi (list các str)`.

5 unit test mới trong `tests/test_validator.py` (nonexistent / self / asymmetric / >4 / symmetric-pass) khớp mô tả của Agent Code; toàn bộ suite chạy ở mục 4.

`docs/schema.md` (dòng 27 và quy tắc 9 ở dòng 60) mô tả `related_ids` khớp đúng hành vi validator và render ở trên.

## 4. Chạy thật (QA tự chạy, 2026-10-31)

| Lệnh | Kết quả thật |
|---|---|
| `python3 scripts/validate.py` | `ĐẠT: 72 bài, 72 bài published, 353 bài tập.` — exit 0 |
| `python3 -m unittest discover -s tests` | `Ran 14 tests — OK` (9 cũ + 5 test REL-01) |
| `node --test tests/test_fsrs.mjs` | 7 pass / 0 fail |
| `node --check app.js` | Đạt (JS_OK, không lỗi cú pháp) |
| `python3 -m http.server 8907` + `node tests/browser-check.mjs http://localhost:8907` | **VERDICT: PASS (20/20 pass)**. Mục mới: `PASS related-lessons — {"hasSection":true,"hasLink":true,"linkText":"HSK 1 了 cuối câu: tình trạng đã đổi khác","hash":"#/lesson/le-sentence-final-change","title":"了 cuối câu: tình trạng đã đổi khác"}` — tức mục hiện đúng, bấm link chuyển được sang bài đích. `console-errors` PASS (0 lỗi) |

## 5. Không phá vỡ hành vi cũ

- **Số lượng/id không đổi:** manifest local giống hệt main (mục 2); tổng 72 bài / 353 bài tập bằng đúng số liệu trước REL-01 trong `docs/checkpoint.json`; ở 3 file mẫu đối chiếu main, trường `exercises` (kèm id bài tập) deep-equal với main — không bài/bài tập nào đổi id. `related_ids` là trường cộng thêm tùy chọn, không chạm `id`, `exercises`, tiến độ hay FSRS.
- **Tiến độ/FSRS:** harness `progress-persists-reload` PASS, `review-rating-recorded` PASS (event FSRS ghi được), `review-rate-locked-before-reveal` PASS; FSRS unit 7/7.
- **Bài trước/Bài sau:** harness `lesson-sections` PASS với `nav: true`; mã nav (sau thẻ hoàn thành) không bị mục Bài liên quan chen vào — mục mới nằm trước thẻ hoàn thành, nav giữ nguyên vị trí cuối trang.

## Lỗi phát hiện

- **Nghiêm trọng:** không có.
- **Quan trọng:** không có.
- **Hoàn thiện:**
  - H-1. Cặp B9 (modal-verbs-hsk3 ↔ state-complement-de) là cặp yếu nhất: quan hệ chỉ qua phân biệt cách đọc của chữ 得 (děi/de). Có bằng chứng thật và đạt tiêu chí D27 nên không chặn; nếu sau này siết tiêu chí "Bài liên quan", đây là ứng viên xem xét lại đầu tiên.
  - H-2. Harness chưa có khẳng định âm tính: chưa kiểm tra bài *không có* `related_ids` (35 bài) không hiện mục "Bài liên quan" trống — tiêu chí nghiệm thu G-01 có nhắc trường hợp này. Hành vi hiện đúng theo đọc mã (ternary theo `related.length`), nhưng nên bổ sung 1 assertion vào `tests/browser-check.mjs` ở lô sau để khóa hồi quy.
  - H-3. Hai tính chất validator "không trùng" và "published → published" chưa có unit test thường trực trong `tests/test_validator.py` (QA đã kiểm chứng bằng đột biến tạm và validator bắt đúng cả hai). Nên thêm 2 test này để bộ test phủ đủ 7 tính chất.

## Phạm vi chưa kiểm (không thuộc kết luận PASS/FAIL của lô này)

- Chưa đối chiếu deep-equal toàn bộ 37 file với main (nhiệm vụ yêu cầu mẫu 3 file — đã làm đủ 3/3, kết quả sạch).
- Chưa kiểm tra live GitHub Pages: lô chưa merge/PR — nghiệm thu live thuộc bước sau merge của Manager.
- Audio TTS thiết bị thật vẫn `not_run` như trạng thái chung của dự án (AUD-TTS-01), không liên quan REL-01.
