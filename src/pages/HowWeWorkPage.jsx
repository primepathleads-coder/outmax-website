import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const steps = [
  {
    number: "01",
    title: "Discovery & Business Requirements",
    summary:
      "We begin by understanding your current operational workflows, pain points, communication channels, software stack, and commercial targets.",
    details: [
      "Reviewing existing SOPs, call scripts, and escalation procedures",
      "Analyzing volume patterns, channel distribution, and customer touchpoints",
      "Establishing baseline metrics (CSAT, response times, target CAC, ROAS)",
    ],
    icon: "solar:magnifer-bold",
  },
  {
    number: "02",
    title: "Scope Definition & Service Alignment",
    summary:
      "We design a tailored engagement structure specifying team sizing, shift hours, platform tooling, and reporting intervals.",
    details: [
      "Selecting the right engagement model (dedicated squad or hybrid team)",
      "Defining clear responsibilities, KPIs, and deliverables",
      "Agreeing on communication rhythms (Slack, Teams, weekly syncs)",
    ],
    icon: "solar:notes-bold",
  },
  {
    number: "03",
    title: "Team Onboarding & Campaign Setup",
    summary:
      "Our team is immersed in your brand voice, trained on your products, and integrated into your software infrastructure.",
    details: [
      "Conducting brand immersion, product testing, and scenario simulation",
      "Configuring platform access (CRM, telephony, ad accounts, Everflow)",
      "Supervised dry runs with team lead scoring before go-live",
    ],
    icon: "solar:users-group-two-rounded-bold",
  },
  {
    number: "04",
    title: "Execution & Operational Delivery",
    summary:
      "Live launch of operational workflows, customer care queues, media buying campaigns, or engineering sprints.",
    details: [
      "Managing live inbound/outbound queues under active supervision",
      "Deploying and pacing paid ad campaigns across Meta and TikTok",
      "Enforcing strict data security, privacy controls, and QA rubrics",
    ],
    icon: "solar:play-circle-bold",
  },
  {
    number: "05",
    title: "Reporting, Communication & Optimization",
    summary:
      "Continuous performance auditing and transparent reporting ensure leadership has real-time clarity on progress.",
    details: [
      "Providing live cloud dashboard access for real-time tracking",
      "Weekly executive reviews highlighting wins, bottlenecks, and solutions",
      "Iterating scripts, ad creatives, and workflows to improve efficiency",
    ],
    icon: "solar:chart-2-bold",
  },
  {
    number: "06",
    title: "Scaling & Ongoing Improvement",
    summary:
      "As performance stabilizes, we expand team capacity, launch additional channels, and integrate complementary disciplines.",
    details: [
      "Adding shift coverage or seasonal squads without domestic hiring drag",
      "Cross-pollinating disciplines (e.g. adding email flows to media buying)",
      "Driving long-term enterprise value through continuous operational refinement",
    ],
    icon: "solar:rocket-2-bold",
  },
];

export const HowWeWorkPage = () => {
  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="How We Work"
        description="Explore Outmax Services Ltd's 6-stage operational delivery framework: Discovery, Scope Definition, Setup, Execution, Reporting, and Scaling."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Operational Methodology
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-black leading-[1.08]">
            A Disciplined 6-Stage Framework
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            We focus on solving real business problems rather than simply listing services. Here is how we transition from initial discovery into dependable day-to-day execution.
          </p>
        </div>
      </section>

      {/* 6-Stage Interactive Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((st) => (
            <div
              key={st.number}
              className="p-8 rounded-3xl bg-white/70 border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-mono text-gold font-light">
                    {st.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                    <Icon icon={st.icon} className="size-5 text-black group-hover:text-gold transition-colors" />
                  </div>
                </div>

                <h2 className="text-xl font-medium text-black leading-snug">
                  {st.title}
                </h2>

                <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed">
                  {st.summary}
                </p>

                <div className="pt-4 border-t border-black/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/50 block mb-1">
                    Key Activities:
                  </span>
                  {st.details.map((det, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-black/80 font-light">
                      <Icon icon="lucide:check" className="size-3 text-gold shrink-0 mt-0.5" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Models Comparison */}
      <section className="bg-black text-white py-24 rounded-4xl mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
              Flexibility & Structure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
              Flexible Engagement Models
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light">
              We structure our working arrangements to match your operational stage, growth velocity, and internal resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Dedicated Operational Squad",
                badge: "Full-Time Embedded",
                desc: "A dedicated team of professionals working exclusively for your company, managed under your SOPs with our supervisory QA oversight.",
                bestFor: "Customer support, outbound SDR engines, and continuous daily bookkeeping.",
                perks: ["100% dedicated talent", "Multi-shift coverage", "Direct daily communication via Slack/Teams"],
              },
              {
                title: "Campaign & Performance Desks",
                badge: "Revenue Aligned",
                desc: "Specialized media buying and affiliate marketing desks deployed to hit clear acquisition and return on ad spend milestones.",
                bestFor: "Meta/TikTok advertising, Everflow affiliate programs, and ad monetization.",
                perks: ["ROAS & cost-per-purchase focus", "Continuous creative A/B sprints", "Live cloud attribution dashboards"],
              },
              {
                title: "Integrated Hybrid Model",
                badge: "Comprehensive Growth",
                desc: "Combining multiple disciplines ,  such as web engineering, paid traffic, and customer support ,  into a unified operational engine.",
                bestFor: "High-growth brands and scale-ups needing rapid cross-functional execution.",
                perks: ["One partner across all channels", "Lower administrative overhead", "Elimination of vendor finger-pointing"],
              },
            ].map((model, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1 border border-gold/30 inline-block">
                    {model.badge}
                  </span>
                  <h3 className="text-2xl font-light text-white">{model.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {model.desc}
                  </p>

                  <div className="p-3 rounded-xl bg-white/5 text-xs text-white/80 font-light border border-white/5">
                    <strong className="text-gold font-medium">Ideal For:</strong> {model.bestFor}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {model.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-white/80 font-light">
                      <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication & Account Management CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white/80 border border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              Dedicated Account Governance
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-black">
              Every Engagement Has a Dedicated Account Lead
            </h3>
            <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
              You will never be passed between nameless ticketing queues. Outmax assigns a designated account manager to coordinate weekly syncs, performance reviews, and operational adjustments.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-colors shrink-0 shadow-md"
          >
            <span>Plan Your Next Engagement</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowWeWorkPage;
