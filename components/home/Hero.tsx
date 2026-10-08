"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { heroMedia } from "@/lib/site";

export const Hero = () => {
  const t = useTranslations("Home");

  return (
    <section className="hero-video-behind relative isolate min-h-[min(100vh,54rem)] overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroMedia.poster}
          aria-hidden
        >
          <source src={heroMedia.src} type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#07080c]/92 via-[#07080c]/72 to-[#07080c]/35"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/20 to-transparent"
        />
      </div>

      <div className="relative mx-auto flex min-h-[min(100vh,54rem)] max-w-6xl flex-col justify-end px-4 pb-28 pt-28 sm:px-5 sm:pb-16 sm:pt-32 md:pb-24 md:pt-36">
        <p className="hero-kicker rise">{t("kicker")}</p>
        <h1 className="type-h1 mt-5 max-w-3xl text-balance text-white rise rise-delay-1">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/75 rise rise-delay-2 sm:text-lg sm:leading-8">
          {t("lede")}
        </p>
        <div className="mt-7 flex flex-col gap-2.5 rise rise-delay-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
          <Button href="/contact" size="lg" className="w-full sm:w-auto">
            {t("ctaPrimary")}
          </Button>
          <Button
            href="/solutions"
            size="lg"
            variant="outline"
            className="w-full border-white/25 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
          >
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
};
