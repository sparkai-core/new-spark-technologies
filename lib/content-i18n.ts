/**
 * Content translation for copy that lives in data files / components rather than
 * in messages/*.json. Dictionaries (i18n/content/<locale>.json) map the exact
 * English source string to its translation, so the English source stays untouched
 * and anything missing falls back to English.
 *
 * Safe for server and client: this module never imports the dictionaries itself.
 */
export type ContentDict = Readonly<Record<string, string>>;

export type ContentTranslator = ((text: string) => string) & {
  /** Translate every string inside an object/array (hrefs, slugs etc. are never dictionary keys). */
  deep: <T>(value: T) => T;
  /** Translate a pattern, then fill `{placeholders}` — lets each language order the words itself. */
  fmt: (pattern: string, vars: Record<string, string | number>) => string;
  dict: ContentDict;
};

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

export function translateText(dict: ContentDict | undefined, text: string): string {
  if (!dict || !text) return text;
  const hit = dict[text] ?? dict[normalize(text)];
  return hit || text;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  if ("$$typeof" in (value as object)) return false; // React element
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Structural fields that must never be translated, even if a value collides with a dictionary key. */
const STRUCTURAL_KEYS =
  /^(href|src|image|images|img|icon|id|slug|key|variant|tone|color|accent|kind|type|sceneId|scene|logo|video|poster|url|path|className|lang|locale|code|value|anchor|email|phone|whatsapp|mono|size|layout|status|theme)$/;

export function translateDeep<T>(dict: ContentDict | undefined, value: T): T {
  if (!dict || Object.keys(dict).length === 0) return value;
  const walk = (v: unknown): unknown => {
    if (typeof v === "string") return translateText(dict, v);
    if (Array.isArray(v)) return v.map(walk);
    if (isPlainObject(v)) {
      const out: Record<string, unknown> = {};
      for (const [k, inner] of Object.entries(v)) out[k] = STRUCTURAL_KEYS.test(k) ? inner : walk(inner);
      return out;
    }
    return v;
  };
  return walk(value) as T;
}

export function makeTranslator(dict: ContentDict | undefined): ContentTranslator {
  const safe = dict ?? {};
  const ct = ((text: string) => translateText(safe, text)) as ContentTranslator;
  ct.deep = <T,>(value: T) => translateDeep(safe, value);
  ct.fmt = (pattern, vars) =>
    translateText(safe, pattern).replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
  ct.dict = safe;
  return ct;
}
