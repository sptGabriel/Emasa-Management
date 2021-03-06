import React from 'react'
import ReactDOM from 'react-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ErrorFallback from './shared/components/ErrorBoundary/ErrorFallBack'
import {RootStoreProvider} from './shared/infra/mobx'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <RootStoreProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </RootStoreProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('emasa'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
