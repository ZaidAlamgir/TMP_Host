// =============================================================================
// THE MUSLIM POST — HEADER INJECTOR
// Merged Version: File 1 Visuals + File 2 Path Logic
// =============================================================================

// --- 1. CONSTANTS & PATH CONFIGURATION ---
// This fixes the 404 errors by ensuring links always start from the root domain.
const PATHS = {
    ROOT: '/',
    AUTH: '/auth.html',
    PROFILE: '/profile/', // Ensure this matches your folder structure
    ABOUT: '/about/',
    TERMS: '/terms/',
    CMS: '/cms.html',
    NEWS_HUB: '/news/hub/'
};

// --- 2. HELPER: GENERATE USER COLOR ---
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

// --- 3. CATEGORY DATA ---
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

// --- 4. HELPER: DROPDOWN HTML ---
function generateCategoryDropdownHTML() {
    let dropdownHTML = `<ul class="categories-dropdown">`;
    dropdownHTML += `<li><a href="${PATHS.NEWS_HUB}">All Categories</a></li>`;
    categories.forEach(cat => {
        // Uses absolute path to prevent /news/hub/news/hub/?tag=... errors
        dropdownHTML += `<li><a href="${PATHS.NEWS_HUB}?tag=${cat.tag}">${cat.name}</a></li>`;
    });
    dropdownHTML += `</ul>`;
    return dropdownHTML;
}

// --- 5. RENDER FUNCTION: WRITER (CMS) HEADER ---
function renderWriterHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const categoryDropdown = generateCategoryDropdownHTML();

    // Settings Button Logic
    const isInsideApp = typeof window.AndroidInterface !== 'undefined';
    const settingsMenuItemHTML = isInsideApp ? `
        <a href="#" id="app-settings-menu-item" class="app-settings-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
        </a>
    ` : '';

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
                    <a href="${PATHS.ROOT}" class="logo">
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
                    <a href="${PATHS.ROOT}" class="home-link-with-logo">
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
                    <a href="${PATHS.ABOUT}">About</a>
                    <a href="${PATHS.TERMS}">Terms & Conditions</a>
                    ${settingsMenuItemHTML}
                </div>
                <ul id="index-results-list"></ul>
            </div>
        </div>
    `;
    headerPlaceholder.innerHTML = writerHeaderHTML;

    const writerLoginBtn = document.getElementById('writer-login-btn');
    if (writerLoginBtn) {
        writerLoginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            showCustomConfirm("ADMIN NOTICE: This login is for authorized writers only. Press OK to continue.", () => {
                window.location.href = PATHS.CMS;
            });
        });
    }

    // Attach menu logic
    attachMenuLogic();
}

// --- 6. RENDER FUNCTION: SUPABASE/PUBLIC HEADER ---
function renderSupabaseHeader(user) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    
    const isUserLoggedIn = !!user;
    
    // Use constants for paths to fix 404s
    const mainIconLink = isUserLoggedIn ? PATHS.PROFILE : PATHS.AUTH;
    const categoryDropdown = generateCategoryDropdownHTML();

    // Settings Button Logic
    const isInsideApp = typeof window.AndroidInterface !== 'undefined';
    const settingsMenuItemHTML = isInsideApp ? `
        <a href="#" id="app-settings-menu-item" class="app-settings-link">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
        </a>
    ` : '';

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
                    <a href="${PATHS.ROOT}" class="logo">
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
                    <a href="${PATHS.ROOT}" class="home-link-with-logo">
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
                    <a href="${PATHS.ABOUT}">About</a>
                    <a href="${PATHS.TERMS}">Terms & Conditions</a>
                     ${settingsMenuItemHTML}
                </div>
                <ul id="index-results-list"></ul>
            </div>
        </div>
    `;

    headerPlaceholder.innerHTML = supabaseHeaderHTML;

    attachMenuLogic(); // Attach listeners

    // Profile Picture Logic
    if (isUserLoggedIn && user) {
         const profileInitialCircle = document.getElementById('profile-initial-circle');
         if (profileInitialCircle && !user.photoURL) {
             const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
             profileInitialCircle.textContent = initial;
             profileInitialCircle.style.backgroundColor = generateColorForUser(user.uid || user.id);
             profileInitialCircle.style.display = 'flex';
         }
         
         const profilePicImg = document.getElementById('profile-pic-img');
         if (profilePicImg) {
             profilePicImg.style.display = user.photoURL ? 'block' : 'none';
             if(user.photoURL) profilePicImg.src = user.photoURL;
         }
         
         const profilePicContainer = document.getElementById('profile-pic-container');
         if (profilePicContainer) profilePicContainer.style.display = 'flex';
         const loginIconSvg = document.getElementById('login-icon-svg');
         if (loginIconSvg) loginIconSvg.style.display = 'none';

     } else {
         const loginIconSvg = document.getElementById('login-icon-svg');
         if (loginIconSvg) loginIconSvg.style.display = 'block';
         const profilePicContainer = document.getElementById('profile-pic-container');
         if (profilePicContainer) profilePicContainer.style.display = 'none';
     }
}

