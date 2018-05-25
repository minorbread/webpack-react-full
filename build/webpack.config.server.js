const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  target: 'node',   // 执行的环境
  entry: {
    app: path.join(__dirname,'../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',    // 需要固定的输出
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
})
