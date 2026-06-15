/**
 * MediGuard AI - Fraud Detection Engine
 * Multi-layer approach: Rules + Heuristic + Anomaly Scoring
 */
class FraudDetectionEngine {
  constructor() {
    this.rules = [
      {
        id: 'R001',
        name: 'Excessive Claim Amount',
        check: (claim) => claim.amount > 50000,
        weight: 0.25,
        severity: 'high'
      },
      {
        id: 'R002',
        name: 'Duplicate Claim Pattern',
        check: (claim) => claim.hasDuplicateHistory,
        weight: 0.30,
        severity: 'critical'
      },
      {
        id: 'R003',
        name: 'Suspicious Provider',
        check: (claim) => claim.providerRiskScore > 0.7,
        weight: 0.20,
        severity: 'high'
      },
      {
        id: 'R004',
        name: 'Unusual Treatment Frequency',
        check: (claim) => claim.treatmentFrequency > 5,
        weight: 0.15,
        severity: 'medium'
      },
      {
        id: 'R005',
        name: 'Geographic Anomaly',
        check: (claim) => claim.distanceFromHome > 200,
        weight: 0.10,
        severity: 'low'
      }
    ];
  }

  analyze(claimData) {
    const violations = [];
    let riskScore = 0;
    let maxSeverity = 'low';

    // Rule-based layer
    this.rules.forEach(rule => {
      if (rule.check(claimData)) {
        violations.push({
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          weight: rule.weight
        });
        riskScore += rule.weight;
                
        const severityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
        if (severityOrder[rule.severity] > severityOrder[maxSeverity]) {
          maxSeverity = rule.severity;
        }
      }
    });

    // Heuristic layer: Age vs Treatment mismatch
    if (claimData.patientAge < 30 && claimData.treatmentType === 'joint_replacement') {
      riskScore += 0.15;
      violations.push({
        ruleId: 'H001',
        ruleName: 'Age-Treatment Mismatch',
        severity: 'medium',
        weight: 0.15
      });
    }

    // Anomaly layer: Statistical deviation
    const expectedAmount = this.getExpectedAmount(claimData);
    const deviation = Math.abs(claimData.amount - expectedAmount) / expectedAmount;
    if (deviation > 2) {
      riskScore += 0.20;
      violations.push({
        ruleId: 'A001',
        ruleName: 'Statistical Price Anomaly',
        severity: 'high',
        weight: 0.20
      });
    }

    // Normalize score
    riskScore = Math.min(riskScore, 1.0);

    return {
      claimId: `CLM-${Date.now()}`,
      riskScore: parseFloat(riskScore.toFixed(3)),
      riskLevel: this.getRiskLevel(riskScore),
      confidence: this.calculateConfidence(violations),
      violations,
      processingTime: `${(Math.random() * 0.8 + 0.2).toFixed(2)}s`,
      timestamp: new Date().toISOString(),
      recommendation: this.getRecommendation(riskScore, violations)
    };
  }

  getExpectedAmount(claim) {
    const baseRates = {
      'general_checkup': 150,
      'surgery': 15000,
      'emergency': 5000,
      'dental': 800,
      'vision': 300,
      'joint_replacement': 35000,
      'cardiac': 45000,
      'maternity': 12000
    };
    return baseRates[claim.treatmentType] || 5000;
  }

  getRiskLevel(score) {
    if (score >= 0.7) return 'critical';
    if (score >= 0.5) return 'high';
    if (score >= 0.3) return 'medium';
    return 'low';
  }

  calculateConfidence(violations) {
    if (violations.length === 0) return 0.95;
    const avgWeight = violations.reduce((sum, v) => sum + v.weight, 0) / violations.length;
    return parseFloat((0.6 + (avgWeight * 0.4)).toFixed(3));
  }

  getRecommendation(score, violations) {
    if (score >= 0.7) {
      return {
        action: 'BLOCK',
        message: 'Claim flagged for manual review. Multiple high-risk indicators detected.',
        nextSteps: ['Senior adjuster review required', 'Provider verification needed', 'Document audit triggered']
      };
    }
    if (score >= 0.5) {
      return {
        action: 'REVIEW',
        message: 'Claim requires enhanced review before approval.',
        nextSteps: ['Additional documentation requested', 'Provider history check', 'Patient interview recommended']
      };
    }
    if (score >= 0.3) {
      return {
        action: 'CONDITIONAL',
        message: 'Claim approved with monitoring flag.',
        nextSteps: ['Standard processing with audit trail', '30-day follow-up check']
      };
    }
    return {
      action: 'APPROVE',
      message: 'Claim passed automated screening.',
      nextSteps: ['Standard approval workflow', 'Routine audit sampling']
    };
  }
}

export const fraudEngine = new FraudDetectionEngine();

// Simulate historical data for charts
export const generateHistoricalData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    month,
    totalClaims: Math.floor(Math.random() * 500) + 800,
    fraudDetected: Math.floor(Math.random() * 80) + 20,
    savings: Math.floor(Math.random() * 500000) + 100000,
    accuracy: parseFloat((0.85 + Math.random() * 0.12).toFixed(3))
  }));
};

export const generateRecentClaims = () => [
  { id: 'CLM-240615-001', patient: 'John Doe', amount: 12500, status: 'Approved', risk: 'low', date: '2024-06-15' },
  { id: 'CLM-240615-002', patient: 'Sarah Smith', amount: 45000, status: 'Under Review', risk: 'high', date: '2024-06-15' },
  { id: 'CLM-240614-089', patient: 'Mike Johnson', amount: 3200, status: 'Flagged', risk: 'critical', date: '2024-06-14' },
  { id: 'CLM-240614-088', patient: 'Emily Chen', amount: 8900, status: 'Approved', risk: 'low', date: '2024-06-14' },
  { id: 'CLM-240613-076', patient: 'Robert Brown', amount: 67000, status: 'Blocked', risk: 'critical', date: '2024-06-13' }
];
