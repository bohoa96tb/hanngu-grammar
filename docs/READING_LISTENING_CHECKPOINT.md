# Checkpoint — luồng Đọc & nghe vận dụng

Quy chuẩn bắt buộc: `docs/READING_LISTENING_STANDARD.md` (D31).
Checkpoint này chỉ theo dõi LUỒNG ĐỌC/NGHE; checkpoint chung của
dự án là `docs/checkpoint.json` (luồng ngữ pháp vẫn tiếp tục ở
đó — khi Hoa chỉ nói "tiếp tục" thì theo checkpoint chung, không
tự chuyển sang luồng này).

Cập nhật lần cuối: 2026-10-31.

## Trạng thái hiện tại

- APP-01 (D30, build 20261031-app1, PR #23) đã phát hành: cơ chế
  `data/applied/<lesson-id>.json` + tiến độ `progress.applied` +
  mục "Đọc & nghe vận dụng" (tab Đọc/Nghe), mặc định `link_only`.
  Pilot 3 bài dùng Mandarin Bean (dẫn link): `shi-noun-link`
  (Bài 01), `bu-mei-negation` (Bài 16), `le-completion-change`
  (Bài 21). QA độc lập đạt 18/18 đáp án đối chiếu nguồn thật;
  nghiệm thu live đạt. Chi tiết: `docs/applied-reading-listening.md`,
  `docs/research/applied-materials-pilot.md`.
- 2026-10-31: Hoa phê duyệt quy chuẩn bền vững (tiêu chuẩn này)
  và yêu cầu pilot MỚI chứng minh hai luồng trong app:
  (1) đọc + nghe nguyên bài từ nguồn có quyền sử dụng phù hợp
  (ưu tiên Storybooks); (2) luyện nghe câu đúng cấu trúc, có dịch
  tiếng Việt và nhãn giọng tổng hợp nếu dùng TTS.

## Pilot theo quy chuẩn mới (2026-10-31) — ĐÃ TRIỂN KHAI, chờ phát hành

- [x] Khảo sát Storybooks: giấy phép theo TỪNG truyện (CC BY
      hoặc CC BY-NC, không đồng nhất); audio phòng thu UBC,
      người đọc zh Zhuo Sun; bộ audio chỉ có 40 truyện; kho
      GitHub gsn-audio là placeholder, dữ liệu thật ở GitLab.
      → `docs/research/storybooks-survey.md`
- [x] Kiểm toán hsk-sentences-audio: DÙNG CÓ ĐIỀU KIỆN — dataset
      + audio CC BY-SA 4.0, giọng tổng hợp CosyVoice2, thẻ ngữ
      pháp của mẫu 是 có 0 câu nên phải chọn thủ công.
      → `docs/research/hsk-sentences-audio-audit.md`
- [x] Chọn pilot: `shi-noun-link` (HSK1 Bài 01) + truyện 0089
      和植物聊天的卡莱 (CC BY 4.0, 2 câu 是 đích, audio toàn bài
      + theo đoạn). Nói thẳng: không truyện nào trong 23 truyện
      đã đọc vừa sức HSK1 mà giàu câu 是 — truyện này dài 290 chữ,
      dùng ở chế độ có hỗ trợ đầy đủ (Pinyin/dịch/tô sáng/từ hỗ
      trợ), câu hỏi không kiểm tra từ vựng khó.
- [x] Schema applied v2 + validator + trình phát trong app
      (một Audio dùng chung, tốc độ, ẩn lời ở tab Nghe, luyện
      nghe câu có nhãn Giọng tổng hợp) + khóa stamp chống đáp án
      tiến độ v1 gắn nhầm sang câu hỏi v2.
- [x] QA độc lập ĐẠT CÓ ĐIỀU KIỆN → sửa Q-1 + H-1 + H-2 → phúc
      tra 3/3 ĐẠT. Harness 39/39.
      → `docs/reviews/qa-reading-listening-pilot.md`
- [ ] Phát hành: PR + CI + merge + nghiệm thu live (đang thực
      hiện; cập nhật mục này ngay khi có bằng chứng live).

## Bài đã có học liệu

| Bài | Đọc | Nghe | Nghe câu | Kiểu | Ghi chú |
|---|---|---|---|---|---|
| shi-noun-link (HSK1·01) | ✓ TRONG APP | ✓ TRONG APP (chung truyện, ẩn lời ban đầu) | ✓ 5 câu | in_app, Storybooks 0089 (CC BY 4.0) + câu hsk-sentences-audio (CC BY-SA 4.0, giọng tổng hợp) | Từ pilot D31 (build 20261031-rl1); Mandarin Bean "A Happy Day" còn ở thẻ đọc thêm dẫn link |
| bu-mei-negation (HSK1·16) | ✓ link | ✓ link (chung bài) | — | link_only, Mandarin Bean "Visiting Sister" | |
| le-completion-change (HSK1·21) | ✓ link | ✓ link (chung bài) | — | link_only, Mandarin Bean "Mother's Day" | |

## Bài thiếu / chưa có bài phù hợp

- Toàn bộ bài còn lại (69/72 bài) chưa có bản ghi học liệu —
  mục bị ẩn theo cơ chế APP-01; mở rộng chờ Hoa duyệt pilot.
- (Bổ sung tại đây mỗi khi một bài được khảo sát nhưng không tìm
  được học liệu phù hợp, kèm lý do cụ thể.)

## Lỗi / giới hạn còn mở

- Audio của 3 bài pilot nằm tại trang nguồn; loại giọng "chưa
  xác minh" (nguồn không ghi rõ) — không tuyên bố giọng người
  thật/bản xứ.
- Kiểm chứng phát audio thiết bị thật: theo trạng thái chung của
  dự án (AUD-TTS-01 vẫn not_run cho TTS trình duyệt).

## Bước tiếp theo

Hoàn thành hai khảo sát nguồn ở trên, chọn pilot và triển khai;
xong pilot thì dừng, báo cáo để Hoa duyệt kết quả thực tế trước
khi mở rộng.
