/**
 * Caixa de entrada dos cadastros da Agenda Psi (Bárbara Serra).
 * Cole este código em Extensões > Apps Script de uma planilha do Google.
 * Troque SENHA (só aqui, na linha abaixo) por uma senha só sua, com letras e números.
 * Depois de salvar, implante de novo: Implantar > Gerenciar implantações > lápis > Nova versão > Implantar.
 * Para testar: abra o endereço /exec no navegador, com ?ping=1 no final.
 */
const SENHA = 'TROQUE-AQUI';
const PADRAO = ['TROQUE', 'AQUI'].join('-');

function aba_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Cadastros');
  if (!sh) { sh = ss.insertSheet('Cadastros'); sh.appendRow(['id', 'recebido em', 'cadastro (código)', 'importado']); }
  return sh;
}
function resp_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// O paciente envia a ficha: só grava, não devolve nada.
function doPost(e) {
  let o;
  try { o = JSON.parse(e.postData.contents); } catch (err) { return resp_({ ok: false }); }
  if (!o || typeof o.code !== 'string' || o.code.length > 8000 || o.code.indexOf('BS1:') !== 0) return resp_({ ok: false });
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try { aba_().appendRow([Utilities.getUuid(), new Date().toISOString(), o.code, '']); } finally { lock.releaseLock(); }
  return resp_({ ok: true });
}

// O aplicativo busca os cadastros novos. A senha é verificada acima, você não precisa mexer aqui.
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.ping) return resp_({ ok: true, versao: 2, senhaConfigurada: SENHA !== PADRAO });
  if (SENHA === PADRAO || p.token !== SENHA) return resp_({ ok: false, erro: 'token' });
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
}
