import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PROJECTS } from "@/lib/data";
import { WORK_OUTCOMES } from "@/lib/site-copy";
import { SectionHeading } from "@/components/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  useActiveSection("projects");
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const setCursorLabel = useAppStore((s) => s.setCursorLabel);
  const isDesktop = useMediaQuery("(min-width: 769px)");

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleActivateProject = (githubUrl: string) => {
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  // DESKTOP: PINNED HORIZONTAL GALLERY (300vh pin distance)
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll distance
      const totalScrollWidth = track.scrollWidth - window.innerWidth + 300;

      // 1. PIN & HORIZONTAL TRACK TRANSLATION
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalScrollWidth}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          onRefresh: () => {
            ScrollTrigger.update();
          },
        },
      });

      pinTimeline.to(track, {
        x: -totalScrollWidth,
        ease: "none",
      });

      // 2. BACKGROUND THEME LERPING ON PIN (#F6FAFD <-> #0B1F33)
      ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        end: `+=${totalScrollWidth + window.innerHeight * 0.5}`,
        onEnter: () => {
          gsap.to(document.documentElement, {
            "--color-canvas": "#0B1F33",
            "--color-surface": "#0C233B",
            "--color-ink": "#FFFFFF",
            "--color-mist": "#8FB3C7",
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.to(document.documentElement, {
            "--color-canvas": "#F6FAFD",
            "--color-surface": "#FFFFFF",
            "--color-ink": "#0B1F33",
            "--color-mist": "#8FB3C7",
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(document.documentElement, {
            "--color-canvas": "#0B1F33",
            "--color-surface": "#0C233B",
            "--color-ink": "#FFFFFF",
            "--color-mist": "#8FB3C7",
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(document.documentElement, {
            "--color-canvas": "#F6FAFD",
            "--color-surface": "#FFFFFF",
            "--color-ink": "#0B1F33",
            "--color-mist": "#8FB3C7",
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });

      // 3. CARD CENTER CROSS SCALE & PARALLAX EFFECT
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { scale: 0.92, rotateY: -3 },
          {
            scale: 1.02,
            rotateY: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: pinTimeline,
              start: "left 85%",
              end: "center center",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.to(document.documentElement, {
        "--color-canvas": "#F6FAFD",
        "--color-surface": "#FFFFFF",
        "--color-ink": "#0B1F33",
        "--color-mist": "#8FB3C7",
        duration: 0.1,
      });
    };
  }, [reducedMotion, isDesktop]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative w-full bg-canvas select-none z-10 transition-colors duration-300 overflow-hidden ${
        isDesktop ? "h-screen py-12 flex flex-col justify-between" : "py-24 px-6"
      }`}
    >
      {/* Top Header - Fixed/Pinned inside Section */}
      <div className="w-full max-w-7xl mx-auto px-6 md:pl-72 md:pr-12 pt-4">
        <SectionHeading eyebrow="Selected Work" title="Built to Perform" />
        <p className="text-mist font-mono text-xs md:text-sm mt-3 max-w-xl">
          AI, web, and silicon combined — turning real problems into systems that ship, perform, and keep working.
        </p>
      </div>

      {/* DESKTOP PINNED HORIZONTAL GALLERY TRACK */}
      {isDesktop ? (
        <div className="w-full overflow-hidden my-auto py-6">
          <div
            ref={trackRef}
            className="flex gap-8 pl-72 pr-24 w-max items-center will-change-transform"
          >
            {PROJECTS.map((project, idx) => {
              const outcomeInfo = WORK_OUTCOMES.find((o) => o.id === project.id);
              const chips = outcomeInfo ? outcomeInfo.chips : project.stack.slice(0, 3);
              const outcome = outcomeInfo ? outcomeInfo.outcome : project.tagline;

              return (
                <div
                  key={project.id}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  onClick={() => handleActivateProject(project.github)}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    setCursorLabel("open");
                  }}
                  onMouseLeave={() => {
                    setHoveredIdx(null);
                    setCursorLabel("");
                  }}
                  className={`w-[480px] lg:w-[540px] h-[400px] p-8 bg-surface rounded-2xl border border-mist/20 shadow-xl flex flex-col justify-between transition-all duration-300 group cursor-pointer relative overflow-hidden will-change-transform ${
                    hoveredIdx !== null && hoveredIdx !== idx
                      ? "opacity-40 scale-95"
                      : "opacity-100 scale-100"
                  }`}
                  style={{
                    borderTop: `4px solid ${project.accent}`,
                  }}
                >
                  {/* Top Bar: Index & Tech Chips */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 bg-sky/10 text-sky text-xs font-mono font-bold rounded-full border border-sky/20">
                        {project.index}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-mist">
                        {project.domain} · {project.year}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-ink leading-snug group-hover:text-sky transition-colors duration-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-mist font-medium leading-relaxed">
                      {outcome}
                    </p>
                  </div>

                  {/* Impact grid */}
                  <div className="grid grid-cols-3 gap-3 border-y border-mist/15 py-4 my-2">
                    {project.impact.slice(0, 3).map((imp, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="font-heading text-base font-bold text-ink">
                          {imp.value}
                        </span>
                        <span className="text-[9px] font-mono text-mist leading-tight">
                          {imp.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Bar: Stack & Action */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {chips.slice(0, 3).map((chip, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 border border-mist/20 text-mist text-[9px] font-mono rounded-full"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-sky font-mono text-xs font-semibold group-hover:translate-x-1 transition-transform">
                      <span>GitHub</span>
                      <span>↗</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* MOBILE HORIZONTAL SCROLL-SNAP SWIPER (≤768px) */
        <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-5 py-6 mt-6 px-4 no-scrollbar">
          {PROJECTS.map((project) => {
            const outcomeInfo = WORK_OUTCOMES.find((o) => o.id === project.id);
            const chips = outcomeInfo ? outcomeInfo.chips : project.stack.slice(0, 3);
            const outcome = outcomeInfo ? outcomeInfo.outcome : project.tagline;

            return (
              <div
                key={project.id}
                onClick={() => handleActivateProject(project.github)}
                className="w-[85vw] max-w-[340px] shrink-0 snap-center p-6 bg-surface rounded-2xl border border-mist/20 shadow-md flex flex-col justify-between min-h-[360px] active:scale-95 transition-transform"
                style={{ borderTop: `4px solid ${project.accent}` }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-sky/10 text-sky text-[10px] font-mono font-bold rounded-full">
                      {project.index}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-mist">
                      {project.domain}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-ink mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-mist leading-relaxed font-medium">
                    {outcome}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-y border-mist/15 py-3 my-3">
                  {project.impact.slice(0, 3).map((imp, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-heading text-sm font-bold text-ink">
                        {imp.value}
                      </span>
                      <span className="text-[8px] font-mono text-mist leading-tight">
                        {imp.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 flex-wrap">
                    {chips.slice(0, 2).map((chip, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 border border-mist/20 text-mist text-[8px] font-mono rounded-full"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <span className="text-sky font-mono text-xs font-semibold">
                    GitHub ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
