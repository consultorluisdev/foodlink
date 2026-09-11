import { useState } from "react";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import type { Restaurant } from "../types/restaurant";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Cardápio", href: "#menu" },
  { label: "Combos", href: "#promotions" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contact" },
  { label: "Sobre", href: "#about" },
];

interface NavbarProps {
  restaurant: Restaurant;
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ restaurant, cartCount, onOpenCart }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gold/15 bg-[#0d0b08] shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-baseline gap-1.5">
            <span className="font-display text-xl text-gold sm:text-2xl">
              FOOD
            </span>
            <span className="font-script text-2xl text-gold-pale sm:text-3xl">
              link
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-7 text-sm font-medium text-cream md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}

            <a
              href={`https://instagram.com/${restaurant.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl transition-colors hover:text-gold"
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[22px] w-[22px]"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <button
              type="button"
              className="relative transition-colors hover:text-gold"
              onClick={onOpenCart}
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="cart-badge absolute -right-2 -top-1 flex h-[18px] w-[18px] items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href={`https://wa.me/${restaurant.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !px-4 !py-2 text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              className="relative text-cream"
              onClick={onOpenCart}
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="cart-badge absolute -right-2 -top-1 flex h-[18px] w-[18px] items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="text-2xl text-cream"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gold/15 bg-char px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-cream transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-4 flex items-center gap-4 border-t border-gold/15 pt-4">
            <a
              href={`https://instagram.com/${restaurant.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl transition-colors hover:text-gold"
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[22px] w-[22px]"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${restaurant.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-1 justify-center text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}