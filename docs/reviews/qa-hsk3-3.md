# QA — Lô HSK3-3 (4 bài mới) — 2026-10-30

Agent QA độc lập. Không sửa mã/dữ liệu. Phương pháp: tự chấm từng ví dụ/bài
tập của 4 bài mới bằng kiến thức tiếng Trung; đối chiếu ranh giới với 5 bài
cũ liên quan (cunxian-chu, shi-de-emphasis, direction-complement,
verb-reduplication, state-complement-de); khảo sát toàn bộ error_spot của
dự án để kết luận điểm 3c; kiểm OFF id trong docs/official-catalogue-
hsk3-hsk4.json; chạy validator/test/harness/CDP trên bản local.

## Kết luận: ĐẠT CÓ ĐIỀU KIỆN

Không có lỗi chấm sai/chấm oan nào trong 20 bài tập mới. Hai điểm mức
Quan trọng (Q-1, Q-2) đều ở bài shi-de-attitude và đều là lệch giữa quy
tắc đã dạy và đáp án được nhận/cách trình bày — cần sửa trước khi phát
hành, phạm vi kiểm lại sau sửa hẹp (chỉ shi-de-attitude + validator).
Ba điểm Hoàn thiện H-1…H-3 nên sửa cùng vòng. Các bài mới vẫn là
"đã rà soát nội bộ": audio TTS chưa nghiệm thu trên thiết bị thật
(AUD-TTS-01 vẫn not_run).

## Lỗi Quan trọng (sửa bắt buộc trước phát hành)

### Q-1 — shi-de-attitude: đáp án nhận dạng lược 是 nhưng công thức không hề nói 是 lược được (điểm 3a)

Ví dụ 3 "你放心，我一定会帮你的。" không có 是 lộ thiên; shide2-ex5 nhận
cả "我一定会帮你的。" lẫn "我是一定会帮你的。" và lời giải viết "(是） +
一定会 + động từ + 的". Nhưng formula_notes không có chỗ nào nói 是 có
thể lược: bước 1 đặt 是 là vị trí cố định sau chủ ngữ, quick_memory nói
"bọc 是……的: 是 đứng sau chủ ngữ", và confusion 2 dạy "thiếu 的 là sụp
khung" — người học có căn cứ để suy ra thiếu 是 cũng sụp khung, trong
khi đáp án của chính bài lại nhận dạng thiếu 是. Đây là không nhất quán
nội bộ giữa điều đã dạy và điều được chấm nhận.

Đề xuất sửa (một câu trong formula, ví dụ thêm vào bước 2): "是 có
thể lược khi đã có từ khẳng định mạnh như 一定 đứng trước cụm động
từ （我一定会帮你的）; riêng 的 ở cuối câu thì không lược được."
Miễn sao tường minh cả hai ý: 是 lược được trong điều kiện đó, còn
的 thì không.

### Q-2 — shi-de-attitude shide2-ex4: error_spot duy nhất trong dự án khóa lỗi vào thành phần KHÔNG có mặt trong câu (điểm 3c)

Câu "他是会来。" thiếu 的 ở cuối; đáp án khóa vào khối "来" (khối đứng
trước vị trí thiếu). Khảo sát toàn bộ 37 bài error_spot của dự án: mọi
bài còn lại đều khóa vào một khối CÓ MẶT nhưng sai/thừa/đặt sai chỗ
（着 đứng cuối câu, 不 đặt trước tính từ, 的 thay vì 得…). shide2-ex4 là
trường hợp duy nhất lỗi là thành phần vắng mặt. Giao diện app hiển thị
câu rồi yêu cầu "Chọn khối sai" trong số các khối có mặt; quy ước ngầm
"chọn khối đứng trước chỗ thiếu" không tồn tại ở bất kỳ bài nào khác
và prompt không hề báo trước ("Câu sau sai ở khối nào?"). Người học
chỉ biết quy ước sau khi đọc lời giải — tức sau khi đã phải đoán.
Lời giải tự nó rõ ràng ("Thiếu 的 ở cuối câu: sau 来 phải chốt 的"),
nhưng không cứu được bước chọn đáp án.

