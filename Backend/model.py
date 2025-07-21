import numpy as np
import pickle
import os
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
from config import settings
from data_processing import get_yfinance_data, create_features
from datetime import date, timedelta

def build_model(input_shape):
    """Builds the LSTM model architecture."""
    model = Sequential([
        LSTM(units=50, return_sequences=True, input_shape=input_shape),
        Dropout(0.2),
        LSTM(units=50, return_sequences=True),
        Dropout(0.2),
        LSTM(units=50),
        Dropout(0.2),
        Dense(units=1)
    ])
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

def train_model():
    """Trains the LSTM model and saves it along with the scaler."""
    print("Starting model training process...")
    df_raw = get_yfinance_data(
        settings.DEFAULT_TICKER,
        settings.DEFAULT_START_DATE,
        settings.DEFAULT_END_DATE
    )
    df_processed = create_features(df_raw)

    data_to_scale = df_processed[settings.FEATURES + [settings.TARGET]].values
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data_to_scale)

    X, y = [], []
    for i in range(settings.LOOK_BACK_PERIOD, len(scaled_data)):
        X.append(scaled_data[i-settings.LOOK_BACK_PERIOD:i, :-1])
        y.append(scaled_data[i, -1])
    X, y = np.array(X), np.array(y)
    X = np.reshape(X, (X.shape[0], X.shape[1], len(settings.FEATURES)))

    model = build_model(input_shape=(X.shape[1], X.shape[2]))
    print("Training model...")
    model.fit(X, y, epochs=settings.EPOCHS, batch_size=settings.BATCH_SIZE, verbose=1)

    os.makedirs('artifacts', exist_ok=True)
    model.save(settings.MODEL_PATH)
    with open(settings.SCALER_PATH, 'wb') as f:
        pickle.dump(scaler, f)
    print(f"Model saved to {settings.MODEL_PATH}")
    print(f"Scaler saved to {settings.SCALER_PATH}")

def load_prediction_assets():
    """Loads the saved model and scaler."""
    try:
        model = load_model(settings.MODEL_PATH)
        with open(settings.SCALER_PATH, 'rb') as f:
            scaler = pickle.load(f)
        print("Model and scaler loaded successfully.")
        return model, scaler
    except Exception as e:
        print(f"Error loading model or scaler: {e}. Please run the training script first.")
        return None, None

def make_prediction(ticker: str, model, scaler):
    """Makes a prediction for a given ticker."""
    start_date = date.today() - timedelta(days=200) # Extra buffer for feature calculation
    end_date = date.today()
    df_raw = get_yfinance_data(ticker, start_date.isoformat(), end_date.isoformat())
    df_features = create_features(df_raw.copy())

    if len(df_features) < settings.LOOK_BACK_PERIOD:
        raise ValueError("Not enough data to make a prediction after feature engineering.")
    
    last_n_days = df_features.tail(settings.LOOK_BACK_PERIOD)
    last_n_days[settings.TARGET] = 0 # Dummy column for scaler
    scaled_features = scaler.transform(last_n_days[settings.FEATURES + [settings.TARGET]])
    
    input_data = scaled_features[:, :-1]
    input_for_prediction = np.reshape(input_data, (1, settings.LOOK_BACK_PERIOD, len(settings.FEATURES)))

    predicted_scaled_pct_change = model.predict(input_for_prediction)

    dummy_array = np.zeros((1, len(settings.FEATURES) + 1))
    dummy_array[0, -1] = predicted_scaled_pct_change[0, 0]
    predicted_pct_change = scaler.inverse_transform(dummy_array)[0, -1]

    recommendation = "Hold"
    if predicted_pct_change > settings.RECOMMENDATION_THRESHOLD:
        recommendation = "Buy"
    elif predicted_pct_change < -settings.RECOMMENDATION_THRESHOLD:
        recommendation = "Sell"
    
    last_actual_price = df_raw['Close'].iloc[-1]
    predicted_price = last_actual_price * (1 + predicted_pct_change)
    
    return {
        'ticker': ticker.upper(),
        'last_close_price': round(last_actual_price, 2),
        'predicted_pct_change': f'{predicted_pct_change:.4%}',
        'predicted_next_day_price': round(predicted_price, 2),
        'recommendation': recommendation
    }

# This allows running training directly
if __name__ == '__main__':
    train_model()

