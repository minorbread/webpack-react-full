import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

// hydrate SSR渲染 把字符串变成可用组件渲染到浏览器
ReactDOM.hydrate(<App />, document.getElementById('root'))