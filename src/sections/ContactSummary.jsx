import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const ContactSummary = () => {
  const containerRef = useRef(null);
  const items = [
    "Cost Reduction",
    "Operational Efficiency",
    "Customer Care",
    "Media Buying",
    "Affiliate Scaling",
    "Ad Monetization",
    "Web Engineering",
  ];
  const items2 = [
    "Outmax Services Ltd",
    "Strategic BPO Partner",
    "Performance Marketing",
    "Mall View Building Wah Cantt",
    "Everflow Tracking",
    "Meta Ads Desk",
  ];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=600 center",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-[70vh] gap-12 mt-16 pb-12"
    >
      <Marquee
        items={items}
        icon="lucide:square"
        iconClassName="size-2 text-gold fill-gold"
      />

      <div className="overflow-hidden font-light text-center px-4 max-w-5xl mx-auto contact-text-responsive leading-tight">
        <p>
          “ Let’s build an <br />
          <span className="font-normal">efficient</span> &{" "}
          <span className="italic">scalable</span> <br />
          business operation <span className="text-gold">together</span> “
        </p>
        <p className="mt-6 text-sm sm:text-base font-light text-black/60 max-w-xl mx-auto leading-relaxed normal-case">
          Lower operational overhead. Faster campaign execution. One dedicated partner across customer support, marketing, and digital infrastructure.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-all duration-300 shadow-md"
          >
            <span>Request a Partnership Consultation</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>
          <a
            href="https://www.linkedin.com/company/outmax-services/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-wider font-semibold bg-white border border-black/15 text-black hover:border-black transition-all duration-300 shadow-sm"
          >
            <Icon icon="lucide:linkedin" className="size-4 text-[#0077b5]" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Second Marquee with Social Logos & Global Connectivity */}
      <div className="w-full border-y-2 border-black/15 py-3 bg-[#e5e5e0]">
        <div className="flex items-center justify-around overflow-hidden py-1">
          <Marquee
            items={[
              "Connect on LinkedIn @outmax-services",
              "Follow on X @OutmaxServices",
              "Direct Mail: contact@outmaxservices.com",
              "Meta Business Partner Network",
              "24/7 Global Shift Operations",
            ]}
            reverse={true}
            className="text-black bg-transparent"
            icon="ri:twitter-x-fill"
            iconClassName="size-4 text-black"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSummary;
