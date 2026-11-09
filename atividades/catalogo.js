/*
 * Biblioteca de atividades terapêuticas · Psi Bárbara Serra (CRP 20/13.134)
 *
 * Cada atividade tem:
 *   id, ab (tcc | hum | dbt), nome, obj (objetivo), dem (demandas), min (tempo estimado),
 *   ref (referência bibliográfica), intro (instrução ao paciente) e f (campos).
 *
 * Tipos de campo:
 *   p     texto explicativo          { t:'p', x }
 *   h     subtítulo                  { t:'h', x }
 *   text  resposta curta             { t:'text', id, l, ph }
 *   area  resposta longa             { t:'area', id, l, ph }
 *   scale escala (0 a 10 por padrão) { t:'scale', id, l, min, max, lo, hi }
 *   radio uma opção                  { t:'radio', id, l, o:[...] }
 *   check várias opções              { t:'check', id, l, o:[...] }
 *   rep   registros repetíveis       { t:'rep', id, l, item, f:[campos] }
 *   breath respiração guiada         { t:'breath', in, hold, out }
 *   timer  cronômetro de prática     { t:'timer', s }
 *
 * Para criar uma atividade nova, copie uma existente, troque o id e edite os textos.
 * Não use aqui testes psicológicos padronizados (SATEPSI): as escalas abaixo são
 * apenas de automonitoramento e não têm finalidade diagnóstica.
 */
window.ABORDAGENS = {
  tcc: { nome: 'TCC', longo: 'Terapia Cognitivo-Comportamental' },
  hum: { nome: 'Humanista', longo: 'Psicologia Humanista (ACP, Gestalt, Existencial)' },
  dbt: { nome: 'DBT', longo: 'Terapia Comportamental Dialética' }
};

window.DEMANDAS = [
  'Ansiedade', 'Depressão', 'Autoestima', 'Regulação emocional', 'Relacionamentos',
  'Estresse', 'Sono', 'Crise', 'Autoconhecimento', 'Luto e perdas', 'Impulsividade', 'Sentido de vida'
];

