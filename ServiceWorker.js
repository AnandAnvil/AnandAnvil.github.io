console.log("service worker loaded")
self.addEventListener('install', (event) => {
    console.log( 'install', event);
    e.waitUntil(caches.open('vizru').then(function(cache){
      return cache.addAll([
        '/',
        '/chat_typing-dots-speed-2.gif',
        "/icon-192x192.png",
        "/icon-152x152.png",
        "/icon-256x256.png",
        "/js/extchat.min.js",
        "/js/app.js"

      ])
    })
    );
    //self.skipWaiting();
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
  self.addEventListener('push', function(event) {
    console.log('Received a push message');

    var title = 'New message.'; 
    var body = 'You have received a new message.';
    var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            tag: tag
        })
    );
});
  