#!/usr/bin/env node
/**
 * Auto-generated asset implementation script for law.org.vn
 * Generated: 2026-04-28T12:57:01.638Z
 *
 * This script copies all generated images into public/images/
 * and outputs a mapping file the site code can import.
 *
 * Usage: node scripts/implement-assets.js
 */

const fs = require("fs");
const path = require("path");

const ASSETS = [
  {
    "id": "hero-home",
    "name": "Homepage Hero — Institutional Gravitas",
    "category": "hero",
    "width": 1920,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-home-19284bd2.webp",
    "local_path": "assets/hero/hero-home.webp",
    "alt": "Homepage Hero — Institutional Gravitas - law.org.vn"
  },
  {
    "id": "hero-court-structure",
    "name": "Court Structure Page Hero",
    "category": "hero",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-court-structure-390c1946.webp",
    "local_path": "assets/hero/hero-court-structure.webp",
    "alt": "Court Structure Page Hero - law.org.vn"
  },
  {
    "id": "hero-legal-system",
    "name": "Legal System Overview Hero",
    "category": "hero",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-legal-system-41b500f7.webp",
    "local_path": "assets/hero/hero-legal-system.webp",
    "alt": "Legal System Overview Hero - law.org.vn"
  },
  {
    "id": "og-default",
    "name": "OG Card — Default",
    "category": "og",
    "width": 1200,
    "aspect": "1200:630",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/og/og-default-1c1b0917.webp",
    "local_path": "assets/og/og-default.webp",
    "alt": "OG Card — Default - law.org.vn"
  },
  {
    "id": "icon-scales",
    "name": "Icon — Scales of Justice (navigation / section mark)",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/icon-scales-ce6d32dc.webp",
    "local_path": "assets/icon/icon-scales.webp",
    "alt": "Icon — Scales of Justice (navigation / section mark) - law.org.vn"
  },
  {
    "id": "icon-gavel",
    "name": "Icon — Gavel",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/icon-gavel-63adea77.webp",
    "local_path": "assets/icon/icon-gavel.webp",
    "alt": "Icon — Gavel - law.org.vn"
  },
  {
    "id": "icon-pillar",
    "name": "Icon — Classical Pillar",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/icon-pillar-bb3b5ca6.webp",
    "local_path": "assets/icon/icon-pillar.webp",
    "alt": "Icon — Classical Pillar - law.org.vn"
  },
  {
    "id": "icon-book",
    "name": "Icon — Open Law Book",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/icon-book-89a77cb1.webp",
    "local_path": "assets/icon/icon-book.webp",
    "alt": "Icon — Open Law Book - law.org.vn"
  },
  {
    "id": "icon-document",
    "name": "Icon — Legal Document with Seal",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/icon-document-8be392c0.webp",
    "local_path": "assets/icon/icon-document.webp",
    "alt": "Icon — Legal Document with Seal - law.org.vn"
  },
  {
    "id": "icon-shield",
    "name": "Icon — Shield of Rights",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/icon-shield-2c3c0fbf.webp",
    "local_path": "assets/icon/icon-shield.webp",
    "alt": "Icon — Shield of Rights - law.org.vn"
  },
  {
    "id": "icon-favicon",
    "name": "Favicon — Mini Scales",
    "category": "icon",
    "width": 512,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/icon-favicon-dc888557.webp",
    "local_path": "assets/icon/icon-favicon.webp",
    "alt": "Favicon — Mini Scales - law.org.vn"
  },
  {
    "id": "bg-parchment-texture",
    "name": "Subtle Parchment Section Background",
    "category": "background",
    "width": 1920,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/background/bg-parchment-texture-0a3d5338.webp",
    "local_path": "assets/background/bg-parchment-texture.webp",
    "alt": "Subtle Parchment Section Background - law.org.vn"
  },
  {
    "id": "hero-cluster-legal-system",
    "name": "Cluster Hero — Legal System",
    "category": "hero",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-cluster-legal-system-36877279.webp",
    "local_path": "assets/hero/hero-cluster-legal-system.webp",
    "alt": "Cluster Hero — Legal System - law.org.vn"
  },
  {
    "id": "hero-cluster-court-system",
    "name": "Cluster Hero — Court System",
    "category": "hero",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-cluster-court-system-2d944f92.webp",
    "local_path": "assets/hero/hero-cluster-court-system.webp",
    "alt": "Cluster Hero — Court System - law.org.vn"
  },
  {
    "id": "hero-cluster-litigation",
    "name": "Cluster Hero — Litigation",
    "category": "hero",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-cluster-litigation-133c6914.webp",
    "local_path": "assets/hero/hero-cluster-litigation.webp",
    "alt": "Cluster Hero — Litigation - law.org.vn"
  },
  {
    "id": "hero-cluster-rights",
    "name": "Cluster Hero — Rights",
    "category": "hero",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-cluster-rights-122b2f8e.webp",
    "local_path": "assets/hero/hero-cluster-rights.webp",
    "alt": "Cluster Hero — Rights - law.org.vn"
  },
  {
    "id": "hero-cluster-terminology",
    "name": "Cluster Hero — Terminology",
    "category": "hero",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-cluster-terminology-9714da42.webp",
    "local_path": "assets/hero/hero-cluster-terminology.webp",
    "alt": "Cluster Hero — Terminology - law.org.vn"
  },
  {
    "id": "hero-cluster-faq",
    "name": "Cluster Hero — FAQ",
    "category": "hero",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/hero/hero-cluster-faq-9be638c0.webp",
    "local_path": "assets/hero/hero-cluster-faq.webp",
    "alt": "Cluster Hero — FAQ - law.org.vn"
  },
  {
    "id": "glyph-legal-system",
    "name": "Cluster Glyph — Legal System",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/glyph-legal-system-d304b7b7.webp",
    "local_path": "assets/icon/glyph-legal-system.webp",
    "alt": "Cluster Glyph — Legal System - law.org.vn"
  },
  {
    "id": "glyph-court-system",
    "name": "Cluster Glyph — Court System",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/glyph-court-system-c2193d42.webp",
    "local_path": "assets/icon/glyph-court-system.webp",
    "alt": "Cluster Glyph — Court System - law.org.vn"
  },
  {
    "id": "glyph-litigation",
    "name": "Cluster Glyph — Litigation",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/glyph-litigation-9a37cdd4.webp",
    "local_path": "assets/icon/glyph-litigation.webp",
    "alt": "Cluster Glyph — Litigation - law.org.vn"
  },
  {
    "id": "glyph-rights",
    "name": "Cluster Glyph — Rights",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/glyph-rights-135a83a0.webp",
    "local_path": "assets/icon/glyph-rights.webp",
    "alt": "Cluster Glyph — Rights - law.org.vn"
  },
  {
    "id": "glyph-terminology",
    "name": "Cluster Glyph — Terminology",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/glyph-terminology-2fc16898.webp",
    "local_path": "assets/icon/glyph-terminology.webp",
    "alt": "Cluster Glyph — Terminology - law.org.vn"
  },
  {
    "id": "glyph-faq",
    "name": "Cluster Glyph — FAQ",
    "category": "icon",
    "width": 1024,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/glyph-faq-f46397e4.webp",
    "local_path": "assets/icon/glyph-faq.webp",
    "alt": "Cluster Glyph — FAQ - law.org.vn"
  },
  {
    "id": "article-constitution-2013",
    "name": "Article Image — Constitution 2013",
    "category": "content",
    "width": 1200,
    "aspect": "4:3",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/article-constitution-2013-8ae64c50.webp",
    "local_path": "assets/content/article-constitution-2013.webp",
    "alt": "Article Image — Constitution 2013 - law.org.vn"
  },
  {
    "id": "article-supreme-peoples-court",
    "name": "Article Image — Supreme People's Court",
    "category": "content",
    "width": 1200,
    "aspect": "4:3",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/article-supreme-peoples-court-3340c41b.webp",
    "local_path": "assets/content/article-supreme-peoples-court.webp",
    "alt": "Article Image — Supreme People's Court - law.org.vn"
  },
  {
    "id": "article-civil-procedure-overview",
    "name": "Article Image — Civil Procedure Overview",
    "category": "content",
    "width": 1200,
    "aspect": "4:3",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/article-civil-procedure-overview-adfa5ec8.webp",
    "local_path": "assets/content/article-civil-procedure-overview.webp",
    "alt": "Article Image — Civil Procedure Overview - law.org.vn"
  },
  {
    "id": "article-property-rights",
    "name": "Article Image — Property Rights",
    "category": "content",
    "width": 1200,
    "aspect": "4:3",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/article-property-rights-0288eb1e.webp",
    "local_path": "assets/content/article-property-rights.webp",
    "alt": "Article Image — Property Rights - law.org.vn"
  },
  {
    "id": "article-when-to-hire-lawyer",
    "name": "Article Image — When to hire a lawyer",
    "category": "content",
    "width": 1200,
    "aspect": "4:3",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/article-when-to-hire-lawyer-3e2c2acb.webp",
    "local_path": "assets/content/article-when-to-hire-lawyer.webp",
    "alt": "Article Image — When to hire a lawyer - law.org.vn"
  },
  {
    "id": "article-civil-mediation",
    "name": "Article Image — Civil Mediation",
    "category": "content",
    "width": 1200,
    "aspect": "4:3",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/article-civil-mediation-a3ba3905.webp",
    "local_path": "assets/content/article-civil-mediation.webp",
    "alt": "Article Image — Civil Mediation - law.org.vn"
  },
  {
    "id": "article-statutes-of-limitation",
    "name": "Article Image — Statutes of Limitation",
    "category": "content",
    "width": 1200,
    "aspect": "4:3",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/article-statutes-of-limitation-39bbe03c.webp",
    "local_path": "assets/content/article-statutes-of-limitation.webp",
    "alt": "Article Image — Statutes of Limitation - law.org.vn"
  },
  {
    "id": "article-notarization",
    "name": "Article Image — Notarization",
    "category": "content",
    "width": 1200,
    "aspect": "4:3",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/article-notarization-22b5e3df.webp",
    "local_path": "assets/content/article-notarization.webp",
    "alt": "Article Image — Notarization - law.org.vn"
  },
  {
    "id": "bg-grid-overlay",
    "name": "Background — Faint Grid Overlay",
    "category": "background",
    "width": 1920,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/background/bg-grid-overlay-3226917c.webp",
    "local_path": "assets/background/bg-grid-overlay.webp",
    "alt": "Background — Faint Grid Overlay - law.org.vn"
  },
  {
    "id": "bg-watermark-seal",
    "name": "Background — Watermark Seal",
    "category": "background",
    "width": 800,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/background/bg-watermark-seal-ec337d18.webp",
    "local_path": "assets/background/bg-watermark-seal.webp",
    "alt": "Background — Watermark Seal - law.org.vn"
  },
  {
    "id": "ornament-fleuron-rule",
    "name": "Ornament — Fleuron Horizontal Rule",
    "category": "background",
    "width": 1200,
    "aspect": "20:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/background/ornament-fleuron-rule-0a67fb5f.webp",
    "local_path": "assets/background/ornament-fleuron-rule.webp",
    "alt": "Ornament — Fleuron Horizontal Rule - law.org.vn"
  },
  {
    "id": "og-card-en",
    "name": "OG Card — English",
    "category": "og",
    "width": 1200,
    "aspect": "1200:630",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/og/og-card-en-cb90bcd5.webp",
    "local_path": "assets/og/og-card-en.webp",
    "alt": "OG Card — English - law.org.vn"
  },
  {
    "id": "crest-quoc-hoi",
    "name": "Trusted source crest — National Assembly",
    "category": "icon",
    "width": 256,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/crest-quoc-hoi-4637e185.webp",
    "local_path": "assets/icon/crest-quoc-hoi.webp",
    "alt": "Trusted source crest — National Assembly - law.org.vn"
  },
  {
    "id": "crest-chinh-phu",
    "name": "Trusted source crest — Government Portal",
    "category": "icon",
    "width": 256,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/crest-chinh-phu-a755e3bc.webp",
    "local_path": "assets/icon/crest-chinh-phu.webp",
    "alt": "Trusted source crest — Government Portal - law.org.vn"
  },
  {
    "id": "crest-tandtc",
    "name": "Trusted source crest — Supreme People's Court",
    "category": "icon",
    "width": 256,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/crest-tandtc-110091a8.webp",
    "local_path": "assets/icon/crest-tandtc.webp",
    "alt": "Trusted source crest — Supreme People's Court - law.org.vn"
  },
  {
    "id": "crest-vksndtc",
    "name": "Trusted source crest — Supreme People's Procuracy",
    "category": "icon",
    "width": 256,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/crest-vksndtc-52640177.webp",
    "local_path": "assets/icon/crest-vksndtc.webp",
    "alt": "Trusted source crest — Supreme People's Procuracy - law.org.vn"
  },
  {
    "id": "crest-bo-tu-phap",
    "name": "Trusted source crest — Ministry of Justice",
    "category": "icon",
    "width": 256,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/crest-bo-tu-phap-045ef851.webp",
    "local_path": "assets/icon/crest-bo-tu-phap.webp",
    "alt": "Trusted source crest — Ministry of Justice - law.org.vn"
  },
  {
    "id": "crest-vbpl",
    "name": "Trusted source crest — Legal Documents Portal",
    "category": "icon",
    "width": 256,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/crest-vbpl-59dd2d31.webp",
    "local_path": "assets/icon/crest-vbpl.webp",
    "alt": "Trusted source crest — Legal Documents Portal - law.org.vn"
  },
  {
    "id": "crest-thuvienphapluat",
    "name": "Trusted source crest — Law Library",
    "category": "icon",
    "width": 256,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/crest-thuvienphapluat-460cab8f.webp",
    "local_path": "assets/icon/crest-thuvienphapluat.webp",
    "alt": "Trusted source crest — Law Library - law.org.vn"
  },
  {
    "id": "crest-viac",
    "name": "Trusted source crest — VIAC arbitration",
    "category": "icon",
    "width": 256,
    "aspect": "1:1",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/icon/crest-viac-d4e26dc7.webp",
    "local_path": "assets/icon/crest-viac.webp",
    "alt": "Trusted source crest — VIAC arbitration - law.org.vn"
  },
  {
    "id": "blog-reading-decree",
    "name": "Blog featured — Reading a Vietnamese decree",
    "category": "content",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/blog-reading-decree-c96b8491.webp",
    "local_path": "assets/content/blog-reading-decree.webp",
    "alt": "Blog featured — Reading a Vietnamese decree - law.org.vn"
  },
  {
    "id": "blog-pdpl-saas",
    "name": "Blog featured — Vietnam's 2026 Personal Data Protection Law",
    "category": "content",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/blog-pdpl-saas-eb4440f9.webp",
    "local_path": "assets/content/blog-pdpl-saas.webp",
    "alt": "Blog featured — Vietnam's 2026 Personal Data Protection Law - law.org.vn"
  },
  {
    "id": "blog-civil-code-shifts",
    "name": "Blog featured — Civil Code 2015 vs 2005",
    "category": "content",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/blog-civil-code-shifts-613d4886.webp",
    "local_path": "assets/content/blog-civil-code-shifts.webp",
    "alt": "Blog featured — Civil Code 2015 vs 2005 - law.org.vn"
  },
  {
    "id": "blog-severance",
    "name": "Blog featured — Statutory severance",
    "category": "content",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/blog-severance-dd1db20c.webp",
    "local_path": "assets/content/blog-severance.webp",
    "alt": "Blog featured — Statutory severance - law.org.vn"
  },
  {
    "id": "blog-limitations",
    "name": "Blog featured — Statute-of-limitations traps",
    "category": "content",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/blog-limitations-8ca5b2a3.webp",
    "local_path": "assets/content/blog-limitations.webp",
    "alt": "Blog featured — Statute-of-limitations traps - law.org.vn"
  },
  {
    "id": "blog-notarisation",
    "name": "Blog featured — Notarisation vs authentication",
    "category": "content",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/blog-notarisation-b92ccc24.webp",
    "local_path": "assets/content/blog-notarisation.webp",
    "alt": "Blog featured — Notarisation vs authentication - law.org.vn"
  },
  {
    "id": "blog-court-verdict",
    "name": "Blog featured — Reading a Vietnamese court verdict",
    "category": "content",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/blog-court-verdict-d81570e2.webp",
    "local_path": "assets/content/blog-court-verdict.webp",
    "alt": "Blog featured — Reading a Vietnamese court verdict - law.org.vn"
  },
  {
    "id": "blog-foreign-investment",
    "name": "Blog featured — Foreign investment single window",
    "category": "content",
    "width": 1600,
    "aspect": "16:9",
    "cdn_url": "https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/law.org.vn/content/blog-foreign-investment-f8a99531.webp",
    "local_path": "assets/content/blog-foreign-investment.webp",
    "alt": "Blog featured — Foreign investment single window - law.org.vn"
  }
];

