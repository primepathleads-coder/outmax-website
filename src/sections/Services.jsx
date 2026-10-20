import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const homeServiceCards = [
  {
    title: "Business Process Outsourcing (BPO)",
    description:
      "End-to-end inbound and outbound operational solutions designed to function as an organic extension of your corporate team.",
    image: "/assets/photos/bpo-team.jpg",
    link: "/services/business-process-outsourcing",
    badge: "Operations & Support",
    items: [
      { title: "24/7 Omnichannel Customer Support & Helpdesk", link: "/services/customer-support" },
      { title: "Technical Support, Live Answering & Order Processing", link: "/services/customer-support" },
      { title: "Sales Development Reps (SDRs) & Cold Calling", link: "/services/sales-lead-generation" },
      { title: "Appointment Setting & Deal Pipeline Qualification", link: "/services/sales-lead-generation" },
    ],
  },
  {
    title: "Performance Marketing & Media Buying",
    description:
      "Data-driven traffic acquisition, $1.88M+ managed Meta ad spend, and publisher management via Everflow.",
    image: "/assets/photos/media-buying.jpg",
    link: "/services/media-buying",
    badge: "Revenue Acceleration",
    items: [
      { title: "Paid Social Advertising (Meta Ads, TikTok Ads) ,  $1.88M+ Spend", link: "/services/media-buying" },
      { title: "Affiliate Marketing & Network Partnerships (Everflow)", link: "/services/affiliate-marketing" },
      { title: "High-Volume Email Infrastructure (8M+ Sends, 12.59% CTOR)", link: "/services/digital-marketing" },
      { title: "Full-Funnel A/B Creative Testing & Real-Time ROAS Optimization", link: "/services/media-buying" },
    ],
  },
  {
    title: "Ad Monetization & Domain Portfolios",
    description:
      "Search arbitrage (RSOC) and Ads-for-Domains (AFD) scaled through tier-1 search partnerships including System1 (RAMP Partner).",
    image: "/assets/photos/ad-monetization.jpg",
    link: "/services/ad-monetization",
    badge: "Digital Yields",
    items: [
      { title: "System1 RAMP Partner Monetization ,  $59K+ 30-Day AFD", link: "/services/ad-monetization" },
      { title: "Search Arbitrage (RSOC) & Feed Keyword Optimization", link: "/services/ad-monetization" },
      { title: "Domain Parking & Portfolio Management (Bodis & Sedo)", link: "/services/ad-monetization" },
      { title: "Traffic Acquisition & Net Arbitrage Spread Scaling", link: "/services/ad-monetization" },
    ],
  },
  {
    title: "Digital Solutions, Brand & Back-Office",
    description:
      "Full-stack web engineering, brand strategy, recruitment support, and daily bookkeeping for growing enterprises.",
    image: "/assets/photos/web-development.jpg",
    link: "/services/web-development",
    badge: "Technology & Back-Office",
    items: [
      { title: "Website & Custom Web Application Development", link: "/services/web-development" },
      { title: "Brand Strategy, Visual Identity & Creative Positioning", link: "/services/branding" },
      { title: "HR, Talent Acquisition & Employee Onboarding Coordination", link: "/services/hr-recruitment" },
      { title: "Daily Bookkeeping, AP/AR & Monthly Financial Reporting", link: "/services/bookkeeping" },
    ],
  },
];

const Services = () => {
  const text = `A comprehensive suite of outsourcing, marketing, and technology solutions
supporting every stage of operations ,  from customer engagement to digital infrastructure`;

  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); // 768px

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        y: 120,
        opacity: 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl text-white pt-12 pb-24">
      <AnimatedHeaderSection
        subTitle={"Integrated Operational Capabilities"}
        title={"Our Services"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="px-4 sm:px-6 md:px-10 lg:px-12 mt-8 space-y-12">
        {homeServiceCards.map((service, index) => (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            className="sticky px-6 sm:px-8 md:px-10 lg:px-12 py-10 text-white bg-[#141413] rounded-3xl border border-white/15 shadow-2xl transition-all duration-300"
            style={
              isDesktop
                ? {
                    top: `calc(7vh + ${index * 3.5}em)`,
                    marginBottom: `${(homeServiceCards.length - index - 1) * 3}rem`,
                  }
                : { top: "5rem", marginBottom: "2rem" }
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Title, Description, Image */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-widest bg-gold/15 text-gold border border-gold/30">
                  {service.badge}
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
                  {service.title}
                </h2>

                <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                  {service.description}
                </p>

                <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 border border-white/10 group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <Link
                    to={service.link}
                    className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white bg-black/70 backdrop-blur-sm px-4 py-2 border border-white/20 hover:bg-gold hover:text-black transition-colors"
                  >
                    <span>View Category Details</span>
                    <Icon icon="lucide:arrow-right" className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Individual Sub-Service Items */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full pt-2">
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white/40 mb-2">
                    Key Offerings in this Domain:
                  </h3>
                  {service.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.link}
                      className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold/40 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-gold/70">
                          0{itemIndex + 1}
                        </span>
                        <span className="text-sm sm:text-base text-white/90 group-hover:text-gold transition-colors font-light">
                          {item.title}
                        </span>
                      </div>
                      <Icon
                        icon="lucide:chevron-right"
                        className="size-4 text-white/40 group-hover:text-gold group-hover:translate-x-1 transition-all"
                      />
                    </Link>
                  ))}
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/50">
                    SOP-driven execution & transparent metrics
                  </span>
                  <Link
                    to="/services"
                    className="text-xs uppercase tracking-wider font-semibold text-gold hover:text-white inline-flex items-center gap-1.5"
                  >
                    Directory
                    <Icon icon="lucide:arrow-up-right" className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
