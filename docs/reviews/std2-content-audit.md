# STD2-AUDIT — Rà soát nội dung lô std2 (Agent Nội dung, chỉ đọc + báo cáo)

Phạm vi đã đọc: toàn bộ 38 file `data/lessons/*.json` (id, cấp, độ khó,
pattern, objective, when_to_use, formula_notes, quick_memory, ví dụ, bài tập,
confusions), `docs/schema.md`, `docs/reviews/standardization-2026-10-30.md`,
`docs/reviews/nd01-findings.md`, `docs/official-catalogue-hsk1-hsk2.json`
(52 + 62 mục), `docs/official-catalogue-hsk3-hsk4.json` (50 + 34 mục),
`docs/baseline-hsk1-hsk2-mapping.md`, `docs/baseline-hsk3-hsk4-mapping.md`.

Báo cáo này không sửa dữ liệu. Mọi đề xuất nguyên văn để Manager quyết và
giao việc sửa sau.

---

## 1. Rà 38 mục “Nhớ nhanh” (quick_memory) theo chất lượng ôn tập

### 1.1 Tiêu chí chấm (không chấm theo số lượng hay độ dài)

Một mục Nhớ nhanh đạt khi đọc nó ở trang Ôn tập (chưa mở lại bài) người học
tự trả lời được một câu hỏi kiểm tra thật: *chọn từ nào / đặt ở đâu / còn
thiếu thành phần gì / bẫy nào phải tránh*. Ba dạng móc đạt: (i) thao tác làm
được ngay, (ii) câu hỏi chẩn đoán, (iii) mũi tên chọn lựa theo điều kiện.
Không đạt khi mục chỉ dịch lại `pattern` hoặc viết lại một bước của
`formula_notes` bằng chữ khác — lúc đó nó không thêm gì cho việc tự kiểm tra,
chỉ tốn một lần đọc.

Kết quả tổng: **GIỮ 30 · SỬA 8 · GỘP-BỎ 0**.

Về GỘP-BỎ: đã xét riêng ba ứng viên yếu nhất về nhu cầu mục F (ma-question,
why-question, shi-noun-link — bài đơn mẫu, công thức một dòng). Cả ba đều có
ít nhất một bẫy phân biệt thật mà móc một dòng gánh được (吗 vs từ để hỏi;
为什么 không thêm 吗 và cách trả lời; 是 không dùng cho tính chất/vị trí), và
trang Ôn tập đang dùng chính quick_memory làm nội dung đối chiếu trước khi
tự đánh giá — bỏ mục F ở các bài này làm thẻ ôn của chúng rỗng nội dung kiểm
tra. Vì vậy không bài nào thuộc GỘP-BỎ; các mục yếu được xử bằng SỬA. Đây là
kết luận theo từng bài, không phải giữ A–F bằng mọi giá: nếu sau này có bài
chỉ gồm một từ vựng đơn lẻ không bẫy, không vị trí, không chọn lựa thì bài đó
mới là ứng viên bỏ thật.

### 1.2 Bảng từng bài

