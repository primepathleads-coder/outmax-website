import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

// Curated internal strategic briefings
const INITIAL_POSTS = [
  {
    id: "post_1",
    title: "Q4 Global Operations: Scaling Desks and Baku Strategic Corridor",
    content:
      "Over the past 90 days, our enterprise desks maintained consistent 99.4% SLA adherence across all client engagements. With our Baku business development initiative led by Sanaullah Khan expanding into Eurasian commercial networks, Outmax is reinforcing its position as an integrated operations partner for North American mid-market brands. Priority remains disciplined execution and rapid turnaround.",
    author: {
      name: "Hamid Iqbal Khan",
      role: "Chief Executive Officer",
      department: "Executive Leadership",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      verified: true,
    },
    category: "Leadership",
    tags: ["Operations", "Q4Strategy", "GlobalExpansion"],
    likesCount: 24,
    likedBy: [],
    comments: [
      {
        id: "c_1",
        authorName: "Abdul Moiz Khan",
        authorRole: "Managing Director",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
        content: "Agreed. Infrastructure teams have finalized latency optimizations across all regional endpoints.",
        timestamp: "2 hours ago",
      },
      {
        id: "c_1b",
        authorName: "Sanaullah Khan",
        authorRole: "Business Development Lead (Baku)",
        authorAvatar: "/images/team/sanaullah.png",
        content: "Baku corporate response is very receptive. Three enterprise evaluations are scheduled for next week.",
        timestamp: "45 mins ago",
      },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: "post_2",
    title: "Hardware-Level Precision in Scalable Web Architecture",
    content:
      "Software architecture functions at the boundary between machine efficiency and intuitive human response. In our latest architectural refactor for Outmax internal platforms, we reduced initial hydration latency by 42% through streamlined reactive state and asset pipelining. Building reliable systems means treating every millisecond as a valuable engineering asset.",
    author: {
      name: "Hussain Munir",
      role: "Systems Architect & Full-Stack Engineer",
      department: "Engineering & Technology",
      avatar: "/images/team/hussain.png",
      verified: true,
    },
    category: "Engineering",
    tags: ["SystemsArchitecture", "WebPerf", "GIKIEngineering"],
    likesCount: 31,
    likedBy: [],
    comments: [
      {
        id: "c_2",
        authorName: "Hamid Iqbal Khan",
        authorRole: "CEO",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        content: "Strong execution. The speed improvements across all operational regions are noticeable.",
        timestamp: "1 hour ago",
      },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
  },
  {
    id: "post_3",
    title: "Unit Economics and Margin Calibration for Direct Brands",
    content:
      "Founders frequently measure gross merchandise volume while overlooking cumulative customer acquisition costs, return logistics, and inventory holding penalties. When structuring pricing models for our venture partners, our baseline rule requires net contribution margins after blended acquisition spend to reach at least 28%. Healthy unit architecture precedes profitable scale.",
    author: {
      name: "Abdullah Khan Sarkani",
      role: "E-Commerce Strategist & Venture Lead",
      department: "E-Commerce & Brands",
      avatar: "/images/team/abdullah.png",
      verified: true,
    },
    category: "E-Commerce",
    tags: ["UnitEconomics", "MRPStrategy", "EcomScaling"],
    likesCount: 18,
    likedBy: [],
    comments: [],
    mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
  },
  {
    id: "post_4",
    title: "Baku Commercial Hub: Strategic Logistics and BPO Partnerships",
    content:
      "Reporting from Baku. We have begun formal bilateral discussions with regional logistics operators and corporate enterprise networks in Azerbaijan. Demand for Outmax integrated business process management and client success operations continues to grow across emerging Eurasian tech centers.",
    author: {
      name: "Sanaullah Khan",
      role: "Business Development Lead (Baku)",
      department: "International Expansion",
      avatar: "/images/team/sanaullah.png",
      verified: true,
    },
    category: "Expansion",
    tags: ["BakuHub", "CrossBorder", "BusinessDevelopment"],
    likesCount: 26,
    likedBy: [],
    comments: [],
    mediaUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

const CATEGORIES = ["All", "Leadership", "Engineering", "E-Commerce", "Operations", "Expansion"];

const FeedDashboardPage = () => {
  const { user, logout, isAuthenticated, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);

  // Composer Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Leadership");
  const [newTags, setNewTags] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");

  // Comment states
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2600);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          if (data.posts && data.posts.length > 0) {
            setPosts(data.posts);
          }
        }
      } catch (e) {
        console.warn("Using offline feed data", e);
      }
    };
    fetchPosts();
  }, []);

  const formatTimeAgo = (dateStr) => {
    try {
      const diffMs = Date.now() - new Date(dateStr).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return "Recently";
    }
  };

  const handlePublishPost = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setIsPosting(true);

    const postPayload = {
      title: newTitle.trim().replace(/—/g, "-"),
      content: newContent.trim().replace(/—/g, "-"),
      category: newCategory,
      tags: newTags
        .split(",")
        .map((t) => t.trim().replace(/^#/, "").replace(/—/g, "-"))
        .filter(Boolean),
      mediaUrl: newMediaUrl.trim(),
      author: {
        name: user?.name || "Team Member",
        role: user?.role || "Team Specialist",
        department: user?.department || "Operations",
        avatar: user?.avatar || "/images/team/hussain.png",
        verified: true,
      },
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload),
      });

      if (res.ok) {
        const data = await res.json();
        setPosts([data.post, ...posts]);
      } else {
        const localPost = {
          ...postPayload,
          id: `post_${Date.now()}`,
          likesCount: 0,
          likedBy: [],
          comments: [],
          createdAt: new Date().toISOString(),
        };
        setPosts([localPost, ...posts]);
      }

      setNewTitle("");
      setNewContent("");
      setNewTags("");
      setNewMediaUrl("");
      setComposerOpen(false);
      showToast("Insight published");
    } catch (err) {
      console.error(err);
      const localPost = {
        ...postPayload,
        id: `post_${Date.now()}`,
        likesCount: 0,
        likedBy: [],
        comments: [],
        createdAt: new Date().toISOString(),
      };
      setPosts([localPost, ...posts]);
      setComposerOpen(false);
      showToast("Insight saved");
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId) => {
    const userEmail = user?.email || "anonymous_member";

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const likedBy = p.likedBy || [];
          const alreadyLiked = likedBy.includes(userEmail);
          return {
            ...p,
            likedBy: alreadyLiked
              ? likedBy.filter((e) => e !== userEmail)
              : [...likedBy, userEmail],
            likesCount: alreadyLiked
              ? Math.max(0, (p.likesCount || 1) - 1)
              : (p.likesCount || 0) + 1,
          };
        }
        return p;
      })
    );

    try {
      await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userEmail }),
      });
    } catch (e) {
      console.warn("Endorsement synced locally", e);
    }
  };

  const handleAddComment = async (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: `c_${Date.now()}`,
      authorName: user?.name || "Team Member",
      authorRole: user?.role || "Specialist",
      authorAvatar: user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || "User")}&backgroundColor=0c0c0f&textColor=cfa355`,
      content: text.trim().replace(/—/g, "-"),
      timestamp: "Just now",
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), newComment],
          };
        }
        return p;
      })
    );

    setCommentText({ ...commentText, [postId]: "" });

    try {
      await fetch("/api/posts/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: text.trim(),
          author: {
            name: user?.name,
            role: user?.role,
            avatar: user?.avatar,
          },
        }),
      });
    } catch (e) {
      console.warn("Comment synced locally", e);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" ||
      post.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Team Feed & Strategic Insights | Outmax Services"
        description="Internal executive memoranda, systems architecture updates, and operational analysis for Outmax Services."
        canonicalUrl="/feed"
      />

      {/* Minimal Apple-Style Dark Atmosphere */}
      <div className="min-h-screen bg-[#070709] text-neutral-200 selection:bg-[#cfa355]/20 selection:text-white pt-20 pb-24 font-sans">
        {/* Minimal Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#121217] border border-white/10 text-neutral-100 text-xs px-3.5 py-2.5 rounded-md shadow-xl flex items-center gap-2">
            <Icon icon="ph:check" className="text-sm text-[#cfa355]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Apple-Style Minimal Glass Navigation Bar */}
        <header className="border-b border-white/[0.08] bg-[#070709]/85 backdrop-blur-xl sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            {/* Left: Clean Brand */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-xs font-semibold tracking-[0.25em] text-[#cfa355] uppercase transition-colors group-hover:text-white">
                  Outmax
                </span>
                <span className="text-neutral-600 text-xs font-light">/</span>
                <span className="text-xs text-neutral-400 font-normal">
                  Portal
                </span>
              </Link>
            </div>

            {/* Middle: Minimal Clean Search Bar */}
            <div className="flex-1 max-w-xs hidden sm:block">
              <div className="relative">
                <Icon
                  icon="ph:magnifying-glass"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs"
                />
                <input
                  type="text"
                  placeholder="Filter insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111116] border border-white/[0.08] focus:border-[#cfa355]/60 rounded-md pl-8 pr-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setComposerOpen(!composerOpen)}
                className="bg-white/[0.06] hover:bg-white/[0.1] text-neutral-200 hover:text-white border border-white/[0.08] px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Icon icon="ph:plus" className="text-xs" />
                <span>New Insight</span>
              </button>

              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                    className="flex items-center gap-2 bg-[#111116] border border-white/[0.08] hover:border-white/20 rounded-md px-2.5 py-1.5 transition-colors cursor-pointer text-left"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-5 h-5 rounded-sm object-cover"
                    />
                    <span className="text-xs text-neutral-200 font-medium hidden sm:inline">
                      {user.name.split(" ")[0]}
                    </span>
                    <Icon icon="ph:caret-down" className="text-neutral-500 text-xs" />
                  </button>

                  {/* Profile Dropdown */}
                  {roleSwitcherOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#111116] border border-white/[0.08] rounded-md shadow-2xl p-2 z-50">
                      <div className="px-2.5 py-2 border-b border-white/[0.06]">
                        <p className="text-xs font-medium text-white">{user.name}</p>
                        <p className="text-[11px] text-neutral-400">{user.role}</p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 px-2.5 py-1 block">
                          Switch Identity
                        </span>
                        {[
                          { key: "hamid", label: "Hamid Iqbal Khan (CEO)" },
                          { key: "hussain", label: "Hussain Munir (Tech)" },
                          { key: "abdullah", label: "Abdullah Sarkani (E-Com)" },
                          { key: "sanaullah", label: "Sanaullah Khan (Baku)" },
                        ].map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              loginAsDemo(item.key);
                              setRoleSwitcherOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-sm transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <div className="pt-1 border-t border-white/[0.06]">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setRoleSwitcherOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-xs text-red-400 hover:bg-white/[0.04] rounded-sm transition-colors flex items-center justify-between"
                        >
                          <span>Sign Out</span>
                          <Icon icon="ph:sign-out" className="text-xs" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#cfa355] hover:bg-[#d9b165] text-[#070709] px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Main Clean Centered Content Container */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
          {/* Minimal Desk Selector Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-white/[0.06] scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-white/[0.08] text-white font-medium"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.02]"
                  }`}
                >
                  {cat === "All" ? "All Entries" : cat}
                </button>
              );
            })}
          </nav>

          {/* Minimal Apple-Style Post Composer (When Open) */}
          {composerOpen && (
            <div className="bg-[#0f0f14] border border-white/[0.08] rounded-xl p-5 shadow-2xl transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                  Draft Internal Memo
                </span>
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className="text-neutral-500 hover:text-neutral-300 text-xs"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handlePublishPost} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Title or Strategic Subject"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-transparent border-b border-white/[0.08] focus:border-[#cfa355]/60 pb-2 text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Compose memo, engineering breakdown, or operational update..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full bg-transparent border border-white/[0.06] focus:border-[#cfa355]/60 rounded-md p-3 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none leading-relaxed resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">
                      Desk Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-[#15151c] border border-white/[0.08] focus:border-[#cfa355]/60 rounded-md p-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c} className="bg-[#111116]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UnitEconomics, PerfArchitecture"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      className="w-full bg-[#15151c] border border-white/[0.08] focus:border-[#cfa355]/60 rounded-md px-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">
                    Attachment Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    className="w-full bg-[#15151c] border border-white/[0.08] focus:border-[#cfa355]/60 rounded-md px-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setComposerOpen(false)}
                    className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPosting || !newContent.trim()}
                    className="bg-[#cfa355] hover:bg-[#d9b165] text-[#070709] px-4 py-1.5 rounded-md text-xs font-medium transition-all disabled:opacity-40 cursor-pointer"
                  >
                    {isPosting ? "Publishing..." : "Publish Entry"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Feed Stream */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="py-16 text-center text-xs text-neutral-500">
                No entries found in this category.
              </div>
            ) : (
              filteredPosts.map((post) => {
                const userEmail = user?.email || "anonymous_member";
                const hasLiked = post.likedBy?.includes(userEmail);
                const isCommentOpen = activeCommentPostId === post.id;

                return (
                  <article
                    key={post.id}
                    className="bg-[#0c0c10] border border-white/[0.07] hover:border-white/[0.12] rounded-xl p-5 sm:p-6 transition-all"
                  >
                    {/* Header: Author & Metadata */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            post.author?.avatar ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                              post.author?.name || "User"
                            )}&backgroundColor=0c0c0f&textColor=cfa355`
                          }
                          alt={post.author?.name}
                          className="w-9 h-9 rounded-md object-cover border border-white/[0.08]"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs sm:text-sm font-medium text-white">
                              {post.author?.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            {post.author?.role} <span className="text-neutral-600">·</span> {formatTimeAgo(post.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Minimal Desk Tag */}
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded-sm font-mono">
                        {post.category || "General"}
                      </span>
                    </div>

                    {/* Title */}
                    {post.title && (
                      <h2 className="text-sm sm:text-base font-semibold text-neutral-100 mb-2 leading-snug">
                        {post.title}
                      </h2>
                    )}

                    {/* Content */}
                    <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed whitespace-pre-line mb-3">
                      {post.content}
                    </p>

                    {/* Media Attachment */}
                    {post.mediaUrl && (
                      <div className="mb-4 rounded-lg overflow-hidden border border-white/[0.08] bg-black/30 max-h-96">
                        <img
                          src={post.mediaUrl}
                          alt="Attachment preview"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-neutral-400 bg-white/[0.02] border border-white/[0.06] px-1.5 py-0.5 rounded-sm font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-neutral-400">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                            hasLiked
                              ? "text-[#cfa355] font-medium"
                              : "hover:text-white"
                          }`}
                        >
                          <Icon
                            icon={hasLiked ? "ph:heart-fill" : "ph:heart"}
                            className="text-sm"
                          />
                          <span>{post.likesCount || 0}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveCommentPostId(isCommentOpen ? null : post.id)
                          }
                          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                        >
                          <Icon icon="ph:chat-circle" className="text-sm" />
                          <span>{(post.comments || []).length}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText?.(window.location.href);
                          showToast("Link copied");
                        }}
                        className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Icon icon="ph:share-simple" className="text-sm" />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Inline Comment Section */}
                    {isCommentOpen && (
                      <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
                        {/* New Comment Input */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText[post.id] || ""}
                            onChange={(e) =>
                              setCommentText({
                                ...commentText,
                                [post.id]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddComment(post.id);
                              }
                            }}
                            className="flex-1 bg-[#15151c] border border-white/[0.08] focus:border-[#cfa355]/60 rounded-md px-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddComment(post.id)}
                            className="bg-white/[0.08] hover:bg-white/[0.14] text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
                          >
                            Reply
                          </button>
                        </div>

                        {/* Comments List */}
                        {post.comments && post.comments.length > 0 && (
                          <div className="space-y-2 pt-1">
                            {post.comments.map((c) => (
                              <div
                                key={c.id}
                                className="bg-white/[0.02] border border-white/[0.04] rounded-md p-3 text-xs"
                              >
                                <div className="flex items-center justify-between text-neutral-400 mb-1">
                                  <span className="font-medium text-neutral-200">
                                    {c.authorName}
                                  </span>
                                  <span className="text-[10px] text-neutral-500">
                                    {c.timestamp}
                                  </span>
                                </div>
                                <p className="text-neutral-300 font-normal leading-relaxed">
                                  {c.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default FeedDashboardPage;
