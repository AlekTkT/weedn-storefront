import Link from "next/link"
import { sdk } from "@/lib/medusa"
import { ProductCard } from "@/components/ProductCard"

export default async function ProductsPage() {
  const { products } = await sdk.store.product.list({
    limit: 100,
    fields: "title,handle,thumbnail,description,variants.*,variants.prices",
  })

  return (
    <div className="container">
      <h1>Nos Produits CBD</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
