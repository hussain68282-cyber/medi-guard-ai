# COMPLEX COMPUTING PROBLEM (CCP)
# BS CYBER SECURITY

## Project Title
### MediGuard AI - Smart Health Insurance Claim Processing and Fraud Detection System

**Submitted To:**  
Umna Iftikar  

**Submitted By:**  
HUSSAIN 68282  

**Date of Submission:**  
16 June 2026  

**Course:**  
CYBER SECURITY — CCP  

---

### Abstract
The health insurance sector faces significant operational challenges due to the manual and paper-based nature of traditional claim processing workflows. These challenges include processing delays, administrative overload, lack of transparency, and increasing incidents of fraudulent claims that cause substantial financial losses to insurance providers. This report presents the analysis and design of the Smart Health Insurance Claim Processing and Fraud Detection System — a centralized, web-based application developed as a Complex Computing Problem (CCP) for BS Cyber Security. 

The proposed system automates the entire insurance claim lifecycle, from online claim submission by hospitals to policy validation, fraud risk assessment, officer review, and final approval or rejection. Five Operating System algorithms and security mechanisms — Multilevel Priority Queue, LRU Cache, Banker's Algorithm, Mutex Locks, and a Statistical Fraud Detection Engine — are integrated into the core processing logic to ensure efficient scheduling, deadlock prevention, memory optimization, race-condition prevention, and intelligent fraud identification. 

Role-based dashboards are provided for Hospitals, Policyholders, Insurance Officers, and System Administrators. The system aims to reduce processing time, minimize fraudulent approvals, and deliver a transparent and user-friendly experience for all stakeholders.

---

### Letter of Acknowledgment
**June 16, 2026**

Umna Iftikar  
Course Instructor — Cyber Security  
Department of Computer Science  

Dear Ma'am,

I would like to express my sincere and heartfelt gratitude to you for your unwavering guidance, continuous support, and invaluable feedback throughout the development of this Complex Computing Problem (CCP) project. Your expert advice and constructive criticism helped me understand the real-world application of cyber security principles and motivated me to strive for excellence.

This project — the Smart Health Insurance Claim Processing and Fraud Detection System (MediGuard AI) — would not have been possible without your encouragement and the knowledge you imparted during the course. The insights you shared on system design, requirements engineering, and process modeling greatly influenced the depth and quality of this work.

I am also grateful to our institution for providing us with the necessary resources and a conducive learning environment. I humbly acknowledge that any shortcomings in this report are entirely my own, and I remain open to your continued guidance.

I sincerely hope that this submission meets your expectations and reflects the dedication and effort I have invested in this project.

Respectfully,  
**HUSSAIN 68282**  
BS Cyber Security  

---

### Table of Contents
1. Problem Statement
2. Scope of the System
3. Features of the System
4. Functional and Non-Functional Requirements
5. Meta Data and Use Case Diagram
6. Data Flow Diagrams (DFDs)
7. Suggested Process Model
8. Prototype Screens Description
9. References / Bibliography

---

### 1. Problem Statement
A national health insurance provider processes a large volume of medical claims every month from hospitals across the country. The current claim handling process relies heavily on manual verification, which results in significant delays, increased administrative workload, and considerable difficulty in identifying fraudulent claims. There is no centralized system in place to verify policy coverage, confirm hospital eligibility, or detect abnormal claim patterns systematically.

These operational gaps lead to serious consequences including customer dissatisfaction, substantial financial losses due to fraudulent approvals, inconsistent decision-making, lack of audit trails, and overall operational inefficiencies. The absence of automation also makes it difficult to scale claim processing capacity as the number of policyholders grows.

The goal of this project is to analyze and design a centralized software system — the **Smart Health Insurance Claim Processing and Fraud Detection System** — that automates insurance claim processing and assists officers in identifying potentially fraudulent claims using rule-based statistical analysis and OS-inspired resource management algorithms.

#### Key Problems Identified:
* Manual claim submission leads to delays and human errors.
* No automated policy coverage verification is in place.
* Lack of a centralized fraud detection mechanism.
* Officers have no workload balancing or prioritized task queue.
* Policyholders cannot track the real-time status of their claims.
* No audit trail exists to log system activities for compliance.
* Simultaneous reviews of the same claim cause data inconsistencies (race conditions).

---

### 2. Scope of the System
The Smart Health Insurance Claim Processing and Fraud Detection System is a full-stack, role-based web application. The scope defines the boundaries of what the system will and will not handle.

