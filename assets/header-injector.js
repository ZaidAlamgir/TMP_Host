// A single, smart script that injects the correct header based on the current page.
// This is the final version with all features, caching, correct paths, and dropdown menu.

// --- Helper function to generate a unique color for a user's initial ---
function generateColorForUser(userId) {
    const colors = ['#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab', '#1e88e5', '#039be5', '#00acc1', '#00897b', '#43a047', '#7cb342', '#c0ca33', '#ffb300', '#fb8c00', '#f4511e', '#6d4c41', '#757575', '#546e7a'];
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

// --- List of Categories for Dropdown ---
// Matches the tags used in index.md and cms.html
const categories = [
    { name: "World Politics", tag: "world-politics" },
    { name: "Indian Politics", tag: "indian-politics" },
    { name: "Muslim World", tag: "muslim-world" },
    { name: "Technology", tag: "technology" },
    { name: "Medical Science", tag: "medical-science" },
    { name: "Global Economy", tag: "global-economy" },
    { name: "Art & Culture", tag: "art-culture" },
    { name: "Weather", tag: "weather" },
    { name: "Sports", tag: "sports" },
    { name: "National News", tag: "national-news" },
    { name: "International News", tag: "international-news" }
];

// --- Function to Generate Category Dropdown HTML ---
function generateCategoryDropdownHTML(base_path) {
    let dropdownHTML = `<ul class="categories-dropdown">`;
    dropdownHTML += `<li><a href="${base_path}/news-hub.html">All Categories</a></li>`; // Add "All" option
    categories.forEach(cat => {
        dropdownHTML += `<li><a href="${base_path}/news-hub.html?tag=${cat.tag}">${cat.name}</a></li>`;
    });
    dropdownHTML += `</ul>`;
    return dropdownHTML;
}

// --- RENDER FUNCTION 1: For Jekyll Pages (Writer Login) ---
function renderWriterHeader(base_path) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const categoryDropdown = generateCategoryDropdownHTML(base_path);

    // *** MODIFIED HTML STRUCTURE FOR MENU OVERLAY ***
    const writerHeaderHTML = `
        <header class="header">
            <div class="header-content">
                <div class="header-left">
                    <button class="index-menu-button" id="index-menu-btn" title="Open Menu">
                        <svg id="index-open-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        <svg id="index-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="header-center">
                    <a href="${base_path}/" class="logo">
                         <svg class="vector-animation" width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
                             <defs><filter id="glow"><feGaussianBlur stdDeviation="3.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                            <rect x="50" y="50" width="100" height="100" fill="#3498db" class="square"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="tmp-text">TMP</text>
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#3498db" stroke-width="2" class="rotating-circle"/>
                        </svg>
                        <span class="logo-text">The Muslim Post</span>
                    </a>
                </div>
                <div class="header-right">
                    <a id="writer-login-btn" class="user-icon-link" href="#" title="Writer Login">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </a>
                </div>
            </div>
        </header>
        <div class="index-menu-overlay" id="index-menu-overlay">
            <div class="index-menu-content">
                <div class="search-box-container">
                     <input type="text" id="index-search-box" class="index-search-box" placeholder="Search by tags to find articles">
                     <span class="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                     </span>
                </div>
                <div class="index-main-nav">
                    <a href="${base_path}/" class="home-link-with-logo">
                        <span>Home</span>
                        <svg class="menu-home-logo" viewBox="0 0 200 200" aria-hidden="true">
                            <rect x="50" y="50" width="100" height="100" fill="#3498db" class="square"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="tmp-text">TMP</text>
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#3498db" stroke-width="4" class="rotating-circle"/>
                        </svg>
                    </a>
                    <div class="nav-item-dropdown"> <span class="dropdown-toggle">Articles</span>
                        ${categoryDropdown}
                    </div>
                    <a href="${base_path}/about.html">About</a>
                    <a href="${base_path}/terms.html">Terms & Conditions</a>
                </div>
                <ul id="index-results-list"></ul>
            </div>
        </div>
    `;
    headerPlaceholder.innerHTML = writerHeaderHTML;

    const writerLoginBtn = document.getElementById('writer-login-btn');
    writerLoginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm("ADMIN NOTICE: This login is for authorized writers only. Press OK to continue.")) {
            window.location.href = `${base_path}/cms.html`;
        }
    });

    // Attach menu logic AFTER injecting HTML
    attachMenuLogic(base_path);
}

