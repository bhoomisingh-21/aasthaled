"use client";

import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import { useScrollReady } from "@/hooks/ScrollProvider";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_MQ = "(max-width: 767px)";

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

export function ObjectsSection() {
  const ready = useScrollReady();
  const ref = useRef<HTMLElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animatingRef = useRef(false);

  const isMobile = useCallback(() => window.matchMedia(MOBILE_MQ).matches, []);

  const getMax = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return Math.max(0, track.scrollWidth - window.innerWidth);
  }, []);

  const getExplore = useCallback(
    (multiplier: number) => window.innerHeight * multiplier,
    [],
  );

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 320;
    const panel = track.querySelector<HTMLElement>(".object-panel");
    if (!panel) return 320;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    return panel.offsetWidth + gap;
  }, []);

  const getCurrentDist = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const x = gsap.getProperty(track, "x");
    const num = typeof x === "number" ? x : parseFloat(String(x)) || 0;
    return Math.max(0, -num);
  }, []);

  const scrollToDist = useCallback(
    (targetDist: number) => {
      const st = stRef.current;
      if (!st || animatingRef.current) return;

      const max = getMax();
      const explore = getExplore(0.45);
      const total = max + explore;
      if (total <= 0) return;

      const clamped = gsap.utils.clamp(0, max, targetDist);
      if (Math.abs(clamped - getCurrentDist()) < 2) return;

      const progress = clamped / total;
      const targetScroll = st.start + progress * (st.end - st.start);
      const startScroll = document.documentElement.scrollTop;

      animatingRef.current = true;

      gsap.to(
        { y: startScroll },
        {
          y: targetScroll,
          duration: 0.75,
          ease: "power2.inOut",
          onUpdate() {
            document.documentElement.scrollTop = this.targets()[0].y;
          },
          onComplete: () => {
            animatingRef.current = false;
          },
        },
      );
    },
    [getMax, getExplore, getCurrentDist],
  );

  const nudge = useCallback(
    (direction: 1 | -1) => {
      if (isMobile()) {
        scrollWrapRef.current?.scrollBy({ left: direction * getStep(), behavior: "smooth" });
        return;
      }
      scrollToDist(getCurrentDist() + direction * getStep());
    },
    [isMobile, scrollToDist, getCurrentDist, getStep],
  );

  const startHover = useCallback(
    (direction: 1 | -1) => {
      if (isMobile()) return;
      nudge(direction);
      hoverTimerRef.current = setInterval(() => nudge(direction), 450);
    },
    [isMobile, nudge],
  );

  const stopHover = useCallback(() => {
    if (hoverTimerRef.current) {
      clearInterval(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => stopHover(), [stopHover]);

  useEffect(() => {
    if (!ready) return;

    const track = trackRef.current;
    const section = ref.current;
    if (!track || !section) return;

    if (isMobile()) {
      gsap.set(track, { clearProps: "transform" });
      section.classList.add("objects--touch");
      return () => section.classList.remove("objects--touch");
    }

    const ctx = gsap.context(() => {
      const getMaxLocal = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const explore = () => window.innerHeight * 0.45;

      const st = ScrollTrigger.create({
        id: "objects-scroll",
        trigger: section,
        start: "top top",
        end: () => {
          const max = getMaxLocal();
          return `+=${max + explore()}`;
        },
        pin: section,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const max = getMaxLocal();
          const extra = explore();
          const total = max + extra;
          const dist = self.progress * total;

          if (dist <= max) {
            gsap.set(track, { x: -dist });
          } else {
            const back = (dist - max) / extra;
            gsap.set(track, { x: -max + back * max });
          }
        },
      });

      stRef.current = st;
    }, ref);

    const refresh = () => stRef.current?.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    track.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });

    requestAnimationFrame(() => stRef.current?.refresh());

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      stRef.current = null;
      ctx.revert();
    };
  }, [ready, isMobile]);

  return (
    <section id="products" ref={ref} className="objects section--alt">
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

      <div ref={scrollWrapRef} className="objects-scroll-wrap">
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

        <div ref={trackRef} className="objects-track">
          {PRODUCTS.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="object-panel"
              style={{ "--i": i } as CSSProperties}
            >
              <div className="object-panel-img">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="380px" />
              </div>
              <div className="object-panel-meta font-body">
                <span className="object-index">0{i + 1}</span>
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
