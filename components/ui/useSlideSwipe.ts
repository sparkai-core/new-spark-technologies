"use client";

import { useRef, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";

export function useSlideSwipe(
  count: number,
  setActive: (update: (current: number) => number) => void,
  setPaused: (paused: boolean) => void,
) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    start.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
    setPaused(true);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (!start.current) return;
    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy)) {
      setPaused(false);
      return;
    }
    swiped.current = true;
    const rtl = document.documentElement.dir === "rtl";
    const forward = rtl ? dx > 0 : dx < 0;
    setActive((current) =>
      forward ? (current + 1) % count : (current - 1 + count) % count,
    );
    window.setTimeout(() => setPaused(false), 5000);
  };

  const onPointerCancel = () => {
    start.current = null;
    setPaused(false);
  };

  const onClickCapture = (event: MouseEvent<HTMLElement>) => {
    if (!swiped.current) return;
    event.preventDefault();
    event.stopPropagation();
    swiped.current = false;
  };

  return { onPointerDown, onPointerUp, onPointerCancel, onClickCapture };
}
