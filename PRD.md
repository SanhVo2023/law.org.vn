# PRD: law.org.vn -- Institutional Legal Knowledge Portal

**Document Version**: 1.0
**Created**: 2026-04-03
**Project Owner**: Apolo Lawyers (CONG TY LUAT APOLO LAWYERS)
**Managing Partner**: Luat su Vo Thien Hien (Henry Vo)
**Status**: Phase 1

---

## 1. Project Overview

| Field | Detail |
|---|---|
| **Domain** | law.org.vn |
| **Role in Ecosystem** | Institutional Authority -- the legal knowledge backbone for the entire Apolo Lawyers digital ecosystem |
| **Language** | Bilingual: Vietnamese (primary) + English |
| **Target Audience** | Citizens seeking legal knowledge, law students, junior lawyers, foreign nationals researching Vietnam law, journalists, academics |
| **Core Function** | Comprehensive legal system overview: court structure, legal procedures, basic rights, legal terminology, and institutional knowledge about Vietnam's legal framework |
| **CMS** | Independent PayloadCMS v3 instance |
| **Database** | Supabase PostgreSQL |
| **Tech Stack** | Next.js 15 (App Router) + PayloadCMS v3 + Supabase PostgreSQL + Tailwind CSS v4 + GSAP + Framer Motion |
| **Content Target** | 100 SEO-optimized content pages |

### Strategic Purpose

law.org.vn is the institutional trust anchor of the Apolo ecosystem. It does NOT sell services. It exists to:

1. Establish topical authority on Vietnam's legal system in both Vietnamese and English
2. Transfer domain authority via internal links to law.pro.vn, apolo.com.vn, and apololawyers.com
3. Capture top-of-funnel informational search traffic
4. Serve as a reference resource that earns natural backlinks from academia, media, and government

---

## 2. Design Direction

### Visual Identity: "Modern Legal Encyclopedia"

The design merges the credibility of a government institutional portal with the usability of modern knowledge platforms. Think **gov.uk meets Legal Information Institute (LII) meets Stripe Docs** -- authoritative yet approachable, dense with information yet never cluttered.

### Color Palette

| Role | Color | Hex |
|---|---|---|
| Primary | Navy Blue | #1B2A4A |
| Secondary | Slate Gray | #475569 |
| Accent | Gold (sparing, for emphasis) | #B8860B |
| Background | Off-White / Warm Gray | #F8F7F4 |
| Surface | White | #FFFFFF |
| Text Primary | Near-Black | #1A1A2E |
| Text Secondary | Medium Gray | #64748B |
| Border/Divider | Light Slate | #E2E8F0 |

### Typography

- **Headings**: Playfair Display (serif) -- conveys authority and tradition
- **Body**: Inter or Source Sans 3 (sans-serif) -- clean readability for dense legal text
- **Code/Legal References**: JetBrains Mono -- for article numbers, legal citations
- **Vietnamese text**: Ensure full diacritics support across all font families

### Mood & Tone

- Authoritative but accessible
- Academic but not elitist
- Structured, hierarchical, scannable
- No marketing language, no persuasion -- pure knowledge delivery
- Dense content presented with generous white space and clear visual hierarchy

### Key Design Elements

- **Breadcrumb navigation** on every page (critical for legal hierarchy)
- **Sidebar table of contents** that scrolls with content on long articles
- **Numbered section headings** reflecting legal document conventions
- **Pull-quote blocks** for key legal principles
- **Cross-reference cards** linking to related articles
- **Version/update badges** showing when content was last reviewed
- **Print-friendly layouts** (legal professionals print articles)
- **Dark mode** support for extended reading sessions

### Animations (Subtle)

- GSAP: Smooth scroll-linked progress bar on long articles
- Framer Motion: Gentle fade-in for content sections on scroll, sidebar slide transitions
- No decorative animations -- every motion serves navigation or reading UX

### Reference Sites

- gov.uk/guidance -- clean institutional design
- law.cornell.edu -- legal information architecture
- stripe.com/docs -- modern documentation UX
- constituteproject.org -- comparative legal knowledge design

---

## 3. Sitemap & Page Structure

### Vietnamese Routes (/vi/)

