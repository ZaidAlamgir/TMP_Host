const firebaseConfig = {
  apiKey: "AIzaSyAstYkSC7QMkZrjpYaTxvZyU_v6oPCDaAo",
  authDomain: "tmp-app-380a9.firebaseapp.com",
  projectId: "tmp-app-380a9",
  storageBucket: "tmp-app-380a9.firebasestorage.app",
  messagingSenderId: "1021013128440",
  appId: "1:1021013128440:web:a8f67c6b868b3ce5eff70d"
};
  // This function runs only after the entire HTML page is fully loaded.
// This prevents errors from trying to find elements that don't exist yet.
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Firebase using your configuration
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.error("Firebase initialization failed. Make sure you have pasted your firebaseConfig object correctly.", e);
        // If Firebase doesn't start, we stop the script to prevent further errors.
        return; 
    }
    
    // Get a reference to the Firebase Authentication service
    const auth = firebase.auth();

    // Get all the interactive elements from the login.html page
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const googleSignInButton = document.getElementById('googleSignIn');
    const toggleFormLink = document.getElementById('toggleForm');
    const errorMessageDiv = document.getElementById('errorMessage');

    // --- Event Listener for the link that toggles between Login and Register forms ---
    if (toggleFormLink) {
        toggleFormLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the link from trying to navigate
            if (loginForm.style.display === 'none') {
                // If the login form is hidden, show it and hide the register form
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
                toggleFormLink.textContent = "Don't have an account? Sign Up";
            } else {
                // Otherwise, hide the login form and show the register form
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
                toggleFormLink.textContent = 'Already have an account? Log In';
            }
            errorMessageDiv.textContent = ''; // Clear any previous error messages
        });
    }

    // --- Event Listener for the Registration form submission ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents the form from reloading the page
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            // Use Firebase to create a new user with email and password
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // If successful, redirect the user to the main page
                    window.location.href = 'index.html'; 
                })
                .catch((error) => {
                    // If there's an error, display it to the user
                    errorMessageDiv.textContent = error.message;
                });
        });
    }

    // --- Event Listener for the Login form submission ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents the form from reloading the page
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Use Firebase to sign in the user with email and password
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // If successful, redirect the user to the main page
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    // If there's an error, display it to the user
                    errorMessageDiv.textContent = error.message;
                });
        });
    }

    // --- Event Listener for the "Sign in with Google" button ---
    if (googleSignInButton) {
        googleSignInButton.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            // Use Firebase to trigger the Google sign-in pop-up
            auth.signInWithPopup(provider)
                .then(() => {
                    // If successful, redirect the user to the main page
                    window.location.href = 'index.html'; 
                })
                .catch((error) => {
                    // If there's an error, display it to the user
                    errorMessageDiv.textContent = error.message;
                });
        });
    }
});

