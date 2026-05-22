"use client";

import { useRef, useEffect, useState } from "react";

const VENUES = [
  "The Fleece",
  "Trinity",
  "Exchange",
  "The Croft",
  "SWX",
  "Marble Factory",
  "The Prospect Building",
  "Shredenhams",
  "Thekla",
  "Rough Trade Bristol",
  "The Louisiana",
  "Roundhouse",
  "Brudenell Social Club",
  "O2 Academy Brixton",
  "Gorilla",
  "The Lexington",
  "Scala",
  "Underworld",
  "MOTH Club",
  "KOKO",
  "The Cab",
  "New Cross Inn",
  "Electric Ballroom",
];

const AUTO_SPEED = 0.5; // px per frame baseline — always applied
const FRICTION = 0.975; // high value = long, gradual coast

export default function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [grabbing, setGrabbing] = useState(false);

  // All mutable physics state lives in a single ref to avoid re-renders
  const s = useRef({
    offset: 0,
    vel: 0,
    dragging: false,
    lastX: 0,
    samples: [] as { x: number; t: number }[],
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function halfWidth() {
      return track!.scrollWidth / 2;
    }

    function wrap(offset: number) {
      const h = halfWidth();
      if (h <= 0) return offset;
      return ((offset % h) + h) % h;
    }

    function tick() {
      if (!s.current.dragging) {
        // Auto-scroll is always applied; fling vel decays on top of it
        s.current.vel *= FRICTION;
        s.current.offset += AUTO_SPEED + s.current.vel;
      }

      s.current.offset = wrap(s.current.offset);
      track!.style.transform = `translateX(${-s.current.offset}px)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent | TouchEvent) {
      if (!s.current.dragging) return;
      const x = "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const dx = x - s.current.lastX;
      s.current.offset -= dx;
      s.current.lastX = x;
      const t = performance.now();
      s.current.samples.push({ x, t });
      // Keep only the last 80ms of samples for velocity calculation
      const cutoff = t - 80;
      s.current.samples = s.current.samples.filter((p) => p.t >= cutoff);
    }

    function onUp() {
      if (!s.current.dragging) return;
      s.current.dragging = false;
      setGrabbing(false);

      // Derive release velocity from recent pointer samples
      if (s.current.samples.length >= 2) {
        const first = s.current.samples[0];
        const last = s.current.samples[s.current.samples.length - 1];
        const dt = last.t - first.t;
        if (dt > 0) {
          const dx = last.x - first.x;
          // Convert px/ms → px/frame (≈16.67ms at 60fps), negate for direction
          s.current.vel = -(dx / dt) * 16.67;
        }
      }
      s.current.samples = [];
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  function onPointerDown(e: React.MouseEvent | React.TouchEvent) {
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    s.current.dragging = true;
    s.current.vel = 0;
    s.current.lastX = x;
    s.current.samples = [{ x, t: performance.now() }];
    setGrabbing(true);
  }

  const items = [...VENUES, ...VENUES];

  return (
    <div
      className="border-y border-scene-border py-4 overflow-hidden select-none"
      style={{ background: "#080808", cursor: grabbing ? "grabbing" : "grab" }}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {items.map((venue, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span className="text-scene-muted text-sm font-medium px-6">{venue}</span>
            <span className="text-scene-separator select-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
