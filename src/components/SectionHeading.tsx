import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useAppStore } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const eyebrowEl = eyebrowRef.current;
    const titleEl = titleRef.current;
    if (!container || !eyebrowEl || !titleEl) return;

    const split = new SplitText(titleEl, {
      type: "lines,words",
      linesClass: "line-mask",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      eyebrowEl,
      { letterSpacing: "0.1em", opacity: 0 },
      { letterSpacing: "0.25em", opacity: 1, duration: 1.0, ease: "power2.out" }
    );

    tl.fromTo(
      split.words,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.85, ease: "power4.out", stagger: 0.035 },
      "-=0.7"
    );

    return () => {
      split.revert();
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 ${className}`}>
      <span
        ref={eyebrowRef}
        className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-deep font-semibold mb-1 block"
      >
        {eyebrow}
      </span>
      <h2
        ref={titleRef}
        className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-bold text-ink leading-[0.95] tracking-tight"
      >
        {title}
      </h2>
    </div>
  );
};
