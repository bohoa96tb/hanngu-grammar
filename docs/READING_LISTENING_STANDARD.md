# Quy chuẩn Bài đọc & Bài nghe (READING_LISTENING_STANDARD)

Quyết định của Hoa, phê duyệt ngày 2026-10-31. Đây là quy tắc BỀN
VỮNG của dự án: các phiên sau tự áp dụng, không hỏi lại. Tài liệu
này đứng cùng tầng với đặc tả gốc và `docs/decisions.md` (quyết
định D31). Nó MỞ RỘNG thiết kế APP-01 trong
`docs/applied-reading-listening.md` (D30) — không thay thế cơ chế
đó: dữ liệu vẫn là `data/applied/<lesson-id>.json`, tiến độ vẫn là
`progress.applied`, giao diện vẫn là mục "Đọc & nghe vận dụng".

Tiến độ của luồng này nằm ở `docs/READING_LISTENING_CHECKPOINT.md`.
Khi Hoa nói "tiếp tục phần đọc/nghe" → đọc checkpoint đó và làm
tiếp. Khi chỉ nói "tiếp tục" → theo checkpoint chung của dự án,
KHÔNG tự chuyển sang luồng đọc/nghe.

## 1. Chính sách nguồn (đã phê duyệt)

### A. Bài đọc + nghe nguyên bài: ưu tiên Storybooks
- Nguồn: https://www.storybookscanada.ca/ ,
  https://www.storybookscanada.ca/downloads/ ,
  https://github.com/global-asp/global-asp ,
  https://github.com/global-asp/gsn-audio
- Tìm truyện Mandarin có văn bản VÀ audio tương ứng; chỉ chọn
  truyện phù hợp trình độ, nội dung và cấu trúc ngữ pháp đang học.
- KHÔNG mặc định cấp độ đọc của Storybooks tương đương cấp HSK —
  phải tự đánh giá độ khó (từ vựng, độ dài, cấu trúc) so với cấp
  HSK của bài.
- Kiểm tra giấy phép TỪNG tài nguyên (văn bản, bản dịch, ảnh,
  audio) — không mặc định toàn bộ kho cùng một giấy phép, không
  mặc định mọi truyện đều có audio.
- Giữ thông tin tác giả, người dịch, người đọc, nguồn và giấy
  phép theo đúng yêu cầu của giấy phép đó.
- Ưu tiên CC BY khi có nhiều lựa chọn tương đương. CC BY-NC chỉ
  dùng khi cách sử dụng của dự án đáp ứng điều kiện phi thương
  mại; chưa xác định được thì chỉ dẫn link nguồn và đánh dấu cần
  kiểm tra.
- Chỉ ghi "giọng người thật" khi có căn cứ từ nguồn.

### B. Nghe từng câu theo ngữ pháp: thử hsk-sentences-audio
- Nguồn: https://github.com/no7z/hsk-sentences-audio
- Kiểm tra README, LICENSE, ATTRIBUTION và dữ liệu thực tế trước
  khi dùng. Phân biệt giấy phép MÃ NGUỒN với giấy phép DATASET và
  AUDIO — mã nguồn mở không có nghĩa dữ liệu/audio dùng được.
- Nhãn ngữ pháp của nguồn chỉ để tìm ỨNG VIÊN; phải tự đọc câu và
  xác nhận cấu trúc đúng trước khi chọn.
- Kiểm tra: độ tự nhiên, nghĩa, Pinyin, cách đọc từ đa âm, độ khớp
  audio–văn bản.
- Bổ sung bản dịch tiếng Việt ngắn, tự nhiên, đúng tình huống (do
  dự án biên soạn và kiểm duyệt).
- Hiển thị rõ nhãn "Giọng tổng hợp"; không gọi là bản ghi người
  bản xứ.
- Giữ ghi công và thực hiện nghĩa vụ giấy phép đối với dữ liệu
  gốc, dữ liệu sửa đổi và bản dịch.
