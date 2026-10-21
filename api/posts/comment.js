// Vercel Serverless Function: Add Comment to a Post
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const { postId, content, author } = req.body || {};

    if (!postId || !content || !content.trim()) {
      return res.status(400).json({ error: "Post ID and comment content are required." });
    }

    const posts = globalThis.__outmax_posts_store || [];
    const target = posts.find((p) => p.id === postId);

    if (!target) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (!target.comments) target.comments = [];

    const newComment = {
      id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      authorName: author?.name || "Team Member",
      authorRole: author?.role || "Specialist",
      authorAvatar: author?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(author?.name || "User")}&backgroundColor=0c0c0f&textColor=cfa355`,
      content: content.trim(),
      timestamp: "Just now",
      createdAt: new Date().toISOString(),
    };

    target.comments.push(newComment);

    return res.status(201).json({
      success: true,
      comment: newComment,
      commentsCount: target.comments.length,
    });
  } catch (err) {
    console.error("[OUTMAX COMMENT ERROR]", err);
    return res.status(500).json({ error: "Failed to post comment." });
  }
}
