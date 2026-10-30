# Đối chiếu danh mục chính thức HSK3–4 với các bài hiện có (P01-02, phần HSK3–4)

Nguồn: 语法大纲 trong đề cương thi HSK 3.0 (2025-11 发布, 2026-07
实施), phần HSK3 bắt đầu tr.389, HSK4 tr.392. Văn bản dùng để đối
chiếu là bản trích xuất ngày 2026-09-25; chưa ghi hash file gốc nên
các lần kiểm tra sau cần đối chiếu lại nếu tài liệu có bản sửa.
Nội dung dưới đây là diễn giải bằng tiếng Việt của dự án, không sao
chép nguyên văn bảng hay câu ví dụ của đề cương (quyền phân phối
chưa xác minh). Các nhóm của dự án giữ riêng, không đồng nhất với
danh mục chính thức.

Trạng thái: ĐÃ CÓ / MỘT PHẦN / THIẾU, cùng nghĩa như tài liệu đối
chiếu HSK1–2. Số mục nhóm là cách chia của dự án để đối chiếu, KHÔNG
phải số mục chính thức trong đề cương và KHÔNG được dùng thay cho số
chính thức. Bố cục bảng trong bản trích bị nhòe ở một số hàng nên
nhóm con của một vài phó từ ghi chú "chưa chắc chắn".

## 1. Kết luận nhanh
- HSK3: 50 mục nhóm — 0 đã có, 3 một phần, 47 thiếu (trước lô 10).
  Ba mục một phần đều là phần mở rộng của bài HSK1–2 đã có: kết quả
  bổ ngữ dạng 2 (bài cũ dạy 完/好/懂/错, thiếu 到/住/走/上),
  是……的句 dạng 2 (bài cũ dạy dạng HSK2), 虽然……，可是…… (bài cũ dạy
  虽然……，但是……).
- HSK4: 34 mục nhóm — tất cả đều thiếu (trước lô 10).
- Lô 10 chọn 4 mục HSK3 lớn nhất, đủ điều kiện rà soát đầy đủ:
  把字句 dạng 1, 被动句 dạng 1, 着 chỉ hành động kèm theo, 比较句
  dạng 2. Sau lô 10, HSK3 còn 46 mục nhóm thiếu/một phần.
- Cập nhật lô HSK3-2 (build 20261030-hsk3b2, ghi bổ sung vào tài
  liệu này khi đối chiếu lại): thêm 4 mục đã có — kết quả bổ ngữ
  dạng 2 (chuyển từ một phần; bài result-complement-2 dạy
  到/住/走/上), khả năng bổ ngữ dạng 1, câu phức giả thiết
  （如果……，就……; ……的话）, câu phức điều kiện （只有……，才……;
  只要……，就……). Sau lô HSK3-2, HSK3: 8 đã có, 2 một phần
  （是……的句 dạng 2; 虽然……，可是……), 40 thiếu.
- Cập nhật lô HSK3-3 (build 20261030-hsk3c3): thêm 4 mục đã có —
  存现句 dạng 3 (bài cunxian-appearance; cấu trúc 存现句 nay đủ
  dạng 1–2 ở bài HSK2 cunxian-chu và dạng 3), 是……的句 dạng 2
  (bài shi-de-attitude; chuyển từ một phần, cấu trúc nay đủ dạng 1
  ở HSK2 và dạng 2), xu hướng bổ ngữ dạng 2 — nghĩa dẫn申 (bài
  direction-complement-2; đủ nghĩa hướng thật ở bài HSK2 và nghĩa
  mở rộng kết quả/bắt đầu/tiếp tục), trùng động句 (bài
  verb-repetition-sentence). Sau lô HSK3-3, HSK3: 12 đã có, 2 một
  phần （虽然……，可是……; giới từ 把/被 — mới phủ nghĩa tác
  nhân/bị tác động), 36 thiếu — tổng vẫn 50 mục nhóm, khớp từng mục
  với docs/official-catalogue-hsk3-hsk4.json. (Các dòng mốc trước
  đây gộp giới từ 把/被 vào nhóm câu 把/被 đã có nên số "một phần"
  ở mốc cũ nhỏ hơn 1; trạng thái hiện tại lấy theo catalogue.)
