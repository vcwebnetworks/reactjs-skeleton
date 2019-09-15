import { persistStore } from 'redux-persist';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import createStore from './createStore';
import persistedReducer from './persistedReducer';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? (console as any).tron.createSagaMonitor()
    : null;

const sagaMiddleware: SagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares: any = [sagaMiddleware, thunkMiddleware];

const store = createStore(persistedReducer(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
