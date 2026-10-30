# QA lô HSK3-5 — kiểm định độc lập (30/10/2026)

Phạm vi: 4 bài mới (complex-sequence, complex-choice, complex-purpose,
quantity-complement-3); đối chiếu bài cũ complex-compact, yi-jiu-tight,
rhetorical-question, hai-shi-choice; catalogue
docs/official-catalogue-hsk3-hsk4.json; tài liệu ánh xạ
docs/baseline-hsk3-hsk4-mapping.md (mục 1, 2, 2b); bằng chứng nguồn:
bản trích xuất đề cương thi HSK 3.0 (URL ghi trong
docs/baseline-evidence.md, crawl 2026-09-25 — chính là bản dự án dùng
để lập catalogue), đọc trực tiếp phần 语法大纲 HSK2/HSK3/HSK4.

QA ngôn ngữ độc lập với CI: kết quả harness/validator ở mục E chỉ là
kiểm tra hệ thống, KHÔNG được dùng làm bằng chứng chất lượng nội dung.
Các bài mới vẫn là "đã rà soát nội bộ" — audio TTS trên thiết bị thật
chưa nghiệm thu (AUD-TTS-01 not_run).

## Kết luận tổng: CHƯA ĐẠT

- complex-sequence: ĐẠT (nội dung + nhất quán).
- complex-purpose: ĐẠT, 2 điểm Hoàn thiện.
- complex-choice: nội dung tiếng Trung ĐẠT, nhưng trạng thái phủ
  OFF-H3-42 và hsk_evidence SAI (mục C1) — lỗi Quan trọng.
- quantity-complement-3: nội dung tự thân đúng và nhất quán, nhưng
  dạy LỆCH chủ điểm OFF-H3-32 (mục C2 — lỗi Nghiêm trọng) và nền
  "dạng 2" mà bài giả định là đã học thực ra chưa có bài nào dạy
  (mục C3 — lỗi Quan trọng). Không được phát hành bài này với tư
  cách "đã phủ OFF-H3-32".

---

## A. Kiểm nội dung từng bài

### A1. complex-sequence （先……，然后/接着……) — ĐẠT

- 5 ví dụ đều đúng, tự nhiên; tokens khớp câu (validator quy tắc 4 đạt).
- seq-ex1: đáp án 我先回家，然后做作业。 duy nhất đúng; 3 nhiễu sai
  đúng như lời giải （先 sai vị trí; đảo thứ tự việc; thừa 了 sau 然后）.
- seq-ex2 (order): thứ tự duy nhất hợp lý. seq-ex3 (error_spot): khối
  了 là đáp án đúng và duy nhất. seq-ex4 (fill): nhận cả 接着 và 然后
  kèm/không dấu câu — biến thể hợp lệ không bị loại; hint công khai
  cả hai. seq-ex5: nhận 喝点儿水 và 接着 — tốt.
- Confusion 1 (verdict sai_ngu_phap cho 我洗手先）: đúng hạng.
  Confusion 3 (verdict thay_duoc_co_dieu_kien cho mẫu nén): chấp
  nhận được, lời giải giới hạn phạm vi đúng.
- Ranh giới với complex-compact (……了就……) và yi-jiu-tight
  （一……就……): trình bày nhất quán ở cả 4 chỗ (when_to_use, công
  thức bước 3, confusion 3, lời giải seq-ex4) và khớp nội dung hai
  bài cũ. Đối chiếu nguồn: exemplar chính thức của 承接复句 HSK3 là
  先……，再/然后…… — bài dạy 然后/接着 làm chính, 再 có nhắc ở bước 2
  ("cũng gặp") — chấp nhận được.
- Không có kết luận tuyệt đối quá phạm vi.

### A2. complex-choice （不是……，就是……; 或者……，或者……) — nội dung ĐẠT; phạm vi SAI (xem C1)

- 5 ví dụ đúng; cả hai khung được dùng đúng sắc thái đã tuyên bố
  （不是……就是…… = suy đoán chắc chắn; 或者……或者…… = trung tính).
