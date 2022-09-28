import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import RootState from '../types/state';
import socketReducer from './modules/socket';

const rootReducer = (state: RootState, action: AnyAction): RootState => {
  return combineReducers({
    socket: socketReducer,
  })(state, action);
};

export default rootReducer;
