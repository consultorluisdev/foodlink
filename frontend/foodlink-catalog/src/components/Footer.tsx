import { MapPin, MessageCircle } from "lucide-react";
import type { Restaurant } from "../types/restaurant";
import { mapsSearchUrl } from "../utils/maps";

interface FooterProps {
  restaurant: Restaurant;
}

export function Footer({ restaurant }: FooterProps) {
  const instagramUrl = `https://instagram.com/${restaurant.instagram.replace("@", "")}`;

  return (
    <footer className="border-t border-gold/15 bg-black px-4 py-12 text-gold-pale">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-baseline gap-1.5">
              <span className="font-display text-xl text-gold">FOOD</span>
              <span className="font-script text-2xl text-gold-pale">link</span>
            </div>
            <p>Frango assado, com maionese e farofa, do jeito da casa.</p>
            <div className="mt-4 flex gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition hover:text-gold"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
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
                className="text-2xl transition hover:text-green-500"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-cream">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="transition hover:text-gold">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="transition hover:text-gold">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#promotions" className="transition hover:text-gold">
                  Combos
                </a>
              </li>
              <li>
                <a href="#about" className="transition hover:text-gold">
                  Sobre
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-cream">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                <a
                  href={mapsSearchUrl(restaurant.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-gold"
                >
                  {restaurant.address}
                </a>
              </li>
              <li>WhatsApp — Luis: {restaurant.phone}</li>
              {restaurant.whatsappSandra && (
                <li>WhatsApp — Sandra: (47) 99613-9382</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-cream">Horário</h4>
            <ul className="space-y-2">
              <li>{restaurant.hours}</li>
              <li>Demais dias: fechado</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gold/15 pt-8 text-center text-sm">
          <p>&copy; 2026 Foodlink. Todos os direitos reservados.</p>
          <p className="mt-2">
            <span className="text-gold" aria-hidden>
              🔥
            </span>{" "}
            Assado com carinho
          </p>
        </div>
      </div>
    </footer>
  );
}