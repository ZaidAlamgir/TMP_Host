// A single, smart script that injects the correct header based on the current page.
// This is the final version with all features, caching, correct paths, and dropdown menu.
// *** MODIFIED FOR TURBO ***

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

    // --- START Settings Button Logic ---
    const isInsideApp = typeof window.AndroidInterface !== 'undefined';
    const settingsMenuItemHTML = isInsideApp ? `
        <a href="#" id="app-settings-menu-item" class="app-settings-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
        </a>
    ` : '';
    // --- END Settings Button Logic ---


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
                    ${settingsMenuItemHTML}
                </div>
                <ul id="index-results-list"></ul>
            </div>
        </div>
    `;
    headerPlaceholder.innerHTML = writerHeaderHTML;

    const writerLoginBtn = document.getElementById('writer-login-btn');
    if (writerLoginBtn) { // Check if button exists before adding listener
        writerLoginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            // Use custom modal/dialog instead of confirm
             showCustomConfirm("ADMIN NOTICE: This login is for authorized writers only. Press OK to continue.", () => {
                 window.location.href = `${base_path}/cms.html`;
             });
            // if (confirm("ADMIN NOTICE: This login is for authorized writers only. Press OK to continue.")) {
            //     window.location.href = `${base_path}/cms.html`;
            // }
        });
    }


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

    // --- START Settings Button Logic ---
    const isInsideApp = typeof window.AndroidInterface !== 'undefined';
    const settingsMenuItemHTML = isInsideApp ? `
        <a href="#" id="app-settings-menu-item" class="app-settings-link">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
        </a>
    ` : '';
    // --- END Settings Button Logic ---

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
                     ${settingsMenuItemHTML}
                </div>
                <ul id="index-results-list"></ul>
            </div>
        </div>
    `;

    headerPlaceholder.innerHTML = supabaseHeaderHTML;

    // Attach menu logic AFTER injecting HTML
    attachMenuLogic(base_path); // This will now attach the settings listener too

    if (isUserLoggedIn && user) { // Added check for user object
         const profileInitialCircle = document.getElementById('profile-initial-circle');
         if (profileInitialCircle && !user.photoURL) { // Check if element exists before modifying
             const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
             profileInitialCircle.textContent = initial;
             profileInitialCircle.style.backgroundColor = generateColorForUser(user.uid || user.id); // Use uid or id
             profileInitialCircle.style.display = 'flex'; // Ensure it's visible if no photo
         }
          // Ensure profile pic visibility is correct
         const profilePicImg = document.getElementById('profile-pic-img');
         if (profilePicImg) {
             profilePicImg.style.display = user.photoURL ? 'block' : 'none';
             if(user.photoURL) profilePicImg.src = user.photoURL; // Update src
         }
          const profilePicContainer = document.getElementById('profile-pic-container');
         if (profilePicContainer) profilePicContainer.style.display = 'flex';
          const loginIconSvg = document.getElementById('login-icon-svg');
         if (loginIconSvg) loginIconSvg.style.display = 'none';

     } else {
         // Ensure logged-out state is visually correct
         const loginIconSvg = document.getElementById('login-icon-svg');
         if (loginIconSvg) loginIconSvg.style.display = 'block';
         const profilePicContainer = document.getElementById('profile-pic-container');
         if (profilePicContainer) profilePicContainer.style.display = 'none';
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
                // Try fetching from root first, then relative if needed (more robust)
                let searchUrl = `/search.json`;
                let response = await fetch(searchUrl);
                if (!response.ok) {
                    searchUrl = `${base_path}/search.json`; // Fallback to relative path
                    response = await fetch(searchUrl);
                }
                if (!response.ok) throw new Error(`Search data not found at ${searchUrl}. Status: ${response.status}`);
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
             // Ensure post URL is correctly formed relative to the site root
             // Assuming post.url starts with "/"
            listItem.innerHTML = `<a href="${post.url}">${post.title}</a>`;
            resultsList.appendChild(listItem);
        });
    }

    function openMenu() {
        getPostData().then(posts => renderPosts(posts.slice(0, 5))); // Show initial results on open
        if(searchBox) searchBox.value = ''; // Clear search on open
        if(indexMenuBtn) indexMenuBtn.classList.add('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.add('active');
         document.body.classList.add('menu-open'); // Prevent body scroll
    }

    function closeMenu() {
        if(indexMenuBtn) indexMenuBtn.classList.remove('active');
        if(indexMenuOverlay) indexMenuOverlay.classList.remove('active');
        // Close dropdown when closing main menu
        if (dropdownContainer) dropdownContainer.classList.remove('open');
         document.body.classList.remove('menu-open'); // Allow body scroll
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
            // More robust filtering: check title and tags (ensure tags exist)
            const filteredPosts = query.length < 2
                ? posts.slice(0, 5) // Show recent if query is short
                : posts.filter(post =>
                    (post.title && post.title.toLowerCase().includes(query)) || // Check if title exists
                    (post.tags && post.tags.toLowerCase().includes(query)) // Check if tags exist
                );
            renderPosts(filteredPosts); // Render filtered results
        });
    }


    // Articles Dropdown Toggle
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing main menu
            if (dropdownContainer) dropdownContainer.classList.toggle('open'); // Check container exists
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

    // --- START Settings Link Listener ---
    const settingsLink = document.getElementById('app-settings-menu-item');
    if (settingsLink && typeof window.AndroidInterface !== 'undefined') {
        settingsLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default '#' link behavior
            console.log("App Settings link clicked");
            try {
                window.AndroidInterface.openAppSettings();
                closeMenu(); // Close the menu after clicking
            } catch (e) {
                console.error("Error calling AndroidInterface.openAppSettings:", e);
                // Optionally show an alert or message if the call fails
                // alert("Could not open app settings.");
            }
        });
    }
    // --- END Settings Link Listener ---

}


