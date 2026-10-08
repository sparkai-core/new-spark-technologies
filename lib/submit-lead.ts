export type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  intent?: string;
  source?: string;
};

/** Browser-safe lead POST to Spark Admin. Returns false if CMS URL is unset or the request fails. */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  const cmsUrl = (process.env.NEXT_PUBLIC_CMS_API_URL || "").replace(/\/$/, "");
  const site = process.env.NEXT_PUBLIC_CMS_SITE || "sparktech";
  if (!cmsUrl) return false;

  try {
    const res = await fetch(`${cmsUrl}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || "",
        company: payload.company || "",
        message: payload.message || "",
        intent: payload.intent || "",
        source: payload.source || "website",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
