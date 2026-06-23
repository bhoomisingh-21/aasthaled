"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BackLink } from "@/components/layout/BackLink";
import type { Product } from "@/lib/constants";

function kelvinSwatchColor(spec: string): string {
  if (spec.includes("2700")) return "#e8b84a";
  if (spec.includes("3000")) return "#f0d080";
  if (spec.includes("4000")) return "#f5f2eb";
  if (spec.includes("6500")) return "#52b5c0";
  return "#d8d8d8";
}

function specIcon(spec: string): string {
  if (spec.includes("CRI")) return "💡";
  if (spec.includes("K")) return "🌡️";
  if (/dim/i.test(spec)) return "🔅";
  if (spec.includes("IP")) return "🛡️";
  if (spec.includes("DALI")) return "⚙️";
  if (/swivel|adjustable|360/i.test(spec)) return "↻";
  if (/hr|hour|lifespan/i.test(spec)) return "⏱️";
  if (spec.includes("UGR")) return "👁️";
  if (/flicker/i.test(spec)) return "✦";
  if (/finish|brass|glass/i.test(spec)) return "✨";
  return "•";
}

function GalleryNav({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      className={`product-detail-gallery-nav product-detail-gallery-nav--${dir}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Previous image" : "Next image"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={dir === "left" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

type ProductDetailViewProps = {
  product: Product;
  others: Product[];
};

export function ProductDetailView({ product, others }: ProductDetailViewProps) {
  const images = useMemo(() => [product.image], [product.image]);
  const kelvinSpecs = useMemo(() => product.specs.filter((s) => /\d\s*K|\dK/i.test(s)), [product.specs]);
  const featureSpecs = useMemo(
    () => product.specs.filter((s) => !/\d\s*K|\dK/i.test(s)),
    [product.specs],
  );

  const [imgIndex, setImgIndex] = useState(0);
  const [selectedKelvin, setSelectedKelvin] = useState(kelvinSpecs[0] ?? "");

  const canGalleryNav = images.length > 1;

  return (
    <article className="product-detail">
      <div className="product-detail-inner">
        <div className="product-detail-topbar">
          <BackLink href="/products" />
        </div>

        <div className="product-detail-layout">
          <div className="product-detail-gallery">
            <div className="product-detail-gallery-media">
              <Image
                src={images[imgIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <GalleryNav
                dir="left"
                disabled={!canGalleryNav}
                onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
              />
              <GalleryNav
                dir="right"
                disabled={!canGalleryNav}
                onClick={() => setImgIndex((i) => (i + 1) % images.length)}
              />
            </div>
          </div>

          <div className="product-detail-panel">
            <span className="product-detail-badge font-mono">
              {product.type.toUpperCase()} | SPECIFICATION GRADE
            </span>

            <h1 className="product-detail-name font-body">
              {product.name}
              <span className="product-detail-name-type"> | {product.type}</span>
            </h1>

            <p className="product-detail-award font-body">
              AASTHA LED — Engineered for architects &amp; designers
            </p>

            {kelvinSpecs.length > 0 && (
              <div className="product-detail-kelvin">
                <p className="product-detail-kelvin-label font-body">
                  Colour temperature: <strong>{selectedKelvin || kelvinSpecs[0]}</strong>
                </p>
                <div className="product-detail-swatches" role="listbox" aria-label="Colour temperature">
                  {kelvinSpecs.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      role="option"
                      aria-selected={selectedKelvin === spec}
                      className={`product-detail-swatch${selectedKelvin === spec ? " is-active" : ""}`}
                      style={{ background: kelvinSwatchColor(spec) }}
                      onClick={() => setSelectedKelvin(spec)}
                      aria-label={spec}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className="product-detail-hook font-body">
              <strong>Not just a fixture — light engineered as form.</strong>
            </p>
            <p className="product-detail-desc font-body">✨ {product.description}</p>

            <ul className="product-detail-features font-body">
              {(featureSpecs.length > 0 ? featureSpecs : product.specs).map((spec) => (
                <li key={spec}>
                  <span className="product-detail-feature-icon" aria-hidden>
                    {specIcon(spec)}
                  </span>
                  {spec}
                </li>
              ))}
            </ul>

            <Link href="/#contact" className="product-detail-cta font-body">
              Request catalogue
            </Link>
          </div>
        </div>

        {others.length > 0 && (
          <section className="product-detail-more">
            <h2 className="product-detail-more-title font-display">More luminaires</h2>
            <div className="product-detail-more-grid">
              {others.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="products-page-card">
                  <div className="products-page-card-media">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="280px" />
                  </div>
                  <h3 className="products-page-card-title font-body">
                    {p.name}
                    <span className="products-page-card-type"> | {p.type}</span>
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
