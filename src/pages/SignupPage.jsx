import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

const DEPARTMENTS = [
  "Corporate Leadership",
  "Engineering & Technology",
  "E-Commerce & Brands",
  "Operations & BPO",
  "International Expansion (Baku Desk)",
  "Media Buying & Growth",
  "Creative & Brand Architecture",
];

const SignupPage = () => {
  const { sendOtp, verifyOtp, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: DEPARTMENTS[0],
    role: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [demoCodeHint, setDemoCodeHint] = useState("");

  const otpInputsRef = useRef([]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    if (!formData.name.trim()) {
      setError("Please provide your full legal or professional name.");
      return;
    }

    if (!formData.email || !formData.email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    try {
      const res = await sendOtp({
        email: formData.email,
        name: formData.name,
        action: "signup",
      });
      setStep(2);
      setCountdown(60);
      setInfoMessage(`Verification passcode dispatched to ${formData.email}`);
      if (res.demoCode) {
        setDemoCodeHint(res.demoCode);
      }
      setTimeout(() => otpInputsRef.current[0]?.focus(), 150);
    } catch (err) {
      setError(err.message || "Failed to dispatch verification code.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
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

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");

    const fullCode = otp.join("");
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    try {
      await verifyOtp({
        email: formData.email,
        otp: fullCode,
        name: formData.name,
        department: formData.department,
        role: formData.role || "Team Specialist",
        action: "signup",
      });
      navigate("/feed");
    } catch (err) {
      setError(err.message || "Verification failed. Check your passcode.");
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      const res = await sendOtp({
        email: formData.email,
        name: formData.name,
        action: "signup",
      });
      setCountdown(60);
      setInfoMessage(`A fresh verification code was sent to ${formData.email}`);
      if (res.demoCode) setDemoCodeHint(res.demoCode);
    } catch (err) {
      setError(err.message || "Failed to resend code.");
    }
  };

  return (
    <>
      <SEO
        title="Join Outmax Team Portal — Member Onboarding"
        description="Register your Outmax Services team profile with two-factor email verification. Access the internal feed and leadership insights."
        canonicalUrl="/signup"
      />

      <div className="min-h-screen bg-[#08080b] text-white flex flex-col justify-center items-center px-4 py-28 relative overflow-hidden selection:bg-[#cfa355]/30 selection:text-white">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#cfa355]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-lg relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group mb-3">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#cfa355] block transition-transform duration-300 group-hover:scale-105">
                Outmax Services
              </span>
            </Link>
            <h1 className="text-3xl font-light tracking-tight text-white/95">
              Team Member Registration
            </h1>
            <p className="text-sm text-white/50 mt-1 font-light">
              Join the internal operational radar &amp; post insights
            </p>
          </div>

          <div className="bg-[#101015]/90 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cfa355] to-transparent opacity-70" />

            {error && (
              <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2.5 leading-relaxed">
                <Icon icon="ph:warning-circle-bold" className="text-base shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {infoMessage && (
              <div className="mb-6 p-3.5 bg-[#cfa355]/10 border border-[#cfa355]/30 rounded-xl text-[#cfa355] text-xs flex items-start gap-2.5 leading-relaxed">
                <Icon icon="ph:check-circle-bold" className="text-base shrink-0 mt-0.5" />
                <span>{infoMessage}</span>
              </div>
            )}

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
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-white/70 mb-2 font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Tariq Siddiqui"
                    required
                    className="w-full bg-[#0a0a0d] border border-white/15 focus:border-[#cfa355] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#cfa355] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-white/70 mb-2 font-medium">
                    Corporate or Personal Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. tariq@outmaxservices.com"
                    required
                    className="w-full bg-[#0a0a0d] border border-white/15 focus:border-[#cfa355] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#cfa355] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="department" className="block text-xs uppercase tracking-[0.15em] text-white/70 mb-2 font-medium">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0d] border border-white/15 focus:border-[#cfa355] rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#cfa355] transition-all cursor-pointer"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept} className="bg-[#101015]">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-xs uppercase tracking-[0.15em] text-white/70 mb-2 font-medium">
                      Designation / Role
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Senior Media Buyer"
                      className="w-full bg-[#0a0a0d] border border-white/15 focus:border-[#cfa355] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#cfa355] transition-all"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-white/40 pt-1">
                  We will send a 6-digit verification code to confirm ownership of this inbox.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#cfa355] hover:bg-[#d9b165] text-[#08080b] font-medium py-3.5 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#cfa355]/15 disabled:opacity-50 mt-6"
                >
                  {loading ? (
                    <>
                      <Icon icon="eos-icons:loading" className="text-lg animate-spin" />
                      <span>Sending Passcode...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue &amp; Verify Email</span>
                      <Icon icon="ph:arrow-right" className="text-base" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs uppercase tracking-[0.15em] text-white/70 font-medium">
                      Enter 6-Digit Passcode
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[11px] text-white/50 hover:text-white transition-colors"
                    >
                      Edit Info
                    </button>
                  </div>

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
                      <span>Verifying &amp; Joining...</span>
                    </>
                  ) : (
                    <>
                      <Icon icon="ph:check-circle" className="text-base" />
                      <span>Complete Registration</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-white/50">
                Already registered?{" "}
                <Link to="/login" className="text-[#cfa355] hover:underline font-medium ml-1">
                  Log In with Email Code
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
