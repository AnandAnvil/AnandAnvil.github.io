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
  self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('samples/page' + primaryKey + '.html');
      notification.close();
    }
  
    // TODO 5.3 - close all notifications when one is clicked
  
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
  self.addEventListener('notificationclose',event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    console.log('Closed notification: ' + primaryKey);
  });
 