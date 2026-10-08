"use client";

import { useTranslations } from "next-intl";

type SlideControlsProps = {
  count: number;
  active: number;
  onPrev: () => void;
  onNext: () => void;
};

export function SlideControls({ count, active, onPrev, onNext }: SlideControlsProps) {
  const t = useTranslations("Common");

  return (
    <div className="mt-4 flex items-center justify-between gap-3 sm:hidden">
      <button
        type="button"
        onClick={onPrev}
        aria-label={t("previous")}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-bg text-ink"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 rtl:scale-x-[-1]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12.5 4.5 7 10l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="text-sm font-medium tabular-nums text-ink-2">
        {active + 1} / {count}
      </p>
      <button
        type="button"
        onClick={onNext}
        aria-label={t("next")}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-bg text-ink"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 rtl:scale-x-[-1]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M7.5 4.5 13 10l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
