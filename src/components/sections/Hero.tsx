import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HERO_COPY } from "@/lib/site-copy";
import { PROFILE } from "@/lib/data";
import { CountUp } from "@/components/CountUp";
import { Magnetic } from "@/components/Magnetic";
import { PlayReelButton } from "@/components/PlayReel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Sparkles, ShieldCheck, Target, Hammer, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Hero: React.FC = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const preloaderFinished = useAppStore((s) => s.preloaderFinished);
  const lenis = useSmoothScroll();
  const isDesktop = useMediaQuery("(min-width: 769px)");

  const sectionRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const leftCardsRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const navLeftRef = useRef<HTMLDivElement>(null);
  const navRightRef = useRef<HTMLDivElement>(null);
  const bottomCopyRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !preloaderFinished) return;

    const ctx = gsap.context(() => {
      // Entrance Timeline matching the exact timing sequence of hey.mp4
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Giant Background Name "RUBAHAN" (0.2s)
      if (giantTextRef.current) {
        tl.fromTo(
          giantTextRef.current,
          { opacity: 0, scale: 0.92, y: -20 },
          { opacity: 1, scale: 1.0, y: 0, duration: 1.1, ease: "power4.out" },
          0.1
        );
      }

      // 2. Centered Portrait Photo slides up from below (0.5s)
      if (photoRef.current) {
        tl.fromTo(
          photoRef.current,
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1.0, duration: 1.2, ease: "power3.out" },
          0.4
        );
      }

      // 3. Overlay Headline Text "Engineering, Applied Differently." (0.8s)
      if (h1Ref.current) {
        const split = new SplitText(h1Ref.current, {
          type: "lines,words",
          linesClass: "line-mask",
        });

        tl.fromTo(
          split.lines,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.1,
          },
          0.7
        );
      }

      // 4. Floating Left Stats & Right Glass Traits Cards (1.1s)
      if (leftCardsRef.current && rightCardRef.current) {
        tl.fromTo(
          leftCardsRef.current,
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.4)" },
          1.0
        );

        tl.fromTo(
          rightCardRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.4)" },
          1.1
        );
      }

      // 5. Action Buttons & Editorial Navigation Links (1.4s)
      if (ctaButtonsRef.current) {
        tl.fromTo(
          ctaButtonsRef.current,
          { opacity: 0, scale: 0.85, y: 20 },
          { opacity: 1, scale: 1.0, y: 0, duration: 0.7, ease: "back.out(1.6)" },
          1.3
        );
      }

      if (navLeftRef.current && navRightRef.current && bottomCopyRef.current) {
        tl.fromTo(
          [navLeftRef.current, navRightRef.current, bottomCopyRef.current],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          1.4
        );
      }

      // 6. Scroll Parallax: Photo & Giant Type Move Straight UP on Scroll
      const section = sectionRef.current;
      if (!section || !isDesktop) return;

      gsap.to(photoRef.current, {
        y: "-150px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(giantTextRef.current, {
        y: "-90px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, preloaderFinished, isDesktop]);

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
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#E1DDD3] text-[#0B1F33] flex flex-col justify-between items-center py-8 px-6 md:px-12 select-none z-10 overflow-hidden"
    >
      {/* ── GIANT NEON DISPLAY NAME "RUBAHAN" ── */}
      <div
        ref={giantTextRef}
        className="absolute top-2 left-0 w-full text-center font-heading font-extrabold text-[22vw] leading-none text-[#CCFF00] tracking-tighter uppercase z-0 pointer-events-none overflow-hidden whitespace-nowrap select-none will-change-transform"
        style={{
          textShadow: "0 10px 40px rgba(204,255,0,0.25)",
        }}
      >
        RUBAHAN
      </div>

      {/* ── SPLIT TOP NAVIGATION BAR ── */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center z-20 pt-4 hidden md:flex font-mono text-xs font-bold uppercase tracking-wider text-[#0B1F33]">
        <div ref={navLeftRef} className="flex gap-6 items-center">
          <button onClick={() => handleScrollTo("hero")} className="hover:text-[#88A000] transition-colors">HOME</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("about")} className="hover:text-[#88A000] transition-colors">ABOUT ME</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("projects")} className="hover:text-[#88A000] transition-colors">PROJECTS</button>
        </div>

        <div ref={navRightRef} className="flex gap-6 items-center">
          <button onClick={() => handleScrollTo("what-you-get")} className="hover:text-[#88A000] transition-colors">WHAT YOU GET</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("services")} className="hover:text-[#88A000] transition-colors">SERVICES</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("process")} className="hover:text-[#88A000] transition-colors">PROCESS</button>
          <span>|</span>
          <button onClick={() => handleScrollTo("faq")} className="hover:text-[#88A000] transition-colors">FAQ</button>
        </div>
      </div>

      {/* ── CENTERPORTRAIT & OVERLAY CONTENT ── */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-end justify-center z-10 pt-16 pb-12">
        {/* CENTERED PORTRAIT PHOTO */}
        <div
          ref={photoRef}
          className="relative w-[340px] sm:w-[420px] md:w-[520px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 bg-white/20 backdrop-blur-sm z-10 will-change-transform"
        >
          <img
            src="/photo.jpg"
            alt="Rubahan P"
            className="w-full h-full object-cover select-none"
          />

          {/* Circular Glass Play Reel Button */}
          <div className="absolute right-4 bottom-6 z-30">
            <PlayReelButton />
          </div>
        </div>

        {/* ── FLOATING LEFT STATS CARDS ── */}
        <div
          ref={leftCardsRef}
          className="absolute left-0 sm:left-4 top-1/3 flex flex-col gap-4 z-20 hidden lg:flex will-change-transform"
        >
          {/* Card 1: 5 Flagship Projects */}
          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl flex items-center gap-4 w-52">
            <div className="w-12 h-12 rounded-xl bg-[#CCFF00] flex items-center justify-center text-[#0B1F33] font-bold text-xl shadow-md">
              <Sparkles className="w-6 h-6 fill-current" />
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
            <div className="font-heading font-bold text-3xl text-[#CCFF00] drop-shadow-sm leading-none">
              <CountUp end={3} />+
            </div>
            <span className="font-mono text-[10px] text-[#0B1F33]/80 font-bold uppercase tracking-wider">
              Years of Experience
            </span>
          </div>
        </div>

        {/* ── FLOATING RIGHT TRAITS GLASS LIST CARD ── */}
        <div
          ref={rightCardRef}
          className="absolute right-0 sm:right-4 top-1/4 p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl flex flex-col gap-3 z-20 hidden lg:flex w-48 will-change-transform"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B1F33] border-b border-black/10 pb-2">
            <Zap className="w-4 h-4 text-[#CCFF00] fill-current" />
            <span>TRAITS</span>
          </div>
          <ul className="flex flex-col gap-2 font-mono text-xs font-bold text-[#0B1F33]">
            <li className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#88A000]" /> Creative
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#88A000]" /> Reliable
            </li>
            <li className="flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-[#88A000]" /> Strategist
            </li>
            <li className="flex items-center gap-2">
              <Hammer className="w-3.5 h-3.5 text-[#88A000]" /> Builder
            </li>
            <li className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#88A000]" /> Efficient
            </li>
          </ul>
        </div>

        {/* ── OVERLAY HEADLINE & ACTION BUTTONS ON TORSO ── */}
        <div className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center text-center z-30 pointer-events-none">
          <h1
            ref={h1Ref}
            className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] leading-[0.9] mb-6 pointer-events-auto"
          >
            <div>Engineering,</div>
            <div>Applied</div>
            <div className="font-serif italic text-[#CCFF00] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Differently.
            </div>
          </h1>

          {/* NEON YELLOW ACTION BUTTONS */}
          <div
            ref={ctaButtonsRef}
            className="flex items-center justify-center gap-4 pointer-events-auto"
          >
            <Magnetic>
              <a
                href={`mailto:${PROFILE.email}`}
                className="px-8 py-3.5 bg-[#CCFF00] text-[#0B1F33] hover:bg-black hover:text-[#CCFF00] rounded-full text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 shadow-2xl cursor-pointer"
              >
                Let's Talk
              </a>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => handleScrollTo("about")}
                className="px-8 py-3.5 bg-[#CCFF00] text-[#0B1F33] hover:bg-black hover:text-[#CCFF00] rounded-full text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 shadow-2xl cursor-pointer"
              >
                About Me
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* ── BOTTOM EDITORIAL FOOTER COPY ── */}
      <div
        ref={bottomCopyRef}
        className="w-full max-w-7xl mx-auto flex justify-between items-end z-20 pt-4 font-mono text-xs text-[#0B1F33]/80 leading-relaxed border-t border-black/10"
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
      </div>
    </section>
  );
};
