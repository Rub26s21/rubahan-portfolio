import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useActiveSection } from "@/hooks/useActiveSection";
import { LEADERSHIP } from "@/lib/data";
import { TESTIMONIALS } from "@/lib/site-copy";
import { SectionHeading } from "@/components/SectionHeading";
import { useDrag } from "@use-gesture/react";
import gsap from "gsap";

export const Recognition: React.FC = () => {
  useActiveSection("what-you-get"); // Highlight 'What You Get' area since Recognition is a subsegment of it or adjacent
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const setCursorLabel = useAppStore((s) => s.setCursorLabel);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = TESTIMONIALS.length > 0 ? TESTIMONIALS : LEADERSHIP;
  const cardsCount = carouselData.length;

  const getCardWidth = () => {
    const el = carouselRef.current;
    if (!el) return 0;
    const firstChild = el.children[0] as HTMLElement;
    return firstChild ? firstChild.offsetWidth : 0;
  };

  // Helper to snap to target slide index
  const snapTo = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const width = getCardWidth();
    gsap.to(el, {
      x: -index * (width + 24), // card width + gap-6
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    snapTo(currentIndex);
  }, [currentIndex]);

  // Recalibrate on resize
  useEffect(() => {
    const handleResize = () => {
      snapTo(currentIndex);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  // Click to advance handler
  const handleCardClick = (idx: number) => {
    if (idx === currentIndex) {
      setCurrentIndex((prev) => (prev + 1) % cardsCount);
    } else {
      setCurrentIndex(idx);
    }
  };

  // Bind drag gesture
  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx] }) => {
      if (reducedMotion || !carouselRef.current) return;
      const width = getCardWidth();
      const step = width + 24;

      if (active) {
        gsap.set(carouselRef.current, {
          x: -currentIndex * step + mx,
        });
      } else {
        const threshold = step / 3.5;
        // Swipe forward or backward
        if (mx < -threshold || (mx < -20 && vx > 0.4)) {
          if (currentIndex < cardsCount - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            snapTo(currentIndex);
          }
        } else if (mx > threshold || (mx > 20 && vx > 0.4)) {
          if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
          } else {
            snapTo(currentIndex);
          }
        } else {
          snapTo(currentIndex);
        }
      }
    },
    { filterTaps: true, pointer: { touch: true } }
  );

  return (
    <section className="relative w-full bg-canvas py-20 px-6 md:pl-72 md:pr-12 select-none z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Recognition" title="Leadership &Symposiums" />
        <p className="text-mist font-mono text-xs md:text-sm mt-4 mb-16 max-w-xl">
          Taking ownership on campus — from student ambassador roles to symposia operations and technical sprints.
        </p>

        {/* Carousel Viewport Wrapper */}
        <div
          className="relative overflow-visible cursor-grab active:cursor-grabbing w-full touch-pan-y"
          onMouseEnter={() => setCursorLabel("drag")}
          onMouseLeave={() => setCursorLabel("")}
        >
          {/* Draggable track */}
          <div
            {...bind()}
            ref={carouselRef}
            className="flex gap-6 w-max select-none"
            style={{ touchAction: "pan-y" }}
          >
            {carouselData.map((item, idx) => {
              const isActive = idx === currentIndex;
              const isTestimonial = "quote" in item;

              return (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  onMouseEnter={() => setCursorLabel("click")}
                  onMouseLeave={() => setCursorLabel("drag")}
                  className={`w-[84vw] sm:w-[480px] md:w-[580px] p-6 md:p-8 rounded-2xl bg-surface border border-mist/20 shadow-sm text-left transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-deep/50 block cursor-pointer select-none ${
                    isActive ? "opacity-100 scale-100" : "opacity-40 scale-95"
                  }`}
                  style={{ userSelect: "none" }}
                >
                  {isTestimonial ? (
                    /* Testimonial Mode */
                    <div className="flex flex-col justify-between h-full min-h-[160px]">
                      <p className="font-heading text-lg md:text-xl font-medium text-ink italic leading-relaxed mb-6">
                        “{(item as any).quote}”
                      </p>
                      <div className="border-t border-mist/10 pt-4 mt-auto flex items-center justify-between">
                        <div>
                          <span className="font-heading font-bold text-ink text-sm block">
                            {(item as any).name}
                          </span>
                          <span className="font-mono text-[10px] text-mist">
                            {(item as any).role}
                          </span>
                        </div>
                        {(item as any).link && (
                          <a
                            href={(item as any).link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-deep hover:underline font-mono"
                          >
                            Verify ↗
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Leadership Mode */
                    <div className="flex flex-col justify-between h-full min-h-[160px]">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-heading text-lg font-bold text-ink">
                            {(item as any).role}
                          </h3>
                          <span className="px-2.5 py-0.5 bg-sky/10 border border-sky/35 rounded-full text-deep text-[10px] font-mono shrink-0">
                            {(item as any).period}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-mist leading-relaxed font-medium mb-4">
                          {(item as any).summary}
                        </p>
                      </div>

                      {(item as any).points && (
                        <ul className="flex flex-col gap-1.5 border-t border-mist/10 pt-4 mt-auto">
                          {(item as any).points.map((pt: string, i: number) => (
                            <li key={i} className="text-[11px] text-mist font-medium flex items-start gap-2">
                              <span className="text-deep font-bold leading-none mt-0.5">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Elongated pagination dots */}
        <div className="flex items-center gap-2 mt-10">
          {carouselData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              onMouseEnter={() => setCursorLabel("click")}
              onMouseLeave={() => setCursorLabel("")}
              className={`h-2 rounded-full bg-sky transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? "w-8 opacity-100" : "w-2 opacity-35 hover:opacity-75"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
