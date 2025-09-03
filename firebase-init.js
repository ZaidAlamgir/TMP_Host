// This file initializes Firebase and creates a special "authReady" promise.
// This promise acts as a gate, only resolving when Firebase's initial authentication check is complete.
// This is the core of the solution to prevent race conditions.

const firebaseConfig = {
  apiKey: "AIzaSyAstYkSC7QMkZrjpYaTxvZyU_v6oPCDaAo",
  authDomain: "tmp-app-380a9.firebaseapp.com",
  projectId: "tmp-app-380a9",
  storageBucket: "tmp-app-380a9.firebasestorage.app",
  messagingSenderId: "1021013128440",
  appId: "1:1021013128440:web:a8f67c6b868b3ce5eff70d"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Create the promise that other scripts will wait for.
const authReady = new Promise(resolve => {
    // onAuthStateChanged fires once on page load.
    // The `unsubscribe` function stops the listener after it runs the first time.
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        resolve(user); // Resolve with either the user object or null
        unsubscribe();
    });
});
