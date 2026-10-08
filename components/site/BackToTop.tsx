"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function BackToTop() {
  const t = useTranslations("Common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const menuOpen =
        document.body.style.overflow === "hidden" || Boolean(document.querySelector(".mobile-drawer"));
      setVisible(window.scrollY > 480 && !menuOpen);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => {
      window.removeEventListener("scroll", onScroll);
      mo.disconnect();
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label={t("backToTop")}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] start-[max(1rem,env(safe-area-inset-left))] z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink text-white shadow-[0_10px_28px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:bottom-40 sm:end-5 sm:start-auto ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
        <path d="M10 15V5M5 9.5 10 4.5 15 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
