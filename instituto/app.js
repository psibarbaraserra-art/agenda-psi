// Instituto Luma · Gestão administrativa
// Tudo fica guardado neste aparelho (localStorage). Cópia: Configurações → Baixar cópia de segurança.
(function () {
  'use strict';

  /* ================= utilidades ================= */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const hoje = () => iso(new Date());
  const ymHoje = () => hoje().slice(0, 7);
  const fmtD = (s) => (s && s.length >= 10 ? s.slice(8, 10) + '/' + s.slice(5, 7) + '/' + s.slice(0, 4) : '');
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const MES_C = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const mesNome = (ym) => cap(MESES[+ym.slice(5, 7) - 1]) + ' de ' + ym.slice(0, 4);
  const brl = (v) => (+v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const n2 = (v) => (+v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const toDate = (s) => new Date(s + 'T12:00:00');
  const addDias = (s, n) => { const d = toDate(s); d.setDate(d.getDate() + n); return iso(d); };
  const diasEntre = (a, b) => Math.round((toDate(b) - toDate(a)) / 864e5);
  const idade = (nasc, ref) => { if (!nasc) return null; ref = ref || hoje(); let a = +ref.slice(0, 4) - +nasc.slice(0, 4); if (ref.slice(5) < nasc.slice(5)) a--; return a; };
  const fimMes = (ym) => { const [y, m] = ym.split('-').map(Number); return iso(new Date(y, m, 0)); };
  const ymAdd = (ym, n) => { const [y, m] = ym.split('-').map(Number); const d = new Date(y, m - 1 + n, 1); return iso(d).slice(0, 7); };
  function parseMoney(s) {
    if (typeof s === 'number') return s;
    s = String(s || '').replace(/[R$\s]/g, '');
    if (!s) return 0;
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    const v = parseFloat(s);
    return isNaN(v) ? 0 : Math.round(v * 100) / 100;
  }
  function ultimoDiaUtil(y, m) { const d = new Date(y, m, 0); while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1); return iso(d); }
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), 2600); }
  const IC = {
    painel: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    maes: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    atend: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 15h3"/>',
    grupos: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    vol: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    est: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6"/>',
    fin: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    bens: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
    docs: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>',
    rel: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    cfg: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'
  };
  const ic = (k) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${IC[k]}</svg>`;

  /* ================= dados ================= */
  const LS = 'luma-admin-v1';
  const OB = window.LUMA_OBRIG || { mensais: [], anuais: [], docs: [] };
  const DIAGS = ['TEA (autismo)', 'TDAH', 'Síndrome de Down', 'Paralisia cerebral', 'Deficiência intelectual', 'Deficiência auditiva', 'Deficiência visual', 'Deficiência física', 'Síndrome rara / genética', 'Epilepsia', 'TOD', 'Transtorno de aprendizagem', 'Atraso no desenvolvimento', 'Em investigação', 'Outro'];
  const CFG0 = {
    nome: 'Instituto Luma', slogan: 'Luz para mães atípicas', lema: 'Luz que acolhe, orienta e ilumina o caminho das mães atípicas.',
    cnpj: '', endereco: '', cidade: '', telefone: '', email: '', instagram: '', pix: '',
    presidente: '', tesoureira: '', coordenacao: '', conselhoFiscal: '',
    tiposAtend: ['Atendimento psicológico', 'Atendimento jurídico', 'Atendimento social', 'Acolhimento / triagem'],
    tiposGrupo: ['Círculo de Cuidado Luma', 'Oficina das Mães', 'Palestra / evento'],
    catEntrada: ['Doação de pessoa física', 'Doação de empresa', 'Contribuição de associada', 'Bazar, eventos e rifas', 'Termo de fomento / convênio', 'Emenda parlamentar / subvenção', 'Editais e prêmios', 'Rendimentos de aplicação', 'Outras receitas'],
    catSaida: ['Aluguel', 'Água, luz e internet', 'Telefone', 'Material de escritório', 'Material de limpeza e higiene', 'Lanche e alimentação', 'Material terapêutico e pedagógico', 'Transporte', 'Contador', 'Tarifas bancárias', 'Impostos e taxas', 'Manutenção e reparos', 'Eventos', 'Compra de bens (patrimônio)', 'Comunicação e gráfica', 'Bolsa e auxílio de estágio', 'Seguro de estagiários', 'Outras despesas'],
    contas: ['Caixa (dinheiro)', 'Conta bancária'],
    fontes: ['Recursos livres'],
    areas: ['Psicologia', 'Direito', 'Serviço social', 'Pedagogia / psicopedagogia', 'Terapia ocupacional', 'Fonoaudiologia', 'Administração / financeiro', 'Comunicação e redes', 'Eventos e captação', 'Apoio geral'],
    catBens: ['Móveis', 'Eletrônicos e informática', 'Eletrodomésticos', 'Material terapêutico e brinquedos', 'Livros e material pedagógico', 'Utensílios de cozinha', 'Decoração', 'Outros'],
    locais: ['Recepção', 'Sala de atendimento 1', 'Sala de atendimento 2', 'Sala do Círculo', 'Escritório', 'Cozinha', 'Depósito'],
    saldoIni: {}, dataSaldoIni: '', sm: 1621, tema: 'escuro', pin: '', ultimoBackup: ''
  };
  function novo() {
    return { v: 1, cfg: JSON.parse(JSON.stringify(CFG0)), maes: [], vol: [], est: [], atend: [], grupos: [], fin: [], bens: [], obrig: {}, obrigCustom: [], obrigOcultas: [], docs: [], docsOcultos: [], seq: { recibo: {}, tomb: 0 }, inicio: hoje() };
  }
  function normaliza(d) {
    const b = novo();
    d = Object.assign(b, d || {});
    d.cfg = Object.assign(JSON.parse(JSON.stringify(CFG0)), d.cfg || {});
    ['maes', 'vol', 'est', 'atend', 'grupos', 'fin', 'bens', 'obrigCustom', 'obrigOcultas', 'docs', 'docsOcultos'].forEach((k) => { if (!Array.isArray(d[k])) d[k] = []; });
    if (!d.obrig || typeof d.obrig !== 'object') d.obrig = {};
    d.seq = Object.assign({ recibo: {}, tomb: 0 }, d.seq || {});
    if (!d.inicio) d.inicio = hoje();
    OB.docs.forEach((x) => {
      if (d.docsOcultos.includes(x.id)) return;
      const ex = d.docs.find((y) => y.id === x.id);
      if (!ex) d.docs.push({ id: x.id, nome: x.nome, cat: x.cat, dias: x.dias, dica: x.dica || '', ess: !!x.ess, tem: false, emissao: '', validade: '', local: '', obs: '' });
      else { ex.dica = x.dica || ex.dica || ''; ex.ess = !!x.ess; }
    });
    return d;
  }
  let D;
  try { D = normaliza(JSON.parse(localStorage.getItem(LS) || 'null')); } catch (e) { D = normaliza(null); }
  function save() {
    try { localStorage.setItem(LS, JSON.stringify(D)); } catch (e) { alert('Não foi possível salvar neste aparelho (memória cheia?). Baixe a cópia de segurança agora.'); }
  }
  const C = () => D.cfg;
  const byId = (col, id) => D[col].find((x) => x.id === id);
  const nomeMae = (id, fb) => (byId('maes', id) || {}).nome || fb || '—';
  const pessoas = () => [...D.vol.map((v) => ({ id: v.id, nome: v.nome, tipo: 'Voluntário(a)', area: v.area, sit: v.situacao })), ...D.est.map((e) => ({ id: e.id, nome: e.nome, tipo: 'Estagiário(a)', area: e.area, sit: e.situacao }))];
  const nomePessoa = (id, fb) => (pessoas().find((p) => p.id === id) || {}).nome || fb || '';

  /* ================= estado da tela ================= */
  const TABS = [
    { id: 'painel', nome: 'Painel' },
    { id: 'maes', nome: 'Mães' },
    { id: 'atend', nome: 'Atendimentos' },
    { id: 'grupos', nome: 'Círculo e grupos' },
    { id: 'vol', nome: 'Voluntários' },
    { id: 'est', nome: 'Estagiários' },
    { id: 'fin', nome: 'Financeiro' },
    { id: 'bens', nome: 'Patrimônio' },
    { id: 'docs', nome: 'Documentos e prazos' },
    { id: 'rel', nome: 'Relatórios (PDF)' },
    { id: 'cfg', nome: 'Configurações' }
  ];
  const UI = {
    tab: 'painel',
    maes: { q: '', sit: 'Ativa', serv: '' },
    atend: { mes: ymHoje(), tipo: '', status: '', q: '' },
    grupos: { ano: hoje().slice(0, 4), tipo: '' },
    vol: { q: '', sit: 'Ativo' },
    est: { q: '', sit: 'Ativo' },
    fin: { mes: ymHoje(), tipo: '', cat: '', conta: '', q: '' },
    bens: { q: '', cat: '', local: '', estado: '' },
    docs: { sub: 'mensais', mes: ymHoje(), ano: hoje().slice(0, 4) }
  };

  /* ================= formulários ================= */
  const SIM_NAO = ['Sim', 'Não'];
  const FORMS = {
    maes: () => [
      { t: 'sec', l: 'Identificação' },
      { k: 'nome', l: 'Nome completo', req: true },
      { k: 'cpf', l: 'CPF', w: 2 }, { k: 'rg', l: 'RG', w: 2 }, { k: 'nasc', l: 'Nascimento', t: 'date', w: 2 },
      { k: 'tel', l: 'WhatsApp / telefone', t: 'tel', w: 3 }, { k: 'email', l: 'E-mail', t: 'email', w: 3 },
      { k: 'endereco', l: 'Endereço', w: 4 }, { k: 'bairro', l: 'Bairro', w: 2 },
      { k: 'cidade', l: 'Cidade', w: 3 }, { k: 'estadoCivil', l: 'Estado civil', t: 'select', o: ['Solteira', 'Casada / união estável', 'Separada / divorciada', 'Viúva'], w: 3 },
      { t: 'sec', l: 'Situação socioeconômica' },
      { k: 'renda', l: 'Renda familiar mensal (R$)', t: 'money', w: 2 }, { k: 'pessoasCasa', l: 'Pessoas na casa', t: 'number', w: 2 },
      { k: 'trabalho', l: 'Trabalho da mãe', t: 'select', o: ['Formal (carteira)', 'Informal / autônoma', 'Não trabalha fora', 'Deixou de trabalhar para cuidar', 'Afastada / aposentada'], w: 2 },
      { k: 'cadUnico', l: 'CadÚnico', t: 'select', o: SIM_NAO, w: 2 }, { k: 'nis', l: 'NIS', w: 2 },
      { k: 'beneficios', l: 'Benefícios da família', t: 'multi', o: ['Bolsa Família', 'BPC', 'Auxílio municipal/estadual', 'Pensão', 'Nenhum'] },
      { t: 'sec', l: 'Filhos' },
      { k: 'filhos', t: 'filhos' },
      { t: 'sec', l: 'No instituto' },
      { k: 'situacao', l: 'Situação', t: 'select', o: ['Ativa', 'Lista de espera', 'Desligada'], req: true, w: 2 },
      { k: 'entrada', l: 'Data de entrada', t: 'date', w: 2 },
      { k: 'comoConheceu', l: 'Como conheceu o instituto', w: 2 },
      { k: 'servicos', l: 'Serviços que recebe / deseja', t: 'multi', o: () => [...C().tiposAtend, ...C().tiposGrupo] },
      { k: 'lgpd', l: 'Termo de consentimento LGPD assinado', t: 'check', w: 3, help: 'Obrigatório antes de guardar dados dos filhos (LGPD, art. 14).' },
      { k: 'lgpdData', l: 'Data do termo', t: 'date', w: 3 },
      { k: 'imagem', l: 'Uso de imagem (fotos/vídeos)', t: 'select', o: ['Autoriza', 'Não autoriza'], w: 3 },
      { k: 'obs', l: 'Observações administrativas', t: 'textarea', help: 'Não registre aqui conteúdo de atendimento: o prontuário fica com a profissional responsável.' }
    ],
    atend: () => [
      { k: 'data', l: 'Data', t: 'date', req: true, w: 2 }, { k: 'hora', l: 'Horário', t: 'time', w: 2 },
      { k: 'status', l: 'Situação', t: 'select', o: ['Agendado', 'Realizado', 'Faltou', 'Cancelado', 'Remarcado'], req: true, w: 2 },
      { k: 'tipo', l: 'Tipo de atendimento', t: 'select', o: () => C().tiposAtend, req: true, w: 3 },
      { k: 'modalidade', l: 'Modalidade', t: 'select', o: ['Presencial', 'Online'], w: 3 },
      { k: 'maeId', l: 'Mãe atendida', t: 'select', blank: true, o: () => D.maes.filter((m) => m.situacao !== 'Desligada').sort(ordNome).map((m) => [m.id, m.nome]), req: true },
      { k: 'profId', l: 'Profissional', t: 'select', o: () => pessoas().filter((p) => p.sit !== 'Inativo' && p.sit !== 'Desligado' && p.sit !== 'Concluído').sort(ordNome).map((p) => [p.id, p.nome + ' · ' + (p.area || p.tipo)]), w: 3, help: 'Voluntários e estagiários cadastrados.' },
      { k: 'profNome', l: 'Ou nome da profissional (se não cadastrada)', w: 3 },
      { k: 'encaminhamento', l: 'Encaminhamento', help: 'Ex.: CRAS, Defensoria, CAPSi, escola…' },
      { k: 'obs', l: 'Observação administrativa', t: 'textarea', help: 'Sem conteúdo clínico ou sigiloso.' }
    ],
    grupos: () => [
      { k: 'tipo', l: 'Atividade', t: 'select', o: () => C().tiposGrupo, req: true, w: 3 },
      { k: 'data', l: 'Data', t: 'date', req: true, w: 2 }, { k: 'hora', l: 'Horário', t: 'time', w: 1 },
      { k: 'tema', l: 'Tema', req: true, w: 4 }, { k: 'local', l: 'Local', w: 2 },
      { k: 'facilitador', l: 'Facilitadora(s)', w: 4 }, { k: 'status', l: 'Situação', t: 'select', o: ['Planejado', 'Realizado', 'Cancelado'], w: 2 },
      { k: 'presentes', l: 'Mães presentes', t: 'presenca' },
      { k: 'extras', l: 'Outras participantes (não cadastradas)', t: 'number', w: 3 },
      { k: 'criancas', l: 'Crianças acolhidas no espaço', t: 'number', w: 3 },
      { k: 'fotos', l: 'Registro fotográfico feito', t: 'check', w: 3 }, { k: 'listaAssinada', l: 'Lista de presença assinada e arquivada', t: 'check', w: 3 },
      { k: 'relato', l: 'Resumo da atividade', t: 'textarea', help: 'Para o relatório: o que foi trabalhado, sem expor histórias pessoais.' }
    ],
    vol: () => [
      { t: 'sec', l: 'Dados pessoais' },
      { k: 'nome', l: 'Nome completo', req: true },
      { k: 'cpf', l: 'CPF', w: 2 }, { k: 'rg', l: 'RG', w: 2 }, { k: 'nasc', l: 'Nascimento', t: 'date', w: 2 },
      { k: 'tel', l: 'WhatsApp', t: 'tel', w: 3 }, { k: 'email', l: 'E-mail', t: 'email', w: 3 },
      { k: 'endereco', l: 'Endereço' },
      { t: 'sec', l: 'Voluntariado' },
      { k: 'area', l: 'Área', t: 'select', o: () => C().areas, w: 3 }, { k: 'registro', l: 'Registro profissional (CRP, OAB, CRESS…)', w: 3 },
      { k: 'funcao', l: 'Atividade que realiza' },
      { k: 'disponibilidade', l: 'Dias e horários', w: 4 }, { k: 'horasMes', l: 'Horas por mês (média)', t: 'number', w: 2 },
      { k: 'inicio', l: 'Início', t: 'date', w: 2 }, { k: 'fim', l: 'Saída', t: 'date', w: 2 },
      { k: 'situacao', l: 'Situação', t: 'select', o: ['Ativo', 'Inativo'], req: true, w: 2 },
      { k: 'termo', l: 'Termo de adesão assinado (Lei 9.608/1998)', t: 'check', w: 3 }, { k: 'termoData', l: 'Data do termo', t: 'date', w: 3 },
      { k: 'sigilo', l: 'Assinou compromisso de sigilo / LGPD', t: 'check' },
      { k: 'obs', l: 'Observações', t: 'textarea' }
    ],
    est: () => [
      { t: 'sec', l: 'Dados pessoais' },
      { k: 'nome', l: 'Nome completo', req: true },
      { k: 'cpf', l: 'CPF', w: 2 }, { k: 'rg', l: 'RG', w: 2 }, { k: 'nasc', l: 'Nascimento', t: 'date', w: 2 },
      { k: 'tel', l: 'WhatsApp', t: 'tel', w: 3 }, { k: 'email', l: 'E-mail', t: 'email', w: 3 },
      { k: 'endereco', l: 'Endereço' },
      { t: 'sec', l: 'Estágio' },
      { k: 'instituicao', l: 'Instituição de ensino', req: true, w: 4 }, { k: 'matricula', l: 'Matrícula', w: 2 },
      { k: 'curso', l: 'Curso', w: 3 }, { k: 'semestre', l: 'Período / semestre', w: 1 },
      { k: 'tipoEst', l: 'Tipo', t: 'select', o: ['Obrigatório', 'Não obrigatório'], w: 2 },
      { k: 'area', l: 'Área no instituto', t: 'select', o: () => C().areas, w: 3 },
      { k: 'situacao', l: 'Situação', t: 'select', o: ['Ativo', 'Concluído', 'Desligado'], req: true, w: 3 },
      { k: 'supervisor', l: 'Supervisor(a) no instituto', w: 4 }, { k: 'supervisorReg', l: 'Registro (CRP, OAB…)', w: 2 },
      { k: 'orientador', l: 'Professor(a) orientador(a) da instituição de ensino' },
      { k: 'inicio', l: 'Início', t: 'date', w: 2 }, { k: 'fim', l: 'Término previsto no termo', t: 'date', w: 2 },
      { k: 'cargaSemanal', l: 'Horas por semana', t: 'number', w: 2, help: 'Máximo 30h (6h/dia).' },
      { k: 'horario', l: 'Dias e horários', w: 3 },
      { k: 'bolsa', l: 'Bolsa (R$/mês)', t: 'money', w: 3, help: 'Obrigatória no estágio não obrigatório.' },
      { k: 'auxTransp', l: 'Auxílio-transporte (R$/mês)', t: 'money', w: 3 },
      { t: 'sec', l: 'Documentos do estágio' },
      { k: 'termo', l: 'Termo de compromisso assinado pelas 3 partes', t: 'check', w: 3 }, { k: 'termoData', l: 'Data do termo', t: 'date', w: 3 },
      { k: 'seguradora', l: 'Seguradora', w: 2 }, { k: 'apolice', l: 'Nº da apólice', w: 2 }, { k: 'seguroValidade', l: 'Seguro válido até', t: 'date', w: 2 },
      { k: 'ultimoRelatorio', l: 'Último relatório semestral entregue', t: 'date', w: 3 },
      { k: 'sigilo', l: 'Assinou compromisso de sigilo / LGPD', t: 'check', w: 3 },
      { k: 'obs', l: 'Observações', t: 'textarea' }
    ],
    fin: () => [
      { k: 'tipo', l: 'Tipo', t: 'select', o: [['e', 'Entrada (receita)'], ['s', 'Saída (despesa)']], req: true, w: 2 },
      { k: 'data', l: 'Data', t: 'date', req: true, w: 2 }, { k: 'valor', l: 'Valor (R$)', t: 'money', req: true, w: 2 },
      { k: 'cat', l: 'Categoria', t: 'select', dep: 'tipo', o: (f) => (f.tipo === 's' ? C().catSaida : C().catEntrada), req: true, w: 3 },
      { k: 'conta', l: 'Conta', t: 'select', o: () => C().contas, req: true, w: 3 },
      { k: 'desc', l: 'Descrição', req: true },
      { k: 'pessoa', l: 'Doador(a) / fornecedor', w: 4 }, { k: 'pessoaDoc', l: 'CPF / CNPJ', w: 2 },
      { k: 'forma', l: 'Forma', t: 'select', o: ['Pix', 'Dinheiro', 'Transferência', 'Boleto', 'Cartão', 'Depósito', 'Débito automático'], w: 2 },
      { k: 'fonte', l: 'Fonte do recurso / projeto', t: 'select', o: () => C().fontes, w: 2 },
      { k: 'docNum', l: 'Nº nota / recibo', w: 2 },
      { k: 'comprovante', l: 'Comprovante arquivado', t: 'check' },
      { k: 'obs', l: 'Observações', t: 'textarea' }
    ],
    bens: () => [
      { k: 'tomb', l: 'Nº de patrimônio', w: 2, help: 'Gerado sozinho se ficar vazio.' },
      { k: 'desc', l: 'Descrição do item', req: true, w: 4 },
      { k: 'cat', l: 'Categoria', t: 'select', o: () => C().catBens, w: 2 }, { k: 'qtd', l: 'Quantidade', t: 'number', w: 2 },
      { k: 'local', l: 'Local / sala', t: 'select', o: () => C().locais, w: 2 },
      { k: 'estado', l: 'Estado', t: 'select', o: ['Novo', 'Bom', 'Regular', 'Ruim', 'Baixado'], req: true, w: 2 },
      { k: 'origem', l: 'Origem', t: 'select', o: ['Compra', 'Doação', 'Cessão / comodato'], w: 2 },
      { k: 'data', l: 'Data de entrada', t: 'date', w: 2 },
      { k: 'doador', l: 'Doador / fornecedor', w: 4 }, { k: 'valor', l: 'Valor unitário (R$)', t: 'money', w: 2 },
      { k: 'nf', l: 'Nota fiscal / termo de doação', w: 3 }, { k: 'marca', l: 'Marca / modelo / nº de série', w: 3 },
      { k: 'baixaData', l: 'Data da baixa', t: 'date', w: 3, show: (f) => f.estado === 'Baixado' }, { k: 'baixaMotivo', l: 'Motivo da baixa', w: 3, show: (f) => f.estado === 'Baixado' },
      { k: 'obs', l: 'Observações', t: 'textarea' }
    ],
    doc: () => [
      { k: 'nome', l: 'Documento', req: true },
      { k: 'cat', l: 'Grupo', w: 3, t: 'select', o: () => [...new Set(D.docs.map((d) => d.cat).concat(['Constituição', 'Certidões', 'Funcionamento', 'Conselhos e títulos', 'Equipe', 'LGPD', 'Parcerias']))] },
      { k: 'tem', l: 'Temos o documento', t: 'check', w: 3 },
      { k: 'emissao', l: 'Emissão', t: 'date', w: 2 }, { k: 'validade', l: 'Válido até', t: 'date', w: 2 }, { k: 'dias', l: 'Validade padrão (dias)', t: 'number', w: 2, help: '0 = sem validade' },
      { k: 'local', l: 'Onde está guardado', help: 'Ex.: pasta azul, Google Drive / Documentos…' },
      { k: 'obs', l: 'Observações', t: 'textarea' }
    ],
    obrig: () => [
      { k: 'titulo', l: 'Obrigação', req: true },
      { k: 'freq', l: 'Frequência', t: 'select', o: [['m', 'Mensal'], ['a', 'Anual']], req: true, w: 2 },
      { k: 'mes', l: 'Mês (anual)', t: 'select', o: MESES.map((m, i) => [String(i + 1), cap(m)]), w: 2, show: (f) => f.freq === 'a' },
      { k: 'dia', l: 'Dia do prazo', t: 'number', w: 2 },
      { k: 'area', l: 'Área', w: 3 }, { k: 'cond', l: 'Quando se aplica', w: 3 },
      { k: 'desc', l: 'Detalhes', t: 'textarea' }
    ]
  };
  const ordNome = (a, b) => (a.nome || '').localeCompare(b.nome || '', 'pt-BR');

  function optList(f, item) { const o = typeof f.o === 'function' ? f.o(item) : f.o; return (o || []).map((x) => (Array.isArray(x) ? x : [x, x])); }
  function fieldHTML(f, item) {
    const v = item[f.k];
    const id = 'f_' + f.k;
    const cls = 'fld' + (f.w ? ' w' + f.w : '');
    const lab = f.l ? `<label for="${id}">${esc(f.l)}${f.req ? ' *' : ''}</label>` : '';
    const help = f.help ? `<small>${esc(f.help)}</small>` : '';
    const dk = `data-k="${esc(f.k || '')}"`;
    switch (f.t) {
      case 'sec': return `<h3 class="fsec">${esc(f.l)}</h3>`;
      case 'textarea': return `<div class="${cls}" ${dk}>${lab}<textarea id="${id}" name="${f.k}">${esc(v)}</textarea>${help}</div>`;
      case 'select': {
        const opts = optList(f, item);
        if (v && !opts.some((o) => o[0] === v)) opts.unshift([v, v]);
        return `<div class="${cls}" ${dk}>${lab}<select id="${id}" name="${f.k}">${f.req && opts.length && !f.blank ? '' : '<option value="">' + (f.blank ? 'Escolha…' : '—') + '</option>'}${opts.map((o) => `<option value="${esc(o[0])}"${o[0] === v ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select>${help}</div>`;
      }
      case 'check': return `<div class="${cls}" ${dk}><label class="chk"><input type="checkbox" id="${id}" name="${f.k}"${v ? ' checked' : ''}> ${esc(f.l)}</label>${help}</div>`;
      case 'multi': {
        const sel = Array.isArray(v) ? v : [];
        const opts = optList(f, item);
        sel.forEach((s) => { if (!opts.some((o) => o[0] === s)) opts.push([s, s]); });
        return `<div class="${cls}" ${dk}>${lab}<div class="multi" data-multi="${f.k}">${opts.map((o) => `<label><input type="checkbox" value="${esc(o[0])}"${sel.includes(o[0]) ? ' checked' : ''}>${esc(o[1])}</label>`).join('')}</div>${help}</div>`;
      }
      case 'money': return `<div class="${cls}" ${dk}>${lab}<input id="${id}" name="${f.k}" inputmode="decimal" placeholder="0,00" value="${v !== undefined && v !== '' && v !== null ? esc(n2(v)) : ''}">${help}</div>`;
      case 'filhos': return `<div class="${cls}" ${dk}><div id="filhos-box">${(Array.isArray(v) ? v : []).map(filhoHTML).join('')}</div><button type="button" class="btn sm" data-add-filho>${ic('plus')} Adicionar filho(a)</button></div>`;
      case 'presenca': {
        const sel = Array.isArray(v) ? v : [];
        const lista = D.maes.filter((m) => m.situacao !== 'Desligada' || sel.includes(m.id)).sort(ordNome);
        return `<div class="${cls}" ${dk}>${lab}<input type="search" placeholder="Buscar mãe…" data-pres-q style="margin-bottom:6px"><div class="pres" data-pres="${f.k}">${lista.length ? lista.map((m) => `<label data-n="${esc(m.nome.toLowerCase())}"><input type="checkbox" value="${m.id}"${sel.includes(m.id) ? ' checked' : ''}> ${esc(m.nome)}</label>`).join('') : '<div class="muted small" style="padding:8px 0">Nenhuma mãe cadastrada ainda.</div>'}</div><small data-pres-cnt>${sel.length} selecionada(s)</small></div>`;
      }
      default: return `<div class="${cls}" ${dk}>${lab}<input id="${id}" name="${f.k}" type="${f.t || 'text'}" value="${esc(v)}">${help}</div>`;
    }
  }
  function filhoHTML(fi) {
    fi = fi || {};
    const d = Array.isArray(fi.diag) ? fi.diag : [];
    const sel = (k, o) => `<select data-fk="${k}"><option value="">—</option>${o.map((x) => `<option${fi[k] === x ? ' selected' : ''}>${x}</option>`).join('')}</select>`;
    return `<fieldset class="filho"><div class="filho-h">Filho(a) <button type="button" class="btn sm bad" data-rm-filho>Remover</button></div>
      <div class="fld w4"><label>Nome</label><input data-fk="nome" value="${esc(fi.nome)}"></div>
      <div class="fld w2"><label>Nascimento</label><input type="date" data-fk="nasc" value="${esc(fi.nasc)}"></div>
      <div class="fld"><label>Diagnóstico / condição</label><div class="multi">${DIAGS.map((x) => `<label><input type="checkbox" data-diag value="${esc(x)}"${d.includes(x) ? ' checked' : ''}>${esc(x)}</label>`).join('')}</div></div>
      <div class="fld w2"><label>CID (se houver)</label><input data-fk="cid" value="${esc(fi.cid)}"></div>
      <div class="fld w2"><label>Laudo</label>${sel('laudo', ['Sim', 'Não', 'Em avaliação'])}</div>
      <div class="fld w2"><label>BPC</label>${sel('bpc', ['Recebe', 'Em processo', 'Não recebe'])}</div>
      <div class="fld w3"><label>Escola / série</label><input data-fk="escola" value="${esc(fi.escola)}"></div>
      <div class="fld w3"><label>Terapias que faz</label><input data-fk="terapias" value="${esc(fi.terapias)}"></div></fieldset>`;
  }
  function readForm(form, fields) {
    const o = {};
    fields.forEach((f) => {
      if (f.t === 'sec' || !f.k) return;
      if (f.t === 'multi') { o[f.k] = $$(`[data-multi="${f.k}"] input:checked`, form).map((i) => i.value); return; }
      if (f.t === 'presenca') { o[f.k] = $$(`[data-pres="${f.k}"] input:checked`, form).map((i) => i.value); return; }
      if (f.t === 'filhos') {
        o[f.k] = $$('#filhos-box fieldset', form).map((fs) => {
          const x = {}; $$('[data-fk]', fs).forEach((i) => { x[i.dataset.fk] = i.value.trim(); });
          x.diag = $$('[data-diag]:checked', fs).map((i) => i.value); return x;
        }).filter((x) => x.nome || x.nasc || x.diag.length);
        return;
      }
      const el = form.elements[f.k]; if (!el) return;
      if (f.t === 'check') o[f.k] = el.checked;
      else if (f.t === 'money') o[f.k] = el.value.trim() === '' ? '' : parseMoney(el.value);
      else if (f.t === 'number') o[f.k] = el.value === '' ? '' : +el.value;
      else o[f.k] = el.value.trim();
    });
    return o;
  }
  function openForm(titulo, fields, item, onSave, extraHTML) {
    const dlg = $('#dlg');
    item = Object.assign({}, item);
    dlg.innerHTML = `<form class="dlg-form" novalidate><header><h2>${esc(titulo)}</h2><button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button></header>
      <div class="dlg-body">${fields.map((f) => fieldHTML(f, item)).join('')}</div>
      <footer>${extraHTML || ''}<button type="button" class="btn ghost" data-close>Cancelar</button><button type="submit" class="btn gold">${ic('check')} Salvar</button></footer></form>`;
    const form = $('form', dlg);
    const atual = () => Object.assign({}, item, readForm(form, fields));
    const vis = () => { const cur = atual(); fields.forEach((f) => { if (f.show) { const el = $(`.fld[data-k="${f.k}"]`, form); if (el) el.hidden = !f.show(cur); } }); };
    form.addEventListener('change', (e) => {
      const nm = e.target.name;
      if (nm) fields.filter((f) => f.dep === nm).forEach((f) => { const cur = atual(); cur[f.k] = ''; const el = $(`.fld[data-k="${f.k}"]`, form); if (el) el.outerHTML = fieldHTML(f, cur); });
      if (e.target.closest('[data-pres]')) { const c = $('[data-pres-cnt]', form); if (c) c.textContent = $$('[data-pres] input:checked', form).length + ' selecionada(s)'; }
      vis();
    });
    form.addEventListener('input', (e) => {
      if (e.target.matches('[data-pres-q]')) { const q = e.target.value.toLowerCase().trim(); $$('[data-pres] label', form).forEach((l) => { l.hidden = q && !l.dataset.n.includes(q); }); }
    });
    form.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) { dlg.close(); return; }
      if (e.target.closest('[data-add-filho]')) { $('#filhos-box', form).insertAdjacentHTML('beforeend', filhoHTML({})); return; }
      const rm = e.target.closest('[data-rm-filho]'); if (rm) { rm.closest('fieldset').remove(); }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = atual();
      const falta = fields.filter((f) => f.req && (v[f.k] === '' || v[f.k] === undefined || v[f.k] === null) && !(f.show && !f.show(v)));
      if (falta.length) { toast('Preencha: ' + falta.map((f) => f.l).join(', ')); const el = form.elements[falta[0].k]; if (el && el.focus) el.focus(); return; }
      if (onSave(v) !== false) dlg.close();
    });
    vis();
    dlg.showModal();
    const first = $('input:not([type=checkbox]):not([type=search]), select', form); if (first && window.innerWidth > 700) first.focus();
  }
  function upsert(col, obj) {
    if (!obj.id) { obj.id = uid(); obj.criado = new Date().toISOString(); }
    obj.alterado = new Date().toISOString();
    const i = D[col].findIndex((x) => x.id === obj.id);
    if (i >= 0) D[col][i] = obj; else D[col].push(obj);
    save(); render(); toast('Salvo');
  }
  function remove(col, id, txt) {
    if (!confirm('Excluir ' + (txt || 'este registro') + '? Esta ação não pode ser desfeita.')) return;
    D[col] = D[col].filter((x) => x.id !== id); save(); render(); toast('Excluído');
  }

  /* ================= regras / alertas ================= */
  function obrigLista(freq) {
    const base = freq === 'm' ? OB.mensais : OB.anuais;
    return base.filter((x) => !D.obrigOcultas.includes(x.id)).concat(D.obrigCustom.filter((x) => x.freq === freq).map((x) => Object.assign({ custom: true }, x, { mes: +x.mes || 12, dia: +x.dia || (freq === 'm' ? 10 : 31) })));
  }
  function prazoMensal(o, ym) { const fm = fimMes(ym); const d = Math.min(+o.dia || 10, +fm.slice(8)); return ym + '-' + String(d).padStart(2, '0'); }
  function prazoAnual(o, ano) {
    const m = +o.mes; if (o.dia === 'U') return ultimoDiaUtil(+ano, m);
    const fm = fimMes(ano + '-' + String(m).padStart(2, '0')); const d = Math.min(+o.dia || 28, +fm.slice(8));
    return ano + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
  }
  function obStatus(key, prazo) {
    const r = D.obrig[key];
    if (r && r.s === 'ok') return { s: 'feito', b: 'b-ok', t: 'Feito' + (r.data ? ' em ' + fmtD(r.data) : '') };
    if (r && r.s === 'na') return { s: 'na', b: '', t: 'Não se aplica' };
    if (prazo < (D.inicio || '')) return { s: 'anterior', b: '', t: 'Antes do início do app' };
    const h = hoje();
    if (h > prazo) return { s: 'atrasada', b: 'b-bad', t: 'Atrasada' };
    if (diasEntre(h, prazo) <= 7) return { s: 'proxima', b: 'b-warn', t: 'Vence em ' + diasEntre(h, prazo) + ' dia(s)' };
    return { s: 'pendente', b: 'b-info', t: 'Pendente' };
  }
  function docStatus(d) {
    const h = hoje();
    if (!d.tem) return { s: 'falta', b: d.ess ? 'b-bad' : '', t: d.ess ? 'Falta (essencial)' : 'Não temos' };
    if (d.validade) {
      if (d.validade < h) return { s: 'vencido', b: 'b-bad', t: 'Vencido em ' + fmtD(d.validade) };
      const n = diasEntre(h, d.validade);
      if (n <= 30) return { s: 'vencendo', b: 'b-warn', t: 'Vence em ' + n + ' dia(s)' };
      return { s: 'valido', b: 'b-ok', t: 'Válido até ' + fmtD(d.validade) };
    }
    if (+d.dias > 0) return { s: 'semdata', b: 'b-warn', t: 'Informe a validade' };
    return { s: 'ok', b: 'b-ok', t: 'Em dia' };
  }
  function estAlertas(e) {
    const a = []; const h = hoje();
    if (e.situacao !== 'Ativo') return a;
    if (!e.termo) a.push(['alta', 'sem termo de compromisso assinado']);
    if (!e.apolice) a.push(['alta', 'sem seguro contra acidentes pessoais (art. 9º, IV)']);
    else if (e.seguroValidade && e.seguroValidade < h) a.push(['alta', 'seguro vencido em ' + fmtD(e.seguroValidade)]);
    else if (e.seguroValidade && diasEntre(h, e.seguroValidade) <= 30) a.push(['media', 'seguro vence em ' + fmtD(e.seguroValidade)]);
    if (e.fim && e.fim < h) a.push(['alta', 'termo terminou em ' + fmtD(e.fim) + ': renovar ou encerrar']);
    else if (e.fim && diasEntre(h, e.fim) <= 30) a.push(['media', 'termo termina em ' + fmtD(e.fim)]);
    if (+e.cargaSemanal > 30) a.push(['alta', 'carga acima de 30h semanais (art. 10)']);
    if (e.inicio && e.fim && diasEntre(e.inicio, e.fim) > 730) a.push(['media', 'estágio passa de 2 anos (art. 11)']);
    if (e.tipoEst === 'Não obrigatório' && !(+e.bolsa > 0)) a.push(['alta', 'estágio não obrigatório sem bolsa (art. 12)']);
    if (!e.supervisor) a.push(['media', 'sem supervisor(a) definido(a)']);
    const ref = e.ultimoRelatorio || e.inicio;
    if (ref && diasEntre(ref, h) > 183) a.push(['media', 'relatório semestral de atividades atrasado']);
    return a;
  }
  function pendencias() {
    const P = []; const h = hoje(); const ym = ymHoje(); const ano = h.slice(0, 4);
    D.docs.forEach((d) => { const s = docStatus(d); if (s.s === 'vencido') P.push({ n: 'alta', t: d.nome + ': vencido', tab: 'docs', sub: 'pasta' }); else if (s.s === 'vencendo') P.push({ n: 'media', t: d.nome + ': ' + s.t.toLowerCase(), tab: 'docs', sub: 'pasta' }); else if (s.s === 'falta' && d.ess) P.push({ n: 'media', t: 'Documento essencial faltando: ' + d.nome, tab: 'docs', sub: 'pasta' }); });
    const atr = obrigLista('m').filter((o) => { const st = obStatus('m:' + ym + ':' + o.id, prazoMensal(o, ym)).s; return st === 'atrasada'; });
    const ant = ymAdd(ym, -1);
    const atrAnt = obrigLista('m').filter((o) => obStatus('m:' + ant + ':' + o.id, prazoMensal(o, ant)).s === 'atrasada' && !o.cond);
    if (atr.length) P.push({ n: 'alta', t: atr.length + ' obrigação(ões) mensal(is) atrasada(s): ' + atr.slice(0, 3).map((o) => o.titulo).join('; ') + (atr.length > 3 ? '…' : ''), tab: 'docs', sub: 'mensais' });
    if (atrAnt.length) P.push({ n: 'media', t: atrAnt.length + ' obrigação(ões) de ' + mesNome(ant).toLowerCase() + ' sem marcar', tab: 'docs', sub: 'mensais', mes: ant });
    const anAtr = [];
    obrigLista('a').forEach((o) => { const pz = prazoAnual(o, ano); const st = obStatus('a:' + ano + ':' + o.id, pz); if (st.s === 'atrasada') anAtr.push(o); else if (st.s === 'pendente' || st.s === 'proxima') { if (diasEntre(h, pz) <= 30) P.push({ n: 'media', t: 'Anual até ' + fmtD(pz) + ': ' + o.titulo, tab: 'docs', sub: 'anuais' }); } });
    if (anAtr.length) P.push({ n: anAtr.some((o) => !o.cond) ? 'alta' : 'media', t: anAtr.length + ' obrigação(ões) anual(is) atrasada(s): ' + anAtr.slice(0, 3).map((o) => o.titulo).join('; ') + (anAtr.length > 3 ? '…' : ''), tab: 'docs', sub: 'anuais' });
    D.est.forEach((e) => estAlertas(e).forEach(([n, t]) => P.push({ n, t: 'Estagiário(a) ' + e.nome + ': ' + t, tab: 'est' })));
    const volSem = D.vol.filter((v) => v.situacao === 'Ativo' && !v.termo);
    if (volSem.length) P.push({ n: 'media', t: volSem.length + ' voluntário(s) ativo(s) sem termo de adesão: ' + volSem.map((v) => v.nome.split(' ')[0]).join(', '), tab: 'vol' });
    const maeSem = D.maes.filter((m) => m.situacao === 'Ativa' && !m.lgpd);
    if (maeSem.length) P.push({ n: 'media', t: maeSem.length + ' mãe(s) ativa(s) sem termo de consentimento LGPD', tab: 'maes' });
    const circ = C().tiposGrupo[0];
    if (circ && !D.grupos.some((g) => g.tipo === circ && g.data.slice(0, 7) === ym && g.status !== 'Cancelado')) P.push({ n: 'info', t: circ + ' deste mês ainda não foi agendado', tab: 'grupos' });
    const semComp = D.fin.filter((f) => f.data.slice(0, 7) <= ym && f.data.slice(0, 7) >= ymAdd(ym, -2) && !f.comprovante).length;
    if (semComp) P.push({ n: 'info', t: semComp + ' lançamento(s) dos últimos meses sem comprovante arquivado', tab: 'fin' });
    const totalReg = D.maes.length + D.fin.length + D.atend.length;
    if (totalReg && (!C().ultimoBackup || diasEntre(C().ultimoBackup.slice(0, 10), h) > 30)) P.push({ n: 'media', t: C().ultimoBackup ? 'Última cópia de segurança em ' + fmtD(C().ultimoBackup) + ': baixe uma nova' : 'Você ainda não baixou nenhuma cópia de segurança', tab: 'cfg' });
    const ord = { alta: 0, media: 1, info: 2 };
    return P.sort((a, b) => ord[a.n] - ord[b.n]);
  }

  /* ================= financeiro: contas ================= */
  const finSort = (a, b) => (a.data + (a.criado || '')).localeCompare(b.data + (b.criado || ''));
  const sinal = (f) => (f.tipo === 'e' ? 1 : -1) * (+f.valor || 0);
  function saldoAntes(dataExcl, conta) {
    let s = 0;
    C().contas.forEach((c) => { if (!conta || conta === c) s += +C().saldoIni[c] || 0; });
    D.fin.forEach((f) => { if (f.data < dataExcl && (!conta || f.conta === conta)) s += sinal(f); });
    return s;
  }
  const saldoAtual = (conta) => saldoAntes('9999-12-31', conta);
  function resumoMes(ym) {
    const L = D.fin.filter((f) => f.data.slice(0, 7) === ym);
    const e = L.filter((f) => f.tipo === 'e').reduce((a, f) => a + (+f.valor || 0), 0);
    const s = L.filter((f) => f.tipo === 's').reduce((a, f) => a + (+f.valor || 0), 0);
    return { L, e, s, ini: saldoAntes(ym + '-01'), fim: saldoAntes(ym + '-01') + e - s };
  }
  function porCat(L, tipo) {
    const m = {}; L.filter((f) => f.tipo === tipo).forEach((f) => { m[f.cat || 'Sem categoria'] = (m[f.cat || 'Sem categoria'] || 0) + (+f.valor || 0); });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }

  /* ================= navegação ================= */
  function renderTabs() {
    const p = pendencias(); const altas = p.filter((x) => x.n === 'alta').length;
    $('#tabs').innerHTML = TABS.map((t) => `<button data-tab="${t.id}"${UI.tab === t.id ? ' aria-current="page"' : ''}>${ic(t.id)} ${t.nome}${t.id === 'painel' && altas ? ` <span class="badge b-bad">${altas}</span>` : ''}</button>`).join('');
  }
  function go(tab, extra) {
    UI.tab = TABS.some((t) => t.id === tab) ? tab : 'painel';
    if (extra && UI.tab === 'docs') { if (extra.sub) UI.docs.sub = extra.sub; if (extra.mes) UI.docs.mes = extra.mes; }
    if (location.hash.slice(1) !== UI.tab) history.replaceState(null, '', '#' + UI.tab);
    render(); window.scrollTo(0, 0);
    const b = $(`#tabs [data-tab="${UI.tab}"]`); if (b && b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
  function render() {
    renderTabs();
    const fn = VIEWS[UI.tab] || VIEWS.painel;
    $('#main').innerHTML = fn();
    const lf = LISTS[UI.tab]; if (lf) lf();
  }
  function head(t, p, btns) { return `<div class="head"><div><h1>${t}</h1>${p ? `<p>${p}</p>` : ''}</div>${btns ? `<div class="btns">${btns}</div>` : ''}</div>`; }
  const optsHTML = (arr, v, todos) => (todos !== false ? `<option value="">${todos || 'Todos'}</option>` : '') + arr.map((o) => { const [a, b] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(a)}"${a === v ? ' selected' : ''}>${esc(b)}</option>`; }).join('');
  function tbl(cols, rows, vazio) {
    if (!rows.length) return `<div class="empty">${vazio || '<b>Nada por aqui ainda</b>'}</div>`;
    return `<table class="tbl"><thead><tr>${cols.map((c) => `<th class="${c.c || ''}">${c.h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${cols.map((c) => `<td class="${c.c || ''}"${c.h ? ` data-l="${esc(c.h)}"` : ''}>${c.v(r)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  const acts = (col, id, extra) => `${extra || ''}<button class="btn sm" data-act="edit" data-col="${col}" data-id="${id}">Editar</button><button class="btn sm bad" data-act="del" data-col="${col}" data-id="${id}">Excluir</button>`;

  /* ================= telas ================= */
  const VIEWS = {}; const LISTS = {};

  VIEWS.painel = () => {
    const ym = ymHoje(); const h = hoje(); const r = resumoMes(ym);
    const ativas = D.maes.filter((m) => m.situacao === 'Ativa').length;
    const espera = D.maes.filter((m) => m.situacao === 'Lista de espera').length;
    const atMes = D.atend.filter((a) => a.data.slice(0, 7) === ym && a.status === 'Realizado');
    const grMes = D.grupos.filter((g) => g.data.slice(0, 7) === ym && g.status !== 'Cancelado' && g.status !== 'Planejado');
    const partic = grMes.reduce((a, g) => a + (g.presentes || []).length + (+g.extras || 0), 0);
    const atendidas = new Set([...atMes.map((a) => a.maeId), ...grMes.flatMap((g) => g.presentes || [])]).size;
    const P = pendencias();
    const ms = obrigLista('m'); const feitos = ms.filter((o) => { const s = obStatus('m:' + ym + ':' + o.id, prazoMensal(o, ym)).s; return s === 'feito' || s === 'na' || s === 'anterior'; }).length;
    const prox = [
      ...D.atend.filter((a) => a.status === 'Agendado' && a.data >= h && diasEntre(h, a.data) <= 14).map((a) => ({ d: a.data, h: a.hora, t: a.tipo, s: nomeMae(a.maeId, a.maeNome) + (a.profId || a.profNome ? ' · ' + nomePessoa(a.profId, a.profNome) : ''), tab: 'atend' })),
      ...D.grupos.filter((g) => g.data >= h && g.status !== 'Cancelado' && diasEntre(h, g.data) <= 45).map((g) => ({ d: g.data, h: g.hora, t: g.tipo, s: g.tema, tab: 'grupos', gold: true }))
    ].sort((a, b) => (a.d + (a.h || '')).localeCompare(b.d + (b.h || ''))).slice(0, 8);
    const hr = new Date().getHours(); const saud = hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite';
    const porTipo = C().tiposAtend.map((t) => [t, atMes.filter((a) => a.tipo === t).length]);
    const maxT = Math.max(1, ...porTipo.map((x) => x[1]));
    return head(`${saud}! <span class="script">Luma</span>`, `${cap(new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}`, `<button class="btn gold" data-act="new" data-col="atend">${ic('plus')} Atendimento</button><button class="btn" data-act="new" data-col="fin">${ic('plus')} Lançamento</button><button class="btn" data-act="new" data-col="maes">${ic('plus')} Mãe</button>`) +
      `<div class="grid-cards">
        <div class="kpi"><div class="l">Mães ativas</div><div class="v">${ativas}</div><div class="s">${espera} na lista de espera</div></div>
        <div class="kpi"><div class="l">Atendimentos no mês</div><div class="v">${atMes.length}</div><div class="s">${atendidas} mãe(s) atendida(s) em ${MESES[+ym.slice(5) - 1]}</div></div>
        <div class="kpi"><div class="l">Grupos no mês</div><div class="v">${grMes.length}</div><div class="s">${partic} participação(ões)</div></div>
        <div class="kpi"><div class="l">Saldo atual</div><div class="v${saldoAtual() < 0 ? ' neg' : ''}">${brl(saldoAtual())}</div><div class="s">Mês: +${brl(r.e)} / −${brl(r.s)}</div></div>
        <div class="kpi"><div class="l">Equipe ativa</div><div class="v">${D.vol.filter((v) => v.situacao === 'Ativo').length + D.est.filter((e) => e.situacao === 'Ativo').length}</div><div class="s">${D.vol.filter((v) => v.situacao === 'Ativo').length} voluntário(s) · ${D.est.filter((e) => e.situacao === 'Ativo').length} estagiário(s)</div></div>
      </div>
      <div class="cols">
        <div class="card"><h2>Pendências <small>${P.length ? P.length + ' item(ns)' : ''}</small></h2>
          <div class="list">${P.length ? P.slice(0, 14).map((p, i) => `<button class="alert ${p.n}" data-pend="${i}"><span class="dot"></span><span>${esc(p.t)}</span></button>`).join('') : '<div class="empty"><b>Tudo em dia ✨</b>Nenhuma pendência encontrada.</div>'}</div></div>
        <div class="card"><h2>Próximos compromissos</h2>
          <div class="list">${prox.length ? prox.map((x) => `<button class="alert ${x.gold ? 'media' : 'info'}" data-go="${x.tab}"><span class="dot"></span><span><b>${fmtD(x.d).slice(0, 5)}${x.h ? ' · ' + esc(x.h) : ''}</b> — ${esc(x.t)}<br><span class="muted small">${esc(x.s)}</span></span></button>`).join('') : '<div class="empty">Nenhum atendimento agendado nos próximos 14 dias.</div>'}</div></div>
        <div class="card"><h2>Obrigações de ${MESES[+ym.slice(5) - 1]}</h2>
          <div class="progress" style="margin:6px 0 8px"><i style="width:${ms.length ? Math.round((feitos / ms.length) * 100) : 0}%"></i></div>
          <p class="muted small" style="margin:0 0 12px">${feitos} de ${ms.length} concluídas ou marcadas como "não se aplica".</p>
          <button class="btn sm" data-go="docs">Abrir checklist do mês</button>
          <h2 style="margin-top:18px">Atendimentos por tipo <small>${MESES[+ym.slice(5) - 1]}</small></h2>
          ${porTipo.map(([t, n]) => `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between" class="small"><span>${esc(t)}</span><b>${n}</b></div><div class="progress"><i style="width:${(n / maxT) * 100}%"></i></div></div>`).join('')}
        </div>
      </div>`;
  };
  let _pend = [];
  LISTS.painel = () => { _pend = pendencias(); };

  /* ---- mães ---- */
  VIEWS.maes = () => {
    const f = UI.maes;
    return head('Mães', 'Cadastro das mães e dos filhos atendidos pelo instituto. Feito só pela equipe.', `<button class="btn gold" data-act="new" data-col="maes">${ic('plus')} Nova mãe</button><button class="btn" data-rep="maes-lista">${ic('print')} Imprimir relação</button>`) +
      `<div class="toolbar"><input type="search" placeholder="Buscar por nome, filho, bairro, telefone…" data-f="maes.q" value="${esc(f.q)}">
      <select data-f="maes.sit">${optsHTML(['Ativa', 'Lista de espera', 'Desligada'], f.sit, 'Todas as situações')}</select>
      <select data-f="maes.serv">${optsHTML([...C().tiposAtend, ...C().tiposGrupo], f.serv, 'Todos os serviços')}</select><span class="cnt" id="cnt"></span></div><div id="lista"></div>`;
  };
  LISTS.maes = () => {
    const f = UI.maes; const q = f.q.toLowerCase().trim();
    const L = D.maes.filter((m) => (!f.sit || m.situacao === f.sit) && (!f.serv || (m.servicos || []).includes(f.serv)) && (!q || [m.nome, m.bairro, m.tel, m.cpf, ...(m.filhos || []).map((x) => x.nome)].join(' ').toLowerCase().includes(q))).sort(ordNome);
    $('#cnt').textContent = L.length + ' de ' + D.maes.length;
    $('#lista').innerHTML = tbl([
      { h: 'Mãe', v: (m) => `<div class="nm">${esc(m.nome)}</div><div class="sub">${esc([m.tel, m.bairro].filter(Boolean).join(' · '))}</div>` },
      { h: 'Filhos', v: (m) => (m.filhos || []).map((x) => `<div>${esc(x.nome || 'Filho(a)')}${x.nasc ? ` <span class="sub">${idade(x.nasc)} anos</span>` : ''}<div class="sub">${esc((x.diag || []).join(', '))}</div></div>`).join('') || '<span class="muted">—</span>' },
      { h: 'Serviços', v: (m) => (m.servicos || []).map((s) => `<span class="badge" style="margin:0 4px 4px 0">${esc(s)}</span>`).join('') || '<span class="muted">—</span>' },
      { h: 'Situação', v: (m) => `<span class="badge ${m.situacao === 'Ativa' ? 'b-ok' : m.situacao === 'Lista de espera' ? 'b-warn' : ''}">${esc(m.situacao)}</span>${m.lgpd ? '' : '<div style="margin-top:4px"><span class="badge b-bad">Sem termo LGPD</span></div>'}` },
      { h: '', c: 'acts', v: (m) => acts('maes', m.id, `<button class="btn sm" data-rep="mae-ficha" data-id="${m.id}">${ic('print')} Ficha + termo</button>`) }
    ], L, D.maes.length ? '<b>Nenhuma mãe encontrada</b>Mude os filtros.' : '<b>Nenhuma mãe cadastrada</b>Toque em "Nova mãe" para começar.');
  };

  /* ---- atendimentos ---- */
  VIEWS.atend = () => {
    const f = UI.atend;
    return head('Atendimentos', 'Psicológico, jurídico e social. Registro administrativo (data, tipo, profissional, situação) para relatórios e prestação de contas.', `<button class="btn gold" data-act="new" data-col="atend">${ic('plus')} Novo atendimento</button>`) +
      `<div class="note"><b>Sigilo:</b> aqui fica só o registro administrativo. O conteúdo do atendimento vai no prontuário da profissional (psicologia: Resolução CFP 01/2009; jurídico: sigilo profissional da OAB; social: código de ética do CRESS).</div>
      <div class="toolbar"><input type="month" data-f="atend.mes" value="${f.mes}" aria-label="Mês"><select data-f="atend.tipo">${optsHTML(C().tiposAtend, f.tipo, 'Todos os tipos')}</select>
      <select data-f="atend.status">${optsHTML(['Agendado', 'Realizado', 'Faltou', 'Cancelado', 'Remarcado'], f.status, 'Todas as situações')}</select>
      <input type="search" placeholder="Buscar mãe ou profissional…" data-f="atend.q" value="${esc(f.q)}"><span class="cnt" id="cnt"></span></div><div id="lista"></div>`;
  };
  LISTS.atend = () => {
    const f = UI.atend; const q = f.q.toLowerCase().trim();
    const L = D.atend.filter((a) => (!f.mes || a.data.slice(0, 7) === f.mes) && (!f.tipo || a.tipo === f.tipo) && (!f.status || a.status === f.status) && (!q || (nomeMae(a.maeId, a.maeNome) + ' ' + nomePessoa(a.profId, a.profNome)).toLowerCase().includes(q))).sort((a, b) => (a.data + (a.hora || '')).localeCompare(b.data + (b.hora || '')));
    const real = L.filter((a) => a.status === 'Realizado').length;
    $('#cnt').textContent = L.length + ' registro(s) · ' + real + ' realizado(s)';
    const cor = { Agendado: 'b-info', Realizado: 'b-ok', Faltou: 'b-bad', Cancelado: '', Remarcado: 'b-warn' };
    $('#lista').innerHTML = tbl([
      { h: 'Data', v: (a) => `<div class="nm">${fmtD(a.data)}</div><div class="sub">${esc(a.hora || '')} ${esc(a.modalidade || '')}</div>` },
      { h: 'Tipo', v: (a) => esc(a.tipo) },
      { h: 'Mãe', v: (a) => `<div class="nm">${esc(nomeMae(a.maeId, a.maeNome))}</div>${a.encaminhamento ? `<div class="sub">Encaminhada: ${esc(a.encaminhamento)}</div>` : ''}` },
      { h: 'Profissional', v: (a) => esc(nomePessoa(a.profId, a.profNome)) || '<span class="muted">—</span>' },
      { h: 'Situação', v: (a) => `<span class="badge ${cor[a.status] || ''}">${esc(a.status)}</span>` },
      { h: '', c: 'acts', v: (a) => acts('atend', a.id, a.status === 'Agendado' ? `<button class="btn sm" data-act="realizado" data-id="${a.id}">${ic('check')} Realizado</button><button class="btn sm" data-act="faltou" data-id="${a.id}">Faltou</button>` : '') }
    ], L, '<b>Nenhum atendimento neste mês</b>Use "Novo atendimento" ou mude o mês.');
  };

  /* ---- grupos ---- */
  VIEWS.grupos = () => {
    const f = UI.grupos; const anos = [...new Set([hoje().slice(0, 4), ...D.grupos.map((g) => g.data.slice(0, 4))])].sort().reverse();
    return head(`<span class="script">Círculo de Cuidado</span> e grupos`, 'O Círculo de Cuidado Luma (roda de conversa e compartilhamento, 1 vez por mês), oficinas e eventos, com lista de presença para imprimir.', `<button class="btn gold" data-act="new" data-col="grupos">${ic('plus')} Novo encontro</button><button class="btn" data-rep="presenca-branco">${ic('print')} Lista de presença em branco</button>`) +
      `<div class="toolbar"><select data-f="grupos.ano">${optsHTML(anos, f.ano, false)}</select><select data-f="grupos.tipo">${optsHTML(C().tiposGrupo, f.tipo, 'Todas as atividades')}</select><span class="cnt" id="cnt"></span></div>
      <div id="calendario"></div><div id="lista"></div>`;
  };
  LISTS.grupos = () => {
    const f = UI.grupos; const circ = C().tiposGrupo[0];
    const L = D.grupos.filter((g) => g.data.slice(0, 4) === f.ano && (!f.tipo || g.tipo === f.tipo)).sort((a, b) => b.data.localeCompare(a.data));
    const tot = L.filter((g) => g.status !== 'Cancelado').reduce((a, g) => a + (g.presentes || []).length + (+g.extras || 0), 0);
    $('#cnt').textContent = L.length + ' encontro(s) · ' + tot + ' participação(ões)';
    const meses = MES_C.map((m, i) => { const ym = f.ano + '-' + String(i + 1).padStart(2, '0'); const g = D.grupos.find((x) => x.tipo === circ && x.data.slice(0, 7) === ym && x.status !== 'Cancelado'); const passou = ym < ymHoje(); return `<div class="kpi" style="padding:10px 12px"><div class="l">${m}</div><div class="small" style="margin-top:4px">${g ? `<span class="badge ${g.status === 'Realizado' ? 'b-ok' : 'b-info'}">${g.status === 'Realizado' ? '✓ ' : ''}${fmtD(g.data).slice(0, 5)}</span>` : `<span class="badge ${passou ? 'b-bad' : ''}">${passou ? 'Não houve' : 'A agendar'}</span>`}</div></div>`; }).join('');
    $('#calendario').innerHTML = circ ? `<div class="card" style="margin-bottom:14px"><h2>${esc(circ)} · ${f.ano} <small>um encontro por mês</small></h2><div class="grid-cards" style="grid-template-columns:repeat(auto-fill,minmax(88px,1fr));margin:0">${meses}</div></div>` : '';
    $('#lista').innerHTML = tbl([
      { h: 'Data', v: (g) => `<div class="nm">${fmtD(g.data)}</div><div class="sub">${esc(g.hora || '')}</div>` },
      { h: 'Atividade', v: (g) => `<div class="nm">${esc(g.tema)}</div><div class="sub">${esc(g.tipo)}${g.facilitador ? ' · ' + esc(g.facilitador) : ''}</div>` },
      { h: 'Participantes', c: 'r', v: (g) => `<b>${(g.presentes || []).length + (+g.extras || 0)}</b>${+g.criancas ? `<div class="sub">${g.criancas} criança(s)</div>` : ''}` },
      { h: 'Situação', v: (g) => `<span class="badge ${g.status === 'Realizado' ? 'b-ok' : g.status === 'Cancelado' ? '' : 'b-info'}">${esc(g.status || 'Planejado')}</span>${g.status === 'Realizado' && !g.listaAssinada ? '<div style="margin-top:4px"><span class="badge b-warn">Lista não arquivada</span></div>' : ''}` },
      { h: '', c: 'acts', v: (g) => acts('grupos', g.id, `<button class="btn sm" data-rep="presenca" data-id="${g.id}">${ic('print')} Lista de presença</button><button class="btn sm" data-rep="grupo-relato" data-id="${g.id}">${ic('print')} Relato</button>`) }
    ], L, '<b>Nenhum encontro registrado neste ano</b>Use "Novo encontro" para planejar o Círculo de Cuidado Luma.');
  };

  /* ---- voluntários ---- */
  VIEWS.vol = () => head('Voluntários', 'Cadastro, termo de adesão (Lei 9.608/1998), declaração e folha de frequência.', `<button class="btn gold" data-act="new" data-col="vol">${ic('plus')} Novo voluntário</button><button class="btn" data-rep="equipe-lista">${ic('print')} Relação da equipe</button>`) +
    `<div class="note"><b>Lei do voluntariado:</b> todo voluntário precisa de <b>termo de adesão</b> com a atividade e as condições. Não gera vínculo de emprego. Despesas só podem ser reembolsadas se autorizadas e comprovadas.</div>
    <div class="toolbar"><input type="search" placeholder="Buscar…" data-f="vol.q" value="${esc(UI.vol.q)}"><select data-f="vol.sit">${optsHTML(['Ativo', 'Inativo'], UI.vol.sit)}</select><span class="cnt" id="cnt"></span></div><div id="lista"></div>`;
  LISTS.vol = () => {
    const f = UI.vol; const q = f.q.toLowerCase();
    const L = D.vol.filter((v) => (!f.sit || v.situacao === f.sit) && (!q || [v.nome, v.area, v.funcao].join(' ').toLowerCase().includes(q))).sort(ordNome);
    $('#cnt').textContent = L.length + ' de ' + D.vol.length;
    $('#lista').innerHTML = tbl([
      { h: 'Nome', v: (v) => `<div class="nm">${esc(v.nome)}</div><div class="sub">${esc([v.tel, v.email].filter(Boolean).join(' · '))}</div>` },
      { h: 'Área', v: (v) => `${esc(v.area || '—')}<div class="sub">${esc(v.funcao || '')}${v.registro ? ' · ' + esc(v.registro) : ''}</div>` },
      { h: 'Disponibilidade', v: (v) => `${esc(v.disponibilidade || '—')}${v.horasMes ? `<div class="sub">${v.horasMes}h/mês</div>` : ''}` },
      { h: 'Situação', v: (v) => `<span class="badge ${v.situacao === 'Ativo' ? 'b-ok' : ''}">${esc(v.situacao)}</span> ${v.termo ? '<span class="badge b-gold">Termo ✓</span>' : '<span class="badge b-bad">Sem termo</span>'}` },
      { h: '', c: 'acts', v: (v) => acts('vol', v.id, `<button class="btn sm" data-rep="vol-termo" data-id="${v.id}">${ic('print')} Termo</button><button class="btn sm" data-rep="vol-decl" data-id="${v.id}">Declaração</button><button class="btn sm" data-rep="frequencia" data-col="vol" data-id="${v.id}">Frequência</button>`) }
    ], L, '<b>Nenhum voluntário cadastrado</b>');
  };

  /* ---- estagiários ---- */
  VIEWS.est = () => head('Estagiários', 'Controle da Lei do Estágio (Lei 11.788/2008): termo, seguro, supervisor, carga horária e relatórios.', `<button class="btn gold" data-act="new" data-col="est">${ic('plus')} Novo estagiário</button><button class="btn" data-rep="equipe-lista">${ic('print')} Relação da equipe</button>`) +
    `<div class="note"><b>O que a lei pede:</b> termo de compromisso assinado pelo instituto, estagiário e instituição de ensino · seguro contra acidentes pessoais · supervisor da área (até 10 estagiários; em psicologia, psicóloga com CRP) · até 6h/dia e 30h/semana · máximo de 2 anos · relatório de atividades a cada 6 meses · no estágio não obrigatório, bolsa e auxílio-transporte · recesso de 30 dias a cada ano.</div>
    <div class="toolbar"><input type="search" placeholder="Buscar…" data-f="est.q" value="${esc(UI.est.q)}"><select data-f="est.sit">${optsHTML(['Ativo', 'Concluído', 'Desligado'], UI.est.sit)}</select><span class="cnt" id="cnt"></span></div><div id="lista"></div>`;
  LISTS.est = () => {
    const f = UI.est; const q = f.q.toLowerCase();
    const L = D.est.filter((v) => (!f.sit || v.situacao === f.sit) && (!q || [v.nome, v.area, v.instituicao, v.curso].join(' ').toLowerCase().includes(q))).sort(ordNome);
    $('#cnt').textContent = L.length + ' de ' + D.est.length;
    $('#lista').innerHTML = tbl([
      { h: 'Nome', v: (v) => `<div class="nm">${esc(v.nome)}</div><div class="sub">${esc([v.curso, v.semestre ? v.semestre + 'º' : '', v.instituicao].filter(Boolean).join(' · '))}</div>` },
      { h: 'Supervisão', v: (v) => `${esc(v.supervisor || '—')}<div class="sub">${esc(v.supervisorReg || '')} ${esc(v.area || '')}</div>` },
      { h: 'Período', v: (v) => `${fmtD(v.inicio) || '—'} a ${fmtD(v.fim) || '—'}<div class="sub">${v.cargaSemanal ? v.cargaSemanal + 'h/semana · ' : ''}${esc(v.tipoEst || '')}</div>` },
      { h: 'Alertas', v: (v) => { const a = estAlertas(v); return `<span class="badge ${v.situacao === 'Ativo' ? 'b-ok' : ''}">${esc(v.situacao)}</span>` + (a.length ? a.map(([n, t]) => `<div style="margin-top:4px"><span class="badge ${n === 'alta' ? 'b-bad' : 'b-warn'}">${esc(t)}</span></div>`).join('') : v.situacao === 'Ativo' ? ' <span class="badge b-gold">Tudo certo ✓</span>' : ''); } },
      { h: '', c: 'acts', v: (v) => acts('est', v.id, `<button class="btn sm" data-rep="est-decl" data-id="${v.id}">${ic('print')} Declaração</button><button class="btn sm" data-rep="frequencia" data-col="est" data-id="${v.id}">Frequência</button><button class="btn sm" data-rep="est-relatorio" data-id="${v.id}">Relatório semestral</button>`) }
    ], L, '<b>Nenhum estagiário cadastrado</b>');
  };

  /* ---- financeiro ---- */
  VIEWS.fin = () => {
    const f = UI.fin;
    const contas = C().contas.map((c) => `<div class="kpi"><div class="l">${esc(c)}</div><div class="v${saldoAtual(c) < 0 ? ' neg' : ''}">${brl(saldoAtual(c))}</div><div class="s">saldo atual</div></div>`).join('');
    return head('Financeiro', 'Livro caixa do instituto: entradas (doações, convênios, eventos) e saídas, com recibo de doação e planilha para o contador.', `<button class="btn gold" data-act="new" data-col="fin" data-tipo="e">${ic('plus')} Entrada</button><button class="btn" data-act="new" data-col="fin" data-tipo="s">${ic('plus')} Saída</button><button class="btn" data-act="csv">Exportar planilha</button>`) +
      `<div class="grid-cards">${contas}<div id="kpi-mes" style="display:contents"></div></div>
      <div class="toolbar"><input type="month" data-f="fin.mes" value="${f.mes}" aria-label="Mês"><select data-f="fin.tipo">${optsHTML([['e', 'Entradas'], ['s', 'Saídas']], f.tipo, 'Entradas e saídas')}</select>
      <select data-f="fin.cat">${optsHTML([...C().catEntrada, ...C().catSaida], f.cat, 'Todas as categorias')}</select><select data-f="fin.conta">${optsHTML(C().contas, f.conta, 'Todas as contas')}</select>
      <input type="search" placeholder="Buscar descrição, doador…" data-f="fin.q" value="${esc(f.q)}"><span class="cnt" id="cnt"></span></div><div id="lista"></div>
      ${!C().dataSaldoIni && !D.fin.length ? '<div class="note" style="margin-top:14px"><b>Primeiro passo:</b> informe o saldo de cada conta no dia em que começar a usar o app (Configurações → Financeiro).</div>' : ''}`;
  };
  function finFiltrados() {
    const f = UI.fin; const q = f.q.toLowerCase().trim();
    return D.fin.filter((x) => (!f.mes || x.data.slice(0, 7) === f.mes) && (!f.tipo || x.tipo === f.tipo) && (!f.cat || x.cat === f.cat) && (!f.conta || x.conta === f.conta) && (!q || [x.desc, x.pessoa, x.docNum, x.cat].join(' ').toLowerCase().includes(q))).sort(finSort);
  }
  LISTS.fin = () => {
    const L = finFiltrados(); const f = UI.fin;
    const e = L.filter((x) => x.tipo === 'e').reduce((a, x) => a + (+x.valor || 0), 0); const s = L.filter((x) => x.tipo === 's').reduce((a, x) => a + (+x.valor || 0), 0);
    $('#kpi-mes').innerHTML = `<div class="kpi"><div class="l">Entradas ${f.mes ? MES_C[+f.mes.slice(5) - 1] : ''}</div><div class="v" style="color:var(--ok)">${brl(e)}</div><div class="s">filtro atual</div></div><div class="kpi"><div class="l">Saídas ${f.mes ? MES_C[+f.mes.slice(5) - 1] : ''}</div><div class="v" style="color:var(--bad)">${brl(s)}</div><div class="s">Resultado: ${brl(e - s)}</div></div>`;
    $('#cnt').textContent = L.length + ' lançamento(s)';
    $('#lista').innerHTML = tbl([
      { h: 'Data', v: (x) => fmtD(x.data) },
      { h: 'Descrição', v: (x) => `<div class="nm">${esc(x.desc)}</div><div class="sub">${esc([x.cat, x.pessoa].filter(Boolean).join(' · '))}</div>` },
      { h: 'Conta', v: (x) => `${esc(x.conta)}<div class="sub">${esc([x.forma, x.fonte && x.fonte !== 'Recursos livres' ? x.fonte : ''].filter(Boolean).join(' · '))}</div>` },
      { h: 'Comprov.', v: (x) => (x.comprovante ? '<span class="badge b-ok">✓ arquivado</span>' : '<span class="badge b-warn">falta</span>') + (x.docNum ? `<div class="sub">${esc(x.docNum)}</div>` : '') },
      { h: 'Valor', c: 'r', v: (x) => `<span class="${x.tipo === 'e' ? 'val-e' : 'val-s'}">${x.tipo === 'e' ? '+' : '−'} ${brl(x.valor)}</span>` },
      { h: '', c: 'acts', v: (x) => acts('fin', x.id, (x.tipo === 'e' ? `<button class="btn sm" data-rep="recibo" data-id="${x.id}">${ic('print')} Recibo</button>` : '') + `<button class="btn sm" data-act="dup" data-id="${x.id}" title="Repetir no mês seguinte">Repetir</button>`) }
    ], L, '<b>Nenhum lançamento neste filtro</b>Use os botões Entrada e Saída.');
  };

  /* ---- patrimônio ---- */
  VIEWS.bens = () => {
    const f = UI.bens; const at = D.bens.filter((b) => b.estado !== 'Baixado');
    const tot = at.reduce((a, b) => a + (+b.valor || 0) * (+b.qtd || 1), 0); const it = at.reduce((a, b) => a + (+b.qtd || 1), 0);
    return head('Patrimônio e inventário', 'Móveis, equipamentos e materiais do instituto, com número de patrimônio, local, estado e origem (compra ou doação).', `<button class="btn gold" data-act="new" data-col="bens">${ic('plus')} Novo item</button><button class="btn" data-rep="inventario">${ic('print')} Termo de inventário</button>`) +
      `<div class="grid-cards"><div class="kpi"><div class="l">Itens em uso</div><div class="v">${it}</div><div class="s">${at.length} registro(s)</div></div><div class="kpi"><div class="l">Valor estimado</div><div class="v">${brl(tot)}</div><div class="s">soma valor × quantidade</div></div><div class="kpi"><div class="l">Recebidos em doação</div><div class="v">${at.filter((b) => b.origem === 'Doação').length}</div><div class="s">registro(s)</div></div><div class="kpi"><div class="l">Precisam de atenção</div><div class="v">${at.filter((b) => b.estado === 'Ruim').length}</div><div class="s">em estado ruim</div></div></div>
      <div class="toolbar"><input type="search" placeholder="Buscar item ou nº…" data-f="bens.q" value="${esc(f.q)}"><select data-f="bens.cat">${optsHTML(C().catBens, f.cat, 'Todas as categorias')}</select><select data-f="bens.local">${optsHTML(C().locais, f.local, 'Todos os locais')}</select><select data-f="bens.estado">${optsHTML(['Novo', 'Bom', 'Regular', 'Ruim', 'Baixado'], f.estado, 'Todos os estados')}</select><span class="cnt" id="cnt"></span></div><div id="lista"></div>`;
  };
  LISTS.bens = () => {
    const f = UI.bens; const q = f.q.toLowerCase();
    const L = D.bens.filter((b) => (!f.cat || b.cat === f.cat) && (!f.local || b.local === f.local) && (!f.estado || b.estado === f.estado) && (!q || [b.tomb, b.desc, b.marca, b.doador].join(' ').toLowerCase().includes(q))).sort((a, b) => String(a.tomb).localeCompare(String(b.tomb), 'pt-BR', { numeric: true }));
    $('#cnt').textContent = L.length + ' registro(s)';
    const cor = { Novo: 'b-ok', Bom: 'b-ok', Regular: 'b-warn', Ruim: 'b-bad', Baixado: '' };
    $('#lista').innerHTML = tbl([
      { h: 'Nº', v: (b) => `<span class="badge b-gold">${esc(b.tomb)}</span>` },
      { h: 'Item', v: (b) => `<div class="nm">${esc(b.desc)}${+b.qtd > 1 ? ` <span class="muted">× ${b.qtd}</span>` : ''}</div><div class="sub">${esc([b.cat, b.marca].filter(Boolean).join(' · '))}</div>` },
      { h: 'Local', v: (b) => esc(b.local || '—') },
      { h: 'Origem', v: (b) => `${esc(b.origem || '—')}<div class="sub">${esc(b.doador || '')} ${fmtD(b.data)}</div>` },
      { h: 'Estado', v: (b) => `<span class="badge ${cor[b.estado] || ''}">${esc(b.estado)}</span>` },
      { h: 'Valor', c: 'r', v: (b) => (b.valor ? brl((+b.valor || 0) * (+b.qtd || 1)) : '—') },
      { h: '', c: 'acts', v: (b) => acts('bens', b.id) }
    ], L, '<b>Nenhum item no inventário</b>Cadastre móveis, eletrônicos, brinquedos e materiais.');
  };

  /* ---- documentos e prazos ---- */
  VIEWS.docs = () => {
    const f = UI.docs;
    const seg = `<div class="seg" role="group">${[['mensais', 'Mensais'], ['anuais', 'Anuais'], ['pasta', 'Pasta e validades']].map(([k, t]) => `<button data-sub="${k}" aria-pressed="${f.sub === k}">${t}</button>`).join('')}</div>`;
    let sel = '';
    if (f.sub === 'mensais') sel = `<input type="month" data-f="docs.mes" value="${f.mes}" aria-label="Mês">`;
    if (f.sub === 'anuais') { const a = +hoje().slice(0, 4); sel = `<select data-f="docs.ano">${optsHTML([a + 1, a, a - 1, a - 2].map(String), f.ano, false)}</select>`; }
    return head('Documentos e prazos', 'Tudo o que o instituto precisa fazer todo mês e todo ano, e a pasta de documentos com as validades. Marque o que for feito.', `<button class="btn" data-act="new-obrig">${ic('plus')} Nova obrigação</button><button class="btn" data-act="new-doc">${ic('plus')} Novo documento</button><button class="btn" data-rep="${f.sub === 'pasta' ? 'docs-sit' : 'obrig'}">${ic('print')} Imprimir</button>`) +
      `<div class="toolbar">${seg}${sel}<span class="cnt" id="cnt"></span></div>
      <div class="note">Prazos de tributos e declarações (EFD-Reinf, DCTFWeb, eSocial, ECD, ECF) são feitos pelo <b>contador</b> e podem mudar: confirme com ele(a). Os itens com <span class="badge">se houver…</span> só valem quando a condição existir — marque "Não se aplica" quando for o caso.</div><div id="lista"></div>`;
  };
  LISTS.docs = () => {
    const f = UI.docs;
    if (f.sub === 'pasta') {
      const cats = [...new Set(D.docs.map((d) => d.cat))];
      const st = D.docs.map(docStatus); const ok = st.filter((s) => s.s === 'valido' || s.s === 'ok').length;
      $('#cnt').textContent = ok + ' de ' + D.docs.length + ' em dia';
      $('#lista').innerHTML = cats.map((c) => `<div class="mgroup">${esc(c)}</div>` + tbl([
        { h: 'Documento', v: (d) => `<div class="nm">${esc(d.nome)}${d.ess ? ' <span class="badge b-gold">essencial</span>' : ''}</div><div class="sub">${esc(d.dica || (+d.dias ? 'Validade padrão: ' + d.dias + ' dias' : ''))}</div>` },
        { h: 'Emissão', v: (d) => fmtD(d.emissao) || '—' },
        { h: 'Onde está', v: (d) => esc(d.local || '—') },
        { h: 'Situação', v: (d) => { const s = docStatus(d); return `<span class="badge ${s.b}">${esc(s.t)}</span>`; } },
        { h: '', c: 'acts', v: (d) => `<button class="btn sm" data-act="edit-doc" data-id="${d.id}">Atualizar</button>` }
      ], D.docs.filter((d) => d.cat === c))).join('');
      return;
    }
    const isM = f.sub === 'mensais'; const per = isM ? f.mes : f.ano;
    const L = obrigLista(isM ? 'm' : 'a').map((o) => { const pz = isM ? prazoMensal(o, per) : prazoAnual(o, per); const key = (isM ? 'm:' : 'a:') + per + ':' + o.id; return { o, pz, key, st: obStatus(key, pz), r: D.obrig[key] || {} }; }).sort((a, b) => a.pz.localeCompare(b.pz));
    const feitos = L.filter((x) => ['feito', 'na', 'anterior'].includes(x.st.s)).length;
    $('#cnt').innerHTML = `${feitos} de ${L.length} concluídas`;
    const item = (x) => `<div class="ob ${x.st.s}"><button class="ob-check" data-ob="${x.key}" aria-label="Marcar como feito" title="Marcar como feito">${x.st.s === 'feito' ? ic('check') : ''}</button>
      <div><div class="ob-t">${esc(x.o.titulo)}</div>${x.o.desc ? `<div class="ob-d">${esc(x.o.desc)}</div>` : ''}${x.r.obs ? `<div class="ob-d">📝 ${esc(x.r.obs)}</div>` : ''}
      <div class="ob-meta"><span class="badge">${esc(x.o.area || '')}</span>${x.o.cond ? `<span class="badge">${esc(x.o.cond)}</span>` : ''}<span class="badge">prazo ${fmtD(x.pz)}</span></div></div>
      <div class="ob-r"><span class="badge ${x.st.b}">${esc(x.st.t)}</span><span><button class="btn sm ghost" data-ob-na="${x.key}">${x.st.s === 'na' ? 'Aplica-se' : 'Não se aplica'}</button><button class="btn sm ghost" data-ob-obs="${x.key}">Nota</button>${x.o.custom ? `<button class="btn sm ghost bad" data-ob-rm="${x.o.id}" data-custom="1">Remover</button>` : `<button class="btn sm ghost" data-ob-rm="${x.o.id}" title="Tirar da lista">Ocultar</button>`}</span></div></div>`;
    if (isM) {
      $('#lista').innerHTML = `<div class="progress" style="margin-bottom:14px"><i style="width:${L.length ? (feitos / L.length) * 100 : 0}%"></i></div><div class="list">${L.map(item).join('')}</div>`;
    } else {
      const grupos = {}; L.forEach((x) => { const m = +x.pz.slice(5, 7); (grupos[m] = grupos[m] || []).push(x); });
      $('#lista').innerHTML = `<div class="progress" style="margin-bottom:6px"><i style="width:${L.length ? (feitos / L.length) * 100 : 0}%"></i></div>` + Object.keys(grupos).sort((a, b) => a - b).map((m) => `<div class="mgroup">${cap(MESES[m - 1])}</div><div class="list">${grupos[m].map(item).join('')}</div>`).join('');
    }
    if (D.obrigOcultas.length) $('#lista').insertAdjacentHTML('beforeend', `<p class="muted small" style="margin-top:16px">${D.obrigOcultas.length} item(ns) padrão ocultado(s). <button class="btn sm ghost" data-act="restore-obrig">Mostrar de novo</button></p>`);
  };

  /* ---- relatórios ---- */
  VIEWS.rel = () => {
    const ym = ymHoje(); const ano = hoje().slice(0, 4); const ant = ymAdd(ym, -1);
    const anos = [...new Set([ano, String(+ano - 1), ...D.fin.map((f) => f.data.slice(0, 4)), ...D.atend.map((a) => a.data.slice(0, 4))])].sort().reverse();
    const selAno = (id) => `<select id="${id}">${optsHTML(anos, ano, false)}</select>`;
    const card = (t, p, ctrl, rep) => `<div class="rep"><h3>${t}</h3><p>${p}</p><div class="row">${ctrl}<button class="btn gold sm" data-rep="${rep}">${ic('print')} Gerar PDF</button></div></div>`;
    return head('Relatórios', 'Todos os relatórios saem prontos para imprimir ou salvar em PDF (na janela de impressão, escolha "Salvar como PDF"). Cabeçalho com a identidade do instituto e espaço para assinaturas.') +
      `<div class="mgroup">Atividades</div><div class="rep-grid">
        ${card('Relatório mensal de atividades', 'Atendimentos por tipo, mães atendidas, Círculo de Cuidado e grupos, equipe, resumo financeiro e obrigações do mês.', `<input type="month" id="r-mes" value="${ant}">`, 'mensal')}
        ${card('Relatório anual de atividades', 'Quadro mês a mês de atendimentos, grupos e participação. Para a assembleia, CMAS, editais e doadores.', selAno('r-ano'), 'anual')}
        ${card('Perfil das famílias atendidas', 'Estatísticas sem nomes: diagnósticos, idades dos filhos, renda, BPC, CadÚnico, bairros. Ideal para projetos e editais.', '', 'perfil')}
      </div>
      <div class="mgroup">Financeiro</div><div class="rep-grid">
        ${card('Balancete mensal', 'Saldo anterior, receitas e despesas por categoria, resultado e saldo final por conta. Com assinaturas da tesouraria, presidência e conselho fiscal.', `<input type="month" id="r-mes-b" value="${ant}">`, 'balancete')}
        ${card('Livro caixa', 'Todos os lançamentos do mês com saldo dia a dia.', `<input type="month" id="r-mes-c" value="${ant}">`, 'caixa')}
        ${card('Demonstrativo financeiro anual', 'Receitas e despesas do ano por categoria e por mês, para a prestação de contas na assembleia.', selAno('r-ano-f'), 'fin-anual')}
      </div>
      <div class="mgroup">Cadastros e controles</div><div class="rep-grid">
        ${card('Relação de mães', 'Lista nominal das mães e filhos (documento interno e sigiloso).', `<select id="r-sit">${optsHTML(['Ativa', 'Lista de espera', 'Desligada'], 'Ativa', 'Todas')}</select>`, 'maes-lista')}
        ${card('Relação da equipe', 'Voluntários e estagiários ativos, área, termo e período.', '', 'equipe-lista')}
        ${card('Termo de inventário patrimonial', 'Lista de bens com nº de patrimônio, local, estado e valor, com termo de conferência.', '', 'inventario')}
        ${card('Checklist de obrigações', 'Situação das obrigações do mês ou do ano.', `<input type="month" id="r-mes-o" value="${ym}">`, 'obrig')}
        ${card('Situação dos documentos', 'Pasta institucional, certidões e validades.', '', 'docs-sit')}
        ${card('Lista de presença em branco', 'Para o Círculo de Cuidado Luma, oficinas e assembleias.', '', 'presenca-branco')}
      </div>
      <div class="mgroup">Modelos</div><div class="rep-grid">
        ${card('Termo de consentimento LGPD (em branco)', 'Para a mãe assinar no cadastro, com autorização de uso de imagem.', '', 'lgpd-branco')}
        ${card('Termo de adesão ao voluntariado (em branco)', 'Lei 9.608/1998, com cláusula de sigilo.', '', 'vol-termo')}
        ${card('Ficha de cadastro em branco', 'Para preencher à mão no primeiro acolhimento e depois passar para o app.', '', 'ficha-branco')}
      </div>`;
  };

  /* ---- configurações ---- */
  VIEWS.cfg = () => {
    const c = C();
    const ta = (k, l, h) => `<div class="fld w3"><label>${l}</label><textarea data-cfg-list="${k}" rows="6">${esc((c[k] || []).join('\n'))}</textarea>${h ? `<small>${h}</small>` : ''}</div>`;
    const inp = (k, l, w, t) => `<div class="fld w${w || 3}"><label>${l}</label><input data-cfg="${k}" type="${t || 'text'}" value="${esc(c[k])}"></div>`;
    return head('Configurações', 'Dados que aparecem nos relatórios, listas do app, senha e cópia de segurança.') +
      `<div class="cols">
      <div class="card"><h2>Dados do instituto</h2><div class="dlg-body" style="padding:0">
        ${inp('nome', 'Nome', 4)}${inp('cnpj', 'CNPJ', 2)}${inp('endereco', 'Endereço', 4)}${inp('cidade', 'Cidade / UF', 2)}
        ${inp('telefone', 'Telefone')}${inp('email', 'E-mail', 3, 'email')}${inp('instagram', 'Instagram')}${inp('pix', 'Chave Pix')}
        ${inp('presidente', 'Presidente')}${inp('tesoureira', 'Tesoureira')}${inp('coordenacao', 'Coordenação técnica')}${inp('conselhoFiscal', 'Conselho fiscal (nomes)')}
      </div></div>
      <div class="card"><h2>Financeiro</h2><div class="dlg-body" style="padding:0">
        ${c.contas.map((k) => `<div class="fld w3"><label>Saldo inicial — ${esc(k)}</label><input data-saldo="${esc(k)}" inputmode="decimal" value="${esc(n2(c.saldoIni[k] || 0))}"></div>`).join('')}
        ${inp('dataSaldoIni', 'Data do saldo inicial', 3, 'date')}${inp('sm', 'Salário mínimo (faixas de renda)', 3, 'number')}
        <div class="fld"><small>Coloque o saldo de cada conta no dia em que começou a usar o app. Os lançamentos são somados a partir dele.</small></div>
      </div>
      <h2 style="margin-top:18px">Segurança</h2>
      <p class="muted small" style="margin-top:0">${c.pin ? 'A senha de acesso está <b>ativada</b>.' : 'Sem senha: qualquer pessoa com este aparelho abre o app.'} A senha impede que outra pessoa abra o app neste aparelho; ela não criptografa os dados.</p>
      <div class="btns"><button class="btn" data-act="pin">${c.pin ? 'Trocar senha' : 'Criar senha de acesso'}</button>${c.pin ? '<button class="btn bad" data-act="pin-off">Remover senha</button>' : ''}</div>
      <h2 style="margin-top:18px">Cópia de segurança</h2>
      <p class="muted small" style="margin-top:0">Os dados ficam só neste aparelho. ${c.ultimoBackup ? 'Última cópia: <b>' + fmtD(c.ultimoBackup) + '</b>.' : '<b>Nenhuma cópia baixada ainda.</b>'} Para usar em outro aparelho, baixe aqui e importe lá.</p>
      <div class="btns"><button class="btn gold" data-act="backup">Baixar cópia de segurança</button><label class="btn">Importar cópia<input type="file" accept=".json,application/json" id="imp" hidden></label></div>
      <p style="margin-top:18px"><button class="btn sm bad ghost" data-act="zerar">Apagar todos os dados deste aparelho</button></p></div>
      </div>
      <div class="card" style="margin-top:16px"><h2>Listas do app <small>uma opção por linha</small></h2><div class="dlg-body" style="padding:0">
        ${ta('tiposAtend', 'Tipos de atendimento')}${ta('tiposGrupo', 'Atividades em grupo', 'A primeira linha é o encontro mensal (aparece no calendário e nos alertas).')}
        ${ta('catEntrada', 'Categorias de entrada')}${ta('catSaida', 'Categorias de saída')}
        ${ta('contas', 'Contas (caixa, bancos)')}${ta('fontes', 'Fontes de recurso / projetos', 'Separe recursos de cada convênio ou edital para a prestação de contas.')}
        ${ta('areas', 'Áreas da equipe')}${ta('locais', 'Locais / salas')}${ta('catBens', 'Categorias de patrimônio')}
      </div><div class="btns" style="margin-top:12px"><button class="btn gold" data-act="save-lists">Salvar listas</button></div></div>`;
  };

  /* ================= impressão ================= */
  function cabecalho() {
    const c = C();
    return `<div class="p-head"><img src="icons/logo.png" alt=""><div><div class="n">Instituto</div><div class="s">Luma</div><div class="d">${esc(c.slogan)}${c.cnpj ? ' · CNPJ ' + esc(c.cnpj) : ''}</div><div class="d">${esc([c.endereco, c.cidade].filter(Boolean).join(' · '))}${c.telefone || c.email ? '<br>' + esc([c.telefone, c.email, c.instagram].filter(Boolean).join(' · ')) : ''}</div></div></div>`;
  }
  const assin = (lista) => `<div class="assin">${lista.filter(Boolean).map(([n, c]) => `<div>${esc(n || '')}<small>${esc(c)}</small></div>`).join('')}</div>`;
  const localData = (d) => `<p style="text-align:right;margin-top:24px">${esc(C().cidade ? C().cidade.split('/')[0].trim() + ', ' : '')}${d ? toDate(d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : '_____ de ______________ de ________'}.</p>`;
  const kv = (pares) => `<div class="kv">${pares.map(([k, v, full]) => `<div${full ? ' class="full"' : ''}><b>${esc(k)}</b>${v === undefined || v === '' || v === null ? '' : esc(v)}</div>`).join('')}</div>`;
  const ptab = (cab, linhas, rodape) => `<table><thead><tr>${cab.map((h) => (Array.isArray(h) ? `<th class="${h[1]}">${h[0]}</th>` : `<th>${h}</th>`)).join('')}</tr></thead><tbody>${linhas.join('')}</tbody>${rodape ? `<tfoot>${rodape}</tfoot>` : ''}</table>`;
  const pres = () => C().presidente; const tes = () => C().tesoureira;
  function imprimir(titulo, corpo, opt) {
    opt = opt || {};
    const p = $('#print');
    let st = $('#page-style'); if (!st) { st = document.createElement('style'); st.id = 'page-style'; document.head.appendChild(st); }
    st.textContent = opt.paisagem ? '@media print{@page{size:A4 landscape;margin:12mm}}' : '';
    p.innerHTML = (opt.semCab ? '' : cabecalho()) + (opt.semTitulo ? '' : `<h1>${esc(titulo)}</h1>${opt.sub ? `<div class="p-sub">${esc(opt.sub)}</div>` : ''}`) + corpo +
      `<div class="p-foot"><span>${esc(C().nome)} · ${esc(C().slogan)}</span><span>Gerado em ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span></div>`;
    const t0 = document.title; document.title = titulo + (opt.sub ? ' - ' + opt.sub : '');
    const img = $('img', p);
    const vai = () => { window.print(); setTimeout(() => { document.title = t0; }, 500); };
    if (img && !img.complete) { img.onload = img.onerror = vai; setTimeout(() => { if (!img.complete) vai(); }, 1500); } else vai();
  }

  function extenso(v) {
    const U = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const DZ = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const CT = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
    const a999 = (n) => { if (!n) return ''; if (n === 100) return 'cem'; const p = []; const c = Math.floor(n / 100); const r = n % 100; if (c) p.push(CT[c]); if (r) p.push(r < 20 ? U[r] : DZ[Math.floor(r / 10)] + (r % 10 ? ' e ' + U[r % 10] : '')); return p.join(' e '); };
    const inteiro = (n) => {
      if (!n) return '';
      const mi = Math.floor(n / 1e6); const mil = Math.floor((n % 1e6) / 1000); const r = n % 1000; const g = [];
      if (mi) g.push([a999(mi) + (mi === 1 ? ' milhão' : ' milhões'), mi]);
      if (mil) g.push([mil === 1 ? 'mil' : a999(mil) + ' mil', mil]);
      if (r) g.push([a999(r), r]);
      return g.map((x, i) => (i === 0 ? '' : i === g.length - 1 && (x[1] < 100 || x[1] % 100 === 0) ? ' e ' : ' ') + x[0]).join('');
    };
    v = Math.round((+v || 0) * 100); const re = Math.floor(v / 100); const ce = v % 100;
    let s = '';
    if (re) s = inteiro(re) + (re % 1e6 === 0 && re >= 1e6 ? ' de reais' : re === 1 ? ' real' : ' reais');
    if (ce) s += (s ? ' e ' : '') + a999(ce) + (ce === 1 ? ' centavo' : ' centavos');
    return s || 'zero real';
  }

  const linhasVazias = (n, cols) => Array.from({ length: n }, () => `<tr>${'<td>&nbsp;</td>'.repeat(cols)}</tr>`).join('');

  const REP = {
    mensal() {
      const ym = ($('#r-mes') || {}).value || ymAdd(ymHoje(), -1);
      const A = D.atend.filter((a) => a.data.slice(0, 7) === ym); const G = D.grupos.filter((g) => g.data.slice(0, 7) === ym && g.status !== 'Cancelado');
      const real = A.filter((a) => a.status === 'Realizado');
      const atendidas = new Set([...real.map((a) => a.maeId), ...G.filter((g) => g.status === 'Realizado').flatMap((g) => g.presentes || [])]);
      const novas = D.maes.filter((m) => (m.entrada || '').slice(0, 7) === ym);
      const r = resumoMes(ym);
      const st = ['Realizado', 'Faltou', 'Cancelado', 'Agendado'];
      const linhasT = C().tiposAtend.map((t) => `<tr><td>${esc(t)}</td>${st.map((s) => `<td class="r">${A.filter((a) => a.tipo === t && (s === 'Agendado' ? a.status === 'Agendado' || a.status === 'Remarcado' : a.status === s)).length}</td>`).join('')}<td class="r">${new Set(real.filter((a) => a.tipo === t).map((a) => a.maeId)).size}</td></tr>`);
      const tot = `<tr><td>Total</td>${st.map((s) => `<td class="r">${A.filter((a) => (s === 'Agendado' ? a.status === 'Agendado' || a.status === 'Remarcado' : a.status === s)).length}</td>`).join('')}<td class="r">${new Set(real.map((a) => a.maeId)).size}</td></tr>`;
      const enc = real.filter((a) => a.encaminhamento);
      const ms = obrigLista('m').map((o) => ({ o, st: obStatus('m:' + ym + ':' + o.id, prazoMensal(o, ym)) }));
      const cntSt = (s) => ms.filter((x) => x.st.s === s).length;
      const profs = {}; real.forEach((a) => { const n = nomePessoa(a.profId, a.profNome); if (n) profs[n] = (profs[n] || 0) + 1; });
      const corpo = `<h2>1. Resumo do mês</h2>${kv([['Mães ativas no cadastro', D.maes.filter((m) => m.situacao === 'Ativa').length], ['Novas mães cadastradas', novas.length], ['Mães atendidas no mês', atendidas.size], ['Lista de espera', D.maes.filter((m) => m.situacao === 'Lista de espera').length], ['Atendimentos realizados', real.length], ['Encontros em grupo', G.filter((g) => g.status === 'Realizado').length], ['Participações em grupos', G.filter((g) => g.status === 'Realizado').reduce((a, g) => a + (g.presentes || []).length + (+g.extras || 0), 0)], ['Crianças acolhidas nos grupos', G.reduce((a, g) => a + (+g.criancas || 0), 0)]])}
        <h2>2. Atendimentos individuais</h2>${ptab(['Tipo', ['Realizados', 'r'], ['Faltas', 'r'], ['Cancelados', 'r'], ['Agendados', 'r'], ['Mães', 'r']], linhasT, tot)}
        ${Object.keys(profs).length ? '<p class="mini"><b>Por profissional:</b> ' + Object.entries(profs).map(([n, q]) => esc(n) + ' (' + q + ')').join(' · ') + '</p>' : ''}
        ${enc.length ? `<p class="mini"><b>Encaminhamentos realizados:</b> ${enc.length} (${esc([...new Set(enc.map((a) => a.encaminhamento))].join(', '))})</p>` : ''}
        <h2>3. Círculo de Cuidado e atividades em grupo</h2>${G.length ? ptab(['Data', 'Atividade', 'Tema', 'Facilitação', ['Participantes', 'r']], G.sort((a, b) => a.data.localeCompare(b.data)).map((g) => `<tr><td>${fmtD(g.data)}</td><td>${esc(g.tipo)}${g.status !== 'Realizado' ? ' <i>(' + esc(g.status || 'Planejado') + ')</i>' : ''}</td><td>${esc(g.tema)}</td><td>${esc(g.facilitador)}</td><td class="r">${(g.presentes || []).length + (+g.extras || 0)}</td></tr>`)) + G.filter((g) => g.relato).map((g) => `<p class="mini"><b>${esc(g.tema)}:</b> ${esc(g.relato)}</p>`).join('') : '<p>Nenhuma atividade em grupo registrada no mês.</p>'}
        <h2>4. Equipe</h2>${kv([['Voluntários ativos', D.vol.filter((v) => v.situacao === 'Ativo').length], ['Estagiários ativos', D.est.filter((v) => v.situacao === 'Ativo').length], ['Horas de voluntariado (média/mês)', D.vol.filter((v) => v.situacao === 'Ativo').reduce((a, v) => a + (+v.horasMes || 0), 0)], ['Profissionais que atenderam', Object.keys(profs).length]])}
        <h2>5. Resumo financeiro</h2>${ptab(['Saldo anterior', ['Entradas', 'r'], ['Saídas', 'r'], ['Saldo final', 'r']], [`<tr><td>${brl(r.ini)}</td><td class="r">${brl(r.e)}</td><td class="r">${brl(r.s)}</td><td class="r"><b>${brl(r.fim)}</b></td></tr>`])}<p class="mini">Detalhamento no balancete mensal.</p>
        <h2>6. Obrigações administrativas</h2><p>${cntSt('feito')} concluída(s), ${cntSt('na')} não se aplica(m), ${cntSt('atrasada') + cntSt('pendente') + cntSt('proxima')} pendente(s).</p>${ms.filter((x) => ['atrasada', 'pendente', 'proxima'].includes(x.st.s)).length ? '<p class="mini"><b>Pendentes:</b> ' + ms.filter((x) => ['atrasada', 'pendente', 'proxima'].includes(x.st.s)).map((x) => esc(x.o.titulo)).join('; ') + '.</p>' : ''}
        <h2>7. Observações</h2><div class="linhas">${'<div></div>'.repeat(5)}</div>
        ${localData()}${assin([[pres(), 'Presidente'], [C().coordenacao, 'Coordenação técnica']])}`;
      imprimir('Relatório mensal de atividades', corpo, { sub: mesNome(ym) });
    },
    anual() {
      const ano = ($('#r-ano') || {}).value || hoje().slice(0, 4);
      const tipos = C().tiposAtend;
      const rows = MESES.map((m, i) => {
        const ym = ano + '-' + String(i + 1).padStart(2, '0');
        const real = D.atend.filter((a) => a.data.slice(0, 7) === ym && a.status === 'Realizado');
        const G = D.grupos.filter((g) => g.data.slice(0, 7) === ym && g.status === 'Realizado');
        return { m, t: tipos.map((t) => real.filter((a) => a.tipo === t).length), tot: real.length, g: G.length, p: G.reduce((a, g) => a + (g.presentes || []).length + (+g.extras || 0), 0), nv: D.maes.filter((x) => (x.entrada || '').slice(0, 7) === ym).length, at: new Set([...real.map((a) => a.maeId), ...G.flatMap((g) => g.presentes || [])]).size };
      });
      const sum = (f) => rows.reduce((a, r) => a + f(r), 0);
      const realAno = D.atend.filter((a) => a.data.slice(0, 4) === ano && a.status === 'Realizado');
      const GA = D.grupos.filter((g) => g.data.slice(0, 4) === ano && g.status === 'Realizado');
      const atAno = new Set([...realAno.map((a) => a.maeId), ...GA.flatMap((g) => g.presentes || [])]);
      const fe = D.fin.filter((f) => f.data.slice(0, 4) === ano);
      const E = fe.filter((f) => f.tipo === 'e').reduce((a, f) => a + (+f.valor || 0), 0); const S = fe.filter((f) => f.tipo === 's').reduce((a, f) => a + (+f.valor || 0), 0);
      const corpo = `<h2>1. Apresentação</h2><p>O ${esc(C().nome)} — ${esc(C().slogan)} — tem como missão ser "${esc(C().lema)}" Este relatório apresenta as atividades realizadas em ${ano}: atendimentos psicológicos, jurídicos e sociais, o Círculo de Cuidado Luma (roda de conversa e compartilhamento mensal) e demais atividades em grupo.</p>
        <h2>2. Números do ano</h2>${kv([['Mães atendidas no ano', atAno.size], ['Novas mães cadastradas', sum((r) => r.nv)], ['Atendimentos individuais realizados', sum((r) => r.tot)], ['Encontros em grupo realizados', sum((r) => r.g)], ['Participações em grupos', sum((r) => r.p)], ['Voluntários e estagiários ativos', D.vol.filter((v) => v.situacao === 'Ativo').length + D.est.filter((v) => v.situacao === 'Ativo').length], ['Receitas do ano', brl(E)], ['Despesas do ano', brl(S)]])}
        <h2>3. Atendimentos e atividades mês a mês</h2>${ptab(['Mês', ...tipos.map((t) => [esc(t.replace('Atendimento ', '')), 'r']), ['Total', 'r'], ['Grupos', 'r'], ['Particip.', 'r'], ['Novas mães', 'r'], ['Mães atend.', 'r']], rows.map((r) => `<tr><td>${cap(r.m)}</td>${r.t.map((x) => `<td class="r">${x}</td>`).join('')}<td class="r"><b>${r.tot}</b></td><td class="r">${r.g}</td><td class="r">${r.p}</td><td class="r">${r.nv}</td><td class="r">${r.at}</td></tr>`), `<tr><td>Total</td>${tipos.map((t, i) => `<td class="r">${sum((r) => r.t[i])}</td>`).join('')}<td class="r">${sum((r) => r.tot)}</td><td class="r">${sum((r) => r.g)}</td><td class="r">${sum((r) => r.p)}</td><td class="r">${sum((r) => r.nv)}</td><td class="r">${atAno.size}</td></tr>`)}
        <h2>4. Círculo de Cuidado Luma e grupos</h2>${GA.length ? ptab(['Data', 'Atividade', 'Tema', ['Participantes', 'r']], GA.sort((a, b) => a.data.localeCompare(b.data)).map((g) => `<tr><td>${fmtD(g.data)}</td><td>${esc(g.tipo)}</td><td>${esc(g.tema)}</td><td class="r">${(g.presentes || []).length + (+g.extras || 0)}</td></tr>`)) : '<p>Nenhum encontro registrado.</p>'}
        <h2>5. Considerações e metas para o próximo ano</h2><div class="linhas">${'<div></div>'.repeat(7)}</div>
        ${localData()}${assin([[pres(), 'Presidente'], [C().coordenacao, 'Coordenação técnica']])}`;
      imprimir('Relatório anual de atividades', corpo, { sub: 'Exercício de ' + ano, paisagem: tipos.length > 4 });
    },
    perfil() {
      const M = D.maes.filter((m) => m.situacao === 'Ativa');
      const F = M.flatMap((m) => m.filhos || []);
      const cnt = (arr) => { const o = {}; arr.forEach((x) => { if (x) o[x] = (o[x] || 0) + 1; }); return Object.entries(o).sort((a, b) => b[1] - a[1]); };
      const pct = (n, t) => (t ? Math.round((n / t) * 100) + '%' : '—');
      const tab = (titulo, pares, total) => ptab([titulo, ['Quantidade', 'r'], ['%', 'r']], pares.length ? pares.map(([k, n]) => `<tr><td>${esc(k)}</td><td class="r">${n}</td><td class="r">${pct(n, total)}</td></tr>`) : ['<tr><td colspan="3">Sem informação</td></tr>']);
      const faixa = (i) => (i === null ? 'Sem data' : i <= 3 ? '0 a 3 anos' : i <= 6 ? '4 a 6 anos' : i <= 12 ? '7 a 12 anos' : i <= 17 ? '13 a 17 anos' : '18 anos ou mais');
      const sm = +C().sm || 1621;
      const rf = (m) => { if (m.renda === '' || m.renda === undefined) return 'Não informada'; const pc = (+m.renda || 0) / Math.max(1, +m.pessoasCasa || 1); return pc <= sm / 4 ? 'Até ¼ salário mínimo por pessoa' : pc <= sm / 2 ? 'De ¼ a ½ salário mínimo por pessoa' : pc <= sm ? 'De ½ a 1 salário mínimo por pessoa' : 'Acima de 1 salário mínimo por pessoa'; };
      const corpo = `<p>Dados agregados das <b>${M.length}</b> mães ativas e de seus <b>${F.length}</b> filhos, sem identificação pessoal, para uso em relatórios, projetos e editais (LGPD).</p>
        <h2>Diagnósticos / condições dos filhos</h2>${tab('Condição', cnt(F.flatMap((f) => f.diag || [])), F.length)}<p class="mini">Um filho pode ter mais de uma condição.</p>
        <h2>Idade dos filhos</h2>${tab('Faixa etária', cnt(F.map((f) => faixa(f.nasc ? idade(f.nasc) : null))), F.length)}
        <h2>Laudo e BPC</h2>${tab('Laudo', cnt(F.map((f) => f.laudo || 'Não informado')), F.length)}${tab('BPC', cnt(F.map((f) => f.bpc || 'Não informado')), F.length)}
        <h2>Situação das mães</h2>${tab('Trabalho', cnt(M.map((m) => m.trabalho || 'Não informado')), M.length)}${tab('Renda familiar per capita (SM R$ ' + n2(sm) + ')', cnt(M.map(rf)), M.length)}${tab('CadÚnico', cnt(M.map((m) => m.cadUnico || 'Não informado')), M.length)}${tab('Benefícios', cnt(M.flatMap((m) => (m.beneficios || []).length ? m.beneficios : ['Não informado'])), M.length)}
        <h2>Bairros</h2>${tab('Bairro', cnt(M.map((m) => m.bairro || 'Não informado')).slice(0, 15), M.length)}
        <h2>Serviços</h2>${tab('Serviço', cnt(M.flatMap((m) => m.servicos || [])), M.length)}`;
      imprimir('Perfil das famílias atendidas', corpo, { sub: 'Posição em ' + fmtD(hoje()) });
    },
    balancete() {
      const ym = ($('#r-mes-b') || {}).value || ymAdd(ymHoje(), -1);
      const r = resumoMes(ym); const ini = ym + '-01'; const fimX = addDias(fimMes(ym), 1);
      const ce = porCat(r.L, 'e'); const cs = porCat(r.L, 's');
      const fontes = {}; r.L.forEach((f) => { const k = f.fonte || 'Recursos livres'; fontes[k] = fontes[k] || { e: 0, s: 0 }; fontes[k][f.tipo] += +f.valor || 0; });
      const corpo = `<h2>Saldos por conta</h2>${ptab(['Conta', ['Saldo anterior', 'r'], ['Entradas', 'r'], ['Saídas', 'r'], ['Saldo final', 'r']], C().contas.map((c) => { const L = r.L.filter((f) => f.conta === c); const e = L.filter((f) => f.tipo === 'e').reduce((a, f) => a + +f.valor, 0); const s = L.filter((f) => f.tipo === 's').reduce((a, f) => a + +f.valor, 0); return `<tr><td>${esc(c)}</td><td class="r">${brl(saldoAntes(ini, c))}</td><td class="r">${brl(e)}</td><td class="r">${brl(s)}</td><td class="r">${brl(saldoAntes(fimX, c))}</td></tr>`; }), `<tr><td>Total</td><td class="r">${brl(r.ini)}</td><td class="r">${brl(r.e)}</td><td class="r">${brl(r.s)}</td><td class="r">${brl(r.fim)}</td></tr>`)}
        <h2>Receitas</h2>${ptab(['Categoria', ['Valor', 'r'], ['%', 'r']], ce.length ? ce.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="r">${brl(v)}</td><td class="r">${r.e ? Math.round((v / r.e) * 100) : 0}%</td></tr>`) : ['<tr><td colspan="3">Sem receitas no mês</td></tr>'], `<tr><td>Total das receitas</td><td class="r">${brl(r.e)}</td><td></td></tr>`)}
        <h2>Despesas</h2>${ptab(['Categoria', ['Valor', 'r'], ['%', 'r']], cs.length ? cs.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="r">${brl(v)}</td><td class="r">${r.s ? Math.round((v / r.s) * 100) : 0}%</td></tr>`) : ['<tr><td colspan="3">Sem despesas no mês</td></tr>'], `<tr><td>Total das despesas</td><td class="r">${brl(r.s)}</td><td></td></tr>`)}
        <h2>Resultado</h2>${kv([['Receitas', brl(r.e)], ['Despesas', brl(r.s)], [r.e - r.s >= 0 ? 'Superávit do mês' : 'Déficit do mês', brl(r.e - r.s)], ['Saldo disponível em ' + fmtD(fimMes(ym)), brl(r.fim)]])}
        ${Object.keys(fontes).length > 1 ? '<h2>Por fonte de recurso</h2>' + ptab(['Fonte / projeto', ['Entradas', 'r'], ['Saídas', 'r']], Object.entries(fontes).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="r">${brl(v.e)}</td><td class="r">${brl(v.s)}</td></tr>`)) : ''}
        <p class="mini">Lançamentos sem comprovante arquivado: ${r.L.filter((f) => !f.comprovante).length}.</p>
        ${localData()}${assin([[tes(), 'Tesouraria'], [pres(), 'Presidente'], [C().conselhoFiscal, 'Conselho Fiscal']])}`;
      imprimir('Balancete mensal', corpo, { sub: mesNome(ym) });
    },
    caixa() {
      const ym = ($('#r-mes-c') || {}).value || ymAdd(ymHoje(), -1);
      const r = resumoMes(ym); let s = r.ini;
      const linhas = r.L.slice().sort(finSort).map((f) => { s += sinal(f); return `<tr><td>${fmtD(f.data)}</td><td>${esc(f.desc)}${f.pessoa ? '<br><span class="mini">' + esc(f.pessoa) + '</span>' : ''}</td><td>${esc(f.cat)}</td><td>${esc(f.docNum || '')}${f.comprovante ? '' : ' <i>(s/ comprov.)</i>'}</td><td>${esc(f.conta)}</td><td class="r">${f.tipo === 'e' ? n2(f.valor) : ''}</td><td class="r">${f.tipo === 's' ? n2(f.valor) : ''}</td><td class="r">${n2(s)}</td></tr>`; });
      const corpo = ptab(['Data', 'Histórico', 'Categoria', 'Doc.', 'Conta', ['Entrada', 'r'], ['Saída', 'r'], ['Saldo', 'r']], [`<tr class="tot"><td>${fmtD(ym + '-01')}</td><td colspan="6">Saldo anterior</td><td class="r">${n2(r.ini)}</td></tr>`, ...linhas], `<tr><td colspan="5">Totais do mês</td><td class="r">${n2(r.e)}</td><td class="r">${n2(r.s)}</td><td class="r">${n2(r.fim)}</td></tr>`) + `<p class="mini">Valores em reais (R$).</p>` + assin([[tes(), 'Tesouraria'], [pres(), 'Presidente']]);
      imprimir('Livro caixa', corpo, { sub: mesNome(ym), paisagem: true });
    },
    'fin-anual'() {
      const ano = ($('#r-ano-f') || {}).value || hoje().slice(0, 4);
      const L = D.fin.filter((f) => f.data.slice(0, 4) === ano);
      const ini = saldoAntes(ano + '-01-01');
      let acc = ini;
      const meses = MESES.map((m, i) => { const ym = ano + '-' + String(i + 1).padStart(2, '0'); const x = L.filter((f) => f.data.slice(0, 7) === ym); const e = x.filter((f) => f.tipo === 'e').reduce((a, f) => a + +f.valor, 0); const s = x.filter((f) => f.tipo === 's').reduce((a, f) => a + +f.valor, 0); acc += e - s; return `<tr><td>${cap(m)}</td><td class="r">${brl(e)}</td><td class="r">${brl(s)}</td><td class="r">${brl(e - s)}</td><td class="r">${brl(acc)}</td></tr>`; });
      const E = L.filter((f) => f.tipo === 'e').reduce((a, f) => a + +f.valor, 0); const S = L.filter((f) => f.tipo === 's').reduce((a, f) => a + +f.valor, 0);
      const ce = porCat(L, 'e'); const cs = porCat(L, 's');
      const corpo = `${kv([['Saldo em 01/01/' + ano, brl(ini)], ['Receitas do ano', brl(E)], ['Despesas do ano', brl(S)], ['Saldo em 31/12/' + ano, brl(ini + E - S)]])}
        <h2>Receitas por categoria</h2>${ptab(['Categoria', ['Valor', 'r'], ['%', 'r']], ce.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="r">${brl(v)}</td><td class="r">${E ? Math.round((v / E) * 100) : 0}%</td></tr>`), `<tr><td>Total</td><td class="r">${brl(E)}</td><td></td></tr>`)}
        <h2>Despesas por categoria</h2>${ptab(['Categoria', ['Valor', 'r'], ['%', 'r']], cs.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="r">${brl(v)}</td><td class="r">${S ? Math.round((v / S) * 100) : 0}%</td></tr>`), `<tr><td>Total</td><td class="r">${brl(S)}</td><td></td></tr>`)}
        <h2>Mês a mês</h2>${ptab(['Mês', ['Receitas', 'r'], ['Despesas', 'r'], ['Resultado', 'r'], ['Saldo acumulado', 'r']], meses, `<tr><td>Total</td><td class="r">${brl(E)}</td><td class="r">${brl(S)}</td><td class="r">${brl(E - S)}</td><td class="r">${brl(ini + E - S)}</td></tr>`)}
        <p class="mini">Demonstrativo gerencial. As demonstrações contábeis oficiais (ITG 2002) são elaboradas pelo contador.</p>
        ${localData()}${assin([[tes(), 'Tesouraria'], [pres(), 'Presidente'], [C().conselhoFiscal, 'Conselho Fiscal']])}`;
      imprimir('Demonstrativo financeiro anual', corpo, { sub: 'Exercício de ' + ano });
    },
    'maes-lista'() {
      const sit = $('#r-sit') ? $('#r-sit').value : UI.maes.sit;
      const M = D.maes.filter((m) => !sit || m.situacao === sit).sort(ordNome);
      const corpo = `<p class="mini"><b>Documento interno e sigiloso.</b> Contém dados pessoais protegidos pela LGPD. Não compartilhar.</p>` + ptab(['Nº', 'Mãe', 'Telefone', 'Bairro', 'Filhos (idade · condição)', 'Entrada', 'LGPD'], M.map((m, i) => `<tr><td>${i + 1}</td><td>${esc(m.nome)}</td><td>${esc(m.tel)}</td><td>${esc(m.bairro)}</td><td>${(m.filhos || []).map((f) => esc(f.nome) + (f.nasc ? ' (' + idade(f.nasc) + 'a)' : '') + ((f.diag || []).length ? ' · ' + esc(f.diag.join(', ')) : '')).join('<br>')}</td><td>${fmtD(m.entrada)}</td><td>${m.lgpd ? 'Sim' : 'Não'}</td></tr>`));
      imprimir('Relação de mães cadastradas', corpo, { sub: (sit ? 'Situação: ' + sit + ' · ' : '') + M.length + ' cadastro(s) · ' + fmtD(hoje()), paisagem: true });
    },
    'equipe-lista'() {
      const V = D.vol.filter((v) => v.situacao === 'Ativo').sort(ordNome); const E = D.est.filter((v) => v.situacao === 'Ativo').sort(ordNome);
      const corpo = `<h2>Voluntários (${V.length})</h2>` + ptab(['Nome', 'Área / atividade', 'Registro', 'Disponibilidade', 'Início', 'Termo'], V.map((v) => `<tr><td>${esc(v.nome)}</td><td>${esc([v.area, v.funcao].filter(Boolean).join(' · '))}</td><td>${esc(v.registro)}</td><td>${esc(v.disponibilidade)}</td><td>${fmtD(v.inicio)}</td><td>${v.termo ? 'Sim' : 'Não'}</td></tr>`)) +
        `<h2>Estagiários (${E.length})</h2>` + ptab(['Nome', 'Curso / instituição', 'Supervisor(a)', 'Período', 'h/sem', 'Seguro'], E.map((v) => `<tr><td>${esc(v.nome)}</td><td>${esc([v.curso, v.instituicao].filter(Boolean).join(' · '))}</td><td>${esc(v.supervisor)} ${esc(v.supervisorReg)}</td><td>${fmtD(v.inicio)} a ${fmtD(v.fim)}</td><td>${esc(v.cargaSemanal)}</td><td>${esc(v.apolice ? v.apolice + (v.seguroValidade ? ' até ' + fmtD(v.seguroValidade) : '') : 'Não')}</td></tr>`));
      imprimir('Relação da equipe', corpo, { sub: fmtD(hoje()), paisagem: true });
    },
    inventario() {
      const B = D.bens.filter((b) => b.estado !== 'Baixado').sort((a, b) => String(a.tomb).localeCompare(String(b.tomb), 'pt-BR', { numeric: true }));
      const X = D.bens.filter((b) => b.estado === 'Baixado');
      const tot = B.reduce((a, b) => a + (+b.valor || 0) * (+b.qtd || 1), 0);
      const corpo = ptab(['Nº', 'Descrição', 'Categoria', ['Qtd', 'r'], 'Local', 'Estado', 'Origem', 'Entrada', ['Valor', 'r']], B.map((b) => `<tr><td>${esc(b.tomb)}</td><td>${esc(b.desc)}${b.marca ? '<br><span class="mini">' + esc(b.marca) + '</span>' : ''}</td><td>${esc(b.cat)}</td><td class="r">${+b.qtd || 1}</td><td>${esc(b.local)}</td><td>${esc(b.estado)}</td><td>${esc(b.origem)}${b.doador ? ' – ' + esc(b.doador) : ''}</td><td>${fmtD(b.data)}</td><td class="r">${b.valor ? n2((+b.valor || 0) * (+b.qtd || 1)) : ''}</td></tr>`), `<tr><td colspan="3">Total de itens</td><td class="r">${B.reduce((a, b) => a + (+b.qtd || 1), 0)}</td><td colspan="4">Valor total estimado (R$)</td><td class="r">${n2(tot)}</td></tr>`) +
        (X.length ? '<h2>Bens baixados</h2>' + ptab(['Nº', 'Descrição', 'Data da baixa', 'Motivo'], X.map((b) => `<tr><td>${esc(b.tomb)}</td><td>${esc(b.desc)}</td><td>${fmtD(b.baixaData)}</td><td>${esc(b.baixaMotivo)}</td></tr>`)) : '') +
        `<h2>Termo de conferência</h2><p>Declaramos que os bens relacionados acima, pertencentes ao ${esc(C().nome)}, foram conferidos fisicamente em ____/____/________, encontrando-se nos locais e estados indicados.</p>${localData()}${assin([[pres(), 'Presidente'], [tes(), 'Tesouraria'], [C().conselhoFiscal, 'Conselho Fiscal']])}`;
      imprimir('Inventário patrimonial', corpo, { sub: 'Posição em ' + fmtD(hoje()), paisagem: true });
    },
    obrig() {
      const ym = ($('#r-mes-o') || {}).value || (UI.docs.sub === 'mensais' ? UI.docs.mes : ymHoje()); const ano = UI.tab === 'docs' && UI.docs.sub === 'anuais' ? UI.docs.ano : ym.slice(0, 4);
      const linha = (o, key, pz) => { const s = obStatus(key, pz); const r = D.obrig[key] || {}; return `<tr><td><span class="ck">${s.s === 'feito' ? '✓' : s.s === 'na' ? '–' : ''}</span></td><td>${esc(o.titulo)}${o.cond ? ' <i class="mini">(' + esc(o.cond) + ')</i>' : ''}</td><td>${esc(o.area)}</td><td>${fmtD(pz)}</td><td>${esc(s.t)}${r.obs ? '<br><span class="mini">' + esc(r.obs) + '</span>' : ''}</td></tr>`; };
      const M = obrigLista('m').map((o) => [o, 'm:' + ym + ':' + o.id, prazoMensal(o, ym)]).sort((a, b) => a[2].localeCompare(b[2]));
      const A = obrigLista('a').map((o) => [o, 'a:' + ano + ':' + o.id, prazoAnual(o, ano)]).sort((a, b) => a[2].localeCompare(b[2]));
      const corpo = `<h2>Mensais · ${mesNome(ym)}</h2>${ptab(['', 'Obrigação', 'Área', 'Prazo', 'Situação'], M.map((x) => linha(...x)))}<h2 class="brk">Anuais · ${ano}</h2>${ptab(['', 'Obrigação', 'Área', 'Prazo', 'Situação'], A.map((x) => linha(...x)))}${assin([[pres(), 'Presidente'], [tes(), 'Tesouraria']])}`;
      imprimir('Checklist de obrigações', corpo, { sub: mesNome(ym) });
    },
    'docs-sit'() {
      const cats = [...new Set(D.docs.map((d) => d.cat))];
      const corpo = cats.map((c) => `<h2>${esc(c)}</h2>` + ptab(['Documento', 'Temos', 'Emissão', 'Validade', 'Onde está', 'Situação'], D.docs.filter((d) => d.cat === c).map((d) => `<tr><td>${esc(d.nome)}</td><td>${d.tem ? 'Sim' : 'Não'}</td><td>${fmtD(d.emissao)}</td><td>${fmtD(d.validade)}</td><td>${esc(d.local)}</td><td>${esc(docStatus(d).t)}</td></tr>`))).join('');
      imprimir('Situação dos documentos institucionais', corpo, { sub: 'Posição em ' + fmtD(hoje()) });
    },
    presenca(id) {
      const g = byId('grupos', id); if (!g) return;
      const P = (g.presentes || []).map((x) => nomeMae(x)).sort((a, b) => a.localeCompare(b, 'pt-BR'));
      const n = Math.max(25, P.length + 8);
      const corpo = kv([['Atividade', g.tipo], ['Data', fmtD(g.data) + (g.hora ? ' às ' + g.hora : '')], ['Tema', g.tema, true], ['Local', g.local], ['Facilitação', g.facilitador]]) + ptab(['Nº', 'Nome', 'Telefone', 'Assinatura'], Array.from({ length: n }, (_, i) => `<tr><td style="width:28px">${i + 1}</td><td style="width:40%">${esc(P[i] || '')}</td><td style="width:20%"></td><td style="height:24px"></td></tr>`)) + `<p class="mini">Ao assinar, a participante confirma presença. Dados usados apenas para controle interno e prestação de contas (LGPD).</p>` + assin([[g.facilitador, 'Facilitação']]);
      imprimir('Lista de presença', corpo, { sub: g.tipo + ' · ' + fmtD(g.data) });
    },
    'presenca-branco'() {
      const corpo = kv([['Atividade', ''], ['Data', ''], ['Tema', '', true], ['Local', ''], ['Facilitação', '']]) + ptab(['Nº', 'Nome', 'Telefone', 'Assinatura'], Array.from({ length: 28 }, (_, i) => `<tr><td style="width:28px">${i + 1}</td><td style="width:40%"></td><td style="width:20%"></td><td style="height:24px"></td></tr>`)) + `<p class="mini">Dados usados apenas para controle interno e prestação de contas (LGPD).</p>`;
      imprimir('Lista de presença', corpo);
    },
    'grupo-relato'(id) {
      const g = byId('grupos', id); if (!g) return;
      const corpo = kv([['Atividade', g.tipo], ['Data', fmtD(g.data) + (g.hora ? ' às ' + g.hora : '')], ['Tema', g.tema, true], ['Local', g.local], ['Facilitação', g.facilitador], ['Mães presentes', (g.presentes || []).length], ['Outras participantes', +g.extras || 0], ['Crianças acolhidas', +g.criancas || 0], ['Registro fotográfico', g.fotos ? 'Sim' : 'Não']]) + `<h2>Resumo da atividade</h2><p>${esc(g.relato || '').replace(/\n/g, '<br>') || '<i>Sem resumo registrado.</i>'}</p>${g.relato ? '' : '<div class="linhas">' + '<div></div>'.repeat(10) + '</div>'}` + assin([[g.facilitador, 'Facilitação'], [C().coordenacao, 'Coordenação']]);
      imprimir('Registro de atividade', corpo, { sub: g.tipo + ' · ' + fmtD(g.data) });
    },
    recibo(id) {
      const f = byId('fin', id); if (!f) return;
      const ano = f.data.slice(0, 4);
      if (!f.reciboNum) { D.seq.recibo[ano] = (D.seq.recibo[ano] || 0) + 1; f.reciboNum = String(D.seq.recibo[ano]).padStart(3, '0') + '/' + ano; save(); }
      const via = (n) => `<div class="recibo"><span class="val">${brl(f.valor)}</span><h1 style="text-align:left;margin:0 0 10px">Recibo de doação nº ${esc(f.reciboNum)}</h1>
        <p>Recebemos de <b>${esc(f.pessoa || '______________________________________')}</b>${f.pessoaDoc ? ', CPF/CNPJ ' + esc(f.pessoaDoc) : ', CPF/CNPJ ____________________'}, a importância de <b>${brl(f.valor)}</b> (${esc(extenso(f.valor))}), referente a <b>${esc(f.desc)}</b>${f.forma ? ', recebida via ' + esc(f.forma.toLowerCase()) : ''}, em ${fmtD(f.data)}.</p>
        <p>O valor será aplicado integralmente nas finalidades estatutárias do ${esc(C().nome)}, entidade sem fins lucrativos${C().cnpj ? ', CNPJ ' + esc(C().cnpj) : ''}. Agradecemos por ser luz no caminho das mães atípicas.</p>
        ${localData(f.data)}${assin([[tes() || pres(), (tes() ? 'Tesouraria' : 'Presidente') + ' · ' + C().nome]])}<p class="mini" style="text-align:right">${n}</p></div>`;
      const corpo = via('1ª via – doador(a)') + '<div class="corte">✂ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>' + cabecalho() + via('2ª via – instituto');
      imprimir('Recibo de doação ' + f.reciboNum, corpo, { semTitulo: true });
      render();
    },
    'mae-ficha'(id) {
      const m = byId('maes', id); if (!m) return;
      const fil = (m.filhos || []);
      const corpo = `<h2>Identificação</h2>${kv([['Nome', m.nome, true], ['CPF', m.cpf], ['RG', m.rg], ['Nascimento', fmtD(m.nasc)], ['Estado civil', m.estadoCivil], ['Telefone', m.tel], ['E-mail', m.email], ['Endereço', [m.endereco, m.bairro, m.cidade].filter(Boolean).join(' – '), true]])}
        <h2>Situação socioeconômica</h2>${kv([['Renda familiar', m.renda !== '' && m.renda !== undefined ? brl(m.renda) : ''], ['Pessoas na casa', m.pessoasCasa], ['Trabalho', m.trabalho], ['CadÚnico', m.cadUnico], ['NIS', m.nis], ['Benefícios', (m.beneficios || []).join(', ')]])}
        <h2>Filhos</h2>${fil.length ? ptab(['Nome', 'Nascimento', 'Condição', 'CID', 'Laudo', 'BPC', 'Escola', 'Terapias'], fil.map((f) => `<tr><td>${esc(f.nome)}</td><td>${fmtD(f.nasc)}${f.nasc ? ' (' + idade(f.nasc) + 'a)' : ''}</td><td>${esc((f.diag || []).join(', '))}</td><td>${esc(f.cid)}</td><td>${esc(f.laudo)}</td><td>${esc(f.bpc)}</td><td>${esc(f.escola)}</td><td>${esc(f.terapias)}</td></tr>`)) : '<p>—</p>'}
        <h2>No instituto</h2>${kv([['Situação', m.situacao], ['Entrada', fmtD(m.entrada)], ['Serviços', (m.servicos || []).join(', '), true], ['Como conheceu', m.comoConheceu], ['Uso de imagem', m.imagem]])}
        <div class="brk"></div>${termoLGPD(m)}`;
      imprimir('Ficha cadastral', corpo, { sub: m.nome });
    },
    'lgpd-branco'() { imprimir('Termo de consentimento', termoLGPD(null), { semTitulo: true }); },
    'ficha-branco'() {
      const L = (n) => '<div class="linhas">' + '<div></div>'.repeat(n) + '</div>';
      const corpo = `<h2>Identificação</h2>${kv([['Nome', '', true], ['CPF', ''], ['Nascimento', ''], ['Telefone', ''], ['E-mail', ''], ['Endereço', '', true], ['Bairro', ''], ['Cidade', '']])}
        <h2>Situação socioeconômica</h2>${kv([['Renda familiar R$', ''], ['Pessoas na casa', ''], ['Trabalha?', ''], ['CadÚnico / NIS', ''], ['Benefícios', '', true]])}
        <h2>Filhos</h2>${ptab(['Nome', 'Nascimento', 'Diagnóstico / condição', 'Laudo', 'BPC', 'Escola / terapias'], [linhasVazias(4, 6)])}
        <h2>Serviços de interesse</h2><p>${[...C().tiposAtend, ...C().tiposGrupo].map((s) => `<span class="ck"></span>${esc(s)}`).join(' &nbsp; ')}</p>
        <h2>Como conheceu o instituto</h2>${L(1)}<h2>Observações</h2>${L(3)}${assin([['', 'Responsável pelo acolhimento'], ['', 'Data']])}`;
      imprimir('Ficha de cadastro', corpo);
    },
    'vol-termo'(id) {
      const v = (id && byId('vol', id)) || {};
      const c = C(); const b = (x, n) => esc(x) || '_'.repeat(n || 30);
      const corpo = `<h1>Termo de adesão ao serviço voluntário</h1><div class="p-sub">Lei nº 9.608, de 18 de fevereiro de 1998</div>
        <p><b>ENTIDADE:</b> ${esc(c.nome)} – ${esc(c.slogan)}, associação sem fins lucrativos${c.cnpj ? ', CNPJ ' + esc(c.cnpj) : ', CNPJ ' + b('', 20)}, com sede em ${b(c.endereco + (c.cidade ? ', ' + c.cidade : ''), 40)}, neste ato representada por ${b(c.presidente, 30)}.</p>
        <p><b>VOLUNTÁRIO(A):</b> ${b(v.nome, 40)}, CPF ${b(v.cpf, 16)}, RG ${b(v.rg, 14)}, residente em ${b(v.endereco, 40)}, telefone ${b(v.tel, 16)}, e-mail ${b(v.email, 24)}${v.registro ? ', registro profissional ' + esc(v.registro) : ''}.</p>
        <p>As partes acima firmam este Termo de Adesão, nas condições a seguir:</p>
        <p><b>1. Atividade.</b> O(A) voluntário(a) prestará serviço voluntário na área de <b>${b(v.area, 20)}</b>, realizando: ${b(v.funcao, 50)}, nos dias e horários: ${b(v.disponibilidade, 30)}, a partir de ${b(fmtD(v.inicio), 12)}.</p>
        <p><b>2. Natureza.</b> O serviço voluntário é atividade não remunerada, prestada por pessoa física à entidade sem fins lucrativos, e não gera vínculo empregatício nem obrigação de natureza trabalhista, previdenciária ou afim (art. 1º, parágrafo único).</p>
        <p><b>3. Despesas.</b> O(A) voluntário(a) poderá ser ressarcido(a) pelas despesas que comprovadamente realizar no desempenho das atividades, desde que previamente autorizadas pela entidade (art. 3º).</p>
        <p><b>4. Sigilo e proteção de dados.</b> O(A) voluntário(a) compromete-se a manter sigilo sobre todas as informações das mães, crianças e famílias atendidas, a não fotografar, gravar ou divulgar atendidos sem autorização, e a tratar dados pessoais somente para as finalidades do instituto, conforme a Lei nº 13.709/2018 (LGPD) e, quando houver, o código de ética da sua profissão.</p>
        <p><b>5. Responsabilidade técnica.</b> Quando atuar em atendimento profissional (psicológico, jurídico, social ou outro), o(a) voluntário(a) é responsável técnico(a) pelo próprio atendimento e pelos registros exigidos por seu conselho profissional.</p>
        <p><b>6. Conduta.</b> O(A) voluntário(a) compromete-se a respeitar o estatuto, o regimento e os valores do instituto, acolhendo as famílias com respeito, sem discriminação de qualquer natureza.</p>
        <p><b>7. Vigência.</b> Este termo vigora por prazo indeterminado e pode ser encerrado a qualquer tempo, por qualquer das partes, mediante simples comunicação.</p>
        ${localData()}${assin([[v.nome, 'Voluntário(a)'], [c.presidente, 'Representante do ' + c.nome]])}`;
      imprimir('Termo de adesão ao voluntariado', corpo, { semTitulo: true, sub: v.nome });
    },
    'vol-decl'(id) {
      const v = byId('vol', id); if (!v) return;
      const corpo = `<p style="margin-top:30px;line-height:1.9">Declaramos, para os devidos fins, que <b>${esc(v.nome)}</b>${v.cpf ? ', CPF ' + esc(v.cpf) : ''}, ${v.situacao === 'Ativo' ? 'atua' : 'atuou'} como voluntário(a) no <b>${esc(C().nome)}</b>${C().cnpj ? ', CNPJ ' + esc(C().cnpj) : ''}, na área de <b>${esc(v.area || '—')}</b>${v.funcao ? ', realizando ' + esc(v.funcao) : ''}, ${v.inicio ? 'desde ' + fmtD(v.inicio) : ''}${v.fim ? ' até ' + fmtD(v.fim) : ''}${v.horasMes ? ', com carga média de ' + esc(v.horasMes) + ' horas mensais' : ''}, nos termos da Lei nº 9.608/1998, sem vínculo empregatício.</p><p style="line-height:1.9">Agradecemos a dedicação e o cuidado com as mães atípicas e suas famílias.</p>${localData(hoje())}${assin([[pres(), 'Presidente']])}`;
      imprimir('Declaração de voluntariado', corpo);
    },
    'est-decl'(id) {
      const v = byId('est', id); if (!v) return;
      const corpo = `<p style="margin-top:30px;line-height:1.9">Declaramos, para os devidos fins, que <b>${esc(v.nome)}</b>${v.cpf ? ', CPF ' + esc(v.cpf) : ''}, estudante do curso de <b>${esc(v.curso || '—')}</b>${v.semestre ? ' (' + esc(v.semestre) + 'º período)' : ''} da <b>${esc(v.instituicao || '—')}</b>${v.matricula ? ', matrícula ' + esc(v.matricula) : ''}, ${v.situacao === 'Ativo' ? 'realiza' : 'realizou'} estágio ${esc((v.tipoEst || '').toLowerCase())} no <b>${esc(C().nome)}</b>${C().cnpj ? ', CNPJ ' + esc(C().cnpj) : ''}, na área de ${esc(v.area || '—')}, no período de ${fmtD(v.inicio) || '___'} a ${fmtD(v.fim) || '___'}${v.cargaSemanal ? ', com carga horária de ' + esc(v.cargaSemanal) + ' horas semanais' : ''}, sob supervisão de ${esc(v.supervisor || '—')}${v.supervisorReg ? ' (' + esc(v.supervisorReg) + ')' : ''}, conforme a Lei nº 11.788/2008.</p>${localData(hoje())}${assin([[v.supervisor, 'Supervisor(a) de estágio'], [pres(), 'Presidente']])}`;
      imprimir('Declaração de estágio', corpo);
    },
    'est-relatorio'(id) {
      const v = byId('est', id); if (!v) return;
      const L = (n) => '<div class="linhas">' + '<div></div>'.repeat(n) + '</div>';
      const real = D.atend.filter((a) => a.profId === v.id && a.status === 'Realizado');
      const corpo = kv([['Estagiário(a)', v.nome, true], ['Curso / período', [v.curso, v.semestre ? v.semestre + 'º' : ''].filter(Boolean).join(' – ')], ['Instituição de ensino', v.instituicao], ['Supervisor(a)', [v.supervisor, v.supervisorReg].filter(Boolean).join(' – ')], ['Orientador(a)', v.orientador], ['Período do relatório', '____/____/______ a ____/____/______', true], ['Carga horária semanal', v.cargaSemanal ? v.cargaSemanal + 'h' : ''], ['Atendimentos registrados no app', real.length]]) +
        `<h2>1. Atividades desenvolvidas</h2>${L(6)}<h2>2. Aprendizados e competências desenvolvidas</h2>${L(4)}<h2>3. Avaliação do(a) supervisor(a)</h2>${L(4)}<h2>4. Considerações do(a) estagiário(a)</h2>${L(3)}<p class="mini">Relatório de atividades exigido pela Lei nº 11.788/2008, art. 9º, VII (periodicidade mínima de 6 meses), com vista obrigatória ao estagiário.</p>${assin([[v.nome, 'Estagiário(a)'], [v.supervisor, 'Supervisor(a)'], [v.orientador, 'Orientador(a) – instituição de ensino']])}`;
      imprimir('Relatório semestral de atividades de estágio', corpo);
    },
    frequencia(id, col) {
      const v = byId(col || 'vol', id); if (!v) return;
      const ym = ymHoje(); const n = +fimMes(ym).slice(8); const sem = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
      const rows = Array.from({ length: n }, (_, i) => { const d = ym + '-' + String(i + 1).padStart(2, '0'); const w = toDate(d).getDay(); return `<tr${w === 0 || w === 6 ? ' style="background:#f6f6f6"' : ''}><td>${String(i + 1).padStart(2, '0')} ${sem[w]}</td><td></td><td></td><td></td><td></td></tr>`; });
      const corpo = kv([['Nome', v.nome, true], [col === 'est' ? 'Curso / instituição' : 'Área', col === 'est' ? [v.curso, v.instituicao].filter(Boolean).join(' – ') : v.area], [col === 'est' ? 'Supervisor(a)' : 'Atividade', col === 'est' ? v.supervisor : v.funcao]]) + ptab(['Dia', 'Entrada', 'Saída', 'Atividade realizada', 'Assinatura'], rows) + `<p class="mini">Total de horas no mês: ________</p>` + assin([[v.nome, col === 'est' ? 'Estagiário(a)' : 'Voluntário(a)'], [col === 'est' ? v.supervisor : C().coordenacao, col === 'est' ? 'Supervisor(a)' : 'Coordenação']]);
      imprimir('Folha de frequência', corpo, { sub: mesNome(ym) });
    }
  };
  function termoLGPD(m) {
    const c = C(); const b = (x, n) => esc(x) || '_'.repeat(n || 30);
    const fil = m && (m.filhos || []).length ? m.filhos.map((f) => esc(f.nome)).join(', ') : '_'.repeat(60);
    return `<h1>Termo de consentimento para tratamento de dados pessoais</h1><div class="p-sub">Lei nº 13.709/2018 – Lei Geral de Proteção de Dados (LGPD)</div>
      <p>Eu, <b>${b(m && m.nome, 45)}</b>, CPF ${b(m && m.cpf, 16)}, autorizo o <b>${esc(c.nome)}</b>${c.cnpj ? ', CNPJ ' + esc(c.cnpj) : ''}, a coletar, guardar e utilizar os meus dados pessoais e os dados pessoais, inclusive de saúde (dados sensíveis), do(s) meu(s) filho(s): <b>${fil}</b>, nas condições abaixo.</p>
      <p><b>1. Para que os dados serão usados:</b> cadastro e acompanhamento nos serviços do instituto (atendimento psicológico, jurídico e social, Círculo de Cuidado Luma e demais atividades); contato sobre atividades e atendimentos; encaminhamentos à rede de apoio, quando eu concordar; e relatórios estatísticos <b>sem identificação</b> para prestação de contas, projetos e editais.</p>
      <p><b>2. Dados das crianças e adolescentes:</b> serão tratados no melhor interesse deles, com o meu consentimento como responsável (LGPD, art. 14).</p>
      <p><b>3. Compartilhamento:</b> os dados não serão vendidos nem repassados a terceiros sem minha autorização, exceto quando a lei exigir.</p>
      <p><b>4. Guarda e segurança:</b> os dados são acessados apenas pela equipe do instituto, que tem dever de sigilo, e guardados enquanto eu for atendida e pelo prazo exigido em lei.</p>
      <p><b>5. Meus direitos:</b> posso, a qualquer momento e sem custo, pedir acesso, correção ou exclusão dos meus dados e revogar este consentimento, pelo contato ${b([c.telefone, c.email].filter(Boolean).join(' / '), 30)}.</p>
      <p><b>6. Uso de imagem:</b> <span class="ck">${m && m.imagem === 'Autoriza' ? '✓' : ''}</span>Autorizo <span class="ck">${m && m.imagem === 'Não autoriza' ? '✓' : ''}</span>Não autorizo o uso da minha imagem e da imagem do(s) meu(s) filho(s), em fotos e vídeos das atividades, para divulgação do instituto, sem fins comerciais. Posso mudar essa escolha quando quiser.</p>
      ${localData(m && m.lgpdData)}${assin([[m && m.nome, 'Mãe / responsável'], [c.presidente, 'Pelo ' + c.nome]])}`;
  }

  /* ================= ações ================= */
  const TIT = { maes: 'mãe', atend: 'atendimento', grupos: 'encontro', vol: 'voluntário', est: 'estagiário', fin: 'lançamento', bens: 'item do patrimônio' };
  function editar(col, item) {
    const isNew = !item.id;
    const t = (isNew ? 'Novo ' : 'Editar ') + TIT[col];
    openForm(cap(t), FORMS[col](), item, (v) => {
      if (col === 'atend' || col === 'grupos') { if (v.maeId) v.maeNome = nomeMae(v.maeId); }
      if (col === 'bens' && !v.tomb) { D.seq.tomb = Math.max(D.seq.tomb || 0, ...D.bens.map((b) => +String(b.tomb).replace(/\D/g, '') || 0)) + 1; v.tomb = 'LUMA-' + String(D.seq.tomb).padStart(4, '0'); }
      if (col === 'est' && +v.cargaSemanal > 30 && !confirm('A Lei do Estágio limita a 30 horas semanais. Salvar mesmo assim?')) return false;
      upsert(col, v);
    });
  }
  function novoItem(col, extra) {
    const h = hoje(); const c = C();
    const base = {
      maes: { situacao: 'Ativa', entrada: h, filhos: [{}], cidade: c.cidade },
      atend: { data: h, status: 'Agendado', tipo: c.tiposAtend[0], modalidade: 'Presencial' },
      grupos: { data: h, tipo: c.tiposGrupo[0], status: 'Planejado', local: c.locais.find((l) => /c[ií]rculo/i.test(l)) || '' },
      vol: { situacao: 'Ativo', inicio: h },
      est: { situacao: 'Ativo', inicio: h, tipoEst: 'Obrigatório', fim: addDias(h, 180) },
      fin: { data: h, tipo: (extra && extra.tipo) || 'e', conta: c.contas[c.contas.length > 1 ? 1 : 0], fonte: c.fontes[0], forma: 'Pix', comprovante: false },
      bens: { estado: 'Bom', qtd: 1, origem: 'Doação', data: h }
    }[col] || {};
    editar(col, base);
  }
  function baixarArquivo(nome, conteudo, tipo) {
    const blob = new Blob([conteudo], { type: tipo });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  async function hashPin(p) {
    try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('luma:' + p)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join(''); }
    catch (e) { let h = 7; for (const ch of 'luma:' + p) h = (h * 31 + ch.charCodeAt(0)) | 0; return 'x' + h; }
  }

  document.addEventListener('click', (e) => {
    const t = e.target;
    const tab = t.closest('[data-tab]'); if (tab) { go(tab.dataset.tab); return; }
    const g = t.closest('[data-go]'); if (g) { go(g.dataset.go); return; }
    const pd = t.closest('[data-pend]'); if (pd) { const p = _pend[+pd.dataset.pend]; if (p) go(p.tab, p); return; }
    const sub = t.closest('[data-sub]'); if (sub) { UI.docs.sub = sub.dataset.sub; render(); return; }
    const rep = t.closest('[data-rep]'); if (rep) { const fn = REP[rep.dataset.rep]; if (fn) fn(rep.dataset.id, rep.dataset.col); return; }
    const ob = t.closest('[data-ob]'); if (ob) { const k = ob.dataset.ob; const r = D.obrig[k]; if (r && r.s === 'ok') delete D.obrig[k]; else D.obrig[k] = Object.assign({}, r, { s: 'ok', data: hoje() }); save(); render(); return; }
    const na = t.closest('[data-ob-na]'); if (na) { const k = na.dataset.obNa; const r = D.obrig[k]; if (r && r.s === 'na') delete D.obrig[k]; else D.obrig[k] = Object.assign({}, r, { s: 'na', data: hoje() }); save(); render(); return; }
    const on = t.closest('[data-ob-obs]'); if (on) { const k = on.dataset.obObs; const r = D.obrig[k] || {}; const txt = prompt('Nota (ex.: protocolo, quem fez, onde está o arquivo):', r.obs || ''); if (txt !== null) { D.obrig[k] = Object.assign({}, r, { obs: txt.trim() }); if (!D.obrig[k].s && !D.obrig[k].obs) delete D.obrig[k]; save(); render(); } return; }
    const orm = t.closest('[data-ob-rm]'); if (orm) { const id = orm.dataset.obRm; if (orm.dataset.custom) { if (confirm('Remover esta obrigação personalizada?')) D.obrigCustom = D.obrigCustom.filter((x) => x.id !== id); } else if (confirm('Ocultar este item da lista? Dá para mostrar de novo depois.')) D.obrigOcultas.push(id); save(); render(); return; }
    const a = t.closest('[data-act]'); if (!a) return;
    const act = a.dataset.act; const col = a.dataset.col; const id = a.dataset.id;
    switch (act) {
      case 'new': novoItem(col, { tipo: a.dataset.tipo }); break;
      case 'edit': editar(col, JSON.parse(JSON.stringify(byId(col, id)))); break;
      case 'del': { const it = byId(col, id); remove(col, id, TIT[col] + (it && (it.nome || it.desc || it.tema) ? ' "' + (it.nome || it.desc || it.tema) + '"' : '')); break; }
      case 'realizado': case 'faltou': { const x = byId('atend', id); x.status = act === 'realizado' ? 'Realizado' : 'Faltou'; save(); render(); toast('Marcado como ' + x.status.toLowerCase()); break; }
      case 'dup': { const x = byId('fin', id); const n = JSON.parse(JSON.stringify(x)); delete n.id; delete n.reciboNum; n.comprovante = false; n.docNum = ''; const [y, m, d] = x.data.split('-'); const ym = ymAdd(y + '-' + m, 1); n.data = ym + '-' + String(Math.min(+d, +fimMes(ym).slice(8))).padStart(2, '0'); editar('fin', n); break; }
      case 'csv': {
        const L = finFiltrados(); const q = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';
        const linhas = [['Data', 'Tipo', 'Categoria', 'Descrição', 'Doador/fornecedor', 'CPF/CNPJ', 'Forma', 'Conta', 'Fonte', 'Documento', 'Comprovante', 'Valor'].join(';'), ...L.map((f) => [fmtD(f.data), f.tipo === 'e' ? 'Entrada' : 'Saída', f.cat, f.desc, f.pessoa, f.pessoaDoc, f.forma, f.conta, f.fonte, f.docNum, f.comprovante ? 'Sim' : 'Não', (f.tipo === 'e' ? '' : '-') + n2(f.valor).replace(/\./g, '')].map(q).join(';'))];
        baixarArquivo('financeiro-luma-' + (UI.fin.mes || 'todos') + '.csv', '﻿' + linhas.join('\r\n'), 'text/csv;charset=utf-8'); break;
      }
      case 'edit-doc': {
        const d = byId('docs', id);
        openForm('Documento', FORMS.doc(), d, (v) => { if (v.emissao && !v.validade && +v.dias > 0) v.validade = addDias(v.emissao, +v.dias); if (v.emissao || v.validade) v.tem = v.tem || true; Object.assign(d, v); save(); render(); toast('Salvo'); }, d.custom ? `<button type="button" class="btn bad" id="rm-doc" style="margin-right:auto">Excluir</button>` : `<button type="button" class="btn ghost" id="rm-doc" style="margin-right:auto">Ocultar da lista</button>`);
        $('#rm-doc').onclick = () => { if (!confirm('Tirar este documento da lista?')) return; D.docs = D.docs.filter((x) => x.id !== id); if (!d.custom) D.docsOcultos.push(id); save(); $('#dlg').close(); render(); };
        break;
      }
      case 'new-doc': openForm('Novo documento', FORMS.doc(), { cat: 'Constituição', dias: 0 }, (v) => { v.id = uid(); v.custom = true; if (v.emissao && !v.validade && +v.dias > 0) v.validade = addDias(v.emissao, +v.dias); D.docs.push(v); save(); render(); toast('Salvo'); }); break;
      case 'new-obrig': openForm('Nova obrigação', FORMS.obrig(), { freq: UI.docs.sub === 'anuais' ? 'a' : 'm', dia: 10, mes: '12' }, (v) => { v.id = 'c-' + uid(); D.obrigCustom.push(v); save(); render(); toast('Obrigação incluída'); }); break;
      case 'restore-obrig': D.obrigOcultas = []; save(); render(); break;
      case 'save-lists': {
        $$('[data-cfg-list]').forEach((ta) => { const v = ta.value.split('\n').map((s) => s.trim()).filter(Boolean); if (v.length) C()[ta.dataset.cfgList] = [...new Set(v)]; });
        save(); render(); toast('Listas salvas'); break;
      }
      case 'backup': {
        C().ultimoBackup = hoje(); save();
        baixarArquivo('instituto-luma-copia-' + hoje() + '.json', JSON.stringify(D, null, 1), 'application/json'); render(); toast('Cópia baixada. Guarde o arquivo em local seguro.'); break;
      }
      case 'zerar': if (confirm('Apagar TODOS os dados do instituto deste aparelho?') && prompt('Digite APAGAR para confirmar') === 'APAGAR') { D = normaliza(null); save(); render(); toast('Dados apagados'); } break;
      case 'pin': (async () => { const p = prompt('Nova senha de acesso (mínimo 4 números ou letras):'); if (p === null) return; if (p.trim().length < 4) { toast('Senha muito curta'); return; } if (prompt('Repita a senha:') !== p) { toast('As senhas não conferem'); return; } C().pin = await hashPin(p.trim()); save(); render(); $('#btn-lock').hidden = false; toast('Senha ativada'); })(); break;
      case 'pin-off': if (confirm('Remover a senha de acesso?')) { C().pin = ''; save(); render(); $('#btn-lock').hidden = true; } break;
    }
  });
  document.addEventListener('input', (e) => {
    const f = e.target.dataset && e.target.dataset.f; if (!f) return;
    const [tab, k] = f.split('.'); UI[tab][k] = e.target.value;
    if (e.target.tagName === 'SELECT' || e.target.type === 'month') { render(); return; }
    const lf = LISTS[tab]; if (lf) lf();
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.cfg !== undefined) { const k = t.dataset.cfg; C()[k] = t.type === 'number' ? +t.value : t.value.trim(); save(); toast('Salvo'); return; }
    if (t.dataset.saldo !== undefined) { C().saldoIni[t.dataset.saldo] = parseMoney(t.value); t.value = n2(C().saldoIni[t.dataset.saldo]); save(); toast('Saldo inicial salvo'); return; }
    if (t.id === 'imp' && t.files[0]) {
      const r = new FileReader();
      r.onload = () => {
        try {
          const d = JSON.parse(r.result);
          if (!d || !Array.isArray(d.maes) || !d.cfg) throw new Error('formato');
          if (!confirm('Substituir os dados deste aparelho pela cópia de ' + (d.cfg.ultimoBackup ? fmtD(d.cfg.ultimoBackup) : 'arquivo') + '? (' + d.maes.length + ' mães, ' + (d.fin || []).length + ' lançamentos)')) return;
          D = normaliza(d); save(); render(); toast('Cópia importada');
        } catch (err) { alert('Arquivo inválido. Escolha uma cópia de segurança do Instituto Luma (.json).'); }
      };
      r.readAsText(t.files[0]); t.value = '';
    }
  });

  /* ================= tema, bloqueio, início ================= */
  function aplicaTema() { document.documentElement.dataset.theme = C().tema === 'claro' ? 'claro' : 'escuro'; $('meta[name="theme-color"]').content = C().tema === 'claro' ? '#f7f3ea' : '#0b0b0c'; }
  $('#btn-tema').onclick = () => { C().tema = C().tema === 'claro' ? 'escuro' : 'claro'; save(); aplicaTema(); };
  function bloquear() { if (!C().pin) return; $('#lock').hidden = false; $('#lock-pin').value = ''; $('#lock-err').textContent = ''; setTimeout(() => $('#lock-pin').focus(), 50); }
  $('#btn-lock').onclick = bloquear;
  $('#lock-form').onsubmit = async (e) => { e.preventDefault(); const h = await hashPin($('#lock-pin').value.trim()); if (h === C().pin) { $('#lock').hidden = true; } else { $('#lock-err').textContent = 'Senha incorreta'; $('#lock-pin').value = ''; } };
  let escondidoEm = 0;
  document.addEventListener('visibilitychange', () => { if (document.hidden) escondidoEm = Date.now(); else if (escondidoEm && Date.now() - escondidoEm > 5 * 60 * 1000) bloquear(); });
  window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (h && h !== UI.tab) go(h); });

  aplicaTema();
  $('#btn-lock').hidden = !C().pin;
  UI.tab = TABS.some((t) => t.id === location.hash.slice(1)) ? location.hash.slice(1) : 'painel';
  render();
  if (C().pin) bloquear();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
  window.LUMA = { get D() { return D; }, REP, render, save, extenso };
})();
