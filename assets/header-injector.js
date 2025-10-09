// A single, smart script that injects the correct header based on the current page.
// This is the final version with all features, caching, and correct paths.

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

// --- RENDER FUNCTION 1: For Jekyll Pages (Writer Login) ---
function renderWriterHeader(base_path) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
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
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <rect x="50" y="50" width="100" height="100" fill="#3498db" class="square"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="tmp-text">TMP</text>
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#3498db" stroke-width="2" class="rotating-circle"/>
                        </svg>
                        The Muslim Post
                    </a>
                </div>
                <div class="header-right">
                    <a id="writer-login-btn" class="user-icon-link" href="#" title="Writer Login">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>
                </div>
            </div>
        </header>
        <div class="index-menu-overlay" id="index-menu-overlay">
            <div class="index-menu-content">
                <div class="index-main-nav">
                    <a href="${base_path}/">Home</a>
                    <a href="${base_path}/news-hub.html">Articles</a>
                    <a href="${base_path}/about.html">About</a>
                </div>
                <input type="text" id="index-search-box" class="index-search-box" placeholder="Search by tags to find articles">
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

    // Re-attach the menu logic
    const indexMenuBtn = document.getElementById('index-menu-btn');
    const indexMenuOverlay = document.getElementById('index-menu-overlay');
    const searchBox = document.getElementById('index-search-box');
    const resultsList = document.getElementById('index-results-list');
    let allPosts = [];

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
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${base_path}${post.url}">${post.title}</a>`;
            resultsList.appendChild(listItem);
        });
    }

    function openMenu() {
        getPostData().then(posts => renderPosts(posts.slice(0, 5)));
        if(searchBox) searchBox.value = '';
        if(indexMenuBtn) indexMenuBtn.classList.add('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.add('active');
    }

    function closeMenu() {
        if(indexMenuBtn) indexMenuBtn.classList.remove('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.remove('active');
    }

    if (indexMenuBtn) {
        indexMenuBtn.addEventListener('click', () => indexMenuBtn.classList.contains('active') ? closeMenu() : openMenu());
    }
    if (indexMenuOverlay) {
        indexMenuOverlay.addEventListener('click', (e) => (e.target === indexMenuOverlay) && closeMenu());
    }
    if (searchBox) {
        searchBox.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase().trim();
            const posts = await getPostData();
            const filteredPosts = query.length < 2 ? posts.slice(0, 5) : posts.filter(post => post.tags.includes(query));
            renderPosts(filteredPosts);
        });
    }
}

// --- RENDER FUNCTION 2: For Public-Facing Supabase Pages ---
function renderSupabaseHeader(user, base_path) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    const isUserLoggedIn = !!user;
    
    // THIS IS THE FIX: Ensure all links are absolute by prepending the base_path
    const mainIconLink = isUserLoggedIn ? `${base_path}/profile.html` : `${base_path}/auth.html`;
    
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
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <rect x="50" y="50" width="100" height="100" fill="#3498db" class="square"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="tmp-text">TMP</text>
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#3498db" stroke-width="2" class="rotating-circle"/>
                        </svg>
                        The Muslim Post
                    </a>
                </div>
                <div class="header-right">
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
        </header>
        <div class="index-menu-overlay" id="index-menu-overlay">
            <div class="index-menu-content">
                <div class="index-main-nav">
                    <a href="${base_path}/">Home</a>
                    <a href="${base_path}/news-hub.html">Articles</a>
                    <a href="${base_path}/about.html">About</a>
                </div>
                <input type="text" id="index-search-box" class="index-search-box" placeholder="Search by tags to find articles">
                <ul id="index-results-list"></ul>
            </div>
        </div>
    `;
    
    headerPlaceholder.innerHTML = supabaseHeaderHTML;

    const indexMenuBtn = document.getElementById('index-menu-btn');
    const indexMenuOverlay = document.getElementById('index-menu-overlay');
    const searchBox = document.getElementById('index-search-box');
    const resultsList = document.getElementById('index-results-list');
    let allPosts = [];

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
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${base_path}${post.url}">${post.title}</a>`;
            resultsList.appendChild(listItem);
        });
    }

    function openMenu() {
        getPostData().then(posts => renderPosts(posts.slice(0, 5)));
        if(searchBox) searchBox.value = '';
        if(indexMenuBtn) indexMenuBtn.classList.add('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.add('active');
    }

    function closeMenu() {
        if(indexMenuBtn) indexMenuBtn.classList.remove('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.remove('active');
    }

    if (indexMenuBtn) {
        indexMenuBtn.addEventListener('click', () => indexMenuBtn.classList.contains('active') ? closeMenu() : openMenu());
    }
    if (indexMenuOverlay) {
        indexMenuOverlay.addEventListener('click', (e) => (e.target === indexMenuOverlay) && closeMenu());
    }
    if (searchBox) {
        searchBox.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase().trim();
            const posts = await getPostData();
            const filteredPosts = query.length < 2 ? posts.slice(0, 5) : posts.filter(post => post.tags.includes(query));
            renderPosts(filteredPosts);
        });
    }
    
    if (isUserLoggedIn && !user.photoURL) {
        const profileInitialCircle = document.getElementById('profile-initial-circle');
        const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
        profileInitialCircle.textContent = initial;
        profileInitialCircle.style.backgroundColor = generateColorForUser(user.uid);
        profileInitialCircle.style.width = '35px';
        profileInitialCircle.style.height = '35px';
        profileInitialCircle.style.borderRadius = '50%';
        profileInitialCircle.style.color = 'white';
        profileInitialCircle.style.display = 'flex';
        profileInitialCircle.style.justifyContent = 'center';
        profileInitialCircle.style.alignItems = 'center';
        profileInitialCircle.style.fontSize = '1.2rem';
        profileInitialCircle.style.fontWeight = 'bold';
    }
}

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

    renderSupabaseHeader(cachedUser, basePath);

    const supabase = window.supabase?.createClient('https://yfrqnghduttudqbnodwr.supabase.co', 'eyJhbGciOiJIUzIifQ.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU');
    if (supabase) {
        supabase.auth.onAuthStateChange((event, session) => {
            const user = session?.user;
            if (user) {
                const userToCache = { 
                    uid: user.id, 
                    displayName: user.user_metadata?.full_name, 
                    email: user.email, 
                    photoURL: user.user_metadata?.avatar_url 
                };
                 if (forceRerender || JSON.stringify(userToCache) !== JSON.stringify(cachedUser)) {
                    renderSupabaseHeader(userToCache, basePath);
                 }
                 localStorage.setItem(CACHED_USER_KEY, JSON.stringify(userToCache));
            } else {
                if (cachedUser) renderSupabaseHeader(null, basePath);
                localStorage.removeItem(CACHED_USER_KEY);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;
    const base_path = document.body.getAttribute('data-base-path') || '';

    if (pathname.includes('/auth.html')) {
        return;
    }

    if (pathname.includes('/profile.html')) {
        return;
    }

    const isWriterPage = pathname.includes('/cms.html') || pathname.includes('/liveCMS.html');

    if (isWriterPage) {
        renderWriterHeader(base_path);
    } else {
        initializeSupabaseHeader(base_path);
    }
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        const base_path = document.body.getAttribute('data-base-path') || '';
        initializeSupabaseHeader(base_path, true);
    }
});