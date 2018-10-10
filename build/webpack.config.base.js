const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueLoaderConfig = require('./vueloader.config')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isdev = process.env.NODE_ENV === 'development';

config = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: VueLoaderConfig(isdev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpeg|jpg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'static/[path][name]-[hash:8].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [

    // 自动清理 dist 文件夹
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      verbose: true, //开启在控制台输出信息
      dry: false,
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = config;