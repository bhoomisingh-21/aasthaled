"use client";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";

export function PageShell({ children }: { children: React.ReactNode }) {
  useLenis(true);

  return (
    <>
      <div className="film-grain" aria-hidden />
      <Navigation visible />
      <main>{children}</main>
      <Footer />
    </>
  );
}
