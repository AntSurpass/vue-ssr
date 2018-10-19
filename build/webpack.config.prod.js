const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // css 提取
const HtmlWebPackPlugin = require('html-webpack-plugin') //  html模板
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const isdev = process.env.NODE_ENV === 'development'

let config = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  optimization: {
    noEmitOnErrors: true,// 报错处理
    splitChunks: {  // 类库文件 单独打包
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,// 在分割之前，这个代码块最小应该被引用的次数（默认配置的策略是不需要多次引用也可以被分割）
          maxInitialRequests: 5, // 按需加载的代码块，最大数量应该小于或者等于5
          minSize: 0 // 形成一个新代码块最小的体积
        },
        vendor: { // 将所有来自node_modules的模块分配到一个叫vendors的缓存组
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,  // 缓存组的优先级
          enforce: true,
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'  // webpack 配置单独打包 避免hash变化 引起浏览器不缓存
   }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"production"'

    }),
    new HtmlWebPackPlugin(),
    new MiniCssExtractPlugin({ // css单独打包
      filename: isdev ? '[name].css' : '[name].[contentHash:8].css',
      chunkFilename: isdev ? '[id].css' : '[id].[hash:8].css',
    })
  ]
})


module.exports = config;
