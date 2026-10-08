import type { SocialName } from "@/components/ui/SocialIcon";
import { site as defaultSite, team as defaultTeam } from "@/lib/site";

export type CmsSocial = {
  id?: string;
  network?: string;
  name?: string;
  label: string;
  href: string;
  enabled?: boolean;
};

export type CmsContact = {
  email: string;
  phone: string;
  phoneHref: string;
  mobile: string;
  mobileHref: string;
  whatsapp: string;
  address: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  addressCountry: string;
  hours?: string;
  maps: string;
  socials: CmsSocial[];
};

export type CmsTracking = {
  gtmId: string;
  ga4Id: string;
  metaPixelId: string;
  linkedinPartnerId: string;
  gscVerification: string;
  bingVerification: string;
  enabled: boolean;
};

export type CmsTeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  position: string;
  scale?: number;
  location: string;
  group: string;
  tags: string[];
  quote?: string;
  focus?: string[];
  linkedin?: string;
  tier: "leadership" | "delivery";
  order: number;
  enabled: boolean;
};

export type CmsTeam = {
  members: CmsTeamMember[];
  principles: string[];
  locationsActive: string[];
  locationsPlanned: string[];
  stats: { id: string; value: string; label: string }[];
  headline: string;
  lede: string;
};

export type CmsPublicSite = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  contact: CmsContact;
  tracking: CmsTracking;
  team: CmsTeam;
};

type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  phoneHref: string;
  mobile: string;
  mobileHref: string;
  whatsapp: string;
  address: string;
  streetAddress: string;
  addressLocality: string;
  addressCountry: string;
  maps: string;
  hours: string;
  linkedin: string;
  sparkAiUrl: string;
  parentBrand: string;
  parentUrl: string;
  gtmId: string;
  socials: { name: SocialName; label: string; href: string }[];
  gscVerification: string;
  bingVerification: string;
};

type TeamPerson = {
  name: string;
  role: string;
  bio: string;
  linkedin?: string | null;
  photo: string;
  position: string;
  scale?: number;
  location: string;
  group: string;
  tags: readonly string[];
  quote?: string;
  focus?: readonly string[];
};

type TeamConfig = {
  sourcedFromCms: boolean;
  leadership: TeamPerson[];
  delivery: TeamPerson[];
  locations: { active: string[]; planned: string[] };
  principles: string[];
  stats: { value: string; label: string }[];
  headline?: string;
  lede?: string;
};

const SOCIAL_NAMES = new Set<SocialName>([
  "linkedin",
  "instagram",
  "x",
  "youtube",
  "whatsapp",
  "facebook",
]);

function cmsBaseUrl() {
  return (process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "").replace(/\/$/, "");
}

function siteKey() {
  return process.env.CMS_SITE || process.env.NEXT_PUBLIC_CMS_SITE || "sparktech";
}

function pick<T>(value: T | undefined | null, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  return value;
}

function mapSocials(socials: CmsSocial[] | undefined): SiteConfig["socials"] {
  if (!socials?.length) return [...defaultSite.socials];
  return socials
    .filter((s) => s.enabled !== false && s.href)
    .map((s) => {
      const raw = (s.network || s.name || "linkedin").toLowerCase();
      const name = (SOCIAL_NAMES.has(raw as SocialName) ? raw : "linkedin") as SocialName;
      return { name, label: s.label || name, href: s.href };
    });
}

function mapMember(m: CmsTeamMember): TeamPerson {
  return {
    name: m.name,
    role: m.role,
    bio: m.bio,
    linkedin: m.linkedin || null,
    photo: m.photo,
    position: m.position || "center center",
    scale: m.scale,
    location: m.location,
    group: m.group,
    tags: m.tags || [],
    quote: m.quote,
    focus: m.focus,
  };
}

