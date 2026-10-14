"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCt } from "@/components/i18n/ContentI18n";

type Step = { label: string; caption: string };
type Pin = { x: number; y: number; dx: number; dy: number };
type IconCard = { src: string; label: string; corner: "tl" | "tr" | "bl" | "br" };

type Scene = {
  steps: Step[];
  pins: Pin[];
  icons: IconCard[];
};

const SCENES: Record<string, Scene> = {
  systems: {
    steps: [
      { label: "Sense", caption: "SCADA · IoT · cameras" },
      { label: "Detect", caption: "Anomaly models" },
      { label: "Rank risk", caption: "Criticality score" },
      { label: "Decide", caption: "Ops policy" },
      { label: "Work order", caption: "CMMS / ERP" },
      { label: "Execute", caption: "Crews & systems" },
      { label: "Learn", caption: "Outcome feedback" },
    ],
    pins: [
      { x: 18, y: 52, dx: -8, dy: -12 },
      { x: 38, y: 42, dx: -10, dy: -14 },
      { x: 48, y: 58, dx: 8, dy: 10 },
      { x: 44, y: 32, dx: -8, dy: -12 },
      { x: 58, y: 62, dx: 10, dy: 8 },
      { x: 64, y: 40, dx: 10, dy: -10 },
      { x: 80, y: 38, dx: 8, dy: -10 },
    ],
    icons: [
      { src: "/assets/suites/icons/reliability.jpg", label: "Reliability", corner: "tl" },
      { src: "/assets/suites/icons/inspect.jpg", label: "Inspection", corner: "tr" },
      { src: "/assets/suites/icons/energy.jpg", label: "Energy", corner: "br" },
    ],
  },
  products: {
    steps: [
      { label: "Construction", caption: "Projects · vendors · risk" },
      { label: "Duct OS", caption: "HVAC take-offs · BOQ" },
      { label: "Finance AI", caption: "OCR · cash flow" },
      { label: "Procure AI", caption: "Quotes · vendors" },
      { label: "Slotwise", caption: "Scheduling" },
      { label: "Voice", caption: "Inbound · outbound" },
    ],
    pins: [
      { x: 28, y: 32, dx: -10, dy: -12 },
      { x: 50, y: 32, dx: 0, dy: -14 },
      { x: 72, y: 32, dx: 10, dy: -12 },
      { x: 28, y: 64, dx: -10, dy: 10 },
      { x: 50, y: 64, dx: 0, dy: 12 },
      { x: 72, y: 64, dx: 10, dy: 10 },
    ],
    icons: [
      { src: "/assets/suites/icons/construction.jpg", label: "Construction AI", corner: "tl" },
      { src: "/assets/suites/icons/duct.jpg", label: "Duct OS", corner: "tr" },
      { src: "/assets/suites/icons/finance.jpg", label: "Finance AI", corner: "bl" },
      { src: "/assets/suites/icons/procure.jpg", label: "Procure AI", corner: "br" },
    ],
  },
  industries: {
    steps: [
      { label: "Energy", caption: "Grid & corridors" },
      { label: "Oil & Gas", caption: "Integrity & loading" },
      { label: "Rail", caption: "Track & OHE" },
      { label: "Manufacturing", caption: "Line & quality" },
      { label: "Unify", caption: "Cross-site signals" },
      { label: "Ops layer", caption: "Detect → decide → act" },
    ],
    pins: [
      { x: 26, y: 34, dx: 10, dy: 8 },
      { x: 72, y: 34, dx: -12, dy: 8 },
      { x: 26, y: 66, dx: 10, dy: -8 },
      { x: 72, y: 66, dx: -12, dy: -8 },
      { x: 50, y: 46, dx: -8, dy: -12 },
      { x: 50, y: 54, dx: 10, dy: 10 },
    ],
    icons: [
      { src: "/assets/suites/icons/energy.jpg", label: "Energy", corner: "tl" },
      { src: "/assets/suites/icons/oil.jpg", label: "Oil & Gas", corner: "tr" },
      { src: "/assets/suites/icons/rail.jpg", label: "Rail", corner: "bl" },
      { src: "/assets/suites/icons/factory.jpg", label: "Manufacturing", corner: "br" },
    ],
  },
  platform: {
    steps: [
      { label: "Data", caption: "Sensors · historians" },
      { label: "Integrate", caption: "ERP · CMMS · APIs" },
      { label: "Intelligence", caption: "Models · insights" },
      { label: "Policy", caption: "Approvals & controls" },
      { label: "Agents", caption: "Execute workflows" },
      { label: "Deploy", caption: "Cloud · on-prem · hybrid" },
    ],
    pins: [
      { x: 28, y: 48, dx: -10, dy: -12 },
      { x: 78, y: 32, dx: 8, dy: -12 },
      { x: 52, y: 52, dx: 0, dy: 12 },
      { x: 62, y: 40, dx: 10, dy: -10 },
      { x: 38, y: 42, dx: -10, dy: -12 },
      { x: 55, y: 62, dx: 8, dy: 10 },
    ],
    icons: [
      { src: "/assets/suites/icons/energy.jpg", label: "Data layer", corner: "tl" },
      { src: "/assets/suites/icons/inspect.jpg", label: "Intelligence", corner: "tr" },
      { src: "/assets/suites/icons/drone.jpg", label: "Agents", corner: "br" },
    ],
  },
  agents: {
    steps: [
      { label: "Signal", caption: "Vision · thermal · IoT" },
      { label: "Reason", caption: "Next best action" },
      { label: "Approve", caption: "Human gate" },
      { label: "Execute", caption: "Systems & workflows" },
      { label: "Handoff", caption: "Field crew" },
      { label: "Verify", caption: "Control room" },
    ],
    pins: [
      { x: 78, y: 38, dx: 8, dy: -12 },
      { x: 50, y: 28, dx: 0, dy: -14 },
      { x: 50, y: 54, dx: -12, dy: 8 },
      { x: 42, y: 64, dx: -10, dy: 10 },
      { x: 18, y: 48, dx: -8, dy: -12 },
      { x: 52, y: 24, dx: 10, dy: -10 },
    ],
    icons: [
      { src: "/assets/suites/icons/drone.jpg", label: "Inspection", corner: "tl" },
      { src: "/assets/suites/icons/reliability.jpg", label: "Reliability", corner: "br" },
      { src: "/assets/suites/icons/inspect.jpg", label: "Ops handoff", corner: "bl" },
    ],
  },
};

