import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CAPABILITIES } from "@/lib/site-copy";
import { SectionHeading } from "@/components/SectionHeading";
import { Cpu, Zap, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const WhatYouGet: React.FC = () => {
  useActiveSection("what-you-get");
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sentenceRef = useRef<HTMLParagraphElement>(null);
  const chip1Ref = useRef<HTMLSpanElement>(null);
  const chip2Ref = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hairlinesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. HEADING SKEW & OVERLOAD ENTRANCE
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { skewY: 6, scaleY: 0.8, opacity: 0 },
          {
            skewY: 0,
            scaleY: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. WORD-BY-WORD REVEAL FOR CAPABILITIES_INTRO + CHIP SCALE POPS
      if (sentenceRef.current) {
        const split = new SplitText(sentenceRef.current, { type: "words" });

        gsap.fromTo(
          split.words,
          { opacity: 0.15, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sentenceRef.current,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 0.5,
            },
          }
        );

        // Chip pops (scale 0 -> 1)
        if (chip1Ref.current && chip2Ref.current) {
          gsap.fromTo(
            [chip1Ref.current, chip2Ref.current],
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              stagger: 0.2,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: sentenceRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 3. CAPABILITY CARDS STAGGER RISE + DIVIDER HAIRLINE LEFT-TO-RIGHT DRAWS
      cardsRef.current.forEach((card, idx) => {
        const hairline = hairlinesRef.current[idx];
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: idx * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        if (hairline) {
          gsap.fromTo(
            hairline,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              delay: idx * 0.08,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="what-you-get"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-28 px-6 md:pl-72 md:pr-12 select-none z-10"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="will-change-transform">
          <SectionHeading eyebrow="Capabilities" title="What You Get?" />
        </div>

        {/* Large Statement Sentence with embedded Icon Chips */}
        <div className="my-16 p-8 md:p-12 rounded-3xl bg-surface border border-mist/20 shadow-md">
          <p
            ref={sentenceRef}
            className="font-heading font-bold text-xl sm:text-2xl md:text-4xl text-ink leading-relaxed"
          >
            I build systems where software, silicon, and AI meet — from{" "}
            <span
              ref={chip1Ref}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky/15 text-deep rounded-full text-xs md:text-sm font-mono align-middle mx-1 border border-sky/30 shadow-sm will-change-transform"
            >
              <Cpu className="w-3.5 h-3.5 md:w-4 md:h-4 text-deep" />
              <span>Silicon</span>
            </span>{" "}
            to closed-loop control, full-stack applications, and{" "}
            <span
              ref={chip2Ref}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 text-amber-600 rounded-full text-xs md:text-sm font-mono align-middle mx-1 border border-amber-500/30 shadow-sm will-change-transform"
            >
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
              <span>Perform</span>
            </span>{" "}
            autonomous AI agents.
          </p>
        </div>

        {/* Sticky Left Heading with Right Cards Column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 md:sticky md:top-28">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-3">
              Core Capabilities
            </h3>
            <p className="text-xs md:text-sm text-mist leading-relaxed font-medium">
              Five pillars defining how every build is engineered, tested, and delivered.
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col">
            {CAPABILITIES.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="group relative py-8 flex flex-col gap-3 transition-colors duration-300 cursor-pointer will-change-transform"
              >
                {/* Hairline Divider (animates scaleX 0 -> 1 from left) */}
                <div
                  ref={(el) => { hairlinesRef.current[idx] = el; }}
                  className="absolute top-0 left-0 w-full h-[1px] bg-mist/20 origin-left will-change-transform"
                />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-sky font-bold">
                      0{idx + 1}
                    </span>
                    <h4 className="font-heading text-lg md:text-xl font-bold text-ink group-hover:text-sky transition-colors duration-300">
                      {item.title}
                    </h4>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-mist/20 group-hover:border-sky group-hover:bg-sky/10 flex items-center justify-center text-mist group-hover:text-sky transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-mist leading-relaxed font-medium pl-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
