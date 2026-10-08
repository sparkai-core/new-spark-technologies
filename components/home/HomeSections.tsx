import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { OfficeCard } from "@/components/site/OfficeCard";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import {
  agentCapabilities,
  company,
  deploymentPath,
  engagementModels,
  enterprisePillars,
  industries,
  integrations,
  markets,
  media,
  outcomes,
  platformLayers,
  site,
  traditionalVsSpark,
  whySpark,
} from "@/lib/site";
import { localizeCaseStudies, localizeIndustries, localizeModules, localizeProducts } from "@/lib/localize";

const industryImage: Record<string, string> = {
  "energy-power": "/assets/industries/energy-power.jpg",
  "oil-gas": "/assets/industries/oil-gas-v2.jpg",
  infrastructure: "/assets/industries/infrastructure-v2.jpg",
  "railways-metro": "/assets/industries/railways-metro.jpg",
  manufacturing: "/assets/industries/manufacturing.jpg",
  "enterprise-automation": "/assets/industries/enterprise-automation.jpg",
  healthcare: "/assets/industries/healthcare-insurance.jpg",
  banking: "/assets/industries/banking-financial.jpg",
  telecom: "/assets/industries/telecom.jpg",
  aviation: "/assets/industries/aviation-transport.jpg",
};

const Arrow = () => (
  <span aria-hidden className="inline-block rtl:-scale-x-100">
    →
  </span>
);

