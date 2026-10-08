"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    let settled = false;
    const show = () => {
      if (settled) return;
      settled = true;
      setShown(true);
    };

    // Already in (or near) view — don't wait for a scroll event.
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh + 80 && rect.bottom > -80) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );
    observer.observe(node);

    // Failsafe: never leave content permanently invisible.
    const fallback = window.setTimeout(show, 1800);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};
