# QA độc lập — Lô HSK3-6 (2026-10-30)

Người kiểm: agent QA độc lập. Phương pháp: đọc trực tiếp file bài học, catalogue,
manifest, app.js; grep toàn bộ `data/lessons/`; tự đếm lại số liệu; chạy thật
validator + unit test + FSRS test + harness trình duyệt trên dữ liệu local.
Không sửa nội dung bài học — mọi điểm cần sửa ghi ở đây cho vòng sửa của Manager.

Kết luận chung của lô: **ĐẠT CÓ ĐIỀU KIỆN** — không có lỗi Nghiêm trọng; hai điểm
Quan trọng thuộc về mức khẳng định/verdict trong hai bài (xem dưới), cần sửa ở
vòng sửa trước khi phát hành. Phần sửa cấp complex-choice: **ĐẠT**. Hệ thống: đạt.

---

## PHẦN 1 — Bốn bài mới

### 1.1 complex-parallel (OFF-H3-43) — ĐẠT CÓ ĐIỀU KIỆN

Phạm vi: đúng catalogue — cả hai thành viên 又……，又…… và 一边……，一边…… đều
được dạy; trạng thái covered của OFF-H3-43 là chính đáng.

Trùng lặp (grep toàn kho): chuỗi 一边 và mẫu 又…又… không xuất hiện ở bất kỳ bài
cũ nào — khẳng định "chưa từng dạy" của ND là đúng. Ranh giới với
zhe-accompanying và complex-sequence được nêu rõ trong when_to_use.

Chấm bài tập: par-ex1→ex5 đáp án duy nhất theo yêu cầu đề, explanation khớp quy
tắc bài dạy. Ví dụ và quick_memory nhất quán với công thức.

**[Quan trọng] P-1 — verdict mâu thuẫn với chính ghi chú của bài.**
Confusion 2 gán câu 他又唱歌跳舞。 verdict `sai_ngu_phap` với lý do "thiếu 又
thứ hai". Nhưng formula_notes bước 4 của chính bài này thừa nhận 又 đứng một
mình mang nghĩa "lại/nữa" là cách dùng riêng hợp lệ — và theo cách đọc đó, câu
này đúng ngữ pháp ("anh ấy lại hát và nhảy"), chỉ là không thuộc mẫu song song.
Gán `sai_ngu_phap` vi phạm quy tắc phân biệt "thiếu thành phần để giữ mẫu đang
luyện" với "sai ngữ pháp", đồng thời mâu thuẫn nội bộ bài. Hướng sửa: đổi
verdict sang dạng đổi nghĩa/không thuộc mẫu (ví dụ `doi_nghia`) và viết lại
explanation theo hướng "đọc thành 又 = lại; muốn nói hai việc cùng lúc trong
khung song song phải lặp 又".

### 1.2 modal-verbs-hsk3 (OFF-H3-04) — ĐẠT CÓ ĐIỀU KIỆN

Phạm vi: đủ cả năm từ của OFF-H3-04 （需要/该/应该/愿意/得）; catalogue covered
là chính đáng. Grep toàn kho: 需要/应该/该/愿意 không có ở bài cũ; âm "děi"
không xuất hiện trong pinyin của bất kỳ bài cũ nào — modal 得 đúng là chưa
từng dạy (các chữ 得 ở bài cũ đều là de/dé của bổ ngữ trạng thái, bổ ngữ khả
năng, bổ ngữ mức độ…).

Kiểm riêng yêu cầu:
- Cách đọc 得： děi (phải) / de (sau động từ, bổ ngữ trạng thái) / dé （觉得）
  — phân biệt đúng ở cả formula_notes, confusion 3 và pattern.
- Mẫu 该……了: dùng đúng nghĩa "đến lúc phải/nên… rồi"; ex5 chấp nhận cả dạng
  có và không có vế dẫn 天黑了， và explanation nói đúng mức "thiếu 了 thì sắc
  thái chưa trọn" chứ không gán sai ngữ pháp — đạt quy tắc chống tuyệt đối.
- modal3-ex4: đáp án 得 là duy nhất theo đúng sắc thái đề yêu cầu (bắt buộc vì
  hoàn cảnh, khẩu ngữ); explanation thừa nhận 应该 đổi sắc thái — tốt.

