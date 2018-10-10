const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin') //  html模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css 提取
const webpack = require('webpack')

const isdev = process.env.NODE_ENV === 'development';

config = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isdev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpeg|jpg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isdev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin(),
    new MiniCssExtractPlugin({ // css单独打包
      filename: isdev ? '[name].css' : '[name].[contentHash:8].css',
      chunkFilename: isdev ? '[id].css' : '[id].[hash:8].css',
    })
  ]
}

if (isdev) {
  config.devtool = `#cheap-module-eval-source-map` // 代码map
  config.devServer = {
    port: 8000,
    host: '127.0.0.1',
    overlay: {
      errors: true,
    },
    open: true, // 启动webpack时自动打开页面
    hot: true // 热更新
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin() // 热更新模块
  )
  config.optimization = {
    noEmitOnErrors: true  // 报错处理
  }
} else {
  config.output.filename = '[name].[chunkhash].js'  // 设置chunkhash 利用缓存 每次更新不用更新类库文件
  config.optimization = {
    splitChunks: {  // 类库文件 单独打包
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'  // webpack 配置单独打包 避免hash变化 引起浏览器不缓存
   }
  }
}


module.exports = config;