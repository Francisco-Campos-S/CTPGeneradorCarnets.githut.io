const CACHE_NAME = 'carnes-ctp-v1.2';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './assets/logo.png',
  './assets/bus.png',
  './assets/sello.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('SW: Instalando Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Cacheando archivos');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('SW: Error al cachear:', err);
      })
  );
});

// Activar Service Worker (limpiar caches antiguos)
self.addEventListener('activate', event => {
  console.log('SW: Activando Service Worker');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;

        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));

          return response;
        });
      })
      .catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});

// Manejar mensajes del cliente (para forzar actualización)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Detectar nueva versión
self.addEventListener('updatefound', () => {
  const newWorker = registration.installing;
  newWorker.addEventListener('statechange', () => {
    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
      console.log('SW: Nueva versión disponible');
    }
  });
});
