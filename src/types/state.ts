import { MarketCodes } from '.';

export interface SocketState {
  socketConnectionLoading: boolean;
  socketConnectionSuccess: boolean;
  socketConnectionError: Error | null;
}

export interface CoinState {
  marketList: MarketCodes;

  loadMarketListLoading: boolean;
  loadMarketListSuccess: boolean;
  loadMarketListError: Error | null;
}

export default interface RootState {
  socket: SocketState;
  coin: CoinState;
}
