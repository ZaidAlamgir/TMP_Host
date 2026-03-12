const CORE_CACHE = 'tmp-core-v12';
const ARTICLE_CACHE = 'tmp-articles-v12';
const ASSET_CACHE = 'tmp-assets-v12';

const CORE_ASSETS = [
    '/',                      
    '/index.html',            
    '/offline.html',  
    'https://author.tmpnews.com/profile/tmpnews.webp',     
    '/assets/style/style.css',
    '/assets/style/index-menu.css',
    '/assets/style/home.css',
    '/assets/style/dark-mode.css',
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

// Keeps your storage clean by deleting the oldest articles when you pass the limit
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(() => limitCacheSize(name, size));
            }
        });
    });
};

self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CORE_CACHE).then(async (cache) => {
            console.log('SW: Caching Core App Shell v13');
            for (let asset of CORE_ASSETS) {
                try {
                    const response = await fetch(asset);
                    if (response.ok) {
                        await cache.put(asset, response);
                    }
                } catch (err) {
                    console.error(`SW Install: Network error on ${asset}`);
                }
            }
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Wipes out v12 and v11 to free up space
                    if (cacheName !== CORE_CACHE && cacheName !== ARTICLE_CACHE && cacheName !== ASSET_CACHE) {
                        console.log('SW: Wiping old cache memory ->', cacheName);
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

    // 1. Bypass Logic (Crucial for Supabase Auth and APIs)
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

    // 2. UNIVERSAL HTML ROUTING (Instant Load for everything)
    if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
                
                // Always reach out to the internet in the background to get the freshest data
                const fetchPromise = fetch(request).then((networkResponse) => {
                    if (networkResponse && networkResponse.ok) {
                        const responseClone = networkResponse.clone();
                        
                        // Sort into the correct cache bucket
                        const isCore = (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '');
                        const targetCache = isCore ? CORE_CACHE : ARTICLE_CACHE;
                        
                        caches.open(targetCache).then((cache) => {
                            cache.put(request, responseClone).then(() => {
                                if (!isCore) limitCacheSize(ARTICLE_CACHE, 150); // Keeps your 100+ articles safe!
                            });
                        });
                    }
                    return networkResponse;
                }).catch(() => { return null; }); // Silent fail if user drops offline

                // If we have the page/article in storage, SHOW IT INSTANTLY
                if (cachedResponse) {
                    event.waitUntil(fetchPromise); // Keeps SW alive to finish the background fetch
                    return cachedResponse;
                }

                // If it's a brand new article not in storage, wait for the internet fetch
                return fetchPromise.then((networkResponse) => {
                    return networkResponse || caches.match('/offline.html');
                });
            })
        );
        return;
    }

    // 3. Asset Routing (CSS, JS, Images)
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            const fetchPromise = fetch(request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
                    const responseClone = networkResponse.clone();
                    caches.open(ASSET_CACHE).then((cache) => {
                        cache.put(request, responseClone).then(() => {
                            limitCacheSize(ASSET_CACHE, 100); 
                        });
                    });
                }
                return networkResponse;
            }).catch(() => { /* Silent network fail */ });

            if (cachedResponse) {
                event.waitUntil(fetchPromise); 
                return cachedResponse;
            }
            return fetchPromise;
        })
    );
});