/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React, {createContext, ReactNode, useContext} from 'react';
import {RootStore} from '../../../store/rootStore';

let store: RootStore;
const StoreContext = createContext<RootStore | null>(null);
export const RootStoreProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const root = store ?? new RootStore();
  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};
export const useRootStore = (): RootStore => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }
  return context;
};
