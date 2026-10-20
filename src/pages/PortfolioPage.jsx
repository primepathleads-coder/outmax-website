import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { portfolioData } from "../data/portfolioData";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const PortfolioPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState(null);

  useEffect(() => {
    if (selectedItem) setActiveGalleryImg(selectedItem.image);
  }, [selectedItem]);

  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Portfolio & Case Capabilities"
        description="Explore Outmax Services Ltd's recent digital builds: legal-claims lead generation portals, hospitality brand platforms, e-commerce storefronts, and wellness platforms."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Capabilities & Recent Builds
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-black leading-[1.08]">
            Engineered to Convert
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            A showcase of recent web applications, lead-generation portals, and monetization architectures developed to support client growth channels.
          </p>
          <div className="p-4 rounded-2xl bg-black/5 border border-black/10 text-xs text-black/70 flex items-center gap-3">
            <Icon icon="solar:shield-check-bold" className="size-5 text-gold shrink-0" />
            <span>
              Capabilities Showcase: In accordance with client NDAs, project architectures and capability demonstrations are presented to illustrate functional scope and conversion engineering.
            </span>
          </div>
        </div>
      </section>

      {/* Portfolio Builds Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl overflow-hidden bg-white/70 border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-gold border border-white/20">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-light text-white leading-snug">
                      {project.title}
                    </h2>
                    <span className="text-xs text-white/70 font-light block mt-1">
                      {project.subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-black/50 block">
                      Architectural Highlights:
                    </span>
                    {project.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-black/80 font-light">
                        <Icon icon="lucide:check" className="size-3 text-gold shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/10">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/5 text-black/70 border border-black/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(project)}
                  className="w-full py-2.5 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Architecture</span>
                  <Icon icon="lucide:maximize-2" className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Dialog for Project Inspection */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#191817] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-white/15 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
            >
              <Icon icon="lucide:x" className="size-5" />
            </button>

            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold block mb-2">
              {selectedItem.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white mb-2">
              {selectedItem.title}
            </h3>
            <p className="text-xs uppercase tracking-wider text-white/60 mb-6 font-mono">
              {selectedItem.subtitle}
            </p>

            {/* Main Image / Gallery Viewer */}
            <div className="rounded-2xl overflow-hidden h-64 border border-white/10 mb-3">
              <img
                src={activeGalleryImg || selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover transition-all duration-400"
              />
            </div>

            {/* Gallery Thumbnails — shown only when project has multiple images */}
            {selectedItem.gallery && selectedItem.gallery.length > 1 && (
              <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                {selectedItem.gallery.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveGalleryImg(src)}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      (activeGalleryImg || selectedItem.image) === src
                        ? "border-gold"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    <img src={src} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm font-light text-white/80 leading-relaxed mb-6">
              <p>{selectedItem.description}</p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] font-medium text-gold uppercase tracking-wider block">
                  Documented Outcome Context
                </span>
                <p className="text-xs text-white/70">{selectedItem.verifiedOutcome}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <Link
                to={`/contact?project=${encodeURIComponent(selectedItem.title)}`}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white transition-colors"
              >
                <span>Discuss Similar Build</span>
                <Icon icon="lucide:arrow-right" className="size-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-xs text-white/60 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-4xl bg-black text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10 shadow-lg">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              Digital Infrastructure
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              Need a Custom Conversion Portal or Storefront?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              We engineer custom digital platforms specifically designed to convert traffic from your media buying and affiliate channels.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white transition-colors shrink-0 shadow-md"
          >
            <span>Start a Project</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
