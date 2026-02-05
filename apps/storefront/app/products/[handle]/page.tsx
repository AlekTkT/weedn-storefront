import { sdk } from "@/lib/medusa"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/AddToCartButton"

interface Props {
  params: { handle: string }
}

export default async function ProductPage({ params }: Props) {
  const { products } = await sdk.store.product.list({
    handle: params.handle,
    fields: "title,handle,description,thumbnail,variants.*,variants.prices",
  })

  const product = products[0]
  if (!product) return notFound()

  const variant = product.variants?.[0]
  const price = variant?.prices?.[0]

  return (
    <div className="container">
      <div className="product-detail">
        {product.thumbnail && (
          <img src={product.thumbnail} alt={product.title} className="product-image" />
        )}
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="description">{product.description}</p>
          {price && (
            <p className="price">
              {(price.amount / 100).toFixed(2)} {price.currency_code.toUpperCase()}
            </p>
          )}
          <AddToCartButton variantId={variant?.id} />
        </div>
      </div>
    </div>
  )
}
