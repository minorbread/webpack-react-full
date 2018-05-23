const express = require('express')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')

// 判断生产或者开发模式
const isDev = process.env.NODE_ENV === 'development'


// console.log(serverEntry); 读取服务器端需要渲染的代码
const app = express()

app.use(favicon(path.join(__dirname, '../favicon.ico')))


if (!isDev) {
  // 不是开发环境下
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  // 开发环境下
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is listening on 3333');
})
