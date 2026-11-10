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
      id: 'anam-adulto', nome: 'Anamnese adulto (investigação de TDAH)', min: 20, dem: ['Autoconhecimento', 'Impulsividade'],
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
      id: 'perg-tdah-adulto', nome: 'Perguntas sobre atenção e impulsividade (adulto)', min: 15, dem: ['Autoconhecimento', 'Impulsividade'],
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
      id: 'anam-infantil', nome: 'Anamnese infantil (para pais ou responsáveis)', min: 40, dem: ['Autoconhecimento', 'Relacionamentos'],
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
      id: 'entrev-resp', nome: 'Entrevista sobre atenção e comportamento (pais, responsáveis ou escola)', min: 15, dem: ['Impulsividade', 'Relacionamentos'],
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
  LISTA.forEach(function (x) { x.ab = 'quest'; });
  window.ATIVIDADES = (window.ATIVIDADES || []).concat(LISTA);
})();
