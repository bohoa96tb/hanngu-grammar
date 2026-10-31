# Kiểm toán nguồn: no7z/hsk-sentences-audio

- Ngày kiểm toán: 2026-10-31.
- Đối tượng: https://github.com/no7z/hsk-sentences-audio — repo công khai, nhánh `main`,
commit đã kiểm tra: `857dfbab91027ebd97df01260e91b817cb6b4854` (30 commit, tạo 2026-07-08,
7 sao, 1 release tại thời điểm kiểm tra).
- Mục đích: quyết định dự án có dùng được kho này cho phần "luyện nghe từng câu theo ngữ pháp"
trong quy chuẩn Đọc & nghe (docs/READING_LISTENING_STANDARD.md) hay không.
- Cách kiểm chứng: mở trực tiếp trang repo + README + LICENSE + ATTRIBUTION.md trên GitHub;
tải `dist/sentences.json` (6,4 MB), `data/grammar_points.json`, `data/sentences/hsk1.yaml`
và 3 file MP3 mẫu về máy để truy vấn/kiểm tra định dạng thật. Giới hạn: môi trường kiểm toán
**không nghe được audio** — mọi nhận định về khớp âm thanh–văn bản đều là kiểm chứng gián tiếp
(xem mục 3.4).

## 1. Giấy phép — tách bạch ba lớp

GitHub hiển thị giấy phép tổng của repo là "Other (NOASSERTION)" vì trong repo tồn tại nhiều
giấy phép theo từng lớp. Tách bạch như sau:

### 1a. Mã nguồn: MIT

- Bằng chứng: file `LICENSE` ở gốc repo — toàn văn MIT License,
"Copyright (c) 2026 hsk-sentences-audio contributors".
- Cuối file `LICENSE` có ghi chú nguyên văn: "This MIT license covers the CODE only. The
generated dataset in dist/ is licensed under CC-BY-SA 4.0 … See ATTRIBUTION.md for details."
- README mục License lặp lại: "**Code**: MIT (see `LICENSE`)".

### 1b. Dữ liệu câu (dataset): CC BY-SA 4.0 cho toàn bộ `dist/`

Nguồn gốc từng thành phần (theo `ATTRIBUTION.md`, bảng "数据与依赖来源 / Attribution"):

| Thành phần | Nguồn gốc | Giấy phép |
|---|---|---|
| Văn bản câu + bản dịch tiếng Anh | **Do chính dự án đó tự biên soạn** ("句子文本与英文翻译为本项目自有" — câu và bản dịch Anh là nội dung tự có của dự án). File nguồn: `data/sentences/hsk<level>.yaml`, mỗi câu chỉ có 3 trường do người viết nhập: `chinese`, `en`, `grammar` (tên mẫu dạng chữ, ví dụ `"很 + adj"`) | Thuộc dataset |
| Gloss từng từ + Pinyin từng từ | Trích xuất từ **CC-CEDICT** (MDBG) | **CC BY-SA 4.0** |
| Pinyin cấp câu | Sinh bằng pypinyin (MIT) + lớp sửa tay/CC-CEDICT + `data/overrides.json` | — |
| Phân cấp HSK | Đối chiếu *Chinese Proficiency Grading Standards* **GF0025-2021**; từ vựng máy-đọc lấy từ dự án cộng đồng complete-hsk-vocabulary (MIT) — chỉ dùng để kiểm tra phân cấp, không nhập vào dữ liệu | — |

- Kết luận của chính tác giả (ATTRIBUTION.md, mục 数据集许可）: các trường bắt nguồn từ
CC-CEDICT chịu CC BY-SA 4.0; và "为简化合规，整个 `dist/` 数据集以 **CC-BY-SA 4.0** 发布"
(để đơn giản hoá tuân thủ, toàn bộ dataset `dist/` phát hành theo CC-BY-SA 4.0).
- README mục License lặp lại: "**Dataset (`dist/`)**: CC-BY-SA 4.0 (glosses and per-word
pinyin contain CC-CEDICT-derived content; audio synthesized with Apache-2.0 CosyVoice2)".

### 1c. File audio: giọng TỔNG HỢP bằng CosyVoice2 (Apache-2.0), không phải giọng người thật

