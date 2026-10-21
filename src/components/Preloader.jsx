import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";

/**
 * Premium Outmax Services Preloader
 * Features:
 * - 3D Bronze Logo reveal animation video (WebM/MP4 with WebP poster)
 * - Stylish cursive font headline ("Luthon Southard Script")
 * - Minimalist glowing loading bar with fluid progress interpolation
 * - Smooth entrance and exit transitions
 */
const Preloader = ({ progress = 0, onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(15);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);

  // Smooth progress incrementation with minimum duration so the bronze video can form gracefully
  useEffect(() => {
    // Attempt video playback
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay fallback if browser blocks
      });
    }

    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        // Smooth interpolation towards 100%
        const target = 100;
        const step = Math.max(1, (target - prev) * 0.08);
        const next = Math.min(100, prev + step);

        if (next >= 99.4) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [progress]);

  // When progress reaches 100%, trigger elegant fadeout after short delay
  useEffect(() => {
    if (displayProgress >= 100) {
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        const completeTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 700);
        return () => clearTimeout(completeTimer);
      }, 400);

      return () => clearTimeout(exitTimer);
    }
  }, [displayProgress, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 350);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white transition-all duration-700 ease-out ${
        isFadingOut ? "opacity-0 scale-[1.03] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient background glow behind the bronze logo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#cfa355]/15 via-transparent to-transparent rounded-full blur-3xl opacity-70" />
      </div>

      {/* Skip Button (top-right corner) */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[11px] font-mono tracking-widest text-white/50 hover:text-white uppercase border border-white/10 transition-all cursor-pointer backdrop-blur-md"
      >
        <span>Skip</span>
        <Icon icon="lucide:arrow-right" className="size-3" />
      </button>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl px-6 w-full text-center">
        {/* Bronze Logo Video Reveal */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] aspect-video overflow-hidden rounded-2xl flex items-center justify-center mb-2">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/videos/outmax-logo-poster.webp"
            className="w-full h-full object-contain filter contrast-105"
          >
            <source src="/videos/outmax-logo-reveal.webm" type="video/webm" />
            <source src="/videos/outmax-logo-reveal.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Stylish Cursive Script Tagline */}
        <div className="mb-6 -mt-2 space-y-1">
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-gold font-normal tracking-wide drop-shadow-[0_2px_15px_rgba(207,163,85,0.45)] select-none">
            Outmax Services
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-white/60 tracking-wider">
            Elevating Global Horizons & Enterprise Scale
          </p>
        </div>

        {/* Minimalist Glowing Progress Bar */}
        <div className="w-56 sm:w-72 space-y-2.5">
          <div className="relative h-[2px] w-full bg-white/15 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8a682b] via-[#cfa355] to-[#f6df9a] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(207,163,85,0.9)]"
              style={{ width: `${displayProgress}%` }}
            />
          </div>

          {/* Minimal Percentage Counter */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-white/45 uppercase px-0.5">
            <span className="font-script text-xs sm:text-sm text-gold/75 tracking-wider lowercase">
              crafting experience...
            </span>
            <span className="text-white/70 font-semibold">
              {Math.floor(displayProgress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
