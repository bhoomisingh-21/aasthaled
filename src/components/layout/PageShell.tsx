"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";

export function PageShell({ children }: { children: React.ReactNode }) {
  useLenis(true);

  useEffect(() => {
    document.documentElement.classList.add("page-shell-active");
    document.body.classList.add("page-shell-body");
    return () => {
      document.documentElement.classList.remove("page-shell-active");
      document.body.classList.remove("page-shell-body");
    };
  }, []);

  return (
    <div className="page-shell page-shell--light">
      <div className="film-grain" aria-hidden />
      <Navigation visible />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
