import React, { useState } from "react";
import SEO from "../components/SEO";
import { faqsData } from "../data/faqsData";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const FaqsPage = () => {
  const [openItems, setOpenItems] = useState({});
  const [search, setSearch] = useState("");

  const toggleItem = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredCategories = faqsData
    .map((cat, cIdx) => {
      const filteredItems = cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      );
      return { ...cat, items: filteredItems, originalIndex: cIdx };
    })
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about Outmax Services Ltd's engagement models, 24/7 BPO operations, performance marketing, and onboarding timelines."
      />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Questions & Answers
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-black leading-[1.08]">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            Clear, transparent answers regarding our outsourcing processes, performance marketing desks, reporting standards, and onboarding workflows.
          </p>

          <div className="relative max-w-md pt-4">
            <Icon icon="lucide:search" className="size-4 text-black/40 absolute left-4 top-1/2 translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full pl-11 pr-4 py-3 bg-white/80 border border-black/10 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Accordion Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-14">
        {filteredCategories.map((category) => (
          <div key={category.category} className="space-y-6">
            <div className="border-b border-black/10 pb-3 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-light text-black">
                {category.category}
              </h2>
              <span className="text-xs font-mono text-gold uppercase tracking-wider">
                {category.items.length} Questions
              </span>
            </div>

            <div className="space-y-4">
              {category.items.map((faq, itemIdx) => {
                const isOpen = !!openItems[`${category.originalIndex}-${itemIdx}`];
                return (
                  <div
                    key={itemIdx}
                    className="rounded-2xl border border-black/10 bg-white/70 overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(category.originalIndex, itemIdx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-black/5 transition-colors"
                    >
                      <span className="font-medium text-sm sm:text-base text-black">
                        {faq.q}
                      </span>
                      <Icon
                        icon="lucide:chevron-down"
                        className={`size-4 text-gold shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-black/75 font-light leading-relaxed border-t border-black/5 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom Still Have Questions CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-4xl bg-black text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10 shadow-lg">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              Still Have Questions?
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              Speak Directly with Our Executive Team
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              We are ready to review your exact operational requirements, custom software tooling, and project timelines.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-gold text-black hover:bg-white transition-colors shrink-0 shadow-md"
          >
            <span>Ask a Question</span>
            <Icon icon="lucide:arrow-right" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FaqsPage;
