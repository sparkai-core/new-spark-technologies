import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { getSiteConfig } from "@/lib/cms";

export async function OfficeCard({ tone = "light" }: { tone?: "light" | "dark" }) {
  const t = await getTranslations("Pages.office");
  const tc = await getTranslations("HomeContent");
  const site = await getSiteConfig();
  const dark = tone === "dark";

  return (
    <aside
      className={`rounded-xl border p-6 md:p-7 ${
        dark ? "border-white/10 bg-white/5 text-white" : "panel"
      }`}
    >
      <p className={`type-kicker ${dark ? "text-white/55" : ""}`}>{t("kicker")}</p>
      <h3 className={`type-h3 mt-3 ${dark ? "text-white" : ""}`}>{t("title")}</h3>
      <p className={`mt-3 text-sm leading-6 ${dark ? "text-white/70" : "text-ink-2"}`}>
        {site.streetAddress}
        <br />
        {site.addressLocality}, {site.addressCountry}
      </p>
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
        <Button
          href={site.maps}
          size="sm"
          variant="outline"
          className={dark ? "border-white/25 bg-white/5 text-white hover:bg-white/10" : ""}
        >
          {t("openMaps")}
        </Button>
      </div>
    </aside>
  );
}
