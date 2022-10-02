import { MarketCodes } from '.';

export interface SocketState {
  socketConnectionLoading: boolean;
  socketConnectionDone: boolean;
  socketConnectionError: Error | null;
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
