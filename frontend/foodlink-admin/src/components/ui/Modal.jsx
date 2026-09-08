import { X } from 'lucide-react'

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-[fadeIn_0.3s_ease]">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-foodlink-wood border border-foodlink-gold/25 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-foodlink-gold uppercase">{title}</h3>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-foodlink-gold/15 text-foodlink-gold-pale hover:bg-foodlink-gold/30 transition"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}