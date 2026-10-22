// Unified Outmax Blog & Feed Intelligence Service
// Synchronizes real-time posts between the Team Portal (/feed) and Public Website (/blog & /blog/:slug)
import { blogArticles as staticBlogArticles } from "../data/blogData";

const STORAGE_KEY_FEED_POSTS = "outmax_team_feed_cache";
const STORAGE_KEY_EDITED_MAP = "outmax_edited_posts_map";
const STORAGE_KEY_DELETED_SET = "outmax_deleted_posts_set";

// 4 Initial Strategic Desk Briefings
export const INITIAL_FEED_POSTS = [
  {
    id: "post_1",
    slug: "q4-global-operations-baku-corridor",
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
    isFeedPost: true,
  },
  {
    id: "post_2",
    slug: "hardware-level-precision-web-architecture",
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
    isFeedPost: true,
  },
  {
    id: "post_3",
    slug: "unit-economics-margin-calibration-direct-brands",
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
    isFeedPost: true,
  },
  {
    id: "post_4",
    slug: "baku-commercial-hub-logistics-bpo",
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
    isFeedPost: true,
  },
];

// Convert static blog articles to standard post schema
export const INITIAL_STATIC_POSTS = staticBlogArticles.map((art, idx) => ({
  id: `static_blog_${art.slug}`,
  slug: art.slug,
  title: art.title,
  content: art.content,
  excerpt: art.excerpt,
  author: {
    name: art.author,
    role: art.authorRole,
    department: art.category,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      art.author
    )}&backgroundColor=0c0c0f&textColor=cfa355`,
    verified: true,
  },
  category: art.category,
  tags: [art.category.replace(/[^a-zA-Z0-9]/g, "")],
  likesCount: 12 + idx * 3,
  likedBy: [],
  comments: [],
  mediaUrl: art.featuredImage,
  createdAt: new Date(art.date || "2026-10-01").toISOString(),
  isStaticArticle: true,
}));

// Helper to create safe, clean URL slugs without em dashes
export const slugify = (text) => {
  if (!text) return `insight-${Date.now()}`;
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/—/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// Local storage safely helper
const getStoredJSON = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`[PostsService] Error reading ${key}`, e);
    return fallback;
  }
};

const setStoredJSON = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[PostsService] Error writing ${key}`, e);
  }
};

const notifyChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("outmax_posts_changed"));
  }
};

