"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ILLUMINATED_SPACES } from "@/lib/constants";
import { useScrollReady } from "@/hooks/ScrollProvider";

gsap.registerPlugin(ScrollTrigger);

export function AtmospheresSection() {
  const ready = useScrollReady();
  const ref = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: () => `+=${ILLUMINATED_SPACES.length * 100}%`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const i = Math.min(ILLUMINATED_SPACES.length - 1, Math.floor(self.progress * ILLUMINATED_SPACES.length));
          setIndex(i);
          setLit(self.progress > 0.06);
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    if (!copyRef.current) return;
    gsap.fromTo(
      copyRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [index]);

  const scene = ILLUMINATED_SPACES[index];

  return (
    <section id="spaces" ref={ref} className="atmospheres section--dark">
      <Image
        src={scene.dark}
        alt=""
        fill
        className="object-cover atmospheres-img"
        sizes="100vw"
        priority
      />
      <div className="atmospheres-lit" style={{ opacity: lit ? 1 : 0 }}>
        <Image src={scene.lit} alt="" fill className="object-cover" sizes="100vw" />
        <div className="atmospheres-warm" />
      </div>
      <div ref={copyRef} className="atmospheres-copy">
        <p className="eyebrow font-body">Illuminated Spaces</p>
        <p className="atmospheres-sub font-body">Spaces we have illuminated</p>
        <h2 className="atmospheres-title font-display">{scene.label}</h2>
        <p className="atmospheres-location font-body">{scene.location}</p>
      </div>
    </section>
  );
}
