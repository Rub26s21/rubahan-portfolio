import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export const useReducedMotion = () => {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  useEffect(() => {
    // Keep motion active for rich web animations unless explicitly disabled by user
    setReducedMotion(false);
  }, [setReducedMotion]);

  return reducedMotion;
};
