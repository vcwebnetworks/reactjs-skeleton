import React, { createContext, useMemo, useState } from 'react';

export type StoreData = { [key: string]: any };

export interface IStoreProvider {
  store: StoreData;
  setStore: React.Dispatch<React.SetStateAction<StoreData>>;
}

const StoreContext = createContext<IStoreProvider>({} as IStoreProvider);

const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<StoreData>({});

  const memorizedValue = useMemo(() => ({ store, setStore }), [store]);

  return (
    <StoreContext.Provider value={memorizedValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
