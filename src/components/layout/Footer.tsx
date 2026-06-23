"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND, FOOTER_COLUMNS, FOOTER_SOCIAL } from "@/lib/constants";

export function Footer() {
  const [mobile, setMobile] = useState(false);
  const [openCol, setOpenCol] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleCol = (id: string) => {
    setOpenCol(openCol === id ? null : id);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-split">
          <div className="site-footer-left">
            {FOOTER_COLUMNS.map((col) => {
              const isOpen = !mobile || openCol === col.id;
              return (
                <div key={col.id} className="site-footer-col">
                  <h3
                    className="site-footer-col-title font-mono"
                    onClick={() => mobile && toggleCol(col.id)}
                    onKeyDown={(e) => e.key === "Enter" && mobile && toggleCol(col.id)}
                    role={mobile ? "button" : undefined}
                    tabIndex={mobile ? 0 : undefined}
                  >
                    {col.title}
                    {mobile && (
                      <svg
                        className={`site-footer-chevron ${openCol === col.id ? "site-footer-chevron--open" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </h3>
                  <ul className={`site-footer-links ${isOpen ? "site-footer-links--open" : ""}`}>
                    {col.links.map((link) => (
                      <li key={`${col.id}-${link.id}`}>
                        {link.href.startsWith("/") ? (
                          <Link href={link.href} className="font-body">{link.label}</Link>
                        ) : (
                          <a href={link.href} className="font-body">{link.label}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="site-footer-right">
            <div className="site-footer-meta-block">
              <h3 className="site-footer-col-title font-mono">REGION</h3>
              <p className="font-body site-footer-meta-text">India · English</p>
            </div>

            <div className="site-footer-meta-block site-footer-meta-block--social">
              <h3 className="site-footer-col-title font-mono">FOLLOW US</h3>
              <div className="site-footer-social">
                {FOOTER_SOCIAL.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer-social-link font-body"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="site-footer-brand">
          <p className="site-footer-wordmark font-display">{BRAND.name}</p>
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-copy font-body">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="site-footer-credit font-mono">
            Decorative &amp; Architectural Lighting
          </p>
        </div>
      </div>
    </footer>
  );
}
