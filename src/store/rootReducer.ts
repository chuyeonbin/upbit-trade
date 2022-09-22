import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../types/state';
import socket from './modules/socket';

const rootReducer = (state: RootState, action: AnyAction): RootState => {
  return combineReducers({ socket })(state, action);
};

export default rootReducer;