export const postsService = {
  // Get all deleted IDs or Slugs
  getDeletedIds() {
    return new Set(getStoredJSON(STORAGE_KEY_DELETED_SET, []));
  },

  // Get map of edited post overrides
  getEditedMap() {
    return getStoredJSON(STORAGE_KEY_EDITED_MAP, {});
  },

  // Get cached user-published posts
  getUserPublishedPosts() {
    return getStoredJSON(STORAGE_KEY_FEED_POSTS, []);
  },

  // Return all active feed items (for /feed)
  getAllFeedPosts() {
    const deleted = this.getDeletedIds();
    const editedMap = this.getEditedMap();
    const userPosts = this.getUserPublishedPosts();

    // Start with all user-created posts
    const all = [...userPosts];

    // Add initial feed posts if not already present and not deleted
    INITIAL_FEED_POSTS.forEach((ip) => {
      if (!all.some((p) => p.id === ip.id || p.slug === ip.slug)) {
        all.push(ip);
      }
    });

    // Add static blog articles so team members can edit/delete them too!
    INITIAL_STATIC_POSTS.forEach((sp) => {
      if (!all.some((p) => p.id === sp.id || p.slug === sp.slug)) {
        all.push(sp);
      }
    });

    // Apply edits and filter out deleted items
    const active = all
      .filter((p) => !deleted.has(p.id) && !deleted.has(p.slug))
      .map((p) => {
        const override = editedMap[p.id] || editedMap[p.slug];
        return override ? { ...p, ...override } : p;
      });

    // Sort newest first
    return active.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // Return formatted articles for the public website (/blog)
  getAllBlogArticles() {
    const allPosts = this.getAllFeedPosts();

    return allPosts.map((post) => {
      const words = (post.content || "").trim().split(/\s+/).length;
      const readingMinutes = Math.max(3, Math.ceil(words / 180));

      return {
        id: post.id,
        slug: post.slug || post.id,
        title: post.title || (post.content ? post.content.slice(0, 60) : "Executive Memorandum"),
        category: post.category || "BPO & Operations",
        author: post.author?.name || "Outmax Specialist",
        authorRole: post.author?.role || "Operational Desk",
        authorAvatar: post.author?.avatar,
        date: new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        readingTime: `${readingMinutes} min read`,
        featuredImage: post.mediaUrl || "/assets/photos/team-collaboration.jpg",
        excerpt:
          post.excerpt ||
          (post.content && post.content.length > 180
            ? post.content.slice(0, 180).trim() + "..."
            : post.content || ""),
        content: post.content || "",
        tags: post.tags || [],
        likesCount: post.likesCount || 0,
        isFeedPost: !!post.isFeedPost,
        isStaticArticle: !!post.isStaticArticle,
      };
    });
  },

  // Find article by slug or ID
  getArticleBySlugOrId(slugOrId) {
    if (!slugOrId) return null;
    const deleted = this.getDeletedIds();
    if (deleted.has(slugOrId)) return null;

    const all = this.getAllBlogArticles();
    return all.find((a) => a.slug === slugOrId || a.id === slugOrId) || null;
  },

  // Create a new post/insight
  async createPost(postData) {
    const cleanTitle = (postData.title || "").trim().replace(/—/g, "-");
    const cleanContent = (postData.content || "").trim().replace(/—/g, "-");
    const slug = slugify(cleanTitle || cleanContent.slice(0, 30));
    const newId = `post_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const newPost = {
      id: newId,
      slug,
      title: cleanTitle,
      content: cleanContent,
      category: postData.category || "Leadership",
      tags: Array.isArray(postData.tags)
        ? postData.tags
        : String(postData.tags || "")
            .split(",")
            .map((t) => t.trim().replace(/^#/, "").replace(/—/g, "-"))
            .filter(Boolean),
      mediaUrl: (postData.mediaUrl || "").trim(),
      author: {
        name: postData.author?.name || "Team Member",
        role: (postData.author?.role || "Outmax Specialist").replace(/—/g, "-"),
        department: (postData.author?.department || "Operations").replace(/—/g, "-"),
        avatar: postData.author?.avatar || "/images/team/hussain.png",
        verified: true,
      },
      likesCount: 0,
      likedBy: [],
      comments: [],
      createdAt: new Date().toISOString(),
      isFeedPost: true,
    };

    // 1. Immediately persist to localStorage
    const userPosts = this.getUserPublishedPosts();
    userPosts.unshift(newPost);
    setStoredJSON(STORAGE_KEY_FEED_POSTS, userPosts);

    // 2. Notify entire UI in real time
    notifyChange();

    // 3. Asynchronously push to backend API if reachable
    try {
      fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      }).catch((e) => console.warn("[PostsService] Background API sync notice", e));
    } catch {
      // Offline or SPA mode
    }

    return newPost;
  },

  // Update an existing post or old blog
  async updatePost(id, updateData) {
    if (!id) throw new Error("Post ID required to update.");

    const cleanTitle = updateData.title !== undefined ? updateData.title.trim().replace(/—/g, "-") : undefined;
    const cleanContent = updateData.content !== undefined ? updateData.content.trim().replace(/—/g, "-") : undefined;

    const override = {
      ...(cleanTitle !== undefined && { title: cleanTitle, slug: slugify(cleanTitle) }),
      ...(cleanContent !== undefined && { content: cleanContent }),
      ...(updateData.category && { category: updateData.category }),
      ...(updateData.tags !== undefined && {
        tags: Array.isArray(updateData.tags)
          ? updateData.tags
          : String(updateData.tags)
              .split(",")
              .map((t) => t.trim().replace(/^#/, "").replace(/—/g, "-"))
              .filter(Boolean),
      }),
      ...(updateData.mediaUrl !== undefined && { mediaUrl: updateData.mediaUrl.trim() }),
      updatedAt: new Date().toISOString(),
    };

    // Update in user published cache if present
    const userPosts = this.getUserPublishedPosts();
    const userPostIndex = userPosts.findIndex((p) => p.id === id || p.slug === id);
    if (userPostIndex !== -1) {
      userPosts[userPostIndex] = { ...userPosts[userPostIndex], ...override };
      setStoredJSON(STORAGE_KEY_FEED_POSTS, userPosts);
    }

    // Always update in global edited map (covers static old blogs, initial posts, and custom posts)
    const editedMap = this.getEditedMap();
    editedMap[id] = { ...(editedMap[id] || {}), ...override };
    setStoredJSON(STORAGE_KEY_EDITED_MAP, editedMap);

    // Notify UI
    notifyChange();

    // Push to backend API
    try {
      fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...override }),
      }).catch((e) => console.warn("[PostsService] Background API update notice", e));
    } catch {
      // ignore
    }

    return { id, ...override };
  },

  // Delete a post or old blog
  async deletePost(id) {
    if (!id) return false;

    // 1. Remove from user published cache
    const userPosts = this.getUserPublishedPosts().filter((p) => p.id !== id && p.slug !== id);
    setStoredJSON(STORAGE_KEY_FEED_POSTS, userPosts);

    // 2. Add to deleted IDs set (persists deletion of static/old blogs too)
    const deletedList = getStoredJSON(STORAGE_KEY_DELETED_SET, []);
    if (!deletedList.includes(id)) {
      deletedList.push(id);
    }
    setStoredJSON(STORAGE_KEY_DELETED_SET, deletedList);

    // 3. Notify UI
    notifyChange();

    // 4. Call backend API
    try {
      fetch(`/api/posts?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      }).catch((e) => console.warn("[PostsService] Background API delete notice", e));
    } catch {
      // ignore
    }

    return true;
  },

  // Like a post
  async toggleLike(postId, userEmail) {
    const allPosts = this.getAllFeedPosts();
    const target = allPosts.find((p) => p.id === postId);
    if (!target) return;

    const likedBy = target.likedBy || [];
    const hasLiked = likedBy.includes(userEmail);
    const newLikedBy = hasLiked ? likedBy.filter((e) => e !== userEmail) : [...likedBy, userEmail];
    const newLikesCount = hasLiked ? Math.max(0, (target.likesCount || 1) - 1) : (target.likesCount || 0) + 1;

    await this.updatePost(postId, {
      likedBy: newLikedBy,
      likesCount: newLikesCount,
    });
  },
};
