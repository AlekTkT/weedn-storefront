"use client"

import Link from "next/link"

interface ProductCardProps {
  product: {
    id: string
    title: string
    handle: string
    thumbnail?: string
    variants?: Array<{
      id: string
      prices?: Array<{
        amount: number
        currency_code: string
      }>
    }>
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const variant = product.variants?.[0]
  const price = variant?.prices?.[0]

  return (
    <Link href={`/products/${product.handle}`} className="product-card">
      {product.thumbnail ? (
        <img src={product.thumbnail} alt={product.title} />
      ) : (
        <div className="placeholder-image">Image</div>
      )}
      <h3>{product.title}</h3>
      {price && (
        <p className="price">
          {(price.amount / 100).toFixed(2)} {price.currency_code.toUpperCase()}
        </p>
      )}
    </Link>
  )
}
