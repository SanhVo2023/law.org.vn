import { NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'

/* Connectivity probe for Netlify deploy verification + uptime monitoring.
 * Returns shape-stable JSON so external tooling can parse it. */
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const out: {
    db: 'ok' | 'fail'
    payload: 'ok' | 'fail'
    schema: 'ok' | 'fail'
    error?: string
    timestamp: string
  } = {
    db: 'fail',
    payload: 'fail',
    schema: 'fail',
    timestamp: new Date().toISOString(),
  }

  if (!process.env.DATABASE_URI) {
    out.error = 'DATABASE_URI not set'
    return NextResponse.json(out, { status: 503 })
  }

  try {
    const payload = await getPayload()
    out.payload = 'ok'
    const r = await payload.find({ collection: 'users', limit: 0 })
    out.db = 'ok'
    if (typeof r.totalDocs === 'number') out.schema = 'ok'
    return NextResponse.json(out)
  } catch (err) {
    out.error = err instanceof Error ? err.message : String(err)
    return NextResponse.json(out, { status: 503 })
  }
}
