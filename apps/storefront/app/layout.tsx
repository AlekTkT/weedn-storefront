import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "WEEDN - CBD Premium Français",
  description: "Fleurs CBD, résines, huiles et infusions premium",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <header className="header">
          <Link href="/" className="logo">WEEDN</Link>
          <nav>
            <Link href="/products">Produits</Link>
            <Link href="/cart">Panier</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <p>© 2026 WEEDN - CBD Premium Français</p>
        </footer>
      </body>
    </html>
  )
}
