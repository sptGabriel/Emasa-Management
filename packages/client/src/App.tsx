import React, {lazy, Suspense, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {ThemeProvider} from '@emotion/react'
import GlobalReset from './shared/utils/cssReset'
import {useRootStore} from './shared/infra/mobx'
import {darkTheme, lightTheme} from './shared/themes'
import Db from './shared/infra/router'

const LoginPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ './pages/login'),
)
const DashBoard = lazy(
  () => import(/* webpackChunkName: "DashBoard" */ './shared/infra/router'),
)
const AuthApp: React.FC<{
  isAuth: boolean
  currentUser: any
}> = observer(({currentUser, isAuth}) => {
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
      {appState === 'fulfilled' ? (
        <AuthApp
          isAuth={authStore.isAuth}
          currentUser={currentUserStore.currentUser}
        />
      ) : (
        ''
      )}
    </ThemeProvider>
  )
})

export default App
