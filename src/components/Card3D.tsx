import React, { useRef } from "react";
import gsap from "gsap";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  intensity = 15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      duration: 0.4,
      ease: "power2.out",
    });

    if (glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      gsap.to(glareRef.current, {
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 70%)`,
        opacity: 0.6,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 3D Specular Glare Reflection */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-30 opacity-0 transition-opacity"
      />
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </div>
  );
};
