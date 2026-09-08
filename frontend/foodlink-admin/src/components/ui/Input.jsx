export default function Input({ label, className = '', id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-foodlink-gold-pale">
          {label}
        </label>
      )}
      <input id={id} className={`input-dark px-4 py-2.5 text-sm ${className}`} {...props} />
    </div>
  )
}