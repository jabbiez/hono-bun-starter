import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()


app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './static/favicon.ico' }))

app.get(
    '/assets/*',
    serveStatic({
      root: './',
      rewriteRequestPath: (path) => path.replace(/^\/assets/, '/static'),
    })
)

// app.get('*', serveStatic({ path: './static/fallback.txt' }))

app.get('/', (c) => {
  return c.json({ message: 'Hello Bun!' })
  
})


const port = parseInt(process.env.PORT!) || 5000
console.log(`Running at http://localhost:${port}`)


export default {
    port: port,
    fetch: app.fetch
}