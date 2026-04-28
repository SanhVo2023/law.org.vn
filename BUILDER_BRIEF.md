# Builder Brief — law.org.vn

**Site**: law.org.vn — Institutional Authority (Phase 1)
**Language**: VN + EN (bilingual; Vietnamese primary)
**Supabase project**: `vvzpvkjlkmjjnhapsrxq` (region ap-northeast-2)
**Table prefix**: `lov_` — **MUST** appear in `postgresAdapter({ tablePrefix: 'lov_' })`
**Audience**: citizens, law students, foreign nationals researching VN law, journalists, academics

## Role in ecosystem
Trust anchor. Does NOT sell services. Passes authority to law.pro.vn, apolo.com.vn, apololawyers.com. Minimal contact surface (footer only).

## Reading order (do not skip)
1. `./PRD.md`
2. `./CLAUDE.md` (PM NOTICE at top)
3. `../../shared-assets/PAYLOAD_SETUP_SPEC.md`
4. `../../shared-assets/SUPABASE_CONFIG.md`
5. `../../shared-assets/SITE_BUILD_CHECKLIST.md`
6. `../../shared-assets/SITE_BUILD_FEEDBACK.md`
7. `../../shared-assets/LEXICAL_FORMAT_REFERENCE.md`
8. `../../shared-assets/CONTENT_GENERATION_GUIDE.md`
9. `../../shared-assets/IMAGE_MANIFEST_SCHEMA.md` (before editing `./image-assets.json`)
10. `../../shared-assets/HIEN_FEEDBACK_PROTOCOL.md` (if you reach owner review)

## Design direction summary (full spec in PRD.md)
- **Feel**: gov.uk meets Legal Information Institute meets Stripe Docs — authoritative, accessible, encyclopedic.
- **Colors**: Navy `#1B2A4A` primary, slate `#475569` secondary, gold `#B8860B` accent (sparing), off-white `#F8F7F4` bg.
- **Type**: Playfair Display (headings), Inter / Source Sans 3 (body), JetBrains Mono (citations).
- **Must-haves**: breadcrumbs on every page, sidebar TOC on long articles, numbered section headings, cross-reference cards, version/update badges, print-friendly layout, dark mode.

## Pre-migrate safety check (do this before `npx payload migrate`)
1. `src/payload.config.ts` → `postgresAdapter({ tablePrefix: 'lov_', ... })` set.
2. Ask PM (user) to run Supabase MCP `list_tables` on `vvzpvkjlkmjjnhapsrxq` and confirm no table starts with `lov_`.
3. Swap `.env` `DATABASE_URI` to direct (port 5432, no pgbouncer) just for the migrate step.
4. `npx payload migrate:status` → `npx payload migrate`.
5. Swap `DATABASE_URI` back to pooled (6543, pgbouncer=true) for runtime.
6. Verify: all new tables start with `lov_`, vothienhien.com and `lid_` tables untouched.

## Image workflow
1. `./image-assets.json` is scaffolded with the core set (hero, OG, favicon, practice-area icons, section backgrounds). Edit prompts to match final design, add more as needed.
2. Icon entries use transparent PNG + antique gold + strong/sturdy lines per F-010 rule from vothienhien.com. Keep that pattern.
3. When ready, tell user: "Manifest ready. Run `tools/image-generator-ui` → `/batch`, select law.org.vn, Test → Approve → Generate & Upload."
4. After Finish: `node scripts/implement-assets.js` copies to `public/images/` and generates `src/lib/images.ts`.
5. Add R2 CDN host to `next.config.ts` `images.remotePatterns`.

## Contact strategy
**MINIMAL** — footer contact block only. No floating CTA, no forms, no phone CTA, no Zalo, no WhatsApp. Use `../../shared-assets/contact-blocks/CONTACT_VI.md` and `CONTACT_EN.md` for canonical data.

## Internal linking
- **Link TO**: law.pro.vn, apolo.com.vn, apololawyers.com
- **Supported BY**: apolo.vn
- **DO NOT** link directly to practice-area conversion sites.

## Exit criteria (mark done only when demonstrably true)
1. PRD reviewed; any blockers raised with PM before coding.
2. CLAUDE.md has `lov_` prefix confirmed; shared-assets references intact.
3. `npm run dev` serves frontend at `/` and admin at `/admin`; types generated.
4. All collections from PRD implemented.
5. 100 SEO pages generated → converted to Lexical JSON → imported via API → verified on frontend.
6. SEO: sitemap, robots, metadata, JSON-LD, OG images, hreflang vi/en.
7. Design: navy/gold encyclopedia aesthetic per PRD; breadcrumbs, TOC, print layout, dark mode.
8. Deploy preview URL on Vercel; share with PM; create `HIEN_FEEDBACK.md` from `HIEN_FEEDBACK_PROTOCOL.md` template when ready for owner review.

## Status reporting
After each checklist item, one-line chat message to user: "law.org.vn — item N/8 complete, {detail}". PM syncs dashboard.
