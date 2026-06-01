/* Shared Payload `afterChange` hook helper: posts to /api/revalidate so the
 * corresponding ISR pages refresh immediately after an editor publishes/edits.
 *
 * Activates only when both REVALIDATE_URL and REVALIDATE_TOKEN are set
 * (so dev runs without configuring it stays a no-op). */

interface RevalidateOptions {
  /** Build the list of paths to revalidate from the doc. Both vi and en variants. */
  pathsFromDoc: (doc: Record<string, unknown>) => string[]
}

export function makeRevalidateHook({ pathsFromDoc }: RevalidateOptions) {
  return async function afterChange({ doc }: { doc: Record<string, unknown> }) {
    const url = process.env.REVALIDATE_URL
    const token = process.env.REVALIDATE_TOKEN
    if (!url || !token) return

    const paths = pathsFromDoc(doc).filter(Boolean)
    if (paths.length === 0) return

    // Hard 5s timeout so a slow/unreachable revalidate endpoint (e.g. during a
    // DNS cut-over, or a stale REVALIDATE_URL) can never HANG the editor's save.
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 5000)
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-token': token,
        },
        body: JSON.stringify({ paths }),
        signal: controller.signal,
      })
    } catch (err) {
      // Don't block the save if the revalidate endpoint is unreachable/slow.
      // eslint-disable-next-line no-console
      console.warn('[revalidate-hook] revalidate call failed/timed out:', (err as Error).message)
    } finally {
      clearTimeout(timer)
    }
  }
}
