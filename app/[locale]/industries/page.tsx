import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { IndustriesExplorer } from "@/components/industries/IndustriesExplorer";
import { OfficeCard } from "@/components/site/OfficeCard";
import { Section, SectionHeading } from "@/components/site/Section";
import { media } from "@/lib/site";

export async function generateMetadata() {
  const t = await getTranslations("Pages.industries");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function IndustriesPage() {
  const t = await getTranslations("Pages.industries");

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={media.platform}
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

      <IndustriesExplorer />

      <Section label="Office" className="border-t border-border bg-surface">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading kicker={t("nextKicker")} title={t("nextTitle")} lede={t("nextLede")} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                {t("requestBriefing")}
              </Button>
              <Button href="/solutions" size="lg" variant="outline">
                {t("exploreSolutions")}
              </Button>
            </div>
          </div>
          <OfficeCard />
        </div>
      </Section>
    </>
  );
}
