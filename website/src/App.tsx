import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from './themecontext'
import Quiz from './quiz'
import CursorTrail from './cursortail'
import IslandGame from './IslandGame'
import CityGame from './CityGame'
import GpaCalculator from './gpaCalculator'
import PetGame from './PetGame'
import Portfolio from './Portfolio'
import FeedbackPanel from './FeedbackPanel'
import PhotoGallery from './PhotoGallery'
import { CITY_PHOTOS } from './cityPhotosData'
import { PET_PHOTOS } from './petPhotosData'
import OndaAcores from './OndaAcores'

const THEME_ICON: Record<string, string> = {
  acores: '🌋',
  cidades: '🗺️',
  animais: '🐾',
  artists: '♪',
  biomedica: '🧬',
}

const THEME_NAME: Record<string, string> = {
  acores: 'Açores',
  cidades: 'Cidades',
  animais: 'Animais',
  artists: 'Artistas',
  biomedica: 'Biomédica',
}

function ThemeSwitcher({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const { theme, setTheme, unlockedThemes } = useTheme()
  const basics = [
    { id: 'light' as const, label: 'Claro' },
    { id: 'dark' as const, label: 'Dark' },
  ]

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex gap-2 justify-center flex-wrap items-center">
        {basics.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              theme === t.id
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={onOpenQuiz}
          className="px-4 py-2 rounded-full border border-dashed border-[var(--accent)] text-sm text-[var(--accent)]"
          aria-label="Abrir quiz"
        >
          {unlockedThemes.length === 0
            ? '✨ Descobre o teu tema'
            : unlockedThemes.length < 5
            ? '✨ Descobre mais temas'
            : '✨ Refazer o quiz'}
        </button>
          </div>

      {unlockedThemes.length > 0 && (
        <div className="flex gap-1.5 items-center flex-wrap justify-center">
          <span className="text-xs text-[var(--text-muted)] mr-1">Já descobriste:</span>
          {unlockedThemes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              title={THEME_NAME[t]}
              aria-label={`Mudar para o tema ${THEME_NAME[t]}`}
              className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm transition ${
                theme === t
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                  : 'border-[var(--border)] hover:border-[var(--accent)]'
              }`}
            >
              {THEME_ICON[t]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function FrequencySearchBar() {
  const [query, setQuery] = useState('')
  const [shake, setShake] = useState(false)

  const SECTIONS: Record<string, string> = {
    sobre: 'sobre',
    'sobre mim': 'sobre',
    portfolio: 'portfolio',
    portfólio: 'portfolio',
    projetos: 'portfolio',
    certificados: 'portfolio',
    voluntariado: 'portfolio',
    hobbies: 'portfolio',
    concursos: 'portfolio',
    contacto: 'contactos',
    contactos: 'contactos',
    email: 'contactos',
    calculadora: 'calculadora',
    média: 'calculadora',
    notas: 'calculadora',
  }

  const handleSearch = () => {
    const key = query.trim().toLowerCase()
    const sectionId = SECTIONS[key]
    const el = sectionId ? document.getElementById(sectionId) : null

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setQuery('')
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }

  return (
    <div
      className={`flex items-center gap-3 border border-[var(--border)] rounded-full px-5 py-3 max-w-md mx-auto ${
        shake ? 'shake' : ''
      }`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Pesquisar (ex: portfólio...)"
        className="bg-transparent outline-none flex-1 text-[var(--text)] placeholder-[var(--text-muted)]"
      />
      <div className="flex items-end gap-[3px] h-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="wave-bar w-[3px] rounded-full bg-[var(--accent)]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function BiomedicaNudge() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const target = document.getElementById('calculadora')
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const scrollToCalc = () => {
    document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToCalc}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent)] text-white text-sm shadow-lg animate-bounce-subtle z-40"
    >
      🧮 Calcula a tua média <span>↓</span>
    </button>
  )
}

function AppContent() {
  const { theme, unlockedThemes } = useTheme()
  const [quizOpen, setQuizOpen] = useState(false)
  const [islandGameOpen, setIslandGameOpen] = useState(false)
  const [cityGameOpen, setCityGameOpen] = useState(false)
  const [petGameOpen, setPetGameOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const ALL_QUIZ_THEMES = ['acores', 'cidades', 'animais', 'artists', 'biomedica']
  const allFound = ALL_QUIZ_THEMES.every((t) => unlockedThemes.includes(t as any))

  useEffect(() => {
    if (allFound && !localStorage.getItem('feedback-shown')) {
      setFeedbackOpen(true)
      localStorage.setItem('feedback-shown', 'true')
    }
  }, [allFound])
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 gap-20">
      <CursorTrail />
      <section className="text-center flex flex-col gap-4 items-center pt-10">
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Portfólio & CV
        </p>
        <h1 className="text-3xl font-medium">Inês Prestes</h1>
        <ThemeSwitcher onOpenQuiz={() => setQuizOpen(true)} />
        <FrequencySearchBar />
      </section>

      {theme === 'artists' && (
        <section className="max-w-md w-full">
          <iframe
            style={{ borderRadius: 12 }}
            src="https://open.spotify.com/embed/playlist/38eqRMqthPBkEdjsedfupm"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </section>
      )}
      {theme === 'cidades' && (
    <PhotoGallery
      title="Fotos de cidades que visitei"
      icon="🗺️"
      groups={[
        {
          label: 'Nacional',
          items: CITY_PHOTOS.filter((c) => c.category === 'nacional').map((c) => ({
            id: c.id,
            name: c.name,
            photo: c.photo,
          })),
        },
        {
          label: 'Internacional',
          items: CITY_PHOTOS.filter((c) => c.category === 'internacional').map((c) => ({
            id: c.id,
            name: c.name,
            photo: c.photo,
          })),
        },
      ]}
    />
  )}

  {theme === 'animais' && (
    <PhotoGallery
      title="Os meus animais"
      icon="🐾"
      groups={[
        {
          items: PET_PHOTOS.map((p) => ({
            id: p.id,
            name: p.name,
            subtitle: `${p.type} · ${p.years}`,
            photo: p.photo,
          })),
        },
      ]}
    />
  )}

      <section id="sobre" className="max-w-xl text-center">
        <h2 className="text-2xl mb-4">Sobre mim</h2>
        <p className="text-[var(--text-muted)]">
          Olá! Sou a Inês Prestes, tenho 18 anos e venho dos Açores.
        </p>
        <p className="text-[var(--text-muted)]">
          👩‍🎓 2º ano da licenciatura em Engenharia Biomédica no IST. 
        </p>
        <p className="text-[var(--text-muted)]">
          ...
        </p>
      </section>

      <section id="portfolio" className="max-w-2xl w-full">
        <h2 className="text-2xl mb-6 text-center">Portfólio</h2>
        <Portfolio />
      </section>

      {theme === 'acores' && (
        <>
          <OndaAcores />
          <button
            onClick={() => setIslandGameOpen(true)}
            aria-label="Abrir jogo"
            className="fixed bottom-6 right-6 text-2xl bg-[var(--bg)] border border-[var(--border)] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition"
            title="Jogo escondido!"
          >
            🌋
          </button>
        </>
      )}
      {theme === 'cidades' && (
        <button
          onClick={() => setCityGameOpen(true)}
          aria-label="Abrir jogo"
          className="fixed bottom-6 right-6 text-2xl bg-[var(--bg)] border border-[var(--border)] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition"
          title="Jogo escondido!"
        >
          🗺️
        </button>
      )}

      {theme === 'biomedica' && (
        <section id="calculadora" className="w-full flex justify-center">
          <GpaCalculator />
        </section>
      )}
      
      {theme === 'biomedica' && <BiomedicaNudge />}

      {theme === 'animais' && (
        <button
          onClick={() => setPetGameOpen(true)}
          aria-label="Abrir jogo"
          className="fixed bottom-6 right-6 text-2xl bg-[var(--bg)] border border-[var(--border)] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition"
          title="Jogo escondido!"
        >
          🐾
        </button>
      )}

      <footer id="contactos" className="text-[var(--text-muted)] text-sm pb-6 flex items-center justify-center gap-3 flex-wrap">
        <span>inesbettencourtprestes@gmail.com · inesbprestes@tecnico.ulisboa.pt</span>
        <button
          onClick={() => setFeedbackOpen(true)}
          className="px-3 py-1 rounded-full border border-[var(--border)] hover:border-[var(--accent)] text-xs transition"
        >
          💬 Feedback
        </button>
        </footer>

      {quizOpen && <Quiz onClose={() => setQuizOpen(false)} />}
      {islandGameOpen && <IslandGame onClose={() => setIslandGameOpen(false)} />}
      {cityGameOpen && <CityGame onClose={() => setCityGameOpen(false)} />}
      {petGameOpen && <PetGame onClose={() => setPetGameOpen(false)} />}
      {feedbackOpen && <FeedbackPanel onClose={() => setFeedbackOpen(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}