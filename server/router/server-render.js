const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  const context = { url: ctx.path }
  console.log(context)

  try {
    const appSting = await renderer.renderToString(context)
    const {
      title
    } = context.meta.inject() // 服务端meta
    const html = ejs.render(template, {
      appSting,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })
    ctx.body = html
  } catch (error) {
    console.log('render error', error)
    throw error
  }
}
