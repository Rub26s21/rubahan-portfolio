import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TextAnimationProps {
  children: React.ReactNode;
  className?: string;
  type?: "words" | "lines" | "chars";
  delay?: number;
}

export const TextAnimation: React.FC<TextAnimationProps> = ({
  children,
  className = "",
  type = "words",
  delay = 0,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(el, {
        type: type === "chars" ? "chars,words" : type === "lines" ? "lines,words" : "words",
        wordsClass: "inline-block will-change-transform",
      });

      const targets = type === "chars" ? split.chars : type === "lines" ? split.lines : split.words;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 18, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.03,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [type, delay]);

  return (
    <div ref={textRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};
