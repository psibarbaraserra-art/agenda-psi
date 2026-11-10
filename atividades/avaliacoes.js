/*
 * Avaliações (escalas de rastreio de uso livre) · Psi Bárbara Serra (CRP 20/13.134)
 *
 * Cada avaliação é uma "atividade" com ab: 'aval', campos do tipo 'likert' (guardam o número
 * da resposta) e uma função "calc" que devolve a correção automática.
 *
 * IMPORTANTE: são instrumentos de RASTREIO, de uso livre, que não substituem a avaliação
 * psicológica nem são testes psicológicos do SATEPSI. Os textos dos itens seguem as versões
 * brasileiras citadas em cada uma; confira com o artigo original antes do uso clínico.
 */
(function () {
  var LISTA_TDAH;
  window.ABORDAGENS = window.ABORDAGENS || {};
  window.ABORDAGENS.aval = { nome: 'Rastreio', longo: 'Rastreios (escalas)' };

  var CRISE = 'Se você está pensando em se machucar, não espere a sessão: ligue 188 (CVV, 24h, gratuito), 192 (SAMU) ou procure o pronto-socorro.';
  function itens(lista, o, extra) {
    return lista.map(function (txt, i) {
      var f = { t: 'likert', id: 'i' + (i + 1), n: i + 1, l: txt, o: o };
      if (extra && extra[i + 1]) for (var k in extra[i + 1]) f[k] = extra[i + 1][k];
      return f;
    });
  }
  function soma(a, ids) { var s = 0, falta = 0; ids.forEach(function (id) { var v = a[id]; if (typeof v === 'number') s += v; else falta++; }); return { s: s, falta: falta }; }
  function ids(n) { var r = []; for (var i = 1; i <= n; i++) r.push('i' + i); return r; }
  function faixa(v, cortes) { for (var i = 0; i < cortes.length; i++) if (v <= cortes[i][0]) return { nome: cortes[i][1], nivel: i }; return { nome: cortes[cortes.length - 1][1], nivel: cortes.length - 1 }; }

  var FREQ2 = [{ v: 0, l: 'Nenhuma vez' }, { v: 1, l: 'Vários dias' }, { v: 2, l: 'Mais da metade dos dias' }, { v: 3, l: 'Quase todos os dias' }];
  var DIFIC = { t: 'radio', id: 'dific', l: 'Se você marcou algum problema, quanta dificuldade ele causou para trabalhar, cuidar das coisas de casa ou se relacionar com as pessoas?', o: ['Nenhuma dificuldade', 'Alguma dificuldade', 'Muita dificuldade', 'Extrema dificuldade'] };

  var LISTA = [
    {
      id: 'phq9', sigla: 'PHQ-9', nome: 'PHQ-9 · Sintomas depressivos', min: 5, dem: ['Depressão'],
      obj: 'Rastreio e acompanhamento da intensidade de sintomas depressivos nas últimas 2 semanas.',
      licenca: 'Uso livre (domínio público, sem necessidade de autorização).',
      ref: 'Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9. J Gen Intern Med, 16(9), 606-613. Versão brasileira: Santos, I. S. et al. (2013). Sensibilidade e especificidade do PHQ-9 entre adultos da população geral. Cad. Saúde Pública, 29(8), 1533-1543.',
      intro: 'Durante as últimas 2 semanas, com que frequência você foi incomodada(o) por algum dos problemas abaixo? Marque uma resposta em cada item. Responda pensando em como você realmente se sentiu.',
      f: itens([
        'Pouco interesse ou pouco prazer em fazer as coisas',
        'Se sentir "para baixo", deprimida(o) ou sem perspectiva',
        'Dificuldade para pegar no sono ou permanecer dormindo, ou dormir mais do que de costume',
        'Se sentir cansada(o) ou com pouca energia',
        'Falta de apetite ou comendo demais',
        'Se sentir mal consigo mesma(o), ou achar que você é um fracasso ou que decepcionou sua família ou você mesma(o)',
        'Dificuldade para se concentrar nas coisas, como ler o jornal ou ver televisão',
        'Lentidão para se movimentar ou falar, a ponto de outras pessoas perceberem. Ou o oposto: estar tão agitada(o) ou inquieta(o) que você fica andando de um lado para o outro muito mais do que de costume',
        'Pensar em se ferir de alguma maneira ou que seria melhor estar morta(o)'
      ], FREQ2, { 9: { alerta: 1, msg: CRISE } }).concat([DIFIC]),
      calc: function (a) {
        var r = soma(a, ids(9)), fx = faixa(r.s, [[4, 'Mínimo'], [9, 'Leve'], [14, 'Moderado'], [19, 'Moderadamente grave'], [27, 'Grave']]);
        var al = [];
        if (a.i9 > 0) al.push('Item 9 (pensamentos de morte ou de se ferir) pontuado: ' + a.i9 + '. Avaliar risco de suicídio com prioridade.');
        return { falta: r.falta, linhas: [{ nome: 'Escore total', v: r.s, max: 27, faixa: fx.nome, nivel: fx.nivel }], alertas: al,
          nota: 'Faixas: 0-4 mínimo, 5-9 leve, 10-14 moderado, 15-19 moderadamente grave, 20-27 grave. Ponto de corte ≥ 10 (Kroenke, 2001); na amostra brasileira de Santos et al. (2013), ≥ 9.' + (a.dific ? ' Prejuízo funcional relatado: ' + a.dific + '.' : '') };
      }
    },
    {
      id: 'gad7', sigla: 'GAD-7', nome: 'GAD-7 · Ansiedade generalizada', min: 4, dem: ['Ansiedade', 'Estresse'],
      obj: 'Rastreio e acompanhamento da intensidade de sintomas de ansiedade nas últimas 2 semanas.',
      licenca: 'Uso livre (domínio público, sem necessidade de autorização).',
      ref: 'Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med, 166(10), 1092-1097. Versão brasileira: Moreno, A. L. et al. (2016). Factor structure, reliability, and item parameters of the Brazilian-Portuguese version of the GAD-7 questionnaire. Temas em Psicologia, 24(1), 367-376.',
      intro: 'Durante as últimas 2 semanas, com que frequência você foi incomodada(o) pelos problemas abaixo? Marque uma resposta em cada item.',
      f: itens([
        'Sentir-se nervosa(o), ansiosa(o) ou muito tensa(o)',
        'Não ser capaz de impedir ou de controlar as preocupações',
        'Preocupar-se muito com diversas coisas',
        'Dificuldade para relaxar',
        'Ficar tão agitada(o) que se torna difícil permanecer sentada(o)',
        'Ficar facilmente aborrecida(o) ou irritada(o)',
        'Sentir medo como se algo horrível fosse acontecer'
      ], FREQ2).concat([DIFIC]),
      calc: function (a) {
        var r = soma(a, ids(7)), fx = faixa(r.s, [[4, 'Mínima'], [9, 'Leve'], [14, 'Moderada'], [21, 'Grave']]);
        return { falta: r.falta, linhas: [{ nome: 'Escore total', v: r.s, max: 21, faixa: fx.nome, nivel: [0, 1, 2, 4][fx.nivel] }], alertas: [],
          nota: 'Faixas: 0-4 mínima, 5-9 leve, 10-14 moderada, 15-21 grave. Ponto de corte ≥ 10 para provável transtorno de ansiedade generalizada.' + (a.dific ? ' Prejuízo funcional relatado: ' + a.dific + '.' : '') };
      }
    },
    {
      id: 'dass21', sigla: 'DASS-21', nome: 'DASS-21 · Depressão, ansiedade e estresse', min: 8, dem: ['Depressão', 'Ansiedade', 'Estresse'],
      obj: 'Avalia, em três subescalas, sintomas de depressão, ansiedade e estresse na última semana.',
      licenca: 'Uso livre (domínio público; os autores permitem copiar sem autorização).',
      ref: 'Lovibond, S. H., & Lovibond, P. F. (1995). Manual for the Depression Anxiety Stress Scales. Psychology Foundation. Versão brasileira (EDAE-21): Vignola, R. C. B., & Tucci, A. M. (2014). Adaptation and validation of the depression, anxiety and stress scale (DASS) to Brazilian Portuguese. J Affect Disord, 155, 104-109.',
      intro: 'Leia cada afirmação e marque o quanto ela se aplicou a você durante a última semana. Não há respostas certas ou erradas. Não gaste muito tempo em nenhuma afirmação.',
      f: itens([
        'Achei difícil me acalmar',
        'Senti minha boca seca',
        'Não consegui vivenciar nenhum sentimento positivo',
        'Tive dificuldade em respirar em alguns momentos (ex.: respiração ofegante, falta de ar, sem ter feito nenhum esforço físico)',
        'Achei difícil ter iniciativa para fazer as coisas',
        'Tive a tendência de reagir de forma exagerada às situações',
        'Senti tremores (ex.: nas mãos)',
        'Senti que estava sempre nervosa(o)',
        'Preocupei-me com situações em que eu pudesse entrar em pânico e parecesse ridícula(o)',
        'Senti que não tinha nada a desejar',
        'Senti-me agitada(o)',
        'Achei difícil relaxar',
        'Senti-me depressiva(o) e sem ânimo',
        'Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo',
        'Senti que ia entrar em pânico',
        'Não consegui me entusiasmar com nada',
        'Senti que não tinha valor como pessoa',
        'Senti que estava um pouco emotiva(o) / sensível demais',
        'Percebi meu coração alterado mesmo sem ter feito nenhum esforço físico (ex.: aumento da frequência cardíaca, batimentos irregulares)',
        'Senti medo sem motivo',
        'Senti que a vida não tinha sentido'
      ], [{ v: 0, l: 'Não se aplicou de maneira alguma' }, { v: 1, l: 'Aplicou-se em algum grau, ou por pouco tempo' }, { v: 2, l: 'Aplicou-se em grau considerável, ou por boa parte do tempo' }, { v: 3, l: 'Aplicou-se muito, ou na maior parte do tempo' }], { 21: { alerta: 2, msg: CRISE } }),
      calc: function (a) {
        var sub = function (nums) { return soma(a, nums.map(function (n) { return 'i' + n; })); };
        var d = sub([3, 5, 10, 13, 16, 17, 21]), an = sub([2, 4, 7, 9, 15, 19, 20]), e = sub([1, 6, 8, 11, 12, 14, 18]);
        var N = ['Normal', 'Leve', 'Moderada', 'Grave', 'Extremamente grave'];
        var fx = function (v, c) { return faixa(v, c.map(function (x, i) { return [x, N[i]]; })); };
        var L = [
          ['Depressão', d.s * 2, [9, 13, 20, 27, 42]],
          ['Ansiedade', an.s * 2, [7, 9, 14, 19, 42]],
          ['Estresse', e.s * 2, [14, 18, 25, 33, 42]]
        ].map(function (x) { var f = fx(x[1], x[2]); return { nome: x[0], v: x[1], max: 42, faixa: f.nome, nivel: f.nivel }; });
        var al = []; if (a.i21 >= 2) al.push('Item 21 ("a vida não tinha sentido") com pontuação ' + a.i21 + '. Investigar desesperança e risco.');
        return { falta: d.falta + an.falta + e.falta, linhas: L, alertas: al,
          nota: 'Cada subescala é somada e multiplicada por 2 (equivalência com a DASS-42). Faixas (Lovibond & Lovibond, 1995): Depressão 0-9 normal, 10-13 leve, 14-20 moderada, 21-27 grave, 28+ extremamente grave; Ansiedade 0-7, 8-9, 10-14, 15-19, 20+; Estresse 0-14, 15-18, 19-25, 26-33, 34+.' };
      }
    },
    {
      id: 'who5', sigla: 'WHO-5', nome: 'WHO-5 · Índice de bem-estar', min: 3, dem: ['Depressão', 'Estresse', 'Autoconhecimento'],
      obj: 'Mede o bem-estar emocional nas últimas 2 semanas; útil também para acompanhar a evolução.',
      licenca: 'Uso livre, citando a fonte (Organização Mundial da Saúde / Psychiatric Research Unit).',
      ref: 'Topp, C. W., Østergaard, S. D., Søndergaard, S., & Bech, P. (2015). The WHO-5 Well-Being Index: a systematic review of the literature. Psychother Psychosom, 84(3), 167-176. Versão brasileira: de Souza, C. M., & Hidalgo, M. P. L. (2012). World Health Organization 5-item well-being index: validation of the Brazilian Portuguese version. Eur Arch Psychiatry Clin Neurosci, 262(3), 239-244.',
      intro: 'Para cada afirmação, marque a opção que mais se aproxima de como você se sentiu nas últimas 2 semanas.',
      f: itens([
        'Eu me senti alegre e bem-disposta(o)',
        'Eu me senti calma(o) e tranquila(o)',
        'Eu me senti ativa(o) e com energia',
        'Eu acordei me sentindo descansada(o) e revigorada(o)',
        'Meu dia a dia tem sido preenchido com coisas que me interessam'
      ], [{ v: 5, l: 'Todo o tempo' }, { v: 4, l: 'A maior parte do tempo' }, { v: 3, l: 'Mais da metade do tempo' }, { v: 2, l: 'Menos da metade do tempo' }, { v: 1, l: 'Algumas vezes' }, { v: 0, l: 'Em nenhum momento' }]),
      calc: function (a) {
        var r = soma(a, ids(5)), p = r.s * 4;
        var fx = p <= 28 ? { nome: 'Bem-estar muito baixo (indicativo de depressão)', nivel: 4 } : p <= 50 ? { nome: 'Bem-estar reduzido', nivel: 2 } : { nome: 'Bem-estar preservado', nivel: 0 };
        return { falta: r.falta, linhas: [{ nome: 'Índice (0-100)', v: p, max: 100, faixa: fx.nome, nivel: fx.nivel }, { nome: 'Escore bruto', v: r.s, max: 25 }], alertas: [],
          nota: 'Escore bruto (0-25) × 4 = índice de 0 a 100. ≤ 50 sugere bem-estar reduzido e recomenda rastrear depressão; ≤ 28 é indicativo de depressão. Mudança de 10 pontos é clinicamente relevante.' };
      }
    },
    {
      id: 'srq20', sigla: 'SRQ-20', nome: 'SRQ-20 · Sofrimento mental (transtornos mentais comuns)', min: 5, dem: ['Ansiedade', 'Depressão', 'Estresse'],
      obj: 'Rastreio de transtornos mentais comuns (sintomas ansiosos, depressivos e somáticos) nos últimos 30 dias.',
      licenca: 'Uso livre (instrumento da Organização Mundial da Saúde).',
      ref: 'Harding, T. W. et al. (1980). Mental disorders in primary health care. Psychol Med, 10, 231-241. Versão brasileira: Mari, J. J., & Williams, P. (1986). A validity study of a psychiatric screening questionnaire (SRQ-20) in primary care in the city of São Paulo. Br J Psychiatry, 148, 23-26; Gonçalves, D. M., Stein, A. T., & Kapczinski, F. (2008). Avaliação de desempenho do SRQ-20. Cad. Saúde Pública, 24(2), 380-390.',
      intro: 'As perguntas abaixo são sobre como você tem se sentido nos últimos 30 dias. Responda sim ou não para cada uma.',
      f: itens([
        'Você tem dores de cabeça frequentes?',
        'Tem falta de apetite?',
        'Dorme mal?',
        'Assusta-se com facilidade?',
        'Tem tremores nas mãos?',
        'Sente-se nervosa(o), tensa(o) ou preocupada(o)?',
        'Tem má digestão?',
        'Tem dificuldade de pensar com clareza?',
        'Tem se sentido triste ultimamente?',
        'Tem chorado mais do que de costume?',
        'Encontra dificuldade para realizar com satisfação suas atividades diárias?',
        'Tem dificuldade para tomar decisões?',
        'Tem dificuldade no trabalho (seu trabalho é penoso, causa sofrimento)?',
        'É incapaz de desempenhar um papel útil em sua vida?',
        'Tem perdido o interesse pelas coisas?',
        'Você se sente uma pessoa inútil, sem préstimo?',
        'Tem tido ideias de acabar com a vida?',
        'Sente-se cansada(o) o tempo todo?',
        'Você se cansa com facilidade?',
        'Tem sensações desagradáveis no estômago?'
      ], [{ v: 1, l: 'Sim' }, { v: 0, l: 'Não' }], { 17: { alerta: 1, msg: CRISE } }),
      calc: function (a) {
        var r = soma(a, ids(20));
        var fx = r.s >= 8 ? { nome: 'Positivo para sofrimento mental (≥ 8)', nivel: 3 } : r.s === 7 ? { nome: 'Limítrofe (7)', nivel: 2 } : { nome: 'Abaixo do ponto de corte', nivel: 0 };
        var al = []; if (a.i17 === 1) al.push('Item 17 (ideias de acabar com a vida) respondido SIM. Avaliar risco de suicídio com prioridade.');
        return { falta: r.falta, linhas: [{ nome: 'Total de respostas "sim"', v: r.s, max: 20, faixa: fx.nome, nivel: fx.nivel }], alertas: al,
          nota: 'Cada "sim" vale 1 ponto. Ponto de corte usual no Brasil: 7/8 (Mari & Williams, 1986; Gonçalves et al., 2008). Alguns estudos usam cortes diferentes por sexo; interprete junto com a entrevista.' };
      }
    },
    {
      id: 'audit', sigla: 'AUDIT', nome: 'AUDIT · Uso de álcool', min: 4, dem: ['Impulsividade', 'Estresse'],
      obj: 'Identifica padrões de uso de álcool de risco, nocivo ou com possível dependência, nos últimos 12 meses.',
      licenca: 'Uso livre (Organização Mundial da Saúde).',
      ref: 'Babor, T. F., Higgins-Biddle, J. C., Saunders, J. B., & Monteiro, M. G. (2001). AUDIT: The Alcohol Use Disorders Identification Test (2. ed.). OMS. Versão brasileira: Lima, C. T. et al. (2005). Concurrent and construct validity of the AUDIT in an urban Brazilian sample. Alcohol Alcohol, 40(6), 584-589.',
      intro: 'As perguntas são sobre o seu consumo de bebidas alcoólicas nos últimos 12 meses. Uma "dose" equivale a uma lata de cerveja (350 ml), uma taça de vinho (140 ml) ou uma dose de destilado (40 ml). Responda com sinceridade: suas respostas são sigilosas.',
      f: [].concat(
        itens(['Com que frequência você toma bebidas que contêm álcool?'], [{ v: 0, l: 'Nunca' }, { v: 1, l: 'Uma vez por mês ou menos' }, { v: 2, l: '2 a 4 vezes por mês' }, { v: 3, l: '2 a 3 vezes por semana' }, { v: 4, l: '4 ou mais vezes por semana' }]),
        [{ t: 'likert', id: 'i2', n: 2, l: 'Quantas doses de álcool você toma em um dia típico em que está bebendo?', o: [{ v: 0, l: '1 ou 2' }, { v: 1, l: '3 ou 4' }, { v: 2, l: '5 ou 6' }, { v: 3, l: '7 a 9' }, { v: 4, l: '10 ou mais' }] }]
      ).concat([
        'Com que frequência você toma 6 ou mais doses em uma única ocasião?',
        'Quantas vezes, nos últimos 12 meses, você percebeu que não conseguia parar de beber depois de começar?',
        'Quantas vezes, nos últimos 12 meses, por causa da bebida, você deixou de fazer o que era esperado de você?',
        'Quantas vezes, nos últimos 12 meses, você precisou beber pela manhã para se sentir bem depois de ter bebido muito no dia anterior?',
        'Quantas vezes, nos últimos 12 meses, você se sentiu culpada(o) ou com remorso depois de beber?',
        'Quantas vezes, nos últimos 12 meses, você não conseguiu lembrar o que aconteceu na noite anterior por causa da bebida?'
      ].map(function (txt, i) { return { t: 'likert', id: 'i' + (i + 3), n: i + 3, l: txt, o: [{ v: 0, l: 'Nunca' }, { v: 1, l: 'Menos de uma vez por mês' }, { v: 2, l: 'Mensalmente' }, { v: 3, l: 'Semanalmente' }, { v: 4, l: 'Todos ou quase todos os dias' }] }; }))
        .concat([
          'Você ou outra pessoa já se machucou por causa da sua bebida?',
          'Algum parente, amigo, médico ou outro profissional de saúde já se preocupou com o seu jeito de beber ou sugeriu que você diminuísse?'
        ].map(function (txt, i) { return { t: 'likert', id: 'i' + (i + 9), n: i + 9, l: txt, o: [{ v: 0, l: 'Não' }, { v: 2, l: 'Sim, mas não nos últimos 12 meses' }, { v: 4, l: 'Sim, nos últimos 12 meses' }] }; })),
      calc: function (a) {
        var r = soma(a, ids(10)), c = soma(a, ['i1', 'i2', 'i3']);
        var fx = faixa(r.s, [[7, 'Zona I · baixo risco (educação sobre álcool)'], [15, 'Zona II · uso de risco (orientação breve)'], [19, 'Zona III · uso nocivo (orientação e acompanhamento)'], [40, 'Zona IV · possível dependência (encaminhar para avaliação especializada)']]);
        var nv = [0, 2, 3, 4][fx.nivel];
        return { falta: r.falta, linhas: [{ nome: 'Escore total', v: r.s, max: 40, faixa: fx.nome, nivel: nv }, { nome: 'AUDIT-C (itens 1 a 3)', v: c.s, max: 12 }], alertas: [],
          nota: 'Zonas de risco da OMS (Babor et al., 2001): 0-7, 8-15, 16-19, 20-40. Pontuação de 1 ou mais nos itens 4 a 6 sugere sinais de dependência; nos itens 7 a 10, danos relacionados ao álcool.' };
      }
    },
    {
      id: 'rosenberg', sigla: 'EAR', nome: 'Escala de Autoestima de Rosenberg', min: 3, dem: ['Autoestima', 'Autoconhecimento'],
      obj: 'Avalia a autoestima global (o quanto a pessoa se valoriza e se aceita).',
      licenca: 'Uso livre para fins clínicos e de pesquisa, citando a fonte.',
      ref: 'Rosenberg, M. (1965). Society and the adolescent self-image. Princeton University Press. Versão brasileira: Hutz, C. S., & Zanon, C. (2011). Revisão da adaptação, validação e normatização da escala de autoestima de Rosenberg. Avaliação Psicológica, 10(1), 41-49.',
      intro: 'Leia cada frase e marque o quanto você concorda ou discorda dela, pensando em como você se sente sobre si mesma(o) de modo geral.',
      f: itens([
        'Eu sinto que sou uma pessoa de valor, no mínimo tanto quanto as outras pessoas',
        'Eu acho que eu tenho várias boas qualidades',
        'Levando tudo em conta, eu penso que eu sou um fracasso',
        'Eu acho que sou capaz de fazer as coisas tão bem quanto a maioria das pessoas',
        'Eu acho que eu não tenho muito do que me orgulhar',
        'Eu tenho uma atitude positiva com relação a mim mesma(o)',
        'No conjunto, eu estou satisfeita(o) comigo',
        'Eu gostaria de poder ter mais respeito por mim mesma(o)',
        'Às vezes eu me sinto inútil',
        'Às vezes eu acho que não presto para nada'
      ], [{ v: 1, l: 'Discordo totalmente' }, { v: 2, l: 'Discordo' }, { v: 3, l: 'Concordo' }, { v: 4, l: 'Concordo totalmente' }]),
      calc: function (a) {
        var inv = { i3: 1, i5: 1, i8: 1, i9: 1, i10: 1 }, s = 0, falta = 0;
        ids(10).forEach(function (id) { var v = a[id]; if (typeof v !== 'number') { falta++; return; } s += inv[id] ? 5 - v : v; });
        return { falta: falta, linhas: [{ nome: 'Escore total', v: s, max: 40 }], alertas: [],
          nota: 'Itens 3, 5, 8, 9 e 10 têm pontuação invertida (já corrigida). Total de 10 a 40: quanto maior, maior a autoestima. Não há ponto de corte clínico; compare com as normas de Hutz & Zanon (2011) e com a evolução do próprio paciente.' };
      }
    }
  ];


  // ---------- TDAH ----------
  var FREQ5 = [{ v: 0, l: 'Nunca' }, { v: 1, l: 'Raramente' }, { v: 2, l: 'Algumas vezes' }, { v: 3, l: 'Frequentemente' }, { v: 4, l: 'Muito frequentemente' }];
  var asrsA = [
    'Com que frequência você comete erros por falta de atenção quando tem de trabalhar num projeto chato ou difícil?',
    'Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?',
    'Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?',
    'Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?',
    'Com que frequência você tem dificuldade para fazer um trabalho que exige organização?',
    'Quando você precisa fazer algo que exige muita concentração, com que frequência você evita ou adia o início?',
    'Com que frequência você coloca as coisas fora do lugar ou tem dificuldade de encontrar as coisas em casa ou no trabalho?',
    'Com que frequência você se distrai com atividades ou barulho a sua volta?',
    'Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?'
  ];
  var asrsB = [
    'Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentada(o) por muito tempo?',
    'Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentada(o)?',
    'Com que frequência você se sente inquieta(o) ou agitada(o)?',
    'Com que frequência você tem dificuldade para sossegar e relaxar quando tem tempo livre para você?',
    'Com que frequência você se sente ativa(o) demais e necessitando fazer coisas, como se estivesse "com um motor ligado"?',
    'Com que frequência você se pega falando demais em situações sociais?',
    'Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?',
    'Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?',
    'Com que frequência você interrompe os outros quando eles estão ocupados?'
  ];
  function contar(a, de, ate, min) { var n = 0, s = 0, falta = 0; for (var i = de; i <= ate; i++) { var v = a['i' + i]; if (typeof v !== 'number') { falta++; continue; } s += v; if (v >= min) n++; } return { n: n, s: s, falta: falta }; }
  var snapItens = [
    'Não consegue prestar muita atenção a detalhes ou comete erros por descuido nos trabalhos da escola ou tarefas.',
    'Tem dificuldade de manter a atenção em tarefas ou atividades de lazer.',
    'Parece não estar ouvindo quando se fala diretamente com ela(e).',
    'Não segue instruções até o fim e não termina deveres da escola, tarefas ou obrigações.',
    'Tem dificuldade para organizar tarefas e atividades.',
    'Evita, não gosta ou não se envolve em tarefas que exigem esforço mental prolongado.',
    'Perde coisas necessárias para atividades (por exemplo: brinquedos, deveres da escola, lápis ou livros).',
    'Distrai-se com estímulos externos.',
    'É esquecida(o) em atividades do dia a dia.',
    'Mexe com as mãos ou os pés ou se remexe na cadeira.',
    'Sai do lugar na sala de aula ou em outras situações em que se espera que fique sentada(o).',
    'Corre de um lado para outro ou sobe demais nas coisas em situações em que isto é inapropriado.',
    'Tem dificuldade em brincar ou envolver-se em atividades de lazer de forma calma.',
    'Não para ou frequentemente está "a mil por hora".',
    'Fala em excesso.',
    'Responde as perguntas de forma precipitada antes de elas terem sido terminadas.',
    'Tem dificuldade de esperar sua vez.',
    'Interrompe os outros ou se intromete (por exemplo: mete-se nas conversas, jogos).',
    'Discute com adultos.',
    'Desafia ativamente ou se recusa a atender pedidos ou regras de adultos.',
    'Faz coisas de propósito que incomodam outras pessoas.',
    'Culpa os outros pelos seus erros ou mau comportamento.',
    'É irritável ou facilmente incomodada(o) pelos outros.',
    'É zangada(o) e ressentida(o).',
    'É maldosa(o) ou vingativa(o).',
    'Descontrola-se.'
  ];
  var CRIT = 'O instrumento avalia só o critério A (sintomas). Para o diagnóstico também são necessários: início antes dos 12 anos (B), prejuízo em 2 ou mais contextos (C), prejuízo evidente (D) e sintomas não explicados exclusivamente por outro transtorno (E).';
  LISTA_TDAH = [
    {
      id: 'asrs18', sigla: 'ASRS-18', nome: 'ASRS-18 · TDAH em adultos (autorrelato)', min: 6, dem: ['Autoconhecimento', 'Impulsividade'],
      obj: 'Rastreio de sintomas de desatenção e de hiperatividade-impulsividade em adultos, nos últimos 6 meses.',
      licenca: 'Uso livre (Organização Mundial da Saúde).',
      ref: 'Kessler, R. C. et al. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS). Psychol Med, 35(2), 245-256. Versão brasileira: Mattos, P., Segenreich, D., Saboya, E., Louzã, M., Dias, G., & Romano, M. (2006). Adaptação transcultural para o português da escala Adult Self-Report Scale para avaliação do TDAH em adultos. Rev. Psiq. Clín., 33(4), 188-194.',
      intro: 'Responda cada pergunta marcando a opção que melhor descreve como você se sentiu e se comportou nos últimos 6 meses.',
      f: [{ t: 'h', x: 'Parte A' }].concat(asrsA.map(function (txt, i) { return { t: 'likert', id: 'i' + (i + 1), n: 'A' + (i + 1), l: txt, o: FREQ5 }; }))
        .concat([{ t: 'h', x: 'Parte B' }]).concat(asrsB.map(function (txt, i) { return { t: 'likert', id: 'i' + (i + 10), n: 'B' + (i + 1), l: txt, o: FREQ5 }; })),
      calc: function (a) {
        var A = contar(a, 1, 9, 3), B = contar(a, 10, 18, 3);
        var fx = function (x) { return x.n >= 4 ? { nome: x.n + ' de 9 itens em "frequentemente" ou mais: acima do esperado', nivel: 3 } : { nome: x.n + ' de 9 itens em "frequentemente" ou mais', nivel: 0 }; };
        var fa = fx(A), fb = fx(B);
        var tipo = A.n >= 4 && B.n >= 4 ? 'Sintomas acima do esperado nas duas partes (perfil combinado)' : A.n >= 4 ? 'Sintomas acima do esperado na desatenção' : B.n >= 4 ? 'Sintomas acima do esperado na hiperatividade-impulsividade' : 'Abaixo do critério nas duas partes';
        return { falta: A.falta + B.falta, linhas: [
          { nome: 'Parte A · Desatenção (soma)', v: A.s, max: 36, faixa: fa.nome, nivel: fa.nivel },
          { nome: 'Parte B · Hiperatividade-impulsividade (soma)', v: B.s, max: 36, faixa: fb.nome, nivel: fb.nivel },
          { nome: 'Resumo', v: A.n + B.n, max: 18, faixa: tipo, nivel: (A.n >= 4 || B.n >= 4) ? 3 : 0 }
        ], alertas: [],
          nota: 'Conta-se em cada parte quantos itens foram marcados como "frequentemente" ou "muito frequentemente". Pelo menos 4 em uma parte indica chance de TDAH (critério do material de referência, ABDA/Mattos). Para comparação, o DSM-5 exige 5 sintomas em adultos. ' + CRIT };
      }
    },
    {
      id: 'snap4', sigla: 'SNAP-IV', nome: 'SNAP-IV · TDAH em crianças e adolescentes (pais ou professores)', min: 8, dem: ['Impulsividade', 'Autoconhecimento'],
      obj: 'Rastreio de sintomas de TDAH e de transtorno desafiador de oposição, respondido por pais, responsáveis ou professores.',
      licenca: 'Uso livre (tradução validada pelo GEDA/UFRJ e pelo Serviço de Psiquiatria da Infância e Adolescência da UFRGS).',
      ref: 'Swanson, J. M., Nolan, W., & Pelham, W. E. (1992). The SNAP-IV rating scale. University of California, Irvine. Versão brasileira: Mattos, P., Serra-Pinheiro, M. A., Rohde, L. A., & Pinto, D. (2006). Apresentação de uma versão em português para uso no Brasil do instrumento MTA-SNAP-IV. Rev Psiquiatr RS, 28(3), 290-297.',
      intro: 'Este questionário deve ser respondido pela mãe, pelo pai, pela pessoa responsável ou pela professora/professor. Para cada item, marque a opção que melhor descreve o comportamento da criança ou adolescente nos últimos 6 meses. Você pode reenviar o mesmo link para a escola responder também.',
      f: [{ t: 'radio', id: 'quem', l: 'Quem está respondendo?', o: ['Mãe', 'Pai', 'Outra pessoa responsável', 'Professora / professor', 'Outra pessoa'] }]
        .concat(snapItens.map(function (txt, i) { return { t: 'likert', id: 'i' + (i + 1), n: i + 1, l: txt, o: [{ v: 0, l: 'Nem um pouco' }, { v: 1, l: 'Só um pouco' }, { v: 2, l: 'Bastante' }, { v: 3, l: 'Demais' }] }; })),
      calc: function (a) {
        var D = contar(a, 1, 9, 2), H = contar(a, 10, 18, 2), O = contar(a, 19, 26, 2);
        var l = function (nome, x, max, corte, txt) { return { nome: nome, v: x.n, max: max, faixa: x.n >= corte ? txt : 'Abaixo do ponto de corte', nivel: x.n >= corte ? 3 : 0 }; };
        return { falta: D.falta + H.falta + O.falta, linhas: [
          l('Desatenção (itens 1-9 em "bastante" ou "demais")', D, 9, 6, 'Mais sintomas de desatenção que o esperado'),
          l('Hiperatividade-impulsividade (itens 10-18)', H, 9, 6, 'Mais sintomas de hiperatividade-impulsividade que o esperado'),
          l('Oposição e desafio (itens 19-26)', O, 8, 4, 'Mais sintomas de oposição e desafio (TOD) que o esperado')
        ], alertas: [],
          nota: 'Ponto de corte: 6 ou mais itens em "bastante" ou "demais" na desatenção e/ou na hiperatividade-impulsividade; 4 ou mais nos itens de oposição. Somas brutas: desatenção ' + D.s + '/27, hiperatividade ' + H.s + '/27, oposição ' + O.s + '/24.' + (a.quem ? ' Respondido por: ' + a.quem + '.' : '') + ' ' + CRIT + ' O diagnóstico exige avaliação clínica, com informações de mais de um contexto (casa e escola).' };
      }
    },
    {
      id: 'tdah-explor', sigla: 'Tabela exploratória TDAH', nome: 'Tabela exploratória TDAH adulto', min: 4, dem: ['Autoconhecimento', 'Impulsividade'],
      obj: 'Explorar as áreas da vida em que sintomas de desatenção, inquietação e impulsividade podem estar trazendo prejuízo, para planejar o acompanhamento.',
      licenca: 'Material de apoio da psicóloga, sem valor diagnóstico.',
      ref: 'Material de apoio clínico (sem validação psicométrica). Use apenas como roteiro exploratório.',
      intro: 'Marque com que frequência cada situação acontece com você.',
      f: itens([
        'Com que frequência você tem dificuldade em se concentrar em tarefas ou atividades, como ler um livro ou assistir a um filme?',
        'Com que frequência você tem dificuldade em manter o foco em uma conversa, mesmo quando a outra pessoa está falando diretamente com você?',
        'Com que frequência você não consegue seguir instruções até o final e comete erros por descuido?',
        'Com que frequência você tem dificuldade em organizar tarefas e atividades?',
        'Com que frequência você evita ou adia tarefas que exigem um esforço mental constante, como preencher formulários ou relatórios?',
        'Com que frequência você perde coisas necessárias para tarefas ou atividades, como chaves, carteira ou celular?',
        'Com que frequência você se distrai facilmente com estímulos externos, como sons ou movimentos?',
        'Com que frequência você se sente inquieta(o) ou agitada(o), como se não pudesse ficar sentada(o) por muito tempo?',
        'Com que frequência você age impulsivamente, sem pensar nas consequências, em situações sociais ou financeiras?',
        'Com que frequência você tem dificuldade em esperar sua vez em filas ou em situações em grupo?'
      ], [{ v: 0, l: 'Nunca ou raramente' }, { v: 1, l: 'Às vezes' }, { v: 2, l: 'Frequentemente' }, { v: 3, l: 'Muito frequentemente' }]),
      calc: function (a) {
        var r = soma(a, ids(10)), alto = [];
        ids(10).forEach(function (id, i) { if (a[id] >= 2) alto.push(i + 1); });
        return { falta: r.falta, linhas: [{ nome: 'Pontuação total', v: r.s, max: 30 }], alertas: [],
          nota: 'Quanto maior a pontuação, maior a possibilidade de prejuízo. Não tem valor diagnóstico. ' + (alto.length ? 'Itens marcados como "frequentemente" ou mais (áreas a trabalhar): ' + alto.join(', ') + '.' : 'Nenhum item marcado como "frequentemente" ou mais.') };
      }
    }
  ];
  LISTA = LISTA.concat(LISTA_TDAH);
  LISTA.forEach(function (x) { x.ab = 'aval'; });
  window.ATIVIDADES = (window.ATIVIDADES || []).concat(LISTA);

  // Instrumentos conhecidos que NÃO estão no app (pagos, com licença ou ainda por incluir).
  window.AVAL_FORA = [
    { nome: 'BDI-II, BAI, BHS e BSI (Escalas Beck)', motivo: 'Pagas. Testes psicológicos com parecer favorável no SATEPSI, de uso privativo, com manual e folhas vendidos pela editora (Pearson / Casa do Psicólogo).', tipo: 'pago' },
    { nome: 'IDATE (Inventário de Ansiedade Traço-Estado)', motivo: 'Pago. Comercializado por editora no Brasil.', tipo: 'pago' },
    { nome: 'HADS (Escala Hospitalar de Ansiedade e Depressão)', motivo: 'Exige licença. Direitos com a GL Assessment; uso clínico requer licença e pagamento.', tipo: 'pago' },
    { nome: 'ISI (Índice de Gravidade da Insônia)', motivo: 'Exige licença. Distribuído pela Mapi Research Trust, com taxa conforme o uso.', tipo: 'pago' },
    { nome: 'MBI (Inventário de Burnout de Maslach)', motivo: 'Pago. Vendido pela Mind Garden.', tipo: 'pago' },
    { nome: 'SCL-90-R', motivo: 'Pago. Vendido pela Pearson.', tipo: 'pago' },
    { nome: 'PSS-10 (Escala de Estresse Percebido)', motivo: 'Uso livre para fins não comerciais, segundo o autor. Confirme as condições antes de incluir.', tipo: 'verificar' },
    { nome: 'PCL-5 (estresse pós-traumático)', motivo: 'Uso livre (Centro Nacional de TEPT dos EUA). Ainda não incluído: preciso conferir o texto da versão brasileira.', tipo: 'livre' },
    { nome: 'Escalas de Conners (versões para pais e para professores)', motivo: 'Direitos autorais da Multi-Health Systems (MHS). As traduções que circulam (Barbosa, 1995) podem exigir licença para reprodução e uso digital. Não incluí: se você tiver licença ou confirmação de uso livre, eu incluo (o conteúdo que você enviou já está pronto).', tipo: 'verificar' },
    { nome: 'EPDS (Escala de Depressão Pós-Parto de Edimburgo)', motivo: 'Uso livre, citando a fonte. Ainda não incluído: preciso conferir o texto da versão brasileira.', tipo: 'livre' }
  ];
})();
