import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HERO_COPY } from "@/lib/site-copy";
import { PROFILE, SKILL_GROUPS } from "@/lib/data";
import { CountUp } from "@/components/CountUp";
import { EmailPill } from "@/components/EmailPill";
import { Magnetic } from "@/components/Magnetic";
import { PlayReelButton } from "@/components/PlayReel";
import { Card3D } from "@/components/Card3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Hero: React.FC = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const preloaderFinished = useAppStore((s) => s.preloaderFinished);
  const lenis = useSmoothScroll();
  const isDesktop = useMediaQuery("(min-width: 769px)");

  const sectionRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const traitsRef = useRef<HTMLDivElement>(null);

  const softSkills =
    SKILL_GROUPS.find((g) => g.key === "soft")?.skills.map((s) => s.name) || [];

  useEffect(() => {
    if (reducedMotion || !preloaderFinished) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation Sequence (Slightly Zoomed Photo Card Reveal)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Monogram type reveal
      if (monogramRef.current) {
        tl.fromTo(
          monogramRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 0.85, scale: 1.0, duration: 1.0 },
          0
        );
      }

      // Photo Card Entrance: Slightly Zoomed (scale: 1.08), 100% opacity ALWAYS
      if (photoCardRef.current) {
        tl.fromTo(
          photoCardRef.current,
          { scale: 1.25, opacity: 0, y: 30 },
          { scale: 1.08, opacity: 1, y: 0, duration: 1.1, ease: "back.out(1.5)" },
          0.1
        );
      }

      // H1 SplitText Line Unmasking
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
          0.2
        );
      }

      // Intro Content & Action Buttons Fade-In
      if (contentRef.current && traitsRef.current) {
        tl.fromTo(
          [traitsRef.current, contentRef.current],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          0.7
        );
      }

      // 2. Scroll Parallax: Photo Card simply goes UP on scroll (NEVER FADES OR VANISHES)
      const section = sectionRef.current;
      if (!section || !isDesktop) return;

      gsap.to(photoCardRef.current, {
        y: "-140px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(monogramRef.current, {
        y: "-80px",
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
      className="relative min-h-screen w-full bg-canvas flex flex-col justify-between items-center py-20 px-6 md:pl-72 md:pr-12 select-none z-10 overflow-hidden"
    >
      {/* 3D Ambient Background Monogram */}
      <div
        ref={monogramRef}
        className="absolute top-12 left-0 w-full text-center font-heading font-bold text-[16vw] leading-none text-[#38BDF8]/15 select-none tracking-tighter uppercase z-0 pointer-events-none overflow-hidden whitespace-nowrap will-change-transform"
      >
        RUBAHAN
      </div>

      {/* Trait Pills Left Sidebar */}
      <div
        ref={traitsRef}
        className="absolute left-8 lg:left-72 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20 hidden xl:flex will-change-transform"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-mist mb-1 font-semibold">
          TRAITS
        </span>
        {softSkills.map((skill, idx) => (
          <div
            key={idx}
            className="px-4 py-1.5 bg-surface border border-mist/20 rounded-full text-[10px] font-mono text-ink shadow-sm w-fit hover:border-[#38BDF8] transition-colors"
          >
            {skill}
          </div>
        ))}
      </div>

      {/* Hero Center Layout Container */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl relative z-10 my-auto">
        {/* Central 3D Photo Card (Slightly Zoomed, 100% Opacity Always, Moves Straight Up on Scroll) */}
        <div ref={photoCardRef} className="relative mb-8 select-none z-10 opacity-100">
          <Card3D intensity={18}>
            <div className="w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-[360px] rounded-3xl overflow-hidden shadow-2xl border-4 border-surface bg-surface relative transform scale-[1.08]">
              <img
                src="/photo.jpg"
                alt="Rubahan P"
                className="w-full h-full object-cover select-none"
              />
            </div>
          </Card3D>

          {/* Floating Badge Chip 1 */}
          <div className="absolute -right-4 sm:-right-10 top-8 bg-surface border border-mist/20 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 z-25 font-mono text-[10px] sm:text-xs text-ink whitespace-nowrap">
            <CountUp end={5} className="font-bold text-[#38BDF8]" />
            <span>Flagship Projects</span>
          </div>

          {/* Floating Badge Chip 2 */}
          <div className="absolute -left-6 sm:-left-12 bottom-8 bg-surface border border-mist/20 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 z-25 font-mono text-[10px] sm:text-xs text-ink whitespace-nowrap">
            <CountUp end={3} className="font-bold text-[#38BDF8]" />
            <span>Years of Engineering</span>
          </div>

          {/* Circular Glass Play Reel Button */}
          <div className="absolute -right-16 bottom-4 z-30">
            <PlayReelButton />
          </div>
        </div>

        {/* Headline Typography */}
        <h1
          ref={h1Ref}
          className="font-heading font-bold text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-ink leading-[0.95] mb-6 pointer-events-none will-change-transform"
        >
          <div>Engineering,</div>
          <div>Applied</div>
          <div className="font-serif italic text-[#38BDF8]">Differently.</div>
        </h1>

        {/* Subheadline Copy & Action Buttons */}
        <div
          ref={contentRef}
          className="max-w-xl text-center flex flex-col items-center gap-4 will-change-transform"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#38BDF8] font-bold">
            {HERO_COPY.eyebrow}
          </p>

          <p className="text-xs md:text-sm text-mist leading-relaxed font-medium">
            {HERO_COPY.intro}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Magnetic>
              <a
                href={`mailto:${PROFILE.email}`}
                className="px-7 py-3 bg-[#38BDF8] text-[#0B1F33] hover:bg-[#0EA5E9] hover:text-white rounded-full text-xs font-bold transition-all duration-300 shadow-lg cursor-pointer"
              >
                Let's Talk
              </a>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => handleScrollTo("about")}
                className="px-7 py-3 border border-mist/30 hover:border-[#38BDF8] text-ink hover:text-[#38BDF8] rounded-full text-xs font-bold transition-all duration-300 cursor-pointer"
              >
                About Me
              </button>
            </Magnetic>
          </div>

          <EmailPill className="mt-2" />
        </div>
      </div>
    </section>
  );
};
