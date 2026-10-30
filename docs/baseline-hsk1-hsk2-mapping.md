# Đối chiếu danh mục chính thức HSK1–2 với 24 bài hiện có (P01-02, phần HSK1–2)

Nguồn: 语法大纲 trong đề cương thi HSK 3.0 (2025-11 发布, 2026-07 实施,
中外语言交流合作中心), phần HSK1 bắt đầu tr.382, HSK2 tr.386. Văn bản
dùng để đối chiếu là bản trích xuất ngày 2026-09-25; chưa ghi hash file
gốc nên các lần kiểm tra sau cần đối chiếu lại nếu tài liệu có bản sửa.
Nội dung dưới đây là diễn giải bằng tiếng Việt của dự án, không sao chép
nguyên văn bảng hay câu ví dụ của đề cương (quyền phân phối chưa xác
minh). Các nhóm của dự án (ví dụ 50 nhóm phạm vi) giữ riêng, không đồng
nhất với danh mục chính thức dưới đây.

Trạng thái dùng trong tài liệu này:
- ĐÃ CÓ: bài hiện có dạy đúng phạm vi mục đó.
- MỘT PHẦN: bài hiện có chỉ dạy một phần mục đó (ghi rõ phần còn thiếu).
- THIẾU: chưa có bài nào dạy mục đó.
- Lưu ý về độ tin cậy: bố cục bảng trong bản trích xuất bị nhòe ở một
  số hàng (đặc biệt nhóm con của phó từ HSK1 và HSK2), nên việc xếp một
  vài từ vào nhóm con được ghi là "nhóm con chưa chắc chắn"; mức từ
  (từ nào thuộc cấp nào) vẫn đọc được rõ và được dùng làm căn cứ chính.

## 1. Kết luận nhanh
- Không cần sửa cấp độ cho 24 bài hiện có: kiểm tra từng bài với đề
  cương, cấp độ HSK1/HSK2 của cả 24 bài đều khớp (kể cả 了 ở HSK1,
  在/正在 ở HSK1, 比/过/着/是……的/补语 ở HSK2).
- Cập nhật sau lô 08 (28 bài): phương vị danh từ, 想/要, 为什么 và
  一……就…… đã có bài; HSK1 còn thiếu ở mức thành bài riêng: ly hợp
  từ, số từ và cách nói số/tiền/thời gian, 不要, 对, 呢/吧, 喂,
  存现句1 dạng chuẩn, 连动句1, 正反问句, 祈使句, 感叹句, và các mục
  cấu trúc câu (loại cụm, thành phần câu) chưa thành bài riêng.
- HSK2 còn thiếu ở mức thành bài riêng: 自己, 指示 mở rộng, tính từ
  trùng điệp, lượng từ mở rộng, phó từ mở rộng (多/好/最,
  已经/有时/快/快要/正/常/经常, 别, 就), giới từ 从/往/跟, 兼语句,
  存现句2, 是字句2, 有字句2, 状态补语, 数量补语2, 序数 dạng
  数词+量词, và A了A trong động từ trùng điệp. （概数 dạng 1 đã
  có bài từ lô HSK3-8 — xem dòng cập nhật bên dưới.)
- Cập nhật vòng sửa QA lô HSK3-5 (30/10/2026): OFF-H2-43
  （ 数量补语 dạng 2) chuyển từ THIẾU sang MỘT PHẦN nhờ bài
  quantity-complement-objects (chi tiết ở mục 3). Cùng vòng sửa
  này, một gán nhầm phạm vi liên cấp đã được sửa: điểm 数量补语
  dạng 3 (OFF-H3-32) trong đề cương là "thời gian đã trôi qua
  kể từ khi hành động kết thúc", nay đã có bài riêng
  time-since-completion ở HSK3 (xem tài liệu ánh xạ HSK3–4).
