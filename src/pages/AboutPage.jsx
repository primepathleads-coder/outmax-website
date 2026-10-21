import React from "react";
import SEO from "../components/SEO";
import { companyInfo } from "../data/companyData";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TeamShowcase from "../components/TeamShowcase";
import PartnerLogos from "../components/PartnerLogos";

export const AboutPage = () => {
  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="About Outmax Services | Leadership, Mission & Global Operations"
        description="Meet Outmax Services, led by CEO Hamid Iqbal Khan and MD Abdul Moiz Khan. Providing enterprise BPO, lead acquisition desks, and performance marketing from Rawalpindi, Pakistan."
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-[1.08] text-black">
            An Embedded Extension of Your Team
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            Outmax Services Ltd is an outsourcing company and digital growth partner that helps businesses reduce operational costs, improve efficiency, and scale their operations.
          </p>
        </div>

        {/* Visual Composition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
          <div className="md:col-span-8 rounded-none overflow-hidden h-[360px] sm:h-[480px] border border-black/10 shadow-lg relative group">
            <img
              src="/assets/photos/team-collaboration.jpg"
              alt="Outmax Team Strategy Session"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block mb-1">
                Operational Backbone
              </span>
              <p className="text-sm sm:text-base font-light text-white/90">
                Cross-departmental collaboration connecting customer care, paid media, and engineering squads.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-none overflow-hidden h-[360px] sm:h-[480px] border border-black/10 shadow-lg relative group">
            <img
              src="/assets/photos/office-hq.jpg"
              alt="Outmax Corporate Headquarters"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold block mb-1">
                Location
              </span>
              <p className="font-light text-white/90 text-sm">
                Civic Center, Bahria Town Phase 4, Rawalpindi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Leadership Section: Hamid Iqbal Khan */}
      <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-[#08080c] text-white border-y border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24">
          {/* CEO Photo (Seamless transparent cutout) */}
          <div className="w-full md:w-1/2 flex justify-center shrink-0">
            <div className="relative w-full aspect-[4/5] max-w-[420px] flex items-end justify-center overflow-visible">
              <img
                src="/images/executives/hamid.png"
                alt="Hamid Iqbal Khan"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)] grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
          </div>

          {/* CEO Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
            <span className="font-mono text-gold tracking-widest text-[11px] md:text-xs uppercase mb-3 block">
              Leadership
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#f5f5f7] leading-none mb-3 font-script">
              Hamid Iqbal Khan
            </h2>
            <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-white/70 mb-6">
              Chief Executive Officer & Legal Counsel
            </p>
            <div className="h-px w-16 md:w-24 bg-gold/50 mb-6" />
            <p className="text-white/75 leading-relaxed text-sm sm:text-base md:text-lg mb-4 font-light">
              Hamid Iqbal Khan provides overarching executive leadership, high-level strategic governance, and compliance oversight to Outmax Services Ltd. His leadership ensures our outsourcing frameworks, international operations, and partner agreements operate under rigorous legal and corporate standards.
            </p>
            <p className="text-white/65 leading-relaxed text-sm sm:text-base font-light">
              Under his direction, Outmax Services Ltd has expanded from an operational support center into a multifaceted digital growth powerhouse, safeguarding commercial assets while scaling revenue globally.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Board Section: Dr. Azhar Munir & Abdul Moiz Khan */}
      <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-[#0d0d11] text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <span className="font-mono text-gold tracking-widest text-xs uppercase mb-3 block">
              Executive Board
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white leading-none mb-4 font-light">
              The Strategic Vanguard
            </h2>
            <div className="h-px w-16 md:w-24 bg-gold/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-end">
            {/* 1. Dr. Azhar Munir (FIRST) */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center text-center sm:text-left lg:text-center group gap-6 sm:gap-8 lg:gap-0">
              <div className="relative w-56 sm:w-64 lg:w-full aspect-[4/5] lg:max-w-[360px] shrink-0 lg:mb-8 flex items-end justify-center mx-auto overflow-visible">
                <img
                  src="/images/executives/azhar.png"
                  alt="Dr. Azhar Munir"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-3xl sm:text-4xl md:text-5xl text-white mb-2 font-script group-hover:text-gold transition-colors duration-500">
                  Dr. Azhar Munir
                </h3>
                <p className="font-mono text-xs tracking-widest uppercase text-gold mb-4">
                  Chief Technology Officer & Board Member
                </p>
                <p className="text-white/70 leading-relaxed text-xs sm:text-sm max-w-sm mx-auto font-light">
                  Spearheading technological innovation and scalable architecture. Dr. Munir ensures Outmax operational infrastructure remains at the bleeding edge of global tech standards.
                </p>
              </div>
            </div>

            {/* 2. Abdul Moiz Khan (SECOND) */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center text-center sm:text-left lg:text-center group gap-6 sm:gap-8 lg:gap-0">
              <div className="relative w-56 sm:w-64 lg:w-full aspect-[4/5] lg:max-w-[360px] shrink-0 lg:mb-8 flex items-end justify-center mx-auto overflow-visible">
                <img
                  src="/images/team/moiz-khan.png"
                  alt="Abdul Moiz Khan"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-3xl sm:text-4xl md:text-5xl text-white mb-2 font-script group-hover:text-gold transition-colors duration-500">
                  Abdul Moiz Khan
                </h3>
                <p className="font-mono text-xs tracking-widest uppercase text-gold mb-4">
                  Managing Director
                </p>
                <p className="text-white/70 leading-relaxed text-xs sm:text-sm max-w-sm mx-auto font-light">
                  A relentless force in business development and strategy, Abdul Moiz Khan spearheads operational expansion with surgical precision, managing day-to-day operations across BPO, performance marketing, and digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Operational Squad / Team Showcase */}
      <section className="py-24 bg-[#08080c] text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <span className="font-mono text-gold tracking-widest text-xs uppercase mb-3 block text-center">
            Our Elite Squad
          </span>
          <h2 className="text-3xl md:text-5xl text-white mb-16 text-center font-light">
            The Specialists Behind the Growth
          </h2>
          <TeamShowcase />
        </div>
      </section>

      {/* Partners and Platforms We Have Worked With */}
      <PartnerLogos />

      {/* Operating Philosophy */}
      <section className="bg-black text-white py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
                Operating Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
                Why We Built the Extension Model
              </h2>
              <p className="text-white/70 font-light text-base leading-relaxed">
                Traditional outsourcing suffers from misaligned incentives: vendors focus on ticket counts and billable hours rather than true business outcomes.
              </p>
              <p className="text-white/70 font-light text-base leading-relaxed">
                At Outmax, our mission is to help businesses focus entirely on core strategy and product growth while we manage the day-to-day operations, marketing campaigns, and digital infrastructure that keep companies running efficiently and profitably.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "solar:users-group-two-rounded-bold",
                  title: "Cost-Effective Scalability",
                  desc: "Reduce overhead without sacrificing execution quality. Access high-caliber professionals across support, sales, marketing, and finance.",
                },
                {
                  icon: "solar:verified-check-bold",
                  title: "Deep Workflow Integration",
                  desc: "We embed directly into your CRM, ticketing systems, Slack, and telephony. No parallel silos; we operate as an organic part of your team.",
                },
                {
                  icon: "solar:chart-square-bold",
                  title: "Quantifiable Performance",
                  desc: "Every department functions under transparent scorecards, from First Contact Resolution and CSAT to ROAS and qualified pipeline generation.",
                },
                {
                  icon: "solar:shield-check-bold",
                  title: "Long-Term Partnerships",
                  desc: "We frequently combine multiple disciplines, such as media buying with affiliate marketing, to deliver comprehensive, end-to-end solutions.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-8 bg-white/5 border border-white/10 hover:border-gold/40 transition-all duration-300 space-y-3"
                >
                  <Icon icon={item.icon} className="size-8 text-gold mb-2" />
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified Track Record Summary */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Documented Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">
            The Numbers Behind Our Engagements
          </h2>
          <p className="text-sm sm:text-base text-black/70 font-light">
            Live figures tracked across our email mailer infrastructure, affiliate networks, Meta ad desks, and ad-monetization platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-8 bg-white/70 border border-black/10 shadow-sm space-y-3"
            >
              <div className="text-4xl sm:text-5xl font-light text-black tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-black/90">
                {metric.label}
              </div>
              <p className="text-xs font-light text-black/60 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Details & Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-12 bg-[#1c1b1a] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-white/10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              Registered Corporate Office
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              Outmax Services Ltd
            </h3>
            <p className="text-white/75 font-light text-sm sm:text-base leading-relaxed">
              {companyInfo.location.formatted}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-white/50 pt-2">
              <span>Business Process Outsourcing (BPO)</span>
              <span>•</span>
              <span>Performance Marketing</span>
              <span>•</span>
              <span>Digital Solutions</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white transition-colors shrink-0 shadow-lg"
          >
            <span>Request Partnership Call</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
