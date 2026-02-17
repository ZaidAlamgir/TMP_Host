---
layout: standalone
title: Account - The Muslim Post
permalink: /auth.html
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

    /* --- ADDED: Loader Animation --- */
    .btn-google .loader {
      display: none; /* Hide by default */
      width: 20px;
      height: 20px;
      border: 3px solid #f3f3f3; /* Light grey circle */
      border-top: 3px solid #0073e6; /* Blue spinner part */
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0;
    }
    
    /* Show loader and hide content when 'loading' class is present */
    .btn-google.loading .loader {
      display: inline-block;
    }
    .btn-google.loading span,
    .btn-google.loading img {
      display: none;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    /* --- END: Loader Animation --- */
</style>

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
            <span>Continue with Google</span>
            <div class="loader"></div>
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
            <span>Sign in with Google</span>
            <div class="loader"></div>
        </button>
        <div class="auth-toggle-link">
            Don't have an account? <a id="goToSignUp">Sign Up</a>
        </div>
    </div>
  </main>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>

<script>
{ // Block Scope Start

    const SUPABASE_URL = 'https://yfrqnghduttudqbnodwr.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU';

    function initAuth() {
        if (typeof window.supabase === 'undefined') {
            setTimeout(initAuth, 100);
            return;
        }

        // Singleton Client Logic
        let supabase;
        if (typeof window.getSupabaseClient === 'function') {
            supabase = window.getSupabaseClient();
        } else {
            if (!window._sharedSupabaseClient) {
                window._sharedSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            }
            supabase = window._sharedSupabaseClient;
        }

        const authFormContainer = document.getElementById('auth-form-container');
        if (!authFormContainer) return;

        authFormContainer.classList.remove('hidden');

        // Check if user is already logged in
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                if (window.AndroidInterface) {
                    syncToAndroid(session);
                } else {
                    window.location.replace("{{ '/profile/' | relative_url }}"); 
                }
            }
        });

        setupFormListeners(supabase);
    }

    function setupFormListeners(supabase) {
        const stepSignUp1 = document.getElementById('stepSignUp1');
        const stepSignUp2 = document.getElementById('stepSignUp2');
        const stepSignIn = document.getElementById('stepSignIn');
        
        const signInError = document.getElementById('signInError');
        const registerError = document.getElementById('registerError');
        const emailError = document.getElementById('emailError');

        function showStep(stepElement) {
            document.querySelectorAll('.auth-step').forEach(step => step.classList.remove('active'));
            stepElement.classList.add('active');
        }

        // --- STRICT EVENT LISTENERS TO PREVENT WEBVIEW REFRESH ---

        // 1. Sign In Form
        const signInForm = document.getElementById('signInForm');
        if (signInForm) {
            signInForm.addEventListener('submit', async (e) => {
                e.preventDefault(); // STOPS ANDROID PAGE REFRESH
                const email = document.getElementById('signInEmail').value.trim();
                const password = document.getElementById('signInPassword').value;
                const btn = signInForm.querySelector('.btn-primary');
                
                if (signInError) signInError.textContent = '';
                if (btn) { btn.disabled = true; btn.textContent = 'Signing In...'; }

                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    if (signInError) signInError.textContent = error.message;
                    if (btn) { btn.disabled = false; btn.textContent = 'Sign In'; }
                } else if (data.session) {
                    handleSuccessfulLogin(data.session);
                }
            });
        }

        // 2. Email Verification (Step 1)
        const emailForm = document.getElementById('emailForm');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                window.userEmail = document.getElementById('email').value.trim();
                showStep(stepSignUp2);
            });
        }

        // 3. Register Form (Step 2)
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = document.getElementById('password').value;
                const fullName = document.getElementById('fullName').value.trim();
                const btn = registerForm.querySelector('.btn-primary');

                if (registerError) registerError.textContent = '';
                if (btn) { btn.disabled = true; btn.textContent = 'Creating Account...'; }

                const { data, error } = await supabase.auth.signUp({
                    email: window.userEmail,
                    password: password,
                    options: { data: { full_name: fullName } }
                });

                if (error) {
                    if (registerError) registerError.textContent = error.message;
                    if (btn) { btn.disabled = false; btn.textContent = 'Create Account'; }
                } else if (data.session) {
                    handleSuccessfulLogin(data.session);
                } else if (data.user) {
                    showStep(stepSignUp1);
                    if (emailError) {
                        emailError.textContent = 'Success! Please check your email for a confirmation link.';
                        emailError.style.color = '#42b72a';
                    }
                }
            });
        }

        // Navigation Linking
        document.getElementById('goToSignIn')?.addEventListener('click', (e) => { e.preventDefault(); showStep(stepSignIn); });
        document.getElementById('goToSignUp')?.addEventListener('click', (e) => { e.preventDefault(); showStep(stepSignUp1); });
        document.getElementById('backToStep1')?.addEventListener('click', (e) => { e.preventDefault(); showStep(stepSignUp1); if(registerError) registerError.textContent=''; });

        // --- GOOGLE SIGN IN ---
        const handleGoogleSignIn = async () => {
            const googleBtn1 = document.getElementById('googleSignInSignUp');
            const googleBtn2 = document.getElementById('googleSignIn');
            
            if (googleBtn1) { googleBtn1.disabled = true; googleBtn1.classList.add('loading'); }
            if (googleBtn2) { googleBtn2.disabled = true; googleBtn2.classList.add('loading'); }
            if (signInError) signInError.textContent = '';
            if (emailError) emailError.textContent = '';
            
            const isInsideApp = (window.AndroidInterface && typeof window.AndroidInterface.share === 'function');
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            
            let redirectUrl;
            if (isInsideApp) {
                redirectUrl = 'tmpnews://auth/callback';
            } else if (isLocalhost) {
                redirectUrl = `${window.location.origin}/callback.html`;
            } else {
                redirectUrl = 'https://www.tmpnews.com/callback.html';
            }

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { 
                    redirectTo: redirectUrl,
                    skipBrowserRedirect: false 
                }
            });
            
            if (error) {
                const activeErrorEl = document.getElementById('stepSignIn').classList.contains('active') ? signInError : emailError;
                if(activeErrorEl) activeErrorEl.textContent = error.message;
                if (googleBtn1) { googleBtn1.disabled = false; googleBtn1.classList.remove('loading'); }
                if (googleBtn2) { googleBtn2.disabled = false; googleBtn2.classList.remove('loading'); }
            }
        };

        document.getElementById('googleSignInSignUp')?.addEventListener('click', handleGoogleSignIn);
        document.getElementById('googleSignIn')?.addEventListener('click', handleGoogleSignIn);

        // Password Toggle Logic
        document.getElementById('auth-form-container')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-password')) {
                const icon = e.target;
                const passwordField = icon.previousElementSibling;
                if (passwordField) {
                    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                    icon.classList.toggle('fa-eye');
                    icon.classList.toggle('fa-eye-slash');
                }
            }
        });

        // Password Validation Logic
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                const value = passwordInput.value;
                document.getElementById('req-length')?.classList.toggle('valid', value.length >= 8);
                document.getElementById('req-number')?.classList.toggle('valid', /\d/.test(value));
                document.getElementById('req-uppercase')?.classList.toggle('valid', /[A-Z]/.test(value));
            });
        }
    }

    // --- CRITICAL APP BRIDGE LOGIC ---
    function handleSuccessfulLogin(session) {
        const userToCache = { 
            uid: session.user.id, 
            displayName: session.user.user_metadata?.full_name, 
            email: session.user.email, 
            photoURL: session.user.user_metadata?.avatar_url 
        };
        localStorage.setItem('cachedUser', JSON.stringify(userToCache));

        // Detect if loaded inside your Android WebView
        if (window.AndroidInterface) {
            syncToAndroid(session);
        } else {
            window.location.replace("{{ '/profile/' | relative_url }}");
        }
    }

    function syncToAndroid(session) {
        try {
            const role = session.user.user_metadata?.role || 'user';
            const metadataJson = JSON.stringify(session.user.user_metadata || {});
            
            // Pass the token to MainActivity securely
            window.AndroidInterface.updateSupabaseSession(
                session.access_token || "", 
                session.user.id || "", 
                session.user.email || "", 
                role, 
                metadataJson
            );
            
            // Close webview and show Profile Fragment natively
            window.AndroidInterface.openNativeProfile();
        } catch(e) {
            console.error("Failed to sync to Android App:", e);
            // Fallback just in case the bridge fails
            window.location.replace("{{ '/profile/' | relative_url }}");
        }
    }

    // Trigger Init Safely
    if (document.readyState === 'loading') {
        document.addEventListener('turbo:load', initAuth, { once: true });
        document.addEventListener('DOMContentLoaded', initAuth, { once: true });
    } else {
        initAuth();
    }
} // Block Scope End
</script>