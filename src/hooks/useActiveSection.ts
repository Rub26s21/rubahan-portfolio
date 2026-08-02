import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export const useActiveSection = (sectionId: string, threshold: number = 0.5) => {
  const setActiveSection = useAppStore((s) => s.setActiveSection);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [sectionId, setActiveSection, threshold]);
};
