// --- Helper function to generate a unique, consistent color for a user ---
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

/**
 * Renders the header instantly based on a provided user object (or null).
 * This function is now the single source for creating the header's HTML.
 * @param {object|null} user The user object from cache or Firebase.
 */
function renderHeader(user) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const isUserLoggedIn = !!user;
    let mainIconLink;

    if (isUserLoggedIn) {
        mainIconLink = 'profile.html';
    } else {
        const currentPage = window.location.pathname.split("/").pop();
        // Add the current page as a redirectUrl parameter
        mainIconLink = `auth.html?redirectUrl=${encodeURIComponent(currentPage || 'home.html')}`;
    }

    const headerHTML = `
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
    headerPlaceholder.innerHTML = headerHTML;

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

/**
 * Main function to initialize the header with caching.
 */
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
    renderHeader(cachedUser);

    // 2. BACKGROUND VERIFICATION: Now, check with Firebase for the true auth state.
    try {
        // authReady is a promise from firebase-init.js
        const firebaseUser = await authReady; 

        // 3. RECONCILE AND CACHE: Update the UI and cache if the state has changed.
        if (firebaseUser) {
            // User is truly logged in.
            // Create a minimal user object to cache, avoiding large data.
            const userToCache = {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL
            };
            
            // Only re-render if the cached user was incorrect or missing.
            if (JSON.stringify(userToCache) !== JSON.stringify(cachedUser)) {
                renderHeader(userToCache);
            }
            
            // Update the cache with the latest user data.
            localStorage.setItem(CACHED_USER_KEY, JSON.stringify(userToCache));
        } else {
            // User is truly logged out.
            // Only re-render if we incorrectly showed a logged-in user from the cache.
            if (cachedUser) {
                renderHeader(null);
            }
            // Clear the cache.
            localStorage.removeItem(CACHED_USER_KEY);
        }
    } catch (error) {
        console.error("Could not verify auth state with Firebase:", error);
    }
}

// --- MAIN EXECUTION ---
// Run the new initialization process.
initializeInstantHeader();

