import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { companyInfo } from "../data/companyData";
import { Link } from "react-router-dom";

const About = () => {
  const text = `We act as an extension of our clients' teams by providing
skilled professionals and end-to-end business support across
multiple departments, from customer engagement to digital infrastructure`;

  const aboutText = `Our mission is to help businesses focus on growth while we handle the day-to-day operations, campaigns, and digital infrastructure that keep companies running efficiently and profitably.`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.98,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 90%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.8,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  }, []);

  return (
    <section id="about" className="min-h-screen bg-black text-white pt-16 pb-24">
      <AnimatedHeaderSection
        subTitle={"Who We Are & What We Stand For"}
        title={"About Outmax"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col items-center justify-between gap-12 sm:gap-16 px-4 sm:px-6 md:px-10 lg:px-12 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/70">
        {/* Visual Composition with Clip-Path Reveal */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative overflow-hidden border border-white/15 shadow-2xl">
            <img
              ref={imgRef}
              src="/images/executives/hamid.png"
              alt="Hamid Iqbal Khan — CEO, Outmax Services Ltd"
              className="w-full h-[420px] sm:h-[520px] object-contain object-bottom bg-[#0d0d10]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/80 backdrop-blur-md border border-white/10 text-xs normal-case font-normal">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gold uppercase tracking-[0.2em] font-semibold text-[11px]">
                  Corporate Leadership
                </span>
                <span className="text-white/60">Rawalpindi, Pakistan</span>
              </div>
              <p className="text-white/90 text-sm font-medium">
                Hamid Iqbal Khan (CEO) & Abdul Moiz Khan (MD)
              </p>
              <p className="text-white/60 text-xs mt-1">
                Apt No. 401, Building No. 153-H, Bahria Town Phase 4, Civic Center
              </p>
            </div>
          </div>
        </div>

        {/* Narrative & Value Proposition Bullet Points */}
        <div className="w-full lg:w-1/2 space-y-6">
          <AnimatedTextLines text={aboutText} className={"w-full text-white/90 text-lg sm:text-xl lg:text-2xl leading-relaxed"} />

          <div className="pt-4 space-y-4 text-sm sm:text-base font-light text-white/75">
            <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/5">
              <Icon icon="solar:check-read-bold" className="size-5 text-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-medium">Extension of Your Team:</strong> Seamless integration into your communication channels, SOPs, and CRM systems.
              </span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/5">
              <Icon icon="solar:graph-bold" className="size-5 text-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-medium">Measurable Outcomes:</strong> Focused on quantifiable metrics, from lower customer acquisition cost to rapid ticket resolution.
              </span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/5">
              <Icon icon="solar:shield-check-bold" className="size-5 text-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-medium">Operational Reliability:</strong> Supervised squads, continuous quality assurance auditing, and multi-shift capacity.
              </span>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/5">
              <Icon icon="solar:users-group-two-rounded-bold" className="size-5 text-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-medium">Multi-Disciplinary Synergy:</strong> Unifying BPO, media buying, domain monetization, and web development under one roof.
              </span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white hover:text-black transition-colors duration-300"
            >
              <span>Read Full Company Story</span>
              <Icon icon="lucide:arrow-right" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
