# Tái thiết kế UX/UI 2026-10-31 — nghiên cứu, đối chiếu và quyết định pilot

Chỉ đạo của Hoa (2026-10-31): người học kiểm tra trên Android Chrome
thấy nội dung có tiến bộ nhưng trình bày còn sơ sài, giống trang tài
liệu dài. Tài liệu này ghi: (1) bằng chứng hiện trạng, (2) nghiên cứu
tham khảo đã truy cập thật, (3) bảng đối chiếu hiện tại → đề xuất,
(4) phạm vi pilot và tiêu chí nghiệm thu. Nguyên lý được học, KHÔNG
sao chép mã nguồn hay giao diện nguyên bản của bất kỳ nền tảng nào.

## 1. Bằng chứng hiện trạng (bản 20261031-cur1, chụp tại local 390px)

Ảnh chụp cùng viewport 390px, DSF 2, profile mới — lưu tại
`~/workspace/qa-evidence/ux-redesign/` (ngoài repo):
`before-home-390.png`, `before-lesson-shi-390.png`.

Đo được:
- Trang danh mục cao **67.640px** (76 bài, mỗi bài một thẻ lớn gồm
  badge, mẫu câu cỡ lớn, toàn văn mục tiêu, tiên quyết, trạng thái).
- Trang Bài 01 （是） cao **12.350px**. Trong một bài: mẫu câu xuất hiện
  **3 lần** (hero, mục B, mục Luyện nói); ví dụ đầu tiên xuất hiện
  **3 lần** (Ví dụ nhanh ở mục A, danh sách mục C, ô chọn câu mẫu của
  Luyện nói); mỗi ví dụ có **2 nút lớn** (▶ Nghe + ■ Dừng).
- Bài tập fill in sẵn dòng **"Mẫu cần dùng: …"** ngay dưới câu hỏi —
  với nhiều bài, dòng này gần như là đáp án, hiện TRƯỚC khi người học
  trả lời (rò rỉ gợi ý).
- Cả 4 bài tập của một bài dàn trải trên một trang; không có chỉ báo
  tiến độ lượt làm, không có tổng kết cuối lượt.
- Thông tin nguồn/rà soát/phiên bản nội dung nằm trong luồng học
  chính ở cuối bài; hướng dẫn kỹ thuật của Luyện nói chiếm một đoạn
  dài thường trực.

## 2. Nguồn tham khảo đã truy cập thật

| Nền tảng | URL đã truy cập | Bằng chứng chính dùng cho đợt này |
|---|---|---|
| Chinese Grammar Wiki | https://resources.allsetlearning.com/chinese/grammar/Main_Page và trang điểm ngữ pháp (benchmark 2026-10-31, `grammar-platform-benchmark.md`) | Phân cấp điểm ngữ pháp theo cấp, liên kết "Similar to / See also" giữa các điểm liên quan, trang trục từ khóa gom một họ cấu trúc. Đã áp dụng một phần ở REL-01 (Bài liên quan) và curriculum. |
| Yoyo Chinese | https://guides.yoyochinese.com/en/features-settings/lesson-pages-practice-quiz và https://www.yoyochinese.com/chinese-learning-tools/interactive-pinyin-chart (benchmark 2026-10-31) | Trang bài học có cấu trúc cố định; Practice/Quiz tách khỏi phần giảng; Pinyin Chart là lưới âm bấm-nghe theo thanh — nguyên lý "một điểm chạm = một hành động nghe rõ ràng". |
| Mandarin Bean | https://mandarinbean.com/grammar-points/ và https://mandarinbean.com/le/ (trình duyệt thật, 2026-10-31) | Grammar Hubs theo chủ đề + 3 mức; bài tập chấm cả loạt qua View Results, giải thích mọi câu kèm "Correct version" — nguyên lý: làm xong một lượt rồi xem tổng kết + giải thích, thay vì dàn trải không hồi kết. |
| Du Chinese | https://duchinese.net/ (đọc trực tiếp 2026-10-31) | Khối "Read without Frustrations — INSTANT WORD LOOKUP & GRAMMAR EXPLANATIONS": tra nghĩa ngay trong luồng đọc, không rời trang; thẻ truyện ghi cấp + số chương + nền từ vựng bằng số chữ Hán ("Newbie · 12 chapters", "based on a vocabulary of 150 characters") — độ dài/độ khó định lượng ngay trên thẻ; flashcard sinh từ chính bài đọc; Pinyin là lộ trình khởi đầu tách riêng. |
| HelloChinese | https://hellochinese.cc/ (đọc trực tiếp 2026-10-31) | Thẻ tính năng "Game-Based Learning — Bite-sized curriculum, stay motivated by leveling up": đơn vị học nhỏ + tín hiệu tiến bộ nhìn thấy được; 6 thẻ tính năng, mỗi thẻ đúng một ý + một câu mô tả ngắn; SRS được nêu như tính năng có tên riêng. Trang chủ không nêu streak — không ghi nhận chi tiết đó. |