| URL | Page | Purpose |
|---|---|---|
| `/vi/` | Trang chu | Homepage: gateway to all legal knowledge sections |
| `/vi/he-thong-phap-luat` | He thong phap luat Viet Nam | Overview of Vietnam's legal system, sources of law |
| `/vi/he-thong-phap-luat/hien-phap` | Hien phap | Constitution of Vietnam |
| `/vi/he-thong-phap-luat/luat-va-bo-luat` | Luat va Bo luat | Laws and Codes |
| `/vi/he-thong-phap-luat/nghi-dinh` | Nghi dinh | Decrees |
| `/vi/he-thong-phap-luat/thong-tu` | Thong tu | Circulars |
| `/vi/he-thong-phap-luat/nghi-quyet` | Nghi quyet | Resolutions |
| `/vi/he-thong-toa-an` | He thong toa an | Court system overview |
| `/vi/he-thong-toa-an/toa-an-nhan-dan-toi-cao` | Toa an Nhan dan Toi cao | Supreme People's Court |
| `/vi/he-thong-toa-an/toa-an-cap-cao` | Toa an cap cao | High People's Courts |
| `/vi/he-thong-toa-an/toa-an-cap-tinh` | Toa an cap tinh | Provincial Courts |
| `/vi/he-thong-toa-an/toa-an-cap-huyen` | Toa an cap huyen | District Courts |
| `/vi/quy-trinh-to-tung` | Quy trinh to tung | Litigation procedures hub |
| `/vi/quy-trinh-to-tung/to-tung-dan-su` | To tung dan su | Civil procedure |
| `/vi/quy-trinh-to-tung/to-tung-hinh-su` | To tung hinh su | Criminal procedure |
| `/vi/quy-trinh-to-tung/to-tung-hanh-chinh` | To tung hanh chinh | Administrative procedure |
| `/vi/quy-trinh-to-tung/trong-tai-thuong-mai` | Trong tai thuong mai | Commercial arbitration |
| `/vi/quyen-phap-ly` | Quyen phap ly co ban | Basic legal rights hub |
| `/vi/quyen-phap-ly/quyen-cong-dan` | Quyen cong dan | Citizens' rights |
| `/vi/quyen-phap-ly/quyen-lao-dong` | Quyen lao dong | Labor rights |
| `/vi/quyen-phap-ly/quyen-nguoi-tieu-dung` | Quyen nguoi tieu dung | Consumer rights |
| `/vi/quyen-phap-ly/quyen-so-huu` | Quyen so huu tai san | Property rights |
| `/vi/thuat-ngu-phap-ly` | Thuat ngu phap ly | Legal terminology glossary |
| `/vi/hoi-dap-phap-luat-co-ban` | Hoi dap phap luat co ban | Basic legal FAQ |

### English Routes (/en/)

| URL | Page | Purpose |
|---|---|---|
| `/en/` | Home | English homepage |
| `/en/legal-system-vietnam` | Legal System | Vietnam legal system overview |
| `/en/legal-system-vietnam/constitution` | Constitution | Vietnam's Constitution |
| `/en/legal-system-vietnam/laws-and-codes` | Laws & Codes | Primary legislation |
| `/en/legal-system-vietnam/decrees` | Decrees | Government decrees |
| `/en/legal-system-vietnam/circulars` | Circulars | Ministerial circulars |
| `/en/court-system-vietnam` | Court System | Court structure overview |
| `/en/court-system-vietnam/supreme-peoples-court` | Supreme Court | SPC overview |
| `/en/court-system-vietnam/high-courts` | High Courts | High People's Courts |
| `/en/court-system-vietnam/provincial-courts` | Provincial Courts | Provincial level |
| `/en/court-system-vietnam/district-courts` | District Courts | District level |
| `/en/litigation-procedure-vietnam` | Litigation Procedure | Procedures hub |
| `/en/litigation-procedure-vietnam/civil-procedure` | Civil Procedure | Civil litigation |
| `/en/litigation-procedure-vietnam/criminal-procedure` | Criminal Procedure | Criminal process |
| `/en/litigation-procedure-vietnam/administrative-procedure` | Administrative Procedure | Admin litigation |
| `/en/litigation-procedure-vietnam/commercial-arbitration` | Commercial Arbitration | Arbitration |
| `/en/legal-rights-vietnam` | Legal Rights | Rights overview |
| `/en/legal-rights-vietnam/citizens-rights` | Citizens' Rights | Constitutional rights |
| `/en/legal-rights-vietnam/labor-rights` | Labor Rights | Employment rights |
| `/en/legal-rights-vietnam/consumer-rights` | Consumer Rights | Consumer protection |
| `/en/legal-rights-vietnam/property-rights` | Property Rights | Property ownership |
| `/en/legal-terminology-vietnam` | Legal Terminology | EN-VN legal glossary |
| `/en/legal-faq-vietnam` | Legal FAQ | Common legal questions |