- Engine: **CosyVoice2-0.5B** (FunAudioLLM/CosyVoice, giấy phép **Apache-2.0**), tổng hợp
**tại máy của tác giả** ("synthesized locally"), mỗi câu 2 file: tốc độ thường + chậm.
- "Giọng" là một giọng nữ tham chiếu dạng studio được tạo bằng script của repo
(`scripts/make_reference.py` — "generate the reference voice (once)"); mọi bản ghi đều mang
`audio_meta`: `{"engine": "cosyvoice2-0.5B", "voice": "zh-female-studio",
"license": "Apache-2.0", "sample_rate": 24000}` — kiểm tra trên toàn bộ 4.354 bản ghi:
chỉ có đúng 1 giá trị `audio_meta` duy nhất, nhất quán toàn kho.
- ATTRIBUTION.md, mục 关于音频， nguyên văn: "音频由 CosyVoice2-0.5B 在本地合成，**合成语音**
（synthetic voice）；输入文本为本项目自有内容" và "CosyVoice 模型语音本身的知识产权归其作者所有；
本项目依 Apache-2.0 再分发合成输出" (bản quyền giọng mô hình thuộc tác giả mô hình; dự án
tái phân phối đầu ra tổng hợp theo Apache-2.0).
- README, mục Quality machinery: "Audio: CosyVoice2-0.5B synthesized locally with a studio
female reference voice … **Synthetic voice — downstream apps should disclose it as such,
per common practice**".

→ Nhãn **"Giọng tổng hợp" là đúng bản chất** và còn là điều chính nguồn này khuyến nghị.
Tuyệt đối không được ghi "giọng người thật/người bản xứ" cho audio của kho này.

### 1d. Nghĩa vụ ghi công repo yêu cầu

Từ bảng trong `ATTRIBUTION.md` (cột 署名要求 — yêu cầu ghi công):

- **CC-CEDICT**: "需署名，衍生数据同以 CC-BY-SA 分享" — **phải ghi công, và dữ liệu dẫn xuất
phải chia sẻ tiếp theo cùng CC BY-SA** (điều kiện ShareAlike).
- **CosyVoice2**: "保留版权声明" — giữ lại thông báo bản quyền (Apache-2.0).
- pypinyin / jieba / OpenCC / complete-hsk-vocabulary: không yêu cầu ghi công trong bảng này.
- Với audio dùng ở sản phẩm hạ nguồn: "使用者在下游产品中使用本音频时，建议按惯例标注"合成语音""
— khuyến nghị ghi rõ đây là giọng tổng hợp.
- Cộng với điều kiện chuẩn của CC BY-SA 4.0 áp cho toàn bộ phần dataset được lấy sang:
ghi công + chỉ rõ có sửa đổi hay không + **phần dẫn xuất phải phát hành theo CC BY-SA 4.0**.

## 2. Dữ liệu thực tế

### 2.1. Cấu trúc kho

- `data/sentences/hsk<1..6>.yaml` — câu nguồn do người viết (chữ Hán + dịch Anh + tên mẫu).
- `data/grammar_points.json` — danh mục **413 điểm ngữ pháp chính thức** cấp 1–6
(id / level / cat / sub / label / label_full / pattern / examples), nhưng **chỉ 70/413 điểm
có quy tắc nhận diện tự động** (README, mục Quality machinery).
- `dist/sentences.json` — dữ liệu đã dựng (6,4 MB); `dist/audio/` — file MP3 từng câu;
`dist/index.html`, `dist/setup.html` — trang duyệt/xuất dữ liệu ngoại tuyến.
- `scripts/` — pipeline (validate phân cấp, tổng hợp audio, kiểm thử quy tắc ngữ pháp…).
- Phân phối thêm qua npm/PyPI (chỉ JSON) và Hugging Face; audio ~170 MB được tải lười qua URL.

### 2.2. Quy mô (tự đếm từ `dist/sentences.json` tải về, khớp bảng README)

| Cấp | Số câu (README) | Tự đếm |
|---|---|---|
| HSK 1 | 281 | 281 |
| HSK 2 | 538 | 538 |
| HSK 3 | 727 | 727 |
| HSK 4 | 801 | 801 |
| HSK 5 | 965 | 965 |
| HSK 6 | 1.042 | 1.042 |
| **Tổng** | **4.354** | **4.354** |

Audio: 8.708 MP3 (thường + chậm cho từng câu), ~170 MB theo README; kiểm tra thực tế:
cả 4.354/4.354 bản ghi đều có đủ 2 đường dẫn audio, không bản ghi nào thiếu.

### 2.3. Trường dữ liệu mỗi câu

