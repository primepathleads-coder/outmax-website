import React from "react";
import SEO from "../components/SEO";
import { companyInfo } from "../data/companyData";
import { Link } from "react-router-dom";

export const TermsPage = () => {
  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Terms of Service"
        description="Terms of service and commercial engagement standards of Outmax Services Ltd."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12 border-b border-black/10 pb-8">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Commercial Agreement
          </span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-black">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-black/50">
            Last Updated: October 2026 · Outmax Services Ltd
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-black/80 font-light space-y-8 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">1. Scope of Services</h2>
            <p>
              Outmax Services Ltd (&quot;Outmax&quot;) provides business process outsourcing, inbound/outbound contact operations, performance media buying, affiliate marketing management, digital monetization, and software engineering. Specific deliverables, team configurations, timelines, and commercial consideration are defined in individualized Statements of Work (SOW) executed between Outmax and the client.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">2. Engagement Model & Governance</h2>
            <p>
              Clients engaging Outmax as an operational extension provide timely access to necessary documentation, credentials, and software platforms required for service delivery. Outmax adheres to agreed Standard Operating Procedures (SOPs) and provides scheduled reporting on contracted metrics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">3. Performance Figures & Historical Metrics</h2>
            <p>
              Metrics cited on this website (such as $1.88M+ managed Meta ad spend, $59K+ 30-day AFD revenue, 8M+ emails sent, and 12.59% CTOR) represent historical or platform-tracked data across reported client portfolios and proprietary channels. They do not constitute an independent audit or a guarantee of identical future results for any individual client engagement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">4. Intellectual Property & Confidentiality</h2>
            <p>
              All client data, trade secrets, customer records, and bespoke software deliverables remain the exclusive property of the client upon settlement of applicable invoices. Outmax maintains strict non-disclosure obligations regarding all proprietary client materials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-black">5. Inquiries & Governance</h2>
            <p>
              For legal or contractual inquiries, please contact our administrative desk at{" "}
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

export default TermsPage;
