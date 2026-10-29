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

## D13 — Workflow Pages bị 403 qua API; Pages từ nhánh là phương án thay thế (29/10/2026)
Lý do: GitHub chặn GitHub App ghi file `.github/workflows/` qua Contents API
ngay cả khi các file khác ghi được. App tĩnh này không bắt buộc phải deploy
bằng Actions.
Ảnh hưởng: giữ file workflow trong local để người dùng tự thêm qua web nếu
muốn; phương án mặc định là bật Pages từ nhánh `main` (/(root)) trong Settings.
Chưa tuyên bố URL live cho tới khi kiểm tra được.

## D14 — FSRS thật bằng ts-fsrs 5.4.2 vendored, tắt fuzz, một thẻ/bài (29/10/2026)
Lý do: đặc tả §9 yêu cầu thư viện FSRS được duy trì, khóa phiên bản, không dùng
công thức tự chế. ts-fsrs 5.4.2 (MIT, không phụ thuộc) có bản ESM dùng được
trực tiếp trên GitHub Pages tĩnh mà không cần build.
Ảnh hưởng: `vendor/ts-fsrs-5.4.2.mjs` sao chép nguyên văn từ npm, logic thuần
ở `srs.mjs`, app chuyển sang ES module. `enable_fuzz: false` để lịch ôn xác
định và kiểm thử lặp lại được; các tham số khác giữ mặc định của thư viện.
Một thẻ cho mỗi bài đã hoàn thành (chưa tách thẻ theo kỹ năng) để tránh quá
tải ở giai đoạn mẫu; bài chưa hoàn thành không vào hàng đợi, học mới không bị
khóa. Mốc thời gian lưu UTC (ISO), hiển thị theo múi giờ thiết bị.

## D15 — Chốt phiên bản baseline mục tiêu: đề cương thi HSK 3.0 công bố 11/2025, trạng thái làm việc (29/10/2026)
Lý do: dự án hướng tới HSK1–6 như người học gặp hiện nay. Phân biệt rõ:
- Chuẩn năng lực 2021 (GF 0025-2021, hiệu lực 01/07/2021, 9 cấp): cấp 1 có
  500 từ và 48 điểm ngữ pháp gộp lớn — KHÔNG phải đề cương thi.
- Đề cương thi HSK 3.0 (新版HSK考试大纲, công bố 11/2025, thi toàn cầu đầu
  tiên 13/12/2026 theo nguồn thứ cấp): cấp 1 có 300 từ và 70 điểm ngữ pháp
  theo 7 nhóm; số tích lũy cấp 1–6 theo nguồn thứ cấp là 70/148/244/339/
  409/459 — vẫn là số liệu nguồn thứ cấp, chưa đối chiếu văn bản gốc.
- HSK cũ 2.0 (6 cấp, cấp 1 chỉ 150 từ) không dùng làm baseline.
Ảnh hưởng: phiên bản mục tiêu đã chốt là đề cương thi 11/2025, nhưng trạng
thái baseline vẫn là "provisional_working" (làm việc, chưa khóa) vì chưa có
văn bản gốc trong tay để đối chiếu từng mục, chưa có danh sách đầy đủ cấp
2–6 theo số thứ tự gốc, và chưa xác minh điều kiện sử dụng lại danh sách
gốc. Danh mục làm việc trong docs/curriculum-baseline.json chỉ chứa các mục
đã có bài hoặc đang lên kế hoạch mẫu, KHÔNG tự nhận là baseline hoàn chỉnh.
Để khóa cần: văn bản gốc (sách/PDF chính thức từ CTI/CLEC) hoặc xác nhận
của trung tâm thi, đối chiếu từng mục theo số thứ tự gốc, và ghi giấy phép
sử dụng (repo chỉ diễn đạt lại, không sao chép danh sách gốc).

