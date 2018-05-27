 var staticCacheName = 'rest-static-v1';
//booodddd

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
            '/',
            'js/main.js',
            'css/styles.css',
            'css/responsive.css',
            'css/responsiveRest.css',
            'img/1.jpg'
        ]);
    })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheName) {
      return Promise.all(
         cacheName.filter(function(cacheName) {
             return cacheName.startsWith('rest-') &&
                    cacheName != staticCacheName;
         }).map(function(cacheName){
            return caches.delete(cacheName);
          })
        );
    })
  )
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if (response) return response;
      return fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
    if(event.data.action == 'skipWaiting'){
      self.skipWaiting();
    }
});




  // event.respondWith(
  //   fetch(event.request).then(function(response) {
  //     if (response.status === 404) {
  //       // TODO: instead, respond with the gif at
  //       // /imgs/dr-evil.gif
  //       // using a network request
  //       return new Response("Whoops, not found");
  //     }
  //     return response;
  //   }).catch(function() {
  //     return new Response("Uh oh, that totally failed!");
  //   })
  // );




// if(event.request.url.endsWith('.jpg')){
//   event.respondWith(
//     fetch('/img/dr-evil.gif')
//     );
// }


// event.respondWith(
//       new Response('hello!'));
  