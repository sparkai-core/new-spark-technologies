import { getTranslations } from "next-intl/server";
import { getCt } from "@/i18n/content-server";
import Image from "next/image";
import { TeamRoster } from "@/components/site/TeamRoster";
import { Link } from "@/i18n/navigation";
import { getTeamConfig } from "@/lib/cms";

export async function generateMetadata() {
  const t = await getTranslations("Team");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

function personId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function LeadershipCard({
  person,
  sidebarTitle,
  sidebarItems,
  reverse = false,
  priority = false,
}: {
  person: {
    name: string;
    role: string;
    bio: string;
    photo: string;
    position: string;
    tags: readonly string[];
    quote?: string;
  };
  sidebarTitle: string;
  sidebarItems: readonly string[];
  reverse?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`grid gap-6 lg:gap-8 ${
        reverse
          ? "lg:grid-cols-[minmax(0,13rem)_1fr_minmax(0,17rem)]"
          : "lg:grid-cols-[minmax(0,17rem)_1fr_minmax(0,13rem)]"
      }`}
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-surface sm:aspect-[3/4] lg:aspect-auto lg:min-h-[22rem] ${
          reverse ? "lg:order-3" : ""
        }`}
      >
        <Image
          src={person.photo}
          alt={person.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 272px, 90vw"
          className="object-cover"
          style={{ objectPosition: person.position }}
        />
      </div>

      <div className={`flex flex-col justify-center ${reverse ? "lg:order-2" : ""}`}>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-signal">{person.role}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{person.name}</h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-ink-2 sm:text-[0.95rem]">{person.bio}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {person.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-border bg-surface px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink-2"
            >
              {tag}
            </li>
          ))}
        </ul>
        {person.quote ? (
          <blockquote className="mt-8 border-s-2 border-signal ps-4 font-serif text-xl italic leading-snug text-ink sm:text-2xl">
            “{person.quote}”
          </blockquote>
        ) : null}
      </div>

      <div className={`panel p-5 ${reverse ? "lg:order-1" : ""}`}>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{sidebarTitle}</p>
        <ol className="mt-5 space-y-3.5">
          {sidebarItems.map((item, i) => (
            <li key={`${i}-${item}`} className="flex items-baseline gap-3">
              <span className="font-mono text-[0.65rem] text-signal">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium text-ink">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default async function TeamPage() {
  const t = await getTranslations("Team");
  const tc = await getTranslations("TeamContent");
  const team = await getTeamConfig();
  const ct = await getCt();

  type Person = {
    name: string;
    role: string;
    bio: string;
    photo: string;
    position: string;
    location: string;
    group: string;
    tags: readonly string[];
    quote?: string;
    focus?: readonly string[];
    scale?: number;
  };

  const localizePerson = (p: Person): Person => {
    if (team.sourcedFromCms) return p;
    const id = personId(p.name);
    return {
      ...p,
      role: tc(`${id}Role` as "jay-larikRole"),
      bio: tc(`${id}Bio` as "jay-larikBio"),
      location: tc(`${id}Location` as "jay-larikLocation"),
      group: tc(`${id}Group` as "jay-larikGroup"),
      tags: p.tags.map((_, i) => tc(`${id}Tag${i}` as "jay-larikTag0")),
      quote: p.quote ? tc(`${id}Quote` as "jay-larikQuote") : undefined,
      focus: Array.isArray(p.focus)
        ? p.focus.map((_, i) => tc(`${id}Focus${i}` as "jahanzaib-chandioFocus0"))
        : undefined,
    };
  };

  const leadership = team.leadership.map(localizePerson);
  const delivery = team.delivery.map(localizePerson);

  const principles = team.sourcedFromCms
    ? team.principles
    : team.principles.map((_, i) => tc(`principle${i}` as "principle0"));
  const locations = team.sourcedFromCms
    ? team.locations.active
    : team.locations.active.map((_, i) => tc(`locActive${i}` as "locActive0"));

  const stats = team.stats.length
    ? team.stats.map((stat) => ({ ...stat, label: ct(stat.label) }))
    : [
        { value: "45+", label: t("stats.members") },
        { value: "6", label: t("stats.countries") },
        { value: "8", label: t("stats.disciplines") },
        { value: "1", label: t("stats.mission") },
      ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_0%,color-mix(in_srgb,var(--signal)_10%,transparent),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 section-y sm:px-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
          <div>
            <h1 className="max-w-xl text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.1rem] lg:text-[3.4rem]">
              {t("headlineBefore")}{" "}
              <em className="font-serif font-normal italic text-ink">{t("headlineSerif")}</em>
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-ink-2 sm:text-[1.05rem]">{t("lede")}</p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t border-border pt-3">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="relative overflow-hidden rounded-2xl border border-border bg-bg p-5 shadow-[var(--shadow-md)] sm:p-6">
            <p className="relative font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              {t("globalTeam")}
            </p>
            <ul className="relative mt-5 space-y-2.5">
              {locations.map((place) => (
                <li key={place} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                  <span className="h-2 w-2 rounded-full bg-signal" aria-hidden />
                  {place}
                </li>
              ))}
            </ul>
            <p className="relative mt-6 text-[0.7rem] leading-5 text-muted">{t("globalNote")}</p>
          </aside>
        </div>
      </section>

      <section className="border-b border-border" aria-label={t("leadership")}>
        <div className="mx-auto max-w-6xl space-y-14 px-4 section-y sm:px-5 lg:space-y-16">
          {leadership.map((person, index) => (
            <LeadershipCard
              key={person.name}
              person={person}
              sidebarTitle={index === 0 ? t("principles") : t("focusAreas")}
              sidebarItems={index === 0 ? principles : person.focus ?? []}
              reverse={index % 2 === 1}
              priority={index === 0}
            />
          ))}
        </div>
      </section>

      <TeamRoster
        members={delivery.map((m) => ({
          name: m.name,
          role: m.role,
          bio: m.bio,
          photo: m.photo,
          position: m.position,
          scale: m.scale,
          location: m.location,
          group: m.group,
          tags: [...m.tags],
        }))}
        labels={{
          ourTeam: t("ourTeam"),
          featured: t("featured"),
          plusOrg: t("plusOrg"),
          plusOrgText: t("plusOrgText"),
          roles: [t("roles.bd"), t("roles.developers"), t("roles.ml"), t("roles.managers")],
        }}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5">
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-10 text-on-brand sm:px-10 sm:py-12">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-on-brand/50">{t("ctaKicker")}</p>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">{t("ctaTitle")}</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-on-brand/70">{t("ctaText")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-md bg-signal px-5 text-sm font-semibold text-white hover:bg-signal/90"
              >
                {t("ctaPrimary")}
              </Link>
              <Link
                href="/company"
                className="inline-flex h-11 items-center rounded-md border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
