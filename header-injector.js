// A single, smart script that injects the correct header based on the current page.

// --- RENDER FUNCTION 1: For the Jekyll-powered Writer Pages ---
function renderWriterHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    // Self-contained HTML and CSS for the writer-specific header
    const writerHeaderHTML = `
        <style>
            /* --- Main Header Styles --- */
            .header { background-color: #ffffff; padding: 0 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 1000; }
            .header-content { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; height: 60px; }
            .header-left, .header-right { display: flex; align-items: center; }
            .header-center { position: absolute; left: 50%; transform: translateX(-50%); }
            .logo { font-size: 1.6rem; font-weight: bold; color: #1c1e21; text-decoration: none; }
            /* --- Hamburger Menu Styles --- */
            .hamburger { background: none; border: none; font-size: 28px; cursor: pointer; color: black; z-index: 1001; padding: 0 15px; }
            .nav-links { position: fixed; top: 60px; left: 0; width: 100%; height: calc(100% - 60px); background: white; list-style: none; padding: 0; margin: 0; display: none; flex-direction: column; align-items: flex-start; }
            .nav-links li { width: 100%; border-bottom: 1px solid #eee; }
            .nav-links a { display: block; width: 100%; padding: 18px 25px; color: black; font-size: 20px; text-decoration: none; }
            .nav-links.active { display: flex; }
            .hamburger.active { font-size: 32px; }
            /* --- Writer Login Icon Styles --- */
            .writer-login-icon { cursor: pointer; display: inline-block; }
            .writer-login-icon svg { stroke: black; transition: stroke 0.3s ease; width: 30px; height: 30px; }
            .writer-login-icon:hover svg { stroke: #007bff; }
        </style>
        <header class="header">
            <div class="header-content">
                <div class.header-left">
                    <nav class="navbar">
                        <button class="hamburger" id="hamburger-btn">&#9776;</button>
                        <ul id="nav-menu" class="nav-links">
                            <li><a href="/TMP_Host/">Home</a></li>
                            <li><a href="/TMP_Host/news-hub.html">News Hub</a></li>
                            <li><a href="/TMP_Host/latest.html">Latest</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="header-center">
                    <a href="/TMP_Host/" class="logo">The Muslim Post</a>
                </div>
                <div class="header-right">
                    <div class="user-actions">
                        <a id="writer-login-btn" class="writer-login-icon" title="Writer Login">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    `;
    headerPlaceholder.innerHTML = writerHeaderHTML;

    // Attach event listeners for this header
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
        hamburgerBtn.innerHTML = hamburgerBtn.classList.contains('active') ? '&times;' : '&#9776;';
    });

    const writerLoginBtn = document.getElementById('writer-login-btn');
    writerLoginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const proceed = confirm("ADMIN NOTICE: This login is for authorized writers only. Press OK to continue.");
        if (proceed) {
            window.location.href = '/TMP_Host/cms.html';
        }
    });
}

