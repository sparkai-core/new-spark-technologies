"use client";

import Image from "next/image";

type IndustryId =
  | "energy-power"
  | "oil-gas"
  | "railways-metro"
  | "manufacturing"
  | "enterprise-automation"
  | "infrastructure";

type Kpi = {
  label: string;
  value: string;
  meta: string;
  tone: "blue" | "green" | "violet";
  chart: "wave" | "bars" | "pulse";
};

type SceneChip = {
  label: string;
  tone: "ok" | "warn" | "live";
  x: string;
  y: string;
};

const SCENES: Record<
  IndustryId,
  {
    kicker: string;
    kpis: Kpi[];
    chips: SceneChip[];
    status: string;
    image?: string;
  }
> = {
  "energy-power": {
    kicker: "Grid ops",
    kpis: [
      { label: "Line health", value: "99.1%", meta: "Uptime", tone: "blue", chart: "wave" },
      { label: "Load balance", value: "Stable", meta: "Corridor", tone: "green", chart: "pulse" },
      { label: "Fault risk", value: "Low", meta: "Live", tone: "violet", chart: "bars" },
    ],
    chips: [
      { label: "Vibration Normal", tone: "ok", x: "12%", y: "42%" },
      { label: "Thermal OK", tone: "ok", x: "58%", y: "28%" },
      { label: "Anomaly Watch", tone: "warn", x: "38%", y: "62%" },
    ],
    status: "Live corridor monitoring",
  },
  "oil-gas": {
    kicker: "Integrity ops",
    kpis: [
      { label: "Integrity", value: "97.4%", meta: "Score", tone: "blue", chart: "wave" },
      { label: "Leak risk", value: "Watch", meta: "Zone B", tone: "violet", chart: "pulse" },
      { label: "Throughput", value: "+3.1%", meta: "Shift", tone: "green", chart: "bars" },
    ],
    chips: [
      { label: "Pressure Normal", tone: "ok", x: "18%", y: "36%" },
      { label: "Vision AI Checking…", tone: "live", x: "52%", y: "48%" },
      { label: "Risk: Elevated", tone: "warn", x: "34%", y: "68%" },
    ],
    status: "Live asset integrity",
  },
  "railways-metro": {
    kicker: "Rail ops",
    kpis: [
      { label: "Track health", value: "98.6%", meta: "Network", tone: "blue", chart: "wave" },
      { label: "OHE status", value: "Clear", meta: "Live", tone: "green", chart: "pulse" },
      { label: "Delay risk", value: "1.2%", meta: "Peak", tone: "violet", chart: "bars" },
    ],
    chips: [
      { label: "Track Normal", tone: "ok", x: "14%", y: "44%" },
      { label: "Vision AI Scanning", tone: "live", x: "48%", y: "32%" },
      { label: "Signal Clear", tone: "ok", x: "62%", y: "66%" },
    ],
    status: "Live network operations",
  },
  manufacturing: {
    kicker: "Live Operations",
    kpis: [
      { label: "Asset Reliability", value: "98.7%", meta: "Uptime", tone: "blue", chart: "wave" },
      { label: "Quality", value: "99.2%", meta: "Pass rate", tone: "green", chart: "pulse" },
      { label: "Energy", value: "-12%", meta: "Consumption", tone: "violet", chart: "bars" },
    ],
    chips: [
      { label: "Vibration Normal", tone: "ok", x: "10%", y: "40%" },
      { label: "Vision AI Checking…", tone: "live", x: "46%", y: "30%" },
      { label: "Anomaly · High", tone: "warn", x: "36%", y: "64%" },
    ],
    status: "All systems operational",
    image: "/assets/industries/live-ops-dashboard.jpg",
  },
  "enterprise-automation": {
    kicker: "Control room",
    kpis: [
      { label: "Alerts cleared", value: "94%", meta: "Shift", tone: "blue", chart: "wave" },
      { label: "Response", value: "1.8m", meta: "Median", tone: "green", chart: "pulse" },
      { label: "Open tickets", value: "12", meta: "Live", tone: "violet", chart: "bars" },
    ],
    chips: [
      { label: "SCADA Live", tone: "live", x: "12%", y: "34%" },
      { label: "CMMS Synced", tone: "ok", x: "54%", y: "42%" },
      { label: "Escalation Ready", tone: "warn", x: "30%", y: "68%" },
    ],
    status: "Live control-room feed",
  },
  infrastructure: {
    kicker: "Site ops",
    kpis: [
      { label: "Site health", value: "96.8%", meta: "Fleet", tone: "blue", chart: "wave" },
      { label: "Inspections", value: "41", meta: "Today", tone: "green", chart: "pulse" },
      { label: "Critical", value: "2", meta: "Open", tone: "violet", chart: "bars" },
    ],
    chips: [
      { label: "Structure OK", tone: "ok", x: "16%", y: "38%" },
      { label: "Drone Pass Live", tone: "live", x: "50%", y: "28%" },
      { label: "Risk: Watch", tone: "warn", x: "40%", y: "66%" },
    ],
    status: "Live infrastructure monitoring",
  },
};

