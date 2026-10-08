"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: Locale) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`inline-flex overflow-hidden rounded-full border border-border bg-bg text-[0.7rem] font-semibold tracking-wide ${className}`}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            className={`min-h-11 min-w-11 px-3 py-2 transition-colors ${
              active ? "bg-ink text-on-brand" : "text-ink-2 hover:text-ink"
            }`}
            aria-pressed={active}
          >
            {localeNames[code]}
          </button>
        );
      })}
    </div>
  );
}
