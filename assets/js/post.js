let postState = { page: 1, isLoading: false, hasMore: true, allCachedPosts: [], observer: null };

const CONFIG = {
    WORKER_API: "/api/feed", 
    FOR_YOU_API: window.TMP_CONFIG?.FOR_YOU_API || "/opinions/feed.json"
};

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

function handleGlobalTabClick(e) {
    const tab = e.target.closest('.feed-tab');
    if (!tab || tab.classList.contains('active')) return;

    document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const recentDiv = document.getElementById('recentPostsContainer');
    const forYouDiv = document.getElementById('forYouFeed');
    const searchDiv = document.getElementById('search-container');
    const isForYou = tab.dataset.feed === 'for-you';

    if (isForYou) {
        recentDiv.style.display = 'none';
        forYouDiv.style.display = 'block';
        if(searchDiv) searchDiv.style.display = 'none';
        if(forYouDiv.innerHTML.trim() === '') loadForYouPosts();
    } else {
        forYouDiv.style.display = 'none';
        recentDiv.style.display = 'block';
        if(searchDiv) searchDiv.style.display = 'block';
    }
}

async function setupPostPage() {
    const feedContainer = document.getElementById('recentPostsContainer');
    if (!feedContainer) return; 

    postState.page = 1; postState.hasMore = true; postState.isLoading = false;
    postState.allCachedPosts = []; feedContainer.innerHTML = ''; 

    document.removeEventListener('click', handleGlobalTabClick);
    document.addEventListener('click', handleGlobalTabClick);

    setupSearch();
    if (supabase) verifyWriterStatus();

    await fetchPosts(1);
    setupInfiniteScroll();
}

window.initPostPage = setupPostPage;

async function fetchPosts(page) {
    if (postState.isLoading || !postState.hasMore) return;
    
    postState.isLoading = true;
    const loader = document.getElementById('postsLoader');
    if(loader) loader.style.display = 'block';

    try {
        const res = await fetch(`${CONFIG.WORKER_API}?page=${page}`);
        if(!res.ok) throw new Error("API Fail");
        
        const data = await res.json();
        let newPosts = data.posts || []; 

        if (newPosts.length === 0) {
            postState.hasMore = false;
            if (page === 1) document.getElementById('recentPostsContainer').innerHTML = '<p style="text-align:center; padding:20px;">No posts found.</p>';
            return;
        }

        if (newPosts.length < 50) postState.hasMore = false; 

        postState.allCachedPosts = [...postState.allCachedPosts, ...newPosts];
        renderFeed(document.getElementById('recentPostsContainer'), newPosts, true);

    } catch(e) { 
        console.error("Feed Error:", e);
    } finally { 
        postState.isLoading = false;
        if(loader) loader.style.display = 'none';
    }
}

function renderFeed(container, posts, append = false) {
    if (!append) container.innerHTML = ''; 
    posts.forEach(p => {
        const el = document.createElement('div');
        el.className = 'user-post';
        
        let basePath = window.TMP_CONFIG?.postOpen || '/postopen';
        let link = (p.link && p.link !== '#') ? p.link : `${basePath}?id=${p.id}`;
        el.onclick = function() { window.location.href = link; };

        const imageHtml = p.image ? `<img src="${p.image}" class="post-image-preview" loading="lazy">` : '';

        el.innerHTML = `
            ${imageHtml}
            <h3 class="post-headline">${p.title || 'Untitled'}</h3>
            <div class="post-footer">
                <div class="post-info">
                    <span class="author">${p.author || 'Writer'}</span>
                    <span class="separator">•</span>
                    <span class="date">${new Date(p.date).toLocaleDateString()}</span>
                </div>
                <div class="read-full-action">Read Full <i class="fas fa-arrow-right"></i></div>
            </div>
        `;
        container.appendChild(el);
    });
}

function setupInfiniteScroll() {
    const container = document.getElementById('recentPostsContainer');
    let sentinel = document.getElementById('infinite-scroll-sentinel');
    if (!sentinel) {
        sentinel = document.createElement('div');
        sentinel.id = 'infinite-scroll-sentinel';
        sentinel.style.height = '20px';
        container.parentNode.appendChild(sentinel);
    }

    if (postState.observer) postState.observer.disconnect();

    postState.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && postState.hasMore && !postState.isLoading) {
            postState.page++;
            fetchPosts(postState.page);
        }
    }, { rootMargin: '200px' }); 

    postState.observer.observe(sentinel);
}

function setupSearch() {
    const searchInput = document.getElementById('tagSearchInput');
    if (searchInput) {
        const newSearch = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearch, searchInput);
        
        newSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const container = document.getElementById('recentPostsContainer');
            
            if(term) {
                const filtered = postState.allCachedPosts.filter(p => 
                    (p.title||'').toLowerCase().includes(term) || (p.author||'').toLowerCase().includes(term)
                );
                renderFeed(container, filtered, false); 
            } else {
                renderFeed(container, postState.allCachedPosts, false);
            }
        });
    }
}

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

async function loadForYouPosts() {
    const div = document.getElementById('forYouFeed');
    div.innerHTML = '<div class="loader" style="display:block;margin:20px auto"></div>';
    try {
        const res = await fetch(CONFIG.FOR_YOU_API);
        const posts = await res.json();
        renderFeed(div, posts, false);
    } catch(e) {
        div.innerHTML = '<p style="text-align:center">Unable to load curated stories.</p>';
    }
}

setupPostPage();
document.addEventListener('turbo:load', setupPostPage);