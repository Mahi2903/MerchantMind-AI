import React from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  DollarSign,
  CheckCircle2,
  PieChart,
  HelpCircle
} from 'lucide-react';

const ImpactView = ({ metrics, recommendations, onNavigateRecommendations }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Step 5: MEASURE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Projected Business Impact & Recovery
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Modeled financial outcome across the 4 bounded AI recommendations for a ₹50 Lakhs/month Razorpay merchant.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Notice</span>
          <span className="text-xs text-slate-300 font-medium">Projected / Estimated Impact</span>
        </div>
      </div>

      {/* Main Before vs After Revenue Visual */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Current Revenue */}
          <div className="w-full md:w-5/12 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Current Baseline Revenue
            </span>
            <p className="text-4xl font-black text-white">₹50.0 Lakhs</p>
            <p className="text-xs text-slate-400">Monthly gross merchandise value (GMV)</p>
          </div>

          {/* Transformation Arrow */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-emerald-400">+₹8.5 Lakhs</span>
            <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">+17% Lift</span>
          </div>

          {/* Projected Revenue */}
          <div className="w-full md:w-5/12 bg-gradient-to-br from-emerald-950/30 to-slate-950 p-6 rounded-2xl border border-emerald-500/30 space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Projected Monthly Revenue
            </span>
            <p className="text-4xl font-black text-emerald-400">₹58.5 Lakhs</p>
            <p className="text-xs text-emerald-200/80">With all 4 bounded actions active</p>
          </div>
        </div>

        {/* Detailed Recovery Breakdown (Exact pitch numbers) */}
        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recovery Breakdown by Strategy
            </h3>
            <span className="text-xs text-slate-400">Total: <strong>+₹8.5 Lakhs</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Cart Recovery */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400">Cart Abandonment</span>
                <span className="text-xs font-black text-white">+₹4.5L</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recovers 10–15% of 150 dropped carts via time-bounded recovery triggers.
              </p>
              <div className="pt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-800/60">
                <span>Recovered Carts:</span>
                <strong className="text-slate-200">~25 - 30 checkouts</strong>
              </div>
            </div>

            {/* 2. Churn Prevention */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">Churn Prevention</span>
                <span className="text-xs font-black text-white">+₹2.5L</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Saves high-value customers showing attrition signs before they permanently leave.
              </p>
              <div className="pt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-800/60">
                <span>Retained Buyers:</span>
                <strong className="text-slate-200">~60 - 70 customers</strong>
              </div>
            </div>

            {/* 3. Dynamic Pricing */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400">Dynamic Pricing</span>
                <span className="text-xs font-black text-white">+₹1.5L</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Data-backed bounded price optimization (+3% to +5%) on 45 inelastic SKUs during peak demand.
              </p>
              <div className="pt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-800/60">
                <span>Affected SKUs:</span>
                <strong className="text-slate-200">45 Catalog Products</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Measured KPIs */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Projected Operations Recovery Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Net Revenue Recovered</span>
            <p className="text-2xl font-black text-emerald-400">₹8,50,000</p>
            <span className="text-[11px] text-emerald-500/80 font-medium">Monthly recurring projection</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Customers Retained</span>
            <p className="text-2xl font-black text-sky-400">160+</p>
            <span className="text-[11px] text-slate-400">Across cart & churn cohorts</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Payment Failures Salvaged</span>
            <p className="text-2xl font-black text-amber-400">50+ Orders</p>
            <span className="text-[11px] text-slate-400">Recovered through smart retry</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Projected ROI</span>
            <p className="text-2xl font-black text-purple-400">Infinite</p>
            <span className="text-[11px] text-slate-400">Autonomous 24/7 revenue agent</span>
          </div>
        </div>
      </div>

      {/* Pitch Script ROI Callout */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white">Ready to activate these bounded growth actions?</h4>
          <p className="text-xs text-slate-400">
            Every recommendation is bounded, audited, and strictly controlled by the merchant.
          </p>
        </div>
        <button
          onClick={onNavigateRecommendations}
          className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
        >
          Review & Authorize Actions →
        </button>
      </div>
    </div>
  );
};

export default ImpactView;
