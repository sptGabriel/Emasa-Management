import React from 'react';
import { ThemeProvider } from 'styled-components';
import { LoginComponentTest } from './modules/login/components';
import { CSSReset } from './shared/components/cssReset';
import { useAppTheme } from './shared/utils/useAppTheme';
const App: React.FunctionComponent = () => {
  const { theme } = useAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <LoginComponentTest></LoginComponentTest>
    </ThemeProvider>
  );
};

export default App;
