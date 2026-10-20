import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { companyInfo } from "../data/companyData";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const Contact = () => {
  const text = `Discuss your outsourcing requirements, performance marketing campaigns,
or technology development with our executive leadership`;

  const items = [
    "Outmax Services Ltd",
    "Scale Operations",
    "Inbound Support",
    "Outbound SDR",
    "Affiliate Tracking",
    "Media Buying Desk",
    "Web Engineering",
  ];

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black text-white pt-16"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"Initiate Partnership"}
          title={"Get In Touch"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        <div className="px-4 sm:px-6 md:px-10 lg:px-14 font-light uppercase lg:text-[28px] text-[22px] leading-none mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Headquarters */}
            <div className="social-link">
              <h2 className="text-sm font-semibold tracking-[0.25em] text-gold uppercase mb-2">
                Corporate Address
              </h2>
              <div className="w-full h-px my-2 bg-white/20" />
              <p className="text-base sm:text-lg tracking-normal font-light normal-case text-white/90 leading-relaxed">
                {companyInfo.location.formatted}
              </p>
            </div>

            {/* Email Contact */}
            <div className="social-link">
              <h2 className="text-sm font-semibold tracking-[0.25em] text-gold uppercase mb-2">
                Executive Desk
              </h2>
              <div className="w-full h-px my-2 bg-white/20" />
              <p className="text-lg sm:text-xl tracking-wider lowercase text-white font-light mb-1">
                {companyInfo.contact.inquiryEmail}
              </p>
              <span className="text-xs normal-case text-white/50 tracking-normal block">
                Official B2B Inquiry Channel
              </span>
            </div>

            {/* Consultation Action */}
            <div className="social-link">
              <h2 className="text-sm font-semibold tracking-[0.25em] text-gold uppercase mb-2">
                Direct Consultation
              </h2>
              <div className="w-full h-px my-2 bg-white/20" />
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-gold text-black hover:bg-white hover:text-black transition-all duration-300"
                >
                  <span>Open Inquiry Form</span>
                  <Icon icon="lucide:arrow-right" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee
        items={items}
        icon="lucide:diamond"
        iconClassName="size-2.5 text-gold"
        className="text-white bg-transparent border-t border-white/10"
      />
    </section>
  );
};

export default Contact;
