import { StockPredictionRequest, StockPredictionResponse, ModelStatusResponse, TrainRequest, TrainResponse } from '../types';
import { StockPredictionRequest, StockPredictionResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const predictStock = async (
  request: StockPredictionRequest
): Promise<StockPredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict?ticker=${encodeURIComponent(request.ticker.toUpperCase())}`);

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