#### 2.1 Included in Scope
* Online submission of health insurance claims by registered hospital users.
* Validation of policy coverage limits, exclusion clauses, and claim eligibility rules.
* Automated fraud risk scoring using multi-factor statistical analysis (5 detection methods).
* Claim approval, rejection, and additional-information-request workflow for insurance officers.
* Role-based dashboards for Hospitals, Policyholders, Insurance Officers, and System Administrators.
* Priority-based claim scheduling using a Multilevel Queue (4 queue levels).
* LRU Cache-based memory management to reduce database query latency by 60–80%.
* Banker's Algorithm-based workload distribution for safe officer assignment.
* Mutex Lock-based process synchronization to prevent simultaneous claim edits.
* Immutable audit trail logging every action (submission, lock, review, approval, rejection).
* Document/file upload support for treatment records and invoices.
* Policyholder self-service portal for real-time claim tracking.
* Admin panel for user management, policy configuration, and system health monitoring.

#### 2.2 Excluded from Scope
* Integration with international hospitals or cross-border insurance schemes.
* Advanced machine learning or deep learning model training for fraud detection.
* Real-time bank payment settlement or financial transaction processing.
* Mobile (iOS/Android) native application development.
* Integration with government health databases (e.g., NADRA, EHIF).
* Automated billing or invoice generation.

---

### 3. Features of the System

#### 3.1 Online Claim Submission System
Registered hospitals can submit health insurance claims digitally, uploading treatment records, diagnostic reports, and invoices through a structured web form.

#### 3.2 Automated Claim Validation
The system automatically verifies policy coverage, checks eligibility conditions, and applies predefined business rules before routing the claim for officer review.

#### 3.3 Fraud Risk Scoring Engine
Each submitted claim is analyzed against 5 fraud indicators — duplicate detection, amount anomaly (z-score), frequency anomaly, hospital pattern anomaly, and timing anomaly — producing a risk score from 0 to 100 that determines the claim's processing priority.

#### 3.4 Role-Based Dashboards
Customized workspace layouts for four user roles: Hospitals (submit & track claims), Policyholders (view coverage & claim status), Insurance Officers (review & manage workload), and Administrators (manage users, policies, and monitor system resources).

#### 3.5 Claim Tracking for Policyholders
Policyholders can log in and view the real-time status of all their insurance claims, including approval progress, fraud risk score, assigned officer, and review notes.

#### 3.6 Priority Queue Scheduling
Claims are organized into 4 multilevel queues (Emergency, Standard, Fraud-Flagged, Batch) based on urgency and fraud scores. Higher-priority queues are always processed first.

#### 3.7 LRU Cache (Memory Management)
Active policy metadata and user profiles are cached with Time-to-Live (TTL) support to minimize database queries and improve API response times.

#### 3.8 Banker's Algorithm (Deadlock Prevention)
Before assigning a claim to an officer, the system performs a safety check to ensure the allocation will not cause a resource deadlock, balancing workloads fairly across available officers.

#### 3.9 Mutex Locks (Race Condition Prevention)
Claims under active review are locked with a per-claim mutex key, preventing two officers from simultaneously editing the same claim. Locks expire after 30 seconds.

#### 3.10 Audit Trail and Reporting
Every system action — submission, lock, review, update, approval, or rejection — is logged in an immutable audit trail with timestamps, actor identity, and action details.

#### 3.11 Notifications and Alerts
The system flags high-risk claims and notifies administrators of critical fraud indicators, while dashboards display real-time counts and status updates.

#### 3.12 System Administration Panel
Administrators can register new insurance officers, create and manage policies, view officer workload distribution, monitor system resource allocation, and browse audit logs.

---

### 4. Functional and Non-Functional Requirements

#### 4.1 Functional Requirements
* **FR-01**: The system shall allow registered hospitals to submit insurance claims online through a structured form.
* **FR-02**: The system shall allow hospitals to upload supporting documents (treatment records, invoices, reports).
* **FR-03**: The system shall automatically verify policy coverage limits and exclusion clauses for each submitted claim.
* **FR-04**: The system shall validate claim eligibility based on predefined business rules (coverage type, deductible, co-pay).
* **FR-05**: The system shall compute and assign a fraud risk score (0–100) to every submitted claim using 5 statistical methods.
* **FR-06**: The system shall assign claims to priority queues (Emergency, Standard, Fraud-Flagged, Batch) based on urgency and fraud score.
* **FR-07**: The system shall allow insurance officers to approve, reject, or request additional information for claims.
* **FR-08**: The system shall apply a mutex lock to claims under active officer review to prevent concurrent edits.
* **FR-09**: The system shall use Banker's Algorithm to safely assign pending claims to available insurance officers.
* **FR-10**: The system shall allow policyholders to log in and track the real-time status of their claims.
* **FR-11**: The system shall maintain an immutable audit trail log for every action taken on any claim.
* **FR-12**: The system shall allow administrators to register new officers, create policies, and view system health.
* **FR-13**: The system shall cache frequently accessed policy and user data using an LRU Cache with TTL support.
* **FR-14**: The system shall provide a health check endpoint and algorithm status monitoring for administrators.
* **FR-15**: The system shall support JWT-based authentication with role-based access control for all four user roles.

