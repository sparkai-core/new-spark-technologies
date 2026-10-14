"use client";

import { useTranslations } from "next-intl";
import { SocialIcon, type SocialName } from "@/components/ui/SocialIcon";
import { useCt } from "@/components/i18n/ContentI18n";

export type SocialLink = {
  name: SocialName;
  label: string;
  href: string;
};

type SocialLinksProps = {
  links: readonly SocialLink[];
  /** Visual tone for footer surfaces */
  tone?: "light" | "dark";
  className?: string;
};

export const SocialLinks = ({ links, tone = "light", className = "" }: SocialLinksProps) => {
  const t = useTranslations("HomeContent");
  const ct = useCt();
  /** "Spark Technologies on LinkedIn" → translated "{brand} on {network}" pattern; other labels as-is. */
  const labelFor = (label: string) => {
    const direct = ct(label);
    if (direct !== label) return direct;
    const m = /^(.*\S) on (\S.*)$/.exec(label);
    return m ? ct.fmt("{brand} on {network}", { brand: m[1], network: m[2] }) : label;
  };

  if (!links.length) return null;

  const itemClass =
    tone === "dark"
      ? "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
      : "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg text-ink-2 transition hover:border-border-strong hover:text-brand";

  return (
    <nav aria-label={t("socialAria")} className={className}>
      <ul className="flex flex-wrap gap-2.5">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labelFor(link.label)}
              title={labelFor(link.label)}
              className={itemClass}
            >
              <SocialIcon name={link.name} className="h-[15px] w-[15px]" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
