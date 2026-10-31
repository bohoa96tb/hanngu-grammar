# Ghi chú soạn — Lô HSK1-A (2026-10-31, Agent Nội dung)

4 bài HSK1 mới, mỗi bài 5 bài tập (nhận biết → vị trí → tự dùng), đúng chuẩn
docs/schema.md. Validator sau lô: **ĐẠT — 76 bài, 76 published, 373 bài tập**
(353 + 4×5). Unit test: OK.

## 1. Bài đã tạo

| File | ID | Mục khép | Độ khó |
|---|---|---|---|
| data/lessons/numbers-and-money.json | numbers-and-money | OFF-H1-12 (số từ) + OFF-H1-51 (cách nói số tiền) → covered | easy |
| data/lessons/time-expressions.json | time-expressions | OFF-H1-52 (cách nói thời gian) + OFF-H1-15 (lượng từ thời lượng) → covered | easy |
| data/lessons/he-connecting.json | he-connecting | OFF-H1-24 (liên từ 和) → covered | easy |
| data/lessons/questions-affirmative-negative.json | questions-affirmative-negative | OFF-H1-38 (câu hỏi chính phản) → covered | medium |

Manifest: 4 shard chèn ngay sau `data/lessons/zenme-question.json` (cuối khối
HSK1 trong manifest), thứ tự: numbers → time → he → questions-affirmative-negative.

## 2. Quyết định phạm vi từng bài (để QA soi)

- numbers-and-money: dạy 0–100 và cấu tạo số hai chữ số; 100 （一百） chỉ ở mức
  nhắc trong formula (Mở rộng). Phân biệt 二/两 là trục chính: 二 cho dãy số/
  đếm, 两 trước lượng từ. Tiền: 多少钱 + 块/元； 角/毛 chỉ nhận biết qua
  formula, không có bài tập. Số điện thoại: chỉ nhắc 一 đọc yāo trong dãy số ở
  formula bước 5, không dạy sâu và không có ví dụ số điện thoại đầy đủ (ví dụ
  thực hành dùng số phòng 二零五 để minh họa đọc từng chữ số).
- time-expressions: 号 (nói) vs 日 (viết/trang trọng) dạy ở formula bước 2;
  差 chỉ nhắc trong formula bước 4, không làm bài tập. 岁 xuất hiện trong ví dụ
  4 （我二十岁） như cầu nối, không dạy lại mẫu danh từ làm vị ngữ. Ví dụ 1 dùng
  ngày 31/10 thứ Bảy — khớp lịch thật 2026-10-31 (thứ Bảy), chỉ là ví dụ minh
  họa thứ tự, không phải khẳng định "hôm nay" vĩnh viễn.
- he-connecting: phạm vi hẹp cố ý — 和 chỉ nối danh từ/cụm danh từ. Bẫy cốt
  lõi là dịch từng chữ "và" sang nối động từ/câu (3 confusions đều quanh điểm
  này, 2 bài tập error_spot/choice khóa cùng điểm). 跟 chỉ nhắc là HSK2 trong
  formula bước 4, 告诉 không nhắc (ngoài phạm vi HSK1).
- questions-affirmative-negative: hai vị trí tân ngữ — V不V+O là mẫu dạy chính
  (ví dụ 1 + bài qan-ex4), V+O+不V （你喝茶不喝？) để ở ví dụ 3 và formula bước 2
  với nhãn "chỉ cần nhận biết". Trả lời bằng 是 chỉ đúng khi vị ngữ là 是
  (confusion 3 + qan-ex2). 有没有 dạy như trường hợp đặc biệt (ví dụ 4 +
  qan-ex5).

## 3. Liên kết related_ids (REL-01) — đã áp / không áp

Đã áp (đối xứng, mọi phía còn slot):
- questions-affirmative-negative ↔ ma-question (ma-question trước đó không có
  related_ids; cv 3→4). Bằng chứng: confusion sẵn có của ma-question về
  你忙不忙吗？ chính là mẫu chính phản; hai bài là hai kiểu hỏi có/không thay
  thế nhau.
- questions-affirmative-negative ↔ question-words (question-words đang có
  ['approx-numbers-1'], thêm thành 2 liên kết; cv 5→6). Bằng chứng: nguyên tắc
  "đã có từ để hỏi thì không thêm đuôi hỏi" chạy qua cả hai bài (confusions
  hai phía).
- numbers-and-money ↔ measure-words (measure-words trước đó không có
  related_ids, còn đủ slot; cv 3→4). Bằng chứng: quy tắc 两 trước lượng từ là
  nội dung chung cốt lõi của hai bài （两个人/两本书 xuất hiện ở cả hai).

Không áp:
- time-expressions ↔ location-nouns: theo chỉ đạo của Manager — bỏ (quan hệ
  yếu: thời gian không phải phương vị; vị trí cụm thời gian liên quan tới trật
  tự câu nói chung, không riêng bài phương vị).
