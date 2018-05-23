import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom' // 使路由生效
import App from './views/App'
// 热更新代码
import { AppContainer } from 'react-hot-loader'   // eslint-disable-line

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    root,
  )
}

// hydrate SSR渲染 把字符串变成可用组件渲染到浏览器
render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    // 热更新时重新插入
    const NextApp = require('./views/App').default // eslint-disable-line
    render(NextApp)
  })
}
