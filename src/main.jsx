import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { App as AntDesignApp } from 'antd'
import '@ant-design/v5-patch-for-react-19'

import store from './store'
import GlobalStyle from './GlobalStyle'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AntDesignApp>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Provider>
  </AntDesignApp>
)
