import React from "react";

export const PartnerLogos = () => {
  const partners = [
    {
      name: "Google Ads",
      src: "/images/partners/google-ads.png",
      category: "Search & Display PPC",
    },
    {
      name: "TikTok Ads",
      src: "/images/partners/tiktok-ads.png",
      category: "Social Video Performance",
    },
    {
      name: "Pinterest",
      src: "/images/partners/pinterest.png",
      category: "Visual Discovery Network",
      isIcon: true,
    },
    {
      name: "Sedo",
      src: "/images/partners/sedo.png",
      category: "Domain Parking & Monetization",
    },
    {
      name: "Camp Lejeune",
      src: "/images/partners/camp-lejeune.png",
      category: "Mass Tort & Legal Intake",
      isShield: true,
    },
  ];

  return (
    <section className="py-20 bg-black text-white border-y border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold block mb-2">
            Trusted Strategic Network
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white mb-3">
            Partners and Platforms We Have Worked With
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light max-w-xl mx-auto">
            Direct collaboration across enterprise advertising channels, high-volume ad monetization desks, and specialized intake partnerships.
          </p>
        </div>

        {/* Interactive Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-full h-32 sm:h-36 p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/50 hover:bg-white/[0.07] transition-all duration-300 flex flex-col items-center justify-center gap-3 group text-center"
            >
              <div className="h-14 sm:h-16 w-full flex items-center justify-center">
                <img
                  src={partner.src}
                  alt={`${partner.name} Partner Logo`}
                  className={`max-h-full max-w-[80%] object-contain transition-all duration-300 ${
                    partner.isIcon
                      ? "h-12 w-12"
                      : partner.isShield
                      ? "h-14 w-auto drop-shadow-md"
                      : "brightness-95 group-hover:brightness-110"
                  }`}
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-white/90 group-hover:text-gold transition-colors block">
                  {partner.name}
                </span>
                <span className="text-[10px] text-white/40 block font-light">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
