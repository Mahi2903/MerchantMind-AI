/**
 * MerchantMind AI — API Client
 * 
 * Provides unified data access.
 * Communicates with FastAPI backend if running, with seamless instant fallback
 * to the centralized deterministic mock dataset if offline.
 */

import { INITIAL_METRICS, INITIAL_RECOMMENDATIONS, INITIAL_AUDIT_TRAIL, LEAKAGE_DATA } from '../data/mockData';

const BASE_URL = '/api';

export const apiClient = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(1500) });
      if (!res.ok) throw new Error("Health check failed");
      return await res.json();
    } catch (e) {
      return { status: "offline", mode: "frontend_demo" };
    }
  },

  // Fetch metrics
  async getMetrics(merchantId = "rzp_merchant_demo") {
    try {
      const res = await fetch(`${BASE_URL}/metrics/${merchantId}`, { signal: AbortSignal.timeout(1500) });
      if (!res.ok) throw new Error("Failed to fetch metrics");
      const data = await res.json();
      return {
        monthlyRevenue: data.metrics.monthly_revenue,
        monthlyRevenueDisplay: data.metrics.monthly_revenue_display,
        potentialRecovery: data.metrics.potential_recovery,
        potentialRecoveryDisplay: data.metrics.potential_recovery_display,
        projectedRevenue: data.metrics.projected_revenue,
        projectedRevenueDisplay: data.metrics.projected_revenue_display,
        revenueOpportunityPercent: data.metrics.revenue_opportunity_percent,
        abandonedCarts: data.metrics.abandoned_carts,
        atRiskCustomers: data.metrics.at_risk_customers,
        paymentFailureRate: data.metrics.payment_failure_rate * 100,
        refundRate: data.metrics.refund_rate * 100,
        isDemoData: true,
        dataPeriod: data.period
      };
    } catch (e) {
      return INITIAL_METRICS;
    }
  },

  // Fetch recommendations
  async getRecommendations(merchantId = "rzp_merchant_demo") {
    try {
      const res = await fetch(`${BASE_URL}/recommendations/${merchantId}`, { signal: AbortSignal.timeout(1500) });
      if (!res.ok) throw new Error("Failed to fetch recommendations");
      const data = await res.json();
      return data.recommendations;
    } catch (e) {
      return INITIAL_RECOMMENDATIONS;
    }
  },

  // Fetch leakage analysis
  async getRevenueLeakage(merchantId = "rzp_merchant_demo") {
    try {
      const res = await fetch(`${BASE_URL}/leakage/${merchantId}`, { signal: AbortSignal.timeout(1500) });
      if (!res.ok) throw new Error("Failed to fetch leakage");
      return await res.json();
    } catch (e) {
      return LEAKAGE_DATA;
    }
  },

  // Run AI Analysis
  async runAnalysis(merchantId = "rzp_merchant_demo") {
    try {
      const res = await fetch(`${BASE_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchant_id: merchantId }),
        signal: AbortSignal.timeout(3000)
      });
      if (!res.ok) throw new Error("Analysis failed");
      return await res.json();
    } catch (e) {
      return {
        status: "success",
        mode: "deterministic_demo",
        recommendations: INITIAL_RECOMMENDATIONS
      };
    }
  },

  // Approve action
  async approveAction(recId) {
    try {
      const res = await fetch(`${BASE_URL}/actions/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendation_id: recId }),
        signal: AbortSignal.timeout(1500)
      });
      if (!res.ok) throw new Error("Approval failed");
      return await res.json();
    } catch (e) {
      return {
        status: "success",
        message: "Action approved in demo mode.",
        recommendation_id: recId
      };
    }
  },

  // Reject action
  async rejectAction(recId) {
    try {
      const res = await fetch(`${BASE_URL}/actions/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendation_id: recId }),
        signal: AbortSignal.timeout(1500)
      });
      if (!res.ok) throw new Error("Rejection failed");
      return await res.json();
    } catch (e) {
      return {
        status: "success",
        message: "Action rejected in demo mode.",
        recommendation_id: recId
      };
    }
  },

  // Get audit trail
  async getAuditTrail(merchantId = "rzp_merchant_demo") {
    try {
      const res = await fetch(`${BASE_URL}/audit-trail/${merchantId}`, { signal: AbortSignal.timeout(1500) });
      if (!res.ok) throw new Error("Failed to fetch audit trail");
      const data = await res.json();
      return data.audit_trail;
    } catch (e) {
      return INITIAL_AUDIT_TRAIL;
    }
  }
};
