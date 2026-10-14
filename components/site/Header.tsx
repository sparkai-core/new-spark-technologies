"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LocaleSwitcher } from "@/components/site/LocaleSwitcher";
import { Logo } from "@/components/site/Logo";
import { useCt } from "@/components/i18n/ContentI18n";
import { Button } from "@/components/ui/Button";
import { Link, usePathname } from "@/i18n/navigation";
import { products } from "@/lib/products";
import {
  caseStudyLinks,
  industryLinks,
  megaFeatured,
  nav,
  productSuites,
  solutionSuites,
  solutions,
} from "@/lib/site";

type MegaKey =
  | "solutions"
  | "products"
  | "industries"
  | "case-studies"
  | "more"
  | null;

type Suite = {
  id: string;
  titleKey: string;
  href: string;
  items: readonly { href: string; title: string }[];
};

const PRIMARY = ["/solutions", "/products", "/industries", "/case-studies"] as const;
const MORE = ["/events", "/team", "/company"] as const;

const toneClass: Record<string, string> = {
  pink: "af-mega-tone-pink",
  teal: "af-mega-tone-teal",
  blue: "af-mega-tone-blue",
};

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 12 12"
    className={`h-3 w-3 opacity-55 transition-transform ${open ? "rotate-180 opacity-100" : ""}`}
    aria-hidden
  >
    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const FeaturedIcon = ({ tone }: { tone: string }) => {
  const path =
    tone === "pink"
      ? "m5 12.5 4.5 4.5L19 7.5"
      : tone === "teal"
        ? "M4 16.5 9 11l3.5 3L20 6.5m0 0h-4.5m4.5 0V11"
        : "M12 3.5 5 6v5.5c0 4 3 7.3 7 9 4-1.7 7-5 7-9V6l-7-2.5Z";
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const SuiteMega = ({
  suites,
  suiteTitle,
  featuredLabel,
  featuredItems,
}: {
  suites: readonly Suite[];
  suiteTitle: (key: string) => string;
  featuredLabel: string;
  featuredItems: readonly { href: string; label: string; tone: string }[];
}) => (
  <div className="af-mega">
    <div className="af-mega-inner">
      <div
        className="af-mega-suites"
        style={{ gridTemplateColumns: `repeat(${suites.length}, minmax(0, 1fr))` }}
      >
        {suites.map((suite) => (
          <div key={suite.id} className="af-mega-suite">
            <Link href={suite.href} className="af-mega-suite-title">
              <span>{suiteTitle(suite.titleKey)}</span>
              <span aria-hidden className="af-mega-suite-arrow">
                →
              </span>
            </Link>
            <ul className="af-mega-links">
              {suite.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="af-mega-link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <FeaturedRail label={featuredLabel} items={featuredItems} />
    </div>
  </div>
);

const ListMega = ({
  title,
  href,
  items,
  columns,
  viewAll,
  featuredLabel,
  featuredItems,
}: {
  title: string;
  href: string;
  items: readonly { href: string; title: string }[];
  columns: number;
  viewAll: string;
  featuredLabel: string;
  featuredItems: readonly { href: string; label: string; tone: string }[];
}) => (
  <div className="af-mega">
    <div className="af-mega-inner">
      <div className="af-mega-suite min-w-0">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Link href={href} className="af-mega-suite-title mb-0">
            <span>{title}</span>
            <span aria-hidden className="af-mega-suite-arrow">
              →
            </span>
          </Link>
          <Link href={href} className="text-xs font-semibold text-ink-2 hover:text-ink">
            {viewAll}
          </Link>
        </div>
        <ul
          className="af-mega-links"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: "0.15rem 2rem",
          }}
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="af-mega-link">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <FeaturedRail label={featuredLabel} items={featuredItems} />
    </div>
  </div>
);

const FeaturedRail = ({
  label,
  items,
}: {
  label: string;
  items: readonly { href: string; label: string; tone: string }[];
}) => (
  <aside className="af-mega-featured">
    <p className="af-mega-featured-label">{label}</p>
    <ul className="af-mega-featured-list">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="af-mega-featured-item">
            <span className={`af-mega-featured-icon ${toneClass[item.tone] ?? ""}`}>
              <FeaturedIcon tone={item.tone} />
            </span>
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);

const MorePanel = ({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) => (
  <div className="af-mega af-mega-compact">
    <div className="af-mega-inner af-mega-inner-compact">
      <ul className="af-mega-more-list">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="af-mega-more-item">
              <span className="block text-sm font-semibold text-ink">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Header = () => {
  const t = useTranslations("Nav");
  const tm = useTranslations("Modules");
  const tp = useTranslations("Products");
  const ct = useCt();
  const solutionSuiteItems = ct.deep(solutionSuites);
  const productSuiteItems = ct.deep(productSuites);
  const industryLinkItems = ct.deep(industryLinks);
  const caseStudyLinkItems = ct.deep(caseStudyLinks);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [mega, setMega] = useState<MegaKey>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const moduleShort = (id: string) => tm(`${id}.short` as never);
  const productName = (slug: string) => tp(`${slug}.name` as never);

  const navLabel = (href: string) => {
    const map: Record<string, "solutions" | "products" | "industries" | "caseStudies" | "events" | "team" | "company"> = {
      "/solutions": "solutions",
      "/products": "products",
      "/industries": "industries",
      "/case-studies": "caseStudies",
      "/events": "events",
      "/team": "team",
      "/company": "company",
    };
    const key = map[href];
    return key ? t(key) : href;
  };

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMega(null), 160);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const featuredItems = megaFeatured.map((item) => ({
    href: item.href,
    label: t(item.labelKey as "caseStudies"),
    tone: item.tone,
  }));

  const suiteTitle = (key: string) => t(key as "suiteGrowth");

  const primaryItems = nav.primary.filter((item) =>
    (PRIMARY as readonly string[]).includes(item.href),
  );
  const moreItems = nav.primary.filter((item) =>
    (MORE as readonly string[]).includes(item.href),
  );
  const moreOpen = mega === "more";
  const moreActive = moreItems.some((item) => isActive(item.href));
  const activeMega = mega !== null;

  const megaKeyFor = (href: string): MegaKey => {
    if (href === "/solutions") return "solutions";
    if (href === "/products") return "products";
    if (href === "/industries") return "industries";
    if (href === "/case-studies") return "case-studies";
    return null;
  };

  const renderMegaPanel = (): ReactNode => {
    if (mega === "solutions") {
      return (
        <SuiteMega
          suites={solutionSuiteItems}
          suiteTitle={suiteTitle}
          featuredLabel={t("featured")}
          featuredItems={featuredItems}
        />
      );
    }
    if (mega === "products") {
      return (
        <SuiteMega
          suites={productSuiteItems}
          suiteTitle={suiteTitle}
          featuredLabel={t("featured")}
          featuredItems={featuredItems}
        />
      );
    }
    if (mega === "industries") {
      return (
        <ListMega
          title={t("industries")}
          href="/industries"
          items={industryLinkItems}
          columns={2}
          viewAll={t("viewAll")}
          featuredLabel={t("featured")}
          featuredItems={featuredItems}
        />
      );
    }
    if (mega === "case-studies") {
      return (
        <ListMega
          title={t("caseStudies")}
          href="/case-studies"
          items={caseStudyLinkItems}
          columns={1}
          viewAll={t("viewAll")}
          featuredLabel={t("featured")}
          featuredItems={featuredItems}
        />
      );
    }
    if (mega === "more") {
      return (
        <MorePanel
          items={moreItems.map((item) => ({
            href: item.href,
            label: navLabel(item.href),
          }))}
        />
      );
    }
    return null;
  };

  const renderNavItem = (item: (typeof nav.primary)[number]) => {
    const active = isActive(item.href);
    const key = megaKeyFor(item.href);
    const open = key !== null && mega === key;

    if (key) {
      return (
        <li key={item.href} className="relative">
          <Link
            href={item.href}
            className={`site-nav-item ${active || open ? "is-active" : ""}`}
            aria-expanded={open}
            aria-current={active ? "page" : undefined}
            onMouseEnter={() => setMega(key)}
            onFocus={() => setMega(key)}
          >
            {navLabel(item.href)}
            <Chevron open={open} />
          </Link>
        </li>
      );
    }

    return (
      <li key={item.href} className="relative" onMouseEnter={() => setMega(null)}>
        <Link href={item.href} className={`site-nav-item ${active ? "is-active" : ""}`}>
          {navLabel(item.href)}
        </Link>
      </li>
    );
  };

  const Ctas = ({ short = false }: { short?: boolean }) => (
    <div className="flex shrink-0 items-center gap-2">
      <LocaleSwitcher className={short ? "hidden sm:inline-flex" : undefined} />
      <Button
        href={nav.assessment.href}
        variant="outline"
        size="sm"
        className={`whitespace-nowrap ${short ? "hidden sm:inline-flex" : ""}`}
      >
        {t("assessment")}
      </Button>
      <Button
        href={nav.cta.href}
        size="sm"
        className={`whitespace-nowrap ${short ? "hidden sm:inline-flex" : ""}`}
      >
        {t("requestBriefing")}
      </Button>
    </div>
  );

  return (
    <header
      className={`site-header ${mobileOpen ? "z-[80]" : "z-50"} ${scrolled || mobileOpen || activeMega ? "is-scrolled" : ""}`}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <div className="site-header-bar relative z-[60] mx-auto w-full max-w-[88rem] px-4 sm:px-5 lg:px-6">
        <div className="flex h-[3.75rem] w-full items-center gap-3 sm:h-[4rem]">
          <div className="min-w-0 shrink-0">
            <Logo />
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 xl:flex">
            <nav aria-label={t("primary")} className="relative min-w-0">
              <ul className="flex flex-nowrap items-center justify-end gap-0.5">
                {primaryItems.map(renderNavItem)}
                <li className="relative">
                  <button
                    type="button"
                    aria-expanded={moreOpen}
                    onMouseEnter={() => setMega("more")}
                    onFocus={() => setMega("more")}
                    className={`site-nav-item ${moreActive || moreOpen ? "is-active" : ""}`}
                  >
                    {t("more")}
                    <Chevron open={moreOpen} />
                  </button>
                </li>
              </ul>
            </nav>
            <Ctas />
          </div>

          <div className="ms-auto flex items-center gap-2 xl:hidden">
            <button
              type="button"
              className={`mobile-hamburger inline-flex xl:hidden ${mobileOpen ? "is-open" : ""}`}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">{t("menu")}</span>
              <span aria-hidden className="flex w-[1.05rem] flex-col gap-[5px]">
                <span
                  className={`h-[1.5px] w-full bg-current transition-transform duration-200 ${
                    mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-[1.5px] w-full bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-[1.5px] w-full bg-current transition-transform duration-200 ${
                    mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {activeMega && !mobileOpen ? (
          <div
            className={`af-mega-shell hidden xl:block ${moreOpen ? "af-mega-shell-compact" : ""}`}
            onMouseEnter={cancelClose}
          >
            {renderMegaPanel()}
          </div>
        ) : null}
      </div>

      {mobileOpen ? (
        <div
          className="mobile-drawer xl:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            id="mobile-nav"
            className="mobile-drawer-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <nav aria-label={t("mobile")} className="mobile-drawer-scroll">
              <div className="mb-3 px-1">
                <LocaleSwitcher />
              </div>
              <ul className="grid gap-0.5">
                {nav.primary.map((item) => {
                  const children =
                    item.href === "/solutions"
                      ? solutions.map((s) => ({ href: `/solutions/${s.id}`, label: moduleShort(s.id) }))
                      : item.href === "/products"
                        ? products.map((p) => ({ href: p.href, label: productName(p.slug) }))
                        : item.href === "/industries"
                          ? industryLinkItems.map((link) => ({ href: link.href, label: link.title }))
                          : item.href === "/case-studies"
                            ? caseStudyLinkItems.map((link) => ({ href: link.href, label: link.title }))
                            : [];
                  const expanded = mobileSection === item.href;
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <div className="mobile-nav-row">
                        <Link
                          href={item.href}
                          className={`mobile-nav-link ${active ? "is-active" : ""}`}
                        >
                          {navLabel(item.href)}
                        </Link>
                        {children.length > 0 ? (
                          <button
                            type="button"
                            className={`mobile-nav-toggle ${expanded ? "is-open" : ""}`}
                            aria-expanded={expanded}
                            aria-label={navLabel(item.href)}
                            onClick={() =>
                              setMobileSection((current) => (current === item.href ? null : item.href))
                            }
                          >
                            <Chevron open={expanded} />
                          </button>
                        ) : null}
                      </div>
                      {expanded && children.length > 0 ? (
                        <ul className="mobile-nav-sub">
                          {children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={
                                  pathname === child.href || pathname.startsWith(`${child.href}`)
                                    ? "is-active"
                                    : ""
                                }
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mobile-drawer-foot grid gap-2">
              <Button href={nav.cta.href} size="lg" className="w-full">
                {t("requestBriefing")}
              </Button>
              <Button href={nav.assessment.href} variant="outline" size="lg" className="w-full">
                {t("assessment")}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
