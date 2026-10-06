import { useState } from 'react'

type PhotoItem = { id: string; name: string; subtitle?: string; photo: string }
type PhotoGroup = { label?: string; items: PhotoItem[] }

function PhotoThumb({ name, subtitle, photo }: { name: string; subtitle?: string; photo: string }) {
  const [error, setError] = useState(false)
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-full aspect-square rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--border)]/30 flex items-center justify-center">
        {error ? (
          <span className="text-2xl opacity-40">📷</span>
        ) : (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setError(true)}
          />
        )}
      </div>
      <span className="text-xs font-medium text-center">{name}</span>
      {subtitle && (
        <span className="text-[10px] text-[var(--text-muted)] text-center -mt-1">{subtitle}</span>
      )}
    </div>
  )
}

export default function PhotoGallery({
  title,
  icon,
  groups,
}: {
  title: string
  icon: string
  groups: PhotoGroup[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full max-w-xl border border-[var(--border)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left text-sm"
      >
        <span className="flex items-center gap-2">
          <span>{icon}</span> {title}
        </span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      {open && (
        <div className="px-5 pb-5 flex flex-col gap-4 animate-fade-in">
          {groups.map((group, gi) => (
            <div key={gi} className="flex flex-col gap-2">
              {group.label && (
                <h4 className="text-xs text-[var(--text-muted)] uppercase tracking-wide">
                  {group.label}
                </h4>
              )}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {group.items.map((item) => (
                  <PhotoThumb key={item.id} name={item.name} subtitle={item.subtitle} photo={item.photo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}