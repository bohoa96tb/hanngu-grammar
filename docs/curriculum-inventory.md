# Kiểm kê hợp nhất kiến thức ngữ pháp HSK1–HSK6 và thứ tự giáo trình

- Ngày lập: 2026-10-31 (Giai đoạn 1 của chỉ đạo "Giáo trình hoàn chỉnh").
- Vai trò: đây là **danh mục thiếu sót chính thức** của dự án và là bản giải trình cho thứ tự học trong `data/curriculum.json` (quyết định D28).
- Người lập: Agent Nội dung; Manager tích hợp, QA kiểm tra độc lập ở các lô sau.

## 1. Nguồn và mức tin cậy

- Nguồn chuẩn phân cấp: **đề cương thi HSK 3.0**, bản công bố 2025-11, hiệu lực 2026-07, phần 语法大纲 (tr.382–400) — qua hệ thống tài liệu của dự án: `docs/official-catalogue-hsk1-hsk2.json`, `docs/official-catalogue-hsk3-hsk4.json`, `docs/official-catalogue-hsk5-hsk6.json` và các tài liệu ánh xạ `docs/baseline-hsk*-mapping.md`.
- **Mức đối chiếu là MỤC NHÓM của dự án** (251 mục nhóm: 52 + 62 + 50 + 34 + 31 + 22), không phải điểm vi mô chính thức. Số mục nhóm là cách chia của dự án để quản lý độ phủ; không đồng nhất với số mục trong tài liệu gốc và không suy ra độ phủ từ số bài.
- Một mục nhóm có thể cần nhiều bài, và một bài có thể phủ (một phần) nhiều mục nhóm. Trạng thái dưới đây luôn là trạng thái *của mục nhóm*, không phải của bài.
- **Giới hạn bằng chứng (quan trọng):** việc xác minh sâu P01-02 còn mở — điểm vi mô, hash của bản trích 25/09/2026, quyền phân phối, và rủi ro lệch hàng của trích xuất text ngoài các khối đã kiểm TRỰC QUAN từ PDF gốc (khối HSK3 trang in 388–391, khối câu phức HSK4 trang in 394, các hàng phó từ trang in 389). Vì vậy, ở **tầng sâu**, toàn bộ kiểm kê này mang trạng thái **NEEDS_VERIFICATION**: trạng thái COMPLETE/PARTIAL/MISSING dưới đây chỉ có giá trị ở mức mục nhóm theo bằng chứng hiện có, và không cấp nào được tuyên bố "hoàn thành" chỉ từ bảng này.
- Thang trạng thái (theo D28): `covered → COMPLETE` (ở mức mục nhóm), `partial → PARTIAL`, `missing → MISSING`; `NEEDS_CORRECTION` chỉ dùng khi có bằng chứng kiến thức hiện tại sai/gây hiểu nhầm; `NEEDS_VERIFICATION` áp cho tầng sâu như trên.

## 2. Bảng tổng hợp 6 cấp (đã tự kiểm lại từ catalogue JSON ngày 2026-10-31 — khớp số liệu Manager giao)

| Cấp | Mục nhóm | COMPLETE (covered) | PARTIAL | MISSING | Bài đã phát hành |
|---|---|---|---|---|---|
| HSK1 | 52 | 31 | 10 | 11 | 24 |
| HSK2 | 62 | 20 | 15 | 27 | 17 |
| HSK3 | 50 | 32 | 4 | 14 | 34 |
| HSK4 | 34 | 1 | 0 | 33 | 1 |
| HSK5 | 31 | 0 | 0 | 31 | 0 |
| HSK6 | 22 | 0 | 0 | 22 | 0 |
| **Tổng** | **251** | **84** | **29** | **138** | **76** |

Đọc đúng bảng này: 84/251 mục nhóm đã phủ ở mức nhóm — đó không phải "đã biên soạn xong 84/251 kiến thức HSK", vì mỗi mục nhóm còn tầng điểm vi mô chưa xác minh sâu (xem §1). Tổng số bài tập đã phát hành sau lô HSK1-A: 373 (validator đếm trực tiếp từ dữ liệu).

## 3. Kiểm kê theo cấp

### 3.1. HSK1 — 52 mục nhóm, 24 bài

**COMPLETE (31) — tóm tắt theo nhóm:**
- Ngữ tố và số thứ tự: H1-01 （小—/第—), H1-02 （—们/—边), H1-50 （序数 第+数词） — bài prefix-suffix.
- Phương vị: H1-03 （上/下/里/外/前/后） — location-nouns.
- Năng nguyện: H1-04 （会/能/可以）, H1-05 （想/要）.
- Đại từ để hỏi: H1-07 （什么/谁）, H1-08 （怎么/怎么样）.
- Chỉ định: H1-10 （这/那…).
- Phó từ: H1-17 （都）, H1-18 （在/正在）, H1-19 （还/再/也 — nhóm con từng ghi chưa chắc do bản trích nhòe).
- Phủ định: H1-20 （不/没）, H1-21 （不要）.
- Giới/trợ từ và mẫu câu nền: H1-22 （在）, H1-25 （的）, H1-26 （了 động thái), H1-27 （吗）, H1-32 (động từ làm vị ngữ), H1-36 (câu hỏi có/không), H1-41 （是字句 đồng nhất), H1-42 （有字句 sở hữu).
- Thể: H1-48 （了 hoàn thành/đổi trạng thái), H1-49 （在/正在 tiến hành).
- Ly hợp từ: H1-06.
- Đã khép ở lô HSK1-A (2026-10-31): H1-12 （数词）, H1-51 (cách nói số tiền) — bài numbers-and-money; H1-15 (lượng từ thời lượng), H1-52 (cách nói thời gian) — bài time-expressions; H1-24 （连 từ 和） — bài he-connecting; H1-38 (câu hỏi chính phản) — bài questions-affirmative-negative.

