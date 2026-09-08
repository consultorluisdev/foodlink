export default function PDV() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foodlink-cream">Ponto de venda</h2>
        <p className="text-sm text-foodlink-gold-pale/60">Venda rápida: selecione os produtos e feche o pedido</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-wood p-5">
          <h3 className="font-display text-lg text-foodlink-gold uppercase">Produtos</h3>
          <p className="mt-4 text-sm text-foodlink-gold-pale/60">
            O catálogo de produtos aparecerá aqui.
          </p>
        </div>

        <div className="card-wood p-5">
          <h3 className="font-display text-lg text-foodlink-gold uppercase">Carrinho</h3>
          <p className="mt-4 text-sm text-foodlink-gold-pale/60">
            O carrinho de vendas aparecerá aqui.
          </p>
        </div>
      </div>
    </div>
  )
}