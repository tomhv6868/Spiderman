# Xác định yêu cầu (Request Resolution)

1. Xác định thư mục gốc của repository bằng lệnh `git rev-parse --show-toplevel`. Nếu đây không phải là Git repository, sử dụng thư mục do người dùng cung cấp.

2. Đầu ra luôn là **Codelab Markdown** tại `docs/CODELAB.md`.
   - Không tạo HTML, MDX hoặc một định dạng song song.
   - Nếu người dùng yêu cầu vị trí khác, chỉ đổi vị trí khi vẫn là một tệp
     Markdown tương thích Codelab.
   - Nội dung hướng dẫn phải được viết **chủ yếu bằng tiếng Việt**, sử dụng ngôn ngữ đơn giản, dễ hiểu cho người mới.
   - Hạn chế sử dụng thuật ngữ tiếng Anh. Chỉ giữ lại các thuật ngữ không có cách dịch phổ biến (ví dụ: Git, HTML, Markdown, JSON, API, terminal). Với các thuật ngữ chuyên môn xuất hiện lần đầu, giải thích ngắn gọn bằng tiếng Việt.

3. Mặc định hướng dẫn dành cho **AI Engineer mới vào nghề**, có kiến thức cơ bản về terminal, Git, JSON và Python hoặc JavaScript nhưng chưa quen nhiều thuật ngữ chuyên ngành.
   - Giải thích các khái niệm quan trọng bằng ngôn ngữ đơn giản.
   - Chỉ sử dụng thuật ngữ kỹ thuật khi cần thiết và giải thích ngắn gọn khi xuất hiện lần đầu.

4. Nếu hướng dẫn có nhiều đầu mục công việc:
   - Chia thành các đầu mục rõ ràng.
   - Gợi ý số lượng thành viên phù hợp cho từng đầu mục nếu repository có đủ thông tin.
   - Nếu không có đủ bằng chứng, không tự suy đoán số lượng thành viên chỉ chia đầu mục cho học viên đọc và tự phân chia

5. Chỉ đặt câu hỏi khi thông tin còn thiếu và ảnh hưởng đáng kể đến chất lượng guide.
   - Gộp tối đa **3 câu hỏi ngắn gọn** trong một lần.
   - Chỉ hỏi về:
     - repository;
     - thời lượng (timebox) hoặc quy mô nhóm;
     - định dạng đầu ra.
   - Nếu mức độ mơ hồ không đáng kể, tiếp tục và ghi rõ các **assumption**.

6. `docs/CODELAB.md` là **artifact** cục bộ. Chỉ tạo nội dung tệp, không tự publish hoặc deploy.
