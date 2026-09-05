from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="MerchantMind AI",
    description="Autonomous Revenue Growth Agent for Razorpay Merchants",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MerchantInput(BaseModel):
    merchant_id: str
    total_transactions: int
    completed_transactions: int
    failed_transactions: int
    refunded_transactions: int
    abandoned_carts: int
    total_revenue: float
    average_order_value: float
    customer_count: int
    data_period_days: int = 30

class Recommendation(BaseModel):
    title: str
    description: str
    rationale: str
    estimated_impact: str
    confidence: str
    action_type: str
    target_segment: str
    priority: str

class AnalysisResponse(BaseModel):
    merchant_id: str
    timestamp: str
    status: str
    total_recommendations: int

@app.get("/")
async def root():
    return {
        "message": "Welcome to MerchantMind AI",
        "docs": "/docs",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "0.1.0"
    }

@app.post("/analyze")
async def analyze_merchant(merchant_data: MerchantInput):
    logger.info(f"Analyzing merchant: {merchant_data.merchant_id}")
    
    try:
        mock_response = {
            "merchant_id": merchant_data.merchant_id,
            "timestamp": datetime.now().isoformat(),
            "status": "success",
            "summary": {
                "total_recommendations": 3,
                "combined_impact": "25%",
                "high_priority": 2,
                "confidence_avg": 80
            },
            "recommendations": [
                {
                    "title": "Cart Abandonment Recovery",
                    "description": "Send personalized recovery emails",
                    "rationale": f"You have {merchant_data.abandoned_carts} abandoned carts",
                    "estimated_impact": "15%",
                    "confidence": "85%",
                    "action_type": "email",
                    "target_segment": "cart_abandoners",
                    "priority": "high"
                },
                {
                    "title": "Payment Failure Recovery",
                    "description": "Implement automatic retry flow",
                    "rationale": f"Failure rate is {100 * merchant_data.failed_transactions / max(merchant_data.total_transactions, 1):.1f}%",
                    "estimated_impact": "5%",
                    "confidence": "80%",
                    "action_type": "retry",
                    "target_segment": "failed_payments",
                    "priority": "high"
                },
                {
                    "title": "Churn Prevention",
                    "description": "Target at-risk customers",
                    "rationale": "Subscriber churn costing revenue",
                    "estimated_impact": "5%",
                    "confidence": "75%",
                    "action_type": "offer",
                    "target_segment": "churn_risk",
                    "priority": "medium"
                }
            ]
        }
        
        return mock_response
        
    except Exception as e:
        logger.error(f"Analysis error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/recommendations/{merchant_id}")
async def get_recommendations(merchant_id: str):
    logger.info(f"Fetching recommendations for: {merchant_id}")
    return {
        "merchant_id": merchant_id,
        "recommendations": [],
        "last_updated": datetime.now().isoformat(),
        "message": "Connect to database to get stored recommendations"
    }

@app.get("/metrics/{merchant_id}")
async def get_metrics(merchant_id: str):
    logger.info(f"Fetching metrics for: {merchant_id}")
    return {
        "merchant_id": merchant_id,
        "metrics": {
            "total_revenue": 0,
            "recovery_potential": 0,
            "recommendation_accuracy": 0,
            "avg_confidence": 0
        },
        "period": "last_30_days"
    }

@app.post("/webhook/razorpay")
async def razorpay_webhook(payload: dict):
    logger.info(f"Received Razorpay webhook: {payload.get('event')}")
    return {
        "status": "received",
        "event": payload.get('event'),
        "timestamp": datetime.now().isoformat()
    }

@app.on_event("startup")
async def startup_event():
    logger.info("Starting MerchantMind AI API...")
    logger.info("✓ API initialized")
    logger.info("✓ CORS enabled")
    logger.info("✓ Ready to accept requests")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down MerchantMind AI API...")

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting server...")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
