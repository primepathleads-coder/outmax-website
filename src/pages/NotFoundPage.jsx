import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 text-center py-24">
      <SEO
        title="404 - Page Not Found"
        description="The page you requested could not be located on Outmax Services Ltd."
      />

      <div className="max-w-xl space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold font-mono block">
          Error 404
        </span>

        <h1 className="text-6xl sm:text-8xl font-light tracking-tight text-white">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-light text-white/90">
          Page Not Located
        </h2>

        <p className="text-sm sm:text-base font-light text-white/70 leading-relaxed">
          The destination you are attempting to access has either moved or does not exist within the Outmax Services directory.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white transition-colors shadow-lg"
          >
            <span>Return to Homepage</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-wider font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <span>View 11 Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
