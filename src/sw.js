importScripts('/sw.strategies.js');

const router = {
  find: (url) => router.routes.find(it => url.match(it.url)),
  routes: [
    { url: `^http://localhost:[0-9]{1,5}/$`, handle: strategy.staleWhileRevalidate },
    { url: `^http://localhost:[0-9]{1,5}/.*\\.html`, handle: strategy.staleWhileRevalidate },
    { url: `^http://localhost:[0-9]{1,5}/.*\\.css`, handle: strategy.staleWhileRevalidate },
    { url: `^http://localhost:[0-9]{1,5}/.*\\.js`, handle: strategy.staleWhileRevalidate },
    { url: `^http://localhost:[0-9]{1,5}/.*\\.jpeg`, handle: strategy.cacheFirst }
  ]
};

self.addEventListener("fetch", event => {
  const found = router.find(event.request.url);
  if (found) found.handle(event);
});

const currentCache = 'v1'; // ← CHANGE IT TO RESET CACHE

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames
        .filter(cacheName => cacheName !== currentCache)
        .map(cacheName => caches.delete(cacheName))
    ))
  );
});
