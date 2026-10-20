import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactLenis from "lenis/react";
import { useProgress } from "@react-three/drei";

import Navbar from "./sections/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ResultsPage from "./pages/ResultsPage";
import IndustriesPage from "./pages/IndustriesPage";
import HowWeWorkPage from "./pages/HowWeWorkPage";
import PortfolioPage from "./pages/PortfolioPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import FaqsPage from "./pages/FaqsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Graceful loader timeout so direct navigation to interior pages never hangs
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1200);

    if (progress === 100) {
      setIsReady(true);
    }

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <Router>
      <ScrollToTop />
      <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden bg-[#e5e5e0] font-sans">
        {/* Editorial Loading Screen */}
        {!isReady && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl tracking-[0.3em] uppercase text-gold font-mono">
                OUTMAX
              </span>
              <span className="text-xs uppercase tracking-widest text-white/50">
                Services Ltd
              </span>
            </div>

            <p className="mb-4 text-xs font-mono tracking-widest text-white/70">
              Initializing Experience {Math.floor(progress || 99)}%
            </p>

            <div className="relative h-1 overflow-hidden rounded-full w-56 bg-white/20">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-300 bg-gold"
                style={{ width: `${Math.max(progress, 30)}%` }}
              ></div>
            </div>
          </div>
        )}

        <div
          className={`${
            isReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000 flex flex-col min-h-screen`}
        >
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/how-we-work" element={<HowWeWorkPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/faqs" element={<FaqsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ReactLenis>
    </Router>
  );
};

export default App;
