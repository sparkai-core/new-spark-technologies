"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { modules } from "@/lib/modules";

/** x/y land on the equipment. dx/dy place the chip so the leader stays visible. */
type Pin = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  hot?: boolean;
};

const PINS: Record<string, Pin[]> = {
  "asset-reliability": [
    { x: 20, y: 54, dx: -10, dy: -16 },
    { x: 47, y: 63, dx: -14, dy: -8 },
    { x: 37, y: 36, dx: -12, dy: -12 },
    { x: 71, y: 63, dx: 12, dy: 6, hot: true },
    { x: 63, y: 24, dx: 12, dy: -8 },
  ],
  "quality-inspection": [
    { x: 16, y: 48, dx: -6, dy: -16 },
    { x: 40, y: 44, dx: -12, dy: -14 },
    { x: 72, y: 30, dx: 10, dy: -10 },
    { x: 81, y: 56, dx: 8, dy: 12 },
    { x: 54, y: 68, dx: -14, dy: 10 },
  ],
  "production-process": [
    { x: 14, y: 56, dx: -6, dy: -14 },
    { x: 34, y: 62, dx: -12, dy: 10, hot: true },
    { x: 48, y: 58, dx: 12, dy: 12 },
    { x: 80, y: 50, dx: 8, dy: 12 },
    { x: 64, y: 22, dx: 12, dy: -8 },
  ],
  "energy-fuel": [
    { x: 24, y: 34, dx: -10, dy: -12 },
    { x: 56, y: 26, dx: -8, dy: -10 },
    { x: 48, y: 44, dx: -14, dy: 10 },
    { x: 90, y: 36, dx: 4, dy: -12 },
    { x: 76, y: 46, dx: 10, dy: 12 },
  ],
  "supply-chain": [
    { x: 18, y: 40, dx: -8, dy: -14 },
    { x: 30, y: 68, dx: -10, dy: 10 },
    { x: 70, y: 26, dx: 12, dy: -8 },
    { x: 48, y: 48, dx: -14, dy: 12 },
    { x: 80, y: 60, dx: 8, dy: 12 },
  ],
  "demand-forecasting": [
    { x: 40, y: 68, dx: -12, dy: 8 },
    { x: 22, y: 46, dx: -8, dy: -14 },
    { x: 52, y: 58, dx: 0, dy: 12 },
    { x: 66, y: 46, dx: 0, dy: -14 },
    { x: 84, y: 32, dx: 6, dy: -12 },
  ],
  "financial-intelligence": [
    { x: 30, y: 48, dx: -12, dy: -12 },
    { x: 48, y: 52, dx: -10, dy: 14 },
    { x: 62, y: 46, dx: 0, dy: -16 },
    { x: 76, y: 34, dx: 10, dy: -10 },
    { x: 78, y: 50, dx: 10, dy: 12 },
  ],
  "workforce-safety": [
    { x: 58, y: 20, dx: 12, dy: -6 },
    { x: 32, y: 68, dx: -12, dy: 8 },
    { x: 48, y: 54, dx: -14, dy: -8, hot: true },
    { x: 20, y: 50, dx: -8, dy: -14 },
    { x: 76, y: 44, dx: 10, dy: -10 },
  ],
};

const FALLBACK: Pin[] = [
  { x: 22, y: 56, dx: -10, dy: -14 },
  { x: 42, y: 66, dx: -12, dy: 10 },
  { x: 50, y: 36, dx: 0, dy: -14 },
  { x: 70, y: 56, dx: 12, dy: 8 },
  { x: 78, y: 30, dx: 8, dy: -10 },
];

export function ModuleOpsVisual({
  id,
  active = true,
}: {
  id: string;
  active?: boolean;
}) {
  const mod = modules.find((m) => m.id === id);
  const steps = mod?.flow ?? [];
  const pins = PINS[id] ?? FALLBACK;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active || steps.length === 0) return;
    const timer = window.setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [active, steps.length]);

  if (!mod || steps.length === 0) return null;

  const pin = pins[step % pins.length];
  const current = steps[step];
  const alert = Boolean(pin.hot);
  const lx = Math.min(92, Math.max(8, pin.x + pin.dx));
  const ly = Math.min(88, Math.max(12, pin.y + pin.dy));
  const growLeft = lx > pin.x;

  return (
    <div className="overflow-hidden rounded-[1.15rem] border border-[#e6e4f0] bg-[#f3f1f8] shadow-[0_18px_40px_-28px_rgba(15,17,21,0.45)]">
      <div className="relative aspect-video w-full">
        <Image
          src={`/assets/modules/scenes/scene-${id}.jpg`}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 90vw, 560px"
          priority={active}
        />

        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line
            x1={lx}
            y1={ly}
            x2={pin.x}
            y2={pin.y}
            className="mod-leader"
            stroke={alert ? "#e11d48" : "#1d4ed8"}
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </svg>

        {pins.map((item, i) => (
          <span
            key={steps[i]?.label ?? i}
            className={`pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              i === step
                ? alert
                  ? "h-3 w-3 bg-rose-500 shadow-[0_0_0_5px_rgba(225,29,72,0.18)]"
                  : "h-3 w-3 bg-[#2233ee] shadow-[0_0_0_5px_rgba(34,51,238,0.16)]"
                : "h-1.5 w-1.5 bg-[#2233ee]/35"
            }`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            aria-hidden
          >
            {i === step ? (
              <span
                className={`mod-ring absolute left-1/2 top-1/2 h-7 w-7 rounded-full border ${
                  alert ? "border-rose-500/70" : "border-[#2233ee]/70"
                }`}
              />
            ) : null}
          </span>
        ))}

        <div
          key={`${id}-${step}`}
          className={`mod-pin absolute z-30 ${alert ? "mod-pin-hot" : ""}`}
          style={{
            left: `${lx}%`,
            top: `${ly}%`,
            transform: growLeft ? "translate(-100%, -50%)" : "translate(0, -50%)",
          }}
        >
          <span className="font-mono text-[0.56rem] tracking-[0.08em] opacity-70">
            {String(step + 1).padStart(2, "0")}
          </span>
          <span>{current.label}</span>
        </div>
      </div>

      <ol className="grid grid-cols-2 border-t border-[#e7e4f0] bg-white/80 min-[420px]:grid-cols-3 sm:grid-cols-5">
        {steps.map((item, i) => {
          const on = i === step;
          const done = i < step;
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={on ? "step" : undefined}
                className={`flex h-full w-full flex-col items-center gap-1 px-1 py-2.5 text-center transition-colors sm:py-3 ${
                  on ? "bg-white text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`font-mono text-[0.58rem] tracking-[0.08em] ${
                    on ? "text-[#2233ee]" : done ? "text-ink-2" : ""
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-[0.72rem] font-semibold leading-tight sm:text-[0.72rem] ${on ? "text-ink" : ""}`}>
                  {item.label}
                </span>
                <span
                  className={`mt-0.5 h-[2px] w-6 rounded-full ${
                    on ? "bg-[#2233ee]" : done ? "bg-ink/25" : "bg-transparent"
                  }`}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
