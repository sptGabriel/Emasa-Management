import React from 'react'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from '@emotion/react'
import { useAppTheme } from './shared/utils/useAppTheme'
import GlobalReset from './shared/utils/cssReset'
import AuthenticatedApp from './shared/infra/router'
import { useComponentWillMount } from './shared/utils/useComponentWillMount'
import { useRootStore } from './shared/infra/mobx'

// const AuthApp = observer(() => {
//   const { currentUserStore, cookieStore } = useRootStore()
//   useComponentWillMount(() => {
//     if (cookieStore.getToken('@Emasa/Access-Token')) currentUserStore.pullUser()
//   })
//   return <>{currentUserStore.currentUser ? <AuthenticatedApp /> : <div />}</>
// })

const App: React.FunctionComponent = observer(() => {
  const { theme } = useAppTheme()
  return (
    <ThemeProvider theme={theme}>
      <GlobalReset />
      <AuthenticatedApp />
    </ThemeProvider>
  )
})

export default App
