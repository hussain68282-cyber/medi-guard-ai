import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, Stethoscope, FileText, DollarSign } from 'lucide-react';
import { fraudEngine } from '../utils/fraudEngine';

const steps = [
  { id: 1, title: 'Patient Info', icon: User },
  { id: 2, title: 'Treatment Details', icon: Stethoscope },
  { id: 3, title: 'Provider Info', icon: FileText },
  { id: 4, title: 'Financials', icon: DollarSign }
];

const ClaimWizard = ({ onAnalyze }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientId: '',
    treatmentType: '',
    diagnosisCode: '',
    providerName: '',
    providerId: '',
    providerRiskScore: 0.1,
    amount: '',
    hasDuplicateHistory: false,
    treatmentFrequency: 1,
    distanceFromHome: 0
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const claim = {
      ...formData,
      patientAge: parseInt(formData.patientAge) || 0,
      amount: parseFloat(formData.amount) || 0,
      providerRiskScore: parseFloat(formData.providerRiskScore) || 0.1,
      treatmentFrequency: parseInt(formData.treatmentFrequency) || 1,
      distanceFromHome: parseFloat(formData.distanceFromHome) || 0
    };
    const result = fraudEngine.analyze(claim);
    onAnalyze(result);
  };

  const StepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Patient Name</label>
              <input 
                type="text" 
                value={formData.patientName} 
                onChange={e => updateField('patientName', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500 transition-colors" 
                placeholder="Enter patient name" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Age</label>
                <input 
                  type="number" 
                  value={formData.patientAge} 
                  onChange={e => updateField('patientAge', e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500" 
                  placeholder="25" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Patient ID</label>
                <input 
                  type="text" 
                  value={formData.patientId} 
                  onChange={e => updateField('patientId', e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500" 
                  placeholder="PT-001" 
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Treatment Type</label>
              <select 
                value={formData.treatmentType} 
                onChange={e => updateField('treatmentType', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500"
              >
                <option value="">Select treatment...</option>
                <option value="general_checkup">General Checkup</option>
                <option value="surgery">Surgery</option>
                <option value="emergency">Emergency Care</option>
                <option value="dental">Dental</option>
                <option value="vision">Vision</option>
                <option value="joint_replacement">Joint Replacement</option>
                <option value="cardiac">Cardiac Procedure</option>
                <option value="maternity">Maternity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Diagnosis Code (ICD-10)</label>
              <input 
                type="text" 
                value={formData.diagnosisCode} 
                onChange={e => updateField('diagnosisCode', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500" 
                placeholder="e.g., Z00.00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Treatment Frequency (past 6 months)</label>
              <input 
                type="number" 
                value={formData.treatmentFrequency} 
                onChange={e => updateField('treatmentFrequency', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500" 
                placeholder="1" 
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Provider Name</label>
              <input 
                type="text" 
                value={formData.providerName} 
                onChange={e => updateField('providerName', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500" 
                placeholder="City General Hospital" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Provider Risk Score (0-1)</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={formData.providerRiskScore} 
                onChange={e => updateField('providerRiskScore', e.target.value)}
                className="w-full accent-medical-500" 
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Trusted</span>
                <span className="text-medical-400 font-bold">{(formData.providerRiskScore * 100).toFixed(0)}%</span>
                <span>High Risk</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/30 rounded-xl p-4">
              <input 
                type="checkbox" 
                id="duplicate" 
                checked={formData.hasDuplicateHistory} 
                onChange={e => updateField('hasDuplicateHistory', e.target.checked)}
                className="w-5 h-5 accent-medical-500 rounded" 
              />
              <label htmlFor="duplicate" className="text-sm text-slate-300">Patient has duplicate claim history</label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Claim Amount ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="number" 
                  value={formData.amount} 
                  onChange={e => updateField('amount', e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500" 
                  placeholder="5000" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Distance from Home (miles)</label>
              <input 
                type="number" 
                value={formData.distanceFromHome} 
                onChange={e => updateField('distanceFromHome', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-medical-500" 
                placeholder="0" 
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6 medical-glow">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          
          return (
            <div key={step.id} className="flex items-center">
              <motion.div 
                className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                animate={{ scale: isActive ? 1.1 : 1 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? 'bg-medical-500 text-white' : 
                  isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-2 font-medium ${isActive ? 'text-medical-400' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </motion.div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-16 mx-2 ${isCompleted ? 'bg-emerald-500/50' : 'bg-slate-800'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StepContent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
        <button 
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        
        {currentStep < 4 ? (
          <button 
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-medical-600 text-white hover:bg-medical-500 transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-2 rounded-xl bg-gradient-to-r from-medical-600 to-emerald-500 text-white hover:opacity-90 transition-opacity font-semibold"
          >
            Analyze Claim
          </button>
        )}
      </div>
    </div>
  );
};

export default ClaimWizard;
