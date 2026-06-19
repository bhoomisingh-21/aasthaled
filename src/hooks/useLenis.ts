"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_MQ = "(max-width: 767px)";

export { ScrollProvider, useScrollReady } from "@/hooks/ScrollProvider";

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    ScrollTrigger.config({ ignoreMobileResize: true });

    if (window.matchMedia(MOBILE_MQ).matches) {
      ScrollTrigger.refresh(true);
      return;
    }

    const lenis = new Lenis({ duration: 1.4, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(v) {
        if (v !== undefined) lenis.scrollTo(v, { immediate: true });
        return lenis.scroll;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: innerWidth,
        height: innerHeight,
      }),
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh(true);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, [enabled]);
}
