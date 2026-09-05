"""
MerchantMind AI - FastAPI Application
Backend API server supporting the Razorpay AI Buildathon pitch demo
"""

import os
import logging
from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

try:
    from Backend.agent import MerchantMindAgent, TransactionData
except ImportError:
    from agent import MerchantMindAgent, TransactionData

# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("MerchantMindAPI")

app = FastAPI(
    title="MerchantMind AI API",
    description="Autonomous Revenue Growth Agent for Razorpay Merchants",
    version="1.0.0"
)

# Enable CORS for frontend development and local servers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for demo persistence across clicks
class DemoState:
    def __init__(self):
        self.agent = MerchantMindAgent()
        self.reset()

    def reset(self):
        # Initial analysis
        analysis = self.agent.analyze_merchant("rzp_merchant_demo")
        self.recommendations = analysis["recommendations"]
        self.summary = analysis["summary"]
        self.metrics = analysis["data_analyzed"]
        self.audit_trail = [
            {
                "id": "aud_01",
                "timestamp": "09:41 AM",
                "iso_time": datetime.now().isoformat(),
                "event": "Merchant Data Ingested",
                "details": "Synchronized 1,000 transactions, 150 cart dropoffs from Razorpay API",
                "actor": "Razorpay Sync Worker",
                "status": "Verified",
                "type": "ingest"
            },
            {
                "id": "aud_02",
                "timestamp": "09:42 AM",
                "iso_time": datetime.now().isoformat(),
                "event": "Revenue Leakage Detected",
                "details": "Identified 4 leakage vectors totaling ₹8.5 Lakhs (17% lift potential)",
                "actor": "MerchantMind Agent",
                "status": "Verified",
                "type": "analyze"
            },
            {
                "id": "aud_03",
                "timestamp": "09:43 AM",
                "iso_time": datetime.now().isoformat(),
                "event": "AI Recommendations Generated",
                "details": "Synthesized 4 bounded actions with Claude reasoning and confidence scores",
                "actor": "Claude 3.5 Sonnet",
                "status": "Bounded",
                "type": "recommend"
            },
            {
                "id": "aud_04",
                "timestamp": "09:44 AM",
                "iso_time": datetime.now().isoformat(),
                "event": "Action Boundaries Validated",
                "details": "Safety checks passed: Discount capped at 5%, max retry 2, no automatic debit",
                "actor": "Validation Engine",
                "status": "Compliant",
                "type": "validate"
            }
        ]

state = DemoState()


# Data Models
class ActionRequest(BaseModel):
    recommendation_id: str
    merchant_id: str = "rzp_merchant_demo"
    reason: Optional[str] = None


class MerchantInput(BaseModel):
    merchant_id: str = "rzp_merchant_demo"
    total_transactions: int = 1000
    completed_transactions: int = 700
    failed_transactions: int = 150
    refunded_transactions: int = 50
    abandoned_carts: int = 150
    total_revenue: float = 50_00_000.0
    average_order_value: float = 5000.0
    customer_count: int = 5000
    data_period_days: int = 30


@app.get("/")
async def root():
    return {
        "name": "MerchantMind AI",
        "tagline": "Autonomous Revenue Growth Agent for Razorpay Merchants",
        "version": "1.0.0",
        "status": "operational",
        "demo_scenario": {
            "merchant_monthly_revenue": "₹50 Lakhs",
            "potential_recovery": "₹8.5 Lakhs",
            "projected_revenue": "₹58.5 Lakhs",
            "revenue_lift": "17%"
        },
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "engine": "MerchantMind-Reasoning-v1",
        "claude_connected": bool(state.agent.client)
    }