**PARTIAL (10):**

| Mã | Tên mục | Bài liên quan | Phần còn thiếu (theo note của catalogue) |
|---|---|---|---|
| OFF-H1-09 | Nhân xưng (hệ thống) | pronouns | Công thức nhắc tới nhưng ví dụ chưa dạy hệ thống. |
| OFF-H1-13 | Lượng từ chuyên dụng HSK1 | measure-words | Ví dụ mới dạy 本/件. |
| OFF-H1-16 | Phó từ mức độ 非常/很/太/真/有点儿 | hen-adj-predicate, adverbs-du-ye | Thiếu 真/有点儿. |
| OFF-H1-33 | Tính từ làm vị ngữ | hen-adj-predicate | Mới dạy dạng có 很. |
| OFF-H1-34 | Danh từ làm vị ngữ | shi-noun-link | Chưa dạy đầy đủ dạng danh từ làm vị ngữ. |
| OFF-H1-37 | Câu hỏi đặc chỉ | question-words | Chưa phủ đủ hệ thống câu hỏi đặc chỉ. |
| OFF-H1-43 | 存现句 dạng 处所+有+数量+名词 | you-existence | Chưa dạy mẫu chuẩn. |
| OFF-H1-44 | 双宾语句 dạng chung (không 给） | gei-double-object | Bài hiện có dạy dạng 给 (ở HSK2). |
| OFF-H1-46 | Câu phức không liên từ | — | Chưa có bài/điểm dạy tương ứng. |
| OFF-H1-47 | Câu phức 并列 ……，也……/……，还…… | adverbs-du-ye | Mới dạy ở cấp từ, chưa dạy ở cấp câu phức. |

**MISSING (11):**

| Mã | Tên mục | Ghi chú |
|---|---|---|
| OFF-H1-11 | Chỉ định 有的/有些 | Chưa có bài. |
| OFF-H1-14 | Lượng từ mượn 杯 | Chưa có bài. |
| OFF-H1-23 | Giới từ chỉ đối tượng 对 | Chưa có bài. |
| OFF-H1-28 | Ngữ khí 呢/吧 | Chưa có bài. |
| OFF-H1-29 | Thán từ 喂 | Chưa có bài (mục nhỏ). |
| OFF-H1-30 | Loại cụm （联合/偏正/动宾/主谓/数量/介宾/方位） | Kiến thức cấu trúc, chưa thành bài riêng. |
| OFF-H1-31 | Thành phần câu | Chưa thành bài riêng. |
| OFF-H1-35 | Câu không chủ vị đầy đủ | Chưa có bài. |
| OFF-H1-39 | Câu cầu khiến | Chưa có bài (mới có cấm đoán 不要 ở mục phủ định). |
| OFF-H1-40 | Câu cảm thán | Chưa có bài. |
| OFF-H1-45 | 连动句 | Chưa có bài ở HSK1. |

(6 mục OFF-H1-12/51/52/15/24/38 đã khép ở lô HSK1-A (2026-10-31) — xem nhóm COMPLETE ở trên.)

**NEEDS_CORRECTION ở HSK1:** chưa phát hiện mục nào theo catalogue hiện tại. (Không có nghĩa là đã rà soát sâu từng điểm vi mô — xem §1.)

### 3.2. HSK2 — 62 mục nhóm, 17 bài

**COMPLETE (20) — tóm tắt theo nhóm:**
- Đại từ/câu hỏi: H2-06 （为什么）.
- Liên kết: H2-15 （再/都 ở HSK2), H2-17 （还是）, H2-23 （虽然/因为/所以）, H2-55 （转折复句）, H2-57 （因果复句）.
- Trợ từ: H2-25 （的）, H2-26 （过）.
- Bổ ngữ: H2-32 （动补 đoản ngữ), H2-42 (trạng thái bổ ngữ 得）.
- Mẫu câu: H2-20 （比 giới từ), H2-45 (câu hỏi 还是）, H2-49 （存现 着）, H2-51 （是……的）, H2-52 （兼语 请/叫/让）, H2-53 （双宾 给）, H2-56 （紧缩 一……就……).
- Thể và số ước lượng: H2-58 （过 kinh nghiệm), H2-59 （着 trạng thái), H2-61 （概数 — đã xác minh trực quan trang in 388).

**PARTIAL (15):**

| Mã | Tên mục | Bài liên quan | Phần còn thiếu |
|---|---|---|---|
| OFF-H2-03 | Động từ trùng điệp AA/A一A/ABAB | verb-reduplication | Thiếu A了A. |
| OFF-H2-19 | Giới từ 给 (hướng/đối tượng) | gei-double-object | Mới dạy dạng hai tân ngữ. |
| OFF-H2-24 | Liên từ nối phân câu 但/但是/那 | complex-suiran-yinwei | 但是 mới ở vế sau của 虽然. |
| OFF-H2-27 | Trợ từ 着 | zhe-continuation | Mới dạy nghĩa trạng thái. |
| OFF-H2-28 | Trợ từ 得 | — | Chưa có bài riêng (nội dung đang nằm rải trong state-complement-de/potential…). |
| OFF-H2-30 | Ngữ khí 呢 | zai-progress | Mới xuất hiện trong khung tiến hành. |
| OFF-H2-33 | 的字短语 | de-possessive | Chưa dạy thành điểm riêng đầy đủ. |
| OFF-H2-37 | 还是……吧 (đề nghị) | hai-shi-choice | Mới dạy 还是 hỏi lựa chọn. |
| OFF-H2-40 | Kết quả bổ ngữ 错/懂/好/会/完 | result-complement | Thiếu 会. |
| OFF-H2-41 | Xu hướng bổ ngữ đơn/phức | direction-complement | Chưa phủ đủ dạng phức. |
| OFF-H2-43 | Số lượng bổ ngữ dạng 2 | quantity-complement-objects | Phần tính từ + số lượng của dạng 2 chưa dạy. |
| OFF-H2-47 | 是字句 dạng giải thích/đặc trưng | shi-noun-link | Bài hiện có dạy dạng HSK1. |
| OFF-H2-50 | 比较句 | bi-comparison | Thiếu dạng 有/没有B这么/那么 và động từ+得+比. |
| OFF-H2-54 | 选择复句 （是）……，还是…… | hai-shi-choice | Bài hiện có là câu hỏi, chưa dạy复句. |
| OFF-H2-60 | 持续态 着 （动作持续） | zhe-continuation | Chưa tách rõ khỏi nghĩa trạng thái. |

