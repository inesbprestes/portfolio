import { useState } from 'react'

type City = { name: string; country: string }

const CITY_POOL: City[] = [
  { name: 'Lisboa', country: 'Portugal' },
  { name: 'Porto', country: 'Portugal' },
  { name: 'Madrid', country: 'Espanha' },
  { name: 'Barcelona', country: 'Espanha' },
  { name: 'Paris', country: 'França' },
  { name: 'Marselha', country: 'França' },
  { name: 'Roma', country: 'Itália' },
  { name: 'Milão', country: 'Itália' },
  { name: 'Berlim', country: 'Alemanha' },
  { name: 'Munique', country: 'Alemanha' },
  { name: 'Amsterdão', country: 'Países Baixos' },
  { name: 'Bruxelas', country: 'Bélgica' },
  { name: 'Antuérpia', country: 'Bélgica' },
  { name: 'Viena', country: 'Áustria' },
  { name: 'Zurique', country: 'Suíça' },
  { name: 'Estocolmo', country: 'Suécia' },
  { name: 'Oslo', country: 'Noruega' },
  { name: 'Copenhaga', country: 'Dinamarca' },
  { name: 'Helsínquia', country: 'Finlândia' },
  { name: 'Dublin', country: 'Irlanda' },
  { name: 'Londres', country: 'Reino Unido' },
  { name: 'Edimburgo', country: 'Reino Unido' },
  { name: 'Varsóvia', country: 'Polónia' },
  { name: 'Praga', country: 'República Checa' },
  { name: 'Budapeste', country: 'Hungria' },
  { name: 'Atenas', country: 'Grécia' },
  { name: 'Istambul', country: 'Turquia' },
  { name: 'Moscovo', country: 'Rússia' },
  { name: 'Cairo', country: 'Egito' },
  { name: 'Marraquexe', country: 'Marrocos' },
  { name: 'Cidade do Cabo', country: 'África do Sul' },
  { name: 'Nairobi', country: 'Quénia' },
  { name: 'Tóquio', country: 'Japão' },
  { name: 'Quioto', country: 'Japão' },
  { name: 'Seul', country: 'Coreia do Sul' },
  { name: 'Pequim', country: 'China' },
  { name: 'Xangai', country: 'China' },
  { name: 'Bangkok', country: 'Tailândia' },
  { name: 'Singapura', country: 'Singapura' },
  { name: 'Nova Deli', country: 'Índia' },
  { name: 'Dubai', country: 'Emirados Árabes Unidos' },
  { name: 'Nova Iorque', country: 'Estados Unidos' },
  { name: 'Los Angeles', country: 'Estados Unidos' },
  { name: 'Toronto', country: 'Canadá' },
  { name: 'Cidade do México', country: 'México' },
  { name: 'Bogotá', country: 'Colômbia' },
  { name: 'Lima', country: 'Peru' },
  { name: 'Buenos Aires', country: 'Argentina' },
  { name: 'São Paulo', country: 'Brasil' },
  { name: 'Rio de Janeiro', country: 'Brasil' },
  { name: 'Sydney', country: 'Austrália' },
  { name: 'Auckland', country: 'Nova Zelândia' },
  { name: 'Las Palmas', country: 'Espanha' },
]

const FLAGS: Record<string, string> = {
  Portugal: '🇵🇹', Espanha: '🇪🇸', França: '🇫🇷', Itália: '🇮🇹', Alemanha: '🇩🇪',
  'Países Baixos': '🇳🇱', Bélgica: '🇧🇪', Áustria: '🇦🇹', Suíça: '🇨🇭', Suécia: '🇸🇪',
  Noruega: '🇳🇴', Dinamarca: '🇩🇰', Finlândia: '🇫🇮', Irlanda: '🇮🇪', 'Reino Unido': '🇬🇧',
  Polónia: '🇵🇱', 'República Checa': '🇨🇿', Hungria: '🇭🇺', Grécia: '🇬🇷', Turquia: '🇹🇷',
  Rússia: '🇷🇺', Egito: '🇪🇬', Marrocos: '🇲🇦', 'África do Sul': '🇿🇦', Quénia: '🇰🇪',
  Japão: '🇯🇵', 'Coreia do Sul': '🇰🇷', China: '🇨🇳', Tailândia: '🇹🇭', Singapura: '🇸🇬',
  Índia: '🇮🇳', 'Emirados Árabes Unidos': '🇦🇪', 'Estados Unidos': '🇺🇸', Canadá: '🇨🇦',
  México: '🇲🇽', Colômbia: '🇨🇴', Peru: '🇵🇪', Argentina: '🇦🇷', Brasil: '🇧🇷',
  Austrália: '🇦🇺', 'Nova Zelândia': '🇳🇿',
}

const QUESTIONS_PER_GAME = 10

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildGame() {
  const chosen = shuffle(CITY_POOL).slice(0, QUESTIONS_PER_GAME)
  const allCountries = Array.from(new Set(CITY_POOL.map((c) => c.country)))

  const options = chosen.map((city) => {
    const wrong = shuffle(allCountries.filter((c) => c !== city.country)).slice(0, 3)
    return shuffle([city.country, ...wrong])
  })

  return { chosen, options }
}

export default function CityGame({ onClose }: { onClose: () => void }) {
  const [game, setGame] = useState(buildGame)
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  const current = game.chosen[step]
  const finished = step >= game.chosen.length

  const choose = (country: string) => {
    if (selected) return
    setSelected(country)
    if (country === current.country) setScore((s) => s + 1)

    setTimeout(() => {
      setStep((s) => s + 1)
      setSelected(null)
    }, 900)
  }

  const playAgain = () => {
    setGame(buildGame())
    setStep(0)
    setScore(0)
    setSelected(null)
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
              {score} / {game.chosen.length}
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              {score === game.chosen.length
                ? 'Perfeito!🌍'
                : 'Boa tentativa!'}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={playAgain}
                className="px-5 py-2 rounded-full bg-[var(--accent)] text-white"
              >
                Jogar de novo
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full border border-[var(--border)]"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              Cidade {step + 1} de {game.chosen.length} · Pontos: {score}
            </p>
            <h2 className="text-lg font-medium">
              Em que país fica <strong>{current.name}</strong>?
            </h2>

            <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden -mt-2 mb-1">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-500"
                style={{ width: `${(step / game.chosen.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {game.options[step].map((country) => {
                const isCorrect = country === current.country
                const isSelected = country === selected
                let style = 'border-[var(--border)]'
                if (selected) {
                  if (isCorrect) style = 'border-green-500 bg-green-500/10'
                  else if (isSelected) style = 'border-red-500 bg-red-500/10'
                }
                return (
                  <button
                    key={country}
                    onClick={() => choose(country)}
                    disabled={!!selected}
                    className={`px-4 py-3 rounded-xl border transition ${style}`}
                  >
                    <span className="mr-2">{FLAGS[country]}</span>
                    {country}
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