function Sparkline({ kind, tone }: { kind: Kpi["chart"]; tone: Kpi["tone"] }) {
  const stroke =
    tone === "green" ? "#16a34a" : tone === "violet" ? "#7c3aed" : "#2233ee";

  if (kind === "bars") {
    return (
      <div className="ops-bars" aria-hidden>
        {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
          <span
            key={i}
            style={{
              height: `${h}%`,
              animationDelay: `${i * 0.12}s`,
              background: stroke,
            }}
          />
        ))}
      </div>
    );
  }

  if (kind === "pulse") {
    return (
      <svg viewBox="0 0 64 24" className="ops-sparkline" aria-hidden>
        <path
          className="ops-sparkline-path"
          d="M1 16 L8 16 L12 8 L16 18 L22 6 L28 14 L34 10 L40 16 L46 4 L52 14 L58 12 L63 12"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 24" className="ops-sparkline" aria-hidden>
      <path
        className="ops-sparkline-path"
        d="M1 18 C10 18 12 6 20 8 C28 10 30 20 38 16 C46 12 50 4 63 6"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SceneSilhouette({ id }: { id: IndustryId }) {
  if (id === "energy-power") {
    return (
      <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="ep-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dfe4ff" />
            <stop offset="100%" stopColor="#f3e9ff" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#ep-g)" />
        <g className="ops-float" fill="#c5ccea" stroke="#8b93c7" strokeWidth="1.2">
          <rect x="40" y="110" width="48" height="56" rx="4" />
          <rect x="100" y="86" width="40" height="80" rx="4" />
          <rect x="156" y="70" width="52" height="96" rx="4" />
          <rect x="224" y="98" width="44" height="68" rx="4" />
          <path d="M64 110 V70 M120 86 V52 M182 70 V40 M246 98 V64" />
          <circle cx="64" cy="62" r="6" className="ops-glow-dot" fill="#2233ee" stroke="none" />
          <circle cx="120" cy="44" r="6" className="ops-glow-dot" fill="#7c3aed" stroke="none" style={{ animationDelay: "0.4s" }} />
          <circle cx="182" cy="32" r="6" className="ops-glow-dot" fill="#2233ee" stroke="none" style={{ animationDelay: "0.8s" }} />
        </g>
        <path
          className="ops-flow-line"
          d="M64 62 C100 90 140 50 182 32 C210 50 230 80 246 64"
          fill="none"
          stroke="#2233ee"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      </svg>
    );
  }

  if (id === "oil-gas") {
    return (
      <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
        <rect width="320" height="200" fill="#eef1ff" />
        <g fill="#d5daf0" stroke="#8f97c4" strokeWidth="1.2">
          <ellipse cx="90" cy="150" rx="38" ry="14" />
          <rect x="60" y="70" width="60" height="80" rx="30" />
          <ellipse cx="210" cy="150" rx="46" ry="16" />
          <rect x="174" y="58" width="72" height="92" rx="36" />
          <rect x="250" y="110" width="28" height="50" rx="3" />
        </g>
        <circle cx="90" cy="100" r="5" className="ops-glow-dot" fill="#2233ee" />
        <circle cx="210" cy="88" r="5" className="ops-glow-dot" fill="#ef4444" style={{ animationDelay: "0.5s" }} />
        <path
          className="ops-flow-line"
          d="M90 100 C130 70 170 120 210 88"
          fill="none"
          stroke="#2233ee"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      </svg>
    );
  }

  if (id === "railways-metro") {
    return (
      <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
        <rect width="320" height="200" fill="#f0f2ff" />
        <g stroke="#8b93c7" strokeWidth="2" fill="none">
          <path d="M20 140 H300" />
          <path d="M20 152 H300" />
          {[40, 80, 120, 160, 200, 240, 280].map((x) => (
            <path key={x} d={`M${x} 140 V152`} />
          ))}
        </g>
        <g className="ops-train" fill="#c8ceea" stroke="#6f78ad" strokeWidth="1.2">
          <rect x="70" y="108" width="120" height="28" rx="6" />
          <rect x="80" y="114" width="22" height="14" rx="2" fill="#e8ecff" />
          <rect x="110" y="114" width="22" height="14" rx="2" fill="#e8ecff" />
          <rect x="140" y="114" width="22" height="14" rx="2" fill="#e8ecff" />
        </g>
        <circle cx="160" cy="70" r="6" className="ops-glow-dot" fill="#2233ee" />
        <path
          className="ops-flow-line"
          d="M160 70 C160 90 160 100 160 108"
          fill="none"
          stroke="#2233ee"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
      </svg>
    );
  }

  if (id === "enterprise-automation") {
    return (
      <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
        <rect width="320" height="200" fill="#eef0ff" />
        <g fill="#fff" stroke="#c5ccea" strokeWidth="1">
          <rect x="36" y="40" width="72" height="44" rx="8" />
          <rect x="124" y="40" width="72" height="44" rx="8" />
          <rect x="212" y="40" width="72" height="44" rx="8" />
          <rect x="70" y="110" width="180" height="60" rx="10" />
        </g>
        <g fill="#2233ee">
          <circle cx="54" cy="62" r="4" className="ops-glow-dot" />
          <circle cx="142" cy="62" r="4" className="ops-glow-dot" style={{ animationDelay: "0.35s" }} />
          <circle cx="230" cy="62" r="4" className="ops-glow-dot" style={{ animationDelay: "0.7s" }} />
        </g>
        <path
          className="ops-flow-line"
          d="M72 84 C90 100 110 100 160 110 M160 84 C160 96 160 100 160 110 M248 84 C230 100 210 100 160 110"
          fill="none"
          stroke="#2233ee"
          strokeWidth="1.4"
          strokeDasharray="4 5"
        />
      </svg>
    );
  }

  // infrastructure default schematic
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <rect width="320" height="200" fill="#f1f0ff" />
      <g fill="#d9dcf0" stroke="#9098c4" strokeWidth="1.2">
        <path d="M40 150 L90 70 H130 L180 150 Z" />
        <rect x="200" y="90" width="70" height="60" rx="4" />
        <rect x="220" y="70" width="30" height="20" rx="2" />
      </g>
      <circle cx="110" cy="100" r="5" className="ops-glow-dot" fill="#2233ee" />
      <circle cx="235" cy="110" r="5" className="ops-glow-dot" fill="#7c3aed" style={{ animationDelay: "0.45s" }} />
      <path
        className="ops-flow-line"
        d="M110 100 C150 80 190 130 235 110"
        fill="none"
        stroke="#2233ee"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

export function IndustryOpsVisual({ id }: { id: IndustryId }) {
  const scene = SCENES[id];
  const isPhoto = Boolean(scene.image);

  return (
    <div className="ops-card relative h-full w-full overflow-hidden bg-[#eef0ff]">
      <div className="absolute inset-0">
        {isPhoto ? (
          <Image
            src={scene.image!}
            alt=""
            fill
            className="object-cover object-[center_35%]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
          />
        ) : (
          <SceneSilhouette id={id} />
        )}
      </div>

      {!isPhoto ? (
        <div className="pointer-events-none absolute inset-x-2 top-2 z-10 grid grid-cols-3 gap-1.5 sm:inset-x-3 sm:top-3 sm:gap-2">
          {scene.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="ops-kpi rounded-lg border border-white/80 bg-white/90 px-1.5 py-1.5 shadow-sm backdrop-blur-sm sm:rounded-xl sm:px-2 sm:py-2"
            >
              <p className="truncate text-[0.55rem] font-semibold leading-tight text-ink sm:text-[0.625rem]">
                {kpi.label}
              </p>
              <div className="mt-0.5 flex items-end justify-between gap-1">
                <div className="min-w-0">
                  <p className="truncate text-[0.7rem] font-bold leading-none tracking-tight text-ink sm:text-xs">
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 truncate text-[0.5rem] text-muted sm:text-[0.55rem]">
                    {kpi.meta}
                  </p>
                </div>
                <div className="hidden h-5 w-8 shrink-0 sm:block">
                  <Sparkline kind={kpi.chart} tone={kpi.tone} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isPhoto
        ? scene.chips.map((chip) => (
            <span
              key={chip.label}
              className={`ops-chip absolute z-10 max-w-[9rem] truncate rounded-full px-2 py-1 text-[0.55rem] font-semibold shadow-sm sm:text-[0.625rem] ${
                chip.tone === "warn"
                  ? "bg-red-500 text-white"
                  : chip.tone === "live"
                    ? "bg-[#2233ee] text-white"
                    : "bg-white/95 text-ink"
              }`}
              style={{ left: chip.x, top: chip.y }}
            >
              {chip.tone === "ok" ? (
                <span className="ops-chip-dot mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ) : null}
              {chip.label}
            </span>
          ))
        : null}

      <div className="pointer-events-none absolute inset-x-2 bottom-2 z-10 flex items-center justify-between gap-2 rounded-lg border border-white/70 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur-sm sm:inset-x-3 sm:bottom-3 sm:rounded-xl sm:px-3 sm:py-2">
        <span className="flex min-w-0 items-center gap-1.5 text-[0.55rem] font-semibold text-ink sm:text-[0.65rem]">
          <span className="ops-live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate">{scene.status}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 text-[0.55rem] font-bold uppercase tracking-wide text-[#2233ee] sm:text-[0.625rem]">
          Live
          <span className="ops-bars ops-bars-sm" aria-hidden>
            {[50, 80, 40, 70].map((h, i) => (
              <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </span>
        </span>
      </div>

      {isPhoto ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#eef0ff]/35 via-transparent to-transparent"
        />
      ) : null}
    </div>
  );
}
