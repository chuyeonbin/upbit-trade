import { MarketCodes } from '.';

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
  marketList: MarketCodes;

  loadMarketListLoading: boolean;
  loadMarketListDone: boolean;
  loadMarketListError: Error | null;
}

export default interface RootState {
  socket: SocketState;
  coin: CoinState;
}
