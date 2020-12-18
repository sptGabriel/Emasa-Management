import React, {lazy, Suspense, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {ThemeProvider} from '@emotion/react'
import {ErrorBoundary} from 'react-error-boundary'
import GlobalReset from './shared/utils/cssReset'
import {useRootStore} from './shared/infra/mobx'
import {darkTheme, lightTheme} from './shared/themes'
import ErrorFallback from './shared/components/ErrorFallBack'

const LoginPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ './pages/login'),
)
const DashBoard = lazy(
  () => import(/* webpackChunkName: "DashBoard" */ './shared/infra/router'),
)
const AuthApp: React.FC<{
  isAuth: boolean
}> = observer(({isAuth}) => {
  return (
    <>
      {isAuth ? (
        <Suspense fallback={<h1>fb</h1>}>
          <DashBoard />
        </Suspense>
      ) : (
        <Suspense fallback={<h1>login</h1>}>
          <LoginPage />
        </Suspense>
      )}
    </>
  )
})

const App: React.FC = observer(() => {
  const {
    layoutStore,
    initApi,
    appState,
    currentUserStore,
    authStore,
  } = useRootStore()
  useEffect(() => {
    if (appState !== 'fulfilled') initApi()
  }, [])
  return (
    <ThemeProvider theme={layoutStore.isDarkMode ? darkTheme : lightTheme}>
      <GlobalReset />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {appState === 'fulfilled' ? <AuthApp isAuth={authStore.isAuth} /> : ''}
      </ErrorBoundary>
    </ThemeProvider>
  )
})

export default App