## 3. Bảng đối chiếu: UX hiện tại → UX pilot (build 20261031-ui1)

| # | Hiện tại (bằng chứng mục 1) | Vấn đề người học | Tham khảo | Giải pháp của dự án (đã triển khai ở pilot) | Tiêu chí nghiệm thu |
|---|---|---|---|---|---|
| U1 | Danh mục là thẻ lớn lặp toàn văn mục tiêu; trang cao 67.640px ở 390px | Cuộn rất lâu mới tới bài cần học; khó quét danh sách | HelloChinese (đơn vị nhỏ, một thẻ một ý); Du Chinese (thẻ ghi định lượng) | Hàng gọn: Bài NN · tên · một dòng mô tả (mẫu + mục tiêu rút gọn bằng CSS) · trạng thái; nhóm theo cấp kèm thanh tiến độ từng cấp | Ảnh sau cùng viewport; chiều cao trang giảm rõ; harness `home-level-groups` PASS |
| U2 | "Tiếp tục học" quét theo thứ tự file (manifest) | Có thể gợi ý bài không đúng lộ trình sư phạm | Curriculum D28 của dự án | Tiếp tục học theo thứ tự curriculum.json + thanh tiến độ toàn bộ | Bài tiếp tục = bài đầu chưa xong trong curriculum (kiểm ở ảnh sau: HSK1 · Bài 01) |
| U3 | Chỉ lọc theo cấp + tìm kiếm | Không lọc được bài chưa học/đang học/đã xong | Nguyên tắc lọc theo trạng thái của các app học (HelloChinese: lộ trình theo tiến độ) | Thêm lọc trạng thái (Chưa học/Đang học/Đã xong), giữ tìm kiếm Hán tự/Pinyin/Việt | QA thao tác: lọc "Đang học" ra đúng bài đã làm dở |
| U4 | Mẫu câu lặp 3 lần, ví dụ 1 lặp 3 lần trong một bài | Loãng trọng tâm, trang dài vô ích | HelloChinese (một khối một ý) | Bỏ "Ví dụ nhanh"; mẫu câu chỉ ở hero (ô công thức) + mục Công thức; Luyện nói không in lại mẫu | Đếm trong DOM bài Bài 01: mỗi ví dụ zh xuất hiện 1 lần ở mục Ví dụ |
| U5 | Công thức là một dòng chữ, khó thấy thành phần | Người học không tách được cấu trúc câu | CGW (cấu trúc trình bày theo mẫu có phân đoạn) | Ô thành phần tách theo "+": mỗi thành phần một ô màu mềm riêng, nối bằng dấu + | Ảnh sau Bài 01; QA bài công thức dài không tràn 390px |
| U6 | Mỗi ví dụ 2 nút lớn Nghe/Dừng | Chiếm diện tích, nhìn nặng | Yoyo (một điểm chạm = một hành động) | Một nút tròn 44px duy nhất: bấm nghe, bấm lần nữa dừng; trạng thái bằng ký hiệu ▶/■ + class | Harness `speak-stop-state` PASS; ảnh sau |
| U7 | Dễ nhầm và Nguồn dàn trải trong luồng chính | Giải thích sâu chiếm màn hình ngay khi mở bài | CGW (chi tiết theo liên kết/mở rộng) | Dễ nhầm thành khối mở rộng từng câu; Nguồn/kiểm chứng vào khối mở rộng cuối trang; hướng dẫn kỹ thuật Luyện nói vào "Trợ giúp" mở rộng | Nội dung vẫn đủ trong DOM (QA nội dung dùng textContent); ảnh sau gọn hơn |
| U8 | Bài fill in sẵn "Mẫu cần dùng" ≈ đáp án | Mất tác dụng luyện tập; gợi ý đến trước câu trả lời | Mandarin Bean (giải thích chỉ sau khi làm) | Gỡ dòng in sẵn; gợi ý chỉ qua nút "Gợi ý" và vẫn ghi nhận đã xem | QA: DOM không chứa hint_vi trước khi bấm nút Gợi ý |
| U9 | Bài tập dàn trải, không tiến độ, không tổng kết | Không có cảm giác hoàn thành một lượt; không biết câu nào cần ôn | Mandarin Bean (View Results + giải thích); HelloChinese (tiến bộ nhìn thấy được) | Trình từng câu: Câu x/N, thanh tiến độ theo attempts thật, nút Trước/Tiếp, tổng kết cuối lượt (đúng gần nhất x/N + danh sách câu cần ôn lại, bấm để nhảy tới) | QA thao tác làm hết 4 câu của Bài 01: tổng kết khớp localStorage |
| U10 | Luyện nói: hướng dẫn dài thường trực, không trạng thái bước | Khó biết đang ở bước nào của luồng | Luồng 4 bước trong đặc tả P04-02 của dự án | Chỉ báo 4 bước (Nghe mẫu → Thu âm → Nghe lại → Tự đánh giá) đổi trạng thái theo thao tác; thêm tự đánh giá 3 mức (chỉ ghi trong trang, không đổi schema); trợ giúp kỹ thuật thu gọn | QA thao tác: bước đổi khi thu/nghe lại/đánh giá |
| U11 | Thông tin kỹ thuật (xuất/nhập tiến trình, FSRS) ở trang chủ dạng thẻ lớn | Loãng phần học chính | Nguyên tắc phân tầng thông tin | Chuyển vào khối mở rộng "Dữ liệu tiến trình" cuối trang chủ; footer giữ một dòng về TTS/tính cục bộ | Ảnh sau trang chủ |

