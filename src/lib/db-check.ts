/* Build-time DB connectivity gate. Page files call this once before payload.find()
 * so that a missing or unreachable DATABASE_URI fails the Netlify build loudly with a
 * descriptive message — rather than silently baking empty SSG pages. */

export function assertDb(): void {
  const uri = process.env.DATABASE_URI
  if (!uri || uri.length < 20) {
    throw new Error(
      '[db-check] DATABASE_URI environment variable is missing or invalid. ' +
        'On Netlify: run `netlify env:import .env.netlify` (or set it manually under ' +
        'Site settings → Environment variables) before triggering a build. ' +
        'Locally: ensure .env exists at the project root.',
    )
  }
  if (!uri.includes('supabase')) {
    throw new Error(
      '[db-check] DATABASE_URI does not look like a Supabase pooler URI. ' +
        'Expected `postgresql://postgres.<ref>:<pass>@<region>.pooler.supabase.com:5432/postgres`. ' +
        'Got: ' +
        uri.slice(0, 40) +
        '…',
    )
  }
}
