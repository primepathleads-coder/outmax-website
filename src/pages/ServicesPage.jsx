import React, { useState } from "react";
import SEO from "../components/SEO";
import { servicesData } from "../data/servicesData";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ServicesPage = () => {
  const [activePillar, setActivePillar] = useState("all");

  const pillars = [
    { id: "all", label: "All 11 Services" },
    { id: "Outsourcing & Operations", label: "Outsourcing & Operations" },
    { id: "Growth & Performance Marketing", label: "Growth & Performance Marketing" },
    { id: "Technology & Creative Strategy", label: "Technology & Creative Strategy" },
  ];

  const filteredServices =
    activePillar === "all"
      ? servicesData
      : servicesData.filter((s) => s.pillar === activePillar);

  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Operational Services & Outsourcing Solutions | Outmax Services"
        description="Explore 11 core services by Outmax Services: inbound and outbound BPO, omnichannel customer support, paid media buying, affiliate management, web development, and financial bookkeeping."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Integrated Service Directory
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-black leading-[1.08]">
            Comprehensive B2B Solutions
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            From customer-facing communications and revenue acquisition to internal financial management and digital infrastructure.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-10">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                activePillar === pillar.id
                  ? "bg-black text-white shadow-md"
                  : "bg-white/80 hover:bg-white text-black/70 border border-black/10"
              }`}
            >
              {pillar.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.slug}
              className="rounded-3xl overflow-hidden bg-white/70 border border-black/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-gold border border-white/20">
                    {service.pillar}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-light text-white leading-snug">
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed mb-4">
                    {service.tagline}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-black/10">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-black/50 block mb-1">
                      Core Disciplines:
                    </span>
                    {service.capabilities[0]?.items.slice(0, 3).map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-black/80 font-light">
                        <Icon icon="lucide:check" className="size-3 text-gold shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-black/50">
                    {service.keyMetrics[0]?.value || "Dedicated Pods"}
                  </span>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-black group-hover:text-gold transition-colors"
                  >
                    <span>Explore Page</span>
                    <Icon icon="lucide:arrow-right" className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 sm:p-14 rounded-4xl bg-black text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-white/10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              Multi-Service Integration
            </span>
            <h3 className="text-2xl sm:text-4xl font-light text-white leading-tight">
              Combine Operational BPO with Performance Marketing
            </h3>
            <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
              We frequently architect integrated solutions ,  pairing customer support with media buying or custom landing pages with affiliate network management ,  to accelerate commercial impact.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white transition-colors shrink-0 shadow-lg"
          >
            <span>Discuss Custom Requirements</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
