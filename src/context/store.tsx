import React, { createContext, useState } from 'react';

interface StoreData {
  store: object;
  setStore: React.Dispatch<React.SetStateAction<object>>;
}

const StoreContext = createContext<StoreData>({} as StoreData);

const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<object>({});

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