| # | Bài | Kết luận | Nhận xét theo tiêu chí |
|---|---|---|---|
| 1 | shi-noun-link | GIỮ | Nửa sau là quy tắc phân biệt thật (không dùng 是 cho tính chất/vị trí) — không có trong pattern. Nửa đầu là điều kiện dùng, không phải chép công thức. |
| 2 | le-completion-change | GIỮ | Câu hỏi chẩn đoán vị trí — móc tốt nhất toàn bộ 38 bài; tự nó cũng là lập luận cho việc tách bài ở mục 3. |
| 3 | hen-adj-predicate | GIỮ | Móc phản trực giác “很 ở đây không phải ‘rất’” — đúng điểm người học tự kiểm tra được. |
| 4 | ma-question | GIỮ | Thao tác (thêm 吗 ở cuối) + cấm kỵ (có từ để hỏi thì bỏ 吗). Bài mẫu, giữ làm chuẩn cho nhóm dễ. |
| 5 | de-possessive | GIỮ | Thao tác đặt 的 + ngoại lệ lược 的 với quan hệ thân thuộc — ngoại lệ không có trong pattern. |
| 6 | you-existence | GIỮ | Phân biệt 有/在 là toàn bộ giá trị của bài; móc hỏi đúng “người ở đâu hay nơi có gì”. |
| 7 | bu-mei-negation | GIỮ | Mũi tên chọn theo thời gian/loại từ + bẫy riêng 有. Chuẩn mực cho bài chọn lựa. |
| 8 | measure-words | **SỬA** | Câu đầu dịch gần nguyên `pattern`; giá trị thật (chọn lượng từ theo loại danh từ) lại không có. Đề xuất ở 1.3. |
| 9 | question-words | GIỮ | “Đứng ngay chỗ của đáp án” là cách nhớ vị trí tại chỗ (in-situ) dễ nhớ hơn câu trừu tượng trong pattern; kèm cấm kỵ 吗. |
| 10 | modal-hui-neng-keyi | GIỮ | Mũi tên chọn theo lý do — chuẩn mực cho bài đối chiếu. |
| 11 | zai-progress | GIỮ | Mũi tên chẩn đoán theo thành phần đứng sau 在 — tự kiểm tra được ngay. |
| 12 | prefix-suffix | GIỮ | Dạng “mục lục” bốn chủ điểm không liên quan — phù hợp đúng cấu trúc bài; nếu chuyển 边 đi (mục 3) thì bỏ vế “phía dùng 边” khỏi câu này. |
| 13 | pronouns | GIỮ | Có bẫy thật 他/她 viết khác đọc giống. Lưu ý trung thực: móc này im lặng bỏ qua hệ nhân xưng — khớp đúng chỗ bài đang dạy lệch (xem mục 2). |
| 14 | adverbs-du-ye | **SỬA** | Chỉ lặp quy tắc vị trí (= bước 1 của formula) cộng lời khuyên học thuộc; phần khó thật — phân biệt nghĩa bốn phó từ — lại vắng. Đề xuất ở 1.3. |
| 15 | modal-xiang-yao | GIỮ | Mũi tên chọn theo sắc thái mạnh/nhẹ; câu cuối lặp vị trí nhưng ngắn và phụ. |
| 16 | location-nouns | GIỮ | Thao tác kèm vi ví dụ “bàn + 上” và cảnh báo thứ tự ngược — tự kiểm tra được. |
| 17 | bu-yao-prohibition | **SỬA** | Câu đầu là pattern nguyên văn; giá trị nằm cả ở câu sau (要不要). Viết lại để cả hai vế đều là phân biệt. Đề xuất ở 1.3. |
| 18 | separable-verbs | GIỮ | Ví dụ biến đổi cụ thể （睡觉 → ngủ một giấc ngon) + bẫy vị trí 没 — không phải chép pattern. |
| 19 | zenme-question | GIỮ | Mũi tên chọn theo loại câu hỏi; ngắn nhất (63 ký tự) mà đủ. |
| 20 | bi-comparison | **SỬA** | Nửa đầu dịch nguyên pattern (“A + 比 + B + tính từ”); bẫy 没有/不 ở nửa sau mới là móc. Đề xuất ở 1.3. |
| 21 | guo-experience | GIỮ | Mũi tên nghĩa + bẫy phủ định chỉ dùng 没 — đủ hai lớp kiểm tra. |
| 22 | zhe-continuation | GIỮ | Quy tắc vị trí của 着 kèm cấm kỵ đứng cuối câu — đúng bẫy bài tập zhe-ex4 kiểm tra. |
| 23 | shi-de-emphasis | GIỮ | Hình ảnh “bọc lấy chi tiết” + điều kiện “chuyện đã xảy ra” — móc hình ảnh thật, không chép pattern. |
| 24 | result-complement | GIỮ | Gộp bước vị trí + bước phủ định thành một lần tự kiểm — đây là việc móc nhớ phải làm, không tính là lặp. |
| 25 | direction-complement | GIỮ | Điểm neo chẩn đoán “tính từ người nói” là chìa khóa của bài; vế cuối lặp thứ tự nhưng ngắn. |
| 26 | complex-suiran-yinwei | GIỮ | Móc ghép cặp đúng đúng với lỗi đặc trưng của bài (ghép chéo). Lưu ý: câu chữ tuyệt đối (“đúng cặp mới đúng câu”) là đơn giản hóa có chủ ý cho người mới; sắc thái “có thể lược vế” đã nằm ở bước 4 của formula nên không mâu thuẫn. |
| 27 | hai-shi-choice | GIỮ | Mũi tên chọn theo loại câu （还是 hỏi / 或者 kể) — phân biệt là toàn bộ bài. |
| 28 | verb-reduplication | **SỬA** | Vế cuối “không gắn thêm tân ngữ lạ” mơ hồ và không khớp quy tắc nào trong bài (bẫy thật là khối lặp bị tách ra sau tân ngữ, xem redup-ex4). Đề xuất ở 1.3. |
| 29 | gei-double-object | GIỮ | Quy tắc thứ tự người nhận/vật là bẫy duy nhất và chính xác của bài; không chép nguyên hai mẫu trong pattern. |
| 30 | why-question | **SỬA** | Vế đầu (“为什么 + câu hỏi”) là pattern rút gọn, không thêm thông tin; hai quy tắc sau mới có giá trị. Đề xuất ở 1.3. |
| 31 | yi-jiu-tight | GIỮ | Bài mẫu cố định: móc nằm ở kiểm tra đủ thành phần (“thiếu 就 là mất mẫu”) — chấp nhận được với loại bài khung cố định. |
| 32 | jianyu-qing-jiao-rang | GIỮ | Quy tắc vị trí người được bảo là kỹ năng cốt lõi của bài; diễn đạt dạng kiểm tra vị trí, không chép pattern. |
| 33 | cunxian-chu | **SỬA** | Dịch gần 1:1 pattern sang tiếng Việt (nơi chốn + động từ + 着 + số lượng + danh từ); cả ba bẫy thật （着 dính động từ, cần số lượng, không dùng 有） đều vắng. Đề xuất ở 1.3. |
| 34 | state-complement-de | GIỮ | Phân biệt ba trợ từ 的/地/得 theo vị trí là bẫy trung tâm; móc hỏi đúng “sau động từ là chữ nào”. |
| 35 | ba-sentence-1 | GIỮ | Nén hai bước khó nhất (đưa tân ngữ lên trước + động từ không đứng trơ) thành một câu kiểm tra tình huống. |
| 36 | bei-passive-1 | **SỬA** | Câu đầu chép pattern; câu sau lặp ý when_to_use; bẫy “động từ không đứng trơ” có mặt nhưng bị chôn. Đề xuất ở 1.3. |
| 37 | zhe-accompanying | GIỮ | Cùng họ yi-jiu: móc kiểm tra đủ thành phần (“thiếu động từ thứ hai”) — đúng lỗi bài tập kiểm tra. |
| 38 | bi-comparison-2 | GIỮ | Ánh xạ ba tiểu mẫu + bẫy nghĩa của 不比 （“chưa chắc kém”) — móc chọn lựa đầy đủ nhất cho bài ba nhánh. |

