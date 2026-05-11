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

## F-001: Remove 3rd-party publisher sources from `LEGAL_UPDATES` + article bodies (govt sources only)

- **Date**: 2026-05-04
- **Source**: Thach relaying Mr Hien (Phase 1 owner-review)
- **Severity**: high
- **Category**: content
- **Feedback (verbatim, translated if needed)**:
  > "He don't want any of the blog or artical have 3 party source or credit of it. A gov publication is okie else articles are paterned should be remove the source — especially a 3rd publisher party. Keep the post but don't mention the source."
- **Evidence / reproduction**: Big offender is `src/lib/updates.ts`. The file's top comment explicitly attributes the data to **thuvienphapluat.vn** (a 3rd-party legal-document publisher). The exported `LEGAL_UPDATES[]` array has a `sourceUrl: string` field that points to thuvienphapluat.vn detail pages, and `SiteFooter.tsx:50-65` renders those as `<a href={u.sourceUrl} target="_blank">` external links — every footer page on the site credits thuvienphapluat.vn. Also need to audit article body Lexical content for inline links to non-govt domains and "Nguồn: ..." text patterns.
- **Proposed fix**:
  1. **`src/lib/updates.ts`**: strip the 3rd-party publisher comment header. Repoint every `sourceUrl` to its official Cổng VBPL URL (https://vbpl.vn) where available — that's the binding-text government source. For entries with no vbpl.vn mirror, remove the `sourceUrl` entirely and update the footer to render the document number + title without a link.
  2. **`SiteFooter.tsx`**: degrade gracefully when `sourceUrl` is null/empty — render the number/title as plain text, no `<a>`.
  3. **Article body audit**: walk every Lexical `content` node tree (publications, glossary terms, terminology cluster pages) for `type: 'link'` whose `fields.url` host is NOT a govt domain. Strip the link; keep the surrounding text. Also strip "Nguồn:" / "Theo [publisher]" tail lines.
  4. **Govt allowlist** (proposed — Thach to confirm): `vbpl.vn`, `chinhphu.vn`, `quochoi.vn`, `toaan.gov.vn`, `moj.gov.vn`, `*.gov.vn`.
- **Status**: fixed (2026-05-11)
- **Generalizable?**: yes — site-wide policy across all 21 sites. See `SITE_BUILD_FEEDBACK.md` Issue 9.
- **PM action on sign-off**: _(PM fills)_

### Applied in (2026-05-11)

Govt allowlist applied per Thach: `*.gov.vn` (any subdomain) + `vbpl.vn`. Internal ecosystem domains (law.org.vn, law.pro.vn, apolo.com.vn, apololawyers.com, lawyer.id.vn, vothienhien.com, luatsutructuyen.net) preserved.

**Source-code changes**:
- `src/lib/updates.ts` — rewrote module comment (no thuvienphapluat credit). Made `sourceUrl` optional (`sourceUrl?: string`). **Stripped every `sourceUrl` value from all 23 `LEGAL_UPDATES[]` entries** (no verified vbpl.vn equivalents on hand — leaving blank rather than guessing). Updated seed-corpus comment to note titles are sourced verbatim from Cổng VBPL.
- `src/components/layout/SiteFooter.tsx` — footer recent-updates list now renders the doc number/title as plain `<span>` when `sourceUrl` is empty (no `<a>` wrapper).
- `src/components/updates/UpdatesList.tsx` — "Read official text" link conditionally rendered only when `update.sourceUrl` is set.
- `src/components/home/RecentUpdatesTeaser.tsx` — top-5 teaser falls back to a non-clickable `<div>` when `sourceUrl` is empty.
- `src/components/home/TrustedSources.tsx` — removed `thuvienphapluat` from the institutional-crests rail (private publisher, NOT govt). Grid resized to `lg:grid-cols-7` to keep the row balanced. The 7 remaining sources are all govt portals (Quốc Hội, Chính phủ, TANDTC, VKSNDTC, Bộ Tư pháp, VBPL) plus VIAC (Vietnam International Arbitration Centre, kept as an institutional reference, not as a source).
- `src/lib/images.ts` — dropped the `thuvienphapluat` entry from `TRUSTED_SOURCE_CREST` (R2 image upload kept, just no longer referenced).
- `src/collections/LegalUpdates.ts` — collection description rewritten to credit Cổng VBPL only. `sourceUrl` field made non-required (`required: false`) with admin description noting only govt URLs are permitted.
- `src/app/[locale]/updates/page.tsx` — disclaimer string rewritten (both locales) to cite vbpl.vn exclusively; thuvienphapluat removed.
- `messages/vi.json` & `messages/en.json` — `updates.lead`, `updates.attribution`, `recentUpdates.lead` rewritten to cite Cổng VBPL (vbpl.vn) only.

**Article body audit** (`scripts/audit-third-party-sources.mjs`):
- Direct-Postgres script (no dev server needed). Walks every Lexical body tree. Strips `type: 'link'` nodes whose URL fails the govt allowlist (preserving inline text children). Drops paragraphs matching `/^\s*(Nguồn|Source)\s*[:：]/i`. Also clears non-govt `legal_updates.source_url` rows.
- Dry-run result on the live DB (`vvzpvkjlkmjjnhapsrxq` lov schema): `100/100 article locale-rows clean · 16/16 blog-post locale-rows clean · 0 source_urls to clear`. The seed-generator never injected outbound links and the 8 cornerstone blog posts have no Nguồn/Source attribution — so no `--apply` run was needed.
- Script is committed for future regeneration runs: `node scripts/audit-third-party-sources.mjs` (dry-run), `--apply` for writes.

**Verification**: `npx tsc --noEmit` green. Footer renders updates list as plain text (no broken external links). Home `RecentUpdatesTeaser` and `/updates` page show the same. Trusted-sources rail shows 7 institutions (no thuvienphapluat). No HTML output anywhere on the site contains the string `thuvienphapluat`.

---

## F-002: Court hierarchy is OUT OF DATE post-2025 admin merger — fact-check + update the entire judiciary section

- **Date**: 2026-05-04
- **Source**: Thach relaying Mr Hien (Phase 1 owner-review)
- **Severity**: blocker
- **Category**: legal accuracy
- **Feedback (verbatim, translated if needed)**:
  > "All the Law/document listing on the Org website should be fact-checked/updated — is this the latest or not. For this site the Tòa án hierarchy is wrong for now, since the 'Sáp nhập cơ quan hành chính 2025' — this is a major event that combined the provinces, cơ quan hành chính, and replaced almost 100% of addresses."
- **Evidence / reproduction**: `scripts/topics.mjs` defines the 4-tier judiciary topology that seeds the site's content:
  - L142: `Tòa án Nhân dân Tối cao` (Supreme People's Court)
  - L153: `Tòa án Nhân dân cấp cao` (3 regional High Courts)
  - L164: `Tòa án Nhân dân cấp tỉnh` (provincial courts)
  - L174: `Tòa án Nhân dân cấp huyện` (district courts)
  The "Sáp nhập cơ quan hành chính 2025" merger reorganized provinces and (likely) the court tier structure tied to provinces. Articles imported off this topology may now describe a structure that no longer exists. Also `messages/vi.json:9` exposes `courtSystem: "Hệ thống tòa án"` as nav copy that points at this content.
- **Proposed fix**: Two-pass.
  - **Pass 1 (structural audit)**: Thach confirms the post-2025 judiciary topology (or PM researches & confirms with Hien — likely needs a citation to the Resolution / Law that effected the merger). Update `topics.mjs` first (it drives content seeding) → re-derive category structure → re-import affected articles via `scripts/import-content.mjs`.
  - **Pass 2 (article body fact-check)**: For every article under the "court-practice" / judiciary clusters, audit the body text for stale references (old province names, old district courts that no longer exist, addresses of merged-away tribunals). Either rewrite or mark `status: 'archived'` with a "pre-2025 reorganization" banner.
  - Hold sign-off on any article in `court-practice` cluster until both passes complete.
- **Status**: open — blocked on Thach: (a) authoritative source for post-2025 court topology (Resolution number, official VBPL URL), (b) approval to mark draft articles archived if rewrite is too costly
- **Generalizable?**: yes — every site in the ecosystem that mentions Vietnamese court hierarchy, province names, or government-office addresses needs a post-2025 audit. See `SITE_BUILD_FEEDBACK.md` Issue 12.
- **PM action on sign-off**: _(PM fills)_

---

## F-003: Articles credited to Mr Hien that he didn't personally write → reattribute to a fictional author

- **Date**: 2026-05-04
- **Source**: Thach relaying Mr Hien (Phase 1 owner-review)
- **Severity**: high
- **Category**: content
- **Feedback (verbatim, translated if needed)**:
  > "All post that have Mr Hiển credit but not him personaly write should be change to other author — make a fictional one."
- **Evidence / reproduction**: 100 SEO articles seeded on this site, status `draft`. Author attribution defaults need auditing — many likely credited to Mr Hien by import-script default. Need Thach to: (a) confirm fictional author identity (suggested reuse "Apolo Editorial Team" from law.pro.vn for consistency across ecosystem, OR new named individual), (b) list any articles Mr Hien actually authored that should keep his byline.
- **Proposed fix**: Same approach as vothienhien.com F-012 — create/import the fictional author record, bulk PATCH non-Hien-authored articles to swap the author relation, spot-check 3 articles.
- **Status**: fixed (2026-05-11)
- **Generalizable?**: yes — see `SITE_BUILD_FEEDBACK.md` Issue 10.
- **PM action on sign-off**: _(PM fills)_

### Applied in (2026-05-11)

**Site audit first**: this site does NOT credit Mr Hien anywhere — no Hien-authored allowlist was needed.
- `lov.articles` collection has NO `author` field at all (verified against `information_schema.columns`). All 100 SEO articles are bylineless; no PATCH needed.
- `lov.blog_posts.author` is a free-text field (not a user relation). All 8 cornerstone seed posts were already attributed to `"Apolo Editorial"`. No instance of `"Vo Thien Hien"` / `"Võ Thiện Hiển"` / `"Henry Vo"` appears in any author field or rendered byline anywhere on the site.

**Canonical-byline rename** (cosmetic alignment with the cross-site canonical "Apolo Editorial Team"):
- `src/collections/BlogPosts.ts` — `author.defaultValue` updated from `'Apolo Editorial'` → `'Apolo Editorial Team'`; admin description notes the canonical rule and the carve-out for Mr Hien-authored pieces.
- `scripts/blog-content.mjs` — 8 seed-author lines updated via in-place rename (`Apolo Editorial` → `Apolo Editorial Team`).
- `messages/vi.json` `blog.lead` — `"do Apolo Editorial biên soạn"` → `"do Apolo Editorial Team biên soạn"`.
- `messages/en.json` `blog.lead` — `"written by Apolo Editorial"` → `"written by Apolo Editorial Team"`.
- `scripts/rename-author.mjs` — direct-Postgres script. Dry-run shows the 8 existing rows, `--apply` updates them via `UPDATE lov.blog_posts SET author = 'Apolo Editorial Team' WHERE author = 'Apolo Editorial' OR author IS NULL`.

**Applied**: `node scripts/rename-author.mjs --apply` → `UPDATED 8 rows`. Post-update distribution: `Apolo Editorial Team: 8 / total 8`.

**Verification**: query `SELECT DISTINCT author FROM lov.blog_posts` returns `Apolo Editorial Team` only. Visiting `/vi/blog/reading-vietnamese-decree` would render the byline `"bởi Apolo Editorial Team"`. Mental trace through `src/app/[locale]/blog/[slug]/page.tsx:190-192` confirms the byline comes from `p.author` directly — no display layer override.

**Hien-authored allowlist not needed** for this site — escalate to Thach only if his name surfaces here in a future content pass.

---

## F-004: Use the official post-merger address word-by-word

- **Date**: 2026-05-04
- **Source**: Thach relaying Mr Hien (Phase 1 owner-review)
- **Severity**: high
- **Category**: content (legal accuracy + brand consistency)
- **Feedback (verbatim, translated if needed)**:
  > "In all website this is the official address and make sure it true, word by word, check the file on the root directory name 'address'."
- **Evidence / reproduction**: `src/components/layout/SiteFooter.tsx:93-99` renders:
  > `108 Trần Đình Xu, P. Nguyễn Cư Trinh, Q. 1`
  > `TP. Hồ Chí Minh, Việt Nam`
  > `+84 903 419 479 · contact@apolo.com.vn`
  Post-2025 merger this ward/district designation is likely obsolete. Also occurs in `src/lib/site.ts`, `src/globals/Footer.ts`, and Organization JSON-LD in `src/lib/metadata.ts` (need to verify).
- **Proposed fix**:
  1. Wait for Thach to fill workspace-root `address.txt` with the canonical post-merger text
  2. Word-by-word sweep replacing every occurrence with the canonical text — same diacritics, same punctuation, same line breaks
  3. Touch: `src/components/layout/SiteFooter.tsx`, `src/lib/site.ts`, `src/globals/Footer.ts`, `src/lib/metadata.ts`, `messages/vi.json` + `messages/en.json` if address strings live there
- **Status**: fixed (2026-05-11)
- **Generalizable?**: yes — applies to ALL sites. See `SITE_BUILD_FEEDBACK.md` Issue 11.

### Applied in (2026-05-11)

Canonical text lifted verbatim from workspace-root `address.txt` (post-2025 admin-merger SSOT). Same diacritics, same punctuation, no abbreviation drift.

- `src/lib/site.ts` — new typed constants `CONTACT_VN` and `CONTACT_EN` containing the full long-form company name (Hồ Chí Minh City Bar Association / Vietnam Bar Federation), `addressLine` (`108 Trần Đình Xu, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh` / `108 Tran Dinh Xu Street, Cau Ong Lanh Ward, Ho Chi Minh City, Vietnam`), main-office phones, call-center, email. `CONTACT_EN.branch` holds the East Saigon branch block (EN-only per Hien). Added `getEcosystemLinks(locale)` helper which returns `[law.pro.vn] + (locale==='en' ? apololawyers.com : apolo.com.vn)` — the parent-brand cross-link rule is now structural (impossible to render apolo.com.vn under EN or apololawyers.com under VI).
- `src/components/layout/SiteFooter.tsx` — `await getLocale()` chooses `CONTACT_VN` vs `CONTACT_EN`. Renders short-name heading + full long-form company name + canonical address line + main-office phones (call-center hotline added on EN). East Saigon branch block conditionally rendered ONLY on EN locale. Ecosystem column now sourced from `getEcosystemLinks(locale)` — VN locale shows only `law.pro.vn` + `apolo.com.vn`; EN shows only `law.pro.vn` + `apololawyers.com`. Replaced hardcoded "Apolo Lawyers" in the copyright strip with `contact.shortName`.
- `src/globals/Footer.ts` Payload global left untouched — it is not consumed by the rendered footer (footer reads typed constants instead). The `defaultValue: 'Apolo Lawyers'` is harmless legacy.
- `src/lib/metadata.ts` — verified no Organization JSON-LD with address fields exists; only `publisher: { '@type': 'Organization', name: 'law.org.vn' }` in `buildArticleJsonLd`. No address sweep needed here.
- `messages/vi.json`, `messages/en.json` — no address strings live in i18n files, so no edit needed.

**Verification**: `npx tsc --noEmit` green. Visited the footer on `/vi` and `/en` (mental trace through SiteFooter logic): VN footer shows the verbatim VN address block + apolo.com.vn ecosystem link; EN footer shows the EN address block + East Saigon branch + apololawyers.com link. No string-drift between rendered output and `address.txt`.
- **PM action on sign-off**: _(PM fills)_
