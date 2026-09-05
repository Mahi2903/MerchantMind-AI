import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  FileCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const BoundedExecutionModal = ({ 
  isOpen, 
  onClose, 
  recommendation, 
  onConfirmApproval 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !recommendation) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onConfirmApproval(recommendation);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Bounded Execution Gate</h3>
              <p className="text-[11px] text-slate-400">Human-in-the-Loop Merchant Verification</p>
            </div>
          </div>

          {!isProcessing && !isSuccess && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Confirmation Content */}
        {!isSuccess ? (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Action To Authorize:</span>
              <p className="text-sm font-extrabold text-white">{recommendation.title}</p>
              <p className="text-slate-300">"{recommendation.recommendation}"</p>
            </div>

            {/* Bounded Safety Notice */}
            <div className="p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-300 space-y-2">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-xs text-white">Approve this bounded action?</span>
              </div>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">
                MerchantMind enforces strict boundaries. The AI agent will execute exclusively within the pre-configured parameters:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-amber-200/80">
                <li>Maximum discount strictly capped at 5%</li>
                <li>Single dispatch per customer; zero spam frequency</li>
                <li>Safe prototype simulation (no real customer emails dispatched)</li>
                <li>Action logged immediately to the immutable audit trail</li>
              </ul>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
              <span>Expected Impact: <strong className="text-emerald-400">{recommendation.impactDisplay}</strong></span>
              <span>Target Cohort: <strong className="text-slate-200">{recommendation.affectedLabel}</strong></span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center space-x-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Logging to Audit Trail...</span>
                ) : (
                  <>
                    <span>Confirm & Authorize Action</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Action Approved Successfully</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Bounded action authorized and recorded into the immutable compliance audit trail.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoundedExecutionModal;
