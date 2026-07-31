# Viết hướng dẫn nhiệm vụ theo thiết kế tập trung

Áp dụng cấu trúc dưới đây như **một lựa chọn giúp người học tập trung hơn**, không suy đoán, chẩn đoán hoặc gán nhãn người học.

Bắt đầu hướng dẫn bằng một thẻ **Bắt đầu ngay (Do Now)**.

Thẻ này chỉ chứa:

- Một hành động cụ thể, an toàn và có thể hoàn thành trong **dưới 2 phút**.
- Kết quả mong đợi sau khi hoàn thành.

---

# Nguyên tắc trình bày

- Mỗi hướng dẫn chỉ chứa **một hành động được đánh số**.
- Mỗi nhóm chỉ có tối đa **5 nhiệm vụ hoặc lựa chọn** đang hiển thị.
- Luôn hiển thị:
  - Giai đoạn hiện tại.
  - Thời gian ước tính.
  - Số nhiệm vụ đã hoàn thành / tổng số nhiệm vụ.
  - **Chính xác một** "Bước tiếp theo".
- Những nội dung không cần xử lý ngay phải được đưa vào phần **Việc để sau (Parking Lot)**.

---

# Khi xảy ra lỗi

Nếu phát hiện lỗi, trình bày theo đúng cấu trúc:

- **Vị trí lỗi:** lỗi xảy ra ở đâu.
- **Kết quả quan sát được:** người học sẽ nhìn thấy gì.
- **Nguyên nhân có khả năng nhất:** chỉ nêu nguyên nhân có bằng chứng hoặc hợp lý nhất.
- **Cách khắc phục an toàn:** đề xuất một cách xử lý đơn giản và ít rủi ro.

Không đưa ra nhiều cách sửa nếu chưa cần thiết.

---

# Thời gian và tiến độ

Đối với mỗi nhiệm vụ:

- Ghi rõ thời gian ước tính.
- Hiển thị rõ các bước đã hoàn thành dưới dạng **thành công đã xác minh** (Visible Wins).

---

# Cấu trúc bắt buộc của mỗi nhiệm vụ

Mỗi nhiệm vụ phải có đúng bốn phần dưới đây.

## 1. Kiến thức

Giải thích ngắn gọn:

- Vì sao cần thực hiện nhiệm vụ.
- Tối đa **3 dòng**.

---

## 2. Hướng dẫn

Bao gồm:

- Đường dẫn tuyệt đối.
- Đường dẫn tương đối trong repository.
- Các lệnh có thể sao chép trực tiếp.
- Các bước kiểm tra.

Khi đường dẫn hoặc cú pháp khác nhau giữa các hệ điều hành, cung cấp riêng cho:

- Windows (PowerShell)
- macOS
- Linux

Chỉ hiển thị khi thực sự có khác biệt.

---

## 3. Kết quả mong đợi

Mô tả ngắn gọn:

- Kết quả quan sát được.
- Định dạng hoặc hình dạng đầu ra mong đợi.

Nếu có nội dung được suy luận thay vì lấy trực tiếp từ repository, phải ghi rõ:

> **Coach inference:** ...

---

## 4. Sản phẩm cần nộp

Chỉ liệt kê những kết quả cần nộp.

Đánh dấu rõ:

- **NEW FILE** nếu là tệp mới.
- **DO NOT COMMIT** nếu không nên đưa vào Git.

---

# Phân loại lệnh

Mỗi khối lệnh phải được gắn đúng một trong các nhãn sau:

- **Thiết lập môi trường (Setup)**
- **Chạy thử (Smoke/Demo Run)**
- **Chạy kiểm thử tự động (Automated Test)**
- **Kiểm tra Contract (Contract Validation)**
- **Kiểm tra trước khi nộp / Bảo mật (Submission / Security Check)**

Không để khối lệnh không có nhãn.