// --- 7. MENU LOGIC & SEARCH ---
function attachMenuLogic() {
    const indexMenuBtn = document.getElementById('index-menu-btn');
    const indexMenuOverlay = document.getElementById('index-menu-overlay');
    const searchBox = document.getElementById('index-search-box');
    const resultsList = document.getElementById('index-results-list');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContainer = document.querySelector('.nav-item-dropdown');
    let allPosts = [];

    async function getPostData() {
        if (allPosts.length === 0) {
            try {
                // Use absolute path for search.json to avoid relative path errors
                let searchUrl = `${PATHS.ROOT}search.json`.replace('//', '/'); 
                let response = await fetch(searchUrl);
                if (!response.ok) throw new Error("Status " + response.status);
                allPosts = await response.json();
            } catch (error) { console.error("Search load error:", error); }
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
        posts.slice(0, 10).forEach(post => {
            const listItem = document.createElement('li');
            // Ensure result links are also root-absolute
            let safeUrl = post.url;
            if (!safeUrl.startsWith('/')) safeUrl = '/' + safeUrl;
            
            listItem.innerHTML = `<a href="${safeUrl}">${post.title}</a>`;
            resultsList.appendChild(listItem);
        });
    }

    function openMenu() {
        getPostData().then(posts => renderPosts(posts.slice(0, 5)));
        if(searchBox) searchBox.value = '';
        if(indexMenuBtn) indexMenuBtn.classList.add('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        if(indexMenuBtn) indexMenuBtn.classList.remove('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.remove('active');
        if (dropdownContainer) dropdownContainer.classList.remove('open');
        document.body.classList.remove('menu-open');
    }

    if (indexMenuBtn) {
        indexMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            indexMenuBtn.classList.contains('active') ? closeMenu() : openMenu();
        });
    }

    if (indexMenuOverlay) {
        indexMenuOverlay.addEventListener('click', (e) => {
            if (e.target === indexMenuOverlay) closeMenu();
        });
    }

    if (searchBox) {
        searchBox.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase().trim();
            const posts = await getPostData();
            const filteredPosts = query.length < 2
                ? posts.slice(0, 5)
                : posts.filter(post =>
                    (post.title && post.title.toLowerCase().includes(query)) ||
                    (post.tags && post.tags.toLowerCase().includes(query))
                );
            renderPosts(filteredPosts);
        });
    }

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdownContainer) dropdownContainer.classList.toggle('open');
        });
    }

    const categoryLinks = document.querySelectorAll('.categories-dropdown li a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', () => { closeMenu(); });
    });

    // Android Settings Integration
    const settingsLink = document.getElementById('app-settings-menu-item');
    if (settingsLink && typeof window.AndroidInterface !== 'undefined') {
        settingsLink.addEventListener('click', (event) => {
            event.preventDefault();
            try {
                window.AndroidInterface.openAppSettings();
                closeMenu();
            } catch (e) { console.error("Error calling AndroidInterface:", e); }
        });
    }
}

