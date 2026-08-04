import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { PROFILE } from "@/lib/data";
import { EmailPill } from "@/components/EmailPill";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const footerRef = useRef<HTMLElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [time, setTime] = useState("");

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GIANT RUBAHAN LETTER ROLL-UP ANIMATION
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lettersRef.current,
        { yPercent: 125, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.07,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: footer,
            start: "bottom 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const nameChars = "RUBAHAN".split("");

  return (
    <footer
      ref={footerRef}
      className="w-full bg-canvas border-t border-mist/10 pt-20 select-none z-10 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:pl-72 md:pr-12">
        {/* Row 1: Contacts & Links */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 pb-12">
          <EmailPill />

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-surface hover:bg-sky/20 border border-mist/20 rounded-full text-mist hover:text-deep transition-all duration-300 cursor-pointer"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-surface hover:bg-sky/20 border border-mist/20 rounded-full text-mist hover:text-deep transition-all duration-300 cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-surface hover:bg-sky/20 border border-mist/20 rounded-full text-mist hover:text-deep transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href="/Rubahan-P-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-deep hover:text-ink underline underline-offset-4 decoration-deep/40 hover:decoration-ink transition-all cursor-pointer"
            >
              Resume (PDF)
            </a>
          </div>
        </div>

        {/* Row 2: Location, Time & Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-mist/10 py-8 text-[11px] font-mono text-mist">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 md:gap-2 text-center md:text-left">
            <span>Palani, TN, India</span>
            <span className="opacity-50">•</span>
            <span>10.4524°N 77.5152°E</span>
            <span className="opacity-50">•</span>
            <span className="text-ink font-semibold">{time} IST</span>
          </div>

          <div className="text-center md:text-right">
            <span>&copy; 2026 Rubahan P. Designed & built by Antigravity.</span>
          </div>
        </div>
      </div>

      {/* Giant Monogram Title in footer (Letter Roll-Up) */}
      <div className="w-full text-center overflow-hidden font-heading font-bold text-[15vw] leading-none text-sky/15 uppercase tracking-tighter pointer-events-none mt-10 flex justify-center items-center select-none">
        {nameChars.map((char, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-2">
            <span
              ref={(el) => { lettersRef.current[idx] = el; }}
              className="inline-block will-change-transform"
            >
              {char}
            </span>
          </span>
        ))}
      </div>
    </footer>
  );
};
