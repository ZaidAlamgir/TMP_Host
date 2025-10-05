// --- Enhanced Bottom Navigation (All-in-One Script) ---

// This single script creates the HTML, injects the CSS, and handles all the animation logic.
// It automatically adds padding to the body to prevent content from being hidden and fixes animation glitches.

(function() {
    // 1. CREATE AND INJECT THE CSS STYLES
    const styles = `
        /* --- Bottom Navigation Styles --- */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 65px;
            background-color: #ffffff;
            /* UPDATED: Switched to grid for precise centering */
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            align-items: center;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
            z-index: 1000;
            border-radius: 15px 15px 0 0;
            overflow: hidden;
        }

        .bottom-nav-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #8e8e8e;
            font-size: 12px;
            font-weight: 500;
            height: 100%;
            position: relative;
            z-index: 1;
            transition: color 0.3s ease;
        }

        /* NEW: Icon size reduced slightly for a cleaner look */
        .bottom-nav-link svg {
            width: 22px;  /* Was 24px */
            height: 22px; /* Was 24px */
            margin-bottom: 4px;
            transition: stroke 0.3s ease;
        }

        .bottom-nav-link.active {
            color: #0073e6;
        }
        
        .bottom-nav-link.active svg {
            stroke: #0073e6;
        }
        
        .bottom-nav-link:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
        }
        
        /* NEW: Use order property to visually rearrange items */
        #nav-live { order: 1; }
        #nav-news-hub { order: 2; }
        #nav-home { order: 3; } /* Center item */
        #nav-articles { order: 4; }
        #nav-post { order: 5; }

        /* --- Animated Glider --- */
        .nav-glider {
            position: absolute;
            top: 50%;
            left: 0;
            height: 40px;
            width: 60px; /* Will be set by JS */
            background-color: #e7f3ff;
            border-radius: 20px;
            transform: translateY(-50%);
            z-index: 0;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. CREATE THE HTML STRUCTURE (Order updated for logical flow)
    const navHTML = `
        <nav class="bottom-nav" id="bottom-nav">
            <div class="nav-glider"></div>
            <a href="live.html" class="bottom-nav-link" id="nav-live">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>
                <span>Live</span>
            </a>
            <a href="news-hub.html" class="bottom-nav-link" id="nav-news-hub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span>News Hub</span>
            </a>
            <a href="index.html" class="bottom-nav-link" id="nav-home">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span>Home</span>
            </a>
            <a href="latest.html" class="bottom-nav-link" id="nav-articles">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                <span>Latest</span>
            </a>
            <a href="post.html" class="bottom-nav-link" id="nav-post">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                <span>Post</span>
            </a>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('beforeend', navHTML);

    // 3. ATTACH THE JAVASCRIPT LOGIC
    function initializeNav() {
        const bottomNav = document.getElementById('bottom-nav');
        if (!bottomNav) return;
        
        const navHeight = bottomNav.offsetHeight;
        document.body.style.paddingBottom = `${navHeight + 15}px`;

        const navLinks = bottomNav.querySelectorAll('.bottom-nav-link');
        const glider = bottomNav.querySelector('.nav-glider');

        const pageMap = {
            '': 'index.html',
            'index.html': 'index.html',
            'live.html': 'live.html', 
            'news-hub.html': 'news-hub.html',
            'latest.html': 'latest.html',
            'post.html': 'post.html'
        };

        function setActiveLink() {
            const path = window.location.pathname.split("/").pop();
            const activePage = pageMap[path] || 'index.html'; 
            let activeLinkElement = null;

            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href').split("/").pop();
                link.classList.remove('active');
                if (linkPath === activePage) {
                    activeLinkElement = link;
                }
            });

            if (activeLinkElement) {
                activeLinkElement.classList.add('active');
                
                const linkRect = activeLinkElement.getBoundingClientRect();
                const navRect = bottomNav.getBoundingClientRect();
                glider.style.width = `${linkRect.width * 0.8}px`;
                glider.style.left = `${linkRect.left - navRect.left + (linkRect.width * 0.1)}px`;
            }
        }

        setActiveLink();
        window.addEventListener('resize', setActiveLink);

        setTimeout(() => {
            glider.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        }, 50);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNav);
    } else {
        initializeNav();
    }

})();