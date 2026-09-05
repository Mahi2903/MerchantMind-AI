import React from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  AlertTriangle, 
  Sparkles, 
  History, 
  TrendingUp, 
  Cpu, 
  Play, 
  Home,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const Navbar = ({ 
  currentTab, 
  setCurrentTab, 
  onRunAnalysis, 
  onReturnHome,
  pendingRecommendationsCount = 0,
  isBackendConnected = false
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'leakage', label: 'Revenue Leakage', icon: AlertTriangle, badge: '4 Points' },
    { 
      id: 'recommendations', 
      label: 'AI Recommendations', 
      icon: Sparkles,
      badge: pendingRecommendationsCount > 0 ? `${pendingRecommendationsCount} Actionable` : 'All Reviewed'
    },
    { id: 'audit', label: 'Audit Trail', icon: History },
    { id: 'impact', label: 'Impact / Measure', icon: TrendingUp, highlight: true },
    { id: 'architecture', label: 'How It Works', icon: Cpu }
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top brand header */}
        <div className="flex items-center justify-between py-3.5 border-b border-slate-900">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onReturnHome}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">MerchantMind AI</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Razorpay Merchant Intelligence
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Autonomous Revenue Growth Agent</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Demo marker */}
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              DEMO / ESTIMATED DATA
            </span>

            {/* Backend connection status */}
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300">
              <span className={`w-1.5 h-1.5 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-sky-400'}`} />
              {isBackendConnected ? 'FastAPI Connected' : 'Offline Client Mode'}
            </span>

            {/* Run AI Analysis Quick Trigger */}
            <button
              onClick={onRunAnalysis}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run AI Analysis</span>
            </button>

            {/* Return to Landing */}
            <button
              onClick={onReturnHome}
              title="Return to Landing"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-sky-400 border border-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive 
                      ? 'bg-sky-500/20 text-sky-300' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {tab.highlight && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Step 5
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
