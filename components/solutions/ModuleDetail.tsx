import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { OfficeCard } from "@/components/site/OfficeCard";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { FlowChart } from "@/components/solutions/FlowChart";
import { localizeModule, localizeModules } from "@/lib/localize";
import { type SolutionModule } from "@/lib/modules";

export const ModuleDetail = async ({ module }: { module: SolutionModule }) => {
  const t = await getTranslations("Pages.moduleDetail");
  const tm = await getTranslations("Modules");
  const localized = localizeModule(module, (k) => tm(k as never));
  const others = localizeModules((k) => tm(k as never))
    .filter((m) => m.id !== module.id)
    .slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={localized.image}
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d14]/95 via-[#0b0d14]/78 to-[#0b0d14]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14]/70 via-transparent to-[#0b0d14]/25" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="hero-kicker">{t("moduleKicker", { n: localized.n })}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-balance text-white">{localized.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{localized.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" size="lg" variant="light" className="w-full sm:w-auto">
              {t("briefModule")}
            </Button>
            <Button
              href="/solutions"
              size="lg"
              variant="outline"
              className="w-full border-white/35 bg-transparent text-white hover:bg-white/10 sm:w-auto"
            >
              {t("allModules")}
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {localized.industries.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section label={t("overview")}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              kicker={t("overview")}
              title={t("overviewTitle")}
              lede={localized.text}
            />
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {localized.outcomes.map((row) => (
                <div key={row} className="panel p-4">
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">{t("outcome")}</dt>
                  <dd className="mt-2 text-sm font-semibold leading-6 text-ink">{row}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[18rem] overflow-hidden rounded-xl border border-border bg-[#eef2f7] shadow-[var(--shadow-md)] lg:min-h-[22rem]">
            <Image
              src={localized.image}
              alt={localized.short}
              fill
              className="object-contain object-top p-2"
              sizes="40vw"
            />
          </div>
        </div>
      </Section>

      <Section label={t("painSection")} className="border-y border-border bg-surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="panel h-full p-6 md:p-7">
              <p className="type-kicker">{t("painPoints")}</p>
              <h2 className="type-h3 mt-2 text-xl">{t("painTitle")}</h2>
              <ul className="mt-5 space-y-3">
                {localized.painPoints.map((row) => (
                  <li key={row} className="flex gap-3 text-sm leading-6 text-ink-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b42318]" />
                    {row}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="panel h-full p-6 md:p-7">
              <p className="type-kicker">{t("approach")}</p>
              <h2 className="type-h3 mt-2 text-xl">{t("approachTitle")}</h2>
              <ul className="mt-5 space-y-3">
                {localized.solutions.map((row) => (
                  <li key={row} className="flex gap-3 text-sm leading-6 text-ink-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {row}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Section>

      <Section id="flow" label={t("flow")} className="scroll-mt-28">
        <SectionHeading
          kicker={t("operatingModel")}
          title={t("howItWorks")}
          lede={t("howItWorksLede")}
        />
        <div className="mt-8">
          <FlowChart steps={localized.flow} title={t("workflowTitle", { name: localized.short })} />
        </div>
      </Section>

      <Section label={t("next")} className="border-t border-border bg-surface">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              kicker={t("nextStep")}
              title={t("pilotTitle")}
              lede={t("pilotLede")}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                {t("requestBriefing")}
              </Button>
              <Button href="/case-studies" size="lg" variant="outline">
                {t("related")}
              </Button>
            </div>
            <div className="mt-10">
              <p className="type-kicker">{t("moreModules")}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {others.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/solutions/${item.id}`}
                      className="solution-card panel block p-4 hover:border-border-strong"
                    >
                      <span className="font-mono text-[11px] text-brand">{item.n}</span>
                      <span className="mt-1 block text-sm font-semibold text-ink">{item.short}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <OfficeCard />
        </div>
      </Section>

      <CtaBand
        title={t("readyDeploy", { name: localized.short })}
        text={t("readyText")}
        secondary={{ href: "/solutions", label: t("browseModules") }}
      />
    </>
  );
};
