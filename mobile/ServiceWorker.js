console.log("service worker loaded");
var cacheName = 'vizru';
var urlsToCache = [
  'chat_typing-dots-speed-2.gif',
  "icon-192x192.png",
  "icon-152x152.png",
  "icon-256x256.png",
  "./js/extchat.min.js",
  "./js/app.js",
  "./js/bootstrap-tagsinput.js",
  "./js/bootstrap.min.js",
  "./js/jquery-2.0.0.min.js",
  "./js/jquery-2.0.0.min.js",
  "./js/jquery-ui.js",
  "./js/moment-with-locales.min.js",
  "./js/socket.io.js",
  "./js/underscore-min.js"
];
self.addEventListener('install', (event) => {
  console.log('install', event);
  event.waitUntil(caches.open(cacheName).then(function (cache) {
    return cache.addAll(urlsToCache)
  })
  );
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
