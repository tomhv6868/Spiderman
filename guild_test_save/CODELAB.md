---
title: "Day 04 — Research Agent Tool Eval"
slug: "day04-research-agent-tool-eval"
description: "Xây research agent có tool routing, eval evidence và UI demo."
day: "04"
duration_minutes: "240"
level: "beginner"
audience: "AI Engineer mới vào nghề có kiến thức Python, terminal, Git và JSON cơ bản"
language: "vi"
prerequisites: ["Python 3", "terminal", "Git", "JSON", "API key của provider được nhóm chọn"]
learning_outcomes: ["Đọc evidence từ run JSON", "Cải thiện routing qua v0–v3", "Viết group eval đúng contract", "Trình bày UI và report không lộ secret"]
repository: "starter_v0"
timebox_minutes: "240"
team_size: "Not specified; learners self-organize"
format: "markdown"
sidebar_group: "Not specified"
sidebar_order: "Not specified"
source_status: "evidence-audited"
assumptions: "Dùng các vai trò mẫu cho nhóm năm người; nhóm ít người gộp vai trò và vẫn chỉ định một Integrator."
last_verified: "2026-07-31"
---
:::goal
TL;DR: Chạy baseline v0 bằng provider thật, đọc log để sửa prompt/tool declaration theo từng giả thuyết, thêm tool + UI, rồi nộp evidence v0–v3.

Do now (under 2 minutes): Trong PowerShell, vào `starter_v0` và kiểm tra hai entry point.

```powershell
# Kiểm tra Contract
Set-Location D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0
Get-ChildItem agent.py, run_eval.py
```

Expected result: terminal hiển thị cả `agent.py` và `run_eval.py`.
:::

## Audit facts, assumptions and contradictions

| Fact | Evidence đã audit |
| --- | --- |
| Mục tiêu | `README.md`: xây research agent, chạy eval thật, tối ưu prompt/tool declaration bằng evidence. |
| Lệnh chính | `scripts/preflight_provider.py`, `run_eval.py`, `chat.py`; source code xác nhận các tham số `--provider`, `--version`. |
| Contract eval nhóm | `data/eval_group.json` bắt buộc đúng 10 case: 5 có `query`, 5 có `turns`; `phase` là `B`; `failure_type` thuộc sáu giá trị cho phép. |
| Tool contract | `tools/__init__.py` là registry. `artifacts/tools.yaml` là declaration gửi cho model. Mỗi tool nằm trong `tools/<tool_name>/` với `TOOL.md` và `tool.py`. |
| Evidence hợp lệ | `README.md` và `REPORT.md`: `provider_error_cases=0`, `measured_cases=total_cases`; tool result lỗi phải review thủ công. |
| Deliverable | Prompt, tools YAML, version log v0–v3, group eval, runs, transcripts, tool mới, UI, report. |

:::caution
Không tạo, commit, chụp màn hình hay dán `.env`, API key, token Telegram hoặc đường dẫn có secret. Các lệnh eval có thể gọi API thật và tiêu quota. Trong `run_eval`, để Telegram credentials unset.
:::

**Mâu thuẫn cần xử lý:** UI là deliverable core nhưng starter không có `app.py`; nhóm phải tạo UI và dependency tương ứng. Hai file `artifacts/system_prompt.md` và `artifacts/tools.yaml` đã có chỉnh sửa cục bộ khi audit, nên guide này không thay đổi chúng.

**Assumption:** README có timebox 09:00–13:00; repository không nêu số thành viên, nên vai trò dưới đây là mẫu để tự gộp/chia.

## Setup

Đầu vào: repository clone và API key của provider mà nhóm chọn. File local-only: `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0\.env` (tương đối: `starter_v0/.env`); schema là các biến tên trong `.env.example`.

:::os{platform="windows"}
```powershell
# Thiết lập môi trường (Setup)
Set-Location D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```
:::

:::os{platform="macos-linux"}
```bash
# Thiết lập môi trường (Setup)
cd /path/to/Day04-2A202601512-Tran-Van-Ngoc-/starter_v0
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
test -f .env || cp .env.example .env
```
:::

Điền key của đúng một provider vào `.env`, lưu cục bộ, rồi chạy preflight. Kết quả mong đợi là `OK provider=...`, `tool=...`, `args=...`.

```powershell
# Chạy thử (Smoke/Demo Run)
python scripts/preflight_provider.py --provider openrouter
```

Nếu preflight lỗi:

