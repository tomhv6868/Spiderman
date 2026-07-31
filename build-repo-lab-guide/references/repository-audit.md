# Repository audit and contract tracing

Read applicable `AGENTS.md` files before editing. Preserve unrelated user
changes. Use `rg --files` and targeted reads; skip vendored, generated, model,
cache, and dependency directories.

Inspect when present: README and docs, assignment/rubric material, manifests
and CI, `.env.example`, schemas/fixtures/sample config, source entrypoints,
tests, checklists, role plans, and timelines.

Build a fact ledger:

| Fact | Evidence source |
| --- | --- |
| Objective | teaching docs plus actual code path |
| Setup/run command | manifest, scripts, CI, then docs |
| Automated test | test configuration or CI |
| Input contract | parser, loader, schema, fixture, indexing |
| Expected output | assertion or deterministic code |
| Deliverables | verified paths and assignment docs |
| Timing/roles | timeline/checklist and dependency edges |

Authority order for implementation facts:

1. Executable tests and assertions
2. Source code and data loaders
3. Manifests, scripts, and CI
4. README and teaching documents
5. Clearly labelled coach inference

For each named artifact, classify it as an existing file to edit, new file to
create, local-only/non-committable, or generated/optional. For every new file,
state absolute and relative path, purpose, OS creation command, schema or
format, safe starter content, validation command, and expected output.

Trace actual test input from entrypoint through loader and schema: path,
encoding, container type, required fields/types, consumed items, and edge/error
behavior. Put contradictions near the top of the guide.

