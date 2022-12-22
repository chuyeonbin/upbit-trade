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

export function signedChangePriceFormat(signedChangePrice: number) {
  if (!Number.isInteger(signedChangePrice)) {
    return signedChangePrice.toFixed(4);
  }

  if (signedChangePrice < 100 && signedChangePrice > -100) {
    return signedChangePrice.toFixed(2);
  }

  return signedChangePrice.toLocaleString();
}

export function tradeVolume24hFormat(tradeVolume24h: number) {
  return Number(tradeVolume24h.toFixed(3)).toLocaleString();
}

export function tradePriceFormat(tradePrice: number, tradeVolume: number) {
  return Math.round(tradePrice / (10 / (tradeVolume * 10))).toLocaleString();
}

export function createSocket(): WebSocket {
  const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
  ws.binaryType = 'arraybuffer';

  return ws;
}

export function createFuzzyMatcher(input: string) {
  const pattern = input.split('').map(chToPattern).join('.*?');
  return new RegExp(pattern);
}

export function chToPattern(ch: string) {
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const chToBegin: {
      [ch: string]: number;
    } = {
      ㄱ: '가'.charCodeAt(0),
      ㄲ: '까'.charCodeAt(0),
      ㄴ: '나'.charCodeAt(0),
      ㄷ: '다'.charCodeAt(0),
      ㄸ: '따'.charCodeAt(0),
      ㄹ: '라'.charCodeAt(0),
      ㅁ: '마'.charCodeAt(0),
      ㅂ: '바'.charCodeAt(0),
      ㅃ: '빠'.charCodeAt(0),
      ㅅ: '사'.charCodeAt(0),
      ㅆ: '싸'.charCodeAt(0),
      ㅇ: '아'.charCodeAt(0),
      ㅈ: '자'.charCodeAt(0),
      ㅊ: '차'.charCodeAt(0),
      ㅋ: '카'.charCodeAt(0),
      ㅌ: '타'.charCodeAt(0),
      ㅍ: '파'.charCodeAt(0),
      ㅎ: '하'.charCodeAt(0),
    };

    const begin = chToBegin[ch];
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  } else if (/[가-히]/.test(ch)) {
    const offset = '가'.charCodeAt(0);
    const chCode = ch.charCodeAt(0) - offset;

    if (chCode % 28 <= 0) {
      const begin = Math.floor(chCode / 28) * 28 + offset;
      const end = begin + 27;
      return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    } else return ch;
  }
}
