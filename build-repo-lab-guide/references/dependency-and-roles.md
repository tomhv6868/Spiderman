# Lập kế hoạch phụ thuộc và phân công vai trò

Đối với **mỗi nhiệm vụ**, ghi rõ các thông tin sau:

- **Đầu vào (Inputs):** Những tệp, dữ liệu hoặc kết quả cần có trước khi bắt đầu.
- **Công việc thực hiện (Actions):** Những việc cần làm.
- **Đầu ra (Outputs):** Kết quả hoặc tệp được tạo/chỉnh sửa.
- **Người phụ trách (Owner):** Thành viên hoặc vai trò chịu trách nhiệm chính.
- **Người sử dụng kết quả (Consumers):** Những nhiệm vụ hoặc thành viên sẽ sử dụng đầu ra này.
- **Cách kiểm tra (Validation):** Cách xác minh nhiệm vụ đã hoàn thành đúng.
- **Thời gian ước tính (Estimated Minutes):** Thời gian dự kiến hoàn thành.

---

# Xác định công việc song song và tuần tự

Chỉ đánh dấu **có thể thực hiện song song** khi **đồng thời thỏa mãn tất cả** các điều kiện sau:

- Không phụ thuộc vào đầu ra của nhiệm vụ khác.
- Không chỉnh sửa cùng một tệp.
- Không sử dụng chung một điểm tích hợp (integration surface).
- Không cần chờ bước kiểm thử, review hoặc tích hợp.

Ngược lại, **phải thực hiện tuần tự** nếu:

- Cần sử dụng đầu ra của nhiệm vụ trước.
- Có nhiều người cùng chỉnh sửa một tệp.
- Có bước hợp nhất (merge).
- Có bước review.
- Có bước chạy test.
- Có bước nộp bài hoặc tích hợp.

---

# Chia theo giai đoạn (Phase)

Sắp xếp công việc theo từng giai đoạn theo thứ tự từ trên xuống dưới.

Mỗi giai đoạn cần gồm:

- Mục tiêu.
- Các nhiệm vụ.
- Người thực hiện.
- Điều kiện hoàn thành.

Kết thúc mỗi giai đoạn bằng một **Checkpoint**.

Ví dụ:

> **Checkpoint:** Tất cả test của Phase 1 phải thành công trước khi bắt đầu Phase 2.

---

# Quy trình tại điểm tích hợp (Integration Gate)

Khi nhiều nhiệm vụ cần được hợp nhất, thực hiện theo đúng thứ tự:

1. Hoàn thành toàn bộ các nhiệm vụ độc lập.
2. Thu thập hoặc hợp nhất tất cả đầu ra cần thiết.
3. Chỉ định **một người tích hợp (Integrator)** cập nhật tệp hoặc entry point dùng chung.
4. Chạy các bước kiểm tra đã được xác định.
5. Cả nhóm cùng xem xét bằng chứng (test, log, output...).
6. Chỉ bắt đầu giai đoạn tiếp theo khi Checkpoint đạt yêu cầu.

---

# Phân công vai trò

Nếu bài lab có **5 học viên**, hãy điều chỉnh các vai trò dưới đây theo đúng thuật ngữ của repository.

Ưu tiên **phân chia theo tệp hoặc module**, không phân chia theo mô tả công việc chung chung.

| Vai trò | Trách nhiệm |
|----------|-------------|
| Product / Test Architect | Phân tích yêu cầu, thiết kế test, xác định tiêu chí hoàn thành. |
| Tool / Data Engineer | Chuẩn bị dữ liệu, cấu hình, script hoặc công cụ hỗ trợ. |
| Prompt / Policy Engineer | Thiết kế prompt, policy hoặc logic AI (nếu có). |
| Core Integrator | Tích hợp các thay đổi, xử lý entry point và giải quyết xung đột. |
| Observability / Reviewer | Kiểm thử, review, xác minh kết quả và thu thập bằng chứng. |

Nếu repository sử dụng tên vai trò khác, hãy thay thế bằng các vai trò tương ứng trong repository.

---

# Trường hợp số lượng nhiệm vụ ít

Nếu số lượng nhiệm vụ lập trình độc lập **ít hơn số học viên**, hãy tạo thêm các nhiệm vụ có giá trị như:

- Viết hoặc bổ sung test.
- Thu thập bằng chứng thực hiện.
- Review code.
- Refactor.
- Kiểm tra chất lượng.
- Cập nhật tài liệu.
- Xác minh kết quả.
- Chuẩn bị báo cáo.

Mục tiêu là **mọi học viên đều có nhiệm vụ rõ ràng và có thể tạo commit riêng**, đồng thời tránh nhiều người chỉnh sửa cùng một tệp khi không cần thiết.