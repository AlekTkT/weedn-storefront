"use client"

import { useState } from "react"
import { sdk } from "@/lib/medusa"

interface AddToCartButtonProps {
  variantId?: string
}

export function AddToCartButton({ variantId }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const [cartId, setCartId] = useState<string | null>(null)

  const addToCart = async () => {
    if (!variantId) return
    
    setLoading(true)
    try {
      // Crée ou récupère le panier
      let currentCartId = cartId || localStorage.getItem("cart_id")
      
      if (!currentCartId) {
        const { cart } = await sdk.store.cart.create({})
        currentCartId = cart.id
        localStorage.setItem("cart_id", currentCartId)
        setCartId(currentCartId)
      }

      // Ajoute l'article
      await sdk.store.cart.createLineItem(currentCartId, {
        variant_id: variantId,
        quantity: 1,
      })

      alert("Ajouté au panier !")
    } catch (error) {
      console.error("Erreur panier:", error)
      alert("Erreur lors de l'ajout au panier")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={addToCart} 
      disabled={loading || !variantId}
      className="btn-primary"
    >
      {loading ? "Ajout..." : "Ajouter au panier"}
    </button>
  )
}
