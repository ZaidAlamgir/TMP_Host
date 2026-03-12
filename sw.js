const CACHE_NAME = 'tmp-cache-v4'; 
const CACHE_NAME = 'tmp-cache-v6'; 

const STATIC_ASSETS = [
    '/',                      
    '/index.html',   
    '/assets/style/style.css',
    '/assets/style/dark-mode.css',
    '/assets/style/home.css',
    '/assets/style/index-menu.css',
    '/assets/style/post.css',          
    '/assets/style/menu.css',         
    '/assets/style/profile.css',       
    '/assets/style/login.css',         
    '/assets/header-injector.js',
    '/assets/bottom-nav.js',
    '/post.js',                        
    '/home.js',                       
    '/cache-manager.js',               
    '/favicon-32x32.png',
    '/favicon.svg'
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log('Service Worker: Caching Static App Shell');
            let cachedCount = 0;
            for (let asset of STATIC_ASSETS) {
                try {
                    const response = await fetch(asset);
                    if (response.ok) {
                        await cache.put(asset, response);
                        cachedCount++;
                    } else {
                        console.warn(`SW Install: Failed to fetch ${asset} (Status: ${response.status})`);
                    }
                } catch (err) {
                    console.error(`SW Install: Network error on ${asset}`, err);
                }
            }
            console.log(`SW Install: Cached ${cachedCount} out of ${STATIC_ASSETS.length} assets.`);
        })
    );
});

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

self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    if (
        url.origin.includes('supabase.co') || 
        url.origin.includes('accounts.google.com') ||
        url.origin.includes('data.tmpnews.com') ||
        url.pathname.startsWith('/api/') ||           
        url.pathname.startsWith('/functions/') ||     
        url.pathname.endsWith('.json') ||             
        request.method !== 'GET' ||                   
        request.headers.get('accept')?.includes('application/json') 
    ) {
        return; 
    }
    if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
                    }
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse; 
            }

            return fetch(request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                if (networkResponse.type === 'basic' || networkResponse.type === 'cors') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
                }

                return networkResponse;
            }).catch((err) => {
                console.warn('SW Fetch: Network failure for', request.url, err);
            });
        })
    );
});