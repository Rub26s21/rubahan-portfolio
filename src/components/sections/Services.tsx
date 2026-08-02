import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SERVICES } from "@/lib/site-copy";
import { PROFILE } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Magnetic } from "@/components/Magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
  useActiveSection("services");
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Services stagger load trigger
  useEffect(() => {
    if (reducedMotion) return;

    const anim = gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
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

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-28 px-6 md:pl-72 md:pr-12 select-none z-10"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Services" title="Solutions That Deliver" />
        <p className="text-mist font-mono text-xs md:text-sm mt-4 mb-16 max-w-xl">
          Clean engineering packages scoped to save time, ship fast, and integrate cleanly.
        </p>

        {/* Services Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="bg-surface border border-mist/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:-translate-y-2 hover:border-sky/50 hover:shadow-lg hover:shadow-sky/5 transition-all duration-300 relative z-10"
            >
              <div>
                <div className="flex justify-between items-center gap-4 mb-6">
                  <h3 className="font-heading text-lg font-bold text-ink leading-tight">
                    {service.title}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-sky/10 border border-sky/35 rounded-full text-deep text-[10px] font-mono font-bold shrink-0">
                    {service.price}
                  </span>
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-mist font-medium leading-relaxed">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 text-deep shrink-0 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] text-mist/85 italic mb-6 border-t border-mist/10 pt-4 font-mono leading-relaxed">
                  {service.audience}
                </p>

                <a
                  href={`mailto:${PROFILE.email}?subject=Interested in ${service.title}`}
                  className="w-full flex items-center justify-center py-2.5 bg-canvas border border-mist/25 hover:border-deep hover:bg-sky text-ink rounded-full text-xs font-bold transition-all duration-300 text-center cursor-pointer shadow-sm hover:scale-[1.02]"
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA BAND ── */}
        <div className="w-full bg-[#0B1F33] text-white rounded-3xl p-12 md:p-16 flex flex-col items-center justify-center gap-8 mt-24 shadow-2xl relative overflow-hidden">
          {/* Subtle overlay glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-sky)/10_0%,transparent_60%)] pointer-events-none" />

          <span className="font-mono text-[10px] uppercase tracking-widest text-sky font-bold z-10">
            HAVE SOMETHING IN MIND?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-center tracking-tight leading-none max-w-xl z-10">
            Let's build something that performs.
          </h2>

          <div className="mt-4 z-10">
            <Magnetic>
              <a
                href={`mailto:${PROFILE.email}`}
                className="px-10 py-4.5 bg-sky text-[#0B1F33] hover:bg-[#FFB86B] hover:text-[#0B1F33] rounded-full text-base font-bold transition-all duration-300 shadow-xl cursor-pointer block text-center min-w-[180px] hover:scale-105"
              >
                Let's Talk
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
};
