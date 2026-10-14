import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getCt } from "@/i18n/content-server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { localizeProducts } from "@/lib/localize";

export async function generateMetadata() {
  const t = await getTranslations("Pages.products");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProductsPage() {
  const t = await getTranslations("Pages.products");
  const tp = await getTranslations("Products");
  const localized = localizeProducts((k) => tp(k as never));
  const ct = await getCt();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="hero-kicker hero-kicker-ink">{t("kicker")}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-balance">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-2">{t("lede")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              {t("ctaPrimary")}
            </Button>
            <Button href="/solutions" size="lg" variant="outline" className="w-full sm:w-auto">
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </section>

      <Section label={t("catalogKicker")}>
        <SectionHeading kicker={t("catalogKicker")} title={t("catalogTitle")} lede={t("catalogLede")} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {localized.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 4) * 50}>
              <li>
                <Link
                  href={product.href}
                  className="panel lift group relative z-10 flex h-full flex-col overflow-hidden p-0 hover:border-border-strong"
                >
                {product.image ? (
                  <div className="relative aspect-[952/450] border-b border-border bg-surface">
                    <Image
                      src={product.image}
                      alt={ct.fmt("{name} product screenshot", { name: product.name })}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs text-brand">
                    {product.n} · {product.kicker}
                  </p>
                  <h2 className="type-h3 mt-2 text-xl">{product.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-ink-2">{product.lede}</p>
                  <ul className="mt-4 grid gap-1.5">
                    {product.outcomes.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2 text-sm font-medium text-ink">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-brand">
                    {t("openProduct")}
                    <span aria-hidden className="rtl:-scale-x-100">
                      →
                    </span>
                  </span>
                </div>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={t("ctaBandTitle")}
        text={t("ctaBandText")}
        secondary={{ href: "/solutions", label: t("compareSolutions") }}
      />
    </>
  );
}
