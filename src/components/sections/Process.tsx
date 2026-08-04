import React, { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/site-copy";
import { SectionHeading } from "@/components/SectionHeading";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useAppStore } from "@/lib/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  useActiveSection("process");
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSteps, setActiveSteps] = useState<boolean[]>([false, false, false, false]);

  // S-Curve Line Draw & Card Activation
  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container || reducedMotion) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    // Progressively draw S-curve path
    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
        end: "bottom 70%",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          setActiveSteps([
            progress >= 0.15,
            progress >= 0.4,
            progress >= 0.65,
            progress >= 0.88,
          ]);
        },
      },
    });

    // Card Entrances (fade from left/right)
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const isRight = idx % 2 === 0;

      gsap.fromTo(
        card,
        { x: isRight ? 60 : -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-28 px-6 md:pl-72 md:pr-12 select-none z-10 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(143,179,199,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(143,179,199,0.08) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Workflow" title="How I Work" />

        <div className="relative w-full my-20 flex flex-col items-center">
          {/* Dashed S-Curve SVG Path */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-2xl h-full pointer-events-none z-0 hidden md:block"
            viewBox="0 0 600 900"
            fill="none"
          >
            <path
              ref={pathRef}
              d="M 300 0 C 550 200, 550 300, 300 450 C 50 600, 50 700, 300 900"
              stroke="#8FB3C7"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
          </svg>

          {/* 4 Hanging Tag Cards */}
          <div className="relative w-full flex flex-col gap-20 md:gap-28 z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeSteps[idx];
              const isRight = idx % 2 === 0;
              const rotationClass = idx % 2 === 0 ? "rotate-2" : "-rotate-2";

              return (
                <div
                  key={idx}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className={`w-full max-w-sm p-6 sm:p-8 rounded-2xl transition-all duration-500 shadow-lg flex flex-col justify-between relative will-change-transform ${rotationClass} ${
                    isRight ? "md:self-end md:mr-12" : "md:self-start md:ml-12"
                  } ${
                    isActive
                      ? "bg-[#38BDF8] text-white shadow-[0_0_30px_rgba(56,189,248,0.45)] border border-[#38BDF8]"
                      : "bg-surface text-ink border border-mist/20 shadow-sm"
                  }`}
                >
                  {/* Hole punch detail */}
                  <div
                    className={`w-4 h-4 rounded-full mx-auto mb-4 border ${
                      isActive ? "bg-white/30 border-white/50" : "bg-mist/10 border-mist/20"
                    }`}
                  />

                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span
                      className={`font-serif italic text-2xl md:text-3xl font-bold ${
                        isActive ? "text-white" : "text-sky"
                      }`}
                    >
                      {step.step}
                    </span>
                    <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p
                    className={`text-xs md:text-sm font-medium leading-relaxed ${
                      isActive ? "text-white/90" : "text-mist"
                    }`}
                  >
                    — {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Handwritten-style Note */}
        <div className="mt-16 text-center md:text-right">
          <span className="font-serif italic text-lg md:text-xl text-deep transform -rotate-3 inline-block">
            ready to be shipped →
          </span>
        </div>
      </div>
    </section>
  );
};
