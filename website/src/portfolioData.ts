export type PortfolioItem = {
  id: string
  title: string
  subtitle?: string
  year?: string
  description?: string
  stats?: { icon: string; label: string }[]
  media?: { type: 'image' | 'images' | 'pdf'; src: string | string[]; label: string }
}

export type PortfolioCategory = {
  id: string
  title: string
  icon: string
  items?: PortfolioItem[]
  subcategories?: { title: string; items: PortfolioItem[] }[]
}

export const PORTFOLIO_DATA: PortfolioCategory[] = [
  {
    id: 'Faculdade',
    title: 'IST',
    icon: '🏫',
    subcategories: [
      {
        title: 'Núcleos e Associações',
        items: [
          { id: 'NEBM', title: 'NEBM', subtitle: 'Secção de Informática', year : '2026' },
          { id: 'Mentorado', title: 'Programa de Mentorado', subtitle: 'Mentora de novos alunos na semana de acolhimento', year : '2026' },
        ],
      },
      {
        title: 'Projetos',
        items: [
          {
            id: 'projetos',
            title: 'Soon...',
            subtitle: 'Meter aqui projetos/trabalhos de cadeiras',
          },
        ],
      },
    ],
  },
  {
    id: 'certificados',
    title: 'Certificados Escolares',
    icon: '🎓',
    items: [
      {
        id: 'merito',
        title: 'Certificados de Mérito/Excelência',
        subtitle: '7.º ao 12.º ano',
        media: { type: 'pdf', src: '/certificados/merito.pdf', label: 'Ver certificados' },
      },
      {
        id: 'cidadania',
        title: 'Certificado de Cidadania',
        subtitle: '11.º ano',
        media: { type: 'pdf', src: '/certificados/cidadania.pdf', label: 'Ver certificado' },
      },
    ],
  },
  {
    id: 'voluntariado',
    title: 'Voluntariado',
    icon: '🤝',
    items: [
      {
        id: 'monitaia',
        title: 'MONITAIA — Projeto científico',
        subtitle: 'Universidade dos Açores',
        year: '2023',
        description:
          'Monitorização operacional das massas de água interiores e de transição da Região Hidrográfica dos Açores. Organização e compilação de dados científicos em Excel.',
        media: { type: 'pdf', src: '/certificados/monitaia-carta.pdf', label: 'Carta de recomendação' },
      },
      {
        id: 'interact',
        title: 'Interact Club de Ponta Delgada',
        year: '2024-2025',
        media: { type: 'images', src: ['/fotos/interact.jpeg'], label: 'Ver fotos' },
      },
    ],
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    icon: '🎨',
    subcategories: [
      {
        title: 'Desporto',
        items: [
          { id: 'natacao', title: 'Natação', subtitle: 'CAFBPD', year: '2008-2018' },
          { id: 'patinagem', title: 'Patinagem Artística', subtitle: 'CPSVF', year: '2019-2023', },
        ],
      },
      {
        title: 'Música',
        items: [
          {
            id: 'thinrock',
            title: 'Thin Rock School',
            year: '2025',
            subtitle: '~6 meses · aulas de canto',
          },
        ],
      },
    ],
  },
  {
    id: 'concursos',
    title: 'Concursos',
    icon: '🏆',
    items: [
      {
        id: 'supertmatik',
        title: 'SuperTmatik',
        year: '2022',
        stats: [
          { icon: '🧮', label: '50.º/6 600 - Matemática' },
          { icon: '🧠', label: '129.º/47 950 - Cálculo Mental' },
        ],
        media: { type: 'pdf', src: '/certificados/supertmatik.pdf', label: 'Certificados disponíveis' },
      },
      {
        id: 'pdl',
        title: 'PDL Escola Ativa & Noites de Verão',
        year: '2024/2025',
        subtitle: 'Câmara Municipal de Ponta Delgada',
      },
    ],
  },
]