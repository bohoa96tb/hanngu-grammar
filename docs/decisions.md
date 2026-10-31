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

## D25 — Mô hình AI Manager và chuẩn hóa toàn bộ nội dung/giao diện (30/10/2026)
Lý do: người dùng mở rộng nhiệm vụ (chuẩn hóa toàn bộ) và yêu cầu vận hành
theo mô hình Manager: Manager đọc checkpoint + HEAD/PR thật trước khi giao
việc; ba vai trò Nội dung / Code / QA với quyền sở hữu file không chồng nhau;
vòng tự sửa QA tối đa 3 vòng cho cùng một lỗi; chỉ Manager tích hợp, commit,
tạo PR và merge; merge chỉ khi QA đạt; sau merge phải nghiệm thu live đúng
commit mới tính lô hoàn thành.
Ảnh hưởng: chuẩn áp dụng ghi ở docs/reviews/standardization-2026-10-30.md
(schema: thêm `quick_memory` bắt buộc cho bài published, `formula_notes`
chia bước đánh số, thêm `is_open_ended: false` cho mọi bài tập; độ khó gán
lại: ba-sentence-1/bei-passive-1/le-completion-change → hard, why-question
→ easy, prefix-suffix/pronouns → medium). Bài le-completion-change tạm gán
hard và chia hai cách dùng rõ trong bài; việc TÁCH thành hai bài riêng ghi
vào kế hoạch lô sau vì đổi cấu trúc bài giữa lô chuẩn hóa giao diện có rủi
ro tiến độ/ID, không phải vì giữ gộp vĩnh viễn. Không có cơ chế chạy nền
ngoài phiên: mọi việc chỉ chạy trong phiên làm việc, không tuyên bố tự
khởi chạy khi không có phiên.

## D24 — Xác định giọng zh phải chờ voiceschanged, không đọc danh sách rỗng (29/10/2026)
Lý do: nghiệm thu qa-06 cho thấy bảng chẩn đoán báo "không tìm thấy
giọng zh" nhưng bấm Nghe mẫu lại không hiện cảnh báo, vì getVoices()
lúc bấm nút thường trả về rỗng do danh sách giọng tải bất đồng bộ;
code cũ coi rỗng là "chưa xác định" nên bỏ qua cảnh báo, còn bảng
chẩn đoán cũ lại coi rỗng là "không có giọng".
Ảnh hưởng: voicesReady chỉ bật khi voiceschanged đã kích hoạt hoặc
danh sách đã có phần tử; speak() chờ tối đa ~1 giây rồi mới kết luận
và cảnh báo; bài học có dòng cảnh báo bền vững khi đã xác định không
có giọng zh; bảng chẩn đoán phân biệt "đang tải danh sách giọng…" với
"không tìm thấy giọng zh". Nếu hết thời gian chờ mà vẫn không có sự
kiện voiceschanged thì vẫn cảnh báo thay vì đọc lặng bằng giọng mặc
định. TTS vẫn là phương án tạm thời; cảnh báo không thay thế audio
tạo trước theo đặc tả.

## D26 — Lô std2: trạng thái đối chiếu từng bài + tách bài chọn lọc (2026-10-30)

Căn cứ: docs/reviews/std2-content-audit.md (Agent Nội dung) + chỉ đạo của
Hoa cho lô std2. Manager quyết:

1. Thêm trường `hsk_evidence` (xem schema.md) cho mọi bài published và
   hiển thị dòng đối chiếu ở trang bài. Badge "HSK n" giữ nguyên cho mọi
   bài (phần lõi đều đúng cấp); trung thực nằm ở dòng trạng thái, không
   ở việc đổi badge. Sau lô này: 36/39 bài `verified`, 3 bài `partial`
   (de-possessive — nhắc 得/地 HSK2; modal-xiang-yao — nhắc nghĩa sắp
   xảy ra của 要; question-words — 几/多少 chưa có mục tương ứng trong
   danh mục đối chiếu của dự án, chờ kiểm tra bản gốc trước khi kết
   luận cấp; không tự khẳng định cấp khác).