`id` (ví dụ `hsk1-0010`), `hsk_level`, `topic` (18 chủ đề), `sentence_type`
(statement/question/imperative), `chinese` (giản thể), `traditional` (phồn thể),
`pinyin` (có dấu thanh), `pinyin_numbered`, `translation: {en}` (**chỉ có tiếng Anh** —
tiếng Việt do dự án ta tự bổ sung), `tokens[]` (từng từ: word/pinyin/gloss_en — gloss là
định nghĩa thô của CC-CEDICT, dài dòng, không dùng nguyên văn cho người học được),
`grammar_tags[]` (mã điểm ngữ pháp chính thức dạng `cấp-số`, ví dụ `"1-09"` = phó từ
chỉ mức độ), `audio: {normal, slow}` (file riêng từng câu), `audio_meta` (engine/giọng/
giấy phép/tần số lấy mẫu).

### 2.4. Định dạng audio (kiểm chứng trên file tải thật)

- MP3, MPEG Layer III, **64 kbps, 24 kHz, mono**, ID3 v2.4.
- Mẫu: `hsk1-0010.mp3` = 12.165 byte ≈ 1,5 giây; bản chậm `hsk1-0010_slow.mp3` =
14.349 byte ≈ 1,8 giây; `hsk1-0002.mp3` = 15.573 byte ≈ 1,9 giây — dung lượng hợp lý
so với độ dài câu.

## 3. Thử truy vấn thật: mẫu "是" (A 是 B) ở HSK1

### 3.1. Phát hiện quan trọng: thẻ ngữ pháp của điểm "是字句" bị trống

- Điểm ngữ pháp của mẫu 是 trong danh mục chính thức của repo là **1-36 "是"字句**
(loại 特殊句型， ví dụ mẫu trong danh mục: 他是我的老师。/ 这是他的书。).
- Nhưng mục 1-36 trong `data/grammar_points.json` có `pattern: null` — **không có quy tắc
nhận diện tự động**. Hệ quả đo được trên toàn bộ dataset: **0 câu** mang thẻ `1-36`
(ở mọi cấp). Truy vấn "theo thẻ ngữ pháp 1-36" trả về **rỗng**.
- Thực tế HSK1 có **47 câu chứa chữ 是** (35 câu khẳng định), nhưng chúng được gắn thẻ theo
điểm ngữ pháp *khác* tình cờ có mặt trong câu (chỉ từ 这/那 → 1-06, 也 → 1-13, 的 → 1-20…)
hoặc **không có thẻ nào** (`grammar_tags: []`).
- Hệ quả cho dự án: **không thể chọn câu 是 bằng thẻ của repo**. Phải lọc theo chữ 是 rồi
**đọc từng câu và xác nhận cấu trúc A 是 B bằng mắt** — đúng quy trình quy chuẩn của dự án
đã quy định (nhãn chỉ là gợi ý tìm ứng viên, phải đọc và xác nhận cấu trúc).

### 3.2. Mười câu ứng viên A 是 B (khẳng định, HSK1) — nguyên văn từ `dist/sentences.json`

| # | ID | Câu | Pinyin (theo repo) | Audio thường | Audio chậm |
|---|---|---|---|---|---|
| 1 | hsk1-0010 | 他是我的老师。 | tā shì wǒ de lǎo shī | audio/hsk1-0010.mp3 | audio/hsk1-0010_slow.mp3 |
| 2 | hsk1-0012 | 我们是同学。 | wǒ men shì tóng xué | audio/hsk1-0012.mp3 | audio/hsk1-0012_slow.mp3 |
| 3 | hsk1-0013 | 她也是医生。 | tā yě shì yī shēng | audio/hsk1-0013.mp3 | audio/hsk1-0013_slow.mp3 |
| 4 | hsk1-0014 | 他们是工人。 | tā men shì gōng rén | audio/hsk1-0014.mp3 | audio/hsk1-0014_slow.mp3 |
| 5 | hsk1-0016 | 那个男生是我朋友。 | nà ge nán shēng shì wǒ péng you | audio/hsk1-0016.mp3 | audio/hsk1-0016_slow.mp3 |
| 6 | hsk1-0021 | 这是我爸爸和妈妈。 | zhè shì wǒ bà ba hé mā ma | audio/hsk1-0021.mp3 | audio/hsk1-0021_slow.mp3 |
| 7 | hsk1-0023 | 他是我弟弟，她是我姐姐。 | tā shì wǒ dì di tā shì wǒ jiě jie | audio/hsk1-0023.mp3 | audio/hsk1-0023_slow.mp3 |
| 8 | hsk1-0025 | 这是我儿子，那是我女儿。 | zhè shì wǒ ér zi nà shi wǒ nǚ ér | audio/hsk1-0025.mp3 | audio/hsk1-0025_slow.mp3 |
| 9 | hsk1-0026 | 她是我女朋友，他是我男朋友。 | tā shì wǒ nǚ péng you tā shì wǒ nán péng you | audio/hsk1-0026.mp3 | audio/hsk1-0026_slow.mp3 |
| 10 | hsk1-0027 | 我妈妈是老师，我爸爸是工人。 | wǒ mā ma shì lǎo shī wǒ mā ba shì gōng rén | audio/hsk1-0027.mp3 | audio/hsk1-0027_slow.mp3 |

