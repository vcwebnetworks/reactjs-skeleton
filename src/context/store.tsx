import React, { createContext, useMemo, useState } from 'react';

type StoreType = { [key: string]: any };

export interface IStoreProvider {
  store: StoreType;
  setStore: React.Dispatch<React.SetStateAction<StoreType>>;
}

const StoreContext = createContext<IStoreProvider>({} as IStoreProvider);

const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<StoreType>({});

  const value = useMemo(() => ({ store, setStore }), [store]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export { StoreProvider, StoreContext };
