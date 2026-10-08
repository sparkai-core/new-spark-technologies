"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type LogoProps = {
  tone?: "ink" | "light";
};

export const Logo = ({ tone = "ink" }: LogoProps) => {
  const t = useTranslations("HomeContent");

  return (
    <Link href="/" aria-label={t("logoAria")} className="inline-flex items-center gap-2.5">
      <Image
        src="/assets/brand/spark-mark.png"
        alt=""
        width={28}
        height={36}
        priority
        className={`h-7 w-auto ${tone === "light" ? "brightness-0 invert" : ""}`}
      />
      <span className="leading-none">
        <span
          className={`block text-[1.05rem] font-semibold tracking-tight ${
            tone === "light" ? "text-on-brand" : "text-ink"
          }`}
        >
          Spark
        </span>
        <span
          className={`mt-0.5 block font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] ${
            tone === "light" ? "text-on-brand/55" : "text-muted"
          }`}
        >
          Technologies
        </span>
      </span>
    </Link>
  );
};
