import { motion } from 'framer-motion';
import { Shield, AlertTriangle, AlertOctagon, CheckCircle } from 'lucide-react';

const RiskScoreCard = ({ result }) => {
  const { riskScore, riskLevel, confidence, violations } = result;
  
  const config = {
    low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle, glow: 'risk-glow-low' },
    medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: AlertTriangle, glow: '' },
    high: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: AlertOctagon, glow: 'risk-glow-high' },
    critical: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50', icon: Shield, glow: 'risk-glow-high' }
  };

  const current = config[riskLevel] || config.low;
  const Icon = current.icon;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`glass-card p-8 ${current.glow}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-200">Fraud Risk Assessment</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${current.bg} ${current.color} border ${current.border}`}>
          {riskLevel.toUpperCase()}
        </span>
      </div>

      {/* Animated Circular Score */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
            <motion.circle 
              cx="50" cy="50" r="45" fill="none" 
              stroke={riskLevel === 'low' ? '#10b981' : riskLevel === 'medium' ? '#f59e0b' : riskLevel === 'high' ? '#ef4444' : '#7f1d1d'}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${riskScore * 283} 283`}
              initial={{ strokeDasharray: "0 283" }}
              animate={{ strokeDasharray: `${riskScore * 283} 283` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              className={`text-4xl font-bold ${current.color}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {(riskScore * 100).toFixed(1)}%
            </motion.span>
            <span className="text-slate-400 text-sm">Risk Score</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <p className="text-slate-400 text-sm mb-1">Confidence</p>
          <p className="text-2xl font-bold text-medical-400">{(confidence * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <p className="text-slate-400 text-sm mb-1">Violations</p>
          <p className="text-2xl font-bold text-rose-400">{violations.length}</p>
        </div>
      </div>

      {violations.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-300 mb-2">Detected Issues:</p>
          {violations.map((v, i) => (
            <motion.div 
              key={v.ruleId}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-slate-800/30 rounded-lg p-3"
            >
              <Icon className={`w-4 h-4 ${current.color}`} />
              <div className="flex-1">
                <p className="text-sm text-slate-200">{v.ruleName}</p>
                <p className="text-xs text-slate-500">Weight: {(v.weight * 100).toFixed(0)}%</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${config[v.severity]?.bg || 'bg-slate-500/10'} ${config[v.severity]?.color || 'text-slate-400'}`}>
                {v.severity}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RiskScoreCard;