@app.get("/metrics/{merchant_id}")
async def get_metrics(merchant_id: str):
    """Core merchant dashboard metrics matching the pitch"""
    return {
        "merchant_id": merchant_id,
        "is_demo_data": True,
        "currency": "INR",
        "metrics": {
            "monthly_revenue": 5000000.0,
            "monthly_revenue_display": "₹50.0L",
            "potential_recovery": 850000.0,
            "potential_recovery_display": "₹8.5L",
            "revenue_opportunity_percent": 17.0,
            "projected_revenue": 5850000.0,
            "projected_revenue_display": "₹58.5L",
            "at_risk_customers": 320,
            "abandoned_carts": 150,
            "cart_abandonment_benchmark": "70%",
            "payment_failure_rate": 0.15,
            "payment_failure_rate_display": "15.0%",
            "refund_rate": 0.05,
            "refund_rate_display": "5.0%",
            "total_transactions": 1000,
            "completed_transactions": 700,
            "failed_transactions": 150,
            "average_order_value": 5000.0
        },
        "period": "Last 30 days",
        "questions_answered": {
            "how_much_am_i_losing": "₹8.5 Lakhs / month across 4 primary leakage channels (17% of GMV)",
            "why_am_i_losing_it": "70% cart dropoff, 15% payment failure (concentrated in UPI bank latency), and 320 lapsing repeat customers",
            "what_does_ai_recommend": "4 bounded, safe growth actions with high confidence scores",
            "what_impact_can_i_recover": "Projected +₹8.5L monthly revenue, lifting GMV to ₹58.5L"
        }
    }


@app.get("/leakage/{merchant_id}")
async def get_revenue_leakage(merchant_id: str):
    """Granular Revenue Leakage view matching pitch Screen 3"""
    return {
        "merchant_id": merchant_id,
        "total_leakage_amount": 850000.0,
        "total_leakage_display": "₹8.5 Lakhs",
        "categories": [
            {
                "id": "cart_abandonment",
                "title": "Cart Abandonment",
                "severity": "HIGH",
                "count": 150,
                "benchmark": "70% cart abandonment rate",
                "recoverable_inr": 450000.0,
                "recoverable_display": "₹4.5 Lakhs",
                "summary": "Customers are adding high-value items to cart but dropping off right before completing payment.",
                "chart_data": {
                    "completed_carts": 700,
                    "abandoned_carts": 150,
                    "recovered_potential": 45
                },
                "funnel_dropoffs": [
                    {"stage": "Cart Created", "dropoff_pct": "0%"},
                    {"stage": "Address Entered", "dropoff_pct": "12%"},
                    {"stage": "Payment Method Selected", "dropoff_pct": "58%"},
                    {"stage": "OTP / App Auth", "dropoff_pct": "30%"}
                ]
            },
            {
                "id": "payment_failures",
                "title": "Payment Failures",
                "severity": "HIGH",
                "rate": "15.0%",
                "failed_count": 150,
                "recoverable_inr": 200000.0,
                "recoverable_display": "₹2.0 Lakhs",
                "summary": "Transactions failing silently. MerchantMind pinpoints WHY payments fail instead of merely showing 'failed'.",
                "pattern_breakdown": [
                    {
                        "method": "UPI",
                        "share_of_failures": "68%",
                        "failure_rate": "14.8%",
                        "primary_reason": "Bank switch timeout & NPCI response latency during peak hours"
                    },
                    {
                        "method": "Credit / Debit Cards",
                        "share_of_failures": "22%",
                        "failure_rate": "4.2%",
                        "primary_reason": "3D Secure authentication dropoffs & bank decline"
                    },
                    {
                        "method": "Netbanking / Wallets",
                        "share_of_failures": "10%",
                        "failure_rate": "2.8%",
                        "primary_reason": "Session expiration on external bank portals"
                    }
                ]
            },
            {
                "id": "refunds_chargebacks",
                "title": "Chargebacks & Refunds",
                "severity": "MEDIUM",
                "rate": "5.0%",
                "refunded_count": 50,
                "message": "MerchantMind identifies underlying patterns instead of simply reporting refund tallies.",
                "pattern_analysis": {
                    "by_product": [
                        {"category": "Premium Electronics", "refund_rate": "7.4%", "flag": "Size/spec mismatch"},
                        {"category": "Apparel & Fashion", "refund_rate": "4.8%", "flag": "Sizing returns"},
                        {"category": "Home Goods", "refund_rate": "1.9%", "flag": "Normal range"}
                    ],
                    "by_payment_method": [
                        {"method": "Cash on Delivery (COD)", "refund_rate": "9.2%"},
                        {"method": "Prepaid Razorpay (UPI/Card)", "refund_rate": "2.1%"}
                    ],
                    "frequency_flag": "14 repeated refund requests from 3 anomalous IP/VPA clusters flagged for review"
                }
            },
            {
                "id": "customer_churn",
                "title": "Customer Churn",
                "severity": "MEDIUM",
                "at_risk_count": 320,
                "recoverable_inr": 250000.0,
                "recoverable_display": "₹2.5 Lakhs",
                "summary": "Identify loyal customers showing pre-churn signals BEFORE they permanently leave.",
                "risk_segments": [
                    {
                        "tier": "High Risk",
                        "count": 85,
                        "criteria": "Last ordered >60 days ago; was ordering bi-weekly",
                        "potential_loss": "₹1,20,000"
                    },
                    {
                        "tier": "Medium Risk",
                        "count": 145,
                        "criteria": "Last ordered 45-60 days ago; declining cart value",
                        "potential_loss": "₹90,000"
                    },
                    {
                        "tier": "Low Risk",
                        "count": 90,
                        "criteria": "Last ordered 30-45 days ago; browse frequency down",
                        "potential_loss": "₹40,000"
                    }
                ]
            }
        ]
    }


