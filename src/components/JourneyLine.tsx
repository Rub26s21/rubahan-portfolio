import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const JourneyLine: React.FC = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || reducedMotion || !isDesktop) return;

    const journeySection = document.getElementById("about");
    if (!journeySection) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: journeySection,
        start: "top 70%",
        end: "bottom 80%",
        scrub: 0.8,
      },
    });

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, [reducedMotion, isDesktop]);

  if (!isDesktop || reducedMotion) return null;

  return (
    <svg
      className="absolute left-1/2 -translate-x-1/2 top-10 h-[92%] w-32 pointer-events-none z-[2] hidden md:block"
      fill="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M 64 0 C 130 250 0 450 64 650 C 128 850 0 1050 64 1250 C 128 1450 0 1650 64 1850"
        stroke="#8FB3C7"
        strokeWidth="1.5"
      />
    </svg>
  );
};
