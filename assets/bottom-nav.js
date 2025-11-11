// --- Enhanced Bottom Navigation (All-in-One Script) ---
// *** TURBO-ENABLED VERSION (Slide Animation + Position Fix) ***

(function() {

    // --- FUNCTION 1: CREATE AND INJECT THE CSS STYLES ---
    function injectStyles() {
        const styles = `
            .bottom-nav {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 65px;
                background-color: #ffffff;
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                align-items: center;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
                z-index: 1000;
                border-radius: 15px 15px 0 0;
                overflow: hidden;
            }
            .bottom-nav-link {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                color: #8e8e8e;
                font-size: 12px;
                font-weight: 500;
                height: 100%;
                position: relative;
                z-index: 1;
                transition: color 0.3s ease;
            }
            .bottom-nav-link svg {
                width: 22px;
                height: 22px;
                margin-bottom: 4px;
                transition: stroke 0.3s ease;
            }
            .bottom-nav-link.active { color: #0073e6; }
            .bottom-nav-link.active svg { stroke: #0073e6; }
            #nav-live { order: 1; }
            #nav-news-hub { order: 2; }
            #nav-home { order: 3; }
            #nav-articles { order: 4; }
            #nav-post { order: 5; }
            .nav-glider {
                position: absolute;
                top: 50%;
                left: 0;
                height: 40px;
                width: 60px;
                background-color: #e7f3ff;
                border-radius: 20px;
                transform: translateY(-50%);
                z-index: 0;
                /* --- FIX 1: START INVISIBLE and NO transition --- */
                opacity: 0;
            }
            
            /* --- FIX 2: "SMOOTHER" ANIMATION CLASS --- */
            .nav-glider.glider-animated {
                /* This is the animation you'll feel. 
                  It's longer (0.6s) and uses 'ease-in-out' 
                  for a smoother, more noticeable slide.
                */
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        
        if (!document.getElementById('bottom-nav-styles')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'bottom-nav-styles';
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);
        }
    }

    // --- FUNCTION 2: CREATE THE HTML STRUCTURE ---
    function injectHTML() {
        if (document.getElementById('bottom-nav')) {
            return; // Already injected
        }

        const base_path = document.body.getAttribute('data-base-path') || '';
        const latestPostUrl = document.body.getAttribute('data-latest-post-url') || `${base_path}/latest/`;

        // data-turbo-permanent is the fix for the "glitch"
        const navHTML = `
            <nav class="bottom-nav" id="bottom-nav" data-turbo-permanent>
                <div class="nav-glider"></div>
                <a href="${base_path}/live.html" class="bottom-nav-link" id="nav-live">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>
                    <span>Live</span>
                </a>
                <a href="${base_path}/news-hub.html" class="bottom-nav-link" id="nav-news-hub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    <span>News Hub</span>
                </a>
                <a href="${base_path}/" class="bottom-nav-link" id="nav-home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span>Home</span>
                </a>
                <a href="${latestPostUrl}" class="bottom-nav-link" id="nav-articles">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    <span>Latest</span>
                </a>
                <a href="${base_path}/post.html" class="bottom-nav-link" id="nav-post">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    <span>Post</span>
                </a>
            </nav>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
    }

    // --- FUNCTION 3: LIVE FEED PREFETCH LOGIC ---
    function prefetchLiveFeed() {
        const LIVE_FEED_URL = 'https://data.tmpnews.com/feed.json';
        const PREFETCH_KEY = 'prefetchedLiveFeed';
        const TIMESTAMP_KEY = 'prefetchedLiveFeedTimestamp';
        const now = Date.now();
        const lastPrefetchTime = parseInt(localStorage.getItem(TIMESTAMP_KEY) || '0');
        if (now - lastPrefetchTime < 10000) {
            return;
        }
        localStorage.setItem(TIMESTAMP_KEY, now.toString());
        fetch(LIVE_FEED_URL, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Network response not ok for prefetch');
                return response.json();
            })
            .then(data => {
                localStorage.setItem(PREFETCH_KEY, JSON.stringify(data));
            })
            .catch(error => {
                console.error('Live feed prefetch failed:', error);
                localStorage.removeItem(PREFETCH_KEY);
                localStorage.removeItem(TIMESTAMP_KEY);
            });
    }

    function attachPrefetchListener() {
        // We must use event delegation on 'document.body' because the nav is permanent
        document.body.addEventListener('mousedown', function(e) {
            if (e.target.closest('#nav-live')) {
                prefetchLiveFeed();
            }
        });
        document.body.addEventListener('touchstart', function(e) {
            if (e.target.closest('#nav-live')) {
                prefetchLiveFeed();
            }
        }, { passive: true });
    }

    // --- FUNCTION 4: INITIALIZE NAV (POSITION, PADDING, ETC) ---
    function initializeNav() {
        const bottomNav = document.getElementById('bottom-nav');
        if (!bottomNav) {
            console.error("Bottom nav not found, re-injecting.");
            injectHTML(); // Failsafe
        }
        
        const navHeight = bottomNav.offsetHeight;
        document.body.style.paddingBottom = `${navHeight + 15}px`;

        const navLinks = bottomNav.querySelectorAll('.bottom-nav-link');
        const glider = bottomNav.querySelector('.nav-glider');
        const base_path = document.body.getAttribute('data-base-path') || '';
        const latestPostUrl = document.body.getAttribute('data-latest-post-url') || `${base_path}/latest/`;

        function setActiveLink() {
            const path = window.location.pathname;
            let activeLinkElement = null;

            const normalizedPath = path.endsWith('/index.html') ? (base_path ? base_path : '/') : path;

            navLinks.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                link.classList.remove('active');
                
                const normalizedLinkPath = (linkPath.endsWith('/index.html') || linkPath.endsWith(base_path + '/')) ? (base_path ? base_path : '/') : linkPath;

                if (normalizedPath === normalizedLinkPath) {
                    activeLinkElement = link;
                }
            });

            if (!activeLinkElement && (normalizedPath.endsWith(latestPostUrl) || normalizedPath.includes('/latest'))) {
                 activeLinkElement = document.getElementById('nav-articles');
            }

            if (!activeLinkElement) {
                if (normalizedPath.includes('/postopen.html')) {
                    activeLinkElement = document.getElementById('nav-post');
                } else if (normalizedPath.includes('/post.html')) {
                    activeLinkElement = document.getElementById('nav-post');
                } else {
                    activeLinkElement = document.getElementById('nav-home');
                }
            }
            
            navLinks.forEach(link => link.classList.remove('active'));
            activeLinkElement.classList.add('active');
            
            const linkRect = activeLinkElement.getBoundingClientRect();
            const navRect = bottomNav.getBoundingClientRect();
            if(glider) {
                glider.style.width = `${linkRect.width * 0.8}px`;
                glider.style.left = `${linkRect.left - navRect.left + (linkRect.width * 0.1)}px`;
            }
        }

        // Run this first to set the position *before* it becomes visible
        setActiveLink();
        window.addEventListener('resize', setActiveLink);

        // --- THIS IS THE FIX for the "jump from corner" ---
        if (glider && !glider.classList.contains('glider-animated')) {
            // Use a minimal timeout
            setTimeout(() => {
                glider.classList.add('glider-animated');
                glider.style.opacity = '1'; // Make it visible
            }, 10); // 10ms is enough
        } else if (glider) {
            // If it's already animated, just ensure it's visible
            glider.style.opacity = '1';
        }
    }
    
    // --- MAIN EXECUTION ---
    
    // 1. Inject CSS one time
    injectStyles();

    // 2. Inject HTML one time
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHTML);
    } else {
        injectHTML(); 
    }
    
    // 3. Attach prefetch listeners one time
    attachPrefetchListener();
    
    // 4. Run the nav initialization logic on *every* Turbo load
    document.addEventListener('turbo:load', initializeNav);
    
    // 5. Run it once *after* DOMContentLoaded for the very first page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNav);
    } else {
        initializeNav(); // Handle if script is loaded defer
    }

})();