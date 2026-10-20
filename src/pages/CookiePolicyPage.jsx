import React from "react";
import SEO from "../components/SEO";
import { companyInfo } from "../data/companyData";
import { Link } from "react-router-dom";

export const CookiePolicyPage = () => {
  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Cookie Policy"
        description="Cookie policy and tracking disclosures for Outmax Services Ltd."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12 border-b border-black/10 pb-8">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Data & Tracking
          </span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-black">
            Cookie Policy
          </h1>
          <p className="text-xs font-mono text-black/50">
            Last Updated: October 2026 · Outmax Services Ltd
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-black/80 font-light space-y-8 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files placed on your device when you browse websites. They are commonly used to ensure website functionality, enhance security, and provide statistical insights on visitor interactions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">2. Categories of Cookies We Deploy</h2>
            <ul className="list-disc pl-5 space-y-2 text-black/75">
              <li>
                <strong>Strictly Necessary Cookies:</strong> Essential for navigational routing, loading states, and secure form submissions. These cannot be disabled without compromising fundamental website operations.
              </li>
              <li>
                <strong>Performance & Diagnostic Cookies:</strong> Aggregated, anonymous metrics that help us understand page load speeds and error occurrences to maintain high availability.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Enabling the website to remember user preferences (such as reduced-motion settings or selected inquiry categories).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">3. Managing Your Cookie Preferences</h2>
            <p>
              You can modify or revoke cookie preferences at any time through your browser settings. Restricting essential cookies may affect your experience with interactive 3D elements or form submissions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">4. Contact</h2>
            <p>
              For questions concerning our cookie and privacy governance, please email{" "}
              <a href={`mailto:${companyInfo.contact.inquiryEmail}`} className="text-gold underline">
                {companyInfo.contact.inquiryEmail}
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-black/10">
          <Link to="/" className="text-xs uppercase tracking-wider font-semibold text-black hover:text-gold">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
