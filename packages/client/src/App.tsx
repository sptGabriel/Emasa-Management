import React, {useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {ThemeProvider} from '@emotion/react'
import {ToastContainer} from 'react-toastify'
import GlobalReset from './shared/utils/cssReset'
import {useRootStore} from './shared/infra/mobx'
import ErrorFallback from './shared/components/ErrorBoundary/ErrorFallBack'
import ESpinner from './shared/components/Spinner'
import ApplicationRoutes from './shared/infra/router/routes2'
import {Overlay} from './shared/components/Overlay'

const App: React.FC = observer(() => {
  const {layoutStore, appState, authStore, initApi} = useRootStore()
  useEffect(() => {
    initApi()
  }, [])
  return (
    <ThemeProvider theme={layoutStore.theme}>
      <GlobalReset />
      <Overlay isOn={layoutStore.overlay} />
      <ToastContainer />
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
