console.log("service worker loaded");
var cacheName = 'vizru';
var urlsToCache = [
  '/',
  '/mobile/chat_typing-dots-speed-2.gif',
  "/mobile/icon-192x192.png",
  "/mobile/icon-152x152.png",
  "/mobile/icon-256x256.png",
  "/mobile/js/extchat.min.js",
  "/mobile/js/app.js",
  "/mobile/js/bootstrap-tagsinput.js",
  "/mobile/js/bootstrap.min.js",
  "/mobile/js/jquery-2.0.0.min.js",
  "/mobile/js/jquery-2.0.0.min.js",
  "/mobile/js/jquery-ui.js",
  "/mobile/js/moment-with-locales.min.js",
  "/mobile/js/socket.io.js",
  "/mobile/js/underscore-min.js"
];
self.addEventListener('install', (event) => {
  console.log('install', event);
  event.waitUntil(caches.open(cacheName).then(function (cache) {
    return cache.addAll(urlsToCache)
  })
  );
});

self.addEventListener('activate', (event) => {
  console.log( 'activate', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
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


});
self.addEventListener('push', function (event) {
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
self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;
  console.log('Closed notification: ' + primaryKey);
});
