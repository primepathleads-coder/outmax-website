import React, { useState } from "react";
import SEO from "../components/SEO";
import { blogArticles } from "../data/blogData";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "all",
    "BPO & Operations",
    "Email Marketing",
    "Paid Acquisition",
    "Affiliate Marketing",
    "Monetization & Arbitrage",
    "Web & App Engineering",
  ];

  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = blogArticles[0];

  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Insights & Research"
        description="Read technical analysis, operational frameworks, and performance marketing insights from the leadership and engineering desks at Outmax Services Ltd."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Executive Perspectives
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-black leading-[1.08]">
            Insights & Research
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            In-depth analysis, operational blueprints, and data-backed observations from our outsourcing, marketing, and technology desks.
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-black text-white shadow-md"
                    : "bg-white/80 hover:bg-white text-black/70 border border-black/10"
                }`}
              >
                {cat === "all" ? "All Topics" : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Icon icon="lucide:search" className="size-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research & guides..."
              className="w-full pl-10 pr-4 py-2 bg-white/80 border border-black/10 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Featured Article Layout (when showing all and no search query) */}
      {selectedCategory === "all" && !searchQuery && featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <Link
            to={`/blog/${featured.slug}`}
            className="group rounded-3xl overflow-hidden bg-black text-white grid grid-cols-1 lg:grid-cols-12 border border-white/10 shadow-2xl hover:border-gold/40 transition-all duration-300"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
              <img
                src={featured.featuredImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-6 left-6">
                <span className="px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-gold text-black font-semibold shadow-md">
                  Featured Strategic Analysis
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-gold font-mono">
                  <span>{featured.category}</span>
                  <span>•</span>
                  <span>{featured.readingTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-light text-white leading-tight group-hover:text-gold transition-colors">
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <div>
                  <span className="text-white block font-medium">{featured.author}</span>
                  <span className="text-[11px] text-white/50">{featured.authorRole}</span>
                </div>
                <div className="inline-flex items-center gap-1 text-gold font-semibold uppercase tracking-wider">
                  <span>Read Article</span>
                  <Icon icon="lucide:arrow-right" className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-black/10">
            <p className="text-black/60 font-light text-sm">
              No articles found matching your criteria. Try adjusting your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="rounded-3xl overflow-hidden bg-white/70 border border-black/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-gold border border-white/20">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-black/50 font-mono">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readingTime}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-light text-black leading-snug group-hover:text-gold transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-xs text-black/70 font-light leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-black/10 mt-4 flex items-center justify-between text-xs pt-4">
                  <span className="text-black/60 font-light truncate max-w-[180px]">
                    {article.author}
                  </span>
                  <span className="font-semibold uppercase tracking-wider text-black group-hover:text-gold inline-flex items-center gap-1 transition-colors">
                    Read
                    <Icon icon="lucide:arrow-right" className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
