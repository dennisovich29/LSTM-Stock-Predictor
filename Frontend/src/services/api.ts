import { StockPredictionRequest, StockPredictionResponse, ModelStatusResponse, TrainRequest, TrainResponse } from '../types';
import { StockPredictionRequest, StockPredictionResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const predictStock = async (
  request: StockPredictionRequest
): Promise<StockPredictionResponse> => {
  try {
    const params = new URLSearchParams({
      ticker: request.ticker.toUpperCase()
    });
    
    if (request.owns_stock !== undefined) {
      params.append('owns_stock', request.owns_stock.toString());
    }
    
    const response = await fetch(`${API_BASE_URL}/predict?${params}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Prediction API Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get stock prediction'
    );
  }
};