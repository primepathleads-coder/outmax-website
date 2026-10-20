import React from "react";
import SEO from "../components/SEO";
import { companyInfo } from "../data/companyData";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ResultsPage = () => {
  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Documented Results & Capabilities"
        description="Review documented commercial results for Outmax Services Ltd: $1.88M+ Meta ad spend across 462 campaigns, $59K+ 30-day AFD revenue, and 8M+ emails with 12.59% CTOR."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Operational Track Record
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-black leading-[1.08]">
            Documented Results & Capabilities
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            A snapshot of the live campaigns and channels we manage across email marketing, affiliate marketing, media buying, and ad monetization ,  the real, measurable metrics behind our client engagements.
          </p>
          <div className="p-4 rounded-2xl bg-black/5 border border-black/10 text-xs text-black/70 flex items-center gap-3">
            <Icon icon="solar:info-circle-bold" className="size-5 text-gold shrink-0" />
            <span>
              Figures reflect platform-tracked dashboards across our email, affiliate, media buying, and ad-monetization channels as documented in the official company overview.
            </span>
          </div>
        </div>
      </section>

      {/* The 4 Core Platform Metrics Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Metric 1: Meta Ad Spend */}
          <div className="p-8 sm:p-10 rounded-3xl bg-black text-white border border-white/10 shadow-xl space-y-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 border border-gold/30">
                Paid Traffic Desks
              </span>
              <Icon icon="solar:chart-2-bold" className="size-6 text-white/40 group-hover:text-gold transition-colors" />
            </div>

            <div>
              <div className="text-5xl sm:text-6xl font-light tracking-tight text-white mb-2">
                $1.88M+
              </div>
              <h2 className="text-lg uppercase tracking-wider font-semibold text-white/90">
                Managed Ad Spend
              </h2>
            </div>

            <p className="text-sm font-light text-white/70 leading-relaxed">
              Across 462 reported campaigns on Meta Ads ,  tracked in real time for ROAS and cost-per-purchase. Our media buying desk plans, launches, and optimizes paid social advertising to maximize commercial return.
            </p>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-white/50 block font-light">Reported Campaigns</span>
                <span className="text-base font-medium text-white">462 Campaigns</span>
              </div>
              <div>
                <span className="text-white/50 block font-light">Primary Platforms</span>
                <span className="text-base font-medium text-white">Meta Ads & TikTok</span>
              </div>
            </div>
          </div>

          {/* Metric 2: 30-Day AFD Revenue */}
          <div className="p-8 sm:p-10 rounded-3xl bg-black text-white border border-white/10 shadow-xl space-y-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 border border-gold/30">
                System1 RAMP Partner
              </span>
              <Icon icon="solar:dollar-bold" className="size-6 text-white/40 group-hover:text-gold transition-colors" />
            </div>

            <div>
              <div className="text-5xl sm:text-6xl font-light tracking-tight text-white mb-2">
                $59K+
              </div>
              <h2 className="text-lg uppercase tracking-wider font-semibold text-white/90">
                30-Day AFD Revenue
              </h2>
            </div>

            <p className="text-sm font-light text-white/70 leading-relaxed">
              Tracked live through System1 (RAMP Partner), alongside domain portfolio monetization via Bodis and Sedo. Giving clients and digital asset owners a diversified, real-time view of ad monetization yield.
            </p>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-white/50 block font-light">Monetization Model</span>
                <span className="text-base font-medium text-white">AFD & RSOC Feeds</span>
              </div>
              <div>
                <span className="text-white/50 block font-light">Platform Partners</span>
                <span className="text-base font-medium text-white">System1, Sedo, Bodis</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Email Sends */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-black/10 shadow-lg space-y-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-black bg-black/5 px-3 py-1 border border-black/10">
                Proprietary Mailer Desk
              </span>
              <Icon icon="solar:letter-bold" className="size-6 text-black/40 group-hover:text-gold transition-colors" />
            </div>

            <div>
              <div className="text-5xl sm:text-6xl font-light tracking-tight text-black mb-2">
                8M+
              </div>
              <h2 className="text-lg uppercase tracking-wider font-semibold text-black/90">
                Emails Sent
              </h2>
            </div>

            <p className="text-sm font-light text-black/70 leading-relaxed">
              Our mailer infrastructure sustains a high-volume sending cadence with strong deliverability ,  8M+ emails sent to a base of 154K+ active subscribers, maintaining inbox placement across major consumer and enterprise ESPs.
            </p>

            <div className="pt-4 border-t border-black/10 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-black/50 block font-light">Active Subscriber Base</span>
                <span className="text-base font-medium text-black">154K+ Contacts</span>
              </div>
              <div>
                <span className="text-black/50 block font-light">Infrastructure</span>
                <span className="text-base font-medium text-black">Dedicated IP Warmup</span>
              </div>
            </div>
          </div>

          {/* Metric 4: Campaign CTOR */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-black/10 shadow-lg space-y-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-black bg-black/5 px-3 py-1 border border-black/10">
                Audience Engagement
              </span>
              <Icon icon="solar:graph-up-bold" className="size-6 text-black/40 group-hover:text-gold transition-colors" />
            </div>

            <div>
              <div className="text-5xl sm:text-6xl font-light tracking-tight text-black mb-2">
                12.59%
              </div>
              <h2 className="text-lg uppercase tracking-wider font-semibold text-black/90">
                Campaign CTOR
              </h2>
            </div>

            <p className="text-sm font-light text-black/70 leading-relaxed">
              Click-to-open rate held across recent campaigns. Demonstrates audience relevance, precise behavioral segmentation, and conversion-oriented editorial copywriting designed to drive downstream action.
            </p>

            <div className="pt-4 border-t border-black/10 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-black/50 block font-light">Measurement Basis</span>
                <span className="text-base font-medium text-black">Unique Clicks / Opens</span>
              </div>
              <div>
                <span className="text-black/50 block font-light">Benchmarking</span>
                <span className="text-base font-medium text-black">Top Decile B2B</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Breakdown: How We Deliver These Results */}
      <section className="bg-black text-white py-24 rounded-4xl mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
              Channel Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
              How We Deliver These Results
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light">
              Detailed methodologies connecting technical infrastructure, media buying, and partner platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                <Icon icon="solar:letter-bold" className="size-5 text-gold" />
                <span>High-Volume Mailer Infrastructure</span>
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Our mailer infrastructure sustains high-volume sending cadences while maintaining domain reputation through automated IP warming, feedback loop monitoring, and segmented list hygiene.
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-light pt-2">
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>8M+ emails delivered across recent high-volume campaigns</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>154K+ engaged subscriber database sustained</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>12.59% click-to-open rate across monitored broadcasts</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                <Icon icon="solar:graph-up-bold" className="size-5 text-gold" />
                <span>Affiliate Marketing & Media Buying</span>
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Partner performance is tracked end-to-end through Everflow, covering payout management and fraud monitoring, while our Meta Ads desk has managed $1.88M+ in ad spend across 462 reported campaigns.
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-light pt-2">
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>Server-to-server tracking configured on Everflow</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>$1.88M+ managed ad spend across 462 reported campaigns</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>Continuous purchase ROAS and cost-per-purchase optimization</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                <Icon icon="solar:dollar-bold" className="size-5 text-gold" />
                <span>Ad Monetization (AFD / RSOC)</span>
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Through RAMP partner System1 we track $59K+ in 30-day AFD revenue, alongside domain portfolio monetization managed through Bodis and Sedo ,  giving clients a diversified, real-time view of ad monetization performance.
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-light pt-2">
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>System1 RAMP Partner direct access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>$59K+ documented 30-day AFD monetization revenue</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>Domain portfolio monetization via Bodis and Sedo</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                <Icon icon="solar:code-2-bold" className="size-5 text-gold" />
                <span>Web & App Development Builds</span>
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Recent builds span legal-claims lead generation sites, hospitality brand websites, e-commerce product experiences, and wellness community platforms ,  each designed to convert traffic generated by our marketing channels.
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-light pt-2">
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>Conversion-focused architectures built with React & Next.js</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>Sub-second mobile speeds and seamless CRM dialer webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="lucide:check" className="size-3.5 text-gold shrink-0" />
                  <span>Built specifically to convert paid and organic traffic streams</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Transparency Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-white/70 border border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              Reporting Standards
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-black">
              Total Transparency Across Every Engagement
            </h3>
            <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed">
              We provide live cloud dashboards, weekly strategic check-ins, and direct platform access. We distinguish aggregate company metrics from individual client performance, ensuring you have an honest view of campaign trajectory.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-colors shrink-0 shadow-md"
          >
            <span>Review Your Campaign Needs</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ResultsPage;
