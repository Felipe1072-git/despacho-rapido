// Service worker do Despacho Rápido.
// Rede primeiro (sempre pega a versão nova quando há internet) e guarda uma cópia
// de tudo que carregou, pra o app abrir e funcionar mesmo sem internet.
const CACHE = 'despacho-rapido-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !/^https?:/.test(req.url)) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()).catch(() => {});
      return res;
    } catch (erro) {
      const salvo = await cache.match(req, { ignoreSearch: true });
      if (salvo) return salvo;
      throw erro;
    }
  })());
});
