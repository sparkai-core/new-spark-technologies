import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { getSiteConfig } from "@/lib/cms";
import { getCt } from "@/i18n/content-server";

export async function OfficeCard({ tone = "light" }: { tone?: "light" | "dark" }) {
  const t = await getTranslations("Pages.office");
  const tc = await getTranslations("HomeContent");
  const to = await getTranslations("Offices");
  const site = await getSiteConfig();
  const ct = await getCt();
  const dark = tone === "dark";

  return (
    <aside
      className={`rounded-xl border p-6 md:p-7 ${
        dark ? "border-white/10 bg-white/5 text-white" : "panel"
      }`}
    >
      <p className={`type-kicker ${dark ? "text-white/55" : ""}`}>{t("kicker")}</p>
      <h3 className={`type-h3 mt-3 ${dark ? "text-white" : ""}`}>{t("title")}</h3>
      <ul className={`mt-4 grid gap-4 text-sm leading-6 ${dark ? "text-white/70" : "text-ink-2"}`}>
        {site.offices.map((office) => (
          <li
            key={office.id}
            className={`border-s-2 ps-3 ${dark ? "border-white/20" : "border-border-strong"}`}
          >
            <p className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{to(office.id)}</p>
            <p className="mt-0.5">{ct(office.address)}</p>
            <p className={`mt-0.5 text-xs ${dark ? "text-white/50" : "text-muted"}`}>
              {to("legalEntity")}: {office.legalName}
            </p>
            <a
              href={office.maps}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 inline-block text-xs font-semibold underline-offset-2 hover:underline ${
                dark ? "text-white hover:text-white/80" : "text-brand hover:text-brand-hover"
              }`}
            >
              {t("openMaps")}
            </a>
          </li>
        ))}
      </ul>
      <dl className={`mt-5 space-y-3 text-sm ${dark ? "text-white/70" : "text-ink-2"}`}>
        <div>
          <dt className={`text-xs uppercase tracking-[0.12em] ${dark ? "text-white/45" : "text-muted"}`}>
            {t("hours")}
          </dt>
          <dd className="mt-1">{tc("hours")}</dd>
        </div>
        <div>
          <dt className={`text-xs uppercase tracking-[0.12em] ${dark ? "text-white/45" : "text-muted"}`}>
            {t("phone")}
          </dt>
          <dd className="mt-1">
            <a href={site.phoneHref} className={dark ? "hover:text-white" : "hover:text-brand"}>
              {site.phone}
            </a>
            <span className="mx-2 opacity-40">·</span>
            <a href={site.mobileHref} className={dark ? "hover:text-white" : "hover:text-brand"}>
              {site.mobile}
            </a>
          </dd>
        </div>
        <div>
          <dt className={`text-xs uppercase tracking-[0.12em] ${dark ? "text-white/45" : "text-muted"}`}>
            {t("email")}
          </dt>
          <dd className="mt-1">
            <a href={`mailto:${site.email}`} className={dark ? "hover:text-white" : "hover:text-brand"}>
              {site.email}
            </a>
          </dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button href="/contact" size="sm">
          {t("requestBriefing")}
        </Button>
      </div>
    </aside>
  );
}
