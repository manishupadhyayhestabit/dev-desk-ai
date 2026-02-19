import express from 'express'

const app = express()
const port = process.env.PORT ?? 3000
app.get('/', (_req: express.Request, res: express.Response) => res.send('ok'))
app.get('/_health', (_req: express.Request, res: express.Response) => res.send('ok'))

if (require.main === module) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`api listening on ${port}`)
  })
}

export default app
