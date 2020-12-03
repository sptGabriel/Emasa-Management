import React from 'react'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'styled-components'
import { useAppTheme } from './shared/utils/useAppTheme'
import { CSSReset } from './shared/components/cssReset'
import AuthenticatedApp from './shared/infra/router'
import { useComponentWillMount } from './shared/utils/useComponentWillMount'
import LoginComponent from './pages/login'
import { useRootStore } from './shared/infra/mobx'

function AuthApp() {
  const { currentUserStore, cookieStore, authStore } = useRootStore()
  useComponentWillMount(() => {
    if (cookieStore.getToken('eid')) currentUserStore.pullUser()
  })
  return (
    <>
      {currentUserStore.currentUser ? <AuthenticatedApp /> : <LoginComponent />}
    </>
  )
}

const App: React.FunctionComponent = observer(() => {
  const { theme } = useAppTheme()
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AuthApp />
    </ThemeProvider>
  )
})

export default App
