import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

const LruVisualizer = () => {
  const FRAME_SIZE = 4;
  const [frames, setFrames] = useState([null, null, null, null]);
  const [accessHistory, setAccessHistory] = useState([]);
  const [lruQueue, setLruQueue] = useState([]); // Tracks age: front = least recently used, back = most recently used
  const [stats, setStats] = useState({ requests: 0, hits: 0, faults: 0 });
  const [inputValue, setInputValue] = useState('');
  const [statusMessage, setStatusMessage] = useState('Cache initialized. Enter or select page numbers to access.');
  const [lastAction, setLastAction] = useState({ type: null, page: null }); // tracks hit vs fault

  const accessPage = (pageStr) => {
    const page = pageStr.trim();
    if (!page) return;

    let updatedFrames = [...frames];
    let updatedLruQueue = [...lruQueue];
    let updatedStats = { ...stats };
    let actionType = null;
    let details = '';

    updatedStats.requests += 1;

    // Check for Cache Hit
    const hitIdx = updatedFrames.indexOf(page);
    if (hitIdx !== -1) {
      actionType = 'hit';
      updatedStats.hits += 1;
      
      // Update LRU tracking: remove from middle and push to back (most recently used)
      updatedLruQueue = updatedLruQueue.filter(item => item !== page);
      updatedLruQueue.push(page);
      
      details = `Page "${page}" is already in cache! CACHE HIT. Moved "${page}" to Most Recently Used.`;
    } else {
      // Cache Miss (Page Fault)
      actionType = 'fault';
      updatedStats.faults += 1;

      // Find first empty frame slot
      const emptySlotIdx = updatedFrames.indexOf(null);
      if (emptySlotIdx !== -1) {
        updatedFrames[emptySlotIdx] = page;
        updatedLruQueue.push(page);
        details = `Page "${page}" not in cache. CACHE MISS. Loaded into empty slot ${emptySlotIdx}.`;
      } else {
        // Cache is full - Evict Least Recently Used page (first item in updatedLruQueue)
        const evictPage = updatedLruQueue.shift();
        const evictIdx = updatedFrames.indexOf(evictPage);
        
        updatedFrames[evictIdx] = page;
        updatedLruQueue.push(page);
        details = `Cache Full! Evicted Least Recently Used page "${evictPage}" from frame slot ${evictIdx} and replaced with "${page}".`;
      }
    }

    setFrames(updatedFrames);
    setLruQueue(updatedLruQueue);
    setAccessHistory(prev => [...prev, { page, type: actionType }]);
    setStats(updatedStats);
    setLastAction({ type: actionType, page });
    setStatusMessage(details);
    setInputValue('');
  };

  const handleReset = () => {
    setFrames([null, null, null, null]);
    setAccessHistory([]);
    setLruQueue([]);
    setStats({ requests: 0, hits: 0, faults: 0 });
    setLastAction({ type: null, page: null });
    setStatusMessage('Cache visualizer reset.');
  };

  const presetSequence = ['7', '0', '1', '2', '0', '3', '0', '4', '2', '3'];

  const runPresetSequence = () => {
    handleReset();
    let currentFrames = [null, null, null, null];
    let currentLruQueue = [];
    let currentStats = { requests: 0, hits: 0, faults: 0 };
    let history = [];
    
    presetSequence.forEach((page, step) => {
      currentStats.requests += 1;
      const hitIdx = currentFrames.indexOf(page);
      let actionType = 'fault';

      if (hitIdx !== -1) {
        actionType = 'hit';
        currentStats.hits += 1;
        currentLruQueue = currentLruQueue.filter(item => item !== page);
        currentLruQueue.push(page);
      } else {
        currentStats.faults += 1;
        const emptySlotIdx = currentFrames.indexOf(null);
        if (emptySlotIdx !== -1) {
          currentFrames[emptySlotIdx] = page;
          currentLruQueue.push(page);
        } else {
          const evictPage = currentLruQueue.shift();
          const evictIdx = currentFrames.indexOf(evictPage);
          currentFrames[evictIdx] = page;
          currentLruQueue.push(page);
        }
      }
      history.push({ page, type: actionType });
    });

    setFrames(currentFrames);
    setLruQueue(currentLruQueue);
    setAccessHistory(history);
    setStats(currentStats);
    setStatusMessage(`Completed preset sequence: ${presetSequence.join(', ')}.`);
  };

  const hitRatio = stats.requests > 0 ? (stats.hits / stats.requests) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100">LRU Cache Replacement Visualizer</h3>
          <p className="text-slate-400 text-sm">Visualize Least Recently Used (LRU) cache page replacement mechanics.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={runPresetSequence} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-sm text-slate-300"
          >
            <Play className="w-4 h-4" /> Run Preset Seq
          </button>
          <button 
            onClick={handleReset} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-sm text-slate-300"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 md:col-span-2 space-y-4">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Page Access Inputs</h4>
          <div className="flex gap-3">
            <input 
              type="text" 
              value={inputValue} 
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter Page Number (e.g. 5)"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-medical-500" 
              onKeyDown={e => e.key === 'Enter' && accessPage(inputValue)}
            />
            <button 
              onClick={() => accessPage(inputValue)} 
              className="px-6 py-2 bg-medical-600 hover:bg-medical-500 transition-colors text-white font-semibold rounded-xl"
            >
              Access
            </button>
          </div>
          
          {/* Quick preset buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Quick Access:</span>
            {['1', '2', '3', '4', '5', '7', '0'].map(num => (
              <button 
                key={num} 
                onClick={() => accessPage(num)} 
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-xs font-bold text-slate-300 border border-slate-700/60"
              >
                {num}
              </button>
            ))}
          </div>

          <div className={`p-3 rounded-xl border text-xs md:text-sm ${
            lastAction.type === 'hit' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : lastAction.type === 'fault'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              : 'bg-slate-800/40 border-slate-700/50 text-slate-300'
          }`}>
            {statusMessage}
          </div>
        </div>

        {/* Stats Panel */}
        <div className="glass-card p-6 space-y-3">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Metrics</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-3">
              <span className="block text-xs text-slate-500">Hits</span>
              <span className="text-xl font-bold text-emerald-400">{stats.hits}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-3">
              <span className="block text-xs text-slate-500">Faults / Misses</span>
              <span className="text-xl font-bold text-rose-400">{stats.faults}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-3">
              <span className="block text-xs text-slate-500">Total Requests</span>
              <span className="text-xl font-bold text-slate-200">{stats.requests}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-3">
              <span className="block text-xs text-slate-500">Hit Ratio</span>
              <span className="text-xl font-bold text-medical-400">{(hitRatio * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer Frames */}
      <div className="glass-card p-8 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 align-self-start">Cache Frame Slots</h4>
        <div className="flex gap-6 justify-center w-full">
          {frames.map((frame, index) => {
            const isLatestHit = lastAction.type === 'hit' && lastAction.page === frame;
            const isLatestFault = lastAction.type === 'fault' && lastAction.page === frame;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div 
                  animate={
                    isLatestHit 
                      ? { scale: [1, 1.1, 1], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)' } 
                      : isLatestFault 
                      ? { scale: [1, 1.1, 1], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)' }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                  className={`w-24 h-24 rounded-2xl border flex items-center justify-center font-bold text-2xl transition-colors ${
                    frame === null 
                      ? 'bg-slate-900/40 border-slate-800 border-dashed text-slate-700' 
                      : 'bg-slate-800 border-slate-700 text-slate-100'
                  }`}
                >
                  {frame !== null ? frame : '-'}
                </motion.div>
                <span className="text-xs text-slate-500 font-mono mt-3">Slot {index}</span>
              </div>
            );
          })}
        </div>

        {/* LRU Queue Stack */}
        {lruQueue.length > 0 && (
          <div className="w-full mt-10 border-t border-slate-800/60 pt-6">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-4">
              <span>LEAST RECENTLY USED (EVICTION TARGET)</span>
              <span>MOST RECENTLY USED</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-950/40 border border-slate-850 p-4 rounded-xl justify-start overflow-x-auto min-h-[70px]">
              <AnimatePresence mode="popLayout">
                {lruQueue.map((page, idx) => (
                  <motion.div 
                    key={page}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
                      idx === 0 
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                        : idx === lruQueue.length - 1 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    Page {page}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Access History Logs */}
      {accessHistory.length > 0 && (
        <div className="glass-card p-6">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Request Stream History</h4>
          <div className="flex items-center gap-2 flex-wrap font-mono text-xs max-h-[120px] overflow-y-auto bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {accessHistory.map((step, idx) => (
              <div 
                key={idx} 
                className={`px-2.5 py-1 rounded border flex items-center gap-1.5 ${
                  step.type === 'hit' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}
              >
                <span>Access {step.page}</span>
                <span className="text-[10px] font-bold px-1 rounded bg-black/40">
                  {step.type.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LruVisualizer;
