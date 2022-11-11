import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketCodes, Orderbooks, PresentPrices } from '../../types';
import { RealTimeOrderbooks, RealTimeTickers } from '../../types/realTime';
import { CoinState } from '../../types/state';

const initialState: CoinState = {
  marketList: [],

  tickerList: {},

  orderbook: {
    timestamp: 0,
    totalAskSize: 0,
    totalBidSize: 0,
    orderbookUnits: [],
  },

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

  loadOrderbookLoading: false,
  loadOrderbookDone: false,
  loadOrderbookError: null,

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
    loadOrderbookRequest: (state) => {
      state.loadOrderbookLoading = true;
      state.loadOrderbookDone = false;
      state.loadOrderbookError = null;
    },
    loadOrderbookSuccess: (state, { payload }: PayloadAction<Orderbooks>) => {
      state.loadOrderbookLoading = false;
      state.loadOrderbookDone = true;

      state.orderbook.timestamp = payload[0].timestamp;
      state.orderbook.totalAskSize = payload[0].total_ask_size;
      state.orderbook.totalBidSize = payload[0].total_bid_size;
      payload[0].orderbook_units.forEach((unit, index) => {
        state.orderbook.orderbookUnits[index] = {
          askPrice: unit.ask_price,
          askSize: unit.ask_size,
          bidPrice: unit.bid_price,
          bidSize: unit.bid_size,
        };
      });
    },
    loadOrderbookFailure: (state, { payload }) => {
      state.loadOrderbookLoading = false;
      state.loadOrderbookError = payload.error;
    },
    loadSelectedCoinDataRequest: (state) => {
      state.loadSelectedCoinDataLoading = true;
      state.loadSelectedCoinDataDone = false;
      state.loadSelectedCoinDataError = null;
    },
    loadSelectedCoinDataSuccess: (state, { payload }: PayloadAction<PresentPrices>) => {
      state.loadSelectedCoinDataLoading = false;
      state.loadSelectedCoinDataDone = true;

      state.selectedCoin.code = payload[0].market;
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
    updateOrderbook: (state, { payload }: PayloadAction<RealTimeOrderbooks>) => {
      // 마지막 호가 데이터로 업데이트
      const orderbook = payload[payload.length - 1];

      state.orderbook.timestamp = orderbook.timestamp;
      state.orderbook.totalAskSize = orderbook.total_ask_size;
      state.orderbook.totalBidSize = orderbook.total_bid_size;
      orderbook.orderbook_units.forEach((unit, index) => {
        state.orderbook.orderbookUnits[index] = {
          askPrice: unit.ask_price,
          askSize: unit.ask_size,
          bidPrice: unit.bid_price,
          bidSize: unit.bid_size,
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
    changeSelectedCoin: (
      state,
      { payload }: PayloadAction<{ marketName: string; code: string }>,
    ) => {
      undefined;
    },
    changeSelectedMarketName: (state, { payload }: PayloadAction<{ marketName: string }>) => {
      state.selectedCoin.marketName = payload.marketName;
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
  loadOrderbookRequest,
  loadOrderbookSuccess,
  loadOrderbookFailure,
  loadSelectedCoinDataRequest,
  loadSelectedCoinDataSuccess,
  loadSelectedCoinDataFailure,
  updateTickerList,
  updateOrderbook,
  updateSelectedCoin,
  changeSelectedCoin,
  changeSelectedMarketName,
} = coinSlice.actions;

export default coinSlice.reducer;
