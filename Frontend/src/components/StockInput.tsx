import React, { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { StockPredictionRequest } from '../types';

interface StockInputProps {
  onPredict: (request: StockPredictionRequest) => void;
  isLoading: boolean;
}

const StockInput: React.FC<StockInputProps> = ({ onPredict, isLoading }) => {
  const [ticker, setTicker] = useState('');

  const handlePredict = () => {
    if (!ticker.trim()) return;
    
    const request: StockPredictionRequest = {
      ticker: ticker.trim().toUpperCase(),
    };
    
    onPredict(request);
  };

  const isFormValid = ticker.trim();
  const canPredict = isFormValid && !isLoading;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Stock Price Prediction</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Ticker Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Ticker Symbol
            </label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g., AAPL, TSLA, GOOGL"
              placeholder="e.g., AAPL, TSLA, GOOG"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-semibold"
              maxLength={10}
            />
            
            {/* Simple Status Indicator */}
            <div className="mt-2">
              {ticker.trim() && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Ready to predict {ticker.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={handlePredict}
            disabled={!canPredict}
            className={`flex items-center justify-center py-3 px-8 rounded-lg font-medium transition-all duration-200 ${
              canPredict
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Zap className="w-5 h-5 mr-2" />
            {isLoading ? 'Predicting...' : 'Predict Prices'}
          </button>
        </div>

        {/* Info Card */}
        <div className="mt-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">Next-Day Price Prediction</h4>
                <p className="text-sm text-green-700">
                  Get AI-powered next-day price predictions using our pre-trained LSTM model with the latest market data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tickers */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Tickers:</h4>
          <div className="flex flex-wrap gap-2">
            {['AAPL', 'TSLA', 'GOOG', 'MSFT', 'AMZN', 'NVDA', 'MU'].map((popularTicker) => (
              <button
                key={popularTicker}
                onClick={() => setTicker(popularTicker)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
              >
                {popularTicker}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInput;