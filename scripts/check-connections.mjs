import 'dotenv/config'
import pg from 'pg'
const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()
const r = await c.query(`
  SELECT pid, usename, application_name, state, age(now(), state_change) AS idle_for
  FROM pg_stat_activity
  WHERE usename LIKE 'postgres%' AND pid != pg_backend_pid()
  ORDER BY state, idle_for DESC
`)
console.log('--- active sessions ---')
for (const row of r.rows) console.log(row.state, '|', row.application_name, '|', row.idle_for, '|', row.pid)
await c.end()