2. bi-comparison: bỏ quy tắc vị trí của 更 khỏi bước 3 của công thức
   (chỉ giữ 也/都 đặt trước 比). 更 thuộc HSK3 (OFF-H3-12) và đã có bài
   bi-comparison-2 dạy; dạy quy tắc + ví dụ ở bài HSK2 là vượt phạm vi
   bằng chứng. Sửa nội dung thay vì ghi chú quanh nội dung lệch. Ghi
   chú: ở lô std1, QA từng bắt lỗi vị trí 更 trong chính bước này; bỏ
   hẳn quy tắc khỏi bài HSK2 là cách xử lý gốc rễ.
3. Tách le-completion-change: ID cũ giữ cho phần 了 sau động từ (hoàn
   thành; 4/5 bài tập hiện có và thẻ FSRS đi theo phần này, không nhân
   đôi thẻ); bài mới le-sentence-final-change （了 cuối câu) đặt ngay
   sau trong manifest, nhận le-ex2 (giữ ID bài tập) + nội dung bổ sung;
   phần phân biệt hai cách dùng đặt làm bài tập chốt của bài mới. Bài
   tập prefix-ex5 chuyển sang location-nouns thì đổi ID thành
   locnoun-ex6 (bài tập mới thêm ở std1, chi phí đổi ID thấp nhất lúc
   này); đây là ngoại lệ có ghi lý do, không phải tiền lệ đổi ID tùy
   tiện. Ví dụ 了解 bỏ khỏi cả hai bài 了 (giữ dạng confusion).
4. prefix-suffix giữ một bài （第/小/们）, chuyển chủ điểm 边 sang
   location-nouns — chỉ lấy 前边/后边 (thuộc OFF-H1-03); 左/右 để dành
   cấp sau, không đưa vào location-nouns ở lô này. complex-suiran-
   yinwei giữ nguyên cấu trúc hai cặp (đối chiếu ghép chéo là mục tiêu
   học), chỉ bổ sung cân bằng phủ trong bài (1 ví dụ 因为, bài tập tự
   sản xuất complex-ex6 cho cặp 虽然, không đánh số lại bài tập cũ).
5. Rà Nhớ nhanh: thay nguyên văn 8 mục theo audit §1.3 (adverbs-du-ye,
   bei-passive-1, bi-comparison, bu-yao-prohibition, cunxian-chu,
   measure-words, verb-reduplication, why-question); không bài nào bỏ
   mục F — cả ba ứng viên yếu nhất đều có bẫy phân biệt thật và trang
   Ôn tập dùng quick_memory làm nội dung đối chiếu.

## D27 — Benchmark 3 nền tảng và pilot "Bài liên quan" REL-01 (2026-10-31)

Căn cứ: chỉ đạo của Hoa ngày 31/10/2026 (tự nghiên cứu Chinese Grammar
Wiki, Yoyo Chinese, Mandarin Bean và nâng cấp hanngu-grammar) +
docs/research/grammar-platform-benchmark.md +
docs/research/feature-gap-matrix.md (kiểm chứng trực tiếp cùng ngày).

1. Học NGUYÊN LÝ, không sao chép nội dung: liên kết bài tương tự của
   CGW, toggle/lưu mặc định của Yoyo (hanngu đã có từ std1), giải
   thích cho mọi câu + "câu đúng phải là" của Mandarin Bean. Không
   dùng bài giảng, audio, video hay mã của ba trang này.
2. Pilot được chọn: G-01 "Bài liên quan" — thêm trường tùy chọn
   `related_ids` vào bài học. Lý do chọn: khoảng trống có bằng chứng
   rõ nhất (trang bài hiện chỉ có Bài trước/Bài sau theo manifest,
   schema không có trường quan hệ nào) và là thế mạnh cốt lõi của
   CGW; chi phí thấp, không đổi ID bài/bài tập, không chạm tiến độ
   và FSRS.
