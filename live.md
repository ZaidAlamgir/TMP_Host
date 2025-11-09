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
    .live-post-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.875rem; color: #4b5563; }
    .live-post-author-group { display: flex; align-items: center; gap: 0.5rem; }
    .live-post-author { font-weight: 600; }
    .live-post-time { font-weight: 600; color: #ef4444; margin-left: auto; }

    .post-author-logo {
        width: 30px;
        height: 30px;
        color: #3498db;
    }
    .post-author-logo .tmp-text {
        font-size: 80px;
        font-weight: bold;
        fill: #0a0707;
    }
    .post-author-logo .square { fill: currentColor; }
    .post-author-logo .rotating-circle {
        transform-origin: center;
        animation: rotate 10s linear infinite;
        stroke: currentColor;
    }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

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
    /* Style for the raw HTML/Widget containers */
    .widget-container { 
        padding: 0; 
        margin: 1.5rem auto !important; 
        max-width: 100%;
        overflow: hidden; 
        border: 1px solid #e5e7eb; 
        border-radius: 8px;
    }
    
    /* NEW: Custom Canvas Styles */
    .like-btn-canvas {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
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
    // --- START: CUSTOM CANVAS CLASS ---
    class CanvasLikeButton {
        constructor(canvas, initialIsLiked) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.dpr = window.devicePixelRatio || 1;
            
            this.logicalWidth = canvas.width;
            this.logicalHeight = canvas.height;

            this.canvas.width = this.logicalWidth * this.dpr;
            this.canvas.height = this.logicalHeight * this.dpr;
            this.canvas.style.width = `${this.logicalWidth}px`;
            this.canvas.style.height = `${this.logicalHeight}px`;
            
            this.ctx.scale(this.dpr, this.dpr);

            this.isLiked = initialIsLiked; 
            this.isHovered = false;
            this.buttonCenter = { x: this.logicalWidth / 2, y: this.logicalHeight / 2 };
            
            this.starAnimation = { scale: 1, isAnimating: false, direction: 'up', rotation: 0, targetRotation: 0 };
            this.circleAnimation = { radius: 0, opacity: 1, isAnimating: false };
            this.particles = [];
            this.motionLines = [];

            this.setupEventListeners();
            this.animate();
        }

        drawStar(centerX, centerY, scale = 1, rotation = 0) {
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.scale(scale, scale);
            this.ctx.rotate(rotation);

            const starStrokeColor = this.isLiked ? '#facc15' : '#6b7280';
            const starFillColor = this.isLiked ? '#fde047' : '#374151';

            this.ctx.lineWidth = 2;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.strokeStyle = starStrokeColor;
            this.ctx.fillStyle = starFillColor;

            const spikes = 5;
            const outerRadius = 16;
            const innerRadius = 8;
            let rot = Math.PI / 2 * 3;
            let x = 0, y = 0;
            const step = Math.PI / spikes;

            this.ctx.beginPath();
            this.ctx.moveTo(0, -outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = Math.cos(rot) * outerRadius;
                y = Math.sin(rot) * outerRadius;
                this.ctx.lineTo(x, y);
                rot += step;
                x = Math.cos(rot) * innerRadius;
                y = Math.sin(rot) * innerRadius;
                this.ctx.lineTo(x, y);
                rot += step;
            }
            this.ctx.lineTo(0, -outerRadius);
            this.ctx.closePath();
            
            this.ctx.shadowColor = this.isLiked ? 'rgba(250, 204, 21, 0.5)' : 'transparent';
            this.ctx.shadowBlur = 8;
            
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();
        }

        createParticles(x, y) {
            const particleCount = 15;
            const colors = ['#ec4899', '#38bdf8', '#facc15', '#4ade80'];
            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 2.5 + 1.5;
                const radius = Math.random() * 2 + 1;
                this.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, radius, color: colors[Math.floor(Math.random() * colors.length)], opacity: 1 });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);

            if (this.circleAnimation.isAnimating) {
                this.circleAnimation.radius += 2.5;
                this.circleAnimation.opacity -= 0.04;
                if (this.circleAnimation.opacity <= 0) this.circleAnimation.isAnimating = false;
                else {
                    this.ctx.beginPath();
                    this.ctx.arc(this.buttonCenter.x, this.buttonCenter.y, this.circleAnimation.radius, 0, Math.PI * 2);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${this.circleAnimation.opacity})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
            }

            this.particles.forEach((p, index) => {
                p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.vx *= 0.99; p.opacity -= 0.02;
                if (p.opacity <= 0) this.particles.splice(index, 1);
                else {
                    this.ctx.globalAlpha = p.opacity; this.ctx.fillStyle = p.color; this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); this.ctx.fill(); this.ctx.globalAlpha = 1;
                }
            });

            let targetScale = this.isHovered ? 1.1 : 1;
            if (this.starAnimation.isAnimating) {
                if (this.starAnimation.direction === 'up') { this.starAnimation.scale += 0.07; if (this.starAnimation.scale >= 1.25) this.starAnimation.direction = 'down'; } 
                else { this.starAnimation.scale -= 0.09; if (this.starAnimation.scale <= targetScale) { this.starAnimation.scale = targetScale; this.starAnimation.isAnimating = false; } }
            } else { this.starAnimation.scale += (targetScale - this.starAnimation.scale) * 0.2; }
            
            const rotDiff = this.starAnimation.targetRotation - this.starAnimation.rotation;
            if (Math.abs(rotDiff) > 0.01) { this.starAnimation.rotation += rotDiff * 0.15; } 
            else { this.starAnimation.rotation = this.starAnimation.targetRotation; }
            
            this.drawStar(this.buttonCenter.x, this.buttonCenter.y, this.starAnimation.scale, this.starAnimation.rotation);
            
            requestAnimationFrame(() => this.animate());
        }

        setupEventListeners() {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left); const mouseY = (e.clientY - rect.top);
                const dist = Math.sqrt(Math.pow(mouseX - this.buttonCenter.x, 2) + Math.pow(mouseY - this.buttonCenter.y, 2));
                this.isHovered = dist < 25;
            });
            this.canvas.addEventListener('mouseleave', () => { this.isHovered = false; });
        }

        triggerClick() {
            this.isLiked = !this.isLiked;
            this.starAnimation.isAnimating = true;
            this.starAnimation.direction = 'up';
            if (this.isLiked) {
                this.starAnimation.targetRotation += Math.PI * 2;
                this.circleAnimation.isAnimating = true; this.circleAnimation.radius = 0; this.circleAnimation.opacity = 1;
                this.createParticles(this.buttonCenter.x, this.buttonCenter.y);
            } else {
                this.starAnimation.targetRotation -= Math.PI * 2;
            }
        }
    }
    // --- END: CUSTOM CANVAS CLASS ---


    document.addEventListener('DOMContentLoaded', () => {
        // --- CONFIGURATION ---
        const SUPABASE_URL = 'https://ofszjurrajwtbwlfckhi.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mc3pqdXJyYWp3dGJ3bGZja2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDk2MzgsImV4cCI6MjA3NDk4NTYzOH0.kKafp8dEL7V0Y10-oNbjluYblA03a0V_OqB9XOBd9SA';
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        const LIVE_FEED_URL = 'https://data.tmpnews.com/feed.json'; 

        const pinnedPostContainer = document.getElementById('pinned-post-container');
        const liveFeed = document.getElementById('live-feed');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const archiveBtn = document.getElementById('archive-btn');
        const noMorePostsMsg = document.getElementById('no-more-posts-msg');

        const INITIAL_LOAD_COUNT = 30; 
        const SUBSEQUENT_LOAD_COUNT = 30;

        const CACHE_KEY = 'cachedLiveFeed';
        
        let allPosts = []; 
        let loadedPostsCount = 0; 
        const viewedPosts = new Set(JSON.parse(sessionStorage.getItem('viewedLivePosts') || '[]'));
        const likedPosts = new Set(JSON.parse(localStorage.getItem('likedLivePosts') || '[]'));

        // Define a client ID for anonymous analytics logging if it doesn't exist
        if (!localStorage.getItem('anonClientId')) {
            localStorage.setItem('anonClientId', 'anon-' + Date.now() + Math.random().toString(36).substring(2, 9));
        }

        // --- Utility Functions ---
        function parseContent(content) {
            if (!content) return '';
            const placeholders = [];
            let tempContent = content;
            const allKeywords = 'twitter-video|twitter|instagram-video|instagram|facebook|youtube|tiktok|linkedin|reddit|telegram';
            
            const regex = new RegExp(
                `\\[(${allKeywords})\\|?(.*)\\]\\((.*)\\)` + 
                `|!\\[(.*?)\\]\\((.*)\\)` + 
                `|\\[WIDGET\\|(.*)\\|(.*)\\]([\\s\\S]*?)(?=\\n\\n|$)`, 
                'g'
            );

            tempContent = tempContent.replace(regex, (match, socialType, socialDesc, socialUrl, imgAlt, imgUrl, widgetType, widgetCaption, widgetContent) => {
                let htmlBlock = '';

                if (widgetType) {
                    const caption = widgetCaption ? `<p class="media-caption">${widgetCaption}</p>` : '';
                    htmlBlock = `<div class="my-4 widget-container" data-type="${widgetType}" style="max-width: 600px; margin: 1.5rem auto;">${widgetContent}</div>${caption}`;
                } 
                else if (imgAlt || imgUrl) {
                    const captionHTML = (imgAlt && imgAlt.toLowerCase() !== 'image' && imgAlt.trim() !== '') ? `<p class="media-caption">${imgAlt}</p>` : '';
                    htmlBlock = `<div class="my-4"><img src="${imgUrl}" alt="${imgAlt || ''}" class="my-0 mx-auto rounded-lg">${captionHTML}</div>`;
                }
                else if (socialType) {
                    const caption = socialDesc ? `<p class="media-caption">${socialDesc}</p>` : '';
                    const url = socialUrl;

                    switch (socialType) {
                        case 'twitter':
                            const twitterUrl = url.replace('x.com', 'twitter.com');
                            htmlBlock = `<div class="my-4"><blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><a href="${twitterUrl}"></a></blockquote>${caption}</div>`;
                            break;
                        case 'twitter-video':
                            const twitterVideoUrl = url.replace('x.com', 'twitter.com');
                            htmlBlock = `<div class="my-4"><blockquote class="twitter-tweet" data-dnt="true" data-theme="light" data-conversation="none"><a href="${twitterVideoUrl}"></a></blockquote>${caption}</div>`;
                            break;
                        case 'instagram':
                            htmlBlock = `<div class="my-4"><blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14"></blockquote>${caption}</div>`;
                            break;
                        case 'instagram-video':
                            const igMatch = url.match(/\/(p|reel)\/([a-zA-Z0-9_-]+)/);
                            if (igMatch && igMatch[2]) {
                                htmlBlock = `<div class="instagram-video-container my-4"><iframe src="https://www.instagram.com/p/${igMatch[2]}/embed" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>${caption}`;
                            } else {
                                htmlBlock = `<div class="my-4"><blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14"></blockquote>${caption}</div>`;
                            }
                            break;
                        case 'facebook':
                            htmlBlock = `<div class="my-4"><div class="fb-post" data-href="${url}" data-width="auto" data-show-text="true"></div>${caption}</div>`;
                            break;
                        case 'youtube':
                            const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                            if (ytMatch && ytMatch[1]) {
                                htmlBlock = `<div class="responsive-iframe-container responsive-iframe-container-16x9 my-4"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1" allowfullscreen></iframe></div>${caption}`;
                            }
                            break;
                        case 'tiktok':
                            htmlBlock = `<div class="my-4"><blockquote class="tiktok-embed" cite="${url}" data-embed-from="embed_page"> <section></section> </blockquote>${caption}</div>`;
                            break;
                        case 'linkedin':
                            htmlBlock = `<div class="my-4"><div class="linkedin-post" data-href="${url}"></div>${caption}</div>`;
                            break;
                        case 'reddit':
                            htmlBlock = `<div class="my-4"><blockquote class="reddit-embed-bq" data-embed-height="500"><a href="${url}">Post</a></blockquote>${caption}</div>`;
                            break;
                        case 'telegram':
                            const tgMatch = url.match(/t\.me\/([a-zA-Z0-9_]+\/\d+)/);
                            if (tgMatch && tgMatch[1]) {
                                htmlBlock = `<div class="my-4"><blockquote class="telegram-post" data-post="${tgMatch[1]}" data-width="100%"></blockquote>${caption}`;
                            }
                            break;
                    }
                }
                
                placeholders.push(htmlBlock);
                return `__PLACEHOLDER_${placeholders.length - 1}__`;
            });

            const processedText = tempContent.split('\n\n').map(p => {
                if (p.startsWith('__PLACEHOLDER_')) return p;
                if (p.trim() === '') return '';
                return p.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>').trim() === '' ? '' : `<p>${p.replace(/\n/g, '<br>')}</p>`;
            }).join('');
            
            return processedText.replace(/__PLACEHOLDER_(\d+)__/g, (match, index) => placeholders[parseInt(index, 10)]);
        }

        function loadSocialScripts() {
            const scripts = {
                twitter: 'https://platform.twitter.com/widgets.js', instagram: '//www.instagram.com/embed.js', facebook: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0', tiktok: 'https://www.tiktok.com/embed.js', reddit: 'https://embed.reddit.com/widgets.js', telegram: 'https://telegram.org/js/telegram-widget.js?22', linkedin: 'https://platform.linkedin.com/Voyager/js/posts/embed.js'
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

        // --- Supabase Read Functions (Uncached Reads) ---

        async function refreshViewCount(postId) {
            const viewCountSpan = document.getElementById(`view-count-${postId}`);
            if (!viewCountSpan) return;

            const { data, error } = await supabaseClient
                .from('live_posts')
                .select('view_count')
                .eq('id', postId)
                .single();

            if (!error && data) {
                if (parseInt(viewCountSpan.textContent) < data.view_count) {
                    viewCountSpan.textContent = data.view_count;
                }
            } else {
                console.warn(`Failed to fetch live view count for post ${postId}:`, error?.message);
            }
        }

        async function refreshLikeCount(postId) {
            const likeCountSpan = document.getElementById(`like-count-${postId}`);
            if (!likeCountSpan) return;

            const { data, error } = await supabaseClient
                .from('live_posts')
                .select('like_count')
                .eq('id', postId)
                .single();

            if (!error && data) {
                 // FIX: Always use the authoritative DB count if it's available
                likeCountSpan.textContent = data.like_count;
            } else {
                console.warn(`Failed to fetch live like count for post ${postId}:`, error?.message);
            }
        }

        // --- SCALABLE PIGGYBACK WRITE FUNCTIONS ---

        const ANALYTICS_WRITE_URL = 'https://data.tmpnews.com/feed.json'; 

        async function incrementViewCount(postId) {
            if (viewedPosts.has(postId)) return;

            viewedPosts.add(postId);
            sessionStorage.setItem('viewedLivePosts', JSON.stringify(Array.from(viewedPosts)));
            
            fetch(`${ANALYTICS_WRITE_URL}?log=view&post_id=${postId}&client_id=${localStorage.getItem('anonClientId')}`, { method: 'GET', cache: 'no-store' })
                .then(() => refreshViewCount(postId))
                .catch(error => {
                    console.error("View log failed:", error);
                    viewedPosts.delete(postId); 
                    sessionStorage.setItem('viewedLivePosts', JSON.stringify(Array.from(viewedPosts)));
                });
        }

        // --- MODIFIED TOGGLE LIKE FUNCTION (Primary Fix) ---
        async function toggleLike(postId, canvasButtonInstance, postElement) {
            const postIdStr = postId.toString();
            // Determine the final intended action based on the canvas instance's new state
            const action = canvasButtonInstance.isLiked ? 'increment' : 'decrement';
            const likeCountSpan = postElement.querySelector(`#like-count-${postId}`);
            const initialCount = parseInt(likeCountSpan.textContent);
            
            // 1. Send the scalable write signal
            fetch(`${ANALYTICS_WRITE_URL}?log=like&post_id=${postId}&action=${action}&client_id=${localStorage.getItem('anonClientId')}`, { method: 'GET', cache: 'no-store' })
                .then(() => {
                    // Success: Update local storage and perform authoritative read
                    if (action === 'increment') {
                        likedPosts.add(postIdStr);
                    } else {
                        likedPosts.delete(postIdStr);
                    }
                    localStorage.setItem('likedLivePosts', JSON.stringify(Array.from(likedPosts)));
                    
                    // Reduce the delay for authoritative read
                    setTimeout(() => refreshLikeCount(postId), 500); 
                })
                .catch(error => {
                    // FAILURE: ROLLBACK OPTIMISTIC UI
                    console.error("Like log failed. Rolling back UI.", error);
                    alert("Like failed! Please try again.");
                    
                    // 2. Rollback UI/Animation: Call triggerClick *again* to flip the state back
                    canvasButtonInstance.triggerClick(); 
                    
                    // 3. Rollback the displayed count
                    const rollbackCount = action === 'increment' ? Math.max(0, initialCount) : initialCount;
                    likeCountSpan.textContent = rollbackCount;
                });
        }
        
        // --- RENDER POST FUNCTION ---
        function renderPost(postData, container, insertAtTop = false) {
            const postElement = document.createElement('div');
            postElement.className = 'live-post';
            postElement.id = `post-${postData.id}`; 
            if (insertAtTop) postElement.classList.add('new-post-animation');
            if (postData.is_pinned) postElement.classList.add('is-pinned');

            let tagsHTML = postData.tags?.length > 0 ? '<div class="tags-container">' + postData.tags.map(tag => `<a href="#" class="tag-badge">#${tag}</a>`).join('') + '</div>' : '';
            let pinnedBadgeHTML = postData.is_pinned ? `<span class="pinned-badge"><i class="fas fa-thumbtack fa-xs"></i><span class="ml-1.5">PINNED</span></span>` : '';

            const logoSVG = `
                <svg class="post-author-logo" viewBox="0 0 200 200" aria-hidden="true">
                    <rect x="50" y="50" width="100" height="100" class="square"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="tmp-text">TMP</text>
                    <circle cx="100" cy="100" r="80" fill="none" stroke-width="2" class="rotating-circle"/>
                </svg>`;

            const formattedDate = new Date(postData.timestamp).toLocaleString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
            });
            
            const isLiked = likedPosts.has(postData.id.toString());
            
            postElement.innerHTML = `
                <div class="live-post-content p-4 md:p-6">
                    <div class="live-post-meta">
                        <div class="live-post-author-group">
                            ${logoSVG}
                            <span class="live-post-author">By ${postData.author_name}</span>
                        </div>
                        <span class="live-post-time">${formattedDate}</span>
                        ${pinnedBadgeHTML}
                    </div>
                    <h2 class="live-post-headline">${postData.headline || ''}</h2>
                    ${tagsHTML}
                    <div class="post-body pt-4">${parseContent(postData.content)}</div>
                    <div class="post-footer">
                        <div class="post-stats" data-post-id="${postData.id}">
                            <canvas id="like-canvas-${postData.id}" class="like-btn-canvas" width="40" height="40" title="Like"></canvas>
                            <span id="like-count-${postData.id}" class="like-count">${postData.like_count || 0}</span>
                            <div class="stat-item" style="margin-left: 0.5rem;">
                                <i class="fas fa-eye"></i><span id="view-count-${postData.id}">${postData.view_count || 0}</span>
                            </div>
                        </div>
                        <button class="share-btn" data-post-id="${postData.id}" data-post-headline="${postData.headline || 'Live Update'}"><i class="fas fa-share-alt mr-2"></i>Share</button>
                    </div>
                </div>`;
            if (insertAtTop) { container.prepend(postElement); } else { container.appendChild(postElement); }
            
            // --- BIND CANVAS BUTTON ---
            const canvasEl = document.getElementById(`like-canvas-${postData.id}`);
            const canvasButton = new CanvasLikeButton(canvasEl, isLiked);
            postElement.canvasButtonInstance = canvasButton; 
            // --- END BIND ---

            incrementViewCount(postData.id);
            
            setTimeout(() => { 
                refreshViewCount(postData.id); 
                refreshLikeCount(postData.id);
                loadSocialScripts(); 
            }, 100);
        }

        // --- Core Load & Realtime Logic ---
        async function fetchFullFeed(forceCacheBypass = false) {
             const cachedData = sessionStorage.getItem(CACHE_KEY);
            if (cachedData && !forceCacheBypass) {
                allPosts = JSON.parse(cachedData);
                return allPosts;
            }

            if (!forceCacheBypass) {
                liveFeed.innerHTML = `<div class="loader" style="margin-top: 20px;"></div>`;
                loadMoreBtn.disabled = true;
                loadMoreBtn.textContent = 'Loading...';
            }

            try {
                const fetchOptions = forceCacheBypass ? { cache: 'no-cache' } : {};
                const response = await fetch(LIVE_FEED_URL, fetchOptions); 
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (!Array.isArray(data)) throw new Error("Invalid data format from feed endpoint.");
                sessionStorage.setItem('cachedLiveFeed', JSON.stringify(data));
                allPosts = data;
                return allPosts;

            } catch (error) {
                console.error('Error fetching cached feed:', error);
                if (!forceCacheBypass && loadedPostsCount === 0) {
                     liveFeed.innerHTML = `<p style="text-align: center; color: red;">Could not load live updates. Please try again later.</p>`;
                }
                return [];
            } finally {
                if (!forceCacheBypass) {
                    loadMoreBtn.disabled = false;
                    loadMoreBtn.textContent = 'Load Previous Updates';
                }
            }
        }

        async function loadMorePosts(isFullRefresh = false) {
             if (isFullRefresh) {
                const fullFeed = await fetchFullFeed(true); 
                if (fullFeed.length === 0) {
                    pinnedPostContainer.innerHTML = ''; liveFeed.innerHTML = '';
                    loadMoreBtn.style.display = 'none'; noMorePostsMsg.textContent = "No updates have been posted yet."; noMorePostsMsg.style.display = 'block';
                    return;
                }

                const pinned = fullFeed.find(p => p.is_pinned);
                allPosts = fullFeed.filter(p => !p.is_pinned); 

                pinnedPostContainer.innerHTML = '';
                if (pinned) renderPost(pinned, pinnedPostContainer, false);

                liveFeed.innerHTML = '';
                loadedPostsCount = 0;
            } else if (loadedPostsCount === 0) {
                const fullFeed = await fetchFullFeed(false); 
                if (fullFeed.length === 0) {
                    if (loadedPostsCount === 0) {
                        loadMoreBtn.style.display = 'none'; noMorePostsMsg.textContent = "No updates have been posted yet."; noMorePostsMsg.style.display = 'block';
                    }
                    return;
                }
                
                const pinned = fullFeed.find(p => p.is_pinned);
                allPosts = fullFeed.filter(p => !p.is_pinned); 

                pinnedPostContainer.innerHTML = '';
                if (pinned) renderPost(pinned, pinnedPostContainer, false);
            }
            
            if (loadedPostsCount >= allPosts.length) {
                loadMoreBtn.style.display = 'none'; archiveBtn.style.display = 'inline-block'; noMorePostsMsg.style.display = 'block'; return;
            }

            loadMoreBtn.disabled = true; loadMoreBtn.textContent = 'Loading...';

            const startIndex = loadedPostsCount;
            const limit = isFullRefresh ? INITIAL_LOAD_COUNT : SUBSEQUENT_LOAD_COUNT;
            const endIndex = startIndex + limit;
            
            const batch = allPosts.slice(startIndex, endIndex);

            batch.forEach(post => renderPost(post, liveFeed, false));
            loadedPostsCount += batch.length;

            if (loadedPostsCount >= allPosts.length) {
                loadMoreBtn.style.display = 'none'; archiveBtn.style.display = 'inline-block'; noMorePostsMsg.style.display = 'block';
            } else {
                loadMoreBtn.disabled = false; loadMoreBtn.textContent = 'Load Previous Updates'; loadMoreBtn.style.display = 'inline-block'; archiveBtn.style.display = 'none'; noMorePostsMsg.style.display = 'none';
            }
        }

        // --- REALTIME FIX: INCREMENTAL UPDATES ---
        supabaseClient.channel('live_updates_listener')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'live_posts' }, (payload) => {
                sessionStorage.removeItem('cachedLiveFeed'); 
                const newPostData = payload.new;
                const oldPostData = payload.old;
                
                if (payload.eventType === 'INSERT') {
                    if (!newPostData.is_pinned) {
                        renderPost(newPostData, liveFeed, true); 
                        allPosts.unshift(newPostData);
                        loadedPostsCount++;
                    } else {
                        loadMorePosts(true); 
                    }
                } 
                else if (payload.eventType === 'UPDATE') {
                    const existingElement = document.getElementById(`post-${newPostData.id}`);

                    if (newPostData.is_pinned !== oldPostData.is_pinned) {
                         loadMorePosts(true); 
                    } else if (existingElement) {
                        const container = existingElement.parentNode;
                        existingElement.remove();
                        renderPost(newPostData, container, false); 
                        refreshViewCount(newPostData.id);
                        refreshLikeCount(newPostData.id);
                    } else {
                        fetchFullFeed(true);
                    }
                }
                else if (payload.eventType === 'DELETE') {
                    document.getElementById(`post-${oldPostData.id}`)?.remove();
                    allPosts = allPosts.filter(p => p.id !== oldPostData.id);
                    loadedPostsCount = allPosts.filter(p => !p.is_pinned).length;
                    
                    if (oldPostData.is_pinned) loadMorePosts(true);
                }
            })
            .subscribe();

        // --- Event Listeners ---
        const shareHandler = (e) => {
             const shareBtn = e.target.closest('.share-btn');
             if (shareBtn) {
                 const postId = shareBtn.dataset.postId;
                 const postHeadline = shareBtn.dataset.postHeadline;
                 const postUrl = `${window.location.origin}${window.location.pathname}#post-${postId}`;
                 const shareText = `Live Update: ${postHeadline}`;

                 if (window.AndroidInterface && typeof window.AndroidInterface.share === 'function') {
                     window.AndroidInterface.share(postHeadline, shareText, postUrl);
                 } else if (navigator.share) {
                     navigator.share({
                         title: postHeadline,
                         text: shareText,
                         url: postUrl
                     });
                 } else {
                     alert(`Share this link:\n${postUrl}`);
                 }
             }
        };
        
        const likeButtonClickHandler = (e) => {
            const likeCanvas = e.target.closest('.like-btn-canvas');
            if (likeCanvas) {
                const postElement = likeCanvas.closest('.live-post');
                const postId = postElement.id.split('-')[1]; 
                const canvasButtonInstance = postElement.canvasButtonInstance;
                const likeCountSpan = postElement.querySelector(`#like-count-${postId}`);

                // Store the current count for use in rollback
                let currentCount = parseInt(likeCountSpan.textContent);
                
                // 1. Trigger the Canvas Animation & Optimistic UI Update
                canvasButtonInstance.triggerClick(); 

                // 2. Perform optimistic count update
                const newCount = canvasButtonInstance.isLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
                likeCountSpan.textContent = newCount;

                // 3. Fire the Scalable Write Logic, passing the postElement for rollback
                toggleLike(postId, canvasButtonInstance, postElement);
                return;
            }
            shareHandler(e);
        };
        
        liveFeed.addEventListener('click', likeButtonClickHandler);
        pinnedPostContainer.addEventListener('click', likeButtonClickHandler);
        loadMoreBtn.addEventListener('click', () => loadMorePosts(false));

        // Initial page load: Rely on the cached data (pre-fetch) if available.
        loadMorePosts(false);
    });
</script>