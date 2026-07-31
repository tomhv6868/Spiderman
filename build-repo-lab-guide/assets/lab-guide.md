---
title: "{{TITLE}}"
slug: "{{SLUG}}"
description: "{{DESCRIPTION}}"
day: "{{DAY}}"
duration_minutes: "{{DURATION_MINUTES}}"
level: "{{LEVEL}}"
audience: "{{AUDIENCE}}"
language: "vi"
prerequisites: ["{{PREREQUISITE}}"]
learning_outcomes: ["{{OUTCOME}}"]
repository: "{{REPOSITORY}}"
timebox_minutes: "{{TIMEBOX_MINUTES}}"
team_size: "{{TEAM_SIZE}}"
format: "markdown"
sidebar_group: "{{SIDEBAR_GROUP}}"
sidebar_order: "{{SIDEBAR_ORDER}}"
source_status: "evidence-audited"
assumptions: "{{ASSUMPTIONS}}"
last_verified: "{{LAST_VERIFIED}}"
---
:::goal
TL;DR: {{TLDR}}

Do now (under 2 minutes): {{DO_NOW_ACTION}}

Expected result: {{DO_NOW_RESULT}}
:::

## Audit facts, assumptions and contradictions

{{AUDIT_FINDINGS}}

## Setup

:::os{platform="windows"}
{{WINDOWS_SETUP}}
:::

:::os{platform="macos-linux"}
{{POSIX_SETUP}}
:::

## Roles and file ownership

{{ROLE_OWNERSHIP}}

## Phase {{PHASE_NUMBER}} — {{PHASE_TITLE}}

Dependency: {{DEPENDENCY}}

### Task: {{TASK_TITLE}}

#### Knowledge

{{KNOWLEDGE}}

#### Instructions

{{INSTRUCTIONS}}

#### Expected outcome

{{EXPECTED_OUTCOME}}

#### Deliverables

{{DELIVERABLES}}

:::checkpoint
{{CHECKPOINT}}

Next action: {{NEXT_ACTION}}
:::

## Validation cheat sheet

{{VALIDATION}}

## Definition of Done

{{DONE_CHECKLIST}}

:::export{targets="{{EXPORT_TARGETS}}"}
Commit the listed learner artifacts to the repository.
:::

## Later / parking lot

{{LATER}}

## Sources audited

{{SOURCE_PATHS}}
