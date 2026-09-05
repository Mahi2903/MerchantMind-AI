import React from 'react';

const MetricCard = ({ 
  label, 
  value, 
  subtext, 
  badge, 
  badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", 
  icon: Icon,
  onClick,
  clickable = false
}) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-card p-5 rounded-xl border border-slate-800 relative overflow-hidden transition-all ${
        clickable ? 'cursor-pointer hover:border-sky-500/40 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-slate-950/50' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">{label}</p>
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-white">{value}</p>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-normal">{subtext}</span>
        {badge && (
          <span className={`px-2 py-0.5 rounded-full font-semibold border ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