// --- RENDER FUNCTION 2: For Public-Facing Supabase Pages ---
function renderSupabaseHeader(user, base_path) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    const isUserLoggedIn = !!user;

    const mainIconLink = isUserLoggedIn ? `${base_path}/profile.html` : `${base_path}/auth.html`;
    const categoryDropdown = generateCategoryDropdownHTML(base_path);

    // *** MODIFIED HTML STRUCTURE FOR MENU OVERLAY ***
    const supabaseHeaderHTML = `
        <header class="header">
            <div class="header-content">
                <div class="header-left">
                    <button class="index-menu-button" id="index-menu-btn" title="Open Index">
                         <svg id="index-open-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                        <svg id="index-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="header-center">
                    <a href="${base_path}/" class="logo">
                        <svg class="vector-animation" width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
                            <defs><filter id="glow"><feGaussianBlur stdDeviation="3.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                            <rect x="50" y="50" width="100" height="100" fill="#3498db" class="square"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="tmp-text">TMP</text>
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#3498db" stroke-width="2" class="rotating-circle"/>
                        </svg>
                        <span class="logo-text">The Muslim Post</span>
                    </a>
                </div>
                <div class="header-right">
                    <a href="${mainIconLink}" class="user-icon-link">
                        <div id="login-icon-svg" style="display: ${isUserLoggedIn ? 'none' : 'block'};">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M6 18c0-3 6-3 6-3s6 0 6 3"></path></svg>
                        </div>
                        <div id="profile-pic-container" style="display: ${isUserLoggedIn ? 'flex' : 'none'};">
                            <img id="profile-pic-img" src="${user?.photoURL || ''}" alt="Profile" style="display: ${user?.photoURL ? 'block' : 'none'}; width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
                            <div id="profile-initial-circle" style="display: ${isUserLoggedIn && !user?.photoURL ? 'flex' : 'none'}; width: 30px; height: 30px; border-radius: 50%; justify-content: center; align-items: center; font-size: 1rem; font-weight: bold; color: white;"></div>
                        </div>
                    </a>
                </div>
            </div>
        </header>
        <div class="index-menu-overlay" id="index-menu-overlay">
            <div class="index-menu-content">
                 <div class="search-box-container">
                     <input type="text" id="index-search-box" class="index-search-box" placeholder="Search by tags to find articles">
                     <span class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
                </div>
                <div class="index-main-nav">
                    <a href="${base_path}/" class="home-link-with-logo">
                         <span>Home</span>
                         <svg class="menu-home-logo" viewBox="0 0 200 200" aria-hidden="true">
                            <rect x="50" y="50" width="100" height="100" fill="#3498db" class="square"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="tmp-text">TMP</text>
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#3498db" stroke-width="4" class="rotating-circle"/>
                        </svg>
                    </a>
                    <div class="nav-item-dropdown"> <span class="dropdown-toggle">Articles</span>
                        ${categoryDropdown}
                    </div>
                    <a href="${base_path}/about.html">About</a>
                    <a href="${base_path}/terms.html">Terms & Conditions</a>
                </div>
                <ul id="index-results-list"></ul>
            </div>
        </div>
    `;

    headerPlaceholder.innerHTML = supabaseHeaderHTML;

    // Attach menu logic AFTER injecting HTML
    attachMenuLogic(base_path);

    if (isUserLoggedIn && !user.photoURL) {
        const profileInitialCircle = document.getElementById('profile-initial-circle');
        if (profileInitialCircle) { // Check if element exists before modifying
            const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
            profileInitialCircle.textContent = initial;
            profileInitialCircle.style.backgroundColor = generateColorForUser(user.uid);
        }
    }
}


// --- Centralized Menu Logic Function ---
function attachMenuLogic(base_path) {
    const indexMenuBtn = document.getElementById('index-menu-btn');
    const indexMenuOverlay = document.getElementById('index-menu-overlay');
    const searchBox = document.getElementById('index-search-box');
    const resultsList = document.getElementById('index-results-list');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContainer = document.querySelector('.nav-item-dropdown');
    let allPosts = []; // Cache for search

    async function getPostData() {
        if (allPosts.length === 0) {
            try {
                const response = await fetch(`${base_path}/search.json`);
                if (!response.ok) throw new Error('Search data not found.');
                allPosts = await response.json();
            } catch (error) { console.error("Could not load search data:", error); }
        }
        return allPosts;
    }

    function renderPosts(posts) {
        if (!resultsList) return;
        resultsList.innerHTML = '';
        if (posts.length === 0) {
            resultsList.innerHTML = '<li><a href="#">No results found.</a></li>';
            return;
        }
        // Limit results displayed initially
        posts.slice(0, 10).forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${base_path}${post.url}">${post.title}</a>`;
            resultsList.appendChild(listItem);
        });
    }

    function openMenu() {
        getPostData().then(posts => renderPosts(posts.slice(0, 5))); // Show initial results on open
        if(searchBox) searchBox.value = ''; // Clear search on open
        if(indexMenuBtn) indexMenuBtn.classList.add('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.add('active');
    }

    function closeMenu() {
        if(indexMenuBtn) indexMenuBtn.classList.remove('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.remove('active');
        // Close dropdown when closing main menu
        if (dropdownContainer) dropdownContainer.classList.remove('open');
    }

    // Main Menu Toggle
    if (indexMenuBtn) {
        indexMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent overlay click listener
            indexMenuBtn.classList.contains('active') ? closeMenu() : openMenu();
        });
    }

    // Close menu by clicking overlay
    if (indexMenuOverlay) {
        indexMenuOverlay.addEventListener('click', (e) => {
             // Close only if clicking the overlay itself, not content inside
             if (e.target === indexMenuOverlay) {
                closeMenu();
             }
        });
    }

    // Search Box Logic
    if (searchBox) {
        searchBox.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase().trim();
            const posts = await getPostData();
            // More robust filtering: check title and tags
            const filteredPosts = query.length < 2
                ? posts.slice(0, 5) // Show recent if query is short
                : posts.filter(post =>
                    post.title.toLowerCase().includes(query) ||
                    post.tags.toLowerCase().includes(query)
                );
            renderPosts(filteredPosts); // Render filtered results
        });
    }

    // Articles Dropdown Toggle
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing main menu
            dropdownContainer.classList.toggle('open');
        });
    }

     // Close main menu when a category link is clicked
    const categoryLinks = document.querySelectorAll('.categories-dropdown li a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', () => {
             closeMenu();
             // Allow default link behavior to navigate
        });
    });

}


