/* Minimal Lexical JSON renderer for the PayloadCMS richText format.
   Handles: root, paragraph, heading, list, listitem, link, quote, horizontalrule, text (with format bitmask).
   Deliberately dependency-free — we control input shape via scripts/markdown-to-lexical.mjs. */
import { Link } from '@/i18n/navigation'
import React from 'react'

export type LexicalNode =
  | LexicalRoot
  | LexicalParagraph
  | LexicalHeading
  | LexicalText
  | LexicalLink
  | LexicalList
  | LexicalListItem
  | LexicalQuote
  | LexicalHR

interface LexicalRoot {
  type: 'root'
  children: LexicalNode[]
  version: number
}
interface LexicalParagraph {
  type: 'paragraph'
  children: LexicalNode[]
}
interface LexicalHeading {
  type: 'heading'
  tag: 'h1' | 'h2' | 'h3' | 'h4'
  children: LexicalNode[]
}
interface LexicalText {
  type: 'text'
  text: string
  format?: number
}
interface LexicalLink {
  type: 'link'
  fields: {
    linkType: 'custom' | 'internal'
    url?: string
    doc?: { relationTo: string; value: string | number | { slug?: string } }
    newTab?: boolean
  }
  children: LexicalNode[]
}
interface LexicalList {
  type: 'list'
  tag: 'ul' | 'ol'
  listType?: 'bullet' | 'number'
  children: LexicalNode[]
}
interface LexicalListItem {
  type: 'listitem'
  children: LexicalNode[]
}
interface LexicalQuote {
  type: 'quote'
  children: LexicalNode[]
}
interface LexicalHR {
  type: 'horizontalrule'
}

function applyFormat(node: LexicalText) {
  const f = node.format ?? 0
  let el: React.ReactNode = node.text
  if (f & 1) el = <strong>{el}</strong>
  if (f & 2) el = <em>{el}</em>
  if (f & 4) el = <s>{el}</s>
  if (f & 8) el = <u>{el}</u>
  if (f & 16) el = <code>{el}</code>
  if (f & 32) el = <sub>{el}</sub>
  if (f & 64) el = <sup>{el}</sup>
  return el
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function childrenToText(children: LexicalNode[] | undefined): string {
  if (!children) return ''
  return children
    .map((c) => {
      if ((c as LexicalText).type === 'text') return (c as LexicalText).text
      if ('children' in c && Array.isArray((c as any).children))
        return childrenToText((c as any).children)
      return ''
    })
    .join('')
}

function renderNodes(nodes: LexicalNode[] | undefined): React.ReactNode {
  if (!nodes) return null
  return nodes.map((node, i) => <RenderNode key={i} node={node} />)
}

function RenderNode({ node }: { node: LexicalNode }) {
  switch (node.type) {
    case 'text':
      return <>{applyFormat(node)}</>

    case 'paragraph':
      return <p>{renderNodes(node.children)}</p>

    case 'heading': {
      const text = childrenToText(node.children)
      const id = slugify(text)
      const Tag = node.tag
      return <Tag id={id}>{renderNodes(node.children)}</Tag>
    }

    case 'list': {
      const listNode = node as LexicalList
      const Tag = listNode.tag || (listNode.listType === 'number' ? 'ol' : 'ul')
      return <Tag>{renderNodes(listNode.children)}</Tag>
    }

    case 'listitem':
      return <li>{renderNodes(node.children)}</li>

    case 'quote':
      return <blockquote>{renderNodes(node.children)}</blockquote>

    case 'horizontalrule':
      return <hr />

    case 'link': {
      const f = node.fields
      if (f.linkType === 'internal' && f.doc) {
        const slug =
          typeof f.doc.value === 'object' ? f.doc.value?.slug ?? '' : String(f.doc.value)
        return (
          <Link href={`/${slug}`}>
            {renderNodes(node.children)}
          </Link>
        )
      }
      return (
        <a
          href={f.url}
          target={f.newTab ? '_blank' : undefined}
          rel={f.newTab ? 'noopener noreferrer' : undefined}
        >
          {renderNodes(node.children)}
        </a>
      )
    }

    default:
      // Unknown node type — render children if present
      if ('children' in node && Array.isArray((node as any).children)) {
        return <>{renderNodes((node as any).children)}</>
      }
      return null
  }
}

export function ArticleBody({ content }: { content: { root?: LexicalRoot } | null | undefined }) {
  if (!content?.root?.children) return null
  return (
    <div className="prose-encyclopedia">
      {renderNodes(content.root.children)}
    </div>
  )
}

export function extractTocFromLexical(
  content: { root?: LexicalRoot } | null | undefined,
): { label: string; anchor: string; level: number }[] {
  if (!content?.root?.children) return []
  const toc: { label: string; anchor: string; level: number }[] = []
  for (const node of content.root.children) {
    if ((node as any).type === 'heading') {
      const h = node as LexicalHeading
      const label = childrenToText(h.children)
      const anchor = slugify(label)
      const level = parseInt(h.tag.slice(1), 10)
      if (level === 2 || level === 3) toc.push({ label, anchor, level })
    }
  }
  return toc
}
