"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { NAV, BRAND, HEADER_NAV } from "@/lib/constants";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
      <rect y="0" width="18" height="1.5" />
      <rect y="5.25" width="18" height="1.5" />
      <rect y="10.5" width="18" height="1.5" />
    </svg>
  );
}

function NavAnchor({ href, className, children, onClick }: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function Navigation({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const menuLinks = NAV.filter((item) => item.href !== "/#hero");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    gsap.fromTo(
      ".site-menu-link",
      { x: -24, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out", delay: 0.12 }
    );
  }, [open]);

  return (
    <>
      <header className={`site-header ${visible ? "site-header--visible" : ""}`}>
        <div className="site-header-inner">
          <div className="site-header-side site-header-side--left">
            <button
              type="button"
              className="site-header-menu"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <MenuIcon open={open} />
            </button>
          </div>

          <Link href="/#hero" className="site-header-logo font-display">
            {BRAND.name}
          </Link>

          <div className="site-header-side site-header-side--right">
            <nav className="site-header-links" aria-label="Primary">
              {HEADER_NAV.map(({ href, label }) => (
                <NavAnchor key={href} href={href} className="site-header-link font-mono">
                  {label}
                </NavAnchor>
              ))}
            </nav>
            <NavAnchor href="/#connect" className="site-header-cta font-mono">
              Connect
            </NavAnchor>
          </div>
        </div>
      </header>

      <div className={`site-menu ${open ? "site-menu--open" : ""}`} aria-hidden={!open}>
        <div className="site-menu-panel">
          <nav className="site-menu-nav">
            {menuLinks.map(({ href, label }) => (
              <NavAnchor
                key={`${href}-${label}`}
                href={href}
                className="site-menu-link font-body"
                onClick={() => setOpen(false)}
              >
                {label}
              </NavAnchor>
            ))}
          </nav>
        </div>
        <button
          type="button"
          className="site-menu-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      </div>
    </>
  );
}
