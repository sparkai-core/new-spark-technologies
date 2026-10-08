import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  label?: string;
  className?: string;
};

export const Section = ({ children, id, label, className = "" }: SectionProps) => (
  <section id={id} aria-label={label} className={className}>
    <div className="mx-auto max-w-6xl px-5 section-y">{children}</div>
  </section>
);

type HeadingProps = {
  kicker: string;
  title: ReactNode;
  lede?: string;
};

export const SectionHeading = ({ kicker, title, lede }: HeadingProps) => (
  <div className="max-w-2xl">
    <p className="type-kicker">{kicker}</p>
    <h2 className="type-h2 mt-3 text-balance text-ink">{title}</h2>
    {lede && <p className="mt-4 text-base leading-7 text-ink-2">{lede}</p>}
  </div>
);
