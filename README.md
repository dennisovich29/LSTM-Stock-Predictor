LSTM Stock Price Predictor
This is a full-stack web application that uses a Long Short-Term Memory (LSTM) Recurrent Neural Network to predict the next day's stock price movement and provide a "Buy," "Sell," or "Hold" recommendation. The project features a Python FastAPI backend for the machine learning model and a modern JavaScript/TypeScript frontend for the user interface.

Features
AI-Powered Predictions: Utilizes a deep learning LSTM model to forecast stock price changes.

Generalizable Model: The model is trained on percentage changes, not absolute prices, allowing it to be applied to any stock ticker without retraining.

Technical Indicator Analysis: Enriches the model's input by engineering a suite of technical indicators (SMAs, RSI, Bollinger Bands).

Actionable Recommendations: Provides a clear "Buy," "Sell," or "Hold" signal based on the predicted price movement.

RESTful API: A clean, fast, and interactive API built with FastAPI serves the model's predictions.

Interactive Frontend: A simple and responsive user interface to input a stock ticker and view the prediction.

Tech Stack
Backend
Python 3

FastAPI: For building the high-performance API.

TensorFlow / Keras: For building and training the LSTM model.

scikit-learn: For data preprocessing (MinMaxScaler).

Pandas & NumPy: For data manipulation and numerical operations.

yfinance: For fetching historical stock data.

Uvicorn: As the ASGI server to run the API.

Frontend
JavaScript / TypeScript

React / Vite: (Or your specific frontend framework)

Tailwind CSS: For styling the user interface.

Project Structure
This project is organized as a monorepo with two distinct subdirectories:

/
├── backend/      # Contains the FastAPI application, model, and all Python code.
└── frontend/     # Contains the user-facing application code.

Local Setup and Installation
To run this project locally, you will need to have Python, Node.js, and npm installed. You will need to run the backend and frontend in two separate terminals.

1. Backend Setup
# Navigate to the backend directory
cd backend

# Create and activate a Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install the required Python packages
pip install -r requirements.txt

# Train the model (only needs to be done once)
# This will create the model and scaler files in the artifacts/ folder
python model.py

# Start the backend API server
uvicorn app:app --reload

The backend server will now be running on http://127.0.0.1:8000.

2. Frontend Setup
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install the required npm packages (only needs to be done once)
npm install

# Start the frontend development server
npm run dev

The frontend will now be running on its own local server (e.g., http://localhost:5174) and will be able to communicate with the backend.

API Endpoint
The backend exposes the following endpoint:

GET /predict
Description: Predicts the next day's closing price for a given stock ticker.

Query Parameter:

ticker (string, required): The stock symbol (e.g., AAPL, GOOG).

Success Response (200 OK):

{
  "ticker": "GOOG",
  "last_close_price": 185.94,
  "predicted_pct_change": "0.0502%",
  "predicted_next_day_price": 186.03,
  "recommendation": "Hold"
}

Error Response (400/500):

{
  "detail": "Error message here."
