const path = require('path')

const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig,   {

  entry: {
    app: path.join(__dirname,'../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
})

if (isDev) {
  // 热更新代码
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname,'../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',    // 可在局域网下调试
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,          // 需要在react配置
    overlay: {
      errors: true      // 错误提示
    },
    publicPath: '/public',  // 修复访问路径问题
    historyApiFallback: {
      index: '/public/index.html' //截取404请求使得可以访问
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin)
}
module.exports = config
