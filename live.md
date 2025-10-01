---
layout: default
title: Live Updates
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body {
        font-family: 'Inter', sans-serif;
        background-color: #f3f4f6;
    }
    .live-container {
        max-width: 700px; 
        margin: 0 auto;
        padding: 0 1rem 2rem 1rem;
    }
    @media (min-width: 768px) {
        .live-container { max-width: 1100px; }
    }
    .live-header {
        margin-bottom: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .live-post {
        background-color: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        overflow: hidden; padding: 1.5rem; border-left: 4px solid #e42626; margin-bottom: 1.5rem;
    }
    .new-post-animation { animation: fadeInSlideDown 0.7s ease-out forwards; }
    @keyframes fadeInSlideDown {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
    }
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
    .social-link { opacity: 0; transform: translateX(10px) scale(0.8); transition: all 0.3s ease-in-out; }
    .share-container.active .social-link { opacity: 1; transform: translateX(0) scale(1); }
    .social-link a { display: flex; justify-content: center; align-items: center; width: 32px; height: 32px; border-radius: 50%; color: #fff; text-decoration: none; transition: transform 0.2s ease; }
    .social-link a:hover { transform: scale(1.1); }
    .social-link.facebook a { background-color: #1877F2; }
    .social-link.x-twitter a { background-color: #000000; }
    .social-link.whatsapp a { background-color: #25D366; }
    .social-link.reddit a { background-color: #FF4500; }
    .social-link.copy-link a { background-color: #606770; }
    .share-btn-main { background: none; border: none; font-size: 1rem; color: #606770; cursor: pointer; padding: 5px; border-radius: 50%; width: 32px; height: 32px; transition: background-color 0.2s, color 0.2s; position: relative; overflow: hidden;}
    .share-btn-main:hover { background-color: #f0f2f5; color: #0073e6; }
    .share-btn-main i { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
    .share-btn-main .close-icon { opacity: 0; transform: translate(-50%, -50%) rotate(180deg) scale(0.5); }
    .share-container.active .share-btn-main .share-icon { opacity: 0; transform: translate(-50%, -50%) rotate(-180deg) scale(0.5); }
    .share-container.active .share-btn-main .close-icon { opacity: 1; transform: translate(-50%, -50%) rotate(0deg) scale(1); }
    #load-more-container { text-align: center; margin-top: 2rem; }
    #load-more-btn { background-color: #1c1e21; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background-color 0.2s; }
    #load-more-btn:hover { background-color: #333; }
    #load-more-btn:disabled { background-color: #ccc; cursor: not-allowed; }
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
                        <span class="live-post-author">By {{ update.authorName | default: "Staff" }}</span>
                        <span class="live-post-time">{{ update.timestamp }}</span>
                    </div>
                    {% if update.headline %}
                        <h2 class="live-post-headline">{{ update.headline }}</h2>
                    {% endif %}
                    <div class="live-post-content">
                        {% if update.image1 %}
                            <img src="{{ update.image1 }}" alt="{{ update.headline | default: 'Live update image' }}">
                        {% endif %}
                        
                        {% assign content_parts = update.content | split: "

" %}
                        {% for part in content_parts %}
                            {% assign trimmed_part = part | strip %}
                            {% if trimmed_part == "" %}{% continue %}{% endif %}

                            {% if trimmed_part contains "![" %}
                                {% assign image_url = trimmed_part | split: "(" | last | remove: ")" %}
                                <img src="{{ image_url }}" alt="Live update image">
                            {% elsif trimmed_part contains ">" %}
                                <blockquote>{{ trimmed_part | remove: ">" | strip }}</blockquote>
                            {% else %}
                                <p>{{ part }}</p>
                            {% endif %}
                        {% endfor %}
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

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="{{ '/assets/header-injector.js' | relative_url }}"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const liveFeed = document.getElementById('live-feed');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let allFiles = [];
    let loadedCount = 10;
    const perPage = 10;
    let latestPostFilename = liveFeed.querySelector('.live-post')?.dataset.filename || '';

    const GITHUB_API_CONFIG = {
        owner: 'AmmarKhanAlamgirOfficial',
        repo: 'live-content',
        path: ''
    };

    function parseMarkdown(text) {
        const post = {};
        const frontmatterMatch = text.match(/---([\s\S]*?)---/);
        if (frontmatterMatch) {
            post.content = text.substring(frontmatterMatch[0].length).trim();
            frontmatterMatch[1].split('\n').forEach(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(':').trim().replace(/"/g, '');
                    post[key] = value;
                }
            });
        } else {
            post.content = text;
        }
        return post;
    }

    function renderPost(postData, insertAtTop = false) {
        let imageHTML = postData.image1 ? `<img src="${postData.image1}" alt="${postData.headline || 'Live update image'}">` : '';
        let headlineHTML = postData.headline ? `<h2 class="live-post-headline">${postData.headline}</h2>` : '';

        // ******** JAVASCRIPT FIX STARTS HERE ********
        // This is a more robust parser that correctly handles images and paragraphs.
        const contentHTML = postData.content.split(/\n\s*\n/).map(p => {
            const trimmedPart = p.trim();
            if (trimmedPart.startsWith('![')) {
                const urlMatch = trimmedPart.match(/\((.*?)\)/);
                if (urlMatch && urlMatch[1]) {
                    return `<img src="${urlMatch[1]}" alt="Live update image">`;
                }
            } else if (trimmedPart.startsWith('>')) {
                return `<blockquote>${trimmedPart.substring(1).trim()}</blockquote>`;
            } else if (trimmedPart) {
                return `<p>${trimmedPart}</p>`;
            }
            return '';
        }).join('');
        // ******** JAVASCRIPT FIX ENDS HERE ********

        const postElement = document.createElement('div');
        postElement.className = 'live-post';
        if (insertAtTop) {
            postElement.classList.add('new-post-animation');
        }
        postElement.dataset.filename = postData.filename;
        postElement.innerHTML = `
            <div class="live-post-meta">
                <span class="live-post-author">By ${postData.authorName || 'Staff'}</span>
                <span class="live-post-time">${postData.timestamp}</span>
            </div>
            ${headlineHTML}
            <div class="live-post-content">
                ${imageHTML}
                ${contentHTML}
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
            </div>`;
        
        if (insertAtTop) {
            liveFeed.prepend(postElement);
        } else {
            liveFeed.appendChild(postElement);
        }
    }

    async function loadMorePosts() {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Loading...';

        try {
            if (allFiles.length === 0) {
                const url = `https://api.github.com/repos/${GITHUB_API_CONFIG.owner}/${GITHUB_API_CONFIG.repo}/contents/${GITHUB_API_CONFIG.path}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch file list from GitHub.');
                const data = await response.json();
                allFiles = data.filter(file => file.name.endsWith('.md')).sort((a, b) => b.name.localeCompare(a.name));
            }

            const filesToFetch = allFiles.slice(loadedCount, loadedCount + perPage);

            if (filesToFetch.length === 0) {
                loadMoreBtn.textContent = 'No more updates';
                return;
            }

            const postPromises = filesToFetch.map(file => fetch(file.download_url).then(res => res.text()));
            const rawPosts = await Promise.all(postPromises);
            
            rawPosts.forEach(rawPost => {
                const postData = parseMarkdown(rawPost);
                renderPost(postData);
            });

            loadedCount += filesToFetch.length;
            if (loadedCount >= allFiles.length) {
                loadMoreBtn.textContent = 'You have reached the end';
            } else {
                loadMoreBtn.disabled = false;
                loadMoreBtn.textContent = 'Read More';
            }
        } catch (error) {
            console.error("Error loading more posts:", error);
            loadMoreBtn.textContent = 'Failed to load';
            loadMoreBtn.style.backgroundColor = 'red';
        }
    }

    async function checkForNewUpdates() {
        try {
            const url = `https://api.github.com/repos/${GITHUB_API_CONFIG.owner}/${GITHUB_API_CONFIG.repo}/contents/${GITHUB_API_CONFIG.path}`;
            const response = await fetch(url, { cache: "no-store" });
            if (!response.ok) return;
            
            const files = await response.json();
            const sortedFiles = files.filter(file => file.name.endsWith('.md')).sort((a, b) => b.name.localeCompare(a.name));
            const newestFilenameOnServer = sortedFiles[0]?.name;

            if (newestFilenameOnServer && newestFilenameOnServer !== latestPostFilename) {
                const newPosts = [];
                for (const file of sortedFiles) {
                    if (file.name === latestPostFilename) break;
                    newPosts.push(file);
                }

                for (const file of newPosts.reverse()) {
                    const postRes = await fetch(file.download_url);
                    const rawPost = await postRes.text();
                    const postData = parseMarkdown(rawPost);
                    postData.filename = file.name;
                    renderPost(postData, true);
                }
                latestPostFilename = newestFilenameOnServer;
            }
        } catch (error) {
            console.error("Auto-refresh failed:", error);
        }
    }
    
    liveFeed.addEventListener('click', (e) => {
        const shareBtn = e.target.closest('.share-btn-main');
        const socialLink = e.target.closest('.social-link a');
        const postElement = e.target.closest('.live-post');

        if (shareBtn) {
            const shareContainer = shareBtn.closest('.share-container');
            shareContainer.classList.toggle('active');
            return;
        }

        if (socialLink && postElement) {
            e.preventDefault();
            const postHeadline = postElement.querySelector('.live-post-headline')?.textContent || 'Live Update';
            const postUrl = `${window.location.origin}${window.location.pathname}?post=${postElement.dataset.filename}`;
            const encodedText = encodeURIComponent(postHeadline);
            const encodedUrl = encodeURIComponent(postUrl);
            
            let shareUrl;
            if (socialLink.parentElement.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
            } else if (socialLink.parentElement.classList.contains('x-twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
            } else if (socialLink.parentElement.classList.contains('whatsapp')) {
                shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
            } 
            // --- NEW: Reddit Share Logic ---
            else if (socialLink.parentElement.classList.contains('reddit')) {
                shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;
            } else if (socialLink.parentElement.classList.contains('copy-link')) {
                navigator.clipboard.writeText(postUrl).then(() => {
                    socialLink.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => { socialLink.innerHTML = '<i class="fas fa-copy"></i>'; }, 1500);
                });
                return;
            }

            if(shareUrl) {
                window.open(shareUrl, '_blank', 'noopener,noreferrer');
            }
        }
    });

    loadMoreBtn.addEventListener('click', loadMorePosts);
    setInterval(checkForNewUpdates, 30000);
});
</script>