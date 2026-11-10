/*
 * Modelos de documentos e materiais de apoio · Psi Bárbara Serra (CRP 20/13.134)
 * Os modelos seguem a estrutura da Resolução CFP nº 06/2019 (documentos escritos).
 * Campos: { s: 'Seção' } | { id, l, t: 'text'|'area'|'check'|'radio', ph, v (texto inicial), o (opções) }
 * No texto inicial, {nome} é trocado pelo nome preenchido.
 */
(function () {
  var hoje = function () { var d = new Date(); return 'Manaus, ' + d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) + '.'; };
  var FECHO = 'Este documento não pode ser utilizado para fins diferentes do apontado no item de identificação, possui caráter sigiloso e extrajudicial, e trata-se de documento que não pode ser usado em outros contextos sem a anuência da psicóloga responsável.\nColoco-me à disposição para os esclarecimentos que se fizerem necessários.';
  var ident = function (extra) {
    return [{ s: '1. Identificação' },
      { id: 'nome', l: 'Nome da pessoa atendida', t: 'text' }].concat(extra || []).concat([
      { id: 'solic', l: 'Solicitante', t: 'text', ph: 'Ex.: a própria pessoa, responsáveis, neuropediatra, escola' },
      { id: 'final', l: 'Finalidade', t: 'text', ph: 'Ex.: apresentar ao profissional solicitante para esclarecer o quadro' },
      { id: 'autor', l: 'Autora', t: 'text', v: 'Bárbara Serra Oliveira, Psicóloga, CRP 20/13.134' }]);
  };

  window.DOC_MODELOS = [
    {
      id: 'declaracao', nome: 'Declaração', titulo: 'DECLARAÇÃO',
      desc: 'Registra informações objetivas, como comparecimento, acompanhamento em curso, dias e horários. Não traz sintomas, diagnóstico nem estado psicológico.',
      campos: [
        { id: 'nome', l: 'Nome da pessoa atendida', t: 'text' },
        { id: 'final', l: 'Finalidade', t: 'text', v: 'Comprovação de comparecimento' },
        { id: 'texto', l: 'Texto', t: 'area', v: 'Declaro, para os devidos fins, que {nome} compareceu a atendimento psicológico no dia ___/___/______, no período das ___h___ às ___h___.' },
        { id: 'local', l: 'Local e data', t: 'text', v: hoje() }
      ]
    },
    {
      id: 'atestado', nome: 'Atestado psicológico', titulo: 'ATESTADO PSICOLÓGICO',
      desc: 'Certifica, com base em avaliação, uma condição psicológica: justificativa de faltas, afastamento, aptidão ou necessidade de acompanhamento.',
      campos: [
        { id: 'nome', l: 'Nome da pessoa atendida', t: 'text' },
        { id: 'cpf', l: 'CPF (opcional)', t: 'text' },
        { id: 'solic', l: 'Solicitante', t: 'text' },
        { id: 'final', l: 'Finalidade', t: 'text', ph: 'Ex.: justificativa de faltas no trabalho' },
        { id: 'texto', l: 'Texto', t: 'area', v: 'Atesto, para os devidos fins, que {nome} encontra-se em acompanhamento psicológico e, com base em avaliação realizada, apresenta ________________________, necessitando de ________________________ (descrever o período de afastamento ou a justificativa, quando for o caso).', ph: 'O CID só deve constar com autorização expressa da pessoa atendida.' },
        { id: 'local', l: 'Local e data', t: 'text', v: hoje() }
      ]
    },
    {
      id: 'relatorio', nome: 'Relatório psicológico', titulo: 'RELATÓRIO PSICOLÓGICO',
      desc: 'Comunica a atuação profissional em um processo de trabalho (psicoterapia, acompanhamento). Estrutura: identificação, descrição da demanda, procedimento, análise e conclusão.',
      campos: ident([{ id: 'nasc', l: 'Data de nascimento / idade', t: 'text' }]).concat([
        { s: '2. Descrição da demanda' },
        { id: 'demanda', t: 'area', ph: 'Informações sobre a problemática apresentada e os motivos, razões e expectativas que produziram o pedido do documento.' },
        { s: '3. Procedimento' },
        { id: 'proced', t: 'area', ph: 'Recursos e instrumentos técnicos utilizados, referencial teórico-metodológico, pessoas ouvidas, número de encontros e tempo de duração do processo.' },
        { s: '4. Análise' },
        { id: 'analise', t: 'area', ph: 'Exposição descritiva, metódica e objetiva dos dados colhidos e das situações vividas, relacionados à demanda, sem expor dados que não sejam necessários à finalidade.' },
        { s: '5. Conclusão' },
        { id: 'concl', t: 'area', ph: 'Conclusões a partir da análise, encaminhamentos, orientações e, se for o caso, projeto terapêutico.' },
        { id: 'fecho', t: 'area', v: FECHO },
        { id: 'local', l: 'Local e data', t: 'text', v: hoje() }
      ])
    },
    {
      id: 'relatorio-tdah', nome: 'Relatório psicológico · avaliação de TDAH (infantil)', titulo: 'RELATÓRIO PSICOLÓGICO',
      desc: 'Seu modelo de relatório para avaliação de suspeita de TDAH em criança, já com o texto-base para adaptar.',
      campos: ident([{ id: 'nasc', l: 'Data de nascimento / idade', t: 'text' }]).concat([
        { s: '2. Queixa principal' },
        { id: 'queixa', t: 'area', v: 'Avaliar a suspeita de Transtorno do Déficit de Atenção e Hiperatividade.' },
        { s: '3. Descrição da demanda' },
        { id: 'demanda', t: 'area', v: 'Os responsáveis pela criança procuraram atendimento psicológico em ___ de ______, com a queixa de que apresenta comportamentos relativos ao Transtorno do Déficit de Atenção e Hiperatividade, como ______________________, o que prejudica seu desempenho escolar e dificulta suas relações sociais e a convivência. Portanto, fez-se necessário avaliar o comportamento da criança a fim de refutar ou confirmar as queixas apresentadas, compreendendo as implicações destes fatores na instalação e manutenção da demanda.', ph: 'Acrescente informações sobre o comportamento da criança colhidas na anamnese.' },
        { s: '4. Procedimento' },
        { id: 'proced', t: 'area', v: 'Foram realizadas ___ sessões entre os meses de ______ e ______, com duração média de 50 minutos cada. A avaliação teve início com uma sessão com os responsáveis, uma vez que o paciente é menor de idade; as demais sessões foram realizadas com o próprio paciente. As técnicas utilizadas para a coleta de dados foram: sessões lúdicas (livros, quebra-cabeças, ilustrações para colorir, desenho, tarefas e cobertura de pontilhados), dinâmicas e brincadeiras, além de instrumentos que avaliam comportamentos de desatenção e hiperatividade (________________), com o objetivo de observar o seguimento de regras, o sequenciamento de tarefas, a atenção, a concentração e a realização de atividades compatíveis com seu nível de desenvolvimento. Foram realizadas ___ sessões de aplicação de técnicas e 1 sessão de devolutiva com os responsáveis.', ph: 'Inclua comportamentos observados, pessoas ouvidas, recursos, número de encontros, tempo de sessão e referencial teórico.' },
        { s: '5. Análise dos resultados' },
        { id: 'analise', t: 'area', ph: 'Descreva as principais características observadas (seguimento de regras, atenção, concentração, cooperação, comportamentos) e a evolução do trabalho realizado.' },
        { s: '6. Conclusão' },
        { id: 'concl', t: 'area', ph: 'Indique encaminhamentos e intervenções, hipótese diagnóstica ou diagnóstico, prognóstico, evolução do caso, orientações ou projeto terapêutico.' },
        { id: 'fecho', t: 'area', v: FECHO },
        { id: 'local', l: 'Local e data', t: 'text', v: hoje() }
      ])
    },
    {
      id: 'laudo', nome: 'Laudo psicológico', titulo: 'LAUDO PSICOLÓGICO',
      desc: 'Resultado de um processo de avaliação psicológica. Estrutura: identificação, descrição da demanda, procedimento, análise, conclusão e referências (obrigatórias).',
      campos: ident([{ id: 'cpf', l: 'CPF (opcional)', t: 'text' }, { id: 'nasc', l: 'Data de nascimento / idade', t: 'text' }]).concat([
        { s: '2. Descrição da demanda' },
        { id: 'demanda', t: 'area', ph: 'Problemática apresentada, motivos e expectativas que levaram à avaliação. Ex.: dificuldades acadêmicas, histórico de diagnóstico anterior, pedido do solicitante.' },
        { s: '3. Procedimento' },
        { id: 'pessoas', l: 'Pessoas ouvidas no processo', t: 'text' },
        { id: 'encontros', l: 'Número de encontros', t: 'text' },
        { id: 'duracao', l: 'Duração do processo', t: 'text' },
        { id: 'proced', t: 'area', ph: 'Recursos técnico-científicos utilizados (entrevistas, observação, instrumentos e testes com parecer favorável no SATEPSI), especificando o referencial teórico-metodológico que fundamentou a análise, a interpretação e a conclusão.' },
        { s: '4. Análise' },
        { id: 'analise', t: 'area', ph: 'Análise descritiva, metódica e objetiva dos dados de cada fonte (história, observação, instrumentos), integrando-os à luz do referencial adotado.' },
        { s: '5. Conclusão' },
        { id: 'concl', t: 'area', ph: 'Encaminhamentos e intervenções, diagnóstico ou hipótese diagnóstica, prognóstico, evolução do caso, orientação ou sugestão de projeto terapêutico.' },
        { id: 'fecho', t: 'area', v: FECHO },
        { s: '6. Referências' },
        { id: 'refs', t: 'area', ph: 'Referências das fontes científicas e dos instrumentos utilizados (obrigatório no laudo).' },
        { id: 'local', l: 'Local e data', t: 'text', v: hoje() }
      ])
    },
    {
      id: 'entrev-tdah', nome: 'Entrevista de rastreamento de TDAH (roteiro para a sessão)', titulo: 'ENTREVISTA DE RASTREAMENTO · TDAH',
      desc: 'Roteiro para você preencher durante a sessão: identificação, queixa, fatores históricos, checklists de distração e de hiperatividade, gravidade e prognóstico.',
      campos: [
        { s: 'Identificação' },
        { id: 'nome', l: 'Nome', t: 'text' }, { id: 'nasc', l: 'Data de nascimento', t: 'text' }, { id: 'genero', l: 'Gênero', t: 'text' },
        { id: 'escol', l: 'Escolaridade', t: 'text' }, { id: 'prof', l: 'Profissão', t: 'text' }, { id: 'civil', l: 'Estado civil', t: 'text' },
        { id: 'filhos', l: 'Filhos (quantos)', t: 'text' }, { id: 'relig', l: 'Religião', t: 'text' }, { id: 'horarios', l: 'Possibilidade de horários', t: 'text' },
        { s: 'Queixa e histórico' },
        { id: 'queixa', l: 'Queixa principal', t: 'area' },
        { id: 'terapia', l: 'Fez terapia anteriormente? (qual e quando)', t: 'area' },
        { id: 'expect', l: 'Expectativas e objetivos do paciente', t: 'area' },
        { id: 'sintomas', l: 'Sintomas apresentados', t: 'area' },
        { id: 'f11', l: '1.1 Fator histórico familiar (alcoolismo, drogadição, violência, vínculos, abusos, transtorno mental, apoio familiar)', t: 'area' },
        { id: 'f12', l: '1.2 Fator clínico (doenças físicas, mentais, genéticas, funcionamento global, medicação)', t: 'area' },
        { id: 'f13', l: '1.3 Fator estressor psicossocial (conflito familiar, amigos, trabalho, cônjuge, filhos, vida acadêmica)', t: 'area' },
        { s: '2. Avaliação' },
        { id: 'aval', t: 'area' },
        { id: 'distr', l: '2.1 Distração', t: 'check', o: ['Frequentemente não presta atenção em detalhes', 'Tem dificuldade de manter a atenção', 'Parece não escutar', 'Não segue regras, instruções', 'Tem dificuldade de organização', 'Evita fazer tarefas que exigem esforço', 'Falta de foco', 'Procrastinação', 'Instabilidade profissional', 'Rendimento abaixo da capacidade intelectual', 'Dificuldade em manter a rotina', 'Esquecimentos', 'Frequentemente perde as coisas', 'Dificuldade de manter relacionamentos e instabilidade nas relações afetivas', 'Mudança de humor', 'Dificuldade de expressar ideias', 'Faz as coisas pela metade, dificuldade para concluir as tarefas', 'Dificuldade em cumprir os compromissos'] },
        { id: 'hiper', l: '2.2 Hiperatividade e impulsividade', t: 'check', o: ['Agitação', 'Atividade motora excessiva', 'Impulsividade', 'Irritação constante e impaciência', 'Fala demais', 'Agressividade', 'Dificuldade em avaliar o próprio comportamento', 'Oscilações de humor', 'Responde antes da pergunta ou interrompe as conversas', 'Dificuldade no manejo da frustração', 'Incapacidade de estabelecer objetivos', 'Deixa as coisas pela metade para iniciar outra', 'Hipersensibilidade a críticas', 'Reação emocional excessiva', 'Atraso no desenvolvimento da linguagem quando criança', 'Comportamento antissocial'] },
        { s: '3. Sintoma presente?' },
        { id: 'presente', l: 'Sintoma presente', t: 'radio', o: ['Sim', 'Não'] },
        { id: 'grav', l: 'Gravidade atual', t: 'radio', o: ['Leve: poucos sintomas além dos necessários para o diagnóstico, com no máximo pequenos prejuízos no funcionamento social ou profissional', 'Moderada: sintomas ou prejuízo funcional entre "leve" e "grave"', 'Grave: muitos sintomas além dos necessários, ou vários sintomas particularmente graves, ou prejuízo acentuado no funcionamento social ou profissional'] },
        { id: 'encam', l: 'Encaminhamento a outro profissional', t: 'area' },
        { id: 'melhoras', l: 'Melhoras obtidas', t: 'area' },
        { id: 'obs', l: 'Outras observações importantes', t: 'area' },
        { s: '4. Prognóstico' },
        { id: 'progn', t: 'area' },
        { id: 'local', l: 'Local e data', t: 'text', v: hoje() }
      ]
    }
  ];

  var LEG = [["h", "Brasil – legislação de âmbito nacional"], ["p", "Depois de muito empenho e dedicação de várias pessoas e entidades, com o protagonismo da ABDA, foi aprovada em novembro de 2021 a Lei 14.254. Essa lei dispõe sobre o diagnóstico e o tratamento do TDAH e Dislexia na educação básica. A lei estabelece que as escolas devem assegurar aos alunos com TDAH e Dislexia acesso aos recursos didáticos adequados ao desenvolvimento de sua aprendizagem, e que os sistemas de ensino garantam aos professores formação própria sobre a identificação e abordagem pedagógica."], ["p", "Para ler a Lei Federal 14254 na íntegra siga o link"], ["p", "https://www.in.gov.br/en/web/dou/-/lei-n-14.254-de-30-de-novembro-de-2021-363377461"], ["p", "A ABDA participou desde a elaboração do texto do projeto de lei original, e, a Associação acompanhou de perto o trâmite de todo processo, durante os mais de 10 anos em que o projeto tramitou entre a Câmara dos Deputados e o Senado. Finalmente, em 2021 o projeto de lei foi aprovado no Congresso Nacional e a lei foi sancionada pelo Presidente da República."], ["h", "Qual o próximo passo para que a lei seja implementada?"], ["p", "O próximo passo é a regulamentação da Lei, sob a responsabilidade e coordenação dos Ministérios da Saúde e da Educação. Com base no texto da Lei as áreas técnicas dos Ministérios devem descrever ações, estratégias e programas para que efetivamente os Estados e Municípios possam implementar a lei da melhor forma. Ou seja, neste contexto deverá ser desenvolvido um Plano Nacional de acompanhamento integral para crianças e jovens com TDAH e Transtorno Específico de Aprendizagem (Dislexia), na educação básica."], ["p", "O envolvimento dos Ministérios se justifica, porque há um componente sob responsabilidade da Saúde, e outro da Educação. A atuação do Ministério de Saúde se refere a estabelecer o fluxo e discussões sobre como articular as equipes para o diagnóstico e o tratamento ou intervenção terapêutica dessas crianças e jovens."], ["p", "E quanto ao Ministério de Educação, cabe orientar as redes de ensino em identificar os possíveis sinais de dificuldades de aprendizagem que podem estar presentes tanto na criança com TDAH como nos transtornos específicos de aprendizagem. Além disso, a formação dos professores da Educação básica deve conter informações de como fornecer apoio pedagógico e adaptações educacionais quando necessário."], ["p", "A ABDA segue atenta acompanhando estas discussões e participando sempre que solicitada."], ["h", "O que já existe em termos de legislação nos estados e municipios?"], ["p", "Existem leis estaduais e municipais, que podem ser acessadas:"], ["p", "Nesse link você verá as leis em tramitação ou já sancionadas no Brasil:"], ["p", "https://tdah.org.br/wp-content/uploads/TABELA_DE_LEIS_ATUALIZADA_junho22.pdf"], ["p", "A Lei Estadual nº 3112/2015 (AC) dispõe sobre a identificação, o diagnóstico, acompanhamento integral e atendimento educacional escolar para estudantes da educação básica com TDAH e foi aprovada em 29 de dezembro de 2015. Além disso, a Lei Estadual nº 2954/2014 (AC) foi responsável por instituir a Semana de Informação e Conscientização sobre o TDAH, aprovada em 14 de janeiro de 2014."], ["s", "No Amazonas"], ["p", "A Lei nº. 4.790/2019 (AM) dispõe sobre as medidas a serem adotadas para identificar, acompanhar e auxiliar o aluno com TDAH e/ou dislexia nas redes pública e privada de ensino do Estado do Amazonas e dá outras providências. Esta lei foi aprovada em 27 de fevereiro de 2019. Na cidade de Manaus a Lei Municipal nº 2260/2017 (Manaus – AM) dispõe sobre as medidas a serem adotadas para identificar, acompanhar e auxiliar o aluno com TDAH e/ou Dislexia nas redes pública e privada de ensino do Município de Manaus e foi aprovada em 04 de dezembro de 2017."], ["s", "No Espírito Santo"], ["p", "A Lei nº 11076/2019 (ES) estabelece que as unidades escolares públicas e privadas, no âmbito do Estado do Espírito Santo, ficam obrigadas a disponibilizar em suas salas de aula assentos na primeira fila aos alunos com TDAH, assegurando seu posicionamento afastado de janelas, cartazes e outros elementos possíveis potenciais de distração. APROVADA em 25 de novembro de 2019."], ["s", "No Distrito Federal"], ["p", "A Lei Estadual nº 5310/2014 (DF) Dispõe sobre a educação especial e o atendimento e acompanhamento integral aos estudantes que apresentem necessidades especiais inclusive TDAH aprovada em 19 de fevereiro de 2014."], ["s", "Em Goias"], ["p", "Lei Municipal nº 712/2012 (Pirenópolis-GO) dispõe sobre as medidas para a identificação e tratamento da Dislexia e do TDAH nas redes pública e privada do município e aprovada em 09 de julho de 2012."], ["s", "Em Minas Gerais"], ["p", "A Lei Municipal Nº 10133/2011 (BH-MG) cria o Programa de Promoção da Aprendizagem – PROAP, abrangendo os Distúrbios de Aprendizagem, inclusive TDAH e foi aprovada em 18 de março de 2011."], ["s", "No Paraná"], ["p", "A Lei Estadual 2009/2019 estabelece o Dia Estadual e a Semana Estadual de Conscientização sobre o Transtorno de Déficit de Atenção e Hiperatividade (TDAH), a ser realizado no dia 19 de setembro. Apesar da lei não tratar de apoio educacional ao TDAH diretamente, o seu objetivo é de informar a população sobre a necessidade do diagnóstico precoce do TDAH, bem como sobre as estratégias e possibilidades de tratamento."], ["s", "No Rio de Janeiro"], ["p", "A Lei Estadual nº 6308/2012 (RJ) institui a Semana Estadual de Informação e Conscientização sobre o TDAH que foi incluída no Calendário Oficial de Eventos do Estado do Rio de Janeiro. A Lei Estadual nº 7354/2016 (RJ) institui o programa e diagnóstico e tratamento do TDAH, no estado do RJ, aprovada em 15 de julho de 2016. Enquanto a Lei Estadual nº 8192/2018 (RJ), aprovada em 04 de dezembro de 2018, dispõe sobre a obrigatoriedade das escolas públicas e privadas, no âmbito do Estado do Rio de Janeiro, a disponibilizarem cadeiras em locais determinados aos alunos com TDAH."], ["s", "No Rio Grande do Sul"], ["p", "A Lei Municipal nº 4165/2013 (Viamão – RS) aprovada em 06 de dezembro de 2016 dispõe sobre as diretrizes adotadas pelo município para orientação a pais e professores sobre as características do TDAH e encaminhamento pela diretoria da escola para o SUS para diagnóstico. E a Lei Estadual nº 15212/2018 (RS) Institui a campanha estadual de informação s/o TDAH e a dislexia na educação básica e dá outras providências. APROVADA em 25 de julho de 2018."], ["s", "Em Roraima"], ["p", "A Lei Municipal n° 1.847/2018 aprovada no município de Boa Vista assegura que as escolas públicas e privadas promovam medidas para auxiliar professores, coordenadores e diretores para identificar, acompanhar e auxiliar o aluno com TDAH."], ["s", "Em Santa Catarina"], ["p", "Lei Estadual nº 15113/2010 (SC) trata da implantação do Programa de identificação e tratamento do TDAH no Estado de Santa Catarina, aprovada em 19 de janeiro de 2010."], ["h", "Enem"], ["p", "Há alguns anos, o ENEM contempla uma hora a mais de prova e uma sala separada, para os alunos com TDAH. Esta decisão foi do próprio ENEM, e não está pautada em uma legislação específica."], ["p", "Em função da postura do ENEM, abriu-se um precedente, e algumas Escolas e Universidades, também aderiram a este modelo."], ["h", "Jurisprudência – tdah é deficiência?"], ["p", "Os juristas têm se apoiado na Constituição Federal, Artigo 5º, ECA – Estatuto da criança e do adolescente e DUDH – Declaração Universal dos Direitos Humanos (carta a qual o Brasil é signatário)."], ["p", "Toda esta legislação citada, tem apoiado as decisões jurídicas favoráveis, e portanto há jurisprudência."], ["p", "O TDAH não é considerado deficiência, e sim uma disfunção (disfuncionalidade). Os estudos científicos comprovam que pessoas com TDAH diagnosticadas e tratadas adequadamente não são incapazes de desempenhar as suas atividades sociais, acadêmicas e laborais."], ["p", "Todavia, enquanto a lei específica ainda não é regulamentada, alguns juristas se apoiam também no Estatuto das pessoas com deficiência, com base na lei da ‘similaridade’."], ["p", "Conceito de Deficiência: ”Toda perda ou anomalia de uma estrutura ou função psicológica, fisiológica ou anatômica que gere incapacidade para o desempenho de atividade, dentro do padrão considerado normal para o ser humano” (Decreto 3.298/99)"], ["p", "Conceito de Disfunção: Que não funciona corretamente; cuja função se apresenta prejudicada. A pessoa com TDAH é disfuncional, ou seja, tem mais dificuldade para realizar determinadas tarefas, mas não é incapaz, portanto, não é deficiente."], ["p", "Como já falamos, o TDAH não é deficiência, pois não é incapacitante. As pessoas com TDAH são disfuncionais, ou seja, têm mais dificuldade em realizar algumas atividades, mas não são incapazes de realizá-las."], ["h", "Lei brasileira de inclusão da pessoa com deficiência"], ["p", "A publicação da Lei Brasileira de Inclusão da Pessoa com Deficiência (BRASIL, LBI – Lei nº 13.146, de 6 de julho de 2015) aponta em seu Artigo 5º. as diretrizes que podem beneficiar as crianças e adolescentes com TDAH."], ["p", "O processo mencionado no art. 14º. desta Lei baseia-se em avaliação multidisciplinar das necessidades, habilidades e potencialidades de cada pessoa, observadas as seguintes diretrizes:"], ["p", "I – diagnóstico e intervenção precoces;"], ["p", "II – adoção de medidas para compensar perda ou limitação funcional, buscando o desenvolvimento de aptidões;"], ["p", "III – atuação permanente, integrada e articulada de políticas públicas que possibilitem a plena participação social da pessoa com deficiência;"], ["p", "IV – Oferta de rede de serviços articulados, com atuação intersetorial, nos diferentes níveis de complexidade, para atender às necessidades específicas da pessoa com deficiência;"], ["p", "V – Prestação de serviços próximo ao domicílio da pessoa com deficiência, inclusive na zona rural, respeitadas a organização das Redes de Atenção à Saúde (RAS) nos territórios locais e as normas do Sistema Único de Saúde (SUS)."], ["h", "Dúvidas frequentes sobre direitos do tdah"], ["s", "Na Escola"], ["p", "Não existe cotas para pessoas com TDAH"], ["p", "Não existe aprovação escolar compulsória para crianças com TDAH"], ["p", "Não existe média escolar diferenciada para aprovação das pessoas com TDAH"], ["p", "Pode haver adaptações pedagógicas especificas para potencializar o aprendizado de crianças com TDAH, como oferecer mais tempo para realizar a prova e espaços reservados."], ["p", "A Constituição Federal oferece a garantia de que nenhuma escola pode recusar um aluno, na educação básica (Ensino fundamental, Ensino Médio) e Ensino Superior."], ["s", "No trabalho"], ["p", "Não existe cotas para pessoas com TDAH"], ["p", "Algumas poucas empresas aceitam adequar-se às necessidades das pessoas com TDAH, mas no Brasil ainda são poucas, e não é obrigatório por Lei."], ["p", "Não é possível pedir aposentadoria precoce por causa do TDAH."], ["s", "Na saúde"], ["p", "Os medicamentos para TDAH NÃO estão na lista de medicamentos obrigatórios do governo."], ["p", "Não existe nenhuma política de saúde pública, específica para o TDAH."], ["s", "Vida em geral"], ["p", "Não existe isenção fiscal para aquisição de automóveis, casas etc., para pessoas com TDAH ou para seus familiares."], ["p", "Não existe auxílio financeiro governamental para pessoas com TDAH, nem para seus familiares."], ["p", "Acesse esse arquivo em:     https://tdah.org.br/29542-2/"]];
  window.MATERIAIS = [
    {
      id: 'ferramentas-tdah', nome: 'Ferramentas digitais para TDAH em adultos', publico: 'Para enviar ao paciente',
      desc: 'Aplicativos que ajudam na organização, no foco e no relaxamento.',
      itens: [
        ['Trello', 'Gerencia tarefas e projetos com quadros, listas e cartões.', 'https://play.google.com/store/apps/details?id=com.trello&hl=pt_BR'],
        ['Forest', 'Ajuda a focar limitando o uso do celular: uma árvore virtual cresce enquanto você se concentra.', 'https://play.google.com/store/apps/details?id=cc.forestapp&hl=pt_BR'],
        ['MindNode', 'Cria mapas mentais para organizar ideias e informações (iPhone).', 'https://apps.apple.com/br/app/mindnode-mapeamento-mental/id1289197285'],
        ['Headspace', 'Meditação e mindfulness com sessões guiadas para ansiedade e estresse.', 'https://play.google.com/store/apps/details?id=com.getsomeheadspace.android&hl=pt_BR'],
        ['Brain.fm', 'Sons de fundo para concentração, sono e relaxamento (iPhone).', 'https://apps.apple.com/br/app/brain-fm-focus-sleep-relax/id1104856898'],
        ['Habitica', 'Transforma tarefas em um jogo, com pontos e recompensas.', 'https://play.google.com/store/apps/details?id=com.habitrpg.android.habitica&hl=pt_BR'],
        ['Evernote', 'Anotações, lembretes e listas em um só lugar.', 'https://play.google.com/store/apps/details?id=com.evernote&hl=pt_BR'],
        ['Todoist', 'Organiza tarefas, metas e lembretes para evitar a procrastinação.', 'https://play.google.com/store/apps/details?id=com.todoist&hl=pt_BR'],
        ['Focus@Will', 'Músicas para aumentar a concentração e a produtividade (iPhone).', 'https://apps.apple.com/br/app/focus-will-music-for-work/id975017206'],
        ['Calm', 'Meditação, relaxamento, histórias para dormir e músicas.', 'https://play.google.com/store/apps/details?id=com.calm.android&hl=pt_BR'],
        ['RescueTime', 'Mostra como você usa o tempo no celular para reduzir distrações.', 'https://play.google.com/store/apps/details?id=com.rescuetime.android&hl=pt_BR']
      ],
      fim: 'Cada pessoa é única: experimente algumas ferramentas e fique com as que funcionam melhor para você. Converse comigo sobre como foi.'
    },
    {
      id: 'legislacao-tdah', nome: 'Legislação sobre TDAH', publico: 'Consulta da psicóloga · pode ser compartilhado com famílias e escolas',
      desc: 'Lei 14.254/2021, leis estaduais e municipais (inclusive Amazonas e Manaus), ENEM, Lei Brasileira de Inclusão e dúvidas frequentes.',
      fonte: 'Fonte: ABDA – Associação Brasileira do Déficit de Atenção (tdah.org.br). Texto atualizado em 07/2022: confira se há novidades, como a regulamentação da Lei 14.254.',
      blocos: LEG
    }
  ];
})();
