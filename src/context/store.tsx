import React, { createContext, useState } from 'react';

interface StoreContext {
  store: object;
  setStore: React.Dispatch<React.SetStateAction<object>>;
}

const StoreContext = createContext({} as StoreContext);

const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState({});

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
