"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SlideControls } from "@/components/ui/SlideControls";
import { useSlideSwipe } from "@/components/ui/useSlideSwipe";
import { SuiteOpsVisual } from "@/components/home/SuiteOpsVisual";
import { SuiteTabIcon } from "@/components/home/SuiteTabIcons";
import { ModuleOpsVisual } from "@/components/home/ModuleOpsVisuals";
import { ShiftCompare } from "@/components/home/ShiftCompare";
import { caseStudies } from "@/lib/site";
import { modules } from "@/lib/modules";

const TRUST_DOMAINS = [
  {
    id: "energy-power",
    label: "Energy & Power",
    image: "/assets/industries/energy-power.jpg",
  },
  {
    id: "oil-gas",
    label: "Oil & Gas",
    image: "/assets/industries/oil-gas-v2.jpg",
  },
  {
    id: "railways-metro",
    label: "Rail & Metro",
    image: "/assets/industries/railways-metro.jpg",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    image: "/assets/industries/manufacturing.jpg",
  },
  {
    id: "enterprise-automation",
    label: "Control rooms",
    image: "/assets/industries/enterprise-automation.jpg",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    image: "/assets/industries/oil-gas.jpg",
  },
] as const;

const SUITES = [
  {
    id: "systems",
    href: "/solutions",
    titleKey: "suiteSystemsTitle" as const,
    ledeKey: "suiteSystemsLede" as const,
    ctaKey: "suiteSystemsCta" as const,
    points: ["suiteSystemsPoint0", "suiteSystemsPoint1", "suiteSystemsPoint2"] as const,
  },
  {
    id: "products",
    href: "/products",
    titleKey: "suiteProductsTitle" as const,
    ledeKey: "suiteProductsLede" as const,
    ctaKey: "suiteProductsCta" as const,
    points: ["suiteProductsPoint0", "suiteProductsPoint1", "suiteProductsPoint2"] as const,
  },
  {
    id: "industries",
    href: "/industries",
    titleKey: "suiteIndustriesTitle" as const,
    ledeKey: "suiteIndustriesLede" as const,
    ctaKey: "suiteIndustriesCta" as const,
    points: ["suiteIndustriesPoint0", "suiteIndustriesPoint1", "suiteIndustriesPoint2"] as const,
  },
  {
    id: "platform",
    href: "/company",
    titleKey: "suitePlatformTitle" as const,
    ledeKey: "suitePlatformLede" as const,
    ctaKey: "suitePlatformCta" as const,
    points: ["suitePlatformPoint0", "suitePlatformPoint1", "suitePlatformPoint2"] as const,
  },
  {
    id: "agents",
    href: "/solutions",
    titleKey: "suiteAgentsTitle" as const,
    ledeKey: "suiteAgentsLede" as const,
    ctaKey: "suiteAgentsCta" as const,
    points: ["suiteAgentsPoint0", "suiteAgentsPoint1", "suiteAgentsPoint2"] as const,
  },
] as const;

