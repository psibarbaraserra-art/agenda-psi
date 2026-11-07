/**
 * Caixa de entrada dos cadastros da Agenda Psi (Barbara Serra) - versao 3.
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
    if (!o || typeof o.code !== 'string' || o.code.length > 8000 || o.code.indexOf('BS1:') !== 0) return resp_({ ok: false, erro: 'dados' });
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try { aba_().appendRow([Utilities.getUuid(), new Date().toISOString(), o.code, '']); } finally { lock.releaseLock(); }
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
      return resp_({ ok: true, versao: 3, senhaConfigurada: SENHA !== PADRAO, planilha: planilha_().getUrl(), linhas: Math.max(0, sh.getLastRow() - 1) });
    }
    if (SENHA === PADRAO || String(p.token || '').trim() !== SENHA.trim()) return resp_({ ok: false, erro: 'token' });
    const sh = aba_();
    const dados = sh.getDataRange().getValues();
    if (p.action === 'done') {
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
