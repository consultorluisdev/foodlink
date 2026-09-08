import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import DataTable from '../components/ui/DataTable'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'status', label: 'Status' },
  { key: 'acoes', label: 'Ações' },
]

export default function Categorias() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foodlink-cream">Categorias</h2>
          <p className="text-sm text-foodlink-gold-pale/60">Gerencie as categorias do cardápio</p>
        </div>
        <Button variant="gold" size="sm">
          <Plus size={16} /> Nova categoria
        </Button>
      </div>

      <DataTable columns={columns} data={[]} emptyMessage="Nenhuma categoria criada ainda" />
    </div>
  )
}