Đề xuất sửa: đổi dạng bài tập, giữ nguyên id và mục tiêu kiểm tra —
chuyển thành fill với khung cho sẵn vị trí thiếu:
- type: "fill"
- payload.prompt_zh: "他是会来___。"
- payload.hint_vi: "Chốt câu bằng 的 của khung 是……的。"
- accepted_answers: "他是会来的。" và dạng không dấu câu.
- explanation giữ nguyên ý hiện tại.
Cách này kiểm tra đúng điểm thiếu 的 mà không ép quy ước chọn khối lạ.

## Điểm Hoàn thiện (khuyến nghị sửa cùng vòng)

### H-1 — cunxian-appearance, formula_notes bước 4: dính chữ Hán vào câu tiếng Việt

Nguyên văn: "không dùng 有 cho biến động — **有只** nói tồn tại tĩnh".
"只" là chữ Hán lạc trong câu tiếng Việt; phải là "Có chỉ nói tồn tại
tĩnh" (hoặc "有 chỉ nói…"). Nằm trong văn bản dạy học nên sửa.

### H-2 — cunxian-appearance cx3-ex5: thiếu biến thể hợp lệ "一百块"

Đáp án nhận 钱包里丢了一百块钱/一百元 (± dấu câu) nhưng không nhận
"钱包里丢了一百块。"/"钱包里丢了一百块" — dạng rút gọn hoàn toàn hợp
lệ và rất phổ biến cho "mất một trăm tệ". Đề xuất thêm hai dạng này.

### H-3 — direction-complement-2 dir2-ex1: lời giải không xử lý nhiễu gây tranh cãi nhất (điểm 3d)

Kết luận về đáp án: KHÔNG tranh cãi. "大家唱得起来。" là dạng khả năng
bổ ngữ ("có hát lên được"), không diễn đạt sự kiện "mọi người bắt đầu
hát lên" mà prompt yêu cầu; đáp án khóa "大家唱起来了。" là đáp án
đúng duy nhất cho nghĩa đã cho. Nhưng lời giải chỉ xử lý 下去 và 上来,
im lặng về 唱得起来 — đúng nhiễu mà người học vừa học xong khả năng
bổ ngữ (lô HSK3-2) dễ chọn nhất. Đề xuất thêm một câu vào explanation:
"唱得起来 là dạng khả năng 'có hát lên được', không kể việc bắt đầu
hát đã xảy ra."

## Năm điểm biên tập tự khai — kết luận từng điểm

