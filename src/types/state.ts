import { MarketCodes } from '.';

export interface SocketState {
  presentPriceSocketLoading: boolean;
  presentPriceSocketDone: boolean;
  presentPriceSocketError: Error | null;
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
