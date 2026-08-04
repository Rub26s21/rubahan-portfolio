import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { HERO_COPY } from "@/lib/site-copy";
import { PROFILE } from "@/lib/data";
import { CountUp } from "@/components/CountUp";
import { Magnetic } from "@/components/Magnetic";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { Sparkles, ShieldCheck, Target, Hammer, Zap } from "lucide-react";

// ==========================================
// CINEMATIC 5.0+ SECOND MOTION TIMELINE
// ==========================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.2,
    },
  },
};

// Phase 1: Backdrop Display Text ("RUBAHAN") — 1.8s Cinematic Ease
const backgroundTextVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    y: -25,
  },
  show: {
    opacity: 1,
    scale: 1.0,
    y: 0,
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // easeOut
    },
  },
};

// Phase 2: Subject Hero Portrait Cutout — 1.4s Smooth Rise
const portraitVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 90,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1.0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Phase 3: Interface Container (Staggered over 2.0s)
const uiContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

// Floating Left Stats Cards (1.2s Spring ease)
const leftCardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -70,
    scale: 0.88,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1.0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
    },
  },
};

// Floating Right Traits Glass Card (1.2s Spring ease)
const rightCardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 70,
    scale: 0.88,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1.0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
    },
  },
};

// Headline Overlay Lines (1.2s Spring ease)
const headlineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
};

// Action Buttons Spring Pop (1.0s Spring pop)
const ctaButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    y: 25,
  },
  show: {
    opacity: 1,
    scale: 1.0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 12,
    },
  },
};

