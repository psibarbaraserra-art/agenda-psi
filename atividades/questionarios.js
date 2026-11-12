/*
 * Questionários e anamneses para enviar · Psi Bárbara Serra (CRP 20/13.134)
 * Respostas abertas (sem correção). Por sigilo, não pedem nome completo, CPF,
 * data de nascimento, endereço nem telefone: a identificação já está no cadastro da Agenda.
 */
(function () {
  window.ABORDAGENS = window.ABORDAGENS || {};
  window.ABORDAGENS.quest = { nome: 'Questionário', longo: 'Questionários e anamneses' };
  var h = function (x) { return { t: 'h', x: x }; };
  var tx = function (id, l, ph) { return { t: 'text', id: id, l: l, ph: ph }; };
  var ar = function (id, l, ph) { return { t: 'area', id: id, l: l, ph: ph }; };
  var rd = function (id, l, o) { return { t: 'radio', id: id, l: l, o: o }; };
  var ck = function (id, l, o) { return { t: 'check', id: id, l: l, o: o }; };
  var SN = ['Sim', 'Não'];
  var BRM = ['Boa', 'Regular', 'Ruim'];
  var REF = 'Roteiro de anamnese do material de apoio da psicóloga.';

  var LISTA = [
    {
      id: 'anam-adulto-completa', grupo: 'Geral', nome: 'Anamnese completa (adulto)', min: 30, dem: ['Autoconhecimento', 'Ansiedade', 'Depressão', 'Relacionamentos'],
      obj: 'História de vida completa para o início da psicoterapia: queixa, saúde, família, relacionamentos, trabalho, hábitos, recursos e expectativas.',
      ref: 'Roteiro de anamnese psicológica para adultos.',
      intro: 'Este questionário ajuda a psicóloga a conhecer você e a sua história antes ou no início do acompanhamento. Responda com calma e com suas palavras; você pode salvar e continuar depois e deixar em branco o que preferir conversar pessoalmente.',
      f: [
        h('Sobre você'),
        tx('idade', 'Idade'), tx('genero', 'Gênero / pronomes'), tx('civil', 'Estado civil / situação conjugal'), tx('escol', 'Escolaridade'), tx('prof', 'Profissão / ocupação'),
        ar('mora', 'Com quem você mora?'), tx('filhos', 'Tem filhos? Quantos e de que idades?'), tx('relig', 'Religião ou espiritualidade (opcional)'),
        h('1. Motivo da procura'),
        ar('queixa', 'O que te fez procurar a psicoterapia agora?'),
        ar('inicio', 'Desde quando isso acontece? Como começou e como foi evoluindo?'),
        ar('impacto', 'Como isso afeta sua vida (trabalho, estudos, relacionamentos, rotina)?'),
        ar('tentou', 'O que você já tentou fazer para lidar com isso?'),
        h('2. Saúde mental e tratamentos'),
        ar('terapia', 'Já fez psicoterapia antes? Quando, por quanto tempo e como foi?'),
        ar('psiq', 'Já teve acompanhamento psiquiátrico ou algum diagnóstico? Qual?'),
        ar('medic', 'Usa alguma medicação atualmente (qualquer tipo)? Qual e para quê?'),
        ar('intern', 'Já teve internação psiquiátrica ou crise importante?'),
        rd('ideacao', 'Nos últimos tempos você teve pensamentos de morte, de se machucar ou de que seria melhor não estar vivo(a)?', ['Não', 'Às vezes', 'Com frequência', 'Prefiro conversar na sessão']),
        { t: 'p', x: 'Se você estiver pensando em se machucar agora, não espere a sessão: ligue 188 (CVV, 24h, gratuito), 192 (SAMU) ou procure o pronto-socorro.' },
        h('3. Saúde física e hábitos'),
        ar('saude', 'Tem alguma condição de saúde, doença crônica, cirurgia ou dor frequente?'),
        ar('sono', 'Como está o seu sono (horários, qualidade, dificuldades)?'),
        ar('alim', 'Como está a sua alimentação e o apetite?'),
        ar('ativ', 'Pratica atividade física? Qual e com que frequência?'),
        ar('subst', 'Uso de álcool, cigarro ou outras substâncias: o que, quanto e com que frequência?'),
        h('4. História de vida e família'),
        ar('infancia', 'Como foi a sua infância? Com quem você cresceu?'),
        ar('relpais', 'Como era (e como é hoje) a relação com seus pais ou cuidadores?'),
        ar('irmaos', 'Irmãos e outros familiares importantes: como é a relação?'),
        ar('eventos', 'Houve acontecimentos marcantes ou difíceis na sua vida (perdas, mudanças, violência, separações)?'),
        ar('famsaude', 'Há histórico de transtornos mentais, uso de substâncias ou suicídio na família?'),
        h('5. Relacionamentos e vida social'),
        ar('afetivo', 'Como está a sua vida afetiva / relacionamento amoroso?'),
        ar('amigos', 'Como são suas amizades e sua rede de apoio?'),
        ar('lazer', 'O que você faz para se divertir ou descansar?'),
        h('6. Trabalho e estudos'),
        ar('trab', 'Como está a sua vida profissional ou acadêmica? O que gosta e o que é difícil?'),
        ar('financ', 'A situação financeira tem sido uma preocupação?'),
        h('7. Recursos e expectativas'),
        ar('forcas', 'Quais são as suas qualidades e o que te ajuda nos momentos difíceis?'),
        ar('objetivos', 'O que você gostaria que mudasse com a psicoterapia? Quais são os seus objetivos?'),
        ar('outros', 'Há algo importante que não foi perguntado e que você gostaria de contar?')
      ]
    },
    {
      id: 'anam-adulto', grupo: 'TDAH', nome: 'Anamnese adulto (investigação de TDAH)', min: 20, dem: ['Autoconhecimento', 'Impulsividade'],
      obj: 'Levantar a história de vida, de desenvolvimento, escolar, familiar e médica, e as dificuldades atuais de atenção e organização.',
      ref: REF,
      intro: 'Este questionário ajuda a psicóloga a conhecer melhor sua história antes da avaliação. Responda com calma e com suas palavras. Pode deixar em branco o que não souber ou não quiser responder; vamos conversar sobre tudo na sessão.',
      f: [
        h('Sobre você'),
        tx('idade', 'Idade'), tx('civil', 'Estado civil'), tx('escol', 'Escolaridade'), tx('prof', 'Profissão / ocupação'),
        h('1. Queixa principal'),
        ar('queixa', 'Descreva sua principal queixa e como ela afeta sua vida diária.'),
        h('2. Histórico do desenvolvimento'),
        tx('andar', 'Com que idade começou a andar? (se souber)'), tx('falar', 'Com que idade começou a falar? (se souber)'), tx('ler', 'Com que idade começou a ler?'),
        ar('acad', 'Como foi seu desempenho escolar na infância?'),
        ar('compesc', 'Como era seu comportamento na escola?'),
        ar('probcomp', 'Teve problemas de comportamento na infância ou adolescência? Quais?'),
        h('3. História familiar'),
        ar('fam', 'Há histórico de TDAH ou de outros transtornos psicológicos na sua família? Se sim, quem?'),
        h('4. Histórico médico'),
        ar('med', 'Teve problemas de saúde na infância ou adolescência?'),
        ar('diag', 'Já recebeu diagnóstico de algum transtorno psicológico? Qual e quando?'),
        ar('psicof', 'Já usou ou usa medicação psiquiátrica? Qual e por quanto tempo?'),
        h('5. Dificuldades atuais'),
        ar('s1', 'Você tem dificuldade em manter o foco em atividades que exigem esforço mental?'),
        ar('s2', 'Você tem dificuldade em organizar tarefas e atividades?'),
        ar('s3', 'Você tem dificuldade em seguir instruções?'),
        ar('s4', 'Você tem dificuldade em lembrar de detalhes importantes?'),
        ar('s5', 'Você costuma adiar (procrastinar) tarefas importantes?'),
        ar('s6', 'Você costuma interromper as pessoas quando estão falando?'),
        ar('s7', 'Você costuma se sentir inquieta(o) ou agitada(o)?'),
        h('6. Outras condições de saúde'),
        ar('comor', 'Você tem alguma outra condição de saúde mental (ansiedade, depressão, outra)?'),
        ar('cronica', 'Você tem alguma condição médica crônica que possa afetar sua atenção ou concentração?'),
        h('7. Impacto na vida diária'),
        ar('imp1', 'Como essas dificuldades afetam seu dia a dia? Quais são as principais?'),
        ar('imp2', 'Como elas afetam seu trabalho ou seus estudos?'),
        ar('imp3', 'Como elas afetam seus relacionamentos?'),
        h('8. Tratamentos anteriores'),
        ar('trat', 'Já fez algum tratamento para essas dificuldades? Qual e por quanto tempo?'),
        ar('melh', 'Houve melhora com o tratamento?'),
        h('9. Expectativas'),
        ar('exp1', 'O que você espera do acompanhamento psicológico?'),
        ar('exp2', 'Como você acredita que o acompanhamento pode te ajudar?')
      ]
    },
    {
      id: 'perg-tdah-adulto', grupo: 'TDAH', nome: 'Perguntas sobre atenção e impulsividade (adulto)', min: 15, dem: ['Autoconhecimento', 'Impulsividade'],
      obj: 'Perguntas abertas para o adulto descrever, com exemplos, as situações de desatenção, inquietação e impulsividade.',
      ref: 'Material de apoio da psicóloga (roteiro de perguntas, sem correção).',
      intro: 'Responda cada pergunta contando, se possível, um exemplo do seu dia a dia. Não existe resposta certa ou errada.',
      f: [
        'Você sente que tem dificuldade em prestar atenção nas tarefas do dia a dia?',
        'Você tem dificuldade em concluir tarefas, mesmo quando são importantes ou interessantes?',
        'Você frequentemente se esquece de compromissos ou tarefas importantes?',
        'Você sente que é facilmente distraída(o) por estímulos externos, como sons ou movimentos?',
        'Você costuma procrastinar ou adiar tarefas até o último minuto?',
        'Você tem dificuldade em se concentrar em conversas longas ou em reuniões de trabalho?',
        'Você sente que tem dificuldade em seguir instruções ou entender informações?',
        'Você frequentemente interrompe outras pessoas enquanto falam?',
        'Você se sente inquieta(o) ou agitada(o) quando precisa ficar parada(o) por longos períodos?',
        'Você sente que precisa estar sempre em movimento ou ocupada(o) com alguma atividade?',
        'Você frequentemente se envolve em atividades impulsivas, como gastar dinheiro sem pensar ou tomar decisões importantes sem considerar todas as opções?',
        'Você sente que tem dificuldade em esperar a sua vez ou em situações que exigem paciência?',
        'Você tem dificuldade em manter relacionamentos pessoais ou profissionais de longo prazo?',
        'Você já recebeu diagnóstico de TDAH na infância ou adolescência?',
        'Você tem histórico familiar de TDAH ou de outros transtornos psiquiátricos?'
      ].map(function (q, i) { return ar('q' + (i + 1), (i + 1) + '. ' + q); })
    },
    {
      id: 'anam-infantil', grupo: 'Geral', nome: 'Anamnese infantil (para pais ou responsáveis)', min: 40, dem: ['Autoconhecimento', 'Relacionamentos'],
      obj: 'História da criança: motivo da consulta, gestação, desenvolvimento, sono, linguagem, sociabilidade, escola, saúde e rotina familiar.',
      ref: REF,
      intro: 'Este questionário é para a mãe, o pai ou a pessoa responsável pela criança. Ele ajuda a psicóloga a conhecer a história da criança. Responda com calma; você pode salvar e continuar depois, e deixar em branco o que não souber. Os dados de identificação (nomes, endereço e telefone) já estão com a psicóloga e não precisam ser escritos aqui.',
      f: [
        h('Sobre a criança e a família'),
        tx('idade', 'Idade da criança', 'Ex.: 7 anos e 3 meses'), rd('sexo', 'Sexo', ['Feminino', 'Masculino']), tx('apelido', 'Como gosta de ser chamada(o)'),
        tx('escol', 'Escolaridade, série e período'),
        tx('pai', 'Pai: idade e profissão'), tx('mae', 'Mãe: idade e profissão'),
        tx('maetrab', 'A mãe trabalha fora? Em qual turno?'),
        tx('quemfica', 'Com quem a criança fica no dia a dia?'),
        ar('casa', 'Outras pessoas que moram na casa (grau de parentesco e idade)'),
        h('Motivo da consulta'),
        ar('queixa', 'Qual é a principal preocupação ou queixa?'),
        ar('histq', 'Quando e em que circunstância isso começou? Como se desenvolveu?'),
        ar('tratant', 'A criança já fez algum tratamento antes? Qual?'),
        h('Gestação e nascimento'),
        rd('desejada', 'A gravidez foi desejada?', ['Sim', 'Não', 'Prefiro conversar na sessão']), ar('desejobs', 'Observações'),
        ar('gestemoc', 'Durante a gestação, como a mãe estava emocionalmente?'),
        ar('complic', 'Houve complicações na gravidez? Em que mês?'),
        rd('parto', 'Tipo de parto', ['Normal', 'Cesárea']),
        rd('termo', 'Nasceu', ['No tempo esperado', 'Antes do tempo (prematuro)', 'Depois do tempo']), tx('meses', 'Se foi prematuro, com quantas semanas ou meses?'),
        tx('tamanho', 'Tamanho ao nascer'), tx('peso', 'Peso ao nascer'), ar('partoobs', 'Observações sobre o parto'),
        ar('24h', 'Como foram as 24 horas antes do parto (mãe) e as 24 horas depois (mãe e bebê)?'),
        h('Alimentação'),
        rd('mama', 'Foi amamentada(o) no peito?', SN), ar('mamaobs', 'Até quando? Se não, por quê?'),
        ar('solidos', 'Como foi a introdução de alimentos sólidos?'),
        tx('dentes', 'Quando nasceram os primeiros dentes?'),
        ar('alimatual', 'Tem dificuldades de alimentação atualmente? Quais?'),
        h('Sono'),
        ar('sonopeq', 'Como foi o sono desde pequena(o)?'),
        ar('sonomud', 'Houve época em que o sono melhorou ou piorou? Quando?'),
        ar('sonoatual', 'Como é o sono atualmente?'),
        h('Desenvolvimento motor'),
        tx('cabeca', 'Quando sustentou a cabeça?'), tx('sentou', 'Quando sentou?'), tx('engat', 'Quando engatinhou?'), tx('empe', 'Quando ficou em pé?'), tx('andou', 'Quando andou?'),
        ck('difmot', 'Teve alguma destas dificuldades?', ['Tendência a cair', 'Machucar-se com frequência', 'Bater-se (golpear-se)', 'Dificuldade em manipular objetos']),
        tx('difmotout', 'Outras dificuldades motoras'), ar('difmotatual', 'Dificuldades atuais'), ar('motpais', 'Qual foi a atitude dos pais?'),
        h('Controle dos esfíncteres'),
        tx('fraldas', 'Quando deixou as fraldas?'), ar('pinico', 'Como foi a aprendizagem do uso do penico ou vaso?'),
        ar('esfcomo', 'Como foi feito? (com facilidade, com dificuldade, com castigos?)'), tx('esfquem', 'Quem ajudou e com que idade?'),
        h('Linguagem'),
        tx('palavras', 'Quando falou as primeiras palavras? Quais foram?'),
        ar('fala', 'Tem ou teve dificuldades de fala? Quais? Desde quando?'), ar('falapais', 'Qual foi a atitude dos pais?'),
        h('Sociabilidade'),
        tx('amigos', 'Tem amigos? De que idade?'), ar('amigosrel', 'Como é o relacionamento com eles?'),
        ar('brinc', 'Que tipo de brincadeira prefere?'), ar('adultos', 'Como se comporta com adultos?'),
        h('Escola'),
        rd('leitura', 'Leitura', BRM), rd('escrita', 'Escrita', BRM),
        ar('difaprend', 'Tem dificuldade de aprendizagem? Em quais disciplinas?'),
        tx('reprov', 'Já foi reprovada(o)? Quantas vezes?'), ar('reprovatit', 'Que atitude foi tomada?'),
        tx('ingresso', 'Com que idade entrou na escola?'), ar('adapt', 'Teve problemas para se adaptar à escola? Quais?'),
        ar('rend', 'Apresenta dificuldades atualmente no rendimento escolar?'),
        h('Sexualidade'),
        { t: 'p', x: 'As perguntas abaixo fazem parte de uma anamnese infantil completa. Se preferir, deixe em branco e converse sobre elas na sessão.' },
        ar('curios', 'Manifesta curiosidade sexual? Que perguntas faz?'), ar('curiospais', 'Qual é a atitude dos pais?'),
        ar('orient', 'Recebeu orientação? Por parte de quem?'),
        ar('explor', 'Há manipulação do próprio corpo ou brincadeiras sexuais com outras crianças? Quais?'), ar('explorpais', 'Qual é a atitude dos pais?'),
        h('Hábitos e tiques'),
        tx('chupeta', 'Usou chupeta? Até quando?'), tx('dedo', 'Chupava o dedo? Até quando?'),
        ar('manip', 'Apresenta outras manias (roer unhas, enrolar o cabelo etc.)? Quais?'), ar('tiques', 'Tem tiques? Quais?'), ar('tiquespais', 'Qual é a atitude dos pais?'),
        h('Saúde'),
        ar('doencas', 'Doenças da infância, cirurgias, traumatismos, quedas ou desmaios? Com que idade?'),
        ar('doencaatual', 'Tem alguma doença atualmente? Qual? Está em tratamento?'),
        h('Relato livre'),
        ar('relato', 'Há algo importante que não foi perguntado e que você gostaria de contar?')
      ]
    },
    {
      id: 'entrev-resp', grupo: 'TDAH', nome: 'Entrevista sobre atenção e comportamento (pais, responsáveis ou escola)', min: 15, dem: ['Impulsividade', 'Relacionamentos'],
      obj: 'Questionário para os responsáveis ou a escola descreverem atenção, comportamento e aprendizagem da criança.',
      ref: 'Modelo de entrevista avaliativa do material de apoio da psicóloga.',
      intro: 'Este questionário pode ser respondido pela família ou pela escola. Descreva, com exemplos, como a criança ou adolescente se comporta.',
      f: [
        tx('idade', 'Idade da criança ou adolescente'), tx('escol', 'Escolaridade / série'),
        rd('quem', 'Quem está respondendo?', ['Mãe', 'Pai', 'Outra pessoa responsável', 'Professora / professor', 'Coordenação ou outra pessoa da escola', 'Outra pessoa']),
        ar('q1', '1. Distrai-se facilmente com estímulos externos?'),
        ar('q2', '2. Perde materiais escolares com frequência?'),
        ar('q3', '3. Tem dificuldade em permanecer sentada(o)? Sai da sala de aula sem permissão?'),
        ar('q4', '4. Demonstra falta de interesse pela aprendizagem? Já está alfabetizada(o)?'),
        ar('q5', '5. Tem dificuldade em concluir as atividades propostas?'),
        ar('q6', '6. Tem dificuldade em manter a atenção e o foco nas atividades escolares?'),
        ar('q7', '7. Apresenta agitação ou hiperatividade? Como?'),
        ar('q8', '8. Como é a escola em que estuda? Existe alguma queixa da escola?'),
        ar('q9', '9. Tem dificuldade em esperar a sua vez? Interrompe os outros?'),
        ar('q10', '10. Como avalia a leitura?'),
        ar('q11', '11. Como avalia a produção de texto?'),
        ar('obs', 'Outras observações')
      ]
    }
  ];

  var SIM3 = ['Sim', 'Às vezes', 'Não'];
  LISTA = LISTA.concat([
    {
      id: 'anam-tea', grupo: 'TEA', nome: 'Anamnese TEA (para pais ou responsáveis)', min: 35, dem: ['Relacionamentos', 'Autoconhecimento'],
      obj: 'História da gestação, do nascimento e do desenvolvimento (motor, linguagem, visão, sociabilidade, estereotipias) e rotina da criança, para investigação de TEA.',
      ref: 'Roteiro de anamnese para TEA do material de apoio da psicóloga.',
      intro: 'Este questionário é para a mãe, o pai ou a pessoa responsável. Responda com calma; você pode salvar e continuar depois e deixar em branco o que não souber. Os nomes e contatos já estão com a psicóloga e não precisam ser escritos aqui.',
      f: [
        h('Sobre a criança e a família'),
        tx('idade', 'Idade da criança'), tx('genero', 'Gênero'),
        ck('quem', 'Quem está respondendo?', ['Mãe', 'Pai', 'Outra pessoa responsável']), tx('quemout', 'Se outra pessoa, qual o parentesco?'),
        ar('compos', 'Composição familiar (quem mora com a criança)'),
        h('Motivo do atendimento'),
        ar('queixa', 'Qual é a principal preocupação ou motivo do atendimento?'),
        ar('idadetea', 'Se já houve diagnóstico ou suspeita de TEA, com que idade isso foi percebido? Por quem?'),
        ar('motor', 'Apresenta dificuldades motoras ou de orientação espacial? Quais?'),
        h('Gestação'),
        rd('planej', 'A gestação foi planejada?', SN),
        ar('perdas', 'Houve gestações interrompidas ou perdas anteriores? (se quiser contar)'),
        ar('reacao', 'Como a mãe reagiu à notícia da gravidez? Como se sentiu?'),
        rd('prenatal', 'Fez acompanhamento pré-natal?', SN),
        ar('queda', 'Sofreu alguma queda durante a gravidez? Em que mês?'),
        ar('doencas', 'Teve doenças durante a gestação? Quais?'),
        ar('medic', 'Usou medicamentos na gestação (vitaminas, comprimidos, calmantes)? Quais?'),
        tx('vacinas', 'Tomou vacinas durante a gestação? Quais?'),
        rd('ameaca', 'Teve ameaça de aborto?', SN), rd('transf', 'Fez transfusão de sangue na gestação?', SN),
        h('Nascimento'),
        tx('semanas', 'Com quantas semanas nasceu?'),
        rd('onde', 'Onde nasceu?', ['Hospital', 'Casa', 'Outro lugar']), rd('assist', 'Quem fez o parto?', ['Médico(a)', 'Parteira', 'Outra pessoa']),
        rd('parto', 'Tipo de parto', ['Normal', 'Cesárea']), tx('porque', 'Se foi cesárea, por quê?'), tx('duracao', 'Duração do parto'),
        rd('posicao', 'Posição do bebê', ['Cabeça', 'Face', 'Mãos', 'Pés', 'Nádegas', 'Outra']),
        ar('problema', 'Houve algum problema com o bebê logo ao nascer? Qual?'),
        rd('oxig', 'Precisou de oxigênio?', SN), rd('cian', 'Nasceu cianótico (arroxeado)?', SN), rd('chorou', 'Chorou logo?', SN),
        tx('peso', 'Peso ao nascer'), tx('tamanho', 'Tamanho ao nascer'),
        h('Alimentação e desenvolvimento motor'),
        ar('alim', 'Como é (e como foi) a alimentação?'),
        rd('restr', 'Apresenta algum tipo de restrição ou seletividade alimentar?', SN), ar('restrq', 'Se sim, qual?'),
        tx('cabeca', 'Quando sustentou a cabeça?'), tx('sentou', 'Quando sentou sozinha(o)? Precisou de incentivo?'), tx('engat', 'Quando engatinhou?'),
        tx('andou', 'Quando andou?'), tx('andaadeq', 'Anda adequadamente?'),
        h('Linguagem'),
        rd('naoverbal', 'A criança é não verbal (não fala)?', ['Sim', 'Fala pouco', 'Não, fala']),
        tx('balbucio', 'Com que idade balbuciou?'), tx('palavras', 'Quando falou as primeiras palavras?'), tx('frases', 'E as primeiras frases?'),
        ar('problling', 'Apresenta algum problema de linguagem? Qual?'), rd('gague', 'Apresenta gagueira?', SN),
        ar('compr', 'Compreende bem o que falam com ela(e)?'), ar('estim', 'Foi estimulada(o) a falar? Como?'),
        rd('errado', 'Quando a criança falava errado, qual era a reação dos pais?', ['Corrigiam', 'Achavam bonito', 'Achavam engraçado', 'Outra']),
        h('Estereotipias'),
        rd('estereo', 'Faz movimentos corporais repetitivos?', SN), ar('estereoq', 'Quais?'),
        h('Visão'),
        rd('v1', 'Inclina a cabeça para olhar?', SN), rd('v2', 'Aproxima muito os objetos dos olhos?', SN), rd('v3', 'Afasta os objetos para olhar?', SN),
        rd('v4', 'Movimenta excessivamente os olhos?', SN), rd('v5', 'Queixa-se de dores de cabeça frequentes, principalmente na testa ou nas têmporas?', SN),
        h('Sociabilidade'),
        rd('retr', 'É mais retraída(o) ou extrovertida(o)?', ['Retraída(o)', 'Extrovertida(o)', 'Depende da situação']),
        rd('amiz', 'Faz amizades facilmente?', SN), rd('briga', 'Briga facilmente?', SN),
        ar('brinc', 'Que tipos de brincadeira prefere?'),
        rd('sozinha', 'Fala sozinha(o)?', SN), rd('fazconta', 'Brinca de faz de conta?', SN), rd('imitaani', 'Imita animaizinhos?', SN), rd('imitapes', 'Imita as pessoas?', SN),
        ar('reage', 'Quando tem algum problema ou frustração, como reage?'),
        h('Rotina'),
        rd('rotest', 'Existe uma rotina estruturada?', SN),
        ar('rotina', 'Descreva a rotina da semana, com horários: acorda, refeições, escola, terapias, brincadeiras (sozinha, com amigos, com mãe/pai), banho, hora de dormir. Indique o que muda no fim de semana.', 'Ex.: 6h acorda · 7h café · 7h30 escola · 12h almoço · 14h fonoaudiologia (seg e qua) …')
      ]
    },
    {
      id: 'entrev-tea-adulto', grupo: 'TEA', nome: 'Entrevista TEA adulto', min: 25, dem: ['Autoconhecimento', 'Relacionamentos'],
      obj: 'Levantar histórico médico e de desenvolvimento, interesses, interação social, sensibilidade sensorial, comunicação, comportamentos repetitivos e expectativas do adulto em investigação de TEA.',
      ref: 'Roteiro de entrevista para TEA em adultos do material de apoio da psicóloga.',
      intro: 'Estas perguntas ajudam a psicóloga a compreender a sua história e o seu jeito de funcionar. Responda com suas palavras e, se possível, com exemplos. Pode deixar em branco o que preferir conversar na sessão.',
      f: [
        h('Sobre você'),
        tx('idade', 'Idade'), tx('genero', 'Sexo / gênero'), tx('escol', 'Escolaridade'),
        h('1. Histórico médico'),
        rd('cond', 'Tem alguma condição médica diagnosticada?', SN), ar('condq', 'Se sim, qual?'),
        rd('trat', 'Já fez tratamento psicológico ou psiquiátrico?', SN), ar('tratq', 'Se sim, qual, quando e por quanto tempo?'),
        ar('infancia', 'Como foi o seu desenvolvimento na infância (fala, andar, escola, amizades)? Houve algo diferente do esperado?'),
        h('2. Sintomas e comportamentos'),
        ar('interesses', 'Quais são os seus interesses e atividades preferidas? Como você se dedica a eles?'),
        ar('social', 'Que dificuldades você percebe na interação social?'),
        ar('sensorial', 'Você tem sensibilidade a sons, luzes, cheiros, texturas, toques ou sabores? Conte exemplos.'),
        ar('comunic', 'Como é a sua comunicação? (entender ironias e entrelinhas, manter conversas, expressar o que sente)'),
        ar('repet', 'Você tem comportamentos repetitivos, rituais ou rotinas que precisa manter? Como se sente quando algo muda?'),
        h('3. Relacionamentos'),
        ar('familia', 'Como são os seus relacionamentos familiares?'),
        ar('profsoc', 'Como são os seus relacionamentos no trabalho, nos estudos e com amigos?'),
        h('4. Desenvolvimento'),
        ar('atraso', 'Algum atraso ou dificuldade de desenvolvimento já foi identificado? Qual?'),
        h('5. Experiências emocionais'),
        ar('emoc', 'Há algo relevante sobre a sua vida emocional que precisa ser dito?'),
        h('6. Expectativas e preocupações'),
        ar('expdiag', 'Quais são as suas expectativas em relação à avaliação e ao possível diagnóstico?'),
        ar('futuro', 'Quais são as suas preocupações em relação ao futuro?'),
        h('7. Considerações finais'),
        ar('final', 'Alguma informação adicional que gostaria de contar?')
      ]
    },
    {
      id: 'perg-tea', grupo: 'TEA', nome: 'Sinais de TEA: 20 perguntas norteadoras', min: 10, dem: ['Relacionamentos', 'Autoconhecimento'],
      obj: 'Perguntas para a família, a escola ou a própria pessoa descreverem sinais de comunicação social, comportamentos repetitivos e sensibilidade sensorial.',
      ref: 'Perguntas norteadoras do material de apoio da psicóloga (sem correção; não fazem diagnóstico).',
      intro: 'Responda pensando na pessoa avaliada (pode ser você mesma(o), seu filho ou seu aluno). Marque a opção que mais se aproxima e, no final, conte exemplos. A presença de alguns sinais não significa que a pessoa tenha TEA: só uma avaliação completa pode dizer isso.',
      f: [rd('quem', 'Quem está respondendo?', ['A própria pessoa', 'Mãe', 'Pai', 'Outra pessoa responsável', 'Professora / professor', 'Outra pessoa'])].concat([
        'Tem dificuldades para se comunicar ou entender o que os outros estão dizendo?',
        'Tem dificuldades para iniciar e manter conversas?',
        'Parece não compreender gestos, expressões faciais e tom de voz?',
        'Tem dificuldades em fazer amigos ou manter relações sociais?',
        'Apresenta comportamentos repetitivos ou estereotipados?',
        'Apresenta movimentos corporais repetitivos, como balançar o corpo ou girar objetos?',
        'Apresenta interesses restritos ou focados em temas específicos?',
        'Tem dificuldades em entender e seguir regras sociais ou convencionais?',
        'Tem dificuldade em se adaptar a mudanças na rotina?',
        'Apresenta sensibilidade sensorial, como aversão a certos sons, texturas ou cheiros?',
        'Tem dificuldades em imaginar ou entender os sentimentos e as perspectivas dos outros?',
        'Tem dificuldades em responder a perguntas abertas ou fazer escolhas?',
        'Tem dificuldades em compreender ironias, piadas ou figuras de linguagem?',
        'Tem dificuldades em entender o sentido figurado das palavras?',
        'Tem dificuldades em identificar e expressar emoções?',
        'Apresenta problemas motores ou de coordenação?',
        'Apresenta comportamentos autoagressivos ou agressivos em relação a outras pessoas?',
        'Tem dificuldades em mudar de atividade ou em se concentrar em uma tarefa por um período de tempo?',
        'Tem dificuldade em compreender e seguir instruções complexas?',
        'Apresenta um padrão de comportamento ou de habilidades diferente do esperado para a sua idade?'
      ].map(function (q, i) { return rd('q' + (i + 1), (i + 1) + '. ' + q, SIM3); })).concat([ar('exemplos', 'Conte exemplos das situações que você marcou como "sim" ou "às vezes"')])
    }
  ]);

  // ---------- Gestação e puerpério (instrumentos clínicos complementares) ----------
  var SAN = [{ v: 2, l: 'Sim' }, { v: 1, l: 'Às vezes' }, { v: 0, l: 'Não' }];
  var CRISEP = 'Você não está sozinha e isso tem tratamento. Se estiver pensando em se machucar agora, não espere a sessão: ligue 188 (CVV, 24h, gratuito), 192 (SAMU) ou procure o pronto-socorro.';
  var BEBE = 'Pensamentos assustadores sobre o bebê acontecem com muitas mães e podem ser tratados; falar sobre eles com a psicóloga é seguro. Se você sentir que pode perder o controle, peça para alguém ficar com o bebê e ligue 192 (SAMU) ou procure o pronto-socorro.';
  var VIOL = 'Você tem direito de estar segura. Em risco agora, ligue 190 (Polícia). Para orientação e apoio, ligue 180 (Central de Atendimento à Mulher, 24h, gratuito).';
  var PSIC = 'Esses sinais precisam de avaliação médica rápida. Fale hoje com a psicóloga ou procure o pronto-socorro; peça para alguém de confiança ficar com você e com o bebê.';
  function sinal(id, l, alerta, msg) { var f = { t: 'likert', id: id, l: l, o: SAN }; if (alerta) { f.alerta = 1; f.msg = msg; f.critico = true; } return f; }
  function calcSinais(itens, criticos) {
    return function (a) {
      var marc = [], al = [];
      itens.forEach(function (f) { if (a[f.id] >= 1) marc.push(f.l + (a[f.id] === 1 ? ' (às vezes)' : '')); });
      (criticos || []).forEach(function (c) { if (a[c[0]] >= 1) al.push(c[1] + ' (' + (a[c[0]] === 2 ? 'sim' : 'às vezes') + ').'); });
      return { falta: 0, linhas: [{ nome: 'Sinais de atenção marcados', v: marc.length, max: itens.length, faixa: al.length ? 'Há sinais de risco: priorizar' : marc.length >= 4 ? 'Vários sinais: aprofundar na sessão' : marc.length ? 'Conversar na sessão' : 'Nenhum sinal marcado', nivel: al.length ? 4 : marc.length >= 4 ? 3 : marc.length ? 2 : 0 }], alertas: al,
        nota: 'Instrumento clínico complementar, não validado para diagnóstico (não é teste psicológico nem escala psicométrica). Sinais marcados: ' + (marc.join('; ') || 'nenhum') + '.' };
    };
  }
  var PU_S = [
    sinal('s1', 'Tenho chorado com frequência, mesmo sem um motivo claro'),
    sinal('s2', 'Tenho me sentido triste, vazia ou sem esperança na maior parte do dia'),
    sinal('s3', 'Perdi o prazer ou o interesse por coisas de que eu gostava'),
    sinal('s4', 'Tenho me sentido muito irritada, impaciente ou com raiva'),
    sinal('s5', 'Tenho preocupação excessiva ou medo constante de que algo ruim aconteça com o bebê ou com a família'),
    sinal('s6', 'Tenho pensamentos repetitivos ou assustadores que não consigo controlar'),
    sinal('s7', 'Não consigo dormir mesmo quando o bebê dorme ou quando alguém cuida dele'),
    sinal('s8', 'Tenho dificuldade de sentir carinho ou conexão com o bebê'),
    sinal('s9', 'Sinto muita culpa ou medo de não ser uma boa mãe'),
    sinal('s10', 'Sinto que estou vivendo no automático ou que as coisas não parecem reais'),
    sinal('s11', 'Sinto que não tenho com quem contar'),
    sinal('s12', 'Tenho tido energia muito alta, pouca necessidade de sono ou pensamentos acelerados')
  ];
  var PU_C = [
    sinal('c1', 'Pensei que seria melhor não estar aqui, ou pensei em me machucar', true, CRISEP),
    sinal('c2', 'Tive pensamentos ou impulsos de machucar o bebê ou outro filho', true, BEBE),
    sinal('c3', 'Tenho ouvido vozes, visto coisas que outras pessoas não percebem ou me sentido confusa', true, PSIC),
    sinal('c4', 'Tenho me sentido insegura ou ameaçada dentro de casa', true, VIOL)
  ];
  var GE_S = [
    sinal('s1', 'Tenho me sentido triste ou desanimada na maior parte do dia'),
    sinal('s2', 'Perdi o prazer ou o interesse por coisas de que eu gostava'),
    sinal('s3', 'Tenho preocupação excessiva com a gestação, o parto ou o bebê'),
    sinal('s4', 'Tenho muito medo do parto'),
    sinal('s5', 'Tenho me sentido muito irritada ou impaciente'),
    sinal('s6', 'Estou dormindo mal, mesmo quando tenho oportunidade de descansar'),
    sinal('s7', 'Sinto que não tenho apoio suficiente nesta gestação'),
    sinal('s8', 'Tenho usado álcool, cigarro ou outras substâncias'),
    sinal('s9', 'Já tive depressão ou ansiedade antes, inclusive em outra gestação ou pós-parto')
  ];
  var GE_C = [
    sinal('c1', 'Pensei que seria melhor não estar aqui, ou pensei em me machucar', true, CRISEP),
    sinal('c2', 'Tenho me sentido insegura ou ameaçada dentro de casa', true, VIOL)
  ];
  var PA_S = [
    sinal('s1', 'Tenho lembranças, imagens ou pesadelos do parto que me angustiam'),
    sinal('s2', 'Evito pensar ou falar sobre o parto, ou passar perto do hospital'),
    sinal('s3', 'Fico em alerta, assustada ou sobressaltada com facilidade desde o parto'),
    sinal('s4', 'Sinto culpa, vergonha ou raiva quando penso no parto')
  ];
  LISTA = LISTA.concat([
    {
      id: 'quest-gestacao', grupo: 'Gestação e puerpério', complementar: true, nome: 'Saúde emocional na gestação', min: 12, dem: ['Ansiedade', 'Depressão', 'Estresse'],
      obj: 'Acompanhar como a gestante está se sentindo, seus medos, sua rede de apoio e fatores de risco para depressão perinatal.',
      ref: 'Instrumento clínico complementar elaborado para o consultório, sem validação psicométrica.',
      intro: 'Estas perguntas ajudam a psicóloga a acompanhar como você está vivendo a gestação. Não existe resposta certa: responda com sinceridade e com suas palavras.',
      f: [h('Sobre a gestação'), tx('semanas', 'Com quantas semanas de gestação você está?'), rd('planej', 'A gravidez foi planejada?', ['Sim', 'Não', 'Em parte']),
        rd('primeira', 'É a sua primeira gestação?', ['Sim', 'Não']), ar('noticia', 'Como você recebeu a notícia da gravidez? E as pessoas próximas?'),
        ar('sentir', 'Como você tem se sentido emocionalmente nas últimas semanas?'),
        h('Como você tem se sentido')].concat(GE_S).concat([h('Segurança')]).concat(GE_C).concat([
        h('Rede de apoio e expectativas'),
        ar('apoio', 'Quem está ao seu lado nesta gestação? Com quem você pode contar?'),
        ar('medos', 'Quais são os seus maiores medos ou preocupações sobre o parto e a maternidade?'),
        ar('plano', 'O que você imagina e deseja para o parto e para os primeiros meses com o bebê?'),
        ar('cuidar', 'O que tem ajudado você a se sentir bem? Do que você precisa agora?')]),
      calc: calcSinais(GE_S.concat(GE_C), [['c1', 'Pensamentos de morte ou de se machucar'], ['c2', 'Sente-se insegura ou ameaçada em casa (avaliar violência doméstica)']])
    },
    {
      id: 'quest-puerperio', grupo: 'Gestação e puerpério', complementar: true, nome: 'Como estou no pós-parto (resguardo)', min: 12, dem: ['Depressão', 'Ansiedade', 'Sono', 'Crise'],
      obj: 'Identificar sinais de sofrimento no puerpério: humor, ansiedade, vínculo com o bebê, sono, rede de apoio e sinais de risco.',
      ref: 'Instrumento clínico complementar elaborado para o consultório, a partir dos eixos do Questionário Puerpério da psicóloga. Sem validação psicométrica.',
      intro: 'Depois do nascimento de um bebê, muitas mães passam por mudanças fortes nas emoções, no corpo e na rotina. Estas perguntas ajudam a psicóloga a entender como você está. Responda pensando nas últimas duas semanas.',
      f: [h('Sobre você e o bebê'), tx('idadebebe', 'Idade do bebê'), rd('parto', 'Tipo de parto', ['Normal', 'Cesárea', 'Outro']), rd('primeiro', 'É o seu primeiro filho?', ['Sim', 'Não']),
        ar('estado', 'Como você descreveria o seu estado emocional nos últimos dias?'),
        h('Nas últimas duas semanas')].concat(PU_S).concat([h('Segurança'), { t: 'p', x: 'As perguntas abaixo são importantes para o seu cuidado. Responder com sinceridade ajuda a psicóloga a te apoiar da melhor forma.' }]).concat(PU_C).concat([
        h('Sono, corpo e autocuidado'),
        tx('horas', 'Quantas horas, mais ou menos, você tem conseguido dormir em 24 horas?'),
        ar('corpo', 'Como estão a sua recuperação física, a alimentação e os cuidados com você mesma?'),
        ar('identidade', 'Como você tem se sentido em relação ao seu corpo e a quem você era antes da maternidade?'),
        h('Rede de apoio'),
        ar('ajuda', 'Quem está ajudando você neste momento? Em quê?'),
        rd('suficiente', 'Você sente que recebe apoio suficiente?', ['Sim', 'Em parte', 'Não']),
        ar('relacoes', 'Como está a relação com o(a) companheiro(a) e com a família?'),
        h('Histórico'),
        ar('antes', 'Você já teve depressão, ansiedade ou outro problema emocional antes, ou fez acompanhamento?'),
        rd('famhist', 'Há na sua família casos de depressão, transtorno bipolar ou depressão pós-parto?', ['Sim', 'Não', 'Não sei']),
        ar('precisa', 'Do que você mais precisa agora?')]),
      calc: calcSinais(PU_S.concat(PU_C), [['c1', 'Pensamentos de morte ou de se machucar'], ['c2', 'Pensamentos ou impulsos de machucar o bebê: diferenciar pensamentos intrusivos indesejados de intenção'], ['c3', 'Possíveis sintomas psicóticos ou confusão: avaliar psicose puerperal com urgência'], ['c4', 'Sente-se insegura ou ameaçada em casa (avaliar violência doméstica)']])
    },
    {
      id: 'experiencia-parto', grupo: 'Gestação e puerpério', complementar: true, nome: 'A experiência do meu parto', min: 15, dem: ['Luto e perdas', 'Ansiedade', 'Autoconhecimento'],
      obj: 'Espaço para a mulher narrar o parto, nomear o que foi bom e o que foi difícil e identificar sinais de experiência traumática.',
      ref: 'Instrumento clínico complementar elaborado para o consultório, sem validação psicométrica.',
      intro: 'Contar a própria história do parto pode ajudar a organizar o que foi vivido. Escreva no seu ritmo; se ficar difícil, faça uma pausa e traga para a sessão.',
      f: [ar('relato', 'Como foi o seu parto? Conte com as suas palavras.'), ar('bom', 'O que foi bom ou te deu força nesse momento?'), ar('dificil', 'O que foi mais difícil?'),
        rd('respeito', 'Você se sentiu respeitada e informada pela equipe?', ['Sim', 'Em parte', 'Não']),
        rd('medo', 'Houve momentos de medo intenso por você ou pelo bebê?', ['Sim', 'Não']), ar('medoq', 'Se quiser, conte como foi.'),
        h('Depois do parto')].concat(PA_S).concat([ar('dizer', 'Há algo que você gostaria de ter vivido de outro jeito, ou que gostaria de dizer sobre o parto?')]),
      calc: calcSinais(PA_S, [])
    },
    {
      id: 'plano-apoio-pos-parto', grupo: 'Gestação e puerpério', complementar: true, nome: 'Meu plano de apoio para o pós-parto', min: 15, dem: ['Estresse', 'Relacionamentos', 'Crise'],
      obj: 'Organizar com antecedência (ou no resguardo) quem ajuda em quê, momentos de descanso, sinais de alerta e contatos de apoio.',
      ref: 'Instrumento clínico complementar elaborado para o consultório (plano de cuidado), sem validação psicométrica.',
      intro: 'Planejar a ajuda antes de precisar faz diferença. Preencha com calma; se quiser, faça junto com quem vai estar com você.',
      f: [h('Quem pode ajudar'),
        tx('casa', 'Tarefas da casa'), tx('noite', 'Cuidados com o bebê à noite (para eu poder dormir)'), tx('refeicoes', 'Refeições'), tx('filhos', 'Outros filhos'), tx('consultas', 'Ir comigo às consultas'),
        ar('pedir', 'Como vou pedir ajuda quando precisar? (frase que posso usar)'),
        ar('descanso', 'Meus momentos de descanso e autocuidado na semana'),
        ck('alertas', 'Sinais de alerta que quero observar em mim', ['Choro frequente', 'Tristeza na maior parte do dia', 'Não conseguir dormir mesmo podendo', 'Ansiedade ou medo constante', 'Irritação intensa', 'Dificuldade de me conectar com o bebê', 'Pensamentos de me machucar ou de machucar o bebê', 'Sentir que estou confusa ou ouvindo coisas']),
        ar('avisar', 'Se eu notar esses sinais, vou avisar (nome e telefone)'),
        { t: 'p', x: 'Contatos importantes: CVV 188 (24h, gratuito) · SAMU 192 · Central de Atendimento à Mulher 180 · Polícia 190 · sua maternidade ou UBS · sua psicóloga.' },
        tx('ubs', 'Minha UBS / maternidade / médico(a) de referência')]
    }
  ]);
  LISTA.forEach(function (x) { x.ab = 'quest'; });
  window.ATIVIDADES = (window.ATIVIDADES || []).concat(LISTA);
})();