### Shared Pages

| URL | Page | Purpose |
|---|---|---|
| `/sitemap.xml` | XML Sitemap | SEO sitemap |
| `/robots.txt` | Robots | Crawl instructions |

---

## 4. SEO Strategy

### Primary Keywords

| Keyword | Language | Search Intent | Target Page |
|---|---|---|---|
| he thong phap luat Viet Nam | VI | Informational | /vi/he-thong-phap-luat |
| Vietnam legal system | EN | Informational | /en/legal-system-vietnam |
| he thong toa an Viet Nam | VI | Informational | /vi/he-thong-toa-an |
| court system Vietnam | EN | Informational | /en/court-system-vietnam |
| quy trinh to tung dan su | VI | Informational | /vi/quy-trinh-to-tung/to-tung-dan-su |
| civil procedure Vietnam | EN | Informational | /en/litigation-procedure-vietnam/civil-procedure |
| sources of law Vietnam | EN | Informational | /en/legal-system-vietnam |

### Secondary Keywords

- thuat ngu phap ly Viet Nam / Vietnamese legal terminology
- quyen cong dan theo hien phap / constitutional rights Vietnam
- toa an nhan dan toi cao / Supreme People's Court Vietnam
- luat dan su Viet Nam / Vietnam civil law
- luat hinh su Viet Nam / Vietnam criminal law
- trong tai thuong mai Viet Nam / commercial arbitration Vietnam
- quy trinh khoi kien / how to file a lawsuit Vietnam
- luat lao dong Viet Nam / Vietnam labor law overview

### Schema.org Markup

| Page Type | Schema Types |
|---|---|
| Homepage | WebSite, Organization |
| Section hub pages | CollectionPage, BreadcrumbList |
| Article pages | Article, LegalForceDocument (where applicable) |
| Glossary | DefinedTermSet, DefinedTerm |
| FAQ | FAQPage, Question, Answer |
| All pages | BreadcrumbList |

### Technical SEO

- Hreflang tags on every page linking VI <-> EN equivalents
- Canonical URLs for each language version
- Structured breadcrumbs matching legal hierarchy
- JSON-LD for all schema markup
- Open Graph and Twitter Card meta for all pages
- Automatic sitemap generation from CMS
- Page speed target: LCP < 2.5s, CLS < 0.1

### Internal Linking Targets

- **Links TO**: law.pro.vn (contextual "deep analysis" links), apolo.com.vn (general firm links), apololawyers.com (service links in footer/sidebar)
- **Links FROM**: apolo.vn (supported by ecosystem hub)
- **Internal cross-linking**: Every article links to 3-5 related articles within law.org.vn

---

## 5. Content Plan for 100 SEO Pages

### Content Distribution

| Category | Vietnamese Pages | English Pages | Total |
|---|---|---|---|
| He thong phap luat / Legal System | 10 | 10 | 20 |
| He thong toa an / Court System | 8 | 8 | 16 |
| Quy trinh to tung / Litigation Procedure | 10 | 10 | 20 |
| Quyen phap ly / Legal Rights | 8 | 8 | 16 |
| Thuat ngu phap ly / Legal Terminology | 8 | 8 | 16 |
| Hoi dap co ban / Basic FAQ | 6 | 6 | 12 |
| **Total** | **50** | **50** | **100** |

### He thong phap luat / Legal System (20 pages)