## D16 — Baseline phạm vi khóa theo tài liệu gốc, tách quyền phân phối (29/10/2026)
Lý do: link Examination Syllabus trên chinesetest.cn dẫn tới PDF chính
thức của 中外语言交流合作中心, text fetch đọc được toàn văn, bìa ghi
2025-11 发布 / 2026-07 实施, 语法大纲 ở mục lục tr.382–400.
Ảnh hưởng: baseline 1.0-official-scope khóa ở mức nhóm phạm vi (50 nhóm),
không khóa ở mức điểm vi mô có đánh số vì tài liệu gốc trình bày theo
nhóm, không đánh số từng điểm. Sửa ánh xạ: 了 → HSK1, 在/正在 → HSK1.
Quyền phân phối tách riêng và chưa xác minh: repo không chứa PDF gốc,
không chứa bảng gốc nguyên văn, không sao chép câu ví dụ của đề cương;
chỉ diễn đạt lại bằng tiếng Việt kèm tham chiếu. Câu trùng giữa các bài
là hợp lệ về mặt sư phạm, không sửa chỉ để làm đẹp số liệu.

## D17 — Đẩy data/lessons.json dạng thu gọn vì giới hạn tham số CLI (29/10/2026)
Lý do: file lessons.json dạng thụt lề ở 18 bài là 108 KB, nhưng khi truyền
qua tham số --arguments-json của CLI GitHub thì chuỗi JSON vượt giới hạn
128 KB cho một tham số đơn của Linux (đo được 150.885 byte) và lệnh đẩy
báo "Argument list too long". Dạng thu gọn (separators , :) chỉ còn
75.669 byte, tham số JSON 115.597 byte, đẩy được.
Ảnh hưởng: khi đẩy lessons.json, luôn đẩy dạng thu gọn; bản chỉnh sửa
trong workspace vẫn giữ dạng thụt lề để đọc và sửa. Nội dung hai bản
tương đương về mặt dữ liệu; SHA của blob remote mới là căn cứ xác minh.

## D18 — Sửa trạng thái baseline: khóa phạm vi nhóm, chưa xác minh đầy đủ danh mục (29/10/2026)
Lý do: tài liệu gốc không đánh số từng điểm ngữ pháp; số 50 là cách chia
nhóm của dự án, không phải số mục chính thức. Bản đọc là crawl 25/09/2026,
chưa ghi hash, trích xuất bảng bị xáo trộn, điểm vi mô và từ vựng/chữ Hán
chưa đối chiếu, quyền phân phối chưa xác minh.
Ảnh hưởng: trạng thái baseline sửa thành
scope_groups_locked_official_catalogue_not_fully_verified; bằng chứng đầy
đủ trong docs/baseline-evidence.md; task P01-02 quay lại in_progress cho
phần xác minh danh mục đầy đủ. Không gọi baseline là đã khóa toàn bộ.

## D19 — Tách dữ liệu thành shard theo cấp, đẩy qua nhánh + PR + merge (29/10/2026)
Lý do: file tổng hợp vượt giới hạn 128 KB/tham số CLI khi đẩy; minify
chỉ là cách nhét tạm, tạo ra hai bản khác nhau (workspace thụt lề, repo
thu gọn) và không giải quyết được khi file tiếp tục lớn.
Ảnh hưởng: shard theo cấp trong data/lessons/ + manifest là nguồn duy
nhất; app và validator đọc qua manifest; ID bài không đổi nên tiến trình
không ảnh hưởng. Đẩy theo quy trình: tạo nhánh, đẩy từng file lên nhánh,
mở PR, merge PR để main nhận một merge commit chứa toàn bộ thay đổi
liên quan (các commit trên nhánh vẫn là từng file, nhưng main chỉ nhận
một merge commit). Nếu merge không thực hiện được, phương án dự phòng là
đẩy trực tiếp lên main theo thứ tự: shard + manifest trước, app.js sau,
xóa file cũ cuối cùng, và báo cáo rõ là không đạt được một commit hợp
nhất. Git commit–push trực tiếp không khả thi ở đây vì workspace không
phải là git repo và không có thông tin đăng nhập git để đẩy.

