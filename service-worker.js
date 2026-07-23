// 1. Subimos a versão para v3 para invalidar o cache antigo das imagens
const CACHE_NAME = 'portal-bimbo-v4';

// 2. Incluídos os ícones na lista de recursos em cache
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/img/background-bimbo.png',
  '/img/icon-192.png',
  '/img/icon-512.png'
];

// Instala o Service Worker e armazena os arquivos essenciais no cache
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Garante a substituição imediata do Service Worker antigo
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativa o SW, limpa caches antigos e assume o controle das abas ativas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log(`[Portal SW] Removendo cache obsoleto: ${key}`);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Força o app a responder pelo novo SW na hora
  );
});

// Responde com o cache quando estiver offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
