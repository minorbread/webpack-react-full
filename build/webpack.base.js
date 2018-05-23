const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js','.jsx']
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',         // 热更新隐藏坑
  },
  module: {
    rules: [
      {
        // 执行编译前
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
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
  },
}
