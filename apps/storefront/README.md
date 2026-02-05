# WEEDN Storefront - Next.js + Medusa

Storefront CBD connecté à Medusa Cloud.

## 🚀 Installation

```bash
cd projects/weedn-storefront
npm install
```

## ⚙️ Configuration

Le fichier `.env.local` est déjà créé avec :
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` : Clé publique storefront
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` : URL backend Medusa Cloud

## 🏃 Développement

```bash
npm run dev
```

Le storefront tourne sur http://localhost:8000

## 📁 Structure

```
app/
  page.tsx              # Accueil avec best-sellers
  products/
    page.tsx            # Liste produits
    [handle]/
      page.tsx          # Détail produit
  cart/
    page.tsx            # Panier
components/
  ProductCard.tsx       # Carte produit
  AddToCartButton.tsx   # Bouton ajout panier
  CartSummary.tsx       # Compteur panier header
lib/
  medusa.ts             # SDK Medusa configuré
```

## 🔗 Connexion Medusa

Le SDK est configuré dans `lib/medusa.ts` avec :
- Publishable API Key (obligatoire pour Store API)
- Backend URL Medusa Cloud

## 🛒 Fonctionnalités

- ✅ Liste des produits depuis Medusa
- ✅ Pages produits dynamiques
- ✅ Panier (localStorage + Medusa Cart API)
- ✅ Mise à jour/suppression des articles
- ✅ Calcul du total
- ⏳ Checkout (à implémenter avec VivaWallet)

## ⚠️ Important

La `MEDUSA_SECRET_KEY` dans `.env.local` est pour usage backend uniquement.
Ne jamais l'exposer côté client !
