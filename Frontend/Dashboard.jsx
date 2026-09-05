import React from 'react';
import { 
  TrendingUp, 
  AlertCircle, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  RefreshCw, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Play, 
  HelpCircle,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import MetricCard from './src/components/MetricCard';

const Dashboard = ({ 
  metrics, 
  recommendations, 
  onNavigateTab, 
  onRunAnalysis,
  onOpenDetail,
  onApproveAction
}) => {
  const pendingRecs = recommendations.filter(r => r.status === 'pending');
  const approvedRecs = recommendations.filter(r => r.status === 'approved');

  return (
    <div className="space-y-8">
      {/* Pitch Header Banner: Answering the 4 Core Pitch Questions */}
      <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-sky-950/30 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[11px] font-semibold text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Razorpay AI Growth Agent</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Merchant Revenue Intelligence Overview
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              MerchantMind continuously monitors transaction telemetry to identify revenue leakage, synthesize bounded growth actions, and track financial recovery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRunAnalysis}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Run AI Analysis</span>
            </button>
            <button
              onClick={() => onNavigateTab('impact')}
              className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>View Impact (Step 5)</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* 4 Core Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
              How much am I losing?
            </span>
            <p className="text-lg font-black text-rose-400">₹8.5 Lakhs / mo</p>
            <p className="text-[11px] text-slate-400">17% of total merchant revenue</p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              Why am I losing it?
            </span>
            <p className="text-sm font-bold text-slate-200">Dropoffs & UPI Latency</p>
            <p className="text-[11px] text-slate-400">70% cart drops, 15% payment fails</p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              What does AI recommend?
            </span>
            <p className="text-sm font-bold text-sky-400">4 Bounded Actions</p>
            <p className="text-[11px] text-slate-400">Cart recovery, retries, retention</p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              What impact can I recover?
            </span>
            <p className="text-lg font-black text-emerald-400">+₹8.5 Lakhs</p>
            <p className="text-[11px] text-emerald-500 font-medium">Projected GMV: ₹58.5 Lakhs</p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Primary Merchant Metrics</span>
            <span className="text-xs font-normal text-slate-400">({metrics.dataPeriod})</span>
          </h2>
          <span className="text-xs text-slate-500">Benchmark Model: Direct-to-Consumer D2C</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Monthly Revenue"
            value={metrics.monthlyRevenueDisplay}
            subtext="Last 30 days completed"
            badge="Baseline"
            badgeColor="text-slate-300 bg-slate-800 border-slate-700"
            icon={TrendingUp}
          />
          <MetricCard
            label="Potential Recovery"
            value={metrics.potentialRecoveryDisplay}
            subtext={`${metrics.revenueOpportunityPercent}% recovery opportunity`}
            badge="+17% Lift"
            badgeColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            icon={Sparkles}
            clickable={true}
            onClick={() => onNavigateTab('impact')}
          />
          <MetricCard
            label="Abandoned Carts"
            value={metrics.abandonedCarts}
            subtext="70% benchmark dropoff"
            badge="Recover ₹4.5L"
            badgeColor="text-sky-400 bg-sky-500/10 border-sky-500/20"
            icon={ShoppingCart}
            clickable={true}
            onClick={() => onNavigateTab('leakage')}
          />
          <MetricCard
            label="At-Risk Customers"
            value={metrics.atRiskCustomers}
            subtext="Lapsing buyer cohort (>45d)"
            badge="Recover ₹2.5L"
            badgeColor="text-rose-400 bg-rose-500/10 border-rose-500/20"
            icon={Users}
            clickable={true}
            onClick={() => onNavigateTab('leakage')}
          />
        </div>

        {/* Secondary metric row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Payment Failure Rate</p>
              <p className="text-xl font-bold text-amber-400 mt-0.5">{metrics.paymentFailureRate}%</p>
              <p className="text-[11px] text-slate-500">UPI latency & bank switch timeouts</p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Refund & Return Rate</p>
              <p className="text-xl font-bold text-slate-200 mt-0.5">{metrics.refundRate}%</p>
              <p className="text-[11px] text-slate-500">Pattern isolated to sizing & COD</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
              <RefreshCw className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Projected Monthly Total</p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">{metrics.projectedRevenueDisplay}</p>
              <p className="text-[11px] text-emerald-500/80">With all 4 actions approved</p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Opportunity Visual Comparison & Leakage Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Revenue Recovery Distribution */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Revenue Leakage vs Recovery Projection</h3>
              <p className="text-xs text-slate-400">Projected recovery across the 4 core pitch strategies</p>
            </div>
            <button
              onClick={() => onNavigateTab('impact')}
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>Detailed Breakdown</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Stack Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Monthly Revenue Gap: ₹8.5 Lakhs (17%)</span>
              <span className="text-emerald-400 font-bold">100% Recoverable Target</span>
            </div>

            <div className="w-full h-5 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800 p-0.5">
              <div 
                style={{ width: '53%' }} 
                title="Cart Abandonment: ₹4.5L (53%)"
                className="bg-sky-500 h-full rounded-l-full flex items-center justify-center text-[9px] font-bold text-white"
              >
                Cart ₹4.5L
              </div>
              <div 
                style={{ width: '29%' }} 
                title="Churn Prevention: ₹2.5L (29%)"
                className="bg-indigo-500 h-full flex items-center justify-center text-[9px] font-bold text-white"
              >
                Churn ₹2.5L
              </div>
              <div 
                style={{ width: '18%' }} 
                title="Dynamic Pricing: ₹1.5L (18%)"
                className="bg-purple-500 h-full rounded-r-full flex items-center justify-center text-[9px] font-bold text-white"
              >
                Pricing ₹1.5L
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
                <span className="text-slate-400">Cart Recovery: <strong>₹4.5L</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
                <span className="text-slate-400">Churn Prevention: <strong>₹2.5L</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
                <span className="text-slate-400">Dynamic Pricing: <strong>₹1.5L</strong></span>
              </div>
            </div>
          </div>

          {/* Revenue Before & After Card */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Current Revenue</span>
              <p className="text-xl font-extrabold text-white">₹50.0 Lakhs</p>
              <span className="text-[11px] text-slate-500">30-day baseline</span>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="flex items-center text-emerald-400 text-xs font-bold gap-1">
                <span>+₹8.5L</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-emerald-500 font-semibold">+17% Lift</span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-emerald-400 uppercase font-semibold">Projected Revenue</span>
              <p className="text-xl font-extrabold text-emerald-400">₹58.5 Lakhs</p>
              <span className="text-[11px] text-slate-400">With bounded actions</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action & Agent Pipeline Status */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white">Agent Execution Status</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active & Bounded
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              MerchantMind acts strictly within pre-validated boundaries. No discounts exceed 5%, no real payments or debits are made without merchant review.
            </p>

            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Actionable Recommendations:</span>
                <span className="font-bold text-sky-400">{pendingRecs.length} pending review</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Approved Bounded Actions:</span>
                <span className="font-bold text-emerald-400">{approvedRecs.length} approved</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Compliance & Audit State:</span>
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Immutable Logged
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => onNavigateTab('recommendations')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Review AI Recommendations</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('audit')}
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Audit Log
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Prioritized AI Recommendations ({recommendations.length})</span>
            </h2>
            <p className="text-xs text-slate-400">Data-backed growth actions synthesized from Razorpay transaction patterns</p>
          </div>

          <button
            onClick={() => onNavigateTab('recommendations')}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Recommendations</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.slice(0, 2).map((rec) => (
            <div 
              key={rec.id} 
              className="glass-card p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                      rec.priority === 'high' 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {rec.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-xs text-slate-500 font-mono">•</span>
                    <span className="text-xs text-slate-400">{rec.affectedLabel}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{rec.title}</h4>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Impact</span>
                  <p className="text-base font-black text-emerald-400">{rec.impactDisplay}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{rec.recommendation}</p>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                  <span>Confidence: <strong className="text-sky-400">{rec.confidence}%</strong></span>
                  <span>Type: <strong className="text-slate-300 uppercase">{rec.actionType}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenDetail(rec)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  {rec.status === 'pending' ? (
                    <button
                      onClick={() => onApproveAction(rec)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Approve Action
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approved
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
