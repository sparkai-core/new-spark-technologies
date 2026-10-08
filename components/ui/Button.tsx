import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-ink text-on-brand hover:bg-dark shadow-[var(--shadow-sm)]",
  outline: "border border-border-strong bg-transparent text-ink hover:bg-surface",
  ghost: "text-ink-2 hover:text-ink hover:bg-surface",
  light: "bg-bg text-ink border border-border hover:bg-surface shadow-[var(--shadow-sm)]",
} as const;

const sizes = {
  sm: "min-h-11 px-3.5 py-2 text-[13px]",
  md: "min-h-10 px-5 py-2.5 text-sm",
  lg: "min-h-11 px-5 py-2.5 text-[0.9375rem] sm:px-6",
} as const;

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  type?: "button" | "submit";
};

const isExternal = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

export const Button = ({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: ButtonProps) => {
  const classes = `inline-flex max-w-full items-center justify-center gap-2 text-center rounded-md font-semibold tracking-tight transition duration-[var(--t-micro)] ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} rel={href.startsWith("http") ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};
