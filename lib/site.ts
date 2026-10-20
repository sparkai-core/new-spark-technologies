export const site = {
  name: "Spark Technologies",
  legalName: "Brand Spark Digital Media LLC",
  tagline: "Enterprise AI for real-world operations",
  description:
    "Spark Technologies builds enterprise AI systems for industrial and operational environments — from data to decisions at scale.",
  url: "https://sparktechnologies.ai",
  email: "contact@sparktechnologies.ai",
  phone: "+971 4 339 2208",
  phoneHref: "tel:+97143392208",
  mobile: "+971 56 956 7693",
  mobileHref: "tel:+971569567693",
  address: "Office 705, New Century City Tower, Port Saeed, Dubai, UAE",
  streetAddress: "Office 705, New Century City Tower, Port Saeed",
  addressLocality: "Dubai",
  addressCountry: "UAE",
  hours: "Sunday – Thursday, 9:00 – 18:00 GST",
  maps: "https://maps.google.com/?q=New+Century+City+Tower+Port+Saeed+Dubai",
  sparkAiUrl: "https://www.sparkai.ae",
  parentBrand: "Brand Spark Digital Media",
  parentUrl: "https://brandspark.ae",
  linkedin: "https://www.linkedin.com/company/spark-technologies",
  whatsapp: "https://wa.me/971569567693",
  socials: [
    {
      name: "linkedin" as const,
      label: "Spark Technologies on LinkedIn",
      href: "https://www.linkedin.com/company/spark-technologies",
    },
    {
      name: "instagram" as const,
      label: "Spark Technologies on Instagram",
      href: "https://www.instagram.com/sparkai.ae",
    },
    {
      name: "x" as const,
      label: "Spark Technologies on X",
      href: "https://x.com/sparkai_ae",
    },
    {
      name: "youtube" as const,
      label: "Spark Technologies on YouTube",
      href: "https://www.youtube.com/@sparkai_ae",
    },
    {
      name: "facebook" as const,
      label: "Spark Technologies on Facebook",
      href: "https://www.facebook.com/sparkai.ae",
    },
    {
      name: "whatsapp" as const,
      label: "Chat on WhatsApp",
      href: "https://wa.me/971569567693",
    },
  ],
} as const;

export const nav = {
  primary: [
    {
      label: "Solutions",
      href: "/solutions",
      links: true as const,
    },
    {
      label: "Products",
      href: "/products",
      links: true as const,
    },
    { label: "Industries", href: "/industries", links: true as const },
    { label: "Case Studies", href: "/case-studies", links: true as const },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
    { label: "Company", href: "/company" },
  ],
  cta: { label: "Request Briefing", href: "/contact" },
  assessment: { label: "Assessment", href: "/contact" },
} as const;

/** AppsFlyer-style mega menu: suite columns + featured rail */
export const solutionSuites = [
  {
    id: "reliability",
    titleKey: "suiteReliability",
    href: "/solutions",
    items: [
      { href: "/solutions/asset-reliability", title: "Asset Reliability" },
      { href: "/solutions/quality-inspection", title: "Quality & Inspection" },
    ],
  },
  {
    id: "operations",
    titleKey: "suiteOps",
    href: "/solutions",
    items: [
      { href: "/solutions/production-process", title: "Production Optimization" },
      { href: "/solutions/energy-fuel", title: "Energy & Fuel" },
      { href: "/solutions/workforce-safety", title: "Workforce & Safety" },
    ],
  },
  {
    id: "planning",
    titleKey: "suitePlanning",
    href: "/solutions",
    items: [
      { href: "/solutions/supply-chain", title: "Supply Chain" },
      { href: "/solutions/demand-forecasting", title: "Demand Forecasting" },
      { href: "/solutions/financial-intelligence", title: "Financial Intelligence" },
    ],
  },
] as const;

