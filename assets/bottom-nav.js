(function() {
    // CONFIGURATION
    const CONFIG = {
        linkSelector: '.bottom-nav-link',
        activeClass: 'active',
        loaderId: 'android_progress_bar',
        headerSelector: '.header', 
        fallbackHeaderHeight: '51px' 
    };

    function normalizePath(path) {
        return path.replace(/\/$/, "").replace(/\.html$/, ""); 
    }

    // --- 1. LOADER START ---
    function startLoader() {
        // NEW FIX: If Android App handles it natively, trigger it and SKIP the web loader!
        if (window.AndroidInterface && window.AndroidInterface.showLoadingAnimation) {
            window.AndroidInterface.showLoadingAnimation();
            return; // 🛑 EXIT HERE: Prevents the double animation
        }

        let bar = document.getElementById(CONFIG.loaderId);
        const header = document.querySelector(CONFIG.headerSelector);
        
        // Prevent "Double Firing"
        if (bar && bar.style.opacity === '1') {
            return;
        }

        if (!bar) {
            bar = document.createElement('div');
            bar.id = CONFIG.loaderId;
            bar.setAttribute('data-turbo-permanent', 'true');
            if (header) {
                header.appendChild(bar); 
            } else {
                document.body.appendChild(bar);
            }
        }

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
            const headerStyle = window.getComputedStyle(header);
            if (headerStyle.position === 'static') {
                header.style.position = 'relative';
            }
        } else {
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

        void bar.offsetWidth; // Force browser to paint

        // Animate to 30% instantly
        requestAnimationFrame(() => {
            bar.style.transition = 'width 0.4s ease-out';
            bar.style.width = '30%';
        });

        // Trickle to 85% smoothly while waiting for network
        setTimeout(() => {
            if (bar && bar.parentNode) {
                bar.style.transition = 'width 4s cubic-bezier(0.1, 0.8, 0.3, 1)';
                bar.style.width = '85%';
            }
        }, 400);
    }

    // --- 2. LOADER FINISH ---
    function completeLoader() {
        // ALWAYS wake up the post page if needed
        if (window.initPostPage && document.getElementById('recentPostsContainer')) {
            window.initPostPage();
        }

        // NEW FIX: If Android App handles it natively, stop it and SKIP the web loader!
        if (window.AndroidInterface && window.AndroidInterface.stopLoadingAnimation) {
            window.AndroidInterface.stopLoadingAnimation();
            return; // 🛑 EXIT HERE: Prevents the double animation
        }

        let bar = document.getElementById(CONFIG.loaderId);
        let wasRecreated = false;

        // If Turbo wiped the bar out, recreate it with plenty of runway (60%)
        if (!bar) {
            bar = document.createElement('div');
            bar.id = CONFIG.loaderId;
            const header = document.querySelector(CONFIG.headerSelector);
            wasRecreated = true;
            
            if (header) {
                header.appendChild(bar);
                bar.style.cssText = `position: absolute; bottom: 0; left: 0; height: 3px; background-color: #0073e6; z-index: 9999; opacity: 1; pointer-events: none; transition: none; width: 60%;`;
            } else {
                document.body.appendChild(bar);
                bar.style.cssText = `position: fixed; top: ${CONFIG.fallbackHeaderHeight}; left: 0; height: 3px; background-color: #0073e6; z-index: 9999; opacity: 1; pointer-events: none; transition: none; width: 60%;`;
            }
        }

        void bar.offsetWidth; 

        // Wait a tiny moment to guarantee the browser painted the starting position
        setTimeout(() => {
            if (!bar) return;
            
            // Step 1: Smooth, visible push to 100% over half a second
            bar.style.transition = 'width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'; 
            bar.style.width = '100%';
            bar.style.opacity = '1'; 
            
            // Step 2: Wait until it completely hits the edge (500ms), THEN fade it out
            setTimeout(() => {
                if (bar) {
                    bar.style.transition = 'opacity 0.3s ease-out';
                    bar.style.opacity = '0'; 
                }
            }, 500);

            // Step 3: Cleanup and remove
            setTimeout(() => {
                if (bar && bar.parentNode) bar.remove();
            }, 800); 

        }, wasRecreated ? 20 : 0); 
    }

    // --- 3. LOGIC ---
    function highlightActiveLink() {
        const currentPath = normalizePath(window.location.pathname) || "/";
        const links = document.querySelectorAll(CONFIG.linkSelector);
        links.forEach(l => l.classList.remove(CONFIG.activeClass));

        let matchFound = false;

        const isArticlePage = currentPath.startsWith('/news/') && !currentPath.startsWith('/news/hub');
        
        if (isArticlePage) {
            const latestTab = document.getElementById('nav-articles') || document.querySelector(`${CONFIG.linkSelector}[href*="latest"]`);
            if (latestTab) {
                latestTab.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
        }
        
        if (!matchFound) {
            links.forEach(link => {
                if (matchFound) return;
                const rawLinkPath = new URL(link.href, window.location.origin).pathname;
                const linkPath = normalizePath(rawLinkPath) || "/";

                if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                    link.classList.add(CONFIG.activeClass);
                    matchFound = true;
                }
            });
        }

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