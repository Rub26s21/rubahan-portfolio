import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CAPABILITIES } from "@/lib/site-copy";
import { Cpu, Zap, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const WhatYouGet: React.FC = () => {
  useActiveSection("what-you-get");
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Split and render words for smooth inline scroll reveal
  const renderWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className="word-reveal inline-block opacity-25 text-mist transition-colors duration-300"
      >
        {word}&nbsp;
      </span>
    ));
  };

  // Word-by-word color reveal trigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const words = el.querySelectorAll(".word-reveal");
    const anim = gsap.fromTo(
      words,
      { opacity: 0.25, color: "var(--color-mist)" },
      {
        opacity: 1,
        color: "var(--color-ink)",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, [reducedMotion]);

  // Capabilities list stagger enter reveal
  useEffect(() => {
    if (reducedMotion) return;

    const anim = gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#capabilities-list",
          start: "top 80%",
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
      id="what-you-get"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-28 px-6 md:pl-72 md:pr-12 select-none z-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Giant Reveal Statement */}
        <div className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed tracking-tight text-ink mb-28 py-8">
          {renderWords("AI, web, and silicon combined — turning real problems into ")}
          <span className="inline-flex items-center px-3 py-1 bg-sky/20 border border-sky/35 rounded-full text-deep text-xs md:text-sm font-mono align-middle mx-1.5 shadow-sm transform hover:scale-105 transition-transform duration-300">
            <Cpu className="w-3.5 h-3.5 mr-1.5" /> Silicon
          </span>
          {renderWords(" systems that ")}
          <span className="inline-flex items-center px-3 py-1 bg-sky/20 border border-sky/35 rounded-full text-deep text-xs md:text-sm font-mono align-middle mx-1.5 shadow-sm transform hover:scale-105 transition-transform duration-300">
            <Zap className="w-3.5 h-3.5 mr-1.5" /> Perform
          </span>
          {renderWords(" ship, perform, and keep working.")}
        </div>

        {/* Sticky Two Column Grid */}
        <div id="capabilities-list" className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-12 md:gap-16">
          {/* Left Column (Sticky title) */}
          <div className="md:sticky md:top-28 self-start">
            <span className="font-mono text-xs uppercase tracking-widest text-deep font-semibold block mb-3">
              WHAT YOU GET
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight leading-none">
              Capabilities &<br />Integrations.
            </h2>
          </div>

          {/* Right Column (List cards) */}
          <div className="flex flex-col border-t border-mist/20">
            {CAPABILITIES.map((cap, idx) => (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="flex items-start justify-between py-6 md:py-8 border-b border-mist/10 group cursor-pointer"
              >
                <div className="max-w-md">
                  <h3 className="font-heading text-lg font-bold text-ink mb-2 group-hover:text-deep transition-colors duration-300">
                    {cap.title}
                  </h3>
                  <p className="text-xs md:text-sm text-mist leading-relaxed font-medium">
                    {cap.desc}
                  </p>
                </div>

                <div className="p-2 border border-mist/20 rounded-full text-mist group-hover:text-deep group-hover:border-deep transition-colors duration-300 ml-4 shrink-0 mt-1">
                  <ArrowRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
