---
layout: default
title: Live Updates
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
    .live-container { max-width: 1440px; margin: 0 auto; padding: 0 1rem 4rem 1rem; }
    .live-header { text-align: center; margin-bottom: 2.5rem; }
    .live-post { background-color: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin: 0 auto 2rem auto; max-width: 800px; }
    .live-post-content { padding: 1.5rem; }
    .new-post-animation { animation: fadeInSlideDown 0.7s ease-out forwards; }
    @keyframes fadeInSlideDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
    .live-post-headline { font-size: 1.75rem; font-weight: 800; color: #111827; margin-bottom: 0.75rem; line-height: 1.2; }
    .live-post-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; font-size: 0.875rem; color: #4b5563; }
    .live-post-author { font-weight: 600; }
    .live-post-time { font-weight: 600; color: #ef4444; }
    .live-indicator { display: flex; align-items: center; gap: 0.5rem; }
    .live-indicator .dot { width: 10px; height: 10px; background-color: #ef4444; border-radius: 50%; box-shadow: 0 0 8px 2px #ef4444; animation: glow 1.5s infinite ease-in-out; }
    @keyframes glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .post-body p { font-size: 1.05rem; line-height: 1.7; color: #374151; margin-bottom: 1rem; }
    .post-body img { max-width: 100%; border-radius: 8px; margin: 1.25rem 0 0.25rem 0; }
    .post-body blockquote { font-style: italic; color: #4b5563; border-left: 3px solid #d1d5db; padding-left: 1.5rem; margin: 1.5rem 0; font-size: 1.1rem; }
    .post-body .media-caption { text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; font-style: italic; }
    .tags-container { margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag-badge { background-color: #eef2ff; color: #4338ca; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-decoration: none; }
    .tag-badge:hover { background-color: #e0e7ff; }
    .post-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; }
    .share-btn { background-color: #f3f4f6; border: none; border-radius: 999px; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
    .share-btn:hover { background-color: #e5e7eb; transform: translateY(-1px); }
    .post-stats { display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; color: #6b7280; }
    #load-more-btn { background-color: #1f2937; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease; }
    #load-more-btn:disabled { background-color: #9ca3af; cursor: not-allowed; }

    /* NEW: Pinned Post Styles */
    .live-post.is-pinned { border: 2px solid #f59e0b; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.2); }
    .pinned-badge { color: #b45309; background-color: #fef3c7; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.25rem; }
    
    /* NEW: Partial View Styles */
    .partial-view { max-height: 65vh; overflow: hidden; position: relative; }
    .fade-overlay { position: absolute; bottom: 0; left: 0; right: 0; height: 150px; background: linear-gradient(to bottom, transparent, white); pointer-events: none; }
    .read-full-btn { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: #1f2937; color: white; padding: 10px 20px; border-radius: 999px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
</style>

<div id="header-placeholder"></div>

<div class="live-container">
    <header class="live-header py-8">
        <h1 class="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
            Live Coverage
            <div class="live-indicator"><div class="dot"></div></div>
        </h1>
    </header>

    <div id="pinned-post-container"></div>
    <div id="live-feed"></div>
    <div class="text-center mt-8"><button id="load-more-btn">Read More</button></div>
</div>

<div id="bottom-nav-placeholder"></div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="{{ '/assets/header-injector.js' | relative_url }}"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const { createClient } = supabase;
        // --- CONFIGURATION ---
        const SUPABASE_URL = 'https://ofszjurrajwtbwlfckhi.supabase.co';       // <-- PASTE YOUR NEW 'LIVE' PROJECT URL
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mc3pqdXJyYWp3dGJ3bGZja2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDk2MzgsImV4cCI6MjA3NDk4NTYzOH0.kKafp8dEL7V0Y10-oNbjluYblA03a0V_OqB9XOBd9SA'; // <-- PASTE YOUR NEW 'LIVE' PROJECT ANON KEY
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const pinnedPostContainer = document.getElementById('pinned-post-container');
        const liveFeed = document.getElementById('live-feed');
        const loadMoreBtn = document.getElementById('load-more-btn');
        let loadedPosts = 0;
        const INITIAL_LOAD_COUNT = 20;
        const SUBSEQUENT_LOAD_COUNT = 10;
        const viewedPosts = new Set(JSON.parse(sessionStorage.getItem('viewedLivePosts') || '[]'));

        function parseContent(content) { /* ... same as previous ... */ }
        function loadSocialScripts() { /* ... same as previous ... */ }
        async function incrementViewCount(postId) { /* ... same as previous ... */ }

        function applyTruncation(postElement) {
            if (window.innerWidth >= 768) return;
            const content = postElement.querySelector('.live-post-content');
            if (content.scrollHeight > window.innerHeight * 0.65 && !content.querySelector('.read-full-btn')) {
                content.classList.add('partial-view');
                const fade = document.createElement('div');
                fade.className = 'fade-overlay';
                const readMore = document.createElement('button');
                readMore.className = 'read-full-btn';
                readMore.textContent = 'Read Full Update';
                content.appendChild(fade);
                content.appendChild(readMore);

                readMore.addEventListener('click', (e) => {
                    e.stopPropagation();
                    content.classList.remove('partial-view');
                    fade.remove();
                    readMore.remove();
                });
            }
        }

        function renderPost(postData, container, insertAtTop = false) {
            const postElement = document.createElement('div');
            postElement.className = 'live-post';
            postElement.id = `post-${postData.id}`;
            if (insertAtTop) postElement.classList.add('new-post-animation');

            if (postData.is_pinned) postElement.classList.add('is-pinned');

            let tagsHTML = postData.tags?.length > 0 ? '<div class="tags-container">' + postData.tags.map(tag => `<a href="#" class="tag-badge">#${tag}</a>`).join('') + '</div>' : '';
            let pinnedBadgeHTML = postData.is_pinned ? `<span class="pinned-badge"><i class="fas fa-thumbtack fa-xs"></i><span class="ml-1.5">PINNED</span></span>` : '';
            
            postElement.innerHTML = `
                <div class="live-post-content p-4 md:p-6">
                    <div class="live-post-meta">
                         <span class="live-post-time">${new Date(postData.timestamp).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</span>
                         <span class="live-post-author">By ${postData.author_name}</span>
                         ${pinnedBadgeHTML}
                    </div>
                    <h2 class="live-post-headline">${postData.headline || ''}</h2>
                    ${tagsHTML} 
                    <div class="post-body pt-4"><p>${parseContent(postData.content)}</p></div>
                    <div class="post-footer">
                        <div class="post-stats"><i class="fas fa-eye"></i><span>${postData.view_count || 0}</span></div>
                        <button class="share-btn" data-post-id="${postData.id}" data-post-headline="${postData.headline || 'Live Update'}"><i class="fas fa-share-alt mr-2"></i>Share</button>
                    </div>
                </div>`;

            if (insertAtTop) { container.prepend(postElement); } else { container.appendChild(postElement); }
            incrementViewCount(postData.id);
            setTimeout(() => {
                loadSocialScripts();
                applyTruncation(postElement);
            }, 100);
        }

        async function fetchInitialPosts() {
            // 1. Fetch Pinned Post
            const { data: pinnedData } = await supabaseClient.from('live_posts').select('*').eq('is_pinned', true).limit(1);
            
            pinnedPostContainer.innerHTML = '';
            if (pinnedData && pinnedData.length > 0) {
                renderPost(pinnedData[0], pinnedPostContainer, false);
            }

            // 2. Fetch Regular Posts
            await loadMorePosts(true); // Pass true for initial load
        }

        async function loadMorePosts(isInitial = false) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'Loading...';

            if (isInitial) loadedPosts = 0;
            const limit = isInitial ? INITIAL_LOAD_COUNT : SUBSEQUENT_LOAD_COUNT;

            const { data, error } = await supabaseClient.from('live_posts').select('*').eq('is_pinned', false).order('timestamp', { ascending: false }).range(loadedPosts, loadedPosts + limit - 1);
            if (error) { loadMoreBtn.textContent = 'Failed to load'; return; }
            
            if (isInitial) liveFeed.innerHTML = '';
            data.forEach(post => renderPost(post, liveFeed, false));
            loadedPosts += data.length;

            if (data.length < limit) {
                loadMoreBtn.textContent = 'No more updates';
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.disabled = false;
                loadMoreBtn.textContent = 'Read More';
            }
        }

        liveFeed.addEventListener('click', (e) => { /* ... same as previous ... */ });
        pinnedPostContainer.addEventListener('click', (e) => { /* ... same as previous ... */ });
        
        supabaseClient.channel('public:live_posts').on('postgres_changes', { event: '*', schema: 'public', table: 'live_posts' }, (payload) => {
            console.log('Realtime change received!', payload);
            fetchInitialPosts(); // Easiest way to handle all cases (pin, unpin, new) is to just refetch
        }).subscribe();
        
        loadMoreBtn.addEventListener('click', () => loadMorePosts(false));
        fetchInitialPosts();

        // Full function definitions
        function parseContent(content) {
            content = content.replace(/\[(twitter|instagram)\|?(.*?)\]\((.*?)\)/g, (match, type, desc, url) => {
                let blockquote = '';
                const caption = desc ? `<p class="media-caption">${desc}</p>` : '';
                if (type === 'twitter') { blockquote = `<div class="my-4"><blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><a href="${url}"></a></blockquote>${caption}</div>`; } 
                else if (type === 'instagram') { blockquote = `<div class="my-4"><blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14"></blockquote>${caption}</div>`; }
                return blockquote;
            });
            return content.replace(/!\[(.*?)\]\((.*?)\)/g, `<div><img src="$2" alt="$1" class="my-4 rounded-lg"><p class="media-caption">$1</p></div>`).replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
        }
        function loadSocialScripts() {
            if (window.twttr?.widgets) { window.twttr.widgets.load(document.getElementById('live-feed')); window.twttr.widgets.load(document.getElementById('pinned-post-container')); } else if (document.querySelector('.twitter-tweet') && !document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) { const script = document.createElement('script'); script.src = "https://platform.twitter.com/widgets.js"; script.async = true; document.body.appendChild(script); }
            if (window.instgrm?.Embeds) { window.instgrm.Embeds.process(); } else if (document.querySelector('.instagram-media') && !document.querySelector('script[src="//www.instagram.com/embed.js"]')) { const script = document.createElement('script'); script.src = "//www.instagram.com/embed.js"; script.async = true; document.body.appendChild(script); }
        }
        async function incrementViewCount(postId) { if (viewedPosts.has(postId)) return; viewedPosts.add(postId); sessionStorage.setItem('viewedLivePosts', JSON.stringify(Array.from(viewedPosts))); await supabaseClient.rpc('increment_post_view_count', { post_id_to_inc: postId }); }
        
        const shareHandler = (e) => {
             const shareBtn = e.target.closest('.share-btn');
            if (shareBtn) {
                const postId = shareBtn.dataset.postId;
                const postHeadline = shareBtn.dataset.postHeadline;
                const postUrl = `${window.location.origin}${window.location.pathname}#post-${postId}`;
                const shareData = { title: postHeadline, text: `Live Update: ${postHeadline}`, url: postUrl, };
                if (navigator.share) { navigator.share(shareData); } else { alert(`Share this link:\n${postUrl}`); }
            }
        };
        liveFeed.addEventListener('click', shareHandler);
        pinnedPostContainer.addEventListener('click', shareHandler);
    });
</script>