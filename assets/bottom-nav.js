(function() {
    // CONFIGURATION
    const CONFIG = {
        navId: 'bottom-nav',
        gliderClass: 'nav-glider',
        activeClass: 'active',
        localStorageKey: 'prefetchedLiveFeed',
        feedUrl: 'https://data.tmpnews.com/feed.json'
    };

    // --- NEW: MANUAL LOADER TRIGGER (INSTANT FEEDBACK) ---
    function triggerLoader() {
        var header = document.querySelector('.header');
        // Fallback to header tag if class not found
        if (!header) header = document.getElementsByTagName('header')[0];
        
        if (header) {
            var bar = document.getElementById('android_progress_bar');
            
            // If bar doesn't exist, create it (Just like Android Code)
            if (!bar) {
                bar = document.createElement('div');
                bar.id = 'android_progress_bar';
                // EXACT SAME STYLE AS KOTLIN CODE:
                bar.style.cssText = 'height:6px; width:0%; background-color:#0073e6; position:absolute; bottom:0; left:0; transition:width 0.2s ease; z-index:9999; box-shadow: 0px -2px 6px rgba(0,115,230,0.5);';
                
                var headerPos = window.getComputedStyle(header).position;
                if (headerPos === 'static') { header.style.position = 'relative'; }
                header.appendChild(bar);
            }

            // Force browser repaint
            void bar.offsetWidth; 

            // Animate to 20% immediately to show "Processing"
            // The Android WebChromeClient will take over updating this value as data arrives
            bar.style.width = '20%';
        }
    }

    // 1. GET ACTIVE LINK BASED ON URL
    function highlightActiveLink() {
        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
        const links = document.querySelectorAll('.bottom-nav-link');
        let matchFound = false;

        links.forEach(l => l.classList.remove(CONFIG.activeClass));

        links.forEach(link => {
            if (matchFound) return;
            const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
            
            if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add(CONFIG.activeClass);
                matchFound = true;
            }
        });

        if (!matchFound) {
             const homeLink = document.getElementById('nav-home');
             if (homeLink) homeLink.classList.add(CONFIG.activeClass);
        }

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

            const relativeLeft = linkRect.left - navRect.left;
            const newWidth = linkRect.width * 0.7; 
            const offset = (linkRect.width - newWidth) / 2; 

            glider.style.width = `${newWidth}px`;
            glider.style.left = `${relativeLeft + offset}px`;
            glider.style.opacity = '1';

            if (isInitialLoad) {
                glider.classList.remove('ready'); 
                void glider.offsetWidth; 
                
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
            // 1. Trigger the visual loader immediately
            triggerLoader();

            // 2. Update Bottom Nav UI
            document.querySelectorAll('.bottom-nav-link').forEach(l => l.classList.remove(CONFIG.activeClass));
            link.classList.add(CONFIG.activeClass);
            updateGlider(false); 
        }
    });

    // 4. INITIALIZE
    if (typeof Turbo !== 'undefined') {
        document.addEventListener('turbo:load', highlightActiveLink);
    } else {
        document.addEventListener('DOMContentLoaded', highlightActiveLink);
    }
    
    window.addEventListener('popstate', highlightActiveLink);

})();