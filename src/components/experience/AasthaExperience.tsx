"use client";

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
import { ScrollProvider } from "@/hooks/ScrollProvider";

export function AasthaExperience() {
  const { loaded, showLoader, onLoaderDone } = useSiteLoaded(true);

  return (
    <ScrollProvider enabled={loaded}>
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
