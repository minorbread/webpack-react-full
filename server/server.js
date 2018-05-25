const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const serverRender = require('./util/server-render')
const fs = require('fs')
const path = require('path')

// 判断生产或者开发模式
const isDev = process.env.NODE_ENV === 'development'


// console.log(serverEntry); 读取服务器端需要渲染的代码
const app = express()

// application/json 解析
app.use(bodyParser.json())
//  application/x-www-form-urlencoded 解析
app.use(bodyParser.urlencoded({ extended: false }))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react demo'
}))


app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))


if (!isDev) {
  // 不是开发环境下
  const serverEntry = require('../dist/server-entry')
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8');

  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', function (req, res, next) {
    serverRender(serverEntry, template, req, res).catch(next)
  })
} else {
  // 开发环境下
  const devStatic = require('./util/dev-static')
  devStatic(app)
}


app.use(function (error, req, res, next) {
  console.log(error)
  res.status(500).send(error)
})

app.listen(3333, function () {
  console.log('server is listening on 3333');
})
