import yfinance as yf
import pandas as pd
from config import settings
from datetime import date, timedelta

def get_yfinance_data(ticker: str, start_date: str, end_date: str) -> pd.DataFrame:
    """Fetches historical stock data from Yahoo Finance."""
    try:
        df_raw = yf.download(ticker, start=start_date, end=end_date)
        if df_raw.empty:
            raise ValueError(f"No data downloaded for {ticker} from yfinance.")
        
        if isinstance(df_raw.columns, pd.MultiIndex):
            df_raw.columns = df_raw.columns.get_level_values(0)
        df_raw.ffill(inplace=True)
        return df_raw
    except Exception as e:
        print(f"Error fetching data from yfinance for {ticker}: {e}")
        raise

def create_features(df: pd.DataFrame) -> pd.DataFrame:
    """Creates time-series features from a stock dataframe."""
    df['SMA_20'] = df['Close'].rolling(window=20).mean()
    df['SMA_50'] = df['Close'].rolling(window=50).mean()
    df['EMA_20'] = df['Close'].ewm(span=20, adjust=False).mean()
    delta = df['Close'].diff(1)
    gain = delta.mask(delta < 0, 0)
    loss = -delta.mask(delta > 0, 0)
    avg_gain = gain.ewm(com=13, adjust=False).mean()
    avg_loss = loss.ewm(com=13, adjust=False).mean()
    epsilon = 1e-10
    rs = avg_gain / (avg_loss + epsilon)
    df['RSI'] = 100 - (100 / (1 + rs))
    sma_20 = df['Close'].rolling(window=20).mean()
    std_20 = df['Close'].rolling(window=20).std()
    df['BB_Upper'] = sma_20 + (2 * std_20)
    df['BB_Lower'] = sma_20 - (2 * std_20)
    df['SMA_20_pct'] = (df['SMA_20'].values - df['Close'].values) / df['Close'].values
    df['SMA_50_pct'] = (df['SMA_50'].values - df['Close'].values) / df['Close'].values
    df['EMA_20_pct'] = (df['EMA_20'].values - df['Close'].values) / df['Close'].values
    df['BB_Upper_pct'] = (df['BB_Upper'].values - df['Close'].values) / df['Close'].values
    df['BB_Lower_pct'] = (df['BB_Lower'].values - df['Close'].values) / df['Close'].values
    df['Price_Range_pct'] = (df['High'].values - df['Low'].values) / df['Close'].values
    if 'Target_Pct_Change' not in df.columns:
        df[settings.TARGET] = df['Close'].pct_change().shift(-1)
    df.dropna(inplace=True)
    return df

