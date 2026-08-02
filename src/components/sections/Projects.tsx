import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useActiveSection } from "@/hooks/useActiveSection";
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

  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const revealRef = useRef<HTMLDivElement>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle active project click
  const handleActivateProject = (githubUrl: string) => {
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: React.KeyboardEvent, githubUrl: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivateProject(githubUrl);
    }
  };

  // Mouse move listener to track local coordinates inside the container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // BACKGROUND THEME LERPING ON ENTER & LEAVE (ScrollTrigger)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => {
        gsap.to(document.documentElement, {
          "--color-canvas": "#0B1F33",
          "--color-surface": "#0C233B",
          "--color-ink": "#FFFFFF",
          "--color-mist": "#8FB3C7",
          duration: 0.55,
          ease: "power2.out",
        });
      },
      onLeave: () => {
        gsap.to(document.documentElement, {
          "--color-canvas": "#F6FAFD",
          "--color-surface": "#FFFFFF",
          "--color-ink": "#0B1F33",
          "--color-mist": "#8FB3C7",
          duration: 0.55,
          ease: "power2.out",
        });
      },
      onEnterBack: () => {
        gsap.to(document.documentElement, {
          "--color-canvas": "#0B1F33",
          "--color-surface": "#0C233B",
          "--color-ink": "#FFFFFF",
          "--color-mist": "#8FB3C7",
          duration: 0.55,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(document.documentElement, {
          "--color-canvas": "#F6FAFD",
          "--color-surface": "#FFFFFF",
          "--color-ink": "#0B1F33",
          "--color-mist": "#8FB3C7",
          duration: 0.55,
          ease: "power2.out",
        });
      },
    });

    return () => {
      trigger.kill();
      // Reset variables on component unmount
      gsap.to(document.documentElement, {
        "--color-canvas": "#F6FAFD",
        "--color-surface": "#FFFFFF",
        "--color-ink": "#0B1F33",
        "--color-mist": "#8FB3C7",
        duration: 0.1,
      });
    };
  }, [reducedMotion]);

  // STAGGERED ROW ENTRANCE REVEAL ON SCROLL
  useEffect(() => {
    if (reducedMotion) return;

    const anim = gsap.fromTo(
      rowsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, [reducedMotion]);

  // FLOATING PANEL SCALE & POSITION TELEMETRY
  useEffect(() => {
    const el = revealRef.current;
    if (!el || reducedMotion) return;

    if (hoveredIdx !== null) {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        x: mousePos.x + 25,
        y: mousePos.y - 100,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 0.75,
        duration: 0.25,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  }, [mousePos, hoveredIdx, reducedMotion]);

  const hoveredProject = hoveredIdx !== null ? PROJECTS[hoveredIdx] : null;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-28 px-6 md:pl-72 md:pr-12 select-none z-10 transition-colors duration-300 overflow-hidden"
    >
      {/* Dynamic Cursor tracking panel */}
      <div
        ref={revealRef}
        className="absolute pointer-events-none z-30 w-60 h-40 rounded-xl overflow-hidden shadow-2xl opacity-0 scale-75 border border-white/10 hidden md:flex flex-col justify-between p-5 transition-colors duration-300"
        style={{
          backgroundColor: hoveredProject ? hoveredProject.accent : "transparent",
          top: 0,
          left: 0,
        }}
      >
        <span className="text-white/60 font-mono text-[9px] uppercase tracking-widest font-semibold">
          {hoveredProject?.domain}
        </span>
        <span className="text-white font-heading font-bold text-lg leading-snug">
          {hoveredProject?.title}
        </span>
      </div>

      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Selected Work" title="Built to Perform" />
        <p className="text-mist font-mono text-xs md:text-sm mt-4 mb-16 max-w-xl">
          AI, web, and silicon combined — turning real problems into systems that ship, perform, and keep working.
        </p>

        {/* Project rows list */}
        <div className="flex flex-col border-t border-mist/20">
          {PROJECTS.map((project, idx) => {
            const outcomeInfo = WORK_OUTCOMES.find((o) => o.id === project.id);
            const chips = outcomeInfo ? outcomeInfo.chips : project.stack.slice(0, 3);
            const outcome = outcomeInfo ? outcomeInfo.outcome : project.tagline;

            return (
              <button
                key={project.id}
                ref={(el) => { rowsRef.current[idx] = el; }}
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
                className={`w-full text-left py-6 md:py-8 border-b border-mist/20 focus:outline-none focus:bg-surface/5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 relative group cursor-pointer ${
                  hoveredIdx !== null && hoveredIdx !== idx ? "opacity-30" : "opacity-100"
                }`}
                aria-label={`Open ${project.title} on GitHub. Outcome: ${outcome}`}
              >
                {/* Number and Tech chips */}
                <div className="flex items-center gap-4 md:gap-5 flex-wrap md:flex-nowrap">
                  <span className="px-2.5 py-0.5 bg-sky/10 text-sky text-[10px] font-mono font-bold rounded-full border border-sky/20">
                    {project.index}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {chips.slice(0, 3).map((chip, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 border border-mist/20 text-mist text-[9px] font-mono rounded-full whitespace-nowrap"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title and Outcome */}
                <div className="flex-1 min-w-0 md:pl-6">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-ink leading-snug group-hover:text-sky transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-mist font-medium leading-relaxed mt-1">
                    {outcome}
                  </p>
                </div>

                {/* Action arrow */}
                <div className="flex items-center gap-2 self-start md:self-auto text-deep group-hover:text-sky transition-colors duration-300 mt-1 md:mt-0 font-mono text-xs font-semibold">
                  <span>Github</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
