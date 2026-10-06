export type Course = { id: string; name: string; ects: number }

export const YEAR1: Course[] = [
  { id: 'algebra-linear', name: 'Álgebra Linear', ects: 6 },
  { id: 'anatomia-histologia', name: 'Anatomia e Histologia', ects: 6 },
  { id: 'calc1', name: 'Cálculo Diferencial e Integral I', ects: 6 },
  { id: 'intro-bio', name: 'Introdução às Ciências Biológicas', ects: 6 },
  { id: 'quimica', name: 'Química', ects: 6 },
  { id: 'calc2', name: 'Cálculo Diferencial e Integral II', ects: 6 },
  { id: 'comp-prog', name: 'Computação e Programação', ects: 6 },
  { id: 'quimica-organica', name: 'Fundamentos de Química Orgânica', ects: 6 },
  { id: 'intro-bioeng', name: 'Introdução à Bioengenharia', ects: 3 },
  { id: 'intro-eng-biomed', name: 'Introdução à Engenharia Biomédica', ects: 3 },
]

export const YEAR2: Course[] = [
  { id: 'algoritmos', name: 'Algoritmos e Modelação Computacional', ects: 6 },
  { id: 'bio-electricidade', name: 'Bio-Electricidade', ects: 6 },
  { id: 'bio-mol-genetica', name: 'Biologia Molecular e Genética', ects: 3 },
  { id: 'calc3', name: 'Cálculo Diferencial e Integral III', ects: 6 },
  { id: 'fisica1', name: 'Física I', ects: 6 },
  { id: 'farmacologia', name: 'Fundamentos de Farmacologia', ects: 3 },
  { id: 'eng-celular', name: 'Engenharia Celular', ects: 3 },
  { id: 'fisica2', name: 'Física II', ects: 6 },
  { id: 'fisiologia-sistemas', name: 'Fisiologia de Sistemas', ects: 6 },
  { id: 'analise-instrumental', name: 'Introdução à Análise Instrumental', ects: 3 },
  { id: 'mec-aplicada-biomed', name: 'Mecânica Aplicada à Biomedicina', ects: 6 },
  { id: 'prob-estatistica', name: 'Probabilidade e Estatística', ects: 6 },
]

export const HASS: Course[] = [
  { id: 'hass1', name: 'HASS I', ects: 3 },
  { id: 'hass2', name: 'HASS II', ects: 3 },
]

export const YEAR3_ELECTIVES: Course[] = [
  { id: 'aprendizagem', name: 'Aprendizagem', ects: 6 },
  { id: 'desenho-modelacao', name: 'Desenho e Modelação Geométrica', ects: 3 },
  { id: 'electronica-geral', name: 'Electrónica Geral', ects: 6 },
  { id: 'eng-genetica', name: 'Engenharia Genética', ects: 6 },
  { id: 'bioinstrumentacao', name: 'Fundamentos de Bioinstrumentação', ects: 3 },
  { id: 'gestao', name: 'Gestão', ects: 3 },
  { id: 'epidemiologia', name: 'Introdução à Epidemiologia', ects: 5 },
  { id: 'metodos-computacionais', name: 'Introdução aos Métodos Computacionais em Biomedicina', ects: 6 },
  { id: 'robotica', name: 'Introdução à Robótica', ects: 6 },
  { id: 'mec-fluidos1', name: 'Mecânica dos Fluidos I', ects: 6 },
  { id: 'mec-modelacao-computacional', name: 'Mecânica e Modelação Computacional', ects: 6 },
  { id: 'microbiologia', name: 'Microbiologia', ects: 6 },
  { id: 'neuroetica', name: 'Neuroética', ects: 1 },
  { id: 'projeto-integrador', name: 'Projecto Integrador de 1º Ciclo em Engenharia Biomédica', ects: 12 },
  { id: 'sinais-sistemas', name: 'Sinais e Sistemas', ects: 6 },
  { id: 'sistemas-integracao', name: 'Sistemas de Integração e Regulação Metabólica', ects: 6 },
  { id: 'biologia-estrutural', name: 'Biologia Estrutural', ects: 6 },
  { id: 'circuitos-electronicos', name: 'Circuitos Electrónicos', ects: 6 },
  { id: 'nanomateriais', name: 'Design de Nanomateriais', ects: 6 },
  { id: 'biossinais-imagiologia', name: 'Fundamentos de Biossinais e Imagiologia Biomédica', ects: 3 },
  { id: 'instrumentacao-medidas', name: 'Instrumentação e Medidas', ects: 6 },
  { id: 'interacao-pessoa-maquina', name: 'Interacção Pessoa-Máquina', ects: 6 },
  { id: 'mecanica-quantica1', name: 'Mecânica Quântica I', ects: 6 },
  { id: 'mecanismos-doenca', name: 'Mecanismos Gerais de Doença', ects: 6 },
  { id: 'valor-saude', name: 'Medição de Valor em Saúde', ects: 3 },
  { id: 'microbiomas', name: 'Microbiomas', ects: 6 },
  { id: 'neurofarmacologia', name: 'Neurofarmacologia', ects: 6 },
  { id: 'prog-sistemas', name: 'Programação de Sistemas', ects: 6 },
  { id: 'prog-ciencia-dados', name: 'Programação para Ciência de Dados', ects: 6 },
  { id: 'quimica-fisica-aplicada', name: 'Química-Física Aplicada', ects: 6 },
  { id: 'sensores-atuadores', name: 'Sensores e Actuadores', ects: 6 },
  { id: 'custom', name: 'Outra cadeira (escrever nome)', ects: 0 },
]