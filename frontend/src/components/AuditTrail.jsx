import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const statusConfig = {
  'Approved': { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  'Under Review': { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  'Flagged': { icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  'Blocked': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' }
};

const AuditTrail = ({ claims }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-slate-200 mb-4">Recent Claims</h3>
      <div className="space-y-3">
        {claims.map((claim, i) => {
          const config = statusConfig[claim.status] || statusConfig['Under Review'];
          const Icon = config.icon;
          
          return (
            <motion.div 
              key={claim.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-200 truncate">{claim.patient}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
                    {claim.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{claim.id}</span>
                  <span className="font-mono text-medical-400">${claim.amount.toLocaleString()}</span>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                claim.risk === 'low' ? 'bg-emerald-400' : 
                claim.risk === 'medium' ? 'bg-amber-400' : 'bg-rose-400'
              }`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AuditTrail;
