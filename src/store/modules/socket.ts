import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketState } from '../../types/state';

const initialState: SocketState = {
  presentPriceSocketLoading: false,
  presentPriceSocketDone: false,
  presentPriceSocketError: null,

  tradeSocketLoading: false,
  tradeSocketDone: false,
  tradeSocketError: null,
};

const socketSlice = createSlice({
  initialState,
  name: 'socket',
  reducers: {
    presentPriceSocketRequest: (state, { payload }: PayloadAction<string[]>) => {
      state.presentPriceSocketLoading = true;
      state.presentPriceSocketDone = false;
      state.presentPriceSocketError = null;
    },
    presentPriceSocketSuccess: (state) => {
      state.presentPriceSocketLoading = false;
      state.presentPriceSocketDone = true;
    },
    presentPriceSocketFailure: (state, { payload }) => {
      state.presentPriceSocketLoading = false;
      state.presentPriceSocketError = payload.error;
    },
    tradeSocketRequest: (state, { payload }: PayloadAction<string[]>) => {
      state.tradeSocketLoading = true;
      state.tradeSocketDone = false;
      state.tradeSocketError = null;
    },
    tradeSocketSuccess: (state) => {
      state.tradeSocketLoading = false;
      state.tradeSocketDone = true;
    },
    tradeSocketFailure: (state, { payload }) => {
      state.tradeSocketLoading = false;
      state.tradeSocketError = payload.error;
    },
  },
});

export const {
  presentPriceSocketRequest,
  presentPriceSocketSuccess,
  presentPriceSocketFailure,
  tradeSocketRequest,
  tradeSocketSuccess,
  tradeSocketFailure,
} = socketSlice.actions;

export default socketSlice.reducer;
