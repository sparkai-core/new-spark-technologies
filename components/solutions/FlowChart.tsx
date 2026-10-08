"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { ModuleFlowStep } from "@/lib/modules";

type FlowChartProps = {
  steps: ModuleFlowStep[];
  title?: string;
};

export const FlowChart = ({ steps, title }: FlowChartProps) => {
  const t = useTranslations("FlowChart");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [playing, steps.length]);

  return (
    <div className="panel overflow-hidden p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="type-kicker">{t("processFlow")}</p>
          <h3 className="type-h3 mt-2">{title ?? t("howItWorks")}</h3>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-ink-2 hover:bg-surface"
        >
          {playing ? t("pause") : t("play")}
        </button>
      </div>

      <ol className="flow-track mt-8 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {steps.map((step, index) => {
          const isActive = index === active;
          const isDone = index < active;
          return (
            <li key={step.label} className="relative flex flex-1 md:flex-col">
              <button
                type="button"
                onClick={() => {
                  setActive(index);
                  setPlaying(false);
                }}
                className={`flow-node group flex w-full flex-1 items-start gap-3 rounded-lg border px-3 py-3 text-left transition md:flex-col md:items-center md:px-2 md:py-4 md:text-center ${
                  isActive
                    ? "border-brand bg-brand-soft shadow-[var(--shadow-sm)]"
                    : isDone
                      ? "border-brand/30 bg-bg"
                      : "border-border bg-bg hover:border-border-strong"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-brand text-white"
                      : isDone
                        ? "bg-brand/15 text-brand"
                        : "bg-surface text-muted"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{step.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-ink-2 md:text-[13px]">
                    {step.detail}
                  </span>
                </span>
              </button>
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className={`flow-connector hidden md:block ${isDone || isActive ? "is-lit" : ""}`}
                />
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-5 rounded-md bg-surface px-4 py-3 text-sm text-ink-2">
        <span className="font-semibold text-ink">
          {t("now")} {steps[active].label}
        </span>
        <span className="mx-2 text-muted">·</span>
        {steps[active].detail}
      </p>
    </div>
  );
};