**[Quan trọng] M-1 — khẳng định tuyệt đối về 不得 chưa đúng sự thật.**
Confusion 1, formula_notes bước 4 và explanation của modal3-ex3 đều khẳng
định 得 "không có dạng phủ định *不得". Thực tế 不得 là từ có thật trong văn
viết trang trọng/quy định với nghĩa cấm — "không được phép" （不得入内、
不得迟到）. Điều đúng là: 不得 không dùng để nói "không cần phải"; muốn nói
"không cần phải" thì dùng 不用/不必. Kết quả hướng dẫn (đáp án error_spot,
khuyên dùng 不用） vẫn đúng, nhưng câu khẳng định "*不得" không tồn tại sẽ
làm người học khó xử khi gặp biển báo/quy định thật. Hướng sửa: sửa cả ba
chỗ thành dạng "得 không phủ định bằng 不 được với nghĩa 'không cần phải';
不得 là cách nói trang trọng nghĩa 'không được phép', khác nghĩa".

### 1.3 alternating-actions (thành viên OFF-H3-42) — ĐẠT

Phạm vi: đúng thành viên 一会儿……，一会儿…… của OFF-H3-42.

Trùng lặp: grep cho thấy 一会儿 chỉ xuất hiện ở bài cũ complex-sequence dưới
dạng lượng thời gian （休息一会儿 = "nghỉ một lát") trong đáp án/biến thể được
chấp nhận — không phải mẫu luân phiên. Bài mới phân biệt tường minh hai cách
dùng này ở when_to_use, formula_notes bước 3 và confusion 1 — không dạy trùng.

Chấm bài tập: alt-ex1→ex5 đạt; explanation phân biệt đúng 或者 (khả năng),
一边 (đồng thời) và khung luân phiên. Ví dụ/bài tập không trùng nguyên câu.

**[Hoàn thiện] A-1.** Confusion 2 gán 他一会儿看书，听音乐。 verdict
`sai_ngu_phap` vì thiếu 一会儿 thứ hai. Khung chuẩn đúng là phải đủ cặp, và
cách chấm này chấp nhận được ở mức thi HSK; tuy vậy trong khẩu ngữ việc lược
一会儿 thứ hai có xuất hiện — nên cân nhắc mềm hóa explanation thành "chưa
trọn khung luân phiên" thay vì khẳng định sai tuyệt đối.

**[Hoàn thiện] A-2.** alt-ex5 chỉ chấp nhận đáp án có dấu phẩy giữa hai vế
（他一会儿工作，一会儿休息。); bản không dấu phẩy cũng đúng mà không có trong
accepted_answers — cân nhắc bổ sung biến thể.

### 1.4 yue-patterns (OFF-H3-26) — ĐẠT

Phạm vi: bài chỉ lấy 越……越…… và dạng một vế 越来越…… — đúng như kế hoạch.
Catalogue OFF-H3-26 = partial với note trung thực: liệt kê 越……越…… đã dạy;
在……上/下/中 đã phủ cơ bản qua location-nouns; chưa dạy （在）……以前/以后/
前/后 và X什么（啊）; và ghi rõ 该……了 được dạy ở modal-verbs-hsk3
(OFF-H3-04), không tính hai lần. when_to_use và sources của bài cũng khai báo
đúng phạm vi từng phần này.

Về `hsk_evidence.status = "verified"` của bài: theo định nghĩa trong
docs/schema.md, verified nghĩa là "toàn bộ nội dung dạy nằm trong cấp đã
ghi" — nội dung bài này dạy đều thuộc giỏ HSK3 nên nhãn verified là đúng
định nghĩa; việc phủ chưa đủ giỏ OFF-H3-26 được ghi ở tầng catalogue
(partial), không phải ở nhãn này. Khác với trường hợp complex-choice ở lô
trước (nội dung dạy vượt cấp thật). Không có vấn đề.

Trùng lặp: grep mẫu 越…越 và 越来越 — không có ở bài cũ. Đúng khẳng định ND.

Chấm bài tập: yue-ex1→ex5 đạt. Quy tắc "sau 越 là động từ/tính từ, không phải
danh từ", vị trí chủ ngữ hai vế, và "khung 越 không chen 很/非常" nhất quán
giữa formula, ví dụ, đáp án, quick_memory. Các verdict confusion （越来越很冷、
越书、lồng hai khung) đều đúng.

**[Hoàn thiện] Y-1.** formula_notes bước 3 lấy ví dụ lỗi "*越跑很越快" — dạng
lỗi minh họa này gượng và không phải lỗi người học thường tạo; lỗi thật cần
chặn là chen 很 trước tính từ kết quả （越跑很快） và 越来越很冷 như chính
confusion 1 của bài. Nên thay ví dụ minh họa cho khớp.

---

## PHẦN 2 — Sửa cấp complex-choice (theo chỉ đạo của Hoa)

Kết luận: **ĐẠT** — mọi điểm kiểm đều khớp bằng chứng file/kho:

