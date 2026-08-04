import React, { useEffect, useRef } from "react";
import { SERVICES, CTA_COPY } from "@/lib/site-copy";
import { PROFILE } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Magnetic } from "@/components/Magnetic";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useAppStore } from "@/lib/store";
import { Check, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Services: React.FC = () => {
  useActiveSection("services");
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaBandRef = useRef<HTMLDivElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. THE 3 SERVICE CARDS CONVERGE (120ms stagger)
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        let initialX = 0;
        if (idx === 0) initialX = -80;
        if (idx === 2) initialX = 80;

        gsap.fromTo(
          card,
          { x: initialX, y: 80, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.85,
            delay: idx * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2. CTA BAND LINE-BY-LINE UNMASK
      if (ctaTitleRef.current) {
        const split = new SplitText(ctaTitleRef.current, {
          type: "lines",
          linesClass: "line-mask",
        });

        gsap.fromTo(
          split.lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ctaBandRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
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
          Focused engineering offers with zero fluff — built for teams, clubs, and projects that need results.
        </p>

        {/* 3 Convergent Services Decks (120ms Stagger) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {SERVICES.map((service, idx) => {
            const isFree = service.price === "Free";

            return (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="group relative p-6 md:p-8 rounded-2xl bg-surface border border-mist/20 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-sky/50 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer will-change-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-sky">
                      0{idx + 1}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold border ${
                        isFree
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                          : "bg-sky/10 text-deep border-sky/30"
                      }`}
                    >
                      {service.price}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-ink mb-4 group-hover:text-sky transition-colors duration-300">
                    {service.title}
                  </h3>

                  <ul className="flex flex-col gap-2.5 mb-6">
                    {service.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-mist leading-relaxed font-medium">
                        <Check className="w-3.5 h-3.5 text-sky shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-serif italic text-mist mb-6 border-t border-mist/10 pt-4">
                    {service.audience}
                  </p>

                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="w-full py-2.5 px-4 bg-canvas hover:bg-sky hover:text-ink border border-mist/20 rounded-full text-xs font-semibold font-mono text-ink text-center flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Get in Touch</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* FULL-BLEED STATEMENT CTA BAND (width: 100vw; margin-inline: calc(50% - 50vw)) */}
        <div
          ref={ctaBandRef}
          className="bg-[#0B1F33] text-surface py-20 px-6 md:pl-72 md:pr-12 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl overflow-hidden relative"
          style={{
            width: "100vw",
            marginInline: "calc(50% - 50vw)",
          }}
        >
          <div className="max-w-2xl text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-mist mb-4 block font-semibold">
              Get In Touch
            </span>
            <h3
              ref={ctaTitleRef}
              className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-bold text-white leading-[0.95] tracking-tight will-change-transform"
            >
              {CTA_COPY.line}
            </h3>
          </div>

          <div className="shrink-0">
            <Magnetic>
              <a
                href={`mailto:${PROFILE.email}`}
                className="px-10 py-5 bg-sky text-ink font-heading font-bold text-xl md:text-2xl rounded-full transition-all duration-300 shadow-2xl cursor-pointer block hover:bg-[#FFB86B] hover:text-ink hover:scale-105"
              >
                {CTA_COPY.button}
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
};
