import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import RootState from '../types/state';
import socketReducer from './modules/socket';
import coinReducer from './modules/coin';

const rootReducer = (state: RootState, action: AnyAction): RootState => {
  return combineReducers({
    socket: socketReducer,
    coin: coinReducer,
  })(state, action);
};

export default rootReducer;