const PUBLIC_DIR = path.resolve(__dirname, "../public/images");

function main() {
  console.log("\n=== Implementing Image Assets for law.org.vn ===\n");

  // Create public/images directories
  const categories = [...new Set(ASSETS.map(a => a.category))];
  for (const cat of categories) {
    fs.mkdirSync(path.join(PUBLIC_DIR, cat), { recursive: true });
  }

  // Copy local assets to public/images/
  let copied = 0;
  for (const asset of ASSETS) {
    if (asset.local_path) {
      const src = path.resolve(__dirname, "..", asset.local_path);
      const dest = path.join(PUBLIC_DIR, asset.category, asset.id + ".webp");
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`  Copied: ${asset.id}.webp → public/images/${asset.category}/`);
        copied++;
      } else {
        console.log(`  SKIP (no local file): ${asset.id}`);
      }
    }
  }

  // Generate TypeScript image map for the site code
  const tsMap = `// Auto-generated image asset map for law.org.vn
// Generated: 2026-04-28T12:57:01.639Z
// Usage: import { IMAGES } from "@/lib/images";
//        <Image src={IMAGES.heroPortrait.cdn} alt={IMAGES.heroPortrait.alt} />

export const IMAGES = {
${ASSETS.map(a => {
    const key = a.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const cdn = a.cdn_url ? `"${a.cdn_url}"` : "null";
    const local = `"/images/${a.category}/${a.id}.webp"`;
    return `  ${key}: {
    id: "${a.id}",
    name: "${a.name}",
    category: "${a.category}",
    cdn: ${cdn},
    local: ${local},
    src: ${cdn} || ${local},
    alt: "${a.alt}",
    width: ${a.width},
    aspect: "${a.aspect}",
  }`;
  }).join(",\n")}
} as const;

export type ImageId = keyof typeof IMAGES;
`;

  const libDir = path.resolve(__dirname, "../src/lib");
  fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(path.join(libDir, "images.ts"), tsMap);
  console.log(`\n  Generated: src/lib/images.ts (${ASSETS.length} images)`);

  // Generate a quick reference markdown
  let readme = "# Image Assets\n\n";
  readme += "| Variable | CDN URL | Local | Alt |\n";
  readme += "|----------|---------|-------|-----|\n";
  for (const a of ASSETS) {
    const key = a.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    readme += `| IMAGES.${key} | ${a.cdn_url || "N/A"} | /images/${a.category}/${a.id}.webp | ${a.alt} |\n`;
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, "README.md"), readme);

  console.log(`\n=== Done! ${copied} files copied, images.ts generated ===`);
  console.log("\nNext steps for the agent:");
  console.log("  1. Import { IMAGES } from '@/lib/images' in your components");
  console.log("  2. Use IMAGES.heroPortrait.src for the src prop");
  console.log("  3. Use IMAGES.heroPortrait.alt for the alt prop");
  console.log("  4. CDN URLs are preferred (IMAGES.xxx.cdn), local fallback (IMAGES.xxx.local)\n");
}

main();