1. Tong quan he thong phap luat Viet Nam / Overview of Vietnam's Legal System
2. Hien phap nuoc CHXHCN Viet Nam / Constitution of the Socialist Republic of Vietnam
3. He thong van ban quy pham phap luat / Hierarchy of Legal Documents
4. Luat va Bo luat: phan biet va pham vi / Laws vs. Codes: Distinctions and Scope
5. Nghi dinh cua Chinh phu / Government Decrees Explained
6. Thong tu huong dan / Ministerial Circulars
7. Nghi quyet cua Quoc hoi / National Assembly Resolutions
8. Quy trinh lam luat tai Viet Nam / The Legislative Process in Vietnam
9. Vai tro cua Dang Cong san trong he thong phap luat / Role of the Communist Party in the Legal System
10. So sanh phap luat Viet Nam voi he thong Common Law / Vietnam Civil Law vs. Common Law Systems

### He thong toa an / Court System (16 pages)

11. Tong quan he thong toa an Viet Nam / Vietnam Court System Overview
12. Toa an Nhan dan Toi cao / Supreme People's Court
13. Toa an Nhan dan Cap cao / High People's Courts
14. Toa an Nhan dan cap tinh / Provincial People's Courts
15. Toa an Nhan dan cap huyen / District People's Courts
16. Vien Kiem sat Nhan dan / People's Procuracy
17. Thi hanh an dan su / Civil Judgment Enforcement
18. Trong tai thuong mai quoc te tai VN / International Commercial Arbitration in Vietnam

### Quy trinh to tung / Litigation Procedure (20 pages)

19. Quy trinh to tung dan su / Civil Procedure Overview
20. Cach nop don khoi kien / How to File a Civil Lawsuit
21. Thu tuc hoa giai, doi thoai / Mediation and Dialogue Procedures
22. Thu tuc so tham dan su / First Instance Civil Procedure
23. Thu tuc phuc tham / Appellate Procedure
24. Thu tuc giam doc tham / Cassation Procedure
25. Quy trinh to tung hinh su / Criminal Procedure Overview
26. Quyen cua bi can, bi cao / Rights of Suspects and Defendants
27. Thu tuc to tung hanh chinh / Administrative Procedure Overview
28. Thu tuc giai quyet tranh chap lao dong / Labor Dispute Resolution Procedure

### Quyen phap ly / Legal Rights (16 pages)

29. Quyen cong dan theo Hien phap / Constitutional Rights of Citizens
30. Quyen tu do ngon luan / Freedom of Expression in Vietnam
31. Quyen so huu tai san / Property Ownership Rights
32. Quyen thua ke / Inheritance Rights
33. Quyen lao dong co ban / Fundamental Labor Rights
34. Quyen nguoi tieu dung / Consumer Protection Rights
35. Quyen cua nguoi nuoc ngoai tai VN / Rights of Foreigners in Vietnam
36. Quyen khieu nai, to cao / Right to Complain and Denounce

### Thuat ngu phap ly / Legal Terminology (16 pages)

37. Thuat ngu to tung dan su / Civil Procedure Terminology
38. Thuat ngu to tung hinh su / Criminal Procedure Terminology
39. Thuat ngu luat doanh nghiep / Corporate Law Terminology
40. Thuat ngu luat dat dai / Land Law Terminology
41. Thuat ngu luat hon nhan gia dinh / Family Law Terminology
42. Thuat ngu luat lao dong / Labor Law Terminology
43. Thuat ngu luat thuong mai / Commercial Law Terminology
44. Thuat ngu luat hanh chinh / Administrative Law Terminology

### Hoi dap co ban / Basic FAQ (12 pages)

45. Khi nao can thue luat su / When Do You Need a Lawyer
46. Chi phi kien tung tai Viet Nam / Costs of Litigation in Vietnam
47. Thoi hieu khoi kien la gi / What Are Statutes of Limitations
48. Lam gi khi bi bat giu / What to Do If You Are Detained
49. Cach xin tro giup phap ly mien phi / How to Access Free Legal Aid
50. Cach cong chung van ban / How to Notarize Documents in Vietnam

(Pages 51-100 are the English equivalents of 1-50)

### Content Types

- **Pillar Articles** (2,000-4,000 words): Comprehensive guides for each main section
- **Supporting Articles** (1,000-2,000 words): Detailed explanations of sub-topics
- **Glossary Entries** (grouped): Terminology pages organized by legal domain
- **FAQ Compilations**: Structured Q&A format with Schema.org FAQ markup

---

## 6. Contact Strategy

