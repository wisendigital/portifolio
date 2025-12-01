const CACHE_NAME = 'wisen-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './index.tsx', // IMPORTANT: Add the main JS module
  './manifest.json'
  // You might want to add other critical static assets here (e.g., images, fonts)
  // CDN assets are generally handled by the browser's HTTP cache, but can be explicitly cached if needed.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Attempt to cache core assets.
        // Catch errors to prevent installation from failing if a non-critical resource fails.
        return cache.addAll(urlsToCache).catch(err => {
            console.error('Failed to cache all core URLs during install:', err);
        });
      })
      .then(() => self.skipWaiting()) // Activate new service worker immediately
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim()) // Take control of un-controlled clients immediately
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Strategy: Cache-first, then network, and update cache if new response is valid
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request to fetch it twice (once for cache, once for browser)
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((networkResponse) => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Important: Clone the response. A response is a stream and
          // can only be consumed once. We are consuming it once to cache it
          // and once to return it to the browser.
          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch((error) => {
          console.error('Fetch failed:', event.request.url, error);
          // You could return an offline page here if needed
          // For now, let the browser handle network failure
          // return caches.match('/offline.html');
        });
      })
  );
});