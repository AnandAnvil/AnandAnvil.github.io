console.log("service worker loaded")
self.addEventListener('install', (event) => {
    console.log( 'install', event);
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log( 'activate', event);
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
     console.log( 'fetch', event);
    event.respondWith(fetch(event.request));
  });
  self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    console.log('Closed notification: ' + primaryKey);
    
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('https://anandanvil.github.io/');
      notification.close();
    }
  });