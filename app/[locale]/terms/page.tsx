import { getTranslations } from "next-intl/server";
import { LegalCta, LegalSection, LegalShell } from "@/components/site/LegalDoc";
import { getSiteConfig } from "@/lib/cms";

export async function generateMetadata() {
  const t = await getTranslations("Pages.terms");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage() {
  const t = await getTranslations("Pages.terms");
  const tf = await getTranslations("Footer");
  const tc = await getTranslations("Common");
  const site = await getSiteConfig();

  const sections = [
    { id: "overview", title: t("introTitle"), body: [t("intro")] },
    { id: "use", title: t("useTitle"), body: [t("use"), t("useExtra")] },
    { id: "engagements", title: t("engagementsTitle"), body: [t("engagements")] },
    { id: "ip", title: t("ipTitle"), body: [t("ip")] },
    {
      id: "ecosystem",
      title: t("ecosystemTitle"),
      body: [`${t("ecosystem")} ${t("p2")} ${site.sparkAiUrl.replace("https://", "")}.`],
    },
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
    { href: "/privacy", label: tf("privacy"), hint: t("relatedPrivacyHint") },
    { href: "/faq", label: tf("faq"), hint: t("relatedFaqHint") },
    { href: "/contact", label: tf("contact") },
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
          {t("contact")}{" "}
          <a className="font-semibold text-brand hover:text-brand-hover" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </LegalSection>
      <LegalCta title={tf("privacy")} text={t("relatedPrivacyHint")} href="/privacy" label={tf("privacy")} />
    </LegalShell>
  );
}
