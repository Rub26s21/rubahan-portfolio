import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import gsap from "gsap";

export const Preloader: React.FC = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const setPreloaderFinished = useAppStore((s) => s.setPreloaderFinished);
  const lenis = useSmoothScroll();

  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return false;
    if (reducedMotion) return false;
    return sessionStorage.getItem("hasSeenPreloader") !== "true";
  });

  useEffect(() => {
    if (!mounted || reducedMotion) {
      setPreloaderFinished(true);
      return;
    }

    // Lock scroll while preloader is active
    if (lenis) lenis.stop();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("hasSeenPreloader", "true");
          }
          if (lenis) lenis.start();
          setPreloaderFinished(true);
          setMounted(false);
        },
      });

      // 1. Base layer at 12% opacity (ghost)
      // 2. Sky foreground fills upward using clip-path inset(100% 0 0 0) -> inset(0% 0 0 0) over 1.6s
      tl.fromTo(
        foregroundRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.6,
          ease: "power2.inOut",
        }
      )
        // 3. Hold 0.3s
        .to({}, { duration: 0.3 })
        // 4. Shutter slide up yPercent -100 while wordmark scales 0.95 & fades
        .to(wordmarkRef.current, { scale: 0.95, opacity: 0, duration: 0.6 }, "-=0.2")
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, reducedMotion, lenis, setPreloaderFinished]);

  if (!mounted || reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#0B1F33] z-[10000] flex items-center justify-center select-none overflow-hidden"
    >
      <div ref={wordmarkRef} className="relative select-none pointer-events-none">
        {/* Base Layer: Ghost Wordmark at 12% Opacity */}
        <div className="font-heading font-bold text-[clamp(2.5rem,8vw,6rem)] text-white opacity-12 tracking-tight">
          RUBAHAN<span className="text-[#38BDF8]">.</span>
        </div>

        {/* Foreground Layer: Sky Copy Filling Upward */}
        <div
          ref={foregroundRef}
          className="absolute inset-0 font-heading font-bold text-[clamp(2.5rem,8vw,6rem)] text-[#38BDF8] tracking-tight will-change-transform"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          RUBAHAN<span className="text-[#38BDF8]">.</span>
        </div>
      </div>
    </div>
  );
};
