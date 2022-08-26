import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

export type StoreData = { [key: string]: any };

export interface IStoreProvider {
  store: StoreData;
  setStore: React.Dispatch<React.SetStateAction<StoreData>>;
}

const StoreContext = createContext<IStoreProvider>({} as IStoreProvider);

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [store, setStore] = useState<StoreData>({});

  const memorizedValue = useMemo(() => ({ store, setStore }), [store]);

  return (
    <StoreContext.Provider value={memorizedValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
