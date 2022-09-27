import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  marketList: [],
  selectedCoin: { market: 'KRW-BTC', koreanName: '비트코인', englishName: 'Bitcoin' },
};

const coinSlice = createSlice({
  initialState,
  name: 'coin',
  reducers: {
    socketConnectionRequest: (state) => {
      console.log('socketConnection');
    },
  },
});

export const { socketConnectionRequest } = coinSlice.actions;

export default coinSlice.reducer;
