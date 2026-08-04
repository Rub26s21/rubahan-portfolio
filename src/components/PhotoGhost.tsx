import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PhotoGhost: React.FC = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ghost = ghostRef.current;
    if (!ghost || reducedMotion || !isDesktop) return;

    const journeySection = document.getElementById("about");
    if (!journeySection) return;

    const ctx = gsap.context(() => {
      // Single ScrollTrigger from hero-pin end to Journey end (scrub: 1)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: journeySection,
          start: "top 80%",
          end: "bottom 85%",
          scrub: 1,
        },
      });

      // Handoff & Drift sequence: Left (4vw) -> Low-Right (64vw) -> Low-Left (4vw) -> Right (64vw) -> Fade Out after '26
      tl.fromTo(
        ghost,
        { x: 0, y: 0, opacity: 0 },
        { x: 0, y: 0, opacity: 0.45, duration: 0.15, ease: "power1.out" }
      )
        .to(ghost, { x: "60vw", y: "20vh", opacity: 0.45, ease: "none" })
        .to(ghost, { x: "0vw", y: "42vh", opacity: 0.45, ease: "none" })
        .to(ghost, { x: "60vw", y: "60vh", opacity: 0.35, ease: "none" })
        .to(ghost, { opacity: 0, y: "75vh", ease: "power1.out" });
    });

    return () => ctx.revert();
  }, [reducedMotion, isDesktop]);

  if (!isDesktop || reducedMotion) return null;

  return (
    <div
      ref={ghostRef}
      className="fixed left-[4vw] top-[25vh] w-56 h-72 rounded-2xl overflow-hidden pointer-events-none z-[1] opacity-0 border border-[#8FB3C7]/20 will-change-transform shadow-2xl"
      style={{
        filter: "blur(24px)",
        transform: "scale(0.55)",
      }}
      aria-hidden="true"
    >
      <img
        src="/photo.jpg"
        className="w-full h-full object-cover"
        alt=""
      />
    </div>
  );
};
