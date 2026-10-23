// Vercel Serverless Function: Send Email OTP for Team Login & Signup
import { Resend } from "resend";
import nodemailer from "nodemailer";

// In-memory global store for OTP verification across warm serverless invocations
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
    const { email, name = "Team Member", action = "login" } = req.body || {};

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "A valid corporate email address is required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const domain = normalizedEmail.split("@")[1];

    // Strict Team Member Access Control
    const isAuthorized = ALLOWED_DOMAINS.includes(domain) || APPROVED_TEAM_EMAILS.has(normalizedEmail);

    if (!isAuthorized) {
      return res.status(403).json({
        error: "Access restricted: Only authorized Outmax Services team members and corporate desks have access to this portal. Please use your corporate email (@outmaxservices.com) or contact leadership.",
      });
    }

    // Generate secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store in memory
    globalThis.__outmax_otp_store.set(normalizedEmail, {
      otp,
      expiresAt,
      name,
      action,
    });

    console.log(`[OUTMAX AUTH] Generated OTP for authorized member ${normalizedEmail}: ${otp}`);

    // Branded HTML Email Template
    const emailSubject = `Outmax Services Verification Passcode: ${otp}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #08080b; color: #ffffff; margin: 0; padding: 24px; }
          .container { max-width: 500px; margin: 0 auto; background: #0f0f14; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 32px; }
          .logo { color: #cfa355; font-size: 16px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 24px; }
          .title { font-size: 20px; font-weight: 500; color: #ffffff; margin-bottom: 12px; }
          .body-text { font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 24px; }
          .otp-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(207, 163, 85, 0.3); border-radius: 8px; padding: 18px; text-align: center; margin: 20px 0; }
          .otp-code { font-family: monospace; font-size: 32px; font-weight: 700; color: #cfa355; letter-spacing: 6px; margin: 0; }
          .otp-expiry { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 6px; text-transform: uppercase; letter-spacing: 0.1em; }
          .footer { margin-top: 32px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: rgba(255,255,255,0.35); line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Outmax Services / Portal</div>
          <div class="title">Authentication Passcode</div>
          <p class="body-text">
            Hello ${name},<br><br>
            Use the one-time verification passcode below to access the Outmax Services internal operations feed and member portal.
          </p>
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <div class="otp-expiry">Valid for 10 minutes | Confidential</div>
          </div>
          <p class="body-text" style="font-size: 11px; color: rgba(255,255,255,0.4);">
            This passcode is strictly intended for authorized personnel. If you did not initiate this request, notify the engineering desk immediately.
          </p>
          <div class="footer">
            Outmax Services Ltd | Corporate Operations Desk<br>
            Office No 2, First Floor, Mall View Building, 1-A Mall Road, Wah Cantt, Punjab
          </div>
        </div>
      </body>
      </html>
    `;

    let emailSent = false;
    let providerUsed = "none";
    let dispatchError = null;

    // 1. Try Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        // In Resend free sandbox, use onboarding@resend.dev unless custom domain is verified
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Outmax Services <onboarding@resend.dev>";
        
        const response = await resend.emails.send({
          from: fromEmail,
          to: normalizedEmail,
          subject: emailSubject,
          html: emailHtml,
        });

        if (response.error) {
          throw new Error(response.error.message || "Resend dispatch rejected");
        }

        emailSent = true;
        providerUsed = "resend";
      } catch (err) {
        console.error("[OUTMAX AUTH] Resend failed:", err.message);
        dispatchError = err.message;

        // If it failed because custom domain was not verified, auto-retry with onboarding@resend.dev
        if (err.message && (err.message.toLowerCase().includes("domain") || err.message.toLowerCase().includes("from"))) {
          try {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const retryRes = await resend.emails.send({
              from: "Outmax Services <onboarding@resend.dev>",
              to: normalizedEmail,
              subject: emailSubject,
              html: emailHtml,
            });
            if (!retryRes.error) {
              emailSent = true;
              providerUsed = "resend";
              dispatchError = null;
            }
          } catch (retryErr) {
            console.error("[OUTMAX AUTH] Resend retry failed:", retryErr.message);
          }
        }
      }
    }

    // 2. Try SMTP if configured (Gmail, Zoho, Hostinger, AWS SES, etc.)
    if (!emailSent && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transportConfig = process.env.SMTP_HOST
          ? {
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT) || 587,
              secure: Number(process.env.SMTP_PORT) === 465,
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
            }
          : {
              service: "gmail",
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
            };

        const transporter = nodemailer.createTransport(transportConfig);

        await transporter.sendMail({
          from: `"Outmax Services" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: normalizedEmail,
          subject: emailSubject,
          html: emailHtml,
        });
        emailSent = true;
        providerUsed = "smtp";
        dispatchError = null;
      } catch (err) {
        console.error("[OUTMAX AUTH] SMTP failed:", err.message);
        dispatchError = err.message;
      }
    }

    let feedbackMessage = "";
    if (emailSent) {
      feedbackMessage = `Verification passcode sent to ${normalizedEmail}`;
    } else if (dispatchError && dispatchError.includes("testing emails to your own email address")) {
      feedbackMessage = `Resend is in testing mode. You can test with your Resend signup email, or verify 'outmaxservices.com' in Resend domains to send to any team member.`;
    } else if (dispatchError) {
      feedbackMessage = `Email dispatch notice: ${dispatchError}`;
    } else {
      feedbackMessage = `Email service credentials are not yet configured in environment variables.`;
    }

    return res.status(200).json({
      success: true,
      emailSent,
      provider: providerUsed,
      message: feedbackMessage,
      demoCode: !emailSent ? otp : undefined,
      dispatchError: !emailSent ? dispatchError : undefined,
    });
  } catch (error) {
    console.error("[OUTMAX AUTH ERROR]", error);
    return res.status(500).json({ error: "Failed to generate verification code. Please try again." });
  }
}