- Không coi nhiều câu rời ghép lại là một bài đọc hay hội thoại
  hoàn chỉnh.
- Kết quả kiểm toán nguồn này ghi ở
  `docs/research/hsk-sentences-audio-audit.md`; kết luận ở đó
  (dùng được / có điều kiện / không dùng) là căn cứ bắt buộc.

### C. Mandarin Bean và nguồn không có quyền tái sử dụng rõ ràng
- Mặc định: thẻ giới thiệu do dự án tự viết + nút "Mở bài gốc"
  (đúng cơ chế `link_only` hiện có của APP-01).
- Không sao chép toàn văn, bản dịch, bài tập hoặc tải audio vào dự
  án nếu chưa có quyền tương ứng.
- Tài khoản Premium, link MP3 công khai hay khả năng tải được về
  mặt kỹ thuật KHÔNG phải quyền tái xuất bản.
- Chỉ nhúng bằng cơ chế nhà cung cấp cho phép; chưa rõ thì dẫn
  link. Không vượt paywall, không dùng thông tin đăng nhập trong
  mã nguồn.

### D. Khi chưa có bài phù hợp
- Ghi rõ "Chưa có bài phù hợp" kèm lý do trong
  READING_LISTENING_CHECKPOINT — không lấy bài quá khó hoặc không
  chứa cấu trúc mục tiêu để lấp chỗ trống.
- Có thể biên soạn bài mới + dùng TTS khi đã tìm nguồn phù hợp
  nhưng không đáp ứng được; bài như vậy phải qua kiểm duyệt nội
  dung và audio, ghi rõ "Bài do dự án biên soạn" và "Giọng tổng
  hợp".
- Không viết lại sát một bài có bản quyền rồi gắn nhãn tự biên
  soạn. Không tự mua dịch vụ hoặc phát sinh phí ngoài phạm vi đã
  được phép.

## 2. Tiêu chuẩn chọn học liệu

Mục tiêu cho mỗi bài ngữ pháp: (1) một bài đọc có nội dung liền
mạch; (2) một bài nghe — có thể dùng chính audio của bài đọc nếu
phù hợp; (3) một phần luyện nghe câu ngắn củng cố cấu trúc. Ba
phần KHÔNG bắt buộc đến từ ba nguồn khác nhau.

Với mỗi học liệu:
- Chỉ rõ cấu trúc mục tiêu xuất hiện ở câu/đoạn nào, dùng với
  nghĩa gì. Dò thấy chữ giống nhau KHÔNG đủ kết luận có cấu trúc.
- Độ dài và lượng từ mới phù hợp cấp; HSK thấp ưu tiên nội dung
  ngắn.
- Giải thích và dịch bằng tiếng Việt dễ hiểu cho người trưởng
  thành.
- Chữ giản thể; nếu nguồn dùng phồn thể thì chuyển đổi và kiểm
  tra lại sau chuyển đổi.
- Câu hỏi đọc/nghe do dự án tự biên soạn, có đáp án + giải thích,
  không yêu cầu kiến thức ngoài nội dung bài.
- Không tự sửa lời thoại nhưng giữ nguyên audio cũ (không ghép
  văn bản đã sửa với audio gốc).
- Một nguồn/học liệu có thể phục vụ nhiều bài khi hợp lý; ghi rõ
  mỗi bài tập trung cấu trúc nào.

## 3. Giao diện cuối bài — mục "Đọc & nghe vận dụng"

Theo phong cách giao diện hiện có (D29), ưu tiên điện thoại. Mọi
học liệu hiển thị rõ: tên bài, nguồn, thời lượng THỰC TẾ (chỉ khi
xác minh/đo được), cấu trúc sẽ luyện và lý do bài này phù hợp,
loại audio (người thật / tổng hợp / chưa xác minh).

