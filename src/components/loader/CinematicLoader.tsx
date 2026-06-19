"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BRAND } from "@/lib/constants";

interface CinematicLoaderProps {
  onComplete: () => void;
}

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const beam2Ref = useRef<HTMLDivElement>(null);
  const logoLitRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.set(beamRef.current, { left: "-30%", opacity: 0, scaleX: 0.2 });
      gsap.set(beam2Ref.current, { left: "-30%", opacity: 0, scaleX: 0.2 });
      gsap.set(logoLitRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(taglineRef.current, { opacity: 0, y: 40, filter: "blur(10px)" });
      gsap.set(glowRef.current, { scale: 0.08, opacity: 0 });
      gsap.set(veilRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = "";
              onComplete();
            },
          })
            .to(glowRef.current, { scale: 6, opacity: 1, duration: 1.6, ease: "power4.inOut" }, 0)
            .to(veilRef.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 0.15)
            .to(rootRef.current, { opacity: 0, duration: 1, ease: "power2.inOut" }, 0.45);
        },
      });

      tl.to(beamRef.current, { opacity: 1, scaleX: 1, duration: 0.45, ease: "power2.out" }, 0.35)
        .to(beamRef.current, { left: "130%", duration: 1.9, ease: "power2.inOut" }, 0.5)
        .to(beam2Ref.current, { opacity: 0.6, scaleX: 1, duration: 0.35, ease: "power2.out" }, 0.85)
        .to(beam2Ref.current, { left: "130%", duration: 1.6, ease: "power2.inOut" }, 1)
        .to(logoLitRef.current, { clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power4.inOut" }, 0.65)
        .to(taglineRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }, 1.7)
        .to(glowRef.current, { scale: 1.3, opacity: 0.75, duration: 1.8, ease: "power3.out" }, 2.2)
        .to({}, { duration: 0.45 });
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className="loader">
      <div ref={veilRef} className="loader-veil" />
      <div ref={glowRef} className="loader-glow" />
      <div ref={beamRef} className="loader-beam" />
      <div ref={beam2Ref} className="loader-beam loader-beam--secondary" />
      <div className="loader-copy">
        <h1 className="loader-logo font-display">
          <span className="loader-logo-ghost">{BRAND.name}</span>
          <span ref={logoLitRef} className="loader-logo-lit">{BRAND.name}</span>
        </h1>
        <p ref={taglineRef} className="loader-tagline font-body">{BRAND.tagline}</p>
      </div>
    </div>
  );
}
