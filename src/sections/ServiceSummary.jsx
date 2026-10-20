import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 15,
      scrollTrigger: {
        trigger: "#title-service-1",
        scrub: true,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -20,
      scrollTrigger: {
        trigger: "#title-service-2",
        scrub: true,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 25,
      scrollTrigger: {
        trigger: "#title-service-3",
        scrub: true,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -30,
      scrollTrigger: {
        trigger: "#title-service-4",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="mt-16 overflow-hidden font-light leading-snug text-center mb-32 contact-text-responsive select-none">
      <div id="title-service-1">
        <p className="uppercase tracking-tight text-black/90">Customer Engagement</p>
      </div>

      <div
        id="title-service-2"
        className="flex items-center justify-center gap-4 translate-x-12"
      >
        <p className="font-normal uppercase text-black">Performance Marketing</p>
        <div className="w-12 h-1 md:w-28 bg-gold" />
        <p className="uppercase italic text-black/80">Media Buying</p>
      </div>

      <div
        id="title-service-3"
        className="flex items-center justify-center gap-4 -translate-x-32"
      >
        <p className="uppercase">BPO Operations</p>
        <div className="w-12 h-1 md:w-28 bg-gold" />
        <p className="italic uppercase text-gold">Everflow & Meta</p>
        <div className="w-12 h-1 md:w-28 bg-gold" />
        <p className="uppercase">Web Engineering</p>
      </div>

      <div id="title-service-4" className="translate-x-32">
        <p className="uppercase tracking-tight text-black/70">Scalable Infrastructure</p>
      </div>
    </section>
  );
};

export default ServiceSummary;