**MISSING (27):** H2-01 （后 —面）, H2-02 （左/右）, H2-04 （可能）, H2-05 (ly hợp 帮忙/游泳/跳舞/跑步）, H2-07 （自己）, H2-08 （那么/那样/这么/这样/每）, H2-09 (tính từ trùng điệp), H2-10 （万/好多/多）, H2-11 (lượng từ 条/位/间/名/包/次）, H2-12 （多/好/最 mức độ), H2-13 （一起/已经/有时/快/快要/正/常/经常 — nhóm con chưa chắc do bản trích nhòe), H2-14 （别 phủ định), H2-16 (liên kết 就）, H2-18 （从/往）, H2-21 （跟 giới từ), H2-22 （跟 liên từ), H2-29 （地）, H2-31 （吧/啊 ngữ khí), H2-34 （连谓/兼语 đoản ngữ), H2-35 （什么的）, H2-36 (mẫu 要/快要/就要……了）, H2-38 (danh từ đoản ngữ làm vị ngữ/thụ sự chủ ngữ/都……了）, H2-39 (định ngữ bằng động từ/chủ vị), H2-44 (chủ vị làm vị ngữ), H2-46 (câu cầu khiến 别）, H2-48 （有字句 đạt được), H2-62 （序数 dạng số+lượng từ).

### 3.3. HSK3 — 50 mục nhóm, 34 bài

**COMPLETE (32) — tóm tắt theo nhóm:**
- Năng nguyện/đại từ/câu hỏi: H3-04, H3-07 （怎样+动词 — đã thu hẹp phạm vi theo kiểm trực quan tr.391), H3-09, H3-10.
- Hệ phó từ (đều đã xác minh trực quan trang in 389): H3-12 (mức độ), H3-13 (phạm vi), H3-15 (tần suất), H3-18 (ngữ khí), H3-19 （不必/不用）.
- Mẫu cố định: H3-26 (đủ 5 thành viên của giỏ).
- Bổ ngữ: H3-28, H3-29, H3-30, H3-31, H3-32.
- Mẫu câu: H3-33 (phản vấn dạng 1), H3-34 （把 dạng 1), H3-35 （被 dạng 1), H3-36 （连动 着）, H3-37 （比较 dạng 2), H3-38 （存现 dạng 3), H3-39 （是……的 dạng 2), H3-40 (trùng động).
- Câu phức: H3-41, H3-42 （或者 — đã sửa gán theo kiểm trực quan tr.391), H3-43 (song song, đủ 3 thành viên), H3-44, H3-46, H3-47, H3-48, H3-49.
- Số ước lượng: H3-50.

**PARTIAL (4):**

| Mã | Tên mục | Bài liên quan | Phần còn thiếu |
|---|---|---|---|
| OFF-H3-14 | Phó từ thời gian 才¹/马上/先/一会儿/刚/刚刚/一直 | adverbs-time-hsk3 | Thiếu 才¹ nghĩa thời gian "mãi đến lúc đó mới" (6/7 thành viên). |
| OFF-H3-21 | Giới từ 把/被 (vai giới từ) | ba-sentence-1, bei-passive-1 | Phủ ở vai mẫu câu; vai giới từ chưa tách. |
| OFF-H3-25 | Cụm cố định HSK3 (giỏ nhiều mẫu) | complex-compact | Mới phủ một phần giỏ. |
| OFF-H3-45 | Câu phức 转折 虽然……，可是…… | complex-suiran-yinwei | Bài dạy 虽然……，但是……; dạng 可是 chưa tách. |

**MISSING (14):** H3-01 （老—), H3-02 （—家/—子/—员）, H3-03 （东/南/西/北…), H3-05 (ly hợp động tân), H3-06 (ly hợp động bổ), H3-08 (nghi vấn dùng không hỏi), H3-11 (lượng từ HSK3 — cần vòng chọn lọc tần suất riêng), H3-16 （一边 liên kết; mẫu câu đã phủ ở H3-43 nhưng vai phó từ liên kết chưa thành điểm), H3-17 (tình thái 大概/必须/差不多/一定/好像/几乎 — cần thiết kế bài phân biệt sắc thái), H3-20 （为/向/为了/根据/关于）, H3-22 (giỏ liên từ — phần lớn đã phủ rải rác ở các bài câu phức nhưng chưa đối chiếu thành điểm), H3-23 （动补 đoản ngữ dạng 2), H3-24 （同位/tứ tự cách/số lượng trùng điệp), H3-27 (chủ ngữ bằng đoản ngữ; đa định ngữ).

### 3.4. HSK4 — 34 mục nhóm, 1 bài

**COMPLETE (1):** OFF-H4-27 — Câu phức lựa chọn （不是……，就是……), bài complex-choice (đã kiểm trực quan trang in 394; bài này đồng thời dạy 或者……，或者…… thuộc HSK3).

