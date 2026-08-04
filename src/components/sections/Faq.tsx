import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { FAQ_ITEMS } from "@/lib/site-copy";
import { PROFILE } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { useActiveSection } from "@/hooks/useActiveSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Faq: React.FC = () => {
  useActiveSection("faq");
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // STAGGER ENTRANCE FOR FAQ ITEMS
  useEffect(() => {
    const list = listRef.current;
    if (!list || reducedMotion) return;

    const ctx = gsap.context(() => {
      const items = Array.from(list.children) as HTMLElement[];
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-28 px-6 md:pl-72 md:pr-12 select-none z-10"
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="FAQ" title="Got any questions?" />
        <p className="text-mist font-mono text-xs md:text-sm mt-4 mb-16 max-w-xl">
          Quick answers to common questions about workflows, turnaround times, and custom builds.
        </p>

        {/* Accordion List */}
        <div ref={listRef} className="flex flex-col border-t border-mist/20">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            const isLast = idx === FAQ_ITEMS.length - 1;

            return (
              <AccordionItem
                key={idx}
                isOpen={isOpen}
                question={item.q}
                answer={item.a}
                isLastItem={isLast}
                onToggle={() => toggleAccordion(idx)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface AccordionItemProps {
  isOpen: boolean;
  question: string;
  answer: string;
  isLastItem: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  isOpen,
  question,
  answer,
  isLastItem,
  onToggle,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.to(gridRef.current, {
      gridTemplateRows: isOpen ? "1.0fr" : "0.0fr",
      duration: 0.45,
      ease: "power2.out",
    });
  }, [isOpen]);

  const renderAnswerText = () => {
    if (isLastItem) {
      return (
        <span>
          No stress. Email me at{" "}
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-deep font-bold hover:underline cursor-pointer"
          >
            {PROFILE.email}
          </a>{" "}
          and tell me what you have in mind.
        </span>
      );
    }
    return answer;
  };

  return (
    <div className="border-b border-mist/10 will-change-transform">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between gap-6 text-left focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-heading text-base md:text-lg font-bold text-ink group-hover:text-deep transition-colors duration-300">
          {question}
        </span>

        <div className="w-8 h-8 rounded-full border border-mist/20 group-hover:border-deep group-hover:bg-sky/10 flex items-center justify-center text-mist group-hover:text-deep transition-all duration-300 shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 transform transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      <div
        ref={gridRef}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pr-12 text-xs md:text-sm text-mist leading-relaxed font-medium">
            {renderAnswerText()}
          </div>
        </div>
      </div>
    </div>
  );
};