- choice-ex1: đáp án đúng; phương án 或者……，或者…… bị loại vì
  KHÔNG khớp sắc thái đề yêu cầu ("suy đoán chắc chắn") và lời giải
  nói đúng lý do này, không kết án nó sai ngữ pháp — xử lý chuẩn
  theo nguyên tắc không tuyệt đối.
- choice-ex2 (order) duy nhất; choice-ex3 (error_spot, khối 还是）
  đúng; choice-ex4 là fill ghim mẫu bằng hint + yêu cầu sắc thái rõ
  trong đề — chấp nhận được theo quy ước bài luyện mẫu; choice-ex5
  nhận biến thể 这个周末 — tốt.
- 3 confusions verdict đúng hạng: ghép chéo 不是…或者… =
  sai_ngu_phap; 还是 trong trần thuật = sai_ngu_phap; nhầm phản vấn
  = doi_nghia. Ranh giới với hai-shi-choice và rhetorical-question
  khớp nội dung hai bài cũ.
- Vấn đề của bài nằm ở C1 (phạm vi/cấp độ), không nằm ở câu chữ.

### A3. complex-purpose （为了……) — ĐẠT, 2 điểm Hoàn thiện

- 5 ví dụ đúng; purp-ex2 (order) nhận CẢ HAI thứ tự hợp lệ (vế 为了
  đầu câu / sau chủ ngữ) — xử lý biến thể mẫu mực. purp-ex3, ex4, ex5
  đáp án đúng, duy nhất theo yêu cầu đề.
- Ranh giới với 为 + người (gei-double-object) và mục đích bằng hai
  động từ nối tiếp: nêu rõ, đúng.
- [Hoàn thiện HP-1] purp-ex1, lời giải cho phương án 4
  （为了她省钱，自己做饭。): bài ghi "đặt chủ ngữ sai vị trí". Câu
  này thực ra đúng ngữ pháp nhưng ĐỔI NGHĨA (chủ ngữ của vế mục
  đích là 她， người nấu ăn là người nói) nên không khớp nghĩa đề
  cho. Đáp án vẫn duy nhất đúng; chỉ cần sửa lý do thành "vế mục
  đích bị đổi người" để không dạy sai bản chất lỗi.
- [Hoàn thiện HP-2] Confusion 3 （他为学好中文，每天练习口语。,
  verdict sai_ngu_phap): 为 + cụm động từ tồn tại ở văn phong trang
  trọng （为……而……). Lời giải đã tự giới hạn bằng "为 đơn độc
  THƯỜNG đi với danh từ ngắn" nên không thành khẳng định tuyệt đối
  sai; ở cấp HSK3 giữ nguyên cũng được, muốn chặt hơn thì hạ
  verdict xuống kem_tu_nhien/khac_van_phong. Không chặn phát hành.
- Câu quick_memory "为了 không bao giờ chạy xuống cuối câu": đã soi
  — khẳng định này giới hạn đúng ở mẫu vế 为了 trần đặt cuối câu
  (đúng là không chuẩn); cấu trúc 是为了 là mẫu khác, bài không
  tuyên bố gì về nó. Không tính là mâu thuẫn.

### A4. quantity-complement-3 — nội dung tự thân đúng; phạm vi + nền SAI (xem C2, C3)

- Ba trường hợp vị trí mà bài dạy đều đúng tiếng Trung chuẩn:
  (1) tân ngữ thường → chêm 的 （看了三个小时的书） hoặc lặp động từ;
  (2) tân ngữ đại từ/tên riêng → bổ ngữ sau tân ngữ （等了他二十分钟）;
  (3) cụm cố định kiểu 学中文 → bổ ngữ trước tân ngữ, không 的
  （学了两年中文）.
- 5 ví dụ và 5 bài tập áp dụng đúng cả ba trường hợp (qc3-ex1 ca 1;
  ex2 ca 3; ex3 ca 2 — khối sai 老师 đúng là khối bị đặt lệch;
  ex4 ca 1; ex5 ca 2, nhận 半个小时/三十分钟/半小时 — biến thể tốt).
