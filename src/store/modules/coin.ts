import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketCodes } from '../../types';
import { CoinState } from '../../types/state';

const initialState: CoinState = {
  marketList: [],

  loadMarketListLoading: false,
  loadMarketListDone: false,
  loadMarketListError: null,
};

const coinSlice = createSlice({
  initialState,
  name: 'coin',
  reducers: {
    loadMarketListRequest: (state) => {
      state.loadMarketListLoading = true;
      state.loadMarketListDone = false;
      state.loadMarketListError = null;
    },
    loadMarketListSuccess: (state, { payload }: PayloadAction<MarketCodes>) => {
      state.loadMarketListLoading = false;
      state.loadMarketListDone = true;

      // market이 KRW로 시작하는거만 필터링
      state.marketList = payload.filter((value) => value.market.substring(0, 3) === 'KRW');
    },
    loadMarketListError: (state, { payload }) => {
      state.loadMarketListLoading = false;
      state.loadMarketListError = payload.error;
    },
  },
});

export const { loadMarketListRequest, loadMarketListSuccess, loadMarketListError } =
  coinSlice.actions;

export default coinSlice.reducer;
