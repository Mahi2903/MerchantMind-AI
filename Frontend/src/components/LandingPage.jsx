import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Activity,
  Lock,
  ChevronRight
} from 'lucide-react';

const LandingPage = ({ onEnterDashboard }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                MerchantMind AI
              </span>
              <span className="ml-2 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Razorpay Buildathon
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-flex items-center text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
              Autonomous Agent Engine v1.0
            </span>
            <button
              onClick={onEnterDashboard}
              className="inline-flex items-center space-x-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <span>Demo Console</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24 flex-1 flex flex-col justify-center relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 mb-8 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="font-semibold text-white">Autonomous Revenue Growth Agent</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Razorpay Ecosystem</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Helping Razorpay merchants{' '}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              discover and recover
            </span>{' '}
            lost revenue with AI.
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-400 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
            Razorpay merchants lose 20–30% of potential revenue monthly to checkout dropoffs, silent payment failures, and churn. 
            MerchantMind autonomously ingests telemetry, isolates root causes, and proposes safe, bounded recovery actions.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onEnterDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-base shadow-xl shadow-sky-500/25 transition-all duration-200 flex items-center justify-center space-x-3 group cursor-pointer"
            >
              <span>Enter Merchant Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Clickable Prototype • No Login Required</span>
            </div>
          </div>
        </div>

        {/* 5-Step Exact Pitch Flow */}
        <div className="mt-6 pt-10 border-t border-slate-800/80">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              The 5-Stage Autonomous Agent Loop
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            {[
              {
                step: "01",
                name: "INGEST",
                desc: "Reads live payments, refunds, and cart events from Razorpay API",
                accent: "border-sky-500/30 text-sky-400 bg-sky-500/5"
              },
              {
                step: "02",
                name: "ANALYZE",
                desc: "Claude-powered reasoning isolates dropoff and failure patterns",
                accent: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5"
              },
              {
                step: "03",
                name: "RECOMMEND",
                desc: "Generates data-backed actions with confidence & INR impact",
                accent: "border-purple-500/30 text-purple-400 bg-purple-500/5"
              },
              {
                step: "04",
                name: "EXECUTE",
                desc: "Merchant reviews & approves bounded actions with 1 click",
                accent: "border-amber-500/30 text-amber-400 bg-amber-500/5"
              },
              {
                step: "05",
                name: "MEASURE",
                desc: "Tracks recovered GMV (+₹8.5L projected) and net conversion lift",
                accent: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
              }
            ].map((s, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border ${s.accent} bg-slate-900/60 backdrop-blur-sm relative flex flex-col justify-between hover:bg-slate-900 transition-colors`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold opacity-60">PHASE {s.step}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                  </div>
                  <h3 className="font-bold text-sm tracking-wider text-white mb-1.5">{s.name}</h3>
                  <p className="text-xs text-slate-400 leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Scenario Snapshot */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Demo Scenario Baseline</span>
            <h4 className="text-xl font-bold text-white">Monthly Store Revenue: ₹50 Lakhs</h4>
            <p className="text-sm text-slate-400">Modeled for a representative online direct-to-consumer merchant on Razorpay.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
            <div className="border-l border-slate-800 pl-4 text-left">
              <span className="text-xs text-slate-500 font-medium">Potential Recovery</span>
              <p className="text-2xl font-black text-emerald-400">₹8.5L</p>
              <span className="text-[11px] text-emerald-500/80 font-medium">+17% Revenue Lift</span>
            </div>
            <div className="border-l border-slate-800 pl-4 text-left">
              <span className="text-xs text-slate-500 font-medium">Cart Recovery</span>
              <p className="text-2xl font-black text-sky-400">₹4.5L</p>
              <span className="text-[11px] text-slate-400">150 abandoned carts</span>
            </div>
            <div className="border-l border-slate-800 pl-4 text-left col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-500 font-medium">Churn & Pricing</span>
              <p className="text-2xl font-black text-indigo-400">₹4.0L</p>
              <span className="text-[11px] text-slate-400">320 accounts & 45 SKUs</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 MerchantMind AI • Built for Razorpay AI Buildathon (Track 01: AI Growth & Agentic Commerce)</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Bounded Execution</span>
            <span className="inline-flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-sky-400" /> NPCI/RBI Safe</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
