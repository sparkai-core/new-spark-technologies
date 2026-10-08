import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { OfficeCard } from "@/components/site/OfficeCard";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { localizeModules } from "@/lib/localize";
import { media, platformLayers } from "@/lib/site";

export async function generateMetadata() {
  const t = await getTranslations("Pages.solutions");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function SolutionsPage() {
  const t = await getTranslations("Pages.solutions");
  const th = await getTranslations("Home");
  const tu = await getTranslations("Ui");
  const tm = await getTranslations("Modules");
  const localized = localizeModules((k) => tm(k as never));

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={media.powerlineBanner}
            alt=""
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d14] via-[#0b0d14]/88 to-[#0b0d14]/55" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="hero-kicker">{t("kicker")}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-balance text-white">{t("title")}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">{t("lede")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" size="lg" variant="light" className="w-full sm:w-auto">
              {t("ctaPrimary")}
            </Button>
            <Button
              href="/case-studies"
              size="lg"
              variant="outline"
              className="w-full border-white/35 bg-transparent text-white hover:bg-white/10 sm:w-auto"
            >
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </section>

      <Section label={tu("sectionModules")}>
        <SectionHeading
          kicker={t("modulesKicker")}
          title={t("modulesTitle")}
          lede={t("modulesLede")}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {localized.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 60}>
              <article className="solution-card panel overflow-hidden">
                <div className="relative aspect-[16/10] bg-surface">
                  <Image
                    src={item.image}
                    alt={item.short}
                    fill
                    className="object-contain object-top p-1.5"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <p className="font-mono text-xs text-muted">{item.n}</p>
                  <h2 className="mt-1 text-lg font-bold text-ink">{item.short}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{item.tagline}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {t("painPoints")}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {item.painPoints.slice(0, 2).map((row) => (
                          <li key={row} className="flex gap-2 text-xs leading-5 text-ink-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#b42318]" />
                            {row}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {t("weDeliver")}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {item.solutions.slice(0, 2).map((row) => (
                          <li key={row} className="flex gap-2 text-xs leading-5 text-ink-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                            {row}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button href={`/solutions/${item.id}`} size="sm">
                      {t("fullBrief")}
                    </Button>
                    <Link
                      href={`/solutions/${item.id}#flow`}
                      className="text-sm font-semibold text-brand hover:text-brand-hover"
                    >
                      {t("seeFlow")}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label={tu("sectionPlatform")} className="border-y border-border bg-surface">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              kicker={t("platformKicker")}
              title={t("platformTitle")}
              lede={t("platformLede")}
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {platformLayers.map((layer, i) => (
                <article key={layer.title} className="panel p-4">
                  <h3 className="type-h3 text-base">{th(`layer${i}Title` as "layer0Title")}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{th(`layer${i}Text` as "layer0Text")}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative min-h-[20rem] overflow-hidden rounded-lg border border-border">
            <Image
              src={media.opsTech}
              alt={t("platformAlt")}
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        </div>
      </Section>

      <Section label={tu("sectionOfficeCta")}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <SectionHeading kicker={t("nextKicker")} title={t("nextTitle")} lede={t("nextLede")} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                {t("ctaPrimary")}
              </Button>
              <Button href="/case-studies" size="lg" variant="outline">
                {t("seeCases")}
              </Button>
            </div>
          </div>
          <OfficeCard />
        </div>
      </Section>

      <CtaBand
        title={t("ctaBandTitle")}
        text={t("ctaBandText")}
        secondary={{ href: "/industries", label: t("browseIndustries") }}
      />
    </>
  );
}
