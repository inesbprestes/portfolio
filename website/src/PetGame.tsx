import { useEffect, useRef, useState } from 'react'

type PetType = 'cão' | 'coelho' | 'gato'
type Particle = { id: number; type: 'heart' | 'tear'; left: number }

const PET_EMOJI: Record<PetType, string> = { cão: '🐶', coelho: '🐰', gato: '🐱' }
const PET_EMOJI_SLEEPY: Record<PetType, string> = { cão: '😴', coelho: '😴', gato: '😴' }

const GIFTS: Record<PetType, { emoji: string; label: string }[]> = {
  cão: [
    { emoji: '🦴', label: 'Trouxe-te um osso!' },
    { emoji: '🎾', label: 'Encontrou uma bola nova!' },
    { emoji: '🧸', label: 'Um peluche para brincar!' },
    { emoji: '🐾', label: 'Deixou uma pegada de amor!' },
  ],
  gato: [
    { emoji: '🐟', label: 'Caçou um peixinho de brinquedo!' },
    { emoji: '🧶', label: 'Trouxe um novelo de lã!' },
    { emoji: '📦', label: 'Encontrou uma caixa favorita!' },
    { emoji: '🎀', label: 'Um laço fofo para ti!' },
  ],
  coelho: [
    { emoji: '🥕', label: 'Uma cenourinha fresca!' },
    { emoji: '🌼', label: 'Uma flor do jardim!' },
    { emoji: '🍀', label: 'Um trevo da sorte!' },
    { emoji: '🎀', label: 'Um laço fofo para ti!' },
  ],
}

const ACHIEVEMENTS = [
  { id: 'first-feed', label: 'Primeira refeição dada! 🍖' },
  { id: 'first-play', label: 'Primeira brincadeira! 🎾' },
  { id: 'first-bath', label: 'Bem lavadinho! 🚿' },
  { id: 'happy-max', label: 'Está radiante! ✨' },
  { id: 'full-max', label: 'Barriga cheia! 🥰' },
  { id: 'best-friend', label: 'Tornaram-se melhores amigos! 💛' },
  { id: 'level-up', label: 'Subiu de nível! Agora é adulto 🌟' },
]