- Cập nhật lô HSK3-4 (30/10/2026): thêm 4 mục đã có — câu phức
  递进 （不但……，而且……; bài complex-progressive), câu phức 紧缩
  (bài complex-compact: mẫu phủ định tuyệt đối 一……也/都+不/没……
  và mẫu nén hai hành động ……了……就……), mức độ bổ ngữ dạng 1
  (bài degree-complement-1), câu hỏi phản vấn dạng 1 (bài
  rhetorical-question). Cụm cố định HSK3 (OFF-H3-25) chuyển từ
  thiếu sang một phần: cụm 一……也/都+不/没…… trong giỏ của mục
  này nay đã có bài complex-compact, các cụm còn lại vẫn thiếu.
  Sau lô HSK3-4, HSK3: 16 đã có, 3 một phần （虽然……，可是……;
  giới từ 把/被; cụm cố định HSK3), 31 thiếu — tổng vẫn 50 mục
  nhóm, khớp từng mục với catalogue. Danh sách đầy đủ các mục
  còn thiếu/một phần và mức ưu tiên: xem mục 2b.
- Cập nhật lô HSK3-5 (30/10/2026, đã sửa phạm vi ở vòng QA):
  thêm 3 mục đã có — câu phức 承接 (bài complex-sequence), câu
  phức mục đích (bài complex-purpose), số lượng bổ ngữ dạng 3
  (bài time-since-completion: thời gian kể từ khi hành động kết
  thúc). Câu phức lựa chọn (OFF-H3-42) mới MỘT PHẦN: bài
  complex-choice phủ 或者……，或者……, còn mẫu luân phiên
  一会儿……，一会儿…… chưa dạy (khung 不是……，就是……
  trong bài thuộc bảng HSK4 của đề cương, không tính phủ
  HSK3). Sửa gán nhầm phạm vi: bản đầu của lô có bài
  "quantity-complement-3" (cấp HSK3) dạy vị trí bổ ngữ thời
  lượng khi có tân ngữ — nội dung đó thuộc họ 数量补语 dạng 2,
  đã đổi danh tính thành bài quantity-complement-objects ở
  HSK2 (phủ MỘT PHẦN OFF-H2-43, xem tài liệu ánh xạ HSK1–2),
  và OFF-H3-32 được soạn đúng chủ điểm bằng bài
  time-since-completion. Sau lô HSK3-5, HSK3: 19 đã có, 4 một
  phần （虽然……，可是……; giới từ 把/被; cụm cố định HSK3;
  câu phức lựa chọn), 27 thiếu — tổng vẫn 50 mục nhóm, khớp
  từng mục với catalogue. Hai mục ưu tiên cao còn lại
  (OFF-H3-43 song song, OFF-H3-04 năng nguyện) để sang lô sau
  — lý do ghi ở mục 2b.
- Cập nhật lô HSK3-6 (30/10/2026, gồm sửa cấp theo chỉ đạo
  của Hoa): thêm 3 mục đã có — câu phức song song (bài
  complex-parallel), năng nguyện HSK3 (bài modal-verbs-hsk3:
  需要/该/应该/愿意/得）, câu phức lựa chọn OFF-H3-42 (chuyển
  từ một phần sang đã có). Mẫu cố định HSK3 (OFF-H3-26)
  chuyển từ thiếu sang MỘT PHẦN: bài yue-patterns chỉ phủ
  thành viên 越……越…… （kèm 越来越……); thành viên
  在……上/下/中 đã phủ cơ bản qua bài location-nouns ở cấp
  dưới; （在）……以前/以后/前/后 và X什么（啊） chưa dạy
  thành bài; mẫu 该……了 được dạy trong bài
  modal-verbs-hsk3. Hai quyết định xuyên cấp, ghi rõ để
  không đọc nhầm số liệu: (1) bài complex-choice ĐỔI CẤP
  hiển thị từ HSK3 sang HSK4 và chuyển xuống cuối manifest
  (đầu khối HSK4), vì khung chính 不是……，就是…… của bài
  đã xác minh thuộc bảng HSK4 — không giữ nhãn HSK3 chỉ vì
  bài được viết trong lô HSK3; (2) OFF-H3-42 đạt "đã có"
  nhờ sắp xếp xuyên cấp: 或者……，或者…… do bài
  complex-choice (nay ở HSK4) dạy, 一会儿……，一会儿……
  do bài mới alternating-actions dạy; 不是……，就是……
  KHÔNG tính vào phủ HSK3. Nhờ đó HSK4 có mục đầu tiên:
  OFF-H4-27 MỘT PHẦN qua bài complex-choice (mới phủ
  不是……，就是……; 连……也/都……，……更…… chưa dạy).
  Sau lô HSK3-6, HSK3: 22 đã có, 4 một phần （虽然……，
  可是……; giới từ 把/被; cụm cố định HSK3; mẫu cố định
  HSK3), 24 thiếu — tổng vẫn 50 mục nhóm; HSK4: 0 đã có,
  1 một phần, 33 thiếu — tổng vẫn 34 mục nhóm; cả hai khớp
  từng mục với catalogue. Số bài theo cấp sau lô: HSK1 20,
  HSK2 16, HSK3 23, HSK4 1 (tổng 60 bài).
