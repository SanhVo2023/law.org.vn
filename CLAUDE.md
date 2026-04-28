# law.org.vn - Institutional Authority

> **PM NOTICE (2026-04-20)** — Kickoff for Phase 1 Authority Backbone, site 3 of 4. Read in this order before writing any code:
> 1. `./BUILDER_BRIEF.md` (this folder) — table prefix, reading order, image workflow, exit criteria
> 2. `./PRD.md` — design direction, 100-page content plan, institutional encyclopedia tone
> 3. `../../shared-assets/PAYLOAD_SETUP_SPEC.md` — canonical Payload config
> 4. `../../shared-assets/SUPABASE_CONFIG.md` — table prefix `lov_` on project `vvzpvkjlkmjjnhapsrxq`
> 5. `../../shared-assets/SITE_BUILD_CHECKLIST.md`, `SITE_BUILD_FEEDBACK.md`, `LEXICAL_FORMAT_REFERENCE.md`, `CONTENT_GENERATION_GUIDE.md`
>
> **CRITICAL — before first `npx payload migrate`**: set `tablePrefix: 'lov_'` in `src/payload.config.ts` → `postgresAdapter()`. This site shares Supabase `vvzpvkjlkmjjnhapsrxq` with vothienhien.com (unprefixed, grandfathered) and lawyer.id.vn (`lid_`). Migrating without `lov_` will collide and corrupt.
>
> **Image workflow**: write `./image-assets.json` (scaffolded for you — edit/extend), then stop and ask user to run `tools/image-generator-ui` → `/batch`. Do NOT call Gemini directly.
>
> **Design refs**: check `./design-refs/` — if empty when you start, design from PRD directly (gov.uk / Stripe Docs feel, navy #1B2A4A + gold #B8860B).

## Project Overview
- **Domain**: law.org.vn
- **Role in Ecosystem**: Legal knowledge portal - authority backbone for entire ecosystem. Explains Vietnam legal system, court structure, procedures.
- **Language**: VN+EN (bilingual)
- **Phase**: Phase 1
- **Target Audience**: Vietnamese citizens seeking legal knowledge, foreign individuals/businesses needing to understand Vietnam legal system

## Tech Stack
- **Framework**: Next.js 15 (App Router) with TypeScript
- **CMS**: PayloadCMS v3 (embedded in Next.js)
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS v4 + @tailwindcss/typography
- **Animations**: GSAP (ScrollTrigger for scroll) + Framer Motion (UI transitions)
- **Font**: Be_Vietnam_Pro (Vietnamese diacritics) for VN sites, Inter for EN-only sites
- **i18n**: next-intl (if bilingual)
- **SEO**: Built-in metadata API + schema-dts + @payloadcms/plugin-seo
- **Image Processing**: sharp
- **Deployment**: Vercel (frontend) + Supabase (database)
- **AI Images**: Generated with Nano Banana 2 (Google Gemini 3.1 Flash Image)

## Coding Conventions
- Use TypeScript strict mode
- Use Server Components by default, Client Components only when needed ('use client')
- Use App Router file conventions (page.tsx, layout.tsx, loading.tsx, error.tsx)
- Every page must export generateMetadata or have static metadata
- Every page must include JSON-LD structured data via <JsonLd> component
- Use next/image for all images with descriptive alt text
- Use next/font for font loading (Be_Vietnam_Pro or Inter)
- SSG for all public pages, ISR (revalidate: 3600) for blog/article content
- Tailwind for all styling - no CSS modules, no styled-components
- GSAP for scroll animations, Framer Motion for page transitions and hover effects
- Mobile-first responsive design (breakpoints: sm:640, md:768, lg:1024, xl:1280)

## PayloadCMS Conventions
- Collections use kebab-case slugs
- All content fields that contain text should be localized (if bilingual site)
- Use Lexical editor for rich text
- SEO plugin enabled on main content collections
- Media collection with image sizes: thumbnail (400x300), card (768x512), hero (1920x1080), og (1200x630)
- Hooks: auto-slug generation, ISR revalidation on publish
- Users collection with admin/editor roles

## SEO Requirements
- Every page: meta title, description, OG image, canonical URL
- Bilingual sites: hreflang alternates for vi/en
- robots.ts: Allow AI bots (GPTBot, ChatGPT-User, PerplexityBot, Claude-Web)
- sitemap.ts: Dynamic from CMS, include lastModified and priority
- Schema.org JSON-LD on every page (minimum: BreadcrumbList)
- FAQ schema on pages with FAQ sections
- Core Web Vitals targets: LCP <2.5s, CLS <0.1, INP <200ms

## Internal Linking Rules
- Link TO: law.pro.vn (authority cascade), apolo.com.vn (brand trust VN), apololawyers.com (brand trust EN)
- Supported BY: apolo.vn
- DO NOT link directly to practice-area conversion sites

## Contact Strategy
MINIMAL - Footer contact only. No floating buttons, no forms, no phone CTA, no Zalo.

## Key Commands
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Generate PayloadCMS types
npx payload generate:types

# Run database migration
npx payload migrate

# Build for production
npm run build
```

## Important Notes
- Read PRD.md in this directory for full requirements, design direction, and content plan
- This site needs 100 SEO content pages created in the CMS
- All non-logo images should be generated with Nano Banana 2
- The site must be production-ready, responsive, and optimized for Core Web Vitals
- Follow the ecosystem's internal linking strategy strictly
