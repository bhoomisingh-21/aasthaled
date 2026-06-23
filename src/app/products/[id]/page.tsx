import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ProductDetailView } from "@/components/products/ProductDetailView";
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
      <ProductDetailView product={product} others={others} />
    </PageShell>
  );
}