async function fetchCmsSite(): Promise<CmsPublicSite | null> {
  const base = cmsBaseUrl();
  if (!base) return null;

  const token = process.env.CMS_PUBLIC_TOKEN || process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN || "";
  const url = new URL("/api/public/content", base);
  url.searchParams.set("site", siteKey());
  if (token) url.searchParams.set("token", token);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60, tags: [`cms-${siteKey()}`] },
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) {
      console.error(`CMS fetch failed: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = (await res.json()) as { site?: CmsPublicSite };
    return data.site ?? null;
  } catch (err) {
    console.error("CMS fetch error", err);
    return null;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const cms = await fetchCmsSite();
  const c = cms?.contact;
  const t = cms?.tracking;
  const socials = mapSocials(c?.socials);
  const linkedin =
    socials.find((s) => s.name === "linkedin")?.href || defaultSite.linkedin;

  return {
    name: pick(cms?.name, defaultSite.name),
    tagline: pick(cms?.tagline, defaultSite.tagline),
    description: pick(cms?.description, defaultSite.description),
    url: pick(cms?.domain, defaultSite.url) || defaultSite.url,
    email: pick(c?.email, defaultSite.email),
    phone: pick(c?.phone, defaultSite.phone),
    phoneHref: pick(c?.phoneHref, defaultSite.phoneHref),
    mobile: pick(c?.mobile, defaultSite.mobile),
    mobileHref: pick(c?.mobileHref, defaultSite.mobileHref),
    whatsapp: pick(c?.whatsapp, defaultSite.whatsapp),
    address: pick(c?.address, defaultSite.address),
    streetAddress: pick(c?.streetAddress, defaultSite.streetAddress),
    addressLocality: pick(c?.addressLocality, defaultSite.addressLocality),
    addressCountry: pick(c?.addressCountry, defaultSite.addressCountry),
    maps: pick(c?.maps, defaultSite.maps),
    hours: pick(c?.hours, defaultSite.hours),
    linkedin,
    sparkAiUrl: defaultSite.sparkAiUrl,
    parentBrand: defaultSite.parentBrand,
    parentUrl: defaultSite.parentUrl,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || (t?.enabled === false ? "" : pick(t?.gtmId, "")),
    socials,
    gscVerification: pick(t?.gscVerification, process.env.NEXT_PUBLIC_GSC_VERIFICATION || ""),
    bingVerification: pick(t?.bingVerification, process.env.NEXT_PUBLIC_BING_VERIFICATION || ""),
  };
}

export async function getTeamConfig(): Promise<TeamConfig> {
  const cms = await fetchCmsSite();
  const team = cms?.team;
  if (!team?.members?.length) {
    return {
      sourcedFromCms: false,
      leadership: defaultTeam.leadership.map((m) => ({ ...m, tags: [...m.tags] })),
      delivery: defaultTeam.delivery.map((m) => ({ ...m, tags: [...m.tags] })),
      locations: {
        active: [...defaultTeam.locations.active],
        planned: [...defaultTeam.locations.planned],
      },
      principles: [...defaultTeam.principles],
      stats: defaultTeam.stats.map((s) => ({ ...s })),
    };
  }

  return {
    sourcedFromCms: true,
    leadership: team.members.filter((m) => m.tier === "leadership").map(mapMember),
    delivery: team.members.filter((m) => m.tier === "delivery").map(mapMember),
    locations: {
      active: team.locationsActive?.length ? team.locationsActive : [...defaultTeam.locations.active],
      planned: team.locationsPlanned ?? [],
    },
    principles: team.principles?.length ? team.principles : [...defaultTeam.principles],
    stats: team.stats?.length
      ? team.stats.map((s) => ({ value: s.value, label: s.label }))
      : [...defaultTeam.stats],
    headline: team.headline,
    lede: team.lede,
  };
}

export function cmsLeadEndpoint() {
  const base = (process.env.NEXT_PUBLIC_CMS_API_URL || process.env.CMS_API_URL || "").replace(/\/$/, "");
  return base ? `${base}/api/leads` : "";
}

export function cmsSiteId() {
  const key = process.env.NEXT_PUBLIC_CMS_SITE || process.env.CMS_SITE || "sparktech";
  return key === "sparkai" ? "site_sparkai" : "site_sparktech";
}
