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

import Preloader from "./components/Preloader";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FeedDashboardPage from "./pages/FeedDashboardPage";

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden bg-[#e5e5e0] font-sans">
          {/* Premium 3D Bronze Logo Video Reveal Preloader */}
          {!isReady && (
            <Preloader progress={progress} onComplete={() => setIsReady(true)} />
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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/feed" element={<FeedDashboardPage />} />
                <Route path="/portal" element={<FeedDashboardPage />} />
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
    </AuthProvider>
  );
};

export default App;