- **Vị trí lỗi:** terminal khi chạy `scripts/preflight_provider.py`.
- **Kết quả quan sát được:** không có `OK provider=...` hoặc báo thiếu key/tool call.
- **Nguyên nhân có khả năng nhất:** `.env` chưa có key cho provider đã chọn, hoặc provider không trả structured tool call.
- **Cách khắc phục an toàn:** kiểm tra tên biến trong `.env.example`, giữ `.env` ngoài Git, sau đó chạy lại đúng provider.

## Roles and file ownership

| Vai trò mẫu | File/module sở hữu chính | Consumer |
| --- | --- | --- |
| Test Architect | `data/eval_group.json` | Prompt Engineer, Reviewer |
| Prompt/Policy Engineer | `artifacts/system_prompt.md`, `artifacts/tools.yaml` | Integrator, eval runner |
| Tool/Data Engineer | `tools/<tool_name>/`, `tools/__init__.py` | Prompt Engineer, UI |
| Core Integrator | `app.py`, `requirements.txt`, điểm tích hợp chung | Demo, Reviewer |
| Observability/Reviewer | `runs/`, `transcripts/`, `artifacts/REPORT.md` | Demo, submission |

Sau baseline, tool mới, group eval và UI có thể làm song song nếu không sửa cùng file. Sửa prompt/tools, chạy eval, cập nhật version log và final submission là tuần tự. Integrator là người duy nhất cập nhật file dùng chung sau khi các nhánh hoàn thành.

## Phase 1 — Setup và baseline

Dependency: hoàn thành Setup. Thời gian: 40 phút. Tiến độ: 0/2 task.

### Task 1 — Xác minh provider và bảo vệ môi trường

#### Knowledge

Provider preflight xác nhận model trả structured tool call trước khi chạy cả suite. Điều này không kiểm tra API của từng research tool.

#### Instructions

Inputs: `.env` cục bộ và `artifacts/tools.yaml`. Owner: Prompt/Policy Engineer. Consumer: người chạy baseline.

```powershell
# Chạy thử (Smoke/Demo Run)
Set-Location D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0
python scripts/preflight_provider.py --provider openrouter
```

Validation: kiểm tra terminal in `OK provider=...` trước khi chuyển task. Đường dẫn tương đối: `scripts/preflight_provider.py`.

#### Expected outcome

Provider trả ít nhất một structured tool call. **Not executed:** preflight cần API key/quota của nhóm; hãy chạy thủ công sau khi điền `.env`.

#### Deliverables

- **DO NOT COMMIT:** `starter_v0/.env`, `starter_v0/.venv/`.
- Không có artefact nộp mới từ task này.

### Task 2 — Chạy và đọc baseline v0

#### Knowledge

Baseline là mốc evidence, không phải điểm cần đẹp. Run JSON lưu artifact version, hash và actual tool calls để đối chiếu các lần sửa sau.

#### Instructions

Inputs: provider đã preflight. Owner: Reviewer. Consumer: Prompt/Policy Engineer.

```powershell
# Chạy kiểm thử tự động (Automated Test)
python run_eval.py --provider openrouter --version v0 --suite base --eval-cases data/eval_base.json

# Kiểm tra Contract
Get-ChildItem runs\*.json | Sort-Object LastWriteTime -Descending | Select-Object -First 1
```

Đường dẫn input tuyệt đối: `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0\data\eval_base.json`; tương đối: `data/eval_base.json`. Mở run mới và ghi bốn metric: `case_accuracy`, `tool_routing_accuracy`, `argument_accuracy`, `multiturn_accuracy`.

#### Expected outcome

Có file JSON mới trong `runs/`; đọc một `results[*].result.failures` trước khi đưa giả thuyết. **Not executed:** suite cần provider/API thật.

#### Deliverables

- `starter_v0/runs/*.json` cho v0.
- Cập nhật dòng v0 trong `starter_v0/artifacts/version_log.csv`.

:::checkpoint
Checkpoint: preflight pass, có run v0, và một failure đã được đọc từ JSON thật.

Next action: chọn một failure rồi viết đúng một giả thuyết routing hoặc argument cho v1.
:::

## Phase 2 — Cải thiện có kiểm soát và UI

Dependency: Phase 1 checkpoint. Thời gian: 70 phút. Tiến độ: 0/3 task. Task 3–5 chỉ song song khi chủ sở hữu không sửa cùng file.

### Task 3 — Chạy một thí nghiệm v1

#### Knowledge