export function TrustedByBand() {
  const t = useTranslations("Home");

  return (
    <section className="border-b border-border bg-bg" aria-label={t("trustedBy")}>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-5 sm:pt-16 md:pt-20">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted sm:text-[0.9375rem]">
          {t("trustedByKicker")}
        </p>
        <p className="mx-auto mt-4 max-w-4xl text-center text-[1.75rem] font-bold leading-[1.15] tracking-[-0.035em] text-ink sm:mt-5 sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem]">
          {t("trustedBy")}
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-ink-2 sm:mt-5 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
          {t("trustedByLede")}
        </p>
      </div>

      <ul className="mt-10 grid w-full grid-cols-2 divide-x divide-y divide-border border-y border-border sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
        {TRUST_DOMAINS.map((item) => (
          <li key={item.id}>
            <Link
              href={`/industries#${item.id}`}
              className="group flex h-full flex-col bg-canvas"
            >
              <span className="relative aspect-[4/5] overflow-hidden bg-surface lg:aspect-[3/4] xl:aspect-[4/5]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-hover:grayscale-0 grayscale"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
                />
              </span>
              <span className="bg-brand-soft/50 px-3 py-5 text-center text-base font-bold leading-snug tracking-[-0.02em] text-ink sm:px-4 sm:py-6 sm:text-lg md:text-xl lg:px-3 lg:text-[1.05rem] xl:px-4 xl:text-xl">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="px-4 pb-20 pt-8 text-center sm:px-5 sm:py-8">
        <Link
          href="/industries"
          className="inline-flex text-sm font-semibold text-ink underline-offset-4 hover:underline"
        >
          {t("trustedByCta")} →
        </Link>
      </div>
    </section>
  );
}

export function SolutionsModulesSection() {
  const t = useTranslations("Home");
  const rtl = useLocale() === "ar";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipe = useSlideSwipe(modules.length, setActive, setPaused);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % modules.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="solutions"
      className="scroll-mt-24 border-b border-border bg-bg"
      aria-label={t("solutionsTitle")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 section-y sm:px-5">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted sm:text-[0.9375rem]">
            {t("solutionsKicker")}
          </p>
          <h2 className="mt-4 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.035em] text-ink sm:mt-5 sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem]">
            {t("solutionsTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-2 sm:mt-5 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            {t("solutionsLede")}
          </p>
        </div>

        <div
          className="mt-8 grid grid-cols-2 gap-2 sm:mt-12 sm:flex sm:gap-0 sm:overflow-x-auto sm:border-b-2 sm:border-border sm:pb-px sm:[-ms-overflow-style:none] sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={t("solutionsTitle")}
        >
          {modules.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`af-suite-tab relative flex min-w-0 flex-1 flex-col items-center gap-2 rounded-xl border px-3 py-3 text-center transition-colors sm:min-w-[8.5rem] sm:gap-3 sm:rounded-none sm:border-0 sm:px-2.5 sm:py-5 lg:min-w-0 lg:px-3 ${
                i === active
                  ? "border-ink bg-bg text-ink"
                  : "border-border bg-surface text-muted hover:text-ink"
              }`}
              onClick={() => setActive(i)}
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border text-[0.9375rem] font-bold tracking-tight transition-colors sm:h-12 sm:w-12 sm:text-base ${
                  i === active
                    ? "border-ink bg-ink text-on-brand shadow-[0_8px_18px_-10px_rgba(15,17,21,0.55)]"
                    : "border-border bg-[#f3f1fc] text-ink-2"
                }`}
                aria-hidden
              >
                {item.n}
              </span>
              <span
                className={`max-w-[8rem] text-[0.875rem] font-semibold leading-[1.25] tracking-[-0.015em] sm:max-w-[7.5rem] sm:text-[0.9375rem] lg:max-w-none ${
                  i === active ? "text-ink" : ""
                }`}
              >
                {item.short}
              </span>
              {i === active ? (
                <span
                  className="absolute inset-x-2 -bottom-[2px] h-[3px] rounded-full bg-ink sm:inset-x-3"
                  aria-hidden
                />
              ) : null}
            </button>
          ))}
        </div>

        <div className="af-suite-stage relative mt-8 touch-pan-y overflow-hidden rounded-[1.25rem] sm:mt-10" {...swipe}>
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translate3d(${rtl ? active * 100 : -active * 100}%, 0, 0)` }}
          >
            {modules.map((item, i) => (
              <div
                key={item.id}
                className="w-full shrink-0 bg-gradient-to-br from-[#e4e8ff] via-[#f3f1fc] to-[#f8eefc] p-6 sm:p-10 lg:p-14"
                role={i === active ? "tabpanel" : undefined}
                aria-hidden={i !== active}
              >
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div className={i === active ? "af-slide-in" : ""}>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      {t("solutionsModuleLabel", { n: item.n })}
                    </p>
                    <h3 className="af-panel-title mt-3">{item.short}</h3>
                    <p className="af-body mt-5 max-w-lg">{item.tagline}</p>
                    <ul className="mt-6 space-y-2.5">
                      {item.outcomes.slice(0, 2).map((outcome) => (
                        <li key={outcome} className="flex gap-2.5 text-[0.9375rem] leading-6 text-ink">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Button href={`/solutions/${item.id}`} size="lg" className="w-full sm:w-auto">
                        {t("solutionsOpenModule")}
                      </Button>
                      <Button href="/contact" size="lg" variant="outline" className="w-full sm:w-auto">
                        {t("solutionsCta")}
                      </Button>
                    </div>
                  </div>
                  <div className={i === active ? "af-slide-in-delay" : ""}>
                    <ModuleOpsVisual id={item.id} active={i === active} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <SlideControls
          count={modules.length}
          active={active}
          onPrev={() => {
            setPaused(true);
            setActive((current) => (current - 1 + modules.length) % modules.length);
            window.setTimeout(() => setPaused(false), 5000);
          }}
          onNext={() => {
            setPaused(true);
            setActive((current) => (current + 1) % modules.length);
            window.setTimeout(() => setPaused(false), 5000);
          }}
        />

        <div className="mt-8 text-center">
          <Link
            href="/solutions"
            className="inline-flex text-sm font-semibold text-ink underline-offset-4 hover:underline"
          >
            {t("solutionsCompare")} →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SuitesSection() {
  const t = useTranslations("Home");
  const rtl = useLocale() === "ar";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipe = useSlideSwipe(SUITES.length, setActive, setPaused);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % SUITES.length);
    }, 7500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="border-b border-border bg-bg"
      aria-label={t("suitesTitle")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 section-y sm:px-5">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="af-section-title">{t("suitesTitle")}</h2>
          <p className="mx-auto mt-3 max-w-md text-[1.05rem] leading-7 text-ink-2">
            {t("suitesSubtitle")}
          </p>
        </div>

        <div
          className="mt-8 flex w-full overflow-x-auto border-b border-border pb-px sm:mt-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
        >
          {SUITES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`af-suite-tab relative flex min-w-[12rem] flex-1 items-center justify-center gap-3 px-2 py-5 text-left transition-colors md:min-w-0 ${
                i === active ? "text-ink" : "text-muted hover:text-ink"
              }`}
              onClick={() => setActive(i)}
            >
              <SuiteTabIcon id={item.id} active={i === active} />
              <span className="whitespace-nowrap text-[0.9375rem] font-semibold leading-snug tracking-[-0.02em] sm:text-base">
                {t(`suiteTab${i}` as "suiteTab0")}
              </span>
              {i === active ? (
                <span className="absolute inset-x-0 -bottom-px h-[3px] bg-ink" aria-hidden />
              ) : null}
            </button>
          ))}
        </div>

        <div className="af-suite-stage relative mt-8 touch-pan-y overflow-hidden rounded-[1.25rem] sm:mt-10" {...swipe}>
          <div
            className="af-suite-track"
            style={{ transform: `translate3d(${rtl ? active * 100 : -active * 100}%, 0, 0)` }}
          >
            {SUITES.map((suite, i) => (
              <div
                key={suite.id}
                className="af-suite-slide bg-gradient-to-br from-[#e4e8ff] via-[#f3f1fc] to-[#f8eefc] p-6 sm:p-10 lg:p-14"
                role={i === active ? "tabpanel" : undefined}
                aria-hidden={i !== active}
              >
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div className={i === active ? "af-slide-in" : ""}>
                    <h3 className="af-panel-title">{t(suite.titleKey)}</h3>
                    <p className="af-body mt-5 max-w-lg">{t(suite.ledeKey)}</p>
                    <ul className="mt-6 space-y-2.5">
                      {suite.points.map((key) => (
                        <li key={key} className="flex gap-2.5 text-[0.9375rem] leading-6 text-ink">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                          />
                          <span>{t(key)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button href={suite.href} size="lg" className="mt-8 w-full sm:w-auto">
                      {t(suite.ctaKey)}
                    </Button>
                  </div>
                  <div className={i === active ? "af-slide-in-delay" : ""}>
                    <SuiteOpsVisual id={suite.id} active={i === active} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <SlideControls
          count={SUITES.length}
          active={active}
          onPrev={() => {
            setPaused(true);
            setActive((current) => (current - 1 + SUITES.length) % SUITES.length);
            window.setTimeout(() => setPaused(false), 5000);
          }}
          onNext={() => {
            setPaused(true);
            setActive((current) => (current + 1) % SUITES.length);
            window.setTimeout(() => setPaused(false), 5000);
          }}
        />
      </div>
    </section>
  );
}

export function ClaritySection() {
  const t = useTranslations("Home");

  const why = [0, 1, 2, 3] as const;

  return (
    <section className="border-b border-border bg-canvas" aria-label={t("whyTitle")}>
      <div className="mx-auto max-w-6xl px-4 section-y sm:px-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="af-kicker">{t("whyKicker")}</p>
          <h2 className="af-section-title mt-4">{t("whyTitle")}</h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((i) => (
            <li
              key={i}
              className="rounded-2xl border border-border bg-bg p-6 shadow-[var(--shadow-sm)]"
            >
              <p className="font-mono text-xs font-semibold text-signal">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
                {t(`why${i}Title` as "why0Title")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">
                {t(`why${i}Text` as "why0Text")}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <div className="max-w-xl">
            <p className="af-kicker">{t("shiftKicker")}</p>
            <h3 className="af-panel-title mt-4">{t("shiftTitle")}</h3>
            <p className="af-body mt-5">{t("shiftLede")}</p>
          </div>
          <ShiftCompare />
        </div>
      </div>
    </section>
  );
}

export function StoriesSection() {
  const t = useTranslations("Home");
  const stories = caseStudies.slice(0, 3);

  return (
    <section className="border-b border-border bg-bg" aria-label={t("storiesTitle")}>
      <div className="mx-auto max-w-6xl px-4 section-y sm:px-5">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="af-section-title">{t("storiesTitle")}</h2>
          <p className="af-body mx-auto mt-4 max-w-2xl">{t("storiesLede")}</p>
          <Link
            href="/case-studies"
            className="mt-5 inline-flex text-[0.9375rem] font-semibold text-ink underline-offset-4 hover:underline"
          >
            {t("casesAll")}
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {stories.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-canvas transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-muted">
                  {item.sector}
                </p>
                <h3 className="mt-3 text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-border py-4">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[1.35rem] font-semibold tracking-[-0.03em] text-ink">{m.value}</dt>
                      <dd className="mt-0.5 text-xs text-muted">{m.label}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-6 text-ink-2">{item.result}</p>
                <Link
                  href={`/case-studies#${item.id}`}
                  className="mt-6 inline-flex text-sm font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {t("storiesRead")}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <blockquote className="mt-8 overflow-hidden rounded-2xl border border-border bg-ink px-6 py-8 text-on-brand sm:px-10 sm:py-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
          <div>
            <p className="text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] sm:text-[1.5rem]">
              “{t("storiesQuote")}”
            </p>
            <footer className="mt-6">
              <p className="text-sm font-semibold">{t("storiesQuoteName")}</p>
              <p className="mt-1 text-sm text-on-brand/60">{t("storiesQuoteOrg")}</p>
            </footer>
            <Link
              href="/case-studies"
              className="mt-6 inline-flex text-sm font-semibold text-on-brand underline-offset-4 hover:underline"
            >
              {t("storiesWatch")}
            </Link>
          </div>
          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5 lg:mt-0 lg:block">
            <Image
              src="/assets/industries/oil-gas-v2.jpg"
              alt=""
              fill
              className="object-cover opacity-80"
              sizes="30vw"
            />
          </div>
        </blockquote>
      </div>
    </section>
  );
}

export function TrustSection() {
  const t = useTranslations("Home");

  return (
    <section className="border-b border-border bg-canvas" aria-label={t("trustTitle")}>
      <div className="mx-auto max-w-6xl px-4 section-y sm:px-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="af-kicker">{t("trustKicker")}</p>
          <h2 className="af-section-title mt-4">{t("trustTitle")}</h2>
          <p className="af-body mx-auto mt-5 max-w-2xl">{t("trustLede")}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <article
              key={i}
              className="flex flex-col rounded-2xl border border-border bg-bg p-7 shadow-[var(--shadow-sm)] sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {t(`trustPillar${i}Kicker` as "trustPillar0Kicker")}
              </p>
              <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">
                {t(`trustResearch${i}Title` as "trustResearch0Title")}
              </h3>
              <p className="mt-3 flex-1 text-[0.975rem] leading-7 text-ink-2">
                {t(`trustResearch${i}Text` as "trustResearch0Text")}
              </p>
              <Link
                href={i === 0 ? "/case-studies" : "/company"}
                className="mt-6 inline-flex text-sm font-semibold text-ink underline-offset-4 hover:underline"
              >
                {t(`trustResearch${i}Cta` as "trustResearch0Cta")}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-bg px-5 py-7 text-center shadow-[var(--shadow-sm)]"
            >
              <p className="text-[2rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2.25rem]">
                {t(`trustStat${i}` as "trustStat0")}
              </p>
              <p className="mt-2 text-[0.9375rem] text-ink-2">
                {t(`trustStat${i}Label` as "trustStat0Label")}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-bg px-5 py-8 sm:px-8">
          <h3 className="text-center text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">
            {t("securityTitle")}
          </h3>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-4"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eae2fc] text-signal">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden
                  >
                    <path
                      d="M12 3.5 5 6v5.5c0 4 3 7.3 7 9 4-1.7 7-5 7-9V6l-7-2.5Zm-2.5 8.5 2 2 4-4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-ink">
                  {t(`securityCert${i}` as "securityCert0")}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <Link
              href="/company"
              className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              {t("securityView")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
