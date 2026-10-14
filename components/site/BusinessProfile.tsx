import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/lib/cms";
import { getCt } from "@/i18n/content-server";
import { site as brandDefaults } from "@/lib/site";

type BusinessProfileProps = {
  title: string;
  badge?: string;
  legalLabel: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  hoursLabel: string;
  marketsLabel: string;
  markets: string;
  parentLabel: string;
  mapsLabel: string;
  contactLabel: string;
};

function RowIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-ink-2">
      {children}
    </span>
  );
}

export async function BusinessProfile({
  title,
  badge,
  legalLabel,
  addressLabel,
  phoneLabel,
  emailLabel,
  hoursLabel,
  marketsLabel,
  markets,
  parentLabel,
  mapsLabel,
  contactLabel,
}: BusinessProfileProps) {
  const site = await getSiteConfig();
  const ct = await getCt();
  const rows = [
    {
      label: legalLabel,
      value: ct(brandDefaults.legalName),
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M4.5 17V5.5A1.5 1.5 0 0 1 6 4h8a1.5 1.5 0 0 1 1.5 1.5V17" />
          <path d="M3 17h14" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: addressLabel,
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M10 17s5-4.2 5-8a5 5 0 1 0-10 0c0 3.8 5 8 5 8Z" strokeLinejoin="round" />
          <circle cx="10" cy="9" r="1.6" />
        </svg>
      ),
      value: (
        <>
          {ct(site.streetAddress)}
          <br />
          {ct(site.addressLocality)}, {ct(site.addressCountry)}
        </>
      ),
    },
    {
      label: phoneLabel,
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path
            d="M6.2 3.8h2.1l1 3.1-1.4 1a8.5 8.5 0 0 0 4.2 4.2l1-1.4 3.1 1v2.1a1.4 1.4 0 0 1-1.5 1.4A11.7 11.7 0 0 1 3.8 6.3a1.4 1.4 0 0 1 1.4-1.5Z"
            strokeLinejoin="round"
          />
        </svg>
      ),
      value: (
        <>
          <a href={site.phoneHref} className="hover:text-ink">
            {site.phone}
          </a>
          <span className="mx-2 text-muted">·</span>
          <a href={site.mobileHref} className="hover:text-ink">
            {site.mobile}
          </a>
        </>
      ),
    },
    {
      label: emailLabel,
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <rect x="3" y="5" width="14" height="10" rx="1.5" />
          <path d="m4 6.5 6 4.5 6-4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      value: (
        <a href={`mailto:${site.email}`} className="hover:text-ink">
          {site.email}
        </a>
      ),
    },
    {
      label: hoursLabel,
      value: ct(site.hours),
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <circle cx="10" cy="10" r="7" />
          <path d="M10 6.5V10l2.5 1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: marketsLabel,
      value: markets,
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <circle cx="10" cy="10" r="7" />
          <path d="M3 10h14" />
        </svg>
      ),
    },
    {
      label: parentLabel,
      icon: (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M5 14.5 10 4l5 10.5M6.8 11h6.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      value: (
        <a href={brandDefaults.parentUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          {ct(brandDefaults.parentBrand)}
        </a>
      ),
    },
  ];

  return (
    <aside className="overflow-hidden rounded-2xl border border-border bg-bg shadow-[var(--shadow-md)]">
      <div className="dark-panel relative overflow-hidden px-6 py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-brand/30 blur-2xl"
        />
        <div className="relative">
          {badge ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {badge}
            </span>
          ) : null}
          <p className="mt-3 type-kicker text-white/55">{title}</p>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-white">{ct(site.name)}</h2>
          <p className="mt-1 text-sm text-white/70">{ct(site.tagline)}</p>
        </div>
      </div>
      <dl className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-3 px-5 py-4 sm:px-6">
            <RowIcon>{row.icon}</RowIcon>
            <div className="min-w-0">
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">{row.label}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-2">{row.value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-3 border-t border-border bg-surface/50 px-5 py-5 sm:px-6">
        <Link
          href="/contact"
          className="inline-flex flex-1 items-center justify-center rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-on-brand hover:bg-dark sm:flex-none"
        >
          {contactLabel}
        </Link>
        <a
          href={site.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-md border border-border-strong bg-bg px-4 py-2.5 text-sm font-semibold text-ink hover:bg-surface sm:flex-none"
        >
          {mapsLabel}
        </a>
      </div>
    </aside>
  );
}
