# AGENTS.md — hanngu-grammar

Đọc trước khi làm việc, theo thứ tự:

1. `docs/AGENT_SPEC_CHINESE_GRAMMAR_HSK1-6.md` — đặc tả gốc, là tiêu chuẩn chính.
2. `docs/checkpoint.json` — trạng thái thật hiện tại, task tiếp theo, việc đang dở.
3. `docs/task-board.json` — chỉ làm task có phụ thuộc đã đủ; không làm lại task đã có bằng chứng còn hiệu lực.
4. `docs/requirements.json`, `docs/decisions.md`, `docs/quality-gates.md` — yêu cầu, quyết định đã chốt, cổng kiểm tra.

Quy tắc ngắn gọn:

- Không giảm phạm vi/chất lượng để kịp tiến độ; giảm số bài trong lô, không giảm chất lượng từng bài.
- Không tuyên bố repo đã tạo, đã push hay đã deploy khi chưa có bằng chứng từ công cụ (SHA, URL kiểm tra được).
- Không đưa bí mật, API key vào repo. Không mua dịch vụ trả phí.
- Nội dung chỉ vào bản phát hành sau khi qua validator + rà soát; bản nháp giữ ngoài `data/` đã phát hành hoặc gắn `status: "draft"`.
- Sau mỗi lô hoàn chỉnh: chạy kiểm tra, cập nhật `docs/checkpoint.json`, `docs/task-board.json`, commit (khi repo đã sẵn sàng).
- Khi checkpoint lệch với mã nguồn: đối chiếu diff, sửa trạng thái, không reset mất việc.
- Khi người dùng nhắn “Tiếp tục”: kiểm tra HEAD/trạng thái, đọc checkpoint + task sẵn sàng, làm ngay, không hỏi lại.
