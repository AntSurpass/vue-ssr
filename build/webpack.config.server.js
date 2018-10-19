const merge = require('webpack-merge')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 提取
const webpack = require('webpack')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.config.base')

const isdev = process.env.NODE_ENV === 'development'

let config = merge(baseConfig, {
  mode: 'development',
  target: 'node',
  entry: path.join(__dirname, '../src/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.resolve(__dirname, '../server-build')
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({// 定义环境变量
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'

    }),
    new VueServerPlugin()
  ]
})

module.exports = config
