// Define the cache name
const CACHE_NAME = 'my-react-app-cache-v1';

// List of files to pre-cache on installation. 
// NOTE: You must update this list whenever you deploy new versions of your static assets (like JS/CSS bundles).
// CRUCIALE: Assicurati che tutti gli asset necessari per la prima schermata siano qui.
const urlsToCache = [
    '/',
    '/index.html'
    // Aggiungi qui gli asset principali (es. i tuoi file bundle JS/CSS se hanno nomi statici)
    // Es: '/static/js/main.chunk.js', 
    // Es: '/static/css/main.chunk.css', 
];

// 1. Install Event: Caches all static resources
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install event: Caching assets.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // Tentativo di aggiungere tutti gli URL cruciali
                return cache.addAll(urlsToCache).catch(err => {
                    console.error('Failed to pre-cache URLs:', err);
                });
            })
    );
});

// 2. Activate Event: Cleans up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate event: Cleaning up old caches.');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// 3. Fetch Event: Implements the Cache-First strategy
self.addEventListener('fetch', (event) => {
    // We only process GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 1. Ritorna la risposta cacheata se trovata
                if (response) {
                    return response;
                }
                
                // 2. LOGICA AGGIUNTA PER GESTIRE LA NAVIGAZIONE OFFLINE IN CHROME
                // Se la richiesta è una navigazione (l'utente digita l'URL o fa refresh)
                // e non abbiamo trovato corrispondenza nella cache:
                if (event.request.mode === 'navigate') {
                    // Cerca esplicitamente il file index.html nella cache e servilo.
                    return caches.match('/index.html').then(htmlResponse => {
                        if (htmlResponse) {
                            return htmlResponse;
                        }
                        // Se non troviamo index.html (cosa improbabile dopo il pre-caching),
                        // prosegui con il fetch di rete come fallback.
                        return fetch(event.request);
                    });
                }
                
                // 3. Fallback alla rete per tutti gli altri asset (immagini, API, etc.)
                return fetch(event.request).then((networkResponse) => {
                    // Cache the new response for future use
                    return caches.open(CACHE_NAME).then((cache) => {
                        // Check if response is valid (e.g., status 200) and not a cross-origin resource that can't be cached
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clone the response because it's a stream and can only be consumed once
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
            // If both cache and network fail (i.e., truly offline), provide a fallback response
            .catch(() => {
                // Questo catch ora gestisce gli errori di rete generali
                return new Response('App is offline.', { status: 503 });
            })
    );
});
