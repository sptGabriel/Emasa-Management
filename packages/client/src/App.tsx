import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {ThemeProvider} from '@emotion/react';
import GlobalReset from './shared/utils/cssReset';
import AuthenticatedApp from './shared/infra/router';
import {useRootStore} from './shared/infra/mobx';
import {darkTheme, lightTheme} from './shared/themes';
import Login from './pages/login';

const AuthApp = observer(() => {
  const {currentUserStore, authStore} = useRootStore();
  useEffect(() => {
    if (!currentUserStore.accessToken || !authStore.isAuth) authStore.initApi();
  });
  return (
    <>
      {authStore.isAuth && currentUserStore.currentUser ? (
        <AuthenticatedApp />
      ) : (
        <Login />
      )}
    </>
  );
});

const App: React.FC = observer(() => {
  const {layoutStore} = useRootStore();
  return (
    <ThemeProvider theme={layoutStore.isDarkMode ? darkTheme : lightTheme}>
      <GlobalReset />
      <AuthApp />
    </ThemeProvider>
  );
});

export default App;