3. Quy tắc dữ liệu của related_ids: đối xứng hai chiều, tối đa 4
   liên kết mỗi bài, chỉ trỏ bài published có thật, và mỗi cặp phải
   có bằng chứng quan hệ trong dữ liệu hiện hữu (phân biệt ở mục D,
   tham chiếu chéo trong công thức/ghi chú rà soát, quan hệ dạng
   1/dạng 2, cặp tách bài, cùng họ theo tài liệu ánh xạ) — không
   suy diễn máy móc từ tiêu đề. Validator thực thi các quy tắc máy
   kiểm được; tính đúng sư phạm của từng cặp do QA độc lập rà.
4. Các khoảng trống còn lại xếp hàng theo feature-gap-matrix:
   G-02 tìm kiếm theo pinyin + G-06 nhóm danh mục theo cấp (lô UI
   P1 tiếp theo); G-03/G-07/G-08 là P2. AUD-TTS-01 giữ not_run;
   ISSUE-LOAD-STALL-01 giữ monitoring — hai mục này không bị đóng
   bởi benchmark.
5. Ghi nhận vận hành: PR #19 (HSK3-9) đã merge ngày 31/10
   (e5933c2c) sau khi Manager kiểm chứng CI 2/2 trực tiếp trên
   trang PR (run 41053571119) — lần kẹt merge ở phiên 30/10 là
   khóa ghi phía công cụ, không phải lỗi nội dung/CI.

## D28 — Giáo trình có thứ tự chính thức (curriculum order) + kiểm kê hợp nhất (2026-10-31)

Căn cứ: chỉ đạo của Hoa ngày 31/10/2026 (xây dựng giáo trình ngữ pháp
HSK1–HSK6 hoàn chỉnh, đánh số bài theo cấp, chủ động bổ sung bài thiếu).

1. Thứ tự học là DỮ LIỆU RIÊNG: `data/curriculum.json` gồm, theo từng
   cấp 1–6, danh sách id bài theo thứ tự học và trường `requires`
   (bài tiên quyết, chỉ ghi khi có bằng chứng phụ thuộc thật). Số hiển
   thị "Bài NN" của một cấp = vị trí trong danh sách của cấp đó. ID
   bài, manifest (thứ tự tải) và tiến độ/FSRS không đổi; chèn bài mới
   chỉ đổi số hiển thị của các bài sau nó trong cùng cấp.
2. Validator bắt buộc: mọi bài published xuất hiện đúng một lần trong
   danh sách của đúng cấp của nó; không id lạ; requires phải tồn tại
   và đứng TRƯỚC bài phụ thuộc trong thứ tự toàn cục (cấp thấp hơn,
   hoặc cùng cấp ở vị trí sớm hơn); số thứ tự suy ra liên tục 1..n.
