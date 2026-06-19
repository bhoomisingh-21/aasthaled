"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_MQ = "(max-width: 767px)";
const ScrollReadyContext = createContext(false);

export function useScrollReady() {
  return useContext(ScrollReadyContext);
}

export function ScrollProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setReady(false);
      return;
    }

    ScrollTrigger.config({ ignoreMobileResize: true });

    const mobile = window.matchMedia(MOBILE_MQ).matches;
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const activate = () => {
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh(true);
      setReady(true);
    };

    if (mobile) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      activate();
      return () => setReady(false);
    }

    lenis = new Lenis({ duration: 1.4, smoothWheel: true });
    document.documentElement.classList.add("lenis", "lenis-smooth");

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(v) {
        if (v !== undefined) lenis!.scrollTo(v, { immediate: true });
        return lenis!.scroll;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: innerWidth,
        height: innerHeight,
      }),
    });

    tick = (time: number) => lenis!.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    activate();

    return () => {
      setReady(false);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      if (tick) gsap.ticker.remove(tick);
    };
  }, [enabled]);

  return (
    <ScrollReadyContext.Provider value={ready}>
      {children}
    </ScrollReadyContext.Provider>
  );
}