**PARTIAL (0).**

**MISSING (33):** H4-01 （敢）, H4-02 （各/任何/此…), H4-03 (lượng từ HSK4), H4-04 (mức độ 十分/更加/稍…), H4-05 (phạm vi 共/全/光/仅/至少）, H4-06 (thời gian 按时/从来/赶紧/忽然/将…), H4-07 （重新/往往/偶尔/故意/互相…), H4-08 （却； 也许/恐怕）, H4-09 （难道/千万/确实/只好/竟然/究竟/正好…), H4-10 (giới từ 自/当/由/将/由于/对于/作为/按…), H4-11 (giỏ liên từ), H4-12 （等/者/之/就是； 啊/嗯）, H4-13 (tứ tự cách), H4-14 (cụm cố định), H4-15 (giỏ mẫu cố định), H4-16 (mức độ bổ ngữ +死了/厉害）, H4-17 (khả năng bổ ngữ +得/不+了）, H4-18 (phản vấn dạng 2), H4-19 （把 dạng 2), H4-20 （被 dạng 2 叫/让）, H4-21 （兼语 dạng 2), H4-22 （比较 dạng 3 不如/跟……相比）, H4-23 (phủ định kép nhấn mạnh), H4-24 (song song 不是……，而是……/既……，又……/一方面……), H4-25 （承接 首先……，其次……/于是）, H4-26 （递进 不仅……，还……/甚至/连……也/都……，……更……), H4-28 （转折 尽管……/然而/不过/X是X), H4-29 （假设 否则/要是）, H4-30 (điều kiện 不管/无论）, H4-31 (nhân quả 既然/由于……，因此）, H4-32 (mục đích/nhượng bộ 好/即使/就是……，也……), H4-33 （紧缩 dạng HSK4), H4-34 （概数 dạng 3 + cách nói số thập phân/phân số/phần trăm/bội số).
(Lưu ý: nhiều mục H4-23…H4-29 đã được sửa gán theo kiểm trực quan trang in 394 ngày 30/10/2026 — xem note trong catalogue.)

### 3.5. HSK5 — 31 mục nhóm, 0 bài

**MISSING (31, toàn bộ):** H5-01 （—头）, H5-02 （彼此/如此/本）, H5-03 (lượng từ HSK5), H5-04 （过于/相当/较/格外/极其）, H5-05 （时刻/曾经/立刻/始终/早已/即将/渐渐…), H5-06 （老是/通常/时常）, H5-07 （尽量/亲自； 便/一旦； 似乎/仿佛）, H5-08 （毕竟/居然/反正/根本/果然/简直/绝对/的确/反而…), H5-09 （自从； 朝/沿； 替/同； 凭/据/依据）, H5-10 （以及/从而/可见/假如/总之； 似的）, H5-11 (tứ tự cách HSK5), H5-12 (cụm cố định; vị trí 不得了 trong bản trích chưa chắc), H5-13 (giỏ mẫu cố định), H5-14 (đa trạng ngữ), H5-15 (khả năng bổ ngữ +得/不得 — nhãn dạng chưa chắc), H5-16 (mức độ bổ ngữ +得+不得了 — nhãn dạng chưa chắc), H5-17 (xu hướng bổ ngữ dạng 3 nghĩa trạng thái), H5-18 (trạng thái bổ ngữ dạng 2), H5-19 （有 dạng 3), H5-20 （把 dạng 3), H5-21 （被 dạng 3), H5-22 （连动 dạng 3), H5-23 （比较 dạng 4), H5-24 （承接 便）, H5-25 （选择 或是）, H5-26 （假设 一旦/假如/万一/要不然）, H5-27 （因果 因而/可见）, H5-28 （让步 哪怕）, H5-29 （递进 不但不……，反而……), H5-30 (mục đích 为的是…), H5-31 （紧缩 再……也……/不……不……).

### 3.6. HSK6 — 22 mục nhóm, 0 bài

**MISSING (22, toàn bộ):** H6-01 (tiền tố 超/多/反/无/亚/准）, H6-02 (hậu tố —化/—式/—型/—性）, H6-03 （人家）, H6-04 (lượng từ HSK6; phân loại 卷 chưa chắc hoàn toàn), H6-05 （特/异常/较为）, H6-06 （净/一同/大都）, H6-07 （一时/不时/仍旧/依旧/一向）, H6-08 （一再/再三； 不禁/赶忙/特地/特意/偷偷； 未必）, H6-09 （恰好/倒是/干脆/明明/总算）, H6-10 （于/因/至于/除）, H6-11 （不料； 所； 啦/嘛； 也好）, H6-12 (tứ tự cách HSK6), H6-13 (cụm cố định), H6-14 (giỏ mẫu cố định), H6-15 (mức độ bổ ngữ +透+了 dạng 3), H6-16 （把 dạng 4), H6-17 （一时……一时……), H6-18 （要么……，要么……), H6-19 （虽……，但/可/却/也……), H6-20 （凡是/除非…), H6-21 （就算……，也……), H6-22 （……，以便……).

## 4. Quyết định xử lý cho HSK1 (theo §4 của chỉ đạo)

Thang quyết định: **A** bổ sung vào bài hiện có · **B** bài mới · **C** tách bài · **D** kiến thức bổ trợ (gắn nhãn, không nhận là mục HSK riêng nếu ngoài đề cương — ở đây D dùng cho mục nhỏ lồng ghép, không thành bài riêng) · **E** để cấp cao hơn/backlog.
Kết quả áp cho HSK1: **không mục nào cần C** (các bài hiện có chưa quá tải; trường hợp cần tách duy nhất là 了 đã tách từ lô std2) và **không mục nào bị đẩy E** (kiến thức thuộc HSK1 phải khép ở HSK1).

