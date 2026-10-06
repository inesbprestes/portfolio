import { useState } from 'react'
import { useTheme, type Theme } from './themecontext'

type QuizTheme = 'acores' | 'cidades' | 'animais' | 'artists' | 'biomedica'

const THEME_LABELS: Record<QuizTheme, string> = {
  acores: 'Açores',
  cidades: 'Cidades',
  animais: 'Animais',
  artists: 'Artistas',
  biomedica: 'Biomédica',
}

const QUESTIONS: { question: string; options: { label: string; theme: QuizTheme }[] }[] = [
  {
    question: 'Como preferes passar um fim de semana livre?',
    options: [
      { label: 'Ao ar livre', theme: 'acores' },
      { label: 'Viajar', theme: 'cidades' },
      { label: 'Em família', theme: 'animais' },
      { label: 'Descansar/Lazer', theme: 'artists' },
      { label: 'Estudar/Trabalhar', theme: 'biomedica' },
    ],
  },
  {
    question: 'Escolhe uma palavra que te descreve:',
    options: [
      { label: 'Calmo', theme: 'acores' },
      { label: 'Aventureiro', theme: 'cidades' },
      { label: 'Carinhoso', theme: 'animais' },
      { label: 'Criativo', theme: 'artists' },
      { label: 'Organizado', theme: 'biomedica' },
    ],
  },
  {
    question: 'Qual destes sons te acalma mais?',
    options: [
      { label: 'Natureza', theme: 'acores' },
      { label: 'Vozes', theme: 'cidades' },
      { label: 'Ronronar', theme: 'animais' },
      { label: 'Música', theme: 'artists' },
      { label: 'Silêncio', theme: 'biomedica' },
    ],
  },
  {
    question: 'Se pudesses estar em qualquer lado agora, escolhias:',
    options: [
      { label: 'Na tua cidade', theme: 'acores' },
      { label: 'Festa', theme: 'cidades' },
      { label: 'Sofá', theme: 'animais' },
      { label: 'Concerto', theme: 'artists' },
      { label: 'Laboratório', theme: 'biomedica' },
    ],
  },
  {
    question: 'O que mais valorizas no dia a dia?',
    options: [
      { label: 'Tranquilidade', theme: 'acores' },
      { label: 'Novidade', theme: 'cidades' },
      { label: 'Companhia', theme: 'animais' },
      { label: 'Emoção', theme: 'artists' },
      { label: 'Conhecimento', theme: 'biomedica' },
    ],
  },
]

export default function Quiz({ onClose }: { onClose: () => void }) {
  const { unlockTheme } = useTheme()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizTheme[]>([])
  const [finished, setFinished] = useState(false)

  const answer = (theme: QuizTheme) => {
    const newAnswers = [...answers, theme]
    setAnswers(newAnswers)

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1)
    } else {
      setFinished(true)
    }
  }

  const goBack = () => {
    if (step === 0) return
    setAnswers((prev) => prev.slice(0, -1))
    setStep((s) => s - 1)
    setFinished(false)
  }

  const calculateResult = (): QuizTheme => {
    const scores: Record<QuizTheme, number> = {
      acores: 0,
      cidades: 0,
      animais: 0,
      artists: 0,
      biomedica: 0,
    }
    answers.forEach((a) => (scores[a] += 1))
    return (Object.keys(scores) as QuizTheme[]).reduce((a, b) =>
      scores[a] >= scores[b] ? a : b
    )
  }

  function applyTheme() {
    unlockTheme(calculateResult() as Theme)
    onClose()
  }

  const restart = () => {
    setStep(0)
    setAnswers([])
    setFinished(false)
  }

  const progress = finished ? 100 : (step / QUESTIONS.length) * 100

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg)] text-[var(--text)] rounded-3xl p-7 max-w-md w-full border border-[var(--border)] shadow-2xl relative">
        {/* Barra de progresso */}
        <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden mb-6">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {finished ? (
          <div className="text-center flex flex-col gap-4 animate-fade-in">
            <span className="text-4xl">✨</span>
            <h2 className="text-lg font-medium text-[var(--text-muted)]">O teu tema é...</h2>
            <p className="text-3xl font-semibold text-[var(--accent)]">
              {THEME_LABELS[calculateResult()]}
            </p>
            <div className="flex gap-2 justify-center mt-2 flex-wrap">
              <button
                onClick={applyTheme}
                className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-white font-medium hover:opacity-90 transition"
              >
                Aplicar tema
              </button>
              <button
                onClick={restart}
                className="px-5 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition"
              >
                Refazer
              </button>
            </div>
            <button onClick={onClose} className="text-sm text-[var(--text-muted)] mt-1">
              Fechar sem aplicar
            </button>
          </div>
        ) : (
          <div key={step} className="flex flex-col gap-4 animate-fade-in">
            <p className="text-xs text-[var(--text-muted)]">
              Pergunta {step + 1} de {QUESTIONS.length}
            </p>
            <h2 className="text-lg font-medium leading-snug">{QUESTIONS[step].question}</h2>
            <div className="flex flex-col gap-2">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => answer(opt.theme)}
                  className="text-left px-4 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-bg,transparent)] hover:translate-x-1 transition-all"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={goBack}
                disabled={step === 0}
                className="text-sm text-[var(--text-muted)] disabled:opacity-0 transition"
              >
                ← Voltar
              </button>
              <button onClick={onClose} className="text-sm text-[var(--text-muted)]">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}