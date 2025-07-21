import React from 'react';
import { TrendingUp, Brain, BarChart3, DollarSign } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <DollarSign className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              LSTM Stock Predictor
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Harness the power of Long Short-Term Memory neural networks to predict next-day stock prices. 
            Enter any stock ticker symbol and get AI-powered predictions using the latest market data.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Stock Predictions</h3>
            <p className="text-gray-600">
              Advanced LSTM neural networks analyze the latest market data to predict next-day stock prices 
              with high accuracy.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Visual Analysis</h3>
            <p className="text-gray-600">
              Interactive charts display recent prices vs next-day predictions, helping you make 
              informed investment decisions.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Pre-trained Models</h3>
            <p className="text-gray-600">
              Our LSTM models are pre-trained and ready to predict next-day prices for any stock ticker 
              using the latest market data.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Predicting
          </button>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Enter Ticker</h4>
              <p className="text-sm text-gray-600">Simply enter any stock ticker symbol (e.g., AAPL, TSLA, GOOGL)</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Processing</h4>
              <p className="text-sm text-gray-600">Our pre-trained LSTM model processes the latest market data</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Prediction</h4>
              <p className="text-sm text-gray-600">Receive instant next-day price predictions with confidence metrics</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Analyze</h4>
              <p className="text-sm text-gray-600">View interactive charts with recent prices and next-day predictions</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Stock Tickers</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['AAPL', 'TSLA', 'GOOG', 'MSFT', 'AMZN', 'NVDA', 'META', 'NFLX', 'MU'].map((ticker) => (
                <span
                  key={ticker}
                  className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm"
                >
                  {ticker}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;