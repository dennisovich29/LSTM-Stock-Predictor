export interface StockPredictionRequest {
  ticker: string;
}

export interface StockPredictionResponse {
  ticker: string;
  last_close_price: number;
  predicted_pct_change: string;
  predicted_next_day_price: number;
  recommendation: string;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  details?: string;
}