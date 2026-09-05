import React from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  Layers, 
  Check, 
  XCircle,
  HelpCircle,
  FileCheck
} from 'lucide-react';

const RecommendationDetailModal = ({ 
  isOpen, 
  onClose, 
  recommendation, 
  onApprove, 
  onReject 
}) => {
  if (!isOpen || !recommendation) return null;

  const isPending = recommendation.status === 'pending';
  const isApproved = recommendation.status === 'approved';
  const isRejected = recommendation.status === 'rejected';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                recommendation.priority === 'high'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {recommendation.priority.toUpperCase()} PRIORITY
              </span>
              <span className="text-xs text-slate-400">ID: {recommendation.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{recommendation.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Summary Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Estimated Impact</span>
            <p className="text-xl font-black text-emerald-400 mt-0.5">{recommendation.impactDisplay}</p>
            <span className="text-[10px] text-emerald-500/80">+{recommendation.estimatedImpact}% monthly lift</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Confidence Score</span>
            <p className="text-xl font-black text-sky-400 mt-0.5">{recommendation.confidence}%</p>
            <span className="text-[10px] text-slate-400">High statistical fidelity</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Target Segment</span>
            <p className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">{recommendation.targetSegment}</p>
            <span className="text-[10px] text-slate-400">{recommendation.affectedLabel}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Current Status</span>
            <p className={`text-xs font-extrabold mt-1 uppercase ${
              isApproved ? 'text-emerald-400' : isRejected ? 'text-rose-400' : 'text-amber-400'
            }`}>
              {recommendation.status}
            </p>
            <span className="text-[10px] text-slate-400">Merchant Review</span>
          </div>
        </div>

        {/* Section 1: Problem & Pattern Detected */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Problem & Pattern Detected</span>
          </h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <p className="text-slate-200 font-medium">{recommendation.problem}</p>
            <div className="pt-2 border-t border-slate-800/80 text-slate-400">
              <strong className="text-slate-300">Data Evidence:</strong> {recommendation.dataEvidence.headline}.
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                {Object.entries(recommendation.dataEvidence).map(([key, val]) => {
                  if (key === 'headline') return null;
                  return (
                    <div key={key} className="bg-slate-900/60 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                      <span className="text-slate-200 font-medium">{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: AI Recommendation & Proposed Action */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>AI Recommendation & Proposed Action</span>
          </h3>
          <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs text-sky-200 space-y-2">
            <p className="font-semibold text-sm text-white">"{recommendation.recommendation}"</p>
            <p className="text-slate-300"><strong>Expected Outcome:</strong> {recommendation.expectedOutcome}</p>
          </div>
        </div>

        {/* Section 3: "Why MerchantMind Recommends This" (Safe, Concise Business Rationale) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Why MerchantMind Recommends This (Business Rationale)</span>
          </h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
            <p className="italic text-emerald-300/90 mb-2">
              Concise explanation based on observable Razorpay transaction telemetry:
            </p>
            <p className="font-normal text-slate-200">
              {recommendation.whyRecommended}
            </p>
          </div>
        </div>

        {/* Section 4: Bounded Safety Guardrails */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Strict Bounded Constraints & Compliance</span>
          </h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <p className="text-slate-400">
              The autonomous agent operates under pre-configured safety ceilings. No action will exceed these parameters:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              {Object.entries(recommendation.boundedConstraints).map(([k, v]) => (
                <div key={k} className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="font-semibold text-amber-300">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Actions will be appended to the immutable Audit Trail</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isPending && (
              <>
                <button
                  onClick={() => {
                    onReject(recommendation);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/40 text-rose-400 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reject Recommendation
                </button>
                <button
                  onClick={() => {
                    onApprove(recommendation);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/25 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Approve Bounded Action</span>
                </button>
              </>
            )}

            {!isPending && (
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetailModal;
