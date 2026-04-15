# Project progress log

Append-only session log. **Every Claude session MUST add an entry at the end** summarizing what changed, what's next, and any blockers. This is the source of truth for "what state is the project in?" — prefer it over guessing from the file tree.

Format per session:

```
## <YYYY-MM-DD> — <short title>
**Agent(s):** <who worked on it>
**Changed:** <files touched, features added/removed>
**Next:** <immediate next step for the following session>
**Blockers:** <open questions, stalled work, or "none">
```

---

## 2026-04-14 — Initial scaffold, routing, hero, services, location, Claude knowledge base
**Agent(s):** main session (Claude Opus 4.6)
**Changed:**
- Scaffolded Vite + React 18 + TS project with base path `/andWhoSaid/`
- Added design tokens (`src/styles/tokens.css`) and global styles
- Created `useHashRoute` hook + three page stubs (`Home`, `Photographer`, `Videographer`)
- Built `Nav` section with sticky header, hamburger mobile menu, pink CTA "Направи запитване"
- Built `Hero` section: blob-shaped YOUTH image (downloaded from Figma node 93:359), yellow squiggle SVG backdrop, dot grid behind visual, description copy, CTA "НАПРАВИ ЗАПИТВАНЕ"
- Built `Services` section: 6 cards (3×2) with alternating themes (light/green/dark/pink), pink label headings, decorative icons from `public/assets/picture-assets/`, "Научи повече ↗" on Фотограф + Видеограф cards routing to bio pages
- Built `Location` section: dark card, rectangular cathedral photo inside rounded frame, vertical rail with pink diamond marker, pink link "NOMO del Arte — гр. София, ул. Шипка 1 ↗", yellow link "Над 150 места", subtle rotated "NOMO" watermark, bottom-right dot grid
- Added shared `<Star>` component using downloaded `star-yellow.svg` (Figma node 93:114); sprinkled across Hero, Services, Location
- Scaled tokens down after feedback: container 1240→1120, body 1rem→0.9375rem, spacing tightened, card padding reduced
- Created this Claude knowledge base: `CLAUDE.md`, `.claude/PROGRESS.md`, five specialized agents, and supporting slash commands

**Next:**
1. Further scale Services cards and Star placement (user flagged both are still too big / off-position)
2. Build Booking form section (fields: Name, Phone, Email, Date, Services checklist, guest count, additional details)
3. Build Footer (logo, address, phone, socials)
4. Build Photographer + Videographer bio pages via new `PersonBio` shared component
5. Responsive pass at 360/768/1024/1440 breakpoints
6. First GH Pages deploy via `npm run deploy`

**Blockers:** none. Figma MCP works; assets needed are already downloaded to `public/assets/picture-assets/`.

**Assets downloaded from Figma this session (saved locally, CDN URLs expire):**
- `public/assets/picture-assets/hero-youth-blob.png` ← Figma node 93:359
- `public/assets/location/cathedral-blob.png` ← Figma node 128:4874 (currently UNUSED; reverted to rectangular `alf-redo-A9dNADohsBk-unsplash.jpg`)
- `public/assets/picture-assets/squiggle-yellow.svg` ← Figma node 93:378
- `public/assets/picture-assets/star-yellow.svg` ← Figma node 93:114