Chỉ sửa `system_prompt.md` hoặc `tools.yaml` cho một giả thuyết để metric trước/sau có ý nghĩa. Nếu rename tool, phải sync registry, declarations, fixed eval và tài liệu liên quan.

#### Instructions

Inputs: failure v0. Owner: Prompt/Policy Engineer. Consumer: Reviewer.

```powershell
# Chạy kiểm thử tự động (Automated Test)
python run_eval.py --provider openrouter --version v1 --suite base --eval-cases data/eval_base.json

# Kiểm tra Contract
Get-Content artifacts\version_log.csv
```

File được sửa tuyệt đối: `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0\artifacts\system_prompt.md` hoặc `...\artifacts\tools.yaml`; tương đối: `artifacts/system_prompt.md`, `artifacts/tools.yaml`.

:::input{id="v1-hypothesis" target="artifacts/version_log.csv" lines="1"}
Thêm dòng v1 với changed_artifact, reason, hypothesis, metric before/after và run_file từ run thật.
:::

#### Expected outcome

v1 có run riêng, hash artifact và một dòng version log; không phải ba lần chạy copy-paste. **Not executed:** run cần API thật.

#### Deliverables

- Artefact đã sửa: `artifacts/system_prompt.md` hoặc `artifacts/tools.yaml`.
- `runs/*.json` v1 và `artifacts/version_log.csv`.

### Task 4 — Thêm một tool mới và smoke test

#### Knowledge

Tool mới chỉ hoạt động trong agent khi implementation, `TOOL.md`, registry và YAML declaration cùng khớp. `TOOL.md` mô tả input/output và side effect cho người đọc.

#### Instructions

Inputs: ý tưởng capability độc lập. Owner: Tool/Data Engineer. Consumer: Prompt Engineer và UI.

Tạo **NEW FILE** tuyệt đối `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0\tools\<tool_name>\tool.py` và `...\TOOL.md`; tương đối `tools/<tool_name>/`. Thêm import/key vào `tools/__init__.py`, declaration vào `artifacts/tools.yaml`.

```powershell
# Chạy thử (Smoke/Demo Run) — thay bằng tên và args của tool thật
python -c "from pathlib import Path; from env_loader import load_lab_env; load_lab_env(Path.cwd()); from tools import TOOL_FUNCTIONS as T; r=T['YOUR_TOOL_NAME'](**{'YOUR_ARG':'DEMO_VALUE'}); print({'error':r.get('error') if isinstance(r, dict) else None, 'result_type':type(r).__name__})"
```

Validation: registry tìm thấy tool, args hợp lệ, `error` là `None`, output đúng contract nhóm định nghĩa. Action tool chỉ smoke bằng dry-run hoặc `confirmed=False`.

#### Expected outcome

Tool mới được gọi trực tiếp được và có evidence smoke test. **Coach inference:** chọn tool không cần API ngoài giúp smoke test ít rủi ro hơn.

#### Deliverables

- **NEW FILE:** `tools/<tool_name>/tool.py`, `tools/<tool_name>/TOOL.md`.
- Sửa `tools/__init__.py`, `artifacts/tools.yaml`; log smoke test không chứa secret.

### Task 5 — Dựng UI core

#### Knowledge

UI không chỉ là chat box: cần request/response, tool trace, rounds, transcript/run và artifact version. Tái sử dụng `run_model_tool_loop` để UI và CLI cùng contract.

#### Instructions

Owner: Core Integrator. Consumer: demo/reviewer. Tạo **NEW FILE** tuyệt đối `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0\app.py`; tương đối `app.py`. Nếu dùng Streamlit, thêm `streamlit>=1.30.0` vào `requirements.txt`.

```powershell
# Chạy thử (Smoke/Demo Run)
streamlit run app.py
```

Validation: mở `http://localhost:8501`, chạy một scenario và thấy tool name, args, result/error, version/transcript. Framework khác phải có contract hiển thị tương đương.

#### Expected outcome

UI local mở được và dùng loop từ `chat.py`. **Not executed:** không có UI/source mới hoặc dependency Streamlit trong starter để chạy ở thời điểm audit.

#### Deliverables

- **NEW FILE:** `app.py`.
- `requirements.txt` nếu nhóm chọn Streamlit; evidence UI không lộ secret.

:::checkpoint
Checkpoint: v1 có hypothesis/evidence, tool mới smoke-pass, và UI local có trace.

Next action: Integrator kiểm tra registry, YAML declaration và prompt trước khi chạy v2.
:::

## Phase 3 — Group eval, v2 và live chat

