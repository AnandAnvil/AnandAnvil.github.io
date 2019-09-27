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
    navigator.serviceWorker.addEventListener('message', function(event) {
      console.log(event.data.message); // Hello World !
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
      var options = {
        body: 'Here is a notification body!',
        dir : "ltr"
      };
      reg.showNotification('Hello world!');
    });
  }
}
function notifyMe(user,message) {
  
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  
  else if (Notification.permission === "granted") {
   
  var options = {
        body: message,
        dir : "ltr"
    };
  var notification = new Notification(user + " Posted a comment",options);
  }
  
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
    
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
     
      if (permission === "granted") {
        var options = {
                body: message,
                dir : "ltr"
        };
        var notification = new Notification(user + " Posted a comment",options);
      }
    });
  }
 
}