1. File bài: `hsk_level = 4`; `hsk_evidence.status = "partial"` kèm note học
   viên trung thực (khung chính thuộc HSK4 nên bài xếp HSK4; phần 或者 thuộc
   HSK3 dạy kèm để đối chiếu); sources và review.notes ghi rõ quyết định đổi
   cấp và lý do. Nội dung bài không còn khẳng định nào giữ nhãn HSK3.
2. Manifest: `data/lessons/complex-choice.json` là shard cuối cùng (vị trí
   59/59) — đầu khối HSK4, sau cả bốn bài mới của lô.
3. app.js (đọc mã): không có chỗ nào giả định chỉ có cấp 1–3.
   - Bộ lọc cấp dựng từ mảng `["all","1","2","3","4","5","6"]` (dòng 322);
     logic lọc so sánh `String(l.hsk_level) !== level` — cấp 4 lọc đúng.
   - Huy hiệu bài và huy hiệu chi tiết đều in động `HSK ${l.hsk_level}`
     (dòng 328, 419); dòng đối chiếu hsk_evidence cũng dùng `les.hsk_level`
     động (dòng 143, 147) — với complex-choice sẽ hiện "phần chính thuộc
     HSK 4; …" kèm note.
   - Danh mục là danh sách phẳng theo thứ tự manifest, không gom nhóm cứng
     theo cấp; đếm tiến trình dùng `lessons.length`; validator chấp nhận
     hsk_level 1–6 (scripts/validate.py dòng 95). Không phát hiện rủi ro
     hiển thị cho bài cấp 4.
4. Catalogue:
   - OFF-H3-42 = covered, lesson_ids [complex-choice, alternating-actions],
     note xuyên cấp hợp lệ: hai thành viên HSK3 （或者……，或者…… do
     complex-choice dạy dù bài xếp ở HSK4; 一会儿……，一会儿…… do
     alternating-actions dạy) và ghi tường minh "khung 不是……，就是……
     thuộc bảng HSK4, KHÔNG tính vào phủ HSK3" — đúng yêu cầu.
   - OFF-H4-27 = partial, note đúng phạm vi: 不是……，就是…… đã dạy;
     连……也/都……，……更…… chưa dạy.
5. Tự đếm lại từ file catalogue (không dùng số ND báo): HSK3 = 22 covered /
   4 partial / 24 missing (tổng 50); HSK4 = 0 covered / 1 partial /
   33 missing (tổng 34). Đúng số ND báo (HSK3 22/4/24; HSK4 0/1/33).
   Tự đếm bài theo cấp từ manifest + file bài: HSK1 20, HSK2 16, HSK3 23,
   HSK4 1 — tổng 60 bài, 293 bài tập. Đúng số ND báo.
6. Tài liệu ánh xạ docs/baseline-hsk3-hsk4-mapping.md đã được cập nhật theo
   lô này （§2b và phần quyết định đổi cấp) — đồng bộ với catalogue.

---

## PHẦN 3 — Kiểm tra hệ thống (chạy thật trên dữ liệu local hiện tại)

| Kiểm tra | Kết quả |
|---|---|
| `python3 scripts/validate.py` | ĐẠT: 60 bài, 60 published, 293 bài tập |
| `python3 -m unittest discover -s tests` | 9 tests, OK |
| `node --test tests/test_fsrs.mjs` | 7/7 pass, 0 fail |
| `node --check app.js` | OK |
| Harness `tests/browser-check.mjs` (http.server 8901 + chrome-headless-shell) | **19/19 PASS**, `console-errors — 0 lỗi` |

Phạm vi harness đối với điểm "bài cấp 4" — ghi rõ để không ngộ nhận:
- Harness mở trang chủ (render toàn bộ 60 thẻ bài, gồm thẻ complex-choice
  cấp 4; kiểm tra tràn ngang ở 360/390/768/1280 đều PASS) và mở trang bài
  `#/lesson/ma-question`; không có lỗi console nào trong các trang đã mở.
- Harness KHÔNG mở trực tiếp bài complex-choice, KHÔNG bấm bộ lọc "HSK 4",
  KHÔNG khẳng định nội dung huy hiệu cấp. Vì vậy việc hiển thị đúng của bài
  cấp 4 được bảo chứng bởi: đọc mã app.js (xử lý cấp hoàn toàn động, xem
  Phần 2.3) + validator + render trang chủ không lỗi — chưa có test tự động
  chuyên biệt cho cấp 4. Khuyến nghị (không chặn lô): bổ sung một ca harness
  mở `#/?level=4` và `#/lesson/complex-choice` trong một lô bảo trì sau.

---

## Tổng hợp phán quyết