Dependency: Phase 2 checkpoint. Thời gian: 45 phút. Tiến độ: 0/2 task.

### Task 6 — Viết đúng 10 group eval case

#### Knowledge

Group eval đo lỗi do nhóm tự chọn. Evaluator chỉ chấm turn user cuối trong multi-turn; các case ngoài schema không phải evidence hợp lệ.

#### Instructions

Owner: Test Architect. Consumer: Reviewer. Sửa file tuyệt đối `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0\data\eval_group.json`; tương đối `data/eval_group.json`. Mẫu đọc-only: `samples/eval_group.schema.example.json` không được nộp thay.

```powershell
# Kiểm tra Contract
python -c "import json; d=json.load(open('data/eval_group.json',encoding='utf-8')); c=d['cases']; print({'total':len(c),'single':sum('query' in x for x in c),'multi':sum('turns' in x for x in c),'phases':sorted(set(x.get('phase') for x in c))})"

# Chạy kiểm thử tự động (Automated Test)
python run_eval.py --provider openrouter --version v2 --suite group --eval-cases data/eval_group.json
```

Mỗi case có `id`, `phase: "B"`, `failure_type`, `expect` và `metadata.what_it_tests`; use `tool_calls` hoặc `no_tool`. Sáu failure type: `wrong_tool`, `wrong_arg_value`, `wrong_boundary`, `unnecessary_tool`, `out_of_scope`, `missing_info`.

#### Expected outcome

Lệnh shape in `total: 10`, `single: 5`, `multi: 5`, `phases: ['B']`; run group v2 mới được tạo. **Not executed:** run cần provider thật.

#### Deliverables

- `data/eval_group.json` với 10 case do nhóm viết.
- Run JSON group v2.

### Task 7 — Thu evidence v2 và chat live

#### Knowledge

Eval là phép đo có kiểm soát; chat live chứng minh luồng nhiều vòng. `chat.py` ghi transcript sau mỗi turn vào thư mục transcripts.

#### Instructions

Owner: Reviewer. Consumer: report/demo.

```powershell
# Chạy kiểm thử tự động (Automated Test)
python run_eval.py --provider openrouter --version v2 --suite base --eval-cases data/eval_base.json

# Chạy thử (Smoke/Demo Run)
python chat.py --provider openrouter --version v2
```

Output tuyệt đối: `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0\transcripts\*.transcript.json`; tương đối `transcripts/`. Thử research thường, thiếu thông tin rồi bổ sung, và action nhạy cảm phải hỏi xác nhận.

#### Expected outcome

Có runs v2 và transcript path in ra terminal. **Not executed:** các lệnh cần provider/API key.

#### Deliverables

- `runs/*.json` v2 và `transcripts/*.transcript.json`.
- Evidence tương ứng trong `artifacts/REPORT.md`.

:::checkpoint
Checkpoint: group eval đúng 5 single + 5 multi, v2 có evidence, ba scenario live có transcript.

Next action: hoàn thành Report A và rehearsal scenario trước mốc 11:30 nêu trong README.
:::

## Phase 4 — v3, report và final gate

Dependency: Phase 3 checkpoint. Thời gian: 45 phút. Tiến độ: 0/2 task.

### Task 8 — Chạy v3 và viết report dựa trên log

#### Knowledge

v3 phải phản ánh một thay đổi sau feedback/evidence. Report chỉ được dùng metric, tool call và failure lấy từ run JSON thật.

#### Instructions

Owner: Reviewer + Prompt Engineer. Consumer: submission. File report tuyệt đối `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0\artifacts\REPORT.md`; tương đối `artifacts/REPORT.md`.

```powershell
# Chạy kiểm thử tự động (Automated Test)
python run_eval.py --provider openrouter --version v3 --suite base --eval-cases data/eval_base.json

# Kiểm tra Contract
python scripts/parse_runs.py runs/ --output analysis/run-analysis.csv
```

:::input{id="failure-analysis" target="artifacts/REPORT.md#b2" lines="4"}
Viết một failure analysis từ `results[*].result.failures` của run thật: case ID, observed mismatch, tool call thực tế và fix đã kiểm chứng.
:::

#### Expected outcome

Có run v3; CSV phẳng trong `analysis/` nếu parse; REPORT.md có bảng v0–v3, failures, group eval và live evidence. **Not executed:** v3 và parsing output chưa có trong repository audit.

#### Deliverables

- `runs/*.json` v3, `artifacts/version_log.csv`, `artifacts/REPORT.md`.
- **NEW FILE (nếu chạy parse):** `analysis/run-analysis.csv`.

