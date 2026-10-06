import { useState } from 'react'

type Island = { name: string; color: string; hex: string }

const ISLANDS: Island[] = [
  { name: 'São Miguel', color: 'Verde', hex: '#2a9d5c' },
  { name: 'Santa Maria', color: 'Amarela', hex: '#f4c542' },
  { name: 'Terceira', color: 'Lilás', hex: '#b18fd1' },
  { name: 'Graciosa', color: 'Branca', hex: '#f2f2f2' },
  { name: 'São Jorge', color: 'Castanha', hex: '#8b5e3c' },
  { name: 'Pico', color: 'Cinzenta', hex: '#8c8c8c' },
  { name: 'Faial', color: 'Azul', hex: '#3d8bfd' },
  { name: 'Flores', color: 'Rosa', hex: '#f19bbd' },
  { name: 'Corvo', color: 'Negra', hex: '#2b2b2b' },
]

const ALL_COLORS = ISLANDS.map((i) => i.color)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function getOptions(correct: string): string[] {
  const wrong = shuffle(ALL_COLORS.filter((c) => c !== correct)).slice(0, 3)
  return shuffle([correct, ...wrong])
}

export default function IslandGame({ onClose }: { onClose: () => void }) {
  const [order] = useState(() => shuffle(ISLANDS))
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [options, setOptions] = useState(() => getOptions(order[0].color))

  const current = order[step]
  const finished = step >= order.length

  const choose = (color: string) => {
    if (selected) return
    setSelected(color)
    if (color === current.color) setScore((s) => s + 1)

    setTimeout(() => {
      const next = step + 1
      setStep(next)
      setSelected(null)
      if (next < order.length) setOptions(getOptions(order[next].color))
    }, 900)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg)] text-[var(--text)] rounded-2xl p-6 max-w-md w-full border border-[var(--border)]">
        <span className="block text-center text-[10px] uppercase tracking-wide text-[var(--accent)] mb-2">
          🎮 Mini-jogo
        </span>

        {finished ? (
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-xl font-medium">Resultado</h2>
            <p className="text-3xl font-semibold text-[var(--accent)]">
              {score} / {order.length}
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              {score === order.length ? 'Acertaste tudo! 🎉' : 'Boa tentativa 🌈'}
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 rounded-full bg-[var(--accent)] text-white"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              Ilha {step + 1} de {order.length} · Pontos: {score}
            </p>
            <h2 className="text-lg font-medium">
              Qual é a cor da ilha de <strong>{current.name}</strong>?
            </h2>

            <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden -mt-2 mb-1">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-500"
                style={{ width: `${(step / order.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {options.map((color) => {
                const isCorrect = color === current.color
                const isSelected = color === selected
                const hex = ISLANDS.find((i) => i.color === color)?.hex ?? '#999'
                let style = 'border-[var(--border)]'
                if (selected) {
                  if (isCorrect) style = 'border-green-500 bg-green-500/10'
                  else if (isSelected) style = 'border-red-500 bg-red-500/10'
                }
                return (
                  <button
                    key={color}
                    onClick={() => choose(color)}
                    disabled={!!selected}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${style}`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-[var(--border)]"
                      style={{ backgroundColor: hex }}
                    />
                    {color}
                  </button>
                )
              })}
            </div>

            <button onClick={onClose} className="text-sm text-[var(--text-muted)] mt-2">
              Sair do jogo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}