- he-connecting: không gắn liên kết nào — chưa có bài "nối câu" ở HSK1 để đối
  chiếu （也 nối ý chỉ được nhắc trong confusions của chính bài, chưa đủ thành
  cặp liên kết có bằng chứng hai phía).

Ba file cũ được sửa (ma-question, question-words, measure-words) CHỈ thêm
related_ids và content_version +1, không đổi nội dung nào khác.

## 4. Catalogue & mapping

- docs/official-catalogue-hsk1-hsk2.json: OFF-H1-12, H1-51 → numbers-and-money;
  OFF-H1-52, H1-15 → time-expressions; OFF-H1-24 → he-connecting; OFF-H1-38 →
  questions-affirmative-negative; cả 6 status "missing" → "covered", lesson_ids
  đã trỏ.
- Đếm lại trực tiếp từ catalogue sau khi sửa: HSK1 **31 covered / 10 partial /
  11 missing** (tổng 52) — khớp dự kiến covered 25→31, missing 17→11, partial
  giữ 10. HSK2 không đổi 20/15/27 (tổng 62).
- docs/baseline-hsk1-hsk2-mapping.md: thêm ghi chú lô HSK1-A với số tổng mới;
  cập nhật 6 dòng mục ở §2 (số từ, lượng từ thời lượng, 和, chính phản, số
  tiền, thời gian) từ THIẾU sang ĐÃ CÓ kèm id bài.

## 5. Vị trí curriculum ĐỀ XUẤT (Manager chèn vào data/curriculum.json)

Nguyên tắc dùng: tiên quyết trước, bài phân biệt sau khi đã biết từng cấu trúc.

1. numbers-and-money — ngay SAU measure-words. Lý do: phần tiền và quy tắc 两
   dùng lượng từ 个/本 đã học ở measure-words （两个苹果、十五块）; ngược lại bài
   số hệ thống hóa cách đọc mà measure-words mới dùng ở mức ví dụ.
2. time-expressions — ngay SAU numbers-and-money. Lý do: ngày/giờ/岁 đều cần
   đọc số thành thạo; học xong bài này người học mới có cụm thời gian để dùng
   trong các bài trật tự câu phía sau.
3. questions-affirmative-negative — ngay SAU question-words (và bắt buộc sau
   ma-question). Lý do: confusions của bài đối chiếu cả hai kiểu hỏi trước
   （吗 và từ để hỏi); ma-question hiện tại đã "nhá" trước dạng 忙不忙 ở
   ma-ex4 nên đặt bài này sau question-words là điểm tổng hợp tự nhiên của
   cụm bài câu hỏi.
4. he-connecting — SAU pronouns, TRƯỚC adverbs-du-ye. Lý do: chỉ cần danh từ/
   đại từ đã biết （我/你/他/妈妈/爸爸）; đây là cầu nối từ câu đơn sang cụm chủ
   ngữ/tân ngữ gồm hai thành viên, nên đặt trước các bài phó từ （都 trong ví
   dụ 妈妈和爸爸都在家 cũng là cầu nối sang adverbs-du-ye).

Thứ tự tương đối của 4 bài trong lộ trình: he-connecting (sau pronouns) có
thể đứng trước cụm measure-words → numbers-and-money → time-expressions →
question-words → questions-affirmative-negative nếu Manager muốn gom cụm
"số–lượng–thời gian–câu hỏi" liên tục; hai phương án không xung đột tiên
quyết nào ngoài các neo đã nêu.

## 6. Điểm chưa chắc chắn — nhờ QA soi kỹ

1. 你喝茶不喝？ (mẫu V+O+不V): mức độ phổ biến/khu vực của mẫu rút gọn này —
   bài đã ghi "chỉ cần nhận biết", nhưng QA nên xác nhận cách diễn đạt trong
   formula không làm người học tưởng đây là mẫu chính ngang hàng V不V+O.
2. 我住二零五号房间。 (numbers ví dụ 4): cấu trúc 住 + số phòng có 号 ở giữa —
   kiểm tra tính tự nhiên; phương án thay thế là 房间号是二零五.
3. 二十块 trong num-ex3 (fill có prompt_zh khung sẵn): biến thể "二十块钱"
   chưa đưa vào accepted_answers vì prompt đã cố định đuôi 块 — QA cân nhắc
   có nên chấp nhận thêm không.
4. tim-ex1: phương án đúng 今天星期五。 không có 是 — kiểm tra các phương án
   nhiễu không vô tình đúng （星期五是今天 có thể bị đọc là câu đúng nghĩa khác).
5. 桌子上有一本书和一个本子。 (he ví dụ 3): tokens tách 一/本 và 一/个 — kiểm
   tra nhất quán với cách tách token của bài measure-words/location-nouns.
