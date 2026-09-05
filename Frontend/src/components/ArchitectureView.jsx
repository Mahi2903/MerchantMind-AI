import React from 'react';
import { 
  Database, 
  Server, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  TrendingUp, 
  ArrowDown, 
  CheckCircle2, 
  Layers,
  Box,
  Lock
} from 'lucide-react';
import { SYSTEM_ARCHITECTURE } from '../data/mockData';

const ArchitectureView = () => {
  const iconMap = {
    database: Database,
    server: Server,
    cpu: Cpu,
    sparkles: Sparkles,
    'shield-check': ShieldCheck,
    'user-check': UserCheck,
    'file-text': FileText,
    'trending-up': TrendingUp
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[11px] font-semibold text-sky-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Deep Dive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            How MerchantMind Works
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Production-grade autonomous agent architecture connecting Razorpay APIs with Claude multi-step reasoning and bounded compliance guardrails.
          </p>
        </div>

        <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
          <Box className="w-4 h-4 text-sky-400" />
          <span>Containerized (Docker + FastAPI + Redis)</span>
        </div>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">End-to-End Execution Flow</span>
          <h2 className="text-xl font-bold text-white mt-1">8-Stage Autonomous Pipeline</h2>
          <p className="text-xs text-slate-400 mt-1">Every recommendation travels through strict validation before reaching the merchant</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {SYSTEM_ARCHITECTURE.map((node, idx) => {
            const IconComponent = iconMap[node.icon] || Cpu;
            const isLast = idx === SYSTEM_ARCHITECTURE.length - 1;

            return (
              <React.Fragment key={node.step}>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 transition-all flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-500">Stage {node.step}</span>
                        <h4 className="text-sm font-bold text-white">{node.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {node.tech}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{node.desc}</p>
                    </div>
                  </div>

                  <span className="text-emerald-400 text-xs font-bold shrink-0 hidden sm:inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Operational</span>
                  </span>
                </div>

                {!isLast && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Specs Table matching pitch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-400" />
            <span>Backend Infrastructure</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">Framework:</span>
              <strong className="text-white">Python 3.12 + FastAPI (Async REST)</strong>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">AI Reasoning Engine:</span>
              <strong className="text-sky-400">Claude 3.5 Sonnet (Deterministic fallback active)</strong>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">Primary Database:</span>
              <strong className="text-white">PostgreSQL (Transactions & Audit Logs)</strong>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">Caching & Rate Limiting:</span>
              <strong className="text-white">Redis 5.0 (60 req/min backoff)</strong>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Governance & Compliance Design</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">Execution Safety:</span>
              <strong className="text-emerald-400">Bounded Action Policy (No hallucinated actions)</strong>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">Merchant Control:</span>
              <strong className="text-white">Mandatory Human-in-the-Loop Review</strong>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">Payment Standards:</span>
              <strong className="text-white">NPCI UPI Retry Guidelines & RBI Data Localization</strong>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">Auditability:</span>
              <strong className="text-white">Cryptographic Timestamped Audit Trail</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