- Cập nhật lô HSK3-7 (30/10/2026, gồm sửa đối chiếu khối
  câu phức HSK4 theo bằng chứng trực quan — chi tiết ở
  mục 3): thêm 5 mục đã có — nhân xưng 别人/咱们 và chỉ
  định 别的/其他 (gộp một bài pronouns-others), phó từ
  thời gian 马上/先/刚/刚刚/一直 (bài adverbs-time-hsk3;
  thành viên 一会儿 đã phủ từ trước ở vai lượng thời gian
  và mẫu luân phiên), phủ định 不必/不用 (bài
  negation-bubi-buyong), 概数 dạng 2 (bài
  approx-numbers-2; chỉ vai ước lượng số lượng của 大概,
  vai phỏng đoán thuộc OFF-H3-17, không tính phủ). Đồng
  thời OFF-H4-27 chuyển từ một phần sang ĐÃ CÓ sau khi
  kiểm trực quan trang in 394 xác nhận mục lựa chọn HSK4
  chỉ có một thành viên 不是……，就是…… (xem mục 3);
  hsk_evidence của bài complex-choice chuyển từ partial
  sang verified. Sau lô HSK3-7, HSK3: 27 đã có, 4 một
  phần, 19 thiếu — tổng vẫn 50 mục nhóm; HSK4: 1 đã có,
  0 một phần, 33 thiếu — tổng vẫn 34 mục nhóm; cả hai
  khớp từng mục với catalogue. Số bài theo cấp sau lô:
  HSK1 20, HSK2 16, HSK3 27, HSK4 1 (tổng 64 bài).
- Không cần sửa cấp độ cho 34 bài cũ: chưa phát hiện bài nào dạy sai
  cấp (các bài HSK1–2 không dạy nội dung HSK3–4; riêng zhe-continuation
  đã ghi rõ nghĩa kèm theo của 着 thuộc HSK3 và cố ý không dạy).
- P01-02 ở mức mục nhóm: ĐÃ đối chiếu đủ 6 cấp (251 mục nhóm, hoàn
  tất 2026-10-30 với bản đồ HSK5–6). Phần xác minh sâu (điểm vi mô,
  hash bản crawl, quyền phân phối) vẫn mở và không đồng nghĩa đã
  biên soạn/phủ đủ 251 mục.

## 2. HSK3 — các mục đáng chú ý
- Thiếu toàn bộ ở mức thành bài riêng: tiền tố 老—, hậu tố
  —家/—子/—员, phương vị mở rộng,
  ly hợp từ hai loại, 怎样 và nghi vấn dùng không hỏi,
  lượng từ HSK3, hầu hết phó từ HSK3 (更/特别/挺/有些/越/
  极, 一块儿/一共/只/到处/只是,
  总/总是/又/常常, 一边, 大概/必须/差不多/一定/好像/几乎,
  当然/其实/终于/才), giới từ 为/向/为了/根据/关于,
  liên từ 或/或者/只有/只要/不但/而且/如果/可是/然后/的话,
  động bổ đoản ngữ dạng 2, đồng vị đoản ngữ, tứ tự cách, số lượng
  trùng điệp, mẫu cố định HSK3, chủ ngữ bằng đoản ngữ, và
  câu phức HSK3 còn lại. (Xu hướng bổ ngữ nghĩa
  dẫn申, khả năng bổ ngữ dạng 1, 存现句 dạng 3, trùng động句 và
  câu phức giả thiết/điều kiện đã có bài riêng sau các lô
  HSK3-2/HSK3-3; câu phức 递进, câu phức 紧缩, mức độ bổ ngữ
  dạng 1 và câu hỏi phản vấn dạng 1 đã có bài riêng ở lô HSK3-4;
  câu phức 承接, câu phức lựa chọn, câu phức mục đích và số
  lượng bổ ngữ dạng 3 đã có bài riêng ở lô HSK3-5; câu phức
  song song, năng nguyện HSK3 và mẫu luân phiên
  一会儿……，一会儿…… đã có bài riêng ở lô HSK3-6; đại từ
  mở rộng 别人/咱们/别的/其他, phó từ thời gian
  马上/先/刚/刚刚/一直, phủ định 不必/不用 và 概数 dạng 2
  đã có bài riêng ở lô HSK3-7 — xem
  mục 1 và danh sách ưu tiên ở mục 2b.)