### Task 9 — Final gate trước khi nộp

#### Knowledge

Routing PASS không chứng minh tool execution thành công. Final gate kiểm tra sự hiện diện artefact, điều kiện metric và loại trừ secrets.

#### Instructions

Owner: Reviewer; Integrator xử lý điểm tích hợp cuối. Chạy trong `D:\Vin\Day04-2A202601512-Tran-Van-Ngoc-\starter_v0`.

```powershell
# Kiểm tra trước khi nộp / Bảo mật (Submission / Security Check)
git status --short
Get-ChildItem runs\*.json, transcripts\*.transcript.json
Select-String -Path artifacts\REPORT.md -Pattern 'v0|v1|v2|v3'
git check-ignore .env .venv 2>$null
```

Trong từng run, kiểm tra `provider_error_cases=0`, `measured_cases=total_cases`, rồi review thủ công mọi `tool_results` có error.

#### Expected outcome

Artefact bắt buộc có mặt, `.env`/`.venv` được ignore, và evidence đủ để demo/nộp. **Not executed:** submit channel, final deadline và deploy URL không có trong repository.

#### Deliverables

- Prompt, tools YAML, version log v0–v3, report, group eval, runs, transcripts, tool mới, UI và dependency tương ứng.
- **DO NOT COMMIT:** `.env`, API key, token, `.venv/`, cache/build output.

:::checkpoint
Checkpoint: artefact bắt buộc có mặt, metric đủ điều kiện và không lộ secret.

Next action: nộp qua kênh cùng quy tắc đặt tên/deadline do giảng viên công bố.
:::

## Validation cheat sheet

- [ ] Provider preflight thành công.
- [ ] Run v0 đã đọc ít nhất một failure.
- [ ] Tool mới có `tool.py`, `TOOL.md`, registry, declaration và smoke evidence.
- [ ] UI hiển thị request/response, rounds, tool trace và version/transcript.
- [ ] `eval_group.json` đúng 10 case gồm 5 single + 5 multi.
- [ ] Version log và report có evidence v0–v3.
- [ ] Mọi run được review theo `provider_error_cases`, `measured_cases`, tool errors.

```powershell
# Kiểm tra Contract
python -c "import json; d=json.load(open('data/eval_group.json',encoding='utf-8')); assert len(d['cases']) == 10; print('group eval has 10 cases')"
```

## Definition of Done

- UI chạy local và có trace theo contract.
- Có ít nhất 5 tool declared, một tool mới của nhóm và smoke evidence.
- v0–v3 là các vòng cải tiến có hypothesis, hash/run và metric thật.
- Group eval có đúng 10 case, report dùng run/transcript thật.
- Không có secret hoặc `.env` trong deliverable.

:::export{targets="artifacts/system_prompt.md, artifacts/tools.yaml, artifacts/version_log.csv, artifacts/REPORT.md, data/eval_group.json, runs/, transcripts/, tools/<tool_name>/, app.py, requirements.txt, analysis/run-analysis.csv"}
Commit the listed learner artifacts to the repository. Exclude `.env`, `.venv/`, secrets, cache and build output.
:::

## Later / parking lot

- Chỉ chạy `extension` suite khi nhóm dùng optional built-ins và declarations tương ứng.
- `send`, `policy`, `papers`, `paper_text` là optional built-ins; chúng không thay cho tool mới bắt buộc.
- Public tunnel/deploy chỉ làm khi cần máy khác test; kiểm tra lại link và không đưa dữ liệu nhạy cảm vào UI public.

## Sources audited

`README.md`, `TOOL-SETUP.md`, `starter_v0/requirements.txt`, `starter_v0/.env.example`, `starter_v0/agent.py`, `starter_v0/chat.py`, `starter_v0/run_eval.py`, `starter_v0/versioning.py`, `starter_v0/tools/README.md`, `starter_v0/tools/__init__.py`, `starter_v0/tools/*/TOOL.md`, `starter_v0/artifacts/tools.yaml`, `starter_v0/artifacts/system_prompt.md`, `starter_v0/artifacts/version_log.csv`, `starter_v0/artifacts/REPORT.md`, `starter_v0/data/eval_base.json`, `starter_v0/data/eval_group.json`, `starter_v0/data/eval_research_extension.json`, `starter_v0/samples/eval_group.schema.example.json`, `starter_v0/scripts/preflight_provider.py`, `starter_v0/scripts/parse_runs.py`.
