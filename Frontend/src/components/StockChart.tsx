import React from 'react';
import { StockPredictionResponse } from '../types';
import { TrendingUp, TrendingDown, DollarSign, Target, Percent } from 'lucide-react';

interface StockChartProps {
  data: StockPredictionResponse;
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const priceChange = data.predicted_next_day_price - data.last_close_price;
  const priceChangePercent = parseFloat(data.predicted_pct_change.replace('%', ''));

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case 'buy':
      case 'strong buy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'sell':
      case 'strong sell':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'hold':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {data.ticker} Next-Day Price Prediction
            </h2>
            <p className="text-gray-600">
              AI-powered prediction using LSTM neural network
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-2">
              <DollarSign className="w-5 h-5 text-gray-500 mr-1" />
              <span className="text-2xl font-bold text-gray-900">
                ${data.predicted_next_day_price.toFixed(2)}
              </span>
            </div>
            <div className={`flex items-center text-sm ${
              priceChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {priceChange >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span>
                {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} ({data.predicted_pct_change})
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Price Comparison Visual */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Comparison</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Current Close</p>
              <p className="text-2xl font-bold text-blue-600">${data.last_close_price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              {priceChange >= 0 ? (
                <TrendingUp className="w-8 h-8 text-green-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-500" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Predicted Next Day</p>
              <p className="text-2xl font-bold text-green-600">${data.predicted_next_day_price.toFixed(2)}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${priceChange >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(Math.abs(priceChangePercent) * 10, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Expected change: {data.predicted_pct_change}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-900">Current Price</h4>
          </div>
          <p className="text-2xl font-bold text-blue-600">${data.last_close_price.toFixed(2)}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Target className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="font-semibold text-green-900">Predicted Price</h4>
          </div>
          <p className="text-2xl font-bold text-green-600">${data.predicted_next_day_price.toFixed(2)}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Percent className="w-5 h-5 text-purple-600 mr-2" />
            <h4 className="font-semibold text-purple-900">Expected Change</h4>
          </div>
          <p className="text-2xl font-bold text-purple-600">{data.predicted_pct_change}</p>
        </div>
      </div>

      {/* Recommendation */}
      <div className={`p-4 rounded-lg border ${getRecommendationColor(data.recommendation)}`}>
        <div className="flex items-center">
          <Target className="w-5 h-5 mr-2" />
          <div>
            <h4 className="font-semibold">AI Recommendation</h4>
            <p className="text-lg font-bold">{data.recommendation.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {data.message && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">{data.message}</p>
        </div>
      )}
    </div>
  );
};

export default StockChart;