3. UI: danh mục nhóm theo 6 cấp (cấp chưa có bài ghi rõ "đang biên
   soạn", không bịa số), mỗi thẻ hiện "HSK n · Bài NN"; trang bài hiện
   số bài và điều hướng Bài trước/Bài sau THEO curriculum (không theo
   manifest); bài có requires hiện mục "Cần học trước" có link. Tìm
   kiếm mở rộng sang pinyin (có dấu và bỏ dấu) của ví dụ + objective +
   when_to_use (khép G-02 của feature-gap-matrix).
4. Kiểm kê hợp nhất ở docs/curriculum-inventory.md, dịch trạng thái
   catalogue sang thang của chủ dự án: covered → COMPLETE (ở mức mục
   nhóm), partial → PARTIAL, missing → MISSING; NEEDS_VERIFICATION áp
   cho toàn bộ phần xác minh sâu P01-02 còn mở (điểm vi mô, rủi ro
   lệch hàng ngoài các khối đã kiểm trực quan) — không đánh dấu cấp
   nào "hoàn thành" chỉ từ số bài.
5. Thứ tự trong cấp theo nguyên tắc: nền tảng/trật tự câu cơ bản →
   câu hỏi/phủ định → thời/thể → cấu trúc đặc biệt → phân biệt/so
   sánh đặt sau khi từng cấu trúc đã học. Thứ tự cụ thể và lý do ghi
   trong docs/curriculum-inventory.md; thay đổi thứ tự sau này sửa
   curriculum.json, không sửa id/manifest.
6. Lộ trình hoàn thiện theo cấp: HSK1 trước (27 mục nhóm partial/
   missing trong 52), rồi HSK2 (42/62), HSK3 (18/50), HSK4–6. Mỗi lô
   nội dung tối đa ~4 bài như quy ước cũ, qua đủ cổng QA/CI/live.

## D29 — Tái thiết kế UX/UI pilot (2026-10-31, build 20261031-ui1)

Chỉ đạo của Hoa ngày 2026-10-31: nâng cấp UX/UI thực chất (không chỉ
đổi màu/bo góc), pilot trên trang danh mục + HSK1 · Bài 01 (shi-noun-link)
+ bộ bài tập của bài đó, kiểm chứng bằng trình duyệt thật nhiều kích
thước trước khi chuẩn hóa. Quyết định kỹ thuật:

1. Renderer dùng chung được viết lại cho cả 3 bề mặt (danh mục, trang
   bài, luyện tập) vì chúng dùng chung một renderer; phạm vi QA pilot
   tập trung vào Bài 01 + 1 bài trung bình + 1 bài khó trước merge.
   Không đổi: data/, schema, ID bài/bài tập, khóa tiến độ v2, FSRS
   (srs.mjs), cơ chế ghi attempts/hints, trang Ôn lại.
2. Danh mục: hàng gọn một dòng mô tả (cắt CSS) thay thẻ lớn; thanh
   tiến độ theo cấp + toàn bộ; "Tiếp tục học" đi theo THỨ TỰ
   CURRICULUM (sửa lệch cũ: trước đây quét theo thứ tự manifest); lọc
   thêm theo trạng thái học (tham số st trên hash); xuất/nhập tiến
   trình chuyển vào khối <details> cuối trang.
3. Trang bài: bỏ "Ví dụ nhanh" ở mục A (trùng ví dụ 1 ở mục Ví dụ);
   công thức hiện dạng ô thành phần tách theo "+" ở hero và mục Công
   thức; mẫu câu đầy đủ chỉ xuất hiện ở hai chỗ đó (bỏ lần lặp thứ ba
   trong Luyện nói); Dễ nhầm thành <details> từng câu; Nguồn/kiểm
   chứng thành <details> cuối trang; điều hướng mục bằng nút cuộn
   (không dùng href="#..." vì app định tuyến bằng hash).
4. Nghe: một nút tròn 44px duy nhất cho mỗi ví dụ — bấm để nghe, bấm
   lần nữa để dừng (class .speaking + ký hiệu ▶/■); bỏ nút Dừng riêng.
   Tốc độ đọc/Pinyin/nghĩa vẫn là prefs dùng chung cả bài.
5. Luyện tập: trình từng câu — mọi câu vẫn trong DOM với id và cơ chế
   chấm cũ; trình chỉ ẩn/hiện, hiện vị trí Câu x/N, thanh tiến độ theo
   attempts thật, và TỔNG KẾT (đúng gần nhất x/N + danh sách câu cần
   ôn lại, bấm để nhảy tới câu) dựng từ progress.attempts. Sửa lỗi lộ
   đáp án: bài fill KHÔNG còn in hint_vi sẵn ("Mẫu cần dùng") — gợi ý
   chỉ hiện khi bấm nút Gợi ý và vẫn ghi nhận hints như cũ.
6. Luyện nói: luồng 4 bước có chỉ báo bước (Nghe mẫu → Thu âm → Nghe
   lại → Tự đánh giá); thêm nút tự đánh giá 3 mức chỉ ghi trong trang
   (không đổi schema tiến độ); hướng dẫn kỹ thuật dài chuyển vào
   <details> "Trợ giúp & lưu ý kỹ thuật". TTS vẫn là giọng tổng hợp,
   audio thiết bị thật vẫn not_run (AUD-TTS-01 không đổi trạng thái).
7. Harness tests/browser-check.mjs được cập nhật 2 điểm tương ứng
   thiết kế mới (nhãn mục "Hiểu nhanh"; nút nghe/dừng hợp nhất) — các
   kiểm tra còn lại giữ nguyên, 24/24 PASS trên bản local trước QA.
