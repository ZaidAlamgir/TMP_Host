// =========================================
// 1. GLOBAL TAB CLICK HANDLER
// =========================================
function handleGlobalTabClick(e) {
    const tab = e.target.closest('.feed-tab');
    if (!tab) return; 

    // Prevent clicking if already active
    if (tab.classList.contains('active')) return;

    // UI Updates
    document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const recentDiv = document.getElementById('recentPostsContainer');
    const forYouDiv = document.getElementById('forYouFeed');
    const searchDiv = document.getElementById('search-container');
    const isForYou = tab.dataset.feed === 'for-you';

    // Smooth Switch Function (Fade)
    const switchFeed = (showDiv, hideDiv) => {
        if(hideDiv) {
            hideDiv.style.opacity = '0';
            setTimeout(() => {
                hideDiv.style.display = 'none';
                if(showDiv) {
                    showDiv.style.display = 'block';
                    // Trigger reflow to restart transition
                    void showDiv.offsetWidth; 
                    showDiv.style.opacity = '1';
                }
            }, 300);
        }
    };

    if (isForYou) {
        switchFeed(forYouDiv, recentDiv);
        if(searchDiv) searchDiv.style.display = 'none'; // Hide search
        
        // Load content if empty
        if(forYouDiv && forYouDiv.innerHTML.trim() === '') {
            if (window.triggerForYouLoad) window.triggerForYouLoad();
        }
    } else {
        switchFeed(recentDiv, forYouDiv);
        if(searchDiv) searchDiv.style.display = 'block'; // Show search
    }
}


