"use client";

const IMPACT = [
  { value: "+32%", label: "Revenue growth", tone: "blue" as const },
  { value: "−45%", label: "Manual work", tone: "blue" as const },
  { value: "+60%", label: "Customer satisfaction", tone: "violet" as const },
];

export function BusinessImpactCard({ className = "" }: { className?: string }) {
  return (
    <aside className={`business-impact-pop ${className}`} aria-hidden>
      <div className="flex items-start justify-between gap-2">
        <p className="max-w-[4.5rem] text-[0.72rem] font-semibold leading-tight tracking-[-0.01em] text-[#0f1115]">
          Business Impact
        </p>
        <span
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#e8f8ef] text-[#1a7a45]"
        >
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
            <path
              d="M2 8.5 5 5.5 7 7.5 10 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <ul className="mt-2.5 space-y-2">
        {IMPACT.map((item) => (
          <li key={item.label} className="flex items-start gap-2">
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                item.tone === "violet" ? "bg-[#efe9ff] text-[#6b3fd4]" : "bg-[#e8ecff] text-[#2233ee]"
              }`}
            >
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor">
                <rect x="1.5" y="6" width="2" height="4" rx="0.4" />
                <rect x="5" y="3.5" width="2" height="6.5" rx="0.4" />
                <rect x="8.5" y="1.5" width="2" height="8.5" rx="0.4" />
              </svg>
            </span>
            <span>
              <span className="block text-[0.78rem] font-bold tracking-[-0.02em] text-[#0f1115]">
                {item.value}
              </span>
              <span className="block text-[0.58rem] leading-3.5 text-[#6b7280]">{item.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
