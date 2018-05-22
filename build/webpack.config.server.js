const path = require('path')


module.exports = {
  target: 'node',   // 执行的环境 
  entry: {
    app: path.join(__dirname,'../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',    // 需要固定的输出 
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',         // 热更新隐藏坑
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}