// =========================================
// 2. MAIN SETUP FUNCTION
// =========================================
async function setupPostPage() {
    const feedContainer = document.getElementById('recentPostsContainer');
    // If not on post page, exit
    if (!feedContainer) {
        document.removeEventListener('click', handleGlobalTabClick);
        return; 
    }

    console.log("🚀 Post Page Loaded. Initializing...");

    // Store posts globally within this scope for real-time search
    let allCachedPosts = [];

    const CONFIG = {
        WORKER_API: window.TMP_CONFIG?.FEED_API_URL || "https://tmp-feed-api.zaidkhan137782.workers.dev",
        FOR_YOU_API: window.TMP_CONFIG?.FOR_YOU_API || "/opinions/feed.json"
    };

    // --- SETUP LISTENER ---
    document.removeEventListener('click', handleGlobalTabClick);
    document.addEventListener('click', handleGlobalTabClick);

    window.triggerForYouLoad = loadForYouPosts;

    // --- REAL-TIME SEARCH SETUP ---
    const searchInput = document.getElementById('tagSearchInput');
    // Remove old listeners to prevent duplicates (optional but safe)
    if (searchInput) {
        const newSearch = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearch, searchInput);
        
        newSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterAndRenderPosts(searchTerm);
        });
    }

    // --- INSTANT WRITER BUTTON ---
    const cachedRole = localStorage.getItem('tmp_user_role');
    if (cachedRole === 'writer') injectWriterButton();

    // --- SUPABASE SETUP ---
    let supabase;
    if (window.supabaseClient) {
        supabase = window.supabaseClient;
    } else if (window.supabase) {
        supabase = window.supabase.createClient(
            'https://yfrqnghduttudqbnodwr.supabase.co', 
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU'
        );
        window.supabaseClient = supabase;
    }

    // --- LOAD FEED (FIXED) ---
    // We ALWAYS fetch now to ensure 'allCachedPosts' is populated for the search bar.
    // The browser cache will handle repeated requests efficiently.
    const feedDiv = document.getElementById('postsFeed');
    if (feedDiv) {
        fetchRecentPosts();
    }

    if (supabase) verifyWriterStatus();

    // ================= HELPER FUNCTIONS =================

    async function verifyWriterStatus() {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
            if ((profile?.role || 'user') === 'writer') {
                localStorage.setItem('tmp_user_role', 'writer');
                injectWriterButton(); 
            } else {
                localStorage.removeItem('tmp_user_role');
                removeWriterButton();
            }
        }
    }

    function injectWriterButton() {
        const searchContainer = document.getElementById('search-container');
        if (searchContainer && !document.getElementById('writer-btn-force')) {
            const btn = document.createElement('a');
            btn.id = 'writer-btn-force';
            btn.href = window.TMP_CONFIG?.writePage || '/write';
            btn.innerHTML = '<b><i class="fas fa-pen"></i> Write Article</b>';
            btn.style.cssText = `display: block; width: 100%; text-align: center; background: linear-gradient(135deg, #0073e6, #005bb5); color: white; padding: 12px; border-radius: 8px; text-decoration: none; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); font-family: sans-serif;`;
            searchContainer.parentNode.insertBefore(btn, searchContainer);
        }
    }

    function removeWriterButton() {
        const btn = document.getElementById('writer-btn-force');
        if (btn) btn.remove();
    }

    async function fetchRecentPosts() {
        const feedDiv = document.getElementById('postsFeed');
        const loader = document.getElementById('postsLoader');
        if(loader) loader.style.display = 'block';
        
        try {
            const res = await fetch(CONFIG.WORKER_API);
            if(!res.ok) throw new Error("API Fail");
            
            const data = await res.json();
            
            // Normalize data
            let posts = [];
            if (data.posts && Array.isArray(data.posts)) {
                posts = data.posts;
            } else if (Array.isArray(data)) {
                posts = data;
            }
            
            // CRITICAL: Update the cache variable
            allCachedPosts = posts;

            // Render all
            renderFeed(feedDiv, allCachedPosts);

        } catch(e) { 
            console.error("Feed Error:", e);
            if(feedDiv && feedDiv.innerHTML === '') feedDiv.innerHTML = '<p style="text-align:center;color:red">Unable to load feed.</p>';
        } 
        finally { if(loader) loader.style.display = 'none'; }
    }

    function filterAndRenderPosts(term) {
        const feedDiv = document.getElementById('postsFeed');
        
        // If search is empty, show EVERYTHING
        if (!term || term === '') {
            renderFeed(feedDiv, allCachedPosts);
            return;
        }

        // Filter based on Title, Preview, or Author
        const filtered = allCachedPosts.filter(p => {
            const title = (p.title || '').toLowerCase();
            const preview = (p.preview || '').toLowerCase();
            const author = (p.author || '').toLowerCase();
            return title.includes(term) || preview.includes(term) || author.includes(term);
        });

        renderFeed(feedDiv, filtered);
    }
    
    function renderFeed(container, posts) {
        container.innerHTML = ''; 
        if(!posts.length) { 
            container.innerHTML = '<p style="text-align:center;padding:20px;color:#666">No results found.</p>'; 
            return; 
        }

        posts.forEach(p => {
            const el = document.createElement('div');
            el.className = 'user-post';
            
            // Link Logic
            let basePath = window.TMP_CONFIG?.postOpen || '/postopen';
            if (basePath.includes('{{')) basePath = '/postopen';
            
            let link = (p.link && p.link !== '#') ? p.link : `${basePath}?id=${p.id}`;

            el.onclick = function() { window.location.href = link; };

            const imageHtml = p.image 
                ? `<img src="${p.image}" class="post-image-preview" alt="Post Image">` 
                : '';

            el.innerHTML = `
                ${imageHtml}
                <h3 class="post-headline">${p.title || 'Untitled'}</h3>
                
                <div class="post-footer">
                    <div class="post-info">
                        <span class="author">${p.author || 'Writer'}</span>
                        <span class="separator">•</span>
                        <span class="date">${new Date(p.date).toLocaleDateString()}</span>
                    </div>
                    <div class="read-full-action">
                        Read Full <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            `;
            container.appendChild(el);
        });
    }

    async function loadForYouPosts() {
        const div = document.getElementById('forYouFeed');
        div.innerHTML = '<div class="loader" style="display:block;margin:20px auto"></div>';
        
        try {
            const res = await fetch(CONFIG.FOR_YOU_API);
            if (!res.ok) throw new Error("Feed not found");
            const posts = await res.json();
            div.innerHTML = '';
            
            if (posts.length === 0) {
                div.innerHTML = '<p style="text-align:center; padding:20px;">No curated stories yet.</p>';
                return;
            }

            posts.forEach(p => {
                const el = document.createElement('div');
                el.className = 'user-post';
                
                let basePath = window.TMP_CONFIG?.postOpen || '/postopen';
                if (basePath.includes('{{')) basePath = '/postopen';
                let link = p.url ? p.url : `${basePath}?id=${p.id}`;

                el.onclick = function() { window.location.href = link; };

                const imageHtml = p.image 
                    ? `<img src="${p.image}" class="post-image-preview" alt="Post Image">` 
                    : '';

                el.innerHTML = `
                    ${imageHtml}
                    <h3 class="post-headline">${p.title}</h3>
                    
                    <div class="post-footer">
                        <div class="post-info">
                            <span class="author">${p.author}</span>
                            <span class="separator">•</span>
                            <span class="date">${p.date}</span>
                        </div>
                        <div class="read-full-action">
                            Read Full <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                `;
                div.appendChild(el);
            });
        } catch(e) { 
            console.error("For You Feed Error:", e);
            div.innerHTML = '<p style="text-align:center">Unable to load articles.</p>'; 
        }
    }
}

setupPostPage();
document.addEventListener('turbo:load', setupPostPage);