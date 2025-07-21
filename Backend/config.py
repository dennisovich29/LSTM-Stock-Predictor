import os
from dotenv import load_dotenv

load_dotenv() # Load variables from .env file

class Settings:
    # Data Source Settings
    DEFAULT_TICKER = 'AAPL'
    DEFAULT_START_DATE = '2010-01-01'
    DEFAULT_END_DATE = '2025-07-21'
    
    # Recommendation threshold (e.g., 0.05%)
    RECOMMENDATION_THRESHOLD = 0.0005

    # Model & Feature Engineering Settings
    LOOK_BACK_PERIOD = 60
    FEATURES = [
        'SMA_20_pct', 'SMA_50_pct', 'EMA_20_pct', 'RSI',
        'BB_Upper_pct', 'BB_Lower_pct', 'Price_Range_pct'
    ]
    TARGET = 'Target_Pct_Change'

    # Training Settings
    EPOCHS = 50
    BATCH_SIZE = 32

    # Saved Model/Scaler Paths
    MODEL_PATH = 'artifacts/stock_predictor_model.h5'
    SCALER_PATH = 'artifacts/scaler.pkl'

settings = Settings()
