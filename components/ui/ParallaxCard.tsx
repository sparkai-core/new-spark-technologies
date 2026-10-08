"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { BusinessImpactCard } from "@/components/ui/BusinessImpactCard";

type ParallaxCardProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  maxTilt?: number;
  maxLift?: number;
  style?: CSSProperties;
  showImpact?: boolean;
};

export function ParallaxCard({
  children,
  className = "",
  contentClassName = "",
  maxTilt = 10,
  maxLift = 12,
  style,
  showImpact = true,
}: ParallaxCardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const [tilting, setTilting] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const applyTilt = useCallback(
    (nx: number, ny: number, activeTilt: boolean) => {
      const board = boardRef.current;
      if (!board) return;

      const rotateY = activeTilt ? nx * maxTilt : 0;
      const rotateX = activeTilt ? -ny * maxTilt : 0;
      const lift = activeTilt ? maxLift : 0;
      const glareX = ((nx + 1) / 2) * 100;
      const glareY = ((ny + 1) / 2) * 100;

      board.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${lift}px)`;
      board.style.boxShadow = activeTilt
        ? `${(-nx * 16).toFixed(1)}px ${(18 + ny * 8).toFixed(1)}px 42px -18px rgba(15, 17, 21, 0.36)`
        : "";

      if (glareRef.current) {
        glareRef.current.style.opacity = activeTilt ? "1" : "0";
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 35%, transparent 62%)`;
      }

      if (contentRef.current) {
        contentRef.current.style.transform = activeTilt
          ? `translateZ(22px) translate(${(nx * -5).toFixed(1)}px, ${(ny * -5).toFixed(1)}px)`
          : "translateZ(0)";
      }
    },
    [maxLift, maxTilt],
  );

  const resetTilt = useCallback(() => {
    setTilting(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyTilt(0, 0, false));
  }, [applyTilt]);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reducedMotionRef.current || event.pointerType !== "mouse") return;
      const board = boardRef.current;
      if (!board) return;

      const rect = board.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTilting(true);
        applyTilt(Math.max(-1, Math.min(1, nx)), Math.max(-1, Math.min(1, ny)), true);
      });
    },
    [applyTilt],
  );

  useEffect(() => {
    applyTilt(0, 0, false);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyTilt]);

  return (
    <div
      className="parallax-card-stage touch-pan-y"
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <div
        ref={boardRef}
        className={`parallax-card ${tilting ? "is-tilting" : ""} ${className}`}
        style={style}
      >
        <div ref={glareRef} className="parallax-card-glare" aria-hidden />
        <div ref={contentRef} className={`parallax-card-content ${contentClassName}`}>
          {children}
        </div>
      </div>
      {showImpact ? <BusinessImpactCard /> : null}
    </div>
  );
}
