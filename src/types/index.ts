export interface MarketCode {
  market: string;
  korean_name: string;
  english_name: string;
  market_warning?: string;
}

export type MarketCodes = MarketCode[];

export interface RecentContract {
  market: string;
  trade_date_utc: string;
  trade_time_utc: string;
  timestamp: number;
  trade_price: number;
  trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  ask_bid: string;
  sequential_id?: number;
}

export type RecentContracts = RecentContract[];

export interface PresentPrice {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: string;
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export type PresentPrices = PresentPrice[];

export interface OrderBook {
  market: string;
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
  orderbook_units: { ask_price: number; bid_price: number; ask_size: number; bid_size: number }[];
}

export type OrderBooks = OrderBook[];
