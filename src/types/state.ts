import { Orderbooks } from '.';
import { RealTimeTrades } from './realTime';

export interface SocketState {
  presentPriceSocketLoading: boolean;
  presentPriceSocketDone: boolean;
  presentPriceSocketError: Error | null;

  tradeSocketLoading: boolean;
  tradeSocketDone: boolean;
  tradeSocketError: Error | null;

  orderbookSocketLoading: boolean;
  orderbookSocketDone: boolean;
  orderbookSocketError: Error | null;
}

export interface CoinState {
  marketList: {
    code: string;
    koreanName: string;
    englishName: string;
  }[];

  tickerList: {
    [key: string]: {
      tradePrice: number;
      changePrice: number;
      accTradePrice24h: number;
      prevClosingPrice: number;
      signedChangePrice: number;
    };
  };

  tradeList: RealTimeTrades;

  orderbook: {
    timestamp: number;
    totalAskSize: number;
    totalBidSize: number;
    orderbookUnits: {
      askPrice: number;
      bidPrice: number;
      askSize: number;
      bidSize: number;
    }[];
  };

  selectedCoin: {
    marketName: string;
    code: string;
    tradePrice: number;
    highPrice: number;
    lowPrice: number;
    high52WeekPrice: number;
    high52WeekDate: string;
    low52WeekPrice: number;
    low52WeekDate: string;
    signedChangePrice: number;
    accTradeVolume24h: number;
    accTradePrice24h: number;
    prevClosingPrice: number;
  };

  loadMarketListLoading: boolean;
  loadMarketListDone: boolean;
  loadMarketListError: Error | null;

  loadTickerListLoading: boolean;
  loadTickerListDone: boolean;
  loadTickerListError: Error | null;

  loadOrderbookLoading: boolean;
  loadOrderbookDone: boolean;
  loadOrderbookError: Error | null;

  loadSelectedCoinDataLoading: boolean;
  loadSelectedCoinDataDone: boolean;
  loadSelectedCoinDataError: Error | null;
}

export default interface RootState {
  socket: SocketState;
  coin: CoinState;
}
