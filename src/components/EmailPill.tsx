import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PROFILE } from "@/lib/data";

export const EmailPill: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`group relative flex items-center gap-2.5 px-4 py-2 bg-surface border border-mist/20 rounded-full text-xs font-mono text-ink hover:border-deep transition-all duration-300 shadow-sm active:scale-95 cursor-pointer ${className}`}
      aria-label="Copy email to clipboard"
    >
      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
        {PROFILE.email}
      </span>
      <div className="relative w-4 h-4 flex items-center justify-center">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-deep transition-all scale-100" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-mist group-hover:text-deep transition-all scale-100" />
        )}
      </div>
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-surface text-[10px] px-2 py-0.5 rounded shadow-md pointer-events-none font-sans whitespace-nowrap">
          Copied ✓
        </span>
      )}
    </button>
  );
};