- Một phần: 虽然……，可是……; giới từ 把/被; cụm cố định HSK3
  (mới phủ cụm 一……也/都+不/没…… qua bài complex-compact);
  mẫu cố định HSK3 (mới phủ 越……越……/越来越…… qua bài
  yue-patterns). Câu phức lựa chọn (OFF-H3-42) đã phủ đủ từ
  lô HSK3-6 theo sắp xếp xuyên cấp ghi ở mục 1. Kết quả bổ
  ngữ dạng 2 và 是……的句 dạng 2 đã đủ dạng sau các lô
  HSK3-2/HSK3-3.

## 2b. HSK3 còn thiếu sau lô HSK3-7 — ưu tiên và lý do để lại

Sau lô HSK3-7 còn 23/50 mục nhóm HSK3 chưa phủ đủ (19 thiếu +
4 một phần), liệt kê đầy đủ dưới đây theo catalogue. (Sau lô
HSK3-6 còn 28 mục; lô HSK3-7 phủ đủ thêm OFF-H3-09, OFF-H3-10,
OFF-H3-14, OFF-H3-19 và OFF-H3-50.) Đây là căn
cứ để chọn các lô HSK3 tiếp theo và để quyết định việc chuyển
sang HSK4 sau này; tài liệu này không tự tuyên bố chuyển cấp,
và không mục nào trong danh sách được coi là đã phủ.

### Ưu tiên cao cho lô kế tiếp
- (Trống sau lô HSK3-6: cả hai mục ưu tiên cao của mốc trước
  — OFF-H3-43 câu phức song song và OFF-H3-04 năng nguyện —
  đã phủ đủ ở lô HSK3-6 qua bài complex-parallel và
  modal-verbs-hsk3. OFF-H3-16 phó từ liên kết 一边 cũng coi
  như đã phủ phần lõi qua OFF-H3-43 như dự kiến. Việc xếp
  ưu tiên cao mới cho lô kế tiếp cần quyết định riêng dựa
  trên danh sách dưới đây.)

### Ưu tiên trung bình
- OFF-H3-07 Nghi vấn 怎样: mở rộng từ question-words và
  zenme-question; cần phân biệt kỹ 怎样/怎么样/怎么 đã học.
- OFF-H3-11 Lượng từ HSK3: danh sách dài; cần chọn lọc theo tần
  suất trước khi soạn, khó phủ hết trong một bài.
- OFF-H3-12 Phó từ mức độ （更/特别/挺/有些/越/极）: tần suất
  cao nhưng là nhóm từ rời; 更 đã chạm ở bi-comparison-2; mẫu
  越……越…… từng cân nhắc gộp vào đây đã được dạy riêng ở
  bài yue-patterns (xếp theo OFF-H3-26, lô HSK3-6).
- OFF-H3-13 Phó từ phạm vi （一块儿/一共/只/到处/只是）: nhóm
  từ rời, giá trị thi vừa; nên dạy theo cụm tình huống.
- OFF-H3-15 Phó từ tần suất （总/总是/又/常常）: nhóm từ rời;
  又 cần phân biệt với 又……又…… của OFF-H3-43.
- OFF-H3-17 Phó từ tình thái （大概/必须/差不多/一定/好像/
  几乎）: giá trị thi cao nhưng nghĩa trừu tượng, biến thể đáp
  án khó khóa chặt khi chấm tự động.
- OFF-H3-18 Phó từ ngữ khí （当然/其实/终于/才）: 才 đã xuất
  hiện ở complex-condition với nghĩa điều kiện khác; cần bài
  phân biệt đa nghĩa cẩn thận.
- OFF-H3-26 Mẫu cố định HSK3 (MỘT PHẦN): bài yue-patterns
  (lô HSK3-6) đã phủ 越……越……/越来越……; còn lại trong
  giỏ: （在）……以前/以后/前/后 và X什么（啊） chưa dạy
  thành bài — hai mẫu rời nhau, phủ dần khi gặp bài liên
  quan; 在……上/下/中 đã phủ cơ bản qua location-nouns và
  该……了 qua modal-verbs-hsk3 nên không tính là phần
  thiếu thực chất của mục này nữa.

