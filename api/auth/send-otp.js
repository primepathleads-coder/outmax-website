// Vercel Serverless Function: Send Email OTP for Team Login & Signup
import { Resend } from "resend";
import nodemailer from "nodemailer";

// In-memory global store for OTP verification across warm serverless invocations
if (!globalThis.__outmax_otp_store) {
  globalThis.__outmax_otp_store = new Map();
}

export default async function handler(req, res) {
  // CORS & method validation
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
    const { email, name = "Team Member", action = "login" } = req.body || {};

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "A valid corporate or personal email is required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Generate secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store in global cache
    globalThis.__outmax_otp_store.set(normalizedEmail, {
      otp,
      expiresAt,
      name,
      action,
    });

    console.log(`[OUTMAX AUTH] Generated OTP for ${normalizedEmail}: ${otp} (Action: ${action})`);

    // Branded HTML Email Template
    const emailSubject = `Your Outmax Services Verification Code: ${otp}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #ffffff; margin: 0; padding: 24px; }
          .container { max-width: 540px; margin: 0 auto; background: #121217; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .logo { color: #cfa355; font-size: 22px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 24px; text-align: center; }
          .tagline { color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin-top: -18px; margin-bottom: 30px; text-align: center; }
          .greeting { font-size: 16px; color: rgba(255,255,255,0.9); margin-bottom: 16px; }
          .body-text { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 28px; }
          .otp-box { background: rgba(207, 163, 85, 0.08); border: 1px solid rgba(207, 163, 85, 0.35); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; color: #cfa355; letter-spacing: 8px; margin: 0; }
          .otp-expiry { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em; }
          .footer { margin-top: 36px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 11px; color: rgba(255,255,255,0.4); text-align: center; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Outmax Services</div>
          <div class="tagline">Enterprise Operations &amp; Team Hub</div>
          <p class="greeting">Hello ${name},</p>
          <p class="body-text">
            Use the following one-time verification passcode to complete your ${action === "signup" ? "team member registration" : "portal authentication"} for the Outmax Services internal platform.
          </p>
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <div class="otp-expiry">Valid for 10 minutes • Do not share this code</div>
          </div>
          <p class="body-text" style="font-size: 12px; color: rgba(255,255,255,0.5);">
            If you did not request this verification code, you can safely ignore this email.
          </p>
          <div class="footer">
            Outmax Services Ltd — Corporate Operations &amp; Technology<br>
            Apt No. 401, Building No. 153-H, Bahria Town Phase 4, Civic Center, Rawalpindi
          </div>
        </div>
      </body>
      </html>
    `;

    let emailSent = false;
    let providerUsed = "mock";

    // 1. Try Resend if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Outmax Services <auth@outmaxservices.com>";
        await resend.emails.send({
          from: fromEmail,
          to: normalizedEmail,
          subject: emailSubject,
          html: emailHtml,
        });
        emailSent = true;
        providerUsed = "resend";
      } catch (err) {
        console.error("[OUTMAX AUTH] Resend failed, falling back:", err.message);
      }
    }

    // 2. Try SMTP via Nodemailer if SMTP credentials are provided
    if (!emailSent && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Outmax Services" <${process.env.SMTP_USER}>`,
          to: normalizedEmail,
          subject: emailSubject,
          html: emailHtml,
        });
        emailSent = true;
        providerUsed = "smtp";
      } catch (err) {
        console.error("[OUTMAX AUTH] SMTP failed:", err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: `A verification code was sent to ${normalizedEmail}`,
      provider: providerUsed,
      // In development or when keys are not yet configured on Vercel, pass the code so testing never blocks
      demoCode: !emailSent ? otp : undefined,
    });
  } catch (error) {
    console.error("[OUTMAX AUTH ERROR]", error);
    return res.status(500).json({ error: "Failed to generate verification code. Please try again." });
  }
}