### Approach: Minimal / Institutional

law.org.vn is a knowledge authority site. Contact elements must be restrained to preserve the institutional, non-commercial feel.

| Element | Included | Notes |
|---|---|---|
| Footer contact info | Yes | Office address, phone, email -- text only |
| Floating CTA button | No | |
| Zalo widget | No | |
| Contact form | No | |
| WhatsApp | No | |
| Phone number in header | No | |
| "Powered by Apolo Lawyers" footer badge | Yes | Small, tasteful attribution with link to apolo.com.vn |

### Footer Contact Block

```
CONG TY LUAT APOLO LAWYERS
108 Tran Dinh Xu, Phuong Nguyen Cu Trinh, Quan 1, TP.HCM
Dien thoai: 0903 419 479
Email: contact@apolo.com.vn
```

---

## 7. CMS Collections (PayloadCMS v3)

### Collections

| Collection | Purpose | Key Fields |
|---|---|---|
| `pages` | Static pages (homepage, section hubs) | title, slug, language, content (rich text), seo (meta), breadcrumbs, relatedPages |
| `articles` | Legal knowledge articles | title, slug, language, category, content (rich text), summary, author, publishedDate, lastReviewed, seo, relatedArticles, tableOfContents (auto-generated) |
| `glossary-terms` | Legal terminology entries | term_vi, term_en, definition_vi, definition_en, category, relatedTerms, usage_examples |
| `faq-items` | FAQ question/answer pairs | question_vi, question_en, answer_vi, answer_en, category, schema_faq (boolean) |
| `categories` | Content categories | name_vi, name_en, slug, description, parentCategory |
| `media` | Images and documents | file, alt_text_vi, alt_text_en, caption, source_credit |
| `navigation` | Site navigation structure | label_vi, label_en, url, parentItem, order, section |
| `redirects` | URL redirects | from, to, statusCode |

### Globals

| Global | Purpose |
|---|---|
| `site-settings` | Site name, description, default SEO, analytics IDs |
| `footer` | Footer content, contact info, ecosystem links |
| `header` | Navigation structure, language switcher config |

---

## 8. AI Image Asset List (Nano Banana 2)

All images below should be generated with Nano Banana 2. No logos -- only editorial/illustrative imagery.

### Hero & Section Images

| ID | Prompt | Usage | Size |
|---|---|---|---|
| IMG-001 | "Aerial view of Vietnam National Assembly building in Hanoi, golden hour lighting, clean architectural photography, no people, soft warm tones, institutional feel" | Homepage hero | 1920x1080 |
| IMG-002 | "Minimalist illustration of a legal document hierarchy, flowing from constitution down to circulars, navy blue and gold color scheme, clean vector style on white background" | Legal System section hero | 1600x900 |
| IMG-003 | "Interior of a modern Vietnamese courtroom, wooden judge's bench, Vietnam national emblem on wall, empty courtroom, dramatic natural lighting through tall windows, dignified atmosphere" | Court System section hero | 1600x900 |
| IMG-004 | "Close-up of a gavel resting on Vietnamese legal code books, shallow depth of field, warm library lighting, dark wood tones" | Litigation Procedure section hero | 1600x900 |
| IMG-005 | "Abstract geometric illustration representing balance and justice, scales motif, navy and slate color palette, modern minimalist style" | Legal Rights section hero | 1600x900 |
| IMG-006 | "Open Vietnamese law dictionary with reading glasses on marble desk, soft ambient lighting, scholarly atmosphere, serif text visible but not readable" | Legal Terminology section hero | 1600x900 |
| IMG-007 | "Panoramic view of Ho Chi Minh City Supreme Court building exterior, clear sky, architectural detail focus, clean professional photography" | Court System sub-page | 1600x900 |

### Decorative & Supporting Images

