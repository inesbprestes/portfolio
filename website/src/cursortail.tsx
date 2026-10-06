import { useEffect, useRef, useState } from 'react'
import { useTheme } from './themecontext'

type Particle = { id: number; x: number; y: number }

const THEME_SYMBOL: Record<string, string | null> = {
  light: null,
  dark: null,
  acores: '🐄',
  biomedica: '🧬',
  cidades: '🧭',
  animais: '🐾',
  artists: '♪',
}

export default function CursorTrail() {
  const { theme } = useTheme()
  const [particles, setParticles] = useState<Particle[]>([])
  const lastSpawn = useRef(0)
  const idCounter = useRef(0)

  const symbol = THEME_SYMBOL[theme] ?? null

  useEffect(() => {
    if (!symbol) {
      setParticles([])
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastSpawn.current < 80) return
      lastSpawn.current = now

      const id = idCounter.current++
      setParticles((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
      }, 700)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [symbol])

  if (!symbol) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="cursor-particle"
          style={{ left: p.x, top: p.y }}
        >
          {symbol}
        </span>
      ))}
    </div>
  )
}