import axios from 'axios';

const BASE_URL = 'https://api.upbit.com/v1';

export async function getMarketCodes() {
  const query = '/market/all?isDetails=false';
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByMinutes(market: string, unit: number, count: number) {
  const query = `/candles/minutes/${unit}?market=KRW-BTC&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByDays(market: string, count: number) {
  const query = `/candles/days?market=${market}&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByWeeks(market: string, count: number) {
  const query = `/candles/weeks?market=${market}&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getCandleByMonths(market: string, count: number) {
  const query = `/candles/months?market=${market}&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getRecentContract(market: string, count: number) {
  const query = `/trades/ticks?market=${market}&count=${count}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getPresentPrice(market: string) {
  const query = `/ticker?markets=${market}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}

export async function getOrderBook(market: string) {
  const query = `/orderbook?markets=${market}`;
  const response = await axios.get(BASE_URL + query);
  return response.data;
}
