"use client"

import { useEffect, useState } from "react"
import { sdk } from "@/lib/medusa"
import Link from "next/link"

export default function CartPage() {
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

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!cart) return
    
    try {
      await sdk.store.cart.updateLineItem(cart.id, itemId, { quantity })
      loadCart()
    } catch (error) {
      console.error("Erreur mise à jour:", error)
    }
  }

  const removeItem = async (itemId: string) => {
    if (!cart) return
    
    try {
      await sdk.store.cart.deleteLineItem(cart.id, itemId)
      loadCart()
    } catch (error) {
      console.error("Erreur suppression:", error)
    }
  }

  if (loading) return <div className="container">Chargement...</div>
  
  if (!cart || cart.items?.length === 0) {
    return (
      <div className="container">
        <h1>Votre Panier</h1>
        <p>Votre panier est vide.</p>
        <Link href="/products" className="btn-primary">
          Continuer les achats
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Votre Panier</h1>
      
      <div className="cart-items">
        {cart.items.map((item: any) => (
          <div key={item.id} className="cart-item">
            <img 
              src={item.thumbnail || "/placeholder.jpg"} 
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>{(item.unit_price / 100).toFixed(2)} {cart.currency_code.toUpperCase()}</p>
            </div>
            <div className="cart-item-actions">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="quantity-input"
              />
              <button 
                onClick={() => removeItem(item.id)}
                className="btn-remove"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total</h2>
        <p className="total">
          {(cart.total / 100).toFixed(2)} {cart.currency_code.toUpperCase()}
        </p>
        <Link href="/checkout" className="btn-primary">
          Passer la commande
        </Link>
      </div>
    </div>
  )
}
