---
description: Session end — append progress entry to .claude/PROGRESS.md
argument-hint: [optional one-line title of the session]
---

Wrap up the current session:

1. Summarize what changed in this session — files touched, features added, bugs fixed, decisions made.
2. Identify the immediate next step for the following session.
3. Note any blockers or open questions.
4. Append a new entry to `.claude/PROGRESS.md` at the end of the file, using this format:

```
## <today's date YYYY-MM-DD> — <short title from $ARGUMENTS or derived>
**Agent(s):** <who worked on it — main session or named subagents>
**Changed:** <bullet list of concrete changes>
**Next:** <one sentence>
**Blockers:** <list or "none">
```

5. Return a short confirmation to the user: "Logged. Next: <next step>."

Delegate to the `project-monitor` subagent if the main session is already long.
