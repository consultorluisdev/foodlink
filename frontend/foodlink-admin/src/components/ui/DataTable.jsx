export default function DataTable({ columns, data, emptyMessage = 'Nenhum registro encontrado' }) {
  return (
    <div className="card-wood overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-foodlink-cream">
          <thead>
            <tr className="bg-foodlink-wood-light">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foodlink-gold-pale whitespace-nowrap"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-foodlink-gold-pale/60">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  className="border-t border-foodlink-gold/10 hover:bg-foodlink-wood-light/40 transition"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}