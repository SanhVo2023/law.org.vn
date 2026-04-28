/* One-shot helper: add 16 new image entries to image-assets.json (status: 'pending').
 * Adds: 8 trusted-source crests + 8 blog featured photographs.
 * Run once after v3 design changes; PM then regenerates via image-generator-ui /batch. */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.resolve(__dirname, '..', 'image-assets.json')

const raw = await fs.readFile(file, 'utf-8')
const data = JSON.parse(raw)

const NEW_ENTRIES = [
  // 8 trusted-source crests (heraldic monogram style, transparent PNG)
  {
    id: 'crest-quoc-hoi',
    name: 'Trusted source crest — National Assembly',
    type: 'text-to-image',
    prompt: "Heraldic crest, single-stroke gold linework on transparent background, geometric monogram representing the National Assembly of Vietnam (Quốc Hội). Stylised five-pointed star above a horizontal rule, framed by a circular gold border. Engraved-medal aesthetic. NO photorealism, NO color fills, NO text. Subtle, minimal, institutional. Palette: antique gold #B8860B, dark navy outline #1B2A4A.",
    style: 'engraved-monogram',
    category: 'icon',
    aspect: '1:1',
    width: 256,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'crest-chinh-phu',
    name: 'Trusted source crest — Government Portal',
    type: 'text-to-image',
    prompt: "Heraldic crest, single-stroke gold linework on transparent background, geometric monogram representing the Government of Vietnam. Stylised laurel wreath enclosing a small classical column, circular border. Engraved-medal aesthetic. NO photorealism, NO color fills, NO text. Antique gold #B8860B, navy outline #1B2A4A.",
    style: 'engraved-monogram',
    category: 'icon',
    aspect: '1:1',
    width: 256,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'crest-tandtc',
    name: "Trusted source crest — Supreme People's Court",
    type: 'text-to-image',
    prompt: "Heraldic crest, single-stroke gold linework on transparent background, geometric monogram representing the Supreme People's Court of Vietnam. Stylised balanced scale enclosed in a circular border. Engraved-medal aesthetic, dignified. NO photorealism, NO color fills, NO text. Antique gold #B8860B, navy outline #1B2A4A.",
    style: 'engraved-monogram',
    category: 'icon',
    aspect: '1:1',
    width: 256,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'crest-vksndtc',
    name: "Trusted source crest — Supreme People's Procuracy",
    type: 'text-to-image',
    prompt: "Heraldic crest, single-stroke gold linework on transparent background, geometric monogram representing the Supreme People's Procuracy of Vietnam. Stylised vertical sword crossed with a quill, circular border. Engraved-medal aesthetic. NO photorealism, NO color fills, NO text. Antique gold #B8860B, navy outline #1B2A4A.",
    style: 'engraved-monogram',
    category: 'icon',
    aspect: '1:1',
    width: 256,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'crest-bo-tu-phap',
    name: 'Trusted source crest — Ministry of Justice',
    type: 'text-to-image',
    prompt: "Heraldic crest, single-stroke gold linework on transparent background, geometric monogram representing the Ministry of Justice of Vietnam. Stylised open codex with a balance scale rising above, circular border. Engraved-medal aesthetic. NO photorealism, NO color fills, NO text. Antique gold #B8860B, navy outline #1B2A4A.",
    style: 'engraved-monogram',
    category: 'icon',
    aspect: '1:1',
    width: 256,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'crest-vbpl',
    name: 'Trusted source crest — Legal Documents Portal',
    type: 'text-to-image',
    prompt: "Heraldic crest, single-stroke gold linework on transparent background, geometric monogram representing the official Legal Documents Portal (vbpl.vn). Stylised stack of three horizontal scrolls inside a circular border. Engraved-medal aesthetic. NO photorealism, NO color fills, NO text. Antique gold #B8860B, navy outline #1B2A4A.",
    style: 'engraved-monogram',
    category: 'icon',
    aspect: '1:1',
    width: 256,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'crest-thuvienphapluat',
    name: 'Trusted source crest — Law Library',
    type: 'text-to-image',
    prompt: "Heraldic crest, single-stroke gold linework on transparent background, geometric monogram representing thuvienphapluat.vn. Stylised three vertical book spines inside a circular border with a small five-pointed star above. Engraved-medal aesthetic. NO photorealism, NO color fills, NO text. Antique gold #B8860B, navy outline #1B2A4A.",
    style: 'engraved-monogram',
    category: 'icon',
    aspect: '1:1',
    width: 256,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'crest-viac',
    name: 'Trusted source crest — VIAC arbitration',
    type: 'text-to-image',
    prompt: "Heraldic crest, single-stroke gold linework on transparent background, geometric monogram representing the Vietnam International Arbitration Centre (VIAC). Stylised handshake symbol within a chevron, circular border. Engraved-medal aesthetic. NO photorealism, NO color fills, NO text. Antique gold #B8860B, navy outline #1B2A4A.",
    style: 'engraved-monogram',
    category: 'icon',
    aspect: '1:1',
    width: 256,
    priority: 'medium',
    status: 'pending',
  },

  // 8 blog featured images — editorial photography matching topic
  {
    id: 'blog-reading-decree',
    name: 'Blog featured — Reading a Vietnamese decree',
    type: 'text-to-image',
    prompt: "Editorial photograph: an open Vietnamese legal document on a dark wood desk, a fountain pen and reading glasses beside it, soft side lighting from a brass desk lamp, deep shadows. The document shows columns of Vietnamese text — no specific words readable. Composition: 16:9, low-key, archival mood. Reference: Bloomberg / Stanford Law Review feature photography. NO illustration, NO cartoon, NO clip-art.",
    style: 'editorial-photo',
    category: 'content',
    aspect: '16:9',
    width: 1600,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'blog-pdpl-saas',
    name: "Blog featured — Vietnam's 2026 Personal Data Protection Law",
    type: 'text-to-image',
    prompt: "Editorial photograph: a server-room corridor with abstract Vietnamese ornamental motifs subtly etched into one of the metal racks. Cool blue and warm gold lighting mix, low-angle. Strong vertical lines, sense of scale. NO PEOPLE. Composition: 16:9, modern-institutional. Reference: New York Times tech feature photography. NO illustration, NO clip-art.",
    style: 'editorial-photo',
    category: 'content',
    aspect: '16:9',
    width: 1600,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'blog-civil-code-shifts',
    name: 'Blog featured — Civil Code 2015 vs 2005',
    type: 'text-to-image',
    prompt: "Editorial photograph: two volumes of a Vietnamese Civil Code side by side on a polished dark-wood library shelf, each spine etched with subtle gold lettering (no readable text). Warm soft lighting, dust motes in the light. Composition: 16:9, archival academic. Reference: Architectural Digest interior photography. NO illustration, NO cartoon.",
    style: 'editorial-photo',
    category: 'content',
    aspect: '16:9',
    width: 1600,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'blog-severance',
    name: 'Blog featured — Statutory severance',
    type: 'text-to-image',
    prompt: "Editorial photograph: an empty office chair beside a desk with a folded white envelope and a pair of reading glasses on it, late afternoon golden light spilling through tall windows. Quiet, restrained, contemplative. NO PEOPLE. Composition: 16:9, deep negative space. Reference: corporate-feature editorial photography. NO illustration.",
    style: 'editorial-photo',
    category: 'content',
    aspect: '16:9',
    width: 1600,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'blog-limitations',
    name: 'Blog featured — Statute-of-limitations traps',
    type: 'text-to-image',
    prompt: "Editorial photograph: an old hourglass on top of a stack of legal files, set on a dark wood desk, a single beam of warm light striking the sand. Deep shadows, archival mood. Composition: 16:9, dramatic chiaroscuro. Reference: still-life editorial photography. NO illustration, NO cartoon.",
    style: 'editorial-photo',
    category: 'content',
    aspect: '16:9',
    width: 1600,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'blog-notarisation',
    name: 'Blog featured — Notarisation vs authentication',
    type: 'text-to-image',
    prompt: "Editorial photograph: detail of a brass notary stamp pressed into deep red wax on parchment paper, a bottle of black ink and an old fountain pen beside. Top-down composition. Sharp focus on the wax seal. Composition: 16:9, archival, museum-quality. Reference: Architectural Digest feature photography. NO illustration.",
    style: 'editorial-photo',
    category: 'content',
    aspect: '16:9',
    width: 1600,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'blog-court-verdict',
    name: 'Blog featured — Reading a Vietnamese court verdict',
    type: 'text-to-image',
    prompt: "Editorial photograph: an empty Vietnamese courtroom seen from the petitioner's perspective — wide angle, deep symmetry, navy drapery, judge's bench at center, side-lit by tall windows. Quiet, weighty atmosphere. NO PEOPLE. Composition: 16:9, low-key institutional. Reference: New York Times court-feature photography. NO illustration.",
    style: 'editorial-photo',
    category: 'content',
    aspect: '16:9',
    width: 1600,
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'blog-foreign-investment',
    name: 'Blog featured — Foreign investment single window',
    type: 'text-to-image',
    prompt: "Editorial photograph: a modern open-plan administrative service hall in Hanoi, glass partitions, a single counter visible at the far end with warm-lit ceiling fixtures, deep perspective. NO PEOPLE. Architectural sense of scale. Composition: 16:9, contemporary-institutional. Reference: Bloomberg corporate feature photography. NO illustration.",
    style: 'editorial-photo',
    category: 'content',
    aspect: '16:9',
    width: 1600,
    priority: 'medium',
    status: 'pending',
  },
]

let added = 0
let skipped = 0
const existingIds = new Set(data.images.map((e) => e.id))
for (const e of NEW_ENTRIES) {
  if (existingIds.has(e.id)) {
    skipped++
    continue
  }
  data.images.push(e)
  added++
}

data.notes =
  (data.notes ?? '') +
  ' [v3 2026-04-28: added 8 trusted-source crests + 8 blog featured images.]'

await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf-8')
console.log(`[add-image-entries] added ${added}, skipped ${skipped} of ${NEW_ENTRIES.length}`)
console.log(`[add-image-entries] manifest now has ${data.images.length} entries total`)
