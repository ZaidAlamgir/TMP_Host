(function() {
    // CONFIGURATION
    const CONFIG = {
        linkSelector: '.bottom-nav-link',
        activeClass: 'active',
        loaderId: 'android_progress_bar',
        headerHeight: '51px' 
    };

    // --- 1. LOADER START ---
    function startLoader() {
        if (window.AndroidInterface && window.AndroidInterface.showLoadingAnimation) {
            window.AndroidInterface.showLoadingAnimation();
        }

        let bar = document.getElementById(CONFIG.loaderId);
        
        // Create if missing
        if (!bar) {
            bar = document.createElement('div');
            bar.id = CONFIG.loaderId;
            document.body.appendChild(bar);
        }

        // Force Reset Styles
        bar.style.cssText = `
            position: fixed; 
            top: ${CONFIG.headerHeight}; 
            left: 0; 
            height: 3px; 
            background-color: #0073e6; 
            z-index: 9999; 
            width: 0%; 
            opacity: 1; 
            pointer-events: none;
            transition: none;
        `;

        void bar.offsetWidth; // Force Paint

        // Animate to 30% instantly
        requestAnimationFrame(() => {
            bar.style.transition = 'width 0.4s ease-out';
            bar.style.width = '30%';
        });

        // Trickle to 80%
        setTimeout(() => {
            if (bar && bar.parentNode) {
                bar.style.transition = 'width 3s ease-out';
                bar.style.width = '80%';
            }
        }, 400);
    }

    // --- 2. LOADER FINISH (The Resurrection Logic) ---
    function completeLoader() {
        if (window.AndroidInterface && window.AndroidInterface.stopLoadingAnimation) {
            window.AndroidInterface.stopLoadingAnimation();
        }

        let bar = document.getElementById(CONFIG.loaderId);

        // [CRITICAL FIX] If Turbo deleted the bar, resurrect it!
        if (!bar) {
            bar = document.createElement('div');
            bar.id = CONFIG.loaderId;
            // Start it at 30% so it looks continuous, then zip it
            bar.style.cssText = `
                position: fixed; top: ${CONFIG.headerHeight}; left: 0; 
                height: 3px; background-color: #0073e6; z-index: 9999; 
                width: 30%; opacity: 1; pointer-events: none; transition: none;
            `;
            document.body.appendChild(bar);
            void bar.offsetWidth; 
        }

        // ZIP TO 100%
        requestAnimationFrame(() => {
            bar.style.transition = 'width 0.3s ease-out, opacity 0.2s ease 0.2s'; 
            bar.style.width = '100%';
            bar.style.opacity = '0'; // Start fading out as it hits 100%
        });

        // Cleanup
        setTimeout(() => {
            if (bar.parentNode) bar.remove();
        }, 500); 
    }

    // --- 3. LOGIC ---
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

    // --- 4. LISTENERS ---
    document.addEventListener('turbo:visit', startLoader);
    document.addEventListener('turbo:load', () => {
        highlightActiveLink();
        completeLoader();
    });

    // Manual Click Trigger (for instant feel)
    document.addEventListener('click', (e) => {
        const link = e.target.closest(CONFIG.linkSelector);
        if (link && !e.defaultPrevented) {
            startLoader();
            document.querySelectorAll(CONFIG.linkSelector).forEach(l => l.classList.remove(CONFIG.activeClass));
            link.classList.add(CONFIG.activeClass);
        }
    });

    window.addEventListener('popstate', () => {
        highlightActiveLink();
        if (window.Turbo) {
            window.Turbo.visit(window.location.href, { action: "replace" });
        } else {
            window.location.reload();
        }
    });

    document.addEventListener('turbo:before-cache', () => {
        document.querySelectorAll(CONFIG.linkSelector).forEach(l => l.classList.remove(CONFIG.activeClass));
    });

    document.addEventListener('DOMContentLoaded', highlightActiveLink);

})();