// --- Supabase Header Initialization (Handles Caching & Auth State) ---
function initializeSupabaseHeader(base_path, forceRerender = false) {
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
    renderSupabaseHeader(cachedUser, base_path);

    // Initialize Supabase client if available
    // Ensure Supabase URL and Key are correctly configured elsewhere or replace placeholders
     const SUPABASE_URL = 'https://yfrqnghduttudqbnodwr.supabase.co'; // Replace if needed
     const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX7pnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU'; // Replace if needed
     let supabaseInstance = null;
      try {
           if (window.supabase && typeof window.supabase.createClient === 'function') {
                supabaseInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
           }
      } catch(e) {
           console.error("Error creating Supabase client:", e);
      }


    if (supabaseInstance) {
        // Listen for authentication changes
        supabaseInstance.auth.onAuthStateChange((event, session) => {
            const user = session?.user;
             let userChanged = false; // Flag to check if re-render actually happened

            if (user) {
                // User is logged in or state changed to logged in
                const userToCache = {
                    uid: user.id, // Use id
                    displayName: user.user_metadata?.full_name,
                    email: user.email,
                    photoURL: user.user_metadata?.avatar_url
                };

                 // Compare with current cache in localStorage, not just the initially loaded cachedUser
                 const currentStorageCache = localStorage.getItem(CACHED_USER_KEY);
                 const needsUpdate = forceRerender || !currentStorageCache || JSON.stringify(userToCache) !== currentStorageCache;

                if (needsUpdate) {
                    console.log("Auth Change: User logged in or data changed. Re-rendering header.");
                    renderSupabaseHeader(userToCache, base_path); // Re-render header with user info
                    localStorage.setItem(CACHED_USER_KEY, JSON.stringify(userToCache));
                    cachedUser = userToCache; // Update local variable for subsequent checks within this scope
                    userChanged = true;
                } else {
                    // console.log("Auth Change: User logged in, but cached data is current. No re-render.");
                }
            } else {
                // User is logged out or state changed to logged out
                if (localStorage.getItem(CACHED_USER_KEY) || forceRerender) { // Check storage directly
                    console.log("Auth Change: User logged out. Re-rendering header.");
                    renderSupabaseHeader(null, base_path); // Re-render header in logged-out state
                    localStorage.removeItem(CACHED_USER_KEY);
                    cachedUser = null; // Update local variable
                    userChanged = true;
                } else {
                     // console.log("Auth Change: User logged out, but already reflected. No re-render.");
                }
            }
             // console.log("Auth state change processed. Event:", event, "User changed on screen:", userChanged);
        });
    } else {
        console.warn("Supabase client not found. Header auth state might be inaccurate.");
    }
}


// --- Main Execution Logic ---
// --- THIS IS THE KEY CHANGE ---
// We replace 'DOMContentLoaded' with 'turbo:load'
document.addEventListener('turbo:load', function() {
    console.log("Turbo has loaded a new page. Initializing header-injector.");
    const pathname = window.location.pathname;
    // Attempt to get base path from body attribute, default to '.'
    const base_path = document.body.getAttribute('data-base-path') || '.';

    // Define pages where header injection should be skipped
    const skipHeaderPages = [
        '/auth.html',
        '/auth-callback.html',
        '/callback.html',
        // '/profile.html' // Keep header on profile, but profile.js might update parts of it
    ];

    if (skipHeaderPages.some(page => pathname.endsWith(page))) { // Use endsWith for better matching
        console.log("Skipping header injection for:", pathname);
        // If a header exists from a previous page, remove it
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) headerPlaceholder.innerHTML = '';
        return; // Don't inject header on these pages
    }

    // Determine if it's a writer CMS page
    const isWriterPage = pathname.endsWith('/cms.html') || pathname.endsWith('/liveCMS.html');

    if (isWriterPage) {
         console.log("Rendering writer header for:", pathname);
        renderWriterHeader(base_path);
    } else {
        // Initialize Supabase header for all other public pages
         console.log("Initializing Supabase header for:", pathname);
        initializeSupabaseHeader(base_path);
    }
});
// --- END KEY CHANGE ---


// Handle browser back/forward navigation potentially using cached pages (bfcache)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) { // Page loaded from bfcache
        console.log("Page loaded from bfcache:", window.location.pathname);
        const pathname = window.location.pathname;
        const skipHeaderPages = ['/auth.html','/auth-callback.html','/callback.html']; // Pages without header

        if (skipHeaderPages.some(page => pathname.endsWith(page))) {
            return; // Still skip header on these
        }

        const base_path = document.body.getAttribute('data-base-path') || '.';
        const isWriterPage = pathname.endsWith('/cms.html') || pathname.endsWith('/liveCMS.html');

        // Force re-render of the appropriate header on bfcache restore
        if (isWriterPage) {
             console.log("Re-rendering writer header after bfcache restore.");
             renderWriterHeader(base_path);
        } else {
             console.log("Re-initializing Supabase header after bfcache restore.");
            initializeSupabaseHeader(base_path, true); // Force re-check and re-render
        }
    }
});


// --- Custom Confirm/Alert ---
// Basic implementation - replace with a proper modal library if needed
function showCustomConfirm(message, onOk) {
    // Remove any existing dialog first
    const existingDialog = document.getElementById('custom-confirm-dialog');
    if (existingDialog) existingDialog.remove();
    
    const dialog = document.createElement('div');
    dialog.id = 'custom-confirm-dialog'; // Add an ID
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