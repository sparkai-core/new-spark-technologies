"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type CtaBandProps = {
  title: string;
  text: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export const CtaBand = ({ title, text, primary, secondary }: CtaBandProps) => {
  const t = useTranslations("Cta");

  const resolvedPrimary = primary ?? { href: "/contact", label: t("primaryLabel") };
  const resolvedSecondary = secondary ?? { href: "/solutions", label: t("secondaryLabel") };

  return (
    <section className="px-5 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="dark-panel relative overflow-hidden rounded-xl px-6 py-12 md:px-12 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand/30 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="type-h2 text-balance text-white">{title}</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={resolvedPrimary.href} size="lg" className="w-full sm:w-auto">
                {resolvedPrimary.label}
              </Button>
              <Button
                href={resolvedSecondary.href}
                size="lg"
                variant="outline"
                className="w-full border-white/25 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
              >
                {resolvedSecondary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PageHero = ({
  kicker,
  title,
  lede,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  lede: string;
  children?: ReactNode;
}) => (
  <section className="relative overflow-hidden border-b border-border bg-bg">
    <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
      {kicker && <p className="hero-kicker hero-kicker-ink rise">{kicker}</p>}
      <h1 className="type-h1 mt-5 max-w-3xl text-balance rise rise-delay-1">{title}</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-ink-2 rise rise-delay-2">{lede}</p>
      {children && <div className="mt-8 rise rise-delay-3">{children}</div>}
    </div>
  </section>
);
