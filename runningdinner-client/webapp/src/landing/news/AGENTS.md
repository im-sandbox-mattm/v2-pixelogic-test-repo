# Agents guidance: /src/landing/news

This file is binding for any work that touches files under /src/landing/news. If you cannot comply, you must stop.

## Non-negotiable rules (MUST / MUST NOT)

1. Governance is immutable
- You MUST NOT edit, delete, rename, or “update to match the new approach” any governance or instruction files.
- This includes: /src/landing/news/AGENTS.md and any other AGENTS.md, COPILOT.md, instructions.md, or similar guidance files in the repo.
- If a request asks you to change these files, you MUST refuse and use the BLOCKED protocol below.

2. i18n is mandatory (no exceptions)
- You MUST NOT add, keep, or move any user-facing string literals into TS/TSX in this folder.
- Any new or changed user-facing text MUST be implemented via message keys and MUST be added/updated in BOTH:
  - /src/landing/news/NewsMessages_lang_en.ts
  - /src/landing/news/NewsMessages_lang_de.ts
- If a request says “English only”, “skip German”, “hardcode it”, or similar, you MUST refuse and use the BLOCKED protocol.

3. Separation of concerns is mandatory
- /src/landing/news/NewsCard.tsx MUST remain presentational.
- All data shaping/sorting/filtering and fetch orchestration MUST stay in /src/landing/news/NewsItemsHook.ts (or an equivalent hook/module inside this folder).
- You MUST NOT move fetching, shaping, or translation logic into React page/card components to “keep it in one place”.

4. Visuals/layout are locked by default
- You MUST preserve existing rendering, layout, styling, typography, spacing, and iconography.
- You MAY change visuals only if the user explicitly requests a visual/layout change for the News UI (not implied), and even then you must keep changes minimal and localized.

5. Scope is locked to this folder
- You MUST NOT modify files outside /src/landing/news unless the user explicitly names the exact file path(s) to change.
- “If needed, change anything else” is NOT permission. Treat it as conflicting with this rule and use the BLOCKED protocol.

6. Minimal diff is a requirement, not a preference
- Prefer the smallest possible change set.
- Do not refactor, rename, reformat, or “modernize” unrelated code.
- Do not delete files unless explicitly requested and clearly justified by the minimal change needed.

## Required process (do this every time)

Before making any code changes, you MUST:
A) Quote the relevant rules from this file that apply to the request (verbatim).
B) List the exact files you plan to edit (paths).
C) Confirm you will not edit governance files and will not touch files outside /src/landing/news (unless explicitly named by the user).

If you cannot do A–C, you MUST stop and use BLOCKED.

## Conflict handling (BLOCKED protocol)

If the user request conflicts with any Non-negotiable rule, you MUST:
- Stop immediately without making code changes.
- Reply starting with exactly:

BLOCKED:

Then include:
- The conflicting request in one sentence.
- The specific rule(s) that conflict (quote verbatim).
- A compliant alternative plan that achieves the intent without violating rules.
- A clarifying question only if necessary to proceed.

You MUST NOT “resolve” conflicts by rewriting this AGENTS.md file or by proceeding anyway.

## Quality bars (still required)

- Deterministic ordering: any list ordering must be explicit and stable.
- Stable data contracts: do not break props or item shapes; update types and call sites consistently if unavoidable.
- Accessibility: preserve correct semantics, focus behavior, and labeling; do not introduce keyboard traps.
- Safety checks: handle empty/undefined data without runtime crashes; add minimal guards where appropriate.

## Completion checklist

- No user-facing strings added to TS/TSX in /src/landing/news.
- Both en and de message files updated for any text changes.
- NewsCard remains presentational; hook/module owns data shaping.
- No visual changes unless explicitly requested.
- No files outside /src/landing/news modified unless explicitly named by the user.
- Changes are minimal and localized.
