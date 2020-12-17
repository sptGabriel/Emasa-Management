import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {ThemeProvider} from '@emotion/react';
import GlobalReset from './shared/utils/cssReset';
import AuthenticatedApp from './shared/infra/router';
import {useRootStore} from './shared/infra/mobx';
import {darkTheme, lightTheme} from './shared/themes';
import {useComponentWillMount} from './shared/utils/useComponentWillMount';
import Login from './pages/login';

const AuthApp = observer(() => {
  const {authStore, currentUserStore, cookieStore} = useRootStore();
  console.error('a');
  useEffect(() => {
    authStore.refreshToken();
  });
  //  useEffect(() => {
  //  console.log(authStore.isAuth);
  //  }, [authStore.isAuth]);
  return <>{currentUserStore.currentUser ? <AuthenticatedApp /> : <Login />}</>;
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
