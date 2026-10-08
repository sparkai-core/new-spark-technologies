import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/site/Logo";
import { SocialLinks } from "@/components/site/SocialLinks";
import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/lib/cms";
import { nav, solutions } from "@/lib/site";

const BRAND_SPARK_URL = "https://brandspark.ae";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tn = await getTranslations("Nav");
  const tm = await getTranslations("Modules");
  const tc = await getTranslations("HomeContent");
  const site = await getSiteConfig();

  const navLabel = (href: string) => {
    const map: Record<
      string,
      "solutions" | "products" | "industries" | "caseStudies" | "events" | "team" | "company"
    > = {
      "/solutions": "solutions",
      "/products": "products",
      "/industries": "industries",
      "/case-studies": "caseStudies",
      "/events": "events",
      "/team": "team",
      "/company": "company",
    };
    const key = map[href];
    return key ? tn(key) : href;
  };

  return (
    <footer className="dark-panel mt-4 rounded-none border-x-0 border-b-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{t("blurb")}</p>
          <SocialLinks links={site.socials} tone="dark" className="mt-5" />
          <p className="mt-5 text-sm text-white/70">{site.streetAddress}</p>
          <p className="text-sm text-white/55">
            {site.addressLocality}, {site.addressCountry}
          </p>
          <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/45">{t("markets")}</p>
          <p className="mt-3 text-sm text-white/55">{tc("hours")}</p>
          <a
            href={site.maps}
            className="mt-3 inline-block text-sm font-semibold text-white hover:text-white/80"
            rel="noreferrer"
          >
            {t("openMaps")}
          </a>
        </div>

        <div>
          <p className="type-kicker">{t("explore")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.primary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                  {navLabel(item.href)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                {t("contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-kicker">{t("solutions")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {solutions.slice(0, 5).map((s) => (
              <li key={s.id}>
                <Link href={`/solutions/${s.id}`} className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                  {tm(`${s.id}.short` as never)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/solutions" className="font-semibold text-white hover:text-white/80">
                {t("allModules")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-kicker">{t("ecosystem")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={site.sparkAiUrl} className="inline-flex min-h-11 items-center text-white/70 hover:text-white" rel="noreferrer">
                {tc("sparkAi")}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <Link href="/privacy" className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                {t("faq")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                {t("terms")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-24 pt-5 text-xs text-white/45 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:py-5">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href="/privacy" className="hover:text-white">
              {t("privacy")}
            </Link>
            <span aria-hidden>·</span>
            <Link href="/faq" className="hover:text-white">
              {t("faq")}
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="hover:text-white">
              {t("terms")}
            </Link>
            <span aria-hidden>·</span>
            <Link href="/contact" className="hover:text-white">
              {t("contact")}
            </Link>
          </p>
          <a
            href={BRAND_SPARK_URL}
            className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{t("poweredBy")}</span>
            <span className="inline-flex items-center rounded-md bg-white px-2.5 py-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/brand/brand-spark_logo-dark.png"
                alt={t("poweredByName")}
                width={140}
                height={36}
                className="h-5 w-auto"
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