@app.post("/analyze")
async def run_ai_analysis(payload: Optional[MerchantInput] = None):
    """
    Simulates / triggers the 6-stage AI agent reasoning workflow
    """
    input_data = TransactionData(
        merchant_id=payload.merchant_id if payload else "rzp_merchant_demo",
        total_transactions=payload.total_transactions if payload else 1000,
        completed_transactions=payload.completed_transactions if payload else 700,
        failed_transactions=payload.failed_transactions if payload else 150,
        refunded_transactions=payload.refunded_transactions if payload else 50,
        abandoned_carts=payload.abandoned_carts if payload else 150,
        total_revenue=payload.total_revenue if payload else 50_00_000.0,
        average_order_value=payload.average_order_value if payload else 5000.0,
        failure_rate=0.15,
        refund_rate=0.05,
        churn_rate=0.10,
        customer_count=5000,
        data_period_days=30
    )

    result = state.agent.analyze_merchant(input_data.merchant_id, input_data)
    state.recommendations = result["recommendations"]
    state.summary = result["summary"]

    # Append audit log
    state.audit_trail.append({
        "id": f"aud_{len(state.audit_trail)+1:02d}",
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "iso_time": datetime.now().isoformat(),
        "event": "Autonomous Analysis Run",
        "details": f"Generated {len(state.recommendations)} bounded recommendations across 4 leakage vectors",
        "actor": "MerchantMind Agent",
        "status": "Success",
        "type": "analyze"
    })

    return result


@app.get("/recommendations/{merchant_id}")
async def get_recommendations(merchant_id: str):
    """Returns the list of current recommendations with approval statuses"""
    return {
        "merchant_id": merchant_id,
        "total": len(state.recommendations),
        "summary": state.summary,
        "recommendations": state.recommendations
    }


@app.post("/actions/approve")
async def approve_action(payload: ActionRequest):
    """
    Screen 7: Bounded Execution - Merchant approval
    Changes state to 'approved' and records an audit log.
    """
    found = False
    rec_title = "Unknown Recommendation"
    for r in state.recommendations:
        if r["id"] == payload.recommendation_id:
            r["status"] = "approved"
            rec_title = r["title"]
            found = True
            break

    if not found:
        raise HTTPException(status_code=404, detail="Recommendation ID not found")

    audit_entry = {
        "id": f"aud_{len(state.audit_trail)+1:02d}",
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "iso_time": datetime.now().isoformat(),
        "event": "Action Approved by Merchant",
        "details": f"Merchant approved execution of '{rec_title}' within strict bounds",
        "actor": "Merchant Admin",
        "status": "Approved",
        "type": "execute",
        "recommendation_id": payload.recommendation_id
    }
    state.audit_trail.append(audit_entry)

    logger.info(f"Action approved: {payload.recommendation_id}")
    return {
        "status": "success",
        "message": "Action approved successfully. Recorded in immutable audit trail.",
        "recommendation_id": payload.recommendation_id,
        "audit_entry": audit_entry
    }


