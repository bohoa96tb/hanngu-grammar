# QA độc lập — Lô HSK1-A + kiểm kê/lộ trình (2026-10-31)

- Vai trò: QA nội dung độc lập. Không tin báo cáo của agent soạn
  (docs/reviews/hsk1a-draft-notes.md) — mọi kết luận dưới đây do QA tự đọc
  dữ liệu thật, tự giải lại toàn bộ 20 bài tập, tự đếm lại bằng script.
- Phạm vi: 4 bài mới (numbers-and-money, time-expressions, he-connecting,
  questions-affirmative-negative), nhất quán catalogue/manifest/baseline/
  related_ids, data/curriculum.json, docs/curriculum-inventory.md,
  validator.
- Validator tự chạy: `python3 scripts/validate.py` →
  **ĐẠT: 76 bài, 76 bài published, 373 bài tập** (khớp con số agent soạn nêu).

## PHÁN QUYẾT: PASS sau sửa nhỏ

Không có lỗi Nghiêm trọng: không bài nào dạy sai ngữ pháp, không đáp án khai
báo nào sai, pinyin và bản dịch đều khớp. Có 4 điểm Quan trọng — tất cả đều
là sửa nhỏ (bổ sung biến thể đáp án / cập nhật tài liệu / thêm ví dụ), không
điểm nào phải soạn lại bài.

---

## A. Bốn điểm Quan trọng

### Q1. num-ex3 (numbers-and-money, fill) — thiếu biến thể đúng rõ ràng nhất
- Khung prompt_zh là `这本书___块。` — đáp án điền đúng nghĩa đen của ô trống
  là **二十**, nhưng `accepted_answers` KHÔNG có "二十" (chỉ có câu đầy đủ
  "这本书二十块。" và cụm "二十块"). Người học làm đúng theo khung sẽ bị chấm
  sai. So sánh trong cùng lô: tim-ex2, he-ex3, qan-ex3 đều chấp nhận đúng
  phần điền của ô trống — riêng num-ex3 lệch quy ước này.
- Đồng thời thiếu biến thể **二十块钱**: "这本书二十块钱。" là câu đúng và tự
  nhiên (chính bài dạy 两块钱 ở formula). Agent soạn đã tự gắn cờ điểm này
  (§6.3) nhưng chỉ nêu phần 钱, chưa thấy phần thiếu "二十".
- Sửa đề xuất: thêm "二十", "这本书二十块钱。", "这本书二十块钱", "二十块钱。",
  "二十块钱" (và cân nhắc "二十。" nếu hệ thống chấm cho phép đáp án chỉ gồm
  phần điền — tim-ex2/he-ex3 cho thấy quy ước hiện tại là chấp nhận cụm điền
  kèm đơn vị, nên tối thiểu phải có "二十块" dạng tương đương; điểm cốt lõi
  là ô trống = 二十 phải được chấp nhận).
- Hệ quả phụ cùng họ: num-ex5 cũng chưa chấp nhận "两个苹果十块钱。"/
  "两个苹果，十块钱。" — xếp Hoàn thiện (H5) vì num-ex5 là bài tự viết tự do,
  mức độ "đúng hiển nhiên" thấp hơn một chút, nhưng nên bổ sung cùng đợt.

### Q2. qan-ex4 (questions-affirmative-negative, order) — có HAI thứ tự tự nhiên dựng được
- Tokens [茶, 喝, 你, 不, 喝] dựng được cả đáp án đã khai
  [你, 喝, 不, 喝, 茶] （你喝不喝茶） **và** [你, 喝, 茶, 不, 喝] （你喝茶不喝）.
- Cách thứ hai không phải câu sai: chính bài này dạy nó ở ví dụ 3 và formula
  bước 2 ("cũng gặp mẫu động từ + tân ngữ + 不 + động từ"). Người học xếp
  theo mẫu đã học trong cùng bài mà bị chấm sai là lỗi hai đáp án của dạng
  order.
- Sửa đề xuất: hoặc thêm thứ tự [你, 喝, 茶, 不, 喝] vào accepted_answers
  (kèm ghi chú trong explanation rằng đây là mẫu "chỉ nhận biết"), hoặc đổi
  bài tập sang một động từ/tân ngữ không dựng được mẫu V+O+不V một cách tự
  nhiên. QA nghiêng về phương án thêm đáp án — trung thực với nội dung bài.

