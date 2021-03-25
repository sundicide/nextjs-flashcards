import firebaseClient from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*
Copy/paste your *client-side* Firebase credentials below.
To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.
*/
const CLIENT_CONFIG = {
  apiKey: "AIzaSyAQrscuacML1TB1d0LhO7NSpRbzae2Q5wM",
  authDomain: "nextjs-postcards.firebaseapp.com",
  projectId: "nextjs-postcards",
  storageBucket: "nextjs-postcards.appspot.com",
  messagingSenderId: "971229343442",
  appId: "1:971229343442:web:391466e161a3e83eb5c70b",
  measurementId: "G-9T0WL40N4S"
};

// if (!firebaseClient.apps.length) {
//   firebaseClient.initializeApp(CLIENT_CONFIG);
//   firebaseClient
//     .auth()
//     .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
//   firebaseClient.analytics();
// }

// export { firebaseClient };
if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  window.firebase = firebaseClient;
}

export { firebaseClient };