import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketCodes, PresentPrices } from '../../types';
import { RealTimeTickers } from '../../types/realTime';
import { CoinState } from '../../types/state';

const initialState: CoinState = {
  marketList: [],

  tickerList: {},

  loadMarketListLoading: false,
  loadMarketListDone: false,
  loadMarketListError: null,

  loadTickerListLoading: false,
  loadTickerListDone: false,
  loadTickerListError: null,
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
      payload.forEach((data) => {
        if (data.market.substring(0, 3) === 'KRW') {
          state.marketList.push({
            code: data.market,
            koreanName: data.korean_name,
            englishName: data.english_name,
          });
        }
      });
    },
    loadMarketListFailure: (state, { payload }) => {
      state.loadMarketListLoading = false;
      state.loadMarketListError = payload.error;
    },
    loadTickerListRequest: (state) => {
      state.loadTickerListLoading = true;
      state.loadTickerListDone = false;
      state.loadTickerListError = null;
    },
    loadTickerListSuccess: (state, { payload }: PayloadAction<PresentPrices>) => {
      state.loadTickerListLoading = false;
      state.loadTickerListDone = true;
    },
    loadTickerListFailure: (state, { payload }) => {
      state.loadTickerListLoading = false;
      state.loadTickerListError = payload.error;
    },
    updateTickerList: (state, { payload }: PayloadAction<RealTimeTickers>) => {
      // 중복으로 들어온 코인 제거
      const tickerList = payload.filter((item, i) => {
        return (
          payload.findIndex((item2) => {
            return item.code === item2.code;
          }) === i
        );
      });

      // 코인별 현재가 state 업데이트
      tickerList.forEach((ticker, index) => {
        state.tickerList[tickerList[index].code] = {
          tradePrice: ticker.trade_price,
          changePrice: ticker.change_price,
          accTradePrice24h: ticker.acc_trade_price_24h,
        };
      });
    },
  },
});

export const {
  loadMarketListRequest,
  loadMarketListSuccess,
  loadMarketListFailure,
  loadTickerListRequest,
  loadTickerListSuccess,
  loadTickerListFailure,
  updateTickerList,
} = coinSlice.actions;

export default coinSlice.reducer;
