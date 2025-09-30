---
layout: standalone
title: Account - The Muslim Post
---

<style>
    /* --- Professional Modal Login Style --- */
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #f0f2f5;
        margin: 0;
        color: #1c1e21;
        /* Hide body scrollbars when modal is open */
        overflow: hidden;
    }
    .auth-page-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* Use a background image or color from your site */
        background-color: #f0f2f5; 
        background-size: cover;
        background-position: center;
        /* The "glass" effect */
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
    }
    .auth-container {
        background-color: #fff;
        padding: 2rem 2.5rem;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 450px;
        text-align: center;
        box-sizing: border-box;
        position: relative;
    }
    .auth-container.hidden {
        display: none; /* Used by the auth guard to prevent flicker */
    }
    .close-btn {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 2rem;
        color: #8a8d91;
        text-decoration: none;
        line-height: 1;
        transition: color 0.2s;
    }
    .close-btn:hover {
        color: #1c1e21;
    }
    .auth-step {
        display: none;
    }
    .auth-step.active {
        display: block;
    }
    h1 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }
    p {
        color: #606770;
        margin-bottom: 2rem;
    }
    .form-group {
        text-align: left;
        margin-bottom: 1.25rem;
    }
    label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    input[type="email"], input[type="text"], input[type="password"] {
        width: 100%;
        padding: 14px;
        border: 1px solid #dddfe2;
        border-radius: 8px;
        font-size: 1rem;
        box-sizing: border-box;
    }
    .password-wrapper {
        position: relative;
    }
    .toggle-password {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        cursor: pointer;
        color: #8a8d91;
    }
    .btn-primary {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        background-color: #0073e6;
        color: #fff;
        transition: background-color 0.3s;
    }
    .btn-primary:hover {
        background-color: #005bb5;
    }
    .password-reqs {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0 0;
        text-align: left;
        font-size: 0.9rem;
    }
    .password-reqs li {
        margin-bottom: 0.5rem;
        color: #606770;
        transition: color 0.3s;
    }
    .password-reqs li.valid {
        color: #42b72a;
    }
    .password-reqs li .fa-check-circle {
        margin-right: 8px;
    }
    .back-link, .auth-toggle-link a {
        color: #0073e6;
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
    }
    .back-link {
        display: inline-block;
        margin-top: 1.5rem;
    }
    .error-message {
        color: #fa383e;
        margin-bottom: 1rem;
        text-align: left;
        font-size: 0.9rem;
        min-height: 1.2em;
    }
    .divider {
        display: flex; align-items: center; text-align: center; color: #8a8d91; margin: 1.5rem 0;
    }
    .divider::before, .divider::after {
        content: ''; flex: 1; border-bottom: 1px solid #dddfe2;
    }
    .divider:not(:empty)::before { margin-right: .5em; }
    .divider:not(:empty)::after { margin-left: .5em; }
    .btn-google {
        display: flex; align-items: center; justify-content: center; width: 100%; padding: 12px; background-color: #fff; color: #444; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background-color 0.3s;
    }
    .btn-google:hover { background-color: #f7f7f7; }
    .btn-google img { width: 20px; height: 20px; margin-right: 12px; }
    .auth-toggle-link {
         margin-top: 2rem;
         font-size: 0.95rem;
    }
</style>

<!-- 
  This wrapper creates the full-screen modal effect. 
  The header will be behind this, and the auth-container will be centered within it.
-->
<div class="auth-page-wrapper">
  <main class="auth-container hidden" id="auth-form-container">
    <a id="closeBtn" href="{{ '/' | relative_url }}" class="close-btn" aria-label="Close">&times;</a>
    <div id="stepSignUp1" class="auth-step active">
        <h1>Create your account</h1>
        <p>Enter your email to get started.</p>
        <form id="emailForm">
            <div id="emailError" class="error-message"></div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" id="email" required>
            </div>
            <button type="submit" class="btn-primary">Continue</button>
        </form>
        <div class="divider">OR</div>
        <button id="googleSignInSignUp" class="btn-google">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon">
            Continue with Google
        </button>
        <div class="auth-toggle-link">
            Already have an account? <a id="goToSignIn">Sign In</a>
        </div>
    </div>

    <div id="stepSignUp2" class="auth-step">
        <h1>Complete your profile</h1>
        <p>Just a few more details to create your account.</p>
        <form id="registerForm">
            <div id="registerError" class="error-message"></div>
            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" id="fullName" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <div class="password-wrapper">
                    <input type="password" id="password" required>
                    <i class="fas fa-eye-slash toggle-password"></i>
                </div>
            </div>
            <ul class="password-reqs">
                <li id="req-length"><i class="far fa-check-circle"></i> At least 8 characters</li>
                <li id="req-number"><i class="far fa-check-circle"></i> Contains a number</li>
                <li id="req-uppercase"><i class="far fa-check-circle"></i> Contains an uppercase letter</li>
            </ul>
            <button type="submit" class="btn-primary" style="margin-top: 1rem;">Create Account</button>
        </form>
        <a href="#" id="backToStep1" class="back-link">Go Back</a>
    </div>

    <div id="stepSignIn" class="auth-step">
        <h1>Sign in to your account</h1>
        <p>Welcome back! Please enter your details.</p>
        <form id="signInForm">
            <div id="signInError" class="error-message"></div>
            <div class="form-group">
                <label for="signInEmail">Email address</label>
                <input type="email" id="signInEmail" required>
            </div>
            <div class="form-group">
                <label for="signInPassword">Password</label>
                <div class="password-wrapper">
                    <input type="password" id="signInPassword" required>
                    <i class="fas fa-eye-slash toggle-password"></i>
                </div>
            </div>
            <button type="submit" class="btn-primary">Sign In</button>
        </form>
        <div class="divider">OR</div>
        <button id="googleSignIn" class="btn-google">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon">
            Sign in with Google
        </button>
        <div class="auth-toggle-link">
            Don't have an account? <a id="goToSignUp">Sign Up</a>
        </div>
    </div>
  </main>
</div>

<!-- Add the Supabase JS library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Add Firebase and Font Awesome for icons -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>

<script>
    // --- SUPABASE CONFIGURATION ---
    const SUPABASE_URL = 'https://yfrqnghduttudqbnodwr.supabase.co'; // Your Supabase Project URL
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    document.addEventListener('DOMContentLoaded', () => {
        const basePath = document.body.getAttribute('data-base-path') || '';
        const authFormContainer = document.getElementById('auth-form-container');

        // --- HELPER FUNCTION: Cache user and redirect after login ---
        function handleSuccessfulLogin(supabaseUser) {
            const userToCache = { 
                uid: supabaseUser.id, 
                displayName: supabaseUser.user_metadata?.full_name, 
                email: supabaseUser.email, 
                photoURL: supabaseUser.user_metadata?.avatar_url 
            };
            localStorage.setItem('cachedUser', JSON.stringify(userToCache));
            // Use location.replace() to prevent the login page from being added to the browser history.
            // This allows the user to click "back" once on the profile page to return to where they were.
            window.location.replace(`${basePath}/profile.html`);
        }

        // --- AUTH GUARD ---
        // If a user is already logged in, redirect them to their profile.
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                window.location.href = `${basePath}/profile.html`;
            }
        });

        authFormContainer.classList.remove('hidden');
        initializeAuthForm();

        function initializeAuthForm() {
            const stepSignUp1 = document.getElementById('stepSignUp1'), stepSignUp2 = document.getElementById('stepSignUp2'), stepSignIn = document.getElementById('stepSignIn');
            const emailForm = document.getElementById('emailForm'), registerForm = document.getElementById('registerForm'), signInForm = document.getElementById('signInForm');
            const emailInput = document.getElementById('email'), passwordInput = document.getElementById('password'), fullNameInput = document.getElementById('fullName');
            const signInEmailInput = document.getElementById('signInEmail'), signInPasswordInput = document.getElementById('signInPassword');
            const backToStep1Link = document.getElementById('backToStep1'), goToSignInLink = document.getElementById('goToSignIn'), goToSignUpLink = document.getElementById('goToSignUp');
            const googleSignInSignUpBtn = document.getElementById('googleSignInSignUp'), googleSignInBtn = document.getElementById('googleSignIn');
            const togglePasswordIcons = document.querySelectorAll('.toggle-password');
            const emailError = document.getElementById('emailError'), registerError = document.getElementById('registerError'), signInError = document.getElementById('signInError');
            const reqLength = document.getElementById('req-length'), reqNumber = document.getElementById('req-number'), reqUppercase = document.getElementById('req-uppercase');
            let userEmail = '';

            function showStep(stepElement) {
                document.querySelectorAll('.auth-step').forEach(step => step.classList.remove('active'));
                stepElement.classList.add('active');
            }

            goToSignInLink.addEventListener('click', e => { e.preventDefault(); showStep(stepSignIn); });
            goToSignUpLink.addEventListener('click', e => { e.preventDefault(); showStep(stepSignUp1); });
            backToStep1Link.addEventListener('click', e => { e.preventDefault(); showStep(stepSignUp1); registerError.textContent = ''; });

            emailForm.addEventListener('submit', e => {
                e.preventDefault();
                userEmail = emailInput.value;
                showStep(stepSignUp2);
            });

            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = passwordInput.value;
                const fullName = fullNameInput.value;
                registerError.textContent = '';

                const { data, error } = await supabase.auth.signUp({
                    email: userEmail,
                    password: password,
                    options: {
                        data: { full_name: fullName }
                    }
                });

                if (error) {
                    registerError.textContent = error.message;
                } else if (data.session) {
                    // If a session exists, confirmation is off or already done. Log them in.
                    handleSuccessfulLogin(data.session.user);
                } else if (data.user) {
                    // If only a user object exists, they need to confirm their email.
                    // Show a success message instead of redirecting.
                    showStep(stepSignUp1); // Go back to the first step
                    emailInput.value = ''; // Clear the input
                    emailError.textContent = 'Success! Please check your email for a confirmation link.';
                    emailError.style.color = '#42b72a'; // Make it green
                }
            });

            signInForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = signInEmailInput.value;
                const password = signInPasswordInput.value;
                signInError.textContent = '';

                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    signInError.textContent = error.message;
                } else if (data.user) {
                    handleSuccessfulLogin(data.user);
                }
            });

            const handleGoogleSignIn = async () => {
                const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                });
                if (error) {
                    signInError.textContent = error.message;
                    emailError.textContent = error.message;
                }
            };
            googleSignInSignUpBtn.addEventListener('click', handleGoogleSignIn);
            googleSignInBtn.addEventListener('click', handleGoogleSignIn);
            
            // CRITICAL FIX: Use event delegation for password toggle icons.
            // Font Awesome's JS can replace <i> tags with <svg>, causing direct listeners to break.
            // Attaching to a parent and checking the target ensures the listener always works.
            authFormContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('toggle-password')) {
                    const icon = e.target;
                    // The password input is the previous sibling of the icon
                    const passwordField = icon.previousElementSibling;

                    if (passwordField && (passwordField.id === 'password' || passwordField.id === 'signInPassword')) {
                        const isPassword = passwordField.type === 'password';
                        passwordField.type = isPassword ? 'text' : 'password';
                        icon.classList.toggle('fa-eye');
                        icon.classList.toggle('fa-eye-slash');
                    } else {
                        console.warn("Password toggle icon clicked, but associated input field not found or is not a password field.");
                    }
                }
            });
            
            passwordInput.addEventListener('input', () => {
                const value = passwordInput.value;
                reqLength.classList.toggle('valid', value.length >= 8);
                reqNumber.classList.toggle('valid', /\d/.test(value));
                reqUppercase.classList.toggle('valid', /[A-Z]/.test(value));
            });
        }
    });
</script>