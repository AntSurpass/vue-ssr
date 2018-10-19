const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')

const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const render = VueServerRenderer.createBundleRenderer(
  path.resolve(__dirname, '../../server-build/vue-ssr-server-bundle.json'), {
    inject: false,
    clientManifest
  }
)
const template = fs.readFileSync(path.resolve(__dirname, '../server-template.ejs'), 'utf-8')

const router = new Router()

router.get('*', async (ctx) => {
  await serverRender(ctx, render, template)
})

module.exports = router
