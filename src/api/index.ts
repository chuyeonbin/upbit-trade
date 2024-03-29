import axios from 'axios';
import { MinuteCandles, Unit } from '../types/candle';
import { MarketList, Orderbooks, PresentPrices, Trades } from '../types';

const BASE_URL = 'https://api.upbit.com/v1';

export async function getMarketList(): Promise<MarketList> {
  const query = '/market/all?isDetails=false';
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByMinutes(
  market: string,
  unit: Unit,
  date: string,
): Promise<MinuteCandles> {
  const query = `/candles/minutes/${unit}?market=${market}&to=${date}&count=200`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByData<T>(
  market: string,
  type: 'days' | 'weeks' | 'months',
  date: string,
): Promise<T> {
  const query = `/candles/${type}?market=${market}&to=${date}&count=200`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getTrades(market: string): Promise<Trades> {
  const query = `/trades/ticks?market=${market}&count=30`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getPresentPrice(markets: string[]): Promise<PresentPrices> {
  const query = `/ticker?markets=${markets.join(',')}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getOrderBooks(market: string): Promise<Orderbooks> {
  const query = `/orderbook?markets=${market}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}