export function SuiteOpsVisual({ id, active = true }: { id: string; active?: boolean }) {
  const ct = useCt();
  const scene = ct.deep(SCENES[id]);
  const steps = scene?.steps ?? [];
  const pins = scene?.pins ?? [];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active || steps.length === 0) return;
    const timer = window.setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [active, steps.length]);

  if (!scene || steps.length === 0) return null;

  const pin = pins[step % pins.length];
  const current = steps[step];
  const lx = Math.min(78, Math.max(22, pin.x + pin.dx));
  const ly = Math.min(68, Math.max(24, pin.y + pin.dy));
  const growLeft = lx > pin.x;
  const cols =
    steps.length >= 7 ? "sm:grid-cols-7" : steps.length === 6 ? "sm:grid-cols-6" : "sm:grid-cols-5";

  return (
    <div className="overflow-hidden rounded-[1.15rem] border border-[#e6e4f0] bg-[#f3f1f8] shadow-[0_18px_40px_-28px_rgba(15,17,21,0.45)]">
      <div className="relative aspect-video w-full">
        <Image
          src={`/assets/suites/scene-${id}.jpg`}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 90vw, 560px"
          priority={active}
        />

        {scene.icons.map((icon, i) => (
          <div
            key={icon.label}
            className={`suite-icon-card suite-icon-card--${icon.corner} ${active ? "is-on" : ""}`}
            style={{ animationDelay: `${i * 180}ms` }}
          >
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-white sm:h-9 sm:w-9">
              <Image src={icon.src} alt="" fill className="object-cover" sizes="36px" />
            </span>
            <span className="whitespace-nowrap text-[0.62rem] font-semibold leading-4 text-ink sm:text-[0.68rem]">
              {icon.label}
            </span>
          </div>
        ))}

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
            stroke="#1d4ed8"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        </svg>

        {pins.map((item, i) => (
          <span
            key={steps[i]?.label ?? i}
            className={`pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              i === step
                ? "h-3 w-3 bg-[#2233ee] shadow-[0_0_0_5px_rgba(34,51,238,0.16)]"
                : "h-1.5 w-1.5 bg-[#2233ee]/35"
            }`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            aria-hidden
          >
            {i === step ? (
              <span className="mod-ring absolute left-1/2 top-1/2 h-7 w-7 rounded-full border border-[#2233ee]/70" />
            ) : null}
          </span>
        ))}

        <div
          key={`${id}-${step}`}
          className="mod-pin absolute z-30"
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

      <ol
        className={`grid grid-cols-2 border-t border-[#e7e4f0] bg-white/80 min-[420px]:grid-cols-3 ${cols}`}
      >
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
                <span className={`text-[0.68rem] font-semibold leading-tight sm:text-[0.72rem] ${on ? "text-ink" : ""}`}>
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
