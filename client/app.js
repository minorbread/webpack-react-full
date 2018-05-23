import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom' // 使路由生效
import { Provider } from 'mobx-react'
// 热更新代码
import { AppContainer } from 'react-hot-loader'   // eslint-disable-line
import App from './views/App'
import appState from './store/app-state'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
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
