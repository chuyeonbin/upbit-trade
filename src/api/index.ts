import axios from 'axios';
import { DayCandles, MinuteCandles, MonthCandles, Unit, WeekCandles } from '../types/candle';
import { MarketCodes, OrderBooks, PresentPrices, RecentContracts } from '../types';

const BASE_URL = 'https://api.upbit.com/v1';

export async function getMarketCodes(): Promise<MarketCodes> {
  const query = '/market/all?isDetails=false';
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByMinutes(
  market: string,
  unit: Unit,
  count: number,
): Promise<MinuteCandles> {
  const query = `/candles/minutes/${unit}?market=KRW-BTC&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByDays(market: string, count: number): Promise<DayCandles> {
  const query = `/candles/days?market=${market}&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByWeeks(market: string, count: number): Promise<WeekCandles> {
  const query = `/candles/weeks?market=${market}&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByMonths(market: string, count: number): Promise<MonthCandles> {
  const query = `/candles/months?market=${market}&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getRecentContract(market: string, count: number): Promise<RecentContracts> {
  const query = `/trades/ticks?market=${market}&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getPresentPrice(market: string): Promise<PresentPrices> {
  const query = `/ticker?markets=${market}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getOrderBook(market: string): Promise<OrderBooks> {
  const query = `/orderbook?markets=${market}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}