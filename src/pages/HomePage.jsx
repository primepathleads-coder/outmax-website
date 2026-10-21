import React from "react";
import Hero from "../sections/Hero";
import ServiceSummary from "../sections/ServiceSummary";
import Services from "../sections/Services";
import About from "../sections/About";
import Works from "../sections/Works";
import ContactSummary from "../sections/ContactSummary";
import Contact from "../sections/Contact";
import SEO from "../components/SEO";
import { companyInfo } from "../data/companyData";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import PartnerLogos from "../components/PartnerLogos";

export const HomePage = () => {
  return (
    <div className="relative">
      <SEO
        title="Outmax Services — Business Process Outsourcing, Performance Marketing & Digital Operations"
        description="Scale business operations with Outmax Services. Specializing in 24/7 dedicated BPO teams, legal intake lead qualification, high-velocity Meta media buying, and custom web builds."
      />

      {/* 3D Hero Section */}
      <Hero />

      {/* Verified Performance Metrics Strip */}
      <section className="bg-black text-white py-14 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold block mb-1">
                Verified Platform Performance
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                Documented Commercial Results
              </h2>
            </div>
            <Link
              to="/results"
              className="text-xs uppercase tracking-wider font-semibold text-gold hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Full Results Methodology</span>
              <Icon icon="lucide:arrow-right" className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.metrics.map((metric, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 border border-gold/20">
                    {metric.badge}
                  </span>
                  <Icon icon={metric.icon} className="size-5 text-white/40 group-hover:text-gold transition-colors" />
                </div>
                <div className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/90 mb-2">
                  {metric.label}
                </div>
                <p className="text-xs font-light text-white/60 leading-relaxed">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kinetic Typography Divider */}
      <ServiceSummary />

      {/* 3 Core Pillars Strategic Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">
            The Three Pillars of Outmax
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black mb-4">
            Unified Growth Architecture
          </h2>
          <p className="text-sm sm:text-base text-black/70 font-light leading-relaxed">
            By integrating operational outsourcing with customer acquisition and digital engineering, we eliminate the friction between separate vendors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyInfo.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-3xl overflow-hidden bg-white/60 border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-xl font-light text-white leading-tight">
                    {pillar.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed">
                  {pillar.description}
                </p>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="text-xs text-black/50 font-mono">
                    {pillar.serviceCount}
                  </span>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black group-hover:text-gold transition-colors"
                  >
                    <span>View Capabilities</span>
                    <Icon icon="lucide:arrow-right" className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Services Stack */}
      <Services />

      {/* Executive About Section */}
      <About />

      {/* Selected Works & Builds */}
      <Works />

      {/* Strategic Partners & Ad Platforms */}
      <PartnerLogos />

      {/* Industries Preview Banner */}
      <section className="bg-[#121110] text-white py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold block">
                Target Sectors
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
                12 Industries Powered by Outmax
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                From early-stage startups and high-velocity e-commerce stores to healthcare networks, legal portals, and financial services.
              </p>
              <div className="pt-2">
                <Link
                  to="/industries"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white hover:text-black transition-colors"
                >
                  <span>Explore Industry Solutions</span>
                  <Icon icon="lucide:arrow-right" className="size-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Startups & Seed Ventures",
                "Small & Medium Business",
                "Enterprises & Scale-Ups",
                "E-Commerce & DTC",
                "SaaS & Tech Platforms",
                "Healthcare & Wellness",
                "Real Estate Portals",
                "Legal Firms & Claims",
                "Financial Services",
                "Marketing Agencies",
                "Affiliate Publishers",
                "Professional Services",
              ].map((ind, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 transition-all flex items-center gap-2.5"
                >
                  <Icon icon="solar:round-alt-arrow-right-bold" className="size-4 text-gold shrink-0" />
                  <span className="text-xs text-white/90 font-light">{ind}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Marquee & Statement */}
      <ContactSummary />

      {/* Bottom Contact Section */}
      <Contact />
    </div>
  );
};

export default HomePage;