#### 4.2 Non-Functional Requirements
* **Performance**: API endpoints shall respond within 200 ms under normal load. LRU Cache shall reduce database queries by at least 60%.
* **Security**: All passwords shall be hashed using bcrypt. JWT tokens shall expire after 7 days. All routes shall enforce role-based authorization. Helmet middleware shall apply security headers.
* **Availability**: The system shall maintain at least 99% uptime. Database connections shall include retry logic.
* **Scalability**: The system architecture shall support horizontal scaling. Priority Queue and Banker's Algorithm shall handle increasing claim volumes without degradation.
* **Usability**: The interface shall be intuitive, with clearly labeled navigation menus, color-coded claim status badges, and fraud risk indicators.
* **Maintainability**: The codebase shall follow modular architecture with clear separation between models, routes, middleware, and algorithm layers.
* **Audibility**: All user actions shall be automatically logged with actor identity, timestamp, and action type for compliance purposes.
* **Data Integrity**: Concurrent claim edits shall be prevented via Mutex Locks. Database operations shall use atomic transactions where applicable.

---

### 5. Meta Data and Use Case Diagram

#### 5.1 Meta Data
The system stores and manages data across six primary entities. Each entity and its key attributes are described below:

* **User / Actor**
  - attributes: name, email, password (bcrypt-hashed), role (hospital | policyholder | officer | admin), phone, address, createdAt, updatedAt
  - Hospital-specific: hospitalId, hospitalLicense
  - Policyholder-specific: policyNumber, policyType, coverageAmount, policyStartDate, policyEndDate
  - Officer-specific: officerId, department, isActive (max 10 concurrent claims)
* **Claim**
  - attributes: claimId (UUID, unique), hospitalId, policyholderId, treatmentDate, claimDate, treatmentType, diagnosis, description, claimAmount, approvedAmount, status (Pending | Under Review | Approved | Rejected | Info Requested | Closed), priority (1–4), queueLevel (Emergency=0, Standard=1, Fraud Flagged=2, Batch=3), fraudRiskScore (0–100), fraudFlags (array), fraudAnalysis (detail object), assignedOfficer, reviewNotes, reviewedAt, reviewedBy, auditLog, processingTime, documents (uploaded files)
* **Policy**
  - attributes: policyNumber (unique), policyholderId, policyType (basic | premium | family | senior | critical_illness), coverageAmount, usedAmount, remainingAmount, coveredTreatments (array), excludedTreatments (array), maxClaimAmount, deductible, coPayPercentage, startDate, endDate, isActive, lastAccessed, accessCount (used by LRU Cache for eviction)
* **Audit Log**
  - attributes: logId, claimId, userId, action (submit | lock | review | approve | reject | update), timestamp, ipAddress, previousState, newState, notes
* **Fraud Analysis**
  - attributes: duplicateScore, amountAnomalyScore (z-score), frequencyScore, hospitalPatternScore, timingAnomalyScore, totalRiskScore (0–100), riskLevel (Minimal | Low | Medium | High | Critical)