## D20 — Chẩn đoán cache bằng tầng bằng chứng và versioning có giới hạn (29/10/2026)
Lý do: giao diện 3 lần vẫn 18 bài trong khi manifest/shard/app.js mới
đều lấy về được trên Pages. App không có service worker, webmanifest hay
Cache Storage (kiểm tra mã nguồn) nên cache còn lại là HTTP cache của
trình duyệt/CDN Pages đối với URL đã thay đổi; URL mới chưa bị cache nên
mới ngay. Không kết luận cache chỉ từ một file mới truy cập được, và
không chuyển việc xác minh sang người dùng khi chưa kiểm tra hết bằng
công cụ sẵn có — vì vậy thêm chế độ ?debug=1 hiển thị phiên bản build,
nguồn dữ liệu, số bài từng nguồn, tổng số bài và lỗi tải.
Ảnh hưởng: versioning bằng BUILD_VERSION cho dữ liệu và ?v= cho app.js
chỉ có hiệu lực khi app.js mới đã chạy; không xóa localStorage để chữa
lỗi hiển thị; không coi query ở URL trang là bằng chứng mọi tài nguyên
mới. Trạng thái deployment của Pages không xem được qua công cụ GitHub
hiện có (không workflow, triển khai từ nhánh) nên xác minh bằng file
thực tế phục vụ trên Pages và commit nguồn của main.

## D21 — TTS trình duyệt là phương án tạm thời, chưa đáp ứng audio tạo trước (29/10/2026)
Lý do: đặc tả yêu cầu tạo/kiểm tra audio; app hiện chỉ dùng
speechSynthesis zh-CN theo yêu cầu, không có file audio thu sẵn, chưa
kiểm tra nghe thực tế, chưa kiểm tra giọng zh-CN có mặt, thao tác
phát/dừng và trường hợp thiếu giọng trên thiết bị thật.
Ảnh hưởng: TTS được ghi là tạm thời trong task board (AUD-TTS-01); không
đánh dấu bài đạt toàn bộ tiêu chí khi audio bắt buộc chưa được nghiệm
thu; bảng ?debug=1 hiển thị danh sách giọng zh tìm thấy để kiểm tra
giọng; chỉ ghi "đã nghe và xác minh âm thanh" khi thực sự nghe được.

## D22 — Thông báo thiếu giọng zh thay vì dùng lặng giọng mặc định (29/10/2026)
Lý do: cả hai môi trường kiểm tra qa-04 đều không có giọng zh; dùng
lặng giọng mặc định mà không báo sẽ khiến người học tưởng đó là phát
âm mẫu chuẩn.
Ảnh hưởng: speak() cảnh báo một lần mỗi lần tải trang khi danh sách
giọng đã tải xong và không có giọng zh; vẫn thử đọc theo lang zh-CN
sau cảnh báo (người học tự quyết định có nghe tiếp hay không).
Trường hợp danh sách giọng chưa tải xong thì chưa xác định được giọng
zh — không cảnh báo vội, bảng ?debug=1 ghi rõ danh sách giọng tìm thấy.
TTS vẫn là phương án tạm thời (D21, AUD-TTS-01); cảnh báo không thay
thế audio tạo trước theo đặc tả và không chặn việc biên soạn độc lập.

## D23 — P01-02 đối chiếu theo mục nhóm diễn giải, HSK1–2 trước (29/10/2026)
Lý do: đề cương chính thức trình bày ngữ pháp theo bảng nhóm, không
đánh số từng điểm vi mô; sao chép nguyên văn bảng vào repo công khai
thì vướng quyền phân phối chưa xác minh.
Ảnh hưởng: đối chiếu HSK1–2 bằng danh mục mục nhóm do dự án tự chia
(HSK1 52 mục, HSK2 62 mục), diễn giải bằng tiếng Việt, giữ riêng với
nhóm phạm vi của dự án; số mục nhóm không phải số chính thức và không
dùng tính phần trăm bao phủ vi mô. P01-02 vẫn in_progress cho tới khi
HSK3–6 đối chiếu xong. Bài mới chỉ chọn từ mục thiếu đã xác minh.
