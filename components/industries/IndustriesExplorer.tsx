"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { Section, SectionHeading } from "@/components/site/Section";
import { localizeIndustries } from "@/lib/localize";
import { industries, media } from "@/lib/site";

type IndustryId = (typeof industries)[number]["id"];

const industryImage: Record<string, string> = {
  "energy-power": "/assets/industries/energy-power.jpg",
  "oil-gas": "/assets/industries/oil-gas-v2.jpg",
  infrastructure: "/assets/industries/infrastructure-v2.jpg",
  "railways-metro": "/assets/industries/railways-metro.jpg",
  manufacturing: "/assets/industries/manufacturing.jpg",
  "enterprise-automation": "/assets/industries/enterprise-automation.jpg",
  healthcare: "/assets/industries/healthcare-insurance.jpg",
  banking: "/assets/industries/banking-financial.jpg",
  telecom: "/assets/industries/telecom.jpg",
  aviation: "/assets/industries/aviation-transport.jpg",
};

export const IndustriesExplorer = () => {
  const t = useTranslations("Pages.industries");
  const ti = useTranslations("Industries");
  const tu = useTranslations("Ui");
  const localized = useMemo(() => localizeIndustries((k) => ti(k as never)), [ti]);
  const [active, setActive] = useState<IndustryId>(industries[0].id);
  const current = localized.find((i) => i.id === active) ?? localized[0];
  const image = industryImage[current.id] ?? media.platform;

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && industries.some((i) => i.id === hash)) {
      setActive(hash as IndustryId);
    }
  }, []);

  return (
    <>
      <Section label={tu("operatingModels")}>
        <SectionHeading kicker={t("sectorsKicker")} title={t("sectorsTitle")} lede={t("sectorsLede")} />

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={t("tablistAria")}>
          {localized.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(item.id)}
                className={`min-h-11 rounded-md px-3.5 py-2 text-sm font-medium transition ${
                  selected
                    ? "bg-brand text-white"
                    : "border border-border text-ink-2 hover:border-border-strong hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <article
          id={current.id}
          role="tabpanel"
          className="panel mt-8 scroll-mt-28 overflow-hidden lg:grid lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative min-h-[14rem] border-b border-border lg:min-h-full lg:border-b-0 lg:border-r">
            <Image
              src={image}
              alt={current.label}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="type-kicker text-white/80">{t("industryLabel")}</p>
              <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-bold text-white drop-shadow-sm">
                {current.label}
              </h2>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-sm leading-7 text-ink-2">{current.text}</p>
            <p className="mt-6 text-sm font-semibold text-ink">{t("challenges")}</p>
            <ul className="mt-3 space-y-2">
              {current.challenges.map((row) => (
                <li key={row} className="flex gap-2 text-sm text-ink-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {row}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold text-ink">{t("useCases")}</p>
            <div className="mt-3 grid gap-3">
              {current.useCases.map((uc) => (
                <div key={uc.title} className="rounded-md border border-border bg-surface p-4">
                  <h3 className="type-h3 text-base">{uc.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink-2">{uc.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button href="/contact" size="sm">
                {t("sectorBriefing")}
              </Button>
            </div>
          </div>
        </article>
      </Section>

      <Section label={tu("allIndustries")} className="border-t border-border bg-surface">
        <SectionHeading kicker={t("directoryKicker")} title={t("directoryTitle")} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {localized.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActive(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group panel overflow-hidden text-left transition hover:border-border-strong"
            >
              <div className="relative aspect-[16/9] bg-ink">
                <Image
                  src={industryImage[item.id] ?? media.platform}
                  alt=""
                  fill
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="type-h3 text-white drop-shadow-sm">{item.label}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/90">{item.text}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <CtaBand
        title={t("ctaBandTitle")}
        text={t("ctaBandText")}
        secondary={{ href: "/solutions", label: t("viewSolutions") }}
      />
    </>
  );
};
