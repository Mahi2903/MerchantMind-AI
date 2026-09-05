import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ArrowRight, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Layers,
  AlertCircle
} from 'lucide-react';
import { AGENT_STEPS } from '../data/mockData';

const RunAIAnalysisModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setIsFinished(false);
      return;
    }

    // Step progression animation (simulates the multi-step agent reasoning)
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < AGENT_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsFinished(true);
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">MerchantMind Autonomous Agent</h3>
              <p className="text-xs text-slate-400">Multi-Step Revenue Intelligence Pipeline</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step-by-Step Agent Workflow */}
        <div className="space-y-3.5 relative z-10">
          {AGENT_STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex || isFinished;
            const isCurrent = idx === currentStepIndex && !isFinished;
            const isPending = idx > currentStepIndex && !isFinished;

            return (
              <div 
                key={step.step}
                className={`p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                  isCurrent 
                    ? 'bg-sky-950/40 border-sky-500/40 shadow-sm shadow-sky-500/10' 
                    : isDone 
                    ? 'bg-slate-950/60 border-slate-800/80 opacity-90' 
                    : 'bg-slate-950/20 border-slate-800/40 opacity-40'
                }`}
              >
                {/* Step indicator */}
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[9px] text-slate-500 font-mono">
                      {step.step}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400">
                      {step.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-sky-400 animate-pulse">
                        PROCESSING...
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-semibold mt-0.5 ${isCurrent ? 'text-sky-200' : isDone ? 'text-white' : 'text-slate-500'}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Banner */}
        {isFinished && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2 animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm text-white">Analysis Complete</span>
            </div>
            <p className="text-xs text-emerald-200/90">
              <strong>4 revenue opportunities identified</strong> totaling ₹8.5 Lakhs (+17% lift). Validated against bounded safety rules.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end gap-3 relative z-10">
          {!isFinished ? (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>Agent reasoning in progress...</span>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                onComplete();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 cursor-pointer transition-all"
            >
              <span>Review AI Recommendations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunAIAnalysisModal;
