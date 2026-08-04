import React, { useEffect, useRef, useState } from "react";
import { REEL_ENABLED } from "@/lib/site-copy";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { Magnetic } from "@/components/Magnetic";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";
import gsap from "gsap";

export const PlayReelButton: React.FC = () => {
  const lenis = useSmoothScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
    if (lenis) lenis.stop();

    setTimeout(() => {
      if (modalRef.current && buttonRef.current) {
        const btnRect = buttonRef.current.getBoundingClientRect();
        const centerX = btnRect.left + btnRect.width / 2;
        const centerY = btnRect.top + btnRect.height / 2;

        gsap.fromTo(
          modalRef.current,
          { clipPath: `circle(0px at ${centerX}px ${centerY}px)`, opacity: 0 },
          {
            clipPath: `circle(150% at ${centerX}px ${centerY}px)`,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
          }
        );
      }
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 10);
  };

  const closeModal = () => {
    if (modalRef.current && buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const centerX = btnRect.left + btnRect.width / 2;
      const centerY = btnRect.top + btnRect.height / 2;

      gsap.to(modalRef.current, {
        clipPath: `circle(0px at ${centerX}px ${centerY}px)`,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          setIsOpen(false);
          if (lenis) lenis.start();
          if (videoRef.current) {
            videoRef.current.pause();
          }
        },
      });
    } else {
      setIsOpen(false);
      if (lenis) lenis.start();
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!REEL_ENABLED) return null;

  return (
    <>
      {/* Circular Glass Play Reel Button */}
      <Magnetic>
        <button
          ref={buttonRef}
          onClick={openModal}
          className="group relative w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-108 hover:shadow-[0_0_25px_rgba(125,211,252,0.4)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          aria-label="Play Reel Video"
        >
          <div className="w-9 h-9 rounded-full bg-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-[#0B1F33] transition-all duration-300 mb-1 pl-0.5">
            <Play className="w-4 h-4 fill-current" />
          </div>
          <span className="font-mono text-[9px] font-bold tracking-widest text-[#0B1F33] uppercase group-hover:text-[#0EA5E9] transition-colors">
            PLAY REEL
          </span>
        </button>
      </Magnetic>

      {/* Fullscreen Video Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 w-full h-full bg-[#0B1F33]/92 backdrop-blur-xl z-[10000] flex items-center justify-center p-4 sm:p-8 select-none"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer z-50 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
            aria-label="Close reel modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Centered 16:9 Video Container */}
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black">
            <video
              ref={videoRef}
              src="/reel.mp4"
              className="w-full h-full object-cover"
              loop
              playsInline
            />

            {/* Custom Minimal Controls Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-6 text-white text-xs font-mono">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <button
                onClick={toggleMute}
                className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
