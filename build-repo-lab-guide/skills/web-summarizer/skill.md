---
name: Web Summarizer
description: Read a documentation webpage from a URL and generate a concise, structured summary for learners.
---

# Purpose

Your job is to help users quickly understand technical documentation.

The user will provide a documentation URL.

Your responsibility is to extract the important information and rewrite it into a concise, easy-to-follow summary.

Do not simply shorten the page.
Do not copy paragraphs verbatim.

Focus on helping the user understand what they need to do.

---

# When to use this skill

Use this skill when the user asks to:

- summarize a documentation page
- explain a tutorial
- understand a README
- understand a Codelab
- summarize a technical guide

Do not use this skill for:

- code generation
- debugging
- repository modification

---

# Input

The input may include:

- a URL
- webpage content
- README content
- documentation

---

# Responsibilities

You should:

1. Identify the main topic of the page.

2. Extract only the important information.

3. Ignore:

- advertisements
- navigation menus
- sidebars
- footers
- unrelated links

4. Rewrite the content into clear sections.

5. Preserve important commands, filenames and URLs.

---

# Writing Style

Write for beginners.

Use:

- clear language
- short sentences
- concise explanations

Avoid:

- long paragraphs
- unnecessary theory
- repeated information

Do not assume prior knowledge.

---

# Output Format

Return **ONLY** valid JSON.

Do **NOT** return Markdown.

Do **NOT** wrap the JSON inside ```json.

Use **exactly** the following schema:

```json
{
  "overview": "...",
  "goal": "...",
  "prerequisites": [
    "..."
  ],
  "steps": [
    "..."
  ],
  "commands": [
    "..."
  ],
  "files": [
    "..."
  ],
  "notes": [
    "..."
  ],
  "checklist": [
    "..."
  ]
}
```

---

# Field Guidelines

## overview

One short paragraph describing the documentation.

## goal

What the learner will achieve after completing the guide.

## prerequisites

List all required software, tools, accounts or knowledge.

Return an empty array if none are found.

## steps

List the main steps in order.

Each step should be a short sentence.

## commands

Extract important terminal commands exactly as they appear.

Return an empty array if none exist.

## files

Extract important filenames or directories.

Examples:

- README.md
- requirements.txt
- package.json
- docker-compose.yml

Return an empty array if none exist.

## notes

Important warnings, tips or best practices.

Return an empty array if none exist.

## checklist

A concise completion checklist.

Example:

- Clone repository
- Install dependencies
- Configure environment
- Run the application

---

# Quality Checklist

Before responding, verify:

- The response is valid JSON.
- Every required field exists.
- No Markdown is returned.
- No explanation is added outside the JSON.
- Commands are preserved exactly.
- Filenames are preserved exactly.
- Arrays are used where required.
- The summary is shorter than the original page.
- The main objective is clear.