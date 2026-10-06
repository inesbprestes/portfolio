import { useEffect, useState, type ReactNode } from 'react'
import { YEAR1, YEAR2, HASS, YEAR3_ELECTIVES, type Course } from './courseData'

type FixedGrades = Record<string, string>
type ElectiveRow = { key: string; courseId: string; customName: string; nota: string }

const STORAGE_KEY = 'biomed-gpa-calculator'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as { fixed: FixedGrades; electives: ElectiveRow[] }
  } catch {
    return null
  }
}

function AccordionSection({
  isOpen,
  onToggle,
  icon,
  title,
  badge,
  children,
}: {
  isOpen: boolean
  onToggle: () => void
  icon: string
  title: string
  badge: string
  children: ReactNode
}) {
  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden w-full">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium flex items-center gap-2">
          <span>{icon}</span> {title}
        </span>
        <span className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-muted)]">{badge}</span>
          <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
        </span>
      </button>
      {isOpen && <div className="px-5 pb-5 animate-fade-in">{children}</div>}
    </div>
  )
}

function CourseRows({
  courses,
  grades,
  onChange,
}: {
  courses: Course[]
  grades: FixedGrades
  onChange: (id: string, value: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      {courses.map((c) => (
        <div key={c.id} className="flex items-center gap-3 border-b border-[var(--border)] py-1.5">
          <span className="flex-1 text-sm text-left">{c.name}</span>
          <span className="text-xs text-[var(--text-muted)] w-14 text-right">{c.ects} ECTS</span>
          <input
            type="number"
            min={0}
            max={20}
            step={0.1}
            placeholder="Nota"
            aria-label={`Nota de ${c.name}`}
            value={grades[c.id] ?? ''}
            onChange={(e) => onChange(c.id, e.target.value)}
            className="w-16 bg-transparent border border-[var(--border)] rounded-md px-2 py-1 text-sm text-center outline-none"
          />
        </div>
      ))}
    </div>
  )
}

export default function GpaCalculator() {
  const saved = loadState()
  const [fixed, setFixed] = useState<FixedGrades>(saved?.fixed ?? {})
  const [electives, setElectives] = useState<ElectiveRow[]>(saved?.electives ?? [])
  const [openSection, setOpenSection] = useState<string | null>('ano1')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ fixed, electives }))
  }, [fixed, electives])

  const setFixedGrade = (id: string, value: string) => {
    setFixed((prev) => ({ ...prev, [id]: value }))
  }

  const addElective = () => {
    setElectives((prev) => [
      ...prev,
      { key: crypto.randomUUID(), courseId: '', customName: '', nota: '' },
    ])
  }

  const updateElective = (key: string, patch: Partial<ElectiveRow>) => {
    setElectives((prev) => prev.map((e) => (e.key === key ? { ...e, ...patch } : e)))
  }

  const removeElective = (key: string) => {
    setElectives((prev) => prev.filter((e) => e.key !== key))
  }

  const clearAll = () => {
    setFixed({})
    setElectives([])
  }

  let totalPoints = 0
  let totalEcts = 0

  const applyFixed = (courses: Course[]) => {
    for (const c of courses) {
      const nota = parseFloat(fixed[c.id])
      if (!isNaN(nota) && nota >= 0) {
        totalPoints += nota * c.ects
        totalEcts += c.ects
      }
    }
  }
  applyFixed(YEAR1)
  applyFixed(YEAR2)
  applyFixed(HASS)

  for (const row of electives) {
    const course = YEAR3_ELECTIVES.find((c) => c.id === row.courseId)
    const ects = course?.id === 'custom' ? 0 : course?.ects ?? 0
    const nota = parseFloat(row.nota)
    if (course && !isNaN(nota) && nota >= 0 && ects > 0) {
      totalPoints += nota * ects
      totalEcts += ects
    }
  }

  const average = totalEcts > 0 ? totalPoints / totalEcts : 0

  const sectionProgress = (courses: Course[]) => {
    const filled = courses.filter((c) => fixed[c.id] && !isNaN(parseFloat(fixed[c.id])))
    const doneEcts = filled.reduce((sum, c) => sum + c.ects, 0)
    const totalSectionEcts = courses.reduce((sum, c) => sum + c.ects, 0)
    return `${doneEcts}/${totalSectionEcts} ECTS`
  }

  return (
    <div className="max-w-2xl w-full flex flex-col gap-6 text-left">
      <div className="text-center flex flex-col gap-1">
        <p className="text-sm text-[var(--text-muted)]">A tua média atual</p>
        <p className="text-4xl font-semibold text-[var(--accent)]">
          {totalEcts > 0 ? average.toFixed(2) : '—'}
        </p>
        <p className="text-xs text-[var(--text-muted)]">{totalEcts} ECTS contabilizados</p>
      </div>

      <AccordionSection
        isOpen={openSection === 'ano1'}
        onToggle={() => setOpenSection(openSection === 'ano1' ? null : 'ano1')}
        icon="1️⃣"
        title="Ano 1"
        badge={sectionProgress(YEAR1)}
      >
        <CourseRows courses={YEAR1} grades={fixed} onChange={setFixedGrade} />
      </AccordionSection>

      <AccordionSection
        isOpen={openSection === 'ano2'}
        onToggle={() => setOpenSection(openSection === 'ano2' ? null : 'ano2')}
        icon="2️⃣"
        title="Ano 2"
        badge={sectionProgress(YEAR2)}
      >
        <CourseRows courses={YEAR2} grades={fixed} onChange={setFixedGrade} />
      </AccordionSection>

      <AccordionSection
        isOpen={openSection === 'hass'}
        onToggle={() => setOpenSection(openSection === 'hass' ? null : 'hass')}
        icon="📚"
        title="Humanidades (HASS)"
        badge={sectionProgress(HASS)}
      >
        <CourseRows courses={HASS} grades={fixed} onChange={setFixedGrade} />
      </AccordionSection>

      <AccordionSection
        isOpen={openSection === 'ano3'}
        onToggle={() => setOpenSection(openSection === 'ano3' ? null : 'ano3')}
        icon="3️⃣"
        title="Ano 3 · Especialidade"
        badge={`${electives.length} cadeira${electives.length === 1 ? '' : 's'}`}
      >
        <div className="flex flex-col gap-2">
          {electives.map((row) => {
            const course = YEAR3_ELECTIVES.find((c) => c.id === row.courseId)
            const isCustom = row.courseId === 'custom'
            return (
              <div key={row.key} className="flex items-center gap-2 flex-wrap">
                <select
                  value={row.courseId}
                  onChange={(e) => updateElective(row.key, { courseId: e.target.value })}
                  className="flex-1 min-w-[160px] bg-transparent border border-[var(--border)] rounded-md px-2 py-1.5 text-sm outline-none"
                >
                  <option value="">Escolhe a cadeira...</option>
                  {YEAR3_ELECTIVES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {isCustom && (
                  <input
                    type="text"
                    placeholder="Nome da cadeira"
                    value={row.customName}
                    onChange={(e) => updateElective(row.key, { customName: e.target.value })}
                    className="flex-1 min-w-[140px] bg-transparent border border-[var(--border)] rounded-md px-2 py-1.5 text-sm outline-none"
                  />
                )}
                <span className="text-xs text-[var(--text-muted)] w-14 text-right">
                  {course && !isCustom ? `${course.ects} ECTS` : ''}
                </span>
                <input
                  type="number"
                  min={0}
                  max={20}
                  step={0.1}
                  placeholder="Nota"
                  aria-label={course ? `Nota de ${course.name}` : 'Nota da cadeira'}
                  value={row.nota}
                  onChange={(e) => updateElective(row.key, { nota: e.target.value })}
                  className="w-16 bg-transparent border border-[var(--border)] rounded-md px-2 py-1 text-sm text-center outline-none"
                />
                <button
                  onClick={() => removeElective(row.key)}
                  className="text-[var(--text-muted)] hover:text-red-400 px-1"
                  title="Remover"
                >
                  ×
                </button>
              </div>
            )
          })}
          <button
            onClick={addElective}
            className="mt-3 px-4 py-2 rounded-full border border-dashed border-[var(--accent)] text-sm text-[var(--accent)] self-start"
          >
            + Adicionar cadeira
          </button>
        </div>
      </AccordionSection>

      <button onClick={clearAll} className="text-xs text-[var(--text-muted)] underline self-center">
        Limpar tudo
      </button>
    </div>
  )
}