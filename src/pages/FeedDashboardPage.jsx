import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

// Seed insights in case serverless API is cold or local
const INITIAL_POSTS = [
  {
    id: "post_1",
    title: "Q4 Global Operations Briefing: Scaling BPO Desks & Baku Expansion",
    content:
      "Team Outmax — Over the past 90 days, our enterprise desks have achieved a 99.4% SLA adherence across all client portfolios. With our Baku business development hub led by Sanaullah Khan gaining strategic momentum in the South Caucasus, we are positioning Outmax as the primary operations partner for mid-market and enterprise North American brands. Keep customer retention and rapid response at the center of every workflow.",
    author: {
      name: "Hamid Iqbal Khan",
      role: "Chief Executive Officer (CEO)",
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
        authorRole: "Managing Director (MD)",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
        content: "Completely aligned. Our infrastructure team is also finalizing the latency optimization across all remote desks.",
        timestamp: "2 hours ago",
      },
      {
        id: "c_1b",
        authorName: "Sanaullah Khan",
        authorRole: "Business Development Lead — Baku Desk",
        authorAvatar: "/images/team/sanaullah.png",
        content: "Baku corporate response is very receptive. We have 3 enterprise demos booked for next week.",
        timestamp: "45 mins ago",
      },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: "post_2",
    title: "High-Performance Systems & Hardware Precision in Modern Web Architecture",
    content:
      "Coding isn't just about syntax — it's about the boundary between machine efficiency and user intuition. In our latest architectural upgrade for Outmax internal platforms, we reduced initial hydration latency by 42% through fine-grained reactive state and asset pipelining. Building scalable, zero-downtime systems requires treating every millisecond as a valuable resource.",
    author: {
      name: "Hussain Munir",
      role: "Full-Stack Engineer & Systems Architect",
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
        content: "Outstanding technical execution, Hussain. The speed improvement across all international regions is palpable.",
        timestamp: "1 hour ago",
      },
    ],
    mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
  },
  {
    id: "post_3",
    title: "Direct-to-Consumer Margin Matrix: Unlocking Real MRP Profitability",
    content:
      "Too many founders focus purely on top-line GMV while bleeding out on CAC, return shipping, and inventory holding costs. At Outmax, when we guide our venture clients on pricing tiers and supplier unit economics, our standard rule is: if your net contribution margin after blended ad spend isn't hitting at least 28%, you don't have a marketing problem — you have a unit pricing architecture problem. Happy to review any client pipeline numbers this Thursday.",
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
    title: "Baku Commercial Corridor: New Cross-Border Partnerships",
    content:
      "Greetings from Azerbaijan! We have initiated bilateral commercial discussions with regional logistics operators and corporate enterprise networks in Baku. The demand for Outmax's blended business process outsourcing and customer success solutions is surging across emerging Eurasian tech hubs.",
    author: {
      name: "Sanaullah Khan",
      role: "Business Development Lead — Baku Desk",
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

  // Quick feedback toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Fetch posts from API on mount
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
        console.warn("Using offline feed posts", e);
      }
    };
    fetchPosts();
  }, []);

  // Format relative time helper
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

  // Submit new post / insight
  const handlePublishPost = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setIsPosting(true);

    const postPayload = {
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      tags: newTags
        .split(",")
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean),
      mediaUrl: newMediaUrl.trim(),
      author: {
        name: user?.name || "Outmax Member",
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
        // Local fallback
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

      // Reset
      setNewTitle("");
      setNewContent("");
      setNewTags("");
      setNewMediaUrl("");
      setComposerOpen(false);
      showToast("Your insight was published to the Outmax feed!");
    } catch (err) {
      console.error(err);
      // Still show in local state
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
      showToast("Published locally to feed.");
    } finally {
      setIsPosting(false);
    }
  };

  // Toggle Like
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
      console.warn("Like API offline, synced in local state", e);
    }
  };

  // Add Comment
  const handleAddComment = async (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: `c_${Date.now()}`,
      authorName: user?.name || "Team Member",
      authorRole: user?.role || "Specialist",
      authorAvatar: user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || "User")}&backgroundColor=0c0c0f&textColor=cfa355`,
      content: text.trim(),
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
      console.warn("Comment API offline", e);
    }
  };

  // Filter posts
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
        title="Team Feed & Strategic Insights — Outmax Services Operations Hub"
        description="Exclusive internal operations feed for Outmax Services. Real-time briefs from executive leadership, systems engineering, and global desks."
        canonicalUrl="/feed"
      />

      <div className="min-h-screen bg-[#07070a] text-white selection:bg-[#cfa355]/30 selection:text-white pt-24 pb-16">
        {/* Subtle Luxury Grid Lines */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(207,163,85,0.06),rgba(255,255,255,0))] pointer-events-none" />

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#16161e] border border-[#cfa355]/40 text-[#cfa355] text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
            <Icon icon="ph:check-circle-bold" className="text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Operational Status Bar */}
        <header className="border-b border-white/10 bg-[#0c0c11]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            {/* Left: Brand & Portal Badge */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-sm font-semibold tracking-[0.2em] text-[#cfa355] uppercase transition-colors group-hover:text-white">
                  Outmax
                </span>
                <span className="text-[10px] uppercase tracking-widest bg-[#cfa355]/15 text-[#cfa355] px-2 py-0.5 rounded-full border border-[#cfa355]/30 font-medium">
                  Team Hub
                </span>
              </Link>

              {/* Status Indicator */}
              <div className="hidden md:flex items-center gap-2 text-[11px] text-white/50 pl-3 border-l border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Bahria Town HQ • 99.4% SLA Live</span>
              </div>
            </div>

            {/* Middle: Quick Search */}
            <div className="flex-1 max-w-md hidden sm:block">
              <div className="relative">
                <Icon
                  icon="ph:magnifying-glass"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm"
                />
                <input
                  type="text"
                  placeholder="Search strategic insights, authors, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#13131b] border border-white/10 focus:border-[#cfa355] rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Right: User Status & Navigation */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-xs text-white/60 hover:text-white transition-colors hidden lg:flex items-center gap-1"
              >
                <span>Main Website</span>
                <Icon icon="ph:arrow-square-out" className="text-sm" />
              </Link>

              {user ? (
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full pl-1.5 pr-3 py-1">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#cfa355]/40"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-medium text-white leading-tight">
                      {user.name.split(" ")[0]}
                    </p>
                    <p className="text-[10px] text-[#cfa355] font-light leading-none truncate max-w-[100px]">
                      {user.role}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    title="Log Out of Portal"
                    className="text-white/40 hover:text-red-400 transition-colors ml-1"
                  >
                    <Icon icon="ph:sign-out" className="text-sm" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-xs bg-[#cfa355] hover:bg-[#d9b165] text-[#08080b] font-medium px-3.5 py-1.5 rounded-lg transition-all shadow-md"
                  >
                    Member Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main 3-Column LinkedIn Style Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* ================= LEFT COLUMN: Member Profile & Desk Nav (3 cols) ================= */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Member Profile Card */}
            <div className="bg-[#101017] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              {/* Cover Gradient */}
              <div className="h-16 bg-gradient-to-r from-[#181824] via-[#2a2417] to-[#14141d] relative">
                <div className="absolute inset-0 bg-[radial-gradient(#cfa355_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
              </div>

              {/* Avatar & Details */}
              <div className="px-5 pb-5 text-center relative -mt-8">
                <img
                  src={
                    user?.avatar ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
                  }
                  alt={user?.name || "Team Member"}
                  className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-[#cfa355] shadow-lg bg-[#0a0a0d]"
                />

                <div className="mt-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <h2 className="text-sm font-semibold text-white">
                      {user?.name || "Hamid Iqbal Khan"}
                    </h2>
                    <Icon
                      icon="ph:seal-check-fill"
                      className="text-[#cfa355] text-sm shrink-0"
                      title="Verified Outmax Team Member"
                    />
                  </div>
                  <p className="text-[11px] text-[#cfa355] font-light mt-0.5">
                    {user?.role || "Chief Executive Officer (CEO)"}
                  </p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                    {user?.department || "Executive Leadership"}
                  </p>
                </div>

                {/* Desk Metrics */}
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-left text-xs">
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                    <span className="text-[10px] text-white/40 block uppercase tracking-wider">
                      Desk SLA
                    </span>
                    <span className="text-sm font-semibold text-emerald-400">99.4%</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                    <span className="text-[10px] text-white/40 block uppercase tracking-wider">
                      Feed Insights
                    </span>
                    <span className="text-sm font-semibold text-[#cfa355]">
                      {posts.length}
                    </span>
                  </div>
                </div>

                {/* HQ Location Note */}
                <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-white/40">
                  <Icon icon="ph:map-pin" className="text-[#cfa355]" />
                  <span>Bahria Town Phase 4, Civic Center</span>
                </div>
              </div>
            </div>

            {/* Desk Category Navigation */}
            <div className="bg-[#101017] border border-white/10 rounded-2xl p-4 shadow-xl">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#cfa355] font-semibold mb-3 px-2">
                Operational Desks
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                        isActive
                          ? "bg-[#cfa355] text-[#08080b] font-medium shadow-md shadow-[#cfa355]/10"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon
                          icon={
                            cat === "All"
                              ? "ph:squares-four"
                              : cat === "Leadership"
                              ? "ph:crown"
                              : cat === "Engineering"
                              ? "ph:code"
                              : cat === "E-Commerce"
                              ? "ph:shopping-bag"
                              : cat === "Expansion"
                              ? "ph:globe-hemisphere-east"
                              : "ph:chart-line-up"
                          }
                          className="text-sm"
                        />
                        <span>{cat === "All" ? "All Streams" : cat}</span>
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isActive
                            ? "bg-black/20 text-[#08080b]"
                            : "bg-white/5 text-white/40"
                        }`}
                      >
                        {cat === "All"
                          ? posts.length
                          : posts.filter((p) => p.category?.toLowerCase() === cat.toLowerCase()).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Switch Switcher if needed */}
            <div className="bg-[#101017] border border-white/10 rounded-2xl p-4 shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-2 font-medium">
                Switch Active Persona
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => loginAsDemo("hamid")}
                  className="bg-white/5 hover:bg-white/10 text-white/80 p-1.5 rounded-lg text-left truncate transition-colors"
                >
                  👔 Hamid (CEO)
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo("hussain")}
                  className="bg-white/5 hover:bg-white/10 text-white/80 p-1.5 rounded-lg text-left truncate transition-colors"
                >
                  💻 Hussain (Tech)
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo("abdullah")}
                  className="bg-white/5 hover:bg-white/10 text-white/80 p-1.5 rounded-lg text-left truncate transition-colors"
                >
                  📈 Abdullah (Ecom)
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo("sanaullah")}
                  className="bg-white/5 hover:bg-white/10 text-white/80 p-1.5 rounded-lg text-left truncate transition-colors"
                >
                  🇦🇿 Sanaullah (Baku)
                </button>
              </div>
            </div>
          </aside>

          {/* ================= CENTER COLUMN: Composer & Feed Stream (6 cols) ================= */}
          <main className="lg:col-span-6 space-y-5">
            {/* LinkedIn-style Post / Insight Composer */}
            <div className="bg-[#101017] border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user?.avatar ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
                  }
                  alt={user?.name || "Author"}
                  className="w-10 h-10 rounded-full object-cover border border-[#cfa355]/40"
                />
                <button
                  type="button"
                  onClick={() => setComposerOpen(!composerOpen)}
                  className="flex-1 text-left bg-[#09090d] hover:bg-[#13131c] border border-white/10 hover:border-[#cfa355]/50 rounded-full px-4 py-2.5 text-xs text-white/40 transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>Publish an operational insight, case study, or memo...</span>
                  <Icon icon="ph:pencil-simple-line" className="text-sm text-[#cfa355]" />
                </button>
              </div>

              {/* Composer Dropdown / Drawer */}
              {composerOpen && (
                <form onSubmit={handlePublishPost} className="mt-4 pt-4 border-t border-white/10 space-y-3.5">
                  <div>
                    <input
                      type="text"
                      placeholder="Insight Headline (e.g. Q4 Logistics Optimization or MRP Unit Economics)"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#0a0a0e] border border-white/10 focus:border-[#cfa355] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your strategic briefing, technical breakdown, or team insight..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full bg-[#0a0a0e] border border-white/10 focus:border-[#cfa355] rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none leading-relaxed resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">
                        Category Desk
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-[#0a0a0e] border border-white/10 focus:border-[#cfa355] rounded-xl p-2 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        {CATEGORIES.filter((c) => c !== "All").map((c) => (
                          <option key={c} value={c} className="bg-[#101017]">
                            {c} Desk
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. UnitEconomics, PerfArchitecture"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        className="w-full bg-[#0a0a0e] border border-white/10 focus:border-[#cfa355] rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="url"
                      placeholder="Optional Media / Image URL (Unsplash, CDN, or chart)"
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      className="w-full bg-[#0a0a0e] border border-white/10 focus:border-[#cfa355] rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setComposerOpen(false)}
                      className="text-xs text-white/40 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isPosting || !newContent.trim()}
                      className="bg-[#cfa355] hover:bg-[#d9b165] text-[#08080b] font-medium text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#cfa355]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isPosting ? (
                        <>
                          <Icon icon="eos-icons:loading" className="text-sm animate-spin" />
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <>
                          <Icon icon="ph:paper-plane-tilt-bold" className="text-sm" />
                          <span>Post Insight</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Stream Status / Filter Bar */}
            <div className="flex items-center justify-between text-xs text-white/50 px-1">
              <span>
                Showing <strong className="text-white">{filteredPosts.length}</strong> strategic insights
                {activeCategory !== "All" && ` in ${activeCategory}`}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[#cfa355]">
                <Icon icon="ph:sparkle-fill" className="text-xs" />
                <span>Verified Outmax Radar</span>
              </span>
            </div>

            {/* Feed Cards Stream */}
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const userEmail = user?.email || "anonymous_member";
                const hasLiked = post.likedBy?.includes(userEmail);
                const isCommentOpen = activeCommentPostId === post.id;

                return (
                  <article
                    key={post.id}
                    className="bg-[#101017] border border-white/10 hover:border-white/15 rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300"
                  >
                    {/* Author Header */}
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
                          className="w-11 h-11 rounded-full object-cover border border-[#cfa355]/40"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs sm:text-sm font-semibold text-white">
                              {post.author?.name}
                            </span>
                            {post.author?.verified && (
                              <Icon
                                icon="ph:seal-check-fill"
                                className="text-[#cfa355] text-sm shrink-0"
                                title="Verified Outmax Executive"
                              />
                            )}
                          </div>
                          <p className="text-[11px] text-[#cfa355] font-light leading-tight">
                            {post.author?.role}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-white/40 mt-0.5">
                            <span>{formatTimeAgo(post.createdAt)}</span>
                            <span>•</span>
                            <span className="uppercase tracking-wider">{post.author?.department}</span>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <span className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-full shrink-0 font-medium">
                        {post.category || "Insight"}
                      </span>
                    </div>

                    {/* Post Title */}
                    {post.title && (
                      <h3 className="text-sm sm:text-base font-semibold text-white/95 mb-2 leading-snug">
                        {post.title}
                      </h3>
                    )}

                    {/* Post Content */}
                    <div className="text-xs sm:text-sm text-white/80 font-light leading-relaxed whitespace-pre-line mb-3">
                      {post.content}
                    </div>

                    {/* Media Preview if attached */}
                    {post.mediaUrl && (
                      <div className="mb-4 rounded-xl overflow-hidden border border-white/10 bg-black/40 max-h-96">
                        <img
                          src={post.mediaUrl}
                          alt="Post Media Attachment"
                          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Tags row */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-[#cfa355] bg-[#cfa355]/10 px-2 py-0.5 rounded-md font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Engagement Metric Summary Bar */}
                    <div className="flex items-center justify-between text-[11px] text-white/40 pb-3 border-b border-white/10">
                      <span className="flex items-center gap-1">
                        <Icon icon="ph:heart-fill" className="text-red-400 text-xs" />
                        <span>{post.likesCount || 0} endorsements</span>
                      </span>
                      <span>{(post.comments || []).length} comments</span>
                    </div>

                    {/* Interactive Action Bar (Like, Comment, Share) */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
                          hasLiked
                            ? "text-red-400 bg-red-400/10 font-medium"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon
                          icon={hasLiked ? "ph:heart-fill" : "ph:heart"}
                          className={`text-base ${hasLiked ? "scale-110" : ""}`}
                        />
                        <span>{hasLiked ? "Endorsed" : "Endorse"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveCommentPostId(isCommentOpen ? null : post.id)
                        }
                        className={`flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
                          isCommentOpen
                            ? "text-[#cfa355] bg-[#cfa355]/10 font-medium"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon icon="ph:chat-circle-dots" className="text-base" />
                        <span>Comment</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText?.(window.location.href);
                          showToast("Insight link copied to clipboard!");
                        }}
                        className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Icon icon="ph:share-network" className="text-base" />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Expandable Comment Drawer */}
                    {isCommentOpen && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                        {/* Add Comment Input */}
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              user?.avatar ||
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
                            }
                            alt={user?.name || "User"}
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                          />
                          <input
                            type="text"
                            placeholder="Add your executive comment or analysis..."
                            value={commentText[post.id] || ""}
                            onChange={(e) =>
                              setCommentText({ ...commentText, [post.id]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddComment(post.id);
                              }
                            }}
                            className="flex-1 bg-[#09090d] border border-white/10 focus:border-[#cfa355] rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddComment(post.id)}
                            className="bg-[#cfa355] hover:bg-[#d9b165] text-[#08080b] p-1.5 rounded-xl text-xs transition-colors shrink-0"
                          >
                            <Icon icon="ph:paper-plane-right-fill" className="text-sm" />
                          </button>
                        </div>

                        {/* Existing Comments List */}
                        {post.comments && post.comments.length > 0 ? (
                          <div className="space-y-2.5 pt-2">
                            {post.comments.map((c) => (
                              <div
                                key={c.id}
                                className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-start gap-2.5 text-xs"
                              >
                                <img
                                  src={
                                    c.authorAvatar ||
                                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                      c.authorName
                                    )}&backgroundColor=0c0c0f&textColor=cfa355`
                                  }
                                  alt={c.authorName}
                                  className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-white/90">
                                      {c.authorName}
                                    </span>
                                    <span className="text-[10px] text-white/30">
                                      {c.timestamp}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-[#cfa355] block font-light">
                                    {c.authorRole}
                                  </span>
                                  <p className="text-white/80 font-light mt-1 leading-relaxed">
                                    {c.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-white/30 text-center py-2">
                            No comments yet. Be the first to analyze this insight.
                          </p>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </main>

          {/* ================= RIGHT COLUMN: Executive Radar & Global Desks (3 cols) ================= */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Executive Leadership Radar */}
            <div className="bg-[#101017] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#cfa355] font-semibold">
                  Executive Radar
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
                    alt="Hamid Iqbal Khan"
                    className="w-9 h-9 rounded-full object-cover border border-[#cfa355]/40"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Hamid Iqbal Khan</h4>
                    <p className="text-[10px] text-[#cfa355]">CEO &amp; Managing Director</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80"
                    alt="Abdul Moiz Khan"
                    className="w-9 h-9 rounded-full object-cover border border-[#cfa355]/40"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Abdul Moiz Khan</h4>
                    <p className="text-[10px] text-[#cfa355]">Managing Director (MD)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/team/hussain.png"
                    alt="Hussain Munir"
                    className="w-9 h-9 rounded-full object-cover border border-[#cfa355]/40"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Hussain Munir</h4>
                    <p className="text-[10px] text-[#cfa355]">Full-Stack Systems Architect</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/team/sanaullah.png"
                    alt="Sanaullah Khan"
                    className="w-9 h-9 rounded-full object-cover border border-[#cfa355]/40"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Sanaullah Khan</h4>
                    <p className="text-[10px] text-[#cfa355]">Baku International Desk</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/team/abdullah.png"
                    alt="Abdullah Khan Sarkani"
                    className="w-9 h-9 rounded-full object-cover border border-[#cfa355]/40"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Abdullah Khan Sarkani</h4>
                    <p className="text-[10px] text-[#cfa355]">E-Commerce Venture Lead</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Operational Desks Card */}
            <div className="bg-[#101017] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#cfa355] font-semibold mb-3">
                Active Operational Desks
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] font-medium text-white mb-0.5">
                    <span>🇵🇰 Bahria Town HQ (Rawalpindi)</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                  </div>
                  <p className="text-[10px] text-white/50">
                    BPO Operations, Media Buying &amp; Corporate Strategy
                  </p>
                </div>

                <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] font-medium text-white mb-0.5">
                    <span>🇦🇿 Baku International Hub</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                  </div>
                  <p className="text-[10px] text-white/50">
                    Led by Sanaullah Khan — Regional Corporate BD
                  </p>
                </div>

                <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center justify-between text-[11px] font-medium text-white mb-0.5">
                    <span>⚡ GIKI Technology Core</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                  </div>
                  <p className="text-[10px] text-white/50">
                    Led by Hussain Munir — High-throughput Systems
                  </p>
                </div>
              </div>
            </div>

            {/* Trending Strategic Tags */}
            <div className="bg-[#101017] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#cfa355] font-semibold mb-3">
                Trending Strategic Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "MRPStrategy",
                  "UnitEconomics",
                  "HardwarePrecision",
                  "GIKIEngineering",
                  "BakuHub",
                  "GlobalSLA",
                  "PerformanceArchitecture",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="text-[10px] bg-white/5 hover:bg-[#cfa355]/20 text-white/70 hover:text-[#cfa355] px-2.5 py-1 rounded-lg border border-white/5 transition-colors font-mono cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default FeedDashboardPage;
