# Time-series-prediction-LSTM
Time series prediction of closing stock using LSTM
# 📈 Apple Stock Price Prediction using LSTM

This project predicts future stock prices of any stock using deep learning techniques. The data was collected using the `yfinance` API and modeled with an LSTM (Long Short-Term Memory) network using TensorFlow/Keras.

## 📅 Time Period
- **Data Range**: `2014-12-03` to `2025-06-10`

## 📂 Features
- 📊 Data Collection using `yfinance`
- 📈 Data Normalization and Preprocessing
- 🧠 LSTM Model for Time Series Forecasting
- 🖼️ Visualization of Real vs Predicted Closing Prices

## 🔧 Libraries Used
- Python
- NumPy, Pandas
- Matplotlib
- sklearn
- TensorFlow / Keras
- yfinance

## Hyperparameters 
- epoch = 200
- learning_rate = 0.002
- batch_size = 32
- optimizer = Adam
- units: 512
- Dropout = 0.01

## 📷 Results Preview

MSE: 1.6307893434525935
RMSE: 1.2770236268184678
MAE: 0.8414269010802905
R² Score: 0.9982297360833974

![apple_test_stock](https://github.com/user-attachments/assets/bd5c6886-5217-4a07-b977-2ccf283d0d92)

![micron_stock](https://github.com/user-attachments/assets/29d023bf-5dba-4c50-84a0-16b1a01411e0)

## ▶️ How to Run
1. Clone the repo or open in Colab.
2. Install dependencies .
3. Run the notebook and follow through the cells.

## 📄 License
This project is for educational purposes only and does not constitute financial advice.
