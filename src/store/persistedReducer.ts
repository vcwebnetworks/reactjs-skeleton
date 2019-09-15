import { Reducer } from 'redux';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default function(reducers: Reducer) {
  const config: PersistConfig = {
    key: '__vcw__',
    storage,
    whitelist: ['auth', 'user'],
  };

  return persistReducer(config, reducers);
}
