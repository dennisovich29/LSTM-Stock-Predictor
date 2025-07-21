from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import load_prediction_assets, make_prediction

# Define the response model to include the 'recommendation' field
class PredictionResponse(BaseModel):
    ticker: str
    last_close_price: float
    predicted_pct_change: str
    predicted_next_day_price: float
    recommendation: str

# Initialize the FastAPI app
app = FastAPI(
    title="Stock Predictor API",
    description="An API to predict the next day's stock price using an LSTM model.",
    version="1.2.0"
)

# --- Add CORS Middleware ---
# This section is crucial for allowing your frontend to connect to this backend.
origins = [
    "*", # Allows all origins for development.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)
# --- End CORS Section ---


# Load model and scaler on startup
model, scaler = load_prediction_assets()

@app.on_event("startup")
async def startup_event():
    global model, scaler
    if not model or not scaler:
        print("WARNING: Model or scaler not found. The /predict endpoint will not work.")

@app.get("/predict", response_model=PredictionResponse)
async def predict_endpoint(ticker: str = Query(..., description="The stock ticker symbol to predict (e.g., AAPL, GOOG).")):
    """
    Predicts the next day's closing price for a given stock ticker and provides a buy/sell/hold recommendation.
    """
    if not model or not scaler:
        raise HTTPException(
            status_code=503, 
            detail="Model is not available. Please check the server logs."
        )

    try:
        prediction_result = make_prediction(ticker, model, scaler)
        return prediction_result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        print(f"An unexpected error occurred for ticker {ticker}: {e}")
        raise HTTPException(
            status_code=500, 
            detail="An internal error occurred. Please try again later."
        )

@app.get("/", include_in_schema=False)
async def root():
    return {"message": "Stock Predictor API is running. Go to /docs for the API documentation."}