- **3a (shi-de-attitude, lược 是）**: xem Q-1. Kết luận: công thức CẦN
  ghi tường minh; tính nhất quán của ex5 (nhận cả hai dạng) là đúng về
  đáp án, sai ở chỗ quy tắc chưa từng cấp phép dạng không 是.
- **3b (cunxian-appearance cx3-ex4)**: CHẤP NHẬN ĐƯỢC, giữ nguyên.
  Khối khóa "有" là khối CÓ MẶT và đúng là khối duy nhất phải thay
  （有 → 少） để câu chuyển từ tồn tại tĩnh sang biến mất; mọi khối còn
  lại giữ nguyên trong câu sửa "桌子上的书少了一本。". Prompt đã nêu
  tường minh ý định ("nếu muốn nói 'Sách trên bàn thiếu mất một
  quyển'"), và confusion 3 của chính bài xử lý đúng câu này với
  verdict doi_nghia — nhất quán trong bài. Khác hẳn 3c: ở đây không
  có thành phần vắng mặt nào bị khóa.
- **3c (shi-de-attitude shide2-ex4)**: xem Q-2. Kết luận: ĐỔI DẠNG
  bài tập sang fill như đề xuất; không có tiền lệ nào trong dự án cho
  error_spot dạng thiếu thành phần.
- **3d (direction-complement-2 dir2-ex1)**: xem H-3. Đáp án không
  tranh cãi; chỉ thiếu giải thích cho nhiễu 得起来.
- **3e (verb-repetition-sentence confusion 3)**: verdict kem_tu_nhien
  là ĐÚNG hạng, giữ nguyên. "她看书累了。" không sai ngữ pháp — bổ
  ngữ kết quả 累 có thể đi sau cụm động-tân trong khẩu ngữ (cách hiểu
  "đọc sách đến mệt" vẫn tới được); dạng đầy đủ "她看书看累了。" mới
  là mẫu chuẩn được dạy và rõ nhịp hơn. Gán sai_ngu_phap sẽ là kết án
  quá tay một câu dùng được; kem_tu_nhien vừa tránh điều đó vừa lái
  người học về dạng đầy đủ. Cặp bài này còn được neo bởi ví dụ 2 của
  chính bài （她看书看累了。) nên người học thấy rõ hai dạng cạnh
  nhau.

## Kiểm nội dung từng bài (tự chấm)

### cunxian-appearance (OFF-H3-38)
- 5 ví dụ đều tự nhiên, đúng mẫu biến động （走进来/新来了/少了/丢了/
  跑出来), tokens nối khớp zh, pinyin đúng.
- Bài tập: cx3-ex1 đáp án duy nhất thật (3 nhiễu đều sai cấu trúc);
  cx3-ex2 thứ tự duy nhất hợp lý; cx3-ex3 khung "学校里新来了___老师"
  + hint 一位 khóa đáp án đúng; cx3-ex5 nhận 块钱/元 (trừ H-2).
- Confusions: verdict đúng hạng cả ba (thiếu 了 trong mẫu xuất hiện
  kết án sai_ngu_phap là chấp nhận được ở cấp này vì mẫu chuẩn trong
  đề cương có 了 và lời giải nêu đúng hệ quả "mất ý thay đổi, nghe
  chưa trọn").
- Ranh giới với cunxian-chu: ĐẠT. Bài không dạy lại mẫu tĩnh: when_to_
  use và bước 5 của công thức chỉ đối chiếu và trỏ về bài cũ; phần
  tĩnh （有） chỉ xuất hiện như phía đối lập để phân biệt, kể cả ở
  confusion 3 và cx3-ex4. Ví dụ/bài tập 100% là biến động + 了.
- quick_memory là móc thật (câu hỏi chẩn đoán + thứ tự chốt), 108 ký
  tự, trong giới hạn schema.
- Ghi nhận nhỏ (không bắt buộc sửa): trường pattern ghi bổ ngữ như
  thành phần bắt buộc, trong khi ví dụ 2 （班里新来了一位老师） không
  có bổ ngữ xu hướng/kết quả — công thức bước 2 đã bao quát trường
  hợp động từ 来 đứng một mình nên không gây hiểu sai khi học.

### shi-de-attitude (OFF-H3-39)
- Phân biệt dạng 1/dạng 2 đúng và nhất quán ở when_to_use, công thức
  bước 4, confusion 1 và lời giải các bài tập: dạng 1 nhấn chi tiết
  việc đã xảy ra （是昨天来的）, dạng 2 nhấn thái độ chắc chắn, kể cả
  việc chưa xảy ra. Không lẫn hai dạng ở bất kỳ ví dụ nào.
- Ví dụ 1/2/4/5 và bài tập ex1 (đáp án duy nhất theo đúng yêu cầu
  "dùng 是……的" của prompt), ex2, ex3, ex5 đều đúng; confusion 2
  （他是会来 thiếu 的 → sai_ngu_phap) và confusion 3 （是我的知道 đặt
  的 sai chỗ) đúng bản chất.
- Hai vấn đề duy nhất của bài là Q-1 và Q-2 ở trên.

