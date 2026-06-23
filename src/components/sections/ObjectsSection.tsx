"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";

const AUTO_SPEED = 0.6;
const PAUSE_AFTER_INTERACTION_MS = 3500;

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatIndex(n: number) {
  return String(n).padStart(2, "0");
}

export function ObjectsSection() {
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const hoverTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const carouselItems = useMemo(
    () => [...PRODUCTS, ...PRODUCTS].map((product, i) => ({
      product,
      key: `${product.id}-${i}`,
      index: (i % PRODUCTS.length) + 1,
    })),
    [],
  );

  const pauseAutoScroll = useCallback((resumeAfterMs = PAUSE_AFTER_INTERACTION_MS) => {
    pausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, resumeAfterMs);
  }, []);

  const getStep = useCallback(() => {
    const wrap = scrollWrapRef.current;
    if (!wrap) return 320;
    const panel = wrap.querySelector<HTMLElement>(".object-panel");
    if (!panel) return 320;
    const gap = parseFloat(getComputedStyle(panel.parentElement!).gap) || 24;
    return panel.offsetWidth + gap;
  }, []);

  const nudge = useCallback(
    (direction: 1 | -1) => {
      const wrap = scrollWrapRef.current;
      if (!wrap) return;
      pauseAutoScroll();
      wrap.scrollBy({ left: direction * getStep(), behavior: "smooth" });
    },
    [getStep, pauseAutoScroll],
  );

  const startHover = useCallback(
    (direction: 1 | -1) => {
      nudge(direction);
      hoverTimerRef.current = setInterval(() => nudge(direction), 450);
    },
    [nudge],
  );

  const stopHover = useCallback(() => {
    if (hoverTimerRef.current) {
      clearInterval(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => stopHover(), [stopHover]);

  useEffect(() => {
    const wrap = scrollWrapRef.current;
    if (!wrap) return;

    let raf = 0;

    const loop = () => {
      const half = wrap.scrollWidth / 2;
      if (half > wrap.clientWidth && !pausedRef.current && !draggingRef.current) {
        wrap.scrollLeft += AUTO_SPEED;
        if (wrap.scrollLeft >= half) {
          wrap.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      didDragRef.current = false;
      draggingRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartScrollRef.current = wrap.scrollLeft;
      pauseAutoScroll(PAUSE_AFTER_INTERACTION_MS * 2);
    };

    const onPointerMove = (e: PointerEvent) => {
      const delta = e.clientX - dragStartXRef.current;
      if (!draggingRef.current && Math.abs(delta) > 8) {
        draggingRef.current = true;
        didDragRef.current = true;
        wrap.setPointerCapture(e.pointerId);
      }
      if (!draggingRef.current) return;
      wrap.scrollLeft = dragStartScrollRef.current - delta;
      const half = wrap.scrollWidth / 2;
      if (half > 0) {
        if (wrap.scrollLeft >= half) wrap.scrollLeft -= half;
        if (wrap.scrollLeft < 0) wrap.scrollLeft += half;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (draggingRef.current) {
        wrap.releasePointerCapture(e.pointerId);
      }
      draggingRef.current = false;
      pauseAutoScroll();
    };

    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!horizontal) return;
      e.preventDefault();
      wrap.scrollLeft += e.deltaX + (e.shiftKey ? e.deltaY : 0);
      const half = wrap.scrollWidth / 2;
      if (half > 0) {
        if (wrap.scrollLeft >= half) wrap.scrollLeft -= half;
        if (wrap.scrollLeft < 0) wrap.scrollLeft += half;
      }
      pauseAutoScroll();
    };

    const onScroll = () => {
      if (draggingRef.current || pausedRef.current) {
        const half = wrap.scrollWidth / 2;
        if (half > wrap.clientWidth) {
          if (wrap.scrollLeft >= half) wrap.scrollLeft -= half;
          if (wrap.scrollLeft < 0) wrap.scrollLeft += half;
        }
      }
    };

    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerup", onPointerUp);
    wrap.addEventListener("pointercancel", onPointerUp);
    wrap.addEventListener("wheel", onWheel, { passive: false });
    wrap.addEventListener("scroll", onScroll, { passive: true });
    wrap.addEventListener("touchstart", () => pauseAutoScroll(), { passive: true });

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => pauseAutoScroll(800);

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerup", onPointerUp);
      wrap.removeEventListener("pointercancel", onPointerUp);
      wrap.removeEventListener("wheel", onWheel);
      wrap.removeEventListener("scroll", onScroll);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [pauseAutoScroll]);

  return (
    <section id="products" className="objects section--alt">
      <header className="objects-head">
        <p className="eyebrow font-body">Products</p>
        <h2 className="objects-title font-display">Our luminaires</h2>
        <p className="section-lead section-lead--center font-body">
          Decorative and architectural fixtures engineered in-house.
        </p>
        <Link href="/products" className="objects-all-link link-cine font-body">
          View all products
        </Link>
      </header>

      <button
        type="button"
        className="objects-nav objects-nav--prev"
        aria-label="Previous products"
        onClick={() => nudge(-1)}
        onMouseEnter={() => startHover(-1)}
        onMouseLeave={stopHover}
      >
        <ArrowIcon dir="left" />
      </button>

      <button
        type="button"
        className="objects-nav objects-nav--next"
        aria-label="Next products"
        onClick={() => nudge(1)}
        onMouseEnter={() => startHover(1)}
        onMouseLeave={stopHover}
      >
        <ArrowIcon dir="right" />
      </button>

      <div ref={scrollWrapRef} className="objects-scroll-wrap">
        <div className="objects-track">
          {carouselItems.map(({ product, key, index }) => (
            <Link
              key={key}
              href={`/products/${product.id}`}
              className="object-panel"
              draggable={false}
              onClick={(e) => {
                if (didDragRef.current) {
                  e.preventDefault();
                  didDragRef.current = false;
                }
              }}
            >
              <div className="object-panel-img">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="380px" />
              </div>
              <div className="object-panel-meta font-body">
                <span className="object-index">{formatIndex(index)}</span>
                <h3 className="font-display">{product.name}</h3>
                <p>{product.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
