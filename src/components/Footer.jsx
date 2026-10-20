import React from "react";
import { Link } from "react-router-dom";
import OutmaxLogo from "./OutmaxLogo";
import { companyInfo } from "../data/companyData";
import { servicesData } from "../data/servicesData";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10 font-light">
          {/* Column 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-6">
            <OutmaxLogo variant="light" size="lg" showTagline={true} />

            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              {companyInfo.elevatorPitch}
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/60">
              <div className="flex items-start gap-2.5">
                <Icon icon="lucide:map-pin" className="size-4 text-gold shrink-0 mt-0.5" />
                <span>{companyInfo.location.formatted}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon icon="lucide:user-check" className="size-4 text-gold shrink-0" />
                <span>Leadership: Hamid Iqbal Khan (CEO) & Abdul Moiz Khan (MD)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon icon="lucide:mail" className="size-4 text-gold shrink-0" />
                <a
                  href={`mailto:${companyInfo.contact.inquiryEmail}`}
                  className="hover:text-gold transition-colors duration-200"
                >
                  {companyInfo.contact.inquiryEmail}
                </a>
              </div>
            </div>

            {/* Social Connectivity Strip: LinkedIn, X, Email */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/outmax-services/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Outmax Services Ltd LinkedIn"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Icon icon="lucide:linkedin" className="size-4 text-gold" />
              </a>
              <a
                href="https://twitter.com/OutmaxServices"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Outmax Services Ltd X / Twitter"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Icon icon="ri:twitter-x-fill" className="size-4 text-white" />
              </a>
              <a
                href={`mailto:${companyInfo.contact.inquiryEmail}`}
                aria-label="Direct Email Outmax Services"
                className="w-10 h-10 bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Icon icon="lucide:mail" className="size-4 text-gold" />
              </a>
            </div>

            {/* Quick Metrics Badge */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-white/80">
              <span className="px-3 py-1 bg-white/5 border border-white/10">
                $1.88M+ Managed Ad Spend
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10">
                $59K+ 30-Day AFD
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10">
                8M+ Sent Emails
              </span>
            </div>
          </div>

          {/* Column 3: Outsourcing Services */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-gold">
              Outsourcing & Operations
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              {servicesData
                .filter((s) => s.pillar === "Outsourcing & Operations")
                .map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="hover:text-gold transition-colors duration-200"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 4: Marketing & Technology */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-gold">
              Growth, Media & Tech
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              {servicesData
                .filter((s) => s.pillar !== "Outsourcing & Operations")
                .map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="hover:text-gold transition-colors duration-200"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 5: Company & Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-gold">
              Company & Hub
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-gold transition-colors duration-200">
                  Documented Results
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-gold transition-colors duration-200">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link to="/how-we-work" className="hover:text-gold transition-colors duration-200">
                  How We Work
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-gold transition-colors duration-200">
                  Portfolio & Builds
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold transition-colors duration-200">
                  Insights & Research
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-gold transition-colors duration-200">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors duration-200">
                  Request Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {currentYear} Outmax Services Ltd. All rights reserved. Registered BPO & digital growth partner.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gold transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="hover:text-gold transition-colors duration-200">
              Cookie Policy
            </Link>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-gold transition-colors duration-200 cursor-pointer ml-4"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <Icon icon="lucide:arrow-up" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
