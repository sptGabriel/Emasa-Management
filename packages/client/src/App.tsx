import React from 'react'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from '@emotion/react'
import GlobalReset from './shared/utils/cssReset'
import AuthenticatedApp from './shared/infra/router'
import { useRootStore } from './shared/infra/mobx'
import { darkTheme, lightTheme } from './shared/themes'
// import { useComponentWillMount } from './shared/utils/useComponentWillMount'
// import { useRootStore } from './shared/infra/mobx'

// const AuthApp = observer(() => {
//   const { currentUserStore, cookieStore } = useRootStore()
//   useComponentWillMount(() => {
//     if (cookieStore.getToken('@Emasa/Access-Token')) currentUserStore.pullUser()
//   })
//   return <>{currentUserStore.currentUser ? <AuthenticatedApp /> : <div />}</>
// })

const App: React.FC = observer(() => {
  const { layoutStore } = useRootStore()
  return (
    <ThemeProvider theme={layoutStore.isDarkMode ? darkTheme : lightTheme}>
      <GlobalReset />
      <AuthenticatedApp />
    </ThemeProvider>
  )
})

export default App
