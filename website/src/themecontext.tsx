import { createContext, useContext, useState, type ReactNode } from 'react'

export type Theme =
  | 'light'
  | 'dark'
  | 'acores'
  | 'cidades'
  | 'animais'
  | 'artists'
  | 'biomedica'

const THEME_FAVICON: Record<Theme, string> = {
  light: '🎓',
  dark: '🌙',
  acores: '🌋',
  cidades: '🗺️',
  animais: '🐾',
  artists: '♪',
  biomedica: '🧬',
}

function updateFavicon(emoji: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`
  const url = `data:image/svg+xml,${encodeURIComponent(svg)}`
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = url
}

const UNLOCKED_KEY = 'unlocked-themes'

function loadUnlocked(): Theme[] {
  try {
    const raw = localStorage.getItem(UNLOCKED_KEY)
    return raw ? (JSON.parse(raw) as Theme[]) : []
  } catch {
    return []
  }
}

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (t: Theme) => void
  unlockedThemes: Theme[]
  unlockTheme: (t: Theme) => void
}>({ theme: 'light', setTheme: () => {}, unlockedThemes: [], unlockTheme: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [unlockedThemes, setUnlockedThemes] = useState<Theme[]>(loadUnlocked)

  const handleSetTheme = (t: Theme) => {
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
    updateFavicon(THEME_FAVICON[t])
  }

  const unlockTheme = (t: Theme) => {
    setUnlockedThemes((prev) => {
      if (prev.includes(t)) return prev
      const updated = [...prev, t]
      localStorage.setItem(UNLOCKED_KEY, JSON.stringify(updated))
      return updated
    })
    handleSetTheme(t)
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: handleSetTheme, unlockedThemes, unlockTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)