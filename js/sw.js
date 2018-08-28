var currentCacheVersion = 'mrp-v1';

//caches resources
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(currentCacheVersion).then(function(cache){
            return cache.addAll(
                [
                    '/', 
                    '/js/main.js',
                    '/css/styles.css',
                    '/data/restaurants.json',
                    '/restaurant.html',
                    '/js/restaurant_info.js',
                    '/js/dbhelper.js',
                    '/img/1.jpg',
                    '/img/2.jpg',
                    '/img/3.jpg',
                    '/img/4.jpg',
                    '/img/5.jpg',
                    '/img/6.jpg',
                    '/img/7.jpg',
                    '/img/8.jpg',
                    '/img/9.jpg',
                    '/img/10.jpg'
                ]
            );    
        })    
    );
});


//Deletes older cache versions.
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('mrp-') &&
                        cacheName != currentCacheVersion;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//fetches from the cache. 
//https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});