// --- Supabase Header Initialization (Handles Caching & Auth State) ---
function initializeSupabaseHeader(base_path, forceRerender = false) {
    const basePath = base_path;
    const CACHED_USER_KEY = 'cachedUser';

    let cachedUser = null;
    try {
        const cachedData = localStorage.getItem(CACHED_USER_KEY);
        if (cachedData) {
            cachedUser = JSON.parse(cachedData);
        }
    } catch (error) {
        console.error("Failed to parse cached user:", error);
        localStorage.removeItem(CACHED_USER_KEY);
    }

    // Initial render with cached user (or null if none)
    renderSupabaseHeader(cachedUser, basePath);

    // Initialize Supabase client if available
    const supabaseInstance = window.supabase?.createClient('https://yfrqnghduttudqbnodwr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU');

    if (supabaseInstance) {
        // Listen for authentication changes
        supabaseInstance.auth.onAuthStateChange((event, session) => {
            const user = session?.user;
            let userChanged = false;

            if (user) {
                // User is logged in or state changed to logged in
                const userToCache = {
                    uid: user.id,
                    displayName: user.user_metadata?.full_name,
                    email: user.email,
                    photoURL: user.user_metadata?.avatar_url
                };
                 // Check if user data actually changed or if it's the initial load
                if (forceRerender || !cachedUser || JSON.stringify(userToCache) !== localStorage.getItem(CACHED_USER_KEY)) {
                    renderSupabaseHeader(userToCache, basePath); // Re-render header with user info
                    localStorage.setItem(CACHED_USER_KEY, JSON.stringify(userToCache));
                    cachedUser = userToCache; // Update local variable
                    userChanged = true;
                }
            } else {
                // User is logged out or state changed to logged out
                if (cachedUser || forceRerender) { // Only re-render if there was a user before
                    renderSupabaseHeader(null, basePath); // Re-render header in logged-out state
                    localStorage.removeItem(CACHED_USER_KEY);
                    cachedUser = null; // Update local variable
                    userChanged = true;
                }
            }
             // console.log("Auth state changed:", event, "User changed:", userChanged); // Debug log
        });
    } else {
        console.warn("Supabase client not found. Header auth state might be inaccurate.");
    }
}


// --- Main Execution Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;
    const base_path = document.body.getAttribute('data-base-path') || '';

    // Define pages where header injection should be skipped
    const skipHeaderPages = [
        '/auth.html',
        '/auth-callback.html',
        '/callback.html',
        '/profile.html' // Profile page handles its own auth state rendering
    ];

    if (skipHeaderPages.some(page => pathname.includes(page))) {
        return; // Don't inject header on these pages
    }

    // Determine if it's a writer CMS page
    const isWriterPage = pathname.includes('/cms.html') || pathname.includes('/liveCMS.html');

    if (isWriterPage) {
        renderWriterHeader(base_path);
    } else {
        // Initialize Supabase header for all other public pages
        initializeSupabaseHeader(base_path);
    }
});

// Handle browser back/forward navigation potentially using cached pages (bfcache)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) { // Page loaded from bfcache
        const pathname = window.location.pathname;
        const skipHeaderPages = ['/auth.html','/auth-callback.html','/callback.html','/profile.html'];

        if (skipHeaderPages.some(page => pathname.includes(page))) {
            return;
        }

        const base_path = document.body.getAttribute('data-base-path') || '';
        const isWriterPage = pathname.includes('/cms.html') || pathname.includes('/liveCMS.html');

        // Force re-render of the appropriate header on bfcache restore to ensure correct state
        if (isWriterPage) {
             renderWriterHeader(base_path); // Re-attach listeners for writer header
        } else {
             initializeSupabaseHeader(base_path, true); // Force re-render for Supabase header
        }
    }
});