### 4.1. Mục PARTIAL (10)

| Mã | Quyết định | Bài đích / lý do ngắn |
|---|---|---|
| OFF-H1-09 | A | Bổ sung vào **pronouns**: thêm ví dụ dạy hệ thống nhân xưng (công thức đã nhắc, chỉ thiếu ví dụ hệ thống). |
| OFF-H1-13 | A | Bổ sung vào **measure-words**: thêm các lượng từ chuyên dụng HSK1 ngoài 本/件; gộp xử lý cùng H1-14. |
| OFF-H1-16 | A | Bổ sung 真/有点儿 vào **adverbs-du-ye** (bài đang gánh nhóm phó từ mức độ; hen-adj-predicate giữ vai trò mẫu câu tính từ). |
| OFF-H1-33 | A | Bổ sung vào **hen-adj-predicate**: dạng tính từ làm vị ngữ không có 很 (đối chiếu/phủ định/ngữ cảnh so sánh). |
| OFF-H1-34 | A | Bổ sung vào **shi-noun-link**: dạng danh từ (thời gian/số lượng/khí hậu…) làm vị ngữ trực tiếp. |
| OFF-H1-37 | A | Bổ sung vào **question-words**: phủ đủ các từ để hỏi còn thiếu trong hệ thống đặc chỉ. |
| OFF-H1-43 | A | Bổ sung vào **you-existence**: dạy mẫu chuẩn 处所+有+数量+名词 như một mẫu riêng trong bài. |
| OFF-H1-44 | A | Bổ sung vào **gei-double-object**: thêm dạng hai tân ngữ chung không dùng 给. Lưu ý lệch cấp: mục thuộc HSK1 nhưng bài đích ở HSK2 — khi làm GĐ2 phải ghi rõ phần nền HSK1 trong bài để người học HSK1 không bị coi là đã phủ nếu chưa học tới HSK2; Manager quyết cách trình bày cuối. **Mục này khép ở giai đoạn hoàn thiện HSK2, KHÔNG tính vào điều kiện hoàn thành HSK1.** |
| OFF-H1-46 | B | Gộp vào **bài nền cấu trúc câu mới** (cùng H1-30/31/35): câu phức không liên từ là kiến thức tổ chức câu, dạy ở mức nhận biết trong bài nền, không thành bài riêng. |
| OFF-H1-47 | A | Bổ sung vào **adverbs-du-ye**: nâng phần 也/还 từ cấp từ lên cấp câu phức song song bằng ví dụ cặp vế đầy đủ. |

### 4.2. Mục MISSING (17 ở thời điểm lập quyết định; 6 mục đã khép ở lô HSK1-A, còn 11)

| Mã | Quyết định | Bài đích / lý do ngắn |
|---|---|---|
| OFF-H1-11 | A | Bổ sung 有的/有些 vào **pronouns** (cùng họ chỉ định, khối lượng nhỏ, không đủ chất liệu cho bài riêng). |
| OFF-H1-12 | B — **đã khép ở lô HSK1-A (2026-10-31)** | Bài mới số từ (cùng bài với H1-51 theo chốt của Manager). |
| OFF-H1-14 | A | Bổ sung lượng từ mượn 杯 vào **measure-words** cùng đợt H1-13 (cùng một mục tiêu học: chọn lượng từ theo danh từ). |
| OFF-H1-15 | B — **đã khép ở lô HSK1-A (2026-10-31)** | Đi trong bài mới thời gian (cùng H1-52 theo chốt của Manager). |
| OFF-H1-23 | B | Bài mới giới từ 对： mục tiêu độc lập (hướng đối tượng/áp dụng cho ai), là nền cho cụm 对……来说 ở HSK3; không bài hiện có nào gánh được mà không lệch mục tiêu. |
| OFF-H1-24 | B — **đã khép ở lô HSK1-A (2026-10-31)** | Bài mới liên từ 和 (theo chốt của Manager). |
| OFF-H1-28 | B | Bài mới trợ từ ngữ khí 呢/吧： cặp trợ từ cuối câu có mục tiêu độc lập, song song với bài 吗 đã có; gộp vào bài 吗 sẽ làm bài quá tải hai hệ chức năng. |
| OFF-H1-29 | A | Thán từ 喂： lồng ghép vào bài giao tiếp phù hợp. Đổi quyết định D → A vì 喂 là mục chính thức trong đề cương nên không gắn nhãn "Kiến thức bổ trợ"; khối lượng rất nhỏ nên không thành bài riêng. |
| OFF-H1-30 | B | Gộp vào **bài nền cấu trúc câu mới** (cùng H1-31/35/46): loại cụm là kiến thức phân tích cấu trúc, cần một bài nền ở đầu cấp thay vì rải vào các bài mẫu. |
| OFF-H1-31 | B | Cùng bài nền cấu trúc câu (thành phần câu là khung của bài đó). |
| OFF-H1-35 | B | Cùng bài nền cấu trúc câu (câu không chủ vị là một kiểu câu trong khung thành phần câu). |
| OFF-H1-38 | B — **đã khép ở lô HSK1-A (2026-10-31)** | Bài mới câu hỏi chính phản (theo chốt của Manager). |
| OFF-H1-39 | B | Gộp vào **bài mới "Câu cầu khiến và cảm thán cơ bản" ở lô HSK1-B** (cùng H1-40). Đổi quyết định A → B: mở rộng bu-yao-prohibition sẽ đổi mục tiêu cốt lõi của bài đó và chồng lấn bài trợ từ dự kiến. |
| OFF-H1-40 | B | Gộp vào **bài mới "Câu cầu khiến và cảm thán cơ bản" ở lô HSK1-B** (cùng H1-39): cảm thán là một kiểu câu riêng trong phân loại 句类 của đề cương, mẫu lõi 太……了/多……啊; lý do gộp chung bài với cầu khiến như ở H1-39. |
| OFF-H1-45 | B | Bài mới 连动句： cấu trúc cốt lõi có mục tiêu độc lập, là nền cho 兼语句 (HSK2) và các dạng 连动 cao hơn (HSK3/HSK5); không bài hiện có nào dạy chuỗi hai động từ liên tiếp. |
| OFF-H1-51 | B — **đã khép ở lô HSK1-A (2026-10-31)** | Đi trong bài mới số từ + tiền (cùng H1-12). |
| OFF-H1-52 | B — **đã khép ở lô HSK1-A (2026-10-31)** | Bài mới thời gian (cùng H1-15). |

