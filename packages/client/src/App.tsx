import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';
import { useRootStore } from './shared/infra/mobx';
import { useAppTheme } from './shared/utils/useAppTheme';
import { useComponentWillMount } from './shared/utils/useComponentWillMount';

const App: React.FunctionComponent = observer(() => {
  const { theme } = useAppTheme();
  const store = useRootStore();
  useComponentWillMount(() => {
    console.log(store.userStore, 'user');
    console.log(store.authStore.rootStore.userStore, 'auth');
    console.log(store, 'FULL STORE');
  });
  return (
    <ThemeProvider theme={theme}>
      <a href="/">{store.userStore.currentUser?.name}</a>
    </ThemeProvider>
  );
});

export default App;
