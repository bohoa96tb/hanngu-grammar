# Đối chiếu danh mục chính thức HSK5–6 với 39 bài hiện có (P01-02, phần HSK5–6)

Nguồn: 语法大纲 trong đề cương thi HSK 3.0 (2025-11 发布, 2026-07
实施), phần HSK5 bắt đầu tr.395, HSK6 tr.398. Văn bản dùng để đối
chiếu là bản trích xuất ngày 2026-09-25 từ URL chính thức ghi trong
docs/baseline-evidence.md; chưa ghi hash file gốc nên các lần kiểm
tra sau cần đối chiếu lại nếu tài liệu có bản sửa.
Nội dung dưới đây là diễn giải bằng tiếng Việt của dự án, không sao
chép nguyên văn bảng hay câu ví dụ của đề cương (quyền phân phối
chưa xác minh). Các nhóm của dự án giữ riêng, không đồng nhất với
danh mục chính thức.

Trạng thái: ĐÃ CÓ / MỘT PHẦN / THIẾU, cùng nghĩa như các tài liệu đối
chiếu HSK1–2 và HSK3–4. Số mục nhóm là cách chia của dự án để đối
chiếu, KHÔNG phải số mục chính thức trong đề cương và KHÔNG được
dùng thay cho số chính thức. Bố cục bảng trong bản trích bị nhòe ở
một số hàng nên nhóm con của một vài mục ghi chú "chưa chắc chắn"
(xem ghi chú trong docs/official-catalogue-hsk5-hsk6.json).

## 1. Kết luận nhanh
- HSK5: 31 mục nhóm — tất cả đều THIẾU. HSK6: 22 mục nhóm — tất cả
  đều THIẾU. Nguyên nhân đơn giản: 39 bài đã phát hành của dự án đều
  thuộc HSK1 (20 bài), HSK2 (15 bài), HSK3 (4 bài); chưa có bài
  HSK4, HSK5 hay HSK6 nào, nên không mục HSK5–6 nào có bài tương
  ứng, kể cả ở mức một phần.
- Không cần sửa cấp độ cho 39 bài cũ: các bài HSK1–3 không dạy nội
  dung thuộc phạm vi HSK5–6.
- Sau lô này, P01-02 đã đối chiếu đủ 6 cấp ở mức mục nhóm của dự
  án. Trạng thái tổng thể của baseline KHÔNG đổi: vẫn là khóa phạm
  vi ở mức nhóm của dự án, CHƯA xác minh đầy đủ danh mục chính
  thức — các giới hạn ở mục 6 của docs/baseline-evidence.md vẫn
  nguyên hiệu lực (bản trích crawl 2026-09-25 chưa ghi hash, bố
  cục bảng trích bị nhòe ở một số hàng, điểm vi mô chưa đối chiếu
  từng điểm nhỏ, quyền phân phối chưa xác minh).

## 2. HSK5 — toàn bộ 31 mục nhóm đều thiếu
Danh sách đầy đủ ở docs/official-catalogue-hsk5-hsk6.json
(OFF-H5-01 → OFF-H5-31). Các khối chính: hậu tố —头; đại từ
彼此/如此/本; lượng từ HSK5; các phó từ HSK5 (mức độ, thời gian,
tần suất, cách thức/liên kết/tình thái, ngữ khí); giới từ
自从/朝/沿(着)/替/同/凭/据/依据; liên từ và trợ từ 似的; tứ tự
cách, cụm cố định và mẫu cố định HSK5; đa trạng ngữ; các bổ ngữ
mở rộng (khả năng 得/不得, mức độ 得+不得了, xu hướng dạng 3,
trạng thái dạng 2); các mẫu câu mở rộng （有字句 dạng 3, 把字句
dạng 3, 被动句 dạng 3, 连动句 dạng 3, 比较句 dạng 4); và 8 loại
câu phức HSK5 （承接/ lựa chọn/ giả thiết/ nhân quả/ nhượng bộ/
递进/ mục đích/ 紧缩).