- Cập nhật lô HSK3-8 (30/10/2026): OFF-H2-61 （概数 dạng 1:
  几; 数词 + 多 + 量词; 数词 + 量词 + 多) chuyển từ THIẾU
  sang ĐÃ CÓ nhờ bài approx-numbers-1 — được soạn bổ sung
  ở HSK2 vì là kiến thức nền của bài approx-numbers-2
  (HSK3); phạm vi của mục đã xác minh TRỰC QUAN tại trang
  in 388 của PDF đề cương gốc (khối 数的表达法）, liên kết
  tiên quyết thể hiện qua thứ tự manifest và nhắc chéo
  trong hai bài (dự án không có trường dữ liệu tiên quyết
  riêng). Sau lô này, HSK2: 20 đã có, 15 một phần, 27
  thiếu — tổng vẫn 62 mục nhóm, khớp từng mục với
  docs/official-catalogue-hsk1-hsk2.json. HSK1 không đổi:
  25 đã có, 10 một phần, 17 thiếu (52 mục nhóm).
- Nhắc lại theo yêu cầu đối chiếu: số mục nhóm trong tài liệu này là
  cách chia của dự án để đối chiếu, KHÔNG phải số mục chính thức
  trong đề cương (đề cương không đánh số từng điểm vi mô) và KHÔNG
  được dùng thay cho số mục chính thức.

## 2. HSK1 — đối chiếu từng mục
### Từ loại và ngữ tố
- Tiền tố 小—/第—: ĐÃ CÓ (prefix-suffix).
- Hậu tố —们/—边: ĐÃ CÓ (prefix-suffix).
- Phương vị danh từ 上/下/里/外/前/后: THIẾU (zai-progress chỉ dạy
  在 + địa điểm, không dạy bộ phương vị từ) → bài mới đợt này.
- Năng nguyện 会/能/可以: ĐÃ CÓ (modal-hui-neng-keyi).
- Năng nguyện 想/要: THIẾU → bài mới đợt này.
- Ly hợp từ 看病/睡觉/说话/上课/下课/上班/下班/生病: THIẾU.
- Nghi vấn 什么/谁: ĐÃ CÓ (question-words); 怎么/怎么样: THIẾU.
- Nhân xưng 我/你/您/他/她/我们/你们/他们/她们/它/它们/大家:
  MỘT PHẦN (pronouns nhắc "đại từ nhân xưng" trong công thức nhưng
  ví dụ chưa dạy hệ thống bộ nhân xưng).
- Chỉ định 这/那/这儿/那儿/这里/那里/这些/那些/这个/那个:
  ĐÃ CÓ ở mức chính (pronouns); 有的/有些: THIẾU.
- Số từ: THIẾU (chưa có bài số,序数 đã có riêng ở dưới,钱数,时间).
- Lượng từ chuyên dụng 本/个/家/口/块/件/只/元: MỘT PHẦN
  (measure-words mới dạy 本/件 qua ví dụ); mượn 杯: THIẾU;
  thời lượng 日/号/岁/点/分/年/天: THIẾU.
- Mức độ 非常/很/太/真/有点儿: MỘT PHẦN (hen dạy 很; adverbs-du-ye
  nhắc 很/非常/太; 真/有点儿 chưa dạy).
- Phạm vi 都: ĐÃ CÓ (adverbs-du-ye).
- Thời gian 在/正在: ĐÃ CÓ (zai-progress).
- 还/再/也: ĐÃ CÓ ở cấp từ (adverbs-du-ye; nhóm con chưa chắc chắn
  do bảng nhòe, nhưng từ đã bao phủ).
- Phủ định 不/没(有): ĐÃ CÓ (bu-mei-negation); 不要: THIẾU.
- Giới từ chỉ thời gian/nơi chốn 在: ĐÃ CÓ (zai-progress).
- Giới từ chỉ đối tượng 对: THIẾU.
- Liên từ nối từ/cụm 和: THIẾU ở mức bài riêng.
- Trợ từ kết cấu 的: ĐÃ CÓ (de-possessive).
- Trợ từ động thái 了: ĐÃ CÓ (le-completion-change).
- Ngữ khí 吗: ĐÃ CÓ (ma-question); 呢/吧: THIẾU.
- Thán từ 喂: THIẾU (mức ưu tiên thấp).
### Cụm, thành phần câu, kiểu câu
- Loại cụm 联合/偏正/动宾/主谓/数量/介宾/方位: THIẾU ở mức bài riêng
  (kiến thức cấu trúc, hiện dạy lồng trong các bài khác).
- Thành phần câu (chủ/vị/định/tân/trạng/bổ ngữ số lượng/động lượng):
  THIẾU ở mức bài riêng.
- Động từ làm vị ngữ: ĐÃ CÓ (nhiều bài).
- Tính từ làm vị ngữ: MỘT PHẦN (hen-adj-predicate dạy dạng có 很).
- Danh từ làm vị ngữ: MỘT PHẦN (shi-noun-link).
- Câu không có chủ vị đầy đủ: THIẾU.
- Câu trần thuật: ĐÃ CÓ (mặc nhiên trong mọi bài).
### Loại câu và câu đặc biệt
- Câu hỏi có/không: ĐÃ CÓ (ma-question).
- Câu hỏi đặc chỉ: MỘT PHẦN (question-words).
- Câu hỏi chính phản: THIẾU.
- Câu cầu khiến: THIẾU (liên quan 不要 ở trên).
- Câu cảm thán: THIẾU.
- 是字句 dạng đồng nhất/loại thuộc: ĐÃ CÓ (shi-noun-link).
- 有字句 dạng sở hữu: ĐÃ CÓ (you-existence).
- 存现句 dạng 处所 + 有 + 数量 + 名词: MỘT PHẦN (you-existence dạy
  有 tồn tại chung, chưa dạy mẫu 存现 chuẩn).
- 双宾语句 dạng chung (không 给): MỘT PHẦN (gei-double-object dạy
  dạng 给 ở HSK2, dạng không 给 chưa dạy).
- 连动句 (hai động tác nối tiếp; động tác trước là cách thức/mục đích):
  THIẾU.
### Câu phức, thể, cách biểu đạt
- Câu phức không dùng liên từ: MỘT PHẦN (xuất hiện lẻ trong ví dụ).
- Câu phức并列 dạng ……，也…… / ……，还……: MỘT PHẦN (adverbs-du-ye
  dạy 也/还 ở cấp từ, chưa dạy mẫu câu phức).
- Thể hoàn thành và thể đổi trạng thái (了): ĐÃ CÓ (le).
- Thể tiến hành 在/正在 (+ 呢): ĐÃ CÓ (zai-progress, có ví dụ 呢).
- 序数 第 + 数词: ĐÃ CÓ (prefix-suffix).
- Cách nói số tiền: THIẾU. Cách nói thời gian (năm/tháng/ngày/thứ;
  giờ): THIẾU.

## 3. HSK2 — đối chiếu từng mục
### Từ loại và ngữ tố
- Hậu tố —面: THIẾU.
- Phương vị 左/右: THIẾU.
- Động từ trùng điệp AA/A一A/ABAB: MỘT PHẦN (verb-reduplication;
  thiếu dạng A了A).
- Năng nguyện 可能: THIẾU.
- Ly hợp từ 帮忙/游泳/跳舞/跑步: THIẾU.
- Nghi vấn 为什么: THIẾU → bài mới đợt này.
- Nhân xưng 自己: THIẾU.
- Chỉ định 那么/那样/这么/这样/每: THIẾU.
- Tính từ trùng điệp AA/AABB: THIẾU.
- Số từ 万/好多/多: THIẾU.
- Lượng từ chuyên dụng 条/位/间/名; mượn 包; động lượng 次: THIẾU.
- Mức độ 多/好/最: THIẾU ở mức bài riêng (bi-comparison có ví dụ
  多了 nhưng đó là bổ ngữ mức độ trong câu so sánh, không phải bài
  phó từ mức độ).
- Phó từ 一起/已经/有时/快/快要/正/常/经常: THIẾU (nhóm con chưa
  chắc chắn do bảng nhòe).
- Phủ định 别: THIẾU.
- Liên kết 再/就/都/还是: MỘT PHẦN (都/再 đã có ở HSK1; 还是 đã có
  ở hai-shi-choice; 就 chưa dạy).
- Giới từ 从/往: THIẾU.
- Giới từ 给 (chỉ hướng/đối tượng): MỘT PHẦN (gei dạy 给 trong câu
  hai tân ngữ, chưa dạy 给 chỉ hướng/đối tượng nói chung).
- Giới từ 比 (chỉ đối tượng so sánh): ĐÃ CÓ (bi-comparison).
- Giới từ 跟: THIẾU.
- Liên từ nối từ 跟: THIẾU.
- Liên từ nối phân câu 但/但是/那: MỘT PHẦN (complex-suiran-yinwei
  dạy 虽然/因为; 但是 mới xuất hiện ở vế sau của 虽然; 但/那 chưa dạy).
- Trợ từ 的: ĐÃ CÓ. 过: ĐÃ CÓ (guo-experience). 着: MỘT PHẦN
  (zhe-continuation dạy 着 chỉ trạng thái; nghĩa 动作持续 chưa tách rõ).
- Trợ từ 得: MỘT PHẦN (chưa có bài 得 riêng; 得 xuất hiện trong bổ
  ngữ ở các bài khác). 地: THIẾU.
- Ngữ khí 呢: MỘT PHẦN (có trong ví dụ zai-progress); 吧/啊: THIẾU.
### Cụm và cụm cố định
- Động bổ đoản ngữ: ĐÃ CÓ (result-complement, direction-complement).
- 的字短语: MỘT PHẦN (de-possessive).
- 连谓短语, 兼语短语: THIẾU.
- 什么的: THIẾU.
- 固定格式 要/快要/就要……了: THIẾU.
- 还是……吧 (đề nghị): MỘT PHẦN (hai-shi-choice dạy 还是 hỏi lựa
  chọn, chưa dạy dạng đề nghị).
### Thành phần câu và kiểu câu
- Danh từ đoản ngữ làm vị ngữ, chủ ngữ chịu tác động, mẫu 都……了:
  THIẾU.
- Định ngữ bằng động từ/chủ vị đoản ngữ: THIẾU.
- Kết quả bổ ngữ (错/懂/好/会/完): MỘT PHẦN (result-complement dạy
  完/好/懂/错; thiếu 会).
- Xu hướng bổ ngữ (đơn và phức): MỘT PHẦN (direction-complement dạy
  khung đơn + phức qua ví dụ, chưa đủ mọi dạng phức).
- Trạng thái bổ ngữ (động từ + 得 + tính từ đoản ngữ): THIẾU.
- Số lượng bổ ngữ dạng 2 (thời gian kéo dài; tính từ + số lượng):
  MỘT PHẦN (bài quantity-complement-objects dạy bổ ngữ thời
  lượng/tần suất sau động từ — mẫu nền khi câu không có tân ngữ
  và vị trí trong ba trường hợp khi câu có tân ngữ; phần tính
  từ + số lượng chưa dạy). Ghi mốc sửa phạm vi: bài này vốn
  được soạn ở lô HSK3-5 dưới id quantity-complement-3 và gán
  cho OFF-H3-32 ở HSK3; vòng sửa QA đã xác định nội dung thuộc
  OFF-H2-43 nên đổi danh tính, hạ cấp HSK2 và bổ sung khối nền
  dạng 2 (xem thêm mục 1).
- Chủ vị làm vị ngữ: THIẾU.
### Loại câu và câu đặc biệt
- Câu hỏi lựa chọn bằng 还是: ĐÃ CÓ (hai-shi-choice).
- Câu cầu khiến bằng 别: THIẾU.
- 是字句 dạng giải thích/đặc trưng: MỘT PHẦN (shi-noun-link dạy
  是 dạng HSK1; dạng HSK2 chưa tách).
- 有字句 dạng đạt được: THIẾU.
- 存现句 dạng 处所 + 动词 + 着 + 名词: THIẾU.
- 比较句: MỘT PHẦN (bi-comparison dạy dạng cơ bản và dạng có 多了;
  thiếu dạng 有/没有B这么/那么 và dạng động từ + 得 + 比).
- 是……的句 (nhấn mạnh thời gian/địa điểm/cách thức/người thực hiện):
  ĐÃ CÓ (shi-de-emphasis).
- 兼语句 (请/叫/让 + tân ngữ + động từ): THIẾU.
### Câu phức, thể, cách biểu đạt số
- 双宾语句 dạng 给: ĐÃ CÓ (gei-double-object).
- 选择复句 （是）……，还是……: MỘT PHẦN (hai-shi-choice là câu hỏi,
  chưa dạy复句).
- 转折复句 虽然……，但是……: ĐÃ CÓ (complex-suiran-yinwei).
- 紧缩复句 一……就……: THIẾU → bài mới đợt này.
- 因果复句 因为……，所以……: ĐÃ CÓ (complex-suiran-yinwei).
- 经历态 (过): ĐÃ CÓ (guo-experience).
- 持续态 (着: trạng thái): ĐÃ CÓ (zhe-continuation); nghĩa 动作持续:
  MỘT PHẦN, chưa tách rõ.
- 概数 (几; 数词 + 多 + 量词; 数词 + 量词 + 多): ĐÃ CÓ
  (approx-numbers-1, lô HSK3-8 30/10/2026; phạm vi xác minh
  trực quan trang in 388 của đề cương gốc; bài là nền tiên
  quyết cho approx-numbers-2 ở HSK3).
- 序数 dạng 数词 + 量词: THIẾU.

## 4. Danh sách chọn đợt sau (theo thứ tự ưu tiên sư phạm, không phải thứ tự đề cương)
Lô 09 chọn 6 mục đầu tiên (đủ điều kiện rà soát đầy đủ trong phiên):
1. 不要 (HSK1, cầu khiến phủ định) — tách riêng theo cấp, không gộp
   với 别 (HSK2).
2. Ly hợp từ (HSK1).
3. 怎么/怎么样 (HSK1).
4. 兼语句 请/叫/让 (HSK2).
5. 存现句2 (HSK2).
6. Trạng thái bổ ngữ 得 (HSK2).
Các mục còn lại cho đợt sau: tính từ trùng điệp (HSK2), lượng từ mở
rộng + động lượng 次 (HSK2), phó từ mở rộng (HSK2), giới từ 从/往/跟
và liên từ 但/那 (HSK2).