### Để lại (kèm lý do)
- OFF-H3-01 Tiền tố 老—: phạm vi hẹp, năng suất tạo từ thấp ở
  HSK3; để gộp vào một bài cấu tạo từ sau này.
- OFF-H3-02 Hậu tố —家/—子/—员: thiên về từ vựng phái sinh,
  ít mẫu câu để luyện; làm cùng OFF-H3-01 khi có bài cấu tạo từ.
- OFF-H3-03 Phương vị （东/南/西/北/北方/东方/南方/西方/中间）:
  nền location-nouns mới phủ phương vị cơ bản; phần này thiên
  từ vựng phương hướng, để khi làm bài phương vị tổng hợp.
- OFF-H3-05 Ly hợp từ động tân式 （放假/见面/结婚/洗澡）: bài
  separable-verbs (HSK2) đã dạy khái niệm và cách tách; mục này
  chủ yếu mở rộng danh sách từ, cần rà soát trùng trước khi soạn.
- OFF-H3-06 Ly hợp từ động bổ式 （离开/完成/分开）: dễ lẫn ranh
  giới với bổ ngữ kết quả đã có; cần rà soát ranh giới trước.
- OFF-H3-08 Nghi vấn dùng không hỏi （任指/不定指）: trừu
  tượng, khó chấm bằng bài tập đóng hiện có; chờ thiết kế dạng
  bài phù hợp.
- OFF-H3-16 Phó từ liên kết 一边: phần lõi 一边……，一边……
  đã phủ qua OFF-H3-43 (bài complex-parallel, lô HSK3-6);
  一边 dùng độc lập giá trị thấp, không cần bài riêng.
- OFF-H3-20 Giới từ （为/向/为了/根据/关于）: 为了 đã phủ
  qua OFF-H3-48 (bài complex-purpose, lô HSK3-5); 根据/关于
  thiên về văn viết, để sau.
- OFF-H3-21 Giới từ 把/被 (MỘT PHẦN): đã phủ nghĩa tác nhân/bị
  tác động trong câu 把/被; các nghĩa giới từ còn lại giá trị
  thêm thấp — bổ sung khi rà soát hai bài cũ thay vì bài mới.
- OFF-H3-22 Giỏ liên từ （或/或者; 只有/只要; 不但/而且; 如果;
  可是; 然后; 的话）: không làm bài riêng — các cặp chính đã
  hoặc sẽ phủ qua từng bài câu phức; 或/或者 đơn lẻ đã có ở
  hai-shi-choice.
- OFF-H3-23 Động bổ đoản ngữ dạng 2: khái niệm bao trùm, nguy
  cơ dạy trùng các bài bổ ngữ kết quả/xu hướng/khả năng đã có;
  cần quyết định ranh giới trước khi soạn.
- OFF-H3-24 Đồng vị đoản ngữ; tứ tự cách; số lượng trùng điệp:
  ba chủ điểm rời nhau, tứ tự cách thiên về từ vựng; không gộp
  thành một bài tốt được.
- OFF-H3-25 Cụm cố định HSK3 (MỘT PHẦN): mới phủ cụm
  一……也/都+不/没…… (bài complex-compact); khoảng mười cụm
  còn lại rời nhau, nên phủ dần khi gặp bài liên quan thay vì
  một bài "giỏ cụm".
- OFF-H3-27 Chủ ngữ bằng đoản ngữ; đa định ngữ: trừu tượng,
  giá trị thi trực tiếp thấp ở HSK3 và khó chấm; để sau cùng
  của cấp.
- OFF-H3-45 Câu phức 转折 (MỘT PHẦN): chỉ còn biến thể
  可是 thay 但是； bài HSK2 đã dạy cặp chính — bổ sung bằng
  sửa nhỏ bài cũ khi rà soát, không tốn một slot bài mới.

## 3. HSK4 — các mục đáng chú ý
- Cập nhật lô HSK3-6 (30/10/2026): HSK4 không còn thiếu
  toàn bộ — OFF-H4-27 câu phức lựa chọn HSK4 đạt MỘT PHẦN
  qua bài complex-choice (mới phủ 不是……，就是……;
  连……也/都……，……更…… chưa dạy). Đây là bài HSK4 đầu
  tiên của dự án, đến từ việc sửa cấp bài cũ chứ không phải
  một lô soạn HSK4 riêng; 33/34 mục nhóm HSK4 vẫn thiếu.