## 3. HSK6 — toàn bộ 22 mục nhóm đều thiếu
Danh sách đầy đủ ở docs/official-catalogue-hsk5-hsk6.json
(OFF-H6-01 → OFF-H6-22). Các khối chính: loại tiền tố
超—/多—/反—/无—/亚—/准— và loại hậu tố —化/—式/—型/—性; nhân
xưng 人家; lượng từ HSK6; các phó từ HSK6; giới từ 于/因/至于/除;
liên từ 不料 và các trợ từ （所/啦/嘛/也好); tứ tự cách, cụm cố
định và mẫu cố định HSK6; mức độ bổ ngữ dạng 3 (+透+了); 把字句
dạng 4; và 6 loại câu phức HSK6 (song song/ lựa chọn/ chuyển
ngoặt/ điều kiện/ nhượng bộ/ mục đích).

## 4. Nhóm ưu tiên và điều kiện tiên quyết cho các lô sau
HSK5–6 không nên làm trước khi phần còn thiếu của HSK3–4 xong,
vì hầu hết mục HSK5–6 là dạng mở rộng của cùng một chủ điểm ở
cấp dưới. Các chuỗi phụ thuộc chính:

1. Chuỗi mẫu câu đặc biệt (làm theo thứ tự dạng tăng dần):
   - 把字句: dạng 1 (HSK3, đã có) → dạng 2 (HSK4) → dạng 3
     OFF-H5-20 → dạng 4 OFF-H6-16.
   - 被动句: dạng 1 (HSK3, đã có) → dạng 2 (HSK4, 叫/让) →
     dạng 3 OFF-H5-21.
   - 比较句: dạng 1 (HSK2, đã có) → dạng 2 (HSK3, đã có) →
     dạng 3 (HSK4) → dạng 4 OFF-H5-23.
   - 连动句 và 有字句: các dạng HSK1–4 tương ứng trước, rồi
     OFF-H5-22 （连动 dạng 3) và OFF-H5-19 （有字句 dạng 3).
2. Chuỗi bổ ngữ:
   - Khả năng bổ ngữ: dạng 1 (HSK3) → dạng 2 (HSK4, 得/不+了)
     → OFF-H5-15 （得/不得).
   - Mức độ bổ ngữ: dạng 1 (HSK3) → dạng 2 (HSK4, 死了/厉害)
     → OFF-H5-16 （得+不得了) → dạng 3 OFF-H6-15 （透).
   - Trạng thái bổ ngữ: dạng 1 (HSK2, đã có) → dạng 2
     OFF-H5-18. Xu hướng bổ ngữ: dạng 1–2 (HSK2–3) → dạng 3
     OFF-H5-17.
3. Chuỗi câu phức: mỗi loại câu phức HSK5 (OFF-H5-24 → 31) và
   HSK6 (OFF-H6-17 → 22) mở rộng cùng loại ở HSK3–4 （承接,
   lựa chọn, giả thiết, điều kiện, nhượng bộ, 递进, nhân quả,
   mục đích, 紧缩), nên làm sau khi loại tương ứng ở HSK3–4 đã
   có bài; riêng OFF-H5-26 （一旦/假如/万一) cần giả thiết
   HSK3–4 vững trước, OFF-H6-20 （除非/凡是) cần điều kiện
   HSK3–4 （只有/只要/不管/无论) vững trước.
4. Từ loại HSK5–6 (phó từ OFF-H5-04 → 08, OFF-H6-05 → 09; giới
   từ OFF-H5-09, OFF-H6-10; liên từ/trợ từ OFF-H5-10,
   OFF-H6-11; lượng từ OFF-H5-03, OFF-H6-04): phụ thuộc yếu hơn,
   có thể đi song song theo cấp, nhưng người học cần nền từ
   loại cùng nhóm ở HSK3–4 trước （尤其 phó từ ngữ khí và giới
   từ chỉ nên dạy khi đã phân biệt được các phó từ/giới từ cấp
   dưới hay nhầm lẫn với chúng).
