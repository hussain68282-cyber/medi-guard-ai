import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertOctagon, RefreshCw, Play } from 'lucide-react';

const BankersSimulator = () => {
  // Setup default matrix values (Standard textbook problem)
  const defaultProcesses = [
    { name: 'P0', allocation: [0, 1, 0], max: [7, 5, 3] },
    { name: 'P1', allocation: [2, 0, 0], max: [3, 2, 2] },
    { name: 'P2', allocation: [3, 0, 2], max: [9, 0, 2] },
    { name: 'P3', allocation: [2, 1, 1], max: [2, 2, 2] },
    { name: 'P4', allocation: [0, 0, 2], max: [4, 3, 3] }
  ];
  
  const [processes, setProcesses] = useState(defaultProcesses);
  const [available, setAvailable] = useState([3, 3, 2]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [stepsLog, setStepsLog] = useState([]);

  // Calculate Need Matrix: Need = Max - Allocation
  const getNeed = (process) => {
    return process.max.map((val, idx) => Math.max(0, val - process.allocation[idx]));
  };

  const handleValueChange = (pIdx, type, rIdx, val) => {
    const parsedVal = Math.max(0, parseInt(val) || 0);
    const updated = [...processes];
    updated[pIdx][type][rIdx] = parsedVal;
    setProcesses(updated);
    setSimulationResult(null);
    setStepsLog([]);
  };

  const handleAvailableChange = (rIdx, val) => {
    const parsedVal = Math.max(0, parseInt(val) || 0);
    const updated = [...available];
    updated[rIdx] = parsedVal;
    setAvailable(updated);
    setSimulationResult(null);
    setStepsLog([]);
  };

  const resetSimulator = () => {
    setProcesses(JSON.parse(JSON.stringify(defaultProcesses)));
    setAvailable([3, 3, 2]);
    setSimulationResult(null);
    setStepsLog([]);
  };

  const runSafetyAlgorithm = () => {
    const numP = processes.length;
    const numR = available.length;
    
    let work = [...available];
    let finish = Array(numP).fill(false);
    let safeSeq = [];
    let logs = [];
    
    logs.push(`Starting safety check. Initial Available (Work): [${work.join(', ')}]`);

    let count = 0;
    let foundProcess = true;

    while (count < numP && foundProcess) {
      foundProcess = false;
      for (let i = 0; i < numP; i++) {
        if (!finish[i]) {
          const need = getNeed(processes[i]);
          let canAllocate = true;
          
          // Check if Need <= Work
          for (let j = 0; j < numR; j++) {
            if (need[j] > work[j]) {
              canAllocate = false;
              break;
            }
          }

          if (canAllocate) {
            logs.push(`Checking ${processes[i].name}: Need [${need.join(', ')}] <= Work [${work.join(', ')}]`);
            // Add Allocation to Work
            for (let j = 0; j < numR; j++) {
              work[j] += processes[i].allocation[j];
            }
            finish[i] = true;
            safeSeq.push(processes[i].name);
            logs.push(`✅ ${processes[i].name} finished. Released allocations. New Work: [${work.join(', ')}]`);
            
            foundProcess = true;
            count++;
          }
        }
      }
    }

    const isSafe = count === numP;
    if (isSafe) {
      logs.push(`🎉 System is in SAFE STATE. Safe Sequence: ${safeSeq.join(' ➔ ')}`);
    } else {
      logs.push(`❌ System is in UNSAFE STATE. Deadlock potential detected.`);
    }

    setStepsLog(logs);
    setSimulationResult({
      isSafe,
      safeSequence: safeSeq
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Banker's Algorithm Simulator</h3>
          <p className="text-slate-400 text-sm">Simulate resource allocation and deadlock avoidance configurations.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={resetSimulator} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-sm text-slate-300"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
          <button 
            onClick={runSafetyAlgorithm} 
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-medical-600 hover:bg-medical-500 transition-colors text-sm font-semibold text-white shadow-lg shadow-medical-500/20"
          >
            <Play className="w-4 h-4" /> Run Safety Check
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table representation */}
        <div className="xl:col-span-2 glass-card p-6">
          <h4 className="text-lg font-semibold text-slate-300 mb-4">Allocation & Max Resource Matrices</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead>
                <tr className="border-b border-slate-800 text-slate-300 font-semibold">
                  <th className="pb-3">Process</th>
                  <th className="pb-3 text-center">Allocation (A, B, C)</th>
                  <th className="pb-3 text-center">Max Claim (A, B, C)</th>
                  <th className="pb-3 text-center">Remaining Need</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {processes.map((p, pIdx) => {
                  const need = getNeed(p);
                  return (
                    <tr key={p.name} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 font-bold text-slate-200">{p.name}</td>
                      <td className="py-4">
                        <div className="flex justify-center gap-2">
                          {p.allocation.map((val, rIdx) => (
                            <input 
                              key={rIdx} 
                              type="number" 
                              value={val} 
                              onChange={e => handleValueChange(pIdx, 'allocation', rIdx, e.target.value)}
                              className="w-12 bg-slate-800/80 border border-slate-700/60 rounded px-1 py-1 text-center text-slate-100 focus:outline-none focus:border-medical-500" 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex justify-center gap-2">
                          {p.max.map((val, rIdx) => (
                            <input 
                              key={rIdx} 
                              type="number" 
                              value={val} 
                              onChange={e => handleValueChange(pIdx, 'max', rIdx, e.target.value)}
                              className="w-12 bg-slate-800/80 border border-slate-700/60 rounded px-1 py-1 text-center text-slate-100 focus:outline-none focus:border-medical-500" 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 text-center font-semibold text-medical-400">
                        [{need.join(', ')}]
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resources Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-slate-300 mb-4">Available Resources</h4>
            <div className="flex justify-around items-center bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              {available.map((val, rIdx) => (
                <div key={rIdx} className="text-center">
                  <span className="block text-xs text-slate-500 font-bold mb-1">Resource {String.fromCharCode(65 + rIdx)}</span>
                  <input 
                    type="number" 
                    value={val} 
                    onChange={e => handleAvailableChange(rIdx, e.target.value)}
                    className="w-16 bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-center text-lg font-bold text-slate-200 focus:outline-none focus:border-medical-500" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Results Status */}
          {simulationResult && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border ${
                simulationResult.isSafe 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {simulationResult.isSafe ? (
                  <ShieldCheck className="w-8 h-8" />
                ) : (
                  <AlertOctagon className="w-8 h-8" />
                )}
                <div>
                  <h4 className="font-bold text-lg">
                    {simulationResult.isSafe ? 'System is SAFE' : 'System is UNSAFE'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {simulationResult.isSafe 
                      ? 'A safe sequence exists where deadlock can be completely avoided.' 
                      : 'No safe sequence exists. Deadlock is possible.'}
                  </p>
                </div>
              </div>
              
              {simulationResult.isSafe && (
                <div className="mt-4 bg-slate-950/40 p-3 rounded-xl border border-emerald-500/10">
                  <span className="block text-xs text-emerald-500/70 font-semibold mb-1 uppercase tracking-wider">Safe Sequence</span>
                  <div className="flex items-center gap-2 flex-wrap font-mono text-sm">
                    {simulationResult.safeSequence.map((p, idx) => (
                      <span key={p} className="flex items-center gap-2">
                        <span className="bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold">{p}</span>
                        {idx < simulationResult.safeSequence.length - 1 && <span className="text-slate-500">➔</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Simulator logs */}
      {stepsLog.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6"
        >
          <h4 className="text-lg font-semibold text-slate-300 mb-4">Allocation & Verification Logs</h4>
          <div className="bg-slate-950/80 rounded-xl p-4 font-mono text-sm text-slate-300 space-y-2 border border-slate-800/80 max-h-[300px] overflow-y-auto">
            {stepsLog.map((log, index) => (
              <div key={index} className="border-l-2 border-slate-800 pl-3 py-0.5 text-xs md:text-sm">
                {log}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BankersSimulator;
