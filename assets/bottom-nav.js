(function() {
    // CONFIGURATION
    const CONFIG = {
        linkSelector: '.bottom-nav-link',
        activeClass: 'active'
    };

    // 1. HIGHLIGHT TABS (Visuals)
    function highlightActiveLink() {
        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
        const links = document.querySelectorAll(CONFIG.linkSelector);
        
        links.forEach(l => l.classList.remove(CONFIG.activeClass));

        let matchFound = false;
        links.forEach(link => {
            if (matchFound) return;
            const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
            if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
        });

        if (!matchFound) {
            const home = document.querySelector(`${CONFIG.linkSelector}[href="/"]`);
            if (home) home.classList.add(CONFIG.activeClass);
        }
    }

    // 2. THE FIX: MANUALLY FORCE PAGE LOAD ON BACK
    window.addEventListener('popstate', (event) => {
        // A. Update the tab instantly so it looks fast
        highlightActiveLink();

        // B. Force Turbo to fetch the real page from the network
        // We use 'replace' to swap the frozen body with the real one.
        if (window.Turbo) {
            window.Turbo.visit(window.location.href, { action: "replace" });
        } else {
            // Fallback if Turbo is missing
            window.location.reload();
        }
    });

    // 3. EVENT LISTENERS
    document.addEventListener('turbo:load', highlightActiveLink);
    document.addEventListener('DOMContentLoaded', highlightActiveLink);

    // 4. PREVENT CACHE CONFLICTS
    document.addEventListener('turbo:before-cache', () => {
        // Clean the DOM before saving
        document.querySelectorAll(CONFIG.linkSelector).forEach(l => l.classList.remove(CONFIG.activeClass));
    });

})();