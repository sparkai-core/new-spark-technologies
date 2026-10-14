import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCt } from "@/i18n/content-server";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/site/CtaBand";
import { OfficeCard } from "@/components/site/OfficeCard";
import { SocialLinks } from "@/components/site/SocialLinks";
import { Section } from "@/components/site/Section";
import { getSiteConfig } from "@/lib/cms";
import { solutions } from "@/lib/site";
import { products } from "@/lib/products";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const tm = await getTranslations("Modules");
  const tp = await getTranslations("Products");
  const tu = await getTranslations("Ui");
  const site = await getSiteConfig();
  const ct = await getCt();

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("pageTitle")} lede={t("pageLede")}>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={`mailto:${site.email}`} size="lg" className="w-full whitespace-normal sm:w-auto">
            {t("emailCta", { email: site.email })}
          </Button>
          <Button href={site.phoneHref} size="lg" variant="outline" className="w-full whitespace-normal sm:w-auto">
            {t("callCta", { phone: site.phone })}
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <OfficeCard />
            <div className="panel p-6">
              <p className="type-kicker">{t("follow")}</p>
              <SocialLinks links={site.socials} className="mt-4" />
            </div>
            <div className="panel p-6">
              <p className="type-kicker">{t("popularModules")}</p>
              <ul className="mt-4 space-y-2">
                {solutions.slice(0, 4).map((s) => (
                  <li key={s.id}>
                    <a href={`/solutions/${s.id}`} className="text-sm font-medium text-ink-2 hover:text-brand">
                      {s.n} · {tm(`${s.id}.short` as never)}
                    </a>
                  </li>
                ))}
              </ul>
              <Button href="/solutions" size="sm" variant="outline" className="mt-5">
                {t("allSolutions")}
              </Button>
            </div>
            <div className="panel p-6">
              <p className="type-kicker">{t("popularProducts")}</p>
              <ul className="mt-4 space-y-2">
                {products.slice(0, 4).map((p) => (
                  <li key={p.slug}>
                    <a href={p.href} className="text-sm font-medium text-ink-2 hover:text-brand">
                      {p.n} · {tp(`${p.slug}.name` as never)}
                    </a>
                  </li>
                ))}
              </ul>
              <Button href="/products" size="sm" variant="outline" className="mt-5">
                {t("allProducts")}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <LeadForm
              moduleOptions={solutions.map((s) => ({
                id: s.id,
                label: tm(`${s.id}.short` as never),
              }))}
              productOptions={products.map((p) => ({
                id: p.slug,
                label: tp(`${p.slug}.name` as never),
              }))}
              industryBriefingLabel={tu("industryBriefing")}
              notSureLabel={tu("notSureYet")}
            />
            <p className="px-1 text-xs text-muted">
              {t("directNote", { email: site.email, address: ct(site.address) })}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
