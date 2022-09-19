export interface Candle {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
}

export type Unit = 1 | 3 | 5 | 15 | 10 | 30 | 60 | 240;

export interface MinuteCandle extends Candle {
  unit: Unit;
}

export type MinuteCandles = MinuteCandle[];

export interface DayCandle extends Candle {
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
  converted_trade_price?: number;
}

export type DayCandles = DayCandle[];

export interface WeekCandle extends Candle {
  first_day_of_period: string;
}

export type WeekCandles = WeekCandle[];

export interface MonthCandle extends Candle {
  first_day_of_period: string;
}

export type MonthCandles = MonthCandle[];
