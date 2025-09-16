const CACHE_NAME = 'tenlee-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './service-worker.js',
  './images/bg1.jpg',
  './images/bg2.jpg',
  './images/icon-192.png',
  './images/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// 安裝 Service Worker 並緩存必要資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 啟用 Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// 攔截 fetch 請求，先讀取快取，若沒有再從網路抓
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
