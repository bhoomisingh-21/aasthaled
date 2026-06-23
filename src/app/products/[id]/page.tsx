import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { BackLink } from "@/components/layout/BackLink";
import { PRODUCTS } from "@/lib/constants";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return { title: "Product — Aastha LED" };
  return {
    title: `${product.name} — Aastha LED`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  const others = PRODUCTS.filter((p) => p.id !== id);

  return (
    <PageShell>
      <article className="product-detail section-pad section--light">
        <nav className="product-detail-nav font-body">
          <BackLink href="/products">All products</BackLink>
          <span aria-hidden>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          <div className="product-detail-visual">
            <div className="product-detail-glow" aria-hidden />
            <div className="product-detail-img">
              <Image src={product.image} alt={product.name} fill className="object-cover" priority sizes="600px" />
            </div>
          </div>

          <div className="product-detail-info">
            <p className="eyebrow font-body">{product.type}</p>
            <h1 className="product-detail-title font-display">{product.name}</h1>
            <p className="product-detail-desc font-body">{product.description}</p>
            <ul className="product-detail-specs font-body">
              {product.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="product-detail-actions">
              <Link href="/#connect" className="link-cine link-cine--btn font-body">
                Request catalogue
              </Link>
              <BackLink href="/products">View all</BackLink>
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <section className="product-detail-more">
            <h2 className="font-display">More luminaires</h2>
            <div className="product-detail-more-grid">
              {others.slice(0, 3).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="product-card product-card--compact">
                  <div className="product-card-img">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="280px" />
                  </div>
                  <div className="product-card-meta font-body">
                    <h3 className="font-display">{p.name}</h3>
                    <p>{p.type}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </PageShell>
  );
}
