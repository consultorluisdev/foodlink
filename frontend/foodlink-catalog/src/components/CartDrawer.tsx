import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../context/CartContext";

function formatBRL(value: number) {
  return value.toFixed(2).replace(".", ",");
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  whatsapp: string;
  primaryColor: string;
}

export function CartDrawer({
  isOpen,
  onClose,
  restaurantName,
  whatsapp,
  primaryColor,
}: CartDrawerProps) {
  const {
    items,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const lines = items.map((item) => {
    const price = item.product.promotionalPrice ?? item.product.price;
    const total = (price * item.quantity).toFixed(2).replace(".", ",");
    return `• ${item.quantity}x ${item.product.name} = R$ ${total}`;
  });
  const totalStr = `Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
  const whatsappMessage = [
    `Olá! Gostaria de fazer um pedido no ${restaurantName}:`,
    "",
    ...lines,
    "",
    totalStr,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className={`cart-overlay fixed inset-0 z-[60] flex justify-end ${isOpen ? "open" : ""}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
        aria-label="Fechar carrinho"
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        className="cart-panel relative z-10 flex h-full w-full max-w-md flex-col border-l border-gold/20 shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.7)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div
          className="h-1 w-full shrink-0"
          style={{ backgroundColor: primaryColor }}
        />

        <header className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <ShoppingBag size={20} />
            </span>
            <div>
              <h2 id="cart-title" className="text-xl font-bold text-gold">
                Seu pedido
              </h2>
              <p className="text-sm text-gold-pale">
                {totalItems === 0
                  ? "Nenhum item ainda"
                  : `${totalItems} ${totalItems === 1 ? "item" : "itens"}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold-pale transition hover:bg-gold/10 hover:text-gold"
            onClick={onClose}
            aria-label="Fechar"
            tabIndex={isOpen ? 0 : -1}
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {items.length === 0 ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
              <span className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-gold/40 bg-gold/5 text-4xl">
                🍗
              </span>
              <p className="mb-1 text-lg font-semibold text-cream">
                Carrinho vazio
              </p>
              <p className="max-w-[220px] text-sm text-gold-pale">
                Adicione um prato do cardápio para montar seu pedido.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const price =
                  item.product.promotionalPrice ?? item.product.price;

                return (
                  <li key={item.product.id} className="cart-item p-4">
                    <div className="flex gap-3">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-wood-light text-3xl">
                        <span aria-hidden>{item.product.emoji ?? "🍗"}</span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h3 className="font-semibold leading-snug text-cream">
                            {item.product.name}
                          </h3>
                          <button
                            type="button"
                            className="shrink-0 rounded-full p-1 text-gold-pale/70 transition hover:bg-red-500/10 hover:text-red-400"
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`Remover ${item.product.name}`}
                            tabIndex={isOpen ? 0 : -1}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="text-sm text-gold-pale">
                          R$ {formatBRL(price)} un.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="cart-qty-wrap flex items-center gap-1 px-1 py-1">
                        <button
                          type="button"
                          className="cart-qty-btn flex h-8 w-8 items-center justify-center"
                          onClick={() => decreaseQuantity(item.product.id)}
                          aria-label="Diminuir quantidade"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-7 text-center text-sm font-bold text-cream">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="cart-qty-btn flex h-8 w-8 items-center justify-center"
                          onClick={() => increaseQuantity(item.product.id)}
                          aria-label="Aumentar quantidade"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-display text-xl text-gold">
                        R$ {formatBRL(price * item.quantity)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-gold/20 bg-black/30 px-6 py-5">
            <div className="mb-4 rounded-xl border border-dashed border-gold/35 bg-gold/5 px-4 py-3">
              <div className="flex items-center justify-between text-sm text-gold-pale">
                <span>Subtotal</span>
                <span>{totalItems} un.</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-gold-pale">Total</span>
                <span className="font-display text-3xl leading-none text-gold">
                  R$ {formatBRL(totalPrice)}
                </span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mb-3 w-full gap-2 py-3.5"
              tabIndex={isOpen ? 0 : -1}
            >
              <span aria-hidden>📲</span>
              Enviar pedido no WhatsApp
            </a>

            <button
              type="button"
              className="w-full py-2 text-sm text-gold-pale/70 transition hover:text-gold-pale"
              onClick={clearCart}
              tabIndex={isOpen ? 0 : -1}
            >
              Limpar carrinho
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}