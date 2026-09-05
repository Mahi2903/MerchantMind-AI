from anthropic import Anthropic
from dataclasses import dataclass
from typing import List, Dict, Any
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class TransactionData:
    merchant_id: str
    total_transactions: int
    completed_transactions: int
    failed_transactions: int
    refunded_transactions: int
    abandoned_carts: int
    total_revenue: float
    average_order_value: float
    failure_rate: float
    refund_rate: float
    churn_rate: float
    customer_count: int
    data_period_days: int

@dataclass
class Recommendation:
    title: str
    description: str
    rationale: str
    estimated_impact: float
    confidence: float
    action_type: str
    target_segment: str
    estimated_affected_customers: int
    priority: str
    audit_trail: Dict[str, Any]

class MerchantMindAgent:
    def __init__(self, api_key: str):
        self.client = Anthropic()
        self.conversation_history = []
        logger.info("MerchantMind Agent initialized")
    
    def analyze_merchant(self, merchant_id: str, transaction_data: TransactionData) -> Dict[str, Any]:
        logger.info(f"Analyzing merchant: {merchant_id}")
        
        analysis_prompt = self._format_analysis_prompt(transaction_data)
        analysis = self._get_claude_analysis(analysis_prompt)
        recommendations = self._generate_recommendations(analysis, transaction_data)
        validated = self._validate_recommendations(recommendations)
        response = self._create_response(merchant_id, analysis, validated, transaction_data)
        
        logger.info(f"Analysis complete for {merchant_id}: {len(validated)} recommendations")
        return response
    
    def _format_analysis_prompt(self, data: TransactionData) -> str:
        prompt = f"""
You are MerchantMind AI, analyzing merchant revenue data.

MERCHANT DATA (Last {data.data_period_days} days):
- Total Transactions: {data.total_transactions}
- Completed: {data.completed_transactions} ({100 * data.completed_transactions / max(data.total_transactions, 1):.1f}%)
- Failed: {data.failed_transactions} ({100 * data.failure_rate:.1f}%)
- Refunded: {data.refunded_transactions}
- Abandoned Carts: {data.abandoned_carts}
- Total Revenue: ₹{data.total_revenue:,.0f}
- Average Order Value: ₹{data.average_order_value:,.0f}
- Churn Rate: {100 * data.churn_rate:.1f}%

TASK: Identify revenue leakage and recommend growth actions.
For each insight provide: Problem, Root Cause, Opportunity, Action, Impact %.
Be specific. Focus on high-impact actions only (>5% revenue recovery).
"""
        return prompt
    
    def _get_claude_analysis(self, prompt: str) -> Dict[str, Any]:
        logger.info("Requesting analysis from Claude API")
        
        try:
            self.conversation_history.append({"role": "user", "content": prompt})
            
            response = self.client.messages.create(
                model="claude-opus-4-1",
                max_tokens=2000,
                messages=self.conversation_history
            )
            
            analysis_text = response.content[0].text
            self.conversation_history.append({"role": "assistant", "content": analysis_text})
            
            return {"findings": analysis_text, "recommendations": []}
            
        except Exception as e:
            logger.error(f"Error calling Claude API: {e}")
            raise
    
    def _generate_recommendations(self, analysis: Dict[str, Any], data: TransactionData) -> List[Recommendation]:
        logger.info("Generating recommendations")
        recommendations = []
        
        if data.abandoned_carts > 0:
            recovery_rate = 0.10
            affected_customers = int(data.abandoned_carts * 0.6)
            impact = recovery_rate * (data.abandoned_carts * data.average_order_value) / max(data.total_revenue, 1) * 100
            
            rec = Recommendation(
                title="Cart Abandonment Recovery Campaign",
                description="Send personalized recovery emails to customers with abandoned carts",
                rationale=f"You have {data.abandoned_carts} abandoned carts representing lost revenue",
                estimated_impact=min(impact, 15),
                confidence=85,
                action_type="email",
                target_segment="cart_abandoners",
                estimated_affected_customers=affected_customers,
                priority="high" if data.abandoned_carts > 100 else "medium",
                audit_trail={"metric": "abandoned_carts", "value": data.abandoned_carts, "timestamp": datetime.now().isoformat()}
            )
            recommendations.append(rec)
        
        if data.failure_rate > 0.10:
            affected = int(data.failed_transactions * 0.3)
            impact = min(affected * data.average_order_value / max(data.total_revenue, 1) * 100, 10)
            
            rec = Recommendation(
                title="Payment Failure Recovery Flow",
                description="Implement automatic retry with alternative payment methods",
                rationale=f"Your failure rate is {100*data.failure_rate:.1f}%, above average",
                estimated_impact=impact,
                confidence=80,
                action_type="retry",
                target_segment="failed_payments",
                estimated_affected_customers=affected,
                priority="high",
                audit_trail={"metric": "failure_rate", "value": data.failure_rate, "timestamp": datetime.now().isoformat()}
            )
            recommendations.append(rec)
        
        if data.churn_rate > 0.08:
            at_risk = int(data.customer_count * data.churn_rate * 0.5)
            avg_recovery = 500
            impact = at_risk * avg_recovery / max(data.total_revenue, 1) * 100
            
            rec = Recommendation(
                title="Churn Prevention Retention Program",
                description="Identify at-risk customers and send targeted retention offers",
                rationale=f"Your churn rate is {100*data.churn_rate:.1f}%",
                estimated_impact=min(impact, 8),
                confidence=75,
                action_type="offer",
                target_segment="churn_risk",
                estimated_affected_customers=at_risk,
                priority="high",
                audit_trail={"metric": "churn_rate", "value": data.churn_rate, "timestamp": datetime.now().isoformat()}
            )
            recommendations.append(rec)
        
        return recommendations
    
    def _validate_recommendations(self, recommendations: List[Recommendation]) -> List[Recommendation]:
        logger.info("Validating recommendations")
        validated = []
        
        for rec in recommendations:
            if rec.confidence < 70 or rec.estimated_impact < 2:
                continue
            if rec.action_type not in ["email", "pricing", "offer", "retry"]:
                continue
            if rec.estimated_affected_customers < 1:
                continue
            validated.append(rec)
        
        return validated
    
    def _create_response(self, merchant_id: str, analysis: Dict[str, Any], recommendations: List[Recommendation], data: TransactionData) -> Dict[str, Any]:
        total_impact = sum(r.estimated_impact for r in recommendations)
        
        return {
            "merchant_id": merchant_id,
            "timestamp": datetime.now().isoformat(),
            "status": "success",
            "summary": {
                "total_recommendations": len(recommendations),
                "combined_impact": min(total_impact, 30),
                "high_priority": len([r for r in recommendations if r.priority == "high"]),
                "confidence_avg": sum(r.confidence for r in recommendations) / max(len(recommendations), 1)
            },
            "recommendations": [
                {
                    "title": r.title,
                    "description": r.description,
                    "rationale": r.rationale,
                    "estimated_impact": f"{r.estimated_impact:.1f}%",
                    "confidence": f"{r.confidence}%",
                    "action_type": r.action_type,
                    "target_segment": r.target_segment,
                    "affected_customers": r.estimated_affected_customers,
                    "priority": r.priority
                }
                for r in recommendations
            ],
            "next_steps": ["Review recommendations", "Implement high-priority actions", "Track response rates", "Measure revenue impact"]
        }

if __name__ == "__main__":
    import os
    
    api_key = os.getenv("CLAUDE_API_KEY")
    agent = MerchantMindAgent(api_key=api_key)
    
    merchant_data = TransactionData(
        merchant_id="test_merchant_123",
        total_transactions=1000,
        completed_transactions=700,
        failed_transactions=150,
        refunded_transactions=50,
        abandoned_carts=150,
        total_revenue=50_00_000,
        average_order_value=5000,
        failure_rate=0.15,
        refund_rate=0.05,
        churn_rate=0.10,
        customer_count=5000,
        data_period_days=30
    )
    
    result = agent.analyze_merchant("test_merchant_123", merchant_data)
    import json
    print(json.dumps(result, indent=2, ensure_ascii=False))
