import React from 'react';
import { 
  AlertTriangle, 
  ShoppingCart, 
  CreditCard, 
  RefreshCw, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Info,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { LEAKAGE_DATA } from '../data/mockData';

const RevenueLeakage = ({ onNavigateRecommendations, onRunAnalysis }) => {
  const { cartAbandonment, paymentFailures, chargebacksAndRefunds, customerChurn } = LEAKAGE_DATA;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-semibold text-rose-400 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Telemetry Diagnostics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Revenue Leakage Analysis
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            MerchantMind isolates root causes behind ₹8.5 Lakhs in preventable monthly revenue loss across four critical transaction stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">Total Recoverable Leakage</span>
            <p className="text-2xl font-black text-rose-400">₹8.5 Lakhs</p>
          </div>
          <button
            onClick={onNavigateRecommendations}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md shadow-sky-500/15"
          >
            <span>View 4 Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Core Leakage Cards */}
      <div className="space-y-6">

        {/* 1. CART ABANDONMENT */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">1. Cart Abandonment</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    SEVERITY: {cartAbandonment.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  "{cartAbandonment.summary}"
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-xs text-slate-500 font-medium">Estimated Recoverable Revenue</span>
              <p className="text-2xl font-black text-sky-400">{cartAbandonment.recoverableDisplay}</p>
              <span className="text-[11px] text-slate-400">{cartAbandonment.count} abandoned carts</span>
            </div>
          </div>

          {/* Visual: Completed vs Abandoned Carts */}
          <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Checkout Conversion vs Dropoff Ratio</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400 font-medium">{cartAbandonment.benchmark}</span>
              </div>
              <span className="text-slate-400">Total Checkouts Initiated: 850</span>
            </div>

            {/* Visual ratio bar */}
            <div className="w-full h-8 bg-slate-950 rounded-lg overflow-hidden flex border border-slate-800 p-1">
              <div 
                style={{ width: '82%' }} 
                className="bg-emerald-600/90 h-full rounded-l-md flex items-center justify-between px-3 text-xs font-semibold text-white"
                title="700 Completed Checkouts (82%)"
              >
                <span>Completed Orders (700)</span>
                <span className="text-[10px] opacity-80">82.4%</span>
              </div>
              <div 
                style={{ width: '18%' }} 
                className="bg-rose-500/90 h-full rounded-r-md flex items-center justify-center px-2 text-xs font-bold text-white"
                title="150 Abandoned Carts (17.6%)"
              >
                <span>Abandoned (150)</span>
              </div>
            </div>

            {/* Funnel Stage Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {cartAbandonment.funnel.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-mono">Stage {idx + 1}</span>
                  <p className="text-xs font-bold text-slate-200 mt-0.5">{step.name}</p>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="font-mono text-slate-400">{step.count}</span>
                    <span className="font-semibold text-sky-400">{step.pct}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-sky-500/5 rounded-lg border border-sky-500/20 text-xs text-sky-300 flex items-center justify-between">
              <span><strong>AI Insight:</strong> 62% of cart dropoffs occur immediately when the payment selection modal opens, indicating lack of saved payment tokens or clear delivery dates.</span>
              <button 
                onClick={onNavigateRecommendations}
                className="text-xs font-bold text-sky-400 hover:text-white underline cursor-pointer ml-4 whitespace-nowrap"
              >
                View Cart Recovery Action →
              </button>
            </div>
          </div>
        </div>

        {/* 2. PAYMENT FAILURES */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">2. Payment Failures</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    SEVERITY: {paymentFailures.severity}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {paymentFailures.failureRate} SIGNAL
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {paymentFailures.summary}
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-xs text-slate-500 font-medium">Estimated Recovery Opportunity</span>
              <p className="text-2xl font-black text-amber-400">{paymentFailures.recoverableDisplay}</p>
              <span className="text-[11px] text-slate-400">150 failed transactions</span>
            </div>
          </div>

          {/* Key Message callout from pitch */}
          <div className="p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/25 flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs font-semibold text-amber-200">
              {paymentFailures.pitchInsight}
            </p>
          </div>

          {/* Breakdown of Payment Patterns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentFailures.breakdown.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{item.method}</span>
                    <span className="text-xs font-bold text-amber-400">{item.rate}</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-1">
                    Share of Failures: <strong className="text-slate-200">{item.share}</strong>
                  </span>
                  <p className="text-xs text-slate-400 leading-snug">
                    <strong className="text-slate-300">Root Cause:</strong> {item.reason}
                  </p>
                </div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color}`}
                    style={{ width: item.share.split('%')[0] + '%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CHARGEBACKS & REFUNDS */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">3. Chargebacks & Refunds</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    RATE: {chargebacksAndRefunds.refundRate}
                  </span>
                </div>
                <p className="text-xs text-purple-300 font-medium mt-0.5">
                  "{chargebacksAndRefunds.summary}"
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-xs text-slate-500 font-medium">Pattern Status</span>
              <p className="text-xl font-bold text-slate-200">50 Total Refunds</p>
              <span className="text-[11px] text-purple-400">Anomalies Isolated</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pattern by product */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Refund Pattern by Product Category</span>
              <div className="space-y-2">
                {chargebacksAndRefunds.productPatterns.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-300 font-medium">{p.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-rose-400">{p.refundRate}</span>
                      <span className="text-[10px] text-slate-400">({p.insight})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern by payment method & cluster */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Payment Method & Anomaly Cluster</span>
              <div className="space-y-2">
                {chargebacksAndRefunds.paymentMethodPatterns.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-300 font-medium">{m.method}</span>
                    <span className="font-bold text-slate-200">{m.rate}</span>
                  </div>
                ))}
                <div className="p-2.5 rounded bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                  <strong>Pattern Detection:</strong> {chargebacksAndRefunds.suspiciousCluster}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. CUSTOMER CHURN */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">4. Customer Churn (Pre-Attrition Detection)</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    SEVERITY: {customerChurn.severity}
                  </span>
                </div>
                <p className="text-xs text-rose-300 font-medium mt-0.5">
                  "The point is to identify customers BEFORE they leave."
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-xs text-slate-500 font-medium">Estimated Recoverable Value</span>
              <p className="text-2xl font-black text-rose-400">{customerChurn.recoverableDisplay}</p>
              <span className="text-[11px] text-slate-400">{customerChurn.atRiskCount} at-risk customers</span>
            </div>
          </div>

          {/* Customer Risk Segments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {customerChurn.tiers.map((tier, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${tier.color} bg-slate-900/90 space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{tier.tier}</span>
                  <span className="text-xs font-black">{tier.count} users</span>
                </div>
                <div className="text-xs opacity-90 space-y-1">
                  <p>Inactivity: <strong>{tier.daysInactive}</strong></p>
                  <p>Potential Value at Risk: <strong>{tier.potentialLoss}</strong></p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-300">
              <strong>Recommendation:</strong> Dispatch targeted VIP retention incentives before customers cross the permanent 90-day churn threshold.
            </span>
            <button
              onClick={onNavigateRecommendations}
              className="text-xs font-bold text-sky-400 hover:text-white underline cursor-pointer ml-4 whitespace-nowrap"
            >
              View Churn Retention Offer →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RevenueLeakage;
