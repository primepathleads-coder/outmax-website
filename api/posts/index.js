// Vercel Serverless Function: Team Feed & Blog Insights Engine
if (!globalThis.__outmax_posts_store) {
  globalThis.__outmax_posts_store = [
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
      category: "BPO & Operations",
      tags: ["Operations", "Q4Strategy", "GlobalExpansion"],
      likesCount: 19,
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
      ],
      mediaUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
      createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
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
      category: "Web & App Engineering",
      tags: ["SystemsArchitecture", "WebPerf", "GIKIEngineering"],
      likesCount: 27,
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
      category: "Paid Acquisition",
      tags: ["UnitEconomics", "MRPStrategy", "EcomScaling"],
      likesCount: 14,
      likedBy: [],
      comments: [],
      mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
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
      category: "BPO & Operations",
      tags: ["BakuHub", "CrossBorder", "BusinessDevelopment"],
      likesCount: 22,
      likedBy: [],
      comments: [],
      mediaUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
  ];
}

const generateSlug = (title) => {
  if (!title) return `insight-${Date.now()}`;
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Retrieve all feed posts / blog insights
  if (req.method === "GET") {
    const { category, search, slug } = req.query || {};
    let posts = [...globalThis.__outmax_posts_store];

    if (slug) {
      const match = posts.find((p) => p.slug === slug || p.id === slug);
      if (!match) return res.status(404).json({ error: "Article not found." });
      return res.status(200).json({ success: true, post: match });
    }

    if (category && category !== "All" && category !== "all") {
      posts = posts.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.content?.toLowerCase().includes(q) ||
          p.author?.name?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  }

  // POST: Create a new blog post / team insight
  if (req.method === "POST") {
    try {
      const {
        title,
        content,
        author,
        category = "BPO & Operations",
        tags = [],
        mediaUrl = "",
      } = req.body || {};

      if (!content || content.trim().length < 5) {
        return res
          .status(400)
          .json({ error: "Post content must contain at least 5 characters." });
      }

      const cleanTitle = title ? title.trim().replace(/—/g, "-") : "";
      const postSlug = generateSlug(cleanTitle || content.slice(0, 30));

      const newPost = {
        id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        slug: postSlug,
        title: cleanTitle,
        content: content.trim().replace(/—/g, "-"),
        author: {
          name: author?.name || "Team Member",
          role: (author?.role || "Outmax Specialist").replace(/—/g, "-"),
          department: (author?.department || "Operations").replace(/—/g, "-"),
          avatar:
            author?.avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              author?.name || "User"
            )}&backgroundColor=0c0c0f&textColor=cfa355`,
          verified: author?.verified ?? true,
        },
        category: category || "BPO & Operations",
        tags: Array.isArray(tags)
          ? tags
          : String(tags)
              .split(",")
              .map((t) => t.trim().replace(/^#/, "").replace(/—/g, "-"))
              .filter(Boolean),
        likesCount: 0,
        likedBy: [],
        comments: [],
        mediaUrl: mediaUrl.trim(),
        createdAt: new Date().toISOString(),
      };

      globalThis.__outmax_posts_store.unshift(newPost);

      return res.status(201).json({
        success: true,
        message: "Insight published successfully.",
        post: newPost,
      });
    } catch (err) {
      console.error("[OUTMAX CREATE POST ERROR]", err);
      return res.status(500).json({ error: "Failed to publish post." });
    }
  }

  // PUT: Update an existing post or blog
  if (req.method === "PUT") {
    try {
      const { id, title, content, category, tags, mediaUrl } = req.body || {};

      if (!id) {
        return res.status(400).json({ error: "Post ID is required to update." });
      }

      const posts = globalThis.__outmax_posts_store || [];
      const index = posts.findIndex((p) => p.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Post not found." });
      }

      const current = posts[index];
      const cleanTitle = title !== undefined ? title.trim().replace(/—/g, "-") : current.title;

      const updatedPost = {
        ...current,
        title: cleanTitle,
        slug: cleanTitle ? generateSlug(cleanTitle) : current.slug,
        content: content !== undefined ? content.trim().replace(/—/g, "-") : current.content,
        category: category || current.category,
        tags: tags !== undefined
          ? (Array.isArray(tags)
              ? tags
              : String(tags)
                  .split(",")
                  .map((t) => t.trim().replace(/^#/, "").replace(/—/g, "-"))
                  .filter(Boolean))
          : current.tags,
        mediaUrl: mediaUrl !== undefined ? mediaUrl.trim() : current.mediaUrl,
        updatedAt: new Date().toISOString(),
      };

      posts[index] = updatedPost;

      return res.status(200).json({
        success: true,
        message: "Post updated successfully.",
        post: updatedPost,
      });
    } catch (err) {
      console.error("[OUTMAX UPDATE POST ERROR]", err);
      return res.status(500).json({ error: "Failed to update post." });
    }
  }

  // DELETE: Delete a post or blog
  if (req.method === "DELETE") {
    try {
      const id = req.query?.id || req.body?.id;

      if (!id) {
        return res.status(400).json({ error: "Post ID is required to delete." });
      }

      const posts = globalThis.__outmax_posts_store || [];
      const index = posts.findIndex((p) => p.id === id || p.slug === id);

      if (index === -1) {
        return res.status(404).json({ error: "Post not found." });
      }

      const deleted = posts.splice(index, 1)[0];

      return res.status(200).json({
        success: true,
        message: "Post deleted successfully.",
        deletedId: deleted.id,
      });
    } catch (err) {
      console.error("[OUTMAX DELETE POST ERROR]", err);
      return res.status(500).json({ error: "Failed to delete post." });
    }
  }

  return res.status(405).json({ error: "Method not allowed." });
}
