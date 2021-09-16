import { useContext } from 'react';

import { IStoreProvider, StoreContext } from '~/context/store';

export function useStore(): IStoreProvider {
  return useContext(StoreContext);
}
