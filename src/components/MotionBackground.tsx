import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const MotionBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Floating ambient spheres with yoyo drifting
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: "-40px",
          x: "25px",
          rotation: 45,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: "50px",
          x: "-30px",
          rotation: -35,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          y: "-30px",
          x: "-40px",
          scale: 1.15,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 3D Ambient Glowing Sky Orb 1 */}
      <div
        ref={orb1Ref}
        className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-gradient-to-tr from-[#38BDF8]/15 via-[#7DD3FC]/10 to-transparent blur-3xl opacity-60"
      />

      {/* 3D Ambient Glowing Orb 2 */}
      <div
        ref={orb2Ref}
        className="absolute top-[55%] right-[8%] w-96 h-96 rounded-full bg-gradient-to-bl from-[#0EA5E9]/15 via-[#38BDF8]/10 to-transparent blur-3xl opacity-50"
      />

      {/* 3D Ambient Glowing Orb 3 */}
      <div
        ref={orb3Ref}
        className="absolute top-[80%] left-[20%] w-80 h-80 rounded-full bg-gradient-to-tr from-[#7DD3FC]/12 via-[#38BDF8]/8 to-transparent blur-3xl opacity-40"
      />
    </div>
  );
};