### direction-complement-2 (OFF-H3-29)
- Ranh giới với bài HSK2: ĐẠT. Công thức bước 5 và when_to_use tách
  rõ nghĩa hướng thật (di chuyển trong không gian) khỏi nghĩa mở
  rộng; toàn bộ ví dụ/bài tập đều không có di chuyển thật （唱/热/说/
  看/想 + 起来/下去/出来). Confusion 1 chuyên trách việc đọc lầm
  sang nghĩa hướng.
- Ví dụ và đáp án đúng cả 5 bài tập; dir2-ex4 （他看得起来很累，
  khóa 得） là error_spot chuẩn mực — khối sai có mặt, lời giải phân
  biệt được 看起来 cố định với 看得出来 của khả năng bổ ngữ.
- Confusion 2 verdict thieu_ngu_canh cho "明天我们唱下去吧。" （việc
  chưa bắt đầu) đúng hạng; confusion 3 （他看出来很累） verdict
  doi_nghia đúng.

### verb-repetition-sentence (OFF-H3-40)
- Phân biệt trùng động/trùng điệp đúng ở công thức bước 4, confusion
  1 và when_to_use (điều kiện nền state-complement-de + separable-
  verbs được nêu rõ, không dạy lại hai bài đó).
- 5 ví dụ tự nhiên （说话说得很快/看书看累了/写字写得手都酸了/学中文
  学得很好/唱歌唱得很高兴）; 5 bài tập đáp án đúng và duy nhất hợp
  lý; vrep-ex4 khóa 得 trong "他说话得很快。" đúng vị trí lỗi.
- quick_memory dạng câu hỏi chẩn đoán, là móc thật.

## Nhất quán liên bài và phạm vi cấp

- OFF id trong sources khớp catalogue dự án cả 4 bài: cunxian-
  appearance → OFF-H3-38, shi-de-attitude → OFF-H3-39, direction-
  complement-2 → OFF-H3-29, verb-repetition-sentence → OFF-H3-40.
  hsk_evidence "verified" ở cả 4 bài, phù hợp nội dung thực dạy.
- Không bài nào dùng cấu trúc thuộc cấp cao hơn chưa dạy: bổ ngữ xu
  hướng （进来/出来） là nền HSK2; 着 trong câu nhận đáp án của
  dir2-ex2 ("我听着呢") đã dạy ở HSK2; dạng khả năng bổ ngữ chỉ được
  nhắc trong lời giải dir2-ex4 (đã dạy ở lô HSK3-2); động từ ly hợp
  trong bài trùng động là nền HSK1.

## Kiểm hệ thống (chạy thật trên bản local)

- `python3 scripts/validate.py`: ĐẠT — 47 bài, 47 published, 228
  bài tập.
- `python3 -m unittest discover -s tests`: 9 tests, OK.
- `node --test tests/test_fsrs.mjs`: 7/7 pass.
- `node --check app.js`: OK.
- Harness `node tests/browser-check.mjs http://127.0.0.1:8901/`:
  PASS 19/19 — không tràn ngang ở 360/390/768/1280, 0 lỗi console,
  bàn phím Space/Enter đúng, trạng thái nghe/dừng đúng, tiến độ và
  prefs giữ sau tải lại, Ôn tập khóa rate trước đối chiếu.
- Kiểm DOM qua CDP (hồ sơ mới): trang chủ có đúng 47 liên kết bài
  duy nhất, đủ 4 bài mới; mở verb-repetition-sentence có đủ các mục
  A. Dùng khi nào → F. Nhớ nhanh, 5 bài tập, và dòng "Đã đối chiếu
  đề cương HSK 3.0: toàn bộ nội dung thuộc HSK 3" (verified).

## Phạm vi kiểm lại sau sửa (đề xuất cho Manager)

