import { site } from "@/lib/site";

export type ChatLinkDef = { href: string; labelKey: string; external?: boolean };
export type ChatTopic =
  | "default"
  | "reliability"
  | "quality"
  | "production"
  | "energy"
  | "supplyChain"
  | "forecasting"
  | "finance"
  | "safety"
  | "location"
  | "pricing"
  | "cases"
  | "industries"
  | "platform"
  | "sparkAi"
  | "whatsapp";

export const suggestionKeys = ["reliability", "quality", "energy", "location"] as const;

export const topicLinks: Record<ChatTopic, ChatLinkDef[]> = {
  default: [
    { href: "/solutions", labelKey: "browseSolutions" },
    { href: "/contact", labelKey: "requestBriefing" },
  ],
  reliability: [
    { href: "/solutions/asset-reliability", labelKey: "assetReliability" },
    { href: "/contact", labelKey: "briefModule" },
  ],
  quality: [
    { href: "/solutions/quality-inspection", labelKey: "qualityInspection" },
    { href: "/case-studies", labelKey: "caseStudies" },
  ],
  production: [
    { href: "/solutions/production-process", labelKey: "productionProcess" },
    { href: "/solutions", labelKey: "allModules" },
  ],
  energy: [
    { href: "/solutions/energy-fuel", labelKey: "energyFuel" },
    { href: "/industries", labelKey: "industries" },
  ],
  supplyChain: [
    { href: "/solutions/supply-chain", labelKey: "supplyChain" },
    { href: "/solutions/demand-forecasting", labelKey: "demandForecasting" },
  ],
  forecasting: [
    { href: "/solutions/demand-forecasting", labelKey: "demandForecasting" },
    { href: "/contact", labelKey: "requestBriefing" },
  ],
  finance: [
    { href: "/solutions/financial-intelligence", labelKey: "financialIntelligence" },
    { href: "/contact", labelKey: "requestBriefing" },
  ],
  safety: [
    { href: "/solutions/workforce-safety", labelKey: "workforceSafety" },
    { href: "/solutions", labelKey: "allModules" },
  ],
  location: [
    { href: "/company", labelKey: "company" },
    { href: site.maps, labelKey: "openMaps", external: true },
  ],
  pricing: [
    { href: "/contact", labelKey: "requestBriefing" },
    { href: "/case-studies", labelKey: "seeOutcomes" },
  ],
  cases: [
    { href: "/case-studies", labelKey: "caseStudies" },
    { href: "/contact", labelKey: "requestBriefing" },
  ],
  industries: [
    { href: "/industries", labelKey: "industries" },
    { href: "/solutions", labelKey: "solutions" },
  ],
  platform: [
    { href: "/solutions", labelKey: "platformModules" },
    { href: "/company", labelKey: "howWeWork" },
  ],
  sparkAi: [
    { href: site.sparkAiUrl, labelKey: "visitSparkAi", external: true },
    { href: "/company", labelKey: "aboutSparkTech" },
  ],
  whatsapp: [
    { href: site.whatsapp, labelKey: "whatsapp", external: true },
    { href: "/contact", labelKey: "requestBriefing" },
  ],
};

export const matchChatTopic = (text: string): ChatTopic => {
  const q = text.toLowerCase();
  const has = (...words: string[]) => words.some((word) => q.includes(word));

  if (has("downtime", "reliab", "mainten", "predict", "asset", "failure", "cmms", "توقف", "dayanma"))
    return "reliability";
  if (has("inspect", "quality", "defect", "vision", "scrap", "visual", "جودة", "keyfiyyət"))
    return "quality";
  if (has("throughput", "bottleneck", "process", "plant", "oee", "إنتاج", "istehsal"))
    return "production";
  if (has("energy", "fuel", "power", "utility", "grid", "carbon", "طاقة", "enerji")) return "energy";
  if (has("supply", "inventor", "stock", "logistics", "warehouse", "مخزون", "təchizat"))
    return "supplyChain";
  if (has("forecast", "demand", "planning", "تنبؤ", "proqnoz")) return "forecasting";
  if (has("financ", "compliance", "audit", "risk", "fraud", "مالية", "maliyyə")) return "finance";
  if (has("safety", "workforce", "hsse", "incident", "ppe", "سلامة", "təhlükəsizlik"))
    return "safety";
  if (has("dubai", "where", "office", "location", "based", "gcc", "uae", "أين", "harada"))
    return "location";
  if (has("price", "cost", "pricing", "budget", "pilot", "سعر", "qiymət")) return "pricing";
  if (has("case", "result", "proof", "outcome", "azer", "powerline", "نتائج", "nəticə"))
    return "cases";
  if (has("industr", "oil", "gas", "manufactur", "infra", "قطاع", "sənaye")) return "industries";
  if (has("platform", "agent", "integrat", "data layer", "stack", "منصة", "platforma"))
    return "platform";
  if (has("spark ai", "sme", "small business")) return "sparkAi";
  if (has("whatsapp", "talk", "human", "person", "call", "demo", "brief", "واتساب")) return "whatsapp";
  return "default";
};
