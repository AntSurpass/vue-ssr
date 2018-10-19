const merge = require('webpack-merge')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') //  html模板
const webpack = require('webpack')

const baseConfig = require('./webpack.config.base')

const devServer = {
  port: 8080,
  host: '127.0.0.1',
  overlay: {
    errors: true
  },
  open: true, // 启动webpack时自动打开页面
  hot: true // 热更新
}

let config = merge(baseConfig, {
  mode: 'development',
  entry: path.join(__dirname, '../prec/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true, // 启用自动修复
          emitWarning: true // 启用警告信息
          // formatter: require("eslint/lib/formatters/stylish"), // 格式化
          // failOnWarning:true, // 如果错误则构建失败
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: devServer,
  optimization: {
    noEmitOnErrors: true // 报错处理
  },
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({// 定义环境变量
      'process.env': '"development"'

    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, './temp.html')
    }),
    new webpack.HotModuleReplacementPlugin() // 热更新模块
  ]
})

module.exports = config