export async function WhySparkSection() {
  const t = await getTranslations("Home");

  return (
    <Section label={t("whyTitle")}>
      <SectionHeading kicker={t("whyKicker")} title={t("whyTitle")} />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {whySpark.map((item, i) => (
          <Reveal key={item.n} delay={i * 60}>
            <article className="panel h-full p-5">
              <p className="font-mono text-xs text-signal">{item.n}</p>
              <h3 className="type-h3 mt-3">{t(`why${i}Title` as "why0Title")}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{t(`why${i}Text` as "why0Text")}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export async function OutcomeShift() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("shiftKicker")} className="border-y border-border bg-surface">
      <SectionHeading kicker={t("shiftKicker")} title={t("shiftTitle")} lede={t("shiftLede")} />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="panel p-6">
          <h3 className="text-sm font-semibold text-muted">{t("shiftTraditional")}</h3>
          <ul className="mt-4 space-y-2.5">
            {traditionalVsSpark.traditional.map((_, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-2">
                <span className="text-muted">–</span>
                {tc(`trad${i}` as "trad0")}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-lg border border-ink bg-ink p-6 text-on-brand">
          <h3 className="text-sm font-semibold text-on-brand/70">{t("shiftSpark")}</h3>
          <ul className="mt-4 space-y-2.5">
            {traditionalVsSpark.spark.map((_, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-signal">+</span>
                {tc(`spark${i}` as "spark0")}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}

export async function MarketsBand() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("marketsKicker")}>
      <SectionHeading
        kicker={t("marketsKicker")}
        title={t("marketsTitle")}
        lede={t("marketsLede")}
      />
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {markets.map((_, i) => (
          <article key={i} className="panel p-4">
            <h3 className="text-sm font-semibold text-ink">{tc(`market${i}Label` as "market0Label")}</h3>
            <p className="mt-1.5 text-sm leading-6 text-ink-2">{tc(`market${i}Text` as "market0Text")}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export async function SolutionsGrid() {
  const t = await getTranslations("Home");
  const tm = await getTranslations("Modules");
  const localized = localizeModules((k) => tm(k as never));

  return (
    <Section label={t("solutionsKicker")} className="border-y border-border bg-surface">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          kicker={t("solutionsKicker")}
          title={t("solutionsTitle")}
          lede={t("solutionsLede")}
        />
        <Link href="/solutions" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
          {t("solutionsBrowseAll")} <Arrow />
        </Link>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {localized.map((item, i) => (
          <Reveal key={item.id} delay={i * 40}>
            <Link
              href={`/solutions/${item.id}`}
              className="solution-card panel block h-full overflow-hidden transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <div className="relative aspect-[16/10] border-b border-border bg-[#eef2f7]">
                <Image
                  src={item.image}
                  alt={item.short}
                  fill
                  className="object-contain object-top p-1"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-xs text-signal">{item.n}</p>
                <h3 className="type-h3 mt-2 text-base">{item.short}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-2">{item.text}</p>
                <span className="mt-4 inline-flex text-xs font-semibold text-ink-2">
                  {t("solutionsOpenModule")} <Arrow />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/contact" size="md">
          {t("solutionsCta")}
        </Button>
        <Button href="/solutions" size="md" variant="outline">
          {t("solutionsCompare")}
        </Button>
      </div>
    </Section>
  );
}

export async function ProductsGrid() {
  const t = await getTranslations("Home");
  const tp = await getTranslations("Products");
  const localized = localizeProducts((k) => tp(k as never));

  return (
    <Section label={t("productsKicker")}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          kicker={t("productsKicker")}
          title={t("productsTitle")}
          lede={t("productsLede")}
        />
        <Link href="/products" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
          {t("productsBrowseAll")} <Arrow />
        </Link>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {localized.map((item, i) => (
          <Reveal key={item.slug} delay={i * 30}>
            <Link
              href={item.href}
              className="solution-card panel block h-full overflow-hidden transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              {item.image ? (
                <div className="relative aspect-[16/9] border-b border-border bg-surface">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <p className="font-mono text-xs text-signal">
                  {item.n} · {item.kicker}
                </p>
                <h3 className="type-h3 mt-2 text-base">{item.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-2">{item.summary}</p>
                <span className="mt-4 inline-flex text-xs font-semibold text-ink-2">
                  {t("productsOpenProduct")} <Arrow />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/contact" size="md">
          {t("productsCta")}
        </Button>
        <Button href="/products" size="md" variant="outline">
          {t("productsCompare")}
        </Button>
      </div>
    </Section>
  );
}

export async function AgentsSection() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("agentsKicker")}>
      <SectionHeading kicker={t("agentsKicker")} title={t("agentsTitle")} lede={t("agentsLede")} />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {agentCapabilities.map((_, i) => (
          <article key={i} className="panel p-5">
            <h3 className="type-h3 text-base">{tc(`agent${i}Title` as "agent0Title")}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-2">{tc(`agent${i}Text` as "agent0Text")}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export async function IndustriesGrid() {
  const t = await getTranslations("Home");
  const ti = await getTranslations("Industries");
  const localized = localizeIndustries((k) => ti(k as never));

  return (
    <Section label={t("industriesKicker")} className="border-y border-border bg-surface">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          kicker={t("industriesKicker")}
          title={t("industriesTitle")}
          lede={t("industriesLede")}
        />
        <Link href="/industries" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
          {t("industriesAll", { count: industries.length })} <Arrow />
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {localized.map((item) => (
          <Link
            key={item.id}
            href={`/industries#${item.id}`}
            className="group panel relative block overflow-hidden transition hover:border-border-strong"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-ink">
              <Image
                src={industryImage[item.id] ?? media.platform}
                alt={item.label}
                fill
                className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="type-h3 text-white drop-shadow-sm">{item.label}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/90">{item.text}</p>
              <p className="mt-2 text-[0.65rem] font-medium text-white/80">
                {t("industriesUseCases", { count: item.useCases.length })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export async function CaseStudiesSection() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("CaseStudies");
  const localized = localizeCaseStudies((k) => tc(k as never));

  return (
    <Section label={t("casesKicker")}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading kicker={t("casesKicker")} title={t("casesTitle")} lede={t("casesLede")} />
        <Link href="/case-studies" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
          {t("casesAll")} <Arrow />
        </Link>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {localized.map((item, i) => (
          <Reveal key={item.id} delay={i * 60}>
            <article className="panel overflow-hidden sm:grid sm:grid-cols-[0.75fr_1.25fr]">
              <div className="relative min-h-[9rem] sm:min-h-full">
                <Image src={item.image} alt="" fill className="object-cover object-center" sizes="40vw" />
              </div>
              <div className="p-5">
                <p className="type-kicker">{item.sector}</p>
                <h3 className="type-h3 mt-2">{item.client}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  <span className="font-semibold text-ink">{t("casesProblem")}: </span>
                  {item.problem}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">
                  <span className="font-semibold text-ink">{t("casesResult")}: </span>
                  {item.result}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.outcomes.slice(0, 3).map((o) => (
                    <li
                      key={o}
                      className="rounded border border-border bg-surface px-2 py-0.5 text-[0.65rem] font-medium text-ink-2"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export async function PlatformSection() {
  const t = await getTranslations("Home");

  return (
    <Section label={t("platformKicker")} className="border-y border-border bg-surface">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            kicker={t("platformKicker")}
            title={t("platformTitle")}
            lede={t("platformLede")}
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {platformLayers.map((layer, i) => (
              <article key={layer.title} className="panel p-4">
                <h3 className="type-h3 text-base">{t(`layer${i}Title` as "layer0Title")}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">{t(`layer${i}Text` as "layer0Text")}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="relative min-h-[22rem] overflow-hidden rounded-lg border border-border">
          <Image
            src={media.platform}
            alt={t("platformImageAlt")}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/25 to-signal/20" />
          <div className="absolute inset-x-6 bottom-6">
            <p className="type-kicker text-white/60">{t("platformDeployment")}</p>
            <p className="mt-2 text-lg font-semibold text-white">{t("platformDeploymentTitle")}</p>
            <p className="mt-1 text-sm text-white/70">{t("platformDeploymentText")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export async function IntegrationsSection() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("integrationsKicker")}>
      <SectionHeading
        kicker={t("integrationsKicker")}
        title={t("integrationsTitle")}
        lede={t("integrationsLede")}
      />
      <ul className="mt-8 flex flex-wrap gap-2">
        {integrations.map((_, i) => (
          <li
            key={i}
            className="rounded-md border border-border bg-bg px-3 py-1.5 text-xs font-medium text-ink-2"
          >
            {tc(`integ${i}` as "integ0")}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export async function EnterpriseSection() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("enterpriseTitle")} className="border-y border-border bg-surface">
      <SectionHeading
        kicker={t("enterpriseKicker")}
        title={t("enterpriseTitle")}
        lede={t("enterpriseLede")}
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {enterprisePillars.map((_, i) => (
          <article key={i} className="panel p-5">
            <h3 className="type-h3">{tc(`pillar${i}Title` as "pillar0Title")}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-2">{tc(`pillar${i}Text` as "pillar0Text")}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export async function OutcomesSection() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("outcomesTitle")}>
      <SectionHeading kicker={t("outcomesKicker")} title={t("outcomesTitle")} />
      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {outcomes.map((_, i) => (
          <li key={i} className="panel flex items-start gap-3 px-5 py-4 text-sm text-ink-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            {tc(`outcome${i}` as "outcome0")}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export async function EngagementSection() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("engagementKicker")} className="border-y border-border bg-surface">
      <SectionHeading
        kicker={t("engagementKicker")}
        title={t("engagementTitle")}
        lede={t("engagementLede")}
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {engagementModels.map((item, i) => (
          <article key={item.n} className="panel p-5">
            <p className="font-mono text-xs text-signal">{item.n}</p>
            <h3 className="type-h3 mt-3">{tc(`engage${i}Title` as "engage0Title")}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-2">{tc(`engage${i}Text` as "engage0Text")}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export async function DeploymentSection() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("deploymentKicker")}>
      <SectionHeading
        kicker={t("deploymentKicker")}
        title={t("deploymentTitle")}
        lede={t("deploymentLede")}
      />
      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {deploymentPath.map((item, i) => (
          <li key={item.step} className="panel p-4">
            <p className="font-mono text-xs text-signal">{item.step}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{tc(`deploy${i}Title` as "deploy0Title")}</p>
            <p className="mt-2 text-[0.75rem] leading-5 text-muted">{tc(`deploy${i}Text` as "deploy0Text")}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export async function BriefingSection() {
  const t = await getTranslations("Home");
  const bullets = [
    t("briefingBullet1"),
    t("briefingBullet2"),
    t("briefingBullet3"),
    t("briefingBullet4"),
  ];
  const deliverables = [t("briefingGet1"), t("briefingGet2"), t("briefingGet3"), t("briefingGet4")];

  return (
    <Section label={t("briefingKicker")} className="border-y border-border bg-surface">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <SectionHeading
            kicker={t("briefingKicker")}
            title={t("briefingTitle")}
            lede={t("briefingLede")}
          />
          <ul className="mt-6 space-y-2.5 text-sm text-ink-2">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              {t("briefingCta")}
            </Button>
            <Button href="/solutions" size="lg" variant="outline">
              {t("briefingSecondary")}
            </Button>
          </div>
        </div>
        <article className="panel bg-ink p-6 text-on-brand">
          <p className="type-kicker text-on-brand/55">{t("briefingWhat")}</p>
          <ul className="mt-4 space-y-3 text-sm text-on-brand/85">
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}

export async function EcosystemSection() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("HomeContent");

  return (
    <Section label={t("ecosystemKicker")}>
      <div className="panel grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <p className="type-kicker">{t("ecosystemKicker")}</p>
          <h2 className="type-h2 mt-3 max-w-xl text-ink">{tc("companyHeadline")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-2">{tc("companyLede")}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {company.points.map((_, i) => (
              <div key={i}>
                <p className="text-sm font-semibold text-ink">{tc(`point${i}Title` as "point0Title")}</p>
                <p className="mt-1 text-[0.75rem] leading-5 text-muted">{tc(`point${i}Text` as "point0Text")}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button href={site.sparkAiUrl} size="md" variant="outline">
            {t("ecosystemVisit")} <Arrow />
          </Button>
          <Button href="/company" size="md">
            {t("ecosystemAbout")}
          </Button>
        </div>
      </div>
    </Section>
  );
}

export async function OfficeSection() {
  const t = await getTranslations("Home");

  return (
    <Section label={t("officeKicker")} className="border-t border-border bg-surface">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading kicker={t("officeKicker")} title={t("officeTitle")} lede={t("officeLede")} />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              {t("officeCta")}
            </Button>
            <Button href="/case-studies" size="lg" variant="outline">
              {t("officeSecondary")}
            </Button>
          </div>
        </div>
        <OfficeCard />
      </div>
    </Section>
  );
}

export async function HomeFinalCta() {
  const t = await getTranslations("Home");

  return (
    <section className="border-t border-border bg-bg" aria-label="Final call to action">
      <div className="mx-auto max-w-6xl px-4 section-y sm:px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="af-section-title text-balance">{t("finalCtaTitle")}</h2>
          <p className="af-body mt-5">{t("finalCtaText")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg" className="w-full min-w-[11rem] sm:w-auto">
              {t("finalCtaPrimary")}
            </Button>
            <Button
              href="/solutions"
              variant="outline"
              size="lg"
              className="w-full min-w-[11rem] sm:w-auto"
            >
              {t("finalCtaSecondary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
