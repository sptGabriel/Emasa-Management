import React from "react";
import { PropsWithChildren } from "react";

type StoresContextValue = {

};

const StoresContext = React.createContext<StoresContextValue>(
  {} as StoresContextValue
);


export const StoresProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  // const productsStore = new ProductsStore();
  // const ordersStore = new OrdersStore(productsStore);
  return (
    <StoresContext.Provider value={{ productsStore, ordersStore }}>
      {children}
    </StoresContext.Provider>
  );
};

export const useStores = () => React.useContext(StoresContext)