- Confusion 3 （他看了三个小时书。, verdict kem_tu_nhien): lời giải
  tự giới hạn "chưa đúng mẫu chuẩn đang luyện", không kết án tuyệt
  đối — đúng nguyên tắc.
- Hai lỗi của bài không nằm ở câu chữ mà ở C2 (dạy lệch chủ điểm
  OFF-H3-32) và C3 (giả định nền chưa từng được dạy).

---

## B. Nhất quán nội bộ (quy tắc ↔ ví dụ ↔ đáp án ↔ Nhớ nhanh)

- **complex-sequence: ĐẠT.** Không khẳng định nào bị chính bài bác
  bỏ. Chuỗi phân biệt "từ nối tường minh vs mẫu nén vs vừa…là ngay"
  lặp lại nhất quán ở when_to_use, công thức, confusion 3, lời
  giải ex4.
- **complex-choice: ĐẠT về quy tắc nội bộ.** Pattern, công thức,
  quick_memory, ví dụ, đáp án không mâu thuẫn nhau. (Sai lệch của
  bài là với NGUỒN bên ngoài — xem C1: sources note khẳng định
  "hai khung của bài đều thuộc nhóm lựa chọn HSK3" và
  hsk_evidence "verified" đều không đúng với bảng gốc.)
- **complex-purpose: ĐẠT.** Công thức hai vị trí của vế 为了 khớp
  cả 5 ví dụ và đáp án ex2 nhận cả hai thứ tự.
- **quantity-complement-3: CÓ MÂU THUẪN với hồ sơ dự án.**
  - Chỗ 1 (when_to_use): "ở mức đã học, bổ ngữ thời lượng đứng
    ngay sau động từ khi câu không có tân ngữ （我睡了八个小时）".
  - Chỗ 2 (công thức bước 4): "khi câu không có tân ngữ, bổ ngữ
    đứng ngay sau động từ NHƯ ĐÃ HỌC （我等了二十分钟 — …)".
  - Hồ sơ bác bỏ: catalogue ghi OFF-H2-43 （数量补语 dạng 2) =
    missing, lesson_ids rỗng; grep toàn bộ 55 bài: CHỈ
    quantity-complement-3 chứa câu có 小时/分钟/遍/次 làm bổ ngữ —
    không bài nào dạy mẫu không-tân-ngữ này, và chính bài này cũng
    không dạy nó (chỉ nhắc một câu ở bước 4, không ví dụ riêng,
    không bài tập). Chi tiết ở C3.
  - Trong phạm vi hẹp pattern ↔ ví dụ ↔ đáp án ↔ quick_memory của
    ba trường hợp có-tân-ngữ: nhất quán, không mâu thuẫn.
    (quick_memory chỉ nhắc ca 1–2, thiếu ca 3 — chấp nhận được với
    một móc nhớ, không tính lỗi.)

---

## C. Các phán quyết

### C1. OFF-H3-42 （
...[truncated 8772 chars]

---

> **Ghi chú xử lý của Manager (2026-10-30, theo chỉ đạo của Hoa):**
> File này bị cụt khi ghi trong phiên HSK3-5 — nội dung còn nguyên tới đầu
> mục C1 (phán quyết OFF-H3-42), phần còn lại (C1 tiếp theo, C2, C3 và
> phần kiểm tra hệ thống) KHÔNG còn bản lưu nào để khôi phục nguyên văn
> và không được dựng lại. Các phán quyết và quyết định của vòng 1 được
> ghi đầy đủ tại: báo cáo vòng 2 `docs/reviews/qa-hsk3-5-round2.md`
> (mục A đối chiếu từng phán quyết vòng 1), nhật ký phát hành
> `docs/release-log.md` (mục lô HSK3-5) và `docs/checkpoint.json`.
> Khi trích dẫn kết quả QA của lô HSK3-5, dùng các nguồn đó; không coi
> phần thiếu của file này là bằng chứng.
