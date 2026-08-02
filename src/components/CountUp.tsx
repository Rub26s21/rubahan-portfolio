import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1.5,
  suffix = "",
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const [val, setVal] = useState(reducedMotion ? end : 0);

  useEffect(() => {
    if (reducedMotion) {
      setVal(end);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };
    const anim = gsap.to(obj, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setVal(Math.floor(obj.value));
      },
    });

    return () => {
      anim.kill();
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
    };
  }, [end, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
};
