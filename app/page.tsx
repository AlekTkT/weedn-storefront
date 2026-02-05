import Link from "next/link"
import { sdk } from "@/lib/medusa"
import { ProductCard } from "@/components/ProductCard"

export default async function Home() {
  // Récupère les produits depuis Medusa
  const { products } = await sdk.store.product.list({
    limit: 12,
    fields: "title,handle,thumbnail,variants.*,variants.prices",
  })

  return (
    <div className="container">
      <section className="hero">
        <h1>CBD Premium Français</h1>
        <p>Fleurs, résines, huiles et infusions de qualité supérieure</p>
        <Link href="/products" className="btn-primary">
          Découvrir nos produits
        </Link>
      </section>

      <section className="products-section">
        <h2>Nos Best-Sellers</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