| ID | Prompt | Usage | Size |
|---|---|---|---|
| IMG-008 | "Flat lay of legal research materials: Vietnam law books, highlighters, legal pad with notes, coffee cup, top-down view, clean white desk, soft shadows" | Article thumbnail template | 800x600 |
| IMG-009 | "Abstract pattern of overlapping legal document pages, navy blue tint, subtle texture, suitable as background pattern" | Background texture | 1920x1080 |
| IMG-010 | "Minimalist icon set: courthouse, gavel, scales of justice, legal document, handshake -- line art style, navy blue on white, consistent stroke weight" | Section icons | 400x400 each |
| IMG-011 | "Vietnam map outline with court system locations marked as subtle dots, clean infographic style, navy and gold on white" | Court system infographic base | 1200x1600 |
| IMG-012 | "Stack of Vietnamese legal codes (Bo Luat Dan Su, Bo Luat Hinh Su) on library shelf, warm wood tones, shallow depth of field" | Article illustrations | 800x600 |
| IMG-013 | "Modern Vietnamese law office interior, glass walls, legal books on shelves, no people, clean professional atmosphere, natural light" | About/Footer imagery | 1600x600 |
| IMG-014 | "Abstract flowing lines representing legal process flow, from filing to resolution, navy gradient, modern data visualization style" | Procedure section illustrations | 1200x400 |
| IMG-015 | "Vietnamese flag detail close-up, fabric texture, subtle golden star, warm red tones, macro photography style" | Constitution/Rights sections | 800x600 |

---

## 9. Internal Linking Strategy

### Outbound Links (law.org.vn links TO)

| Target Site | Link Context | Link Type |
|---|---|---|
| **law.pro.vn** | "For practitioner-level analysis of this topic..." at end of articles | Contextual in-content |
| **law.pro.vn** | "Thuc tien xet xu" (court practice) references | Sidebar related links |
| **apolo.com.vn** | Footer "Powered by" attribution | Footer |
| **apololawyers.com** | "Need legal representation?" -- very sparingly in FAQ section only | Contextual (minimal) |

### Inbound Links (sites linking TO law.org.vn)

| Source Site | Link Context |
|---|---|
| **apolo.vn** | Ecosystem hub linking to knowledge portal |
| All ecosystem sites | "Learn about Vietnam's legal system" reference links |

### Internal Cross-Linking Rules

1. Every article must link to its parent section hub page
2. Every article must link to 3-5 related articles within law.org.vn
3. Glossary terms mentioned in articles auto-link to glossary entries
4. Vietnamese articles link to their English equivalents (and vice versa) via hreflang AND visible language toggle
5. FAQ items link to detailed articles that expand on the answer
6. Section hub pages display all child articles in a structured list

---

## 10. Conversion Funnel

### Important Note

law.org.vn does NOT have a direct conversion funnel. It is an authority and trust-building asset. Its "conversion" is measured in:

### Primary KPIs

1. **Organic traffic volume** -- target: 10,000+ monthly sessions within 12 months
2. **Domain authority growth** -- target: DA 30+ within 12 months
3. **Backlink acquisition** -- target: 50+ referring domains within 12 months
4. **Referral traffic to ecosystem sites** -- target: 500+ monthly referrals to law.pro.vn and apololawyers.com

### Indirect Conversion Path

```
Visitor searches "he thong toa an Viet Nam"
  --> Lands on law.org.vn article
    --> Reads comprehensive guide
      --> Sees "For practitioner analysis, visit law.pro.vn" link
        --> Clicks through to law.pro.vn
          --> Eventually reaches apololawyers.com for services
```

### User Engagement Metrics

- Average time on page: target 4+ minutes (long-form legal content)
- Pages per session: target 2.5+ (cross-linking effectiveness)
- Bounce rate: target < 60%
- Return visitor rate: target 20%+ (reference resource value)

### Content Freshness Strategy

- All articles reviewed quarterly for legal accuracy
- "Last reviewed" date displayed prominently on each article
- Legal updates published within 7 days of significant law changes
- Evergreen content refreshed semi-annually for SEO

---

## Appendix: Technical Notes

### Internationalization (i18n)

- Use Next.js 15 App Router route groups: `(vi)` and `(en)`
- Middleware-based locale detection from Accept-Language header
- Default locale: Vietnamese
- URL structure: `/vi/...` and `/en/...` (no locale-less URLs)
- All CMS content stored with language field for filtering

### Performance Targets

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Core Web Vitals: All green
- First Contentful Paint: < 1.2s
- Time to Interactive: < 3.0s

### Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Screen reader optimized headings and landmarks
- Sufficient color contrast ratios (4.5:1 minimum)
- Alt text on all images (bilingual)
