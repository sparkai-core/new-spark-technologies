"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const TRAD = [0, 1, 2, 3, 4] as const;
const SPARK = [0, 1, 2, 3, 4] as const;

const SAVINGS = [
  { value: 40, suffix: "%", bar: 40, labelKey: "shiftSave0Label" as const },
  { value: 70, suffix: "%", bar: 70, labelKey: "shiftSave1Label" as const },
  { value: 50, suffix: "%", bar: 50, labelKey: "shiftSave2Label" as const },
] as const;

function useInViewOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, on };
}

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }

    let frame = 0;
    const began = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const progress = Math.min((now - began) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);

  return value;
}

function SavingStat({
  value,
  suffix,
  bar,
  label,
  start,
  delay,
}: {
  value: number;
  suffix: string;
  bar: number;
  label: string;
  start: boolean;
  delay: number;
}) {
  const shown = useCountUp(value, start);

  return (
    <li className="shift-save-stat" style={{ animationDelay: start ? `${delay}ms` : undefined }}>
      <p className="flex items-baseline gap-0.5">
        <span className="text-[1.65rem] font-bold leading-none tracking-[-0.04em] sm:text-[1.85rem]">
          {shown}
        </span>
        <span className="text-[0.95rem] font-semibold text-[#8b9bff]">{suffix}</span>
      </p>
      <p className="mt-1 text-[0.72rem] leading-4 text-on-brand/60">{label}</p>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
        <div
          className="shift-save-bar h-full rounded-full bg-[#8b9bff]"
          style={{ width: start ? `${bar}%` : "0%" }}
        />
      </div>
    </li>
  );
}

export function ShiftCompare() {
  const t = useTranslations("Home");
  const tc = useTranslations("HomeContent");
  const { ref, on } = useInViewOnce();

  return (
    <div ref={ref} className={`shift-compare ${on ? "is-on" : ""}`}>
      <article className="shift-compare-card shift-compare-card--trad">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
              {t("shiftCompareBefore")}
            </p>
            <h3 className="mt-1.5 text-sm font-semibold text-ink">{t("shiftTraditional")}</h3>
          </div>
          <p className="max-w-[9.5rem] shrink-0 rounded-full border border-border bg-bg px-2.5 py-1 text-center text-[0.65rem] font-semibold leading-4 text-muted">
            {t("shiftCompareLeakBadge")}
          </p>
        </header>

        <ul className="mt-5 space-y-2.5">
          {TRAD.map((i) => (
            <li
              key={i}
              className="shift-compare-row flex items-center gap-2.5 text-[0.9375rem] leading-6 text-ink-2"
              style={{ animationDelay: on ? `${80 + i * 70}ms` : undefined }}
            >
              <span className="shift-compare-mark shift-compare-mark--minus" aria-hidden>
                –
              </span>
              {tc(`trad${i}` as "trad0")}
            </li>
          ))}
        </ul>

        <div className="shift-compare-leak mt-6">
          <div className="flex items-end justify-between gap-3">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.08em] text-muted">
              {t("shiftCompareLeak")}
            </p>
            <p className="text-[1.35rem] font-bold tracking-[-0.03em] text-ink">
              {t("shiftCompareLeakValue")}
            </p>
          </div>
          <p className="mt-1 text-[0.78rem] leading-5 text-ink-2">{t("shiftCompareLeakNote")}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#ece8f4]" aria-hidden>
            <div className="shift-leak-bar h-full rounded-full bg-[#c5cad3]" />
          </div>
        </div>
      </article>

      <span className="shift-compare-vs" aria-hidden>
        {t("shiftCompareVs")}
      </span>

      <article className="shift-compare-card shift-compare-card--spark">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-on-brand/45">
              {t("shiftCompareAfter")}
            </p>
            <h3 className="mt-1.5 text-sm font-semibold text-on-brand">{t("shiftSpark")}</h3>
          </div>
          <p className="inline-flex max-w-[11rem] shrink-0 items-center justify-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-center text-[0.65rem] font-semibold leading-4 text-[#b7c0ff]">
            <span className="shift-compare-live" aria-hidden />
            {t("shiftCompareSaveBadge")}
          </p>
        </header>

        <ul className="mt-5 space-y-2.5">
          {SPARK.map((i) => (
            <li
              key={i}
              className="shift-compare-row flex items-center gap-2.5 text-[0.9375rem] leading-6"
              style={{ animationDelay: on ? `${140 + i * 70}ms` : undefined }}
            >
              <span className="shift-compare-mark shift-compare-mark--plus" aria-hidden>
                +
              </span>
              {tc(`spark${i}` as "spark0")}
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {SAVINGS.map((item, i) => (
            <SavingStat
              key={item.labelKey}
              value={item.value}
              suffix={item.suffix}
              bar={item.bar}
              label={t(item.labelKey)}
              start={on}
              delay={420 + i * 120}
            />
          ))}
        </ul>
        <p className="mt-4 text-[0.72rem] leading-5 text-on-brand/45">{t("shiftCompareFoot")}</p>
      </article>
    </div>
  );
}
