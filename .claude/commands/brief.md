---
description: Session start briefing — read CLAUDE.md, PROGRESS.md, and surface next steps
argument-hint: (none)
---

Run a session start briefing:

1. Read `CLAUDE.md` at the project root for stack and architecture context.
2. Read `.claude/PROGRESS.md` and summarize the last 2 entries (dates, what changed, what's next).
3. Run `TaskList` to see active tasks. If empty, derive candidate tasks from the most recent PROGRESS "Next" items.
4. Return to the user:
   - One paragraph: "Where we are"
   - Bullet list: "Immediate next steps (ranked)"
   - One sentence: "Blockers or open questions"

Delegate to the `project-monitor` subagent if the main context is already busy.

Keep the whole response under 200 words.
