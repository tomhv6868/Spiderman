# Tổng quan: Build Repo Lab Guide

Skill này biến một repository dùng cho bài lab thành hướng dẫn thực hành có thể
thực thi cho học viên AI/backend. Nó không sửa ứng dụng hay triển khai website
trừ khi người dùng yêu cầu rõ ràng.

## Cấu trúc tệp

| Đường dẫn | Vai trò | Khi được dùng |
| --- | --- | --- |
| `SKILL.md` | Điểm vào và workflow điều phối. Chứa các nguyên tắc bắt buộc, rồi quyết định reference/template nào cần đọc. | Mỗi lần skill được gọi. |
| `agents/openai.yaml` | Metadata để giao diện hiển thị tên, mô tả ngắn, prompt mặc định và phạm vi sản phẩm hỗ trợ. | Khi hệ thống nạp/hiển thị skill. Không phải nội dung hướng dẫn lab. |
| `references/request-resolution.md` | Quy tắc xác định repository, format, ngôn ngữ, audience, team size, timebox và khi nào cần hỏi lại. | Bước đầu của mọi yêu cầu. |
| `references/repository-audit.md` | Cách audit repository, ưu tiên nguồn sự thật, lập fact ledger, truy vết contract và tìm mâu thuẫn. | Trước khi viết guide hoặc kết luận về hành vi repo. |
| `references/dependency-and-roles.md` | Cách tách phase, xác định parallel/sequential, checkpoint tích hợp và quyền sở hữu theo tệp. | Khi guide có nhiều bước, nhóm học viên hoặc role. |
| `references/task-writing.md` | Quy tắc viết từng task: cấu trúc focus-friendly và bốn phần Knowledge, Instructions, Expected outcome, Deliverables. | Khi soạn nội dung hướng dẫn. |
| `references/html-output-contract.md` | Contract riêng cho artifact HTML: offline, accessibility, `LAB_CONFIG`, progress, localStorage, focus mode. | Chỉ khi output là interactive HTML. |
| `references/markdown-output-contract.md` | Contract riêng cho artifact Markdown: heading, task sections, checklist, setup, validation và nguồn audit. | Chỉ khi output là Markdown. |
| `references/validation-and-delivery.md` | Checklist kiểm tra artifact và cách báo cáo kết quả cho người dùng. | Sau khi tạo guide, trước khi bàn giao. |
| `templates/lab-guide.html` | Template HTML độc lập, có CSS/JS inline và `LAB_CONFIG` để thay thế dữ liệu của lab mà không viết lại renderer. | Là điểm khởi đầu khi tạo guide HTML. Thay các `{{PLACEHOLDER}}`. |
| `templates/lab-guide.md` | Template Markdown cho một guide có cấu trúc nhất quán. | Là điểm khởi đầu khi tạo guide Markdown. Thay các `{{PLACEHOLDER}}`. |
| `scripts/validate-lab-guide.mjs` | Validator Node cho HTML: kiểm tra thành phần guide tối thiểu và biên dịch JavaScript inline. | Sau khi hoàn thành HTML, nếu Node có sẵn. |
| `README.md` | Tài liệu này: bản đồ package và quy ước mở rộng. | Dành cho người bảo trì skill. |

## Luồng hoạt động

```text
SKILL.md
  ├─ request-resolution.md
  ├─ repository-audit.md
  ├─ dependency-and-roles.md
  ├─ task-writing.md
  ├─ html-output-contract.md ─── templates/lab-guide.html
  │                              └── scripts/validate-lab-guide.mjs
  └─ markdown-output-contract.md ─ templates/lab-guide.md
                 ↓
      validation-and-delivery.md
```

## Thêm reference mới

1. Tạo một file đơn mục đích trong `references/`, chẳng hạn
   `references/api-contracts.md`.
2. Trong `SKILL.md`, thêm điều kiện đọc rõ ràng, ví dụ:

   ```md
   If the repository exposes an HTTP API, read
   [API contracts](references/api-contracts.md) before writing validation.
   ```

3. Trong reference, nêu điều kiện áp dụng, input/evidence cần kiểm tra, output
   cần tạo, và các điều cấm hoặc giới hạn.
4. Cập nhật bảng ở README này.

Không đưa quy tắc nền tảng (an toàn secrets, không bịa test, không tự sửa lab)
vào reference tùy chọn: chúng phải ở `SKILL.md` để luôn được áp dụng.

## Kiểm tra nhanh

Sau khi sửa template HTML, chạy:

```powershell
node scripts/validate-lab-guide.mjs templates/lab-guide.html
```

Lệnh này chỉ xác nhận cấu trúc và JavaScript của HTML template. Khi dùng với
guide thực tế, hãy truyền đường dẫn đến file guide đã tạo và vẫn thực hiện các
kiểm tra nội dung trong `references/validation-and-delivery.md`.
