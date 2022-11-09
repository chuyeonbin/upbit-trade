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

  orderbook: {
    code: string;
    units: {
      askPrice: number;
      askSize: number;
      bidPrice: number;
      bidSize: number;
    }[];
    totalAskSize: number;
    totalBidSize: number;
  };

  selectedCoin: {
    marketName: string;
    code: string;
    tradePrice: number;
    highPrice: number;
    lowPrice: number;
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

  loadSelectedCoinDataLoading: boolean;
  loadSelectedCoinDataDone: boolean;
  loadSelectedCoinDataError: Error | null;
}

export default interface RootState {
  socket: SocketState;
  coin: CoinState;
}
