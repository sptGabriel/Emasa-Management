import React, {Suspense, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {ThemeProvider} from '@emotion/react'
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary'
import GlobalReset from './shared/utils/cssReset'
import {useRootStore} from './shared/infra/mobx'
import {darkTheme, lightTheme} from './shared/themes'
import ErrorFallback from './shared/components/ErrorFallBack'
import ApplicationRouter from './shared/infra/router/index'
//  const AuthApp: React.FC = observer(() => {
//  const {appState, initApi, authStore} = useRootStore()
//  const handleError = useErrorHandler()
//  useEffect(() => {
//    if (appState !== 'fulfilled') initApi().catch((error) => handleError(error))
//  }, [])
//  return (
//    <>
//      {authStore.isAuth ? (
//        <Suspense fallback={<h1>fb</h1>}>
//          <DashBoard />
//        </Suspense>
//      ) : (
//        <Suspense fallback={<h1>login</h1>}>
//          <LoginPage />
//        </Suspense>
//      )}
//    </>
//  )
//  })
const App: React.FC = observer(() => {
  const {layoutStore, initApi, appState} = useRootStore()
  const handleError = useErrorHandler()
  useEffect(() => {
    initApi()
  }, [])
  return (
    <ThemeProvider theme={layoutStore.isDarkMode ? darkTheme : lightTheme}>
      <GlobalReset />
      <ApplicationRouter appState={appState} />
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
