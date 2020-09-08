import { useContext } from 'react';

import { StoreContext, StoreData } from '~/context/store';

export function useStore(): StoreData {
  return useContext(StoreContext);
}
