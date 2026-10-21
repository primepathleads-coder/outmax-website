// Vercel Serverless Function: Like / Unlike a Post
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

  const { postId, userEmail } = req.body || {};

  if (!postId) {
    return res.status(400).json({ error: "Post ID is required." });
  }

  const posts = globalThis.__outmax_posts_store || [];
  const target = posts.find((p) => p.id === postId);

  if (!target) {
    return res.status(404).json({ error: "Post not found." });
  }

  if (!target.likedBy) target.likedBy = [];

  const userKey = userEmail || "anonymous_member";
  const index = target.likedBy.indexOf(userKey);

  let hasLiked = false;
  if (index > -1) {
    target.likedBy.splice(index, 1);
    target.likesCount = Math.max(0, (target.likesCount || 1) - 1);
    hasLiked = false;
  } else {
    target.likedBy.push(userKey);
    target.likesCount = (target.likesCount || 0) + 1;
    hasLiked = true;
  }

  return res.status(200).json({
    success: true,
    likesCount: target.likesCount,
    hasLiked,
  });
}
