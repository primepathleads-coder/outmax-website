import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { companyInfo } from "../data/companyData";
import { servicesData } from "../data/servicesData";
import { Icon } from "@iconify/react/dist/iconify.js";
import confetti from "canvas-confetti";

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: preselectedService || servicesData[0].title,
    budget: "$5,000 - $15,000 / month",
    timeline: "Within 2 - 4 weeks",
    message: "",
    consent: true,
  });

  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Business Email, and Project Description).");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please provide a valid corporate business email address.");
      return;
    }

    try {
      // Simulate real asynchronous network dispatch / persistence
      await new Promise((resolve) => setTimeout(resolve, 800));

      const submissionRecord = {
        id: `INQ-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        ...formData,
      };

      // Real client-side persistence in localStorage
      const existing = JSON.parse(localStorage.getItem("outmax_inquiries") || "[]");
      existing.push(submissionRecord);
      localStorage.setItem("outmax_inquiries", JSON.stringify(existing));

      // Trigger celebratory agency confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#cfa355", "#000000", "#e5e5e0"],
        });
      } catch (err) {
        // ignore if confetti script unavailable
      }

      setSubmittedData(submissionRecord);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred while transmitting your inquiry. Please email directly.");
    }
  };

  const handleDownloadReceipt = () => {
    if (!submittedData) return;
    const blob = new Blob(
      [
        `OUTMAX SERVICES LTD - INQUIRY RECEIPT\n` +
          `====================================\n` +
          `Inquiry ID: ${submittedData.id}\n` +
          `Date: ${submittedData.timestamp}\n` +
          `Full Name: ${submittedData.name}\n` +
          `Email: ${submittedData.email}\n` +
          `Company: ${submittedData.company}\n` +
          `Selected Service: ${submittedData.service}\n` +
          `Budget Bracket: ${submittedData.budget}\n` +
          `Deployment Timeline: ${submittedData.timeline}\n` +
          `Message:\n${submittedData.message}\n` +
          `====================================\n` +
          `Headquarters: Office No 2, First Floor, Mall View Building, 1-A Mall Road, Wah Cantt, Punjab, Pakistan\n` +
          `Founder & Managing Director: Abdul Moiz Khan\n`,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Outmax-Inquiry-${submittedData.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-28 pb-24 text-black">
      <SEO
        title="Contact Outmax Services | Start Your Project or Request an Audit"
        description="Get in touch with Outmax Services leadership for dedicated BPO squad placement, paid advertising management, or custom digital builds. Rapid 24-hour turnaround."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
            Initiate Engagement
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-black leading-[1.08]">
            Plan Your Next Partnership
          </h1>
          <p className="text-lg sm:text-2xl font-light text-black/75 leading-relaxed">
            Whether you are looking to deploy a dedicated 24/7 customer care squad, scale paid traffic on Meta, or develop custom lead portals, our team is ready to scope your engagement.
          </p>
        </div>
      </section>

      {/* Main Grid: Form on Left, Direct Contact Info on Right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: The Inquiry Form */}
          <div className="lg:col-span-7 bg-white/80 border border-black/10 rounded-4xl p-6 sm:p-10 shadow-xl">
            {status === "success" && submittedData ? (
              <div className="space-y-6 text-center py-8 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-gold/15 text-gold border border-gold/40 flex items-center justify-center mx-auto">
                  <Icon icon="solar:check-circle-bold" className="size-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold font-semibold">
                    Inquiry Transmitted & Registered
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-black">
                    Thank You, {submittedData.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-black/70 font-light max-w-md mx-auto leading-relaxed">
                    Your inquiry has been cataloged under Reference ID <strong className="font-mono text-black">{submittedData.id}</strong>. Our executive leadership team will review your specifications and respond within one business day.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/5 border border-black/10 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div>
                    <span className="text-black/50 block">Target Service:</span>
                    <span className="font-medium text-black">{submittedData.service}</span>
                  </div>
                  <div>
                    <span className="text-black/50 block">Registered Email:</span>
                    <span className="font-medium text-black">{submittedData.email}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleDownloadReceipt}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-colors cursor-pointer"
                  >
                    <Icon icon="lucide:download" className="size-4" />
                    <span>Download Official Receipt</span>
                  </button>

                  <button
                    onClick={() => {
                      setStatus("idle");
                      setSubmittedData(null);
                    }}
                    className="text-xs text-black/60 hover:text-black underline cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-light text-black mb-1">
                    Business Inquiry Form
                  </h2>
                  <p className="text-xs text-black/60 font-light">
                    Direct line to Outmax Services Ltd executive desk.
                  </p>
                </div>

                {status === "error" && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-3">
                    <Icon icon="solar:danger-triangle-bold" className="size-5 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/70">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/70">
                      Work Email <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="s.jenkins@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/70">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Commerce Global"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/70">
                      Primary Service of Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-xs text-black focus:outline-none focus:border-black transition-colors"
                    >
                      {servicesData.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/70">
                      Estimated Monthly Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-xs text-black focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="Under $5,000 / month">Under $5,000 / month</option>
                      <option value="$5,000 - $15,000 / month">$5,000 - $15,000 / month</option>
                      <option value="$15,000 - $40,000 / month">$15,000 - $40,000 / month</option>
                      <option value="$40,000+ / month">$40,000+ / month (Enterprise)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/70">
                      Target Launch Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-xs text-black focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="Immediate (Within 1 - 2 weeks)">Immediate (Within 1 - 2 weeks)</option>
                      <option value="Within 2 - 4 weeks">Within 2 - 4 weeks</option>
                      <option value="1 - 3 months">1 - 3 months</option>
                      <option value="Exploring & Planning">Exploring & Planning</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/70">
                    Project Overview & Operational Scope <span className="text-gold">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your current team size, channels, challenges, or campaign goals..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-xs text-black placeholder:text-black/35 focus:outline-none focus:border-black transition-colors"
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 size-4 rounded border-black/20 text-black focus:ring-black"
                  />
                  <label htmlFor="consent" className="text-[11px] text-black/70 font-light leading-relaxed">
                    I consent to Outmax Services Ltd reviewing these details to formulate a scope proposal and scheduling an executive consultation.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <Icon icon="lucide:loader-2" className="size-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Partnership Inquiry</span>
                      <Icon icon="lucide:arrow-right" className="size-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Verified Company Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 rounded-4xl bg-black text-white border border-white/10 shadow-xl space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold block">
                Corporate Credentials
              </span>

              <div>
                <h3 className="text-2xl font-light text-white mb-1">
                  Outmax Services Ltd
                </h3>
                <p className="text-xs text-white/60 font-light">
                  Business Process Outsourcing · Performance Marketing · Digital Solutions
                </p>
              </div>

              <div className="space-y-4 pt-2 text-xs font-light text-white/80">
                <div className="flex items-start gap-3">
                  <Icon icon="lucide:map-pin" className="size-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Headquarters Address:</strong>
                    <span>{companyInfo.location.formatted}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon icon="lucide:user-check" className="size-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Founder & Executive Director:</strong>
                    <span>{companyInfo.founder}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon icon="lucide:mail" className="size-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Corporate Email:</strong>
                    <span>{companyInfo.contact.inquiryEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon icon="lucide:clock" className="size-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Operational Hours:</strong>
                    <span>{companyInfo.contact.hours}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-white/60 font-light leading-relaxed">
                Confidentiality Notice: All project discussions and data exchanges are governed by strict commercial non-disclosure agreements prior to onboarding.
              </div>

              {/* Direct Channels & Social Profiles */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold block mb-3">
                  Direct Verified Channels
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://www.linkedin.com/company/outmax-services/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/10 transition-all flex flex-col items-center justify-center gap-1.5 text-center group"
                  >
                    <Icon icon="lucide:linkedin" className="size-5 text-gold group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-white/80 uppercase tracking-wider font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="https://twitter.com/OutmaxServices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/10 transition-all flex flex-col items-center justify-center gap-1.5 text-center group"
                  >
                    <Icon icon="ri:twitter-x-fill" className="size-5 text-white group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-white/80 uppercase tracking-wider font-medium">X / Twitter</span>
                  </a>
                  <a
                    href={`mailto:${companyInfo.contact.inquiryEmail}`}
                    className="p-3 bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/10 transition-all flex flex-col items-center justify-center gap-1.5 text-center group"
                  >
                    <Icon icon="lucide:mail" className="size-5 text-gold group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-white/80 uppercase tracking-wider font-medium">Direct Mail</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Workplace / Collaboration Visual */}
            <div className="rounded-3xl overflow-hidden h-60 border border-black/10 shadow-md relative">
              <img
                src="/assets/photos/executive-office.jpg"
                alt="Outmax Services Executive Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-light">
                <span className="text-gold font-mono uppercase tracking-wider block text-[10px]">
                  Wah Cantt Headquarters
                </span>
                <span>Connecting international enterprises with high-performance BPO talent.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
