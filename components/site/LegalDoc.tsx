import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type TocItem = { id: string; label: string };
type RelatedItem = { href: string; label: string; hint?: string };

type LegalShellProps = {
  kicker: string;
  title: string;
  lede: string;
  updated?: string;
  operator?: string;
  onThisPage: string;
  toc: TocItem[];
  related: RelatedItem[];
  relatedLabel: string;
  docNav?: RelatedItem[];
  children: ReactNode;
};

export function LegalShell({
  kicker,
  title,
  lede,
  updated,
  operator,
  onThisPage,
  toc,
  related,
  relatedLabel,
  docNav,
  children,
}: LegalShellProps) {
  return (
    <>
      <header className="relative overflow-hidden border-b border-border bg-bg">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-20">
          <p className="hero-kicker hero-kicker-ink rise">{kicker}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-balance rise rise-delay-1">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink-2 rise rise-delay-2">{lede}</p>

          {(updated || operator) && (
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 rise rise-delay-3">
              {updated ? (
                <span className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {updated}
                </span>
              ) : null}
              {operator ? <span className="text-xs text-muted sm:text-sm">{operator}</span> : null}
            </div>
          )}

          {docNav && docNav.length > 0 ? (
            <nav
              aria-label="Legal pages"
              className="mt-8 inline-flex flex-wrap gap-1 rounded-lg border border-border bg-surface/80 p-1 rise rise-delay-3"
            >
              {docNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3.5 py-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-bg hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[15rem_minmax(0,1fr)_13.5rem]">
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="type-kicker">{onThisPage}</p>
            <ol className="mt-4 space-y-1 border-s border-border ps-3">
              {toc.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex items-start gap-2.5 rounded-md py-1.5 text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    <span className="mt-0.5 font-mono text-[0.65rem] tabular-nums text-muted group-hover:text-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-snug">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="min-w-0">
            <nav aria-label={onThisPage} className="mb-8 flex flex-wrap gap-2 pb-1 lg:hidden">
              {toc.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="shrink-0 rounded-md border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-ink-2"
                >
                  <span className="me-1.5 font-mono text-muted">{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="space-y-4">{children}</div>
          </div>

          <aside className="hidden xl:sticky xl:top-28 xl:block xl:self-start">
            <p className="type-kicker">{relatedLabel}</p>
            <ul className="mt-4 space-y-2">
              {related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl border border-border bg-bg px-4 py-3 transition hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[var(--shadow-sm)]"
                  >
                    <span className="text-sm font-semibold text-ink">{item.label}</span>
                    {item.hint ? <span className="mt-0.5 block text-xs text-muted">{item.hint}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-12 border-t border-border pt-8 xl:hidden">
          <p className="type-kicker">{relatedLabel}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-border bg-bg px-4 py-3 text-sm font-semibold text-ink hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function LegalSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-bg shadow-[var(--shadow-sm)]"
    >
      <div className="flex items-start gap-4 border-b border-border bg-surface/60 px-5 py-4 sm:px-6">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink font-mono text-[0.7rem] font-semibold text-on-brand">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="pt-1 text-base font-semibold tracking-tight text-ink sm:text-lg">{title}</h2>
      </div>
      <div className="space-y-3 px-5 py-5 text-sm leading-7 text-ink-2 sm:px-6 sm:py-6">{children}</div>
    </section>
  );
}

export function LegalFaqList({ items }: { items: { id: string; q: string; a: string }[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg shadow-[var(--shadow-sm)]">
      {items.map((item, index) => (
        <details
          key={item.id}
          id={item.id}
          className="group scroll-mt-28 border-b border-border last:border-b-0"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 transition-colors hover:bg-surface/70 sm:px-6 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface font-mono text-[0.65rem] font-semibold text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 pt-0.5 text-base font-semibold leading-snug tracking-tight text-ink">
              {item.q}
            </span>
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-ink transition-transform duration-[var(--t-base)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="border-t border-border/70 bg-surface/40 px-5 pb-5 ps-[3.75rem] pt-4 text-sm leading-7 text-ink-2 sm:px-6 sm:ps-16 sm:pb-6">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

export function LegalCta({
  title,
  text,
  href,
  label,
}: {
  title: string;
  text: string;
  href: string;
  label: string;
}) {
  return (
    <div className="dark-panel relative mt-4 overflow-hidden rounded-2xl px-6 py-8 sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-brand/30 blur-3xl"
      />
      <div className="relative max-w-xl">
        <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-white/70">{text}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white/90"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