// --- HELPER FUNCTION for Firebase Header: Generates a unique color for a user's initial ---
function generateColorForUser(userId) {
    const colors = [
        '#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab',
        '#1e88e5', '#039be5', '#00acc1', '#00897b', '#43a047',
        '#7cb342', '#c0ca33', '#ffb300', '#fb8c00', '#f4511e', 
        '#6d4c41', '#757575', '#546e7a'
    ];
    let hash = 0;
    if (!userId || userId.length === 0) return colors[0];
    for (let i = 0; i < userId.length; i++) {
        const char = userId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
}

// --- RENDER FUNCTION 2: For the Public-Facing Firebase Pages ---
function renderFirebaseHeader(user) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const isUserLoggedIn = !!user;
    let mainIconLink;

    if (isUserLoggedIn) {
        mainIconLink = 'profile.html';
    } else {
        const currentPage = window.location.pathname.split("/").pop();
        mainIconLink = `auth.html?redirectUrl=${encodeURIComponent(currentPage || 'home.html')}`;
    }

    const firebaseHeaderHTML = `
        <div class="header-content">
            <div class="header-left">
                <nav class="navbar">
                    <button class="hamburger" id="hamburger-btn">&#9776;</button>
                    <ul id="nav-menu" class="nav-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="news-hub.html">Articles</a></li>
                        <li><a href="about.html">About</a></li>
                    </ul>
                </nav>
            </div>
            <div class="header-center">
                <a href="index.html" class="logo">The Muslim Post</a>
            </div>
            <div class="header-right">
                <div class="user-actions">
                    <a href="${mainIconLink}" class="user-icon-link">
                        <div id="login-icon-svg" style="display: ${isUserLoggedIn ? 'none' : 'block'};">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M6 18c0-3 6-3 6-3s6 0 6 3"></path>
                            </svg>
                        </div>
                        <div id="profile-pic-container" style="display: ${isUserLoggedIn ? 'block' : 'none'};">
                            <img id="profile-pic-img" src="${user?.photoURL || ''}" alt="Profile" style="display: ${user?.photoURL ? 'block' : 'none'};">
                            <div id="profile-initial-circle" style="display: ${isUserLoggedIn && !user?.photoURL ? 'flex' : 'none'};"></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `;

    headerPlaceholder.className = 'header';
    headerPlaceholder.innerHTML = firebaseHeaderHTML;

    // Attach hamburger listener
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
        hamburgerBtn.innerHTML = hamburgerBtn.classList.contains('active') ? '&times;' : '&#9776;';
    });

    // If logged in without a photo, set the initial icon
    if (isUserLoggedIn && !user.photoURL) {
        const profileInitialCircle = document.getElementById('profile-initial-circle');
        const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
        profileInitialCircle.textContent = initial;
        profileInitialCircle.style.backgroundColor = generateColorForUser(user.uid);
    }
}

// --- MAIN FIREBASE INITIALIZATION FUNCTION ---
async function initializeInstantHeader() {
    const CACHED_USER_KEY = 'cachedUser';
    let cachedUser = null;

    // 1. OPTIMISTIC RENDER: Try to get user from localStorage for an instant UI update.
    try {
        const cachedData = localStorage.getItem(CACHED_USER_KEY);
        if (cachedData) {
            cachedUser = JSON.parse(cachedData);
        }
    } catch (error) {
        console.error("Failed to parse cached user:", error);
        localStorage.removeItem(CACHED_USER_KEY);
    }
    
    // Render the header immediately with whatever we found in the cache (user or null).
    renderFirebaseHeader(cachedUser);

    // 2. BACKGROUND VERIFICATION: Now, check with Firebase for the true auth state.
    try {
        // authReady is a promise from firebase-init.js
        const firebaseUser = await authReady; 

        // 3. RECONCILE AND CACHE: Update the UI and cache if the state has changed.
        if (firebaseUser) {
            const userToCache = {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL
            };
            
            if (JSON.stringify(userToCache) !== JSON.stringify(cachedUser)) {
                renderFirebaseHeader(userToCache);
            }
            
            localStorage.setItem(CACHED_USER_KEY, JSON.stringify(userToCache));
        } else {
            if (cachedUser) {
                renderFirebaseHeader(null);
            }
            localStorage.removeItem(CACHED_USER_KEY);
        }
    } catch (error) {
        console.error("Could not verify auth state with Firebase:", error);
    }
}

// --- MAIN EXECUTION: The "Traffic Controller" ---
document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;

    // Check if the current page is one of the Jekyll-powered pages
    if (pathname.endsWith('/news-hub.html') || pathname.endsWith('/latest.html') || pathname.endsWith('/TMP_Host/news-hub.html') || pathname.endsWith('/TMP_Host/latest.html')) {
        // If yes, render the simple writer header
        renderWriterHeader();
    } else {
        // If no, run the full Firebase authentication and header rendering process
        initializeInstantHeader();
    }
});

