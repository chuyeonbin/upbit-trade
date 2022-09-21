import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../types/state';

const rootReducer = (state: RootState, action: AnyAction): RootState => {
  return combineReducers({})(state, action);
};

export default rootReducer;
