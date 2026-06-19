"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { DEMO_CENTER_IMAGE } from "@/lib/constants";

export function DemoCenterSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.PointerEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -5, y: px * 8 });
  }, []);

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <section id="demo-center" className="demo section-pad section--dark">
      <header className="section-header">
        <p className="eyebrow font-body">Demo Center</p>
        <h2 className="section-title section-title--single font-display">Explore our experience centre</h2>
      </header>

      <div
        ref={stageRef}
        className="demo-stage"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="demo-viewport">
          <div
            className="demo-turntable demo-turntable--static"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            <div className="demo-booth-shadow" aria-hidden />
            <div className="demo-booth-frame">
              <Image
                src={`${DEMO_CENTER_IMAGE}?v=3`}
                alt="Aastha experience centre"
                fill
                className="demo-booth-img object-contain"
                sizes="(max-width: 960px) 100vw, 900px"
                priority={false}
                draggable={false}
              />
            </div>
          </div>
        </div>
        <div className="demo-floor-reflection" aria-hidden />
      </div>
    </section>
  );
}