### Q3. time-expressions — tuyên bố covered cho OFF-H1-15/H1-52 hơi quá ở hai điểm con: 年 và 分
- 年: chỉ xuất hiện trong pattern và formula bước 1 (thứ tự năm→tháng→ngày).
  Không có ví dụ nào dùng 年 (kể cả dạng 二零二六年… hay 一年), không bài tập.
- 分: chỉ nhắc ở formula bước 4 ("số + 分 là phút"). Không ví dụ, không bài
  tập — người học chưa từng thấy một câu giờ-phút hoàn chỉnh (kiểu 三点十分).
- Bài có ghi minh bạch với 差 ("chỉ nhắc, chưa luyện") nhưng KHÔNG ghi tương
  tự cho 年/分, trong khi catalogue đã chuyển cả OFF-H1-15 (tựa mục ghi rõ
  日/号/岁/点/分/年/天) và OFF-H1-52 sang covered.
- Sửa đề xuất (nhỏ): thêm 1 ví dụ có năm (ví dụ nối luôn ví dụ 1:
  二零二六年十月三十一号) và 1 ví dụ giờ-phút （三点十分 hoặc đổi một bài tập),
  HOẶC giữ nguyên nội dung nhưng ghi rõ trong review/catalogue note rằng
  年/分 ở mức nhắc — khi đó trạng thái covered cần được Manager cân nhắc lại.
  QA nghiêng về thêm ví dụ: chi phí rất thấp, khép đúng tuyên bố.

### Q4. docs/curriculum-inventory.md — số liệu HSK1 và tổng đã cũ so với catalogue thật sau lô
QA tự đếm bằng script từ 3 file catalogue (ngày 2026-10-31):

| Cấp | Mục nhóm | covered | partial | missing | Inventory §2 ghi | Khớp? |
|---|---|---|---|---|---|---|
| HSK1 | 52 | **31** | 10 | **11** | 25 / 10 / 17 | ✗ |
| HSK2 | 62 | 20 | 15 | 27 | 20 / 15 / 27 | ✓ |
| HSK3 | 50 | 32 | 4 | 14 | 32 / 4 / 14 | ✓ |
| HSK4 | 34 | 1 | 0 | 33 | 1 / 0 / 33 | ✓ |
| HSK5 | 31 | 0 | 0 | 31 | 0 / 0 / 31 | ✓ |
| HSK6 | 22 | 0 | 0 | 22 | 0 / 0 / 22 | ✓ |
| Tổng | **251** ✓ | 84 | 29 | 138 | 78 / 29 / 144 | ✗ (do HSK1) |

- Tổng 251 mục nhóm và số mục từng cấp đều đúng. Chỉ HSK1 lệch — dễ hiểu vì
  inventory được lập trước lô HSK1-A, nhưng tài liệu tự xưng là "danh mục
  thiếu sót chính thức" nên sau khi tích hợp lô phải cập nhật, nếu không
  người đọc sẽ tưởng 6 mục vừa khép vẫn còn MISSING.
- Các chỗ cụ thể cần sửa: bảng §2 (HSK1 25→31, 17→11; tổng 78→84, 144→138;
  bài phát hành 72→76); §3.1 (tiêu đề "20 bài" → 24 bài; 6 dòng OFF-H1-12/
  51/52/15/24/38 vẫn để ở bảng MISSING với ghi chú "đang thực hiện" → chuyển
  sang COMPLETE); §5.1 (mô tả "HSK1 (20 bài)" và thứ tự cũ, chưa có 4 bài
  mới); §7 (tự kiểm ghi 72 id, phân bố 20/17/34/1/0/0 → nay là 76 id,
  24/17/34/1/0/0 — phần tự kiểm này áp cho curriculum.json hiện tại là sai).

---

## B. Kiểm tra nội dung từng bài (tự giải toàn bộ 20 bài tập)

### numbers-and-money — đạt, trừ Q1
- Quy tắc/công thức/ví dụ/Nhớ nhanh nhất quán: trục 二/两 xuyên suốt
  formula, confusion 1, ví dụ 3, num-ex5. 100 （一百） và 角/毛 và yāo đúng
  như tuyên bố phạm vi: chỉ nhắc trong formula, không ví dụ sâu, không bài
  tập — nhất quán.
- Pinyin tự đọc lại cả 4 ví dụ: đúng hết (èrshísān, shíwǔ, Liǎng gè…).
  Bản dịch Việt khớp nghĩa.
- Bài tập: num-ex1 đáp án 四十七 đúng, các nhiễu đều sai thật （七十四 được
  giải thích rõ trong explanation). num-ex2 đúng duy nhất. num-ex4 order
  duy nhất. num-ex5 đáp án đúng （两 trước 个).
