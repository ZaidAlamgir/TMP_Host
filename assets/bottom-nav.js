(function() {
    // CONFIGURATION
    const CONFIG = {
        linkSelector: '.bottom-nav-link',
        activeClass: 'active',
        loaderId: 'android_progress_bar',
        headerSelector: '.header', // Target the header class specifically
        fallbackHeaderHeight: '51px' 
    };

    // --- HELPER: Normalize URLs (Fixes "Latest" tab issue) ---
    // Removes trailing slashes AND .html extensions for robust matching
    function normalizePath(path) {
        return path
            .replace(/\/$/, "")       // Remove trailing slash
            .replace(/\.html$/, "");  // Remove .html extension
    }

    // --- 1. LOADER START ---
    function startLoader() {
        if (window.AndroidInterface && window.AndroidInterface.showLoadingAnimation) {
            window.AndroidInterface.showLoadingAnimation();
        }

        let bar = document.getElementById(CONFIG.loaderId);
        const header = document.querySelector(CONFIG.headerSelector);
        
        // Create if missing
        if (!bar) {
            bar = document.createElement('div');
            bar.id = CONFIG.loaderId;
            
            // [FIX] Inject into Header if possible, otherwise Body
            if (header) {
                header.appendChild(bar); 
            } else {
                document.body.appendChild(bar);
            }
        }

        // [FIX] Dynamic Positioning Logic
        // If inside header: Stick to bottom of header using absolute positioning
        // If fallback: Use fixed positioning
        if (header && bar.parentNode === header) {
            bar.style.cssText = `
                position: absolute; 
                bottom: 0; 
                left: 0; 
                height: 3px; 
                background-color: #0073e6; 
                z-index: 9999; 
                width: 0%; 
                opacity: 1; 
                pointer-events: none;
                transition: none;
            `;
            // Ensure header can hold absolute children
            const headerStyle = window.getComputedStyle(header);
            if (headerStyle.position === 'static') {
                header.style.position = 'relative';
            }
        } else {
            // Fallback for when header isn't found
            bar.style.cssText = `
                position: fixed; 
                top: ${CONFIG.fallbackHeaderHeight}; 
                left: 0; 
                height: 3px; 
                background-color: #0073e6; 
                z-index: 9999; 
                width: 0%; 
                opacity: 1; 
                pointer-events: none;
                transition: none;
            `;
        }

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

    // --- 2. LOADER FINISH ---
    function completeLoader() {
        if (window.AndroidInterface && window.AndroidInterface.stopLoadingAnimation) {
            window.AndroidInterface.stopLoadingAnimation();
        }

        let bar = document.getElementById(CONFIG.loaderId);

        // Resurrect if missing (Turbo edge case)
        if (!bar) {
            bar = document.createElement('div');
            bar.id = CONFIG.loaderId;
            // Quick set to 30% to look continuous
            bar.style.width = '30%';
            bar.style.height = '3px';
            bar.style.backgroundColor = '#0073e6';
            bar.style.position = 'fixed'; 
            bar.style.zIndex = '9999';
            document.body.appendChild(bar);
        }

        // ZIP TO 100%
        requestAnimationFrame(() => {
            bar.style.transition = 'width 0.3s ease-out, opacity 0.2s ease 0.2s'; 
            bar.style.width = '100%';
            bar.style.opacity = '0'; 
        });

        // Cleanup
        setTimeout(() => {
            if (bar.parentNode) bar.remove();
        }, 500); 
    }

    // --- 3. LOGIC (Updated for robust matching) ---
    function highlightActiveLink() {
        // Normalize current window path
        const currentPath = normalizePath(window.location.pathname) || "/";
        
        const links = document.querySelectorAll(CONFIG.linkSelector);
        links.forEach(l => l.classList.remove(CONFIG.activeClass));

        let matchFound = false;
        
        links.forEach(link => {
            if (matchFound) return;
            
            // Normalize link path
            const rawLinkPath = new URL(link.href, window.location.origin).pathname;
            const linkPath = normalizePath(rawLinkPath) || "/";

            // [FIX] Robust comparison
            if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
        });

        // Default to Home if no match
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