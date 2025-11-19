(function() {
    // CONFIGURATION
    const CONFIG = {
        navId: 'bottom-nav',
        gliderClass: 'nav-glider',
        activeClass: 'active',
        localStorageKey: 'prefetchedLiveFeed',
        feedUrl: 'https://data.tmpnews.com/feed.json'
    };

    // 1. GET ACTIVE LINK BASED ON URL
    function highlightActiveLink() {
        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
        const links = document.querySelectorAll('.bottom-nav-link');
        let matchFound = false;

        // Reset all links
        links.forEach(l => l.classList.remove(CONFIG.activeClass));

        // Logic to find the active link
        links.forEach(link => {
            if (matchFound) return;
            const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
            
            // Exact match or Parent match (e.g. /news/hub/section -> /news/hub)
            if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
        });

        // Fallback to Home if no match found
        if (!matchFound) {
             const homeLink = document.getElementById('nav-home');
             if (homeLink) homeLink.classList.add(CONFIG.activeClass);
        }

        // Pass 'true' to indicate this is the initial page load
        updateGlider(true); 
    }

    // 2. MOVE GLIDER (Stabilized)
    function updateGlider(isInitialLoad = false) {
        const nav = document.getElementById(CONFIG.navId);
        if (!nav) return;

        const activeLink = nav.querySelector(`.${CONFIG.activeClass}`);
        const glider = nav.querySelector(`.${CONFIG.gliderClass}`);

        if (activeLink && glider) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            // Calculate Position
            const relativeLeft = linkRect.left - navRect.left;
            const newWidth = linkRect.width * 0.7; // 70% width of the icon area
            const offset = (linkRect.width - newWidth) / 2; // Center it

            // Apply styles
            glider.style.width = `${newWidth}px`;
            glider.style.left = `${relativeLeft + offset}px`;
            glider.style.opacity = '1';

            // THE FIX: Prevent "swimming" effect on load
            if (isInitialLoad) {
                glider.classList.remove('ready'); // Disable transition temporarily
                void glider.offsetWidth; // Force browser to paint position immediately
                
                // Re-enable transition for future clicks
                requestAnimationFrame(() => {
                    glider.classList.add('ready');
                });
            } 
        }
    }

    // 3. CLICK LISTENER (Instant Feedback)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.bottom-nav-link');
        if (link) {
            // Visually update immediately (don't wait for page load)
            document.querySelectorAll('.bottom-nav-link').forEach(l => l.classList.remove(CONFIG.activeClass));
            link.classList.add(CONFIG.activeClass);
            updateGlider(false); // false = animate this movement normally
        }
    });

    // 4. INITIALIZE
    if (typeof Turbo !== 'undefined') {
        document.addEventListener('turbo:load', highlightActiveLink);
    } else {
        document.addEventListener('DOMContentLoaded', highlightActiveLink);
    }
    
    // Handle Browser Back/Forward buttons
    window.addEventListener('popstate', highlightActiveLink);

})();