* **System Resource (Banker's Algorithm)**
  - attributes: officerId, maxCapacity (10 claims), currentLoad, availableCapacity, safeStateFlag (Boolean), allocationMatrix, needMatrix

#### 5.2 Use Case Diagram
The Use Case Diagram identifies all system actors and their interactions with the system. Four primary actors are involved:
* **Hospital User**: Submit claim, upload documents, view submitted claims, track claim status.
* **Policyholder**: View policy details, track claim status, check coverage remaining.
* **Insurance Officer**: View assigned claims (priority-sorted), lock & review claims, approve/reject/request info, view workload.
* **System Administrator**: Register officers, create/manage policies, view audit logs, monitor system resource allocation, view all claims.

---

### 6. Data Flow Diagrams (DFDs)

#### 6.1 Context Diagram (Level 0 DFD)
The Context Diagram provides a high-level view of the system. The system (central process) interacts with four external entities:
* Hospital ➔ submits claim data & documents ➔ System
* System ➔ sends claim status & notifications ➔ Policyholder
* Insurance Officer ➔ sends review decisions ➔ System
* System ➔ sends workload & resource reports ➔ System Administrator
* System Administrator ➔ sends policy configurations & officer registrations ➔ System

#### 6.2 Parent Diagram (Level 1 DFD)
The Level 1 DFD decomposes the system into five major processes:
* **Process 1 — Claim Submission**: Hospitals submit claims; documents are stored; claim is assigned a claimId.
* **Process 2 — Policy Validation**: Policy coverage, exclusions, and eligibility rules are verified against the Policy database.
* **Process 3 — Fraud Risk Scoring**: The Fraud Detection Engine applies 5 statistical checks and produces a risk score (0–100).
* **Process 4 — Queue Scheduling**: Claims are placed into one of 4 priority queues based on urgency and fraud score using the Multilevel Queue algorithm.
* **Process 5 — Claim Review & Approval**: Officers lock, review, and approve/reject claims. Banker's Algorithm ensures safe officer assignment. Mutex Lock prevents race conditions. Audit logs are updated.

#### 6.3 Child Diagrams (Level 2 DFDs)
* **Process 3 — Fraud Detection Breakdown**
  - 3.1 Duplicate Claim Check — compares new claim with existing claims within 30 days.
  - 3.2 Amount Anomaly Detection — uses z-score analysis against historical averages.
  - 3.3 Frequency Anomaly Check — counts claims per policyholder in a rolling 30-day window.
  - 3.4 Hospital Pattern Analysis — detects unusual submission patterns from a single hospital.
  - 3.5 Timing Anomaly Check — flags claims submitted too close together from the same source.
  - 3.6 Risk Score Aggregation — sums individual scores and classifies into Minimal/Low/Medium/High/Critical.
* **Process 4 — Queue Scheduling Breakdown**
  - 4.1 Emergency Queue (Level 0) — Critical fraud risk or life-threatening conditions; processed immediately.
  - 4.2 Standard Queue (Level 1) — Regular claims with low-to-medium fraud risk.
  - 4.3 Fraud-Flagged Queue (Level 2) — High fraud risk claims awaiting specialized review.
  - 4.4 Batch Queue (Level 3) — Low-priority, minimal-risk claims processed in batches using Round Robin.
* **Process 5 — Review Workflow Breakdown**
  - 5.1 Officer Workload Check — Banker's Algorithm verifies available officer capacity.
  - 5.2 Safe Assignment — Claim is assigned to an officer with sufficient remaining capacity.
  - 5.3 Claim Lock — Mutex Lock is applied to the claim; other officers are queued.
  - 5.4 Review Decision — Officer approves, rejects, or requests additional documents.
  - 5.5 Audit Logging — All actions are recorded with actor, timestamp, and state changes.
  - 5.6 Lock Release — Mutex is released after review; queued officers are notified.

---

### 7. Suggested Process Model

#### 7.1 Chosen Model: Agile Model (Iterative & Incremental)
The Agile software development model has been selected as the process model for this project. Agile is an iterative and incremental approach that emphasizes continuous feedback, adaptability, and close collaboration between development teams and stakeholders.

#### 7.2 Justification
* **Evolving Requirements**: Claim validation rules and fraud detection thresholds may change as new fraud patterns emerge; Agile accommodates these changes gracefully between sprints.
* **Iterative Delivery**: Core features (claim submission, validation) can be developed and tested first, followed by advanced features (fraud scoring, Banker's Algorithm) in subsequent iterations.
* **Continuous Testing**: Each sprint includes unit tests for algorithms, integration tests for API endpoints, and UI testing for dashboards — ensuring early bug detection.
* **Stakeholder Feedback**: Insurance officers and hospital administrators can review working prototypes at the end of each sprint and provide actionable feedback before the next iteration.
* **Algorithm Integration**: OS algorithms (Priority Queue, LRU Cache, Banker's Algorithm, Mutex) can be developed and integrated incrementally, one per sprint, with full testing before the next is added.

#### 7.3 Proposed Sprint Plan
| Sprint | Duration | Deliverables |
|---|---|---|
| Sprint 1 | 2 Weeks | Requirements gathering, system design, database schema, project structure setup. |
| Sprint 2 | 2 Weeks | User authentication (JWT), role-based access control, User & Policy models. |
| Sprint 3 | 2 Weeks | Claim submission, Policy Validation, Fraud Detection Engine, Priority Queue. |
| Sprint 4 | 2 Weeks | LRU Cache, Banker's Algorithm, Mutex Lock integration, Officer workload dashboard. |
| Sprint 5 | 2 Weeks | Full system testing, UI polish, audit trail, deployment, documentation. |

#### 7.4 Agile Process Phases
* **Phase 1 — Requirement Gathering**: Identify all stakeholders (hospitals, policyholders, officers, admins). Collect and document functional and non-functional requirements. Create user stories and acceptance criteria.
* **Phase 2 — Iterative Development & Testing**: Develop features sprint by sprint. Each sprint ends with a working, tested increment of the system. Unit tests are written for all algorithms. Integration tests cover all API endpoints.
* **Phase 3 — Deployment & Feedback**: Deploy the working system to a staging environment (backend on Heroku/AWS, frontend on Vercel). Gather feedback from stakeholders and incorporate changes into the next sprint.
* **Phase 4 — Final Delivery**: Complete all remaining features. Conduct final acceptance testing. Prepare documentation (README, API docs, user guide). Submit the final deliverable.

---

### 8. Prototype Screens Description
The following screens have been implemented in the working prototype of the Smart Health Insurance Claim Processing and Fraud Detection System (MediGuard AI). The frontend is built with React 19 and Vite, styled with a dark-mode theme featuring glassmorphic card containers, neon accent colors, and smooth micro-animations.

#### 8.1 Top-Level Navigation Switcher
A responsive navigation bar containing the application title "MediGuard AI" with the medical shield emblem, coupled with a toggle button group. This allows users to switch between the **Fraud Detection** system interface and the **OS Sandbox** container instantly.

#### 8.2 Claims Detection Dashboard
Four KPI cards at the top show Total Claims, Fraud Blocked, Amount Saved ($2.4M), and Average Risk Score (0.24) with percentage change indicators. On the left side, the claim analyzer inputs are displayed; on the right side, Recharts visualization graphics show "Fraud Detection Trends" (Area Chart) and "Monthly Savings" (Bar Chart) alongside the "Recent Claims" timeline tracker.

#### 8.3 Interactive Claim Wizard Form
A multi-step claim submission form guiding users through four stages:
1. **Patient Info**: Collects patient name, age, and ID.
2. **Treatment Details**: Dropdown selector for treatment types (Surgery, Dental, Emergency, etc.) and diagnosis codes.
3. **Provider Info**: Collects hospital details, custom provider risk ranges, and duplicate history checking.
4. **Financials**: Standard inputs for claim amount ($) and travel distance.

#### 8.4 Fraud Assessment Card
A circular gauge (progress wheel) showing the exact risk calculation score in the center (e.g., 35.0% Risk Score). It displays the risk classification badge (Low/Medium/High/Critical), the calculated system confidence level, and lists individual violations matching specific weights.

#### 8.5 Banker's Algorithm Simulator
An interactive panel displaying the allocation, max limit, and remaining need matrices for five processes (P0 to P4). Users can edit values for resources A, B, and C. It features a "Run Safety Check" button, which evaluates the safety parameters and displays safe sequences alongside step-by-step trace logs.

#### 8.6 FIFO Queue Simulator
A visual representation of enqueuing and dequeuing operations. It displays a horizontal cell pipeline showing indexes, FRONT/REAR pointers, and values. Inputs allow enqueuing custom elements, and Framer Motion handles transition physics as elements slide inside the queue.

#### 8.7 LRU Cache Eviction Simulator
A page replacement simulator. Users can access custom page numbers to trigger Hits or Faults. Four cache slots are rendered with color-coded borders (green for hits, red for faults). It displays a relative age stack showing Least Recently Used items on the left and Hit Ratio metrics on the right.

---

### 9. References / Bibliography
* **[1]** Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). *Operating System Concepts* (10th ed.). Wiley.
* **[2]** Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson.
* **[3]** Pressman, R. S., & Maxim, B. R. (2019). *Software Engineering: A Practitioner's Approach* (9th ed.). McGraw-Hill.
* **[4]** React (2026). *React – A JavaScript library for building user interfaces*. Retrieved from https://react.dev/
* **[5]** Recharts (2026). *Redefined chart library built with React and D3*. Retrieved from https://recharts.org/
* **[6]** Framer Motion (2026). *A production-ready motion library for React*. Retrieved from https://www.framer.com/motion/
* **[7]** Tailwind CSS (2026). *A utility-first CSS framework for rapid UI development*. Retrieved from https://tailwindcss.com/
* **[8]** JWT.io (2026). *Introduction to JSON Web Tokens*. Retrieved from https://jwt.io/introduction/
