import 'dotenv/config'
import pg from 'pg'
const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()
const r = await c.query(`
  SELECT cat.slug, COUNT(a.id) AS article_count
  FROM lov.articles a
  JOIN lov.categories cat ON cat.id = a.category_id
  GROUP BY cat.slug
  ORDER BY article_count DESC
`)
console.log('--- articles per category ---')
for (const row of r.rows) console.log(row.slug, '=', row.article_count)
const total = await c.query(`SELECT COUNT(*) FROM lov.articles`)
console.log('TOTAL articles:', total.rows[0].count)
await c.end()
