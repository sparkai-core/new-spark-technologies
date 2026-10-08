import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { BusinessProfile } from "@/components/site/BusinessProfile";
import { CtaBand, PageHero } from "@/components/site/CtaBand";
import { OfficeCard } from "@/components/site/OfficeCard";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteConfig } from "@/lib/cms";
import { company, site as brandDefaults } from "@/lib/site";

export async function generateMetadata() {
  const t = await getTranslations("Pages.company");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CompanyPage() {
  const t = await getTranslations("Pages.company");
  const tc = await getTranslations("HomeContent");
  const tu = await getTranslations("Ui");
  const to = await getTranslations("Pages.office");
  const site = await getSiteConfig();

  const focusCards = [
    {
      title: t("solutionsTitle"),
      text: t("solutionsText"),
      href: "/solutions",
      label: t("solutionsCta"),
    },
    {
      title: t("industriesTitle"),
      text: t("industriesText"),
      href: "/industries",
      label: t("industriesCta"),
    },
    {
      title: t("casesTitle"),
      text: t("casesText"),
      href: "/case-studies",
      label: t("casesCta"),
    },
  ];

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: brandDefaults.legalName,
    url: site.url,
    email: site.email,
    telephone: [site.phoneHref.replace("tel:", "+"), site.mobileHref.replace("tel:", "+")],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.addressLocality,
      addressCountry: site.addressCountry,
    },
    parentOrganization: {
      "@type": "Organization",
      name: brandDefaults.parentBrand,
      legalName: brandDefaults.legalName,
      url: brandDefaults.parentUrl,
    },
    sameAs: site.socials.map((item) => item.href),
    hasMap: site.maps,
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <PageHero kicker={t("kicker")} title={t("title")} lede={t("lede")}>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg">
            {t("requestBriefing")}
          </Button>
          <Button href="/case-studies" size="lg" variant="outline">
            {t("viewCases")}
          </Button>
          <Button href="/team" size="lg" variant="outline">
            {t("meetTeam")}
          </Button>
          <Button href="/events" size="lg" variant="outline">
            {t("events")}
          </Button>
        </div>
      </PageHero>

      <Section label={tu("sectionAbout")}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading kicker={t("aboutKicker")} title={t("aboutTitle")} />
            <div className="mt-6 space-y-4 text-sm leading-7 text-ink-2">
              <p>{t("storyP1")}</p>
              <p>{t("storyP2")}</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {company.points.map((_, i) => (
                <Reveal key={i} delay={i * 80}>
                  <article className="panel h-full p-6">
                    <h3 className="type-h3">{tc(`point${i}Title` as "point0Title")}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink-2">{tc(`point${i}Text` as "point0Text")}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          <BusinessProfile
            title={t("profileTitle")}
            badge={t("profileBadge")}
            legalLabel={t("legalLabel")}
            addressLabel={t("addressLabel")}
            phoneLabel={t("phoneLabel")}
            emailLabel={t("emailLabel")}
            hoursLabel={t("hoursLabel")}
            marketsLabel={t("marketsLabel")}
            markets={t("markets")}
            parentLabel={t("parentLabel")}
            mapsLabel={t("mapsLabel")}
            contactLabel={t("contactLabel")}
          />
        </div>
      </Section>

      <Section label={tu("sectionFocus")} className="border-y border-border bg-surface">
        <SectionHeading kicker={t("focusKicker")} title={t("focusTitle")} lede={t("focusLede")} />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {focusCards.map((item) => (
            <article key={item.title} className="panel p-6">
              <h3 className="type-h3">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{item.text}</p>
              <Button href={item.href} size="sm" variant="outline" className="mt-5">
                {item.label}
              </Button>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading kicker={t("ecosystemKicker")} title={t("ecosystemTitle")} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="panel p-6">
            <h3 className="type-h3">Spark AI</h3>
            <p className="mt-2 text-sm leading-6 text-ink-2">{t("ecosystemSparkAi")}</p>
            <a href={site.sparkAiUrl} className="mt-4 inline-flex text-sm font-semibold text-brand hover:text-brand-hover" rel="noreferrer">
              {t("visitSparkAi")} →
            </a>
          </article>
          <article className="panel p-6">
            <h3 className="type-h3">{site.parentBrand}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-2">{t("ecosystemParent")}</p>
            <a href={site.parentUrl} className="mt-4 inline-flex text-sm font-semibold text-brand hover:text-brand-hover" rel="noreferrer">
              {t("visitParent")} →
            </a>
          </article>
        </div>
      </Section>

      <Section label={tu("sectionOffice")}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading kicker={t("hqKicker")} title={t("hqTitle")} lede={t("hqLede")} />
            <p className="mt-4 text-sm leading-6 text-ink-2">
              {t("preferRemote", { email: site.email, phone: site.phone })}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                {t("bookOffice")}
              </Button>
              <Button href={site.maps} size="lg" variant="outline">
                {to("openMaps")}
              </Button>
            </div>
          </div>
          <OfficeCard />
        </div>
      </Section>

      <CtaBand
        title={t("ctaBandTitle")}
        text={t("ctaBandText")}
        secondary={{ href: "/solutions", label: t("solutionsCta") }}
      />
    </>
  );
}