// Navigation Links & Editorial Footer Copy (1.0s Fade)
const uiItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Hero: React.FC = () => {
  const lenis = useSmoothScroll();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.7;
      setScrolledPastHero(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      id="hero"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative h-screen w-full bg-[#E1DDD3] text-[#0B1F33] flex flex-col justify-between items-center py-6 px-6 md:px-12 select-none z-10 overflow-hidden"
    >
      {/* ── PHASE 1: BACKDROP GIANT DISPLAY NAME "RUBAHAN" ── */}
      <motion.div
        variants={backgroundTextVariants}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center font-heading font-extrabold text-[20vw] leading-none text-[#38BDF8] tracking-tighter uppercase z-0 pointer-events-none overflow-hidden whitespace-nowrap select-none will-change-transform"
      >
        RUBAHAN
      </motion.div>

      {/* ── SPLIT MID-SCREEN NAVIGATION ── */}
      {/* LEFT MID-SCREEN NAV */}
      <motion.div
        variants={uiItemVariants}
        animate={{ opacity: scrolledPastHero ? 0 : 1, x: scrolledPastHero ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4 font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F33] ${
          scrolledPastHero ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <button onClick={() => handleScrollTo("hero")} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left">HOME</button>
        <button onClick={() => handleScrollTo("about")} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left">ABOUT ME</button>
        <button onClick={() => handleScrollTo("projects")} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left">PROJECTS</button>
      </motion.div>

      {/* RIGHT MID-SCREEN NAV */}
      <motion.div
        variants={uiItemVariants}
        animate={{ opacity: scrolledPastHero ? 0 : 1, x: scrolledPastHero ? 20 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4 font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F33] text-right ${
          scrolledPastHero ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <button onClick={() => handleScrollTo("what-you-get")} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-right">WHAT YOU GET</button>
        <button onClick={() => handleScrollTo("services")} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-right">SERVICES</button>
        <button onClick={() => handleScrollTo("process")} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-right">PROCESS</button>
        <button onClick={() => handleScrollTo("faq")} className="hover:text-[#38BDF8] transition-colors cursor-pointer text-right">FAQ</button>
      </motion.div>

      {/* ── CENTER LAYOUT CONTAINER (Profile picture anchored flush to absolute bottom) ── */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-end justify-center z-10 pt-12 pb-0">
        {/* ── PHASE 2: SUBJECT HERO PORTRAIT (Chest-Up Framing, Anchored flush to bottom-0) ── */}
        <motion.div
          variants={portraitVariants}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[380px] sm:w-[500px] md:w-[600px] lg:w-[680px] h-[85vh] max-h-[820px] z-10 will-change-transform flex items-end justify-center pointer-events-none select-none overflow-hidden pb-0 mb-0"
        >
          <img
            src="/photo-cutout.png"
            alt="Rubahan P"
            className="w-full h-full object-contain object-top select-none scale-[2.3] origin-top translate-y-[12%]"
          />
        </motion.div>

        {/* ── PHASE 3: INTERFACE CONTAINER (GLASS CARDS) ── */}
        <motion.div
          variants={uiContainerVariants}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-20"
        >
          {/* FLOATING LEFT STATS CARDS (ULTRA LIQUID GLASS IN LEFT CORNER) */}
          <motion.div
            variants={leftCardVariants}
            className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden lg:flex pointer-events-auto"
          >
            {/* Card 1: 5 Flagship Projects */}
            <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] flex items-center gap-4 w-52 text-[#0B1F33] transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:border-white/60 hover:shadow-[0_12px_40px_0_rgba(56,189,248,0.25)]">
              <div className="w-12 h-12 rounded-2xl bg-[#38BDF8] flex items-center justify-center text-[#0B1F33] font-bold text-xl shadow-lg">
                <Sparkles className="w-6 h-6 fill-current text-[#0B1F33]" />
              </div>
              <div className="flex flex-col font-mono">
                <div className="font-heading font-bold text-xl text-[#0B1F33] leading-none">
                  <CountUp end={5} />+
                </div>
                <span className="text-[10px] text-[#0B1F33]/80 font-bold uppercase tracking-wide">
                  Projects Shipped
                </span>
              </div>
            </div>

            {/* Card 2: 3+ Years of Experience */}
            <div className="p-5 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.3)] flex flex-col gap-1 w-52 text-[#0B1F33] transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:border-white/60 hover:shadow-[0_12px_40px_0_rgba(56,189,248,0.25)]">
              <div className="font-heading font-bold text-3xl text-[#38BDF8] drop-shadow-sm leading-none">
                <CountUp end={3} />+
              </div>
              <span className="font-mono text-[10px] text-[#0B1F33]/90 font-bold uppercase tracking-wider">
                Years of Experience
              </span>
            </div>
          </motion.div>

          {/* FLOATING RIGHT TRAITS GLASS LIST CARD (ULTRA LIQUID GLASS IN RIGHT CORNER, SLIGHTLY DOWN) */}
          <motion.div
            variants={rightCardVariants}
            className="absolute right-4 sm:right-6 md:right-8 top-[58%] -translate-y-1/2 p-5 rounded-3xl bg-gradient-to-br from-white/30 via-white/15 to-white/10 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_0_rgba(255,255,255,0.4)] flex flex-col gap-3 z-20 hidden lg:flex w-48 pointer-events-auto text-[#0B1F33] transition-all duration-300 hover:scale-105 hover:bg-white/40 hover:border-white/70 hover:shadow-[0_12px_40px_0_rgba(56,189,248,0.35)]"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B1F33] border-b border-black/10 pb-2">
              <Zap className="w-4 h-4 text-[#38BDF8] fill-current" />
              <span>TRAITS</span>
            </div>
            <ul className="flex flex-col gap-2 font-mono text-xs font-bold text-[#0B1F33]">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" /> Creative
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" /> Reliable
              </li>
              <li className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-[#38BDF8]" /> Strategist
              </li>
              <li className="flex items-center gap-2">
                <Hammer className="w-3.5 h-3.5 text-[#38BDF8]" /> Builder
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#38BDF8]" /> Efficient
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* ── OVERLAY HEADLINE & ACTION BUTTONS (SQUASHED DOWN TO BOTTOM EDGE OVER LEGS) ── */}
      <motion.div
        variants={uiItemVariants}
        className="absolute inset-x-0 bottom-3 sm:bottom-4 flex flex-col items-center justify-center text-center z-30 pointer-events-auto"
      >
        <motion.h1
          variants={headlineVariants}
          className="font-heading font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-white leading-tight mb-0.5 drop-shadow-lg"
        >
          <span>Engineering, </span>
          <span>Applied </span>
          <span className="font-serif italic text-[#38BDF8]">
            Differently.
          </span>
        </motion.h1>

        {/* ICY SKY BLUE ACTION BUTTONS TIGHTLY GROUPED */}
        <motion.div
          variants={ctaButtonVariants}
          className="flex items-center justify-center gap-3 mt-1"
        >
          <Magnetic>
            <a
              href={`mailto:${PROFILE.email}`}
              className="px-5 py-2 bg-[#38BDF8] text-[#0B1F33] hover:bg-[#0EA5E9] hover:text-white rounded-full text-[11px] font-bold font-mono tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer"
            >
              Let's Talk
            </a>
          </Magnetic>

          <Magnetic>
            <button
              onClick={() => handleScrollTo("about")}
              className="px-5 py-2 bg-[#38BDF8] text-[#0B1F33] hover:bg-[#0EA5E9] hover:text-white rounded-full text-[11px] font-bold font-mono tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer"
            >
              About Me
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* ── PHASE 3: EDITORIAL COPY (Floating cleanly in bottom corners of viewport) ── */}
      <motion.div
        variants={uiItemVariants}
        className="w-full max-w-7xl mx-auto flex justify-between items-end z-30 pb-4 font-mono text-xs text-[#0B1F33]/90 leading-relaxed pointer-events-auto"
      >
        <div className="max-w-xs font-bold bg-[#E1DDD3]/80 backdrop-blur-xs px-2 py-1 rounded-md">
          <p className="text-[#0B1F33] font-heading text-sm font-bold">
            {HERO_COPY.eyebrow}
          </p>
        </div>

        <div className="max-w-xs text-right hidden sm:block bg-[#E1DDD3]/80 backdrop-blur-xs px-2 py-1 rounded-md">
          <p className="text-[11px] text-[#0B1F33]/90 font-medium">
            {HERO_COPY.intro}
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};