Ngoài phạm vi pilot (ghi nhận, không làm đợt này): tra nghĩa tại chỗ
theo từng từ trong câu ví dụ kiểu Du Chinese (cần dữ liệu từ điển mức
từ trong JSON bài học — thuộc lộ trình dữ liệu, không phải renderer);
trang hub theo họ cấu trúc (G-07 đã có trong feature-gap-matrix).

## 4. Hệ thống thiết kế (tokens)

Mở rộng trong `styles.css` (khối "UX pilot 2026-10-31"), giữ hệ màu
teal hiện có để nhất quán với các trang chưa đổi (Ôn lại):
`--font-zh` (Noto Sans SC → PingFang SC → Hiragino Sans GB →
Microsoft YaHei), `--fs-small`, `--fs-zh`, `--ink-soft`, `--fill-soft`,
`--shadow` nhẹ, 4 màu ô công thức `--fchip-1..4`, cùng thang khoảng
cách/tap target sẵn có (`--space-*`, `--tap: 44px`). Quy ước: trạng
thái luôn kèm ký hiệu chữ (✓/◐/○, Đúng/Chưa đúng), không chỉ màu;
vùng chạm tối thiểu 44px (nút nghe tròn đúng 44px); không hiệu ứng
chuyển động ngoài `scrollIntoView` mặc định; hỗ trợ
`prefers-reduced-motion` như cũ.

## 5. Phạm vi pilot và cổng chất lượng

Pilot: trang danh mục (nhấn mạnh HSK1) + HSK1 · Bài 01 (shi-noun-link)
+ bộ bài tập của Bài 01; renderer dùng chung nên QA mở rộng thêm 1
bài trung bình + 1 bài khó trước merge. Không đổi data/schema/ID/khóa
tiến độ/FSRS. Cổng: validator + unit test + harness local, QA độc lập
(nội dung + UX thao tác), ảnh trước/sau cùng viewport, CI hai job
xanh trên HEAD mới nhất, nghiệm thu live đúng build mới, cập nhật
checkpoint. Chi tiết triển khai: quyết định D29 trong
`docs/decisions.md`.
