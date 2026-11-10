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
  var LISTA_TDAH, LISTA_TEA;
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
      id: 'phq9', grupo: 'Humor, ansiedade e bem-estar', sigla: 'PHQ-9', nome: 'PHQ-9 · Sintomas depressivos', min: 5, dem: ['Depressão'],
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
      id: 'gad7', grupo: 'Humor, ansiedade e bem-estar', sigla: 'GAD-7', nome: 'GAD-7 · Ansiedade generalizada', min: 4, dem: ['Ansiedade', 'Estresse'],
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
      id: 'dass21', grupo: 'Humor, ansiedade e bem-estar', sigla: 'DASS-21', nome: 'DASS-21 · Depressão, ansiedade e estresse', min: 8, dem: ['Depressão', 'Ansiedade', 'Estresse'],
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
      id: 'who5', grupo: 'Humor, ansiedade e bem-estar', sigla: 'WHO-5', nome: 'WHO-5 · Índice de bem-estar', min: 3, dem: ['Depressão', 'Estresse', 'Autoconhecimento'],
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
      id: 'srq20', grupo: 'Humor, ansiedade e bem-estar', sigla: 'SRQ-20', nome: 'SRQ-20 · Sofrimento mental (transtornos mentais comuns)', min: 5, dem: ['Ansiedade', 'Depressão', 'Estresse'],
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
      id: 'audit', grupo: 'Uso de álcool', sigla: 'AUDIT', nome: 'AUDIT · Uso de álcool', min: 4, dem: ['Impulsividade', 'Estresse'],
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
      id: 'rosenberg', grupo: 'Autoestima', sigla: 'EAR', nome: 'Escala de Autoestima de Rosenberg', min: 3, dem: ['Autoestima', 'Autoconhecimento'],
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
      id: 'asrs18', grupo: 'TDAH', sigla: 'ASRS-18', nome: 'ASRS-18 · TDAH em adultos (autorrelato)', min: 6, dem: ['Autoconhecimento', 'Impulsividade'],
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
      id: 'snap4', grupo: 'TDAH', sigla: 'SNAP-IV', nome: 'SNAP-IV · TDAH em crianças e adolescentes (pais ou professores)', min: 8, dem: ['Impulsividade', 'Autoconhecimento'],
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
      id: 'tdah-explor', grupo: 'TDAH', sigla: 'Tabela exploratória TDAH', nome: 'Tabela exploratória TDAH adulto', min: 4, dem: ['Autoconhecimento', 'Impulsividade'],
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

  // ---------- TEA ----------
  var AQ = ['Prefiro fazer coisas com outras pessoas do que sozinha(o).', 'Prefiro fazer as coisas sempre da mesma maneira.', 'Quando tento imaginar uma coisa, tenho muita facilidade em criar uma imagem na minha mente.', 'Com frequência fico tão absorvida(o) com uma coisa que esqueço todo o resto.', 'Frequentemente noto pequenos ruídos que outras pessoas não ouvem.', 'Costumo prestar atenção aos números das placas dos automóveis ou a outras sequências de informação do mesmo tipo.', 'As outras pessoas com frequência me dizem que falei algo indelicado, apesar de eu achar que fui delicada(o).', 'Quando leio uma história, consigo imaginar facilmente a aparência dos personagens.', 'Sou fascinada(o) por datas.', 'Quando estou em grupo, tenho facilidade em seguir várias conversas ao mesmo tempo.',
    'Tenho facilidade em compreender situações sociais.', 'Tenho tendência a notar detalhes que os outros não reparam.', 'Prefiro ir a uma biblioteca do que a uma festa.', 'Tenho facilidade em inventar histórias.', 'Tenho maior tendência a me aproximar de pessoas do que de coisas.', 'Tenho tendência a ter interesses fortes e fico incomodada(o) se não posso me dedicar a eles.', 'Gosto de bater papo.', 'Quando estou falando, as outras pessoas têm dificuldade em tomar a palavra.', 'Os números me fascinam.', 'Quando leio uma história, sinto dificuldade em entender as intenções dos personagens.',
    'Não aprecio ler livros de ficção.', 'Tenho dificuldade em fazer novos amigos.', 'Vejo constantemente padrões nas coisas que me rodeiam.', 'Prefiro ir ao teatro do que ir a um museu.', 'Não fico incomodada(o) se minha rotina diária for alterada.', 'Com frequência sinto que não sei manter uma conversa.', 'Tenho facilidade em "ler nas entrelinhas" quando falam comigo.', 'Geralmente me concentro mais no todo do que nos detalhes.', 'Não sou muito boa(bom) em lembrar números de telefone.', 'Geralmente não reparo nas pequenas mudanças de uma situação ou na aparência de uma pessoa.',
    'Consigo dizer quando a pessoa com quem estou conversando fica entediada.', 'Consigo facilmente fazer mais do que uma coisa ao mesmo tempo.', 'Quando falo no telefone, não tenho certeza de quando é a minha vez de falar.', 'Gosto de fazer as coisas de forma espontânea.', 'Com frequência sou a última (o último) a entender uma piada.', 'Tenho facilidade em entender o que uma pessoa está pensando ou sentindo apenas olhando para o seu rosto.', 'Se sou interrompida(o), consigo voltar rapidamente ao que estava fazendo.', 'Sou boa(bom) de papo.', 'Os outros frequentemente me dizem que eu insisto muito nas mesmas coisas.', 'Quando era criança, gostava de brincar de faz de conta com as outras crianças.',
    'Gosto de colecionar informação sobre categorias de coisas (por exemplo, tipos de carros, de aves, de trens, de plantas).', 'Tenho dificuldade de me imaginar na pele de outra pessoa.', 'Gosto de planejar com cuidado todas as atividades de que participo.', 'Aprecio eventos sociais.', 'Tenho dificuldade em entender as intenções das outras pessoas.', 'Situações novas me deixam ansiosa(o).', 'Gosto de conhecer pessoas novas.', 'Tenho uma postura conciliadora em situações de interação social.', 'Tenho dificuldade em lembrar o dia de aniversário dos outros.', 'Tenho muita facilidade em brincar de faz de conta com as crianças.'];
  var AQ_CONC = [2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26, 33, 35, 39, 41, 42, 43, 45, 46];
  var ATA = [
    ['Dificuldade na interação social', ['Não sorri', 'Ausência de aproximações espontâneas', 'Não busca companhia', 'Busca constantemente seu cantinho (esconderijo)', 'Evita pessoas', 'É incapaz de manter um intercâmbio social', 'Isolamento intenso']],
    ['Manipulação do ambiente', ['Não responde às solicitações', 'Mudança repentina de humor', 'Mantém-se indiferente, sem expressão', 'Risos compulsivos', 'Birra e raiva passageira', 'Excitação motora ou verbal (ir de um lugar a outro, falar sem parar)']],
    ['Utilização das pessoas ao seu redor', ['Utiliza-se do adulto como um objeto, levando-o até aquilo que deseja', 'O adulto lhe serve como apoio para conseguir o que deseja (por exemplo, como apoio para pegar a bolacha)', 'O adulto é o meio para suprir uma necessidade que não é capaz de realizar só (por exemplo, amarrar os sapatos)', 'Se o adulto não responde às suas demandas, atua interferindo na conduta desse adulto']],
    ['Resistência à mudança', ['Insistente em manter a rotina', 'Grande dificuldade em aceitar fatos que alteram sua rotina (mudanças de lugar, de vestuário, na alimentação)', 'Apresenta resistência a mudanças, persistindo na mesma resposta ou atividade']],
    ['Busca de uma ordem rígida', ['Ordenação dos objetos de acordo com critérios próprios e preestabelecidos', 'Prende-se a uma ordenação espacial (cada coisa sempre em seu lugar)', 'Prende-se a uma sequência temporal (cada coisa em seu tempo)', 'Prende-se a uma correspondência pessoa-lugar (cada pessoa sempre no lugar determinado)']],
    ['Falta de contato visual, olhar indefinido', ['Desvia os olhares diretos, não olhando nos olhos', 'Volta a cabeça ou o olhar quando é chamado (olhar para fora)', 'Expressão do olhar vazio e sem vida', 'Quando segue os estímulos com os olhos, só o faz de maneira intermitente', 'Fixa os objetos com uma olhada periférica, não central', 'Dá a sensação de que não olha']],
    ['Mímica inexpressiva', ['Se fala, não utiliza a expressão facial, gestual ou vocal com a frequência esperada', 'Não mostra uma reação antecipatória', 'Não expressa através da mímica ou do olhar aquilo que quer ou o que sente', 'Imobilidade facial']],
    ['Distúrbios de sono', ['Não quer ir dormir', 'Levanta-se muito cedo', 'Sono irregular (em intervalos)', 'Troca o dia pela noite', 'Dorme muito poucas horas']],
    ['Alteração na alimentação', ['Seletividade alimentar rígida (come sempre o mesmo tipo de alimento)', 'Come outras coisas além de alimentos (papel, insetos)', 'Quando pequeno, não mastigava', 'Apresenta uma atividade ruminante', 'Vômitos', 'Come grosseiramente, esparrama ou atira a comida', 'Rituais (esfarela os alimentos antes de comer)', 'Ausência de paladar (falta de sensibilidade gustativa)']],
    ['Dificuldade no controle dos esfíncteres', ['Medo de sentar-se no vaso sanitário', 'Utiliza os esfíncteres para manipular o adulto', 'Utiliza os esfíncteres como estimulação corporal, para obtenção de prazer', 'Tem controle diurno, porém o noturno é tardio ou ausente']],
    ['Exploração dos objetos (apalpar, chupar)', ['Morde e engole objetos não alimentares', 'Chupa e coloca as coisas na boca', 'Cheira tudo', 'Apalpa tudo; examina as superfícies com os dedos de maneira minuciosa']],
    ['Uso inapropriado dos objetos', ['Ignora os objetos ou mostra interesse momentâneo', 'Pega, golpeia ou simplesmente atira os objetos no chão', 'Conduta atípica com os objetos (segura indiferentemente nas mãos ou gira)', 'Carrega insistentemente consigo determinado objeto', 'Interessa-se somente por uma parte do objeto ou do brinquedo', 'Coleciona objetos estranhos', 'Utiliza os objetos de forma particular e inadequada']],
    ['Falta de atenção', ['Quando realiza uma atividade, fixa a atenção por curto espaço de tempo ou é incapaz de fixá-la', 'Age como se fosse surdo', 'Tempo de latência de resposta aumentado', 'Entende as instruções com dificuldade (quando não lhe interessa, não as entende)', 'Resposta retardada', 'Muitas vezes dá a sensação de ausência']],
    ['Ausência de interesse pela aprendizagem', ['Não quer aprender', 'Cansa-se muito depressa, ainda que em atividade de que goste', 'Esquece rapidamente', 'Insiste em ser ajudado, ainda que saiba fazer', 'Insiste constantemente em mudar de atividade']],
    ['Falta de iniciativa', ['É incapaz de ter iniciativa própria', 'Busca a comodidade', 'Passividade, falta de interesse', 'Lentidão', 'Prefere que outro faça o trabalho para ele']],
    ['Alteração de linguagem e comunicação', ['Mutismo', 'Estereotipias vocais', 'Entonação incorreta', 'Ecolalia imediata e/ou retardada', 'Repetição de palavras ou frases que podem ou não ter valor comunicativo', 'Emite sons estereotipados quando está agitado e em outras ocasiões, sem razão aparente', 'Não se comunica por gestos', 'As interações com adultos nunca são um diálogo']],
    ['Não manifesta habilidades e conhecimentos', ['Ainda que saiba fazer uma coisa, não a realiza se não quiser', 'Não demonstra o que sabe até que tenha uma necessidade primária ou um interesse muito específico', 'Aprende coisas, porém só as demonstra em determinados lugares e com determinadas pessoas', 'Às vezes surpreende por suas habilidades inesperadas']],
    ['Reações inapropriadas diante da frustração', ['Reações de desagrado se é esquecida alguma coisa', 'Reações de desagrado se é interrompida uma atividade de que goste', 'Desgosto quando os desejos e as expectativas não se cumprem', 'Reações de birra']],
    ['Não assume responsabilidades', ['Não assume nenhuma responsabilidade, por menor que seja', 'Para chegar a fazer alguma coisa, é preciso repetir muitas vezes ou elevar o tom de voz']],
    ['Hiperatividade / hipoatividade', ['Está constantemente em movimento', 'Mesmo estimulado, não se move', 'Barulhento; dá a sensação de que é obrigado a fazer ruído', 'Vai de um lugar a outro sem parar', 'Fica pulando (saltando) no mesmo lugar', 'Nunca se move do lugar onde está sentado']],
    ['Movimentos estereotipados e repetitivos', ['Balança-se', 'Olha e brinca com as mãos e os dedos', 'Tapa os olhos e as orelhas', 'Dá pontapés', 'Faz caretas e movimentos estranhos com a face', 'Roda objetos ou gira sobre si mesmo', 'Caminha na ponta dos pés ou saltando, arrasta os pés, anda fazendo movimentos estranhos', 'Torce o corpo, mantém postura desequilibrada, pernas dobradas, cabeça recolhida, extensões violentas do corpo']],
    ['Ignora o perigo', ['Não se dá conta do perigo', 'Sobe em todos os lugares', 'Parece insensível à dor']],
    ['Aparecimento antes dos 36 meses', ['Os comportamentos apareceram antes dos 3 anos de idade']]
  ];
  var ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII'];
  var LISTA_TEA = [
    {
      id: 'aq50', sigla: 'QA (AQ-50)', grupo: 'TEA', nome: 'Quociente do Espectro do Autismo (QA) · adultos', min: 12, dem: ['Autoconhecimento', 'Relacionamentos'],
      obj: 'Rastreio de traços do espectro autista em adultos e adolescentes a partir de 16 anos (autorrelato).',
      licenca: 'Uso livre para fins clínicos e de pesquisa, citando a fonte (Autism Research Centre, Universidade de Cambridge).',
      ref: 'Baron-Cohen, S., Wheelwright, S., Skinner, R., Martin, J., & Clubley, E. (2001). The Autism-Spectrum Quotient (AQ). J Autism Dev Disord, 31, 5-17. Versão brasileira: Osório, A., Sanchez, B., & Egito, J. (2017). Universidade Presbiteriana Mackenzie. © MRC-SBC/SJW.',
      intro: 'Leia cada afirmação com atenção e marque o quanto você concorda ou discorda dela. Não há respostas certas ou erradas.',
      f: AQ.map(function (txt, i) { return { t: 'likert', id: 'i' + (i + 1), n: i + 1, l: txt, o: [{ v: 1, l: 'Concordo totalmente' }, { v: 2, l: 'Concordo ligeiramente' }, { v: 3, l: 'Discordo ligeiramente' }, { v: 4, l: 'Discordo totalmente' }] }; }),
      calc: function (a) {
        var s = 0, falta = 0;
        for (var i = 1; i <= 50; i++) { var v = a['i' + i]; if (typeof v !== 'number') { falta++; continue; } if (AQ_CONC.indexOf(i) > -1 ? v <= 2 : v >= 3) s++; }
        var fx = s >= 32 ? { nome: 'Acima do ponto de corte (≥ 32): traços autísticos elevados', nivel: 3 } : s >= 26 ? { nome: 'Entre 26 e 31: zona de atenção em contexto clínico', nivel: 2 } : { nome: 'Abaixo dos pontos de corte', nivel: 0 };
        return { falta: falta, linhas: [{ nome: 'Escore total', v: s, max: 50, faixa: fx.nome, nivel: fx.nivel }], alertas: [],
          nota: 'Cada resposta no sentido do traço vale 1 ponto (concordar nos itens 2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26, 33, 35, 39, 41, 42, 43, 45 e 46; discordar nos demais). Ponto de corte ≥ 32 (Baron-Cohen et al., 2001); em amostras clínicas, ≥ 26 já sugere encaminhamento para avaliação (Woodbury-Smith et al., 2005). Não faz diagnóstico.' };
      }
    },
    {
      id: 'ata', sigla: 'ATA', grupo: 'TEA', nome: 'Escala de Avaliação de Traços Autísticos (ATA)', min: 15, dem: ['Relacionamentos', 'Autoconhecimento'],
      obj: 'Rastreio de traços autísticos em crianças a partir de 2 anos, em 23 áreas do comportamento. Pode ser respondida pelos responsáveis ou preenchida pela psicóloga a partir da observação e da entrevista.',
      licenca: 'Escala publicada na íntegra em periódico científico; cite a fonte.',
      ref: 'Ballabriga, M. C. J., Escudé, R. M. C., & Llaberia, E. D. (1994). Escala d\'avaluació dels trets autistes (A.T.A.). Versão brasileira: Assumpção Jr., F. B., Kuczynski, E., Gabriel, M. R., & Rocca, C. C. (1999). Escala de avaliação de traços autísticos (ATA): validade e confiabilidade de uma escala para a detecção de condutas autísticas. Arq Neuropsiquiatr, 57(1), 23-29.',
      intro: 'Para cada área, marque todos os comportamentos que a criança apresenta. Se nenhum se aplicar, deixe a área sem marcar e siga para a próxima.',
      f: [{ t: 'radio', id: 'quem', l: 'Quem está respondendo?', o: ['Mãe', 'Pai', 'Outra pessoa responsável', 'Professora / professor', 'Psicóloga (observação)', 'Outra pessoa'] }]
        .concat(ATA.map(function (x, i) { return { t: 'check', id: 's' + (i + 1), l: ROM[i] + '. ' + x[0], o: x[1] }; })),
      calc: function (a) {
        var total = 0, areas = [];
        ATA.forEach(function (x, i) { var n = (a['s' + (i + 1)] || []).length, pt = Math.min(2, n); total += pt; if (pt) areas.push(ROM[i] + ' (' + pt + ')'); });
        var fx = total >= 15 ? { nome: 'Acima do ponto de corte (≥ 15): sugere traços autísticos', nivel: 3 } : { nome: 'Abaixo do ponto de corte', nivel: 0 };
        return { falta: 0, linhas: [{ nome: 'Pontuação total', v: total, max: 45, faixa: fx.nome, nivel: fx.nivel }], alertas: [],
          nota: 'Cada área vale 0 (nenhum comportamento), 1 (um comportamento) ou 2 (dois ou mais). 15 pontos ou mais sugerem a presença de traços autísticos, mais intensos quanto maior a pontuação. Áreas pontuadas: ' + (areas.join(', ') || 'nenhuma') + '.' + (a.quem ? ' Respondido por: ' + a.quem + '.' : '') + ' Não faz diagnóstico.' };
      }
    }
  ];

  // ---------- Bipolaridade, burnout e borderline ----------
  var MDQ = [
    'você se sentiu tão bem ou tão "para cima" que outras pessoas acharam que você não estava no seu normal, ou você estava tão agitada(o) que se meteu em problemas?',
    'você ficou tão irritada(o) que gritou com as pessoas ou começou brigas ou discussões?',
    'você se sentiu muito mais autoconfiante do que de costume?',
    'você dormiu muito menos do que de costume e percebeu que não sentiu falta do sono?',
    'você falou muito mais ou mais rápido do que de costume?',
    'os pensamentos corriam pela sua cabeça ou você não conseguia desacelerar a mente?',
    'você se distraía tão facilmente com as coisas ao redor que tinha dificuldade de se concentrar ou de seguir em frente?',
    'você teve muito mais energia do que de costume?',
    'você ficou muito mais ativa(o) ou fez muito mais coisas do que de costume?',
    'você ficou muito mais sociável ou extrovertida(o) do que de costume (por exemplo, telefonou para amigos no meio da noite)?',
    'você teve muito mais interesse por sexo do que de costume?',
    'você fez coisas que não eram comuns para você ou que outras pessoas poderiam ter achado exageradas, imprudentes ou arriscadas?',
    'gastar dinheiro trouxe problemas para você ou para a sua família?'
  ];
  var CBI_F = [{ v: 100, l: 'Sempre' }, { v: 75, l: 'Frequentemente' }, { v: 50, l: 'Às vezes' }, { v: 25, l: 'Raramente' }, { v: 0, l: 'Nunca ou quase nunca' }];
  var CBI_I = [{ v: 100, l: 'Muitíssimo' }, { v: 75, l: 'Muito' }, { v: 50, l: 'Moderadamente' }, { v: 25, l: 'Pouco' }, { v: 0, l: 'Muito pouco' }];
  var CBI_R = [{ v: 0, l: 'Sempre' }, { v: 25, l: 'Frequentemente' }, { v: 50, l: 'Às vezes' }, { v: 75, l: 'Raramente' }, { v: 100, l: 'Nunca ou quase nunca' }];
  var lk = function (id, n, l, o, opc) { return { t: 'likert', id: id, n: n, l: l, o: o, opc: !!opc }; };
  function media(a, ids) { var s = 0, n = 0, falta = 0; ids.forEach(function (id) { var v = a[id]; if (typeof v === 'number') { s += v; n++; } else falta++; }); return { m: n ? Math.round(s / n) : 0, falta: falta, n: n }; }
  function fxCbi(m) { return m >= 100 ? { nome: 'Burnout severo', nivel: 4 } : m >= 75 ? { nome: 'Burnout alto', nivel: 3 } : m >= 50 ? { nome: 'Burnout moderado', nivel: 2 } : { nome: 'Baixo', nivel: 0 }; }
  var CRISE2 = 'Se você está pensando em se machucar, não espere a sessão: ligue 188 (CVV, 24h, gratuito), 192 (SAMU) ou procure o pronto-socorro.';
  var LISTA_NOVOS = [
    {
      id: 'mdq', sigla: 'MDQ', grupo: 'Bipolaridade', nome: 'MDQ · Questionário de Transtornos do Humor (bipolaridade)', min: 5, dem: ['Regulação emocional', 'Impulsividade'],
      obj: 'Rastreio de sintomas de mania ou hipomania ao longo da vida, para investigar transtorno bipolar.',
      licenca: 'Distribuído gratuitamente pelo autor para uso clínico, com a nota "Permissão de uso concedida por R. M. A. Hirschfeld". Não é vendido por editora.',
      ref: 'Hirschfeld, R. M. A. et al. (2000). Development and validation of a screening instrument for bipolar spectrum disorder: the Mood Disorder Questionnaire. Am J Psychiatry, 157(11), 1873-1875. Versão brasileira: Castelo, M. S. et al. (2010). Validity of the Mood Disorder Questionnaire in a Brazilian psychiatric population. Rev Bras Psiquiatr, 32(4), 424-428. Permissão de uso concedida por R. M. A. Hirschfeld.',
      intro: 'Pense em toda a sua vida, não só no momento atual. Responda sim ou não para cada pergunta: "Já houve algum período em que você não estava no seu normal e…"',
      f: MDQ.map(function (txt, i) { return lk('i' + (i + 1), i + 1, 'Já houve um período em que ' + txt, [{ v: 1, l: 'Sim' }, { v: 0, l: 'Não' }]); }).concat([
        lk('p2', 14, 'Se você respondeu "sim" a mais de uma pergunta: várias dessas coisas aconteceram no mesmo período de tempo?', [{ v: 1, l: 'Sim' }, { v: 0, l: 'Não' }]),
        lk('p3', 15, 'Quanto problema essas situações causaram para você (por exemplo, não conseguir trabalhar, problemas na família, com dinheiro ou com a lei, discussões ou brigas)?', [{ v: 0, l: 'Nenhum problema' }, { v: 1, l: 'Problema pequeno' }, { v: 2, l: 'Problema moderado' }, { v: 3, l: 'Problema grave' }]),
        { t: 'radio', id: 'fam', l: 'Algum parente de sangue (filhos, irmãos, pais, avós, tios) tem transtorno bipolar ou "psicose maníaco-depressiva"?', o: ['Sim', 'Não', 'Não sei'] },
        { t: 'radio', id: 'diag', l: 'Algum profissional de saúde já disse que você tem transtorno bipolar ou "psicose maníaco-depressiva"?', o: ['Sim', 'Não'] }
      ]),
      calc: function (a) {
        var r = soma(a, ids(13)), p2 = a.p2 === 1, p3 = typeof a.p3 === 'number' && a.p3 >= 2;
        var pos = r.s >= 7 && p2 && p3;
        var falta = r.falta + (typeof a.p2 === 'number' ? 0 : 1) + (typeof a.p3 === 'number' ? 0 : 1);
        return { falta: falta, linhas: [
          { nome: 'Parte 1 · sintomas (respostas "sim")', v: r.s, max: 13, faixa: r.s >= 7 ? '7 ou mais' : 'Menos de 7', nivel: r.s >= 7 ? 2 : 0 },
          { nome: 'Resultado do rastreio', v: pos ? 1 : 0, max: 1, faixa: pos ? 'POSITIVO: investigar transtorno bipolar' : 'Negativo pelos critérios do MDQ', nivel: pos ? 3 : 0 }
        ], alertas: [],
          nota: 'Positivo quando há 7 ou mais "sim" na parte 1, os sintomas ocorreram no mesmo período (parte 2) e causaram problema moderado ou grave (parte 3) (Hirschfeld et al., 2000). Mesmo com resultado negativo, um número alto de sintomas merece investigação. Histórico familiar: ' + (a.fam || 'não respondido') + '. Diagnóstico anterior: ' + (a.diag || 'não respondido') + '. Encaminhar para avaliação psiquiátrica quando positivo.' };
      }
    },
    {
      id: 'cbi', sigla: 'CBI', grupo: 'Burnout', nome: 'CBI · Inventário de Burnout de Copenhague', min: 6, dem: ['Estresse', 'Depressão'],
      obj: 'Avalia o burnout em três dimensões: pessoal, relacionado ao trabalho e relacionado às pessoas atendidas (clientes, pacientes, alunos).',
      licenca: 'Uso livre (domínio público).',
      ref: 'Kristensen, T. S., Borritz, M., Villadsen, E., & Christensen, K. B. (2005). The Copenhagen Burnout Inventory: a new tool for the assessment of burnout. Work & Stress, 19(3), 192-207. Validação brasileira com profissionais de saúde: estudo publicado em 2023 (PMC10416248).',
      intro: 'Responda pensando nas últimas semanas. Não há respostas certas ou erradas.',
      f: [{ t: 'h', x: 'Parte 1 · Burnout pessoal' },
        lk('p1', 1, 'Com que frequência você se sente cansada(o)?', CBI_F), lk('p2', 2, 'Com que frequência você se sente fisicamente esgotada(o)?', CBI_F), lk('p3', 3, 'Com que frequência você se sente emocionalmente esgotada(o)?', CBI_F),
        lk('p4', 4, 'Com que frequência você pensa: "Não aguento mais"?', CBI_F), lk('p5', 5, 'Com que frequência você se sente desgastada(o)?', CBI_F), lk('p6', 6, 'Com que frequência você se sente fraca(o) e sujeita(o) a ficar doente?', CBI_F),
        { t: 'h', x: 'Parte 2 · Burnout relacionado ao trabalho' },
        lk('t1', 7, 'O seu trabalho é emocionalmente desgastante?', CBI_I), lk('t2', 8, 'Você se sente esgotada(o) por causa do seu trabalho?', CBI_I), lk('t3', 9, 'O seu trabalho deixa você frustrada(o)?', CBI_I),
        lk('t4', 10, 'Você se sente desgastada(o) no fim do dia de trabalho?', CBI_F), lk('t5', 11, 'Você se sente exausta(o) de manhã só de pensar em mais um dia de trabalho?', CBI_F),
        lk('t6', 12, 'Você sente que cada hora de trabalho é cansativa para você?', CBI_F), lk('t7', 13, 'Você tem energia suficiente para a família e os amigos no tempo livre?', CBI_R),
        { t: 'h', x: 'Parte 3 · Burnout relacionado às pessoas que você atende' },
        { t: 'radio', id: 'atende', l: 'No seu trabalho você atende pessoas (clientes, pacientes, alunos, usuários)?', o: ['Sim', 'Não'] },
        { t: 'p', x: 'Se você respondeu "não", pode pular as perguntas abaixo.' },
        lk('c1', 14, 'Você acha difícil trabalhar com as pessoas que atende?', CBI_I, true), lk('c2', 15, 'Você acha frustrante trabalhar com as pessoas que atende?', CBI_I, true),
        lk('c3', 16, 'Trabalhar com as pessoas que atende esgota a sua energia?', CBI_I, true), lk('c4', 17, 'Você sente que dá mais do que recebe quando trabalha com as pessoas que atende?', CBI_I, true),
        lk('c5', 18, 'Com que frequência você se sente cansada(o) de trabalhar com as pessoas que atende?', CBI_F, true), lk('c6', 19, 'Com que frequência você se pergunta por quanto tempo ainda vai conseguir continuar trabalhando com as pessoas que atende?', CBI_F, true)
      ],
      calc: function (a) {
        var P = media(a, ['p1', 'p2', 'p3', 'p4', 'p5', 'p6']), T = media(a, ['t1', 't2', 't3', 't4', 't5', 't6', 't7']);
        var temC = a.atende !== 'Não', C = media(a, ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);
        var L = [P, T].map(function (x, i) { var f = fxCbi(x.m); return { nome: ['Burnout pessoal', 'Burnout relacionado ao trabalho'][i], v: x.m, max: 100, faixa: f.nome, nivel: f.nivel }; });
        if (temC && C.n) { var fc = fxCbi(C.m); L.push({ nome: 'Burnout relacionado às pessoas atendidas', v: C.m, max: 100, faixa: fc.nome, nivel: fc.nivel }); }
        return { falta: P.falta + T.falta + (temC && C.n ? C.falta : 0), linhas: L, alertas: [],
          nota: 'Cada resposta vale de 0 a 100 (o item 13 é invertido) e cada dimensão é a média dos seus itens. Faixas (Borritz & Kristensen): abaixo de 50 baixo, 50-74 moderado, 75-99 alto, 100 severo. Média de 50 ou mais é considerada nível elevado de burnout. Não faz diagnóstico.' };
      }
    },
    {
      id: 'msi-bpd', sigla: 'MSI-BPD', grupo: 'Borderline (TPB)', nome: 'MSI-BPD · Rastreio do transtorno de personalidade borderline', min: 3, dem: ['Regulação emocional', 'Impulsividade', 'Relacionamentos', 'Crise'],
      obj: 'Rastreio breve de traços do transtorno de personalidade borderline (critérios do DSM).',
      licenca: 'Instrumento publicado em periódico científico; versão brasileira publicada em acesso aberto (2024). Cite a fonte.',
      ref: 'Zanarini, M. C. et al. (2003). A screening measure for BPD: the McLean Screening Instrument for Borderline Personality Disorder (MSI-BPD). J Pers Disord, 17(6), 568-573. Versão brasileira: Dias, D. S., & Natividade, J. C. (2024). Brazilian adaptation of the McLean Screening Instrument for Borderline Personality Disorder. Trends Psychiatry Psychother. DOI 10.47626/2237-6089-2022-0486.',
      intro: 'Responda sim ou não pensando em como você tem sido na maior parte da sua vida adulta, e não só nas últimas semanas.',
      f: [
        'Algum dos seus relacionamentos mais próximos foi marcado por muitas brigas ou por términos repetidos?',
        'Você já se machucou de propósito (por exemplo, se bateu, se cortou ou se queimou)? Ou já tentou suicídio?',
        'Você já teve pelo menos dois outros problemas de impulsividade (por exemplo, comer compulsivamente e gastar demais, ou beber demais e ter explosões verbais)?',
        'Você tem sido extremamente instável de humor?',
        'Você tem sentido muita raiva na maior parte do tempo? Ou agido com frequência de forma raivosa ou sarcástica?',
        'Você tem desconfiado das outras pessoas com frequência?',
        'Você tem se sentido com frequência irreal, ou como se as coisas ao seu redor não fossem reais?',
        'Você tem se sentido vazia(o) de forma constante?',
        'Você tem sentido com frequência que não sabe quem é, ou que não tem identidade?',
        'Você tem feito esforços desesperados para não se sentir abandonada(o) ou para não ser abandonada(o) (por exemplo, ligar várias vezes para ter certeza de que a pessoa ainda se importa, implorar para que não vá embora, agarrar-se a ela)?'
      ].map(function (txt, i) { var f = lk('i' + (i + 1), i + 1, txt, [{ v: 1, l: 'Sim' }, { v: 0, l: 'Não' }]); if (i === 1) { f.alerta = 1; f.msg = CRISE2; } return f; }),
      calc: function (a) {
        var r = soma(a, ids(10)), al = [];
        if (a.i2 === 1) al.push('Item 2 (autolesão ou tentativa de suicídio) respondido SIM. Avaliar risco e plano de segurança com prioridade.');
        var fx = r.s >= 7 ? { nome: 'Positivo (≥ 7): investigar TPB', nivel: 3 } : { nome: 'Abaixo do ponto de corte', nivel: 0 };
        return { falta: r.falta, linhas: [{ nome: 'Total de respostas "sim"', v: r.s, max: 10, faixa: fx.nome, nivel: fx.nivel }], alertas: al,
          nota: 'Ponto de corte ≥ 7 (Zanarini et al., 2003). Rastreio não faz diagnóstico de transtorno de personalidade: confirme com entrevista clínica (por exemplo, SCID-5-PD).' };
      }
    }
  ];
  LISTA = LISTA.concat(LISTA_TDAH).concat(LISTA_TEA).concat(LISTA_NOVOS);
  LISTA.forEach(function (x) { x.ab = 'aval'; });
  window.ATIVIDADES = (window.ATIVIDADES || []).concat(LISTA);

  // Instrumentos conhecidos que NÃO estão no app (pagos, com licença ou ainda por incluir).
  window.AVAL_FORA = [
    { nome: 'MBI-GS e MBI-HSS (burnout, Maslach)', motivo: 'Pago. Licença por aplicação, inclusive para versões traduzidas.', onde: ['Mind Garden', 'https://www.mindgarden.com'], tipo: 'pago' },
    { nome: 'Escalas brasileiras de burnout de uso privativo (por exemplo, ECB)', motivo: 'Comercializadas por editoras de testes. Confira no SATEPSI se têm parecer favorável e onde comprar.', onde: ['SATEPSI · Conselho Federal de Psicologia', 'https://satepsi.cfp.org.br'], tipo: 'pago' },
    { nome: 'HCL-32 (Checklist de Hipomania, bipolaridade)', motivo: 'Uso livre para pesquisa e clínica segundo o autor (Angst), com versão brasileira (Soares et al., 2010). Ainda não incluído: preciso do texto da versão brasileira.', tipo: 'livre' },
    { nome: 'YMRS (Escala de Mania de Young)', motivo: 'Escala gratuita aplicada pelo profissional (entrevista), com versão brasileira (Vilela et al., 2005). Posso incluir como roteiro na aba Documentos, se quiser.', tipo: 'livre' },
    { nome: 'SCID-5-PD (entrevista para transtornos de personalidade)', motivo: 'Pago. Edição brasileira em livro, pela Artmed.', onde: ['Grupo A / Artmed', 'https://www.grupoa.com.br'], tipo: 'pago' },
    { nome: 'PAI (Inventário de Avaliação da Personalidade) · escala BOR', motivo: 'Pago. Vendido pela PAR.', onde: ['PAR', 'https://www.parinc.com'], tipo: 'pago' },
    { nome: 'BSL-23 (Lista de Sintomas Borderline)', motivo: 'Uso livre para fins não comerciais segundo os autores (Bohus et al., 2009). Não encontrei versão brasileira validada: verifique antes de usar.', tipo: 'verificar' },
    { nome: 'BDI-II, BAI, BHS e BSI (Escalas Beck)', motivo: 'Pagas. Testes psicológicos com parecer favorável no SATEPSI, de uso privativo, com manual e folhas vendidos pela editora (Pearson / Casa do Psicólogo).', onde: ['Pearson Clinical Brasil', 'https://www.pearsonclinical.com.br'], tipo: 'pago' },
    { nome: 'IDATE (Inventário de Ansiedade Traço-Estado)', motivo: 'Pago. Comercializado por editora no Brasil.', onde: ['Vetor Editora', 'https://www.vetoreditora.com.br'], tipo: 'pago' },
    { nome: 'HADS (Escala Hospitalar de Ansiedade e Depressão)', motivo: 'Exige licença. Direitos com a GL Assessment; uso clínico requer licença e pagamento.', onde: ['GL Assessment (licença)', 'https://www.gl-assessment.co.uk'], tipo: 'pago' },
    { nome: 'ISI (Índice de Gravidade da Insônia)', motivo: 'Exige licença. Distribuído pela Mapi Research Trust, com taxa conforme o uso.', onde: ['Mapi Research Trust · ePROVIDE', 'https://eprovide.mapi-trust.org'], tipo: 'pago' },
    { nome: 'SCL-90-R', motivo: 'Pago. Vendido pela Pearson.', onde: ['Pearson Assessments', 'https://www.pearsonassessments.com'], tipo: 'pago' },
    { nome: 'PSS-10 (Escala de Estresse Percebido)', motivo: 'Uso livre para fins não comerciais, segundo o autor. Confirme as condições antes de incluir.', onde: ['Laboratório de Sheldon Cohen (Carnegie Mellon)', 'https://www.cmu.edu/dietrich/psychology/stress-immunity-disease-lab/scales/'], tipo: 'verificar' },
    { nome: 'PCL-5 (estresse pós-traumático)', motivo: 'Uso livre (Centro Nacional de TEPT dos EUA). Ainda não incluído: preciso conferir o texto da versão brasileira.', onde: ['National Center for PTSD', 'https://www.ptsd.va.gov'], tipo: 'livre' },
    { nome: 'CARS e CARS-2 (Childhood Autism Rating Scale)', motivo: 'Paga. Direitos da Western Psychological Services (WPS); exige manual e folhas originais.', onde: ['Western Psychological Services (WPS)', 'https://www.wpspublish.com'], tipo: 'pago' },
    { nome: 'GARS-2 (Gilliam Autism Rating Scale) e a sua correção', motivo: 'Paga. Direitos da Pro-Ed; a correção depende das tabelas normativas do manual.', onde: ['Pro-Ed', 'https://www.proedinc.com'], tipo: 'pago' },
    { nome: 'ADI-R (Entrevista Diagnóstica para Autismo – Revisada)', motivo: 'Paga e com treinamento obrigatório. Direitos da WPS; uso restrito a profissionais treinados.', onde: ['Western Psychological Services (WPS)', 'https://www.wpspublish.com'], tipo: 'pago' },
    { nome: 'Guia / Inventário Portage', motivo: 'Material comercial com direitos autorais (Portage Project / editoras); use a sua cópia impressa.', tipo: 'pago' },
    { nome: 'M-CHAT-R/F (autismo, 16 a 30 meses)', motivo: 'Gratuito para uso clínico em papel, sem alterações. Versões digitais exigem autorização dos autores (mchatscreen.com). O arquivo enviado é a versão de Portugal; para o Brasil, baixe a versão brasileira oficial em mchatscreen.com.', onde: ['Site oficial do M-CHAT', 'https://www.mchatscreen.com'], tipo: 'verificar' },
    { nome: 'ABC / ICA (Inventário de Comportamentos Autísticos)', motivo: 'O Autism Behavior Checklist tem direitos autorais (Krug et al.; hoje faz parte do ASIEP-3, da Pro-Ed). Não incluí: se tiver autorização ou confirmação de uso livre, eu incluo, já com a correção por área (o conteúdo que você enviou está pronto).', onde: ['Pro-Ed (ASIEP-3)', 'https://www.proedinc.com'], tipo: 'verificar' },
    { nome: 'Avaliação intraverbal (protocolo ABA)', motivo: 'Parece adaptado de protocolos de avaliação de linguagem (como o VB-MAPP, que é pago). Não incluí sem confirmar a autoria; use a sua cópia impressa.', onde: ['AVB Press (VB-MAPP)', 'https://avbpress.com'], tipo: 'verificar' },
    { nome: 'Escalas de Conners (versões para pais e para professores)', motivo: 'Direitos autorais da Multi-Health Systems (MHS). As traduções que circulam (Barbosa, 1995) podem exigir licença para reprodução e uso digital. Não incluí: se você tiver licença ou confirmação de uso livre, eu incluo (o conteúdo que você enviou já está pronto).', onde: ['Multi-Health Systems (MHS)', 'https://mhs.com'], tipo: 'verificar' },
    { nome: 'EPDS (Escala de Depressão Pós-Parto de Edimburgo)', motivo: 'Uso livre, citando a fonte. Ainda não incluído: preciso conferir o texto da versão brasileira.', tipo: 'livre' }
  ];
})();
