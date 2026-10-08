export type ModuleFlowStep = {
  label: string;
  detail: string;
};

export type SolutionModule = {
  id: string;
  n: string;
  short: string;
  title: string;
  text: string;
  image: string;
  tagline: string;
  painPoints: string[];
  solutions: string[];
  outcomes: string[];
  flow: ModuleFlowStep[];
  industries: string[];
};

export const modules: SolutionModule[] = [
  {
    id: "asset-reliability",
    n: "01",
    short: "Asset Reliability",
    title: "Asset Reliability & Predictive Maintenance",
    tagline: "Predict equipment failures before they happen and minimize downtime with AI-powered insights.",
    text: "Predict equipment failures before they happen using sensor data, IoT feeds, and AI models. Continuously monitors asset health, flags anomalies, schedules maintenance, and reduces unplanned downtime.",
    image: "/assets/modules/asset-reliability-v2.jpg",
    painPoints: [
      "Failures appear after production is already impacted",
      "Maintenance is calendar-driven, not condition-driven",
      "Sensor and CMMS data live in separate systems",
      "Alerts are noisy — crews chase false positives",
      "No single health view across multi-site fleets",
    ],
    solutions: [
      "Continuous health scoring from IoT, SCADA, and historian data",
      "Anomaly detection that ranks risk by asset criticality",
      "Work-order recommendations routed into existing CMMS/ERP",
      "Explainable alerts with trend context for planners",
      "Fleet-wide dashboards for reliability and ops leadership",
    ],
    outcomes: [
      "40% reduction in unplanned downtime",
      "Critical alerts detected in real time",
      "Multi-asset monitoring across equipment types",
    ],
    flow: [
      { label: "Ingest", detail: "Sensors, SCADA, CMMS, and work history" },
      { label: "Detect", detail: "Models flag anomalies and rising risk" },
      { label: "Prioritize", detail: "Risk ranked by impact and lead time" },
      { label: "Act", detail: "Work orders with policy approvals" },
      { label: "Learn", detail: "Outcomes feed the next cycle" },
    ],
    industries: ["Energy & Power", "Oil & Gas", "Manufacturing", "Infrastructure"],
  },
  {
    id: "quality-inspection",
    n: "02",
    short: "Quality & Inspection",
    title: "Quality & Inspection Optimization",
    tagline:
      "Real-time defect detection and anomaly classification using computer vision across assets and production lines.",
    text: "Detect defects, anomalies, and quality deviations in real time using computer vision across production lines and field assets — replacing slow manual inspection with continuous analysis.",
    image: "/assets/modules/quality-inspection-v2.jpg",
    painPoints: [
      "Manual inspection is slow, inconsistent, and hard to audit",
      "Defects escape until end-of-line or customer complaints",
      "Visual standards vary by shift and inspector",
      "Field inspection cycles create costly downtime windows",
      "Evidence for quality decisions is incomplete",
    ],
    solutions: [
      "Computer-vision inspection at production and field speed",
      "Defect classification with consistent acceptance criteria",
      "Real-time reject / rework routing to the right station",
      "Traceable image evidence for every flagged event",
      "Quality dashboards by line, SKU, site, and shift",
    ],
    outcomes: [
      "90%+ detection accuracy across inspections",
      "2× faster inspection cycles vs manual process",
      "Critical defects caught before they escalate",
    ],
    flow: [
      { label: "Capture", detail: "Cameras, drones, and line sensors" },
      { label: "Analyze", detail: "Vision models detect and classify defects" },
      { label: "Decide", detail: "Pass, rework, or escalate with rules" },
      { label: "Route", detail: "Operators and systems get the next action" },
      { label: "Report", detail: "Quality KPIs and audit packs" },
    ],
    industries: ["Manufacturing", "Energy & Power", "Infrastructure", "Oil & Gas"],
  },
  {
    id: "production-process",
    n: "03",
    short: "Production Optimization",
    title: "Production & Process Optimization",
    tagline: "Identify bottlenecks and automate industrial workflows to accelerate throughput and reduce waste.",
    text: "Identify bottlenecks and automate industrial workflows to accelerate throughput, reduce waste, and improve operational accuracy at scale.",
    image: "/assets/modules/production-process-v2.jpg",
    painPoints: [
      "Throughput losses hide inside tribal knowledge",
      "Hand-offs between teams create idle time and scrap",
      "Process changes are hard to simulate before rollout",
      "KPIs arrive too late to correct the shift",
      "Automation islands don’t talk to ERP or MES",
    ],
    solutions: [
      "Process mining and bottleneck detection across lines",
      "AI recommendations for cycle time and yield",
      "Agent-led workflow automation with approvals",
      "Live OEE and WIP visibility for supervisors",
      "Integration into MES, ERP, and shop-floor tools",
    ],
    outcomes: [
      "65–70% faster workflow execution",
      "50% reduction in operational overhead",
      "End-to-end process automation across departments",
    ],
    flow: [
      { label: "Map", detail: "Capture process and system events" },
      { label: "Find", detail: "Locate bottlenecks and waste" },
      { label: "Optimize", detail: "Recommend and simulate changes" },
      { label: "Automate", detail: "Agents execute governed steps" },
      { label: "Measure", detail: "Track OEE, yield, and cycle time" },
    ],
    industries: ["Manufacturing", "Enterprise Automation", "Oil & Gas"],
  },
  {
    id: "energy-fuel",
    n: "04",
    short: "Energy & Fuel",
    title: "Energy & Fuel Optimization",
    tagline: "Monitor and optimize energy and fuel usage across operations using AI-driven load forecasting.",
    text: "Monitor and optimize energy consumption and fuel usage using AI-driven load forecasting and efficiency models — reallocating resources based on live demand.",
    image: "/assets/modules/energy-fuel-v2.jpg",
    painPoints: [
      "Energy spend rises without a clear operational cause",
      "Load peaks surprise operations and inflate tariffs",
      "Fuel and power data are fragmented across meters and sites",
      "Efficiency projects lack continuous measurement",
      "Sustainability reporting is manual and delayed",
    ],
    solutions: [
      "Site and asset-level consumption monitoring",
      "AI load forecasting and peak prediction",
      "Automated reallocation recommendations under constraints",
      "Fuel and energy anomaly alerts",
      "Executive views for cost, intensity, and sustainability KPIs",
    ],
    outcomes: [
      "2× reduction in energy overhead",
      "Real-time load forecasting and reallocation",
      "Full-site consumption visibility across assets",
    ],
    flow: [
      { label: "Meter", detail: "Collect power, fuel, and process loads" },
      { label: "Forecast", detail: "Predict demand and peak windows" },
      { label: "Optimize", detail: "Recommend load and fuel shifts" },
      { label: "Control", detail: "Execute with ops approvals" },
      { label: "Report", detail: "Cost and intensity dashboards" },
    ],
    industries: ["Energy & Power", "Manufacturing", "Oil & Gas", "Infrastructure"],
  },
  {
    id: "supply-chain",
    n: "05",
    short: "Supply Chain",
    title: "Supply Chain & Inventory Optimization",
    tagline: "Reduce stock gaps using AI visibility across procurement, logistics, and inventory movement in real time.",
    text: "Reduce excess stock and supply gaps with AI visibility across procurement, logistics, and inventory movement — syncing supply to demand automatically.",
    image: "/assets/modules/supply-chain-v2.jpg",
    painPoints: [
      "Stockouts and overstock happen in the same week",
      "Procurement, warehouse, and logistics lack one picture",
      "Lead-time variability breaks static safety stock",
      "Exceptions are found after customers or lines wait",
      "Manual expediting becomes the default operating mode",
    ],
    solutions: [
      "End-to-end inventory and movement visibility",
      "AI shortage and overstock early-warning signals",
      "Demand-aware replenishment recommendations",
      "Exception routing for delayed POs and shipments",
      "Procurement and logistics dashboards with audit trails",
    ],
    outcomes: [
      "2× reduction in excess inventory costs",
      "Real-time supply and demand synchronization",
      "End-to-end visibility across procurement and logistics",
    ],
    flow: [
      { label: "Connect", detail: "ERP, WMS, TMS, and supplier feeds" },
      { label: "Sense", detail: "Detect gaps, delays, and excess" },
      { label: "Plan", detail: "Recommend replenishment and transfers" },
      { label: "Execute", detail: "Route POs and warehouse actions" },
      { label: "Track", detail: "Service level and inventory KPIs" },
    ],
    industries: ["Manufacturing", "Retail & Commerce", "Oil & Gas", "Enterprise Automation"],
  },
  {
    id: "demand-forecasting",
    n: "06",
    short: "Demand Forecasting",
    title: "AI Demand Forecasting",
    tagline: "Predict customer and operational demand to align production, staffing, and procurement ahead of need.",
    text: "Predict customer and operational demand with high accuracy to align production, staffing, and procurement decisions ahead of need.",
    image: "/assets/modules/demand-forecasting-v2.jpg",
    painPoints: [
      "Forecasts rely on spreadsheets and last year’s pattern",
      "Promotions, seasonality, and events break accuracy",
      "Production and staffing react after demand shifts",
      "Confidence intervals are missing or ignored",
      "Plans don’t update when new signals arrive",
    ],
    solutions: [
      "Multi-signal demand models (sales, ops, external drivers)",
      "Confidence bands for planning and risk buffers",
      "Scenario planning for peaks and disruptions",
      "Auto-refresh forecasts as new data lands",
      "Downstream hooks into production, staffing, and buy plans",
    ],
    outcomes: [
      "3.2× more accurate than traditional forecasting",
      "85%+ forecast confidence across demand cycles",
      "Proactive resource alignment before demand peaks",
    ],
    flow: [
      { label: "Collect", detail: "History, orders, and external signals" },
      { label: "Model", detail: "Train and validate demand forecasts" },
      { label: "Score", detail: "Publish confidence and scenarios" },
      { label: "Align", detail: "Feed production and procurement plans" },
      { label: "Refine", detail: "Retrain on actuals continuously" },
    ],
    industries: ["Manufacturing", "Retail & Commerce", "Banking & Financial", "Telecom"],
  },
  {
    id: "financial-intelligence",
    n: "07",
    short: "Financial Intelligence",
    title: "Financial Intelligence & Compliance",
    tagline: "Automate financial data extraction, fraud detection, risk analysis, and compliance reporting.",
    text: "Automate financial data extraction, fraud detection, risk analysis, and compliance reporting with full audit traceability across every transaction.",
    image: "/assets/modules/financial-intelligence-v2.jpg",
    painPoints: [
      "Document processing creates multi-day bottlenecks",
      "Fraud and anomaly review is manual and slow",
      "Approvals lack consistent policy enforcement",
      "Audit packs take weeks to assemble",
      "Finance systems and ops data stay disconnected",
    ],
    solutions: [
      "OCR and extraction for invoices, statements, and forms",
      "Anomaly and fraud ranking with explanations",
      "Policy-gated approval workflows for exceptions",
      "Automated reconciliation and reporting packs",
      "Immutable audit trails across every action",
    ],
    outcomes: [
      "80% faster financial processing and reporting",
      "95% accuracy in automated data extraction",
      "Full audit trail across every transaction and approval",
    ],
    flow: [
      { label: "Ingest", detail: "Documents, ERP, and bank feeds" },
      { label: "Extract", detail: "Structure data with high accuracy" },
      { label: "Screen", detail: "Flag fraud, risk, and policy breaks" },
      { label: "Approve", detail: "Route exceptions with controls" },
      { label: "Audit", detail: "Export defensible evidence packs" },
    ],
    industries: ["Banking & Financial", "Healthcare & Insurance", "Enterprise Automation"],
  },
  {
    id: "workforce-safety",
    n: "08",
    short: "Workforce & Safety",
    title: "Workforce Productivity & Safety",
    tagline: "Monitor workforce activity, enforce safety compliance, and automate HR workflows to reduce risk.",
    text: "Monitor workforce activity, enforce safety compliance with computer vision, and automate HR workflows — including PPE compliance and restricted-area detection.",
    image: "/assets/modules/workforce-safety-v2.jpg",
    painPoints: [
      "Safety incidents are discovered after the fact",
      "PPE and zone compliance rely on supervisors watching screens",
      "Restricted area breaches are hard to prove",
      "Incident reporting is delayed and incomplete",
      "Productivity and safety data never sit in one view",
    ],
    solutions: [
      "Computer-vision PPE and zone compliance monitoring",
      "Real-time alerts to HSE and site supervisors",
      "Restricted-area and behavioral risk detection",
      "Incident evidence capture with timestamps",
      "Workforce activity insights that respect policy controls",
    ],
    outcomes: [
      "50% reduction in workplace safety incidents",
      "Real-time PPE and compliance violation detection",
      "Full-workforce activity monitoring across sites",
    ],
    flow: [
      { label: "Watch", detail: "Cameras cover work zones and gates" },
      { label: "Detect", detail: "PPE, zone, and behavior signals" },
      { label: "Alert", detail: "Notify HSE with evidence clips" },
      { label: "Respond", detail: "Guided incident workflows" },
      { label: "Improve", detail: "Trend risk by site and contractor" },
    ],
    industries: ["Oil & Gas", "Construction", "Manufacturing", "Infrastructure"],
  },
];

export const getModule = (id: string) => modules.find((m) => m.id === id);

/** Compact shape used by nav and older sections */
export const solutions = modules.map(({ id, n, short, title, text, outcomes, image }) => ({
  id,
  n,
  short,
  title,
  text,
  outcomes,
  image,
}));