- Cập nhật lô HSK3-7 (30/10/2026): sau sửa đối chiếu ở
  đoạn dưới, OFF-H4-27 chuyển từ MỘT PHẦN sang ĐÃ CÓ —
  bài complex-choice phủ đủ thành viên duy nhất của mục
  lựa chọn HSK4. HSK4 nay: 1 đã có, 0 một phần, 33 thiếu.
- **Sửa đối chiếu 2026-10-30 (kiểm trực quan trang in
  394):** Manager đã tải PDF đề cương gốc từ
  chinesetest.cn và đọc TRỰC QUAN trang in 394 (phần
  bảng câu phức HSK4), phát hiện bản trích xuất text
  trước đây đã gắn LỆCH HÀNG một số mẫu sang mục kề bên.
  Các sửa đã áp vào catalogue: (1) 连……也/都……，……更……
  thuộc mục TIẾN TRIỂN (OFF-H4-26), không thuộc lựa
  chọn — OFF-H4-27 chỉ còn 不是……，就是…… và đạt
  ĐÃ CÓ; (2) 不是……，而是…… thuộc mục SONG SONG
  (OFF-H4-24), không thuộc phủ định kép (OFF-H4-23 chỉ
  còn nội dung 'dùng phủ định kép để nhấn mạnh');
  (3) 首先……，其次…… thuộc mục TIẾP NỐI (OFF-H4-25),
  không thuộc song song; (4) ……X是X，就是/不过……
  thuộc mục CHUYỂN HƯỚNG (OFF-H4-28), không thuộc giả
  thiết (OFF-H4-29 chỉ còn ba mẫu 否则/要是）. Hệ quả:
  nhận định "OFF-H4-27 còn thiếu 连……" ghi ở lô HSK3-6
  là sai do lỗi trích xuất và đã hủy bỏ. Ghi chú trung
  thực về phạm vi: việc kiểm trực quan này mới bao phủ
  trang in 394 (khối 复句 HSK4 và lân cận); PHẦN CÒN
  LẠI của bảng HSK4 và các cấp khác vẫn dựa trên bản
  trích xuất text ngày 2026-09-25 — rủi ro lệch hàng
  tương tự chưa được loại trừ và thuộc phần xác minh
  sâu của P01-02 sau này.
- Thiếu toàn bộ ở mức thành bài riêng: 敢, 各/各位/各种/任何/此,
  lượng từ HSK4, phó từ HSK4 (十分/更加/稍/稍微/尤其/多么,
  共/全/光/仅/仅仅/至少, 按时/从来/赶紧/赶快/已/忽然/将/将要/从/
  本来, 重新/往往/偶尔/再次/老, 故意/互相/相互, 却, 也许/恐怕,
  难道/千万/确实/只好/差(一)点儿/竟然/究竟/正好), giới từ 自/当/由/
  将/叫/让/由于/对于/与/作为/按/按照, liên từ HSK4, trợ từ khác và
  thán từ, tứ tự cách, cụm và mẫu cố định HSK4, mức độ bổ ngữ dạng
  2, khả năng bổ ngữ dạng 2, câu hỏi phản vấn dạng 2, 把字句 dạng 2,
  被动句 dạng 2 (dùng 叫/让), 兼语句 dạng 2, 比较句 dạng 3 (不如;
  跟……相比), câu phủ định kép, và toàn bộ câu phức HSK4 trừ câu
  phức lựa chọn (đã có), cùng 概数
  dạng 3 và cách nói số (thập phân, phân số, phần trăm, bội số).

## 4. Danh sách chọn đợt sau (HSK3–4, theo thứ tự ưu tiên sư phạm)
1. 把字句 dạng 2 và 被动句 dạng 2 (mở rộng từ lô 10).
2. Câu phức HSK3: 如果……，就……; 只有/只要……，就……;
   ……的话，就……; 不但……，而且…….
3. 结果补语 dạng 2 (到/住/走/上) và khả năng bổ ngữ dạng 1.
4. Mức độ bổ ngữ dạng 1 (得很; 极了/坏了).
5. Năng nguyện HSK3 (需要/该/应该/愿意/得).
6. 比较句 dạng 3 (不如; 跟……相比) và câu phủ định kép (HSK4).
