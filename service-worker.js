const CACHE_NAME = 'wisen-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './index.tsx', // Explicitly cache the main TSX file
  './manifest.json',
  './metadata.json',
  './App.tsx', // Include all relevant app files
  './types.ts',
  './services/geminiService.ts',
  './components/Navbar.tsx',
  './context/ProjectContext.tsx',
  './pages/Home.tsx',
  './pages/Portfolio.tsx',
  './pages/Admin.tsx',
  './components/Footer.tsx',
  './pages/ProjectDetail.tsx',
  './context/ProfileContext.tsx',
  './context/AuthContext.tsx',
  './pages/Login.tsx',
  './pages/Sales.tsx',
  // CDN assets from index.html and importmap
  'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap',
  'https://fonts.gstatic.com', // preconnect origin for fonts - important for fonts.google.com
  'https://cdn.tailwindcss.com',
  // Specific CDN paths from importmap, ensuring all variants are covered if used
  'https://aistudiocdn.com/react@^19.2.0/',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/',
  'https://aistudiocdn.com/lucide-react@^0.555.0',
  'https://aistudiocdn.com/recharts@^3.5.1',
  'https://aistudiocdn.com/react-router-dom@^7.9.6',
  'https://aistudiocdn.com/@google/genai@^1.30.0',
  // PWA icons - assuming they are in the root based on manifest.json
  'https://cdn-icons-png.flaticon.com/512/10891/10891991.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch(err => {
            console.error('Failed to cache some URLs during install:', err);
            // Even if some fail, try to proceed. Log the error.
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
  if (event.request.method !== 'GET') {
    return;
  }

  // Check if the request is for a cached URL, specifically handle the 'index.tsx' case.
  // The browser will attempt to load 'index.tsx' via the <script type="module"> tag.
  // If the server returns 'index.tsx' as text/plain or without transpiling,
  // the browser will fail to execute it.
  // This fetch handler ensures it's cached, but doesn't solve browser interpretation.

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch((error) => {
          console.error('Fetch failed for:', event.request.url, error);
          // For now, let the browser handle network failure for dynamic content
          // or return a generic offline page if a specific one is provided.
          // return caches.match('/offline.html');
          throw error; // Propagate the error to show that the fetch failed
        });
      })
  );
});