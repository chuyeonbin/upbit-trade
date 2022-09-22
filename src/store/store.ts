import { configureStore, Reducer, AnyAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { RootState } from '../types/state';
import rootReducer from './rootReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer as Reducer<RootState, AnyAction>,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export default store;
