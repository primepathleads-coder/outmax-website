import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

/**
 * Premium Outmax Services Preloader
 * Features:
 * - High-definition 3D Bronze Emblem with alpha blend (zero black background box)
 * - Stylish cursive font headline ("Luthon Southard Script") color-matched to bronze logo
 * - Minimalist glowing loading bar with fluid progress interpolation
 * - Smooth entrance and exit transitions
 */
const Preloader = ({ progress = 0, onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(15);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Smooth progress incrementation
  useEffect(() => {

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-radial from-[#c5a07e]/15 via-[#c5a07e]/5 to-transparent rounded-full blur-3xl opacity-80" />
      </div>

      {/* Skip Button (top-right corner) */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[11px] font-mono tracking-widest text-white/50 hover:text-[#dfbe9f] uppercase border border-white/10 hover:border-[#c5a07e]/40 transition-all cursor-pointer backdrop-blur-md"
      >
        <span>Skip</span>
        <Icon icon="lucide:arrow-right" className="size-3" />
      </button>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl px-6 w-full text-center">
        {/* Bronze Logo Emblem — 100% Transparent, Seamless Blend, Zero Black Box */}
        <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] flex items-center justify-center mb-4">
          <div className="absolute inset-0 bg-radial from-[#c5a07e]/25 to-transparent blur-2xl rounded-full scale-125 pointer-events-none" />
          <img
            src="/images/outmax-emblem-bronze.png"
            alt="Outmax Services"
            className="relative z-10 w-full h-auto object-contain drop-shadow-[0_4px_24px_rgba(197,160,126,0.3)] filter contrast-[1.03] brightness-[1.02] select-none"
          />
        </div>

        {/* Stylish Cursive Script Tagline — Perfectly Color-Matched */}
        <div className="mb-6 space-y-1.5">
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#c5a07e] font-normal tracking-wide drop-shadow-[0_2px_18px_rgba(197,160,126,0.45)] select-none">
            Outmax Services
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-[#dfbe9f]/80 tracking-wider">
            Elevating Global Horizons &amp; Enterprise Scale
          </p>
        </div>

        {/* Minimalist Glowing Progress Bar — Color Matched */}
        <div className="w-56 sm:w-72 space-y-2.5">
          <div className="relative h-[2px] w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8f6f58] via-[#c5a07e] to-[#dfbe9f] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(197,160,126,0.85)]"
              style={{ width: `${displayProgress}%` }}
            />
          </div>

          {/* Minimal Percentage Counter */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#dfbe9f]/60 uppercase px-0.5">
            <span className="font-script text-xs sm:text-sm text-[#c5a07e]/85 tracking-wider lowercase">
              crafting experience...
            </span>
            <span className="text-[#dfbe9f]/90 font-semibold">
              {Math.floor(displayProgress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
