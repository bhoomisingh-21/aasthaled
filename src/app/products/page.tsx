import Link from "next/link";
import Image from "next/image";
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
      <section className="products-page section-pad section--light">
        <header className="products-page-head">
          <p className="eyebrow font-body">Products</p>
          <h1 className="products-page-title font-display">Our luminaires</h1>
          <p className="section-lead font-body">
            Specification-grade decorative and architectural lighting, engineered in-house.
          </p>
          <BackLink href="/#products">Back to experience</BackLink>
        </header>

        <div className="products-page-grid">
          {PRODUCTS.map((product, i) => (
            <Link key={product.id} href={`/products/${product.id}`} className="product-card">
              <div className="product-card-img">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="400px" />
              </div>
              <div className="product-card-meta font-body">
                <span className="object-index">0{i + 1}</span>
                <h2 className="font-display">{product.name}</h2>
                <p>{product.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
