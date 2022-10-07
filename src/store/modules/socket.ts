import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketState } from '../../types/state';

const initialState: SocketState = {
  presentPriceSocketLoading: false,
  presentPriceSocketDone: false,
  presentPriceSocketError: null,

  tradeSocketLoading: false,
  tradeSocketDone: false,
  tradeSocketError: null,

  orderbookSocketLoading: false,
  orderbookSocketDone: false,
  orderbookSocketError: null,
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
    orderbookSocketRequest: (state, { payload }: PayloadAction<string[]>) => {
      state.orderbookSocketLoading = true;
      state.orderbookSocketDone = false;
      state.orderbookSocketError = null;
    },
    orderbookSocketSuccess: (state) => {
      state.orderbookSocketLoading = false;
      state.orderbookSocketDone = true;
    },
    orderbookSocketFailure: (state, { payload }) => {
      state.orderbookSocketLoading = false;
      state.orderbookSocketError = payload.error;
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
  orderbookSocketRequest,
  orderbookSocketSuccess,
  orderbookSocketFailure,
} = socketSlice.actions;

export default socketSlice.reducer;
