(function() {
    const CONFIG = {
        navId: 'bottom-nav',
        activeClass: 'active',
        feedUrl: 'https://data.tmpnews.com/feed.json'
    };

    function triggerLoader() {
        var header = document.querySelector('.header');
        if (!header) header = document.getElementsByTagName('header')[0];
        
        if (header) {
            var bar = document.getElementById('android_progress_bar');
            
            if (!bar) {
                bar = document.createElement('div');
                bar.id = 'android_progress_bar';
                bar.style.cssText = 'height:4px; width:0%; background-color:#0073e6; position:absolute; bottom:0; left:0; transition:width 0.2s ease; z-index:9999;';
                
                var headerPos = window.getComputedStyle(header).position;
                if (headerPos === 'static') { header.style.position = 'relative'; }
                
                header.appendChild(bar);
            }

            void bar.offsetWidth;
            bar.style.width = '20%';
        }
    }

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

    highlightActiveLink();
    if (window.tmpBottomNavInitialized) return;
    window.tmpBottomNavInitialized = true;
    document.addEventListener('turbo:load', highlightActiveLink);
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.bottom-nav-link');
        if (link) {
            triggerLoader(); 
        }
    });

})();