import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import DataTable from '../components/ui/DataTable'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'telefone', label: 'Telefone' },
  { key: 'email', label: 'Email' },
  { key: 'total', label: 'Total em pedidos' },
  { key: 'acoes', label: 'Ações' },
]

export default function Clientes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foodlink-cream">Clientes</h2>
          <p className="text-sm text-foodlink-gold-pale/60">Gerencie seus clientes</p>
        </div>
        <Button variant="gold" size="sm">
          <Plus size={16} /> Novo cliente
        </Button>
      </div>

      <DataTable columns={columns} data={[]} emptyMessage="Nenhum cliente cadastrado ainda" />
    </div>
  )
}