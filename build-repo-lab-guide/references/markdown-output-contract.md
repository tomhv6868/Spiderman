# Codelab Markdown output contract

Sinh đúng **một tệp Markdown UTF-8** cho Codelab web. Đầu ra là Markdown
thuần có YAML frontmatter, không phải MDX: cùng một tệp phải đọc được trên
Codelab web và GitHub.

Đường dẫn mặc định là `docs/CODELAB.md` tại repository root. Không ghi đè
một tài liệu không do skill tạo ra; nếu không thể xác định nguồn gốc, hỏi
người dùng hoặc chọn tên mới.

## Frontmatter

Mọi Codelab phải bắt đầu bằng YAML frontmatter. Dùng **đúng 19 field, đúng
thứ tự canonical** trong [Codelab frontmatter](codelab-frontmatter.md).

- Không thêm, bỏ, đổi tên, hoặc đổi thứ tự field.
- Điền dữ liệu đã xác minh từ repository; assumption phải được ghi rõ ở field
  canonical tương ứng, không thêm một field tùy ý.
- Web đọc frontmatter để render title, duration, level, prerequisites,
  outcomes và sidebar. Thứ tự ổn định để diff giữa hai bài vẫn đọc được.
- Luôn đọc `codelab-frontmatter.md` trước khi sinh Codelab; không suy đoán
  danh sách field.

## Cú pháp được phép

Web render Markdown bằng `react-markdown`, `remark-gfm`, `remark-directive`
và plugin chuyển directive sang React component. Chỉ dùng đúng vocabulary:

```text
:::goal
:::checkpoint
:::caution
:::input
:::export
:::os
:::quiz
```

Không tự tạo directive thứ tám. Nếu cần một block mới, báo team Codelabs để
họ bổ sung vocabulary cho toàn bộ bài trước khi dùng.

### Directive requirements

- Dùng `:::goal` cho TL;DR/mục tiêu đầu bài.
- Dùng `:::checkpoint` cho điều kiện qua phase và đúng một next action.
- Dùng `:::caution` cho secret, thao tác phá hủy, quota hoặc rủi ro thật.
- Dùng `:::os` chỉ khi command khác theo OS.
- Dùng `:::quiz` cho câu tự kiểm ngắn có đáp án dựa trên evidence.
- Mọi `:::input` phải có `target` là đường dẫn repository cuối cùng giữ câu
  trả lời của học viên. Có thể kèm fragment heading.

```markdown
:::input{id="q2" target="artifacts/REPORT.md#b1" lines="4"}
Viết failure analysis dựa trên run JSON đã chọn.
:::
```

- Mọi file/section được `:::input` ghi vào phải xuất hiện trong `:::export`
  ở bước nộp bài, để learner có thể commit đúng artifact.
- Không dùng input không target: state form có thể mất, còn repository mới là
  source of truth của bài nộp.

## Body structure

Sau frontmatter, bắt đầu ngay bằng `:::goal` có TL;DR ngắn và một hành động
an toàn dưới hai phút. Heading cao nhất trong body là `##`.

- Không viết `# H1` trong body.
- Không lặp lại title, day, duration, author, level hoặc metadata ở body;
  trang đã render chúng từ frontmatter.
- Không dùng emoji trong heading.
- Dùng `##` cho phase và `###` cho task. Mỗi phase ghi dependency, ước lượng
  phút, checkpoint và `Next action:`.
- Mỗi task phải có bốn phần rõ ràng: Knowledge, Instructions, Expected
  outcome, Deliverables.
- Lệnh phải copy được, có nhãn Setup / Smoke-demo / Automated test / Contract
  validation / Submission-security check và kết quả mong đợi.
- Dùng `<details><summary>...</summary>...</details>` cho hint hoặc đáp án
  ẩn; giữ đóng mặc định để tương thích cả web lẫn GitHub.

## Required sections

Sắp xếp body theo thứ tự phù hợp dependency và tối thiểu gồm:

1. `:::goal` TL;DR + hành động dưới hai phút.
2. Audit facts, assumptions và contradictions.
3. Setup theo OS khi syntax khác nhau.
4. Role/file ownership khi team work áp dụng.
5. Các phase, task, checkpoint và `Next action:`.
6. Validation cheat sheet và checklist Wins verified.
7. Definition of Done, submission/security checklist và `:::export`.
8. Later / parking lot.
9. Repository source paths đã audit.

## Validation before delivery

Chạy validator của skill khi Node có mặt và kiểm tra thêm bằng grep/rg:

```powershell
node scripts/validate-lab-guide.mjs docs/CODELAB.md
rg -n '^# ' docs/CODELAB.md
rg -n -P ':::(?!goal|checkpoint|caution|input|export|os|quiz)' docs/CODELAB.md
rg -n -P ':::input(?!.*target=)' docs/CODELAB.md
```

Expected result:

- validator xác nhận frontmatter có 19 field canonical theo đúng thứ tự;
- không có H1 body, directive lạ, hoặc `:::input` thiếu `target`;
- không còn placeholder, heading có emoji, secret hoặc đường dẫn bịa;
- `:::export` bao phủ mọi target do learner tạo/sửa.

Chỉ bàn giao khi `docs/CODELAB.md` tồn tại, không rỗng, dùng Markdown thuần
và toàn bộ target trong input/export là path thật hoặc được đánh dấu rõ là
`NEW FILE` trong repository.
