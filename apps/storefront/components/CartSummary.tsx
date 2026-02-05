"use client"

import { useEffect, useState } from "react"
import { sdk } from "@/lib/medusa"
import Link from "next/link"

export function CartSummary() {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    const cartId = localStorage.getItem("cart_id")
    if (!cartId) {
      setLoading(false)
      return
    }

    try {
      const { cart: cartData } = await sdk.store.cart.retrieve(cartId)
      setCart(cartData)
    } catch (error) {
      console.error("Erreur chargement panier:", error)
    } finally {
      setLoading(false)
    }
  }

  const itemCount = cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0

  return (
    <Link href="/cart" className="cart-link">
      Panier {itemCount > 0 && `(${itemCount})`}
    </Link>
  )
}
