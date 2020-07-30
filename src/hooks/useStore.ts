import { useContext } from 'react';

import { StoreContext, StoreData } from '../context/store';

export default function useStore(): StoreData {
  return useContext(StoreContext);
}
