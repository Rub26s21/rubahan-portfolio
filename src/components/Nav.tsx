import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { PROFILE } from "@/lib/data";
import { Magnetic } from "@/components/Magnetic";

// Inline Brand Icons
const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Nav: React.FC = () => {
  const activeSection = useAppStore((s) => s.activeSection);
  const menuOpen = useAppStore((s) => s.menuOpen);
  const setMenuOpen = useAppStore((s) => s.setMenuOpen);
  const recruiterMode = useAppStore((s) => s.recruiterMode);
  const setRecruiterMode = useAppStore((s) => s.setRecruiterMode);
  const lenis = useSmoothScroll();

  const [showStickySidebar, setShowStickySidebar] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const threshold = window.innerHeight * 0.45;

      // Show sticky left sidebar once scrolled into section content
      setShowStickySidebar(current > threshold);

      if (current <= 50) {
        setNavVisible(true);
      } else if (current > lastScrollY) {
        setNavVisible(false); // scrolling down
      } else {
        setNavVisible(true); // scrolling up
      }
      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const navItems = [
    { id: "hero", label: "HOME" },
    { id: "about", label: "ABOUT ME" },
    { id: "projects", label: "PROJECTS" },
    { id: "what-you-get", label: "WHAT YOU GET" },
    { id: "services", label: "SERVICES" },
    { id: "process", label: "PROCESS" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      {/* ── DESKTOP STICKY LEFT SIDEBAR (Animates in smoothly on scroll) ── */}
      <AnimatePresence>
        {showStickySidebar && (
          <motion.aside
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 h-screen fixed left-0 top-0 z-50 flex flex-col justify-between p-6 border-r border-black/10 bg-[#E1DDD3]/95 backdrop-blur-2xl text-[#0B1F33] hidden md:flex shadow-2xl font-mono text-xs select-none"
          >
            {/* Top Branding & Docked Mini Stat Cards */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleScrollToTop}
                className="font-heading font-extrabold text-xl tracking-wider text-[#0B1F33] hover:text-[#38BDF8] transition-colors text-left flex items-center justify-between border-b border-black/10 pb-3 cursor-pointer"
              >
                <span>RUBAHAN<span className="text-[#38BDF8] text-xs ml-0.5">®</span></span>
                <span className="text-[9px] text-[#0B1F33]/60 font-bold uppercase tracking-widest">
                  PORTFOLIO
                </span>
              </button>

              {/* Docked Mini Stat Cards */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded-xl bg-white/50 border border-black/10 flex flex-col items-center justify-center text-center">
                  <span className="font-heading font-bold text-sm text-[#38BDF8]">5+</span>
                  <span className="text-[9px] text-[#0B1F33]/70 font-bold uppercase tracking-tight">Projects</span>
                </div>
                <div className="p-2 rounded-xl bg-white/50 border border-black/10 flex flex-col items-center justify-center text-center">
                  <span className="font-heading font-bold text-sm text-[#38BDF8]">3+</span>
                  <span className="text-[9px] text-[#0B1F33]/70 font-bold uppercase tracking-tight">Years Exp</span>
                </div>
              </div>
            </div>

            {/* Vertical Scroll-Spy Navigation Links with Glowing Active Dot */}
            <nav className="flex flex-col gap-1 py-2 my-auto">
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-[#38BDF8]/20 text-[#0B1F33] border border-[#38BDF8]/40 shadow-sm"
                        : "text-[#0B1F33]/70 hover:text-[#0B1F33] hover:bg-black/5"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        active ? "bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" : "bg-black/20"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Bottom Actions & Pinned Controls */}
            <div className="flex flex-col gap-3 pt-3 border-t border-black/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/40 hover:bg-[#38BDF8] border border-black/10 rounded-full text-[#0B1F33] hover:text-white transition-all duration-300 cursor-pointer"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/40 hover:bg-[#38BDF8] border border-black/10 rounded-full text-[#0B1F33] hover:text-white transition-all duration-300 cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={PROFILE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/40 hover:bg-[#38BDF8] border border-black/10 rounded-full text-[#0B1F33] hover:text-white transition-all duration-300 cursor-pointer"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                </div>

                <a
                  href="/Rubahan-P-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[#38BDF8] hover:text-[#0B1F33] font-bold underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Resume
                </a>
              </div>

              {/* Recruiter Mode Toggle */}
              <div className="flex items-center justify-between border-t border-black/10 pt-2.5">
                <span className="text-[10px] font-mono text-[#0B1F33]/70 font-bold uppercase tracking-wider">
                  Recruiter Mode
                </span>
                <button
                  onClick={() => setRecruiterMode(!recruiterMode)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                    recruiterMode ? "bg-[#38BDF8]" : "bg-black/20"
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

              <Magnetic>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#38BDF8] text-[#0B1F33] hover:bg-[#0EA5E9] hover:text-white rounded-xl text-xs font-bold transition-all duration-300 shadow-md cursor-pointer uppercase tracking-wider"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Let's Talk
                </a>
              </Magnetic>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MOBILE TOP BAR ── */}
      <header
        className={`w-full fixed top-0 left-0 z-40 flex items-center justify-between px-6 py-4 border-b border-black/10 bg-[#E1DDD3]/90 backdrop-blur-md transition-all duration-300 md:hidden ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          onClick={handleScrollToTop}
          className="font-heading font-extrabold text-xl tracking-tight text-[#0B1F33] cursor-pointer"
        >
          RUBAHAN<span className="text-[#38BDF8]">®</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="px-4 py-1.5 bg-[#38BDF8] text-[#0B1F33] font-bold rounded-full text-xs transition-all duration-300 cursor-pointer shadow-sm"
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-screen h-screen bg-[#E1DDD3] z-50 flex flex-col justify-between p-8 md:hidden font-mono"
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center border-b border-black/10 pb-4">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-[#0B1F33]">
                RUBAHAN<span className="text-[#38BDF8]">®</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-black/10 rounded-full text-[#0B1F33] transition-all cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-4 py-6 my-auto">
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`text-left text-2xl font-heading font-extrabold tracking-tight transition-colors cursor-pointer flex items-center justify-between ${
                      active ? "text-[#38BDF8]" : "text-[#0B1F33]/80"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Sheet Footer */}
            <div className="flex flex-col gap-4 pt-4 border-t border-black/10">
              <div className="flex items-center justify-between border border-black/10 rounded-full px-5 py-3 bg-white/50">
                <span className="text-xs font-mono text-[#0B1F33] font-bold">
                  Recruiter Mode
                </span>
                <button
                  onClick={() => {
                    setRecruiterMode(!recruiterMode);
                    setMenuOpen(false);
                  }}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                    recruiterMode ? "bg-[#38BDF8]" : "bg-black/20"
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
                className="w-full text-center py-3 bg-white/60 text-[#0B1F33] border border-black/10 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Download Resume (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
