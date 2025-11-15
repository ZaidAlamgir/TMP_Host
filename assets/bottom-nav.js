(function() {
    // CONFIGURATION
    const CONFIG = {
        navId: 'bottom-nav',
        gliderClass: 'nav-glider',
        activeClass: 'active',
        localStorageKey: 'prefetchedLiveFeed',
        feedUrl: 'https://data.tmpnews.com/feed.json'
    };

    // 1. SMART GLIDER LOGIC
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
            const newWidth = linkRect.width * 0.7;
            const offset = (linkRect.width - newWidth) / 2;

            // Apply coordinates WITHOUT transition first if not ready
            // This prevents the glider from "swooshing" in from the left on page load
            if (!glider.classList.contains('ready')) {
                glider.style.transition = 'none';
                glider.style.width = `${newWidth}px`;
                glider.style.left = `${relativeLeft + offset}px`;
                glider.style.opacity = '1';
                
                // Force Reflow
                void glider.offsetWidth; 

                // Enable animation class in next frame
                requestAnimationFrame(() => {
                    glider.style.transition = ''; 
                    glider.classList.add('ready');
                });
            } else {
                // Standard animation
                glider.style.width = `${newWidth}px`;
                glider.style.left = `${relativeLeft + offset}px`;
                glider.style.opacity = '1';
            }
            
        } else if (glider) {
            glider.style.opacity = '0'; // Hide if no active link
        }
    }

    // 2. INTELLIGENT ACTIVE STATE DETECTION
    function highlightActiveLink() {
        const currentUrl = new URL(window.location.href);
        const path = currentUrl.pathname.replace(/\/$/, "") || "/"; 
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
            } else if (path.includes('/latest') || path === '/latest.html') {
                document.getElementById('nav-articles')?.classList.add(CONFIG.activeClass);
                matchFound = true;
            } else if (path.startsWith('/news/hub')) { 
                 // This line ensures the News Hub tab stays active even inside an article
                 // IF your permalink structure starts with /news/hub.
                 // Since standard posts are usually /YYYY/MM/DD/title, they won't match this.
                 // However, this keeps the "News Hub" tab active on paginated hub pages.
                 document.getElementById('nav-news-hub')?.classList.add(CONFIG.activeClass);
                 matchFound = true;
            }
        }

        // C. Default fallback (Home)
        if (!matchFound) {
             const homeLink = document.getElementById('nav-home');
             if (homeLink && (path === '' || path === '/')) {
                 homeLink.classList.add(CONFIG.activeClass);
             }
        }

        updateGlider();
    }

    // 3. MASTER INITIALIZER
    function init() {
        highlightActiveLink();

        const nav = document.getElementById(CONFIG.navId);
        
        // OBSERVER: Watch for size changes
        if (nav && window.ResizeObserver) {
            const observer = new ResizeObserver(() => {
                requestAnimationFrame(updateGlider);
            });
            observer.observe(nav);
        } else {
            window.addEventListener('resize', updateGlider);
        }

        // POLLING: Fallback for slow frameworks
        [100, 300, 800].forEach(t => setTimeout(highlightActiveLink, t));
    }

    // 4. EVENT BINDINGS
    window.addEventListener('popstate', () => setTimeout(highlightActiveLink, 10));
    document.addEventListener('turbo:load', init);
    
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.bottom-nav-link');
        if (link) {
            document.querySelectorAll('.bottom-nav-link').forEach(l => l.classList.remove(CONFIG.activeClass));
            link.classList.add(CONFIG.activeClass);
            updateGlider();
        }
    }, true);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();