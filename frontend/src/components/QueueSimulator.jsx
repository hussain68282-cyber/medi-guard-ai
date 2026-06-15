import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';

const QueueSimulator = () => {
  const CAPACITY = 6;
  const [queue, setQueue] = useState(['A', 'B', 'C']);
  const [inputValue, setInputValue] = useState('');
  const [statusMessage, setStatusMessage] = useState('Initialized queue with elements A, B, C.');
  const [isError, setIsError] = useState(false);

  const handleEnqueue = () => {
    if (!inputValue.trim()) {
      setIsError(true);
      setStatusMessage('Input value cannot be empty!');
      return;
    }
    if (queue.length >= CAPACITY) {
      setIsError(true);
      setStatusMessage('Queue Overflow! Maximum capacity reached.');
      return;
    }
    
    const newValue = inputValue.trim().toUpperCase();
    setQueue(prev => [...prev, newValue]);
    setInputValue('');
    setIsError(false);
    setStatusMessage(`Enqueued value "${newValue}" to the rear of the queue.`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setIsError(true);
      setStatusMessage('Queue Underflow! Queue is empty.');
      return;
    }

    const removedValue = queue[0];
    setQueue(prev => prev.slice(1));
    setIsError(false);
    setStatusMessage(`Dequeued value "${removedValue}" from the front of the queue.`);
  };

  const handleClear = () => {
    setQueue([]);
    setIsError(false);
    setStatusMessage('Queue cleared.');
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-100">FIFO Queue Simulator</h3>
        <p className="text-slate-400 text-sm">Visualize First-In-First-Out (FIFO) queue operations with animations.</p>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 md:col-span-2 space-y-4">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Queue Controls</h4>
          <div className="flex gap-3">
            <input 
              type="text" 
              value={inputValue} 
              onChange={e => setInputValue(e.target.value)}
              maxLength={10}
              placeholder="e.g., D"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-medical-500" 
              onKeyDown={e => e.key === 'Enter' && handleEnqueue()}
            />
            <button 
              onClick={handleEnqueue} 
              className="flex items-center gap-2 px-5 py-2 bg-medical-600 hover:bg-medical-500 transition-colors text-white font-semibold rounded-xl"
            >
              <Plus className="w-4 h-4" /> Enqueue
            </button>
            <button 
              onClick={handleDequeue} 
              className="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 transition-colors text-white font-semibold rounded-xl"
            >
              <Minus className="w-4 h-4" /> Dequeue
            </button>
            <button 
              onClick={handleClear} 
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300 rounded-xl"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>

          {/* Status Message */}
          <div className={`p-3 rounded-xl border text-xs md:text-sm ${
            isError ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-slate-800/40 border-slate-700/50 text-slate-300'
          }`}>
            {statusMessage}
          </div>
        </div>

        {/* Properties Panel */}
        <div className="glass-card p-6 space-y-3">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Queue State</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-3">
              <span className="block text-xs text-slate-500">Size</span>
              <span className="text-xl font-bold text-slate-200">{queue.length} / {CAPACITY}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-3">
              <span className="block text-xs text-slate-500">Front Element</span>
              <span className="text-xl font-bold text-medical-400">{queue[0] || 'None'}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-3">
              <span className="block text-xs text-slate-500">Rear Element</span>
              <span className="text-xl font-bold text-emerald-400">{queue[queue.length - 1] || 'None'}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-3">
              <span className="block text-xs text-slate-500">Status</span>
              <span className="text-sm font-bold text-slate-200">
                {queue.length === 0 ? 'Empty' : queue.length === CAPACITY ? 'Full' : 'Active'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer Queue Line */}
      <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-6 font-mono">
          <span>FRONT (DEQUEUE HERE) ◄──</span>
          <span>──► REAR (ENQUEUE HERE)</span>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-950/40 border border-slate-800 p-6 rounded-2xl w-full justify-center overflow-x-auto min-h-[120px]">
          <AnimatePresence mode="popLayout">
            {queue.map((item, idx) => (
              <motion.div
                key={`${item}-${idx}`}
                layout
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`relative w-20 h-20 rounded-xl flex items-center justify-center border font-bold text-xl select-none ${
                  idx === 0 
                    ? 'bg-medical-500/10 border-medical-500/40 text-medical-400 shadow-[0_0_15px_rgba(14,165,233,0.15)]' 
                    : idx === queue.length - 1 
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {item}
                <span className="absolute -bottom-6 text-[10px] text-slate-500 font-mono">
                  [{idx}]
                </span>
                
                {/* Visual Label Pointers */}
                {idx === 0 && (
                  <span className="absolute -top-6 bg-medical-500/20 text-medical-400 px-1.5 py-0.5 rounded text-[10px]">
                    FRONT
                  </span>
                )}
                {idx === queue.length - 1 && queue.length > 1 && (
                  <span className="absolute -top-6 bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[10px]">
                    REAR
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {queue.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-slate-500 font-semibold italic text-sm"
            >
              Queue is empty
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueSimulator;