function StatBar({ label, value, icon }: { label: string; value: number; icon: string }) {
  const color = value > 60 ? 'bg-green-400' : value > 30 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
        <span>{icon} {label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function PetGame({ onClose }: { onClose: () => void }) {
  const [petType, setPetType] = useState<PetType | null>(null)
  const [petName, setPetName] = useState('')
  const [hunger, setHunger] = useState(60)
  const [happiness, setHappiness] = useState(60)
  const [hygiene, setHygiene] = useState(60)
  const [care, setCare] = useState(0)
  const [bounce, setBounce] = useState(false)
  const [bathing, setBathing] = useState(false)
  const [sleepy, setSleepy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [surpriseReady, setSurpriseReady] = useState(true)
  const [particles, setParticles] = useState<Particle[]>([])
  const unlocked = useRef(new Set<string>())
  const particleId = useRef(0)

  useEffect(() => {
    if (!petType) return
    const interval = setInterval(() => {
      setHunger((h) => Math.max(0, h - 3))
      setHappiness((h) => Math.max(0, h - 2))
      setHygiene((h) => Math.max(0, h - 2))
    }, 4000)
    return () => clearInterval(interval)
  }, [petType])

  const level = care >= 15 ? 'adulto' : 'bebé'

  useEffect(() => {
    if (care === 15) unlock('level-up')
  }, [care])

  const unlock = (id: string, forceMessage?: string) => {
    if (forceMessage) {
      setMessage(forceMessage)
      setTimeout(() => setMessage(null), 3800)
      return
    }
    if (unlocked.current.has(id)) return
    unlocked.current.add(id)
    const achievement = ACHIEVEMENTS.find((a) => a.id === id)
    if (achievement) {
      setMessage(achievement.label)
      setTimeout(() => setMessage(null), 3800)
    }
  }

  const triggerBounce = () => {
    setBounce(true)
    setCare((c) => c + 1)
    setTimeout(() => setBounce(false), 400)
  }

  const feed = () => {
    setHunger((h) => Math.min(100, h + 25))
    triggerBounce()
    unlock('first-feed')
    if (hunger + 25 >= 100) unlock('full-max')
  }

  const play = () => {
    setHappiness((h) => Math.min(100, h + 20))
    setHunger((h) => Math.max(0, h - 5))
    triggerBounce()
    unlock('first-play')
    if (happiness + 20 >= 100) unlock('happy-max')
  }

  const bath = () => {
    setHygiene((h) => Math.min(100, h + 30))
    setBathing(true)
    triggerBounce()
    unlock('first-bath')
    setTimeout(() => setBathing(false), 900)
  }

  const rest = () => {
    setHappiness((h) => Math.min(100, h + 10))
    setHunger((h) => Math.min(100, h + 5))
    setSleepy(true)
    triggerBounce()
    setTimeout(() => setSleepy(false), 700)
  }

  const surprise = () => {
    if (!surpriseReady || !petType) return
    setHappiness((h) => Math.min(100, h + 15))
    setHygiene((h) => Math.max(0, h - 5))
    triggerBounce()

    const gifts = GIFTS[petType]
    const gift = gifts[Math.floor(Math.random() * gifts.length)]
    unlock('surprise', `${gift.emoji}  ${gift.label}`)

    setSurpriseReady(false)
    setTimeout(() => setSurpriseReady(true), 10000)
  }

  useEffect(() => {
    if (hunger >= 80 && happiness >= 80 && hygiene >= 80) unlock('best-friend')
  }, [hunger, happiness, hygiene])

  const avgStat = (hunger + happiness + hygiene) / 3
  const mood = avgStat < 30 ? 'triste' : avgStat > 75 ? 'radiante' : 'bem'

  useEffect(() => {
    if (mood !== 'radiante' && mood !== 'triste') return
    const type: 'heart' | 'tear' = mood === 'radiante' ? 'heart' : 'tear'

    const spawn = () => {
      const id = particleId.current++
      setParticles((prev) => [...prev, { id, type, left: 35 + Math.random() * 30 }])
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
      }, 1300)
    }

    spawn()
    const interval = setInterval(spawn, 1100)
    return () => clearInterval(interval)
  }, [mood])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg)] text-[var(--text)] rounded-2xl p-6 max-w-md w-full border border-[var(--border)]">
        <span className="block text-center text-[10px] uppercase tracking-wide text-[var(--accent)] mb-2">
          🎮 Mini-jogo
        </span>
        {!petType ? (
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-lg font-medium">Escolhe o teu bichinho</h2>
            <div className="flex justify-center gap-3">
              {(['cão', 'coelho', 'gato'] as PetType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setPetType(type)}
                  className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition"
                >
                  <span className="text-3xl">{PET_EMOJI[type]}</span>
                  <span className="text-xs capitalize">{type}</span>
                </button>
              ))}
            </div>
            <button onClick={onClose} className="text-sm text-[var(--text-muted)] mt-2">Sair</button>
          </div>
        ) : !petName ? (
          <div className="flex flex-col gap-4 text-center">
            <span className="text-5xl">{PET_EMOJI[petType]}</span>
            <h2 className="text-lg font-medium">Como se chama o teu {petType}?</h2>
            <input
              type="text"
              autoFocus
              placeholder="Nome..."
              className="bg-transparent border border-[var(--border)] rounded-full px-4 py-2 text-center outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  setPetName(e.currentTarget.value.trim())
                }
              }}
            />
            <p className="text-xs text-[var(--text-muted)]">Prime Enter para confirmar</p>
            <button onClick={() => setPetType(null)} className="text-sm text-[var(--text-muted)]">Voltar</button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 items-center">
            {message && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center max-w-[90%] z-10 animate-fade-in">
                {message}
              </div>
            )}

            <span className="text-xs text-[var(--text-muted)] -mb-3 capitalize">Nível: {level}</span>

            <div className="relative flex items-center justify-center h-20 w-full">
              <span
                className={`text-6xl select-none ${bounce ? 'pet-bounce' : ''}`}
                style={{ filter: mood === 'triste' ? 'grayscale(40%)' : 'none' }}
              >
                {sleepy ? PET_EMOJI_SLEEPY[petType] : PET_EMOJI[petType]}
              </span>

              {bathing &&
                [0, 1, 2, 3].map((i) => (
                  <span
                    key={`b-${i}`}
                    className="bubble"
                    style={{ left: `${45 + (i - 1.5) * 12}%`, animationDelay: `${i * 0.12}s` }}
                  />
                ))}

              {particles.map((p) => (
                <span
                  key={p.id}
                  className={p.type === 'heart' ? 'particle-heart' : 'particle-tear'}
                  style={{ left: `${p.left}%` }}
                >
                  {p.type === 'heart' ? '💕' : '💧'}
                </span>
              ))}
            </div>

            <p className="text-sm text-[var(--text-muted)] -mt-2">
              {mood === 'radiante'
                ? `${petName} está radiante! ✨`
                : mood === 'triste'
                ? `${petName} precisa de atenção...`
                : `${petName} está bem-disposto.`}
            </p>

            <div className="w-full flex flex-col gap-3">
              <StatBar label="Fome" value={hunger} icon="🍖" />
              <StatBar label="Felicidade" value={happiness} icon="🎾" />
              <StatBar label="Higiene" value={hygiene} icon="🚿" />
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              <button onClick={feed} className="px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] text-sm">🍖 Alimentar</button>
              <button onClick={play} className="px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] text-sm">🎾 Brincar</button>
              <button onClick={bath} className="px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] text-sm">🚿 Banho</button>
              <button onClick={rest} className="px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] text-sm">😴 Descansar</button>
              <button
                onClick={surprise}
                disabled={!surpriseReady}
                className="px-4 py-2 rounded-full border border-dashed border-[var(--accent)] text-[var(--accent)] text-sm disabled:opacity-30"
              >
                🎁 Surpresa
              </button>
            </div>

            <button onClick={onClose} className="text-sm text-[var(--text-muted)]">Sair do jogo</button>
          </div>
        )}
      </div>
    </div>
  )
}