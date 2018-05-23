import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// 热更新代码
import { AppContainer } from 'react-hot-loader'   // eslint-disable-line

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}

// hydrate SSR渲染 把字符串变成可用组件渲染到浏览器
render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    // 热更新时重新插入
    const NextApp = require('./App.jsx').default // eslint-disable-line
    render(NextApp)
  })
}
