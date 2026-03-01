// Bump this version whenever you change CSS/JS files significantly!
const CACHE_NAME = 'tmp-cache-v3'; 

// ONLY cache static structural files here!
// We removed dynamic HTML pages (like '/', '/live/') from this list. 
// We will cache HTML dynamically on the fly so the install never fails.
const STATIC_ASSETS = [
    '/',                      // ADD THIS BACK! Caches the homepage
    '/index.html',            // Add this just in case
    '/assets/style/style.css',
    '/assets/style/index-menu.css',
    '/assets/style/home.css',
    '/assets/style/dark-mode.css',
    '/assets/header-injector.js',
    '/assets/bottom-nav.js',
    '/favicon-32x32.png',
    '/favicon.svg',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
];

// 1. On "install", pre-cache only the static App Shell
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching Static App Shell');
                return cache.addAll(STATIC_ASSETS);
            })
    );
});

// 2. On "activate", clean up old cache versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim(); 
});

// 3. On "fetch", use SMART routing
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // =========================================================================
    // RULE 1: STRICT BYPASS FOR APIS & CLOUDFLARE KV/D1 DATA
    // =========================================================================
    // Never cache Supabase, Google Auth, your Live Feed API, Cloudflare Workers/Functions,
    // or any request that is asking for JSON data (like post.html fetching an article).
    if (
        url.origin.includes('supabase.co') || 
        url.origin.includes('accounts.google.com') ||
        url.origin.includes('data.tmpnews.com') ||
        url.pathname.startsWith('/api/') ||           // Bypasses /api/... routes
        url.pathname.startsWith('/functions/') ||     // Bypasses Cloudflare Pages Functions
        url.pathname.endsWith('.json') ||             // Bypasses explicit JSON files
        request.method !== 'GET' ||                   // Bypasses POST/PUT/DELETE
        request.headers.get('accept')?.includes('application/json') // CRITICAL: Bypasses ALL fetch() API calls for data
    ) {
        return; // Exit SW and go straight to the internet/Cloudflare D1
    }

    // =========================================================================
    // RULE 2: NETWORK-FIRST FOR HTML (Pages, Articles, Hub, Live)
    // =========================================================================
    // Always fetch the freshest news layout from the internet. 
    // Only show the cached version if the user loses internet connection.
    if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    // NEW CHECK: Only cache the page if it loaded successfully (Status 200)
                    // This prevents caching 404 Not Found or 500 Server Error pages!
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // User is offline: show the last read version of the page
                    return caches.match(request);
                })
        );
        return;
    }
    // =========================================================================
    // RULE 3: CACHE-FIRST FOR ASSETS (CSS, JS, Fonts, Images)
    // =========================================================================
    // Loads the design instantly from the phone's memory.
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse; // Instant load
            }

            // If not cached, go to network
            return fetch(request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                if (networkResponse.type === 'basic' || networkResponse.type === 'cors') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
                }

                return networkResponse;
            }).catch(() => {
                // Silent fail for assets if offline
            });
        })
    );
});