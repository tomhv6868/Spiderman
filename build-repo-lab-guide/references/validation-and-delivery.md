# Kiểm tra và bàn giao

Trước khi hoàn thành hướng dẫn, hãy tự kiểm tra các điều kiện sau.

## Kiểm tra nội dung

Đảm bảo rằng:

- Mọi tệp được nhắc đến đều **tồn tại trong repository** hoặc được đánh dấu rõ là **NEW FILE**.
- Mỗi tệp mới đều mô tả đầy đủ:
  - Cách tạo.
  - Định dạng hoặc schema.
  - Cách kiểm tra.
  - Kết quả mong đợi.
- Mỗi giai đoạn (Phase) đều có:
  - Nhãn phụ thuộc (Dependency).
  - Checkpoint.
- Mỗi nhiệm vụ đều có đúng bốn phần:
  - Kiến thức.
  - Hướng dẫn.
  - Kết quả mong đợi.
  - Sản phẩm cần nộp.
- Mọi lệnh đều:
  - Đúng với hệ điều hành tương ứng.
  - Được gắn đúng nhãn (Setup, Smoke Run, Automated Test, Contract Validation hoặc Submission/Security Check).
- Không hiển thị khóa bí mật, token, mật khẩu hoặc thông tin nhạy cảm.
- Tệp `docs/CODELAB.md` đã được tạo thành công, không rỗng, bắt đầu bằng YAML frontmatter canonical và sau đó là `:::goal` có hành động dưới **2 phút**.

---

# Kiểm tra Markdown

Đối với hướng dẫn Markdown, kiểm tra:

- YAML frontmatter có đúng 19 field canonical theo đúng thứ tự.
- Không có `# H1` trong body; heading cao nhất của body là `##`.
- Code block được đóng mở đúng.
- Bảng (table) hiển thị đúng.
- Liên kết (link) hợp lệ nếu có.
- Checkbox hiển thị đúng.
- Directive chỉ thuộc `goal`, `checkpoint`, `caution`, `input`, `export`, `os`, `quiz`.
- Mọi `:::input` có `target`; mọi target đó xuất hiện trong `:::export`.
- Heading không chứa emoji; hint/đáp án ẩn dùng `<details><summary>`.
- Không còn:
  - `TODO`
  - `TBD`
  - Placeholder chưa được thay thế trong đầu ra.
  - Đường dẫn hoặc tên tệp được suy đoán.

---

# Kiểm tra thủ công

Nếu một bước kiểm tra không thể thực hiện vì:

- Cần API trả phí.
- Cần thông tin xác thực.
- Cần quyền truy cập đặc biệt.
- Cần dịch vụ hiện không khả dụng.
- Có nguy cơ gây thay đổi dữ liệu.

Thì ghi rõ:

> **Not executed**

và mô tả **chính xác** cách người dùng có thể tự kiểm tra thủ công.

Không giả định rằng bước kiểm tra đã thành công.

---

# Nội dung bàn giao

Phần mở đầu của kết quả phải trình bày theo thứ tự sau:

1. Tên tệp hướng dẫn đã tạo.
2. Định dạng và vị trí lưu tệp.
3. Giai đoạn hiện tại và mô hình phân công nhóm (nếu có).
4. Hành động đầu tiên cần thực hiện.
5. Bước tiếp theo sau khi hoàn thành hành động đầu tiên.
6. Các điểm mâu thuẫn quan trọng đã phát hiện (nếu có).
7. Các assumption hoặc bước kiểm tra chưa được xác minh.

Danh sách các tệp đã sử dụng làm bằng chứng phải được giữ lại trong nội dung của tệp hướng dẫn.
