---
description: Trigger a code review by the code-reviewer subagent
argument-hint: [optional scope, e.g. "src/sections/Services" or "before deploy"]
---

Launch the `code-reviewer` subagent to audit the codebase.

Scope: `$ARGUMENTS` (if empty, review everything under `src/` added or changed since the last PROGRESS.md entry).

Ask the reviewer to:

1. Run the checklist in `.claude/agents/code-reviewer.md` (architecture, design system, responsive, accessibility, performance, TS hygiene, security).
2. Return findings ranked as **Blockers / Should-fix / Nits / Good to see**.
3. Include concrete file paths and line numbers for every finding.
4. Append a short summary to `.claude/PROGRESS.md` under the current session.

Do NOT auto-apply any fixes — return the review as a report so the main session or `fe-developer` can act on it.
