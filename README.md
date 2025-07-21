# 📈 LSTM Stock Price Predictor

A full-stack AI-powered web application that predicts the next day's stock price movement using a Long Short-Term Memory (LSTM) model and provides actionable trading recommendations: **Buy**, **Sell**, or **Hold**.

---

## 🚀 Features

- **AI-Powered Predictions:** Uses an LSTM neural network to forecast next-day stock price movement.
- **Generalizable Model:** Trained on percentage changes, making it adaptable to any stock ticker without retraining.
- **Technical Indicator Analysis:** Enhances model accuracy with features like:
  - Simple Moving Averages (SMA)
  - Relative Strength Index (RSI)
  - Bollinger Bands
- **Actionable Recommendations:** Interprets the predicted movement into easy-to-follow advice.
- **RESTful API:** Built using **FastAPI**, ensuring high-performance delivery.
- **Interactive Frontend:** Clean and responsive UI to fetch and view predictions.

---

## 🛠 Tech Stack

### Backend
- **Python 3**
- **FastAPI** – High-performance API framework
- **TensorFlow / Keras** – For training the LSTM model
- **scikit-learn** – Preprocessing with `MinMaxScaler`
- **Pandas & NumPy** – Data manipulation
- **yfinance** – Historical stock data fetching
- **Uvicorn** – ASGI server for FastAPI

### Frontend
- **JavaScript / TypeScript**
- **React** (with **Vite**)
- **Tailwind CSS** – For modern, responsive UI

---

## 📁 Project Structure

```
/
├── backend/      # FastAPI app, model training code, API routes
└── frontend/     # React frontend app
```

---

## ⚙️ Installation & Local Development

### 1️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the model (once)
python model.py

# Start the API server
uvicorn app:app --reload
```

> 🔗 Backend runs at: `http://127.0.0.1:8000`

---

### 2️⃣ Frontend Setup

```bash
# Open new terminal
cd frontend

# Install npm packages
npm install

# Start development server
npm run dev
```

> 🔗 Frontend runs at: `http://localhost:5174`

---

## 🔌 API Endpoint

### `GET /predict`

**Description:** Predicts the next day's closing price for a given stock ticker.

#### Query Parameters
| Parameter | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| `ticker`  | string | ✅ yes   | Stock symbol (e.g., AAPL, TSLA) |

#### ✅ Success Response (`200 OK`)
```json
{
  "ticker": "GOOG",
  "last_close_price": 185.94,
  "predicted_pct_change": "0.0502%",
  "predicted_next_day_price": 186.03,
  "recommendation": "Hold"
}
```

#### ❌ Error Response (`400/500`)
```json
{
  "detail": "Error message here."
}
```

---

## 📌 Notes

- The LSTM model and scaler are saved in the `artifacts/` folder after training.
- You can replace `yfinance` with any custom data source if needed.
- Ideal for learning LSTM-based financial forecasting and full-stack AI deployment.

---

## 📜 License

MIT License – [Your Name or GitHub Username]  
Feel free to use, modify, and share with attribution.