export const productSuites = [
  {
    id: "growth",
    titleKey: "suiteGrowth",
    href: "/products",
    items: [
      { href: "/products/leads-reach-ai", title: "Leads Reach AI" },
      { href: "/products/spark-crm", title: "Spark CRM" },
      { href: "/products/funnel-flow-ai", title: "Funnel Flow AI" },
    ],
  },
  {
    id: "operations",
    titleKey: "suiteOps",
    href: "/products",
    items: [
      { href: "/products/hire-ai", title: "AI Hire" },
      { href: "/products/slotwise-ai", title: "SlotWise AI" },
      { href: "/products/procure-ai", title: "Procure AI" },
      { href: "/products/finance-ai", title: "Finance AI" },
    ],
  },
  {
    id: "industry",
    titleKey: "suiteIndustry",
    href: "/products",
    items: [
      { href: "/products/construction-ai", title: "Construction AI" },
      { href: "/products/duct-os", title: "Duct OS" },
      { href: "/products/law-ai", title: "Law AI" },
    ],
  },
  {
    id: "engagement",
    titleKey: "suiteEngagement",
    href: "/products",
    items: [
      { href: "/products/circle-voice-ai", title: "Circle Voice AI" },
      { href: "/products/founder-os", title: "Founder OS" },
    ],
  },
] as const;

export const industryLinks = [
  { href: "/industries#energy-power", title: "Energy & Power" },
  { href: "/industries#oil-gas", title: "Oil & Gas" },
  { href: "/industries#infrastructure", title: "Infrastructure Monitoring" },
  { href: "/industries#railways-metro", title: "Railways & Metro" },
  { href: "/industries#manufacturing", title: "Manufacturing" },
  { href: "/industries#enterprise-automation", title: "Enterprise Automation" },
] as const;

export const caseStudyLinks = [
  { href: "/case-studies#condor-energies", title: "Condor Energies — warehouse & fuel loading" },
  { href: "/case-studies#ady-railways", title: "ADY Railways — corridor monitoring" },
  { href: "/case-studies#metro-baku", title: "Metro Baku — executive analytics" },
] as const;

export const megaFeatured = [
  { href: "/case-studies", labelKey: "caseStudies", tone: "pink" as const },
  { href: "/company", labelKey: "company", tone: "teal" as const },
  { href: "/contact", labelKey: "contact", tone: "blue" as const },
] as const;

/** Media from sparktechnologies.ai live site */
export const heroMedia = {
  src: "/assets/video/hero-video.mp4",
  poster: "/assets/case-studies/banner-powerline.jpg",
} as const;

export const media = {
  powerlineBanner: "/assets/case-studies/banner-powerline.jpg",
  platform: "/assets/industries/enterprise-automation.jpg",
  opsTech: "/assets/industries/enterprise-automation.jpg",
} as const;

export const whySpark = [
  {
    n: "01",
    title: "Built for real-world operations",
    text: "Systems designed for plants, grids, fleets, and distributed assets — not demos.",
  },
  {
    n: "02",
    title: "AI, agents, and automation together",
    text: "Detection, decisions, and execution in one governed stack.",
  },
  {
    n: "03",
    title: "Fast deployment",
    text: "Pilots in weeks, not months — then a clear path to enterprise rollout.",
  },
  {
    n: "04",
    title: "Measurable outcomes",
    text: "Accuracy, cycle time, and operational cost — tracked from day one.",
  },
] as const;

export const platformLayers = [
  {
    title: "Data Layer",
    text: "Structures data from systems, sensors, and external feeds.",
  },
  {
    title: "Integration Engine",
    text: "Connects ERP, SCADA/IoT, APIs, and workflow tools.",
  },
  {
    title: "Intelligence",
    text: "Detects anomalies and produces traceable insights.",
  },
  {
    title: "Agent System",
    text: "Executes tasks with policy handoffs and approvals.",
  },
] as const;

export { solutions, modules, getModule } from "@/lib/modules";

