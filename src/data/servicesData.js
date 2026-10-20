// All 11 dedicated services for Outmax Services Ltd
export const servicesData = [
  {
    slug: "business-process-outsourcing",
    id: "bpo",
    title: "Business Process Outsourcing",
    shortTitle: "BPO Operations",
    pillar: "Outsourcing & Operations",
    tagline: "Customized inbound and outbound operational solutions designed to scale your enterprise efficiently.",
    description:
      "Outmax Services Ltd provides comprehensive, end-to-end BPO solutions that function as an organic extension of your internal team. By handling day-to-day customer communication, administrative workflows, and outbound campaigns, we lower operational overhead while elevating execution standards.",
    image: "/assets/photos/bpo-team.jpg",
    secondaryImage: "/assets/photos/bpo-support.jpg",
    keyMetrics: [
      { label: "Deployment Model", value: "Dedicated & Scalable" },
      { label: "Operation Type", value: "Inbound & Outbound" },
      { label: "Quality Assurance", value: "Real-Time QA & Audit" },
    ],
    capabilities: [
      {
        category: "Inbound Operations",
        items: [
          "Customer Support & Resolution",
          "Technical Support & Helpdesk",
          "Order Processing & Fulfillment Tracking",
          "Live Call Answering & Virtual Reception",
          "Customer Service & Retention",
          "Help Desk Operations & Escalation Management",
        ],
      },
      {
        category: "Outbound Operations",
        items: [
          "Cold Calling & Targeted Outreach",
          "Lead Generation & Qualification",
          "Appointment Setting & Calendar Booking",
          "Sales Campaigns & Territory Development",
          "Customer Acquisition & Reactivation",
          "Follow-up Calls & Account Management",
          "Telemarketing & Pipeline Expansion",
        ],
      },
    ],
    challengesSolved: [
      "High domestic hiring and training costs straining operational margins",
      "Inconsistent coverage outside standard business hours",
      "Slow ramp-up periods when expanding into new product lines or markets",
      "Fragmented communication between customer care and sales departments",
    ],
    process: [
      {
        step: "01",
        title: "Operational Discovery",
        desc: "We analyze your communication workflows, standard operating procedures (SOPs), software stack, and KPIs to map team sizing.",
      },
      {
        step: "02",
        title: "Talent Curation & Training",
        desc: "We select specialized professionals, immerse them in your brand voice and technical guidelines, and conduct rigorous QA simulation.",
      },
      {
        step: "03",
        title: "Staged Deployment",
        desc: "Seamless integration into your CRM, ticketing systems, telephony, and live chat queues with initial supervisory oversight.",
      },
      {
        step: "04",
        title: "Continuous Optimization",
        desc: "Ongoing metrics tracking, weekly performance reviews, scorecards, and iterative feedback loops to increase resolution speed.",
      },
    ],
    faqs: [
      {
        q: "How does Outmax ensure seamless alignment with our brand voice?",
        a: "Before taking live inquiries, our teams undergo structured brand immersion using your existing documentation, brand manuals, and call scripts, followed by simulated roleplay and rubric grading.",
      },
      {
        q: "What CRM and communication tools do your teams support?",
        a: "We work directly within your preferred infrastructure, including Zendesk, Salesforce, HubSpot, Freshdesk, Intercom, RingCentral, Talkdesk, and custom internal dashboards.",
      },
      {
        q: "Can we scale our outsourced team during peak seasons?",
        a: "Yes. Our agile operational structure enables rapid scaling up or down based on promotional spikes, seasonality, or campaign launches without long-term domestic hiring penalties.",
      },
    ],
  },
  {
    slug: "customer-support",
    id: "customer-support",
    title: "Customer Support & Contact Center",
    shortTitle: "Customer Support",
    pillar: "Outsourcing & Operations",
    tagline: "Empathetic, multi-channel customer care delivering fast resolution and long-term brand loyalty.",
    description:
      "Transform customer support from an operational cost center into a strategic retention engine. Outmax delivers round-the-clock inbound contact center services across voice, live chat, email ticketing, and social DM queues.",
    image: "/assets/photos/bpo-support.jpg",
    secondaryImage: "/assets/photos/customer-care.jpg",
    keyMetrics: [
      { label: "Coverage", value: "24/7 Multi-Shift" },
      { label: "Channels", value: "Omnichannel Support" },
      { label: "Supervision", value: "Dedicated Team Leads" },
    ],
    capabilities: [
      {
        category: "Support Channels",
        items: [
          "Live Inbound Voice Support",
          "Real-time Chat & Web Messaging",
          "Email Ticketing & Inquiry Resolution",
          "Social Media DM & Comment Management",
          "SMS & Instant Messaging Care",
        ],
      },
      {
        category: "Operational Functions",
        items: [
          "Technical Troubleshooting & Tier 1/2 Support",
          "Order Tracking, Cancellations & Returns",
          "Account Management & Password Resets",
          "Billing Inquiries & Dispute Resolution",
          "Customer Satisfaction (CSAT/NPS) Tracking",
        ],
      },
    ],
    challengesSolved: [
      "Overwhelmed internal staff spending core hours resolving routine inquiries",
      "High customer churn caused by slow first-response and resolution times",
      "Lack of after-hours and weekend coverage for global customers",
    ],
    process: [
      {
        step: "01",
        title: "Knowledge Base Audit",
        desc: "Reviewing existing macros, FAQs, and edge-case resolution trees.",
      },
      {
        step: "02",
        title: "Team Alignment",
        desc: "Staffing representatives matched to your industry complexity.",
      },
      {
        step: "03",
        title: "Channel Launch",
        desc: "Gradual ticket deflection and live queue management under lead supervision.",
      },
      {
        step: "04",
        title: "SLA Governance",
        desc: "Daily CSAT auditing and response time minimization.",
      },
    ],
    faqs: [
      {
        q: "Do you offer 24/7 customer support coverage?",
        a: "Yes. We operate multi-shift operations to ensure your customers receive real-time assistance regardless of their time zone.",
      },
      {
        q: "How do you handle technical escalation?",
        a: "We establish clear Tier 1, Tier 2, and Tier 3 escalation pathways, resolving standard issues at Tier 1 while documenting and passing edge cases smoothly to your engineers.",
      },
    ],
  },
  {
    slug: "sales-lead-generation",
    id: "sales-lead-generation",
    title: "Sales & Lead Generation",
    shortTitle: "Sales & Lead Gen",
    pillar: "Outsourcing & Operations",
    tagline: "Dedicated SDRs and inside sales teams driving qualified opportunities into your revenue pipeline.",
    description:
      "Outmax builds and manages high-impact outbound sales engines. From account identification and multi-touch outbound cadence to qualification and appointment setting, we keep your account executives focused on closing.",
    image: "/assets/photos/sales-leadgen.jpg",
    secondaryImage: "/assets/photos/team-collaboration.jpg",
    keyMetrics: [
      { label: "Team Roles", value: "Dedicated SDRs & Inside Sales" },
      { label: "Focus", value: "B2B Lead Qualification" },
      { label: "CRM Sync", value: "Real-Time Pipeline Hygiene" },
    ],
    capabilities: [
      {
        category: "Outbound Sales Specializations",
        items: [
          "Sales Development Representatives (SDRs)",
          "Inside Sales Teams & Deal Progression",
          "Account-Based Lead Research & List Building",
          "Cold Calling & Multi-Channel Outreach",
          "Appointment Setting & Calendar Qualification",
        ],
      },
      {
        category: "Pipeline & Optimization",
        items: [
          "BANT & MEDDIC Lead Qualification",
          "Sales Pipeline Stage Management",
          "CRM Workflow Hygiene & Data Enrichment",
          "Sales Script & Objection Handling Iteration",
          "Closing Support & Proposal Follow-ups",
        ],
      },
    ],
    challengesSolved: [
      "Account Executives wasting 60% of their time prospecting rather than presenting and closing",
      "Stalled pipelines due to inconsistent follow-ups and abandoned leads",
      "Poor CRM data quality that impairs revenue forecasting",
    ],
    process: [
      {
        step: "01",
        title: "ICP & Persona Mapping",
        desc: "Clarifying buyer personas, trigger events, and value propositions.",
      },
      {
        step: "02",
        title: "Outreach Playbook Creation",
        desc: "Designing tailored phone scripts, email sequences, and handling frameworks.",
      },
      {
        step: "03",
        title: "Active Prospecting",
        desc: "Executing disciplined daily call and touchpoint volumes.",
      },
      {
        step: "04",
        title: "Qualified Handoffs",
        desc: "Scheduling verified appointments directly on your closers' calendars.",
      },
    ],
    faqs: [
      {
        q: "What defines a qualified lead or appointment?",
        a: "We align strictly with your pre-agreed qualification criteria (e.g., company size, decision-maker title, budget authority, and immediate project requirement) before passing any meeting.",
      },
      {
        q: "Do you supply the contact data or work with our lists?",
        a: "We can work with your existing CRM database or execute targeted list building using verified enterprise data tools.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    id: "digital-marketing",
    title: "Digital & Email Marketing",
    shortTitle: "Digital & Email Marketing",
    pillar: "Growth & Performance Marketing",
    tagline: "High-volume mailer infrastructure, lifecycle automation, and targeted digital acquisition campaigns.",
    description:
      "Our digital and email marketing practice combines robust technical deliverability with persuasive creative execution. With over 8M+ emails sent to an active subscriber base of 154K+ and a 12.59% campaign CTOR, we turn audience attention into quantifiable revenue.",
    image: "/assets/photos/digital-marketing.jpg",
    secondaryImage: "/assets/photos/results-analytics.jpg",
    keyMetrics: [
      { label: "Documented Volume", value: "8M+ Emails Sent" },
      { label: "Subscriber Base", value: "154K+ Active Contacts" },
      { label: "Engagement", value: "12.59% Campaign CTOR" },
    ],
    capabilities: [
      {
        category: "Email Infrastructure & Execution",
        items: [
          "High-Volume Mailer Infrastructure Management",
          "Dedicated IP Warming & Sender Reputation Optimization",
          "Automated Lifecycle, Welcome & Re-engagement Flows",
          "Segmentation, List Cleaning & Deliverability Audits",
          "Dynamic Content Personalization & Template Engineering",
        ],
      },
      {
        category: "Omnichannel Digital Strategy",
        items: [
          "Performance Marketing & Paid Social Campaigns",
          "Social Media Strategy & Editorial Scheduling",
          "Lead Nurturing Sequences & Drip Funnels",
          "Campaign Creative Direction & Copywriting",
          "Cross-Channel Attribution & Analytics Reporting",
        ],
      },
    ],
    challengesSolved: [
      "Emails landing in spam or promotions folders due to poor IP reputation",
      "Stagnant list revenue caused by blast-and-pray email tactics",
      "Disjointed messaging across email, social, and paid touchpoints",
    ],
    process: [
      {
        step: "01",
        title: "Deliverability Diagnostics",
        desc: "Auditing SPF, DKIM, DMARC, bounce rates, and domain reputation.",
      },
      {
        step: "02",
        title: "Segmentation & Flow Design",
        desc: "Constructing behavior-triggered automations and interest segments.",
      },
      {
        step: "03",
        title: "Content & Copy Production",
        desc: "Drafting high-converting editorial copy and mobile-responsive layouts.",
      },
      {
        step: "04",
        title: "Optimization & Scaling",
        desc: "Continuous A/B subject line testing and send-time optimization.",
      },
    ],
    faqs: [
      {
        q: "What makes your email marketing deliverability so strong?",
        a: "We maintain disciplined domain warming, strict list-hygiene protocols, feedback-loop monitoring, and custom-tuned server infrastructure designed to sustain millions of monthly sends.",
      },
      {
        q: "Can you manage our existing ESP (Klaviyo, Mailchimp, ActiveCampaign)?",
        a: "Yes. We work both with standard commercial ESPs as well as custom enterprise SMTP infrastructures.",
      },
    ],
  },
  {
    slug: "affiliate-marketing",
    id: "affiliate-marketing",
    title: "Affiliate Marketing",
    shortTitle: "Affiliate Marketing",
    pillar: "Growth & Performance Marketing",
    tagline: "End-to-end partner program setup, publisher recruitment, and Everflow-powered tracking.",
    description:
      "Outmax builds, launches, and scales partner and publisher programs that deliver incremental customer acquisition on a pure performance basis. We manage partner onboarding, payout structures, creative distribution, and fraud monitoring.",
    image: "/assets/photos/affiliate-marketing.jpg",
    secondaryImage: "/assets/photos/growth-strategy.jpg",
    keyMetrics: [
      { label: "Platform Partner", value: "Everflow Tracking" },
      { label: "Compliance", value: "Active Fraud Prevention" },
      { label: "Payout Structure", value: "CPA / CPL / Revenue Share" },
    ],
    capabilities: [
      {
        category: "Program Architecture",
        items: [
          "Affiliate Program Setup & Technical Integration",
          "Everflow Platform Configuration & Pixel Implementation",
          "Affiliate Network Partnerships & Distribution Agreements",
          "Commission Tiering & Payout Schedule Architecture",
        ],
      },
      {
        category: "Publisher Management & Compliance",
        items: [
          "Targeted Partner & Publisher Recruitment",
          "Promotional Asset & Creative Distribution",
          "Real-Time Conversion Tracking & Attribution Reporting",
          "Fraud Prevention & Traffic Quality Monitoring",
          "Publisher Relationship Management & Communication",
        ],
      },
    ],
    challengesSolved: [
      "Attracting reliable, high-volume publishers who represent the brand ethically",
      "Attribution leakage and fraud from illegitimate traffic sources",
      "Administrative burden of calculating commissions, reconciling returns, and issuing payouts",
    ],
    process: [
      {
        step: "01",
        title: "Program Setup & Attribution",
        desc: "Configuring server-to-server postbacks and tracking on Everflow.",
      },
      {
        step: "02",
        title: "Publisher Onboarding",
        desc: "Vetting applications, distributing approved assets, and establishing terms.",
      },
      {
        step: "03",
        title: "Traffic Monitoring",
        desc: "Real-time auditing of click patterns, IP clusters, and lead validity.",
      },
      {
        step: "04",
        title: "Scale & Commissioning",
        desc: "Incentivizing top-performing publishers with custom payout tiers.",
      },
    ],
    faqs: [
      {
        q: "How do you protect brands against affiliate traffic fraud?",
        a: "We utilize Everflow's deep fraud detection toolset, monitoring click-to-install times, proxy IPs, bot signatures, and geographic inconsistencies to block malicious traffic before payouts occur.",
      },
      {
        q: "What types of publishers do you recruit?",
        a: "We partner with content publishers, comparison portals, newsletter operators, niche influencers, and performance media networks.",
      },
    ],
  },
  {
    slug: "media-buying",
    id: "media-buying",
    title: "Media Buying & Performance Marketing",
    shortTitle: "Media Buying",
    pillar: "Growth & Performance Marketing",
    tagline: "Scalable paid acquisition across Meta, TikTok, and programmatic networks focused on ROAS and cost-per-purchase.",
    description:
      "Our media buying desk plans, launches, and aggressively optimizes paid traffic campaigns. Having managed over $1.88M+ in Meta ad spend across 462 reported campaigns, our quantitative approach maximizes return on ad spend through relentless creative testing and real-time budget reallocation.",
    image: "/assets/photos/media-buying.jpg",
    secondaryImage: "/assets/photos/results-analytics.jpg",
    keyMetrics: [
      { label: "Managed Meta Spend", value: "$1.88M+" },
      { label: "Campaigns Reported", value: "462 Campaigns" },
      { label: "Optimization Focus", value: "ROAS & Cost-per-Purchase" },
    ],
    capabilities: [
      {
        category: "Planning & Execution",
        items: [
          "Paid Social Advertising (Meta Ads, TikTok Ads, etc.)",
          "Search & Programmatic Media Buying",
          "Campaign Architecture & Target Audience Structuring",
          "Pixel, CAPI & Server-Side Event Tracking Setup",
          "Full-Funnel Campaign Setup & Scaling Strategy",
        ],
      },
      {
        category: "Optimization & Creative Testing",
        items: [
          "Dynamic Budget Allocation & Dayparting Optimization",
          "Iterative Creative & Copy A/B Testing",
          "Return on Ad Spend (ROAS) & Cost-Per-Purchase Analysis",
          "Bid Strategy Management (Cost Cap, Target CPA, Value Bidding)",
          "Real-Time Performance Dashboarding & Reporting",
        ],
      },
    ],
    challengesSolved: [
      "Ad fatigue driving up customer acquisition costs week after week",
      "Attribution blindness following privacy and cookie deprecation changes",
      "Wasted ad spend on underperforming creative concepts and audience overlap",
    ],
    process: [
      {
        step: "01",
        title: "Tracking Foundation",
        desc: "Deploying Conversions API (CAPI) and multi-touch attribution.",
      },
      {
        step: "02",
        title: "Creative Sprint",
        desc: "Producing varied hooks, video angles, and statics tailored to the platform.",
      },
      {
        step: "03",
        title: "Micro-Budget Testing",
        desc: "Testing 10-20 creative variants to identify clear winners quickly.",
      },
      {
        step: "04",
        title: "Aggressive Scaling",
        desc: "Funneling capital into top-performing ads while optimizing CPA.",
      },
    ],
    faqs: [
      {
        q: "What ad platforms do you primarily manage?",
        a: "Our core desks specialize in Meta Ads (Facebook & Instagram) and TikTok Ads, complemented by Google Search and programmatic networks.",
      },
      {
        q: "How often do you provide performance reports?",
        a: "We maintain live cloud dashboards updated continuously and provide scheduled weekly performance reviews detailing spend, ROAS, and creative insights.",
      },
    ],
  },
  {
    slug: "ad-monetization",
    id: "ad-monetization",
    title: "Ad Monetization & Domain Portfolio Management",
    shortTitle: "Ad Monetization & AFD",
    pillar: "Growth & Performance Marketing",
    tagline: "Maximizing domain portfolio yields and search arbitrage (RSOC) through premier network partnerships.",
    description:
      "Outmax manages and monetizes digital traffic assets and domain portfolios. Leveraging partnerships with System1 (RAMP Partner), Sedo, and Bodis, our team drives over $59K+ in 30-day AFD (Ads for Domains) revenue alongside scaled search arbitrage campaigns.",
    image: "/assets/photos/ad-monetization.jpg",
    secondaryImage: "/assets/photos/global-network.jpg",
    keyMetrics: [
      { label: "30-Day AFD Revenue", value: "$59K+" },
      { label: "Key Partner", value: "System1 RAMP Partner" },
      { label: "Monetization Platforms", value: "Bodis, Sedo, System1" },
    ],
    capabilities: [
      {
        category: "Monetization Disciplines",
        items: [
          "RSOC (Search Arbitrage) Campaign Architecture",
          "AFD (Ads for Domains) Monetization & Landers",
          "Domain Parking & Portfolio Yield Optimization",
          "Keyword Matching & Feed Optimization",
          "Tier-1 Search Network Feed Integration",
        ],
      },
      {
        category: "Traffic & Scaling Operations",
        items: [
          "Traffic Acquisition & Audience Scaling",
          "Creative Development & Search Intent Testing",
          "Domain Portfolio Acquisition & DNS Management",
          "Real-Time EPC & Revenue Reporting",
          "Strict Compliance with Search Engine Partner Policies",
        ],
      },
    ],
    challengesSolved: [
      "Underperforming domain assets generating zero cash flow while incurring annual renewal fees",
      "Low EPCs due to poor keyword matching or unoptimized landing templates",
      "Policy violations and revenue clawbacks from unvetted traffic sources",
    ],
    process: [
      {
        step: "01",
        title: "Portfolio Valuation",
        desc: "Categorizing domain names by vertical, historical traffic, and brand equity.",
      },
      {
        step: "02",
        title: "Feed Integration",
        desc: "Pairing domains with optimal monetization feeds via System1, Sedo, or Bodis.",
      },
      {
        step: "03",
        title: "Arbitrage Campaigning",
        desc: "Acquiring targeted traffic against high-intent search keywords.",
      },
      {
        step: "04",
        title: "Yield Maximization",
        desc: "Dynamic layout testing and CPC bidding to maximize daily net revenue.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between AFD and RSOC?",
        a: "AFD (Ads for Domains) monetizes direct type-in traffic on premium domain names through relevant commercial sponsor links. RSOC (Related Search on Content / Search Arbitrage) acquires paid traffic from social or native networks and routes users to high-intent search result pages.",
      },
      {
        q: "What is your relationship with System1?",
        a: "Outmax is a recognized RAMP partner with System1, giving us direct access to high-yielding feeds and real-time monetization analytics.",
      },
    ],
  },
  {
    slug: "web-development",
    id: "web-development",
    title: "Website & Application Development",
    shortTitle: "Web & App Development",
    pillar: "Technology & Creative Strategy",
    tagline: "High-performance digital platforms engineered for conversion, speed, and corporate credibility.",
    description:
      "Our engineering team designs and builds fast, modern web applications, conversion-focused landing pages, and scalable digital platforms. Our recent builds span legal-claims lead generation portals, hospitality brand platforms, e-commerce stores, and wellness community apps.",
    image: "/assets/photos/web-development.jpg",
    secondaryImage: "/assets/photos/project-ecommerce.jpg",
    keyMetrics: [
      { label: "Recent Builds", value: "Legal, Hospitality, E-Com, Wellness" },
      { label: "Core Stack", value: "React, Next.js, Node.js, Tailwind, 3D" },
      { label: "Performance", value: "Sub-Second Load Times" },
    ],
    capabilities: [
      {
        category: "Build & Architecture",
        items: [
          "Custom Website Development (React, Next.js, Vite)",
          "High-Converting Landing Page Design & Funnels",
          "E-commerce Storefronts & Checkout Optimization",
          "Custom Web Applications & Portals",
          "API Integrations & Backend Web Services",
        ],
      },
      {
        category: "Design, Speed & Support",
        items: [
          "Bespoke UI/UX Design & Interactive Prototypes",
          "3D Interactive Elements & Scroll-Triggered Motion",
          "Mobile-First Responsive Layouts & Accessibility (a11y)",
          "Core Web Vitals & Page-Speed Engineering",
          "Ongoing Maintenance, Security Patches & Hosting Support",
        ],
      },
    ],
    challengesSolved: [
      "Slow, bloated websites causing high bounce rates on expensive paid media traffic",
      "Clunky user experiences failing to convert visitors into booked calls or purchases",
      "Rigid CMS templates that break whenever marketing needs custom layouts",
    ],
    process: [
      {
        step: "01",
        title: "Strategy & Wireframes",
        desc: "Mapping conversion pathways, information architecture, and UI hierarchy.",
      },
      {
        step: "02",
        title: "Visual & Interactive Design",
        desc: "Creating editorial Figma prototypes featuring tailored typography and motion.",
      },
      {
        step: "03",
        title: "Modern Engineering",
        desc: "Developing with clean, componentized React code, Tailwind CSS, and optimized assets.",
      },
      {
        step: "04",
        title: "Testing & Launch",
        desc: "Cross-device responsiveness audits, lighthouse speed checks, and seamless DNS cutover.",
      },
    ],
    faqs: [
      {
        q: "What technologies do your engineers use?",
        a: "We specialize in modern JavaScript frameworks including React, Next.js, Vite, Node.js, Tailwind CSS, Three.js, and headless CMS integrations.",
      },
      {
        q: "Do you build custom landing pages for ad campaigns?",
        a: "Yes. We frequently develop high-converting campaign landing pages specifically tuned to lower CPA for our media buying clients.",
      },
    ],
  },
  {
    slug: "branding",
    id: "branding",
    title: "Branding & Creative Strategy",
    shortTitle: "Branding & Creative",
    pillar: "Technology & Creative Strategy",
    tagline: "Strategic brand positioning, visual identities, and compelling content that establish market authority.",
    description:
      "A strong brand reduces customer acquisition costs and commands premium market pricing. Outmax provides holistic branding services from strategic market positioning and visual identity design to messaging frameworks and creative direction.",
    image: "/assets/photos/branding-strategy.jpg",
    secondaryImage: "/assets/photos/office-hq.jpg",
    keyMetrics: [
      { label: "Deliverables", value: "Comprehensive Brand Books" },
      { label: "Focus", value: "B2B Positioning & Identity" },
      { label: "Strategy", value: "Content & Visual Art Direction" },
    ],
    capabilities: [
      {
        category: "Brand Strategy & Positioning",
        items: [
          "Brand Strategy & Market Differentiation",
          "Brand Positioning & Value Proposition Formulation",
          "Brand Messaging, Tone of Voice & Copywriting Guides",
          "Content Strategy & Creative Direction",
          "Corporate Reputation & Narrative Management",
        ],
      },
      {
        category: "Visual Identity & Assets",
        items: [
          "Logo Design & Systemic Visual Marks",
          "Color Palette & Typography System Architecture",
          "Brand Guidelines & Design Systems",
          "Marketing Collateral & Presentation Decks",
          "Digital Asset Libraries & Social Templates",
        ],
      },
    ],
    challengesSolved: [
      "Inconsistent visual presentation across channels diluting company credibility",
      "Vague value propositions that fail to resonate with enterprise decision-makers",
      "Lack of standardized design guidelines slowing down marketing output",
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Market Research",
        desc: "Interviewing stakeholders and evaluating competitor branding landscapes.",
      },
      {
        step: "02",
        title: "Positioning Framework",
        desc: "Defining core brand archetypes, voice pillars, and value propositions.",
      },
      {
        step: "03",
        title: "Visual Identity Design",
        desc: "Developing logo concepts, typographic systems, color tokens, and collateral.",
      },
      {
        step: "04",
        title: "Guidelines & Handoff",
        desc: "Compiling exhaustive brand books and component design kits for internal teams.",
      },
    ],
    faqs: [
      {
        q: "What do we receive at the end of a branding engagement?",
        a: "You receive a complete Brand Identity Kit, vector logo assets, color token rules, typography configurations, templates, and an exhaustive Brand Guidelines PDF.",
      },
      {
        q: "Can you rebrand an existing company without losing brand equity?",
        a: "Yes. We execute evolutionary rebrands that modernize your visual authority while honoring the equity built with existing clients.",
      },
    ],
  },
  {
    slug: "hr-recruitment",
    id: "hr-recruitment",
    title: "HR & Recruitment Support",
    shortTitle: "HR & Recruitment",
    pillar: "Outsourcing & Operations",
    tagline: "Targeted talent acquisition, streamlined onboarding, and compliant HR administration.",
    description:
      "Sourcing, vetting, and retaining elite professionals is one of the highest friction areas in business growth. Outmax provides comprehensive recruitment and human resources support, connecting you with top-tier talent and managing operational coordination seamlessly.",
    image: "/assets/photos/hr-recruitment.jpg",
    secondaryImage: "/assets/photos/team-collaboration.jpg",
    keyMetrics: [
      { label: "Sourcing Speed", value: "Rapid Shortlisting" },
      { label: "Vetting", value: "Multi-Stage Technical & Soft-Skill Audits" },
      { label: "Coordination", value: "Full Lifecycle HR Admin" },
    ],
    capabilities: [
      {
        category: "Talent Acquisition",
        items: [
          "Executive & Specialized Talent Recruitment",
          "Multi-Stage Candidate Screening & Vetting",
          "Technical Competency & Language Proficiency Testing",
          "Structured Interviewing & Reference Verification",
          "Offer Negotiation & Contract Structuring",
        ],
      },
      {
        category: "HR Administration & Culture",
        items: [
          "Standardized Employee Onboarding & Equipment Setup",
          "HR Administration & Policy Documentation",
          "Payroll Coordination & Time-Tracking Administration",
          "Performance Management Support & Scorecards",
          "Employee Engagement, Culture & Retention Programs",
        ],
      },
    ],
    challengesSolved: [
      "Spending months searching for qualified personnel with high recruiter commission fees",
      "High early-tenure turnover caused by rushed vetting and disorganized onboarding",
      "Time-consuming administrative overhead managing payroll and attendance records",
    ],
    process: [
      {
        step: "01",
        title: "Role Specification",
        desc: "Defining exact competencies, experience requirements, and cultural expectations.",
      },
      {
        step: "02",
        title: "Active Sourcing & Screening",
        desc: "Filtering hundreds of candidates through skill testing and interviews.",
      },
      {
        step: "03",
        title: "Client Shortlisting",
        desc: "Presenting only the top 2-3 vetted candidates for final stakeholder selection.",
      },
      {
        step: "04",
        title: "Onboarding & HR Support",
        desc: "Managing contract setup, compliance documents, and payroll integration.",
      },
    ],
    faqs: [
      {
        q: "What types of roles do you specialize in sourcing?",
        a: "We recruit across customer service specialists, SDRs, media buyers, data analysts, frontend/backend engineers, designers, executive assistants, and accountants.",
      },
      {
        q: "Do you manage ongoing employee payroll and benefits?",
        a: "Yes. We offer complete payroll coordination and HR administration for offshore or extended teams.",
      },
    ],
  },
  {
    slug: "bookkeeping",
    id: "bookkeeping",
    title: "Bookkeeping & Financial Operations",
    shortTitle: "Bookkeeping & Finance",
    pillar: "Outsourcing & Operations",
    tagline: "Rigorous daily ledger management, accounts reconciliation, and transparent monthly financial reporting.",
    description:
      "Maintain crystal-clear financial health with Outmax's dedicated bookkeeping and financial record management services. We ensure your transactions are accurately reconciled daily, invoices are paid promptly, receivables are collected, and management reports are ready on time.",
    image: "/assets/photos/bookkeeping-finance.jpg",
    secondaryImage: "/assets/photos/results-analytics.jpg",
    keyMetrics: [
      { label: "Ledger Update", value: "Daily Maintenance" },
      { label: "Reporting", value: "Monthly P&L, Balance Sheet & Cashflow" },
      { label: "Software Compatibility", value: "QuickBooks, Xero, NetSuite" },
    ],
    capabilities: [
      {
        category: "Core Records Management",
        items: [
          "Daily Transaction Recording & Categorization",
          "Accounts Payable (AP) & Vendor Invoice Processing",
          "Accounts Receivable (AR) & Customer Invoicing",
          "Payroll Ledger Integration & Reconciliation",
          "Receipt Management & Audit-Trail Documentation",
        ],
      },
      {
        category: "Reporting & Financial Controls",
        items: [
          "Bank & Credit Card Account Reconciliation",
          "Financial Record Management & Cloud Filing",
          "Expense Tracking & Departmental Budget Audits",
          "Monthly Financial Reporting (P&L, Balance Sheet, Cash Flow)",
          "Year-End Preparation & CPA Coordination",
        ],
      },
    ],
    challengesSolved: [
      "Inaccurate or delayed financial records making tax season stressful and costly",
      "Cash flow blindness due to uncollected receivables and unmonitored payables",
      "Leadership spending weekend hours reconciling bank statements instead of driving growth",
    ],
    process: [
      {
        step: "01",
        title: "Financial Systems Audit",
        desc: "Reviewing your chart of accounts, banking feeds, and accounting platform.",
      },
      {
        step: "02",
        title: "Catch-Up & Cleanup",
        desc: "Reconciling historical backlogs and establishing consistent categorization rules.",
      },
      {
        step: "03",
        title: "Daily Operations",
        desc: "Processing incoming bills, generating customer invoices, and logging receipts daily.",
      },
      {
        step: "04",
        title: "Month-End Close",
        desc: "Delivering reconciled financial statements and executive summary within 5 business days.",
      },
    ],
    faqs: [
      {
        q: "What accounting software do you work with?",
        a: "We work seamlessly with QuickBooks Online, Xero, Wave, NetSuite, FreshBooks, and custom ERP systems.",
      },
      {
        q: "How do you maintain financial data confidentiality?",
        a: "All financial data is handled under strict non-disclosure agreements, multi-factor authentication, role-based access restrictions, and SOC-compliant cloud protocols.",
      },
    ],
  },
];