Tổng hình HSK1 sau xử lý (dự kiến, chưa phải kết quả): 4 bài của lô HSK1-A (đã phát hành) + 5 bài mới đề xuất （对, 呢/吧, bài nền cấu trúc câu, bài cầu khiến + cảm thán gộp, 连动句） = tối đa 9 bài mới; 11 mục xử lý bằng cách bổ sung/lồng ghép vào bài cũ (gồm H1-29 lồng ghép vào bài giao tiếp, không gắn nhãn bổ trợ). Mọi con số này là kế hoạch xử lý, chỉ thành độ phủ khi bài đã qua QA và phát hành.

## 5. Thứ tự giáo trình chốt trong `data/curriculum.json`

Nguyên tắc áp dụng (D28 §5): nền tảng/trật tự câu cơ bản → câu hỏi/phủ định → thời/thể → cấu trúc đặc biệt → phân biệt/so sánh đặt sau khi từng cấu trúc đã học. Bài tiên quyết (requires, §6) luôn đứng trước bài phụ thuộc. Số "Bài NN" = vị trí trong danh sách của cấp.

### 5.1. HSK1 (24 bài) — thay đổi chính so với thứ tự manifest

Thứ tự: shi-noun-link · pronouns · de-possessive · he-connecting · hen-adj-predicate · ma-question · question-words · questions-affirmative-negative · zenme-question · measure-words · numbers-and-money · time-expressions · location-nouns · you-existence · zai-progress · bu-mei-negation · bu-yao-prohibition · modal-hui-neng-keyi · modal-xiang-yao · adverbs-du-ye · le-completion-change · le-sentence-final-change · prefix-suffix · separable-verbs.

Lý do theo nhóm:
- **Nền câu (01–05):** 是 nối danh từ trước tiên (mẫu câu đầu tiên người học nói được), rồi đại từ (chủ/tân ngữ cho mọi mẫu sau — manifest để pronouns ở vị trí 14 là quá muộn), 的 mở rộng cụm danh từ, 和 nối danh từ/cụm danh từ (he-connecting, lô HSK1-A) hoàn thiện việc xây cụm danh từ, 很 cho loại vị ngữ thứ hai (tính từ).
- **Câu hỏi (06–09):** 吗 biến câu trần thuật đã biết thành câu hỏi có/không; từ để hỏi đặc chỉ thay thành phần tại chỗ; câu hỏi chính phản (questions-affirmative-negative, lô HSK1-A) là dạng hỏi có/không thứ hai đặt liền sau; 怎么/怎么样 chốt nhóm hỏi (phân biệt sau khi đã biết các dạng hỏi kia).
- **Danh từ, số và nơi chốn (10–15):** lượng từ (số + lượng từ + danh từ) trước; số từ và tiền (numbers-and-money, lô HSK1-A) ngay sau vì dùng lại cụm số lượng; thời gian (time-expressions, lô HSK1-A, requires numbers-and-money) nối tiếp nhóm số; rồi phương vị và 有 tồn tại vì cả hai đều dùng cụm số lượng/nơi chốn; 在 vừa là giới từ nơi chốn vừa mở đầu hệ thể (đang làm gì).
- **Phủ định và năng nguyện (16–20):** 不/没 là hệ phủ định gốc, 不要 là ứng dụng cầu khiến của nó; hai bài năng nguyện liền sau; phó từ 都/也/还/再 + mức độ đặt sau vì chúng sửa vị ngữ đã biết và chứa cả phần 还/再 cần phân biệt với phủ định/thể.
- **Thể （了） và cấu trúc đặc biệt (21–24):** cặp 了 đặt gần cuối cấp theo đúng quan hệ requires (hoàn thành → đổi trạng thái) và sau phủ định 没 (phủ định của 了 cần 没）; 第/小/们 dùng lại số và lượng từ; ly hợp từ chốt cấp vì nó tổ chức lại động từ + tân ngữ đã học và chèn được 了/số lượng — đặt cuối để mọi thành phần chèn đều đã học.
- Thay đổi nổi bật so với manifest: cặp 了 từ vị trí 2–3 → 21–22; pronouns 14 → 2; zenme-question 20 → 9; bu-yao-prohibition 18 → 17; location-nouns 17 → 13; prefix-suffix 13 → 23. Bốn bài lô HSK1-A vào vị trí 04 (he-connecting), 08 (questions-affirmative-negative), 11 (numbers-and-money), 12 (time-expressions).

### 5.2. HSK2 (17 bài)

Thứ tự: guo-experience · zhe-continuation · state-complement-de · result-complement · direction-complement · quantity-complement-objects · bi-comparison · approx-numbers-1 · hai-shi-choice · why-question · shi-de-emphasis · gei-double-object · jianyu-qing-jiao-rang · cunxian-chu · verb-reduplication · yi-jiu-tight · complex-suiran-yinwei.

Lý do theo nhóm:
- **Thể và bổ ngữ nền (01–06):** 过 nối tiếp 了 của HSK1; 着 trạng thái đặt sớm vì ba nơi dùng lại nó （存现 ở bài 14 và hai bài HSK3); bổ ngữ trạng thái 得 đưa lên vị trí 3 (từ 15 trong manifest) vì nó là tiên quyết của ba bài HSK3 (khả năng bổ ngữ, mức độ bổ ngữ, trùng động); kết quả → xu hướng → số lượng là dãy bổ ngữ theo độ phức tạp vị trí.
- **So sánh và số lượng (07–08):** 比 sau khi đã có tính từ và bổ ngữ; số ước lượng dạng 1 khép nhóm số (nền cho dạng 2 ở HSK3).
- **Câu hỏi và mẫu câu đặc biệt (09–14):** 还是 lựa chọn và 为什么 mở rộng hệ câu hỏi HSK1; 是……的 dạng 1 cần ngữ cảnh quá khứ （过/了） nên đứng sau nhóm thể; 给 hai tân ngữ → kiêm ngữ → 存现 （着） là dãy cấu trúc câu tăng dần.
- **Chốt cấp (15–17):** trùng điệp động từ （看看） dùng lại bổ ngữ; 一……就…… là câu phức rút gọn đầu tiên; 虽然/因为 câu phức đầy đủ đặt cuối cấp làm tổng hợp và cầu sang câu phức HSK3.
- Thay đổi nổi bật: state-complement-de 15 → 3; quantity-complement-objects 16 → 6; approx-numbers-1 17 → 8; complex-suiran-yinwei 7 → 17; bi-comparison 1 → 7.

