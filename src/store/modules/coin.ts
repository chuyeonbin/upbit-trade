import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CandleType, MarketList, Orderbooks, PresentPrices, Trades } from '../../types';
import { DayCandles, WeekCandles, MonthCandles, MinuteCandles } from '../../types/candle';
import { RealTimeOrderbooks, RealTimeTickers, RealTimeTrades } from '../../types/realTime';
import { CoinState } from '../../types/state';
import { createFuzzyMatcher } from '../../utils';

const initialState: CoinState = {
  marketList: {
    KRW: [],
    BTC: [],
    USDT: [],
  },

  searchMarketList: [],

  tickerList: {},

  tradeList: [],

  orderbook: {
    timestamp: 0,
    totalAskSize: 0,
    totalBidSize: 0,
    orderbookUnits: [],
  },

  selectedCoin: {
    marketName: '비트코인',
    market: 'KRW-BTC',
    tradePrice: 0,
    highPrice: 0,
    lowPrice: 0,
    high52WeekPrice: 0,
    high52WeekDate: '0000-00-00',
    low52WeekPrice: 0,
    low52WeekDate: '0000-00-00',
    signedChangePrice: 0,
    accTradeVolume24h: 0,
    accTradePrice24h: 0,
    prevClosingPrice: 0,
  },

  candles: {
    candleType: 'days',
    datas: [],
  },

  orderPrice: 0,

  loadMarketListLoading: false,
  loadMarketListDone: false,
  loadMarketListError: null,

  loadTickerListLoading: false,
  loadTickerListDone: false,
  loadTickerListError: null,

  loadTradeListLoading: false,
  loadTradeListDone: false,
  loadTradeListError: null,

  loadOrderbookLoading: false,
  loadOrderbookDone: false,
  loadOrderbookError: null,

  loadSelectedCoinDataLoading: false,
  loadSelectedCoinDataDone: false,
  loadSelectedCoinDataError: null,

  loadCandleDataLoading: false,
  loadCandleDataDone: false,
  loadCandleDataError: null,

  loadPrevCandleDataLoading: false,
  loadPrevCandleDataDone: false,
  loadPrevCandleDataError: null,
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
    loadMarketListSuccess: (state, { payload }: PayloadAction<MarketList>) => {
      state.loadMarketListLoading = false;
      state.loadMarketListDone = true;

      payload.forEach((marketData) => {
        const marketCode = marketData.market.substring(0, marketData.market.indexOf('-'));
        switch (marketCode) {
          case 'KRW':
          case 'BTC':
          case 'USDT':
            state.marketList[marketCode].push({
              market: marketData.market,
              koreanName: marketData.korean_name,
              englishName: marketData.english_name,
            });
            break;
          default:
            throw new Error(`${marketCode}의 code는 state로 저장할 수 없습니다.`);
        }
      });

      state.searchMarketList = [...state.marketList.KRW];
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
    loadTradeListRequest: (state) => {
      state.loadTradeListLoading = true;
      state.loadTradeListDone = false;
      state.loadTradeListError = null;
    },
    loadTradeListSuccess: (state, { payload }: PayloadAction<Trades>) => {
      state.loadTradeListLoading = false;
      state.loadTradeListDone = true;

      state.tradeList = [];

      payload.forEach((trade) => {
        state.tradeList.push({
          market: trade.market,
          tradeDateUtc: trade.trade_date_utc,
          tradeTimeUtc: trade.trade_time_utc,
          timestamp: trade.timestamp,
          tradePrice: trade.trade_price,
          tradeVolume: trade.trade_volume,
          prevClosingPrice: trade.prev_closing_price,
          changePrice: trade.change_price,
          askBid: trade.ask_bid,
          sequentialId: trade.sequential_id,
        });
      });
    },
    loadTradeListFailure: (state, { payload }) => {
      state.loadTradeListLoading = false;
      state.loadTradeListError = payload.error;
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

      state.selectedCoin = {
        ...state.selectedCoin,
        market: payload[0].market,
        tradePrice: payload[0].trade_price,
        highPrice: payload[0].high_price,
        lowPrice: payload[0].low_price,
        high52WeekPrice: payload[0].highest_52_week_price,
        high52WeekDate: payload[0].highest_52_week_date,
        low52WeekPrice: payload[0].lowest_52_week_price,
        low52WeekDate: payload[0].lowest_52_week_date,
        signedChangePrice: payload[0].signed_change_price,
        accTradeVolume24h: payload[0].acc_trade_price_24h,
        accTradePrice24h: payload[0].acc_trade_price_24h,
        prevClosingPrice: payload[0].prev_closing_price,
      };

      state.orderPrice = payload[0].trade_price;
    },
    loadSelectedCoinDataFailure: (state, { payload }) => {
      state.loadSelectedCoinDataLoading = false;
      state.loadSelectedCoinDataError = payload.error;
    },
    loadCandleDataRequest: (state) => {
      state.loadCandleDataLoading = true;
      state.loadCandleDataDone = false;
      state.loadCandleDataError = null;
    },
    loadCandleDataSuccess: (
      state,
      { payload }: PayloadAction<DayCandles | WeekCandles | MonthCandles | MinuteCandles>,
    ) => {
      state.loadCandleDataLoading = false;
      state.loadCandleDataDone = true;

      const candles: {
        dateTimeKst: string;
        openingPrice: number;
        highPrice: number;
        lowPrice: number;
        tradePrice: number;
        accTradeVolume: number;
      }[] = [];

      payload.forEach((candle) => {
        candles.push({
          dateTimeKst: candle.candle_date_time_kst,
          openingPrice: candle.opening_price,
          highPrice: candle.high_price,
          lowPrice: candle.low_price,
          tradePrice: candle.trade_price,
          accTradeVolume: candle.candle_acc_trade_volume,
        });
      });
      state.candles.datas = candles.reverse();
    },
    loadCandleDataFailure: (state, { payload }) => {
      state.loadCandleDataLoading = false;
      state.loadCandleDataError = payload.error;
    },
    loadPrevCandleDataRequest: (state) => {
      state.loadPrevCandleDataLoading = true;
      state.loadPrevCandleDataDone = false;
      state.loadPrevCandleDataError = null;
    },
    loadPrevCandleDataSuccess: (
      state,
      { payload }: PayloadAction<DayCandles | WeekCandles | MonthCandles | MinuteCandles>,
    ) => {
      state.loadPrevCandleDataLoading = false;
      state.loadPrevCandleDataDone = true;

      const candles: {
        dateTimeKst: string;
        openingPrice: number;
        highPrice: number;
        lowPrice: number;
        tradePrice: number;
        accTradeVolume: number;
      }[] = [];

      payload.forEach((candle) => {
        candles.push({
          dateTimeKst: candle.candle_date_time_kst,
          openingPrice: candle.opening_price,
          highPrice: candle.high_price,
          lowPrice: candle.low_price,
          tradePrice: candle.trade_price,
          accTradeVolume: candle.candle_acc_trade_volume,
        });
      });

      state.candles.datas = [...candles.reverse(), ...state.candles.datas];
    },

    loadPrevCandleDataFailure: (state, { payload }) => {
      state.loadPrevCandleDataLoading = false;
      state.loadPrevCandleDataError = payload.error;
    },
    loadPrevCandleData: () => {
      return;
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
    updateTradeList: (state, { payload }: PayloadAction<RealTimeTrades>) => {
      // 중복으로 들어온 코드 제거
      const tradeList = payload.filter((trade) => trade.code === state.selectedCoin.market);

      // 들어온 데이터가 기존데이터에 존재할 경우 업데이트 안함
      tradeList.forEach((trade) => {
        if (!state.tradeList.find((value) => value.sequentialId === trade.sequential_id)) {
          state.tradeList.unshift({
            market: trade.code,
            tradeDateUtc: trade.trade_date,
            tradeTimeUtc: trade.trade_time,
            timestamp: trade.timestamp,
            tradePrice: trade.trade_price,
            tradeVolume: trade.trade_volume,
            prevClosingPrice: trade.prev_closing_price,
            changePrice: trade.change_price,
            askBid: trade.ask_bid,
            sequentialId: trade.sequential_id,
          });
          state.tradeList.pop();
        }
      });
    },
    updateOrderbook: (state, { payload }: PayloadAction<RealTimeOrderbooks>) => {
      // 마지막 호가 데이터로 업데이트
      const codes = payload.map((orderbook) => orderbook.code);
      const lastIndex = codes.lastIndexOf(state.selectedCoin.market);

      if (lastIndex !== -1) {
        state.orderbook.timestamp = payload[lastIndex].timestamp;
        state.orderbook.totalAskSize = payload[lastIndex].total_ask_size;
        state.orderbook.totalBidSize = payload[lastIndex].total_bid_size;
        payload[lastIndex].orderbook_units.forEach((unit, index) => {
          state.orderbook.orderbookUnits[index] = {
            askPrice: unit.ask_price,
            askSize: unit.ask_size,
            bidPrice: unit.bid_price,
            bidSize: unit.bid_size,
          };
        });
      }
    },
    updateSelectedCoin: (state, { payload }: PayloadAction<RealTimeTickers>) => {
      // 마지막 코인 데이터로 업데이트
      const coinList = payload.filter((value) => value.code === state.selectedCoin.market);

      const coin = coinList[coinList.length - 1];

      state.selectedCoin = {
        ...state.selectedCoin,
        tradePrice: coin.trade_price,
        highPrice: coin.high_price,
        lowPrice: coin.low_price,
        signedChangePrice: coin.signed_change_price,
        accTradeVolume24h: coin.acc_trade_volume_24h,
        accTradePrice24h: coin.acc_trade_price_24h,
        prevClosingPrice: coin.prev_closing_price,
      };
    },
    changeSelectedCoin: (
      state,
      { payload }: PayloadAction<{ marketName: string; market: string }>,
    ) => {
      undefined;
    },
    changeSelectedMarketName: (state, { payload }: PayloadAction<{ marketName: string }>) => {
      state.selectedCoin.marketName = payload.marketName;
    },
    changeOrderPrice: (state, { payload }: PayloadAction<{ orderPrice: number }>) => {
      state.orderPrice = payload.orderPrice;
    },
    changeCandleData: (state, { payload }: PayloadAction<{ type: CandleType }>) => {
      state.candles.candleType = payload.type;
      state.candles.datas = [];
    },
    searchMarket: (state, { payload }: PayloadAction<{ word: string }>) => {
      if (payload.word === '') {
        state.searchMarketList = [...state.marketList.KRW];
        return;
      }
      const regex = createFuzzyMatcher(payload.word);
      const searchMarketList = [];
      for (let i = 0; i < state.marketList.KRW.length; i++) {
        if (regex.test(state.marketList.KRW[i].koreanName)) {
          searchMarketList.push(state.marketList.KRW[i]);
        }
      }
      state.searchMarketList = searchMarketList;
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
  loadTradeListRequest,
  loadTradeListSuccess,
  loadTradeListFailure,
  loadOrderbookRequest,
  loadOrderbookSuccess,
  loadOrderbookFailure,
  loadSelectedCoinDataRequest,
  loadSelectedCoinDataSuccess,
  loadSelectedCoinDataFailure,
  loadCandleDataRequest,
  loadCandleDataSuccess,
  loadCandleDataFailure,
  loadPrevCandleDataRequest,
  loadPrevCandleDataSuccess,
  loadPrevCandleDataFailure,
  loadPrevCandleData,
  updateTickerList,
  updateTradeList,
  updateOrderbook,
  updateSelectedCoin,
  changeSelectedCoin,
  changeSelectedMarketName,
  changeOrderPrice,
  changeCandleData,
  searchMarket,
} = coinSlice.actions;

export default coinSlice.reducer;
