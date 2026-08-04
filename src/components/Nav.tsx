import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { PROFILE } from "@/lib/data";
import gsap from "gsap";

export const Nav: React.FC = () => {
  const activeSection = useAppStore((s) => s.activeSection);
  const menuOpen = useAppStore((s) => s.menuOpen);
  const setMenuOpen = useAppStore((s) => s.setMenuOpen);
  const recruiterMode = useAppStore((s) => s.recruiterMode);
  const setRecruiterMode = useAppStore((s) => s.setRecruiterMode);
  const lenis = useSmoothScroll();

  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current <= 50) {
        setNavVisible(true);
      } else if (current > lastScrollY.current) {
        setNavVisible(false); // scrolling down
      } else {
        setNavVisible(true); // scrolling up
      }
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  // Animate mobile menu open/close
  useEffect(() => {
    const el = menuSheetRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.fromTo(
        el,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.6, ease: "power4.out" }
      );
    }
  }, [menuOpen]);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "what-you-get", label: "What You Get" },
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      {/* ── MOBILE TOP BAR ── */}
      <header
        className={`w-full fixed top-0 left-0 z-40 flex items-center justify-between px-6 py-4 border-b bg-[#E1DDD3]/90 backdrop-blur-md transition-all duration-300 md:hidden ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          onClick={handleScrollToTop}
          className="font-heading font-bold text-2xl tracking-tight text-[#0B1F33] cursor-pointer"
        >
          ЯP
        </button>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="px-4 py-1.5 bg-[#CCFF00] text-[#0B1F33] font-bold rounded-full text-xs transition-all duration-300 cursor-pointer"
          >
            Let's Talk
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-black/10 rounded-full text-[#0B1F33] transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU SHEET ── */}
      {menuOpen && (
        <div
          ref={menuSheetRef}
          className="fixed inset-0 w-screen h-screen bg-[#E1DDD3] z-50 flex flex-col justify-between p-8 md:hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <span className="font-heading font-bold text-2xl tracking-tight text-[#0B1F33]">
              ЯP
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-black/10 rounded-full text-[#0B1F33] transition-all cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4 py-8">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`text-left text-3xl font-heading font-bold tracking-tight transition-colors cursor-pointer ${
                    active ? "text-[#88A000]" : "text-[#0B1F33]/70"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Footer inside mobile sheet */}
          <div className="flex flex-col gap-6">
            {/* Recruiter Mode Toggle */}
            <div className="flex items-center justify-between border border-black/10 rounded-full px-5 py-2.5 bg-white/40">
              <span className="text-sm font-mono text-[#0B1F33] font-semibold">
                Recruiter Mode
              </span>
              <button
                onClick={() => {
                  setRecruiterMode(!recruiterMode);
                  setMenuOpen(false);
                }}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                  recruiterMode ? "bg-[#88A000]" : "bg-black/20"
                }`}
                aria-label="Toggle Recruiter Mode"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-all absolute top-0.5 ${
                    recruiterMode ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            <a
              href="/Rubahan-P-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 bg-white/50 text-[#0B1F33] border border-black/10 rounded-full text-sm font-semibold transition-all cursor-pointer"
            >
              Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </>
  );
};
