import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { CtaBand, PageHero } from "@/components/site/CtaBand";
import { OfficeCard } from "@/components/site/OfficeCard";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { localizeCaseStudies } from "@/lib/localize";

export async function generateMetadata() {
  const t = await getTranslations("Pages.caseStudies");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CaseStudiesPage() {
  const t = await getTranslations("Pages.caseStudies");
  const tu = await getTranslations("Ui");
  const tc = await getTranslations("CaseStudies");
  const localized = localizeCaseStudies((k) => tc(k as never));

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lede={t("lede")}>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg">
            {t("ctaPrimary")}
          </Button>
          <Button href="/solutions" size="lg" variant="outline">
            {t("ctaSecondary")}
          </Button>
        </div>
      </PageHero>

      <Section label={tu("sectionEngagements")}>
        <SectionHeading kicker={t("provenKicker")} title={t("provenTitle")} lede={t("provenLede")} />
        <div className="mt-10 grid gap-8">
          {localized.map((item, i) => {
            const gallery =
              "images" in item && Array.isArray(item.images) ? item.images : null;

            return (
              <Reveal key={item.id} delay={i * 70}>
                <article id={item.id} className="panel scroll-mt-28 overflow-hidden">
                  {gallery ? (
                    <>
                      <div className="border-b border-border bg-surface/40">
                        <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-[1.35fr_0.9fr]">
                          <div className="relative min-h-[16rem] overflow-hidden rounded-xl sm:min-h-[20rem] lg:min-h-[24rem]">
                            <Image
                              src={gallery[0].src}
                              alt={gallery[0].alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              priority={i === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <p className="type-kicker text-white/85">{item.sector}</p>
                              <p className="mt-1 text-lg font-semibold text-white drop-shadow-sm">
                                {item.client}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 lg:grid-rows-3">
                            {gallery.slice(1).map((photo, idx) => (
                              <div
                                key={photo.src}
                                className={`relative overflow-hidden rounded-xl ${
                                  idx === 2
                                    ? "col-span-2 min-h-[9rem] sm:col-span-1 lg:col-span-2 lg:min-h-[11rem]"
                                    : "min-h-[8rem] sm:min-h-[9rem]"
                                }`}
                              >
                                <Image
                                  src={photo.src}
                                  alt={photo.alt}
                                  fill
                                  className="object-cover transition duration-500 hover:scale-[1.03]"
                                  sizes="(max-width: 1024px) 50vw, 25vw"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t border-border px-5 py-4 sm:px-6">
                          <p className="type-kicker">{t("galleryKicker")}</p>
                          <h3 className="mt-1 text-base font-semibold tracking-tight text-ink">
                            {t("galleryTitle")}
                          </h3>
                          <p className="mt-1 max-w-3xl text-sm leading-6 text-ink-2">{t("galleryLede")}</p>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <h2 className="type-h3 text-xl">{item.title}</h2>
                        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                          <div>
                            <dt className="text-muted">{t("problem")}</dt>
                            <dd className="mt-1 text-ink-2">{item.problem}</dd>
                          </div>
                          <div>
                            <dt className="text-muted">{t("approach")}</dt>
                            <dd className="mt-1 text-ink-2">{item.approach}</dd>
                          </div>
                          <div>
                            <dt className="text-muted">{t("result")}</dt>
                            <dd className="mt-1 font-semibold text-ink">{item.result}</dd>
                          </div>
                        </dl>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {item.outcomes.map((row) => (
                            <li
                              key={row}
                              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-2"
                            >
                              {row}
                            </li>
                          ))}
                        </ul>
                        <Button href="/contact" size="sm" className="mt-6">
                          {t("discuss")}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="md:grid md:grid-cols-[0.9fr_1.1fr]">
                      <div className="relative min-h-[14rem]">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="type-kicker text-white/85">{item.sector}</p>
                          <p className="mt-1 text-sm font-semibold text-white drop-shadow-sm">
                            {item.client}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <h2 className="type-h3 text-xl">{item.title}</h2>
                        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                          <div>
                            <dt className="text-muted">{t("problem")}</dt>
                            <dd className="mt-1 text-ink-2">{item.problem}</dd>
                          </div>
                          <div>
                            <dt className="text-muted">{t("approach")}</dt>
                            <dd className="mt-1 text-ink-2">{item.approach}</dd>
                          </div>
                          <div>
                            <dt className="text-muted">{t("result")}</dt>
                            <dd className="mt-1 font-semibold text-ink">{item.result}</dd>
                          </div>
                        </dl>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {item.outcomes.map((row) => (
                            <li
                              key={row}
                              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-2"
                            >
                              {row}
                            </li>
                          ))}
                        </ul>
                        <Button href="/contact" size="sm" className="mt-6">
                          {t("discuss")}
                        </Button>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section label={tu("sectionOffice")} className="border-t border-border bg-surface">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading kicker={t("hqKicker")} title={t("hqTitle")} lede={t("hqLede")} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                {t("scheduleDemo")}
              </Button>
              <Button href="/industries" size="lg" variant="outline">
                {t("browseIndustries")}
              </Button>
            </div>
          </div>
          <OfficeCard />
        </div>
      </Section>

      <CtaBand
        title={t("ctaBandTitle")}
        text={t("ctaBandText")}
        secondary={{ href: "/solutions", label: t("viewSolutions") }}
      />
    </>
  );
}
