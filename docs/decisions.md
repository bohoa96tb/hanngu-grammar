# Sổ quyết định

## D01 — Dự án mới độc lập, không tích hợp vào hazi-viet (29/10/2026)
Lý do: người dùng yêu cầu dự án độc lập; đặc tả §3.1 cấm mặc định đây là repo Hazi-Viet.
Ảnh hưởng: repo mới `hanngu-grammar` (ưu tiên), không sửa repo khác.

## D02 — Web tĩnh, không backend, không build framework (29/10/2026)
Lý do: đặc tả §10.1 chọn stack nhỏ nhất; luồng học cốt lõi chạy được bằng dữ liệu
tĩnh + lưu tiến trình trên thiết bị; phù hợp GitHub Pages miễn phí, không phát sinh phí.
Phương án đã loại: Next.js + FastAPI + Redis (quá nặng, chưa có nhu cầu đo được).
Ảnh hưởng: `index.html` + `app.js` thuần, dữ liệu `data/lessons.json`, tiến trình localStorage.
Hạn chế: không có tài khoản/đồng bộ; các tính năng đó ở backlog, không làm nút giả.

## D03 — Điều hướng bằng hash + đường dẫn tương đối (29/10/2026)
Lý do: GitHub Pages là hosting tĩnh, có thể phục vụ ở đường dẫn con
`/<repo>/`; đường dẫn tuyệt đối `/...` sẽ hỏng. Hash routing tránh cần cấu hình server.
Ảnh hưởng: mọi link nội bộ dùng `#/...`, tài nguyên dùng đường dẫn tương đối.

## D04 — Baseline toàn diện CHƯA khóa; chỉ khóa baseline v0.1 cho 3 bài mẫu (29/10/2026)
Lý do: đặc tả §4.4 cấm đồng nhất danh sách HSK bất kỳ trên GitHub với đề cương chính thức.
Kiểm chứng ngày 29/10/2026 cho thấy HSK 3.0 có 9 cấp, đề cương thi công bố 15/11/2025,
số điểm ngữ pháp tích lũy cấp 1–6 theo nguồn thứ cấp là 70/148/244/339/409/459 —
chưa đối chiếu được văn bản đề cương gốc, nên không dùng làm baseline khóa.
Ảnh hưởng: `docs/curriculum-baseline.json` ghi `status: "provisional_sample_only"`;
cấp HSK của 3 bài mẫu là tạm thời, dựa trên Chinese Grammar Wiki (mức CEFR A1/A2)
và cách dùng phổ biến, ghi rõ trong từng bài và trong `docs/reviews/batch-01.md`.
Task P01-full (khóa baseline HSK1–6 từ đề cương gốc) vẫn `blocked` cho tới khi có
văn bản đề cương gốc để đối chiếu.

## D05 — Audio: TTS trình duyệt trước, audio thu sẵn sau (29/10/2026)
Lý do: chưa xác minh điều kiện phân phối/SLA của Edge-TTS hay bất kỳ dịch vụ TTS
nào cho bản phát hành; TTS trình duyệt không tốn phí, không gửi dữ liệu ra ngoài
ngoài trình duyệt của người học, đủ cho bản thử nghiệm.
Ảnh hưởng: nút nghe dùng `speechSynthesis` giọng `zh-CN`, ghi rõ “giọng tổng hợp,
không phải người bản ngữ”; tốc độ chỉnh được; audio thu sẵn là task riêng, cần
kiểm tra đa âm/ngắt câu trước khi gắn nhãn đã duyệt.

## D06 — Ôn tập hiện tại KHÔNG gọi là FSRS (29/10/2026)
Lý do: đặc tả §9 và §13 cấm công thức tự chế mang tên FSRS.
Ảnh hưởng: app hiện chỉ có “Ôn lại” đơn giản (bài đã học, làm sai gần đây);
tích hợp thư viện `ts-fsrs` đã khóa phiên bản, kiểm thử tích hợp, là task P05,
chưa làm trong phiên này.

## D07 — Pinyin: lưu trong dữ liệu để kiểm duyệt, mặc định ẩn trong ví dụ/bài tập (29/10/2026)
Lý do: đặc tả §5.3. Người học có thể bật/tắt hiển thị Pinyin ở màn hình bài học,
nhưng ở màn hình kiểm tra, Pinyin của đáp án không được lộ.
Ảnh hưởng: trường `pinyin` trong dữ liệu câu; UI tách cấu hình theo màn hình.

## D08 — Không dùng Jieba/Pypinyin tự động làm đáp án (29/10/2026)
Lý do: đặc tả §6.2, §13. Token xếp câu do biên tập quyết định, ghi tay trong dữ liệu.
Ảnh hưởng: validator kiểm tra token khớp đúng câu (nối token = câu, bỏ dấu câu),
không sinh token tự động.

## D10 — Luyện nói bản cốt lõi: thu/phát lại trong trang, không chấm điểm (29/10/2026)
Lý do: đặc tả §AUD chỉ yêu cầu bản cốt lõi (nghe mẫu, thu âm, phát lại, đọc đuổi,
tự nói theo tình huống) và cấm suy đoán thanh điệu từ transcript; chấm phát âm
chuyên sâu là nâng cấp riêng (EX-UPGRADE-01), chưa có đánh giá thực tế.
Ảnh hưởng: dùng `getUserMedia` + `MediaRecorder` của trình duyệt; bản thu chỉ giữ
trong bộ nhớ trang, không lưu localStorage, không gửi lên máy chủ; từ chối mic
không chặn phần còn lại của bài. Không hiển thị điểm phát âm.

## D09 — Tên repo dự phòng (29/10/2026)
Nếu `hanngu-grammar` đã tồn tại và không phải dự án này: giữ nguyên repo đó,
dùng `hanngu-grammar-app` và báo rõ. Chưa kiểm chứng được vì GitHub chưa kết nối
(xem `docs/checkpoint.json` → blocked_items).

## D11 — Tiếp tục với repo hanngu-grammar đã tồn tại, chỉ có README placeholder (29/10/2026)
Lý do: repo `bohoa96tb/hanngu-grammar` đã tồn tại (tạo trên web, initial commit
86f65bbe, chỉ có README "# hanngu-grammar"), đúng tên ưu tiên và đúng chủ sở hữu;
không phải dự án khác có nội dung riêng. Các đường dẫn của dự án đã xác minh chưa
tồn tại remote.
Ảnh hưởng: tiếp tục từ checkpoint, push snapshot lên `main`; chỉ thay README
placeholder bằng README của dự án, không xóa/sửa nội dung nào khác (vì không có
nội dung nào khác).

## D12 — Đẩy bằng create_or_update_file từng file vì push_files bị 403 (29/10/2026)
Lý do: `push_files` (tạo git tree) luôn trả 403 "Resource not accessible by
integration", trong khi `create_or_update_file` (Contents API) ghi thành công
từng file, bắt đầu từ README. Không dùng gh/PAT/token khác.
Ảnh hưởng: lịch sử commit có nhiều commit nhỏ theo file thay vì một snapshot;
nội dung cuối cùng giống nhau. Ghi rõ trong checkpoint để phiên sau không
tưởng push_files đã thành công.
