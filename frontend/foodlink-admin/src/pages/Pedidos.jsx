import DataTable from '../components/ui/DataTable'

const columns = [
  { key: 'id', label: 'Pedido' },
  { key: 'cliente', label: 'Cliente' },
  { key: 'itens', label: 'Itens' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'acoes', label: 'Ações' },
]

export default function Pedidos() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foodlink-cream">Pedidos</h2>
        <p className="text-sm text-foodlink-gold-pale/60">Acompanhe todos os pedidos</p>
      </div>

      <DataTable columns={columns} data={[]} emptyMessage="Nenhum pedido registrado ainda" />
    </div>
  )
}