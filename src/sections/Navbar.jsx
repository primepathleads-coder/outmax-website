import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import OutmaxLogo from "../components/OutmaxLogo";
import { servicesData } from "../data/servicesData";
import { companyInfo } from "../data/companyData";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close drawer and dropdown on route change
  useEffect(() => {
    if (isOpen) {
      tl.current?.reverse();
      iconTl.current?.reverse();
      setIsOpen(false);
    }
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: "power2.out",
        },
        "<+0.2"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        "<+0.1"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  const [logoVisible, setLogoVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);
      setShowBurger(isOpen || currentScrollY <= lastScrollY || currentScrollY < 10);
      // Hide logo on scroll down, show on scroll up
      setLogoVisible(currentScrollY <= lastScrollY || currentScrollY < 10 || isOpen);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Always show logo when menu is open
  useEffect(() => {
    if (isOpen) setLogoVisible(true);
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Results", path: "/results" },
    { name: "Industries", path: "/industries" },
    { name: "How We Work", path: "/how-we-work" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Insights", path: "/blog" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact", path: "/contact" },
    { name: "Team Portal", path: "/feed", isSpecial: true },
  ];

  return (
    <>
      {/* Top Left Floating Logo - hides on scroll down, reappears on scroll up */}
      <div
        className="fixed top-5 left-6 sm:left-10 z-40 transition-all duration-500"
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: logoVisible ? "auto" : "none",
        }}
      >
        <OutmaxLogo variant="dark" showTagline={true} size="lg" />
      </div>

      {/* Top Right Floating Team Portal Button */}
      <div
        className="fixed top-5 right-24 sm:right-32 z-40 transition-all duration-500 hidden sm:block"
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: logoVisible ? "auto" : "none",
        }}
      >
        <Link
          to="/feed"
          className="flex items-center gap-2 bg-black/80 hover:bg-[#cfa355] text-white hover:text-black border border-white/20 hover:border-[#cfa355] px-3.5 py-2 rounded-md text-[11px] uppercase tracking-[0.18em] font-medium backdrop-blur-md transition-all shadow-lg group"
        >
          <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400 group-hover:bg-black" />
          <span>Team Portal</span>
        </Link>
      </div>

      {/* Signature Awwwards Full-Height Slide-In Drawer Navigation */}
      <nav
        ref={navRef}
        className="fixed inset-0 z-50 flex flex-col justify-between w-full h-full px-6 sm:px-12 uppercase bg-black text-white/90 py-16 sm:py-20 gap-y-8 md:w-3/5 lg:w-1/2 md:left-2/5 lg:left-1/2 shadow-2xl overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <OutmaxLogo variant="light" size="md" />
          <span className="text-[11px] tracking-[0.25em] text-gold uppercase">
            Navigation
          </span>
        </div>

        <div className="flex flex-col text-2xl sm:text-3xl md:text-4xl lg:text-5xl gap-y-2 font-light">
          {navLinks.map((item, index) => (
            <div key={item.path} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                to={item.path}
                onClick={toggleMenu}
                className={`inline-flex items-center gap-3 transition-all duration-300 cursor-pointer hover:text-gold hover:translate-x-3 ${
                  item.isSpecial ? "text-[#cfa355]" : ""
                }`}
              >
                <span>{item.name}</span>
                {item.isSpecial && (
                  <span className="text-[10px] tracking-widest uppercase bg-[#cfa355]/20 text-[#cfa355] px-2 py-0.5 rounded-md border border-[#cfa355]/40 align-middle">
                    Members
                  </span>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Drawer Footer Information */}
        <div
          ref={contactRef}
          className="flex flex-col gap-6 pt-6 border-t border-white/10 text-xs normal-case font-light text-white/60"
        >
          <div>
            <p className="text-gold uppercase tracking-[0.2em] font-medium text-[10px] mb-1">
              Corporate Headquarters
            </p>
            <p className="leading-relaxed text-white/80">
              {companyInfo.location.formatted}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-gold uppercase tracking-[0.2em] font-medium text-[10px] mb-1">
                Executive Desk
              </p>
              <p className="text-white/80">{companyInfo.contact.inquiryEmail}</p>
            </div>
            <div className="text-right">
              <p className="text-gold uppercase tracking-[0.2em] font-medium text-[10px] mb-1">
                Leadership
              </p>
              <p className="text-white/80">Hamid Iqbal Khan (CEO) & Abdul Moiz Khan (MD)</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Signature Circular Hamburger Button */}
      <button
        type="button"
        aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        className="fixed z-[60] flex flex-col items-center justify-center gap-1.5 transition-all duration-300 bg-black hover:bg-gold text-white rounded-0 cursor-pointer w-14 h-14 md:w-16 md:h-16 top-5 right-6 sm:right-10 shadow-xl border border-white/20"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-6 md:w-8 h-0.5 bg-white origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-6 md:w-8 h-0.5 bg-white origin-center"
        ></span>
      </button>
    </>
  );
};

export default Navbar;
