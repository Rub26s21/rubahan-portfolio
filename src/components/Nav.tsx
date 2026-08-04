import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { PROFILE } from "@/lib/data";
import { Magnetic } from "@/components/Magnetic";
import gsap from "gsap";

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
  const lastScrollY = useRef(0);
  const menuSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const threshold = window.innerHeight * 0.7;

      // Show sticky left sidebar only after scrolling past Hero section
      setShowStickySidebar(current > threshold);

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
      {/* ── DESKTOP STICKY LEFT SIDEBAR (Animates in once scrolled past Hero) ── */}
      <AnimatePresence>
        {showStickySidebar && (
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 h-screen fixed left-0 top-0 z-40 flex flex-col justify-between p-8 border-r border-mist/20 bg-surface/85 backdrop-blur-md hidden md:flex shadow-2xl"
          >
            {/* Monogram Logo */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleScrollToTop}
                className="font-heading font-bold text-3xl tracking-tight text-ink hover:text-[#38BDF8] hover:scale-105 transition-all text-left flex items-center gap-1.5 cursor-pointer"
              >
                ЯP
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 my-auto">
              <div className="flex flex-col gap-1.5 text-xs text-mist font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  <span>5 Flagship Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                  <span>3 Years of Engineering</span>
                </div>
              </div>

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleScrollTo(item.id)}
                      className={`w-full py-2 px-4 rounded-full text-left text-xs font-semibold transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                        active
                          ? "text-ink font-bold"
                          : "text-mist hover:text-ink"
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-0 bg-[#38BDF8]/20 rounded-full z-0" />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            active ? "bg-[#38BDF8] scale-100" : "bg-transparent scale-0"
                          }`}
                        />
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Socials */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-surface hover:bg-[#38BDF8]/20 border border-mist/20 rounded-full text-mist hover:text-[#38BDF8] transition-all duration-300 cursor-pointer"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-surface hover:bg-[#38BDF8]/20 border border-mist/20 rounded-full text-mist hover:text-[#38BDF8] transition-all duration-300 cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-surface hover:bg-[#38BDF8]/20 border border-mist/20 rounded-full text-mist hover:text-[#38BDF8] transition-all duration-300 cursor-pointer"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
                <a
                  href="/Rubahan-P-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#38BDF8] hover:text-ink font-semibold underline underline-offset-4 transition-all cursor-pointer"
                >
                  Resume
                </a>
              </div>

              {/* Recruiter Mode Toggle */}
              <div className="flex items-center justify-between border-t border-mist/10 pt-3">
                <span className="text-[11px] font-mono text-mist font-semibold">
                  Recruiter Mode
                </span>
                <button
                  onClick={() => setRecruiterMode(!recruiterMode)}
                  className={`w-9 h-4.5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                    recruiterMode ? "bg-[#38BDF8]" : "bg-mist/30"
                  }`}
                  aria-label="Toggle Recruiter Mode"
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                      recruiterMode ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <Magnetic>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#38BDF8] text-[#0B1F33] hover:bg-[#0EA5E9] hover:text-white rounded-full text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer"
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
            className="px-4 py-1.5 bg-[#38BDF8] text-[#0B1F33] font-bold rounded-full text-xs transition-all duration-300 cursor-pointer"
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
                    active ? "text-[#38BDF8]" : "text-[#0B1F33]/70"
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
