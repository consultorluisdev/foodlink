export default function LoadingSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 rounded-lg bg-foodlink-wood-light/60 animate-pulse" />
      ))}
    </div>
  )
}