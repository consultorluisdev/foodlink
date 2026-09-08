import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function KPICard({ title, value, icon: Icon, delta, trend = 'up' }) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight

  return (
    <div className="card-wood p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foodlink-gold-pale">{title}</p>
          <p className="font-display text-3xl text-foodlink-gold mt-2">{value}</p>
        </div>
        {Icon && (
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-foodlink-gold/10 text-foodlink-gold">
            <Icon size={22} />
          </div>
        )}
      </div>
      {delta !== undefined && (
        <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-foodlink-gold-pale">
          <TrendIcon size={14} className={trend === 'up' ? 'text-foodlink-gold' : 'text-foodlink-ember'} />
          {delta}
        </span>
      )}
    </div>
  )
}