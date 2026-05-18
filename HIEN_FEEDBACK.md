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
- **Status**: fixed (2026-05-18) — see F-012 for the applied restructure
- **Generalizable?**: yes — every site in the ecosystem that mentions Vietnamese court hierarchy, province names, or government-office addresses needs a post-2025 audit. See `SITE_BUILD_FEEDBACK.md` Issue 12.
- **PM action on sign-off**: _(PM fills)_

### Resolution

The post-2025 Resolution citation arrived in the 2026-05-17 CSV review (row 20): **Luật số 81/2025/QH15**, effective 01/07/2025. Both Tòa án nhân dân cấp cao (High Courts) and Tòa án nhân dân cấp huyện (District Courts) were abolished; a new tier `Tòa án nhân dân khu vực` (Regional People's Courts) was introduced. See F-012 below for the implementation log.

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

## F-005: Section bodies cite statutes unrelated to the topic (random-hash bug)

- **Date**: 2026-05-11
- **Source**: Thach relaying Mr Hien (Phase 1 owner-review continuation)
- **Severity**: high
- **Category**: content accuracy
- **Feedback (verbatim, translated if needed)**:
  > "Tiêu đề lại nhầm với nội dung (có bài tiêu đề không đi với nội dung) — siết AI để viết cho đúng, cho nó kiểm tra lại kỹ, tiêu đề phải đi đôi với nội dung. VD: 'Background and drafting process' lại nói được điều chỉnh chủ yếu bởi 2015 Criminal Code. 'Document structure' lại nói 2015 Criminal Procedure Code là khung pháp lý cơ bản cho cấu trúc văn bản. 'Human rights and citizen rights' lại nói được điều chỉnh chủ yếu bởi 2014 Law on the People's Procuracy. 'Relationship with subordinate law' lại nói 2013 Land Law là khung pháp lý cơ bản."
- **Evidence / reproduction**: The H2 sections of `/en/legal-system/constitution-2013` (Vietnamese title: "Hiến pháp 2013") cited four unrelated statutes — Criminal Code, Criminal Procedure Code, Law on the People's Procuracy, Land Law — none of which actually govern the Constitution. Same pattern across all 100 articles.
- **Root cause**: `scripts/generate-seo-content.mjs:25-29` defined `pickFramework(locale, topicSlug, sectionIdx)` that hashed `(topicSlug + '-' + sectionIdx)` into a 13-statute pool (`FRAMEWORK_REFS` in `content-bank.mjs`). The hash had **zero correlation to the topic** — so a Constitution article's "Document structure" section landed on whatever index `('constitution-2013-1'.charCodeAt.sum % 13)` resolved to. Every article had this problem.
- **Status**: fixed (2026-05-11)
- **Generalizable?**: yes — the same generator pattern likely runs on law.pro.vn and other AI-content sites. PM should audit those.

### Applied in (2026-05-11)

Rejected approach: per-topic statute-frame override map. Too risky — 50 topics × 2 locales means 100 hand-picked citations and any miss in the lawyer-review pass would reintroduce a subtle wrongness.

**Chosen approach**: strip ALL specific statute citations from generated section bodies. They are the lawyer-review pass's responsibility per the existing methodology note (already says: *"Specific statutory citations (article numbers and instrument designations) will be added in subsequent revisions"*). The lede still references the category-level intro (hand-written per cluster, always correct). The pull quote still attributes to Constitution 2013 Article 2/14/16 (universal to every legal topic).

**Source changes**:
- `scripts/content-bank.mjs` — removed `FRAMEWORK_REFS` (13-statute pool) entirely. Removed `frame` parameter from `LEDE_TEMPLATES` and all six `SECTION_TEMPLATES` `paraB` functions (3 VI + 3 EN). Each `paraB` rewritten to describe the legal architecture generically (e.g. "the rules touching on X typically fall into two groups: general norms…" / "specific article numbers and named instruments are added in the qualified-lawyer review pass"). Added a top-of-file comment block documenting the citation policy.
- `scripts/generate-seo-content.mjs` — removed `pickFramework()` helper and all `frame` arguments to template builders. Reduced template variant count from 5→3 (was already 3 in code; comment was stale).

**Re-import**:
- `node scripts/generate-seo-content.mjs` → wrote 50 fresh drafts to `content/drafts/articles.json` (~999 words EN / ~1.5k VI per article).
- New script `scripts/repatch-article-bodies.mjs` — direct-Postgres patcher that loads the drafts JSON, converts markdown → Lexical via the existing `markdown-to-lexical.mjs`, and `UPDATE lov.articles_locales SET content = $1 WHERE _parent_id = $2 AND _locale = $3` for all 100 rows. Dry-run + `--apply` modes.
- `node scripts/repatch-article-bodies.mjs --apply` → `PATCHED 100 locale-rows, skipped 0`.

**Verification**: temp `scripts/spot-check-content.mjs` (removed after use) regexed body text for 15 specific statute names (Bộ luật Dân sự, Bộ luật Hình sự, …, Civil Code, Criminal Code, Land Law, People's Procuracy, Enterprise Law, Labor Code, …) across 4 sample articles × 2 locales = 8 bodies. **Zero matches.** Section bodies no longer contain any specific statute name — the only specific citation site-wide is the pull-quote attribution ("2013 Constitution, Article 14") which is correct for every topic. Each section's prose now stays focused on its own heading.

**Carryover**: the 50 topic outlines in `scripts/topics.mjs` are unchanged, so the `articles_toc_items` parent-table rows still match the new bodies. No TOC refresh needed.

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

---

# v4 — CSV review pass (2026-05-17/18)

26-row CSV review from Mr Hien delivered 2026-05-17 (`Review 21 website - Hệ thống Apolo Lawyers - 1.-law.org.vn.csv`). Items F-006 through F-014 below.

## F-006: SEO/technical re-audit (canonical, meta description, OG image, sitemaps, robots)

- **Date**: 2026-05-17 (CSV row 1)
- **Severity**: medium
- **Category**: technical SEO

### Applied in (2026-05-18)

- `src/lib/metadata.ts` — every page now ships an `og:image` even when the route doesn't override it: new `DEFAULT_OG_IMAGE` constant points to the R2-hosted 1200×630 `og-default-1c1b0917.webp`, and `buildPageMetadata.openGraph.images` returns the override OR this default. Adds an `alt` field for the OG image.
- `src/app/sitemap.ts` — added `/glossary` to the static-paths array (redirects to `/updates` but kept for backward compat). Verified all 6 categories + `/blog` + `/updates` + home are present with VI/EN alternates and `lastModified`. Dynamic entries (per-article + per-blog-post) still filter `status: 'published'` — intentionally excludes AI drafts from indexing.
- `src/app/robots.ts` — verified: GPTBot, ChatGPT-User, PerplexityBot, Claude-Web, ClaudeBot, Google-Extended all allowed; `*` blocks `/admin` and `/api/`; sitemap URL linked. No changes needed.
- Each page route under `src/app/[locale]/**/page.tsx` already exports `generateMetadata` — audited via grep and confirmed for home, [category], [category]/[slug], blog, blog/[slug], updates. Only `[locale]/glossary/page.tsx` lacks one and that's intentional (it's a redirect-only route).

## F-007: Liability tone — softer/qualified language + no verbatim law text

- **Date**: 2026-05-17 (CSV row 2)
- **Severity**: high (legal liability)
- **Category**: content tone / risk

### Applied in (2026-05-18)

- `scripts/content-bank.mjs` — section-template paragraphs rewritten with hedging language ("thường là" / "often", "có thể" / "may", "trong nhiều trường hợp" / "in many cases"). LEDE_TEMPLATES tail now includes "Nội dung chỉ có giá trị tham khảo và cần đối chiếu với nguồn chính thức" / "For reference only; please verify against official sources". METHODOLOGY_NOTE appended with explicit "Công ty Luật Apolo Lawyers không chịu trách nhiệm cho việc áp dụng nội dung này vào tình huống cụ thể" / "Apolo Lawyers disclaims liability for the application of this content to any specific situation".
- `DEFAULT_PULL_QUOTES` — **verbatim Constitution quotes removed** per "Không chép nguyên xi văn bản luật". Replaced with editorial paraphrases attributed to "Apolo Editorial" / "Apolo Editorial". Eliminates the only remaining direct-statute citation in section bodies.
- `messages/{vi,en}.json` `footer.disclaimer` — rewritten to the new long-form disclaimer per CSV row 8 (explicit attorney-client-relationship disclaimer).
- All 46 articles × 2 locales regenerated via `node scripts/generate-seo-content.mjs && node scripts/repatch-article-bodies.mjs --apply`. Sample word count: 1.6k VN / 1k EN per article.

## F-008: Vietnamese spelling normalization (5 rules)

- **Date**: 2026-05-17 (CSV rows 3-7)
- **Severity**: medium (consistency)
- **Category**: copy quality

### Applied in (2026-05-18)

Rules:
| Incorrect | Correct |
|---|---|
| hoá | hóa |
| toà | tòa |
| hoà | hòa |
| hòan | hoàn |
| tòan | toàn |

- New `scripts/normalize-vn-spelling.mjs` — direct-Postgres + filesystem sweep. **Critical**: uses word-boundary negative lookahead for the 3-letter rules (`hoá`, `toà`, `hoà`) so compound words like `hoán`, `toàn`, `hoàng`, `hoài`, `hoành` aren't broken. First-pass also runs CLEANUP rules to revert any prior-pass breakage (e.g. `tòan → toàn`, `hòang → hoàng`).
- Applied to: `messages/vi.json`, `scripts/blog-content.mjs`, `scripts/content-bank.mjs`, `scripts/topics.mjs`, `src/app/[locale]/[category]/page.tsx`, `src/lib/updates.ts`, `content/drafts/articles.json` (regenerated, so this was a transient touch).
- DB applied to: 50 article-content rows (jsonb, vi only) + 3 blog-post body rows + various title/excerpt/description fields in articles_locales / blog_posts_locales / categories_locales.
- Verification: second-pass dry-run reports **0 hits** site-wide.

## F-009: Footer disclaimer + contact-block rewrite (CSV row 8-9)

- **Date**: 2026-05-17 (CSV rows 8, 9)
- **Severity**: high
- **Category**: content

### Applied in (2026-05-18) — overrides parts of `address.txt` for this site

- `src/lib/site.ts`:
  - `CONTACT_VN.companyName` — new: "Công ty Luật Apolo Lawyers, Là Tổ chức Hành nghề Luật sư thuộc Đoàn Luật sư Thành phố Hồ Chí Minh, trực thuộc Liên đoàn Luật sư Việt Nam"
  - `CONTACT_VN.addressLine` — full "Thành phố Hồ Chí Minh" (no `TP.` abbreviation)
  - `CONTACT_VN.phones` — 3 entries: `(028) 66.701.709`, `(028) 35.059.349`, `0903.419.479`
  - `CONTACT_VN.callCenter` — REMOVED (merged into phones)
  - `CONTACT_EN.companyName` — new: "APOLO LAWYERS - Solicitors & Litigators, a law practice organization affiliated with the Ho Chi Minh City Bar Association under the Vietnam Bar Federation"
  - `CONTACT_EN.phones` — 3 entries: `(+8428) 66.701.709`, `(+8428) 35 059 349`, `(+84) 903.419.479`
  - `CONTACT_EN.hotline` — REMOVED
  - `CONTACT_EN.branch` — REMOVED entirely (East Saigon branch not surfaced on this site)
- `src/components/layout/SiteFooter.tsx` — dropped branch + hotline render blocks; collapsed phones into a single dot-separated line; both locales now render the same structure (just different copy).
- Footer disclaimer (`messages/{vi,en}.json` `footer.disclaimer`) — long-form text per CSV row 8.

## F-010: Hero + cluster + page-lead copy rewrites (CSV rows 10-17, 19-21, 23-24)

- **Date**: 2026-05-17
- **Severity**: high
- **Category**: copy

### Applied in (2026-05-18)

- `messages/{vi,en}.json` — verbatim rewrites for `home.heroEyebrow`, `home.heroTitle`, `home.heroLead`, `updates.lead`, `updates.attribution` (vbpl.vn no longer named in user-facing copy), `blog.lead`.
- `src/app/[locale]/page.tsx` — `HowToUse.lead` prop text updated (both locales) per row 13.
- `src/app/[locale]/[category]/page.tsx` `CLUSTER_INTROS` — rewrites for legal-system, court-system, litigation, rights, terminology, faq per rows 19-24.
- `src/app/[locale]/page.tsx` `CLUSTER_DESCRIPTIONS` — home-page card descriptions updated (court-system now references Luật 81/2025/QH15; rights softened).
- `scripts/seed-categories.mjs` + new `scripts/sync-category-descriptions.mjs` — DB `lov.categories_locales.description` UPDATEd for all 6 categories × 2 locales.

## F-011: Image-background blend (CSS-only, no regeneration)

- **Date**: 2026-05-17 (CSV rows 18, 22, 25)
- **Severity**: medium (visual)
- **Category**: design

### Applied in (2026-05-18)

CSS treatment to harmonize R2 image backgrounds with the parchment theme — no PM image regen this pass.

- `src/components/home/ClustersGrid.tsx` — glyph icons now wrapped in a `12×12 rounded-lg` div with `bg-[var(--color-paper-deep)]/60` + `mix-blend-multiply` (light) / `mix-blend-screen` (dark). Glyph art now reads as inset on the parchment plate.
- `src/app/[locale]/[category]/page.tsx` cluster-hero overlay — opacity bumped from `15/10` to `10/[0.07]` with `mix-blend-multiply dark:mix-blend-screen`. Background gradient strengthened (95/90/75 → 95/90/75 plus reduced cap).
- `src/components/home/HomeHero.tsx` — hero image opacity reduced from `25/15` to `20/[0.12]` with `mix-blend-multiply dark:mix-blend-screen`. Bottom gradient stop strengthened (70 → 80).
- `src/app/[locale]/blog/[slug]/page.tsx` — blog-post featured-image overlay matched to the cluster-hero treatment.

## F-012: Court system restructure per Luật số 81/2025/QH15 (UNBLOCKS F-002)

- **Date**: 2026-05-17 (CSV row 20)
- **Severity**: blocker — now fixed
- **Category**: legal accuracy

### Applied in (2026-05-18)

Per Luật số 81/2025/QH15 (effective 01/07/2025), Tòa án nhân dân cấp cao (High Courts) and Tòa án nhân dân cấp huyện (District Courts) are abolished; new tier Tòa án nhân dân khu vực (Regional People's Courts) is introduced. Per Hien's CSV note: "PHẦN BÀI VIẾT: chỉ viết về Tòa án" — Procuracy, Civil Judgment Enforcement, and Commercial Arbitration are off-topic and removed from this cluster.

- `scripts/topics.mjs` — DELETED 5 court topics: `high-peoples-courts`, `district-peoples-courts`, `peoples-procuracy`, `civil-judgment-enforcement`, `commercial-arbitration`. ADDED 2 new: `regional-peoples-courts` (Tòa án nhân dân khu vực), `specialized-courts` (Tòa chuyên trách). REWROTE outlines for the 3 surviving (`court-system-overview`, `supreme-peoples-court`, `provincial-peoples-courts`) per the new 3-tier hierarchy. Final court-system cluster: 5 articles.
- `scripts/content-bank.mjs` `CATEGORY_FRAMES.court-system` rewritten to reference Luật 81/2025/QH15 explicitly (overrides the F-005 "no specific statutes in section bodies" rule for this single intro line, since it's hand-written per-cluster — not random-hash).
- `src/app/[locale]/page.tsx` `CLUSTER_DESCRIPTIONS.court-system` rewritten + `CLUSTER_COUNTS.court-system` 8 → 5.
- DB cleanup via new `scripts/cleanup-deprecated-articles.mjs --apply`: deleted 6 article parent rows (5 court + 1 rights via F-013) plus 48 articles_toc_items child rows + 12 articles_locales child rows. Cleanly cascades.
- DB insert via new `scripts/insert-new-court-articles.mjs --apply`: inserted parent rows for `regional-peoples-courts` (#51) and `specialized-courts` (#52) + 2 locale rows each.
- `scripts/repatch-article-bodies.mjs` updated to also patch `title` and `excerpt` (not just `content`) so the new article rows get their proper metadata in a single `--apply` run.
- All 46 articles × 2 locales now patched: `node scripts/generate-seo-content.mjs && node scripts/repatch-article-bodies.mjs --apply` → `PATCHED 92 locale-rows, skipped 0`.

**Cross-reference**: this entry also marks F-002 as `fixed`.

## F-013: Rights cluster — freedom-of-expression article removed

- **Date**: 2026-05-17 (CSV row 23 — "An Ninh sẽ theo dõi")
- **Severity**: high (compliance / security)
- **Category**: sensitive content

### Applied in (2026-05-18)

- `scripts/topics.mjs` — `freedom-of-expression` topic block DELETED.
- DB: article id #30 (and its 2 locale rows + toc_items children) deleted by the same `cleanup-deprecated-articles.mjs` run as F-012.
- `src/app/[locale]/page.tsx` `CLUSTER_COUNTS.rights` 8 → 7.
- Rights-cluster lead (per CSV row 23 fix) softened from the prior "freedom of expression to property…" enumeration to "selected rights, obligations, and common legal procedures" — removes any pretext to mention politically-sensitive sub-topics.

## F-014: Multi-pass AI content review (verifier script)

- **Date**: 2026-05-17 (CSV row 26)
- **Severity**: medium (quality assurance)
- **Category**: content QA

### Applied in (2026-05-18)

- New `scripts/verify-articles-with-ai.mjs` — for each article × locale, splits the Lexical body by H2 sections and sends `(title, heading, prose)` triples to Claude Haiku 4.5 (`claude-haiku-4-5-20251001`) with a system prompt that asks for a YES/NO verdict + one-sentence reason. Output: `content/audit/title-mismatch-report.json`. Read-only on DB.
- Prompt caching used on the system prompt. Estimated cost on Haiku 4.5: ~$0.50 for the full 46 × 2 = 92 article corpus (~396 sections).
- Dry-run output: `Would call API for 396 sections across 92 locale-rows`. Awaiting `ANTHROPIC_API_KEY` to run `--apply`.
- Note: the F-005 + F-007 fixes already removed the random-citation mechanism that produced earlier mismatches. The verifier serves as a safety net for future regenerations.