### 3.3. Nhận xét từng câu (đọc trực tiếp)

- Cả 10 câu đều là A 是 B xác định thân phận/nghề nghiệp/người thân đúng nghĩa bài 是字句
của dự án; câu ngắn, tự nhiên, đúng văn cảnh giới thiệu — đạt yêu cầu "đọc và xác nhận
cấu trúc" cho mẫu này. Câu 7–10 gồm hai mệnh đề 是 song song, vẫn thuần một cấu trúc.
- Câu 3 có thêm 也 (cũng) và câu 5–6, 8 có chỉ từ 这/那 — thành phần phụ ở mức HSK1,
không phá cấu trúc mục tiêu; khi chọn cho bài 是 nên ưu tiên câu 1, 2, 4 thuần nhất.
- Thanh nhẹ được xử lý nhất quán trong Pinyin: 同学 tóng xué, 朋友 péng you, 弟弟 dì di,
姐姐 jiě jie, 爸爸 bà ba, 妈妈 mā ma — đúng quy ước đọc thực tế.
- Điểm cần lưu ý: câu 8 ghi 那是 là "nà shi" — 是 đọc nhẹ sau 那 (cách đọc lưu loát chấp nhận
được, nhưng khác thanh gốc shì; nếu dự án trích Pinyin này cần ghi chú hoặc chuẩn hoá).
Ngoài bộ mẫu này, câu mẫu của README (hsk1-0002: 你好，很高兴认识你。) cho thấy 认识 được
ghi rèn shi (thanh nhẹ) và repo tuyên bố xử lý từ đa âm theo ngữ cảnh （要 = yào) bằng
pypinyin + lớp sửa tay — cơ chế có thật, nhưng từng câu vẫn phải đọc kiểm như quy chuẩn.
- Trong 10 câu trên không có từ đa âm nguy hiểm kiểu 行/长/乐/重； rủi ro đa âm của riêng
mẫu 是 ở HSK1 là thấp. Mở rộng sang mẫu khác/cấp khác phải kiểm riêng từng bộ câu.

### 3.4. Mức kiểm chứng được về "audio khớp văn bản"

- Kiểm chứng ĐƯỢC: file tồn tại và tải được (HTTP 200) cho cả bản thường và bản chậm;
định dạng đồng nhất toàn mẫu (MP3 64 kbps/24 kHz/mono); dung lượng suy ra thời lượng
~1,5–1,9 giây, hợp lý với số âm tiết; `audio_meta` đồng nhất 4.354/4.354 bản ghi;
theo README, audio được tổng hợp từ chính bản ghi văn bản trong cùng pipeline
("text and audio share the same source") và có quy trình cờ kiểm duyệt từ đa âm.
- KHÔNG kiểm chứng được trong đợt này: nội dung âm thanh thực tế (phát âm từng từ đa âm,
ngữ điệu, chất lượng giọng) — kiểm toán viên không nghe được file. **Trước khi đưa bất kỳ
câu nào vào bài học, phải nghe thử thật (đầu/giữa/cuối theo QA của quy chuẩn) và đối chiếu
từng từ với văn bản/Pinyin**; kết luận ở đây chỉ là "đủ điều kiện để đưa vào vòng nghe kiểm".

## 4. Rủi ro và lưu ý bổ sung

