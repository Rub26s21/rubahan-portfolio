// site-copy.ts — editorial copy for the heynesh recreation. VERBATIM content, do not let AI rewrite.

export const HERO_COPY = {
    eyebrow: "The engineer who ships. That's Rubahan.",
    h1Lines: ["Engineering,", "Applied", "Differently."], // "Differently." renders in Instrument Serif Italic
    intro:
        "Working across silicon and software to ship AI, web, and embedded systems that solve real problems — documented like products.",
    stats: [
        { value: 5, label: "Flagship Projects" },
        { value: 3, label: "Years of Engineering" },
    ],
};

export const JOURNEY_CARDS = [
    {
        year: "'22", title: "Where it started.",
        teaser: "First year of B.E. ECE at V.S.B. The first time a circuit I wired actually worked, I couldn't sleep.",
        story: "TODO(✏️): how I actually got into electronics — the real moment.",
        handle: "@vsb", timeAgo: "4 years ago", photo: "/journey/22.jpg",
    },
    {
        year: "'23", title: "First real build.",
        teaser: "Quiz Conquest — 200 people in a hall, my code keeping score live. Zero disputes.",
        story: "TODO(✏️): building for a live audience — what broke, what I learned.",
        handle: "@quizconquest", timeAgo: "3 years ago", photo: "/journey/23.jpg",
    },
    {
        year: "'24", title: "The shipping year.",
        teaser: "Campus OS, AquaShield, a servo controller — and somewhere in between, I organised a symposium.",
        story: "TODO(✏️): three projects, club coordination and a symposium, end to end.",
        handle: "@ece", timeAgo: "2 years ago", photo: "/journey/24.jpg",
    },
    {
        year: "'25", title: "Google picked up the phone.",
        teaser: "Selected as Google Student Ambassador. Also taught an AI agent to read property paperwork like a lawyer.",
        story: "TODO(✏️): the ambassador selection + the Real Estate AI build.",
        handle: "@google", timeAgo: "1 year ago", photo: "/journey/25.jpg",
    },
    {
        year: "'26", title: "The journey continues.",
        teaser: "Three years in. Still obsessed. Now figuring out how far AI agents can go.",
        story: "TODO(✏️): current focus and what's next.",
        handle: "@rubahan", timeAgo: "2 hours ago", photo: "/journey/26.jpg",
    },
];

export const WORK_OUTCOMES = [
    { id: "real-estate-ai", chips: ["Python", "LangChain", "GPT-4o"], outcome: "Property document review: 3 days → 9 minutes, every finding cited." },
    { id: "campus-os", chips: ["React", "Node.js", "MongoDB"], outcome: "One platform replacing 4 systems for 1,200+ students." },
    { id: "aquashield", chips: ["ESP32", "LoRa", "MQTT"], outcome: "~15 min flood early-warning at ₹2.5k per node." },
    { id: "servo-control", chips: ["STM32", "PID", "1 kHz"], outcome: "±0.4° precision, 0% overshoot after tuning." },
    { id: "quiz-conquest", chips: ["React", "Socket.IO", "Redis"], outcome: "200+ concurrent players, <120 ms round-trip, 0 disputes." },
];

export const CAPABILITIES_INTRO =
    "AI, web, and silicon combined — turning real problems into systems that ship, perform, and keep working.";

export const CAPABILITIES = [
    { title: "AI & ML Systems", desc: "Agents, RAG pipelines and applied ML that produce cited, auditable output — not demos." },
    { title: "Full-Stack Development", desc: "Fast, scalable web apps with clean architecture, auth, and real-time features." },
    { title: "Embedded & IoT", desc: "From PCB to dashboard: firmware, sensors, LoRa/MQTT networks that survive the field." },
    { title: "Cloud & DevOps", desc: "Deployment, containers and pipelines so what ships keeps running." },
    { title: "End-to-End Ownership", desc: "I've run events, led a club and shipped solo — you get someone who finishes." },
];

export const SERVICES = [
    {
        title: "Portfolio Website", price: "Free",
        bullets: ["Up to 5 sections, designed and built", "Responsive and fast on every device", "Resume wired to every CTA", "Deployed and LinkedIn-ready in ~1 week"],
        audience: "For students who want to stand out in placements.",
    },
    {
        title: "Club & Event Website", price: "Free",
        bullets: ["Registration flows that hold up on the day", "Live features — leaderboards, schedules, results", "Easy content updates for coordinators", "Tested for campus networks and phones"],
        audience: "For clubs and departments that need it to work on the day.",
    },
    {
        title: "Custom Build", price: "Let's Talk",
        bullets: ["AI agents and integrations", "IoT dashboards and telemetry", "Full-stack web apps", "Scoped together on a call"],
        audience: "For problems that don't fit a template.",
    },
];

export const REEL_ENABLED = true;

export const PROCESS_STEPS = [
    { step: "01", title: "Define", desc: "goals, users, constraints" },
    { step: "02", title: "Design", desc: "type, motion, system" },
    { step: "03", title: "Build", desc: "GSAP/React, clean data layer" },
    { step: "04", title: "Launch", desc: "perf pass, deploy, iterate" },
];

export const FAQ_ITEMS = [
    { q: "Can you build a portfolio like this for me?", a: "Yes, that's exactly what the Portfolio Website service is. You bring your projects and story; I handle design, build, and deployment." },
    { q: "How long does a portfolio take?", a: "About a week from our first call to a live site, if your content is ready. Content gathering is usually the slow part — I'll give you a simple checklist." },
    { q: "What do you need from me to start?", a: "Your resume, project list with honest numbers, 2–3 photos, and 30 minutes on a call. That's it." },
    { q: "Why a coded site instead of a website builder?", a: "Builders cap you at a template with your name on it. A coded site gives motion, performance and detail that make people stop scrolling — which is the whole point." },
    { q: "Do you take other freelance work?", a: "Yes — web apps, AI integrations, IoT dashboards. See Custom Build above." },
    { q: "Not sure what you need?", a: "No stress. Email me at rubahanponraj@gmail.com and tell me what you have in mind." },
];

export const CTA_COPY = { line: "Have something in mind?", button: "Let's Talk" };

// Future testimonials swap into the Recognition carousel with this shape — real quotes only:
export type Testimonial = { quote: string; name: string; role: string; link?: string };
export const TESTIMONIALS: Testimonial[] = []; // empty until ≥3 genuine quotes exist