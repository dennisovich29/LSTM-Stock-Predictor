from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import load_prediction_assets, make_prediction
from typing import Optional

class PredictionResponse(BaseModel):
    ticker: str
    last_close_price: float
    predicted_pct_change: str
    predicted_next_day_price: float
    recommendation: str

app = FastAPI(
    title="Stock Predictor API",
    description="An API to predict the next day's stock price using an LSTM model.",
    version="1.3.0"
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model, scaler = load_prediction_assets()

@app.on_event("startup")
async def startup_event():
    global model, scaler
    if not model or not scaler:
        print("WARNING: Model or scaler not found. The /predict endpoint will not work.")

# --- UPDATED ENDPOINT SIGNATURE ---
@app.get("/predict", response_model=PredictionResponse)
async def predict_endpoint(
    ticker: str = Query(..., description="The stock ticker symbol to predict (e.g., AAPL, GOOG)."),
    owns_stock: Optional[bool] = Query(False, description="Set to true if the user already owns the stock.")
):
    """
    Predicts the next day's closing price and provides a tailored recommendation.
    """
    # --- DEBUGGING PRINT STATEMENT ---
    print(f"Received owns_stock parameter with value: {owns_stock} (Type: {type(owns_stock)})")
    # --- END DEBUGGING ---
    
    if not model or not scaler:
        raise HTTPException(
            status_code=503, 
            detail="Model is not available. Please check the server logs."
        )

    try:
        # Pass the 'owns_stock' parameter to the prediction function
        prediction_result = make_prediction(ticker, model, scaler, owns_stock)
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
