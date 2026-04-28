import 'dotenv/config'
import pg from 'pg'
const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()
const r = await c.query(`
  SELECT pid FROM pg_stat_activity
  WHERE usename = 'postgres' AND state = 'idle' AND pid != pg_backend_pid()
    AND age(now(), state_change) > interval '10 seconds'
`)
let killed = 0
for (const { pid } of r.rows) {
  try {
    await c.query('SELECT pg_terminate_backend($1)', [pid])
    killed++
  } catch { /* ignore */ }
}
console.log(`reaped ${killed} idle connections`)
await c.end()
