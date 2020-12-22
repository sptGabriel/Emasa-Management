import React, {Suspense, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {ThemeProvider} from '@emotion/react'
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary'
import GlobalReset from './shared/utils/cssReset'
import {useRootStore} from './shared/infra/mobx'
import {darkTheme, lightTheme} from './shared/themes'
import ErrorFallback from './shared/components/ErrorFallBack'
import ApplicationRouter from './shared/infra/router/index'
import ESpinner from './shared/components/Spinner'
import ApplicationRoutes from './shared/infra/router/routes2'

const App: React.FC = observer(() => {
  const {layoutStore, appState, authStore} = useRootStore()
  return (
    <ThemeProvider theme={layoutStore.isDarkMode ? darkTheme : lightTheme}>
      <GlobalReset />
      {appState === 'pending' ? (
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ESpinner />
        </div>
      ) : appState === 'error' ? (
        <ErrorFallback />
      ) : (
        <ApplicationRoutes isLoggedIn={authStore.isAuth} />
      )}
    </ThemeProvider>
  )
})

export default App

//  const App: React.FC = observer(() => {
//  const {layoutStore} = useRootStore()
//  return (
//    <ThemeProvider theme={layoutStore.isDarkMode ? darkTheme : lightTheme}>
//      <GlobalReset />
//      <ErrorBoundary FallbackComponent={ErrorFallback}>
//        <ApplicationRouter />
//      </ErrorBoundary>
//    </ThemeProvider>
//  )
//  })
