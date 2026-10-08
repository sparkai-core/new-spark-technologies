import fs from "fs";
import path from "path";
import { modules } from "../lib/modules";
import {
  industries,
  caseStudies,
  markets,
  agentCapabilities,
  enterprisePillars,
  outcomes,
  traditionalVsSpark,
  engagementModels,
  deploymentPath,
  integrations,
  company,
  site,
} from "../lib/site";
import { events, eventShowcase } from "../lib/events";

const Modules: Record<string, Record<string, string>> = {};
for (const m of modules) {
  const o: Record<string, string> = {
    short: m.short,
    title: m.title,
    tagline: m.tagline,
    text: m.text,
  };
  m.painPoints.forEach((v, i) => (o[`pain${i}`] = v));
  m.solutions.forEach((v, i) => (o[`sol${i}`] = v));
  m.outcomes.forEach((v, i) => (o[`out${i}`] = v));
  m.flow.forEach((s, i) => {
    o[`flow${i}Label`] = s.label;
    o[`flow${i}Detail`] = s.detail;
  });
  m.industries.forEach((v, i) => (o[`ind${i}`] = v));
  Modules[m.id] = o;
}

const Industries: Record<string, Record<string, string>> = {};
for (const x of industries) {
  const o: Record<string, string> = { label: x.label, text: x.text };
  x.challenges.forEach((v, i) => (o[`ch${i}`] = v));
  x.useCases.forEach((uc, i) => {
    o[`uc${i}Title`] = uc.title;
    o[`uc${i}Text`] = uc.text;
  });
  Industries[x.id] = o;
}

const CaseStudies: Record<string, Record<string, string>> = {};
for (const c of caseStudies) {
  const o: Record<string, string> = {
    sector: c.sector,
    client: c.client,
    title: c.title,
    problem: c.problem,
    approach: c.approach,
    result: c.result,
  };
  c.outcomes.forEach((v, i) => (o[`out${i}`] = v));
  CaseStudies[c.id] = o;
}

const HomeContent: Record<string, string> = {};
markets.forEach((m, i) => {
  HomeContent[`market${i}Label`] = m.label;
  HomeContent[`market${i}Text`] = m.text;
});
agentCapabilities.forEach((a, i) => {
  HomeContent[`agent${i}Title`] = a.title;
  HomeContent[`agent${i}Text`] = a.text;
});
enterprisePillars.forEach((p, i) => {
  HomeContent[`pillar${i}Title`] = p.title;
  HomeContent[`pillar${i}Text`] = p.text;
});
outcomes.forEach((v, i) => (HomeContent[`outcome${i}`] = v));
traditionalVsSpark.traditional.forEach((v, i) => (HomeContent[`trad${i}`] = v));
traditionalVsSpark.spark.forEach((v, i) => (HomeContent[`spark${i}`] = v));
engagementModels.forEach((e, i) => {
  HomeContent[`engage${i}Title`] = e.title;
  HomeContent[`engage${i}Text`] = e.text;
});
deploymentPath.forEach((d, i) => {
  HomeContent[`deploy${i}Title`] = d.title;
  HomeContent[`deploy${i}Text`] = d.text;
});
integrations.forEach((v, i) => (HomeContent[`integ${i}`] = v));
HomeContent.companyHeadline = company.headline;
HomeContent.companyLede = company.lede;
company.points.forEach((p, i) => {
  HomeContent[`point${i}Title`] = p.title;
  HomeContent[`point${i}Text`] = p.text;
});
HomeContent.hours = site.hours;
HomeContent.skipToContent = "Skip to content";
HomeContent.sparkAi = "Spark AI";
HomeContent.logoAria = "Spark Technologies — home";
HomeContent.socialAria = "Social media";

const EventsList: Record<string, Record<string, string>> = {};
for (const e of events) {
  const o: Record<string, string> = {
    name: e.name,
    shortName: e.shortName,
    role: e.role,
    summary: e.summary,
    city: e.city,
    country: e.country,
  };
  e.focus.forEach((v, i) => (o[`focus${i}`] = v));
  EventsList[e.id] = o;
}

const EventsShowcase: Record<string, string> = {};
eventShowcase.forEach((s, i) => {
  EventsShowcase[`s${i}Title`] = s.title;
  EventsShowcase[`s${i}Text`] = s.text;
});

const out = {
  Modules,
  Industries,
  CaseStudies,
  HomeContent,
  Events: { showcase: EventsShowcase, list: EventsList },
  FlowChart: {
    howItWorks: "How it works",
    processFlow: "Process flow",
    pause: "Pause animation",
    play: "Play animation",
    now: "Now:",
  },
  Ui: {
    sectionModules: "Modules",
    sectionPlatform: "Platform",
    sectionOffice: "Office",
    sectionOfficeCta: "Office & CTA",
    sectionEngagements: "Engagements",
    sectionAbout: "About Spark Technologies",
    sectionFocus: "Focus",
    sectionFeatured: "Featured",
    sectionOnFloor: "On the floor",
    sectionUpcoming: "Upcoming",
    sectionPast: "Past",
    sectionInvite: "Invite",
    operatingModels: "Operating models by sector",
    allIndustries: "All industries",
    solutionFallback: "Solution",
    industryBriefing: "Industry briefing",
    notSureYet: "Not sure yet",
  },
};

const dest = path.join(process.cwd(), "scripts", "_content-en.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.log("Wrote", dest, "modules", Object.keys(Modules).length);
