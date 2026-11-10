/**
 * Caixa de entrada das atividades e sincronizacao da Agenda Psi (Barbara Serra) - versao 6.
 * Versao 5: recebe so as respostas das atividades terapeuticas (aba "Atividades").
 * Versao 6: guarda a sincronizacao entre aparelhos (aba "Sincronizacao"). Os dados chegam
 *           ja criptografados pelo aplicativo: a planilha nao consegue le-los.
 * Cadastros com nome, CPF e nascimento nao sao mais recebidos: a psicologa cadastra na Agenda.
 *
 * 1) Troque SENHA (so na linha abaixo) por uma senha so sua, com letras e numeros.
 * 2) Salve (disquete). No menu de funcoes (ao lado de Executar) escolha "autorizar", clique em Executar
 *    e permita o acesso. Isso cria/encontra a planilha onde os cadastros ficam.
 * 3) Implantar > Gerenciar implantacoes > lapis > Versao: Nova versao > Implantar.
 * 4) Teste: abra o endereco /exec no navegador com ?ping=1 no final.
 */
const SENHA = 'TROQUE-AQUI';
const PADRAO = ['TROQUE', 'AQUI'].join('-');

function planilha_() {
  const props = PropertiesService.getScriptProperties();
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    const id = props.getProperty('PLANILHA_ID');
    if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
    if (!ss) { ss = SpreadsheetApp.create('Cadastros Agenda Psi'); props.setProperty('PLANILHA_ID', ss.getId()); }
  }
  return ss;
}
function aba_() {
  const ss = planilha_();
  let sh = ss.getSheetByName('Cadastros');
  if (!sh) { sh = ss.insertSheet('Cadastros'); sh.appendRow(['id', 'recebido em', 'cadastro', 'importado']); }
  return sh;
}
function abaAtividades_() {
  const ss = planilha_();
  let sh = ss.getSheetByName('Atividades');
  if (!sh) { sh = ss.insertSheet('Atividades'); sh.appendRow(['id', 'recebido em', 'resposta', 'importado']); }
  return sh;
}
function abaSync_() {
  const ss = planilha_();
  let sh = ss.getSheetByName('Sincronizacao');
  if (!sh) { sh = ss.insertSheet('Sincronizacao'); sh.getRange(1, 1).setValue('Dados criptografados pelo aplicativo. Nao edite.'); }
  return sh;
}
function senhaOk_(t) { return SENHA !== PADRAO && String(t || '').trim() === SENHA.trim(); }
function syncLer_() {
  const sh = abaSync_();
  const n = sh.getLastRow();
  const ver = Number(PropertiesService.getScriptProperties().getProperty('SYNC_VER') || 0);
  if (n < 2) return { ver: ver, data: '' };
  const vals = sh.getRange(2, 1, n - 1, 1).getValues();
  return { ver: ver, data: vals.map(function (r) { return String(r[0]); }).join('') };
}
function syncGravar_(data) {
  const sh = abaSync_();
  const PEDACO = 40000, linhas = [];
  for (let i = 0; i < data.length; i += PEDACO) linhas.push([data.slice(i, i + PEDACO)]);
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 1).clearContent();
  if (linhas.length) sh.getRange(2, 1, linhas.length, 1).setNumberFormat('@').setValues(linhas);
  const props = PropertiesService.getScriptProperties();
  const ver = Number(props.getProperty('SYNC_VER') || 0) + 1;
  props.setProperty('SYNC_VER', String(ver));
  return ver;
}
function resp_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function autorizar() {
  Logger.log('Planilha dos cadastros: ' + planilha_().getUrl());
}

// O paciente envia a ficha: grava uma linha.
function doPost(e) {
  try {
    const o = JSON.parse(e.postData.contents);
    if (o && o.sync === 'put') {
      if (!senhaOk_(o.token)) return resp_({ ok: false, erro: 'token' });
      if (typeof o.data !== 'string' || o.data.indexOf('{') !== 0 || o.data.length > 20000000) return resp_({ ok: false, erro: 'dados' });
      const trava = LockService.getScriptLock();
      trava.waitLock(30000);
      try {
        const atual = Number(PropertiesService.getScriptProperties().getProperty('SYNC_VER') || 0);
        if (Number(o.base || 0) !== atual) return resp_({ ok: false, erro: 'conflito', ver: atual });
        return resp_({ ok: true, ver: syncGravar_(o.data) });
      } finally { trava.releaseLock(); }
    }
    if (!o || typeof o.code !== 'string') return resp_({ ok: false, erro: 'dados' });
    const atividade = o.code.indexOf('AT1:') === 0 && o.code.length <= 45000;
    if (!atividade) return resp_({ ok: false, erro: 'dados' });
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try { abaAtividades_().appendRow([Utilities.getUuid(), new Date().toISOString(), o.code, '']); } finally { lock.releaseLock(); }
    return resp_({ ok: true });
  } catch (err) {
    return resp_({ ok: false, erro: 'falha', detalhe: String(err) });
  }
}

// O aplicativo busca os cadastros novos. A senha e verificada aqui, sem precisar mexer em mais nada.
function doGet(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p.ping) {
      const sh = aba_();
      return resp_({ ok: true, versao: 6, senhaConfigurada: SENHA !== PADRAO, planilha: planilha_().getUrl(), linhas: Math.max(0, sh.getLastRow() - 1) });
    }
    if (!senhaOk_(p.token)) return resp_({ ok: false, erro: 'token' });
    if (p.action === 'sync_get') { const r = syncLer_(); return resp_({ ok: true, ver: r.ver, data: r.data }); }
    const ativ = p.action === 'atividades' || p.action === 'atividades_ok';
    const sh = ativ ? abaAtividades_() : aba_();
    const dados = sh.getDataRange().getValues();
    if (p.action === 'done' || p.action === 'atividades_ok') {
      const ids = String(p.ids || '').split(',');
      for (let i = 1; i < dados.length; i++) if (ids.indexOf(String(dados[i][0])) > -1) sh.getRange(i + 1, 4).setValue('sim');
      return resp_({ ok: true });
    }
    const itens = [];
    for (let i = 1; i < dados.length; i++) {
      if (dados[i][3] !== 'sim') itens.push({ id: String(dados[i][0]), ts: String(dados[i][1]), code: String(dados[i][2]) });
    }
    return resp_({ ok: true, itens: itens });
  } catch (err) {
    return resp_({ ok: false, erro: 'falha', detalhe: String(err) });
  }
}
