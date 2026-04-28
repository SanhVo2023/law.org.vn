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

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-token': token,
        },
        body: JSON.stringify({ paths }),
      })
    } catch (err) {
      // Don't block the save if the revalidate endpoint is unreachable.
      // eslint-disable-next-line no-console
      console.warn('[revalidate-hook] failed to call revalidate:', (err as Error).message)
    }
  }
}
