export type CityPhoto = { id: string; name: string; category: 'nacional' | 'internacional'; photo: string }

export const CITY_PHOTOS: CityPhoto[] = [
  { id: 'portimao', name: 'Portimão', category: 'nacional', photo: '/fotos/cidades/portimao.jpeg' },
  { id: 'lisboa', name: 'Lisboa', category: 'nacional', photo: '/fotos/cidades/lisboa.jpeg' },
  { id: 'porto', name: 'Porto', category: 'nacional', photo: '/fotos/cidades/porto.jpeg' },
  { id: 'leiria', name: 'Leiria', category: 'nacional', photo: '/fotos/cidades/leiria.jpeg' },
  { id: 'las-palmas', name: 'Las Palmas', category: 'internacional', photo: '/fotos/cidades/las-palmas.jpeg' },
  { id: 'bruxelas', name: 'Bruxelas', category: 'internacional', photo: '/fotos/cidades/bruxelas.jpeg' },
  { id: 'antuerpia', name: 'Antuérpia', category: 'internacional', photo: '/fotos/cidades/antuerpia.jpeg' },
  { id: 'amsterdao', name: 'Amsterdão', category: 'internacional', photo: '/fotos/cidades/amsterdao.jpeg' },
]