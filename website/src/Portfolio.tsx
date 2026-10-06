import { useState } from 'react'
import { PORTFOLIO_DATA, type PortfolioItem } from './portfolioData'

function ItemCard({ item }: { item: PortfolioItem }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="border border-[var(--border)] rounded-xl p-4 text-left flex flex-col gap-2 transition-all hover:border-[var(--accent)] hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-medium">{item.title}</h4>
            {item.subtitle && (
              <p className="text-xs text-[var(--text-muted)]">{item.subtitle}</p>
            )}
          </div>
          {item.year && (
            <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{item.year}</span>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
        )}

        {item.stats && (
          <div className="flex flex-col gap-1 mt-1">
            {item.stats.map((s, i) => (
              <span key={i} className="text-sm">
                {s.icon} {s.label}
              </span>
            ))}
          </div>
        )}

        {item.media && (
          <button
            onClick={() => setOpen(true)}
            className="mt-2 self-start text-xs px-3 py-1.5 rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition"
          >
            {item.media.label}
          </button>
        )}
      </div>

      {open && item.media && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[var(--bg)] rounded-2xl p-4 max-w-2xl w-full max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {item.media.type === 'pdf' && (
              <a
                href={item.media.src as string}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent)] underline text-sm"
              >
                Abrir documento em novo separador →
              </a>
            )}
            {(item.media.type === 'image' || item.media.type === 'images') && (
              <div className="flex flex-col gap-3">
                {(Array.isArray(item.media.src) ? item.media.src : [item.media.src]).map(
                  (src) => (
                    <img key={src} src={src} alt={item.title} className="rounded-lg w-full" />
                  )
                )}
              </div>
            )}
            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-sm text-[var(--text-muted)]"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function Portfolio() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3 w-full">
      {PORTFOLIO_DATA.map((cat) => {
        const isOpen = openCategory === cat.id
        return (
          <div key={cat.id} className="border border-[var(--border)] rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenCategory(isOpen ? null : cat.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium flex items-center gap-2">
                <span>{cat.icon}</span> {cat.title}
              </span>
              <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 flex flex-col gap-4 animate-fade-in">
                {cat.items && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {cat.items.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
                {cat.subcategories?.map((sub) => (
                  <div key={sub.title} className="flex flex-col gap-2">
                    <h4 className="text-sm text-[var(--text-muted)] font-medium">{sub.title}</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {sub.items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}