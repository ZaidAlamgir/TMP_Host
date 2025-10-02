---
layout: default
title: Live Updates
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
    .live-container { max-width: 700px; margin: 0 auto; padding: 0 1rem 2rem 1rem; }
    @media (min-width: 768px) { .live-container { max-width: 1100px; } }
    .live-header { margin-bottom: 2rem; display: flex; justify-content: center; align-items: center; }
    .live-post { background-color: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden; padding: 1.5rem; border-left: 4px solid #e42626; margin-bottom: 1.5rem; }
    .new-post-animation { animation: fadeInSlideDown 0.7s ease-out forwards; }
    @keyframes fadeInSlideDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
    .live-post-headline { font-size: 1.75rem; font-weight: 700; color: #1c1e21; margin-bottom: 0.75rem; }
    .live-post-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
    .live-post-author { font-size: 0.9rem; font-weight: 600; color: #606770; }
    .live-post-time { font-size: 0.9rem; font-weight: 600; color: #e42626; }
    .live-post-content img { width: 100%; height: auto; border-radius: 8px; margin-top: 1rem; margin-bottom: 1rem; }
    .live-post-content p { font-size: 1.05rem; line-height: 1.7; color: #333; margin-bottom: 1rem; }
    .live-post-content blockquote { font-style: italic; color: #606770; border-left: 3px solid #0073e6; padding-left: 1rem; margin: 1rem 0; }
    .live-indicator { display: inline-block; margin-left: 10px; }
    .live-indicator .dot { width: 12px; height: 12px; background-color: #ef4444; border-radius: 50%; box-shadow: 0 0 8px 2px #ef4444; animation: glow 1.5s infinite ease-in-out; }
    @keyframes glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .post-footer { display: flex; justify-content: flex-end; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #f0f2f5; }
    .share-container { position: relative; display: flex; align-items: center; }
    .social-links { display: flex; list-style: none; gap: 8px; margin-right: 8px; padding: 0;}
    /* --- SHARE ANIMATION & VISIBILITY FIX --- */
    .social-link { opacity: 0; transform: translateX(10px) scale(0.8); transition: all 0.3s ease-in-out; pointer-events: none; }
    .share-container.active .social-link { opacity: 1; transform: translateX(0) scale(1); pointer-events: all; }
    .share-container.active .social-link:nth-child(1) { transition-delay: 0.05s; }
    .share-container.active .social-link:nth-child(2) { transition-delay: 0.1s; }
    .share-container.active .social-link:nth-child(3) { transition-delay: 0.15s; }
    .share-container.active .social-link:nth-child(4) { transition-delay: 0.2s; }
    .share-container.active .social-link:nth-child(5) { transition-delay: 0.25s; }
    /* --- END FIX --- */
    .social-link a { display: flex; justify-content: center; align-items: center; width: 32px; height: 32px; border-radius: 50%; color: #fff; text-decoration: none; transition: transform 0.2s ease; }
    .social-link a:hover { transform: scale(1.1); }
    .social-link.facebook a { background-color: #1877F2; }
    .social-link.x-twitter a { background-color: #000000; }
    .social-link.whatsapp a { background-color: #25D366; }
    .social-link.reddit a { background-color: #FF4500; }
    .social-link.copy-link a { background-color: #606770; }
    .share-btn-main { background: none; border: none; font-size: 1rem; color: #606770; cursor: pointer; padding: 5px; border-radius: 50%; width: 32px; height: 32px; position: relative; overflow: hidden; }
    .share-btn-main:hover { background-color: #f0f2f5; }
    /* --- SHARE ANIMATION FIX --- */
    .share-btn-main i { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out; }
    .share-btn-main .close-icon { opacity: 0; transform: translate(-50%, -50%) rotate(-90deg); }
    .share-container.active .share-btn-main .share-icon { opacity: 0; transform: translate(-50%, -50%) rotate(90deg); }
    .share-container.active .share-btn-main .close-icon { opacity: 1; transform: translate(-50%, -50%) rotate(0deg); }
    /* --- END FIX --- */
    #load-more-container { text-align: center; margin-top: 2rem; }
    #load-more-btn { background-color: #1c1e21; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
    #load-more-btn:disabled { background-color: #ccc; }
</style>

<div id="header-placeholder"></div>

<div class="live-container"> 
    <header class="live-header">
        <h1 style="font-size: 2.25rem; font-weight: bold; color: #1f2937;">Live Coverage</h1>
        <div class="live-indicator"><div class="dot"></div></div>
    </header>

    <div id="live-feed">
        {% if site.live_updates and site.live_updates.size > 0 %}
            {% assign updates = site.live_updates | sort: 'date' | reverse %}
            {% for update in updates limit:10 %}
                <div class="live-post" data-filename="{{ update.path | split: '/' | last }}">
                    <div class="live-post-meta">
                        <span class="live-post-author">By {{ update.authorName | default: "TMP Live Team" }}</span>
                        <span class="live-post-time">{{ update.timestamp }}</span>
                    </div>
                    {% if update.headline %}
                        <h2 class="live-post-headline">{{ update.headline }}</h2>
                    {% endif %}
                    <div class="live-post-content">
                        {{ update.content | markdownify }}
                    </div>
                    <div class="post-footer">
                        <div class="share-container">
                             <ul class="social-links">
                                <li class="social-link facebook"><a href="#" title="Share on Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                <li class="social-link x-twitter"><a href="#" title="Share on X"><i class="fa-brands fa-x-twitter"></i></a></li>
                                <li class="social-link whatsapp"><a href="#" title="Share on WhatsApp"><i class="fab fa-whatsapp"></i></a></li>
                                <li class="social-link reddit"><a href="#" title="Share on Reddit"><i class="fab fa-reddit-alien"></i></a></li>
                                <li class="social-link copy-link"><a href="#" title="Copy Link"><i class="fas fa-copy"></i></a></li>
                            </ul>
                            <button class="share-btn-main" title="Share Post">
                                <i class="fas fa-share-alt share-icon"></i>
                                <i class="fas fa-times close-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            {% endfor %}
        {% else %}
            <div style="text-align: center; padding: 2.5rem 0;">
                <p style="color: #6b7280;">No live updates yet. Check back soon!</p>
            </div>
        {% endif %}
    </div>

    <div id="load-more-container">
        <button id="load-more-btn">Read More</button>
    </div>
</div>

<div id="bottom-nav-placeholder"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js"></script>
<script src="{{ '/assets/header-injector.js' | relative_url }}"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const liveFeed = document.getElementById('live-feed');
    let latestPostFilename = liveFeed.querySelector('.live-post')?.dataset.filename || '';
    
    // This will be your Cloudflare URL later. For now, we use the GitHub Pages URL.
    const UPDATES_URL = 'https://live-api.tmpnews.com/live-content/live-updates.json';
    function renderPost(postData, insertAtTop = false) {
        let headlineHTML = postData.headline ? `<h2 class="live-post-headline">${postData.headline}</h2>` : '';
        
        // Simple markdown to HTML conversion for the content
        let contentHTML = postData.content
            .replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" style="max-width: 100%; border-radius: 8px; margin: 1rem 0;">')
            .replace(/^> (.*$)/gm, '<blockquote style="border-left: 3px solid #ccc; padding-left: 1rem; margin: 1rem 0; font-style: italic;">$1</blockquote>')
            .replace(/\n/g, '<br>');

        const postElement = document.createElement('div');
        postElement.className = 'live-post';
        if (insertAtTop) {
            postElement.classList.add('new-post-animation');
        }
        postElement.dataset.filename = postData.filename;
        postElement.innerHTML = `
            <div class="live-post-meta">
                <span class="live-post-author">By ${postData.authorName}</span>
                <span class="live-post-time">${postData.timestamp}</span>
            </div>
            ${headlineHTML}
            <div class="live-post-content">${contentHTML}</div>
            <div class="post-footer">
                </div>`;
        
        if (insertAtTop) {
            liveFeed.prepend(postElement);
        } else {
            liveFeed.appendChild(postElement);
        }
    }

    async function checkForNewUpdates() {
        try {
            // Add a timestamp to the URL to prevent browser caching
            const response = await fetch(`${UPDATES_URL}?t=${new Date().getTime()}`);
            if (!response.ok) {
                console.error('Failed to fetch updates.');
                return;
            }

            const updates = await response.json();

            if (updates.length > 0 && updates[0].filename !== latestPostFilename) {
                console.log('New content found. Refreshing feed.');
                liveFeed.innerHTML = ''; // Clear the entire feed
                updates.forEach(post => renderPost(post, false)); // Render all new posts
                latestPostFilename = updates[0].filename; // Update the latest filename
            }
        } catch (error) {
            console.error("Error fetching or processing live updates:", error);
        }
    }

    // Load initial posts immediately
    checkForNewUpdates();

    // Set an interval to check for new updates every 30 seconds
    setInterval(checkForNewUpdates, 30000);
});
</script>