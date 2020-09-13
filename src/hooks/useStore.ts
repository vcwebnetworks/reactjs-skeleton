import { useContext } from 'react';

import { StoreContext, IStoreProvider } from '~/context/store';

export function useStore(): IStoreProvider {
  return useContext(StoreContext);
}
