import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom' // 使路由生效
import { Provider } from 'mobx-react'
// 热更新代码
import { AppContainer } from 'react-hot-loader'   // eslint-disable-line

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { lightBlue, pink } from 'material-ui/colors'

import App from './views/App'
import AppState from './store/app-state'

const theme = createMuiTheme({
  palette: {
    primary: pink,
    accent: lightBlue,
    type: 'light',
  },
})

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    render() {
      return <TheApp />
    }
  }
  return Main
}


const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

// hydrate SSR渲染 把字符串变成可用组件渲染到浏览器
render(createApp(App))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    // 热更新时重新插入
    const NextApp = require('./views/App').default // eslint-disable-line
    render(createApp(NextApp))
  })
}