5. Ngữ tố và cụm/mẫu cố định （语素 OFF-H5-01, OFF-H6-01/02;
   tứ tự cách, cụm cố định, mẫu cố định OFF-H5-11 → 13,
   OFF-H6-12 → 14): điều kiện tiên quyết thấp nhất, có thể xen
   kẽ để đổi nhịp trong lô HSK5/HSK6, nhưng mẫu cố định HSK6
   giả định người học đã đọc thông thạo ở mức HSK5.

Thứ tự gợi ý tổng thể: hoàn tất phần thiếu HSK3 → HSK4 → HSK5
theo các chuỗi 1–3 (xen 4–5) → HSK6 cuối cùng.

## 5. Tổng hợp phạm vi P01-02 sau lô này
| Cấp | Tài liệu đối chiếu | Số mục nhóm của dự án | Trạng thái đối chiếu |
|---|---|---|---|
| HSK1 | docs/baseline-hsk1-hsk2-mapping.md | 52 | Đã đối chiếu (lô trước) |
| HSK2 | docs/baseline-hsk1-hsk2-mapping.md | 62 | Đã đối chiếu (lô trước) |
| HSK3 | docs/baseline-hsk3-hsk4-mapping.md | 50 | Đã đối chiếu (lô trước) |
| HSK4 | docs/baseline-hsk3-hsk4-mapping.md | 34 | Đã đối chiếu (lô trước) |
| HSK5 | file này | 31 | Đã đối chiếu (lô này) — tất cả thiếu |
| HSK6 | file này | 22 | Đã đối chiếu (lô này) — tất cả thiếu |

Kết luận P01-02: đối chiếu phạm vi đã đủ 6 cấp ở mức mục nhóm
của dự án (tổng 251 mục nhóm do dự án tự chia, không phải số
mục chính thức). Baseline vẫn giữ trạng thái "khóa phạm vi ở
mức nhóm — chưa xác minh đầy đủ danh mục chính thức" theo
docs/baseline-evidence.md; phần việc còn lại của P01-02 là xác
minh sâu (điểm vi mô, bản PDF gốc trực quan, hash file) chứ
không còn là đối chiếu phạm vi theo cấp.

## 6. Điểm mở từ lô std2: 几 và 多少 trong phần HSK1 của bản gốc
Câu hỏi: bài question-words đang ghi hsk_evidence là "partial"
vì phần 几/多少 chưa có mục tương ứng trong danh mục đối chiếu
của dự án; cần kiểm tra bản gốc xem HSK1 có liệt kê 几 và 多少
là từ để hỏi hay không.

Kết quả kiểm tra trong bản gốc (phần 语法大纲, bảng HSK（一级）,
nhóm 词类 → 代词 → 疑问代词): hàng đại từ nghi vấn của HSK1 liệt
kê, ở mức tên gọi cấu trúc: 多、多少、几、哪、哪儿、哪里、哪些
cùng 什么、谁、怎么、怎么样 (bản trích tách ô bảng thành hai
dòng kề nhau nhưng cùng một mục 疑问代词 của HSK1). Như vậy cả
几 và 多少 đều được bản gốc xếp vào từ để hỏi thuộc HSK1.
（几 còn xuất hiện riêng ở HSK2 trong 概数表达法1 "dùng 几 chỉ
số ước lượng" — đó là cách dùng khác, không đổi kết luận trên.)

Kết luận: phần 几/多少 của bài question-words có bằng chứng
trực tiếp từ bản gốc ở mức mục nhóm, nên hsk_evidence của bài
này đủ điều kiện đổi từ "partial" thành "verified" (trong phạm
vi khóa nhóm của dự án, cùng các giới hạn bằng chứng chung ở
mục 1). Đây chỉ là kết luận đối chiếu; việc sửa dữ liệu bài
học do Manager quyết định và giao thực hiện sau — file này
không tự sửa data/.
