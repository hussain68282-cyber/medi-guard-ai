# Project Report: MediGuard AI
**Smart Health Insurance Claim Processing, Fraud Detection & OS Algorithm Sandbox**

---

## 1. Executive Summary
**MediGuard AI** is a component-based web application designed to optimize health insurance claim processing and actively identify potential fraud. It also integrates an interactive **OS Algorithm Sandbox** for educational simulation of core Operating System and resource allocation concepts.

The application utilizes a dark medical theme with glassmorphic cards, custom animations, and interactive controls. This repository is successfully configured, fully updated, and pushed to GitHub.

---

## 2. Project Architecture & navigation
The application is structured into two main functional areas accessible via a top-level tab switcher:

1. **Fraud Detection Engine**:
   - Multi-step claim submission wizard.
   - Dynamic Recharts visualizations of trends and savings.
   - Automated multi-layered risk analysis.
2. **OS Algorithm Sandbox**:
   - Visual simulation modules for resource scheduling, safety verification, and memory optimization.

---

## 3. Core Engine Implementations

### A. Health Insurance Fraud Engine
Uses a three-layer client-side analysis:
- **Rule-Based**: Triggers flags for claims over $50,000, duplicate history, high-risk providers, or excessive trip distances.
- **Heuristics**: Evaluates demographic conflicts (e.g., joint replacement claims for patients under 30).
- **Anomaly Detection**: Flags claims with pricing that deviates more than 200% from baseline averages.

### B. OS Algorithm Sandbox Modules

#### I. Banker's Safety Algorithm
- Simulates process allocation, maximum claim vectors, and resource availabilities.
- Dynamically computes the **Need Matrix**: \(\text{Need}[i][j] = \text{Max}[i][j] - \text{Allocation}[i][j]\).
- Checks system safety status and outputs either a **Safe Sequence** (e.g. `P1 ➔ P3 ➔ P4 ➔ P0 ➔ P2`) or flags deadlock conditions.

#### II. FIFO Queue Simulator
- Visually models standard First-In-First-Out data structures.
- Provides interactive Enqueue and Dequeue animations using Framer Motion.
- Prevents buffer issues by enforcing boundary controls (Queue Overflow / Underflow).

#### III. LRU Page Eviction Visualizer
- Simulates page replacement management using the Least Recently Used policy.
- Displays frame slots (hits and faults highlighted) and keeps a real-time relative age stack.
- Calculates and displays real-time performance analytics including **Hit Ratio** \(\frac{\text{Hits}}{\text{Total Requests}}\).

---

## 4. Codebase Structure
The project file tree:
```
medi-guard-ai/
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx   # Layout & view switcher
│   │   │   ├── ClaimWizard.jsx # Multi-step claim form
│   │   │   ├── RiskScoreCard.x # Circular risk visualization
│   │   │   ├── AuditTrail.jsx  # Activity log timeline
│   │   │   ├── AlgorithmSandbox.jsx # OS Sandbox container
│   │   │   ├── BankersSimulator.jsx # Banker's Safe State checking
│   │   │   ├── QueueSimulator.jsx   # FIFO Queue animation
│   │   │   └── LruVisualizer.jsx    # LRU page replacement slots
│   │   ├── utils/
│   │   │   └── fraudEngine.js  # Detection engine algorithms
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── package.json                # Root package manager orchestration scripts
├── report.md                   # This report file
└── README.md
```

---

## 5. Build, Verification, and Run Instructions

### To Run Locally:
1. Install dependencies from the root directory:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### To Build for Production:
```bash
npm run build
```
This builds the fully optimized distribution folder under `frontend/dist` which is pre-configured for deployment to GitHub Pages or static host providers.
