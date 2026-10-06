export type PetPhoto = { id: string; name: string; years: string; type: string; photo: string }

export const PET_PHOTOS: PetPhoto[] = [
  { id: 'tico', name: 'Tico', years: '2008–2023', type: 'Gato · o primeiro', photo: '/fotos/animais/tico.jpeg' },
  { id: 'soneca', name: 'Soneca', years: '2016–2018', type: 'Hamster', photo: '/fotos/animais/soneca.jpeg' },
  { id: 'cuca', name: 'Cuca', years: '2018–agora', type: 'Cadela', photo: '/fotos/animais/cuca.jpeg' },
  { id: 'dobby', name: 'Dobby', years: '2024–agora', type: 'Gato', photo: '/fotos/animais/dobby.jpeg' },
  { id: 'mia', name: 'Mia', years: '2025–agora', type: 'Gata', photo: '/fotos/animais/mia.jpeg' },
]