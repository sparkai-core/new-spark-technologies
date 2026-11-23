import Image from "next/image";
import { useLocale } from "next-intl";
import { ctFor } from "@/i18n/content-server";

export type TeamMemberCard = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  position: string;
  scale?: number;
  location: string;
  group: string;
  tags: readonly string[];
};

type RosterLabels = {
  ourTeam: string;
  featured: string;
  plusOrg: string;
  plusOrgText: string;
  roles: string[];
  widerTeam?: string;
};

export function TeamRoster({
  members,
  wider = [],
  labels,
}: {
  members: TeamMemberCard[];
  wider?: readonly { name: string; photo: string; role?: string }[];
  labels?: RosterLabels;
}) {
  const ct = ctFor(useLocale());
  const copy = labels ?? ct.deep({
    ourTeam: "Our team",
    featured: "Featured specialists",
    plusOrg: "Plus 45+ employees across the organisation",
    plusOrgText: "Business development, developers, ML engineers, and managers supporting every engagement.",
    roles: ["Business Development", "Developers", "ML Engineers", "Managers"],
  });

  return (
    <section className="border-b border-border" aria-label={copy.ourTeam}>
      <div className="mx-auto max-w-6xl px-4 section-y sm:px-5">
        <div>
          <p className="type-kicker">{copy.ourTeam}</p>
          <h2 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.025em] text-ink sm:text-[1.85rem]">
            {copy.featured}
          </h2>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {members.map((person) => (
            <li
              key={person.name}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-bg transition-[border-color,box-shadow] duration-300 hover:border-signal/30 hover:shadow-[var(--shadow-md)]"
            >
              <div className="relative h-44 w-full overflow-hidden bg-[#4f46e5] sm:h-48">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(min-width: 1280px) 180px, (min-width: 640px) 30vw, 45vw"
                  className="object-cover"
                  style={{
                    objectPosition: person.position,
                    transform: person.scale ? `scale(${person.scale})` : undefined,
                    transformOrigin: "center top",
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col p-3">
                {person.location ? (
                  <p className="mb-1.5 flex items-center gap-1.5 text-[0.6rem] font-medium text-ink-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
                    {person.location}
                  </p>
                ) : null}
                <h3 className="text-[0.8rem] font-semibold leading-snug tracking-tight text-ink">
                  {person.name}
                </h3>
                <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">{person.role}</p>
                <ul className="mt-2.5 flex flex-wrap gap-1">
                  {person.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.06em] text-ink-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {wider.length > 0 ? (
          <div className="mt-12">
            <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.3rem]">
              {labels?.widerTeam ?? ct("Meet the wider team")}
            </h3>
            {/* Sliding rail: the list is rendered twice and shifted by half its width for a seamless loop.
                Kept left-to-right in every locale so the loop direction matches the animation. */}
            <div className="team-rail mt-5" dir="ltr">
              <ul className="team-rail-row">
                {[...wider, ...wider].map((person, index) => {
                  const copyItem = index >= wider.length;
                  return (
                    <li
                      key={`${person.name}-${copyItem ? "b" : "a"}`}
                      aria-hidden={copyItem || undefined}
                      className="team-rail-item w-24 shrink-0 text-center sm:w-28"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#6d5cf6]">
                        <Image
                          src={person.photo}
                          alt={copyItem ? "" : person.name}
                          fill
                          sizes="112px"
                          loading="eager" // lazy loading misses tiles that slide in via transform
                          unoptimized // already cropped and compressed to 480px JPEGs
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-2 text-[0.7rem] font-medium leading-snug text-ink">{person.name}</p>
                      {person.role ? (
                        <p className="mt-0.5 text-[0.6rem] leading-snug text-muted" dir="auto">
                          {ct(person.role)}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null}

        <div className="mt-10 rounded-2xl border border-border bg-bg px-5 py-5 shadow-[var(--shadow-sm)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-7 sm:py-6">
          <div className="max-w-md">
            <p className="text-[1.05rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.15rem]">
              {copy.plusOrg}
            </p>
            <p className="mt-1.5 text-sm leading-6 text-ink-2">{copy.plusOrgText}</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
            {copy.roles.map((role) => (
              <li
                key={role}
                className="rounded-lg border border-border bg-[#f3f1fc] px-3 py-1.5 text-[0.75rem] font-medium text-ink-2"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