- Ví dụ 1 dùng 岁 trước khi time-expressions dạy — agent soạn có ghi là cầu
  nối chủ động; chấp nhận được (từ này tự giải nghĩa qua bản dịch).

### time-expressions — đạt, trừ Q3
- Thứ tự lớn→nhỏ, 号 (nói) vs 日 (viết/trang trọng), vị trí cụm thời gian
  trước động từ: nhất quán giữa formula/confusions/ví dụ/bài tập.
  差 đúng tuyên bố: chỉ nhắc ở formula bước 4, không bài tập nào đòi dùng.
- Ví dụ 1: ngày 31/10 thứ Bảy — QA tự kiểm lịch: 2026-10-31 đúng là thứ
  Bảy. Pinyin đúng (sānshíyī hào, xīngqīliù).
- Bài tập: tim-ex2 biến thể đầy đủ đúng quy ước ô trống; tim-ex3 order duy
  nhất; tim-ex4 error_spot đúng — khối sai là 明天 (đặt cuối câu), câu sửa
  我明天去学校。 đúng; tim-ex5 chấp nhận cả 号/日 và có/không có 是 — tốt.

### he-connecting — đạt
- Phạm vi hẹp （和 chỉ nối danh từ/cụm danh từ) nhất quán tuyệt đối: 3
  confusions, 2 bài tập (he-ex2, he-ex5) cùng khóa một điểm này. 跟 chỉ nhắc
  kèm nhãn HSK2 ở formula bước 4 — đúng mức, không lọt nội dung cấp cao vào
  bài tập.
- Pinyin đúng cả 4 ví dụ, gồm biến điệu yì běn / yí gè ở ví dụ 3.
- Bài tập: he-ex1/ex2 đáp án duy nhất đúng (các nhiễu của he-ex2 chính là
  các câu sai trong confusions — khớp); he-ex3 biến thể đúng quy ước;
  he-ex4 order duy nhất; he-ex5 error_spot đúng khối 和, câu sửa dùng 也
  khớp confusion 1.

### questions-affirmative-negative — đạt, trừ Q2
- Hai vị trí tân ngữ trình bày đúng vai: V不V+O là mẫu dạy chính (pattern,
  ví dụ 1, qan-ex4), V+O+不V ở ví dụ 3 + formula bước 2 với nhãn "chỉ cần
  nhận biết". Không bài tập nào bắt người học *sản xuất* mẫu thứ hai
  (qan-ex4 là sự chồng chéo token ngoài ý muốn — xem Q2, không phải chủ
  đích thiết kế).
- Trả lời bằng 是 chỉ khi vị ngữ là 是： nhất quán giữa formula bước 3,
  confusion 3 và qan-ex2. 有没有 dạy như trường hợp đặc biệt và được luyện
  ở qan-ex5 — nhất quán.
- Bài tập còn lại: qan-ex1 đáp án duy nhất đúng ở chuẩn HSK1; qan-ex3 biến
  thể đúng quy ước ô trống.

---

## C. Phán quyết riêng cho 5 điểm agent soạn tự gắn cờ (§6 draft-notes)

1. **你喝茶不喝？ / "chỉ nhận biết" — ĐẠT.** Mẫu V+O+不V là mẫu khẩu ngữ có
   thật và được ghi nhận ở tài liệu A1 (dạng rút gọn thân mật, phổ biến hơn
   ở phương Bắc). Cách ghi trong bài không gây ngộ nhận ngang hàng: pattern
   chỉ ghi mẫu chính, formula bước 2 mở đầu bằng "thường để tân ngữ ở cuối"
   cho mẫu chính rồi mới "cũng gặp… bài này chỉ cần nhận biết mẫu thứ hai".
   Giữ nguyên. (Điểm trừ duy nhất liên quan là Q2 — do token của qan-ex4,
   không phải do cách ghi.)
2. **我住二零五号房间。 — ĐẠT (tự nhiên ở mức chấp nhận được), góp ý nhỏ.**
   "205号房间" là cụm danh từ chuẩn (số + 号 + 房间), và 住 + cụm nơi chốn
   như vậy dùng được trong khẩu ngữ. Dạng đầy đủ trang trọng hơn là
   我住在二零五号房间。/ 我的房间是二零五号。— với người học HSK1, thêm 在
   sẽ tự nhiên và an toàn hơn, nhưng câu hiện tại không sai. Xếp Hoàn thiện
   (H3), không bắt buộc sửa.
3. **Biến thể "二十块钱" ở num-ex3 — CÓ TH
...[truncated 3505 chars]