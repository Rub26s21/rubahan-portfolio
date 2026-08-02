import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAppStore } from "@/lib/store";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabel = useAppStore((s) => s.cursorLabel);
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };

    checkTouch();
    if (isTouchDevice || reducedMotion) return;

    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        setIsVisible(true);
        gsap.to(el, { scale: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to(el, { scale: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice, reducedMotion, isVisible]);

  if (isTouchDevice || reducedMotion) return null;

  const hasLabel = cursorLabel && cursorLabel.length > 0;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full transition-all duration-300 ${
        hasLabel
          ? "bg-ink text-surface text-[10px] font-mono px-3 py-1.5 whitespace-nowrap rounded-lg shadow-lg border border-mist/20"
          : "w-2.5 h-2.5 bg-deep"
      }`}
    >
      {hasLabel && cursorLabel}
    </div>
  );
};
