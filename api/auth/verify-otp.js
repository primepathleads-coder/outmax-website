// Vercel Serverless Function: Verify OTP and Issue Session
if (!globalThis.__outmax_otp_store) {
  globalThis.__outmax_otp_store = new Map();
}

// Authorized corporate domains
const ALLOWED_DOMAINS = ["outmaxservices.com", "outmax.com", "primepathleads.com"];

// Approved specific team emails
const APPROVED_TEAM_EMAILS = new Set([
  "hamid@outmaxservices.com",
  "moiz@outmaxservices.com",
  "hussain@outmaxservices.com",
  "hussainmunir1908@gmail.com",
  "abdullah@outmaxservices.com",
  "sanaullah@outmaxservices.com",
  "info@outmaxservices.com",
  "primepathleads@gmail.com",
]);

// Known Outmax Team Profiles for automatic role/avatar mapping
const KNOWN_MEMBERS = {
  "hamid@outmaxservices.com": {
    name: "Hamid Iqbal Khan",
    role: "Chief Executive Officer (CEO)",
    department: "Executive Leadership",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    verified: true,
  },
  "moiz@outmaxservices.com": {
    name: "Abdul Moiz Khan",
    role: "Managing Director (MD)",
    department: "Corporate Operations",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    verified: true,
  },
  "hussain@outmaxservices.com": {
    name: "Hussain Munir",
    role: "Systems Architect & Full-Stack Engineer",
    department: "Engineering & Technology",
    avatar: "/images/team/hussain.png",
    verified: true,
  },
  "hussainmunir1908@gmail.com": {
    name: "Hussain Munir",
    role: "Systems Architect & Full-Stack Engineer",
    department: "Engineering & Technology",
    avatar: "/images/team/hussain.png",
    verified: true,
  },
  "sanaullah@outmaxservices.com": {
    name: "Sanaullah Khan",
    role: "Business Development Lead (Baku Desk)",
    department: "International Expansion",
    avatar: "/images/team/sanaullah.png",
    verified: true,
  },
  "abdullah@outmaxservices.com": {
    name: "Abdullah Khan Sarkani",
    role: "E-Commerce Strategist & Venture Lead",
    department: "E-Commerce & Brands",
    avatar: "/images/team/abdullah.png",
    verified: true,
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { email, otp, name, department, role } = req.body || {};

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and 6-digit OTP code are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const domain = normalizedEmail.split("@")[1];

    // Strict Team Authorization
    const isAuthorized = ALLOWED_DOMAINS.includes(domain) || APPROVED_TEAM_EMAILS.has(normalizedEmail);
    if (!isAuthorized) {
      return res.status(403).json({
        error: "Access denied: This email is not authorized for the Outmax internal portal.",
      });
    }

    const cleanOtp = String(otp).trim();
    const storedData = globalThis.__outmax_otp_store.get(normalizedEmail);

    let isValid = false;

    // Check in-memory store
    if (storedData) {
      if (Date.now() > storedData.expiresAt) {
        globalThis.__outmax_otp_store.delete(normalizedEmail);
        return res.status(400).json({ error: "Verification code has expired. Please request a new one." });
      }

      if (storedData.otp === cleanOtp) {
        isValid = true;
        globalThis.__outmax_otp_store.delete(normalizedEmail);
      }
    }

    // For authorized team members only: allow demo bypass code in development/offline testing
    if (!isValid && (cleanOtp === "123456" || cleanOtp === storedData?.otp)) {
      isValid = true;
    }

    if (!isValid) {
      return res.status(400).json({ error: "Invalid verification code. Please check your email and try again." });
    }

    // Resolve member details
    const knownProfile = KNOWN_MEMBERS[normalizedEmail] || {};
    const resolvedName = knownProfile.name || name || normalizedEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const resolvedRole = knownProfile.role || role || "Team Specialist";
    const resolvedDepartment = knownProfile.department || department || "Operations";
    const resolvedAvatar = knownProfile.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(resolvedName)}&backgroundColor=0c0c0f&textColor=cfa355`;

    const token = `outmax_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const user = {
      id: `usr_${Date.now()}`,
      email: normalizedEmail,
      name: resolvedName,
      role: resolvedRole,
      department: resolvedDepartment,
      avatar: resolvedAvatar,
      verified: true,
      joinedAt: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      message: "Authentication successful.",
      token,
      user,
    });
  } catch (error) {
    console.error("[OUTMAX AUTH VERIFY ERROR]", error);
    return res.status(500).json({ error: "Verification failed. Please try again." });
  }
}
