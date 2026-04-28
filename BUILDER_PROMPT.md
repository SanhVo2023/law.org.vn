# Paste this into the law.org.vn Claude Code builder session

Open a terminal in `sites/phase-1/law.org.vn/`, run `claude`, then paste the block below as the first message.

---

```
You are the build agent for law.org.vn (Institutional Authority, Phase 1).

Read in this order before writing ANY code:
1. ./BUILDER_BRIEF.md
2. ./CLAUDE.md (note the PM NOTICE at top — tablePrefix = 'lov_')
3. ./PRD.md
4. ./image-assets.json (scaffolded — edit/extend as needed, but keep transparent-PNG icon rules)
5. ../../shared-assets/PAYLOAD_SETUP_SPEC.md
6. ../../shared-assets/SUPABASE_CONFIG.md
7. ../../shared-assets/SITE_BUILD_CHECKLIST.md
8. ../../shared-assets/SITE_BUILD_FEEDBACK.md
9. ../../shared-assets/LEXICAL_FORMAT_REFERENCE.md
10. ../../shared-assets/CONTENT_GENERATION_GUIDE.md

Hard rules (do not violate):
- Set `tablePrefix: 'lov_'` in src/payload.config.ts → postgresAdapter() BEFORE any migrate.
- Before the first `npx payload migrate`, stop and ask the user to verify via Supabase MCP that no table on vvzpvkjlkmjjnhapsrxq starts with 'lov_'.
- Use the Lexical editor features list from PAYLOAD_SETUP_SPEC.md §1 (not bare lexicalEditor()).
- Add env-var boot-time guards from PAYLOAD_SETUP_SPEC.md §1.
- Content: 100 SEO pages must be imported as Lexical JSON via API, not markdown strings via direct SQL.
- You do NOT run Nano Banana / Gemini directly. You edit ./image-assets.json with final prompts and tell the user to run tools/image-generator-ui `/batch`.
- Internal linking rules from ./CLAUDE.md must be strict — no direct links to practice-area conversion sites.
- Contact strategy: MINIMAL (footer only, no floating CTA).

First deliverable: read all 10 files above, then post ONE message summarizing (a) your understanding of the site, (b) the 8-task checklist with status, (c) any blockers or open questions for the user/PM before you start coding. Wait for go-ahead before running `npm install` or scaffolding code.
```