### 1.3 Nguyên văn đề xuất cho 8 mục SỬA (đã đếm ký tự, tất cả trong 40–110)

1. **adverbs-du-ye** (89 ký tự) — thay móc vị trí lặp bằng móc chọn nghĩa:
   “Bốn phó từ đều đứng sau chủ ngữ: tất cả → 都; cũng → 也; còn/thêm → 还; làm lại sau này → 再.”
2. **bei-passive-1** (97 ký tự) — đưa câu hỏi “ai chịu tác động” lên đầu, bẫy động từ trơ ra cuối:
   “Ai chịu tác động thì làm chủ ngữ: 被 + động từ + thành phần khác; động từ không đứng trơ một mình.”
3. **bi-comparison** (94 ký tự) — bỏ dịch pattern, giữ bẫy + thứ tự người hơn:
   “Ai hơn thì đứng trước 比, tính từ chốt cuối câu. Nói “không bằng”: dùng 没有…, đừng thêm 不 sau 比.”
4. **bu-yao-prohibition** (87 ký tự) — cả hai vế đều là phân biệt:
   “Đừng làm gì → 不要 + động từ. Thấy 要不要… là câu hỏi “có muốn… không”, không phải lệnh cấm.”
5. **cunxian-chu** (98 ký tự) — thay dịch pattern bằng ba bẫy thật:
   “Nơi nào đang có gì: động từ dính 着 ngay sau nó, cuối câu cần số lượng + danh từ — và không dùng 有.”
6. **measure-words** (95 ký tự) — thêm lớp chọn lượng từ theo loại danh từ:
   “Giữa số và danh từ luôn có lượng từ: sách → 本, áo → 件, dùng chung → 个. Số 2 đọc 两, không đọc 二.”
7. **verb-reduplication** (102 ký tự) — sửa vế cuối cho khớp bẫy thật của bài:
   “Giọng nhẹ, thử làm: lặp động từ (看看, 看一看, 研究研究). Khối lặp dính liền động từ, đừng tách ra sau tân ngữ.”
8. **why-question** (88 ký tự) — bỏ vế chép pattern, giữ hai quy tắc dùng được:
   “Hỏi “tại sao”: dùng 为什么 và bỏ 吗. Nghe hỏi tại sao, trả lời bằng 因为…, không trả lời 是/不是.”

Ghi chú áp dụng: 8 mục trên đều là thay chữ trong cùng trường, không đổi
nghĩa dạy — khi sửa, tăng `content_version` theo quy ước schema. Riêng
verb-reduplication, vế bị thay (“không gắn thêm tân ngữ lạ”) không có căn cứ
trong formula/confusions hiện tại; bản mới bám đúng redup-ex4.

---

## 2. Bằng chứng cấp HSK theo từng bài

### 2.1 Cách đọc kết luận

- **Đủ bằng chứng**: mọi cấu trúc bài thật sự dạy (có ví dụ/bài tập hoặc bước
  công thức chính) nằm trong các mục catalogue thuộc đúng cấp đã ghi.
- **Một phần**: bài có thành phần thuộc cấp cao hơn — ghi rõ thành phần đó và
  mức độ dạy (dạy thật / chỉ nhắc ở bước phụ). Lệch nhỏ ở bước “Không dùng”
  vẫn tính là một phần nhưng mức nhẹ.
- **Chưa đủ**: không tìm thấy mục tương ứng trong catalogue dự án cho một
  thành phần bài đang dạy.
- Phân biệt hai việc khác nhau: (i) bài *vượt cấp* (vấn đề của bài) và
  (ii) bài *chưa phủ hết* một mục catalogue (vấn đề bao phủ, không phải lỗi
  cấp của bài). Mục này chỉ kết án (i); các thiếu bao phủ ghi ở cột ghi chú.

Căn cứ duy nhất là catalogue dự án (diễn giải từ đề cương thi HSK 3.0,
bản trích 2026-09-25, chưa ghi hash — xem baseline-evidence). Nơi catalogue
dự án không liệt kê một điểm mà đề cương gốc có thể có, kết luận ghi đúng
là “chưa đủ bằng chứng trong catalogue dự án”, không tự khẳng định điểm đó
thuộc cấp khác.

### 2.2 Bảng từng bài

