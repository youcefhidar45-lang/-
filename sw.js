const CACHE_NAME = 'youssef-notebook-v2.0';
const urlsToCache = [
    'index.html',
    'tasks.html',
    'info.html',
    'dua.html',
    'manifest.json'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// تنشيط Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// استرجاع الملفات من Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // إرجاع من Cache أو جلب من الشبكة
                return response || fetch(event.request);
            })
            .catch(() => {
                // في حالة عدم توفر الشبكة، يمكن إرجاع صفحة offline مخصصة
                return caches.match('index.html');
            })
    );
});
