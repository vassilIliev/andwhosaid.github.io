# andWhoSaid — Project Guide for Claude

This file gives any Claude session (across accounts/machines) the context needed to continue work on the **andWhoSaid** landing site without losing institutional knowledge.

Read this file first. Then check `.claude/PROGRESS.md` for the latest session log, and `.claude/agents/` for specialized subagents available via the Agent tool.

---

## Project summary

**andWhoSaid** is a high-performance, responsive single-page landing site for a bar venue booking platform targeting school prom parties in Sofia, Bulgaria. The site markets the NOMO del Arte venue and a bundle of services (bar, kitchen, DJ, decor, photographer, videographer).

- **Language:** Bulgarian (bg)
- **Audience:** school-leaver prom organizers
- **Deployment target:** GitHub Pages at `https://<user>.github.io/andWhoSaid/`
- **Repo name:** `andWhoSaid`

## Tech stack

- **Build:** Vite 5
- **UI:** React 18 + TypeScript (strict mode, ES2020)
- **Styling:** CSS Modules + CSS custom properties (no Tailwind, no UI framework)
- **Routing:** custom ~30-line `useHashRoute` hook (no react-router). Hash-based for static GH Pages hosting.
- **Fonts:** Space Grotesk (Google Fonts link in `index.html`)
- **Deployment:** `gh-pages` via `npm run deploy`

Base path is set in `vite.config.ts` as `/andWhoSaid/`. All asset URLs use `import.meta.env.BASE_URL` to respect it.

## Directory structure

```
andWhoSaid/
├── CLAUDE.md                    ← this file
├── .claude/
│   ├── PROGRESS.md              ← rolling session log (append after every session)
│   ├── agents/                  ← specialized subagents, invoked via Agent tool
│   │   ├── fe-developer.md
│   │   ├── figma-designer.md
│   │   ├── devops-engineer.md
│   │   ├── project-monitor.md
│   │   └── code-reviewer.md
│   └── commands/                ← slash commands (skills)
├── public/
│   └── assets/
│       ├── picture-assets/      ← illustrations + decorations
│       ├── location/            ← cathedral photo
│       ├── Aleks/               ← videographer bio photos
│       └── Sirkatov/            ← photographer bio photos
├── src/
│   ├── App.tsx                  ← routes between pages via useHashRoute
│   ├── main.tsx
│   ├── hooks/useHashRoute.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Photographer.tsx
│   │   └── Videographer.tsx
│   ├── sections/                ← page sections (each has .tsx + .module.css)
│   │   ├── Nav/
│   │   ├── Hero/
│   │   ├── Services/
│   │   ├── Location/
│   │   ├── Booking/             ← (pending)
│   │   └── Footer/              ← (pending)
│   ├── components/              ← shared atoms
│   │   └── Star/                ← decorative star used across sections
│   └── styles/
│       ├── tokens.css           ← design tokens (colors, spacing, type scale)
│       └── global.css
└── vite.config.ts               ← base: '/andWhoSaid/'
```

## Design system tokens (src/styles/tokens.css)

```
Colors
  --color-dark:   #191a23
  --color-grey:   #f3f3f3
  --color-green:  #b9ff66
  --color-pink:   #ff3d8b
  --color-yellow: #f6d24a
  --color-white:  #ffffff

Typography: Space Grotesk
  --fs-body:  0.9375rem (15px)
  --fs-small: 0.8125rem
  --fs-h1/h2/h3: clamp() responsive scale

Spacing: 4 → 88px scale (--space-1 … --space-16)
Radii:   sm 6, md 10, lg 16, xl 28
Layout:  --container-max: 1120px
Shadow:  --shadow-card: 0 4px 0 0 dark (offset brutalist shadow)
```

**Design feel:** Positivus-style "new brutalist" — flat blocks, heavy offset shadows, alternating bright colors (pink/green/dark/light), generous rounded corners, and scattered decorative stars/squiggles.

## Figma source of truth

- **File key:** `aNOgdIq4MNj8lpi4ml8ejV`
- **Landing page frame (LandingPpage / G):** node `93:88`
- **Photographer page:** node `195:198`
- **Videographer page:** node `199:124`

Access via the Figma MCP server: `mcp__figma__get_design_context`, `mcp__figma__get_screenshot`, `mcp__figma__get_metadata`. The `figma-designer` subagent handles design-to-spec translation — always prefer delegating Figma work to it to keep main context clean and MCP quota efficient.

**MCP quota:** the free Figma plan has a monthly budget — batch requests and fetch metadata once, cache it in `tool-results/`, then re-parse locally instead of re-calling.

## Routing

Three routes, hash-based:

- `#/` or `#` or `` → Home
- `#/photographer` → Photographer bio
- `#/videographer` → Videographer bio

Navigation between pages scrolls to top automatically. Hook: `src/hooks/useHashRoute.ts`.

## Scripts

```
npm run dev       # Vite dev server (http://localhost:5173/andWhoSaid/)
npm run build     # Production build → dist/
npm run preview   # Preview built site
npm run deploy    # Publish dist/ to gh-pages branch
```

Typecheck only: `npx tsc -p tsconfig.json --noEmit`

## Current progress snapshot

See `.claude/PROGRESS.md` for the authoritative, append-only log. High-level status:

- ✅ Vite + React + TS scaffold with base path
- ✅ Design tokens + global styles
- ✅ `useHashRoute` hook + 3 page routes
- ✅ Nav (sticky, hamburger mobile menu)
- ✅ Hero (blob YOUTH image, yellow squiggle bg, dot grid, CTA)
- ✅ Services (6 cards, 3×2 grid, alternating themes, learn-more links)
- ✅ Location (dark card, cathedral photo, diamond rail, yellow/pink links, NOMO watermark)
- ✅ Decorative stars via shared `<Star>` component
- ⏳ Booking form section
- ⏳ Footer
- ⏳ Photographer bio page content (currently stub)
- ⏳ Videographer bio page content (currently stub)
- ⏳ Responsive pass + GH Pages deploy

## Known constraints / gotchas

1. **Windows path with `&`:** the old project directory contained `&whoSaid` which broke cmd.exe npm scripts. Project was moved to `C:\Users\...\PROJECTS\andWhoSaid` (no `&`). Do NOT move it back.
2. **Bash shell cwd resets** to the parent `&whoSaid` symlink on each Bash call in this environment. Always use absolute paths or wrap in a subshell: `(cd "/c/Users/.../andWhoSaid" && ...)`.
3. **Figma asset URLs expire in 7 days.** Download what you need to `public/assets/` immediately; do not rely on the CDN URL at runtime.
4. **Scale discipline:** the user has flagged multiple times that "UI is too big compared to Figma." Default to smaller type, tighter spacing, narrower containers. Refer to `--container-max: 1120px` as the target width.
5. **Never commit** unless explicitly asked. The user runs their own git.

## Working agreement with the user

- Bulgarian copy stays in Bulgarian — never translate.
- Match Figma 1:1 on proportions, colors, backgrounds, and decorative assets. When in doubt, fetch a screenshot via `figma-designer` subagent before implementing.
- Responses should be short and concrete. No trailing summaries beyond a sentence or two.
- Confirm before destructive or shared-state operations (git push, deploy, removing files).
- Track every session's work in `.claude/PROGRESS.md`.
