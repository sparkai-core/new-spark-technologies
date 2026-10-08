import { getTranslations } from "next-intl/server";
import { LegalCta, LegalFaqList, LegalShell } from "@/components/site/LegalDoc";

type FaqItem = { q: string; a: string };

export async function generateMetadata() {
  const t = await getTranslations("Pages.faq");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function FaqPage() {
  const t = await getTranslations("Pages.faq");
  const tf = await getTranslations("Footer");
  const tc = await getTranslations("Common");
  const raw = t.raw("items") as FaqItem[];

  const items = raw.map((item, index) => ({
    id: `q${index + 1}`,
    q: item.q,
    a: item.a,
  }));

  const toc = items.map((item) => ({
    id: item.id,
    label: item.q.length > 48 ? `${item.q.slice(0, 46)}…` : item.q,
  }));

  const docNav = [
    { href: "/privacy", label: tf("privacy") },
    { href: "/faq", label: tf("faq") },
    { href: "/terms", label: tf("terms") },
  ];

  const related = [
    { href: "/privacy", label: tf("privacy"), hint: t("relatedPrivacyHint") },
    { href: "/terms", label: tf("terms"), hint: t("relatedTermsHint") },
    { href: "/contact", label: tf("contact"), hint: t("relatedContactHint") },
  ];

  return (
    <LegalShell
      kicker={t("kicker")}
      title={t("title")}
      lede={t("lede")}
      operator={tc("operator")}
      onThisPage={tc("onThisPage")}
      toc={toc}
      related={related}
      relatedLabel={t("related")}
      docNav={docNav}
    >
      <LegalFaqList items={items} />
      <LegalCta title={t("ctaTitle")} text={t("ctaText")} href="/contact" label={t("cta")} />
    </LegalShell>
  );
}
