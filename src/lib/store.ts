import { create } from "zustand";

export interface AppState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  recruiterMode: boolean;
  setRecruiterMode: (mode: boolean) => void;
  cursorLabel: string;
  setCursorLabel: (label: string) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  preloaderFinished: boolean;
  setPreloaderFinished: (finished: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  recruiterMode: (() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("recruiterMode") === "true";
    }
    return false;
  })(),
  setRecruiterMode: (mode) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("recruiterMode", String(mode));
    }
    set({ recruiterMode: mode });
  },
  cursorLabel: "",
  setCursorLabel: (label) => set({ cursorLabel: label }),
  reducedMotion: false,
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  preloaderFinished: (() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("hasSeenPreloader") === "true";
    }
    return true;
  })(),
  setPreloaderFinished: (finished) => set({ preloaderFinished: finished }),
}));