// --- 8. SUPABASE AUTH INITIALIZATION ---
function initializeSupabaseHeader(forceRerender = false) {
    const CACHED_USER_KEY = 'cachedUser';
    let cachedUser = null;
    try {
        const cachedData = localStorage.getItem(CACHED_USER_KEY);
        if (cachedData) cachedUser = JSON.parse(cachedData);
    } catch (error) { localStorage.removeItem(CACHED_USER_KEY); }

    renderSupabaseHeader(cachedUser);

    const SUPABASE_URL = 'https://yfrqnghduttudqbnodwr.supabase.co'; 
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX7pnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU';
    let supabaseInstance = null;
    
    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabaseInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
    } catch(e) { console.error("Error creating Supabase client:", e); }

    if (supabaseInstance) {
        supabaseInstance.auth.onAuthStateChange((event, session) => {
            const user = session?.user;
            if (user) {
                const userToCache = {
                    uid: user.id,
                    displayName: user.user_metadata?.full_name,
                    email: user.email,
                    photoURL: user.user_metadata?.avatar_url
                };
                const currentStorageCache = localStorage.getItem(CACHED_USER_KEY);
                const needsUpdate = forceRerender || !currentStorageCache || JSON.stringify(userToCache) !== currentStorageCache;

                if (needsUpdate) {
                    renderSupabaseHeader(userToCache);
                    localStorage.setItem(CACHED_USER_KEY, JSON.stringify(userToCache));
                    cachedUser = userToCache;
                }
            } else {
                if (localStorage.getItem(CACHED_USER_KEY) || forceRerender) {
                    renderSupabaseHeader(null);
                    localStorage.removeItem(CACHED_USER_KEY);
                    cachedUser = null;
                }
            }
        });
    }
}

// --- 9. MAIN EXECUTION LOGIC (Path Aware) ---
document.addEventListener('turbo:load', function() {
    initHeaderFlow();
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) { // Back/Forward cache
        initHeaderFlow(true);
    }
});

function initHeaderFlow(forceRerender = false) {
    const pathname = window.location.pathname;
    
    // Pages where header should NOT exist
    const skipHeaderPages = [PATHS.AUTH, '/auth-callback.html', '/callback.html'];

    if (skipHeaderPages.some(page => pathname.endsWith(page))) {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) headerPlaceholder.innerHTML = '';
        return;
    }

    const isWriterPage = pathname.endsWith(PATHS.CMS) || pathname.endsWith('/liveCMS.html');

    if (isWriterPage) {
        renderWriterHeader();
    } else {
        initializeSupabaseHeader(forceRerender);
    }
}

// --- 10. CUSTOM DIALOG ---
function showCustomConfirm(message, onOk) {
    const existingDialog = document.getElementById('custom-confirm-dialog');
    if (existingDialog) existingDialog.remove();
    
    const dialog = document.createElement('div');
    dialog.id = 'custom-confirm-dialog';
    dialog.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 10000;';
    dialog.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); max-width: 90%; text-align: center;">
            <p style="margin-bottom: 20px;">${message}</p>
            <button id="custom-confirm-ok" style="padding: 8px 16px; margin-right: 10px; border: none; background-color: #007bff; color: white; border-radius: 4px; cursor: pointer;">OK</button>
            <button id="custom-confirm-cancel" style="padding: 8px 16px; border: 1px solid #ccc; background-color: #f0f0f0; border-radius: 4px; cursor: pointer;">Cancel</button>
        </div>
    `;
    document.body.appendChild(dialog);

    document.getElementById('custom-confirm-ok').onclick = () => {
        document.body.removeChild(dialog);
        if (onOk) onOk();
    };
    document.getElementById('custom-confirm-cancel').onclick = () => {
        document.body.removeChild(dialog);
    };
}

// Initial run (fallback for non-Turbo)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
   setTimeout(() => initHeaderFlow(), 50);
} else {
   document.addEventListener('DOMContentLoaded', () => initHeaderFlow());
}