@app.post("/actions/reject")
async def reject_action(payload: ActionRequest):
    """
    Screen 7: Bounded Execution - Merchant rejection
    Changes state to 'rejected' and records an audit log.
    """
    found = False
    rec_title = "Unknown Recommendation"
    for r in state.recommendations:
        if r["id"] == payload.recommendation_id:
            r["status"] = "rejected"
            rec_title = r["title"]
            found = True
            break

    if not found:
        raise HTTPException(status_code=404, detail="Recommendation ID not found")

    audit_entry = {
        "id": f"aud_{len(state.audit_trail)+1:02d}",
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "iso_time": datetime.now().isoformat(),
        "event": "Action Rejected by Merchant",
        "details": f"Merchant declined recommendation: '{rec_title}'",
        "actor": "Merchant Admin",
        "status": "Rejected",
        "type": "reject",
        "recommendation_id": payload.recommendation_id
    }
    state.audit_trail.append(audit_entry)

    logger.info(f"Action rejected: {payload.recommendation_id}")
    return {
        "status": "success",
        "message": "Recommendation rejected. Recorded in audit trail.",
        "recommendation_id": payload.recommendation_id,
        "audit_entry": audit_entry
    }


@app.get("/audit-trail/{merchant_id}")
async def get_audit_trail(merchant_id: str):
    """Screen 8: Complete Audit Trail"""
    return {
        "merchant_id": merchant_id,
        "total_entries": len(state.audit_trail),
        "audit_trail": list(reversed(state.audit_trail))
    }


@app.get("/architecture")
async def get_architecture():
    """Technical Architecture details matching the pitch script"""
    return {
        "system_name": "MerchantMind AI",
        "description": "Production-grade autonomous agent architecture for Razorpay merchants",
        "pipeline_stages": [
            {"order": 1, "name": "Razorpay Ingestion", "tech": "Async Webhooks & REST APIs", "description": "Fetches real payments, refunds, chargebacks, customer telemetry."},
            {"order": 2, "name": "FastAPI Backend", "tech": "Python 3.12 + FastAPI", "description": "Asynchronous REST gateway, rate-limiting, and telemetry validation."},
            {"order": 3, "name": "MerchantMind Agent", "tech": "Autonomous Multi-Step Agent", "description": "Orchestrates pattern recognition, failure clustering, and churn signals."},
            {"order": 4, "name": "Claude AI Engine", "tech": "Anthropic Claude API", "description": "Multi-step reasoning across demographic, payment method, and temporal data."},
            {"order": 5, "name": "Safety Validation Layer", "tech": "Bounded Policy Engine", "description": "Filters suggestions; ensures strict boundary enforcement (no unauthorized financial modifications)."},
            {"order": 6, "name": "Merchant Approval", "tech": "Human-in-the-Loop Dashboard", "description": "Merchant reviews, approves, or rejects bounded growth actions."},
            {"order": 7, "name": "Audit Trail & Compliance", "tech": "Immutable Audit Log", "description": "Logs every decision, constraint, and timestamp for complete compliance."},
            {"order": 8, "name": "Impact Measurement", "tech": "Predictive & Real-Time Tracking", "description": "Quantifies recovered GMV, saved customers, and conversion lift."}
        ],
        "tech_stack": {
            "backend": "Python + FastAPI",
            "frontend": "React + Tailwind CSS + Vite",
            "ai_engine": "Claude API Reasoning (with deterministic fallback)",
            "database": "PostgreSQL (transactions) + Redis (caching & rate limits)",
            "deployment": "Docker Containerized",
            "security": "Bounded execution, NPCI/RBI compliance design, zero hallucination guardrails"
        }
    }


@app.post("/webhook/razorpay")
async def razorpay_webhook(payload: dict):
    event_type = payload.get("event", "payment.captured")
    logger.info(f"Razorpay webhook received: {event_type}")
    return {
        "status": "processed",
        "event": event_type,
        "timestamp": datetime.now().isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("Backend.main:app", host="127.0.0.1", port=8000, reload=True)
