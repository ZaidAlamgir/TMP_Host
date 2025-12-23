// =========================================
// 1. DEFINE THE TAB CLICK HANDLER GLOBALLY
// =========================================
// We define this OUTSIDE the setup function so it doesn't get duplicated.
function handleGlobalTabClick(e) {
    const tab = e.target.closest('.feed-tab');
    if (!tab) return; // Not a tab click? Ignore.

    console.log("👆 Tab Clicked:", tab.dataset.feed);

    // UI Updates
    document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Toggle Views
    const recentDiv = document.getElementById('recentPostsContainer');
    const forYouDiv = document.getElementById('forYouFeed');
    const searchDiv = document.getElementById('search-container');
    
    const isForYou = tab.dataset.feed === 'for-you';

    if (isForYou) {
        if(recentDiv) recentDiv.style.display = 'none';
        if(searchDiv) searchDiv.style.display = 'none';
        if(forYouDiv) {
            forYouDiv.style.display = 'block';
            // Only load content if it's empty
            if(forYouDiv.innerHTML.trim() === '') {
                // We need to trigger the load function. 
                // Since loadForYouPosts is inside the scope, we dispatch a custom event or call it if available.
                // Better approach: We rely on the setup function to trigger the load if needed, 
                // but for simplicity, we trigger a helper attached to window.
                if (window.triggerForYouLoad) window.triggerForYouLoad();
            }
        }
    } else {
        if(recentDiv) recentDiv.style.display = 'block';
        if(searchDiv) searchDiv.style.display = 'block';
        if(forYouDiv) forYouDiv.style.display = 'none';
    }
}


// =========================================
// 2. MAIN SETUP FUNCTION
// =========================================
async function setupPostPage() {
    const feedContainer = document.getElementById('recentPostsContainer');
    // If we are NOT on the post page, clean up and exit
    if (!feedContainer) {
        document.removeEventListener('click', handleGlobalTabClick);
        return; 
    }

    console.log("🚀 Post Page Loaded. Initializing...");

    // --- CONFIGURATION ---
    const CONFIG = {
        WORKER_API: window.TMP_CONFIG?.FEED_API_URL || "https://tmp-feed-api.zaidkhan137782.workers.dev",
        FOR_YOU_API: window.TMP_CONFIG?.FOR_YOU_API || "/opinions/feed.json"
    };

    // --- SETUP GLOBAL LISTENER ---
    // Remove first to ensure we never have duplicates
    document.removeEventListener('click', handleGlobalTabClick);
    document.addEventListener('click', handleGlobalTabClick);

    // --- EXPOSE FOR YOU LOADER ---
    // This allows the global click handler to call this function
    window.triggerForYouLoad = loadForYouPosts;

    // --- INSTANT WRITER BUTTON ---
    const cachedRole = localStorage.getItem('tmp_user_role');
    if (cachedRole === 'writer') injectWriterButton();

    // --- REUSE SUPABASE ---
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

    // --- LOAD DEFAULT FEED ---
    // Only fetch if the container is empty (prevents double fetch on back button)
    const feedDiv = document.getElementById('postsFeed');
    if (feedDiv && feedDiv.innerHTML.trim() === '') {
        fetchRecentPosts();
    }

    // --- BACKGROUND CHECKS ---
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
        } else {
            localStorage.removeItem('tmp_user_role');
            removeWriterButton();
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

    async function fetchRecentPosts(tags = []) {
        const feedDiv = document.getElementById('postsFeed');
        const loader = document.getElementById('postsLoader');
        if(loader) loader.style.display = 'block';
        
        try {
            const res = await fetch(CONFIG.WORKER_API);
            if(!res.ok) throw new Error("API Fail");
            let posts = await res.json();
            
            if (tags.length > 0) {
                const q = tags[0].toLowerCase();
                posts = posts.filter(p => (p.title + p.preview).toLowerCase().includes(q));
            }
            renderFeed(feedDiv, posts);
        } catch(e) { console.error(e); } 
        finally { if(loader) loader.style.display = 'none'; }
    }

    function renderFeed(container, posts) {
        container.innerHTML = ''; 
        if(!posts.length) { container.innerHTML = '<p style="text-align:center;padding:20px;color:#666">No active discussions.</p>'; return; }

        posts.forEach(p => {
            const el = document.createElement('div');
            el.className = 'user-post';
            const link = p.link ? p.link : `${window.TMP_CONFIG?.postOpen || '/postopen.html'}?id=${p.id}`;
            el.innerHTML = `
                <div class="post-content" onclick="window.location.href='${link}'" style="cursor:pointer">
                    <h3 style="margin:0 0 10px 0;font-size:18px;color:#1c1e21">${p.title||'Untitled'}</h3>
                    <p style="font-size:15px;color:#4b5563;margin:0">${p.preview||''}</p>
                </div>
                <div class="post-meta" style="display:flex;justify-content:space-between;margin-top:10px;font-size:12px;color:#666">
                    <span>${p.author||'Writer'} • ${p.qual||'Contributor'}</span>
                    <span>${new Date(p.date).toLocaleDateString()}</span>
                </div>`;
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
                const imgHtml = p.image ? `<img src="${p.image}" style="width:100%; height:180px; object-fit:cover; border-radius:8px; margin-bottom:10px;">` : '';
                el.innerHTML = `
                    ${imgHtml}
                    <h3 style="margin-bottom:5px;">${p.title}</h3>
                    <p style="color:#555; font-size:14px;">${p.preview}</p>
                    <div class="post-meta" style="margin-top:10px; font-size:12px; color:#888;">${p.author} • ${p.date}</div>
                    <a href="${p.url}" class="read-more-btn" style="color:#0073e6;text-decoration:none;font-weight:bold;margin-top:10px;display:block">Read Full Article</a>
                `;
                div.appendChild(el);
            });
        } catch(e) { 
            console.error("For You Feed Error:", e);
            div.innerHTML = '<p style="text-align:center">Unable to load articles.</p>'; 
        }
    }
}

// =========================================
// 3. RUN IMMEDIATELY + ON NAVIGATION
// =========================================

// Run immediately (This fixes the "First Click Frozen" bug)
setupPostPage();

// Run on future Turbo navigations
document.addEventListener('turbo:load', setupPostPage);