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
      className="relative min-h-screen w-full bg-[#E1DDD3] text-[#0B1F33] flex flex-col justify-between items-center py-6 px-6 md:px-12 select-none z-10 overflow-hidden"
    >
      {/* ── PHASE 1: BACKDROP GIANT DISPLAY NAME "RUBAHAN" ── */}
      <motion.div
        variants={backgroundTextVariants}
        className="absolute top-6 left-0 w-full text-center font-heading font-extrabold text-[16vw] leading-none text-[#38BDF8] tracking-tighter uppercase z-0 pointer-events-none overflow-hidden whitespace-nowrap select-none will-change-transform"
        style={{
          textShadow: "0 10px 40px rgba(56,189,248,0.25)",
        }}
      >
        RUBAHAN
      </motion.div>

      {/* ── PHASE 3: HORIZONTAL TOP NAVIGATION BAR ── */}
      <motion.div
        variants={uiItemVariants}
        animate={{ opacity: scrolledPastHero ? 0 : 1, y: scrolledPastHero ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full max-w-7xl mx-auto flex justify-between items-center z-20 pt-2 hidden md:flex font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F33] ${
          scrolledPastHero ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <div className="flex gap-6 items-center">
          <button onClick={() => handleScrollTo("hero")} className="hover:text-[#38BDF8] transition-colors cursor-pointer">HOME</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("about")} className="hover:text-[#38BDF8] transition-colors cursor-pointer">ABOUT ME</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("projects")} className="hover:text-[#38BDF8] transition-colors cursor-pointer">PROJECTS</button>
        </div>

        <div className="flex gap-6 items-center">
          <button onClick={() => handleScrollTo("what-you-get")} className="hover:text-[#38BDF8] transition-colors cursor-pointer">WHAT YOU GET</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("services")} className="hover:text-[#38BDF8] transition-colors cursor-pointer">SERVICES</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("process")} className="hover:text-[#38BDF8] transition-colors cursor-pointer">PROCESS</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("faq")} className="hover:text-[#38BDF8] transition-colors cursor-pointer">FAQ</button>
        </div>
      </motion.div>

      {/* ── CENTER LAYOUT CONTAINER (Perfect Proportion Ratio) ── */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-end justify-center z-10 pt-16 pb-0">
        {/* ── PHASE 2: SUBJECT HERO PORTRAIT (Perfect Proportioned Cutout, Scale 1.15, Head Unclipped) ── */}
        <motion.div
          variants={portraitVariants}
          className="relative w-[300px] sm:w-[380px] md:w-[440px] aspect-[4/5] z-10 will-change-transform flex items-end justify-center pointer-events-none select-none overflow-hidden"
        >
          <img
            src="/photo-cutout.png"
            alt="Rubahan P"
            className="w-full h-full object-contain object-bottom select-none scale-[1.15] origin-bottom"
          />
        </motion.div>

        {/* ── PHASE 3: INTERFACE CONTAINER (z-20 / z-30) ── */}
        <motion.div
          variants={uiContainerVariants}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-20"
        >
          {/* FLOATING LEFT STATS CARDS */}
          <motion.div
            variants={leftCardVariants}
            className="absolute left-0 sm:left-4 top-1/3 flex flex-col gap-4 z-20 hidden lg:flex pointer-events-auto"
          >
            {/* Card 1: 5 Flagship Projects */}
            <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl flex items-center gap-4 w-52">
              <div className="w-12 h-12 rounded-xl bg-[#38BDF8] flex items-center justify-center text-[#0B1F33] font-bold text-xl shadow-md">
                <Sparkles className="w-6 h-6 fill-current text-[#0B1F33]" />
              </div>
              <div className="flex flex-col font-mono">
                <div className="font-heading font-bold text-lg text-[#0B1F33] leading-none">
                  <CountUp end={5} />+
                </div>
                <span className="text-[10px] text-[#0B1F33]/70 font-semibold uppercase">
                  Projects Shipped
                </span>
              </div>
            </div>

            {/* Card 2: 3+ Years of Experience */}
            <div className="p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl flex flex-col gap-1 w-52">
              <div className="font-heading font-bold text-3xl text-[#38BDF8] drop-shadow-sm leading-none">
                <CountUp end={3} />+
              </div>
              <span className="font-mono text-[10px] text-[#0B1F33]/80 font-bold uppercase tracking-wider">
                Years of Experience
              </span>
            </div>
          </motion.div>

          {/* FLOATING RIGHT TRAITS GLASS LIST CARD */}
          <motion.div
            variants={rightCardVariants}
            className="absolute right-0 sm:right-4 top-1/4 p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl flex flex-col gap-3 z-20 hidden lg:flex w-48 pointer-events-auto"
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

          {/* OVERLAY HEADLINE & ACTION BUTTONS ON TORSO ── */}
          <div className="absolute inset-x-0 bottom-8 flex flex-col items-center justify-center text-center z-30 pointer-events-none">
            <motion.h1
              variants={headlineVariants}
              className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[0.9] mb-5 pointer-events-auto"
            >
              <div>Engineering,</div>
              <div>Applied</div>
              <div className="font-serif italic text-[#38BDF8]">
                Differently.
              </div>
            </motion.h1>

            {/* ICY SKY BLUE ACTION BUTTONS */}
            <motion.div
              variants={ctaButtonVariants}
              className="flex items-center justify-center gap-4 pointer-events-auto"
            >
              <Magnetic>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="px-8 py-3.5 bg-[#38BDF8] text-[#0B1F33] hover:bg-[#0EA5E9] hover:text-white rounded-full text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 shadow-2xl cursor-pointer"
                >
                  Let's Talk
                </a>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={() => handleScrollTo("about")}
                  className="px-8 py-3.5 bg-[#38BDF8] text-[#0B1F33] hover:bg-[#0EA5E9] hover:text-white rounded-full text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 shadow-2xl cursor-pointer"
                >
                  About Me
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── PHASE 3: BOTTOM EDITORIAL FOOTER COPY (Flush at bottom, ZERO empty gap below) ── */}
      <motion.div
        variants={uiItemVariants}
        className="w-full max-w-7xl mx-auto flex justify-between items-end z-20 pt-4 pb-4 font-mono text-xs text-[#0B1F33]/80 leading-relaxed border-t border-black/10"
      >
        <div className="max-w-xs font-bold">
          <p className="text-[#0B1F33] font-heading text-sm font-bold">
            {HERO_COPY.eyebrow}
          </p>
        </div>

        <div className="max-w-xs text-right hidden sm:block">
          <p className="text-[11px] text-[#0B1F33]/80">
            {HERO_COPY.intro}
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};
