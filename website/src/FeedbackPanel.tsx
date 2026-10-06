import { useState } from 'react'

export default function FeedbackPanel({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)

  const send = () => {
    const subject = encodeURIComponent('Feedback sobre o site')
    const body = encodeURIComponent(`${name ? `De: ${name}\n\n` : ''}${text}`)
    window.location.href = `mailto:inesbettencourtprestes@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg)] text-[var(--text)] rounded-3xl p-7 max-w-md w-full border border-[var(--border)] shadow-2xl">
        {sent ? (
          <div className="text-center flex flex-col gap-4">
            <span className="text-4xl">🎉</span>
            <h2 className="text-lg font-medium">Obrigada pelo feedback!</h2>
            <p className="text-sm text-[var(--text-muted)]">
              O teu email deve ter aberto para enviares — se não abriu, tenta de novo ou
              contacta-me diretamente.
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
            <div className="text-center flex flex-col gap-1">
              <span className="text-3xl">💬</span>
              <h2 className="text-lg font-medium">O que achaste do site?</h2>
              <p className="text-sm text-[var(--text-muted)]">
                Sugestões, bugs, ideias para temas novos — diz-me tudo!
              </p>
            </div>
            <input
              type="text"
              placeholder="O teu nome (opcional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-[var(--border)] rounded-full px-4 py-2 text-sm outline-none"
            />
            <textarea
              placeholder="O teu feedback..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="bg-transparent border border-[var(--border)] rounded-xl px-4 py-2 text-sm outline-none resize-none"
            />
            <p className="text-xs text-[var(--text-muted)] text-center -mt-1">
              Isto abre o teu email para enviares — não é enviado automaticamente
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={send}
                disabled={!text.trim()}
                className="px-5 py-2 rounded-full bg-[var(--accent)] text-white disabled:opacity-40"
              >
                Enviar
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full border border-[var(--border)]"
              >
                Agora não
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}