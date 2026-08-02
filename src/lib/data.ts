export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  domain: "AI" | "Full Stack" | "Embedded" | "Product";
  year: string;
  accent: string;
  problem: string;
  solution: string;
  architecture: { layer: string; detail: string }[];
  stack: string[];
  impact: { value: string; label: string }[];
  future: string[];
  github: string;
  highlights: string[];
};

export const PROFILE = {
  name: "Rubahan P",
  first: "RUBAHAN",
  last: "P",
  roles: [
    "Google Student Ambassador",
    "AI Engineer",
    "Full Stack Developer",
    "Embedded Systems Enthusiast",
  ],
  valueProp:
    "I build systems that cross the line between silicon and software — from PID-controlled motion rigs to multi-agent AI pipelines. Engineering that ships, documented like a product.",
  education: {
    degree: "B.E. Electronics & Communication Engineering",
    year: "III Year",
    college: "V.S.B Engineering College",
    university: "Anna University",
  },
  location: "Palani, Tamil Nadu, India",
  email: "rubahanponraj@gmail.com",
  phone: "+91 7200709381",
  github: "https://github.com/Rub26s21",
  linkedin: "https://www.linkedin.com/in/rubahan",
  instagram: "https://www.instagram.com/rubahan26/",
};

export const STATS = [
  { value: 3, suffix: "", label: "Years of Engineering", note: "ECE · Anna University" },
  { value: 5, suffix: "", label: "Flagship Projects", note: "AI · Web · Hardware" },
  { value: 2, suffix: "", label: "Hackathons", note: "Build sprints under pressure" },
  { value: 1, suffix: "", label: "Symposium Organised", note: "End-to-end ownership" },
  { value: 3, suffix: "", label: "Leadership Roles", note: "Ambassador · Coordinator" },
  { value: 24, suffix: "+", label: "Technologies Used", note: "Silicon to cloud" },
];

