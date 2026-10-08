import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { OfficeCard } from "@/components/site/OfficeCard";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeading } from "@/components/site/Section";
import { eventShowcase } from "@/lib/events";
import { localizeEvents, localizeModules } from "@/lib/localize";

export async function generateMetadata() {
  const t = await getTranslations("Pages.events");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function EventsPage() {
  const t = await getTranslations("Pages.events");
  const te = await getTranslations("Events");
  const tu = await getTranslations("Ui");
  const tm = await getTranslations("Modules");
  const localizedEvents = localizeEvents((k) => te(k as never));
  const localizedModules = localizeModules((k) => tm(k as never));
  const past = localizedEvents.filter((e) => e.status === "past");
  const upcoming = localizedEvents.filter((e) => e.status === "upcoming");
  const featured = past[0];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src="/assets/events/events-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d14] via-[#0b0d14]/90 to-[#0b0d14]/55" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="hero-kicker">{t("kicker")}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-balance text-white">{t("title")}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">{t("lede")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" size="lg" variant="light" className="w-full sm:w-auto">
              {t("bookBooth")}
            </Button>
            <Button
              href="/solutions"
              size="lg"
              variant="outline"
              className="w-full border-white/35 bg-transparent text-white hover:bg-white/10 sm:w-auto"
            >
              {t("exploreModules")}
            </Button>
          </div>
        </div>
      </section>

      {featured && (
        <Section label={tu("sectionFeatured")}>
          <SectionHeading
            kicker={t("highlightKicker")}
            title={featured.shortName}
            lede={`${featured.role} · ${featured.city}, ${featured.country} · ${featured.year}`}
          />
          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[16rem] lg:min-h-full">
                <Image
                  src={featured.image}
                  alt={`${featured.name} — ${featured.city}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    {featured.role}
                  </span>
                </div>
              </div>
              <div className="bg-bg p-6 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-2">
                    {featured.role}
                  </span>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-2">
                    {featured.city}, {featured.country}
                  </span>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-2">
                    {featured.year}
                  </span>
                </div>
                <h2 className="type-h3 mt-5 text-2xl">{featured.name}</h2>
                <p className="mt-4 text-sm leading-7 text-ink-2 md:text-base">{featured.summary}</p>
                <ul className="mt-6 space-y-2.5">
                  {featured.focus.map((row) => (
                    <li key={row} className="flex gap-3 text-sm leading-6 text-ink-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {row}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <p className="type-kicker">{t("modulesOnFloor")}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {featured.modules.map((id) => {
                      const mod = localizedModules.find((m) => m.id === id);
                      if (!mod) return null;
                      return (
                        <li key={id}>
                          <Link
                            href={`/solutions/${id}`}
                            className="inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:border-brand hover:text-brand"
                          >
                            {mod.short}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact">{t("similarBriefing")}</Button>
                  <Button href="/solutions" variant="outline">
                    {t("viewAllModules")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section label={tu("sectionOnFloor")} className="border-y border-border bg-surface">
        <SectionHeading kicker={t("showUpKicker")} title={t("showUpTitle")} lede={t("showUpLede")} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {eventShowcase.map((_, i) => (
            <Reveal key={i} delay={i * 70}>
              <article className="panel h-full p-6">
                <p className="font-mono text-xs text-muted">0{i + 1}</p>
                <h3 className="mt-3 text-lg font-bold text-ink">
                  {te(`showcase.s${i}Title` as "showcase.s0Title")}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-2">
                  {te(`showcase.s${i}Text` as "showcase.s0Text")}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {upcoming.length > 0 && (
        <Section label={tu("sectionUpcoming")}>
          <SectionHeading kicker={t("nextKicker")} title={t("nextTitle")} lede={t("nextLede")} />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {upcoming.map((item, i) => (
              <Reveal key={item.id} delay={i * 60}>
                <article className="panel overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="50vw" />
                  </div>
                  <div className="p-6">
                    <p className="type-kicker">
                      {item.city} · {item.year}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
                    <p className="mt-3 text-sm text-ink-2">{item.summary}</p>
                    <Button href="/contact" className="mt-5" size="sm">
                      {t("bookMeeting")}
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {past.length > 1 && (
        <Section label={tu("sectionPast")}>
          <SectionHeading kicker={t("archiveKicker")} title={t("archiveTitle")} />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {past.slice(1).map((item, i) => (
              <Reveal key={item.id} delay={i * 60}>
                <article className="panel p-6">
                  <p className="type-kicker">
                    {item.role} · {item.year}
                  </p>
                  <h3 className="mt-2 text-lg font-bold">{item.shortName}</h3>
                  <p className="mt-3 text-sm text-ink-2">{item.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section label={tu("sectionInvite")}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-6 md:p-8">
            <p className="type-kicker">{t("inviteKicker")}</p>
            <h2 className="type-h3 mt-2 text-xl">{t("inviteTitle")}</h2>
            <p className="mt-4 text-sm leading-7 text-ink-2">{t("inviteLede")}</p>
            <Button href="/contact" className="mt-6">
              {t("propose")}
            </Button>
          </div>
          <OfficeCard />
        </div>
      </Section>

      <CtaBand
        title={t("ctaBandTitle")}
        text={t("ctaBandText")}
        primary={{ href: "/contact", label: t("scheduleDemo") }}
        secondary={{ href: "/case-studies", label: t("viewCases") }}
      />
    </>
  );
}
