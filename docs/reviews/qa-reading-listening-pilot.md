# QA độc lập — Pilot Đọc & nghe schema v2 (bài shi-noun-link)

Ngày QA: 2026-10-31. Đối tượng: `data/applied/shi-noun-link.json`
(schema_version 2), `assets/applied/` (sbc-0089 + hsa), hỗ trợ v2
trong `scripts/validate.py`, `app.js`, `styles.css`,
`tests/browser-check.mjs`. Căn cứ: `docs/READING_LISTENING_STANDARD.md`,
`docs/READING_LISTENING_CHECKPOINT.md`, file nguồn
`/tmp/sbc/0089_和植物聊天的卡莱.md`,
`docs/research/storybooks-survey.md`,
`docs/research/hsk-sentences-audio-audit.md`. QA tự kiểm từ nguồn
gốc, không dùng lại kết quả của agent Nội dung/Code.

## Phán quyết: ĐẠT CÓ ĐIỀU KIỆN

Điều kiện: sửa lỗi Q-1 (Quan trọng) trước khi phát hành. Không có
lỗi Nghiêm trọng. Nội dung truyện, bản dịch, Pinyin, audio, giấy
phép và toàn bộ kiểm thử hệ thống đều đạt.

## Danh sách lỗi

### Q-1 [Quan trọng] — Đáp án tiến độ v1 bị gắn nhầm sang câu hỏi v2

- Vị trí: `app.js` — `appliedStateFor()` (dòng ~1036) và
  `appliedPanelHTML()`/`renderApplied()` (dòng ~1247–1335).
- Bằng chứng: tiến độ applied lưu theo **chỉ số câu hỏi**:
  `st.answers[qi] = { pick, ok }`, `norm()` chỉ chuẩn hoá
  `{answers, done}`. Toàn app.js không có cơ chế khóa theo phiên
  bản/nội dung học liệu (`schema_version` chỉ dùng để chọn cách
  render ở dòng 1251; `checked_date` không hề được đọc).
- Hệ quả thật: người dùng đã làm pilot APP-01 (v1) ở bài này có
  `progress.applied["shi-noun-link"]` với đáp án của bộ câu hỏi
  truyện Mandarin Bean "A Happy Day". Khi mở bản v2, các đáp án đó
  được hiển thị trên bộ câu hỏi Storybooks hoàn toàn khác: lựa
  chọn cũ được tô sáng, phản hồi được dựng lại bằng
  `appliedFeedbackHTML(q, saved)` — tức hiển thị "✓ Đúng rồi" kèm
  giải thích của câu hỏi MỚI dựa trên cờ `ok` của câu hỏi CŨ, và
  cờ `done` ("đã đọc/nghe xong") cũng mang sang dù người học chưa
  hề đọc truyện mới. Đây là trạng thái hoàn thành/đúng–sai giả,
  trái nguyên tắc trung thực của quy chuẩn (§3, §5).
- Phạm vi ảnh hưởng: chỉ tiến độ applied của đúng bài pilot này
  (3 câu đọc + 3 câu nghe); tiến độ ngữ pháp/FSRS không bị đụng.
  Vì vậy không xếp Nghiêm trọng, nhưng phải sửa trước phát hành
  vì người dùng thật của APP-01 đã có dữ liệu này.
- Cách khắc phục tối thiểu (đề xuất, QA không tự sửa): gắn khóa
  nội dung vào state, ví dụ lưu
  `progress.applied[lessonId].key = schema_version + "|" + checked_date`
  (hoặc hàm băm danh sách prompt câu hỏi) khi render; nếu khóa đã
  lưu khác khóa hiện tại thì đặt lại `answers`/`done` của bài đó
  trước khi dùng. Người dùng chỉ mất tiến độ applied của một bài
  pilot, giữ nguyên mọi tiến độ khác.

### H-1 [Hoàn thiện] — `rights.basis_vi` nói quá mức căn cứ phiên bản giấy phép

- Vị trí: `data/applied/shi-noun-link.json` → `reading.material.rights.basis_vi`.
- Văn bản dữ liệu viết "Giấy phép CC BY 4.0 ghi trong chính file
  truyện (khối credits cuối file 0089)…", nhưng khối credits trong
  file 0089 chỉ ghi `License: [CC-BY]` — **không có số phiên bản**.
  Phiên bản 4.0 lấy từ bảng truyện của README gsn-audio (khảo sát
  `storybooks-survey.md` §1.2 và §5 ghi đúng mức này). Kết luận
  giấy phép "CC BY 4.0" vẫn có căn cứ, nhưng câu basis gán sai nơi
  ghi phiên bản. Nên sửa basis_vi thành: file truyện ghi CC-BY;
  phiên bản 4.0 theo bảng gsn-audio.

