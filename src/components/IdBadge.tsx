import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDrag } from "@use-gesture/react";
import gsap from "gsap";

export const IdBadge: React.FC = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const cardRef = useRef<HTMLDivElement>(null);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || reducedMotion || !isDesktop) return;

    // Gentle idle pendulum swing (gsap, rotation ±2.5deg, yoyo, ~3s)
    idleTweenRef.current = gsap.to(card, {
      rotate: 2.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      transformOrigin: "top center",
    });

    return () => {
      if (idleTweenRef.current) idleTweenRef.current.kill();
    };
  }, [reducedMotion, isDesktop]);

  const bind = useDrag(
    ({ active, movement: [mx] }) => {
      const card = cardRef.current;
      if (!card || reducedMotion) return;

      if (active) {
        if (idleTweenRef.current) idleTweenRef.current.pause();
        const rot = Math.min(Math.max(-3 + mx * 0.15, -25), 25);
        gsap.set(card, { rotate: rot });
      } else {
        // Release: settles back with elastic ease and resumes idle pendulum swing
        gsap.to(card, {
          rotate: -2.5,
          duration: 1.4,
          ease: "elastic.out(1, 0.4)",
          onComplete: () => {
            if (idleTweenRef.current) idleTweenRef.current.play();
          },
        });
      }
    },
    { pointer: { touch: true } }
  );

  if (!isDesktop) return null;

  return (
    <div className="relative flex flex-col items-center select-none z-20 pointer-events-auto">
      {/* Lanyard Strap + Metal Clip */}
      <div className="w-6 h-28 bg-[#0B1F33] rounded-t-sm flex flex-col items-center justify-between border-x border-[#38BDF8]/20 shadow-md relative overflow-hidden">
        {/* Repeating RUBAHAN lanyard text */}
        <div className="text-[7px] font-mono text-[#38BDF8] tracking-widest rotate-90 whitespace-nowrap opacity-75 mt-2">
          RUBAHAN • RUBAHAN • RUBAHAN
        </div>

        {/* Metallic Clip */}
        <div className="w-8 h-4 bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 rounded-sm border border-gray-400 shadow-sm z-10" />
      </div>

      {/* Conference Pass Badge Card */}
      <div
        {...bind()}
        ref={cardRef}
        className="w-[200px] h-[300px] p-5 bg-white text-[#0B1F33] rounded-2xl shadow-2xl border border-gray-200 flex flex-col justify-between cursor-grab active:cursor-grabbing will-change-transform relative"
        style={{
          transform: "rotate(-3deg)",
          transformOrigin: "top center",
          touchAction: "none",
        }}
      >
        {/* Hole punch detail */}
        <div className="w-6 h-2 bg-gray-200 rounded-full mx-auto mb-2 border border-gray-300 shadow-inner" />

        {/* Sky Accent Bar */}
        <div className="w-full h-1.5 bg-[#38BDF8] rounded-full mb-3" />

        {/* Photo */}
        <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-2 border-2 border-[#38BDF8]/30 shadow-md">
          <img
            src="/photo.jpg"
            alt="Rubahan P"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Role */}
        <div className="text-center">
          <h4 className="font-heading font-bold text-base text-[#0B1F33] tracking-tight">
            RUBAHAN P
          </h4>
          <span className="font-mono text-[9px] font-bold text-[#0EA5E9] block mt-0.5">
            AI · FULL-STACK · EMBEDDED
          </span>
        </div>

        {/* Fake Barcode Detail */}
        <div className="mt-auto border-t border-gray-200 pt-2 flex flex-col items-center">
          <div className="flex gap-1 h-5 items-center">
            <div className="w-1 h-4 bg-black" />
            <div className="w-0.5 h-4 bg-black" />
            <div className="w-1.5 h-4 bg-black" />
            <div className="w-0.5 h-4 bg-black" />
            <div className="w-2 h-4 bg-black" />
            <div className="w-0.5 h-4 bg-black" />
            <div className="w-1 h-4 bg-black" />
            <div className="w-1.5 h-4 bg-black" />
            <div className="w-0.5 h-4 bg-black" />
          </div>
          <span className="font-mono text-[8px] text-gray-400 mt-0.5">
            #RP-2026-CONF-PASS
          </span>
        </div>
      </div>
    </div>
  );
};
