import 'dotenv/config'
import pg from 'pg'
const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()
const r = await c.query(`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'lov'
  ORDER BY table_name
`)
console.log('--- lov tables ---')
for (const row of r.rows) console.log(row.table_name)

const cols = await c.query(`
  SELECT table_name, column_name
  FROM information_schema.columns
  WHERE table_schema = 'lov' AND column_name LIKE '%glossary%'
  ORDER BY table_name, column_name
`)
console.log('\n--- glossary cols anywhere in lov ---')
for (const row of cols.rows) console.log(row.table_name, '.', row.column_name)
await c.end()
