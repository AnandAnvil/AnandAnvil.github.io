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
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      console.log("Service worker successfully registered on scope",registration.scope);
      return serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true
      })
    }).then(function(subscription) {console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",subscription.endpoint);});
    
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
function messageToClient(client, data) {
  return new Promise(function(resolve, reject) {
    const channel = new MessageChannel();

    channel.port1.onmessage = function(event){
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage(JSON.stringify(data), [channel.port2]);
  });
}

self.addEventListener('push', function (event) {
  if (event && event.data) {
    self.pushData = event.data.json();
    if (self.pushData) {
      event.waitUntil(self.registration.showNotification(self.pushData.title, {
        body: self.pushData.body,
        icon: self.pushData.data ? self.pushData.data.icon : null
      }).then(function() {
        clients.matchAll({type: 'window'}).then(function (clientList) {
          if (clientList.length > 0) {
            messageToClient(clientList[0], {
              message: self.pushData.body // suppose it is: "Hello World !"
            });
          }
        });
      }));
    }
  }
});


