// Guarda o aplicativo no aparelho para abrir mesmo sem internet.
// Ao publicar uma versão nova, troque o número de VERSAO para o aparelho atualizar.
const VERSAO = 'agenda-psi-v17';
const ARQUIVOS = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/logo.png', 'config.js', 'atividades/', 'atividades/catalogo.js', 'atividades/avaliacoes.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const mesmaOrigem = url.origin === self.location.origin;
  const fonte = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!mesmaOrigem && !fonte) return;
  // páginas: busca primeiro na internet (sempre a versão mais nova); sem internet, abre a guardada
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req.url, { cache: 'no-cache' }).then((r) => {
        if (r && r.ok) caches.open(VERSAO).then((c) => c.put(req, r.clone()));
        return r;
      }).catch(() =>
        caches.open(VERSAO).then((c) => c.match(req, { ignoreSearch: true }).then((g) => g || c.match('index.html')))
      )
    );
    return;
  }
  // demais arquivos: abre o guardado e atualiza em segundo plano
  e.respondWith(
    caches.open(VERSAO).then((cache) =>
      cache.match(req, { ignoreSearch: true }).then((guardado) => {
        const rede = fetch(req).then((r) => {
          if (r && (r.ok || r.type === 'opaque')) cache.put(req, r.clone());
          return r;
        }).catch(() => guardado);
        return guardado || rede;
      })
    )
  );
});
