import React, { useState } from 'react';
import { 
  History, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Filter, 
  Search, 
  Download,
  Lock,
  ArrowDownRight
} from 'lucide-react';

const AuditTrailView = ({ auditTrail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredLogs = auditTrail.filter(log => {
    const matchesSearch = log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.actor.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && log.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compliance & Accountability</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Immutable Audit Trail
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Complete chronological ledger of AI telemetry ingestions, pattern detections, validations, and merchant approvals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographically Verified</span>
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events, actors, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'ingest', label: 'Ingest' },
            { id: 'analyze', label: 'Analyze' },
            { id: 'recommend', label: 'Recommend' },
            { id: 'execute', label: 'Execute' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterType === f.id 
                  ? 'bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Event Type</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Details & Recommendation</th>
                <th className="py-3.5 px-4 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono font-bold text-slate-200">{log.timestamp}</span>
                    </div>
                    {log.timeAgo && (
                      <span className="text-[10px] text-slate-500 block mt-0.5">{log.timeAgo}</span>
                    )}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-bold text-white block">{log.event}</span>
                    <span className="text-[10px] font-mono uppercase text-sky-400/80 tracking-wider">
                      {log.type || 'SYSTEM'}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-950 border border-slate-800 text-slate-300">
                      {log.actor}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-slate-300 max-w-md">
                    <p className="leading-relaxed">{log.details}</p>
                  </td>

                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      log.status === 'Approved' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : log.status === 'Rejected'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance & Safety Guarantee Banner */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Audit Guarantee:</strong> Every AI recommendation and merchant decision is cryptographically timestamped for RBI/NPCI auditability.
          </span>
        </div>
        <span className="text-slate-500 font-mono text-[11px]">Audit Engine: SHA256-Merkle</span>
      </div>
    </div>
  );
};

export default AuditTrailView;
