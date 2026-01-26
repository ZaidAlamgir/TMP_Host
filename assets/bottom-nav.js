(function() {
    // CONFIGURATION
    const CONFIG = {
        navId: 'bottom-nav',
        activeClass: 'active'
    };

    // --- 1. START LOADER (Triggers Trickle) ---
    function triggerLoader() {
        // A. Call Native Android "Trickle" Animation
        if (window.AndroidInterface && window.AndroidInterface.showLoadingAnimation) {
            window.AndroidInterface.showLoadingAnimation();
        }

        // B. Optional: Visual web fallback (your blue line)
        var header = document.querySelector('.header');
        if (!header) header = document.getElementsByTagName('header')[0];
        
        if (header) {
            var bar = document.getElementById('android_progress_bar');
            if (!bar) {
                bar = document.createElement('div');
                bar.id = 'android_progress_bar';
                bar.style.cssText = 'height:4px; width:0%; background-color:#0073e6; position:absolute; bottom:0; left:0; transition:width 0.2s ease, opacity 0.3s ease; z-index:9999;';
                var headerPos = window.getComputedStyle(header).position;
                if (headerPos === 'static') { header.style.position = 'relative'; }
                header.appendChild(bar);
            }
            void bar.offsetWidth; 
            bar.style.width = '20%';
            bar.style.opacity = '1';
        }
    }

    // --- 2. FINISH LOADER (Zips to 100%) ---
    function finishLoader() {
        // A. Call Native Android "Stop/Finish"
        if (window.AndroidInterface && window.AndroidInterface.stopLoadingAnimation) {
            window.AndroidInterface.stopLoadingAnimation();
        }

        // B. Finish Web Fallback
        var bar = document.getElementById('android_progress_bar');
        if (bar) {
            bar.style.width = '100%';
            setTimeout(function() {
                bar.style.opacity = '0';
                setTimeout(function() {
                    if (bar.parentNode) bar.parentNode.removeChild(bar);
                }, 300);
            }, 250);
        }
    }

    // --- 3. LOGIC ---
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
    }

    // CLICK LISTENER
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.bottom-nav-link');
        if (link) {
            triggerLoader(); // START TRICKLE
            document.querySelectorAll('.bottom-nav-link').forEach(l => l.classList.remove(CONFIG.activeClass));
            link.classList.add(CONFIG.activeClass);
        }
    });

    // TURBO LOAD LISTENER
    document.addEventListener('turbo:load', function() {
        highlightActiveLink();
        finishLoader(); // STOP TRICKLE
    });

    document.addEventListener('DOMContentLoaded', highlightActiveLink);
    window.addEventListener('popstate', highlightActiveLink);

})();