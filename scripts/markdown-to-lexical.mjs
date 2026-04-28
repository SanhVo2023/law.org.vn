/* Convert a subset of Markdown to PayloadCMS Lexical JSON.
 * Supports: # h1–h4, paragraphs, **bold**, *italic* / _italic_, `code`,
 * [links](url), - bullet lists, 1. ordered lists, > quotes, --- HR.
 * The output matches the shape in shared-assets/LEXICAL_FORMAT_REFERENCE.md.
 *
 * Intentionally dependency-free so scripts run with `node` directly.
 */

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_CODE = 16

function textNode(text, format = 0) {
  return {
    type: 'text',
    text,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  }
}

function linkNode(text, url) {
  return {
    type: 'link',
    fields: { linkType: 'custom', url, newTab: url.startsWith('http') },
    children: [textNode(text)],
    direction: null,
    format: '',
    indent: 0,
    version: 3,
  }
}

/* Parse a single line of inline markdown into an array of text/link nodes. */
function parseInline(line) {
  const nodes = []
  let i = 0
  let buffer = ''
  let format = 0

  const flush = () => {
    if (buffer) nodes.push(textNode(buffer, format))
    buffer = ''
  }

  while (i < line.length) {
    const ch = line[i]

    // Links: [text](url)
    if (ch === '[') {
      const close = line.indexOf('](', i)
      const end = close > -1 ? line.indexOf(')', close) : -1
      if (close > -1 && end > -1) {
        flush()
        const text = line.slice(i + 1, close)
        const url = line.slice(close + 2, end)
        nodes.push(linkNode(text, url))
        i = end + 1
        continue
      }
    }

    // Bold: **x**
    if (ch === '*' && line[i + 1] === '*') {
      flush()
      format ^= FORMAT_BOLD
      i += 2
      continue
    }

    // Italic: *x* or _x_
    if (ch === '*' || ch === '_') {
      flush()
      format ^= FORMAT_ITALIC
      i += 1
      continue
    }

    // Inline code: `x`
    if (ch === '`') {
      flush()
      format ^= FORMAT_CODE
      i += 1
      continue
    }

    buffer += ch
    i += 1
  }

  flush()
  return nodes.length ? nodes : [textNode('')]
}

function paragraphNode(children) {
  return {
    type: 'paragraph',
    children,
    direction: null,
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function headingNode(tag, children) {
  return {
    type: 'heading',
    tag,
    children,
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  }
}

function listItemNode(children) {
  return {
    type: 'listitem',
    children: [paragraphNode(children)],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
    value: 1,
  }
}

function listNode(tag, items) {
  return {
    type: 'list',
    tag,
    listType: tag === 'ul' ? 'bullet' : 'number',
    start: 1,
    children: items,
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  }
}

function quoteNode(children) {
  return {
    type: 'quote',
    children: [paragraphNode(children)],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  }
}

function hrNode() {
  return { type: 'horizontalrule', version: 1 }
}

export function markdownToLexical(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const children = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // Blank line
    if (!trimmed) {
      i += 1
      continue
    }

    // HR
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(trimmed)) {
      children.push(hrNode())
      i += 1
      continue
    }

    // Heading
    const h = /^(#{1,4})\s+(.*)$/.exec(trimmed)
    if (h) {
      const tag = `h${h[1].length}`
      children.push(headingNode(tag, parseInline(h[2])))
      i += 1
      continue
    }

    // Blockquote (single-line or consecutive lines, including empty `>` separators)
    if (trimmed.startsWith('>')) {
      const buf = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        const t = lines[i].trim()
        buf.push(t === '>' ? '' : t.replace(/^>\s?/, ''))
        i += 1
      }
      children.push(quoteNode(parseInline(buf.filter(Boolean).join(' '))))
      continue
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      const items = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(listItemNode(parseInline(lines[i].trim().replace(/^[-*]\s+/, ''))))
        i += 1
      }
      children.push(listNode('ul', items))
      continue
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(listItemNode(parseInline(lines[i].trim().replace(/^\d+\.\s+/, ''))))
        i += 1
      }
      children.push(listNode('ol', items))
      continue
    }

    // Paragraph (one or more lines until blank). Always consume at least the current line so the outer loop never stalls.
    const paraLines = [lines[i].trim()]
    i += 1
    while (i < lines.length && lines[i].trim() && !/^(#|>|[-*]\s|\d+\.\s|-{3,}|_{3,}|\*{3,})/.test(lines[i].trim())) {
      paraLines.push(lines[i].trim())
      i += 1
    }
    if (paraLines.length) {
      children.push(paragraphNode(parseInline(paraLines.join(' '))))
    }
  }

  return {
    root: {
      type: 'root',
      children,
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export function extractTocItems(markdown) {
  const out = []
  const seen = new Set()
  for (const line of markdown.split('\n')) {
    const h = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!h) continue
    const label = h[2].replace(/\*\*|_|\*|`/g, '').trim()
    const level = h[1].length
    let anchor = label
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80)
    let n = 1
    const base = anchor
    while (seen.has(anchor)) {
      n += 1
      anchor = `${base}-${n}`
    }
    seen.add(anchor)
    out.push({ label, anchor, level })
  }
  return out
}
