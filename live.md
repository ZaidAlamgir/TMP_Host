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
    .post-body { text-align: center; } 
    .post-body > * { text-align: left; margin-left: auto; margin-right: auto; }
    .post-body .my-4 { margin-top: 1rem; margin-bottom: 1rem; }
    .live-post-headline { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 1rem; line-height: 1.2; }
    .live-post-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; font-size: 0.875rem; color: #4b5563; }
    .live-post-author { font-weight: 600; }
    .live-post-time { font-weight: 600; color: #ef4444; }
    .live-indicator { display: flex; align-items: center; gap: 0.5rem; }
    .live-indicator .dot { width: 10px; height: 10px; background-color: #ef4444; border-radius: 50%; box-shadow: 0 0 8px 2px #ef4444; animation: glow 1.5s infinite ease-in-out; }
    .post-body p { font-size: 1.125rem; line-height: 1.7; color: #374151; margin-bottom: 1.25rem; }
    .post-body img { max-width: 100%; border-radius: 8px; margin-bottom: 0.25rem; }
    .post-body blockquote { font-style: italic; color: #4b5563; border-left: 3px solid #d1d5db; padding-left: 1.5rem; margin: 1.5rem 0; font-size: 1.1rem; }
    .post-body .media-caption { text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; padding-bottom: 1rem; font-style: italic; }
    .tags-container { margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag-badge { background-color: #eef2ff; color: #4338ca; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-decoration: none; }
    .post-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; }
    .share-btn { background-color: #f3f4f6; border: none; border-radius: 999px; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; }
    .post-stats { display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; color: #6b7280; }
    .professional-btn { background-color: #1f2937; color: white; padding: 12px 28px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; font-size: 1rem; }
    .live-post.is-pinned { border: 2px solid #f59e0b; }
    .pinned-badge { color: #b45309; background-color: #fef3c7; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.25rem; }
    .responsive-iframe-container { position: relative; overflow: hidden; width: 100%; max-width: 550px; margin: 1rem auto; }
    .responsive-iframe-container-16x9 { padding-top: 56.25%; }
    .responsive-iframe-container iframe { position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%; border: none; }
    .instagram-video-container { position: relative; padding-bottom: 125%; height: 0; overflow: hidden; max-width: 500px; margin: 1rem auto; border-radius: 8px; }
    .instagram-video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>

<div id="fb-root"></div>

<div class="live-container">
    <header class="live-header py-8">
        <h1 class="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">Live Coverage <div class="live-indicator"><div class="dot"></div></div></h1>
    </header>

    <div id="pinned-post-container"></div>
    <div id="live-feed"></div>
    
    <div id="feed-controls" class="text-center mt-8">
        <button id="load-more-btn" class="professional-btn">Load Previous Updates</button>
        <a href="https://archive-live.tmpnews.com" id="archive-btn" class="professional-btn" style="display: none;">Check Archive History</a>
        <p id="no-more-posts-msg" class="text-gray-500 font-medium py-3" style="display: none;">This is the end. No more updates.</p>
    </div>
</div>

<div id="bottom-nav-placeholder"></div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
{% raw %}
    document.addEventListener('DOMContentLoaded', () => {
        const { createClient } = supabase;
        const SUPABASE_URL = 'https://ofszjurrajwtbwlfckhi.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mc3pqdXJyYWp3dGJ3bGZja2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDk2MzgsImV4cCI6MjA3NDk4NTYzOH0.kKafp8dEL7V0Y10-oNbjluYblA03a0V_OqB9XOBd9SA';
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const pinnedPostContainer = document.getElementById('pinned-post-container');
        const liveFeed = document.getElementById('live-feed');
        
        // --- FIX: Re-added the missing variable definitions ---
        const loadMoreBtn = document.getElementById('load-more-btn');
        const archiveBtn = document.getElementById('archive-btn');
        const noMorePostsMsg = document.getElementById('no-more-posts-msg');
        
        let loadedPosts = 0;
        const INITIAL_LOAD_COUNT = 20;
        const SUBSEQUENT_LOAD_COUNT = 10;
        const ARCHIVE_THRESHOLD = 250;
        const viewedPosts = new Set(JSON.parse(sessionStorage.getItem('viewedLivePosts') || '[]'));
        
        function parseContent(content) {
            if (!content) return '';
            const placeholders = [];
            let tempContent = content;
            const allKeywords = 'twitter-video|twitter|instagram-video|instagram|facebook|youtube|tiktok|linkedin|reddit|telegram';
            const regex = new RegExp(`\\[(${allKeywords})\\|?(.*?)\\]\\((.*?)\\)|!\\[(.*?)\]\\((.*?)\\)`, 'g');

            tempContent = tempContent.replace(regex, (match, socialType, socialDesc, socialUrl, imgAlt, imgUrl) => {
                let htmlBlock = '';
                const caption = socialDesc ? `<p class="media-caption">${socialDesc}</p>` : '';
                if (socialType) {
                    switch (socialType) {
                        case 'twitter':
                            const twitterUrl = socialUrl.replace('x.com', 'twitter.com');
                            htmlBlock = `<div class="my-4"><blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><a href="${twitterUrl}"></a></blockquote>${caption}</div>`;
                            break;
                        case 'twitter-video':
                            const twitterVideoUrl = socialUrl.replace('x.com', 'twitter.com');
                            htmlBlock = `<div class="my-4"><blockquote class="twitter-tweet" data-dnt="true" data-theme="light" data-conversation="none"><a href="${twitterVideoUrl}"></a></blockquote>${caption}</div>`;
                            break;
                        case 'instagram':
                            htmlBlock = `<div class="my-4"><blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${socialUrl}" data-instgrm-version="14"></blockquote>${caption}</div>`;
                            break;
                        case 'instagram-video':
                            const igMatch = socialUrl.match(/\/(p|reel)\/([a-zA-Z0-9_-]+)/);
                            if (igMatch && igMatch[2]) {
                                htmlBlock = `<div class="instagram-video-container my-4"><iframe src="https://www.instagram.com/p/${igMatch[2]}/embed" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>${caption}`;
                            } else {
                                htmlBlock = `<div class="my-4"><blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${socialUrl}" data-instgrm-version="14"></blockquote>${caption}</div>`;
                            }
                            break;
                        case 'facebook':
                            htmlBlock = `<div class="my-4"><div class="fb-post" data-href="${socialUrl}" data-width="auto" data-show-text="true"></div>${caption}</div>`;
                            break;
                        case 'youtube':
                            const ytMatch = socialUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                            if (ytMatch && ytMatch[1]) {
                                htmlBlock = `<div class="responsive-iframe-container responsive-iframe-container-16x9 my-4"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" allowfullscreen></iframe></div>${caption}`;
                            }
                            break;
                        case 'tiktok':
                            htmlBlock = `<div class="my-4"><blockquote class="tiktok-embed" cite="${socialUrl}" data-embed-from="embed_page"> <section></section> </blockquote>${caption}</div>`;
                            break;
                        case 'linkedin':
                            htmlBlock = `<div class="my-4"><div class="linkedin-post" data-href="${socialUrl}"></div>${caption}</div>`;
                            break;
                        case 'reddit':
                            htmlBlock = `<div class="my-4"><blockquote class="reddit-embed-bq" data-embed-height="500"><a href="${socialUrl}">Post</a></blockquote>${caption}</div>`;
                            break;
                        case 'telegram':
                             const tgMatch = socialUrl.match(/t\.me\/([a-zA-Z0-9_]+\/\d+)/);
                             if (tgMatch && tgMatch[1]) {
                                htmlBlock = `<div class="my-4"><blockquote class="telegram-post" data-post="${tgMatch[1]}" data-width="100%"></blockquote>${caption}</div>`;
                             }
                             break;
                    }
                } else {
                    const captionHTML = (imgAlt && imgAlt.toLowerCase() !== 'image' && imgAlt.trim() !== '') ? `<p class="media-caption">${imgAlt}</p>` : '';
                    htmlBlock = `<div class="my-4"><img src="${imgUrl}" alt="${imgAlt || ''}" class="my-0 mx-auto rounded-lg">${captionHTML}</div>`;
                }
                placeholders.push(htmlBlock);
                return `__PLACEHOLDER_${placeholders.length - 1}__`;
            });

            const processedText = tempContent.split('\n\n').map(p => {
                if (p.startsWith('__PLACEHOLDER_')) return p;
                if (p.trim() === '') return '';
                return `<p>${p.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>').replace(/\n/g, '<br>')}</p>`;
            }).join('');
            return processedText.replace(/__PLACEHOLDER_(\d+)__/g, (match, index) => placeholders[parseInt(index, 10)]);
        }

        function loadSocialScripts() {
            const scripts = {
                twitter: 'https://platform.twitter.com/widgets.js',
                instagram: '//www.instagram.com/embed.js',
                facebook: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0',
                tiktok: 'https://www.tiktok.com/embed.js',
                reddit: 'https://embed.reddit.com/widgets.js',
                telegram: 'https://telegram.org/js/telegram-widget.js?22',
                linkedin: 'https://platform.linkedin.com/Voyager/js/posts/embed.js'
            };
            if (document.querySelector('.twitter-tweet') && !document.querySelector(`script[src="${scripts.twitter}"]`)) { const s = document.createElement('script'); s.src = scripts.twitter; s.async = true; document.body.appendChild(s); }
            if (document.querySelector('.instagram-media') && !document.querySelector(`script[src="${scripts.instagram}"]`)) { const s = document.createElement('script'); s.src = scripts.instagram; s.async = true; document.body.appendChild(s); }
            if (document.querySelector('.fb-post') && !document.querySelector(`script[src*="connect.facebook.net"]`)) { const s = document.createElement('script'); s.src = scripts.facebook; s.async = true; s.defer=true; s.crossOrigin="anonymous"; document.body.appendChild(s); }
            if (document.querySelector('.tiktok-embed') && !document.querySelector(`script[src="${scripts.tiktok}"]`)) { const s = document.createElement('script'); s.src = scripts.tiktok; s.async = true; document.body.appendChild(s); }
            if (document.querySelector('.reddit-embed-bq') && !document.querySelector(`script[src="${scripts.reddit}"]`)) { const s = document.createElement('script'); s.src = scripts.reddit; s.async = true; s.charset="UTF-8"; document.body.appendChild(s); }
            if (document.querySelector('.telegram-post') && !document.querySelector(`script[src="${scripts.telegram}"]`)) { const s = document.createElement('script'); s.src = scripts.telegram; s.async = true; document.body.appendChild(s); }
            if (document.querySelector('.linkedin-post') && !document.querySelector(`script[src="${scripts.linkedin}"]`)) { const s = document.createElement('script'); s.src = scripts.linkedin; s.async = true; document.body.appendChild(s); }

            if (window.twttr?.widgets) window.twttr.widgets.load();
            if (window.instgrm?.Embeds) window.instgrm.Embeds.process();
            if (window.FB?.XFBML) window.FB.XFBML.parse();
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
                    <div class="post-body pt-4">${parseContent(postData.content)}</div>
                    <div class="post-footer">
                        <div class="post-stats"><i class="fas fa-eye"></i><span>${postData.view_count || 0}</span></div>
                        <button class="share-btn" data-post-id="${postData.id}" data-post-headline="${postData.headline || 'Live Update'}"><i class="fas fa-share-alt mr-2"></i>Share</button>
                    </div>
                </div>`;
            if (insertAtTop) { container.prepend(postElement); } else { container.appendChild(postElement); }
            incrementViewCount(postData.id);
            setTimeout(() => { loadSocialScripts(); }, 100);
        }
        
        async function fetchInitialPosts() {
            const { data: pinnedData } = await supabaseClient.from('live_posts').select('*').eq('is_pinned', true).limit(1);
            pinnedPostContainer.innerHTML = '';
            if (pinnedData && pinnedData.length > 0) renderPost(pinnedData[0], pinnedPostContainer, false);
            await loadMorePosts(true);
        }

        async function loadMorePosts(isInitial = false) {
            loadMoreBtn.disabled = true; loadMoreBtn.textContent = 'Loading...';
            if (isInitial) loadedPosts = 0;
            const limit = isInitial ? INITIAL_LOAD_COUNT : SUBSEQUENT_LOAD_COUNT;
            const { data, error } = await supabaseClient.from('live_posts').select('*').eq('is_pinned', false).order('timestamp', { ascending: false }).range(loadedPosts, loadedPosts + limit - 1);
            if (error) { console.error("Supabase fetch error:", error); loadMoreBtn.textContent = 'Failed to load'; loadMoreBtn.disabled = false; return; }
            if (isInitial) liveFeed.innerHTML = '';
            data.forEach(post => renderPost(post, liveFeed, false));
            loadedPosts += data.length;
            if (data.length < limit) {
                loadMoreBtn.style.display = 'none'; archiveBtn.style.display = 'none'; noMorePostsMsg.style.display = 'block';
            } else if (loadedPosts >= ARCHIVE_THRESHOLD) {
                loadMoreBtn.style.display = 'none'; archiveBtn.style.display = 'inline-block'; noMorePostsMsg.style.display = 'none';
            } else {
                loadMoreBtn.disabled = false; loadMoreBtn.textContent = 'Load Previous Updates'; loadMoreBtn.style.display = 'inline-block'; archiveBtn.style.display = 'none'; noMorePostsMsg.style.display = 'none';
            }
        }
        
        async function incrementViewCount(postId) {
            if (viewedPosts.has(postId)) return;
            viewedPosts.add(postId);
            sessionStorage.setItem('viewedLivePosts', JSON.stringify(Array.from(viewedPosts)));
            await supabaseClient.rpc('increment_post_view_count', { post_id_to_inc: postId });
        }

        const shareHandler = (e) => {
             const shareBtn = e.target.closest('.share-btn');
             if (shareBtn) {
                 const postId = shareBtn.dataset.postId;
                 const postHeadline = shareBtn.dataset.postHeadline;
                 const postUrl = `${window.location.origin}${window.location.pathname}#post-${postId}`;
                 const shareData = { title: postHeadline, text: `Live Update: ${postHeadline}`, url: postUrl };
                 if (navigator.share) navigator.share(shareData); else alert(`Share this link:\n${postUrl}`);
             }
        };

        supabaseClient.channel('public:live_posts').on('postgres_changes', { event: '*', schema: 'public', table: 'live_posts' }, (payload) => fetchInitialPosts()).subscribe();
        
        loadMoreBtn.addEventListener('click', () => loadMorePosts(false));
        liveFeed.addEventListener('click', shareHandler);
        pinnedPostContainer.addEventListener('click', shareHandler);
        
        fetchInitialPosts();
    });
{% endraw %}
</script>