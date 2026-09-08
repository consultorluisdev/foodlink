import { ShoppingCart, ClipboardList, Package, Users } from 'lucide-react'
import KPICard from '../components/ui/KPICard'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foodlink-cream">Visão geral</h2>
        <p className="text-sm text-foodlink-gold-pale/60">Resumo do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Pedidos hoje" value={0} icon={ClipboardList} delta="+0%" />
        <KPICard title="Faturamento" value="R$ 0,00" icon={ShoppingCart} delta="+0%" />
        <KPICard title="Produtos" value={0} icon={Package} />
        <KPICard title="Clientes" value={0} icon={Users} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="card-wood p-5">
          <h3 className="font-display text-lg text-foodlink-gold uppercase">Últimos pedidos</h3>
          <p className="mt-4 text-sm text-foodlink-gold-pale/60">
            Os pedidos recentes aparecerão aqui.
          </p>
        </div>

        <div className="card-wood p-5">
          <h3 className="font-display text-lg text-foodlink-gold uppercase">Cardápio em destaque</h3>
          <p className="mt-4 text-sm text-foodlink-gold-pale/60">
            Os itens em destaque aparecerão aqui.
          </p>
        </div>
      </div>
    </div>
  )
}