# Khảo sát nguồn Storybooks Canada / Global Storybooks (pilot đọc–nghe HSK1)

Ngày khảo sát: 2026-10-31. Phạm vi: giấy phép, dữ liệu truyện Mandarin (zh),
audio, và ứng viên pilot cho bài `shi-noun-link` (HSK1 Bài 01 — 是 nối
hai danh từ, "A 是 B"). Mọi khẳng định dưới đây đều từ nguồn đã mở thật
(URL ghi kèm); chỗ nào chưa xác minh được thì ghi rõ "chưa xác minh".

Nguồn đã mở:

- Repo văn bản: https://github.com/global-asp/global-asp (thư mục `zh/`,
  79 file truyện Mandarin; danh sách đầy đủ lưu tại `/tmp/zh-list.json`
  trong phiên khảo sát).
- File LICENSE gốc của repo global-asp (qua GitHub API).
- Trang Downloads của Storybooks Canada:
  https://www.storybookscanada.ca/downloads/
- Trang truyện mẫu: https://www.storybookscanada.ca/stories/zh/0089
- Repo audio GitHub: https://github.com/global-asp/gsn-audio (README).
- Kho audio thật trên GitLab: https://gitlab.com/global-asp/gsn-audio
  (API cây thư mục + tải thử file MP3, đo bằng ffprobe).
- 20 file truyện đã tải sẵn ở `/tmp/sbc/` (agent trước) + 3 file bổ sung
  tải trực tiếp từ raw.githubusercontent.com trong phiên này (0053,
  0098, 0002 — lý do ở mục 2.2).

## 1. Giấy phép — kết luận tách bạch từng loại tài nguyên

### 1.1. Giấy phép mặc định của repo văn bản

LICENSE ở gốc repo `global-asp/global-asp` ghi (toàn văn, file chỉ 120
byte): nội dung của dự án được phát hành theo **Creative Commons
Attribution 4.0 — "except where otherwise noted"** (trừ khi có ghi chú
khác). Ghi chú khác đó nằm trong chính từng file truyện (mục 1.2), nên
**không được áp mặc định CC BY 4.0 cho mọi truyện**.

### 1.2. Giấy phép theo từng truyện — KHÔNG đồng nhất toàn kho

Mỗi file `.md` trong thư mục `zh/` đều có khối credits ở cuối file, gồm
dòng `License:` riêng. Trong 23 file đã đọc (mục 2):

- **CC-BY: 12 file** — 0001, 0004, 0027, 0089, 0095, 0141, 0156, 0210,
  0296, 0327, 0342, 0098.
- **CC-BY-NC: 11 file** — 0002, 0003, 0009, 0030, 0053, 0067, 0112,
  0120, 0129, 0231, 0271.

Trang Downloads của Storybooks Canada xác nhận cùng bức tranh, ở mục
"License": *"All files above are released under a Creative Commons
license (either CC BY or CC BY-NC). Please note the license version and
terms before reusing these files."* — tức chính nhà cung cấp cũng yêu
cầu kiểm tra **theo từng file**, không có một giấy phép chung.

Về **phiên bản** (3.0 hay 4.0): file `.md` chỉ ghi loại (`CC-BY` /
`CC-BY-NC`), không ghi phiên bản. Bảng truyện trong README của
gsn-audio (mục 1.4) ghi phiên bản cho từng truyện: phần lớn là **3.0**,
một số là **4.0** (ví dụ 0027, 0089, 0110, 0296). Khi dùng một truyện cụ
thể phải lấy phiên bản theo truyện đó (bảng gsn-audio và/hoặc trang
gốc trên African Storybook), không suy từ LICENSE gốc repo.

### 1.3. Văn bản gốc, bản dịch tiếng Trung, ảnh minh họa

- **Văn bản gốc + bản dịch + ảnh đi theo giấy phép của chính truyện**
  (dòng `License:` trong file). Toàn bộ nội dung truyện gốc đều bắt
  nguồn từ African Storybook (README gsn-audio, mục Acknowledgements:
  "All story content has been derived from the African Storybook").
