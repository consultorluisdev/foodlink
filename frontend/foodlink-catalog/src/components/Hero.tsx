import { CheckCircle2, Drumstick, Flame, MapPin, MessageCircle } from "lucide-react";
import type { Restaurant } from "../types/restaurant";
import { mapsSearchUrl } from "../utils/maps";

interface HeroProps {
  restaurant: Restaurant;
}

export function Hero({ restaurant }: HeroProps) {
  return (
    <section id="home" className="hero-gradient relative overflow-hidden text-cream">
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-2xl" style={{ animation: "modal-in 0.8s ease-in" }}>
          <a
            href={mapsSearchUrl(restaurant.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="address-pill mb-6 inline-flex items-center gap-1 transition hover:border-gold/60 hover:text-cream"
          >
            <MapPin size={12} />
            {restaurant.address}
          </a>

          <h1 className="text-gradient-gold font-display mb-2 text-5xl leading-[0.95] sm:text-7xl">
            FOODLINK
          </h1>
          <p className="font-script mb-6 text-3xl text-gold sm:text-4xl">
            {restaurant.tagline ?? "do jeito da casa"}
          </p>
          <p className="mb-8 text-lg text-[#c9bfae] sm:text-xl">
            Combo completo com{" "}
            <span className="font-semibold text-gold">maionese</span> e{" "}
            <span className="font-semibold text-gold">farofa</span> — pedido
            pronto pra família.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              className="btn-gold rounded-lg px-8 py-4 font-semibold shadow-lg"
            >
              <Drumstick size={18} />
              Ver Cardápio
            </a>
            <a
              href={`https://wa.me/${restaurant.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-8 py-4 text-base"
            >
              <MessageCircle size={18} />
              Pedir no WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#a89a80]">
            <span className="flex items-center gap-2">
              <Flame size={14} className="text-gold" />
              Assado na hora
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-gold" />
              Entrega rápida
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-gold" />
              Pagamento na entrega
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}