export const industries = [
  {
    id: "energy-power",
    label: "Energy & Power",
    text: "Inspection and anomaly detection for transmission and utility operations.",
    challenges: ["Manual line and substation inspection", "Late detection of thermal faults", "Fragmented monitoring tools"],
    useCases: [
      { title: "Powerline inspection", text: "Vision and thermal AI across transmission corridors." },
      { title: "Grid anomaly detection", text: "Real-time signals before outages cascade." },
      { title: "Ops dashboards", text: "One view for crews and control rooms." },
    ],
  },
  {
    id: "oil-gas",
    label: "Oil & Gas",
    text: "Asset integrity, leak and anomaly signals, and field-ops automation.",
    challenges: ["Remote asset visibility", "Reactive maintenance cycles", "High cost of unplanned downtime"],
    useCases: [
      { title: "Asset integrity monitoring", text: "Continuous signals from sites and pipelines." },
      { title: "Predictive maintenance", text: "Risk-ranked work orders before failure." },
      { title: "Field workflow agents", text: "Handoffs between ops, HSE, and maintenance." },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure Monitoring",
    text: "Continuous monitoring for critical infrastructure and industrial sites.",
    challenges: ["Sparse sensor coverage", "Slow incident triage", "No single operational picture"],
    useCases: [
      { title: "Site monitoring", text: "Multi-sensor fusion for critical corridors." },
      { title: "Anomaly triage", text: "Ranked alerts with explainable context." },
      { title: "Incident workflows", text: "Route and track response from first signal." },
    ],
  },
  {
    id: "railways-metro",
    label: "Railways & Metro",
    text: "Track, OHE, and corridor intelligence for safer, continuous railway operations.",
    challenges: ["Corridor visibility gaps", "Manual inspection cycles", "Late anomaly detection"],
    useCases: [
      { title: "Railway monitoring", text: "Track and OHE anomaly detection along corridors." },
      { title: "Corridor intelligence", text: "Continuous visibility for operations teams." },
      { title: "Executive analytics", text: "Unified ops and reliability views for leadership." },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    text: "Quality, throughput, and maintenance intelligence on the line.",
    challenges: ["Defects found too late", "Bottlenecks hard to explain", "Clipboard-driven quality checks"],
    useCases: [
      { title: "Defect detection", text: "Vision QA at production speed." },
      { title: "Line optimisation", text: "Throughput and bottleneck signals." },
      { title: "Predictive maintenance", text: "Keep assets online between planned stops." },
    ],
  },
  {
    id: "enterprise-automation",
    label: "Enterprise Automation",
    text: "Agent-led workflows that connect ERP, ops tools, and approvals.",
    challenges: ["Disconnected systems", "Manual handoffs", "Slow decision loops"],
    useCases: [
      { title: "Process agents", text: "Execute routine ops with policy controls." },
      { title: "System integration", text: "Connect ERP, IoT, and workflow tools." },
      { title: "Decision support", text: "Traceable recommendations for operators." },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare & Insurance",
    text: "Clinical and payer operations with governed automation.",
    challenges: ["Claims cycle time", "Data overload for care teams", "Compliance pressure"],
    useCases: [
      { title: "Claims automation", text: "Straight-through processing with exception routing." },
      { title: "Diagnostics support", text: "Faster triage with clinician oversight." },
      { title: "Fraud signals", text: "Ranked alerts for investigation teams." },
    ],
  },
  {
    id: "banking",
    label: "Banking & Financial",
    text: "Risk, operations, and customer workflows with audit-ready AI.",
    challenges: ["Fraud and risk signal noise", "Manual ops bottlenecks", "Regulatory documentation"],
    useCases: [
      { title: "Fraud detection", text: "Explainable alerts for investigators." },
      { title: "Ops automation", text: "Agent workflows across back-office systems." },
      { title: "Decision intelligence", text: "Traceable recommendations for risk teams." },
    ],
  },
  {
    id: "telecom",
    label: "Telecom",
    text: "Network performance, fault detection, and customer ops intelligence.",
    challenges: ["Late fault discovery", "War-room root cause", "Ticket pile-ups"],
    useCases: [
      { title: "Network optimisation", text: "Performance and fault signals in one view." },
      { title: "Fault detection", text: "Earlier warnings before SLA breaches." },
      { title: "Customer follow-up", text: "Agents that close the loop on tickets." },
    ],
  },
  {
    id: "aviation",
    label: "Aviation & Transport",
    text: "Safety monitoring and operational efficiency across crews and assets.",
    challenges: ["Screen-watching for safety signals", "Scheduling complexity", "Reliability visibility"],
    useCases: [
      { title: "Safety monitoring", text: "Earlier warnings from ops and sensor data." },
      { title: "Crew and asset ops", text: "A live picture leadership can use." },
      { title: "Reliability analytics", text: "Trends before delays compound." },
    ],
  },
] as const;

export const enterprisePillars = [
  {
    title: "Secure deployment environments",
    text: "Cloud, on-premises, or hybrid with enterprise-grade security controls.",
  },
  {
    title: "Scalable infrastructure",
    text: "Built for mission-critical workloads across distributed operations.",
  },
  {
    title: "Integration-ready systems",
    text: "Connect with existing enterprise platforms and data sources.",
  },
  {
    title: "Real-time monitoring",
    text: "Live operational intelligence and continuous system health visibility.",
  },
] as const;

export const outcomes = [
  "Reduce manual inspection and operational overhead",
  "Improve visibility across critical assets and systems",
  "Enable faster, data-driven decision making",
  "Scale operations without increasing manpower",
] as const;

export const traditionalVsSpark = {
  traditional: [
    "Point tools and disconnected pilots",
    "Dashboards without execution",
    "Manual handoffs between ops teams",
    "Alerts without ranked action",
    "Months to production with unclear ownership",
  ],
  spark: [
    "Governed systems built for plants, grids, and fleets",
    "Detection → decision → agent execution in one stack",
    "Policy controls and human approvals where required",
    "Risk-ranked alerts with explainable context",
    "Pilots in weeks with a clear enterprise rollout path",
  ],
} as const;

export const agentCapabilities = [
  {
    title: "Inspection agents",
    text: "Run vision and thermal analysis across corridors, lines, and sites — then route exceptions.",
  },
  {
    title: "Reliability agents",
    text: "Score asset health, prioritise work, and push recommendations into CMMS/ERP.",
  },
  {
    title: "Ops workflow agents",
    text: "Close the loop between control rooms, field crews, HSE, and maintenance.",
  },
  {
    title: "Executive agents",
    text: "Summarise reliability, risk, and delivery signals for leadership dashboards.",
  },
] as const;

export const integrations = [
  "SCADA / IoT",
  "ERP / CMMS",
  "Historians",
  "CCTV / Drones",
  "GIS",
  "Work orders",
  "Safety systems",
  "Data lakes",
  "APIs",
  "Cloud / On-prem",
  "Identity / SSO",
  "Ticketing",
] as const;

export const engagementModels = [
  {
    n: "01",
    title: "Scoped pilot",
    text: "One high-value use case, clear KPIs, and a production-ready path in weeks.",
  },
  {
    n: "02",
    title: "Platform rollout",
    text: "Governed layers for data, models, and agents across sites and business units.",
  },
  {
    n: "03",
    title: "Operate & optimise",
    text: "Ongoing model, workflow, and ops support so results compound after go-live.",
  },
] as const;

export const markets = [
  { label: "UAE", text: "Dubai office — enterprise briefings and delivery." },
  { label: "Saudi Arabia", text: "Energy, infrastructure, and industrial operators." },
  { label: "Azerbaijan", text: "Rail, metro, and industrial programmes." },
  { label: "Uzbekistan", text: "Infrastructure and operations engagements." },
  { label: "United Kingdom", text: "Enterprise and hybrid deployments." },
  { label: "Pakistan", text: "Delivery, engineering, and regional support." },
] as const;

export const deploymentPath = [
  {
    step: "1",
    title: "Discovery & Use Case Design",
    text: "Map assets, data, constraints, and the highest-ROI operational outcome.",
  },
  {
    step: "2",
    title: "AI Pilot Deployment",
    text: "Stand up models, agents, and dashboards against live or historical feeds.",
  },
  {
    step: "3",
    title: "System Integration",
    text: "Connect SCADA, ERP, CMMS, cameras, and workflow tools with policy controls.",
  },
  {
    step: "4",
    title: "Enterprise Rollout",
    text: "Scale across sites, fleets, and teams with governed access and SLAs.",
  },
  {
    step: "5",
    title: "Continuous Optimization",
    text: "Tune models, workflows, and KPIs as operations and data mature.",
  },
] as const;

export const company = {
  headline: "Enterprise AI for operators who run the real world",
  lede: "Spark Technologies is the enterprise arm of the Spark ecosystem. We design, deploy, and scale AI systems for industrial and operational environments — from inspection and monitoring to agents that execute with policy controls.",
  points: [
    {
      title: "Part of the Spark ecosystem",
      text: "Spark AI serves growing companies with products, agents, and training. Spark Technologies focuses on enterprise and industrial operations.",
    },
    {
      title: "Global delivery, Dubai office",
      text: "We work with operators across energy, infrastructure, manufacturing, and regulated industries worldwide.",
    },
    {
      title: "From pilot to production",
      text: "Every engagement starts with a scoped pilot and a clear path to governed enterprise rollout.",
    },
  ],
} as const;

/** Enterprise engagements — no government positioning */
export const caseStudies = [
  {
    id: "condor-energies",
    sector: "Oil & Gas",
    client: "Condor Energies",
    title: "Computer-vision warehouse analytics & fuel loading control",
    problem: "Limited visibility across warehouse CCTV and loading operations.",
    approach: "Video analytics on existing cameras plus digital fuel and condensate loading control.",
    result: "Faster exception detection with governed ops workflows.",
    outcomes: ["CCTV video analytics", "Loading & unloading controls", "Operational exception routing"],
    metrics: [
      { value: "Faster", label: "exception detection" },
      { value: "Existing", label: "CCTV reused" },
    ],
    image: "/assets/case-studies/condor-energies/site-visit-01.png",
    images: [
      {
        src: "/assets/case-studies/condor-energies/site-visit-01.png",
        alt: "Condor Energies site visit — field team walking the yard",
      },
      {
        src: "/assets/case-studies/condor-energies/site-visit-02.png",
        alt: "Condor Energies operations walkthrough with safety gear on site",
      },
      {
        src: "/assets/case-studies/condor-energies/site-visit-03.png",
        alt: "Condor Energies field inspection across the gravel operations area",
      },
      {
        src: "/assets/case-studies/condor-energies/yard-pipes.jpg",
        alt: "Condor Energies yard — pipe stacks, modular site buildings and staging",
      },
    ],
  },
  {
    id: "ady-railways",
    sector: "Railways",
    client: "ADY Railways",
    title: "Track & OHE corridor monitoring",
    problem: "Manual corridor inspection cycles and late anomaly detection.",
    approach: "Continuous railway monitoring for track and overhead equipment signals.",
    result: "Safer, faster corridor intelligence for operations teams.",
    outcomes: ["Track & OHE anomaly detection", "Continuous corridor intelligence", "Ops-ready alerting"],
    metrics: [
      { value: "24/7", label: "corridor coverage" },
      { value: "Earlier", label: "anomaly alerts" },
    ],
    image: "/assets/industries/railways-metro.jpg",
  },
  {
    id: "metro-baku",
    sector: "Metro & Rail",
    client: "Metro Baku",
    title: "Executive analytics platform (POC pilot)",
    problem: "Fragmented operational and reliability views for leadership.",
    approach: "Unified executive analytics platform across metro operations signals.",
    result: "One governed view for decision-makers.",
    outcomes: ["Unified ops dashboards", "Reliability trends", "Leadership-ready reporting"],
    metrics: [
      { value: "1", label: "ops view" },
      { value: "POC", label: "to leadership" },
    ],
    image: "/assets/case-studies/metro-baku-analytics.jpg",
  },
] as const;

export const team = {
  leadership: [
    {
      name: "Jay Larik",
      role: "Founder & CEO",
      bio: "Leads the Spark ecosystem from Dubai — enterprise engagements, client delivery, and the operating model behind Spark Technologies.",
      photo: "/assets/team/jay-larik.png",
      position: "center 18%",
      location: "Dubai",
      group: "Leadership" as const,
      tags: ["Strategy", "Growth", "AI Transform"],
      quote: "AI is not about replacing people, but amplifying what humans can achieve.",
    },
    {
      name: "Jahanzaib Chandio",
      role: "Managing Director",
      bio: "Owns enterprise delivery, partnerships, and how Spark Technologies programmes run from pilot to production.",
      photo: "/assets/team/jahanzaib-chandio.png",
      position: "center 20%",
      location: "Dubai",
      group: "Leadership" as const,
      tags: ["Delivery", "Partnerships", "Growth"],
      quote: "Transformation sticks when strategy, delivery, and client success move as one.",
      focus: ["Client Outcomes", "Enterprise Delivery", "Strategic Programmes", "Partnerships", "Pilot to Production"],
    },
  ],
  delivery: [
    {
      name: "Mehmood Khan",
      role: "Business Development Manager",
      bio: "Builds relationships with operators who need reliability, inspection, or industrial AI systems.",
      photo: "/assets/team/mehmood-khan.png",
      position: "38% 8%",
      location: "Dubai",
      group: "Sales & Growth" as const,
      tags: ["Sales", "Business Development"],
    },
    {
      name: "Sagar Ragathi",
      role: "AI Strategy Lead",
      bio: "Maps which module and deployment path actually pays back for the plant, grid, or corridor.",
      photo: "/assets/team/sagar-ragathi.png",
      position: "45% 12%",
      location: "Dubai",
      group: "AI & Engineering" as const,
      tags: ["AI Strategy", "Systems"],
    },
    {
      name: "Tooba",
      role: "Head of AI",
      bio: "Builds and tunes the models and agents that sit inside Spark Technologies solutions.",
      photo: "/assets/team/tooba.png",
      position: "48% 6%",
      location: "Dubai",
      group: "AI & Engineering" as const,
      tags: ["ML", "Automation"],
    },
    {
      name: "Abhinandan",
      role: "Marketing Head",
      bio: "Events, enterprise campaigns, and the public surface for Spark Technologies.",
      photo: "/assets/team/abhinandan.png",
      position: "center top",
      scale: 1.28,
      location: "Dubai",
      group: "Design & Marketing" as const,
      tags: ["Marketing", "Brand"],
    },
    {
      name: "Faraz Majeed",
      role: "Creative Head",
      bio: "Leads creative direction for brand, events, and enterprise storytelling across the Spark ecosystem.",
      photo: "/assets/team/faraz-majeed.png",
      position: "42% 10%",
      location: "Dubai",
      group: "Design & Marketing" as const,
      tags: ["Creative", "Content"],
    },
  ],
  locations: {
    active: ["UAE", "Saudi Arabia", "Azerbaijan", "Uzbekistan", "United Kingdom", "Pakistan"],
    planned: [],
  },
  principles: [
    "Think Global",
    "Build for Impact",
    "People First",
    "Move Faster",
    "Make it Real",
  ],
  stats: [
    { value: "45+", label: "Team Members" },
    { value: "6", label: "Countries" },
    { value: "8", label: "Disciplines" },
    { value: "1", label: "Mission" },
  ],
} as const;

