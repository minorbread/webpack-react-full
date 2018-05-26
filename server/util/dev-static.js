// 开发环境下的服务端渲染
const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
// 在内存里读写文件
const MemoryFs = require('memory-fs')
// 代理
const proxy = require('http-proxy-middleware')

const serverRender = require('./server-render')

const serverConfig = require('../../build/webpack.config.server')
let serverBundle

// 读取模板
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// hack? module.exports
// const Module = module.constructor
const NativeModule = require('module')
const vm = require('vm')

// core
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

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
  // const m = new Module()
  // 蜜汁bug            指定文件名
  // m._compile(bundle, 'server-entry.js')
  const m = getModuleFromString(bundle, 'server-entry.js')
  // commonjs ?
  serverBundle = m.exports

})

module.exports = function (app) {

  app.use('/public', proxy({
    target: 'http://localhost:8888/'
  }))

  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      return res.send('waiting for compile, refresh later ')
    }

    getTemplate().then(template => {
      serverRender(serverBundle, template, req, res)
    }).catch(next)
  })

}
