import { modules, type SolutionModule } from "@/lib/modules";
import { products, type Product } from "@/lib/products";
import { industries, caseStudies } from "@/lib/site";
import { events } from "@/lib/events";

type TFn = (key: string) => string;

export function localizeModule(m: SolutionModule, t: TFn) {
  const id = m.id;
  return {
    ...m,
    short: t(`${id}.short`),
    title: t(`${id}.title`),
    tagline: t(`${id}.tagline`),
    text: t(`${id}.text`),
    painPoints: m.painPoints.map((_, i) => t(`${id}.pain${i}`)),
    solutions: m.solutions.map((_, i) => t(`${id}.sol${i}`)),
    outcomes: m.outcomes.map((_, i) => t(`${id}.out${i}`)),
    flow: m.flow.map((_, i) => ({
      label: t(`${id}.flow${i}Label`),
      detail: t(`${id}.flow${i}Detail`),
    })),
    industries: m.industries.map((_, i) => t(`${id}.ind${i}`)),
  };
}

export function localizeModules(t: TFn) {
  return modules.map((m) => localizeModule(m, t));
}

export function localizeProduct(p: Product, t: TFn) {
  const id = p.slug;
  return {
    ...p,
    name: t(`${id}.name`),
    kicker: t(`${id}.kicker`),
    headline: t(`${id}.headline`),
    lede: t(`${id}.lede`),
    summary: t(`${id}.summary`),
    cta: t(`${id}.cta`),
    outcomes: p.outcomes.map((_, i) => t(`${id}.out${i}`)),
    features: p.features.map((_, i) => ({
      title: t(`${id}.feat${i}Title`),
      text: t(`${id}.feat${i}Text`),
    })),
    steps: p.steps.map((_, i) => ({
      title: t(`${id}.step${i}Title`),
      text: t(`${id}.step${i}Text`),
    })),
  };
}

export function localizeProducts(t: TFn) {
  return products.map((p) => localizeProduct(p, t));
}

export function localizeIndustry(id: (typeof industries)[number]["id"], t: TFn) {
  const item = industries.find((i) => i.id === id)!;
  return {
    ...item,
    label: t(`${id}.label`),
    text: t(`${id}.text`),
    challenges: item.challenges.map((_, i) => t(`${id}.ch${i}`)),
    useCases: item.useCases.map((_, i) => ({
      title: t(`${id}.uc${i}Title`),
      text: t(`${id}.uc${i}Text`),
    })),
  };
}

export function localizeIndustries(t: TFn) {
  return industries.map((i) => localizeIndustry(i.id, t));
}

export function localizeCaseStudy(id: (typeof caseStudies)[number]["id"], t: TFn) {
  const item = caseStudies.find((c) => c.id === id)!;
  return {
    ...item,
    sector: t(`${id}.sector`),
    client: t(`${id}.client`),
    title: t(`${id}.title`),
    problem: t(`${id}.problem`),
    approach: t(`${id}.approach`),
    result: t(`${id}.result`),
    outcomes: item.outcomes.map((_, i) => t(`${id}.out${i}`)),
  };
}

export function localizeCaseStudies(t: TFn) {
  return caseStudies.map((c) => localizeCaseStudy(c.id, t));
}

export function localizeEvents(t: TFn) {
  return events.map((e) => ({
    ...e,
    name: t(`list.${e.id}.name`),
    shortName: t(`list.${e.id}.shortName`),
    role: t(`list.${e.id}.role`) as typeof e.role,
    summary: t(`list.${e.id}.summary`),
    city: t(`list.${e.id}.city`),
    country: t(`list.${e.id}.country`),
    focus: e.focus.map((_, i) => t(`list.${e.id}.focus${i}`)),
  }));
}
