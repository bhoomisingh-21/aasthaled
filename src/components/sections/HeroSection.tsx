"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { BRAND, PRODUCTS } from "@/lib/constants";

export function HeroSection({ startReveal }: { startReveal: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);
  const heroProduct = PRODUCTS[0];

  useLayoutEffect(() => {
    if (!startReveal || animatedRef.current || !ref.current) return;
    animatedRef.current = true;

    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll(".hero-title-word");

      gsap.set(glowRef.current, { scale: 5, opacity: 0 });
      gsap.set(productRef.current, { scale: 1.2, opacity: 0, filter: "blur(16px) brightness(0.3)" });
      gsap.set(imgRef.current, { scale: 1.12 });
      gsap.set(eyebrowRef.current, { y: 16, opacity: 0 });
      if (words?.length) gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(descRef.current, { y: 24, opacity: 0 });
      gsap.set(scrollRef.current, { opacity: 0, y: 12 });

      ref.current!.classList.add("hero--live");

      const tl = gsap.timeline();

      tl.to(glowRef.current, { scale: 1, opacity: 1, duration: 2.4, ease: "power4.out" }, 0)
        .to(
          productRef.current,
          { scale: 1, opacity: 1, filter: "blur(0px) brightness(1)", duration: 2.2, ease: "power3.out" },
          0.1
        )
        .to(imgRef.current, { scale: 1, duration: 7, ease: "power1.out" }, 0.1)
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.5);

      if (words?.length) {
        tl.to(words, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: "power4.out" }, 0.65);
      }

      tl.to(descRef.current, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }, 1)
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.35);

      gsap.to(glowRef.current, {
        opacity: 0.8,
        scale: 1.05,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2.5,
      });
    }, ref);

    return () => ctx.revert();
  }, [startReveal]);

  return (
    <section id="hero" ref={ref} className="hero section--dark">
      <div className="hero-vignette" aria-hidden />
      <div ref={glowRef} className="hero-glow" />
      <div ref={productRef} className="hero-product">
        <div ref={imgRef} className="hero-product-inner">
          <Image
            src={heroProduct.image}
            alt={heroProduct.name}
            fill
            className="object-cover hero-product-img"
            sizes="100vw"
            priority
          />
        </div>
        <div className="hero-product-shade" />
      </div>
      <div className="hero-copy">
        <p ref={eyebrowRef} className="hero-eyebrow font-body">{BRAND.badge}</p>
        <h1 ref={titleRef} className="hero-title font-display">
          {BRAND.heroLine.split("\n").map((line, lineIdx) => (
            <span key={lineIdx} className="hero-title-line">
              {line.split(" ").map((word, wordIdx) => (
                <span key={wordIdx} className="hero-title-word">
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p ref={descRef} className="hero-desc font-body">{BRAND.heroDesc}</p>
      </div>
      <div ref={scrollRef} className="hero-scroll font-body">
        <span className="hero-scroll-line" />
        Scroll
      </div>
    </section>
  );
}
