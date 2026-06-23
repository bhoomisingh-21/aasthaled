"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIGHT_SPECTRUM } from "@/lib/constants";
import { useScrollReady } from "@/hooks/ScrollProvider";

gsap.registerPlugin(ScrollTrigger);

function applySpectrum(
  orb: HTMLElement | null,
  beam: HTMLElement | null,
  pool: HTMLElement | null,
  from: (typeof LIGHT_SPECTRUM)[number],
  to: (typeof LIGHT_SPECTRUM)[number],
  t: number,
) {
  if (orb) {
    orb.style.setProperty("--radiance-core", gsap.utils.interpolate(from.core, to.core, t));
    orb.style.setProperty("--radiance-mid", gsap.utils.interpolate(from.mid, to.mid, t));
    orb.style.setProperty("--radiance-glow", gsap.utils.interpolate(from.glow, to.glow, t));
    orb.style.setProperty("--radiance-glow-soft", gsap.utils.interpolate(from.glowSoft, to.glowSoft, t));
  }
  if (beam) {
    beam.style.setProperty("--beam-color", gsap.utils.interpolate(from.beam, to.beam, t));
  }
  if (pool) {
    pool.style.setProperty("--pool-color", gsap.utils.interpolate(from.beam, to.beam, t));
  }
}

export function RadianceSection() {
  const ready = useScrollReady();
  const ref = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const stage = ref.current?.querySelector<HTMLElement>(".radiance-instrument");
    const orb = orbRef.current;
    if (!stage || !orb || window.matchMedia("(max-width: 767px)").matches) return;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    orb.style.transform = `translate(calc(-50% + ${px * 12}px), calc(-50% + ${py * 10}px))`;
  }, []);

  const onPointerLeave = useCallback(() => {
    if (orbRef.current) orbRef.current.style.transform = "translate(-50%, -50%)";
  }, []);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      applySpectrum(
        orbRef.current,
        beamRef.current,
        poolRef.current,
        LIGHT_SPECTRUM[0],
        LIGHT_SPECTRUM[0],
        0,
      );

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: () => `+=${LIGHT_SPECTRUM.length * 100}%`,
        pin: true,
        scrub: true,
        snap: {
          snapTo: (value) => {
            const step = 1 / LIGHT_SPECTRUM.length;
            return Math.round(value / step) * step;
          },
          duration: { min: 0.2, max: 0.5 },
          delay: 0,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const n = LIGHT_SPECTRUM.length;
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          const scene = LIGHT_SPECTRUM[i];
          const markerPos = n > 1 ? (i / (n - 1)) * 100 : 0;
          const needleDeg = n > 1 ? -52 + (i / (n - 1)) * 104 : 0;

          applySpectrum(orbRef.current, beamRef.current, poolRef.current, scene, scene, 0);
          markerRef.current?.style.setProperty("left", `${markerPos}%`);
          needleRef.current?.style.setProperty(
            "transform",
            `translate(-50%, -100%) rotate(${needleDeg}deg)`,
          );
          setIndex(i);
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    if (!wordsRef.current) return;
    const words = wordsRef.current.querySelectorAll(".radiance-word");
    gsap.fromTo(
      words,
      { opacity: 0, y: 28, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
      },
    );
  }, [index]);

  const scene = LIGHT_SPECTRUM[index];

  return (
    <section
      id="radiance"
      ref={ref}
      className="radiance section--dark"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="radiance-grid" aria-hidden />
      <div className="radiance-vignette" aria-hidden />

      <header className="radiance-head">
        <p className="eyebrow font-body">Colour Temperature</p>
        <h2 className="radiance-title font-display">The Spectrum</h2>
        <p className="radiance-lead font-body">
          Calibrated for every atmosphere — from amber intimacy to daylight precision.
        </p>
      </header>

      <div className="radiance-instrument">
        <div ref={beamRef} className="radiance-beam" aria-hidden />

        <div className="radiance-dial" aria-hidden>
          <svg className="radiance-dial-svg" viewBox="0 0 320 180" fill="none">
            <path
              d="M 24 160 A 136 136 0 0 1 296 160"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <path
              d="M 24 160 A 136 136 0 0 1 296 160"
              stroke="url(#radianceArc)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.55"
            />
            <defs>
              <linearGradient id="radianceArc" x1="0" y1="0" x2="320" y2="0">
                <stop offset="0%" stopColor="#e8b84a" />
                <stop offset="50%" stopColor="#f5f2eb" />
                <stop offset="100%" stopColor="#52b5c0" />
              </linearGradient>
            </defs>
          </svg>
          {LIGHT_SPECTRUM.map((s, tick) => {
            const step = LIGHT_SPECTRUM.length > 1 ? 104 / (LIGHT_SPECTRUM.length - 1) : 0;
            return (
            <span
              key={s.kelvin}
              className={`radiance-tick${tick === index ? " radiance-tick--active" : ""}`}
              style={{ transform: `rotate(${-52 + tick * step}deg)` }}
            />
            );
          })}
          <div ref={needleRef} className="radiance-needle" />
        </div>

        <div className="radiance-source-wrap">
          <div className="radiance-iris" aria-hidden>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="radiance-iris-blade" style={{ "--blade-i": i } as React.CSSProperties} />
            ))}
          </div>

          <div ref={orbRef} className="radiance-orb" aria-hidden>
            <div className="radiance-orb-halo" />
            <div className="radiance-orb-core" />
            <div className="radiance-orb-flare" />
            <div className="radiance-orb-glass" />
          </div>

          <div ref={poolRef} className="radiance-pool" aria-hidden />
        </div>

        <aside className="radiance-panel font-mono">
          <span className="radiance-panel-kelvin">{scene.kelvin}</span>
          <span className="radiance-panel-name">{scene.name}</span>
          <span className="radiance-panel-detail font-body">{scene.detail}</span>
        </aside>
      </div>

      <div ref={wordsRef} key={index} className="radiance-phrase font-display">
        {scene.phrase.map((word) => (
          <span key={word} className="radiance-word">
            {word}
          </span>
        ))}
      </div>

      <div className="radiance-scale font-mono">
        <div className="radiance-scale-track">
          <span ref={markerRef} className="radiance-scale-marker" />
        </div>
        <div className="radiance-scale-labels">
          {LIGHT_SPECTRUM.map((s) => (
            <span key={s.kelvin} className={s.kelvin === scene.kelvin ? "is-active" : undefined}>
              {s.kelvin}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
