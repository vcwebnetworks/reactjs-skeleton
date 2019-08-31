import { persistStore } from 'redux-persist';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import createStore from './createStore';
import persistedReducer from './persistedReducer';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const middlewares: any = [sagaMiddleware];

const store = createStore(persistedReducer(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
