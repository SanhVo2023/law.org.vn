# Owner Feedback — law.org.vn

**Review cycle**: pending — site is ready for first review (2026-04-27)
**Reviewer**: Mr Hien (Võ Thiện Hiển, Managing Partner)
**Builder agent session**: 2026-04-26 → 2026-04-27 (kickoff to MVP)

---

## Pre-review state (builder summary, for Mr Hien before first read-through)

**What's live (locally)**:
- 8/8 exit criteria from `BUILDER_BRIEF.md` complete
- Bilingual VN+EN site at `localhost:3010` (production build green)
- 100 effective SEO pages (50 topics × VI/EN locales) imported as Lexical JSON
- 6 categories + glossary index ready (glossary terms collection scaffolded but empty — content TBD)
- Payload admin at `/admin` with seeded admin (`matvietdesignteam@gmail.com`)
- All 12 published images wired from R2 CDN

**Known limitations (not bugs — pending Hien input)**:
1. **All 100 articles are AI-drafted** with `status: 'draft'` and visible "AI draft — pending SME review" badge. Citations stay generic ("Constitution 2013", "Civil Code 2015") with no specific article numbers — Hien needs to add or correct citations before flipping any article to `published`.
2. **Glossary terms collection is empty.** The 8 terminology cluster *landing pages* exist (under `/terminology/...`); individual term entries (e.g., individual definitions for "tố tụng", "án lệ") need content from Hien.
3. **Hero/article images use AI-generated R2 assets**. Hien may want to substitute real photos of Apolo offices, courthouses, etc.
4. **No site has been deployed yet** — preview URL pending PM sign-off on schema + content.

**How Hien should review**:
- Use the locally-running dev server at `http://localhost:3010` (or the Vercel preview URL once deployed)
- Browse: `/vi` (homepage VI) → `/en` (homepage EN) → category pages → at least one article per category → `/glossary`
- Log into `/admin` to inspect / edit content directly

---

<!-- Append F-001, F-002, ... below this line as feedback arrives. Format per HIEN_FEEDBACK_PROTOCOL.md §"File format" -->
