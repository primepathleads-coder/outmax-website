import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { portfolioData } from "../data/portfolioData";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

const Works = () => {
  const overlayRefs = useRef([]);

  const text = `Recent digital builds and operational channels engineered
to convert traffic, scale engagement, and monetize audiences`;

  useGSAP(() => {
    gsap.from("#project", {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.25,
        ease: "power2.out",
      }
    );
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.25,
      ease: "power2.in",
    });
  };

  return (
    <section id="work" className="flex flex-col min-h-screen pt-16 pb-24">
      <AnimatedHeaderSection
        subTitle={"Proven Builds & Digital Capabilities"}
        title={"Selected Builds"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="relative flex flex-col font-light mt-6">
        {portfolioData.map((project, index) => (
          <Link
            to="/portfolio"
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-7 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* GSAP animated hover overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* Title & Category Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14 text-black transition-all duration-300 md:group-hover:px-16 md:group-hover:text-white">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold block mb-1">
                  {project.category}
                </span>
                <h2 className="lg:text-[34px] sm:text-[28px] text-[22px] leading-tight font-light">
                  {project.title}
                </h2>
              </div>
              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                <span className="text-xs uppercase tracking-wider text-black/60 md:group-hover:text-white/60 hidden sm:inline">
                  {project.subtitle}
                </span>
                <div className="w-10 h-10 rounded-full border border-black/20 md:group-hover:border-white/30 flex items-center justify-center transition-colors">
                  <Icon icon="lucide:arrow-up-right" className="size-5 md:group-hover:text-gold" />
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="w-full h-px bg-black/15 my-3" />

            {/* Tags / Technologies */}
            <div className="flex flex-wrap items-center px-4 sm:px-6 md:px-10 lg:px-14 text-xs uppercase transition-all duration-300 gap-x-4 gap-y-1.5 md:group-hover:px-16">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-black/70 transition-colors duration-300 md:group-hover:text-white/80"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Mobile preview image */}
            <div className="relative flex items-center justify-center px-4 md:hidden h-[240px] mt-4">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="object-cover w-full h-full rounded-2xl brightness-90 shadow-lg"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pt-10 text-center">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-all duration-300 shadow-md"
        >
          <span>Explore All Documented Case Capabilities</span>
          <Icon icon="lucide:arrow-right" className="size-4" />
        </Link>
      </div>
    </section>
  );
};

export default Works;
