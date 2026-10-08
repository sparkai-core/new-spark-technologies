import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  systems: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" />
    </>
  ),
  products: (
    <path d="M12 3.6 20 8v8l-8 4.4L4 16V8l8-4.4Z M12 12V21.2 M4 8l8 4 8-4" />
  ),
  industries: (
    <>
      <path d="M4.5 20V8.5l6-3.2V20" />
      <path d="M10.5 20V10h9v10" />
      <path d="M13.2 13h3.6M13.2 16h3.6M6.6 11.2h2M6.6 14.2h2M6.6 17.2h2" />
    </>
  ),
  platform: (
    <>
      <rect x="3.8" y="4" width="16.4" height="5" rx="1.4" />
      <rect x="6" y="10.5" width="12" height="4.4" rx="1.2" />
      <rect x="8.2" y="16.4" width="7.6" height="3.6" rx="1" />
    </>
  ),
  agents: (
    <>
      <rect x="4" y="6.5" width="16" height="11" rx="3.2" />
      <circle cx="9.2" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
};

export function SuiteTabIcon({ id, active }: { id: string; active: boolean }) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
        active ? "bg-ink text-on-brand" : "bg-[#ececef] text-[#9a9aa3]"
      }`}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[id] ?? ICONS.systems}
      </svg>
    </span>
  );
}
