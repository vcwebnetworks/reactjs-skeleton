import { persistReducer, PersistConfig } from 'redux-persist';
import persistStorage from 'redux-persist/lib/storage';

export default function(rootReducer: any) {
  const persistConfig: PersistConfig = {
    key: '__vcw__',
    storage: persistStorage
  };

  return persistReducer(persistConfig, rootReducer);
}
