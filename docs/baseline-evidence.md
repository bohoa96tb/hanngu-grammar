# Bằng chứng khóa baseline 1.0 — và giới hạn của nó (29/10/2026)

## 1. Nguồn gốc
- Trang chính thức: https://www.chinesetest.cn/HSK — mục Examination Syllabus.
- File tài liệu do trang đó dẫn tới:
  https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf
- Cách truy cập trong phiên này: text fetch toàn văn qua công cụ đọc trang
  (không tải file gốc về máy, không ghi hash của file). Bản text fetch mà
  công cụ trả về ghi "Page crawled 2026-09-25" — tức nội dung đọc được là
  bản crawl ngày 25/09/2026 của URL đó, không phải bản tải trực tiếp ngày
  29/10/2026. Nếu file gốc đã sửa sau 25/09/2026, bản đọc này có thể cũ.
  Đây là một giới hạn bằng chứng, ghi rõ ở mục 6.

## 2. Phiên bản tài liệu (đọc từ bìa, không suy ra từ tên file)
- Tên: Syllabus for the Chinese Proficiency Test (新版HSK考试大纲).
- Nhà phát hành: 中外语言交流合作中心.
- Phát hành: 2025-11 (2025-11 发布). Có hiệu lực: 2026-07 (2026-07 实施).
- Phân biệt: đây là ĐỀ CƯƠNG THI, không phải chuẩn năng lực 2021
  (GF 0025-2021, 9 cấp, cấp 1: 500 từ, 48 điểm gộp) và không phải HSK cũ 2.0.

## 3. Trang chứa ngữ pháp (theo mục lục của tài liệu)
- 语法大纲 bắt đầu trang 382; HSK（一级） tr.382, HSK（二级） tr.386,
  HSK（三级） tr.389, HSK（四级） tr.392, HSK（五级） tr.395,
  HSK（六级） tr.398, HSK（七—九级） tr.400.
- Trang kết thúc từng cấp suy ra từ trang bắt đầu của cấp tiếp theo
  (ví dụ HSK1: 382–385), không phải số trang in trực tiếp cho trang cuối.
- Các phần khác của tài liệu: 任务大纲 tr.1, 话题大纲 tr.55,
  词汇大纲 tr.76, 汉字大纲 tr.352. Baseline ngữ pháp chỉ dùng 语法大纲;
  词汇大纲 và 汉字大纲 chưa được dùng để đối chiếu bài học.

## 4. Số mục từng cấp và cách đếm — ĐỌC KỸ MỤC NÀY
- Tài liệu gốc KHÔNG đánh số từng điểm ngữ pháp trong 语法大纲. Các bảng
  trình bày theo nhóm: 语素 / 词类 / 短语 / 句子成分 / 句型 / 句子的类型 /
  复句 / 动作的态 / 特殊表达法.
- Vì vậy KHÔNG CÓ số mục chính thức từng cấp để đối chiếu. Số liệu
  70/148/244/339/409/459 (tích lũy cấp 1–6) là cách đếm của các bản tổng
  hợp thứ cấp (Hanzio, ioChinese, PassHSK), KHÔNG phải số thứ tự trong
  tài liệu gốc và KHÔNG được dùng làm số mục baseline.
- Số mục trong docs/curriculum-baseline.json là CÁCH CHIA NHÓM CỦA DỰ ÁN:
  HSK1: 12 nhóm, HSK2: 12 nhóm, HSK3: 10 nhóm, HSK4: 7 nhóm, HSK5: 5 nhóm,
  HSK6: 4 nhóm — tổng 50 nhóm. Con số 50 là số nhóm do dự án tự chia từ
  các bảng gốc, không phải tổng số điểm ngữ pháp của đề cương.
- Trạng thái theo nhóm: covered 4, partial 8, not_started 38 (tại thời
  điểm baseline 1.0; sau lô 2 và lô 3, các nhóm có bài mới sẽ chuyển trạng
  thái, nhưng tổng số nhóm vẫn là cách chia của dự án).

## 5. Phần đã đối chiếu
- Đã đọc hết phần 语法大纲 HSK1–6 trong bản text fetch (từ dòng 12970
  tới cuối tài liệu) và đối chiếu cấp độ của 12 bài mẫu đầu tiên, sửa hai
  ánh xạ: 了 → HSK1 (hoàn thành + biến đổi đều thuộc HSK（一级）),
  在/正在 → HSK1 (thể tiến hành thuộc HSK（一级）).
- Đã đọc phần 语法大纲 HSK7–9 (cuối tài liệu) để biết ranh giới, nhưng
  HSK7–9 ngoài phạm vi dự án (HSK1–6) nên không lập mục.

## 6. Phần CHƯA đối chiếu — vì vậy trạng thái phải sửa
- (a) Điểm vi mô: chưa đối chiếu từng điểm nhỏ trong mỗi nhóm (ví dụ
  từng lượng từ, từng phó từ) với bảng gốc; ánh xạ hiện tại chỉ ở mức
  nhóm và mức bài học.
- (b) Chất lượng trích xuất: bản text fetch làm xáo trộn bố cục bảng
  (các ô bảng bị tách dòng, ký tự trang trí xen kẽ), nên việc đọc nhóm
  có thể bỏ sót hoặc gộp nhầm một số điểm nhỏ. Chưa đối chiếu lại bằng
  bản PDF gốc trực quan.
- (c) Tính thời điểm: bản đọc là crawl 25/09/2026, chưa xác minh file
  gốc có sửa sau đó hay không, chưa ghi hash file.
- (d) Quyền phân phối: chưa tìm thấy tuyên bố giấy phép cho phép sao
  chép; repo chỉ diễn đạt lại bằng tiếng Việt, không chứa PDF gốc,
  không chứa bảng gốc nguyên văn, không sao chép câu ví dụ của đề cương.
- (e) Từ vựng/chữ Hán: 词汇大纲 và 汉字大纲 chưa được đối chiếu; baseline
  này chỉ là baseline NGỮ PHÁP, không phải baseline từ vựng/chữ Hán.

## 7. Kết luận trạng thái (sửa lại cho đúng)
- KHÓA PHẠM VI DỰ ÁN (mức nhóm): đã khóa — 50 nhóm phạm vi HSK1–6,
  mỗi nhóm có cấp chính thức, tham chiếu mục lục và trạng thái ánh xạ.
- XÁC MINH ĐẦY ĐỦ DANH MỤC CHÍNH THỨC: CHƯA — vì các điểm (a), (b), (c)
  ở mục 6. Do đó trạng thái baseline trong
  docs/curriculum-baseline.json được sửa từ "locked_scope_paraphrased"
  thành "scope_groups_locked_official_catalogue_not_fully_verified",
  và task P01-02 quay lại in_progress cho phần xác minh danh mục đầy đủ.
  Không được gọi baseline là "đã khóa toàn bộ" hay "đã xác minh đầy đủ".
