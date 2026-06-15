import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Layers, LayoutGrid } from 'lucide-react';
import BankersSimulator from './BankersSimulator';
import QueueSimulator from './QueueSimulator';
import LruVisualizer from './LruVisualizer';

const AlgorithmSandbox = () => {
  const [activeSubTab, setActiveSubTab] = useState('bankers');

  const subTabs = [
    { id: 'bankers', label: "Banker's Algorithm", icon: LayoutGrid },
    { id: 'queue', label: 'FIFO Queue', icon: Layers },
    { id: 'lru', label: 'LRU Page Eviction', icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl w-fit">
        {subTabs.map(tab => {
          const Icon = tab.icon;
          const isSelected = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
                isSelected ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isSelected && (
                <motion.div 
                  layoutId="activeSubIndicator"
                  className="absolute inset-0 bg-slate-800 border border-slate-700/50 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" /> {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Simulator Wrapper card */}
      <div className="glass-card p-6 md:p-8 medical-glow min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activeSubTab === 'bankers' && <BankersSimulator />}
            {activeSubTab === 'queue' && <QueueSimulator />}
            {activeSubTab === 'lru' && <LruVisualizer />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AlgorithmSandbox;
