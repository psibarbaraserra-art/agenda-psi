// Guarda o app do Instituto Luma no aparelho para abrir mesmo sem internet.
// Ao publicar uma versão nova, troque o número de VERSAO para o aparelho atualizar.
const VERSAO = 'luma-gestao-v1';
const ARQUIVOS = ['./', 'index.html', 'app.js', 'obrigacoes.js', 'manifest.webmanifest', 'icons/logo.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('luma-gestao-') && k !== VERSAO).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const mesmaOrigem = url.origin === self.location.origin;
  const fonte = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!mesmaOrigem && !fonte) return;
  // sempre tenta a versão mais nova na internet; sem internet, usa a guardada
  e.respondWith(
    fetch(req, req.mode === 'navigate' ? { cache: 'no-cache' } : undefined).then((r) => {
      if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(VERSAO).then((c) => c.put(req, cp)); }
      return r;
    }).catch(() => caches.open(VERSAO).then((c) => c.match(req, { ignoreSearch: true }).then((g) => g || (req.mode === 'navigate' ? c.match('index.html') : undefined))))
  );
});