| Hạng mục | Phán quyết |
|---|---|
| complex-parallel | ĐẠT CÓ ĐIỀU KIỆN (P-1, Quan trọng) |
| modal-verbs-hsk3 | ĐẠT CÓ ĐIỀU KIỆN (M-1, Quan trọng) |
| alternating-actions | ĐẠT (A-1, A-2 — Hoàn thiện) |
| yue-patterns | ĐẠT (Y-1 — Hoàn thiện) |
| Sửa cấp complex-choice + catalogue + ánh xạ | ĐẠT |
| Hệ thống (validator/unit/FSRS/harness) | ĐẠT (19/19, 0 lỗi console) |
| **Toàn lô HSK3-6** | **ĐẠT CÓ ĐIỀU KIỆN** — sửa P-1 và M-1 ở vòng sửa, QA phúc tra hai điểm đó là đủ điều kiện phát hành; A-1/A-2/Y-1 nên xử lý cùng vòng sửa nhưng không chặn |

Lưu ý ngoài phạm vi chấm: audio TTS của các bài mới vẫn chưa nghiệm thu trên
thiết bị thật (theo review.notes trong từng bài) — trạng thái "đã rà soát nội
bộ" giữ nguyên, không nâng thành "đạt toàn bộ tiêu chí".

---

## Phúc tra sau vòng sửa (2026-10-30)

Người phúc tra: agent QA. Phạm vi: chỉ đúng 5 điểm P-1, M-1, A-1, A-2, Y-1
trong 4 file bài; đọc trực tiếp JSON và grep lại modal-verbs-hsk3. Chạy lại
`python3 scripts/validate.py`: **ĐẠT — 60 bài, 60 published, 293 bài tập**.

| Điểm | Kết luận | Bằng chứng tóm tắt |
|---|---|---|
| P-1 (complex-parallel) | **ĐẠT** | Confusion 2 đã đổi verdict sang `doi_nghia`; explanation ghi rõ câu "không sai ngữ pháp" (又 một mình đọc là "lại/nữa", chỉ không thuộc mẫu song song; muốn khung song song phải lặp 又） — khớp formula bước 4. Explanation par-ex1 đã đồng nhất cùng cách đọc này ("đọc thành 又 = lại/nữa, đổi nghĩa"). Confusion 1 giữ `sai_ngu_phap` là đúng: dùng 一边 với tính từ thuộc tính là lỗi loại thành phần thật, không phải thiếu thành phần của khung. |
| M-1 (modal-verbs-hsk3) | **ĐẠT** | Cả 4 chỗ đều nêu đúng: confusion 1, formula bước 4 và explanation modal3-ex3 đều ghi 不得 có thật, là cách nói trang trọng trong quy định, nghĩa cấm "không được phép" （不得入内）, và "không cần phải" phải dùng 不用； quick_memory cũng ghi đúng hướng "không cần phải → 不用". Grep lại toàn bài: mọi lần xuất hiện của 不得 đều kèm khung diễn giải này; không còn mẫu khẳng định tuyệt đối nào ("không có/không tồn tại/không bao giờ…" — 0 kết quả). Khẳng định còn lại đều có giới hạn phạm vi ("không phủ định bằng 不 **với nghĩa 'không cần phải'**"). |
| A-1 (alternating-actions) | **ĐẠT** | Confusion 2 đã mềm hóa đúng mức: nêu khung chuẩn phải đủ cặp, nhưng thừa nhận khẩu ngữ có thể lược 一会儿 thứ hai khi ngữ cảnh rõ, và khẳng định mẫu đầy đủ là chuẩn để luyện/nhận biết. |
| A-2 (alternating-actions) | **ĐẠT** | alt-ex5 `accepted_answers` đã có đủ 4 biến thể: có/không dấu phẩy giữa hai vế, có/không dấu chấm cuối — gồm bản không dấu phẩy （他一会儿工作一会儿休息。). |
| Y-1 (yue-patterns) | **ĐẠT** | Formula bước 3 đã thay ví dụ lỗi gượng cũ bằng hai lỗi thật: *越跑很快 và *天气越来越很冷， kèm cách nói đúng; diễn giải "không chen 很， mức độ do khung 越…… mang" khớp confusion 1 （天气越来越很冷。, verdict `sai_ngu_phap`). |

Kết luận phúc tra: **5/5 điểm ĐẠT** — hai điểm Quan trọng (P-1, M-1) và ba
điểm Hoàn thiện (A-1, A-2, Y-1) đều đã xử lý đúng hướng sửa. Lô HSK3-6 đủ
điều kiện phát hành về mặt nội dung theo phạm vi phúc tra này.
