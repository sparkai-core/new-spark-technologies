/**
 * Server-side access to the content dictionaries (see lib/content-i18n.ts).
 * Do not import from client components — it would ship every locale's dictionary
 * to the browser. Client components use `useCt()` from components/i18n/ContentI18n.
 */
import { getLocale } from "next-intl/server";
import { makeTranslator, type ContentDict, type ContentTranslator } from "@/lib/content-i18n";
import ar from "./content/ar.json";
import az from "./content/az.json";

const dictionaries: Record<string, ContentDict> = { ar, az };

export function contentDictFor(locale: string): ContentDict {
  return dictionaries[locale] ?? {};
}

/** For sync server components: pass the locale from next-intl's `useLocale()`. */
export function ctFor(locale: string): ContentTranslator {
  return makeTranslator(contentDictFor(locale));
}

/** For async server components, generateMetadata and route handlers. */
export async function getCt(): Promise<ContentTranslator> {
  return ctFor(await getLocale());
}
