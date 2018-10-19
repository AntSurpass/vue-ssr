const Router = require('koa-router')
const axios = require('axios')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.log(err)
  })
  stats.warnings.forEach(warn => {
    console.warn(warn)
  })
  let bundlePath = path.resolve(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('webpack build')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '加载中。。。'
    return
  }
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )
  let clientManifest = clientManifestResp.data
  const template = fs.readFileSync(path.resolve(__dirname, '../server-template.ejs'), 'utf-8')

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
