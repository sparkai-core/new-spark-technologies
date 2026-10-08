import { getTranslations } from "next-intl/server";
import { LegalCta, LegalSection, LegalShell } from "@/components/site/LegalDoc";
import { getSiteConfig } from "@/lib/cms";

export async function generateMetadata() {
  const t = await getTranslations("Pages.privacy");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("Pages.privacy");
  const tf = await getTranslations("Footer");
  const tc = await getTranslations("Common");
  const site = await getSiteConfig();

  const sections = [
    { id: "overview", title: t("overviewTitle"), body: [t("intro")] },
    { id: "collect", title: t("collectTitle"), body: [t("collect"), t("collectExtra")] },
    { id: "use", title: t("useTitle"), body: [t("use")] },
    { id: "share", title: t("shareTitle"), body: [t("share"), t("shareExtra")] },
    { id: "cookies", title: t("cookiesTitle"), body: [t("cookies")] },
    { id: "rights", title: t("retainTitle"), body: [t("retain")] },
  ];

  const toc = [
    ...sections.map((s) => ({ id: s.id, label: s.title })),
    { id: "contact", label: t("contactTitle") },
  ];

  const docNav = [
    { href: "/privacy", label: tf("privacy") },
    { href: "/faq", label: tf("faq") },
    { href: "/terms", label: tf("terms") },
  ];

  const related = [
    { href: "/faq", label: tf("faq"), hint: t("relatedFaqHint") },
    { href: "/terms", label: tf("terms"), hint: t("relatedTermsHint") },
    { href: "/contact", label: tf("contact"), hint: t("relatedContactHint") },
  ];

  return (
    <LegalShell
      kicker={t("kicker")}
      title={t("title")}
      lede={t("lede")}
      updated={t("updated")}
      operator={tc("operator")}
      onThisPage={tc("onThisPage")}
      toc={toc}
      related={related}
      relatedLabel={t("related")}
      docNav={docNav}
    >
      {sections.map((section, index) => (
        <LegalSection key={section.id} id={section.id} index={index + 1} title={section.title}>
          {section.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </LegalSection>
      ))}
      <LegalSection id="contact" index={sections.length + 1} title={t("contactTitle")}>
        <p>
          {t("p2")}{" "}
          <a className="font-semibold text-brand hover:text-brand-hover" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </LegalSection>
      <LegalCta title={tf("faq")} text={t("relatedFaqHint")} href="/faq" label={tf("faq")} />
    </LegalShell>
  );
}
