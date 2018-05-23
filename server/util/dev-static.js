// 开发环境下的服务端渲染
const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
// 在内存里读写文件
const MemoryFs = require('memory-fs')

// 代理
const proxy = require('http-proxy-middleware')

const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

let serverBundle

// 读取模板
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// hack? module.export
const Module = module.constructor

// 服务器端编译
const mfs = new MemoryFs()
// 需要使用到的内容
const serverCompiler = webpack(serverConfig)
// 加快打包速度
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  // webpack打包 转化后显示信息
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  // 内存???
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  // 蜜汁bug            指定文件名
  m._compile(bundle, 'server-entry.js')
  // commonjs ?
  serverBundle = m.exports.default


})

module.exports = function (app) {

  app.use('/public', proxy({
    target: 'http://localhost:8888/'
  }))


  app.get('*', function (req, res) {
    getTemplate().then(templace => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(templace.replace('<!-- app -->', content))
    })
  })

}
