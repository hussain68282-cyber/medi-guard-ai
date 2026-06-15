# Project Report: MediGuard AI
**Smart Health Insurance Claim Processing & Fraud Detection System**

---

## 1. Executive Summary
**MediGuard AI** is an innovative, component-based web application designed to optimize health insurance claim processing and actively identify potential fraud. Unlike basic forms, it utilizes a multi-layer client-side fraud analysis engine combining rule-based heuristics, domain-specific checks, and statistical anomaly detection. It is styled using modern dark UI aesthetics with medical blue accents, glassmorphic cards, and animated elements.

This codebase has been successfully bootstrapped, structured for Git, and is ready to be uploaded to GitHub.

---

## 2. Project Architecture
The application is structured as a modern frontend-centric application utilizing React 19, Vite, and Tailwind CSS.

### System Diagram
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

---

## 3. Fraud Detection Engine Details
The core of the project is a three-layer analysis engine implemented in `src/utils/fraudEngine.js`:

1. **Rule-Based Layer**: Checks strict business logic criteria:
   - High claims ($50,000+).
   - Duplicate claim histories.
   - Provider-specific risk scores.
   - High frequency of claims.
   - Large geographic distances from home.
2. **Heuristic Layer**: Evaluates demographic-treatment alignment (e.g., flagging young patients undergoing joint replacement surgery).
3. **Anomaly Layer**: Calculates statistical deviation. If a claim amount deviates from the average historical pricing for that treatment type by more than 200%, a price anomaly flag is triggered.

---

## 4. Codebase Structure
The project is organized following industry best practices:
```
medi-guard-ai/
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx   # Layout & dashboard container
│   │   │   ├── ClaimWizard.jsx # Multi-step form wizard
│   │   │   ├── RiskScoreCard.x # Circular risk visualization
│   │   │   └── AuditTrail.jsx  # Activity log timeline
│   │   ├── utils/
│   │   │   └── fraudEngine.js  # Detection engine logic
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── package.json                # Root package.json orchestrating script runner
├── report.md                   # This report file
└── README.md
```

---

## 5. UI/UX Elements
- **Circular Risk Indicator**: An animated SVGGauge that dynamically fills depending on the calculated risk percentage.
- **Form Stepper**: A clean wizard separating patient details, treatments, provider details, and financial parameters.
- **Glassmorphism Design**: Backdropped blur and transparent borders create a premium, state-of-the-art visual style.
- **Responsive Layout**: Designed to render perfectly on desktop, tablet, and mobile screens.

---

## 6. How to Deploy to GitHub Pages
The project is configured for easy deployment:
1. Initialize/push to your friend's GitHub repository:
   ```bash
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
2. Build the production application:
   ```bash
   npm run build
   ```
3. Deploy the compiled assets located in the `dist` directory to GitHub Pages or host on platform services like Vercel.
