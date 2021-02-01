const cacheFirst = (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request).then((networkResponse) => {
        return caches.open(currentCache).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
      })
    })
  );
};

const cacheOnly = (event) => {
  event.respondWith(caches.match(event.request));
};

const networkFirst = (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return caches.open(currentCache).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
      })
      .catch(() => {
        return caches.match(event.request);
      })
  )
};

const networkOnly = (event) => {
  event.respondWith(fetch(event.request));
};

const staleWhileRevalidate = (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      if (cacheResponse) {
        fetch(event.request).then((networkResponse) => {
          return caches.open(currentCache).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        });
        return cacheResponse;
      } else {
        return fetch(event.request).then((networkResponse) => {
          return caches.open(currentCache).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        });
      }
    })
  );
};

const strategy = {
  cacheFirst,
  cacheOnly,
  networkFirst,
  networkOnly,
  staleWhileRevalidate,
};

