import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {RootStoreProvider} from './shared/infra/mobx'

// if (process.env.NODE_ENV === 'development') {
//   console.error = () => {};
// }

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <RootStoreProvider>
        <App />
      </RootStoreProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('emasa'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
