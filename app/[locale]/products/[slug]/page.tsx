import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getCt } from "@/i18n/content-server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { Section, SectionHeading } from "@/components/site/Section";
import { localizeProduct } from "@/lib/localize";
import { getProduct, products } from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const tp = await getTranslations("Products");
  const localized = localizeProduct(product, (k) => tp(k as never));
  return {
    title: localized.name,
    description: localized.lede,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations("Pages.products");
  const tp = await getTranslations("Products");
  const td = await getTranslations("Pages.productDetail");
  const p = localizeProduct(product, (k) => tp(k as never));
  const ct = await getCt();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-20 lg:items-start">
          <div>
            <p className="hero-kicker hero-kicker-ink">
              {p.n} · {p.kicker}
            </p>
            <h1 className="type-h1 mt-5 max-w-3xl text-balance">{p.headline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-2">{p.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                {p.cta}
              </Button>
              <Button href="/products" size="lg" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
          {p.image ? (
            <div className="relative aspect-[952/450] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg shadow-[var(--shadow-sm)]">
              <Image
                src={p.image}
                alt={ct.fmt("{name} product screenshot", { name: p.name })}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          ) : (
            <aside className="panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{td("whatChanges")}</p>
              <ul className="mt-4 grid gap-3">
                {p.outcomes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm font-semibold text-ink">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>

      {p.image ? (
        <Section label={td("whatChanges")}>
          <aside className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{td("whatChanges")}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {p.outcomes.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm font-semibold text-ink">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Section>
      ) : null}

      <Section label={td("featuresTitle")}>
        <SectionHeading kicker={p.kicker} title={td("featuresTitle")} />
        <ul className="mt-8 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map((feature) => (
            <li key={feature.title} className="border-t border-border pt-5">
              <h3 className="text-base font-bold tracking-tight text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{feature.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label={td("pathTitle")} className="border-y border-border bg-surface">
        <SectionHeading kicker={td("pathKicker")} title={td("pathTitle")} />
        <ol className="mt-8 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-brand/25 pt-5">
              <span className="font-mono text-xs font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title={t("ctaBandTitle")}
        text={t("ctaBandText")}
        primary={{ href: "/contact", label: p.cta }}
        secondary={{ href: "/products", label: t("openProduct") }}
      />
    </>
  );
}
