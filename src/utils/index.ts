export function dayToDayFormat(signedChangePrice: number, prevClosingPrice: number) {
  const result = (signedChangePrice / prevClosingPrice) * 100;

  if (result > 0) {
    return `+${result.toFixed(2)}`;
  }
  return result.toFixed(2);
}

export function tradingValueFormat(accTradePrice24h: number) {
  return Math.round(accTradePrice24h / 1000000).toLocaleString();
}
