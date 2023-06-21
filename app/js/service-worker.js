// Import the Firebase Messaging library
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

let firebaseConfig = {
    apiKey: "AIzaSyAVkQ_Hlm4n-qsqk0R8PH1sv-9q2fcHrrc",
    authDomain: "devtracking-3e00e.firebaseapp.com",
    projectId: "devtracking-3e00e",
    storageBucket: "devtracking-3e00e.appspot.com",
    messagingSenderId: "437412609984",
    appId: "1:437412609984:web:036f52ce3d86367173d225",
    measurementId: "G-55N4WMWQPJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const firebaseMessaging = firebase.messaging();
let url = 'https://track.global'

// Handle background messages
// firebaseMessaging.onBackgroundMessage((payload) => {
//     console.log('Received a background message', payload);
//
//     let notificationTitle, notificationOptions;
//
//     // Check if the notification data exists
//     if (payload.data) {
//         // Customize notification using the data field
//         notificationTitle = payload.notification.title;
//         notificationOptions = {
//             body: payload.notification.body,
//             icon: '/images/logo1.svg',
//             vibrate: [100, 50, 100],
//             actions: [
//                 {
//                     action: 'explore', title: 'Перейти на сайт',
//                    // icon: '/images/checkmark.png'
//                 },
//                 {
//                     action: 'close', title: 'Закрыть',
//                   //  icon: '/images/xmark.png'
//                 },
//             ],
//             requireInteraction: true,
//             data: {
//                 url: payload.data.url // Save the URL for later
//             }
//
//         };
//     }
//
//     // Show the notification
//     return self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener('push', function(event) {
    const payload = JSON.parse(event.data.text());

    const notificationOptions = {
        body: payload.notification.body,
        icon: '/images/logo1.svg',
        vibrate: [100, 50, 100],
        actions: [
            {
                action: 'explore', title: 'Перейти на сайт',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close', title: 'Закрыть',
                icon: '/images/xmark.png'
            },
        ],
        requireInteraction: true,
        data: {
            url: payload.data.url // Save the URL for later
        }
    }

    // Show the notification
    event.waitUntil(
        self.registration.showNotification(payload.notification.title, notificationOptions)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    console.log(event.notification.data.url)
    if (event.action === 'explore') {
        // Use the URL from the payload
        clients.openWindow(event.notification.data.url);
    }
});