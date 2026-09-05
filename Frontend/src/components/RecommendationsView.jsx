import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  ShieldCheck, 
  ArrowUpRight, 
  AlertCircle,
  Clock,
  Filter,
  Check,
  X
} from 'lucide-react';

const RecommendationsView = ({ 
  recommendations, 
  onOpenDetail, 
  onApproveAction, 
  onRejectAction 
}) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'

  const filteredRecs = recommendations.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const pendingCount = recommendations.filter(r => r.status === 'pending').length;
  const approvedCount = recommendations.filter(r => r.status === 'approved').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[11px] font-semibold text-sky-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Recommendations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            AI Growth Recommendations
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Data-backed growth actions synthesized by Claude API and bounded by strict safety policies. Each action requires explicit merchant approval.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {[
            { id: 'all', label: `All (${recommendations.length})` },
            { id: 'pending', label: `Pending Review (${pendingCount})` },
            { id: 'approved', label: `Approved (${approvedCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-sky-500/15 text-sky-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecs.map((rec) => {
          const isPending = rec.status === 'pending';
          const isApproved = rec.status === 'approved';
          const isRejected = rec.status === 'rejected';

          return (
            <div 
              key={rec.id}
              className={`glass-card p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-5 ${
                isApproved 
                  ? 'border-emerald-500/40 bg-emerald-950/10' 
                  : isRejected 
                  ? 'border-rose-500/30 bg-rose-950/10 opacity-75' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        rec.priority === 'high'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Target: <strong className="text-slate-200">{rec.targetSegment}</strong>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{rec.title}</h3>
                  </div>

                  {/* Impact badge */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Est. Recovery</span>
                    <p className="text-xl font-black text-emerald-400">{rec.impactDisplay}</p>
                    <span className="text-[10px] text-emerald-500/80 font-medium">+{rec.estimatedImpact}% lift</span>
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-rose-400 block mb-0.5">Problem Detected:</span>
                  {rec.problem}
                </div>

                {/* Recommendation */}
                <div className="text-xs text-slate-200 space-y-1">
                  <span className="font-bold text-sky-400 block">AI Recommendation:</span>
                  <p className="leading-relaxed">"{rec.recommendation}"</p>
                </div>

                {/* Evidence & Confidence Metrics Bar */}
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Confidence</span>
                    <p className="font-extrabold text-sm text-sky-400 mt-0.5">{rec.confidence}%</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Affected Volume</span>
                    <p className="font-extrabold text-sm text-purple-400 mt-0.5">{rec.affectedCount}</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Status</span>
                    <p className={`font-extrabold text-xs mt-1 uppercase ${
                      isApproved ? 'text-emerald-400' : isRejected ? 'text-rose-400' : 'text-amber-400'
                    }`}>
                      {rec.status}
                    </p>
                  </div>
                </div>

                {/* Data Evidence Highlight */}
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Evidence:</strong> {rec.dataEvidence.headline}</span>
                </div>
              </div>

              {/* Bounded Execution Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => onOpenDetail(rec)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Details</span>
                </button>

                <div className="flex items-center gap-2">
                  {isPending && (
                    <>
                      <button
                        onClick={() => onRejectAction(rec)}
                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/50 border border-slate-800 hover:border-rose-500/30 text-rose-400 text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1"
                        title="Reject Recommendation"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => onApproveAction(rec)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Approve Action</span>
                      </button>
                    </>
                  )}

                  {isApproved && (
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Action Approved & Bound</span>
                    </div>
                  )}

                  {isRejected && (
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-400 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      <XCircle className="w-4 h-4" />
                      <span>Declined by Merchant</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsView;