export const SKILL_GROUPS: {
  key: string;
  label: string;
  blurb: string;
  skills: { name: string; level: number; note: string }[];
}[] = [
  {
    key: "ai",
    label: "AI & ML",
    blurb: "Agentic systems, retrieval pipelines and applied model engineering.",
    skills: [
      { name: "Python", level: 92, note: "Primary language for ML & tooling" },
      { name: "LLM / Agent Orchestration", level: 88, note: "LangChain, tool-calling, RAG" },
      { name: "Retrieval & Vector Search", level: 82, note: "pgvector, FAISS, hybrid rerank" },
      { name: "PyTorch / Scikit-learn", level: 76, note: "Classical + deep baselines" },
      { name: "Prompt & Eval Engineering", level: 85, note: "Golden sets, regression suites" },
      { name: "Computer Vision / OCR", level: 72, note: "OpenCV, Tesseract, doc parsing" },
    ],
  },
  {
    key: "fullstack",
    label: "Full Stack",
    blurb: "Product-grade interfaces backed by typed, tested APIs.",
    skills: [
      { name: "React + TypeScript", level: 90, note: "Hooks, suspense, design systems" },
      { name: "Node.js / Express", level: 84, note: "REST, WebSockets, auth" },
      { name: "FastAPI", level: 80, note: "Async Python services" },
      { name: "PostgreSQL / MongoDB", level: 78, note: "Schema design, indexing" },
      { name: "Tailwind / Motion Design", level: 88, note: "Framer Motion, design tokens" },
      { name: "REST & Realtime APIs", level: 82, note: "Socket.IO, MQTT bridges" },
    ],
  },
  {
    key: "embedded",
    label: "Embedded",
    blurb: "Where the code meets the copper. Firmware, control and sensing.",
    skills: [
      { name: "Embedded C / C++", level: 86, note: "Bare-metal & HAL drivers" },
      { name: "ESP32 / STM32 / Arduino", level: 88, note: "Peripherals, RTOS tasks" },
      { name: "Control Systems (PID)", level: 80, note: "Tuning, trajectory planning" },
      { name: "Sensors & Signal Conditioning", level: 84, note: "ADC, filtering, calibration" },
      { name: "Protocols — I2C/SPI/UART/CAN", level: 82, note: "Bus debugging with logic analyser" },
      { name: "PCB Design & Prototyping", level: 70, note: "KiCad, schematic to bring-up" },
    ],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    blurb: "Ship it, observe it, keep it cheap.",
    skills: [
      { name: "Google Cloud Platform", level: 78, note: "Cloud Run, Firestore, Vertex" },
      { name: "Docker", level: 76, note: "Multi-stage, compose" },
      { name: "CI/CD — GitHub Actions", level: 74, note: "Lint, test, deploy pipelines" },
      { name: "Vercel / Netlify", level: 86, note: "Edge deploys, preview envs" },
      { name: "Firebase", level: 80, note: "Auth, FCM, realtime DB" },
      { name: "MQTT / IoT Cloud", level: 78, note: "Broker, telemetry, alerting" },
    ],
  },
  {
    key: "tools",
    label: "Tools",
    blurb: "The workshop behind the work.",
    skills: [
      { name: "Git & GitHub", level: 90, note: "Branch hygiene, PR reviews" },
      { name: "Figma", level: 82, note: "Wireframe to design system" },
      { name: "Linux / Shell", level: 80, note: "Daily driver, scripting" },
      { name: "KiCad / Proteus", level: 72, note: "Schematic capture, simulation" },
      { name: "MATLAB / Simulink", level: 70, note: "Control modelling" },
      { name: "Postman / Logic Analyser", level: 84, note: "API + bus debugging" },
    ],
  },
  {
    key: "soft",
    label: "Soft Skills",
    blurb: "What makes the engineering land with people.",
    skills: [
      { name: "Technical Communication", level: 90, note: "Docs, demos, teardown talks" },
      { name: "Team Leadership", level: 88, note: "Club coordination, event ops" },
      { name: "Product Thinking", level: 85, note: "Problem framing before code" },
      { name: "Rapid Prototyping", level: 92, note: "Hackathon-tested velocity" },
      { name: "Mentoring & Enablement", level: 82, note: "Onboarding juniors into builds" },
      { name: "Ownership Under Ambiguity", level: 88, note: "Ship first, refine loudly" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "real-estate-ai",
    index: "01",
    title: "Real Estate Due Diligence AI Agent",
    tagline: "A multi-agent system that reads property paperwork like a senior title lawyer.",
    domain: "AI",
    year: "2025",
    accent: "#7c3aed",
    problem:
      "Buying land in India means manually cross-reading sale deeds, encumbrance certificates, patta/chitta extracts and approval letters. A single title verification takes a lawyer two to three days, costs thousands, and still misses broken chains of ownership because the work is human, repetitive and unstructured.",
    solution:
      "An agentic pipeline that ingests a folder of scanned property documents, restores structure with OCR and layout parsing, extracts a typed entity graph (owners, survey numbers, extents, dates, encumbrances), then runs specialised reviewer agents that reconstruct the chain of title, detect gaps, and produce a risk-scored due-diligence report with citations back to the exact page and clause.",
    architecture: [
      { layer: "Ingestion", detail: "Multi-format loader → Tesseract + layout OCR → page-level chunking with provenance IDs" },
      { layer: "Extraction", detail: "Structured-output LLM calls into a Pydantic schema: parties, survey no., extent, dates, liens" },
      { layer: "Knowledge Layer", detail: "Postgres + pgvector store for hybrid semantic/keyword retrieval across the document set" },
      { layer: "Agent Mesh", detail: "Title-chain agent, encumbrance agent, compliance agent — orchestrated with a supervisor + tool calls" },
      { layer: "Verification", detail: "Deterministic rule engine cross-checks agent claims; every finding must cite a source span" },
      { layer: "Delivery", detail: "FastAPI service → React report viewer with clause-level highlight and PDF export" },
    ],
    stack: ["Python", "LangChain", "OpenAI GPT-4o", "FastAPI", "PostgreSQL", "pgvector", "Tesseract OCR", "React", "TypeScript"],
    impact: [
      { value: "3 days → 9 min", label: "Review turnaround" },
      { value: "92%", label: "Risk-flag precision" },
      { value: "120+", label: "Documents in eval set" },
      { value: "100%", label: "Findings cite a source" },
    ],
    future: [
      "Direct integration with TN e-Registration and EC portals for live record pulls",
      "Regional-language OCR for Tamil deeds and handwritten endorsements",
      "Fine-tuned small model for on-prem deployment at law firms",
      "Confidence calibration + human-in-the-loop review queue",
    ],
    github: "https://github.com/Rub26s21",
    highlights: ["Multi-agent orchestration", "Citation-grounded output", "Domain-specific eval harness"],
  },
  {
    id: "campus-os",
    index: "02",
    title: "Campus OS",
    tagline: "One operating layer for everything a college runs on.",
    domain: "Full Stack",
    year: "2024",
    accent: "#06b6d4",
    problem:
      "Campus life was scattered across WhatsApp forwards, paper registers, three different Google Forms and a notice board. Students missed events, coordinators re-typed attendance, and nobody had a single source of truth for who was where.",
    solution:
      "Campus OS is a role-aware platform unifying attendance, timetables, event registration, club management and announcements behind one login. Students see a personalised feed; coordinators get dashboards and one-click exports; faculty approve with an audit trail. Everything is built on a permission model rather than bolted-on screens.",
    architecture: [
      { layer: "Client", detail: "React + TypeScript SPA, route-level code splitting, offline-tolerant caching" },
      { layer: "API", detail: "Node/Express REST layer with Zod validation and typed client SDK" },
      { layer: "Auth", detail: "JWT sessions + refresh rotation, RBAC across student / coordinator / faculty / admin" },
      { layer: "Data", detail: "MongoDB with compound indexes for timetable and attendance queries" },
      { layer: "Notifications", detail: "Firebase Cloud Messaging fan-out with topic subscription per club and per batch" },
      { layer: "Ops", detail: "Dockerised services, GitHub Actions CI, seeded staging environment" },
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT + RBAC", "Firebase FCM", "Docker", "Tailwind CSS"],
    impact: [
      { value: "1,200+", label: "Students modelled" },
      { value: "4", label: "Systems replaced" },
      { value: "~80%", label: "Less coordinator admin time" },
      { value: "<2 min", label: "Event registration flow" },
    ],
    future: [
      "Offline-first attendance with background sync for low-connectivity blocks",
      "Analytics layer for department-level participation insights",
      "Open plugin API so any club can ship its own module",
      "Native wrapper with biometric login",
    ],
    github: "https://github.com/Rub26s21",
    highlights: ["RBAC from day one", "Typed end-to-end", "Real users, real edge cases"],
  },
  {
    id: "aquashield",
    index: "03",
    title: "AquaShield",
    tagline: "IoT water quality and flood early-warning for towns that get no warning at all.",
    domain: "Embedded",
    year: "2024",
    accent: "#10b981",
    problem:
      "Small towns near seasonal water bodies get contaminated supply and flash flooding with zero instrumentation. Manual water testing happens weekly at best, and by the time a level rise is noticed by eye, evacuation time is already gone.",
    solution:
      "A solar-powered ESP32 sensing node measures pH, turbidity, TDS and water level, filters the signals on-device, and uplinks over LoRa to a gateway that publishes to an MQTT broker. A cloud service runs rolling anomaly detection on the stream and fires SMS + push alerts when quality thresholds break or level slope crosses the flood gradient.",
    architecture: [
      { layer: "Sensing Node", detail: "ESP32 + pH, turbidity, TDS probes and ultrasonic level sensor; median + EMA filtering on-device" },
      { layer: "Power", detail: "Solar panel, Li-ion pack, deep-sleep duty cycling for multi-week autonomy" },
      { layer: "Transport", detail: "LoRa 865 MHz uplink to gateway → MQTT publish with QoS 1 and store-and-forward buffer" },
      { layer: "Cloud", detail: "Time-series ingest, rolling z-score anomaly detection, threshold + slope rules engine" },
      { layer: "Alerting", detail: "SMS gateway + push notifications with escalation tiers for residents and officials" },
      { layer: "Dashboard", detail: "React dashboard with live charts, node health and historical replay" },
    ],
    stack: ["ESP32", "Embedded C", "LoRa", "MQTT", "Node.js", "React", "Time-series DB", "Solar / Li-ion", "KiCad"],
    impact: [
      { value: "~15 min", label: "Early-warning lead time" },
      { value: "4", label: "Water parameters live" },
      { value: "3 weeks", label: "Battery autonomy" },
      { value: "₹2.5k", label: "Bill of materials per node" },
    ],
    future: [
      "Mesh networking so nodes relay for each other across a catchment",
      "On-device TinyML classifier for contamination signatures",
      "Automatic valve actuation to isolate contaminated supply lines",
      "Open public API for municipal dashboards",
    ],
    github: "https://github.com/Rub26s21",
    highlights: ["Field-grade power budget", "Edge filtering", "Cost engineered for scale"],
  },
  {
    id: "servo-control",
    index: "04",
    title: "Servo Motion Control System",
    tagline: "Closed-loop precision positioning — control theory taken off the whiteboard.",
    domain: "Embedded",
    year: "2024",
    accent: "#f59e0b",
    problem:
      "Hobby servo setups are open-loop: you command an angle and hope. Under load they overshoot, drift and stall silently — useless for anything that needs repeatable positioning like a robotic joint, camera gimbal or automated test rig.",
    solution:
      "A full closed-loop motion stack: a magnetic absolute encoder feeds real position back into a PID controller running at 1 kHz on an STM32, driving a DC motor through an H-bridge. A trapezoidal trajectory planner shapes the motion profile so moves are smooth rather than step-commanded, and live telemetry streams to a browser dashboard for tuning gains in real time.",
    architecture: [
      { layer: "Sensing", detail: "AS5600 magnetic absolute encoder over I2C, 12-bit position, wrap-around handling" },
      { layer: "Control Loop", detail: "1 kHz PID with anti-windup clamping and derivative filtering, timer-interrupt driven" },
      { layer: "Trajectory", detail: "Trapezoidal velocity profile generator with configurable accel and cruise limits" },
      { layer: "Power Stage", detail: "H-bridge driver with current sense, PWM at 20 kHz to stay out of audible range" },
      { layer: "Telemetry", detail: "UART framed packets → serial bridge → WebSocket → live scope in the browser" },
      { layer: "Tuning UI", detail: "Web dashboard for live gain adjustment, step-response capture and CSV export" },
    ],
    stack: ["STM32", "Embedded C", "PID Control", "AS5600 Encoder", "H-Bridge Driver", "UART", "WebSockets", "React"],
    impact: [
      { value: "±0.4°", label: "Steady-state error" },
      { value: "180 ms", label: "Settling time" },
      { value: "1 kHz", label: "Control loop rate" },
      { value: "0%", label: "Overshoot after tuning" },
    ],
    future: [
      "Field-oriented control for BLDC actuators",
      "Auto-tuning via relay feedback identification",
      "CAN bus multi-axis coordination for a 3-DOF arm",
      "Fault detection: stall, thermal and encoder-loss handling",
    ],
    github: "https://github.com/Rub26s21",
    highlights: ["1 kHz deterministic loop", "Live gain tuning", "Measured, not guessed"],
  },
  {
    id: "quiz-conquest",
    index: "05",
    title: "Quiz Conquest",
    tagline: "Real-time multiplayer quiz platform built for a live 200-person hall.",
    domain: "Product",
    year: "2023",
    accent: "#ec4899",
    problem:
      "Symposium quiz rounds were run with paper slips and a projector. Scoring lagged, ties were argued, and the audience had nothing to watch between questions. We needed something that could hold a hall's attention and settle scores instantly.",
    solution:
      "A lobby-code multiplayer quiz where the host drives rounds from a control console and every participant answers on their phone. Scoring is time-weighted, the leaderboard animates live on the projector between questions, and tab-blur detection plus server-authoritative timing keep the round honest.",
    architecture: [
      { layer: "Realtime Core", detail: "Socket.IO rooms keyed by lobby code, server-authoritative question timers" },
      { layer: "Scoring", detail: "Time-weighted points with streak multipliers, computed server-side only" },
      { layer: "State", detail: "Redis-backed room state so a host refresh never drops a live game" },
      { layer: "Integrity", detail: "Tab-focus and visibility API monitoring, single-session enforcement per player" },
      { layer: "Presentation", detail: "Separate projector view with animated leaderboard and podium reveal" },
      { layer: "Authoring", detail: "Question bank editor with import, media support and dry-run mode" },
    ],
    stack: ["React", "Socket.IO", "Node.js", "Redis", "Framer Motion", "Express", "Tailwind CSS"],
    impact: [
      { value: "200+", label: "Concurrent players" },
      { value: "<120 ms", label: "Answer round-trip" },
      { value: "0", label: "Scoring disputes" },
      { value: "1", label: "Symposium run live on it" },
    ],
    future: [
      "Horizontal scaling with a Redis adapter across multiple nodes",
      "Team mode and bracket-style elimination rounds",
      "Question analytics: difficulty calibration from real response curves",
      "Accessibility pass — screen reader and high-contrast projector theme",
    ],
    github: "https://github.com/Rub26s21",
    highlights: ["Server-authoritative timing", "Zero-dispute scoring", "Ran live, not a demo"],
  },
];

export const LEADERSHIP = [
  {
    role: "Google Student Ambassador",
    org: "Google",
    period: "2025 — Present",
    accent: "#7c3aed",
    summary:
      "Selected to represent Google's developer ecosystem on campus — running awareness sessions on Gemini, Google Cloud and AI Studio, and translating platform capability into projects students actually ship.",
    points: [
      "Represent Google's student developer programs across the campus community",
      "Run hands-on sessions on Gemini, AI Studio and Google Cloud fundamentals",
      "Bridge peers into certification paths and developer communities",
    ],
  },
  {
    role: "Electronics Club Coordinator",
    org: "V.S.B Engineering College",
    period: "2024 — Present",
    accent: "#06b6d4",
    summary:
      "Own the club's technical roadmap: workshop curriculum, component inventory, project mentorship and the pipeline that turns first-years into people who can bring up a board on their own.",
    points: [
      "Designed a hands-on curriculum from soldering and bus debugging to closed-loop control",
      "Mentored junior teams through build cycles and project reviews",
      "Managed lab inventory, budgets and workshop logistics",
    ],
  },
  {
    role: "Technical Symposium — Organiser",
    org: "Department of ECE",
    period: "2024",
    accent: "#10b981",
    summary:
      "Took a department symposium end-to-end: event design, sponsorship outreach, registration systems, scheduling, volunteer coordination and day-of execution across parallel tracks.",
    points: [
      "Coordinated multi-track technical and non-technical events in a single day",
      "Built and ran the digital registration and scoring flow",
      "Led a volunteer team through live on-ground operations",
    ],
  },
  {
    role: "Hackathon Participant ×2",
    org: "Inter-college / National",
    period: "2023 — 2024",
    accent: "#f59e0b",
    summary:
      "Two full build sprints under a clock. Shipped working prototypes with a team, defended architecture decisions to judges, and learned to scope ruthlessly when the deadline is non-negotiable.",
    points: [
      "Scoped, built and demoed working prototypes within 24–36 hour windows",
      "Owned both firmware and frontend layers depending on team need",
      "Presented technical trade-offs to industry judging panels",
    ],
  },
];

export const TIMELINE = [
  {
    year: "2022",
    title: "Started B.E. Electronics & Communication",
    org: "V.S.B Engineering College · Anna University",
    body: "Entered ECE and immediately gravitated to the lab bench — first breadboard circuits, first blinking LED, first realisation that hardware bites back when your maths is wrong.",
    tag: "Foundation",
  },
  {
    year: "2023",
    title: "First builds & first hackathon",
    org: "Quiz Conquest · Inter-college hackathon",
    body: "Learned to ship. Built a realtime multiplayer quiz platform that ran live in front of 200 people, and did a first hackathon where scoping mattered more than cleverness.",
    tag: "Shipping",
  },
  {
    year: "2024",
    title: "Electronics Club Coordinator & Symposium",
    org: "Department of ECE",
    body: "Moved from participant to organiser. Ran the club's technical track, coordinated a full department symposium, and built AquaShield and the servo control rig — the year hardware got serious.",
    tag: "Leadership",
  },
  {
    year: "2024",
    title: "Campus OS — platform thinking",
    org: "Full Stack · RBAC platform",
    body: "Stopped building screens and started building systems. Designed a role-aware campus platform with proper auth, data modelling and notification infrastructure.",
    tag: "Systems",
  },
  {
    year: "2025",
    title: "Google Student Ambassador & AI engineering",
    org: "Google · Real Estate Due Diligence AI Agent",
    body: "Selected as a Google Student Ambassador while going deep on agentic AI — building a multi-agent due-diligence pipeline with citation-grounded output and a real evaluation harness.",
    tag: "Now",
  },
];

export const TECH_STACK: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Embedded C", "C++", "SQL", "Bash"],
  },
  {
    group: "AI & Data",
    items: ["LangChain", "OpenAI API", "Gemini", "PyTorch", "scikit-learn", "OpenCV", "pgvector", "Pandas"],
  },
  {
    group: "Web & Product",
    items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind CSS", "Framer Motion", "Three.js", "Socket.IO"],
  },
  {
    group: "Hardware",
    items: ["ESP32", "STM32", "Arduino", "LoRa", "MQTT", "KiCad", "Proteus", "MATLAB", "Logic Analyser"],
  },
  {
    group: "Infrastructure",
    items: ["Google Cloud", "Firebase", "Docker", "GitHub Actions", "PostgreSQL", "MongoDB", "Redis", "Vercel"],
  },
];

export const MARQUEE_WORDS = [
  "AI ENGINEERING",
  "EMBEDDED SYSTEMS",
  "FULL STACK",
  "CONTROL THEORY",
  "PRODUCT DESIGN",
  "IoT",
  "AGENTIC AI",
  "FIRMWARE",
  "CLOUD",
];

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "leadership", label: "Leadership" },
  { id: "journey", label: "Journey" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];
