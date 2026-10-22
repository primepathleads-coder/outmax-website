import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Icon } from "@iconify/react/dist/iconify.js";
import { postsService } from "../services/postsService";

export const BlogPostPage = () => {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const [article, setArticle] = useState(() => postsService.getArticleBySlugOrId(slug));
  const [loading, setLoading] = useState(!article);

  useEffect(() => {
    const resolveArticle = () => {
      const match = postsService.getArticleBySlugOrId(slug);
      if (match) {
        setArticle(match);
        setLoading(false);
        return true;
      }
      return false;
    };

    if (resolveArticle()) {
      // already resolved
    } else {
      // check remote in case newly created on server
      const fetchRemote = async () => {
        try {
          const res = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.post) {
              setArticle({
                id: data.post.id,
                slug: data.post.slug || data.post.id,
                title: data.post.title || data.post.content.slice(0, 60),
                category: data.post.category || "BPO & Operations",
                author: data.post.author?.name || "Outmax Specialist",
                authorRole: data.post.author?.role || "Operational Desk",
                authorAvatar: data.post.author?.avatar,
                date: new Date(data.post.createdAt || Date.now()).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
                readingTime: "4 min read",
                featuredImage: data.post.mediaUrl || "/assets/photos/team-collaboration.jpg",
                excerpt: data.post.content.slice(0, 180) + "...",
                content: data.post.content,
              });
              setLoading(false);
              return;
            }
          }
        } catch {
          // fallback
        }
        setLoading(false);
      };
      fetchRemote();
    }

    const handleUpdate = () => resolveArticle();
    window.addEventListener("outmax_posts_changed", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("outmax_posts_changed", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [slug]);

  const relatedArticles = postsService
    .getAllBlogArticles()
    .filter((a) => a.slug !== slug && (!article || a.category === article.category))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center">
        <Icon icon="eos-icons:loading" className="text-3xl text-gold mx-auto animate-spin" />
        <p className="text-xs text-black/50 mt-3 font-mono">Loading insight...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-40 pb-24 text-center max-w-md mx-auto px-4">
        <h1 className="text-2xl font-light text-black">Article Not Found</h1>
        <p className="text-xs text-black/60 mt-2">
          The requested briefing or insight may have been moved or archived.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-block bg-black text-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold"
        >
          Return to Insights
        </Link>
      </div>
    );
  }


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
              {article.authorAvatar ? (
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-10 h-10 rounded-lg object-cover border border-black/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-black text-gold flex items-center justify-center font-bold text-sm">
                  {article.author.charAt(0)}
                </div>
              )}
              <div>
                <span className="text-black font-medium block">{article.author}</span>
                <span className="text-[11px] text-black/50">{article.authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readingTime}</span>
              <span>•</span>
              <button
                onClick={handleCopyLink}
                className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Icon icon="lucide:share-2" className="size-3.5" />
                <span>{copied ? "Copied" : "Share"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="rounded-2xl overflow-hidden mb-12 shadow-2xl border border-black/10 max-h-[500px]">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-black/85 font-light leading-relaxed space-y-6 text-sm sm:text-base whitespace-pre-line">
          {article.content}
        </div>

        {/* Author Bio Card */}
        <div className="mt-16 p-8 bg-white/70 border border-black/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {article.authorAvatar ? (
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="w-16 h-16 rounded-lg object-cover border border-black/10 shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-black text-gold flex items-center justify-center font-bold text-2xl shrink-0">
              {article.author.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="text-base font-medium text-black">{article.author}</h4>
            <p className="text-xs text-gold font-mono uppercase tracking-wider mb-2">
              {article.authorRole}
            </p>
            <p className="text-xs text-black/70 font-light leading-relaxed">
              Published directly via the Outmax Services executive desk and operations portal.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-black/10 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-black hover:text-gold transition-colors"
          >
            <Icon icon="lucide:arrow-left" className="size-4" />
            <span>Back to all Insights</span>
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-black/10">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block mb-2">
              Further Reading
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-black">
              Related Perspectives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/blog/${rel.slug}`}
                className="group flex flex-col justify-between bg-white/70 hover:bg-white border border-black/10 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold">
                    {rel.category}
                  </span>
                  <h3 className="text-base font-light text-black group-hover:text-gold transition-colors leading-snug">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-black/60 font-light line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-[11px] text-black/50 font-mono">
                  <span>{rel.readingTime}</span>
                  <Icon icon="lucide:arrow-right" className="size-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
