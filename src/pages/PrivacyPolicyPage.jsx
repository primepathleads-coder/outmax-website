import React from "react";
import SEO from "../components/SEO";
import { companyInfo } from "../data/companyData";
import { Link } from "react-router-dom";

export const PrivacyPolicyPage = () => {
  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Privacy Policy"
        description="Privacy policy and data governance practices of Outmax Services Ltd."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12 border-b border-black/10 pb-8">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Legal & Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-black">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-black/50">
            Last Updated: October 2026 · Outmax Services Ltd
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-black/80 font-light space-y-8 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">1. Overview & Commitment</h2>
            <p>
              Outmax Services Ltd (&quot;Outmax&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides business process outsourcing, performance marketing, and digital technology solutions to corporate clients worldwide. We are committed to safeguarding the privacy and integrity of information entrusted to us by visitors to our website and participants in our client engagements.
            </p>
            <p>
              Our corporate office is situated at {companyInfo.location.formatted}.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">2. Information We Collect</h2>
            <p>We may collect information through the following mechanisms:</p>
            <ul className="list-disc pl-5 space-y-1 text-black/75">
              <li>
                <strong>Direct Inquiries:</strong> Information submitted through our business inquiry forms, including full name, business email address, company name, project requirements, and budget estimations.
              </li>
              <li>
                <strong>Client Engagements:</strong> Operational details, CRM credentials, Standard Operating Procedures (SOPs), and campaign assets supplied under explicit commercial Non-Disclosure Agreements (NDAs).
              </li>
              <li>
                <strong>Technical Diagnostics:</strong> Standard web analytics logs, IP addresses, browser types, and referral headers used solely to maintain website security and optimize performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">3. How Information Is Utilized</h2>
            <p>Information collected is utilized exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1 text-black/75">
              <li>Scoping, delivering, and optimizing contracted BPO, marketing, or technology services.</li>
              <li>Responding to partnership inquiries and scheduling consultations.</li>
              <li>Ensuring compliance with applicable partner platform terms (e.g. Meta Ads, Everflow, System1).</li>
              <li>Maintaining administrative, billing, and accounting records in accordance with standard financial practices.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">4. Data Confidentiality & Security</h2>
            <p>
              We implement multi-factor authentication, role-based access restrictions, encrypted workstation protocols, and routine security audits. We never sell, rent, or trade client or prospect data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">5. Contact & Data Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your business inquiry data at any time by contacting our executive desk at{" "}
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

export default PrivacyPolicyPage;
