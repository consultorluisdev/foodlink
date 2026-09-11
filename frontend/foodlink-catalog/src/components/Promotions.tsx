import { MessageCircle } from "lucide-react";
import type { Product } from "../types/product";

interface PromotionsProps {
  promotions: Product[];
  onAdd: (product: Product) => void;
}

export function Promotions({ promotions, onAdd }: PromotionsProps) {
  return (
    <section id="promotions" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="font-display mb-3 text-center text-3xl text-cream">
        Combos Especiais
      </h2>
      <p className="mb-12 text-center text-gold-pale">
        Ofertas imperdíveis para você
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promotion, index) => (
          <article key={promotion.id} className="product-card">
            <div className="bg-gold p-2 text-center text-sm font-bold text-[#1a1206]">
              {index === 0 ? "OFERTA DA CASA" : "SUGESTÃO"}
            </div>
            <div className="p-6 text-center">
              <span className="mb-4 block text-5xl text-gold" aria-hidden>
                {promotion.emoji}
              </span>
              <h3 className="font-display text-xl text-cream">
                {promotion.name.toUpperCase()}
              </h3>
              <p className="mt-2 text-sm text-gold-pale">
                {promotion.description}
              </p>
              <div className="mt-4 flex justify-center">
                <div className="price-tag">
                  <span className="ptag-label">Por apenas</span>
                  <span className="ptag-value">
                    R${promotion.price}
                    <sup>,00</sup>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onAdd(promotion)}
                className="btn-whatsapp mt-4 inline-flex cursor-pointer px-6 py-2 text-sm"
              >
                <MessageCircle size={16} />
                Pedir Agora
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-gold-pale/60">
        Os combos "Meio Frango" e "Combo Família" são sugestões — troque nome,
        itens e preço como preferir.
      </p>
    </section>
  );
}