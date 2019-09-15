import { createStore, compose, applyMiddleware, Reducer } from 'redux';

export default function(reducers: Reducer, middlewares: []) {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          (console as any).tron.createEnhancer(),
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
}
