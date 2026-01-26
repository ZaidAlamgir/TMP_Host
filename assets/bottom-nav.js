(function() {
    // CONFIGURATION
    const CONFIG = {
        linkSelector: '.bottom-nav-link',
        activeClass: 'active'
    };

    // 1. HIGHLIGHT TABS (Visuals)
    function highlightActiveLink() {
        // HELPER: Normalize paths by removing '.html' and trailing '/'
        // This ensures "/latest", "/latest.html", and "/latest/" all match.
        const normalize = (path) => path.replace(/(\.html|\/)$/, "") || "/";

        const currentPath = normalize(window.location.pathname);
        const links = document.querySelectorAll(CONFIG.linkSelector);
        
        // Reset all tabs
        links.forEach(l => l.classList.remove(CONFIG.activeClass));

        let matchFound = false;

        links.forEach(link => {
            if (matchFound) return;

            const linkUrl = new URL(link.href, window.location.origin);
            const linkPath = normalize(linkUrl.pathname);

            // CHECK 1: Exact Match (e.g. /latest matches /latest.html)
            if (linkPath === currentPath) {
                link.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
            // CHECK 2: Sub-folder Match (e.g. /post/123 matches /post tab)
            // We check 'linkPath + /' to ensure /latest-news doesn't falsely match /latest
            else if (linkPath !== '/' && currentPath.startsWith(linkPath + '/')) {
                link.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
        });

        // Fallback: If no tab matched, highlight Home.
        // We use ID 'nav-home' because it is safer than relying on href="/"
        if (!matchFound) {
            const home = document.getElementById('nav-home');
            if (home) home.classList.add(CONFIG.activeClass);
        }
    }

    // 2. THE FIX: MANUALLY FORCE PAGE LOAD ON BACK
    window.addEventListener('popstate', (event) => {
        // A. Update the tab instantly so it looks fast
        highlightActiveLink();

        // B. Force Turbo to fetch the real page from the network
        if (window.Turbo) {
            window.Turbo.visit(window.location.href, { action: "replace" });
        } else {
            window.location.reload();
        }
    });

    // 3. EVENT LISTENERS
    document.addEventListener('turbo:load', highlightActiveLink);
    document.addEventListener('DOMContentLoaded', highlightActiveLink);

    // 4. PREVENT CACHE CONFLICTS
    document.addEventListener('turbo:before-cache', () => {
        document.querySelectorAll(CONFIG.linkSelector).forEach(l => l.classList.remove(CONFIG.activeClass));
    });

})();