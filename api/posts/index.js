// Vercel Serverless Function: Team Feed & Blog Insights Engine
if (!globalThis.__outmax_posts_store) {
  globalThis.__outmax_posts_store = [
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
      likesCount: 19,
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
      likesCount: 27,
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
      likesCount: 14,
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
      likesCount: 22,
      likedBy: [],
      comments: [],
      mediaUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
  ];
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Retrieve all feed posts
  if (req.method === "GET") {
    const { category, search } = req.query || {};
    let posts = [...globalThis.__outmax_posts_store];

    if (category && category !== "All") {
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

    // Sort newest first
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
        category = "Strategic Insight",
        tags = [],
        mediaUrl = "",
      } = req.body || {};

      if (!content || content.trim().length < 5) {
        return res
          .status(400)
          .json({ error: "Post content must contain at least 5 characters." });
      }

      const newPost = {
        id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        title: title ? title.trim() : "",
        content: content.trim(),
        author: {
          name: author?.name || "Team Member",
          role: author?.role || "Outmax Specialist",
          department: author?.department || "Operations",
          avatar:
            author?.avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              author?.name || "User"
            )}&backgroundColor=0c0c0f&textColor=cfa355`,
          verified: author?.verified ?? true,
        },
        category: category || "General Insight",
        tags: Array.isArray(tags)
          ? tags
          : String(tags)
              .split(",")
              .map((t) => t.trim().replace(/^#/, ""))
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
        message: "Insight published successfully to the Outmax Team Feed.",
        post: newPost,
      });
    } catch (err) {
      console.error("[OUTMAX CREATE POST ERROR]", err);
      return res.status(500).json({ error: "Failed to publish post." });
    }
  }

  return res.status(405).json({ error: "Method not allowed." });
}
