export interface RealTimeTicker {
  // 실시간 현재가
  type: 'ticker';
  code: string; // 마켓 코드(ex. KRW-BTC)
  opening_price: number; // 시가
  high_price: number; // 고가
  low_price: number; // 저가
  trade_price: number; // 현재가
  prev_closing_price: number; // 전일 종가
  change: 'RISE' | 'EVEN' | 'FALL'; // RISE: 상승, EVEN: 보합, FALL: 하락
  change_price: number; // 부호 없는 전일 대비 값
  signed_change_price: number; // 전일 대비 값
  change_rate: number; // 부호 없는 전일 대비 등락율
  signed_change_rate: number; // 전일 대비 등락율
  trade_volume: number; // 가장 최근 거래량
  acc_trade_volume: number; // 누적 거래량(UTC 0시 기준)
  acc_trade_volume_24h: number; // 24시간 누적 거래량
  acc_trade_price: number; // 누적 거래대금(UTC 0시 기준)
  acc_trade_price_24h: number; // 24시간 누적 거래대금
  trade_date: string; // 최근 거래 일자(UTC)
  trade_time: string; // 최근 거래 시각(UTC)
  trade_timestamp: number; // 체결 타임스탬프 (milliseconds)
  ask_bid: 'ASK' | 'BID'; // ASK: 매도, BID: 매수
  acc_ask_volume: number; // 누적 매도량
  acc_bid_volume: number; // 누적 매수량
  highest_52_week_price: number; // 52주 최고가
  highest_52_week_date: string; // 52주 최고가 달성일
  lowest_52_week_price: number; // 52주 최저가
  lowest_52_week_date: string; // 52주 최저가 달성일
  market_state: 'PREVIEW' | 'ACTIVE' | 'DELISTED'; // PREVIEW: 입금지원, ACTIVE: 거래지원가능, DELISTED: 거래지원종료
  is_trading_suspended: boolean; // 거래 정지 여부
  delisting_date: string | null; // 상장폐지일
  market_warning: 'NONE' | 'CAUTION'; // NONE: 해당없음, CAUTION: 투자유의
  timestamp: number; // 타임스탬프
  stream_type: 'SNAPSHOT' | 'REALTIME'; // SNAPSHOT: 스냅샷, REALTIME: 실시간
}

export type RealTimeTickers = RealTimeTicker[];

export interface RealTimeTrade {
  type: 'trade';
  code: string; // 마켓 코드(ex. KRW-BTC)
  trade_price: number; // 체결 가격
  trade_volume: number; // 체결량
  ask_bid: 'ASK' | 'BID'; // ASK: 매도, BID: 매수
  prev_closing_price: number; // 전일 종가
  change: 'RISE' | 'EVEN' | 'FALL'; // RISE: 상승, EVEN: 보합, FALL: 하락
  change_price: number; // 부호 없는 전일 대비 값
  trade_date: string; // 체결 일자(UTC 기준)
  trade_time: string; // 체결 시각(UTC 기준)
  trade_timestamp: number; // 체결 타임스탬프 (millisecond)
  timestamp: number; // 타임스탬프 (millisecond)
  sequential_id: number; // 체결 번호 (Unique)
  stream_type: 'SNAPSHOT' | 'REALTIME'; // SNAPSHOT: 스냅샷, REALTIME: 실시간
}

export type RealTimeTrades = RealTimeTrade[];

export interface RealTimeOrderbook {
  type: 'orderbook';
  code: string; // 마켓 코드(ex. KRW-BTC)
  total_ask_size: number; // 호가 매도 총 잔량
  total_bid_size: number; // 호가 매수 총 잔량
  orderbook_units: { ask_price: number; bid_price: number; ask_size: number; bid_size: number };
  timestamp: number; // 타임스탬프 (millisecond)
  stream_type: 'SNAPSHOT' | 'REALTIME'; // SNAPSHOT: 스냅샷, REALTIME: 실시간
}

export type RealTimeOrderbooks = RealTimeOrderbook[];
