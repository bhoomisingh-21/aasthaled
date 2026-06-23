import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { BackLink } from "@/components/layout/BackLink";
import { PRODUCTS } from "@/lib/constants";

export const metadata = {
  title: "Products — Aastha LED",
  description: "Explore our decorative and architectural luminaires.",
};

export default function ProductsPage() {
  return (
    <PageShell>
      <section className="products-page">
        <div className="products-page-inner">
          <div className="products-page-topbar">
            <BackLink href="/#products" />
            <p className="products-page-count font-mono">{PRODUCTS.length} designs</p>
          </div>

          <header className="products-page-head">
            <p className="eyebrow font-body">Products</p>
            <h1 className="products-page-title font-display">The Luminaire Collection</h1>
          </header>

          <div className="products-page-grid">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="products-page-card"
              >
                <div className="products-page-card-media">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 45vw, (max-width: 1100px) 33vw, 25vw"
                  />
                </div>
                <h2 className="products-page-card-title font-body">
                  {product.name}
                  <span className="products-page-card-type"> | {product.type}</span>
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
