import { CandleType } from '.';

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

type MarketCodeType = 'KRW' | 'BTC' | 'USDT';

interface MarketState {
  market: string;
  koreanName: string;
  englishName: string;
}

export interface CoinState {
  marketList: {
    [key in MarketCodeType]: MarketState[];
  };

  searchMarketList: MarketState[];

  tickerList: {
    [key: string]: {
      tradePrice: number;
      changePrice: number;
      accTradePrice24h: number;
      prevClosingPrice: number;
      signedChangePrice: number;
    };
  };

  tradeList: {
    market: string;
    tradeDateUtc: string;
    tradeTimeUtc: string;
    timestamp: number;
    tradePrice: number;
    tradeVolume: number;
    prevClosingPrice: number;
    changePrice: number;
    askBid: 'ASK' | 'BID';
    sequentialId: number;
  }[];

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
    market: string;
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

  candles: {
    candleType: CandleType;
    datas: {
      dateTimeKst: string;
      openingPrice: number;
      highPrice: number;
      lowPrice: number;
      tradePrice: number;
      accTradeVolume: number;
    }[];
  };

  orderPrice: number;

  loadMarketListLoading: boolean;
  loadMarketListDone: boolean;
  loadMarketListError: Error | null;

  loadTickerListLoading: boolean;
  loadTickerListDone: boolean;
  loadTickerListError: Error | null;

  loadTradeListLoading: boolean;
  loadTradeListDone: boolean;
  loadTradeListError: Error | null;

  loadOrderbookLoading: boolean;
  loadOrderbookDone: boolean;
  loadOrderbookError: Error | null;

  loadSelectedCoinDataLoading: boolean;
  loadSelectedCoinDataDone: boolean;
  loadSelectedCoinDataError: Error | null;

  loadCandleDataLoading: boolean;
  loadCandleDataDone: boolean;
  loadCandleDataError: Error | null;

  loadPrevCandleDataLoading: boolean;
  loadPrevCandleDataDone: boolean;
  loadPrevCandleDataError: Error | null;
}

export default interface RootState {
  socket: SocketState;
  coin: CoinState;
}
