(function() {
    // CONFIGURATION
    const CONFIG = {
        navId: 'bottom-nav',
        gliderClass: 'nav-glider',
        activeClass: 'active',
        localStorageKey: 'prefetchedLiveFeed',
        feedUrl: 'https://data.tmpnews.com/feed.json'
    };

    // 1. SMART STYLES
    function injectStyles() {
        if (document.getElementById('bottom-nav-styles')) return;
        
        const styles = `
            .bottom-nav {
                position: fixed;
                bottom: 0; left: 0; right: 0;
                height: 65px;
                background-color: #ffffff;
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                align-items: center;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
                z-index: 9999; /* High Z-Index */
                border-radius: 20px 20px 0 0;
                padding-bottom: env(safe-area-inset-bottom); /* iPhone Home Bar Support */
                box-sizing: border-box;
                -webkit-tap-highlight-color: transparent;
            }
            .bottom-nav-link {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                color: #8e8e8e;
                font-size: 11px;
                font-weight: 600;
                height: 100%;
                position: relative;
                z-index: 2; /* Above Glider */
                cursor: pointer;
                transition: color 0.2s ease;
                user-select: none;
            }
            .bottom-nav-link svg {
                width: 24px; height: 24px;
                margin-bottom: 4px;
                transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), stroke 0.3s ease;
                stroke-width: 2px;
            }
            .bottom-nav-link.active { color: #0073e6; }
            .bottom-nav-link.active svg { 
                stroke: #0073e6; 
                transform: translateY(-2px); /* Subtle pop effect */
            }
            
            /* FLEXIBLE ORDERING */
            #nav-live { order: 1; }
            #nav-news-hub { order: 2; }
            #nav-home { order: 3; }
            #nav-articles { order: 4; }
            #nav-post { order: 5; }
            
            /* SMART GLIDER */
            .nav-glider {
                position: absolute;
                top: 50%;
                left: 0;
                height: 40px;
                width: 0; /* Start hidden */
                background-color: #e7f3ff; /* Light Blue */
                border-radius: 12px;
                transform: translateY(-50%);
                z-index: 1; /* Behind Text */
                opacity: 0;
                pointer-events: none;
                will-change: left, width; /* Performance Hint */
            }
            .nav-glider.ready {
                transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1), 
                            width 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                            opacity 0.2s ease;
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.id = 'bottom-nav-styles';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // 2. HTML GENERATION
    function injectHTML() {
        if (document.getElementById(CONFIG.navId)) return;

        const base = document.body.getAttribute('data-base-path') || '';
        // Clean double slashes if they exist (e.g. //latest/)
        const cleanPath = (p) => p.replace(/([^:]\/)\/+/g, "$1");
        const latestUrl = document.body.getAttribute('data-latest-post-url') || `${base}/latest/`;

        const navHTML = `
            <nav class="bottom-nav" id="${CONFIG.navId}" data-turbo-permanent>
                <div class="${CONFIG.gliderClass}"></div>
                <a href="${cleanPath(base + '/live/')}" class="bottom-nav-link" id="nav-live">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>
                    <span>Live</span>
                </a>
                <a href="${cleanPath(base + '/news/hub/')}" class="bottom-nav-link" id="nav-news-hub">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    <span>News Hub</span>
                </a>
                <a href="${cleanPath(base + '/')}" class="bottom-nav-link" id="nav-home">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span>Home</span>
                </a>
                <a href="${cleanPath(latestUrl)}" class="bottom-nav-link" id="nav-articles">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    <span>Latest</span>
                </a>
                <a href="${cleanPath(base + '/post/')}" class="bottom-nav-link" id="nav-post">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    <span>Post</span>
                </a>
            </nav>
        `;
        document.body.insertAdjacentHTML('beforeend', navHTML);
        
        // Adjust page padding immediately
        requestAnimationFrame(() => {
            const nav = document.getElementById(CONFIG.navId);
            if(nav) document.body.style.paddingBottom = (nav.offsetHeight + 20) + 'px';
        });
    }

    // 3. SMART GLIDER LOGIC
    function updateGlider() {
        const nav = document.getElementById(CONFIG.navId);
        if (!nav) return;

        const activeLink = nav.querySelector(`.${CONFIG.activeClass}`);
        const glider = nav.querySelector(`.${CONFIG.gliderClass}`);

        if (activeLink && glider) {
            // Get geometry
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            // If geometry is invalid (width 0), retry shortly
            if (linkRect.width === 0) {
                requestAnimationFrame(updateGlider);
                return;
            }

            // Calculate Position relative to Nav container
            const relativeLeft = linkRect.left - navRect.left;
            
            // Style application (Center the glider on the icon)
            // We use 70% width of the link for a pill shape
            const newWidth = linkRect.width * 0.7;
            const offset = (linkRect.width - newWidth) / 2;

            glider.style.width = `${newWidth}px`;
            glider.style.left = `${relativeLeft + offset}px`;
            glider.style.opacity = '1';
            
            // Enable animation class after first paint to avoid "whoosh" from left:0
            if (!glider.classList.contains('ready')) {
                setTimeout(() => glider.classList.add('ready'), 50);
            }
        } else if (glider) {
            glider.style.opacity = '0'; // Hide if no active link
        }
    }

    // 4. INTELLIGENT ACTIVE STATE DETECTION
    function highlightActiveLink() {
        const currentUrl = new URL(window.location.href);
        const path = currentUrl.pathname.replace(/\/$/, "") || "/"; // Normalize trailing slash
        const links = document.querySelectorAll('.bottom-nav-link');
        let matchFound = false;

        // Helper: clean paths for comparison
        const getPath = (href) => {
            const url = new URL(href, window.location.origin);
            return url.pathname.replace(/\/$/, "") || "/";
        };

        // Reset
        links.forEach(l => l.classList.remove(CONFIG.activeClass));

        // A. Strict Match first
        links.forEach(link => {
            if (matchFound) return;
            if (getPath(link.href) === path) {
                link.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
        });

        // B. Fuzzy Match (if strict failed)
        if (!matchFound) {
            // Check specific sub-sections
            if (path.includes('/postopen/') || path.includes('/post/')) {
                document.getElementById('nav-post')?.classList.add(CONFIG.activeClass);
                matchFound = true;
            } else if (path.includes('/latest')) {
                document.getElementById('nav-articles')?.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
        }

        // C. Default fallback (Home)
        if (!matchFound) {
             // Only default to home if we are actually near the root
             // Otherwise, showing no active state is better than showing the wrong one
             const homeLink = document.getElementById('nav-home');
             if (homeLink && (path === '' || path === '/')) {
                 homeLink.classList.add(CONFIG.activeClass);
             }
        }

        updateGlider();
    }

    // 5. DATA PREFETCHING (Optimized)
    function setupPrefetch() {
        const handlePrefetch = () => {
            const now = Date.now();
            const last = parseInt(localStorage.getItem(CONFIG.localStorageKey + 'TS') || '0');
            
            if (now - last < 10000) return; // 10s throttle

            fetch(CONFIG.feedUrl, { cache: 'no-store', priority: 'low' })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) {
                        localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(data));
                        localStorage.setItem(CONFIG.localStorageKey + 'TS', now);
                    }
                })
                .catch(() => {}); // Silent fail
        };

        // Passive listeners for better scrolling performance
        document.body.addEventListener('touchstart', (e) => {
            if (e.target.closest('#nav-live')) handlePrefetch();
        }, { passive: true });
        
        document.body.addEventListener('mouseenter', (e) => {
             if (e.target.closest('#nav-live')) handlePrefetch();
        }, true); // Capture phase
    }

    // 6. MASTER INITIALIZER
    function init() {
        injectStyles();
        injectHTML();
        highlightActiveLink();
        setupPrefetch();

        const nav = document.getElementById(CONFIG.navId);
        
        // OBSERVER: This is the "Smart" part. 
        // It watches if the nav changes size (device rotation, layout shift)
        // and fixes the glider immediately.
        if (nav && window.ResizeObserver) {
            const observer = new ResizeObserver(() => {
                requestAnimationFrame(updateGlider);
            });
            observer.observe(nav);
        } else {
            window.addEventListener('resize', updateGlider);
        }

        // POLLING: Fallback for slow frameworks/animations
        // Checks active state 3 times over 1 second
        [100, 300, 800].forEach(t => setTimeout(highlightActiveLink, t));
    }

    // 7. EVENT BINDINGS
    // Handle SPA navigations (Back/Forward buttons)
    window.addEventListener('popstate', () => setTimeout(highlightActiveLink, 10));
    
    // Handle Turbo/Hotwire
    document.addEventListener('turbo:load', init);
    
    // Handle Click Immediate Feedback (Feels faster)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.bottom-nav-link');
        if (link) {
            document.querySelectorAll('.bottom-nav-link').forEach(l => l.classList.remove(CONFIG.activeClass));
            link.classList.add(CONFIG.activeClass);
            updateGlider();
        }
    }, true);

    // Boot sequence
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();