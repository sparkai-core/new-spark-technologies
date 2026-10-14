"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { makeTranslator, type ContentDict, type ContentTranslator } from "@/lib/content-i18n";

const ContentDictContext = createContext<ContentDict>({});

/** Receives only the active locale's dictionary from the server layout. */
export function ContentDictProvider({ dict, children }: { dict: ContentDict; children: ReactNode }) {
  return <ContentDictContext.Provider value={dict}>{children}</ContentDictContext.Provider>;
}

/** Client-side content translator: `ct("English copy")` or `ct.deep(dataObject)`. */
export function useCt(): ContentTranslator {
  const dict = useContext(ContentDictContext);
  return useMemo(() => makeTranslator(dict), [dict]);
}
