import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { HERO_COPY } from "@/lib/site-copy";
import { PROFILE, SKILL_GROUPS } from "@/lib/data";
import { CountUp } from "@/components/CountUp";
import { EmailPill } from "@/components/EmailPill";
import { Magnetic } from "@/components/Magnetic";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const Hero: React.FC = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const lenis = useSmoothScroll();
  const photoRef = useRef<HTMLImageElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const softSkills =
    SKILL_GROUPS.find((g) => g.key === "soft")?.skills.map((s) => s.name) || [];

  useEffect(() => {
    // 1. Photo reveal scale-in
    gsap.fromTo(
      photoRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // 2. H1 text splits and mask reveals
    if (!reducedMotion && h1Ref.current) {
      const split = new SplitText(h1Ref.current, {
        type: "lines,words",
        linesClass: "line-mask",
      });

      gsap.fromTo(
        split.words,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.04,
          delay: 0.1,
        }
      );

      return () => {
        split.revert();
      };
    }
  }, [reducedMotion]);

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
      className="relative min-h-screen w-full bg-canvas overflow-hidden flex flex-col justify-between items-center py-20 px-6 md:pl-72 md:pr-12 select-none z-10"
    >
      {/* Giant Background Monogram Type */}
      <div className="absolute top-8 left-0 w-full text-center font-heading font-bold text-[15vw] leading-none text-[#38BDF8] opacity-90 select-none tracking-tighter uppercase z-0 pt-4 pointer-events-none overflow-hidden whitespace-nowrap">
        RUBAHAN
      </div>

      {/* Trait Pills Left Edge */}
      <div className="absolute left-8 lg:left-72 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 hidden xl:flex">
        <span className="font-mono text-[10px] uppercase tracking-widest text-mist mb-1">
          TRAITS
        </span>
        {softSkills.map((skill, idx) => (
          <div
            key={idx}
            className="px-3.5 py-1.5 bg-surface border border-mist/20 rounded-full text-[10px] font-mono text-ink shadow-sm w-fit"
          >
            {skill}
          </div>
        ))}
      </div>

      {/* Center Layout Container */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl relative z-10 mt-12">
        {/* Central Photo with overlapping Badge Chips */}
        <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[400px] mb-8 select-none">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-surface bg-surface">
            <img
              ref={photoRef}
              src="/photo.jpg"
              alt="Rubahan P"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badge Chips with CountUp */}
          <div className="absolute -right-2 sm:-right-8 top-12 bg-surface border border-mist/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-2 z-25 font-mono text-[9px] sm:text-xs text-ink whitespace-nowrap">
            <CountUp end={5} className="font-bold text-deep" />
            <span>Flagship Projects</span>
          </div>

          <div className="absolute -left-4 sm:-left-12 bottom-12 bg-surface border border-mist/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-2 z-25 font-mono text-[9px] sm:text-xs text-ink whitespace-nowrap">
            <CountUp end={3} className="font-bold text-deep" />
            <span>Years of Engineering</span>
          </div>
        </div>

        {/* Overlay H1 */}
        <h1
          ref={h1Ref}
          className="font-heading font-bold text-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight text-ink leading-[0.95] mb-6 pointer-events-none"
        >
          <div>Engineering,</div>
          <div>Applied</div>
          <div className="font-serif italic text-deep">Differently.</div>
        </h1>

        {/* Intro copy block */}
        <div className="max-w-xl text-center flex flex-col items-center gap-6 mt-4">
          <p className="text-xs uppercase tracking-[0.2em] text-deep font-semibold">
            {HERO_COPY.eyebrow}
          </p>
          <p className="text-sm md:text-base text-mist leading-relaxed font-medium">
            {HERO_COPY.intro}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Magnetic>
              <a
                href={`mailto:${PROFILE.email}`}
                className="px-8 py-3.5 bg-sky text-ink hover:bg-deep hover:text-surface rounded-full text-sm font-semibold transition-all duration-300 shadow-md cursor-pointer"
              >
                Let's Talk
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => handleScrollTo("about")}
                className="px-8 py-3.5 border border-mist/30 hover:border-deep text-ink hover:text-deep rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
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
