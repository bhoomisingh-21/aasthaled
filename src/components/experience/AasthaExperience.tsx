"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CinematicLoader } from "@/components/loader/CinematicLoader";
import { useSiteLoaded } from "@/hooks/useSiteLoaded";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { RadianceSection } from "@/components/sections/RadianceSection";
import { ObjectsSection } from "@/components/sections/ObjectsSection";
import { AtmospheresSection } from "@/components/sections/AtmospheresSection";
import { DemoCenterSection } from "@/components/sections/DemoCenterSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { ScrollProvider, useScrollReady } from "@/hooks/ScrollProvider";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function HashScroll() {
  const ready = useScrollReady();

  useEffect(() => {
    if (!ready) return;

    const scrollToHash = (hash: string) => {
      const id = hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.refresh(true);
      gsap.to(document.documentElement, {
        duration: 1,
        scrollTo: { y: el, offsetY: 80 },
        ease: "power2.inOut",
        onComplete: () => ScrollTrigger.refresh(true),
      });
    };

    if (window.location.hash) {
      const timer = window.setTimeout(() => scrollToHash(window.location.hash), 150);
      return () => window.clearTimeout(timer);
    }

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [ready]);

  return null;
}

export function AasthaExperience() {
  const { loaded, showLoader, onLoaderDone } = useSiteLoaded(true);

  return (
    <ScrollProvider enabled={loaded}>
      <HashScroll />
      <div className="film-grain" aria-hidden />
      {showLoader && <CinematicLoader onComplete={onLoaderDone} />}
      <Navigation visible={loaded} />
      <main>
        <HeroSection startReveal={loaded} />
        <RadianceSection />
        <ObjectsSection />
        <DemoCenterSection />
        <AtmospheresSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </ScrollProvider>
  );
}
