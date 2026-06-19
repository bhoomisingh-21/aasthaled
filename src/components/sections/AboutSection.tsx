"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ABOUT, ABOUT_GALLERY, STATS } from "@/lib/constants";
import { useScrollReady } from "@/hooks/ScrollProvider";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const ready = useScrollReady();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;

    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-title",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".about-hero", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".about-hero-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-hero", start: "top 75%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".about-float").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      gsap.to(".about-img-primary", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-showcase",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-img-secondary", {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-showcase",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".about-stat-val").forEach((el) => {
        const target = el.textContent ?? "0";
        const num = parseInt(target.replace(/\D/g, ""), 10);
        if (!num) return;
        const suffix = target.replace(/[\d]/g, "");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-stats-bar", start: "top 85%" },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="about" ref={ref} className="about section--alt">
      <div className="about-hero section-pad">
        <p className="eyebrow font-body">About</p>
        <h2 className="about-hero-title font-display">
          Crafting light for
          <br />
          spaces that matter
        </h2>
        <div className="about-hero-line" aria-hidden />
      </div>

      <div className="about-showcase">
        <div className="about-showcase-copy about-float">
          <p className="about-quote font-display">&ldquo;Light is not decoration — it is atmosphere.&rdquo;</p>
          <p className="about-story font-body">{ABOUT.story}</p>
        </div>

        <div className="about-showcase-images">
          <div className="about-img-primary about-float">
            <Image
              src={ABOUT_GALLERY[0].src}
              alt={ABOUT_GALLERY[0].alt}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
          <div className="about-img-secondary about-float">
            <Image
              src={ABOUT_GALLERY[2].src}
              alt={ABOUT_GALLERY[2].alt}
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>
        </div>
      </div>

      <div className="about-stats-bar">
        {STATS.map(({ value, label }) => (
          <div key={label} className="about-stat-cell about-float">
            <span className="about-stat-val font-mono">{value}</span>
            <span className="about-stat-lbl font-body">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