- **Điều kiện ghi công (CC BY và CC BY-NC đều yêu cầu):** ghi tên tác
  giả văn bản, họa sĩ minh họa, người dịch, kèm tên/đường dẫn nguồn và
  giấy phép. Các tên này có sẵn trong khối credits cuối mỗi file
  truyện (mẫu ở mục 2.3). Bản dịch tiếng Trung là một lớp tác quyền
  riêng: người dịch được ghi riêng (`Translation:`) và **không cố
  định một người** — phần lớn là `dohliam`, một số là `Vicky Liu`
  (0027, 0089, 0141, 0210, 0296), riêng 0098 là `Xingxing (Winny)
  Wang`. Phải chép đúng credits của từng truyện, không dùng một mẫu
  chung.
- Ảnh minh họa được trang truyện phục vụ tại
  `storybookscanada.ca/images/<mã truyện>/<số trang>.jpg` (đã thấy với
  0089: 01.jpg–09.jpg); họa sĩ được ghi công trong file truyện. Khảo
  sát này **chưa** tìm thấy văn bản nào tách giấy phép ảnh ra khỏi
  giấy phép truyện — xử lý thận trọng: coi ảnh thuộc cùng gói giấy
  phép của truyện và luôn ghi công họa sĩ.

### 1.4. Audio — giấy phép đi theo truyện gốc; kho GitHub chỉ là placeholder

- Repo GitHub `global-asp/gsn-audio` **không chứa dữ liệu audio**:
  README của nó ghi rõ "PLACEHOLDER REPO — AUDIO DATA CAN BE FOUND IN
  OUR REPO ON GITLAB" (https://gitlab.com/global-asp/gsn-audio), và
  cây thư mục GitHub chỉ có `README.md` + thư mục `audio/` chứa một
  README. Repo GitHub cũng không có file LICENSE riêng.
- README gsn-audio, mục **License**: *"The audio of each story is
  released under the same Creative Commons license as that of the
  original text… Please note that different licenses (either CC BY or
  CC BY-NC) and license versions (either 3.0 or 4.0) apply to each
  story."* — **audio thừa hưởng đúng giấy phép của truyện gốc**, kể
  cả điều kiện NC nếu truyện là CC BY-NC.
- Kho GitLab không có file LICENSE riêng ở gốc (cây thư mục gốc chỉ có
  README.md và các thư mục ngôn ngữ); điều kiện sử dụng audio dựa vào
  tuyên bố trong README nêu trên + giấy phép của truyện.

### 1.5. Audio có phải giọng người thật không — CÓ căn cứ

README gsn-audio mô tả audio là *"multilingual studio-recorded and
post-processed audio"*, mục Acknowledgements ghi: *"All recordings
done at UBC Studios and mixed and post-processed by Craig Carpenter
of Carpenter Sound Services"*, và có **bảng người đọc theo ngôn ngữ**:
tiếng Trung phổ thông (zh) — **Zhuo Sun**; tiếng Quảng Đông (yue) —
Zoe Lam. Đây là căn cứ đủ để ghi nhãn **"giọng người thật"** cho audio
zh của 40 truyện trong bộ sưu tập (mục 3.1), với ghi công người đọc
Zhuo Sun. Lưu ý: tên người đọc **không** có trong file truyện `.md` —
phải lấy từ bảng này của README gsn-audio khi ghi công.

## 2. Dữ liệu truyện đã tải — bảng phân tích

### 2.1. Cách đếm

- Số chữ Hán: chỉ tính phần thân truyện trong file `.md` (không tính
  tiêu đề, không tính khối credits cuối file).
- "Câu A 是 B xác định": câu có mẫu **danh từ/cụm danh từ + 是 + danh
  từ/cụm danh từ** chỉ danh tính/thuộc tính — đúng cấu trúc bài
  `shi-noun-link` dạy. Các dùng khác của 是 KHÔNG tính vào cột này:
  可是 (nhưng), 是不是 (câu hỏi có–không), 不是…就是…, 是…的 nhấn
  mạnh, 是从… truyền ra, 又是…又是…. Các câu đáng chú ý ngoài mẫu
  được ghi ở cột ghi chú.