Với học liệu dùng TRONG app (có quyền):
- Nút bật/tắt Pinyin và bản dịch tiếng Việt.
- Chế độ đọc: xem nội dung, tùy chọn làm nổi cấu trúc mục tiêu.
- Chế độ nghe: ban đầu ẨN lời; người học chủ động mở.
- Điều khiển phát/dừng, nghe lại, tốc độ (nếu trình phát hỗ trợ).
- Nghe từng câu chỉ khi có file câu riêng hoặc mốc thời gian ĐÃ
  kiểm chứng — không bịa timestamp.
- Bài tập ngắn và phản hồi sau khi trả lời.
- Nguồn và ghi công dễ tìm, hiển thị ngay trong thẻ học liệu.

Với học liệu chỉ dẫn link: nút "Mở bài gốc", KHÔNG tạo trình phát
giả. Với phần còn thiếu trong một bản ghi học liệu đã khai: hiển
thị thông báo rõ ràng, không nút hỏng, không trạng thái hoàn
thành giả. Bài chưa có bản ghi học liệu nào thì mục bị ẩn (cơ chế
APP-01) và sự thiếu đó được theo dõi trong checkpoint của luồng
này — không coi là đã có.

Âm thanh: KHÔNG tự phát; không để hai audio phát cùng lúc (phát
audio học liệu thì dừng TTS và ngược lại; chuyển bài/tab thì
dừng). Không yêu cầu người học đọc thông tin kỹ thuật để dùng
bài học.

## 4. Metadata học liệu (bắt buộc, mở rộng schema APP-01)

Mỗi bản ghi học liệu (trong `data/applied/<lesson-id>.json`, xem
`docs/applied-reading-listening.md` về schema và phần mở rộng
in-app) tối thiểu gồm:
- ID học liệu và các bài ngữ pháp liên quan.
- URL nguồn, tác giả/người đóng góp, thông tin ghi công đầy đủ.
- Giấy phép của VĂN BẢN và của AUDIO (tách riêng), đường dẫn
  bằng chứng (file nghiên cứu trong `docs/research/`).
- Kiểu sử dụng: lưu trong dự án / nhúng được phép / dẫn link.
- Loại giọng và nguồn xác minh loại giọng.
- Bản dịch tiếng Việt + người/quy trình kiểm duyệt bản dịch.
- Các câu chứa cấu trúc mục tiêu (chỉ rõ câu nào, nghĩa nào).
- Trạng thái kiểm tra: nội dung, audio, giấy phép (tách riêng).
- Ngày kiểm tra và phiên bản nguồn nếu có.

Không đánh dấu "đã xác minh" khi mới suy đoán. Nguồn dùng cho
luồng này cũng phải đăng ký vào `docs/source-register.json` như
mọi nguồn khác của dự án.

## 5. QA và phát hành của luồng đọc/nghe

Ngoài cổng chất lượng chung của dự án (validator, unit test,
harness, CI hai job xanh trên commit mới nhất mới merge, nghiệm
thu live), mỗi học liệu phát hành phải kiểm:
- Nội dung khớp cấu trúc ngữ pháp mục tiêu (theo nghĩa, không chỉ
  theo mặt chữ).
- Audio khớp văn bản; phát thử đầu, giữa và cuối bài.
- Dịch Việt và Pinyin chính xác.
- Ghi công và giấy phép đầy đủ, đúng điều kiện.
- Nút hiện/ẩn (Pinyin, dịch, lời khi nghe), phát/dừng, tốc độ và
  câu hỏi hoạt động thật trên trình duyệt.
- Giao diện điện thoại không tràn.
- Tiến độ học cũ không mất; không phá bài ngữ pháp/bài tập hiện
  có.
- Trạng thái trung thực: bài ở mức rà soát nội bộ thì ghi đúng
  mức đó (không nâng thành "đạt mọi tiêu chí" khi audio thiết bị
  thật hoặc một kiểm chứng bắt buộc còn thiếu — cùng nguyên tắc
  với AUD-TTS-01).

Mở rộng sang bài mới chỉ khi Hoa duyệt kết quả thực tế của pilot
trước đó (cùng nguyên tắc chờ duyệt như APP-01).
