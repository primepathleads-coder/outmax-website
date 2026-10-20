import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import SEO from "../components/SEO";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Related services from same or complementary pillars
  const relatedServices = servicesData
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title={`${service.title} | Services`}
        description={service.tagline}
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-black/50 mb-6 font-mono">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-black transition-colors">Services</Link>
          <span>/</span>
          <span className="text-gold font-semibold truncate">{service.shortTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider bg-black text-gold">
              {service.pillar}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-black leading-[1.08]">
              {service.title}
            </h1>

            <p className="text-lg sm:text-2xl font-light text-black/80 leading-relaxed">
              {service.tagline}
            </p>

            <p className="text-sm sm:text-base font-light text-black/70 leading-relaxed max-w-2xl">
              {service.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-all duration-300 shadow-md group"
              >
                <span>Discuss {service.shortTitle} Requirements</span>
                <Icon icon="lucide:arrow-right" className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-we-work"
                className="inline-flex items-center gap-2 px-6 py-4 text-xs uppercase tracking-wider font-semibold bg-white text-black border border-black/15 hover:bg-black/5 transition-colors"
              >
                <span>View Engagement Model</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden h-[420px] sm:h-[480px] border border-black/10 shadow-2xl relative group">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold block mb-1">
                  Dedicated Squad Deployment
                </span>
                <p className="text-xs sm:text-sm font-light text-white/90">
                  Operated under strict SOPs, daily scorecards, and continuous supervisory QA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Strip */}
      <section className="bg-black text-white py-10 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {service.keyMetrics.map((km, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs uppercase tracking-[0.2em] text-gold mb-1 font-mono">
                  {km.label}
                </div>
                <div className="text-xl sm:text-2xl font-light text-white">
                  {km.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge & Capabilities Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Challenges We Address */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
              Operational Realities
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-black">
              The Challenges We Resolve
            </h2>
            <p className="text-sm text-black/70 font-light leading-relaxed">
              When scaling this functional area in-house, companies routinely face bottlenecks that drain capital and executive attention.
            </p>

            <div className="space-y-3 pt-2">
              {service.challengesSolved.map((challenge, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/80 border border-black/10 flex items-start gap-3 shadow-xs"
                >
                  <Icon icon="solar:danger-triangle-bold" className="size-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-black/80 font-light leading-relaxed">
                    {challenge}
                  </span>
                </div>
              ))}
            </div>

            {service.secondaryImage && (
              <div className="rounded-2xl overflow-hidden h-52 border border-black/10 mt-6 hidden sm:block">
                <img
                  src={service.secondaryImage}
                  alt={`${service.title} operations`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Right: Specific Capabilities Breakdown */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
              Deliverables & Scope
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-black">
              What This Service Delivers
            </h2>

            <div className="space-y-6">
              {service.capabilities.map((capGroup, groupIndex) => (
                <div
                  key={groupIndex}
                  className="p-6 sm:p-8 rounded-3xl bg-white/70 border border-black/10 shadow-sm space-y-4"
                >
                  <h3 className="text-lg font-medium text-black flex items-center gap-2 border-b border-black/10 pb-3">
                    <Icon icon="solar:widget-2-bold" className="size-5 text-gold" />
                    <span>{capGroup.category}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {capGroup.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 border border-black/5"
                      >
                        <Icon icon="solar:check-circle-bold" className="size-4 text-gold shrink-0" />
                        <span className="text-xs sm:text-sm text-black/85 font-light">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Execution Process */}
      <section className="bg-[#171615] text-white py-24 rounded-4xl mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
              Disciplined Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
              How We Execute {service.shortTitle}
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light">
              A systematic 4-phase rollout ensuring seamless handover and reliable performance from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/40 transition-all duration-300 space-y-4 relative"
              >
                <div className="text-4xl font-mono text-gold/40 font-light">
                  {step.step}
                </div>
                <h3 className="text-lg font-medium text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
              Clear Clarifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-black/10 bg-white/70 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-black/5 transition-colors"
                >
                  <span className="font-medium text-sm sm:text-base text-black">
                    {faq.q}
                  </span>
                  <Icon
                    icon="lucide:chevron-down"
                    className={`size-4 text-gold shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-black/75 font-light leading-relaxed border-t border-black/5 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Direct Service Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-14 rounded-4xl bg-black text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-white/10 shadow-2xl">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              Ready to Expand Your Team?
            </span>
            <h3 className="text-2xl sm:text-4xl font-light text-white leading-tight">
              Deploy {service.shortTitle} with Outmax Services Ltd
            </h3>
            <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
              Schedule an executive scoping call to review requirements, SOP templates, team sizing, and commercial timelines.
            </p>
          </div>

          <Link
            to={`/contact?service=${encodeURIComponent(service.title)}`}
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white transition-colors shrink-0 shadow-lg"
          >
            <span>Request {service.shortTitle} Proposal</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>
        </div>
      </section>

      {/* Related Services Exploration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              Complementary Capabilities
            </span>
            <h3 className="text-2xl font-light text-black">
              Frequently Paired Services
            </h3>
          </div>
          <Link
            to="/services"
            className="text-xs uppercase tracking-wider font-semibold text-black hover:text-gold inline-flex items-center gap-1"
          >
            <span>All Services</span>
            <Icon icon="lucide:arrow-right" className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((rel) => (
            <Link
              key={rel.slug}
              to={`/services/${rel.slug}`}
              className="p-6 rounded-3xl bg-white/60 border border-black/10 hover:border-gold/40 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold block mb-2">
                  {rel.pillar}
                </span>
                <h4 className="text-lg font-light text-black group-hover:text-gold transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-black/65 font-light line-clamp-2">
                  {rel.tagline}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between text-xs text-black/80 font-medium">
                <span>View Scope</span>
                <Icon icon="lucide:arrow-right" className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
