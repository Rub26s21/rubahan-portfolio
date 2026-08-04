import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PROJECTS } from "@/lib/data";
import { WORK_OUTCOMES } from "@/lib/site-copy";
import { SectionHeading } from "@/components/SectionHeading";
import { Card3D } from "@/components/Card3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const WorkGallery: React.FC = () => {
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

  const handleKeyDown = (e: React.KeyboardEvent, githubUrl: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivateProject(githubUrl);
    }
  };

  // DESKTOP: PINNED HORIZONTAL GALLERY (300vh pin distance)
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll distance
      const totalScrollWidth = track.scrollWidth - window.innerWidth + 320;

      // Pin timeline: vertical scroll drives track x: 0 -> -totalScrollWidth over 300vh
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300vh",
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

      // Continuous Card Center Cross Scale (1.0 vs 0.92) & Opacity (1.0 vs 0.55)
      cardsRef.current.forEach((card) => {
        if (!card) return;

        // Scale up + full opacity when approaching center
        gsap.fromTo(
          card,
          { scale: 0.92, opacity: 0.55 },
          {
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: pinTimeline,
              start: "left 80%",
              end: "center center",
              scrub: true,
            },
          }
        );

        // Scale down + lower opacity after leaving center
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: "power1.in",
          scrollTrigger: {
            trigger: card,
            containerAnimation: pinTimeline,
            start: "center center",
            end: "right 20%",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, isDesktop]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative w-full bg-[#0B1F33] text-[#F6FAFD] select-none z-10 overflow-hidden ${
        isDesktop ? "h-screen py-12 flex flex-col justify-between" : "py-24 px-6"
      }`}
    >
      {/* Soft gradient edge at section top (white -> dark fade) */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F6FAFD] to-transparent pointer-events-none z-20 opacity-20" />

      {/* Top Header - Pinned Top-Left */}
      <div className="w-full max-w-7xl mx-auto px-6 md:pl-72 md:pr-12 pt-4 relative z-10">
        <SectionHeading eyebrow="Selected Work" title="Built to Perform" />
        <p className="text-[#8FB3C7] font-mono text-xs md:text-sm mt-3 max-w-xl">
          AI, web, and silicon combined — turning real problems into systems that ship, perform, and keep working.
        </p>
      </div>

      {/* DESKTOP PINNED HORIZONTAL GALLERY TRACK */}
      {isDesktop ? (
        <div className="w-full overflow-hidden my-auto py-6 relative z-10">
          <div
            ref={trackRef}
            className="flex gap-[6vw] pl-72 pr-32 w-max items-center will-change-transform"
          >
            {PROJECTS.map((project, idx) => {
              const outcomeInfo = WORK_OUTCOMES.find((o) => o.id === project.id);
              const chips = outcomeInfo ? outcomeInfo.chips : project.stack.slice(0, 3);
              const outcome = outcomeInfo ? outcomeInfo.outcome : project.tagline;

              return (
                <Card3D key={project.id}>
                  <div
                    ref={(el) => { cardsRef.current[idx] = el; }}
                    tabIndex={0}
                    onClick={() => handleActivateProject(project.github)}
                    onKeyDown={(e) => handleKeyDown(e, project.github)}
                    onMouseEnter={() => {
                      setHoveredIdx(idx);
                      setCursorLabel("open");
                    }}
                    onMouseLeave={() => {
                      setHoveredIdx(null);
                      setCursorLabel("");
                    }}
                    className={`w-[60vw] max-w-[580px] h-[420px] p-8 bg-[#10283f] rounded-2xl border border-[#8FB3C7]/20 shadow-2xl flex flex-col justify-between transition-all duration-300 group cursor-pointer relative overflow-hidden will-change-transform focus:outline-none focus:ring-2 focus:ring-sky ${
                      hoveredIdx !== null && hoveredIdx !== idx
                        ? "opacity-40 scale-95"
                        : "opacity-100"
                    }`}
                    style={{
                      borderTop: `4px solid ${project.accent}`,
                    }}
                    aria-label={`Open ${project.title} on GitHub. Outcome: ${outcome}`}
                  >
                    {/* Top Bar: Sky Number Chip & Domain */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="px-3 py-1 bg-sky/10 text-sky text-xs font-mono font-bold rounded-full border border-sky/20">
                          {project.index}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#8FB3C7]">
                          {project.domain} · {project.year}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-[#F6FAFD] leading-snug group-hover:text-sky transition-colors duration-300 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#8FB3C7] font-medium leading-relaxed">
                        {outcome}
                      </p>
                    </div>

                    {/* Impact grid */}
                    <div className="grid grid-cols-3 gap-3 border-y border-[#8FB3C7]/15 py-4 my-2">
                      {project.impact.slice(0, 3).map((imp, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="font-heading text-base font-bold text-[#F6FAFD]">
                            {imp.value}
                          </span>
                          <span className="text-[9px] font-mono text-[#8FB3C7] leading-tight">
                            {imp.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Bar: Tag Chips & Action */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {chips.slice(0, 3).map((chip, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 border border-[#8FB3C7]/20 text-[#8FB3C7] text-[9px] font-mono rounded-full"
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
                </Card3D>
              );
            })}
          </div>
        </div>
      ) : (
        /* MOBILE SCROLL-SNAP SWIPER (≤768px) */
        <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-5 py-6 mt-6 px-4 no-scrollbar relative z-10">
          {PROJECTS.map((project) => {
            const outcomeInfo = WORK_OUTCOMES.find((o) => o.id === project.id);
            const chips = outcomeInfo ? outcomeInfo.chips : project.stack.slice(0, 3);
            const outcome = outcomeInfo ? outcomeInfo.outcome : project.tagline;

            return (
              <div
                key={project.id}
                tabIndex={0}
                onClick={() => handleActivateProject(project.github)}
                onKeyDown={(e) => handleKeyDown(e, project.github)}
                className="w-[85vw] max-w-[340px] shrink-0 snap-center p-6 bg-[#10283f] rounded-2xl border border-[#8FB3C7]/20 shadow-md flex flex-col justify-between min-h-[360px] active:scale-95 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky"
                style={{ borderTop: `4px solid ${project.accent}` }}
                aria-label={`Open ${project.title} on GitHub. Outcome: ${outcome}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-sky/10 text-sky text-[10px] font-mono font-bold rounded-full">
                      {project.index}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#8FB3C7]">
                      {project.domain}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#F6FAFD] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#8FB3C7] leading-relaxed font-medium">
                    {outcome}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-y border-[#8FB3C7]/15 py-3 my-3">
                  {project.impact.slice(0, 3).map((imp, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-heading text-sm font-bold text-[#F6FAFD]">
                        {imp.value}
                      </span>
                      <span className="text-[8px] font-mono text-[#8FB3C7] leading-tight">
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
                        className="px-2 py-0.5 border border-[#8FB3C7]/20 text-[#8FB3C7] text-[8px] font-mono rounded-full"
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

      {/* Soft gradient edge at section bottom (dark -> white fade) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F6FAFD] to-transparent pointer-events-none z-20 opacity-20" />
    </section>
  );
};
