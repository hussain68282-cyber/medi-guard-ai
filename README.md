# 🏥 MediGuard AI

**Smart Health Insurance Claim Processing & Fraud Detection System**

A modern, responsive web application for detecting fraudulent health insurance claims using a multi-layer detection engine with rule-based analysis, heuristic scoring, and statistical anomaly detection.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss)

## ✨ Unique Features

- **Multi-Layer Fraud Detection**: Combines rule-based checks, heuristic analysis, and statistical anomaly scoring.
- **Interactive Claim Wizard**: Step-by-step claim submission with real-time validation.
- **Animated Risk Visualization**: Circular progress risk gauge built with Framer Motion.
- **Real-Time Analytics**: Interactive dashboard trends and savings graphs using Recharts.
- **Audit Trail Timeline**: History of submitted claims with live status and severity flags.
- **Medical-Themed Dark UI**: Premium glassmorphism cards with a sleek dark palette.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Run

1. Clone or download the repository:
   ```bash
   git clone https://github.com/yourusername/medi-guard-ai.git
   cd medi-guard-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   React 19 UI   │────▶│  Fraud Engine    │────▶│  Risk Analysis  │
│  (Vite + TW3)   │     │  (Client-side)   │     │   & Results     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Recharts Viz   │     │  Framer Motion   │     │   Audit Trail   │
│   (Analytics)   │     │  (Animations)    │     │   Timeline Log  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## 🧠 Fraud Detection Engine

The system analyzes claims using a three-layer model:
1. **Rule-Based Layer**: Checks predefined conditions (excessive amounts, suspicious provider, geographic anomalies, etc.).
2. **Heuristic Layer**: Performs domain-specific logic checks, such as matching patient age against treatment types.
3. **Anomaly Layer**: Determines statistical price deviations from standard pricing averages for each treatment type.

## 📁 Project Structure

```
medi-guard-ai/
├── frontend/                   # React 19 Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx   # Layout & dashboard container
│   │   │   ├── ClaimWizard.jsx # Multi-step form wizard
│   │   │   ├── RiskScoreCard.x # Circular risk visualization
│   │   │   └── AuditTrail.jsx  # Activity log timeline
│   │   ├── utils/
│   │   │   └── fraudEngine.js  # Detection logic and mock generator
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── package.json                # Root package.json orchestrating script runner
└── README.md
```

## 📝 License

This project is created for educational/CCP purposes and is licensed under the MIT License.