### 5.3. HSK3 (34 bài)

Thứ tự: pronouns-others · modal-verbs-hsk3 · negation-bubi-buyong · adverbs-time-hsk3 · adverbs-frequency-hsk3 · adverbs-scope-hsk3 · adverbs-degree-hsk3 · adverbs-mood-hsk3 · result-complement-2 · potential-complement-1 · degree-complement-1 · direction-complement-2 · verb-repetition-sentence · time-since-completion · zhe-accompanying · cunxian-appearance · ba-sentence-1 · bei-passive-1 · shi-de-attitude · bi-comparison-2 · approx-numbers-2 · zenme-yang-question · rhetorical-question · complex-sequence · complex-parallel · alternating-actions · complex-progressive · complex-hypothesis · complex-condition · complex-purpose · complex-compact · yue-patterns · time-frame-patterns · fixed-pattern-shenme.

Lý do theo nhóm:
- **Mở cấp nhẹ (01–03):** đại từ mở rộng là bài từ loại, ôn lại hệ đại từ HSK1; năng nguyện HSK3 nối hai bài năng nguyện HSK1; 不必/不用 đặt ngay sau năng nguyện vì nó là phủ định của "cần/phải" (tránh lỗi phủ định của 得 děi được chính bài năng nguyện cảnh báo).
- **Hệ phó từ (04–08):** thời gian → tần suất → phạm vi → mức độ → ngữ khí, theo độ trừu tượng tăng dần; cả năm bài cùng một khung vị trí (trước vị ngữ) nên học liền nhau để phân biệt chéo （才/就 xuất hiện ở nhiều giỏ và chính các bài đã phân biệt giúp nhau).
- **Họ bổ ngữ nâng cao (09–14):** kết quả dạng 2 là nền trực tiếp của khả năng bổ ngữ (requires cả hai ghi rõ); mức độ bổ ngữ sau khả năng vì cùng dùng 得/不; xu hướng nghĩa mở rộng; trùng động và số lượng dạng 3 là hai bài "tổ chức lại câu" cần bổ ngữ trạng thái/số lượng của HSK2.
- **Cấu trúc câu đặc biệt (15–20):** 着 kèm theo → 存现 dạng 3 (cùng họ câu tồn hiện, đều cần bổ ngữ xu hướng); 把 trước 被 (cặp phân biệt kinh điển, học chủ động trước bị động); 是……的 dạng 2 và so sánh dạng 2 là hai bài "dạng 2" khép các họ bắt đầu từ HSK2.
- **Số, câu hỏi đặc biệt (21–23):** 概数 dạng 2 khép họ số; 怎样+动词 và phản vấn là hai điểm câu hỏi còn lại của cấp, đều là bài phân biệt （怎样 vs 怎么/怎么样； phản vấn vs câu hỏi thường).
- **Câu phức và mẫu cố định (24–34):** tiếp nối → song song （又/一边 + mẫu luân phiên 一会儿 là thành viên cùng mục 并列） → tiến triển → giả định → điều kiện (cặp phân biệt 只有/只要 đặt sau khi đã biết 如果/的话） → mục đích → rút gọn; ba bài mẫu cố định （越……越……, mốc thời gian, X什么（啊）) chốt cấp như phần tổng hợp mẫu đóng.
- Thay đổi nổi bật so với manifest: ba-sentence-1/bei-passive-1 từ vị trí 1–2 → 17–18 (không mở cấp bằng hai bài khó nhất; chúng cần bổ ngữ đã học ở nhóm 09–14); hệ phó từ HSK3 từ vị trí rải rác 14–16/33–34 → khối liền 04–08; complex-choice không nằm ở HSK3 (nó là bài HSK4, xem §5.4).

### 5.4. HSK4 (1 bài)