- **Cấp độ: cả 23 file đều KHÔNG ghi cấp độ đọc trong file.** File chỉ
  có tiêu đề, thân truyện và khối credits. (Storybooks/African
  Storybook có hệ cấp độ riêng ở phía website của họ; không có trong
  dữ liệu `.md` này và không tương đương HSK — không suy đoán.)

### 2.2. Bảng 20 file đã tải sẵn (/tmp/sbc/) + 3 file bổ sung

3 file bổ sung (0053, 0098, 0002) được tải trong phiên này vì tiêu đề
chúng hứa hẹn nhất cho mẫu 是 （这是我 / 一头奶牛是我的朋友） hoặc rất
ngắn — kết quả thực tế ở cuối bảng, và chúng cho thấy tiêu đề không
đáng tin nếu không đọc thân truyện.

| File | Chữ Hán | GP | Số câu "A 是 B" | Các câu 是 (nguyên văn) / ghi chú | 有 · 这是/那是 |
|---|---|---|---|---|---|
| 0001_一个很高的人 | 122 | CC-BY | 0 | Không có câu 是 nào; toàn bài là mẫu 太…了 / 很 + tính từ | — |
| 0003_校服 | 53 | CC-BY-NC | 1 (biên) | "可是这双鞋子是新的。" — 是 + 新的 (tính từ danh từ hóa, "đôi mới"); còn lại là mẫu 这+量词+名词 太…了 | — |
| 0004_山羊、野狗、和水牛 | 213 | CC-BY | 1 | "山羊、野狗、和水牛是很要好的朋友。" Phần còn lại vượt xa HSK1 （出租车、零钱、找钱、逃走…) | 有一天…; 没有带零钱… |
| 0009_我的小猫猫在哪儿 | 61 | CC-BY-NC | 0 | 6 câu "是不是在…？" — mẫu câu hỏi 是不是 + vị trí, KHÔNG phải A 是 B | — |
| 0027_决定 | 336 | CC-BY | 0 | Chỉ có "不是成天…，就是…" (mẫu HSK cao hơn); văn bản khó, chủ đề làng xã | 只有一个水龙头; 有小偷 |
| 0030_感情 | 77 | CC-BY-NC | 0 | Không có 是； mẫu chính: 当…的时候，我感到… | 感到很有趣 (có = cảm thấy) |
| 0067_做菜 | 59 | CC-BY-NC | 0 | Không có 是； toàn bài là mẫu 把 + động tác nấu ăn | — |
| 0089_和植物聊天的卡莱 | 290 | CC-BY | **2** | "这是卡莱。" · "在肯尼亚当地方言里，这个名字是"美好事物"的意思。" | **这是卡莱。** |
| 0095_赞玛很棒 | 185 | CC-BY | 1 | "妈妈说："你是我的晨星"。" Ngoài ra: "是我让阳光透进来。" （是… nhấn mạnh, không phải nối danh từ) và "我最喜欢做的是玩玩玩！" | — |
| 0112_我的身体 | 43 | CC-BY-NC | 0 | Không có 是 nối danh từ; mẫu chính: 让我能… / 可是总不能让我飞 | — |
| 0120_头发 | 58 | CC-BY-NC | 0 | Không có 是 | "图丽有一头短发。" · "安娜有一头长发。" （有 + lượng từ + danh từ) |
| 0129_贪玩的弟弟 | 44 | CC-BY-NC | 0 | Không có 是； chuỗi động tác + "我怎么这么辛苦…" | — |
| 0141_鸡和千足虫 | 439 | CC-BY | **2** | "鸡和千足虫是好朋友，但是它们又互相竞争。" · "看看谁是最棒的球员。" （谁是 + cụm danh từ). Dài nhất trong nhóm, nhiều cấu trúc HSK3+ （把、得 bổ ngữ, 被 động…) | 有一天… |
| 0156_很饿的鳄鱼 | 54 | CC-BY | 0 | Không có 是 | "从前有一条肚子很饿的鳄鱼。" (câu tồn tại 有） |
| 0210_丁吉和奶牛 | 126 | CC-BY | 0 | Không có 是 nối danh từ (chỉ có 但是 trong câu dài) | 有一天，村里来了士兵。· 有个士兵… |
| 0231_气象书 | 28 | CC-BY-NC | 0 | Không có 是； 8 câu thời tiết rất ngắn （天气冷。下雨。打雷。) | — |
| 0271_两个 | 43 | CC-BY-NC | 0 | Không có 是； mẫu 两只…用来… | 还有两只小手用来抱抱！ |
| 0296_卖香蕉的汤姆 | 239 | CC-BY | 0 | Không có A 是 B (chỉ 但是/没有…); truyện dài, nhiều từ thị trường | 有一个妇女… |
| 0327_数数动物 | 95 | CC-BY | 0 | Không có 是； đếm số + lượng từ động vật | "这里有三头水牛和四只鸟…" · "水中…也有九条鱼。" — **lưu ý: thân truyện còn sót chữ phồn thể "斑馬"** (chưa giản thể hóa hết) |
| 0342_惩罚 | 226 | CC-BY | 0 | Chỉ có "拉希姆不是该罚了吗？" (phản vấn); văn bản khó với HSK1 | 有一天，妈妈买了很多水果。 |
| 0053_这是我 *(bổ sung)* | ~64 | CC-BY-NC | 3 (dạng 这是/号码是） | "这是我的照片。" · "这是我家人的照片。" · "我的电话号码是(033) 342-6587。" — nhiều câu 是 nhất, nhưng **không có audio** (mục 3.1) và GP là NC | 这是 ×2 |
| 0098_一头奶牛是我的朋友 *(bổ sung)* | ~35 | CC-BY | 0 trong thân truyện | Tiêu đề là A 是 B nhưng **thân truyện không có câu 是 nào** (4 dòng thơ rời, không dấu câu đầy đủ) — không dùng được làm bài đọc liền mạch | 妈妈有个漂亮的包 |
| 0002_看看农场里的动物 *(bổ sung)* | ~57 | CC-BY-NC | 0 | Không có 是； mẫu tiếng kêu động vật "母牛"哞哞"叫。" | — |

### 2.3. Mẫu credits trong chính file (chép nguyên văn khối cuối file)

Cả 23/23 file đều có khối credits ở cuối, đủ 5 dòng: License, Text,
Illustration, Translation, Language. Ba mẫu đại diện:

**0001_一个很高的人.md**

```
* License: [CC-BY]
* Text: Cornelius Gulere
* Illustration: Catherine Groenewald
* Translation: dohliam
* Language: zh
```

**0089_和植物聊天的卡莱.md**

```
* License: [CC-BY]
* Text: Ursula Nafula
* Illustration: Jesse Pietersen
* Translation: Vicky Liu
* Language: zh
```

**0027_决定.md**

```
* License: [CC-BY]
* Text: Ursula Nafula
* Illustration: Vusi Malindi
* Translation: Vicky Liu
* Language: zh
```

Nhận xét: khối credits này đủ để dựng phần ghi công trong app (tác
giả, họa sĩ, dịch giả, giấy phép) cho **văn bản và ảnh**; riêng
**người đọc audio không có trong file** — phải bổ sung từ README
gsn-audio (zh: Zhuo Sun, thu tại UBC Studios).

## 3. Audio — kiểm chứng file thật trên GitLab

### 3.1. Phạm vi bộ audio

Bộ audio phòng thu chỉ gồm **40 truyện** (đúng danh sách ID trong
README gsn-audio). Cây thư mục `zh/` trên GitLab có đúng 40 thư mục
truyện: 0001, 0002, 0003, 0004, 0006, 0008, 0009, 0027, 0030, 0052,
0066, 0067, 0072, 0087, 0089, 0095, 0110, 0111, 0112, 0120, 0129,
0141, 0156, 0158, 0201, 0210, 0231, 0234, 0243, 0262, 0271, 0291,
0294, 0296, 0302, 0315, 0324, 0327, 0337, 0342.

Hệ quả thực tế:

- Cả **20/20 file đã tải sẵn đều nằm trong bộ 40** → đều có thư mục
  audio zh tương ứng trên GitLab.
- **0053_这是我 và 0098_一头奶牛是我的朋友 KHÔNG có audio** (không có
  thư mục zh/0053, zh/0098 trên GitLab) — đã kiểm tra trực tiếp cây
  thư mục, không phải suy đoán. Hai truyện này chỉ dùng được ở chế độ
  đọc (hoặc dẫn link), không đạt luồng "đọc + nghe nguyên bài".
- Cấu trúc thật trên GitLab khác mô tả trong README: thư mục ngôn ngữ
  nằm ở **gốc repo** (không có tiền tố `audio/`); mỗi truyện có một
  file MP3 toàn bài + thư mục `mp3/` chứa file cắt theo trang.

### 3.2. Kiểm chứng cụ thể 3 truyện （是 nhiều nhất / ngắn nhất)

Đã kiểm tra cây thư mục chi tiết và gửi yêu cầu tải thật (HTTP 200)
tới từng URL dưới đây; hai file toàn bài được tải xuống và đo bằng
ffprobe.

**0089 和植物聊天的卡莱** (2 câu A 是 B, CC-BY) — CÓ audio:

- Toàn bài:
  `https://gitlab.com/global-asp/gsn-audio/-/raw/master/zh/0089/zh-0089_khalai.mp3`
  — tải thật được 1.263.994 byte, MP3, **thời lượng 132,8 giây
  (≈ 2 phút 13 giây)**.
- Theo trang: `zh/0089/mp3/01.mp3` … `09.mp3` (9 file; file 01 đo
  được 4,5 giây — trang tiêu đề). Cùng mẫu URL raw như trên.

**0141 鸡和千足虫** (2 câu A 是 B, CC-BY) — CÓ audio:

- Toàn bài:
  `https://gitlab.com/global-asp/gsn-audio/-/raw/master/zh/0141/zh-0141_chicken.mp3`
  — HTTP 200 khi kiểm tra. Theo trang: `zh/0141/mp3/01.mp3` …
  `13.mp3` (13 file). (Chưa tải toàn bài xuống đo thời lượng trong
  phiên này — ghi rõ để phiên sau đo trước khi nhập dữ liệu.)

**0003 校服** (ngắn nhất trong số có câu 是 — 53 chữ, CC-BY-NC) — CÓ
audio:

- Toàn bài:
  `https://gitlab.com/global-asp/gsn-audio/-/raw/master/zh/0003/zh-0003_clothes.mp3`
  — tải thật được, **thời lượng 33,5 giây**. Theo trang:
  `zh/0003/mp3/01.mp3` … `09.mp3`.

Ngoài ra, trang Downloads của Storybooks Canada cũng cung cấp gói
audio Mandarin tải về (mục Audio → "Mandarin", liên kết trỏ sang
GitHub gsn-audio) — khớp với kho GitLab ở trên.

### 3.3. Ý nghĩa kỹ thuật cho pilot

- File cắt theo trang (`mp3/01.mp3`…) cho phép làm "nghe từng
  trang/đoạn" bằng file thật — **không cần bịa timestamp**; mỗi đoạn
  trong file `.md` ứng với một trang. Cần đối chiếu số đoạn trong
  `.md` với số file cắt khi nhập (0089: 8 đoạn thân truyện, 9 file
  cắt — file đầu là trang bìa/tiêu đề).
- Định dạng đồng nhất MP3, tải trực tiếp qua URL raw của GitLab;
  quyết định "lưu trong dự án hay dẫn link" phải theo giấy phép từng
  truyện (mục 1) và quy chuẩn READING_LISTENING_STANDARD.

## 4. Khuyến nghị pilot cho bài `shi-noun-link` (HSK1 Bài 01 — A 是 B)

### 4.1. Nói thẳng về bức tranh chung

**Không có truyện nào trong 23 truyện đã đọc đạt đồng thời cả hai
tiêu chí "toàn văn vừa sức HSK1" và "nhiều câu A 是 B".** Truyện ngắn,
dễ thì mẫu 是 hoặc vắng mặt, hoặc chỉ có 1 câu; truyện có 2 câu 是
đúng mẫu (0089, 0141) thì toàn văn dài và chứa nhiều từ/cấu trúc vượt
HSK1. Đây là đặc tính của kho truyện thiếu nhi dịch (văn kể chuyện ít
dùng câu danh tính 是） — không phải do chọn thiếu truyện: đã đọc toàn
bộ 20 file có sẵn và rà thêm các tiêu đề hứa hẹn nhất trong danh sách
79 file zh (0053, 0098, 0002).

### 4.2. Khuyến nghị chính: 0089 和植物聊天的卡莱 (Khalai talks to plants)

Dùng cho pilot `shi-noun-link`, với các căn cứ đã xác minh:

- **Giấy phép sạch nhất trong các ứng viên: CC-BY** (phiên bản 4.0
  theo bảng gsn-audio) — cho cả văn bản, bản dịch và audio; không vướng
  điều kiện NC. Credits đầy đủ trong file: Text — Ursula Nafula;
  Illustration — Jesse Pietersen; Translation — Vicky Liu; người đọc
  audio — Zhuo Sun (README gsn-audio).
- **Có đúng 2 câu A 是 B dùng đúng nghĩa danh tính**, trong đó câu mở
  đầu là mẫu giới thiệu chuẩn HSK1: "这是卡莱。" và "这个名字是"美好
  事物"的意思。" — chỉ rõ được cấu trúc mục tiêu nằm ở câu nào, nghĩa
  gì, đúng yêu cầu của quy chuẩn.
- **Audio giọng người thật đầy đủ**: file toàn bài 2 phút 13 giây +
  file cắt theo trang (mục 3.2) → đạt cả luồng đọc và luồng nghe
  nguyên bài, và nghe lại từng trang không cần timestamp.
- Nội dung lành mạnh, cấu trúc kể rõ ràng (một nhân vật, chuỗi hành
  động lặp theo ngày), phù hợp làm bài đọc vận dụng đầu tiên.

**Điều kiện/cảnh báo khi dùng (không được bỏ qua):** toàn văn 290 chữ
Hán, **vượt sức đọc độc lập của người học HSK1** (danh sách từ khó ở
mục 4.4). Pilot nên dùng truyện này ở chế độ đọc/nghe **có hỗ trợ**
(Pinyin, dịch Việt, tô sáng cấu trúc mục tiêu — đúng thiết kế §3 của
quy chuẩn), câu hỏi chỉ xoay quanh nội dung chính và 2 câu 是 mục
tiêu; không dùng truyện này để kiểm tra từ vựng. Nếu tiêu chí "vừa
sức HSK1" được đặt cao hơn tiêu chí giấy phép/độ phủ cấu trúc, xem
phương án thay thế ở 4.3 — và chấp nhận đánh đổi tương ứng.

### 4.3. Phương án thay thế và các ứng viên bị loại (kèm lý do)

- **0003 校服 (School clothes)** — phương án thay thế nếu ưu tiên độ
  ngắn/dễ: chỉ 53 chữ, mẫu câu lặp rất đều, audio toàn bài 33,5 giây
  + cắt theo trang. Đánh đổi: chỉ có **1 câu 是** và là dạng biên
  ("这双鞋子是新的。" — 是 + 新的）; giấy phép **CC-BY-NC** → theo
  chính sách đã phê duyệt, chỉ lưu trong dự án khi đã xác nhận cách
  dùng đáp ứng điều kiện phi thương mại, chưa xác nhận thì dẫn link
  + đánh dấu "cần kiểm tra". Từ vựng trang phục phần lớn là HSK2
  （裙子、毛衣、皮带、袜子、书包）.
- **0053 这是我** — nhiều câu 是 nhất (3 câu, gồm "这是我的照片。",
  "我的电话号码是…") nhưng **không có audio phòng thu** và GP
  CC-BY-NC → không đạt luồng đọc + nghe nguyên bài; chỉ cân nhắc cho
  phần đọc bổ trợ về sau.
- **0141 鸡和千足虫** — 2 câu 是 đúng mẫu, CC-BY, có audio; bị loại
  khỏi pilot HSK1 vì **439 chữ** và mật độ cấu trúc HSK3+ cao （把、
  得 bổ ngữ, 极了, 无理取闹…) — để dành khi làm HSK2/HSK3.
- **0095 赞玛很棒** — CC-BY, có audio, nhưng câu A 是 B duy nhất là ẩn
  dụ trong lời thoại ("你是我的晨星" — "con là ngôi sao mai của mẹ"),
  không phải câu danh tính mẫu mực cho bài đầu tiên.
- **0098 一头奶牛是我的朋友** — loại: tiêu đề gây hiểu lầm, thân
  truyện không có câu 是 nào và không liền mạch.

### 4.4. Từ khó vượt HSK1 trong truyện khuyến nghị (0089)

Từ/cấu trúc người học HSK1 chưa có (cần gloss hoặc dịch hỗ trợ; không
đưa vào câu hỏi kiểm tra):

肯尼亚 (Kenya), 当地， 方言， 美好， 事物， 橙子， 橙子树， 醒来，
跟…说 （跟 ở vai giới từ), 草地， 绿油油， 干枯， 野花， 尽情， 开放，
夹， 操场， 中间， 长出， 枝叶， 树荫， 附近， 灌木丛， 壮壮的，
坏人， 叹（一口气）, 或许， 一只 (lượng từ 只 — HSK2), 结（橙子）
trong "结橙子了吗", 还是 trong "橙子还是绿色的".

Phần lõi HSK1 người học đã có: 这是， 她， 今年， 七岁， 名字， 意思，
早上， 去， 上学， 路上， 学校， 回家， 问， 明天， 再， 看看， 给，
大， 甜， 好多.

### 4.5. Gợi ý cho các bài HSK1 khác (ghi lại để dùng sau, chưa triển khai)

- 0009 我的小猫猫在哪儿 (CC-BY-NC, có audio): 6 câu "是不是在…？" +
  từ vị trí （床底下、上面、后面、旁边、里面、外面） — ứng viên cho
  bài vị trí/câu hỏi 是不是.
- 0120 头发 (CC-BY-NC, có audio): "图丽有一头短发。/安娜有一头长
  发。" — ứng viên cho bài 有.
- 0327 数数动物 (CC-BY, có audio): câu tồn tại "这里有…" + đếm
  số/lượng từ động vật — ứng viên cho bài số đếm/tồn tại; **phải xử
  lý chữ phồn thể sót "斑馬" → "斑马" trước khi dùng** (và kiểm tra
  lại sau chuyển đổi theo quy chuẩn).
- 0156 很饿的鳄鱼 (CC-BY, có audio): "从前有一条…鳄鱼。" — câu tồn
  tại mở đầu truyện, rất ngắn (54 chữ).

## 5. Giới hạn của khảo sát này

- Mới đọc 23/79 file zh (20 có sẵn + 3 bổ sung theo tiêu đề); 56 file
  còn lại chưa đọc thân truyện — kết luận "không có truyện nào đạt cả
  hai tiêu chí" chỉ chắc chắn trong phạm vi 23 file đã đọc và các
  tiêu đề còn lại không hứa hẹn mẫu 是 hơn (chưa kiểm chứng từng
  thân truyện).
- Thời lượng audio 0141 chưa đo (mới xác nhận HTTP 200); cần đo
  trước khi nhập dữ liệu nếu dùng truyện này.
- Chưa xác minh được trang truyện trên storybookscanada.ca có hiển
  thị trình nghe trực tiếp hay không (bản trích văn bản trang 0089
  không cho thấy phần tử audio/credits) — không ảnh hưởng kết luận vì
  file audio đã xác minh trực tiếp trên GitLab.
- Phiên bản giấy phép (3.0/4.0) của **văn bản** lấy theo bảng
  gsn-audio; khi nhập một truyện cụ thể nên đối chiếu thêm trang gốc
  African Storybook của truyện đó.
