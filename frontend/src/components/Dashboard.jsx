import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingDown, ShieldCheck, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { generateHistoricalData, generateRecentClaims } from '../utils/fraudEngine';
import ClaimWizard from './ClaimWizard';
import RiskScoreCard from './RiskScoreCard';
import AuditTrail from './AuditTrail';

const Dashboard = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [recentClaims, setRecentClaims] = useState([]);

  useEffect(() => {
    setHistoricalData(generateHistoricalData());
    setRecentClaims(generateRecentClaims());
  }, []);

  const stats = [
    { title: 'Total Claims', value: '4,231', change: '+12%', icon: Activity, color: 'text-medical-400' },
    { title: 'Fraud Blocked', value: '156', change: '+8%', icon: ShieldCheck, color: 'text-emerald-400' },
    { title: 'Amount Saved', value: '$2.4M', change: '+23%', icon: TrendingDown, color: 'text-amber-400' },
    { title: 'Avg Risk Score', value: '0.24', change: '-5%', icon: AlertCircle, color: 'text-rose-400' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-500 to-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">MediGuard AI</h1>
            <p className="text-slate-400">Smart Health Insurance Fraud Detection</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${stat.color}`} />
                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Claim Wizard */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-200 mb-4">New Claim Analysis</h2>
            <ClaimWizard onAnalyze={setAnalysisResult} />
          </div>
          
          {analysisResult && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6"
            >
              <h2 className="text-xl font-bold text-slate-200 mb-4">Analysis Result</h2>
              <RiskScoreCard result={analysisResult} />
            </motion.div>
          )}
        </div>

        {/* Right: Analytics */}
        <div className="space-y-6">
          {/* Fraud Trends Chart */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Fraud Detection Trends</h3>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area type="monotone" dataKey="fraudDetected" stroke="#ef4444" fillOpacity={1} fill="url(#colorFraud)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Savings Chart */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Monthly Savings ($)</h3>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Savings']}
                  />
                  <Bar dataKey="savings" radius={[8, 8, 0, 0]}>
                    {historicalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0ea5e9' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Claims */}
          <AuditTrail claims={recentClaims} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
