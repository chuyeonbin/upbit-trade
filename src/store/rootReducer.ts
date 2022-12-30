import { combineReducers } from '@reduxjs/toolkit';
import socketReducer from './modules/socket';
import coinReducer from './modules/coin';

const rootReducer = combineReducers({
  socket: socketReducer,
  coin: coinReducer,
});

export default rootReducer;
