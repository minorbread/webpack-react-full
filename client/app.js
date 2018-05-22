import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'   // 热更新代码
import App from './App.jsx'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
}

// hydrate SSR渲染 把字符串变成可用组件渲染到浏览器
render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    // 热更新时重新插入
    const NextApp = require('./App.jsx').default
    render(NextApp)
  })
}