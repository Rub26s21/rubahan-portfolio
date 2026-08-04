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
import { TextAnimation } from "@/components/TextAnimation";
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
  const photoImgRef = useRef<HTMLImageElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const traitsRef = useRef<HTMLDivElement>(null);

  const softSkills =
    SKILL_GROUPS.find((g) => g.key === "soft")?.skills.map((s) => s.name) || [];

  useEffect(() => {
    if (reducedMotion || !preloaderFinished) return;

    const ctx = gsap.context(() => {
      // 1. HERO LOAD SEQUENCE (plays once hand-off from preloader completes)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Giant RUBAHAN clips in from the left
      if (monogramRef.current) {
        tl.fromTo(
          monogramRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 0.9, duration: 1.0 },
          0
        );
      }

      // Photo Card starts centered, increases size reveal scale 1.35 -> 1.0 + blur clear
      if (photoCardRef.current && photoImgRef.current) {
        tl.fromTo(
          photoCardRef.current,
          { scale: 1.35, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 1.2, ease: "power4.out" },
          0
        );

        tl.fromTo(
          photoImgRef.current,
          { filter: "blur(24px)" },
          { filter: "blur(0px)", duration: 1.2 },
          0.1
        );
      }

      // H1 lines unmask top-to-bottom staggered
      if (h1Ref.current) {
        const split = new SplitText(h1Ref.current, {
          type: "lines,words",
          linesClass: "line-mask",
        });

        tl.fromTo(
          split.lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.1,
          },
          0.2
        );
      }

      // Trait pills & action content fade in last
      if (traitsRef.current && contentRef.current) {
        tl.fromTo(
          [traitsRef.current, contentRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          0.8
        );
      }

      // 2. HERO PIN EXIT (Moves photo to topmost left corner while scrolling)
      const section = sectionRef.current;
      if (!section || !isDesktop) return;

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150vh",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          onRefresh: () => {
            ScrollTrigger.update();
          },
        },
      });

      // Monogram type drifts up-left
      if (monogramRef.current) {
        exitTl.to(
          monogramRef.current,
          { xPercent: -35, yPercent: -50, opacity: 0.15, ease: "none" },
          0
        );
      }

      // H1 slides right and up
      if (h1Ref.current) {
        exitTl.to(
          h1Ref.current,
          { x: 140, y: -100, opacity: 0.08, ease: "none" },
          0
        );
      }

      // Trait pills scatter left
      if (traitsRef.current) {
        exitTl.to(
          traitsRef.current,
          { x: -60, opacity: 0, ease: "none" },
          0
        );
      }

      // Intro copy & CTA buttons fade away
      if (contentRef.current) {
        exitTl.to(contentRef.current, { y: -60, opacity: 0, ease: "none" }, 0);
      }

      // PHOTO CARD MOVES TO THE TOPMOST CORNER OF THE LEFT SIDE (-36vw, -36vh, scale 0.55) AND STAYS ANCHORED
      if (photoCardRef.current && photoImgRef.current) {
        exitTl.to(
          photoCardRef.current,
          {
            x: "-36vw",
            y: "-36vh",
            scale: 0.55,
            opacity: 0.45,
            ease: "power1.inOut",
          },
          0
        );

        exitTl.to(
          photoImgRef.current,
          {
            filter: "blur(24px)",
            ease: "power1.inOut",
          },
          0
        );
      }
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
      className={`relative h-screen w-full bg-canvas flex flex-col justify-between items-center py-16 px-6 md:pl-72 md:pr-12 select-none z-10 ${
        isDesktop ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      {/* Giant Background Monogram Type */}
      <div
        ref={monogramRef}
        className="absolute top-8 left-0 w-full text-center font-heading font-bold text-[15vw] leading-none text-sky opacity-90 select-none tracking-tighter uppercase z-0 pt-4 pointer-events-none overflow-hidden whitespace-nowrap will-change-transform"
      >
        RUBAHAN
      </div>

      {/* Trait Pills Left Edge */}
      <div
        ref={traitsRef}
        className="absolute left-8 lg:left-72 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 hidden xl:flex will-change-transform"
      >
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
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl relative z-10 mt-6">
        {/* Central Photo Card (Starts in center, increases size on load, moves to top-left corner on scroll) */}
        <div
          ref={photoCardRef}
          className="relative w-52 h-64 sm:w-60 sm:h-72 md:w-72 md:h-[360px] mb-6 select-none will-change-transform z-10"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-surface bg-surface">
            <img
              ref={photoImgRef}
              src="/photo.jpg"
              alt="Rubahan P"
              className="w-full h-full object-cover will-change-transform"
            />
          </div>

          {/* Floating Badge Chips */}
          <div className="absolute -right-2 sm:-right-8 top-10 bg-surface border border-mist/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-2 z-25 font-mono text-[9px] sm:text-xs text-ink whitespace-nowrap">
            <CountUp end={5} className="font-bold text-deep" />
            <span>Flagship Projects</span>
          </div>

          <div className="absolute -left-4 sm:-left-10 bottom-10 bg-surface border border-mist/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-2 z-25 font-mono text-[9px] sm:text-xs text-ink whitespace-nowrap">
            <CountUp end={3} className="font-bold text-deep" />
            <span>Years of Engineering</span>
          </div>

          {/* Play Reel Button */}
          <div className="absolute -right-14 bottom-6 z-30">
            <PlayReelButton />
          </div>
        </div>

        {/* Overlay H1 */}
        <h1
          ref={h1Ref}
          className="font-heading font-bold text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink leading-[0.95] mb-4 pointer-events-none will-change-transform"
        >
          <div>Engineering,</div>
          <div>Applied</div>
          <div className="font-serif italic text-deep">Differently.</div>
        </h1>

        {/* Intro copy block with Motion Graphics */}
        <div
          ref={contentRef}
          className="max-w-xl text-center flex flex-col items-center gap-4 mt-2 will-change-transform"
        >
          <TextAnimation type="words">
            <p className="text-xs uppercase tracking-[0.2em] text-deep font-semibold">
              {HERO_COPY.eyebrow}
            </p>
          </TextAnimation>

          <TextAnimation type="words">
            <p className="text-xs md:text-sm text-mist leading-relaxed font-medium">
              {HERO_COPY.intro}
            </p>
          </TextAnimation>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
            <Magnetic>
              <a
                href={`mailto:${PROFILE.email}`}
                className="px-6 py-2.5 bg-sky text-ink hover:bg-deep hover:text-surface rounded-full text-xs font-semibold transition-all duration-300 shadow-md cursor-pointer"
              >
                Let's Talk
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => handleScrollTo("about")}
                className="px-6 py-2.5 border border-mist/30 hover:border-deep text-ink hover:text-deep rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer"
              >
                About Me
              </button>
            </Magnetic>
          </div>

          <EmailPill className="mt-1" />
        </div>
      </div>
    </section>
  );
};
