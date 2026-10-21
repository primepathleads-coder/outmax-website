import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

const LoginPage = () => {
  const { sendOtp, verifyOtp, loginAsDemo, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter 6-Digit OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [demoCodeHint, setDemoCodeHint] = useState("");

  const otpInputsRef = useRef([]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from || "/feed";
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle Step 1: Send OTP
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid corporate or team email address.");
      return;
    }

    try {
      const res = await sendOtp({ email, action: "login" });
      setStep(2);
      setCountdown(60);
      setInfoMessage(`A 6-digit verification code has been dispatched to ${email}`);
      if (res.demoCode) {
        setDemoCodeHint(res.demoCode);
      }
      setTimeout(() => otpInputsRef.current[0]?.focus(), 150);
    } catch (err) {
      setError(err.message || "Unable to send verification code. Please try again.");
    }
  };

  // Handle OTP digit changes with auto-focus jump
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Clear error
    if (error) setError("");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    const lastFilled = Math.min(pasted.length - 1, 5);
    otpInputsRef.current[lastFilled]?.focus();
  };

  // Handle Step 2: Verify Code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");

    const fullCode = otp.join("");
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    try {
      await verifyOtp({ email, otp: fullCode, action: "login" });
      navigate("/feed");
    } catch (err) {
      setError(err.message || "Verification failed. Code may be incorrect or expired.");
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      const res = await sendOtp({ email, action: "login" });
      setCountdown(60);
      setInfoMessage(`A fresh verification code was sent to ${email}`);
      if (res.demoCode) setDemoCodeHint(res.demoCode);
    } catch (err) {
      setError(err.message || "Failed to resend code.");
    }
  };

  const handleQuickDemo = (roleKey) => {
    loginAsDemo(roleKey);
    navigate("/feed");
  };

  return (
    <>
      <SEO
        title="Team Member Login | Outmax Services Operations Hub"
        description="Secure authenticated access for Outmax Services partners, engineers, and operational teams. Two-factor email OTP verification."
        canonicalUrl="/login"
      />

      <div className="min-h-screen bg-[#08080b] text-white flex flex-col justify-center items-center px-4 py-12 sm:py-16 relative overflow-hidden selection:bg-[#cfa355]/30 selection:text-white">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cfa355]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Outer Card */}
        <div className="w-full max-w-md relative z-10">
          {/* Header Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group mb-3">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#cfa355] block transition-transform duration-300 group-hover:scale-105">
                Outmax Services
              </span>
            </Link>
            <h1 className="text-3xl font-light tracking-tight text-white/95">
              Team Member Portal
            </h1>
            <p className="text-sm text-white/50 mt-1 font-light">
              Secure enterprise desk, strategic feed &amp; insights
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-[#101015]/90 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top Gold Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cfa355] to-transparent opacity-70" />

            {/* Error Notification */}
            {error && (
              <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2.5 leading-relaxed">
                <Icon icon="ph:warning-circle-bold" className="text-base shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Info Notification */}
            {infoMessage && (
              <div className="mb-6 p-3.5 bg-[#cfa355]/10 border border-[#cfa355]/30 rounded-xl text-[#cfa355] text-xs flex items-start gap-2.5 leading-relaxed">
                <Icon icon="ph:check-circle-bold" className="text-base shrink-0 mt-0.5" />
                <span>{infoMessage}</span>
              </div>
            )}

            {/* Demo Code Autofill Helper */}
            {demoCodeHint && (
              <div className="mb-6 p-3 bg-white/5 border border-white/10 rounded-xl text-xs flex items-center justify-between">
                <span className="text-white/60">
                  Dev/Test Code: <strong className="text-[#cfa355] font-mono tracking-widest text-sm">{demoCodeHint}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOtp(demoCodeHint.split(""));
                    setError("");
                  }}
                  className="text-[11px] text-[#cfa355] hover:underline font-medium"
                >
                  Autofill
                </button>
              </div>
            )}

            {step === 1 ? (
              // Step 1: Email Form
              <form onSubmit={handleSendCode} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-white/70 mb-2 font-medium">
                    Corporate / Team Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. hussain@outmaxservices.com"
                      required
                      className="w-full bg-[#0a0a0d] border border-white/15 focus:border-[#cfa355] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#cfa355] transition-all"
                    />
                    <Icon
                      icon="ph:envelope-simple"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-lg pointer-events-none"
                    />
                  </div>
                  <p className="text-[11px] text-white/40 mt-2">
                    We will send a one-time 6-digit passcode to verify your corporate identity.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#cfa355] hover:bg-[#d9b165] text-[#08080b] font-medium py-3.5 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#cfa355]/15 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Icon icon="eos-icons:loading" className="text-lg animate-spin" />
                      <span>Sending Passcode...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <Icon icon="ph:arrow-right" className="text-base" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              // Step 2: 6-Digit OTP Form
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs uppercase tracking-[0.15em] text-white/70 font-medium">
                      Enter 6-Digit Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[11px] text-white/50 hover:text-white transition-colors"
                    >
                      Change Email
                    </button>
                  </div>

                  {/* 6 Digit Input Boxes */}
                  <div className="flex justify-between gap-2" onPaste={handlePaste}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputsRef.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-12 h-14 bg-[#0a0a0d] border border-white/15 focus:border-[#cfa355] rounded-xl text-center text-xl font-mono text-white focus:outline-none focus:ring-1 focus:ring-[#cfa355] transition-all"
                      />
                    ))}
                  </div>

                  {/* Resend Timer */}
                  <div className="flex items-center justify-between mt-3 text-xs text-white/50">
                    <span>Didn't receive the email?</span>
                    {countdown > 0 ? (
                      <span className="text-white/40">Resend in {countdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-[#cfa355] hover:underline font-medium"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#cfa355] hover:bg-[#d9b165] text-[#08080b] font-medium py-3.5 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#cfa355]/15 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Icon icon="eos-icons:loading" className="text-lg animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Icon icon="ph:lock-key-open" className="text-base" />
                      <span>Verify &amp; Enter Portal</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-white/50">
                New to the Outmax team?{" "}
                <Link to="/signup" className="text-[#cfa355] hover:underline font-medium ml-1">
                  Create Member Account
                </Link>
              </p>
            </div>
          </div>

          {/* Quick Leadership Role Switcher for verification and testing */}
          <div className="mt-8 bg-white/[0.02] border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-medium">
              Quick Role Switch for Testing
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("hamid")}
                className="text-[11px] bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white px-3 py-1.5 rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Hamid Iqbal (CEO)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("hussain")}
                className="text-[11px] bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white px-3 py-1.5 rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Hussain Munir (Tech)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("abdullah")}
                className="text-[11px] bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white px-3 py-1.5 rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Abdullah Sarkani (E-Com)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("sanaullah")}
                className="text-[11px] bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white px-3 py-1.5 rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Sanaullah Khan (Baku)
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center text-[11px] text-white/30 flex items-center justify-center gap-1.5">
            <Icon icon="ph:shield-check" className="text-sm text-[#cfa355]" />
            <span>End-to-end encrypted session | Outmax Services Internal</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
