import React, {useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {ThemeProvider} from '@emotion/react'
import {useLocation} from 'react-router-dom'
import GlobalReset from './shared/utils/cssReset'
import {useRootStore} from './shared/infra/mobx'
import CustomizerTheme from './shared/components/ThemeSideBox'
import ErrorFallback from './shared/components/ErrorFallBack'
import ESpinner from './shared/components/Spinner'
import ApplicationRoutes from './shared/infra/router/routes2'
import {LightTheme} from './shared/themes/lightTheme'

const App: React.FC = observer(() => {
  const {layoutStore, appState, authStore, initApi} = useRootStore()
  useEffect(() => {
    initApi()
  }, [])
  return (
    <ThemeProvider theme={layoutStore.theme ? layoutStore.theme : LightTheme}>
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
