import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketCodes, PresentPrices } from '../../types';
import { RealTimeTickers } from '../../types/realTime';
import { CoinState } from '../../types/state';

const initialState: CoinState = {
  marketList: [],

  tickerList: {},

  selectedCoin: {
    marketName: '비트코인',
    code: 'KRW-BTC',
    tradePrice: 0,
    highPrice: 0,
    lowPrice: 0,
    signedChangePrice: 0,
    accTradeVolume24h: 0,
    accTradePrice24h: 0,
    prevClosingPrice: 0,
  },

  loadMarketListLoading: false,
  loadMarketListDone: false,
  loadMarketListError: null,

  loadTickerListLoading: false,
  loadTickerListDone: false,
  loadTickerListError: null,

  loadSelectedCoinDataLoading: false,
  loadSelectedCoinDataDone: false,
  loadSelectedCoinDataError: null,
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

      payload.forEach((item) => {
        state.tickerList[item.market] = {
          tradePrice: item.trade_price,
          changePrice: item.change_price,
          accTradePrice24h: item.acc_trade_price_24h,
          signedChangePrice: item.signed_change_price,
          prevClosingPrice: item.prev_closing_price,
        };
      });
    },
    loadTickerListFailure: (state, { payload }) => {
      state.loadTickerListLoading = false;
      state.loadTickerListError = payload.error;
    },
    loadSelectedCoinDataRequest: (state) => {
      state.loadSelectedCoinDataLoading = true;
      state.loadSelectedCoinDataDone = false;
      state.loadSelectedCoinDataError = null;
    },
    loadSelectedCoinDataSuccess: (state, { payload }: PayloadAction<PresentPrices>) => {
      state.loadSelectedCoinDataLoading = false;
      state.loadSelectedCoinDataDone = true;

      state.selectedCoin.tradePrice = payload[0].trade_price;
      state.selectedCoin.highPrice = payload[0].high_price;
      state.selectedCoin.lowPrice = payload[0].low_price;
      state.selectedCoin.signedChangePrice = payload[0].signed_change_price;
      state.selectedCoin.accTradeVolume24h = payload[0].acc_trade_volume_24h;
      state.selectedCoin.accTradePrice24h = payload[0].acc_trade_price_24h;
      state.selectedCoin.prevClosingPrice = payload[0].prev_closing_price;
    },
    loadSelectedCoinDataFailure: (state, { payload }) => {
      state.loadSelectedCoinDataLoading = false;
      state.loadSelectedCoinDataError = payload.error;
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
          signedChangePrice: ticker.signed_change_price,
          prevClosingPrice: ticker.prev_closing_price,
        };
      });
    },
    updateSelectedCoin: (state, { payload }: PayloadAction<RealTimeTickers>) => {
      // code에 맞는거만 필터링
      const coinList = payload.filter((value) => value.code === state.selectedCoin.code);

      // 마지막 코인 데이터로 업데이트
      const coin = coinList[coinList.length - 1];

      state.selectedCoin.tradePrice = coin.trade_price;
      state.selectedCoin.highPrice = coin.high_price;
      state.selectedCoin.lowPrice = coin.low_price;
      state.selectedCoin.signedChangePrice = coin.signed_change_price;
      state.selectedCoin.accTradeVolume24h = coin.acc_trade_volume_24h;
      state.selectedCoin.accTradePrice24h = coin.acc_trade_price_24h;
      state.selectedCoin.prevClosingPrice = coin.prev_closing_price;
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
  loadSelectedCoinDataRequest,
  loadSelectedCoinDataSuccess,
  loadSelectedCoinDataFailure,
  updateTickerList,
  updateSelectedCoin,
} = coinSlice.actions;

export default coinSlice.reducer;
