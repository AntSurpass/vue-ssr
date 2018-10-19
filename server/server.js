const Koa = require('koa')
const staticRouter = require('./router/static')
const app = new Koa()

const isdev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`qingqi  ${ctx.path}`)
    await next()
  } catch (error) {
    console.log(error)
    ctx.status = 500
    if (isdev) {
      ctx.body = error
    } else {
      ctx.body = `please try agine`
    }
  }
})

let pageRouter
if (isdev) {
  pageRouter = require('./router/dev-ssr')
} else {
  pageRouter = require('./router/ssr')
}
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(pageRouter.routes()).use(pageRouter.allowedMethods)

const HOST = process.env.HOST || '0.0.0.0'

const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is run ${PORT}`)
})
