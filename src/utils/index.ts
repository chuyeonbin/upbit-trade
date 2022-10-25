export function dayToDayFormat(signedChangePrice: number, prevClosingPrice: number): string {
  const result = (signedChangePrice / prevClosingPrice) * 100;

  if (result > 0) {
    return `+${result.toFixed(2)}`;
  }
  return result.toFixed(2);
}
