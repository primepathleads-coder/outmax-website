import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { blogArticles } from "../data/blogData";
import SEO from "../components/SEO";
import { Icon } from "@iconify/react/dist/iconify.js";

export const BlogPostPage = () => {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = blogArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title={`${article.title} | Insights`}
        description={article.excerpt}
      />

      {/* Header Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-black/50 mb-6 font-mono">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-black transition-colors">Insights</Link>
          <span>/</span>
          <span className="text-gold truncate">{article.category}</span>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-6 mb-10">
          <span className="inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-wider bg-black text-gold">
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-black/10 text-xs text-black/60 font-light">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-gold flex items-center justify-center font-bold text-sm">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="text-black font-medium block">{article.author}</span>
                <span className="text-[11px] text-black/50">{article.authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-black/50 font-mono">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden h-[340px] sm:h-[460px] border border-black/10 shadow-xl mb-12 relative">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-black/80 font-light leading-relaxed space-y-6 text-base sm:text-lg">
          {article.content.split("\n\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("### ")) {
              return (
                <h2
                  key={index}
                  className="text-2xl sm:text-3xl font-light text-black tracking-tight pt-6 pb-2 border-b border-black/10"
                >
                  {trimmed.replace("### ", "")}
                </h2>
              );
            }

            if (trimmed.startsWith("#### ")) {
              return (
                <h3
                  key={index}
                  className="text-xl sm:text-2xl font-light text-black pt-4"
                >
                  {trimmed.replace("#### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("- ")) {
              const items = trimmed.split("\n");
              return (
                <ul key={index} className="space-y-2 pl-4 list-disc marker:text-gold text-sm sm:text-base">
                  {items.map((it, iIdx) => (
                    <li key={iIdx}>{it.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Share & Actions */}
        <div className="mt-14 pt-8 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-black/60">
              Share Article:
            </span>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-black/5 hover:bg-black hover:text-white transition-colors cursor-pointer border border-black/10"
            >
              <Icon icon="lucide:link" className="size-3.5" />
              <span>{copied ? "Link Copied!" : "Copy URL"}</span>
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-black/5 hover:bg-black hover:text-white transition-colors border border-black/10"
            >
              <Icon icon="lucide:linkedin" className="size-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>

          <Link
            to="/blog"
            className="text-xs uppercase tracking-wider font-semibold text-black hover:text-gold inline-flex items-center gap-1.5"
          >
            <span>Back to All Articles</span>
            <Icon icon="lucide:arrow-right" className="size-3.5" />
          </Link>
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 p-8 rounded-3xl bg-white/70 border border-black/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-black text-gold flex items-center justify-center font-bold text-2xl shrink-0">
            {article.author.charAt(0)}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold block">
              Published By
            </span>
            <h3 className="text-lg font-medium text-black">{article.author}</h3>
            <p className="text-xs text-black/60 font-light">{article.authorRole}</p>
            <p className="text-xs text-black/75 font-light pt-2 leading-relaxed">
              Leading business process outsourcing, performance ad operations, and technology development for Outmax Services Ltd.
            </p>
          </div>
        </div>
      </article>

      {/* Related Articles Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block">
              More From Our Desks
            </span>
            <h3 className="text-2xl font-light text-black">Related Research & Insights</h3>
          </div>
          <Link
            to="/blog"
            className="text-xs uppercase tracking-wider font-semibold text-black hover:text-gold inline-flex items-center gap-1"
          >
            <span>All Articles</span>
            <Icon icon="lucide:arrow-right" className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.slug}
              to={`/blog/${rel.slug}`}
              className="p-6 rounded-3xl bg-white/60 border border-black/10 hover:border-gold/40 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold block mb-2">
                  {rel.category}
                </span>
                <h4 className="text-lg font-light text-black group-hover:text-gold transition-colors mb-2 line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-black/65 font-light line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between text-xs text-black/80 font-medium">
                <span>{rel.readingTime}</span>
                <Icon icon="lucide:arrow-right" className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
