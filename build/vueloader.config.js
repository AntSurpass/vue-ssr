module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 移除模板间空白
    extractCSS: isDev // .VUE文件css生产环境打包出来
  }
}
