/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
// import { LoginComponent } from "./pages/login/index";
// import { CSSReset } from "./shared/components/cssReset";
import { useRootStore } from "./shared/infra/mobx";
import { useAppTheme } from "./shared/utils/useAppTheme";
import { useComponentWillMount } from "./shared/utils/useComponentWillMount";

const App: React.FunctionComponent = observer(() => {
  const { theme } = useAppTheme();
  const store = useRootStore();
  useComponentWillMount(() => {
    console.log(store.userStore);
    console.log(store.userStore.currentUser);
  });

  return (
    <ThemeProvider theme={theme}>
      <a>{store.userStore.currentUser?.name}</a>
    </ThemeProvider>
  );
});

export default App;