Chỉ cần: (1) formula_notes + ex5 của shi-de-attitude nhất quán về
lược 是 (Q-1); (2) shide2-ex4 sau đổi dạng chấm đúng 的 và vẫn khóa
đúng mục tiêu (Q-2); (3) ba điểm H-1…H-3 nếu sửa cùng vòng; (4)
validator ĐẠT lại. Không cần chạy lại toàn bộ QA lô này.

## Vòng 2 — kiểm lại sau sửa (2026-10-30)

Phạm vi: chỉ 3 file đã sửa (shi-de-attitude, cunxian-appearance,
direction-complement-2) + validator. Không sửa mã/dữ liệu ở vòng này.

### Q-1 — ĐẠT

formula_notes bước 2 của shi-de-attitude nay ghi tường minh cả hai ý:
"是 có thể lược khi đã có từ khẳng định mạnh như 一定 （我一定会帮你的）;
riêng 的 ở cuối câu thì không lược được." quick_memory đã viết lại
thành "是 sau chủ ngữ (có 一定 thì lược cũng được), 的 chốt cuối —
thiếu 的 là sụp khung" — không còn trình bày 是 như bắt buộc tuyệt
đối. Bước 1 chỉ nêu vị trí của 是 khi nó có mặt (sau chủ ngữ, trước
cụm động từ), không khẳng định tính bắt buộc nên không mâu thuẫn với
bước 2. Ví dụ 3 "你放心，我一定会帮你的。" (không 是） nay được chính
quy tắc đã dạy cấp phép; ex5 nhận cả hai dạng và lời giải "(是） +
一定会 + động từ + 的; 的 ở cuối câu là chốt bắt buộc của khung"
nhất quán với công thức. Chuỗi công thức → móc nhớ → ví dụ → bài tập
đã khép kín.

### Q-2 — ĐẠT

shide2-ex4 đã đổi đúng sang type "fill", giữ nguyên id:
payload.prompt_zh "他是会来___。", hint_vi "Chốt câu bằng 的 của khung
是……的。", accepted_answers gồm "他是会来的。" và dạng không dấu câu
"他是会来的". Lời giải khớp: nêu khung 是……的 dạng 2 nhấn thái độ và
"thiếu 的 là sụp khung — phải điền 的 ngay sau 来". App chấm fill
theo accepted_answers nên bài chấm đúng; mục tiêu kiểm tra (bắt được
việc thiếu 的） được giữ nguyên mà không cần quy ước chọn khối lạ.

### H-1 — ĐẠT

formula_notes bước 4 của cunxian-appearance nay đọc "không dùng 有
cho biến động — Có chỉ nói tồn tại tĩnh （桌子上有一本书 là 'trên bàn
có một quyển sách', không nói sách vừa bị lấy mất)". Grep toàn file:
chuỗi "有只" không còn xuất hiện. Câu sửa đúng nghĩa.

### H-2 — ĐẠT

cx3-ex5 nay có 6 biến thể trong accepted_answers, gồm cả
"钱包里丢了一百块。" và "钱包里丢了一百块" bên cạnh các dạng 块钱/元.

### H-3 — ĐẠT

explanation của dir2-ex1 đã bổ sung: "Còn 唱得起来 là bổ ngữ khả năng
('có hát lên được' — như 唱得动， thuộc bài khả năng bổ ngữ), không
diễn đạt nghĩa 'bắt đầu hát' của câu này." Nhiễu khó nhất đã được
phân biệt tường minh với nghĩa bắt đầu mà prompt yêu cầu.

### Validator vòng 2

`python3 scripts/validate.py`: ĐẠT — 47 bài, 47 bài published, 228
bài tập.

### Kết luận vòng 2

Cả 5 điểm Q-1, Q-2, H-1, H-2, H-3 đều ĐẠT; validator ĐẠT. Lô HSK3-3
đạt QA để phát hành trong phạm vi đã kiểm. Trạng thái không đổi:
4 bài mới vẫn là "đã rà soát nội bộ" — audio TTS trên thiết bị thật
chưa nghiệm thu (AUD-TTS-01 vẫn not_run).
