import React from "react";
import { useAppStore } from "@/lib/store";
import { PROFILE, STATS, PROJECTS, LEADERSHIP } from "@/lib/data";

// Custom icons for RecruiterView
const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const RecruiterView: React.FC = () => {
  const setRecruiterMode = useAppStore((s) => s.setRecruiterMode);

  return (
    <div className="min-h-screen bg-[#F6FAFD] text-[#0B1F33] font-sans antialiased">
      {/* Dynamic Sticky Top Navigation for toggling back */}
      <header className="sticky top-0 bg-[#F6FAFD]/90 backdrop-blur-md border-b border-[#8FB3C7]/20 z-40 py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="font-heading font-bold text-2xl tracking-tight text-[#0B1F33]">
            ЯP
          </span>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8FB3C7] font-semibold">
              Recruiter Mode
            </span>
            <button
              onClick={() => setRecruiterMode(false)}
              className="w-12 h-6 rounded-full bg-deep p-1 transition-colors relative cursor-pointer"
              aria-label="Toggle Recruiter Mode Off"
            >
              <div className="w-4 h-4 rounded-full bg-white absolute right-1 top-1 transition-all" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-14">
        {/* Name & Roles Summary */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-[#0B1F33]">
              {PROFILE.name}
            </h1>
            <p className="text-sm font-mono text-deep font-bold">
              {PROFILE.roles.join("  ·  ")}
            </p>
          </div>

          <p className="text-base text-[#0B1F33]/85 leading-relaxed max-w-2xl">
            {PROFILE.valueProp}
          </p>

          <div className="flex flex-wrap items-center gap-4 border-t border-[#8FB3C7]/20 pt-6">
            <a
              href="/Rubahan-P-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-deep text-white hover:bg-deep/90 rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              Download Resume (PDF)
            </a>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="px-4 py-2 border border-[#8FB3C7]/30 hover:border-deep rounded-lg text-xs font-semibold font-mono text-[#0B1F33] transition-all cursor-pointer"
              >
                {PROFILE.email}
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#8FB3C7]/30 hover:border-deep rounded-lg text-[#0B1F33] hover:text-deep transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#8FB3C7]/30 hover:border-deep rounded-lg text-[#0B1F33] hover:text-deep transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 6 Stats Grid */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xs uppercase tracking-widest text-[#8FB3C7] font-mono font-bold">
            Key Statistics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#8FB3C7]/20 rounded-xl p-4 flex flex-col gap-1 shadow-sm"
              >
                <div className="font-heading text-3xl font-black text-deep leading-none">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-xs font-bold text-[#0B1F33] mt-1 leading-snug">
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono text-[#8FB3C7]">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5 Compact Project Cards */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xs uppercase tracking-widest text-[#8FB3C7] font-mono font-bold">
            Featured Engineering Projects
          </h2>
          <div className="flex flex-col gap-6">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border border-[#8FB3C7]/20 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-deep uppercase tracking-widest">
                      {proj.domain}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-[#0B1F33] mt-0.5">
                      {proj.title}
                    </h3>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-deep hover:underline font-mono"
                  >
                    GitHub ↗
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-[#0B1F33]/80 leading-relaxed">
                  {proj.tagline}
                </p>

                {/* 3 Impact Numbers */}
                <div className="grid grid-cols-3 gap-4 border-y border-[#8FB3C7]/15 py-4">
                  {proj.impact.slice(0, 3).map((imp, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <span className="font-heading text-base sm:text-lg font-black text-[#0B1F33]">
                        {imp.value}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#8FB3C7] leading-tight">
                        {imp.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stack Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {proj.stack.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#F6FAFD] border border-[#8FB3C7]/25 text-[#0B1F33]/70 font-mono text-[9px] rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership List */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xs uppercase tracking-widest text-[#8FB3C7] font-mono font-bold">
            Leadership & Symposia
          </h2>
          <div className="flex flex-col gap-4">
            {LEADERSHIP.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#8FB3C7]/20 rounded-xl p-5 flex flex-col gap-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-base font-bold text-[#0B1F33]">
                    {item.role}
                  </h3>
                  <span className="text-[10px] font-mono text-deep font-semibold shrink-0">
                    {item.period}
                  </span>
                </div>
                <div className="text-xs text-[#8FB3C7] font-bold">
                  {item.org}
                </div>
                <p className="text-xs text-[#0B1F33]/80 leading-relaxed font-medium">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Back to top / Switch button */}
        <div className="border-t border-[#8FB3C7]/20 pt-8 flex items-center justify-between text-xs font-mono text-[#8FB3C7]">
          <span>© 2026 Rubahan P. Recruiter Dashboard.</span>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-deep transition-colors cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </main>
    </div>
  );
};
