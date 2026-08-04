import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { JOURNEY_CARDS } from "@/lib/site-copy";
import { SectionHeading } from "@/components/SectionHeading";
import { JourneyLine } from "@/components/JourneyLine";
import { useActiveSection } from "@/hooks/useActiveSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Journey: React.FC = () => {
  useActiveSection("about");
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const isDesktop = useMediaQuery("(min-width: 769px)");

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const yearsRef = useRef<(HTMLDivElement | null)[]>([]);
  const footersRef = useRef<(HTMLDivElement | null)[]>([]);

  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (idx: number) => {
    setImageErrors((prev) => ({ ...prev, [idx]: true }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedCardIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // CARDS ZIGZAG + CRISS-CROSS PARALLAX YEARS + DELAYED FOOTER POPS (+0.15s)
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      JOURNEY_CARDS.forEach((_, idx) => {
        const card = cardsRef.current[idx];
        const year = yearsRef.current[idx];
        const footer = footersRef.current[idx];
        if (!card) return;

        const isOdd = idx % 2 === 0;

        if (isDesktop) {
          // Desktop entrance: x: ±120, rotate: ±4deg -> 0
          const initialX = isOdd ? -120 : 120;
          const initialRot = isOdd ? -4 : 4;
          const yearInitialX = isOdd ? 140 : -140;

          gsap.fromTo(
            card,
            { x: initialX, rotate: initialRot, opacity: 0 },
            {
              x: 0,
              rotate: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "top 55%",
                scrub: 0.8,
              },
            }
          );

          // Criss-cross parallax year numeral (opposite direction + slower y-parallax)
          if (year) {
            gsap.fromTo(
              year,
              { x: yearInitialX, y: 30, opacity: 0.2 },
              {
                x: isOdd ? -60 : 60,
                y: -30,
                opacity: 0.75,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 95%",
                  end: "bottom 25%",
                  scrub: 0.8,
                },
              }
            );
          }
        } else {
          // Mobile entrance: single-column alternate sides ±40px, NO rotation
          const mobileX = isOdd ? -40 : 40;
          gsap.fromTo(
            card,
            { x: mobileX, rotate: 0, opacity: 0 },
            {
              x: 0,
              rotate: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 65%",
                scrub: 0.6,
              },
            }
          );
        }

        // Card footer pops ~0.15s after card body
        if (footer) {
          gsap.fromTo(
            footer,
            { scale: 0.85, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              ease: "back.out(1.6)",
              scrollTrigger: {
                trigger: card,
                start: "top 72%",
                end: "top 45%",
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, isDesktop]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-28 px-6 md:pl-72 md:pr-12 select-none z-10 overflow-hidden"
    >
      {/* Heading */}
      <SectionHeading
        eyebrow="About Me"
        title="About Me (&) My Journey"
        className="max-w-4xl mx-auto mb-24 relative z-10"
      />

      <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-32 md:gap-40 z-10">
        {/* Thin Curved SVG Connector Path Component (1.5px, #8FB3C7) */}
        <JourneyLine />

        {/* Journey Timeline Cards */}
        {JOURNEY_CARDS.map((card, idx) => {
          const expanded = expandedCardIndex === idx;

          return (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className={`relative flex flex-col gap-4 p-6 md:p-8 bg-surface border border-mist/20 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-lg z-10 will-change-transform ${
                idx % 2 === 0 ? "md:self-start" : "md:self-end"
              }`}
            >
              {/* GIANT SKY DISPLAY YEAR NUMERAL (clamp(6rem, 18vw, 16rem)) */}
              <div
                ref={(el) => { yearsRef.current[idx] = el; }}
                className={`absolute -top-20 md:-top-28 font-heading font-bold text-[clamp(6rem,18vw,16rem)] text-sky leading-none select-none z-0 pointer-events-none opacity-75 tracking-tighter will-change-transform ${
                  idx % 2 === 0 ? "-left-6 md:-left-12" : "-right-6 md:-right-12"
                }`}
              >
                {card.year}
              </div>

              {/* Card Contents */}
              <div className="relative z-10">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-ink mb-2">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-mist leading-relaxed font-medium">
                  {card.teaser}
                </p>

                {/* Inline Expansion Block */}
                <CardExpansion
                  expanded={expanded}
                  story={card.story}
                  photo={card.photo}
                  hasImageError={imageErrors[idx] || false}
                  onImageError={() => handleImageError(idx)}
                />

                {/* Card footer (Pops ~0.15s after card body) */}
                <div
                  ref={(el) => { footersRef.current[idx] = el; }}
                  className="flex items-center gap-3 border-t border-mist/10 pt-4 mt-6 will-change-transform"
                >
                  <img
                    src="/photo.jpg"
                    className="w-8 h-8 rounded-full object-cover border border-mist/15"
                    alt=""
                  />
                  <div className="flex flex-col text-[10px] font-mono text-mist leading-tight">
                    <span className="text-ink font-semibold">{card.handle}</span>
                    <span>{card.timeAgo}</span>
                  </div>

                  <button
                    onClick={() => setExpandedCardIndex(expanded ? null : idx)}
                    className="ml-auto px-4 py-1.5 rounded-full bg-canvas hover:bg-sky/25 border border-mist/10 text-xs font-semibold text-deep hover:text-ink transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-deep/50"
                    aria-expanded={expanded}
                  >
                    {expanded ? "Show less" : "Read more"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

interface CardExpansionProps {
  expanded: boolean;
  story: string;
  photo: string;
  hasImageError: boolean;
  onImageError: () => void;
}

const CardExpansion: React.FC<CardExpansionProps> = ({
  expanded,
  story,
  photo,
  hasImageError,
  onImageError,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.to(gridRef.current, {
      gridTemplateRows: expanded ? "1.0fr" : "0.0fr",
      duration: 0.55,
      ease: "power3.out",
    });
  }, [expanded]);

  return (
    <div
      ref={gridRef}
      className="grid transition-all duration-500 ease-out"
      style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <div className="pt-4 flex flex-col gap-4">
          <p className="text-xs md:text-sm text-mist leading-relaxed font-medium">
            {story}
          </p>

          {!hasImageError && (
            <div className="w-full h-48 rounded-xl overflow-hidden bg-mist/10 border border-mist/10">
              <img
                src={photo}
                onError={onImageError}
                className="w-full h-full object-cover"
                alt="Story illustration"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
