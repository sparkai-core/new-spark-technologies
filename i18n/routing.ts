import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar", "az"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  az: "AZ",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
});

export function isRtl(locale: string) {
  return locale === "ar";
}
