import React, { useState } from "react";
import SEO from "../components/SEO";
import { industriesData } from "../data/industriesData";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const IndustriesPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(industriesData[0]);

  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Industries Served"
        description="Learn how Outmax Services Ltd supports 12 target industries across startups, enterprises, e-commerce, legal firms, healthcare, SaaS, and financial services."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Target Sectors & Audiences
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-black leading-[1.08]">
            Ideal Clients & Value Proposition
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            Outmax Services Ltd partners with organizations across a wide range of industries and sizes ,  from early-stage startups seeking rapid scale to established enterprises requiring operational excellence.
          </p>
        </div>
      </section>

      {/* Interactive 12-Sector Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 12 Industry Selector Buttons */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold block mb-3 font-mono">
              Select Sector ({industriesData.length} Target Sectors)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[600px] overflow-y-auto pr-2">
              {industriesData.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between cursor-pointer border ${
                    selectedIndustry.id === ind.id
                      ? "bg-black text-white border-black shadow-md"
                      : "bg-white/70 hover:bg-white text-black border-black/10"
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-medium leading-tight">{ind.name}</h3>
                    <span
                      className={`text-[10px] uppercase font-mono tracking-wider ${
                        selectedIndustry.id === ind.id ? "text-gold" : "text-black/50"
                      }`}
                    >
                      {ind.badge}
                    </span>
                  </div>
                  <Icon
                    icon="lucide:chevron-right"
                    className={`size-4 shrink-0 transition-transform ${
                      selectedIndustry.id === ind.id ? "text-gold translate-x-1" : "text-black/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Industry Detail View */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-black/10 shadow-xl space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1 border border-gold/30 block mb-2 w-fit">
                    {selectedIndustry.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-black">
                    {selectedIndustry.name}
                  </h2>
                </div>
                <Link
                  to={`/contact?industry=${encodeURIComponent(selectedIndustry.name)}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-colors w-fit"
                >
                  <span>Discuss Requirements</span>
                  <Icon icon="lucide:arrow-right" className="size-3.5" />
                </Link>
              </div>

              {/* Industry Visual Banner */}
              <div className="relative rounded-2xl overflow-hidden h-56 border border-black/10">
                <img
                  src={selectedIndustry.image}
                  alt={selectedIndustry.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm font-light text-white/90">
                  {selectedIndustry.summary}
                </p>
              </div>

              {/* Operational Pain vs How Outmax Helps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-black/5 border border-black/5 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-black/60 flex items-center gap-2">
                    <Icon icon="solar:danger-triangle-bold" className="size-4 text-gold" />
                    <span>Sector Friction</span>
                  </span>
                  <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed">
                    {selectedIndustry.operationalPain}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/5 border border-black/5 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-black/60 flex items-center gap-2">
                    <Icon icon="solar:check-circle-bold" className="size-4 text-gold" />
                    <span>The Outmax Solution</span>
                  </span>
                  <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed">
                    {selectedIndustry.howOutmaxHelps}
                  </p>
                </div>
              </div>

              {/* Ideal Service Pairings */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-black/60">
                  Recommended Service Pairings:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedIndustry.idealServices.map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-black/10 text-xs text-black/85 flex items-center gap-2 shadow-xs"
                    >
                      <Icon icon="lucide:arrow-right" className="size-3.5 text-gold shrink-0" />
                      <span className="font-medium truncate">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Framework from PDF Page 7 */}
      <section className="bg-black text-white py-24 rounded-4xl mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
              Why Businesses Choose Outmax
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
              The Value Proposition
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light">
              Structured across our core delivery capabilities and measurable client outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Delivery Commitments */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Icon icon="solar:box-minimalistic-bold" className="size-6 text-gold" />
                <h3 className="text-xl font-medium text-white uppercase tracking-wider">
                  Delivery
                </h3>
              </div>
              <ul className="space-y-4 text-sm font-light text-white/80">
                {[
                  "Cost-effective outsourcing solutions",
                  "Highly trained professionals",
                  "Scalable teams (rapid upsize & downsize)",
                  "Dedicated account management",
                  "Reliable and proactive communication",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Icon icon="solar:check-read-bold" className="size-4 text-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Outcomes */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Icon icon="solar:graph-bold" className="size-6 text-gold" />
                <h3 className="text-xl font-medium text-white uppercase tracking-wider">
                  Outcomes
                </h3>
              </div>
              <ul className="space-y-4 text-sm font-light text-white/80">
                {[
                  "Process optimization & documented SOPs",
                  "High-quality customer experience (CSAT & FCR)",
                  "Flexible engagement models",
                  "Long-term business partnerships",
                  "Proven performance marketing & monetization expertise",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Icon icon="solar:star-fall-bold" className="size-4 text-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;