(function () {
  var EMO = ['Tristeza', 'Ansiedade', 'Medo', 'Raiva', 'Culpa', 'Vergonha', 'Frustração', 'Solidão', 'Alegria', 'Calma', 'Outra'];
  var B_JS = 'Beck, J. S. (2022). Terapia cognitivo-comportamental: teoria e prática (3. ed.). Artmed.';
  var GP = 'Greenberger, D., & Padesky, C. A. (2017). A mente vencendo o humor (2. ed.). Artmed.';
  var LEAHY = 'Leahy, R. L. (2019). Técnicas de terapia cognitiva: manual do terapeuta (2. ed.). Artmed.';
  var LIN = 'Linehan, M. M. (2018). Treinamento de habilidades em DBT: manual de terapia comportamental dialética para o paciente. Artmed.';
  var ROG = 'Rogers, C. R. (2009). Tornar-se pessoa (6. ed.). WMF Martins Fontes.';
  var GES = 'Perls, F., Hefferline, R., & Goodman, P. (1997). Gestalt-terapia. Summus.';

  window.ATIVIDADES = [
    /* ===================== TCC ===================== */
    {
      id: 'rpd', ab: 'tcc', nome: 'Registro de Pensamentos (RPD)', min: 15,
      obj: 'Identificar pensamentos automáticos ligados a emoções intensas e construir respostas mais equilibradas.',
      dem: ['Ansiedade', 'Depressão', 'Autoestima', 'Estresse'], ref: B_JS + ' ' + GP,
      intro: 'Sempre que perceber uma mudança forte no seu humor, pare um momento e preencha um registro. Não existe resposta certa: o objetivo é observar o que passa pela sua mente.',
      f: [
        { t: 'rep', id: 'reg', l: 'Registros', item: 'Registro', f: [
          { t: 'text', id: 'quando', l: 'Quando e onde aconteceu?', ph: 'Ex.: segunda, no trabalho, depois da reunião' },
          { t: 'area', id: 'sit', l: 'Situação: o que aconteceu?', ph: 'Descreva os fatos, como uma câmera filmaria' },
          { t: 'check', id: 'emo', l: 'Emoções que senti', o: EMO },
          { t: 'scale', id: 'int', l: 'Intensidade da emoção', min: 0, max: 100, lo: 'Nada', hi: 'Máxima' },
          { t: 'area', id: 'pa', l: 'Pensamento automático: o que passou pela minha cabeça?', ph: 'Ex.: "Vou ser demitida", "Ninguém gosta de mim"' },
          { t: 'scale', id: 'cred', l: 'Quanto acredito nesse pensamento', min: 0, max: 100, lo: 'Nada', hi: 'Totalmente' },
          { t: 'area', id: 'favor', l: 'Evidências que apoiam o pensamento' },
          { t: 'area', id: 'contra', l: 'Evidências que não apoiam o pensamento' },
          { t: 'area', id: 'alt', l: 'Pensamento alternativo, mais equilibrado' },
          { t: 'scale', id: 'int2', l: 'Intensidade da emoção agora', min: 0, max: 100, lo: 'Nada', hi: 'Máxima' }
        ] }
      ]
    },
    {
      id: 'distorcoes', ab: 'tcc', nome: 'Identificando distorções cognitivas', min: 10,
      obj: 'Reconhecer padrões de pensamento que costumam aumentar o sofrimento.',
      dem: ['Ansiedade', 'Depressão', 'Autoestima'], ref: B_JS + ' ' + LEAHY,
      intro: 'Todos nós temos "atalhos" de pensamento que às vezes distorcem a realidade. Leia a lista e marque os que você reconhece em você.',
      f: [
        { t: 'check', id: 'dist', l: 'Quais destes padrões aparecem com frequência para você?', o: [
          'Catastrofização: imaginar o pior resultado possível',
          'Pensamento tudo ou nada: ver as coisas só como perfeitas ou fracassadas',
          'Leitura mental: achar que sabe o que os outros pensam',
          'Adivinhação do futuro: prever que algo vai dar errado',
          'Desqualificar o positivo: ignorar conquistas e qualidades',
          'Supergeneralização: "sempre", "nunca", "tudo" a partir de um fato',
          'Rotulação: "sou um fracasso", "sou burra"',
          'Personalização: sentir-se culpada por tudo o que acontece',
          'Afirmações do tipo "deveria": regras rígidas para si e para os outros',
          'Raciocínio emocional: "sinto, logo é verdade"',
          'Filtro mental: focar só no detalhe negativo',
          'Comparação: medir-se sempre pelos outros'
        ] },
        { t: 'area', id: 'ex', l: 'Escreva um exemplo recente de um desses padrões', ph: 'Situação, pensamento e qual distorção você percebeu' },
        { t: 'area', id: 'resp', l: 'Como você poderia responder a esse pensamento de forma mais justa?' }
      ]
    },
    {
      id: 'questionamento', ab: 'tcc', nome: 'Questionamento socrático', min: 10,
      obj: 'Examinar um pensamento difícil com perguntas que ampliam a perspectiva.',
      dem: ['Ansiedade', 'Depressão', 'Autoestima'], ref: B_JS,
      intro: 'Escolha um pensamento que tem incomodado você e responda às perguntas com calma e curiosidade.',
      f: [
        { t: 'area', id: 'pens', l: 'Qual é o pensamento?' },
        { t: 'scale', id: 'cred1', l: 'Quanto acredito nele agora', min: 0, max: 100, lo: 'Nada', hi: 'Totalmente' },
        { t: 'area', id: 'q1', l: 'Que evidências tenho de que é verdade? E de que não é?' },
        { t: 'area', id: 'q2', l: 'Existe outra explicação possível?' },
        { t: 'area', id: 'q3', l: 'Qual o pior que poderia acontecer? E o melhor? E o mais provável?' },
        { t: 'area', id: 'q4', l: 'O que eu diria a uma pessoa querida que pensasse isso?' },
        { t: 'area', id: 'q5', l: 'Qual o efeito de acreditar nesse pensamento? E de mudá-lo?' },
        { t: 'scale', id: 'cred2', l: 'Quanto acredito nele depois das perguntas', min: 0, max: 100, lo: 'Nada', hi: 'Totalmente' }
      ]
    },
    {
      id: 'diario-humor', ab: 'tcc', nome: 'Diário de humor', min: 5,
      obj: 'Acompanhar o humor ao longo dos dias e perceber o que influencia as mudanças.',
      dem: ['Depressão', 'Ansiedade', 'Regulação emocional'], ref: GP,
      intro: 'Preencha uma vez por dia, de preferência no mesmo horário. Leva poucos minutos.',
      f: [
        { t: 'rep', id: 'dias', l: 'Dias', item: 'Dia', f: [
          { t: 'text', id: 'data', l: 'Data', ph: 'Ex.: 10/11' },
          { t: 'scale', id: 'humor', l: 'Como estava meu humor', min: 0, max: 10, lo: 'Muito mal', hi: 'Muito bem' },
          { t: 'check', id: 'emo', l: 'Emoções mais presentes', o: EMO },
          { t: 'scale', id: 'sono', l: 'Qualidade do sono', min: 0, max: 10, lo: 'Péssimo', hi: 'Ótimo' },
          { t: 'area', id: 'fato', l: 'O que influenciou meu dia (para melhor ou pior)?' }
        ] }
      ]
    },
    {
      id: 'monitoramento', ab: 'tcc', nome: 'Monitoramento de atividades', min: 10,
      obj: 'Observar como as atividades do dia se relacionam com prazer, sensação de realização e humor.',
      dem: ['Depressão', 'Estresse'], ref: 'Martell, C. R., Dimidjian, S., & Herman-Dunn, R. (2022). Ativação comportamental para depressão: guia do clínico. Artmed.',
      intro: 'Anote o que fez em alguns momentos do dia. Dê uma nota de prazer (o quanto gostou) e de domínio (o quanto se sentiu capaz ou realizada).',
      f: [
        { t: 'rep', id: 'ativ', l: 'Atividades', item: 'Atividade', f: [
          { t: 'text', id: 'hora', l: 'Dia e horário', ph: 'Ex.: terça, 8h às 9h' },
          { t: 'text', id: 'oque', l: 'O que fiz', ph: 'Ex.: caminhei no bairro' },
          { t: 'scale', id: 'prazer', l: 'Prazer', min: 0, max: 10, lo: 'Nenhum', hi: 'Muito' },
          { t: 'scale', id: 'dominio', l: 'Domínio (realização)', min: 0, max: 10, lo: 'Nenhum', hi: 'Muito' },
          { t: 'scale', id: 'humor', l: 'Humor durante a atividade', min: 0, max: 10, lo: 'Muito mal', hi: 'Muito bem' }
        ] },
        { t: 'area', id: 'perc', l: 'O que você percebeu olhando para a semana?' }
      ]
    },
    {
      id: 'prazerosas', ab: 'tcc', nome: 'Agenda de atividades prazerosas', min: 10,
      obj: 'Planejar pequenas atividades agradáveis e significativas para a semana.',
      dem: ['Depressão', 'Estresse', 'Autoestima'], ref: 'Martell, C. R., Dimidjian, S., & Herman-Dunn, R. (2022). Ativação comportamental para depressão: guia do clínico. Artmed.',
      intro: 'Quando o humor está baixo, esperamos ter vontade para agir. Na ativação comportamental fazemos o contrário: agimos primeiro, e a vontade costuma vir depois. Comece pequeno.',
      f: [
        { t: 'check', id: 'ideias', l: 'Marque atividades que você gostaria de fazer', o: [
          'Caminhar ao ar livre', 'Ouvir uma música de que gosto', 'Ligar para alguém querido', 'Tomar um banho demorado',
          'Cozinhar algo gostoso', 'Ler algumas páginas', 'Assistir a um filme ou série', 'Cuidar de plantas',
          'Fazer alongamento ou exercício', 'Arrumar um cantinho da casa', 'Desenhar, pintar ou escrever', 'Ir a um lugar novo',
          'Brincar com um animal', 'Praticar minha fé ou espiritualidade', 'Sentar ao sol por alguns minutos', 'Dançar'
        ] },
        { t: 'text', id: 'outras', l: 'Outras ideias minhas' },
        { t: 'rep', id: 'plano', l: 'Meu plano para a semana', item: 'Atividade planejada', f: [
          { t: 'text', id: 'oque', l: 'Atividade' },
          { t: 'text', id: 'quando', l: 'Quando vou fazer', ph: 'Dia e horário' },
          { t: 'radio', id: 'feito', l: 'Consegui fazer?', o: ['Sim', 'Em parte', 'Ainda não'] },
          { t: 'scale', id: 'prazer', l: 'Prazer que senti', min: 0, max: 10, lo: 'Nenhum', hi: 'Muito' }
        ] }
      ]
    },
    {
      id: 'seta', ab: 'tcc', nome: 'Seta descendente', min: 15,
      obj: 'Explorar o significado mais profundo de um pensamento e aproximar-se das crenças centrais.',
      dem: ['Autoestima', 'Depressão', 'Ansiedade', 'Autoconhecimento'], ref: B_JS,
      intro: 'Comece por um pensamento automático. Para cada resposta, pergunte-se: "Se isso fosse verdade, o que significaria sobre mim?". Faça com calma; se ficar muito difícil, pare e traga para a sessão.',
      f: [
        { t: 'area', id: 'p0', l: 'Pensamento inicial' },
        { t: 'area', id: 'p1', l: 'Se fosse verdade, o que significaria?' },
        { t: 'area', id: 'p2', l: 'E se isso fosse verdade, o que significaria sobre mim?' },
        { t: 'area', id: 'p3', l: 'E o que isso diria sobre mim, sobre os outros ou sobre o mundo?' },
        { t: 'area', id: 'crenca', l: 'Que crença parece estar no fundo dessa sequência?' },
        { t: 'scale', id: 'cred', l: 'Quanto acredito nessa crença', min: 0, max: 100, lo: 'Nada', hi: 'Totalmente' }
      ]
    },
    {
      id: 'problemas', ab: 'tcc', nome: 'Resolução de problemas', min: 15,
      obj: 'Organizar um problema em passos práticos e escolher um plano de ação.',
      dem: ['Estresse', 'Ansiedade', 'Depressão'], ref: 'D\'Zurilla, T. J., & Nezu, A. M. (2010). Problem-solving therapy. In K. S. Dobson (Ed.), Handbook of cognitive-behavioral therapies. Guilford.',
      intro: 'Escolha um problema concreto. Primeiro gere ideias sem julgar; depois avalie.',
      f: [
        { t: 'area', id: 'prob', l: '1. Qual é o problema, de forma específica?' },
        { t: 'area', id: 'meta', l: '2. O que eu gostaria que acontecesse (meta realista)?' },
        { t: 'rep', id: 'sol', l: '3. Possíveis soluções', item: 'Solução', f: [
          { t: 'text', id: 'ideia', l: 'Ideia' },
          { t: 'area', id: 'pros', l: 'Vantagens' },
          { t: 'area', id: 'contras', l: 'Desvantagens' },
          { t: 'scale', id: 'nota', l: 'O quanto essa solução é viável', min: 0, max: 10, lo: 'Nada', hi: 'Muito' }
        ] },
        { t: 'area', id: 'esc', l: '4. Solução escolhida e passos para colocá-la em prática' },
        { t: 'area', id: 'aval', l: '5. Depois de tentar: como foi? O que aprendi?' }
      ]
    },
    {
      id: 'hierarquia', ab: 'tcc', nome: 'Hierarquia de exposição', min: 15,
      obj: 'Montar uma escada de situações temidas, da mais fácil à mais difícil, para enfrentar gradualmente.',
      dem: ['Ansiedade'], ref: 'Clark, D. A., & Beck, A. T. (2012). Terapia cognitiva para os transtornos de ansiedade. Artmed.',
      intro: 'Liste situações que você evita por medo ou ansiedade e dê uma nota de 0 a 100 para o desconforto que imagina sentir (SUDS). A exposição deve ser combinada e planejada na sessão.',
      f: [
        { t: 'text', id: 'medo', l: 'Qual medo ou dificuldade vamos trabalhar?' },
        { t: 'rep', id: 'deg', l: 'Degraus da escada', item: 'Situação', f: [
          { t: 'text', id: 'sit', l: 'Situação' },
          { t: 'scale', id: 'suds', l: 'Desconforto esperado (SUDS)', min: 0, max: 100, lo: 'Nenhum', hi: 'Máximo' }
        ] },
        { t: 'rep', id: 'expo', l: 'Registro das exposições feitas', item: 'Exposição', f: [
          { t: 'text', id: 'sit', l: 'Situação enfrentada e data' },
          { t: 'scale', id: 'antes', l: 'Ansiedade no início', min: 0, max: 100, lo: 'Nenhuma', hi: 'Máxima' },
          { t: 'scale', id: 'depois', l: 'Ansiedade no final', min: 0, max: 100, lo: 'Nenhuma', hi: 'Máxima' },
          { t: 'area', id: 'aprendi', l: 'O que aprendi?' }
        ] }
      ]
    },
    {
      id: 'experimento', ab: 'tcc', nome: 'Experimento comportamental', min: 15,
      obj: 'Testar na prática uma previsão ou crença, como um cientista.',
      dem: ['Ansiedade', 'Autoestima', 'Depressão'], ref: 'Bennett-Levy, J. et al. (2004). Oxford guide to behavioural experiments in cognitive therapy. Oxford University Press.',
      intro: 'Planeje com a psicóloga um pequeno teste para verificar se aquilo que você prevê realmente acontece.',
      f: [
        { t: 'area', id: 'crenca', l: 'Pensamento ou previsão a testar' },
        { t: 'scale', id: 'cred1', l: 'Quanto acredito nela', min: 0, max: 100, lo: 'Nada', hi: 'Totalmente' },
        { t: 'area', id: 'exp', l: 'O experimento: o que vou fazer, quando e onde?' },
        { t: 'area', id: 'prev', l: 'O que prevejo que vai acontecer?' },
        { t: 'area', id: 'obst', l: 'Possíveis obstáculos e como lidar com eles' },
        { t: 'area', id: 'res', l: 'O que aconteceu de fato?' },
        { t: 'area', id: 'conc', l: 'O que aprendi?' },
        { t: 'scale', id: 'cred2', l: 'Quanto acredito na previsão agora', min: 0, max: 100, lo: 'Nada', hi: 'Totalmente' }
      ]
    },
    {
      id: 'cartao', ab: 'tcc', nome: 'Cartão de enfrentamento', min: 10,
      obj: 'Criar um lembrete curto para usar nos momentos difíceis.',
      dem: ['Ansiedade', 'Depressão', 'Regulação emocional', 'Crise'], ref: B_JS,
      intro: 'Escreva frases curtas, com suas palavras. Depois você pode salvar a tela ou imprimir e deixar sempre por perto.',
      f: [
        { t: 'text', id: 'sit', l: 'Quando eu usar este cartão (situação-gatilho)' },
        { t: 'area', id: 'lembrar', l: 'O que é importante eu lembrar nesse momento' },
        { t: 'area', id: 'fazer', l: 'O que posso fazer para me ajudar' },
        { t: 'area', id: 'frase', l: 'Uma frase de apoio para mim mesma(o)' }
      ]
    },
    {
      id: 'preocupacao', ab: 'tcc', nome: 'Tempo da preocupação', min: 10,
      obj: 'Adiar preocupações para um horário combinado e diferenciar preocupações produtivas das improdutivas.',
      dem: ['Ansiedade', 'Estresse', 'Sono'], ref: 'Leahy, R. L. (2007). Livre de ansiedade. Artmed.',
      intro: 'Escolha um horário de 15 a 20 minutos por dia para se preocupar. Quando uma preocupação aparecer fora desse horário, anote e adie.',
      f: [
        { t: 'text', id: 'horario', l: 'Meu horário da preocupação', ph: 'Ex.: 18h, na varanda' },
        { t: 'rep', id: 'preoc', l: 'Preocupações anotadas', item: 'Preocupação', f: [
          { t: 'area', id: 'oque', l: 'Preocupação' },
          { t: 'radio', id: 'tipo', l: 'Posso fazer algo a respeito agora?', o: ['Sim, é um problema a resolver', 'Não, foge do meu controle'] },
          { t: 'area', id: 'acao', l: 'Se sim, qual o próximo passo? Se não, como posso aceitar a incerteza?' },
          { t: 'scale', id: 'ans', l: 'Ansiedade', min: 0, max: 10, lo: 'Nenhuma', hi: 'Máxima' }
        ] }
      ]
    },
    {
      id: 'sono', ab: 'tcc', nome: 'Diário do sono', min: 5,
      obj: 'Registrar hábitos e qualidade do sono para identificar padrões.',
      dem: ['Sono', 'Ansiedade', 'Estresse'], ref: 'Morin, C. M., & Espie, C. A. (2003). Insomnia: a clinical guide to assessment and treatment. Springer.',
      intro: 'Preencha ao acordar, todos os dias. Valores aproximados já ajudam.',
      f: [
        { t: 'rep', id: 'noites', l: 'Noites', item: 'Noite', f: [
          { t: 'text', id: 'data', l: 'Data' },
          { t: 'text', id: 'deitei', l: 'Horário em que deitei e em que levantei', ph: 'Ex.: 23h / 6h30' },
          { t: 'text', id: 'demora', l: 'Quanto tempo demorei para dormir', ph: 'Ex.: 30 min' },
          { t: 'text', id: 'acordei', l: 'Quantas vezes acordei à noite' },
          { t: 'scale', id: 'qual', l: 'Qualidade do sono', min: 0, max: 10, lo: 'Péssima', hi: 'Ótima' },
          { t: 'check', id: 'hab', l: 'Antes de dormir eu…', o: ['Usei celular ou TV na cama', 'Tomei café ou energético depois das 16h', 'Fiz refeição pesada', 'Bebi álcool', 'Cochilei durante o dia', 'Fiz algo relaxante'] }
        ] }
      ]
    },
    {
      id: 'respiracao', ab: 'tcc', nome: 'Respiração diafragmática guiada', min: 5,
      obj: 'Reduzir a ativação fisiológica da ansiedade com respiração lenta.',
      dem: ['Ansiedade', 'Estresse', 'Sono', 'Crise'], ref: 'Clark, D. A., & Beck, A. T. (2012). Vencendo a ansiedade e a preocupação. Artmed.',
      intro: 'Sente-se confortavelmente, uma mão no peito e outra na barriga. Inspire pelo nariz enchendo a barriga e solte o ar devagar pela boca. Acompanhe o círculo.',
      f: [
        { t: 'scale', id: 'antes', l: 'Ansiedade antes', min: 0, max: 10, lo: 'Nenhuma', hi: 'Máxima' },
        { t: 'breath', in: 4, hold: 2, out: 6 },
        { t: 'scale', id: 'depois', l: 'Ansiedade depois', min: 0, max: 10, lo: 'Nenhuma', hi: 'Máxima' },
        { t: 'area', id: 'obs', l: 'O que percebi no corpo?' }
      ]
    },
    {
      id: 'pros-contras', ab: 'tcc', nome: 'Vantagens e desvantagens', min: 10,
      obj: 'Avaliar uma decisão, hábito ou crença considerando custos e benefícios.',
      dem: ['Estresse', 'Impulsividade', 'Autoconhecimento'], ref: LEAHY,
      intro: 'Escreva o que vai avaliar e preencha os quatro quadros com honestidade.',
      f: [
        { t: 'text', id: 'tema', l: 'O que estou avaliando?', ph: 'Ex.: continuar adiando a conversa com meu chefe' },
        { t: 'area', id: 'v1', l: 'Vantagens de mudar' },
        { t: 'area', id: 'd1', l: 'Desvantagens de mudar' },
        { t: 'area', id: 'v2', l: 'Vantagens de manter como está' },
        { t: 'area', id: 'd2', l: 'Desvantagens de manter como está' },
        { t: 'area', id: 'conc', l: 'A que conclusão cheguei?' }
      ]
    },

    /* ===================== HUMANISTA ===================== */
    {
      id: 'focalizacao', ab: 'hum', nome: 'Focalização: escutando o corpo', min: 15,
      obj: 'Entrar em contato com a sensação sentida de uma questão e permitir que ela ganhe palavras.',
      dem: ['Autoconhecimento', 'Regulação emocional', 'Estresse', 'Luto e perdas'], ref: 'Gendlin, E. T. (2006). Focalização: uma via de acesso à sabedoria corporal. Gaia.',
      intro: 'Encontre um lugar tranquilo. Feche os olhos se for confortável, respire e dirija sua atenção para o meio do corpo (peito, barriga). Não tente analisar: apenas perceba, com gentileza.',
      f: [
        { t: 'timer', s: 180 },
        { t: 'area', id: 'questao', l: 'Que questão ou situação veio à tona?' },
        { t: 'area', id: 'sensacao', l: 'Como ela aparece no corpo? (lugar, forma, peso, temperatura)' },
        { t: 'text', id: 'alca', l: 'Uma palavra, imagem ou frase que combine com essa sensação' },
        { t: 'area', id: 'pede', l: 'Se essa sensação pudesse falar, o que diria ou pediria?' },
        { t: 'area', id: 'mudou', l: 'Algo mudou em você depois desse contato?' }
      ]
    },
    {
      id: 'eu-real-ideal', ab: 'hum', nome: 'Eu real e eu ideal', min: 15,
      obj: 'Refletir sobre a distância entre quem sou e quem acredito que deveria ser, com aceitação.',
      dem: ['Autoestima', 'Autoconhecimento'], ref: ROG,
      intro: 'Para Carl Rogers, sofremos quando há grande distância entre a experiência real e a imagem do que "deveríamos" ser. Responda sem se julgar.',
      f: [
        { t: 'area', id: 'real', l: 'Como eu me vejo hoje, de verdade?' },
        { t: 'area', id: 'ideal', l: 'Como acredito que "deveria" ser?' },
        { t: 'area', id: 'origem', l: 'De onde vêm essas exigências? (família, cultura, experiências)' },
        { t: 'area', id: 'aceito', l: 'O que posso começar a aceitar em mim como sou?' },
        { t: 'area', id: 'quero', l: 'O que de fato desejo cultivar, por escolha minha e não por obrigação?' }
      ]
    },
    {
      id: 'roda-vida', ab: 'hum', nome: 'Roda da vida', min: 10,
      obj: 'Avaliar a satisfação em diferentes áreas da vida e escolher onde investir energia.',
      dem: ['Autoconhecimento', 'Estresse', 'Sentido de vida'], ref: 'Ferramenta de autorreflexão utilizada em abordagens humanistas e de desenvolvimento pessoal.',
      intro: 'Dê uma nota de 0 a 10 para o quanto você está satisfeita(o) hoje com cada área.',
      f: [
        { t: 'scale', id: 'saude', l: 'Saúde e corpo' },
        { t: 'scale', id: 'emocional', l: 'Vida emocional' },
        { t: 'scale', id: 'familia', l: 'Família' },
        { t: 'scale', id: 'amor', l: 'Relacionamento amoroso' },
        { t: 'scale', id: 'amigos', l: 'Amizades e vida social' },
        { t: 'scale', id: 'trabalho', l: 'Trabalho e carreira' },
        { t: 'scale', id: 'financas', l: 'Finanças' },
        { t: 'scale', id: 'lazer', l: 'Lazer e diversão' },
        { t: 'scale', id: 'estudo', l: 'Desenvolvimento e estudos' },
        { t: 'scale', id: 'espiritual', l: 'Espiritualidade e propósito' },
        { t: 'area', id: 'perc', l: 'O que mais chamou sua atenção?' },
        { t: 'area', id: 'passo', l: 'Em qual área quero dar um pequeno passo? Qual seria esse passo?' }
      ]
    },
    {
      id: 'valores', ab: 'hum', nome: 'Clarificação de valores', min: 15,
      obj: 'Identificar o que é verdadeiramente importante para você e orientar escolhas.',
      dem: ['Sentido de vida', 'Autoconhecimento', 'Depressão'], ref: ROG + ' Frankl, V. E. (2017). Em busca de sentido. Vozes.',
      intro: 'Valores são direções, não metas. Marque os que mais ressoam com você e reflita sobre eles.',
      f: [
        { t: 'check', id: 'lista', l: 'Valores importantes para mim', o: [
          'Família', 'Amizade', 'Amor', 'Honestidade', 'Liberdade', 'Autonomia', 'Saúde', 'Espiritualidade',
          'Aprendizado', 'Criatividade', 'Justiça', 'Gentileza', 'Coragem', 'Segurança', 'Aventura', 'Contribuição',
          'Natureza', 'Trabalho bem feito', 'Respeito', 'Diversão', 'Paz', 'Gratidão', 'Fé', 'Simplicidade'
        ] },
        { t: 'area', id: 'top3', l: 'Quais são os três mais importantes? Por quê?' },
        { t: 'area', id: 'vivo', l: 'Quanto minha vida atual está de acordo com esses valores?' },
        { t: 'area', id: 'acao', l: 'Uma atitude, nesta semana, que me aproxima de um valor' }
      ]
    },
    {
      id: 'carta-si', ab: 'hum', nome: 'Carta compassiva para mim', min: 15,
      obj: 'Exercitar um olhar acolhedor e empático sobre a própria dor.',
      dem: ['Autoestima', 'Depressão', 'Luto e perdas', 'Regulação emocional'], ref: 'Neff, K. (2017). Autocompaixão: pare de se torturar e deixe a insegurança para trás. Lúcida Letra. ' + ROG,
      intro: 'Pense em algo de que você se cobra ou que dói. Escreva uma carta para si como escreveria a uma pessoa muito querida passando pela mesma situação: com compreensão, sem julgamento.',
      f: [
        { t: 'area', id: 'tema', l: 'Sobre o que é a carta?' },
        { t: 'area', id: 'carta', l: 'Querida(o) eu,', ph: 'Escreva livremente…' },
        { t: 'area', id: 'sent', l: 'Como me senti ao escrever e ao ler a carta?' }
      ]
    },
    {
      id: 'linha-vida', ab: 'hum', nome: 'Linha da vida', min: 20,
      obj: 'Revisitar marcos da história pessoal e reconhecer recursos desenvolvidos.',
      dem: ['Autoconhecimento', 'Luto e perdas', 'Sentido de vida'], ref: 'Técnica biográfica utilizada nas abordagens humanistas e existenciais.',
      intro: 'Registre momentos marcantes da sua vida, bons e difíceis, na ordem em que aconteceram. Vá no seu ritmo; você não precisa escrever tudo.',
      f: [
        { t: 'rep', id: 'marcos', l: 'Marcos da minha vida', item: 'Marco', f: [
          { t: 'text', id: 'idade', l: 'Idade ou ano' },
          { t: 'area', id: 'fato', l: 'O que aconteceu' },
          { t: 'radio', id: 'tom', l: 'Como foi para mim', o: ['Positivo', 'Difícil', 'Misto'] },
          { t: 'area', id: 'aprendi', l: 'O que levo dessa experiência' }
        ] },
        { t: 'area', id: 'recursos', l: 'Que forças e recursos pessoais percebo ao olhar para minha história?' },
        { t: 'area', id: 'futuro', l: 'Que capítulo gostaria de escrever a seguir?' }
      ]
    },
    {
      id: 'aqui-agora', ab: 'hum', nome: 'Consciência do aqui e agora', min: 10,
      obj: 'Ampliar a awareness (consciência) do que se vive no momento presente.',
      dem: ['Ansiedade', 'Autoconhecimento', 'Estresse'], ref: GES,
      intro: 'Exercício da Gestalt-terapia. Por alguns minutos, complete mentalmente a frase "Agora eu percebo…" com o que notar: sons, sensações, pensamentos, emoções. Depois registre.',
      f: [
        { t: 'timer', s: 180 },
        { t: 'area', id: 'fora', l: 'Agora eu percebo fora de mim… (sons, cores, cheiros)' },
        { t: 'area', id: 'dentro', l: 'Agora eu percebo dentro de mim… (corpo, sensações)' },
        { t: 'area', id: 'mente', l: 'Agora eu percebo na minha mente… (pensamentos, imagens)' },
        { t: 'area', id: 'evito', l: 'Percebi que tento evitar ou fugir de…' }
      ]
    },
    {
      id: 'carta-nao-enviada', ab: 'hum', nome: 'Carta não enviada', min: 20,
      obj: 'Expressar sentimentos não ditos e trabalhar situações inacabadas.',
      dem: ['Luto e perdas', 'Relacionamentos', 'Regulação emocional'], ref: GES,
      intro: 'Escreva para uma pessoa (viva ou não) ou situação com quem você tem algo "não resolvido". Esta carta não será enviada: é um espaço só seu e da sua terapia. Se surgirem emoções muito intensas, faça uma pausa.',
      f: [
        { t: 'text', id: 'para', l: 'Para quem é a carta?', ph: 'Pode usar só as iniciais' },
        { t: 'area', id: 'carta', l: 'Carta', ph: 'O que gostaria de dizer, agradecer, perguntar ou pedir…' },
        { t: 'area', id: 'apos', l: 'Como estou me sentindo agora?' }
      ]
    },
    {
      id: 'necessidades', ab: 'hum', nome: 'Minhas necessidades', min: 10,
      obj: 'Reconhecer necessidades atendidas e não atendidas e formas de cuidar delas.',
      dem: ['Autoconhecimento', 'Estresse', 'Relacionamentos'], ref: 'Maslow, A. H. (1970). Motivation and personality. Harper & Row. Rosenberg, M. B. (2006). Comunicação não-violenta. Ágora.',
      intro: 'Marque as necessidades que hoje estão pouco atendidas na sua vida.',
      f: [
        { t: 'check', id: 'nec', l: 'Necessidades pouco atendidas', o: [
          'Descanso', 'Alimentação adequada', 'Segurança', 'Estabilidade financeira', 'Pertencimento', 'Afeto',
          'Ser ouvida(o)', 'Reconhecimento', 'Autonomia', 'Lazer', 'Criatividade', 'Propósito', 'Intimidade', 'Silêncio e solitude'
        ] },
        { t: 'area', id: 'mais', l: 'Qual necessidade mais pede atenção agora? Como sei disso?' },
        { t: 'area', id: 'cuidar', l: 'O que posso fazer, ou pedir a alguém, para cuidar dela?' }
      ]
    },
    {
      id: 'sentido', ab: 'hum', nome: 'Sentido e propósito', min: 15,
      obj: 'Refletir sobre fontes de sentido na própria vida, mesmo diante do sofrimento.',
      dem: ['Sentido de vida', 'Depressão', 'Luto e perdas'], ref: 'Frankl, V. E. (2017). Em busca de sentido. Vozes.',
      intro: 'Para Viktor Frankl, encontramos sentido no que criamos ou oferecemos, no que vivenciamos e amamos e na atitude que escolhemos diante do inevitável.',
      f: [
        { t: 'area', id: 'criar', l: 'O que eu crio, ofereço ou faço que tem valor?' },
        { t: 'area', id: 'viver', l: 'Que experiências, pessoas ou belezas tornam minha vida significativa?' },
        { t: 'area', id: 'atitude', l: 'Diante do que não posso mudar, que atitude quero escolher?' },
        { t: 'area', id: 'lembrar', l: 'Como gostaria de ser lembrada(o)?' }
      ]
    },
    {
      id: 'forcas', ab: 'hum', nome: 'Minhas forças e recursos', min: 10,
      obj: 'Reconhecer qualidades e recursos pessoais e da rede de apoio.',
      dem: ['Autoestima', 'Depressão', 'Autoconhecimento'], ref: ROG,
      intro: 'Muitas vezes esquecemos o que temos de bom. Responda com generosidade.',
      f: [
        { t: 'area', id: 'qual', l: 'Três qualidades que tenho' },
        { t: 'area', id: 'outros', l: 'O que as pessoas que gostam de mim admiram em mim?' },
        { t: 'area', id: 'superei', l: 'Uma dificuldade que já superei e o que me ajudou' },
        { t: 'area', id: 'rede', l: 'Pessoas, lugares e práticas que me fortalecem' }
      ]
    },

    /* ===================== DBT ===================== */
    {
      id: 'diary-card', ab: 'dbt', nome: 'Cartão diário DBT', min: 5,
      obj: 'Monitorar emoções, impulsos, comportamentos-alvo e habilidades usadas a cada dia.',
      dem: ['Regulação emocional', 'Impulsividade', 'Crise'], ref: LIN,
      intro: 'Preencha todos os dias, de preferência à noite. É um registro honesto, sem julgamento: ele ajuda a ver padrões.',
      f: [
        { t: 'rep', id: 'dias', l: 'Dias', item: 'Dia', f: [
          { t: 'text', id: 'data', l: 'Data' },
          { t: 'scale', id: 'tristeza', l: 'Tristeza', min: 0, max: 5, lo: 'Nada', hi: 'Muito intensa' },
          { t: 'scale', id: 'raiva', l: 'Raiva', min: 0, max: 5, lo: 'Nada', hi: 'Muito intensa' },
          { t: 'scale', id: 'medo', l: 'Medo / ansiedade', min: 0, max: 5, lo: 'Nada', hi: 'Muito intensa' },
          { t: 'scale', id: 'vergonha', l: 'Vergonha / culpa', min: 0, max: 5, lo: 'Nada', hi: 'Muito intensa' },
          { t: 'scale', id: 'alegria', l: 'Alegria', min: 0, max: 5, lo: 'Nada', hi: 'Muito intensa' },
          { t: 'scale', id: 'impulso', l: 'Impulso de agir de forma prejudicial', min: 0, max: 5, lo: 'Nada', hi: 'Muito intensa' },
          { t: 'text', id: 'comp', l: 'Comportamento-alvo que aconteceu (se houve)' },
          { t: 'check', id: 'hab', l: 'Habilidades que usei', o: ['Mente sábia', 'Observar / descrever', 'STOP', 'TIPP', 'Distração (ACCEPTS)', 'Autoacalmar', 'Aceitação radical', 'Verificar os fatos', 'Ação oposta', 'PLEASE', 'DEAR MAN', 'GIVE / FAST'] },
          { t: 'area', id: 'nota', l: 'Observações' }
        ] }
      ]
    },
    {
      id: 'mente-sabia', ab: 'dbt', nome: 'Mente sábia', min: 10,
      obj: 'Integrar razão e emoção para tomar decisões mais equilibradas.',
      dem: ['Regulação emocional', 'Impulsividade', 'Autoconhecimento'], ref: LIN,
      intro: 'A mente racional pensa nos fatos; a mente emocional é guiada pelos sentimentos. A mente sábia é o encontro das duas. Pense em uma situação recente.',
      f: [
        { t: 'area', id: 'sit', l: 'Situação' },
        { t: 'area', id: 'emocional', l: 'O que minha mente emocional dizia?' },
        { t: 'area', id: 'racional', l: 'O que minha mente racional dizia?' },
        { t: 'area', id: 'sabia', l: 'O que a mente sábia diria ou faria?' },
        { t: 'breath', in: 4, hold: 0, out: 6 }
      ]
    },
    {
      id: 'mindfulness', ab: 'dbt', nome: 'Mindfulness: observar, descrever, participar', min: 10,
      obj: 'Praticar as habilidades "o quê" e "como" de atenção plena.',
      dem: ['Regulação emocional', 'Ansiedade', 'Estresse'], ref: LIN,
      intro: 'Escolha uma atividade simples (tomar um chá, lavar a louça, ouvir sons). Faça uma coisa de cada vez, sem julgar, com efetividade.',
      f: [
        { t: 'timer', s: 300 },
        { t: 'text', id: 'ativ', l: 'Atividade escolhida' },
        { t: 'area', id: 'obs', l: 'Observar: o que notei pelos sentidos?' },
        { t: 'area', id: 'desc', l: 'Descrever: coloque em palavras apenas os fatos, sem interpretações' },
        { t: 'area', id: 'julg', l: 'Percebi julgamentos? Quais? Consegui deixá-los passar?' },
        { t: 'scale', id: 'pres', l: 'O quanto consegui estar presente', min: 0, max: 10, lo: 'Nada', hi: 'Totalmente' }
      ]
    },
    {
      id: 'stop', ab: 'dbt', nome: 'Habilidade STOP', min: 5,
      obj: 'Interromper reações impulsivas em momentos de emoção intensa.',
      dem: ['Impulsividade', 'Crise', 'Regulação emocional'], ref: LIN,
      intro: 'S – Stop (pare, congele). T – Tome um passo atrás (respire). O – Observe (o que acontece dentro e fora). P – Prossiga com atenção (aja com mente sábia).',
      f: [
        { t: 'rep', id: 'usos', l: 'Vezes em que usei o STOP', item: 'Situação', f: [
          { t: 'area', id: 'sit', l: 'Situação e impulso que senti' },
          { t: 'area', id: 'obs', l: 'O que observei em mim e ao redor' },
          { t: 'area', id: 'fiz', l: 'Como prossegui' },
          { t: 'scale', id: 'ajuda', l: 'O quanto ajudou', min: 0, max: 10, lo: 'Nada', hi: 'Muito' }
        ] }
      ]
    },
    {
      id: 'tipp', ab: 'dbt', nome: 'TIPP: baixando a intensidade', min: 10,
      obj: 'Alterar rapidamente a química do corpo para atravessar picos emocionais.',
      dem: ['Crise', 'Regulação emocional', 'Ansiedade', 'Impulsividade'], ref: LIN,
      intro: 'T – Temperatura (água fria no rosto por 30 s). I – Exercício Intenso (pular, correr por alguns minutos). P – Respiração Pausada (expirar mais longo que inspirar). P – Relaxamento muscular Pareado. Atenção: se você tem problemas cardíacos, de pressão ou distúrbios alimentares, converse com a psicóloga e seu médico antes de usar água fria ou exercício intenso.',
      f: [
        { t: 'scale', id: 'antes', l: 'Intensidade da emoção antes', min: 0, max: 10, lo: 'Nenhuma', hi: 'Máxima' },
        { t: 'check', id: 'usei', l: 'O que usei', o: ['Temperatura (água fria)', 'Exercício intenso', 'Respiração pausada', 'Relaxamento muscular'] },
        { t: 'breath', in: 4, hold: 0, out: 7 },
        { t: 'scale', id: 'depois', l: 'Intensidade da emoção depois', min: 0, max: 10, lo: 'Nenhuma', hi: 'Máxima' },
        { t: 'area', id: 'obs', l: 'Observações' }
      ]
    },
    {
      id: 'accepts', ab: 'dbt', nome: 'Distração com ACCEPTS', min: 10,
      obj: 'Montar uma lista pessoal de formas saudáveis de se distrair numa crise.',
      dem: ['Crise', 'Impulsividade', 'Regulação emocional'], ref: LIN,
      intro: 'Escreva ao menos uma ideia para cada letra. Use quando a emoção estiver alta demais para resolver o problema na hora.',
      f: [
        { t: 'text', id: 'a1', l: 'A – Atividades', ph: 'Ex.: arrumar o armário, jogo no celular' },
        { t: 'text', id: 'c1', l: 'C – Contribuir (ajudar alguém)' },
        { t: 'text', id: 'c2', l: 'C – Comparações (com outros momentos em que superei)' },
        { t: 'text', id: 'e1', l: 'E – Emoções opostas (filme engraçado, música animada)' },
        { t: 'text', id: 'p1', l: 'P – Afastar (pôr a situação de lado por um tempo)' },
        { t: 'text', id: 't1', l: 'T – Pensamentos (contar, quebra-cabeça, ler)' },
        { t: 'text', id: 's1', l: 'S – Sensações (gelo na mão, banho, perfume)' },
        { t: 'area', id: 'teste', l: 'Usei alguma? Como foi?' }
      ]
    },
    {
      id: 'autoacalmar', ab: 'dbt', nome: 'Autoacalmar com os cinco sentidos', min: 10,
      obj: 'Criar um kit de autocuidado sensorial para momentos difíceis.',
      dem: ['Crise', 'Ansiedade', 'Regulação emocional', 'Sono'], ref: LIN,
      intro: 'Pense no que conforta cada um dos seus sentidos. Você pode montar uma "caixinha" física com esses itens.',
      f: [
        { t: 'text', id: 'visao', l: 'Visão', ph: 'Ex.: fotos queridas, céu, vela' },
        { t: 'text', id: 'audicao', l: 'Audição', ph: 'Ex.: playlist calma, sons da natureza' },
        { t: 'text', id: 'olfato', l: 'Olfato', ph: 'Ex.: café, lavanda, perfume' },
        { t: 'text', id: 'paladar', l: 'Paladar', ph: 'Ex.: chá quente, bala de menta' },
        { t: 'text', id: 'tato', l: 'Tato', ph: 'Ex.: cobertor macio, abraçar o travesseiro' },
        { t: 'area', id: 'onde', l: 'Onde vou guardar meu kit e quando vou usá-lo?' }
      ]
    },
    {
      id: 'improve', ab: 'dbt', nome: 'IMPROVE: melhorar o momento', min: 10,
      obj: 'Tornar um momento difícil mais suportável.',
      dem: ['Crise', 'Luto e perdas', 'Regulação emocional'], ref: LIN,
      intro: 'Escolha uma ou mais estratégias e registre como foi.',
      f: [
        { t: 'check', id: 'est', l: 'Estratégias', o: [
          'I – Imaginação (um lugar seguro)', 'M – Significado (encontrar sentido)', 'P – Oração / espiritualidade',
          'R – Relaxamento', 'O – Uma coisa de cada vez', 'V – Férias breves (pausa curta)', 'E – Encorajamento a mim mesma(o)'
        ] },
        { t: 'area', id: 'como', l: 'Como usei' },
        { t: 'scale', id: 'ajuda', l: 'O quanto ajudou', min: 0, max: 10, lo: 'Nada', hi: 'Muito' }
      ]
    },
    {
      id: 'pros-contras-dbt', ab: 'dbt', nome: 'Prós e contras na crise', min: 10,
      obj: 'Comparar as consequências de agir no impulso e de tolerar o mal-estar.',
      dem: ['Impulsividade', 'Crise'], ref: LIN,
      intro: 'Preencha com antecedência, em um momento calmo, pensando em um impulso que costuma aparecer. Releia quando ele surgir.',
      f: [
        { t: 'text', id: 'imp', l: 'Impulso ou comportamento-problema' },
        { t: 'area', id: 'pa', l: 'Prós de agir no impulso' },
        { t: 'area', id: 'ca', l: 'Contras de agir no impulso' },
        { t: 'area', id: 'pr', l: 'Prós de resistir e tolerar o mal-estar' },
        { t: 'area', id: 'cr', l: 'Contras de resistir' }
      ]
    },
    {
      id: 'aceitacao', ab: 'dbt', nome: 'Aceitação radical', min: 10,
      obj: 'Praticar aceitar a realidade como ela é, reduzindo o sofrimento extra da luta contra ela.',
      dem: ['Luto e perdas', 'Regulação emocional', 'Estresse'], ref: LIN,
      intro: 'Aceitar não é aprovar nem desistir: é reconhecer o que é, para então escolher como agir.',
      f: [
        { t: 'area', id: 'sit', l: 'O que estou tendo dificuldade de aceitar?' },
        { t: 'area', id: 'luta', l: 'Como luto contra essa realidade? (pensamentos "não é justo", "não deveria")' },
        { t: 'area', id: 'causas', l: 'Que causas levaram a isso acontecer?' },
        { t: 'area', id: 'frase', l: 'Frase de aceitação', ph: 'Ex.: "É assim que as coisas são agora."' },
        { t: 'area', id: 'corpo', l: 'Postura de aceitação: mãos abertas, meio sorriso. O que senti?' }
      ]
    },
    {
      id: 'fatos', ab: 'dbt', nome: 'Verificar os fatos', min: 10,
      obj: 'Conferir se a emoção e sua intensidade combinam com os fatos da situação.',
      dem: ['Regulação emocional', 'Ansiedade', 'Relacionamentos'], ref: LIN,
      intro: 'Muitas emoções são disparadas por interpretações, não pelos fatos. Responda passo a passo.',
      f: [
        { t: 'check', id: 'emo', l: 'Emoção que quero examinar', o: EMO },
        { t: 'scale', id: 'int', l: 'Intensidade', min: 0, max: 100, lo: 'Nada', hi: 'Máxima' },
        { t: 'area', id: 'evento', l: 'Qual o evento que disparou a emoção? (só os fatos)' },
        { t: 'area', id: 'interp', l: 'Que interpretações ou suposições estou fazendo?' },
        { t: 'area', id: 'ameaca', l: 'Estou supondo uma ameaça? Qual a probabilidade real?' },
        { t: 'radio', id: 'combina', l: 'A emoção e sua intensidade combinam com os fatos?', o: ['Sim', 'Em parte', 'Não'] },
        { t: 'area', id: 'proximo', l: 'Próximo passo (resolver o problema ou usar ação oposta)' }
      ]
    },
    {
      id: 'acao-oposta', ab: 'dbt', nome: 'Ação oposta', min: 10,
      obj: 'Mudar emoções que não combinam com os fatos agindo de forma contrária ao impulso.',
      dem: ['Regulação emocional', 'Depressão', 'Ansiedade'], ref: LIN,
      intro: 'Cada emoção tem um impulso de ação (medo: fugir; tristeza: isolar; raiva: atacar; vergonha: esconder). Quando a emoção não ajuda, faça o oposto, por inteiro.',
      f: [
        { t: 'rep', id: 'usos', l: 'Práticas', item: 'Prática', f: [
          { t: 'text', id: 'emo', l: 'Emoção' },
          { t: 'text', id: 'impulso', l: 'Impulso de ação' },
          { t: 'area', id: 'oposta', l: 'Ação oposta que fiz' },
          { t: 'scale', id: 'antes', l: 'Intensidade antes', min: 0, max: 10, lo: 'Nada', hi: 'Muito intensa' },
          { t: 'scale', id: 'depois', l: 'Intensidade depois', min: 0, max: 10, lo: 'Nada', hi: 'Muito intensa' }
        ] }
      ]
    },
    {
      id: 'please', ab: 'dbt', nome: 'PLEASE: cuidar do corpo', min: 5,
      obj: 'Reduzir a vulnerabilidade emocional cuidando da saúde física.',
      dem: ['Regulação emocional', 'Sono', 'Estresse'], ref: LIN,
      intro: 'Tratar doenças físicas, alimentação equilibrada, evitar substâncias que alteram o humor, sono equilibrado e exercício. Marque o que fez a cada dia.',
      f: [
        { t: 'rep', id: 'dias', l: 'Dias', item: 'Dia', f: [
          { t: 'text', id: 'data', l: 'Data' },
          { t: 'check', id: 'fiz', l: 'Hoje eu…', o: ['Cuidei da minha saúde (remédios, consultas)', 'Comi de forma equilibrada', 'Evitei álcool e outras substâncias', 'Dormi o suficiente', 'Me movimentei / fiz exercício'] },
          { t: 'scale', id: 'vul', l: 'Como estava minha vulnerabilidade emocional', min: 0, max: 10, lo: 'Baixa', hi: 'Alta' }
        ] }
      ]
    },
    {
      id: 'positivas', ab: 'dbt', nome: 'Acumular emoções positivas', min: 10,
      obj: 'Aumentar experiências positivas no curto prazo e construir uma vida que valha a pena.',
      dem: ['Depressão', 'Regulação emocional', 'Sentido de vida'], ref: LIN,
      intro: 'Curto prazo: faça uma coisa agradável por dia, com atenção plena. Longo prazo: dê passos em direção aos seus valores.',
      f: [
        { t: 'rep', id: 'curto', l: 'Coisas agradáveis do dia', item: 'Experiência', f: [
          { t: 'text', id: 'oque', l: 'O que fiz' },
          { t: 'radio', id: 'presente', l: 'Consegui estar presente?', o: ['Sim', 'Em parte', 'Não'] }
        ] },
        { t: 'area', id: 'valor', l: 'Um valor importante para mim e um passo de longo prazo' }
      ]
    },
    {
      id: 'dearman', ab: 'dbt', nome: 'DEAR MAN: pedir o que preciso', min: 15,
      obj: 'Preparar uma conversa para fazer um pedido ou dizer não de forma efetiva.',
      dem: ['Relacionamentos', 'Autoestima'], ref: LIN,
      intro: 'Monte seu roteiro. Ele é um guia; na conversa, fale com naturalidade.',
      f: [
        { t: 'text', id: 'obj', l: 'Meu objetivo nesta conversa' },
        { t: 'area', id: 'd', l: 'D – Descrever a situação (fatos)' },
        { t: 'area', id: 'e', l: 'E – Expressar sentimentos e opiniões ("eu sinto…")' },
        { t: 'area', id: 'a', l: 'A – Afirmar: pedir claramente ou dizer não' },
        { t: 'area', id: 'r', l: 'R – Reforçar: o que a outra pessoa ganha' },
        { t: 'text', id: 'm', l: 'M – Manter o foco: frase para voltar ao ponto' },
        { t: 'text', id: 'ap', l: 'A – Aparentar confiança: como vou me posicionar' },
        { t: 'text', id: 'n', l: 'N – Negociar: o que posso oferecer em troca' },
        { t: 'area', id: 'res', l: 'Depois da conversa: como foi?' }
      ]
    },
    {
      id: 'givefast', ab: 'dbt', nome: 'GIVE e FAST: cuidar da relação e de mim', min: 10,
      obj: 'Equilibrar a manutenção do vínculo com o autorrespeito em uma conversa.',
      dem: ['Relacionamentos', 'Autoestima'], ref: LIN,
      intro: 'GIVE: ser Gentil, demonstrar Interesse, Validar, usar tom Leve. FAST: ser justo (Fair), sem pedir desculpas em excesso (Apologies), manter valores (Stick to values), ser verdadeira(o) (Truthful).',
      f: [
        { t: 'area', id: 'sit', l: 'Situação ou conversa' },
        { t: 'check', id: 'give', l: 'GIVE que usei', o: ['Gentileza', 'Interesse', 'Validação', 'Tom leve'] },
        { t: 'check', id: 'fast', l: 'FAST que usei', o: ['Justiça comigo e com o outro', 'Sem desculpas excessivas', 'Mantive meus valores', 'Fui verdadeira(o)'] },
        { t: 'area', id: 'res', l: 'Como ficou a relação e como fiquei comigo mesma(o)?' }
      ]
    },
    {
      id: 'cadeia', ab: 'dbt', nome: 'Análise em cadeia', min: 20,
      obj: 'Entender passo a passo o que levou a um comportamento-problema e onde intervir.',
      dem: ['Impulsividade', 'Crise', 'Regulação emocional'], ref: LIN,
      intro: 'Escolha um episódio específico. Descreva cada elo da corrente com detalhes, sem se culpar: a meta é entender.',
      f: [
        { t: 'area', id: 'comp', l: 'Comportamento-problema (o que exatamente fiz)' },
        { t: 'area', id: 'vul', l: 'Vulnerabilidades (sono, fome, estresse, doença…)' },
        { t: 'area', id: 'gatilho', l: 'Evento desencadeante' },
        { t: 'rep', id: 'elos', l: 'Elos da cadeia', item: 'Elo', f: [
          { t: 'area', id: 'elo', l: 'Pensamento, emoção, sensação ou ação' }
        ] },
        { t: 'area', id: 'cons', l: 'Consequências (para mim e para os outros)' },
        { t: 'area', id: 'hab', l: 'Em que elos eu poderia ter usado uma habilidade? Qual?' },
        { t: 'area', id: 'reparo', l: 'Reparação e prevenção' }
      ]
    },
    {
      id: 'plano-seguranca', ab: 'dbt', nome: 'Plano de segurança', min: 20,
      obj: 'Construir, junto com a psicóloga, um plano personalizado para momentos de crise.',
      dem: ['Crise'], ref: 'Stanley, B., & Brown, G. K. (2012). Safety planning intervention: a brief intervention to mitigate suicide risk. Cognitive and Behavioral Practice, 19(2), 256-264. ' + LIN,
      intro: 'Este plano deve ser elaborado e revisado em sessão. Se você estiver em risco agora, não espere: ligue 188 (CVV, 24h, gratuito), 192 (SAMU) ou procure o pronto-socorro mais próximo.',
      f: [
        { t: 'area', id: 'sinais', l: '1. Sinais de alerta de que uma crise pode estar começando' },
        { t: 'area', id: 'sozinho', l: '2. O que posso fazer sozinha(o) para me acalmar' },
        { t: 'area', id: 'lugares', l: '3. Pessoas e lugares que me distraem' },
        { t: 'area', id: 'ajuda', l: '4. Pessoas a quem posso pedir ajuda (nome e telefone)' },
        { t: 'area', id: 'prof', l: '5. Profissionais e serviços (psicóloga, CAPS, médico)', ph: 'CVV 188 · SAMU 192 · UPA / pronto-socorro' },
        { t: 'area', id: 'ambiente', l: '6. Como tornar meu ambiente mais seguro' },
        { t: 'area', id: 'razoes', l: '7. Minhas razões para viver' }
      ]
    }
  ];
})();
