import React from 'react'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'styled-components'
import { useAppTheme } from './shared/utils/useAppTheme'
import { CSSReset } from './shared/components/cssReset'
import AuthenticatedApp from './shared/infra/router'
import { useComponentWillMount } from './shared/utils/useComponentWillMount'
import {
  useAuthStore,
  useCookiesStore,
  useCurrentUserStore
} from './shared/utils/useStoreHooks'
import LoginComponent from './pages/login'

function AuthApp() {
  const { getAccessToken } = useCookiesStore()
  const { isAuth } = useAuthStore()
  const { currentUser, pullUser } = useCurrentUserStore()
  useComponentWillMount(() => {
    if (getAccessToken()) pullUser()
  })
  return (
    <>{isAuth && currentUser ? <AuthenticatedApp /> : <LoginComponent />}</>
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