### H-2 [Hoàn thiện] — Ghi chú giấy phép luyện nghe câu thiếu "(Apache-2.0)" của CosyVoice2

- Vị trí: `listening.sentence_practice.license_note_vi`.
- Ghi chú đã có: nguồn no7z, CC BY-SA 4.0, CC-CEDICT (CC BY-SA
  4.0), "audio tổng hợp bằng CosyVoice2", và việc bản dịch Việt
  phát hành theo CC BY-SA 4.0 (đúng điều kiện ShareAlike). Tuy
  nhiên điều kiện ghi công số 1 trong
  `hsk-sentences-audio-audit.md` §5 yêu cầu dòng ghi công nêu
  "CosyVoice2 (Apache-2.0)" kèm giữ thông báo bản quyền của mô
  hình — ghi chú hiện tại không nhắc Apache-2.0. Nên bổ sung.

## Ghi nhận (không phải lỗi)

- Dấu ngoặc kép: file nguồn `.md` dùng dấu `"` thẳng; dữ liệu đã
  chuẩn hoá thành “…” cong. Chỉ đổi ký tự trích dẫn, không đổi
  một chữ nào — chấp nhận được.
- Đoạn cuối (trang p09): dấu mở ngoặc kép nằm ở câu 2, dấu đóng ở
  câu 3 (câu 3 không có dấu mở) — đúng cấu trúc nguyên văn (lời
  thoại kéo dài hai câu), chỉ hơi lạ khi hiển thị tách câu.
- 树荫 đọc **shùyìn** trong dữ liệu: khớp CC-CEDICT
  (树荫 shu4 yin4 — tra cứu CC-CEDICT/HSK东西词典 trong phiên QA).
  Một số từ điển/đài phát khác ghi shùyīn; bản dữ liệu theo
  CC-CEDICT là có căn cứ, giữ nguyên.
- Câu luyện nghe hsk1-0023 gồm hai mệnh đề A 是 B song song
  （他是我弟弟，她是我姐姐。) — vẫn thuần mẫu A 是 B, khớp nhận
  xét §3.3 của bản kiểm toán nguồn.

## Phần 1 — Nội dung truyện (đối chiếu file nguồn từng câu)

- Văn bản zh: đủ **8 đoạn**, đúng thứ tự, **không sửa lời** —
  đối chiếu từng câu với `/tmp/sbc/0089_和植物聊天的卡莱.md`:
  khớp nguyên văn (trừ chuẩn hoá dấu ngoặc kép nêu trên). Tổng
  290 chữ Hán, khớp nhãn "Khoảng 290 chữ Hán". Câu nguồn
  "一只…橙子" được giữ nguyên, không tự sửa lượng từ.
- Tách câu: 18 câu (3-2-2-2-2-2-2-3 theo đoạn) — hợp lý.
- Câu đích: đúng **2 câu** `target=true` — "这是卡莱。" và
  "在肯尼亚当地方言里，这个名字是“美好事物”的意思。"；
  "她今年七岁。" có `target=false` — đúng.
- Pinyin từng câu: đúng toàn bộ. Các điểm khó đã tra riêng:
  橙子 chéngzi ✓; 结 trong "结好多…橙子" và "你结橙子了吗"
  đọc **jié** ✓; 叹了一口气 tàn le yī kǒu qì ✓; 或许 huòxǔ ✓;
  夹 jiā ✓; 绿油油 lǜyóuyóu ✓; 长得 zhǎng de ✓;
  进不了 jìn bu liǎo ✓; 树荫 shùyìn (xem ghi nhận trên) ✓.
- Dịch Việt từng câu: đúng sự kiện, tự nhiên, không thêm/bớt ý;
  lời thoại dịch đúng người nói (Kalai nói với từng cây/cỏ/hoa).
- vocab_support: đủ 12 từ, gloss Việt đúng cả 12
  （肯尼亚/方言/美好/橙子/醒来/草地/绿油油/干枯/野花/操场/树荫/灌木丛）.
