# Canonical Codelab frontmatter

Dùng đúng 19 field dưới đây, đúng thứ tự. Mỗi field nằm trên một dòng YAML;
dùng chuỗi hoặc YAML flow collection (`[a, b]`) để tránh tạo field phụ. Không
thêm field nào khác.

```yaml
title: "..."
slug: "..."
description: "..."
day: "..."
duration_minutes: "..."
level: "..."
audience: "..."
language: "vi"
prerequisites: ["..."]
learning_outcomes: ["..."]
repository: "..."
timebox_minutes: "..."
team_size: "..."
format: "markdown"
sidebar_group: "..."
sidebar_order: "..."
source_status: "evidence-audited"
assumptions: "..."
last_verified: "YYYY-MM-DD"
```

## Giá trị

- `title`, `slug`, `description`: tên, slug URL và tóm tắt Codelab.
- `day`, `duration_minutes`, `timebox_minutes`: chỉ dùng giá trị có evidence;
  nếu không có, ghi `"Not specified"` thay vì đặt số.
- `level`, `audience`, `language`, `prerequisites`, `learning_outcomes`:
  metadata cho người học.
- `repository`: đường dẫn tương đối tới phần thực hành, hoặc `"repository root"`.
- `team_size`: ghi số chỉ khi repository nêu rõ; nếu không, ghi
  `"Not specified; learners self-organize"`.
- `format`: luôn `"markdown"`.
- `sidebar_group`, `sidebar_order`: nhóm và thứ tự hiển thị; thứ tự chỉ là số
  khi repository đã có evidence, nếu không dùng `"Not specified"`.
- `source_status`: luôn `"evidence-audited"` sau khi đã audit repository.
- `assumptions`: gói ngắn các suy luận hướng dẫn không có evidence trực tiếp.
- `last_verified`: ngày audit theo `YYYY-MM-DD`.