| Bài (cấp ghi) | Mục catalogue tương ứng | Kết luận | Thành phần vượt/chưa rõ và ghi chú |
|---|---|---|---|
| shi-noun-link (HSK1) | OFF-H1-41, H1-34, H1-32 | Đủ | — |
| le-completion-change (HSK1) | OFF-H1-26, H1-48 | Đủ | Cả hai cách dùng （完成/变化） đều thuộc HSK1 theo H1-48. Mục 了解 là bẫy đọc chữ, không phải điểm ngữ pháp vượt cấp. |
| hen-adj-predicate (HSK1) | OFF-H1-33, H1-16 | Đủ | 真 nhắc ở bước mức độ nằm trong danh sách H1-16. Bài chỉ dạy dạng có 很 (đúng phạm vi H1-33). |
| ma-question (HSK1) | OFF-H1-27, H1-36 | Đủ | — |
| de-possessive (HSK1) | OFF-H1-25, H2-25 | **Một phần (nhẹ)** | Bước 3 “Không dùng” nhắc 得 （后 động từ) và 地 (trước động từ): 得 thuộc OFF-H2-28, 地 thuộc OFF-H2-29 — đều là mục HSK2. Chỉ nhắc tên để phân biệt, không ví dụ/bài tập; vẫn nên ghi trạng thái một phần vì người học HSK1 chưa có căn cứ học hai chữ này. |
| you-existence (HSK1) | OFF-H1-42, H1-43 | Đủ | Mẫu tồn tại trong bài là dạng chung của H1-43; catalogue đánh giá H1-43 “một phần” là chuyện bao phủ （存现 chuẩn), không phải vượt cấp. |
| bu-mei-negation (HSK1) | OFF-H1-20 | Đủ | — |
| measure-words (HSK1) | OFF-H1-13 | Đủ (kèm lưu ý) | 个/本/件 đều trong danh sách H1-13. Lưu ý: mục H1-13 còn 家/口/块/只/元 bài chưa dạy (thiếu bao phủ). Cách hỏi 几/多少 trong bài — xem question-words. |
| question-words (HSK1) | OFF-H1-07, H1-37 | **Một phần** | 什么/谁 có mục H1-07; 哪儿 gắn với nhóm chỉ định H1-10. Nhưng 几 và 多少 (bài dạy như từ để hỏi chính, có ví dụ 多少钱） không có mục tương ứng ở HSK1 trong catalogue dự án — catalogue chỉ có 概数 OFF-H2-61 là cách dùng khác (số ước lượng). Kết luận: chưa đủ bằng chứng trong catalogue cho hai từ này; Manager cần đối chiếu lại bản gốc trước khi khẳng định cấp (nhiều khả năng thuộc nghi vấn HSK1 nhưng catalogue dự án chưa ghi — không tự kết luận thay). |
| modal-hui-neng-keyi (HSK1) | OFF-H1-04 | Đủ | Ba từ khớp nguyên mục. |
| zai-progress (HSK1) | OFF-H1-18, H1-22, H1-49 | Đủ | 呢 trong mẫu tiến hành đã nằm trong chính tên mục H1-49 “(+ 呢)”. |
| prefix-suffix (HSK1) | OFF-H1-01, H1-02, H1-50; OFF-H2-02 | **Một phần** | 第/小/们/边 đều có mục HSK1. Nhưng bước 4 liệt kê 左边/右边: 左/右 thuộc OFF-H2-02 (HSK2). Chỉ ở mức liệt kê trong công thức, bài tập chỉ kiểm tra 前边 — mức nhẹ, nhưng là thành phần vượt cấp thật. Xem thêm phương án xử lý ở mục 3.2. |
| pronouns (HSK1) | OFF-H1-09, H1-10 | Đủ (kèm lưu ý) | Mọi thành phần đều thuộc HSK1. Lưu ý bao phủ: catalogue tự ghi H1-09 “một phần” vì bài mới liệt kê hệ nhân xưng ở công thức, cả 4 bài tập đều kiểm tra phần chỉ định 这/那, không bài nào kiểm tra nhân xưng như một hệ thống. Đây là lệch phủ trong bài, không phải vượt cấp. |
| adverbs-du-ye (HSK1) | OFF-H1-16, H1-17, H1-19, H2-15 | Đủ (kèm lưu ý) | 都/也/还/再 và mức độ 很/非常/太 đều có mục HSK1. Lưu ý phủ: bài tập chỉ kiểm tra 都/也 (adv-ex5 cũng là 也）; 还 chỉ có mặt ở ví dụ, 再 không có bài tập nào. |
| modal-xiang-yao (HSK1) | OFF-H1-05; OFF-H2-36 | **Một phần (nhẹ)** | 想/要 khớp H1-05. Nhưng bước 2 của công thức nhắc nghĩa “要 dùng khi việc sắp xảy ra” — đó là mẫu cố định 要/快要/就要……了 thuộc OFF-H2-36 (HSK2, catalogue ghi thiếu/chưa có bài). Bài không dạy mẫu này (không ví dụ, không bài tập), chỉ một mệnh đề nhận biết; ghi một phần để giao diện không khẳng định toàn bài thuần HSK1. |
| location-nouns (HSK1) | OFF-H1-03, H1-22 | Đủ | Sáu phương vị khớp nguyên danh sách H1-03; bài không dạy 左/右 (đúng cấp). |
| bu-yao-prohibition (HSK1) | OFF-H1-21 | Đủ | — |
| separable-verbs (HSK1) | OFF-H1-06 | Đủ | Các ly hợp từ dùng trong bài （看病/睡觉/说话/上课） nằm trong danh sách của mục. |
| zenme-question (HSK1) | OFF-H1-08 | Đủ | Bài dạy 怎么样 (HSK1), không dạy 怎样 của OFF-H3-07. |
| bi-comparison (HSK2) | OFF-H2-20, H2-50; OFF-H3-12 | **Một phần** | Khung 比 cơ bản và mức chênh 多了 thuộc HSK2. Nhưng bước 3 của công thức dạy quy tắc vị trí của 更 kèm ví dụ 他比我更高 — 更 thuộc OFF-H3-12 (phó từ mức độ HSK3) và là nội dung chính của bài HSK3 bi-comparison-2. Đây là thành phần HSK3 được dạy thật (có quy tắc + ví dụ) trong bài HSK2, không chỉ nhắc tên. |
| guo-experience (HSK2) | OFF-H2-26, H2-58 | Đủ | — |
| zhe-continuation (HSK2) | OFF-H2-27, H2-59, H2-60, H2-49 | Đủ (kèm lưu ý) | Các nghĩa dạy đều thuộc HSK2. Lưu ý trùng lặp: bước 2 （存现： nơi chốn + động từ + 着 + danh từ) là nguyên mẫu của OFF-H2-49 mà bài cunxian-chu dạy riêng — hai bài phủ cùng một mẫu, người học gặp hai lần với hai tên gọi. |
| shi-de-emphasis (HSK2) | OFF-H2-51 | Đủ | Dạng 2 thái độ/quan điểm (OFF-H3-39) bài chưa dạy — thiếu bao phủ, không vượt cấp. |
| result-complement (HSK2) | OFF-H2-32, H2-40 | Đủ (kèm lưu ý) | 完/好/懂/错 đều trong H2-40; mục còn thiếu 会 (chưa dạy — thiếu bao phủ). Dạng 2 HSK3 (OFF-H3-28: 到/住/走/上） bài không dạy, đúng cấp. |
| direction-complement (HSK2) | OFF-H2-32, H2-41 | Đủ (kèm lưu ý) | Khung đơn + 来/去 thuộc HSK2. Catalogue ghi H2-41 “một phần” vì dạng phức có tân ngữ chen giữa (kiểu 进来一本书/拿出书来） bài chưa dạy — thiếu bao phủ. |
| complex-suiran-yinwei (HSK2) | OFF-H2-23, H2-24, H2-55, H2-57 | Đủ | Dạng 虽然……，可是…… (OFF-H3-45) bài không dạy — không vượt cấp. |
| hai-shi-choice (HSK2) | OFF-H2-17, H2-45 | Đủ | Dạng đề nghị 还是……吧 (H2-37) và 选择复句 (H2-54) chưa dạy — thiếu bao phủ. |
| verb-reduplication (HSK2) | OFF-H2-03 | Đủ (kèm lưu ý) | AA/A一A/ABAB đều trong mục; thiếu A了A là thiếu bao phủ. Lưu ý riêng: ví dụ 3 他走来走去 không phải trùng điệp (bản thân công thức bước 4 đã nói rõ) nhưng vẫn nằm trong danh sách ví dụ chính của bài — vị trí trình bày dễ gây hiểu nhầm hơn là vấn đề cấp. |
| gei-double-object (HSK2) | OFF-H2-53, H1-44 | Đủ | Cả hai mẫu đều là dạng 给 HSK2. Giới từ 给 chỉ hướng/đối tượng nói chung (OFF-H2-19) chưa dạy — thiếu bao phủ. |
| why-question (HSK2) | OFF-H2-06 | Đủ | — |
| yi-jiu-tight (HSK2) | OFF-H2-56 | Đủ | — |
| jianyu-qing-jiao-rang (HSK2) | OFF-H2-52 | Đủ | Dạng 2 của kiêm ngữ (OFF-H4-21) không liên quan ở cấp này. |
| cunxian-chu (HSK2) | OFF-H2-49 | Đủ | Khớp nguyên mục. Trùng lặp với zhe-continuation đã ghi ở trên. |
| state-complement-de (HSK2) | OFF-H2-42, H2-28 | Đủ | Đối chiếu 地 ở bước 3 thuộc OFF-H2-29 — cùng cấp HSK2 nên không vượt. |
| ba-sentence-1 (HSK3) | OFF-H3-34, H3-21 | Đủ | Khớp dạng 1; dạng 2 (OFF-H4-19) bài không dạy. |
| bei-passive-1 (HSK3) | OFF-H3-35, H3-21 | Đủ | Khớp dạng 1 với 被； dạng 叫/让 (OFF-H4-20) bài không dạy. |
| zhe-accompanying (HSK3) | OFF-H3-36 | Đủ | Khớp nguyên mục dạng 2 của liên động. |
| bi-comparison-2 (HSK3) | OFF-H3-37, H3-12 | Đủ (kèm lưu ý) | Ba tiểu mẫu đã dạy đều thuộc HSK3. Lưu ý bao phủ: nhánh thứ tư của H3-37 — 多/少/早/晚 + động từ + số lượng (kiểu 他比我多买了一本） — bài không dạy, không có ví dụ/bài tập. |

**Tổng kết mục 2: Đủ 33 · Một phần 5 · Chưa đủ 0** (question-words tính là
một phần vì phần chưa đủ bằng chứng nằm trong cùng bài). Năm bài một phần:
de-possessive (nhẹ, nhắc 得/地 HSK2), prefix-suffix (nhẹ, liệt kê 左/右边
HSK2), modal-xiang-yao (nhẹ, một mệnh đề về 要 sắp xảy ra — mẫu HSK2),
bi-comparison (thật — dạy quy tắc 更 của HSK3), question-words （几/多少
chưa có mục tương ứng trong catalogue dự án).

### 2.3 Đề xuất thể hiện trung thực trên giao diện (Manager quyết)

Nguyên tắc: badge “HSK n” là khẳng định về *phần lõi* của bài; không đổi
badge vì một bước phụ, nhưng cũng không để badge là bằng chứng duy nhất.
Đề xuất cụ thể:

1. Giữ nguyên badge HSK cho cả 38 bài — kể cả 5 bài một phần, vì phần lõi
   của cả 5 đều đúng cấp; đổi badge sẽ sai nặng hơn (ví dụ hạ bi-comparison
   xuống hay nâng lên đều không đúng với khung 比 HSK2).
2. Thêm một dòng trạng thái đối chiếu nhỏ trong trang bài, đặt ở khối nguồn
   cuối bài (nơi đã ghi nguồn và rà soát), với ba mức chữ:
   - Đủ: “Đã đối chiếu đề cương HSK 3.0: toàn bộ nội dung thuộc HSK n.”
   - Một phần: “Đã đối chiếu: phần chính thuộc HSK n; có điểm mở rộng thuộc
     cấp cao hơn (ghi rõ điểm)” — ví dụ bi-comparison ghi “…; quy tắc 更 ở
     bước 3 thuộc HSK3, được dạy đầy đủ ở bài So sánh dạng 2.”
   - Chưa đủ bằng chứng (áp cho thành phần 几/多少 của question-words):
     “Đã đối chiếu phần chính; một điểm chưa có mục tương ứng trong danh
     mục đối chiếu của dự án, đang chờ kiểm tra lại với bản gốc.”
   Trường dữ liệu gợi ý: `hsk_evidence: {status: "verified"|"partial"|
   "pending", note: "..."}` — Manager quyết tên và validator.
3. Riêng bi-comparison có một lựa chọn nội dung rẻ hơn cả ghi chú: bỏ quy
   tắc 更 khỏi bước 3 (chỉ giữ 也/都 đặt trước 比）, vì bi-comparison-2 đã dạy
   更 ngay bài HSK3 tiếp nối. Nếu Manager chọn cách này, bi-comparison trở
   thành “đủ” và không cần dòng một phần. Báo cáo khuyến nghị cách này:
   sửa nội dung thật hơn là ghi chú quanh nội dung lệch.
4. Với ba bài một phần “nhẹ” còn lại (de-possessive, prefix-suffix,
   modal-xiang-yao): không cần sửa nội dung — các điểm vượt đều là nhắc
   tên/liệt kê ở bước phụ, có ích cho phân biệt; chỉ cần dòng trạng thái ở
   đề xuất 2 là trung thực đủ.

---

## 3. Đánh giá tách bài: le-completion-change, prefix-suffix, complex-suiran-yinwei

Tiêu chí áp đồng loạt: (a) số mục tiêu độc lập thật; (b) thành thạo riêng lẻ
được không; (c) đối chiếu trong bài có phải chính là mục tiêu học không;
(d) bài tập phủ đều từng phần không; (e) tải của bài. Tách chỉ khi tách ra
học rõ hơn thật, không vì bài “có hai chủ điểm” trên giấy.

### 3.1 le-completion-change (HSK1, hard) → **TÁCH**

- (a) Hai mục tiêu độc lập thật: 了 ngay sau động từ (việc hoàn thành —
  “đã/đã từng làm xong”) và 了 cuối câu (tình trạng mới so với trước —
  “giờ đã… rồi”). Vị trí khác, nghĩa khác, lỗi điển hình khác. objective
  của chính bài tự khai hai mục tiêu. Ngoài ra còn một món thứ ba không
  thuộc cả hai: 了解 là bẫy đọc chữ/ký tự, không phải điểm ngữ pháp.
- (b) Thành thạo riêng được — anzi trình tự tự nhiên là 了 sau động từ
  trước, 了 cuối câu sau; người học yếu phần này vẫn dùng tốt phần kia.
- (c) Việc đối chiếu hai cách dùng là mục tiêu thật, nhưng đó là mục tiêu
  *phân biệt sau khi biết cả hai*, không phải lý do phải học cả hai trong
  cùng một lần đầu. Đặt phần phân biệt làm bài tập chốt của bài 2 (khi
  người học đã có bài 1 làm nền) giữ nguyên giá trị đối chiếu mà bỏ được
  tải cùng lúc.
- (d) Phủ lệch rõ: bài tập 4/5 nghiêng về 了 sau động từ (le-ex1 chọn vị
  trí, le-ex3 sắp xếp, le-ex4 phủ định/bỏ 了， le-ex5 tự sản xuất); 了
  cuối câu chỉ có 1 bài (le-ex2, điền từ) và không có bài tự sản xuất nào.
  Ngược lại ví dụ lại nghiêng về cuối câu (2/4). Người học có thể “hoàn
  thành” bài mà chưa từng tự đặt một câu đổi trạng thái.
- (e) Đây là bài nặng nhất khối HSK1: độ khó hard, 4 ví dụ/5 bài tập/
  3 confusions, công thức và mục đích dùng dài nhất khối. Hai mục tiêu +
  một bẫy ký tự là quá tải cho một lần học đầu.

**Phác thảo sau tách:**

- Bài giữ ID cũ **`le-completion-change`** = 了 sau động từ (hoàn thành).
  Lý do giữ ID cho phần này: 4/5 bài tập hiện có thuộc về nó, pattern chính
  và mục tiêu thứ nhất của bài cũ cũng là nó; người đã hoàn thành bài cũ
  giữ nguyên hoàn thành + thẻ FSRS cho đúng phần họ đã luyện nhiều nhất —
  không nhân đôi thẻ (thẻ cũ không đổi chủ), không mất tiến độ.
  - Giữ: ví dụ 我买了这本书 (le-ex-… ví dụ 1); bài tập le-ex1, le-ex3,
    le-ex4, le-ex5. Giữ nguyên ID bài tập (lịch sử attempts theo ID).
  - Cần bổ sung (Manager giao viết mới): 1 ví dụ hoàn thành nữa (hiện chỉ
    có 1 ví dụ thuần; đề xuất việc hằng ngày kiểu 我喝了一杯水/他来了）
    để đạt sàn 3 ví dụ cho mức medium; đổi độ khó hard → **medium** （了
    đơn độc là điểm lõi HSK1); sửa title/objective bỏ phần cuối câu.
  - Ví dụ 我了解他的意思： bỏ khỏi danh sách ví dụ của cả hai bài (nó không
    minh họa cho mục tiêu nào sau tách). Bẫy 了解 giữ lại dưới dạng một
    confusion trong bài này (nơi người học gặp các dạng 了） hoặc bỏ hẳn —
    khuyến nghị giữ confusion, bỏ ví dụ.
  - Tiêu đề gợi ý: “了： việc đã hoàn thành （动 từ + 了）”.
- Bài mới **`le-sentence-final-change`** = 了 cuối câu (đổi trạng thái),
  độ khó **medium**.
  - Chuyển sang: ví dụ 我饿了， ví dụ 我会说中文了； bài tập le-ex2 — giữ
    nguyên ID bài tập “le-ex2” khi chuyển file để không mất lịch sử
    attempts của bài tập đó (attempts khóa theo ID bài tập, không theo
    bài); ghi chú việc này trong file để khỏi tưởng là gõ nhầm ID.
  - Cần bổ sung để đạt sàn medium (≥3 ví dụ, ≥4 bài tập): 1 ví dụ đổi
    trạng thái thứ ba (thời tiết/thời gian kiểu 下雨了/天黑了）; 3 bài tập
    mới — trong đó bắt buộc có (i) một bài chọn phân biệt 了 sau động từ
    với 了 cuối câu trong ngữ cảnh (đây là nơi đặt mục tiêu đối chiếu,
    làm bài chốt), (ii) một bài tự sản xuất (điền/đặt câu đổi trạng thái)
    lấp đúng chỗ trống phủ hiện nay, (iii) một bài bắt lỗi (thừa 了 với
    thói quen hiện tại, hoặc thiếu 了 khi nói thay đổi).
  - Tiêu đề gợi ý: “了 cuối câu: tình trạng đã đổi khác”.
- Manifest: bài mới đặt ngay sau le-completion-change (trình tự học: hoàn
  thành → đổi trạng thái → đối chiếu nằm ở cuối bài 2). Liên kết cũ
  `#/lesson/le-completion-change` còn đúng nghĩa (vẫn là bài 了， phạm vi
  hẹp lại thành cách dùng thứ nhất — tiêu đề mới phải nói rõ điều này để
  người quay lại không tưởng thiếu nội dung). Bài mới chưa ai hoàn thành
  nên không phát sinh thẻ FSRS cho tới khi người học hoàn thành nó — đúng
  ý nghĩa, vì thành thạo 了 cuối câu chưa từng được kiểm tra riêng.

### 3.2 prefix-suffix (HSK1, medium) → **GIỮ + cấu trúc lại: chuyển 边 sang location-nouns; không tách tiếp**

- (a) Bốn chủ điểm độc lập thật （第 thứ tự, 小 xưng hô, 们 số nhiều, 边
  phương hướng) — không chủ điểm nào suy ra chủ điểm nào.
- (b) Thành thạo riêng được; cả bốn đều là ngữ tố ngắn, học thuộc nhanh.
- (c) Đối chiếu giữa bốn chủ điểm **không** phải mục tiêu học — không có
  lỗi nào sinh ra từ việc nhầm 第 với 们. Khác hẳn cặp 了 ở 3.1: ở đó đối
  chiếu là kỹ năng; ở đây gộp nhóm chỉ vì cùng là “tiền/tố” trên giấy.
- (d) Phủ mỏng nhưng đều ở mức tối thiểu: 第 1 bài, 小 1, 边 1, 们 2 (cả
  hai đều lồng trong câu 是 về người). Không chủ điểm nào có bài tự sản
  xuất riêng.
- (e) Tải lại nhẹ: 4 ví dụ/5 bài tập, mỗi chủ điểm một đoạn ngắn. Bài này
  không nặng — nó *rời*, không *quá tải*.

Vì (e) nhẹ và mỗi chủ điểm quá nhỏ, tách thành 2–4 bài riêng sẽ tạo các bài
dưới sàn phải độn nội dung nhân tạo — tách máy móc, bị cấm bởi chính tiêu
chí của lô. Nhưng có một chủ điểm đang ở sai nhà:

- **边 thuộc hệ phương vị, không thuộc nhóm này.** 前边/后边 là dạng từ
  phương vị — cùng hệ với 上/下/里/外/前/后 mà location-nouns (OFF-H1-03)
  đang dạy; người học cần gặp 桌子上 và 学校前边 như một hệ thống vị trí
  duy nhất. Chuyển sang location-nouns còn xử lý gọn cả điểm vượt cấp đã
  ghi ở mục 2: khi chuyển, chỉ lấy 前边/后边 (thuộc H1-03) làm ví dụ/bài
  tập; 左边/右边 chỉ để ở mức liệt kê nhận biết kèm ghi chú, hoặc để dành
  cấp sau — vì 左/右 thuộc OFF-H2-02.
  - Chuyển: bài tập prefix-ex5 (điền 前边） sang location-nouns, đổi ID
    thành locnoun-ex6 (bài tập này mới thêm ở lô std1, lịch sử attempts
    gần như chưa có — đây là thời điểm đổi ID rẻ nhất; nếu Manager muốn
    giữ tuyệt đối thì giữ nguyên ID “prefix-ex5” cũng được, chỉ xấu tên).
  - location-nouns bổ sung: 1 bước công thức về 边， 1 ví dụ （学校前边
    có sẵn trong bài cũ, chuyển nguyên văn). Sau chuyển: 4 ví dụ/6 bài
    tập, độ khó giữ medium.
  - prefix-suffix sau chuyển còn 第/小/们： vẫn giữ một bài, đổi title
    thành “Ngữ tố gắn danh từ: 第 · 小 · 们”, bỏ bước 4 và vế 边 trong
    quick_memory. Ba chủ điểm còn lại cùng một kiểu học (ngữ tố ngắn gắn
    vào danh từ/đại từ, không vị trí câu phức tạp) — giữ chung là hợp lý
    ở mức tải hiện tại.
- Bảo toàn: ID `prefix-suffix` giữ nguyên → tiến độ hoàn thành và thẻ FSRS
  của người đã học không đổi, không nhân đôi. Nội dung thẻ thu hẹp （边 rời
  đi) là thay đổi nội dung trong cùng ID, cùng bản chất với mọi lần sửa
  nội dung tăng content_version trước đây. Người đã hoàn thành
  location-nouns không bị đụng gì; người chưa học sẽ gặp 边 ở đúng chỗ.
  Thứ tự manifest không đổi (cả hai bài giữ nguyên vị trí).

### 3.3 complex-suiran-yinwei (HSK2, medium) → **GIỮ NGUYÊN cấu trúc hai cặp + bổ sung cân bằng trong bài; KHÔNG tách**

- (a) Hai mục tiêu độc lập: cặp nhượng bộ 虽然……但是…… và cặp nhân quả
  因为……所以……. Khác 3.1 ở chỗ mỗi “mục tiêu” ở đây chỉ là một cặp liên
  từ đóng kín — không có vị trí/nghĩa phân tầng như hai cách dùng của 了.
- (b) Thành thạo riêng được, nhưng mỗi phần quá nhỏ: tách ra mỗi bài chỉ
  còn 2–3 ví dụ và 2–3 bài tập, cả hai đều dưới hoặc sát sàn, phải độn.
- (c) Đối chiếu trong bài **chính là** mục tiêu học đặc trưng: lỗi được
  ghi nhận của bài này là ghép chéo cặp （虽然……所以 / 因为……但是） —
  xem confusions 1–2 và bài tập complex-ex4. Lỗi ghép chéo chỉ tồn tại
  và chỉ chữa được khi cả hai cặp nằm cùng một nơi học; tách ra, bài tập
  phân biệt chéo mất chỗ đứng tự nhiên. Đây là điểm khác biệt quyết định
  so với le-completion-change (ở đó phân biệt là bước sau, dời được sang
  bài 2; ở đây phân biệt là nội dung chính, không dời đi đâu được).
- (d) Phủ chưa đều — đây mới là vấn đề thật của bài, và chữa được trong
  bài: cặp 虽然 có chọn + sắp xếp nhưng **không có bài tự sản xuất**;
  cặp 因为 có 2 bài điền trong đó 1 bài tự sản xuất; ví dụ 2 nghiêng
  虽然， 1 cho 因为. Bước công thức 3 (vị trí chủ ngữ chung/riêng) không
  có bài tập nào kiểm tra.
- (e) Tải vừa: 3 ví dụ/5 bài tập, độ khó medium — không quá tải.

**Việc cần làm (trong bài, không đổi ID, không đổi manifest):**
1. Thêm 1 ví dụ cho cặp 因为 (kiểu 因为下雨，所以我没去上课 — kiểm tra lại
   tránh trùng câu với bài tập) → ví dụ cân 2–2.
2. Thêm 1 bài tập tự sản xuất cho cặp 虽然 (điền biến thể mở kiểu “Mặc
   dù trời mưa, tôi vẫn đi học” → 虽然下雨，但是我还是去上学了。 kèm
   accepted_variants), ID mới complex-ex6 đặt cuối danh sách — **không
   đánh số lại** các bài tập hiện có (attempts khóa theo ID bài tập;
   đổi thứ tự/số là tự làm mất lịch sử). Sau bổ sung: 6 bài tập, sản
   xuất cân 1–1, và bài ghép chéo complex-ex4 vẫn giữ vai trò kiểm tra
   tích hợp.
3. Tùy chọn: thêm 1 bài chọn ngắn kiểm tra vị trí chủ ngữ của bước 3 —
   chỉ khi Manager thấy tải còn nhẹ; không bắt buộc cho kết luận này.
- Bảo toàn: bài giữ nguyên ID và vị trí; hoàn thành/FSRS của người đã học
  không đổi (thêm bài tập vào bài đã hoàn thành là tiền lệ sẵn có — người
  học cũ thấy bài mới ở trạng thái chưa làm khi mở lại, không mất thẻ).

### 3.4 Tóm tắt mục 3

| Bài | Kết luận | Thay đổi ID/manifest |
|---|---|---|
| le-completion-change | **TÁCH** thành 2 bài | ID cũ giữ cho 了 hoàn thành; bài mới `le-sentence-final-change` ngay sau trong manifest; 1 bài tập chuyển theo giữ nguyên ID |
| prefix-suffix | **GIỮ + cấu trúc lại**: chuyển 边 sang location-nouns | Không ID mới; prefix-ex5 chuyển bài (đổi ID thành locnoun-ex6 được khuyến nghị); manifest không đổi thứ tự |
| complex-suiran-yinwei | **GIỮ**, bổ sung cân bằng trong bài | Không đổi gì về ID/manifest; thêm complex-ex6 |

Cả ba phương án đều bảo toàn một thẻ FSRS cho mỗi ID cũ — không phương án
nào nhân đôi thẻ hay làm mất hoàn thành đã ghi.

---

## 4. Ghi chú ngoài ba mục (chỉ nêu, không thuộc kết luận)

- Trùng lặp xuyên bài cunxian-chu ↔ zhe-continuation （存现 + 着） đã ghi ở
  mục 2; nếu Manager xử lý, hướng tự nhiên là zhe-continuation chỉ liên
  kết sang cunxian-chu thay vì dạy lại nguyên mẫu — nhưng đó là việc của
  lô nội dung sau, không nằm trong ba việc được giao.
- Phủ lệch tương tự (có ví dụ, không bài tập) còn ở adverbs-du-ye （还/再）
  và modal-xiang-yao （要 “sắp xảy ra”) — đã ghi ở mục 2 để Manager cân
  nhắc khi chọn lô nội dung tiếp theo; báo cáo này không kết luận tách
  hay bổ sung cho các bài đó vì không thuộc phạm vi được giao.