- Câu hỏi đọc (3) và nghe (3): QA tự trả lời như học viên —
  **khóa đúng cả 6**: Đọc 1→Cây cam (đáp án 0), Đọc 2→kẻ xấu
  không vào được trường (2), Đọc 3→quả cam vẫn còn xanh (1);
  Nghe 1→Kalai (0), Nghe 2→mọc xanh mướt, đừng khô héo (2),
  Nghe 3→lại đến xem cây cam (1). Giải thích khớp nội dung
  truyện; không câu nào hỏi kiến thức ngoài truyện.

## Phần 2 — Luyện nghe câu

- Cả 5 item (hsk1-0010, 0012, 0014, 0021, 0023): zh và Pinyin
  **khớp nguyên văn bảng §3.2** của
  `hsk-se
...[truncated 3000 chars]
## Phúc tra (2026-10-31) — vòng sửa Q-1, H-1, H-2

**Kết luận: 3/3 ĐẠT.** Điều kiện của phán quyết "ĐẠT CÓ ĐIỀU KIỆN"
đã được khắc phục; pilot đủ điều kiện phát hành. QA phúc tra tự
đọc mã/dữ liệu và tự chạy harness, không dùng lại số của vòng sửa.

### Q-1 — ĐẠT

- Stamp: `appliedStampFor(data)` (app.js) =
  `schema_version|checked_date|material_id` (thiếu material_id thì
  lấy source_url) của `reading.material`; với dữ liệu hiện tại =
  `2|2026-10-31|sbc-0089`.
- `reconcileAppliedState(lessonId, data)` được `renderApplied()`
  gọi ở câu lệnh đầu tiên, trước khi dựng panel: stamp đã lưu khác
  stamp hiện tại → `reading`/`listening` bị đặt lại thành
  `{answers: {}, done: false}` rồi mới ghi stamp mới +
  `saveProgress()`. Đáp án/done cũ không còn đường nào hiện lên
  giao diện.
- State chưa có stamp: điều kiện đặt lại là
  `st.stamp || schema_version >= 2` — dữ liệu vẫn schema 1 thì giữ
  nguyên tiến độ, chỉ gán stamp; schema ≥ 2 thì đặt lại. Nhánh
  schema ≥ 2 kiểm chứng bằng hành vi thật (harness dưới đây);
  nhánh schema 1 kiểm chứng bằng đọc mã (dữ liệu hiện tại là v2
  nên harness không chạy nhánh này).
- Phạm vi đụng: chỉ `progress.applied[lessonId]`;
  `saveProgress()` chỉ ghi JSON toàn bộ tiến độ xuống localStorage,
  không sửa khóa nào khác. Tiến độ ngữ pháp (`completedLessons`)
  và FSRS không bị đụng.
- Harness do QA tự chạy (máy chủ local cổng 8901 +
  chrome-headless-shell): `applied-stamp-resets-stale-state`
  **PASS** — bằng chứng:
  `{"stamp":"2|2026-10-31|sbc-0089","ans":0,"rDone":false,"lDone":false,"fbEmpty":true,"noSel":true,"doneOff":true}`;
  `applied-stamp-keeps-matching-state` **PASS** —
  `{"kept":true,"fbOk":true}` (đáp án còn, phản hồi "Đúng rồi"
  vẫn hiện). Tổng **39/39 PASS**, 0 lỗi console ở cả hai mốc
  `console-errors` và `applied-console-errors`.

### H-1 — ĐẠT

`rights.basis_vi` mới mô tả đúng ba lớp căn cứ, đối chiếu
`docs/research/storybooks-survey.md` §1: khối credits của file
truyện 0089 chỉ ghi "CC-BY" (không số phiên bản); phiên bản 4.0
lấy từ bảng giấy phép theo truyện trong README gsn-audio (0089
thuộc nhóm 4.0); audio dùng cùng giấy phép với truyện theo README
đó. Không còn gán số phiên bản vào khối credits của file.

### H-2 — ĐẠT

`listening.sentence_practice.license_note_vi` nay có
"CosyVoice2 (Apache-2.0)" và "giữ nguyên thông báo bản quyền của
CosyVoice2". Các phần cũ còn đủ: câu và audio CC BY-SA 4.0,
gloss/Pinyin từ CC-CEDICT (CC BY-SA 4.0), bản dịch tiếng Việt
phát hành theo CC BY-SA 4.0; `voice_label_vi` vẫn là
"Giọng tổng hợp"; `attribution_vi` vẫn ghim commit
857dfbab91027ebd97df01260e91b817cb6b4854 của kho nguồn.

### Kiểm tra cuối

- `python3 scripts/validate.py` → **ĐẠT**: 76 bài, 76 bài
  published, 373 bài tập.
