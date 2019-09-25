console.log("app.js loaded");

if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker and Push is supported");
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("./ServiceWorker.js").then(
      function(registration) {
        console.log("Service Worker: Registered ", registration);
      },
      function(e) {
        console.log("Error during service worker registration:", e);
      }
    );
    navigator.serviceWorker.ready.then(function(registration) {
      console.log(
        "Service worker successfully registered on scope",
        registration.scope
      );
    });
  });
} else {
  console.warn("Push messaging is not supported");
  console.log("Service workers are not supported.");
}
Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});
function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification('Hello world!');
    });
  }
}
// const divInstall = document.getElementById('installContainer');
// const butInstall = document.getElementById('butInstall');

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//            .register('/ServiceWorker.js')
//            .then(function() { console.log('Service Worker Registered'); });
// }
// let deferredPrompt;
// window.addEventListener('beforeinstallprompt', (event) => {
//   console.log('beforeinstallprompt', event);
//   // window.deferredPrompt = event;
//   deferredPrompt = event;
//   // divInstall.classList.toggle('hidden', true);
//   butInstall.style.display = 'block';
// });
// butInstall.addEventListener('click', (event) => {
//   console.log('butInstall-clicked');
//   butInstall.style.display = 'none';
//   deferredPrompt.prompt();
//   deferredPrompt.userChoice
//     .then((choiceResult) => {
//       if (choiceResult === undefined) {
//         btnAdd.style.display = 'block';
//       }
//       deferredPrompt = null;
//     });
  
// });
// window.addEventListener('appinstalled', (event) => {
//   console.log('appinstalled', event);
// });
