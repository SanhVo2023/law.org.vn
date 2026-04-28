import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/* On-demand ISR endpoint. Payload `afterChange` hooks POST here when an
 * editor publishes an article so the corresponding category + article pages
 * refresh immediately rather than waiting for the next 1h revalidate window.
 *
 * Auth: shared-secret header `x-revalidate-token` matches REVALIDATE_TOKEN env. */
export async function POST(req: Request) {
  const token = req.headers.get('x-revalidate-token')
  if (!process.env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      { error: 'REVALIDATE_TOKEN not configured on server' },
      { status: 500 },
    )
  }
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: { paths?: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  const paths = Array.isArray(body.paths) ? body.paths.filter((p) => typeof p === 'string') : []
  if (paths.length === 0) {
    return NextResponse.json({ error: 'no paths to revalidate' }, { status: 400 })
  }

  const revalidated: string[] = []
  for (const p of paths) {
    revalidatePath(p)
    revalidated.push(p)
  }

  return NextResponse.json({ revalidated, timestamp: new Date().toISOString() })
}
