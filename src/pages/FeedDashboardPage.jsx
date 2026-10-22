import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";
import { postsService } from "../services/postsService";

const CATEGORIES = [
  "All",
  "Feed Insights",
  "Full Blog Articles",
  "Leadership",
  "Engineering",
  "E-Commerce",
  "Operations",
  "Expansion",
  "Email Marketing",
  "Paid Acquisition",
  "Affiliate Marketing",
  "Monetization & Arbitrage",
];

const FeedDashboardPage = () => {
  const { user, logout, isAuthenticated, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState(() => postsService.getAllFeedPosts());
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPostId, setDeletingPostId] = useState(null);

  // Composer Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Leadership");
  const [newTags, setNewTags] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");

  // Local device image upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef(null);
  const composerRef = useRef(null);

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
    const syncPosts = () => {
      setPosts(postsService.getAllFeedPosts());
    };

    syncPosts();
    window.addEventListener("outmax_posts_changed", syncPosts);
    window.addEventListener("storage", syncPosts);

    // Background sync from remote API
    const fetchRemote = async () => {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (data.posts && data.posts.length > 0) {
              syncPosts();
            }
          }
        }
      } catch (e) {
        // offline fallback
      }
    };
    fetchRemote();

    return () => {
      window.removeEventListener("outmax_posts_changed", syncPosts);
      window.removeEventListener("storage", syncPosts);
    };
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

  // Canvas-based local image compression for fast upload from mobile/desktop
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const maxWidth = 1400;
          const maxHeight = 1400;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file (PNG, JPG, WebP)");
      return;
    }

    setIsProcessingImage(true);
    try {
      const compressed = await compressImage(file);
      setSelectedFile(file);
      setFilePreview(compressed);
      setNewMediaUrl(compressed);
      showToast(`Attached ${file.name}`);
    } catch (err) {
      console.error("Image processing error", err);
      showToast("Failed to process image");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setFilePreview("");
    setNewMediaUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Pre-fill composer to edit an existing post or old blog
  const handleStartEdit = (post) => {
    setEditingPost(post);
    setNewTitle(post.title || "");
    setNewContent(post.content || "");
    setNewCategory(post.category || "Leadership");
    setNewTags(Array.isArray(post.tags) ? post.tags.join(", ") : "");
    setNewMediaUrl(post.mediaUrl || "");
    setFilePreview(post.mediaUrl || "");
    setSelectedFile(null);
    setComposerOpen(true);

    setTimeout(() => {
      composerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setNewMediaUrl("");
    setSelectedFile(null);
    setFilePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setComposerOpen(false);
  };

  const handlePublishPost = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setIsPosting(true);

    try {
      if (editingPost) {
        // UPDATE EXISTING POST / OLD BLOG
        await postsService.updatePost(editingPost.id, {
          title: newTitle,
          content: newContent,
          category: newCategory,
          tags: newTags,
          mediaUrl: newMediaUrl,
        });
        showToast("Insight updated across feed and blog");
      } else {
        // CREATE NEW POST
        await postsService.createPost({
          title: newTitle,
          content: newContent,
          category: newCategory,
          tags: newTags,
          mediaUrl: newMediaUrl,
          author: {
            name: user?.name || "Team Member",
            role: user?.role || "Team Specialist",
            department: user?.department || "Operations",
            avatar: user?.avatar || "/images/team/hussain.png",
            verified: true,
          },
        });
        showToast("Insight published to feed & live blog");
      }

      handleCancelEdit();
    } catch (err) {
      console.error(err);
      showToast("Failed to save insight");
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
    const titleLabel = postTitle ? `"${postTitle}"` : "this insight";
    const confirmed = window.confirm(
      `Are you sure you want to delete ${titleLabel}? It will be removed from both the feed and public website.`
    );
    if (!confirmed) return;

    try {
      await postsService.deletePost(postId);
      showToast("Entry removed successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete entry");
    }
  };

  const handleLike = async (postId) => {
    const userEmail = user?.email || "anonymous_member";
    await postsService.toggleLike(postId, userEmail);
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
    let matchesCategory = true;
    if (activeCategory === "Feed Insights") {
      matchesCategory = !post.isStaticArticle;
    } else if (activeCategory === "Full Blog Articles") {
      matchesCategory = !!post.isStaticArticle;
    } else if (activeCategory !== "All") {
      matchesCategory = post.category?.toLowerCase() === activeCategory.toLowerCase();
    }

    const matchesSearch =
      !searchQuery ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Strict Team Member Route Protection
  if (!isAuthenticated) {
    return (
      <>
        <SEO
          title="Team Access Restricted | Outmax Services"
          description="Authentication required to view internal Outmax Services operations feed."
          canonicalUrl="/feed"
        />
        <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-[#0c0c10] border border-white/[0.08] rounded-xl p-8 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-white/[0.04] border border-white/[0.08] rounded-lg flex items-center justify-center mx-auto text-[#cfa355]">
              <Icon icon="ph:shield-warning" className="text-2xl" />
            </div>
            <h1 className="text-xl font-medium text-white tracking-tight">
              Team Member Access Only
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              This operational intelligence stream is strictly restricted to verified Outmax Services partners, engineers, and executive desks.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="w-full inline-block bg-[#cfa355] hover:bg-[#d9b165] text-[#070709] font-medium text-xs py-3 px-4 rounded-md transition-colors"
              >
                Authenticate with Corporate Email
              </Link>
            </div>
            <p className="text-[11px] text-neutral-600 pt-2">
              Requires email under @outmaxservices.com or authorized team whitelist.
            </p>
          </div>
        </div>
      </>
    );
  }

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
                          className="w-full text-left px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-sm transition-colors cursor-pointer"
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
                        className="w-full text-left px-2.5 py-1.5 text-xs text-red-400 hover:bg-white/[0.04] rounded-sm transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>Sign Out</span>
                        <Icon icon="ph:sign-out" className="text-xs" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
            <div
              ref={composerRef}
              className="bg-[#0f0f14] border border-white/[0.08] rounded-xl p-5 shadow-2xl transition-all"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-2">
                  {editingPost ? (
                    <>
                      <Icon icon="ph:pencil-simple" className="text-[#cfa355] text-sm" />
                      <span className="text-[#cfa355]">Editing Insight</span>
                    </>
                  ) : (
                    <span>Draft Internal Memo</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-neutral-500 hover:text-neutral-300 text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>

              {editingPost && (
                <div className="mb-4 bg-[#cfa355]/10 border border-[#cfa355]/20 rounded-md p-3 text-xs text-neutral-300 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-[#cfa355] truncate">
                      Editing: {editingPost.title || "Untitled Entry"}
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Updates will sync to internal feed and live public article at /blog/{editingPost.slug || editingPost.id}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="text-[11px] text-neutral-400 hover:text-white underline shrink-0 cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                </div>
              )}

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
                    rows={5}
                    required
                    placeholder="Compose memo, engineering breakdown, or operational update..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full bg-transparent border border-white/[0.06] focus:border-[#cfa355]/60 rounded-md p-3 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none leading-relaxed resize-none font-sans"
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
                      {CATEGORIES.filter((c) => c !== "All" && c !== "Feed Insights" && c !== "Full Blog Articles").map((c) => (
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

                {/* Local Device Image Upload Section */}
                <div className="pt-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] text-neutral-400">
                      Media Attachment
                    </label>
                    {isProcessingImage && (
                      <span className="text-[10px] text-[#cfa355]">Optimizing image...</span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {/* Local File Picker Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 px-3 py-2 rounded-md text-xs text-neutral-200 transition-colors cursor-pointer"
                    >
                      <Icon icon="ph:image-square" className="text-base text-[#cfa355]" />
                      <span>{selectedFile ? "Replace Device Image" : "Upload Image from Device"}</span>
                    </button>

                    <span className="text-[11px] text-neutral-500">or enter image link below</span>
                  </div>

                  {/* Thumbnail Preview of Local Upload */}
                  {filePreview && (
                    <div className="rounded-lg border border-white/[0.08] bg-[#15151c] p-2.5 flex items-center justify-between gap-3 mt-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={filePreview}
                          alt="Local upload preview"
                          className="w-14 h-14 rounded-md object-cover border border-white/[0.08] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs text-neutral-200 font-medium truncate max-w-[260px]">
                            {selectedFile?.name || "Local image attached"}
                          </p>
                          <p className="text-[10px] text-neutral-500 mt-0.5">
                            {selectedFile ? `${(selectedFile.size / 1024).toFixed(0)} KB · Optimized for fast loading` : "Image attached"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-xs text-neutral-400 hover:text-red-400 px-2 py-1 rounded transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Optional External Image URL input */}
                  {!filePreview && (
                    <input
                      type="url"
                      placeholder="Optional image URL (https://...)"
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      className="w-full bg-[#15151c] border border-white/[0.08] focus:border-[#cfa355]/60 rounded-md px-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
                    />
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPosting || !newContent.trim() || isProcessingImage}
                    className="bg-[#cfa355] hover:bg-[#d9b165] text-[#070709] px-4 py-1.5 rounded-md text-xs font-medium transition-all disabled:opacity-40 cursor-pointer"
                  >
                    {isPosting
                      ? "Saving..."
                      : editingPost
                      ? "Save Changes"
                      : "Publish Entry"}
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

                      {/* Desk & Type Tags */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {post.isStaticArticle && (
                          <span className="text-[10px] uppercase tracking-wider text-[#cfa355] bg-[#cfa355]/10 border border-[#cfa355]/20 px-2 py-0.5 rounded-sm font-mono">
                            Blog Article
                          </span>
                        )}
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-sm font-mono">
                          {post.category || "General"}
                        </span>
                      </div>
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
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06] text-xs text-neutral-400">
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

                        <button
                          type="button"
                          onClick={() => {
                            const shareUrl = `${window.location.origin}/blog/${post.slug || post.id}`;
                            navigator.clipboard?.writeText?.(shareUrl);
                            showToast("Article link copied");
                          }}
                          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Icon icon="ph:share-simple" className="text-sm" />
                          <span>Share</span>
                        </button>
                      </div>

                      {/* Direct Live Website Link, Edit & Delete Buttons */}
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/blog/${post.slug || post.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#cfa355] hover:text-[#e0b86c] transition-colors flex items-center gap-1 text-[11px] px-2 py-1 bg-white/[0.03] hover:bg-white/[0.06] rounded-sm border border-white/[0.06]"
                          title="View on public Insights & Blog page"
                        >
                          <Icon icon="ph:arrow-square-out" className="text-xs text-[#cfa355]" />
                          <span>Live Article</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleStartEdit(post)}
                          className="text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] bg-white/[0.03] hover:bg-white/[0.08] px-2 py-1 rounded-sm border border-white/[0.06]"
                          title="Edit this blog or insight"
                        >
                          <Icon icon="ph:pencil-simple" className="text-xs text-[#cfa355]" />
                          <span>Edit</span>
                        </button>

                        {deletingPostId === post.id ? (
                          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-sm">
                            <span className="text-[10px] text-red-300">Delete?</span>
                            <button
                              type="button"
                              onClick={async () => {
                                await postsService.deletePost(post.id);
                                setDeletingPostId(null);
                                showToast("Entry removed");
                              }}
                              className="text-white bg-red-600/90 hover:bg-red-600 px-1.5 py-0.5 rounded-sm text-[10px] font-medium transition-colors cursor-pointer"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingPostId(null)}
                              className="text-neutral-400 hover:text-white px-1 text-[10px] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeletingPostId(post.id)}
                            className="text-neutral-400 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1 text-[11px] bg-white/[0.03] hover:bg-red-500/10 px-2 py-1 rounded-sm border border-white/[0.06] hover:border-red-500/20"
                            title="Permanently remove this blog from feed and website"
                          >
                            <Icon icon="ph:trash" className="text-xs" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
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
