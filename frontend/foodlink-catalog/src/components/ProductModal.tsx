import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import type { Product } from "../types/product";

function formatBRL(value: number) {
  return value.toFixed(2).replace(".", ",");
}

interface ProductModalProps {
  product: Product | null;
  quantity: number;
  primaryColor: string;
  categoryName?: string;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onClose: () => void;
}

export function ProductModal({
  product,
  quantity,
  primaryColor,
  categoryName,
  onAdd,
  onIncrease,
  onDecrease,
  onClose,
}: ProductModalProps) {
  if (!product) return null;

  const finalPrice = product.promotionalPrice ?? product.price;
  const hasPromotion = product.promotionalPrice !== undefined;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="modal-content w-full max-w-md overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-56 w-full object-cover"
          />
          {hasPromotion && (
            <span className="price-tag absolute left-4 top-4 bg-black/40">
              <span className="ptag-label">PROMO</span>
              <span className="ptag-value">
                -{Math.round(((product.price - finalPrice) / product.price) * 100)}%
              </span>
            </span>
          )}

          <button
            type="button"
            className="modal-close absolute right-4 top-4 flex h-10 w-10 items-center justify-center"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {categoryName && (
            <span className="mb-3 inline-block rounded-full bg-gold px-2 py-1 text-xs font-bold text-[#1a1206]">
              {categoryName}
            </span>
          )}
          <h3 id="product-modal-title" className="font-display text-2xl text-cream">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gold-pale">
            {product.description}
          </p>

          {product.ingredients && product.ingredients.length > 0 && (
            <>
              <h4 className="mb-2 mt-4 font-semibold text-[#c9bfae]">
                Ingredientes
              </h4>
              <div className="mb-6 flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="rounded-full bg-wood-light px-3 py-1 text-sm text-[#c9bfae]"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="flex items-center justify-between border-t border-gold/15 pt-4">
            <div>
              <span className="text-3xl font-bold text-gold">
                R$ {formatBRL(finalPrice)}
              </span>
              {product.size && (
                <span className="mt-1 block text-sm text-gold-pale">
                  {product.size}
                </span>
              )}
            </div>

            {quantity > 0 ? (
              <div className="flex items-center gap-3 rounded-xl border border-gold/20 bg-gold/5 p-3">
                <div className="cart-qty-wrap flex items-center gap-1 px-1 py-1">
                  <button
                    type="button"
                    className="cart-qty-btn flex h-9 w-9 items-center justify-center"
                    onClick={onDecrease}
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-8 text-center font-bold text-cream">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="cart-qty-btn flex h-9 w-9 items-center justify-center"
                    onClick={onIncrease}
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="font-display text-lg text-gold">
                  Total: R$ {formatBRL(finalPrice * quantity)}
                </span>
              </div>
            ) : (
              <button
                type="button"
                className="btn-gold flex cursor-pointer items-center gap-2 px-6 py-3 font-semibold"
                style={{ backgroundColor: primaryColor }}
                onClick={onAdd}
              >
                <ShoppingBag size={20} />
                Adicionar
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-xs text-gold-pale/60">
            A entrega é feita via WhatsApp e aceitamos Pix, cartão e dinheiro.
          </p>
        </div>
      </div>
    </div>
  );
}