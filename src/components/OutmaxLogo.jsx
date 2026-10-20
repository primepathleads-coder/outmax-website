import React from "react";
import { Link } from "react-router-dom";

export const OutmaxLogo = ({
  variant = "dark", // "dark", "light", "gold"
  className = "",
  showTagline = false,
  size = "md",
}) => {
  // size styles
  const sizeMap = {
    sm: "h-11",
    md: "h-16",
    lg: "h-22",
    xl: "h-32",
  };

  const isLight = variant === "light";

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-4 group cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="Outmax Services Ltd - Home"
    >
      {/* High-res Logo Emblem / Image */}
      <div className="relative flex items-center justify-center">
        <img
          src="/images/outmax-logo.png"
          alt="Outmax Services Ltd Logo"
          className={`${sizeMap[size] || "h-16"} w-auto object-contain transition-all duration-300 ${
            isLight
              ? "brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
              : "contrast-125"
          }`}
        />
      </div>

      {showTagline && (
        <div className="hidden sm:flex flex-col text-left pl-3 border-l border-white/20">
          <span
            className={`text-xs uppercase tracking-[0.25em] font-medium leading-tight ${
              isLight ? "text-white/90" : "text-black/80"
            }`}
          >
            Outsourcing · Growth
          </span>
          <span
            className={`text-[10px] uppercase tracking-wider font-light ${
              isLight ? "text-white/50" : "text-black/50"
            }`}
          >
            Digital Solutions
          </span>
        </div>
      )}
    </Link>
  );
};

export default OutmaxLogo;
