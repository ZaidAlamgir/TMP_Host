(function() {
    // CONFIGURATION
    const CONFIG = {
        navId: 'bottom-nav',
        activeClass: 'active',
        feedUrl: 'https://data.tmpnews.com/feed.json'
    };

    // --- MANUAL LOADER TRIGGER ---
    function triggerLoader() {
        // UPDATED: Target the Header again (Previous Position)
        var header = document.querySelector('.header');
        if (!header) header = document.getElementsByTagName('header')[0];
        
        if (header) {
            var bar = document.getElementById('android_progress_bar');
            
            if (!bar) {
                bar = document.createElement('div');
                bar.id = 'android_progress_bar';
                
                // STYLE: height:4px, bottom:0
                bar.style.cssText = 'height:4px; width:0%; background-color:#0073e6; position:absolute; bottom:0; left:0; transition:width 0.2s ease; z-index:9999;';
                
                var headerPos = window.getComputedStyle(header).position;
                if (headerPos === 'static') { header.style.position = 'relative'; }
                
                header.appendChild(bar);
            }

            // Force repaint
            void bar.offsetWidth; 

            // Animate to 20%
            bar.style.width = '20%';
        }
    }

    // 1. GET ACTIVE LINK
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

    // 2. CLICK LISTENER (Instant Feedback)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.bottom-nav-link');
        if (link) {
            // 1. Show loader instantly on header
            triggerLoader(); 
            
            // 2. Change color instantly
            document.querySelectorAll('.bottom-nav-link').forEach(l => l.classList.remove(CONFIG.activeClass));
            link.classList.add(CONFIG.activeClass);
        }
    });

    // 3. INITIALIZE
    if (typeof Turbo !== 'undefined') {
        document.addEventListener('turbo:load', highlightActiveLink);
    } else {
        document.addEventListener('DOMContentLoaded', highlightActiveLink);
    }
    
    window.addEventListener('popstate', highlightActiveLink);

})();