Thứ tự hiện có: complex-choice. Bài này có requires hai-shi-choice (HSK2) — đã đứng trước trong thứ tự toàn cục. 33/34 mục nhóm HSK4 còn MISSING nên chưa thể nói về "thứ tự giáo trình HSK4"; khi các lô HSK4 bắt đầu, thứ tự sẽ được chốt lại theo cùng nguyên tắc (nhóm từ loại → bổ ngữ dạng cao → mẫu câu dạng cao → câu phức), và vị trí của complex-choice sẽ được xét lại trong bối cảnh đó thay vì mặc định giữ vị trí Bài 01.

### 5.5. HSK5–HSK6

Chưa có bài nào phát hành (0/31 và 0/22 mục nhóm đều MISSING). Không lập thứ tự: danh sách cấp trong `data/curriculum.json` để trống đúng thực tế, giao diện phải ghi "đang biên soạn" thay vì bịa số bài (D28 §3).

## 6. Tiên quyết (`requires`) chốt trong curriculum.json

Chỉ ghi quan hệ chặt — bài sau không học được (hoặc phần phân biệt cốt lõi của nó mất nghĩa) nếu chưa học bài trước — và mọi quan hệ đều có bằng chứng đọc được trong dữ liệu hai bài hoặc tài liệu ánh xạ. Tổng: **14 bài có requires, 16 cạnh**.

| Bài phụ thuộc | Tiên quyết | Bằng chứng |
|---|---|---|
| le-sentence-final-change | le-completion-change | Cặp tách bài theo D26: cùng một chữ 了, bài cuối câu định nghĩa bằng đối chiếu với 了 hoàn thành. |
| bi-comparison-2 | bi-comparison | Công thức dùng trực tiếp khung A比B + tính từ của dạng 1 （更/还 đứng sau 比）. |
| result-complement-2 | result-complement | when_to_use mở đầu: "Đây là dạng 2… nối tiếp bài Bổ ngữ kết quả dạng 1". |
| potential-complement-1 | result-complement, state-complement-de | when_to_use ghi thẳng "Điều kiện nền": ghép với bổ ngữ kết quả dạng 1 và "dùng lại chữ 得 đã gặp ở bài bổ ngữ trạng thái"; review.notes lặp lại cả hai nền. |
| direction-complement-2 | direction-complement | Nghĩa mở rộng （起来/下去/出来） định nghĩa bằng đối chiếu với nghĩa xu hướng thật của dạng 1. |
| cunxian-appearance | cunxian-chu | when_to_use: "Khác bài tồn hiện HSK2 (cunxian-chu)" — toàn bộ bài là phân biệt tĩnh → xuất hiện/biến mất trên cùng khung nơi chốn. |
| shi-de-attitude | shi-de-emphasis | Dạng 2 định nghĩa bằng đối chiếu với dạng 1 trong when_to_use/formula. |
| approx-numbers-2 | approx-numbers-1 | Catalogue OFF-H2-61 ghi approx-numbers-1 là "nền tiên quyết" cho approx-numbers-2 (OFF-H3-50). |
| zenme-yang-question | zenme-question | when_to_use: "Nền đã học ở HSK1 (bài zenme-question)"; catalogue OFF-H3-07 cũng ghi bài xây "trên nền phân biệt 怎么/怎么样 đã học ở cấp dưới". |
| complex-choice | hai-shi-choice | when_to_use mở đầu bằng phân biệt với "câu hỏi lựa chọn bằng 还是" — hai khung trần thuật của bài chỉ có nghĩa khi người học đã biết dạng câu hỏi 还是 để không nhầm lẫn chức năng. |
| degree-complement-1 | state-complement-de | Bài tự đặt ranh giới với state-complement-de ngay trong when_to_use: đuôi đóng （得很/极了/坏了） chỉ phân biệt được với cụm 得 mở đã học ở bài kia. |
| zhe-accompanying | zhe-continuation | formula_notes bước "Phân biệt" yêu cầu đối chiếu "着 chỉ trạng thái （门开着） đã học ở HSK2" — cùng một trợ từ, dạng kèm theo học sau dạng trạng thái. |
| verb-repetition-sentence | state-complement-de, separable-verbs | when_to_use ghi thẳng: "Điều kiện nền: đã học bổ ngữ trạng thái với 得 (bài state-complement-de) và động từ ly hợp (bài separable-verbs)" kèm id bài. |
| time-since-completion | quantity-complement-objects | when_to_use: "Đây là số lượng bổ ngữ dạng 3… Khác hẳn dạng 2 (bài quantity-complement-objects, HSK2)" — một câu hỏi phân biệt cốt lõi của bài là phân biệt hai dạng. |

Quan hệ đã xét nhưng **không** đưa vào requires (tránh lạm phát tiên quyết): complex-compact ← yi-jiu-tight （紧缩 HSK3 tự chứa hai mẫu của nó, when_to_use không nêu nền 一……就……; quan hệ họ hàng đã có ở related_ids chứ không phải phụ thuộc chặt); potential-complement-1 ← modal-hui-neng-keyi (chỉ là bài liên quan về 能, không phải nền cấu trúc); approx-numbers-2 ← measure-words và các quan hệ "cần biết lượng từ/tính từ nói chung" (nền từ vựng phổ quát, không phải phụ thuộc cấu trúc riêng).

## 7. Tự kiểm curriculum.json (script python, 2026-10-31)

- Tổng id trong 6 danh sách: **76**, không trùng; phân bố theo cấp **24 / 17 / 34 / 1 / 0 / 0**, khớp đúng tập bài `status: "published"` đọc trực tiếp từ `data/lessons/*.json` (không bài published nào bị thiếu, không id lạ, mọi bài nằm đúng cấp `hsk_level` của nó).
- requires: 14 bài / 16 cạnh — mọi id tiên quyết đều tồn tại và đứng **trước** bài phụ thuộc trong thứ tự toàn cục (nối các cấp 1→6).
- Kết quả: **ĐẠT — không lỗi.**