- **Chuẩn phân cấp khác hệ quy chiếu của dự án**: repo phân cấp theo GF0025-2021 và tự thừa
nhận (ATTRIBUTION.md, mục 关于 HSK 分级） từ vựng máy-đọc lấy từ nguồn cộng đồng nên "与官方口径
约有 ~1% 出入" (có thể lệch ~1% so với口径 chính thức) và khuyên đối chiếu hệ thống chính
thức. Dự án ta đối chiếu theo đề cương thi HSK 3.0 (2025) và catalogue riêng — vì vậy thẻ
cấp/thẻ ngữ pháp của repo **chỉ là gợi ý**, không thay thế ánh xạ catalogue của dự án.
- **Repo rất mới, cộng đồng nhỏ**: tạo 2026-07-08, 7 sao, 1 release, tác giả duy nhất görün
được. Nguy cơ ngừng duy trì/thay đổi dữ liệu giữa các phiên bản là có thật → phải **ghim
commit** `857dfbab91027ebd97df01260e91b817cb6b4854` và lưu trữ cục bộ phần học liệu đã dùng
kèm LICENSE + ATTRIBUTION.md tại thời điểm lấy.
- **Gloss tiếng Anh thô**: gloss từng từ là định nghĩa nguyên gốc CC-CEDICT (rất dài, học
thuật) — chỉ dùng làm nguyên liệu kiểm tra nghĩa, không hiển thị nguyên văn cho người học.
- **Chỉ có dịch Anh**: bản dịch tiếng Việt là đóng góp của dự án ta; khi gắn vào bản ghi dẫn
xuất, phần bản ghi đó vẫn chịu điều kiện ShareAlike (xem điều kiện 2 dưới đây).
- Câu của repo là câu rời độc lập — đúng phạm vi "luyện nghe từng câu"; **không** được trình
bày như bài đọc/hội thoại liền mạch (đúng cảnh báo trong quy chuẩn).

## 5. Kết luận: DÙNG CÓ ĐIỀU KIỆN

Kho này dùng được cho phần luyện nghe từng câu theo ngữ pháp, với các điều kiện bắt buộc:

1. **Ghi công đầy đủ** tại nơi hiển thị học liệu và/hoặc trang ghi công của dự án, gồm tối
thiểu: tên nguồn "hsk-sentences-audio (no7z)" + link repo; dòng "Dữ liệu câu theo giấy
phép CC BY-SA 4.0; nghĩa từ và Pinyin từng từ bắt nguồn từ CC-CEDICT (CC BY-SA 4.0);
audio tổng hợp bằng CosyVoice2 (Apache-2.0), giữ thông báo bản quyền của mô hình".
2. **ShareAlike**: phần học liệu dẫn xuất từ dataset (câu đã chọn + Pinyin + bản dịch tiếng
Việt do dự án bổ sung gắn trên các câu đó) phải được phát hành kèm giấy phép
**CC BY-SA 4.0 cho chính phần đó**, tách bạch rõ với nội dung tự biên soạn khác của dự án.
Nếu dự án không chấp nhận điều kiện này cho một bài cụ thể thì không lấy dữ liệu của repo
cho bài đó (chỉ còn phương án tự biên soạn câu + TTS riêng).
3. **Nhãn giọng**: hiển thị "Giọng tổng hợp" (đúng bản chất CosyVoice2 và đúng khuyến nghị
của nguồn); không ghi "giọng người thật/bản xứ" trong bất kỳ trường hợp nào.
4. **Không tin thẻ ngữ pháp máy**: thẻ chỉ để tìm ứng viên. Riêng mẫu 是： thẻ 1-36 trống
(0 câu) — phải lọc theo nội dung và đọc xác nhận từng câu như mục 3. Mọi mẫu khác cũng
phải kiểm tra độ phủ thẻ tương tự trước khi dùng (chỉ 70/413 điểm có quy tắc tự động).
5. **Nghe kiểm trước khi phát hành**: mỗi câu được chọn phải được nghe thử thật, đối chiếu
phát âm từ đa âm và khớp văn bản; câu lỗi thì loại, không sửa audio của nguồn.
6. **Ghim phiên bản**: ghi commit `857dfbab91027ebd97df01260e91b817cb6b4854` vào metadata
học liệu; không tự động cập nhật theo repo khi repo thay đổi.
7. **Đối chiếu cấp độ theo catalogue của dự án**, không theo nhãn cấp của repo (repo lệch
hệ quy chiếu ~1% theo tự thừa nhận của tác giả).

Không có điều kiện nào ở trên bị vi phạm bởi thiết kế dự án hiện tại, nên không cần chuyển
sang phương án dự phòng (tự biên soạn câu + TTS của dự án) cho các mẫu mà kho này phủ tốt;
phương án dự phòng vẫn áp dụng cho mẫu/câu nào không qua được điều kiện 4–5.
