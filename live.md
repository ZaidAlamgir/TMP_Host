---
layout: default
title: Live Updates
permalink: /live/
description: "Follow the latest live updates, breaking news, and real-time coverage from TMP News."
image: /assets/images/live/TMPnewsliveBanner.webp
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

    body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
    
    .live-container { 
        max-width: 1440px; 
        margin: 0 auto; 
        padding: 0 1rem 4rem 1rem; 
        min-height: 100vh; 
    }
    
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

    .post-author-logo { width: 30px; height: 30px; color: #3498db; }
    .post-author-logo .tmp-text { font-size: 80px; font-weight: bold; fill: #0a0707; }
    .post-author-logo .square { fill: currentColor; }
    .post-author-logo .rotating-circle { transform-origin: center; animation: rotate 10s linear infinite; stroke: currentColor; }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .live-indicator { display: flex; align-items: center; gap: 0.5rem; }
    .live-indicator .dot { width: 10px; height: 10px; background-color: #ef4444; border-radius: 50%; box-shadow: 0 0 8px 2px #ef4444; animation: glow 1.5s infinite ease-in-out; }
    @keyframes glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    
    /* --- RICH TEXT STYLES ADDED HERE --- */
    .post-body p strong, .post-body b { font-weight: 700; color: #111827; }
    .post-body p em, .post-body i { font-style: italic; }
    .post-body p u, .post-body .rich-underline { text-decoration: underline; text-decoration-color: rgba(0,0,0,0.3); text-underline-offset: 3px; }
    /* ---------------------------------- */

    .post-body p { font-size: 1.125rem; line-height: 1.7; color: #374151; margin-bottom: 1.25rem; }
    .post-body img { max-width: 100%; border-radius: 8px; margin-bottom: 0.25rem; }
    .post-body blockquote { font-style: italic; color: #4b5563; border-left: 3px solid #d1d5db; padding-left: 1.5rem; margin: 1.5rem 0; font-size: 1.1rem; }
    .post-body .media-caption { text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; padding-bottom: 1rem; font-style: italic; }
    
    .table-container { overflow-x: auto; margin: 1.5rem 0; border-radius: 8px; border: 1px solid #e5e7eb; background: white; }
    .table-container caption { caption-side: top; text-align: left; padding: 0.75rem; font-size: 0.9rem; font-weight: 600; color: #4b5563; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
    .live-table { width: 100%; border-collapse: collapse; min-width: 600px; }
    .live-table th, .live-table td { padding: 0.75rem 1rem; border: 1px solid #e5e7eb; text-align: left; font-size: 0.95rem; }
    .live-table thead th { background-color: #f3f4f6; font-weight: 700; color: #111827; }
    .table-container.striped .live-table tbody tr:nth-child(even) { background-color: #f9fafb; }
    .table-container.grid .live-table th, .table-container.grid .live-table td { border: 1px solid #d1d5db; }

    .tags-container { margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag-badge { background-color: #eef2ff; color: #4338ca; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-decoration: none; }
    
    .post-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
        min-height: 50px;
        box-sizing: border-box;
        flex-wrap: nowrap;
    }
    
    .share-btn {
        background-color: #f3f4f6;
        border: none;
        border-radius: 999px;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        flex-shrink: 0;
        white-space: nowrap;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .post-stats {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.875rem;
        color: #6b7280;
        flex-shrink: 0;
        padding: 5px 0;
    }
    
    .like-btn-canvas {
        width: 40px;
        height: 40px;
        cursor: pointer;
        flex-shrink: 0;
        display: block;
        margin: 0;
        background-color: transparent;
    }
    
    .professional-btn {
        background-color: #1f2937;
        color: white;
        padding: 12px 28px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
    }
    
    .live-post.is-pinned { border: 2px solid #f59e0b; }
    .pinned-badge { color: #b45309; background-color: #fef3c7; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.25rem; }
    .responsive-iframe-container { position: relative; overflow: hidden; width: 100%; max-width: 550px; margin: 1rem auto; }
    .responsive-iframe-container-16x9 { padding-top: 56.25%; }
    .responsive-iframe-container iframe { position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%; border: none; }
    .instagram-video-container { position: relative; padding-bottom: 125%; height: 0; overflow: hidden; max-width: 500px; margin: 1rem auto; border-radius: 8px; }
    .instagram-video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
    .widget-container { padding: 0; margin: 1.5rem auto !important; max-width: 100%; overflow: hidden; border: 1px solid #e5e7eb; border-radius: 8px; }
    
    .stat-item span { display: inline-block; transition: transform 0.3s ease, opacity 0.3s ease; }

    .loader { display: block; width: 40px; height: 40px; margin: 2rem auto; border: 4px solid #f3f4f6; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .app-only-feature { display: none !important; }
    body.android-app-view .app-only-feature { display: flex !important; }

    .live-translation-controls { gap: 8px; margin-top: 1.5rem; margin-bottom: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed #e5e7eb; }
    .translate-chip-btn { background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s; }
    .translate-chip-btn:hover { background-color: #dcfce7; }
    .translate-chip-btn.hindi { background-color: #eff6ff; border-color: #bfdbfe; color: #1e40af; }
    .translated-text-block { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-size: 1.05rem; color: #1e293b; animation: fadeIn 0.4s ease; }
    .translated-headline { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; line-height: 1.3; }
    
    .translation-progress-container { display: none; margin: 10px 0; width: 100%; background-color: #e2e8f0; border-radius: 4px; overflow: hidden; height: 6px; }
    .translation-progress-bar { height: 100%; width: 50%; background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%); background-size: 200% 100%; border-radius: 4px; animation: loading-indeterminate 1.5s infinite linear; }
    
    @keyframes loading-indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
    .processing-text { display: none; font-size: 0.75rem; color: #64748b; font-style: italic; margin-bottom: 4px; }

    @keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
</style>

<div id="fb-root"></div>

<div class="live-container">
    <header class="live-header py-8">
        <h1 class="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">Live Coverage <div class="live-indicator"><div class="dot"></div></div></h1>
    </header>

    <div id="live-feed-persistence-wrapper" data-turbo-permanent>
        <div id="pinned-post-container"></div>
        <div id="live-feed">
             <div class="loader"></div>
        </div>
    </div>

    <div id="feed-controls" class="text-center mt-8">
        <button id="load-more-btn" class="professional-btn" onclick="if(window.triggerLoadMoreLivePosts) window.triggerLoadMoreLivePosts(event)">Load Previous Updates</button>
        <a href="https://archive-live.tmpnews.com" id="archive-btn" class="professional-btn" style="display: none;">Check Archive History</a>
        <p id="no-more-posts-msg" class="text-gray-500 font-medium py-3" style="display: none;">This is the end. No more updates.</p>
    </div>
</div>

<div id="bottom-nav-placeholder"></div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
(function() {
    // --- IIFE START ---
    
    // --- Translation Logic (Standard) ---
    window.currentTranslatingPostId = null;
    const SEPARATOR_TOKEN = "|||||"; 

    window.requestLivePostTranslation = function(postId, lang) {
        if (window.currentTranslatingPostId) { console.log("Translation already in progress."); return; }
        if (window.AndroidTranslator) {
            window.currentTranslatingPostId = postId;
            const postElement = document.getElementById(`post-${postId}`);
            if (postElement) {
                const controls = postElement.querySelector('.live-translation-controls');
                if(controls) controls.style.opacity = '0.5';
                const headlineEl = postElement.querySelector('.live-post-headline');
                const contentDiv = postElement.querySelector('.post-body');

                if (!postElement.dataset.originalHeadline) postElement.dataset.originalHeadline = headlineEl ? headlineEl.innerText : "";
                if (!postElement.dataset.originalBody) {
                    let cleanText = "";
                    contentDiv.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) cleanText += node.textContent;
                        else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('translated-text-block')) cleanText += node.innerText + "\n"; 
                    });
                    postElement.dataset.originalBody = cleanText.trim();
                }
                const combinedText = postElement.dataset.originalHeadline + SEPARATOR_TOKEN + postElement.dataset.originalBody;
                window.AndroidTranslator.requestTranslation(combinedText, lang);
            }
        } else { console.log("Android Translator Interface not found."); }
    };

    window.updateTranslationProgress = function(isProcessing) {
        if (window.currentTranslatingPostId) {
            const postElement = document.getElementById(`post-${window.currentTranslatingPostId}`);
            if (postElement) {
                const progressBar = postElement.querySelector('.translation-progress-container');
                const processingText = postElement.querySelector('.processing-text');
                const btns = postElement.querySelector('.live-translation-controls');
                if (isProcessing) {
                    if (progressBar) progressBar.style.display = 'block';
                    if (processingText) processingText.style.display = 'block';
                    if (btns) { btns.style.opacity = '0.5'; btns.style.pointerEvents = 'none'; }
                } else {
                    if (progressBar) progressBar.style.display = 'none';
                    if (processingText) processingText.style.display = 'none';
                    if (btns) { btns.style.opacity = '1'; btns.style.pointerEvents = 'auto'; }
                    window.currentTranslatingPostId = null;
                }
            }
        }
    };

    window.updateContentWithTranslation = function(translatedText) {
        if (window.currentTranslatingPostId) {
            const postElement = document.getElementById(`post-${window.currentTranslatingPostId}`);
            if (postElement) {
                const contentDiv = postElement.querySelector('.post-body');
                const existingTrans = contentDiv.querySelectorAll('.translated-text-block');
                existingTrans.forEach(el => el.remove());

                let transHeadline = "";
                let transBody = translatedText;
                if (translatedText.includes("|||||")) {
                    const parts = translatedText.split("|||||");
                    transHeadline = parts[0].trim();
                    transBody = parts[1].trim();
                }
                transBody = transBody.replace(/\|\|\|\|\|/g, "");

                const translationContainer = document.createElement('div');
                translationContainer.className = 'translated-text-block';
                translationContainer.innerHTML = `<div style="font-size:0.7rem; font-weight:700; text-transform:uppercase; color:#3b82f6; margin-bottom:8px;">Translated Content</div><div class="translated-headline">${transHeadline}</div><div style="line-height:1.6;">${transBody.replace(/\n/g, '<br>')}</div>`;
                contentDiv.appendChild(translationContainer);
                const controls = postElement.querySelector('.live-translation-controls');
                if(controls) controls.style.opacity = '1';
            }
        }
    };

    // --- Helper Functions ---
    function animateCountUp(element, startValue, endValue, duration = 800) {
        if (startValue === endValue) { element.textContent = endValue; return; }
        let startTime = null;
        const easeOutQuad = t => t * (2 - t);
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const t = Math.min(progress / duration, 1);
            const easedT = easeOutQuad(t);
            const currentValue = Math.floor(easedT * (endValue - startValue) + startValue);
            element.textContent = currentValue;
            if (t < 1) { requestAnimationFrame(step); } else { element.textContent = endValue; }
        };
        requestAnimationFrame(step);
    }

    // --- IMPROVED STAR BUTTON CLASS WITH PROFESSIONAL LIKE COUNTING ---
    class CanvasLikeButton {
        constructor(canvas, postId, postElement) {
            this.canvas = canvas; 
            // FIXED: Ensure ID is always a String for localStorage matching
            this.postId = String(postId);
            this.postElement = postElement;
            
            // PROFESSIONAL FIX: Get liked state from localStorage FIRST
            const likedPosts = new Set(JSON.parse(localStorage.getItem('likedLivePosts') || '[]'));
            this.isLiked = likedPosts.has(this.postId);
            
            // Store liked state on canvas immediately
            canvas.dataset.liked = this.isLiked;
            
            // Initialize canvas context and dimensions
            this.initializeCanvas();
            
            // Draw the star immediately
            this.drawStarNow();
            
            // Setup animation states
            this.isHovered = false;
            this.isLooping = false;
            this.starAnimation = { scale: 1, isAnimating: false, direction: 'up', rotation: 0, targetRotation: 0 };
            this.circleAnimation = { radius: 0, opacity: 1, isAnimating: false };
            this.particles = [];
            
            // Setup listeners
            this.setupEventListeners();
            
            // Mark as initialized
            canvas.dataset.initialized = 'true';
            canvas._canvasButtonInstance = this;
        }
        
        initializeCanvas() {
            // Get context with proper settings
            this.ctx = this.canvas.getContext('2d', {
                alpha: true,
                desynchronized: false
            });
            
            // Set dimensions
            this.dpr = window.devicePixelRatio || 1;
            this.logicalWidth = 40;
            this.logicalHeight = 40;
            
            // Set canvas drawing buffer size
            this.canvas.width = this.logicalWidth * this.dpr;
            this.canvas.height = this.logicalHeight * this.dpr;
            
            // Set canvas display size
            this.canvas.style.width = `${this.logicalWidth}px`;
            this.canvas.style.height = `${this.logicalHeight}px`;
            
            // Scale context
            this.ctx.scale(this.dpr, this.dpr);
            
            // Calculate center
            this.buttonCenter = { 
                x: this.logicalWidth / 2, 
                y: this.logicalHeight / 2 
            };
        }
        
        // This is for the STATIC state (initial load/reset)
        drawStarNow() {
            // Clear the canvas FIRST - This is correct for static drawing
            this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
            
            // Save context state
            this.ctx.save();
            
            // Move to center
            this.ctx.translate(this.buttonCenter.x, this.buttonCenter.y);
            
            // Set colors based on liked state
            this.ctx.strokeStyle = this.isLiked ? '#facc15' : '#6b7280';
            this.ctx.fillStyle = this.isLiked ? '#fde047' : '#374151';
            this.ctx.lineWidth = 2;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            
            // Draw star shape
            const spikes = 5;
            const outerRadius = 16;
            const innerRadius = 8;
            let rot = Math.PI / 2 * 3;
            let x = 0;
            let y = 0;
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
            
            // Add shadow only if liked
            if (this.isLiked) {
                this.ctx.shadowColor = 'rgba(250, 204, 21, 0.5)';
                this.ctx.shadowBlur = 8;
            } else {
                this.ctx.shadowColor = 'transparent';
                this.ctx.shadowBlur = 0;
            }
            
            // Fill and stroke
            this.ctx.fill();
            this.ctx.stroke();
            
            // Restore context
            this.ctx.restore();
        }

        // This is for the ANIMATION loop (does NOT clearRect)
        drawStar(centerX, centerY, scale = 1, rotation = 0) {
            // DO NOT CLEAR RECT HERE - The animation loop handles clearing!
            
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.scale(scale, scale);
            this.ctx.rotate(rotation);
            
            // Use the current isLiked state for colors
            this.ctx.strokeStyle = this.isLiked ? '#facc15' : '#6b7280';
            this.ctx.fillStyle = this.isLiked ? '#fde047' : '#374151';
            this.ctx.lineWidth = 2;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            
            const spikes = 5;
            const outerRadius = 16;
            const innerRadius = 8;
            let rot = Math.PI / 2 * 3;
            let x = 0;
            let y = 0;
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
            
            // Only add shadow if liked
            if (this.isLiked) {
                this.ctx.shadowColor = 'rgba(250, 204, 21, 0.5)';
                this.ctx.shadowBlur = 8;
            } else {
                this.ctx.shadowColor = 'transparent';
                this.ctx.shadowBlur = 0;
            }
            
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
                
                this.particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    radius: radius,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: 1
                });
            }
        }

        startAnimationLoop() {
            if (!this.isLooping) {
                this.isLooping = true;
                this.animate();
            }
        }

        animate() {
            // Start animation loop if not already running
            if (!this.isLooping) {
                this.isLooping = true;
            }
            
            // Clear the canvas ONCE per frame
            this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
            let isDirty = false;

            // Handle circle animation (blue expanding circle)
            if (this.circleAnimation.isAnimating) {
                this.circleAnimation.radius += 2.5;
                this.circleAnimation.opacity -= 0.04;
                if (this.circleAnimation.opacity <= 0) {
                    this.circleAnimation.isAnimating = false;
                } else {
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.arc(this.buttonCenter.x, this.buttonCenter.y, this.circleAnimation.radius, 0, Math.PI * 2);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${this.circleAnimation.opacity})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                    this.ctx.restore();
                    isDirty = true;
                }
            }

            // Handle particles animation
            if (this.particles.length > 0) {
                // Process particles in reverse order for safe removal
                for (let i = this.particles.length - 1; i >= 0; i--) {
                    const p = this.particles[i];
                    
                    // Update position
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.1; // Gravity
                    p.vx *= 0.99; // Friction
                    p.opacity -= 0.02; // Fade
                    
                    // Remove dead particles
                    if (p.opacity <= 0) {
                        this.particles.splice(i, 1);
                        continue;
                    }
                    
                    // Draw particle
                    this.ctx.save();
                    this.ctx.globalAlpha = p.opacity;
                    this.ctx.fillStyle = p.color;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                    
                    isDirty = true;
                }
            }

            // Handle star scale animation
            let targetScale = this.isHovered ? 1.1 : 1;
            if (this.starAnimation.isAnimating) {
                isDirty = true;
                if (this.starAnimation.direction === 'up') {
                    this.starAnimation.scale += 0.07;
                    if (this.starAnimation.scale >= 1.25) {
                        this.starAnimation.direction = 'down';
                    }
                } else {
                    this.starAnimation.scale -= 0.09;
                    if (this.starAnimation.scale <= targetScale) {
                        this.starAnimation.scale = targetScale;
                        this.starAnimation.isAnimating = false;
                    }
                }
            } else {
                const diff = targetScale - this.starAnimation.scale;
                if (Math.abs(diff) > 0.001) {
                    this.starAnimation.scale += diff * 0.2;
                    isDirty = true;
                } else {
                    this.starAnimation.scale = targetScale;
                }
            }

            // Handle star rotation animation
            const rotDiff = this.starAnimation.targetRotation - this.starAnimation.rotation;
            if (Math.abs(rotDiff) > 0.01) {
                this.starAnimation.rotation += rotDiff * 0.15;
                isDirty = true;
            } else {
                this.starAnimation.rotation = this.starAnimation.targetRotation;
            }

            // Draw the star with current animation values
            // IMPORTANT: This now calls the function that DOES NOT clear the canvas
            this.drawStar(this.buttonCenter.x, this.buttonCenter.y, this.starAnimation.scale, this.starAnimation.rotation);

            // Continue animation if there's still something to animate
            if (isDirty) {
                requestAnimationFrame(() => this.animate());
            } else {
                this.isLooping = false;
            }
        }

        setupEventListeners() {
            // Remove any existing listeners by replacing the canvas
            const newCanvas = this.canvas.cloneNode(false);
            
            // Copy important attributes and data
            newCanvas.id = this.canvas.id;
            newCanvas.className = this.canvas.className;
            newCanvas.width = this.canvas.width;
            newCanvas.height = this.canvas.height;
            newCanvas.style.cssText = this.canvas.style.cssText;
            newCanvas.dataset.initialized = 'true';
            newCanvas.dataset.liked = this.isLiked;
            newCanvas._canvasButtonInstance = this;
            
            // Replace canvas
            this.canvas.parentNode.replaceChild(newCanvas, this.canvas);
            this.canvas = newCanvas;
            
            // Re-initialize context on new canvas
            this.ctx = this.canvas.getContext('2d');
            this.ctx.scale(this.dpr, this.dpr);
            
            // Redraw star immediately after replacing canvas
            this.drawStarNow();
            
            // Click handler - prevents double counting
            this.canvas.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleClick();
            }, { passive: false });
            
            // Hover handlers
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left) * (this.logicalWidth / rect.width);
                const mouseY = (e.clientY - rect.top) * (this.logicalHeight / rect.height);
                const dist = Math.sqrt(Math.pow(mouseX - this.buttonCenter.x, 2) + Math.pow(mouseY - this.buttonCenter.y, 2));
                const wasHovered = this.isHovered;
                this.isHovered = dist < 25;
                if (this.isHovered !== wasHovered) {
                    this.startAnimationLoop();
                }
            });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.isHovered = false;
                this.startAnimationLoop();
            });
            
            // Touch support for mobile
            this.canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const rect = this.canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const mouseX = (touch.clientX - rect.left) * (this.logicalWidth / rect.width);
                const mouseY = (touch.clientY - rect.top) * (this.logicalHeight / rect.height);
                const dist = Math.sqrt(Math.pow(mouseX - this.buttonCenter.x, 2) + Math.pow(mouseY - this.buttonCenter.y, 2));
                if (dist < 25) {
                    this.handleClick();
                }
            }, { passive: false });
        }

        handleClick() {
            // PROFESSIONAL FIX: Toggle liked state
            this.isLiked = !this.isLiked;
            this.canvas.dataset.liked = this.isLiked;
            
            // Trigger star animation
            this.starAnimation.isAnimating = true;
            this.starAnimation.direction = 'up';
            this.starAnimation.targetRotation += Math.PI * 2;

            // Create particles and circle animation only when LIKING (not when unliking)
            if (this.isLiked) {
                this.circleAnimation.isAnimating = true;
                this.circleAnimation.radius = 0;
                this.circleAnimation.opacity = 1;
                this.createParticles(this.buttonCenter.x, this.buttonCenter.y);
            } else {
                // Clear particles when unliking
                this.particles = [];
            }
            
            // Start the animation loop
            this.startAnimationLoop();
            
            // Update the like count display
            const likeCountSpan = this.postElement.querySelector(`#like-count-${this.postId}`);
            if (likeCountSpan) {
                let currentCount = parseInt(likeCountSpan.textContent.replace(/,/g, '')) || 0;
                const newCount = this.isLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
                animateCountUp(likeCountSpan, currentCount, newCount, 300);
                
                // Call toggleLike function to update server
                if (window.toggleLike) {
                    window.toggleLike(this.postId, this, this.postElement);
                }
            }
            
            // PROFESSIONAL FIX: Update localStorage to track user likes
            // Ensure we use STRING ID to prevent duplications/mismatches
            const likedPosts = new Set(JSON.parse(localStorage.getItem('likedLivePosts') || '[]'));
            if (this.isLiked) {
                likedPosts.add(this.postId);
            } else {
                likedPosts.delete(this.postId);
            }
            localStorage.setItem('likedLivePosts', JSON.stringify(Array.from(likedPosts)));
        }
        
        reinitializeCanvas() {
            // Recreate context
            this.ctx = this.canvas.getContext('2d');
            
            // Re-apply scale
            this.ctx.scale(this.dpr, this.dpr);
            
            // Redraw immediately
            this.drawStarNow();
        }
    }

    // --- CANVAS REINITIALIZATION FUNCTION ---
    function reinitializeCanvasButtons() {
        // Find all canvas elements
        const canvasElements = document.querySelectorAll('.like-btn-canvas');
        
        canvasElements.forEach(canvasEl => {
            const postIdMatch = canvasEl.id.match(/like-canvas-(\d+)/);
            if (!postIdMatch) return;
            
            const postId = postIdMatch[1];
            const postElement = canvasEl.closest('.live-post');
            
            if (!postElement) return;
            
            // Check if we already have an instance
            if (canvasEl._canvasButtonInstance) {
                // Just redraw the star
                canvasEl._canvasButtonInstance.reinitializeCanvas();
                return;
            }
            
            // Create new instance - this will draw the star immediately
            const canvasButton = new CanvasLikeButton(canvasEl, postId, postElement);
            postElement.canvasButtonInstance = canvasButton;
        });
    }

    // --- FIX FOR LIVE BUTTON NOT WORKING AFTER TAB SWITCH ---
    function fixLiveButtonClickHandlers() {
        // Find all like buttons and ensure they have proper click handlers
        const likeButtons = document.querySelectorAll('.like-btn-canvas');
        likeButtons.forEach(canvas => {
            if (canvas._canvasButtonInstance) {
                // Re-setup event listeners for this button
                canvas._canvasButtonInstance.setupEventListeners();
            }
        });
        
        // Also fix share button event delegation
        setupShareButtonDelegation();
    }
    
    function setupShareButtonDelegation() {
        // Remove any existing listeners to prevent duplicates
        document.removeEventListener('click', handleShareButtonClick);
        
        // Add fresh listener
        document.addEventListener('click', handleShareButtonClick);
    }
    
    function handleShareButtonClick(e) {
        // Handle share button clicks only
        if (e.target.closest('.share-btn')) {
            e.preventDefault();
            const shareBtn = e.target.closest('.share-btn');
            const postId = shareBtn.dataset.postId;
            const postHeadline = shareBtn.dataset.postHeadline;
            const postUrl = `${window.location.origin}${window.location.pathname}#post-${postId}`;
            const shareText = `Live Update: ${postHeadline}`;
            
            if (window.AndroidInterface && typeof window.AndroidInterface.share === 'function') { 
                window.AndroidInterface.share(postHeadline, shareText, postUrl); 
            } else if (navigator.share) { 
                navigator.share({ title: postHeadline, text: shareText, url: postUrl }); 
            } else { 
                alert(`Share this link:\n${postUrl}`); 
            }
        }
    }

    // --- MAIN INITIALIZATION FUNCTION ---
    function initLiveFeed() {
        if (window.AndroidTranslator) {
            console.log("Android App Detected: Enabling Native Features");
            document.body.classList.add('android-app-view');
        }

        const pinnedPostContainer = document.getElementById('pinned-post-container');
        const liveFeed = document.getElementById('live-feed');
        if (!liveFeed) return; 

        document.addEventListener('turbo:before-visit', () => {
            sessionStorage.setItem('liveFeedScroll', window.scrollY);
        }, { once: true });

        const SUPABASE_URL = 'https://ofszjurrajwtbwlfckhi.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mc3pqdXJyYWp3dGJ3bGZja2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDk2MzgsImV4cCI6MjA3NDk4NTYzOH0.kKafp8dEL7V0Y10-oNbjluYblA03a0V_OqB9XOBd9SA';
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        const LIVE_FEED_URL = 'https://data.tmpnews.com/feed.json'; 
        
        const archiveBtn = document.getElementById('archive-btn');
        const noMorePostsMsg = document.getElementById('no-more-posts-msg');
        const INITIAL_LOAD_COUNT = 30; 
        const SUBSEQUENT_LOAD_COUNT = 30;
        const CACHE_KEY = 'cachedLiveFeed';
        const PREFETCH_KEY = 'prefetchedLiveFeed';
        const PREFETCH_TIMESTAMP_KEY = 'prefetchedLiveFeedTimestamp';
        
        let allPosts = []; 
        let loadedPostsCount = 0; 
        
        const viewedPosts = new Set(JSON.parse(sessionStorage.getItem('viewedLivePosts') || '[]'));
        const likedPosts = new Set(JSON.parse(localStorage.getItem('likedLivePosts') || '[]'));
        const animatedPosts = new Set(JSON.parse(sessionStorage.getItem('animatedLivePosts') || '[]'));

        if (!localStorage.getItem('anonClientId')) { localStorage.setItem('anonClientId', 'anon-' + Date.now() + Math.random().toString(36).substring(2, 9)); }

        function parseContent(content) {
            if (!content) return '';
            const placeholders = [];
            let tempContent = content;
            const allKeywords = 'link-button|twitter-video|twitter|instagram-video|instagram|facebook|youtube|tiktok|linkedin|reddit|telegram';
            const regex = new RegExp(`\\[(${allKeywords})\\|?(.*)\\]\\((.*)\\)|!\\[(.*?)\\]\\((.*)\\)|\\[WIDGET\\|(.*)\\|(.*)\\]([\\s\\S]*?)(?=\\n\\n|$)`, 'g');
            tempContent = tempContent.replace(regex, (match, socialType, socialDesc, socialUrl, imgAlt, imgUrl, widgetType, widgetCaption, widgetContent) => {
                let htmlBlock = '';
                if (widgetType) {
                    const caption = widgetCaption ? `<p class="media-caption">${widgetCaption}</p>` : '';
                    htmlBlock = `<div class="my-4 widget-container" data-type="${widgetType}" style="max-width: 600px; margin: 1.5rem auto;">${widgetContent}</div>${caption}`;
                } else if (imgAlt || imgUrl) {
                    const captionHTML = (imgAlt && imgAlt.toLowerCase() !== 'image' && imgAlt.trim() !== '') ? `<p class="media-caption">${imgAlt}</p>` : '';
                    htmlBlock = `<div class="my-4"><img src="${imgUrl}" alt="${imgAlt || ''}" class="my-0 mx-auto rounded-lg">${captionHTML}</div>`;
                } else if (socialType) {
                    const caption = socialDesc ? `<p class="media-caption">${socialDesc}</p>` : '';
                    const url = socialUrl;
                    switch (socialType) {
                        case 'link-button': htmlBlock = `<div class="my-4 text-center"><a href="${url}" target="_blank" class="professional-btn" style="background-color: #2563eb; color: white; display: inline-block; text-decoration: none; width: auto; min-width: 200px;">${socialDesc || 'Open Link'} <i class="fas fa-external-link-alt ml-2"></i></a></div>`; break;
                        case 'twitter': htmlBlock = `<div class="my-4"><blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><a href="${url.replace('x.com', 'twitter.com')}"></a></blockquote>${caption}</div>`; break;
                        case 'twitter-video': htmlBlock = `<div class="my-4"><blockquote class="twitter-tweet" data-dnt="true" data-theme="light" data-conversation="none"><a href="${url.replace('x.com', 'twitter.com')}"></a></blockquote>${caption}</div>`; break;
                        case 'instagram': htmlBlock = `<div class="my-4"><blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14"></blockquote>${caption}</div>`; break;
                        case 'instagram-video': const igMatch = url.match(/\/(p|reel)\/([a-zA-Z0-9_-]+)/); if (igMatch && igMatch[2]) { htmlBlock = `<div class="instagram-video-container my-4"><iframe src="https://www.instagram.com/p/${igMatch[2]}/embed" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>${caption}</div>`; } else { htmlBlock = `<div class="my-4"><blockquote class("instagram-media") data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14"></blockquote>${caption}</div>`; } break;
                        case 'facebook': htmlBlock = `<div class="my-4"><div class="fb-post" data-href="${url}" data-width="auto" data-show-text="true"></div>${caption}</div>`; break;
                        case 'youtube': const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/); if (ytMatch && ytMatch[1]) { htmlBlock = `<div class="responsive-iframe-container responsive-iframe-container-16x9 my-4"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1" allowfullscreen></iframe></div>${caption}`; } break;
                        case 'tiktok': htmlBlock = `<div class="my-4"><blockquote class="tiktok-embed" cite="${url}" data-embed-from="embed_page"> <section></section> </blockquote>${caption}</div>`; break;
                        case 'linkedin': htmlBlock = `<div class="my-4"><div class="linkedin-post" data-href="${url}"></div>${caption}</div>`; break;
                        case 'reddit': htmlBlock = `<div class="my-4"><blockquote class="reddit-embed-bq" data-embed-height="500"><a href="${url}">Post</a></blockquote>${caption}</div>`; break;
                        case 'telegram': const tgMatch = url.match(/t\.me\/([a-zA-Z0-9_]+\/\d+)/); if (tgMatch && tgMatch[1]) { htmlBlock = `<div class="my-4"><blockquote class="telegram-post" data-post="${tgMatch[1]}" data-width="100%"></blockquote>${caption}`; } break;
                    }
                }
                placeholders.push(htmlBlock);
                return `__PLACEHOLDER_${placeholders.length - 1}__`;
            });
            const processedText = tempContent.split('\n\n').map(p => {
                if (p.startsWith('__PLACEHOLDER_')) return p;
                if (p.trim() === '') return '';
                if (p.trim().startsWith('<div class="table-container"') || p.trim().startsWith('<table')) { return p; }
                
                // --- RICH TEXT COMPILATION FEATURE ADDED HERE ---
                // Compiles <b>, <i>, <u>, and <font color> tags into styled spans/elements
                p = p.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
                     .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
                     .replace(/<u>(.*?)<\/u>/g, '<span class="rich-underline">$1</span>')
                     .replace(/<font color=["']?([^"'>]+)["']?>(.*?)<\/font>/g, '<span style="color: $1;">$2</span>');
                // ------------------------------------------------
                
                return p.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>').trim() === '' ? '' : `<p>${p.replace(/\n/g, '<br>')}</p>`;
            }).join('');
            return processedText.replace(/__PLACEHOLDER_(\d+)__/g, (match, index) => placeholders[parseInt(index, 10)]);
        }

        function loadSocialScripts() {
            const scripts = { twitter: 'https://platform.twitter.com/widgets.js', instagram: '//www.instagram.com/embed.js', facebook: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0', tiktok: 'https://www.tiktok.com/embed.js', reddit: 'https://embed.reddit.com/widgets.js', telegram: 'https://telegram.org/js/telegram-widget.js?22', linkedin: 'https://platform.linkedin.com/Voyager/js/posts/embed.js' };
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

        const ANALYTICS_WRITE_URL = 'https://data.tmpnews.com/feed.json'; 
        
        async function incrementViewCount(postId) {
            if (viewedPosts.has(postId)) return;
            viewedPosts.add(postId);
            sessionStorage.setItem('viewedLivePosts', JSON.stringify(Array.from(viewedPosts)));
            fetch(`${ANALYTICS_WRITE_URL}?log=view&post_id=${postId}&client_id=${localStorage.getItem('anonClientId')}`, { method: 'GET', cache: 'no-store' })
                .then(() => console.log(`View logged for ${postId}`))
                .catch(error => { console.error("View log failed:", error); viewedPosts.delete(postId); sessionStorage.setItem('viewedLivePosts', JSON.stringify(Array.from(viewedPosts))); });
        }
        
        async function toggleLike(postId, canvasButtonInstance, postElement) {
            // FIXED: Force String conversion for ID
            const postIdStr = String(postId);
            const action = canvasButtonInstance.isLiked ? 'increment' : 'decrement';
            const likeCountSpan = postElement.querySelector(`#like-count-${postId}`);
            
            fetch(`${ANALYTICS_WRITE_URL}?log=like&post_id=${postId}&action=${action}&client_id=${localStorage.getItem('anonClientId')}`, { method: 'GET', cache: 'no-store' })
                .then(() => {
                    // Update global cache (using String ID)
                    if (action === 'increment') {
                        likedPosts.add(postIdStr);
                    } else {
                        likedPosts.delete(postIdStr);
                    }
                    localStorage.setItem('likedLivePosts', JSON.stringify(Array.from(likedPosts)));
                    fetch(LIVE_FEED_URL, { cache: 'no-cache' });
                })
                .catch(error => {
                    console.error("Like log failed.", error); 
                    // Revert the visual state
                    canvasButtonInstance.isLiked = !canvasButtonInstance.isLiked;
                    canvasButtonInstance.canvas.dataset.liked = canvasButtonInstance.isLiked;
                    canvasButtonInstance.drawStarNow();
                });
        }
        
        // Store toggleLike globally
        window.toggleLike = toggleLike;

        function renderPost(postData, container, insertAtTop = false) {
            const postElement = document.createElement('div');
            postElement.className = 'live-post';
            postElement.id = `post-${postData.id}`; 
            if (insertAtTop) postElement.classList.add('new-post-animation');
            if (postData.is_pinned) postElement.classList.add('is-pinned');
            let tagsHTML = postData.tags?.length > 0 ? '<div class="tags-container">' + postData.tags.map(tag => `<a href="#" class="tag-badge">#${tag}</a>`).join('') + '</div>' : '';
            let pinnedBadgeHTML = postData.is_pinned ? `<span class="pinned-badge"><i class="fas fa-thumbtack fa-xs"></i><span class="ml-1.5">PINNED</span></span>` : '';
            const logoSVG = `<svg class="post-author-logo" viewBox="0 0 200 200" aria-hidden="true"><rect x="50" y="50" width="100" height="100" class="square"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" class="tmp-text">TMP</text><circle cx="100" cy="100" r="80" fill="none" stroke-width="2" class="rotating-circle"/></svg>`;
            const formattedDate = new Date(postData.timestamp).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
            
            const initialViewCount = postData.view_count || 0;
            const initialLikeCount = postData.like_count || 0;
            
            const progressBarHTML = `<div class="processing-text">Downloading model & translating...</div><div class="translation-progress-container"><div class="translation-progress-bar"></div></div>`;
            const translationButtonsHTML = `<div class="live-translation-controls app-only-feature"><button class="translate-chip-btn hindi" onclick="requestLivePostTranslation('${postData.id}', 'hi')"><i class="fas fa-language"></i> Hindi</button><button class="translate-chip-btn" onclick="requestLivePostTranslation('${postData.id}', 'ur')"><i class="fas fa-language"></i> Urdu</button></div>`;

            postElement.innerHTML = `<div class="live-post-content p-4 md:p-6"><div class="live-post-meta"><div class="live-post-author-group">${logoSVG}<span class="live-post-author">By ${postData.author_name}</span></div><span class="live-post-time">${formattedDate}</span>${pinnedBadgeHTML}</div><h2 class="live-post-headline">${postData.headline || ''}</h2>${tagsHTML}<div class="post-body pt-4">${parseContent(postData.content)}</div>${progressBarHTML}${translationButtonsHTML}<div class="post-footer"><div class="post-stats" data-post-id="${postData.id}"><canvas id="like-canvas-${postData.id}" class="like-btn-canvas" width="40" height="40" title="Like"></canvas><span id="like-count-${postData.id}" class="like-count">${initialLikeCount}</span><div class="stat-item" style="margin-left: 0.5rem;"><i class="fas fa-eye"></i><span id="view-count-${postData.id}">${initialViewCount}</span></div></div><button class="share-btn" data-post-id="${postData.id}" data-post-headline="${postData.headline || 'Live Update'}"><i class="fas fa-share-alt mr-2"></i>Share</button></div></div>`;
            
            if (insertAtTop) { container.prepend(postElement); } else { container.appendChild(postElement); }
            
            const canvasEl = postElement.querySelector(`#like-canvas-${postData.id}`);
            if (canvasEl) {
                // Create canvas button instance - this will draw the star immediately with correct like state
                const canvasButton = new CanvasLikeButton(canvasEl, postData.id, postElement);
                postElement.canvasButtonInstance = canvasButton;
            }

            incrementViewCount(postData.id);
            setTimeout(() => { 
                const likeCountSpan = document.getElementById(`like-count-${postData.id}`);
                const viewCountSpan = document.getElementById(`view-count-${postData.id}`);
                if (!animatedPosts.has(postData.id)) {
                    if(likeCountSpan) animateCountUp(likeCountSpan, 0, initialLikeCount);
                    if(viewCountSpan) animateCountUp(viewCountSpan, 0, initialViewCount);
                    animatedPosts.add(postData.id);
                    sessionStorage.setItem('animatedLivePosts', JSON.stringify(Array.from(animatedPosts)));
                }
            }, 100);
        }

        async function fetchFullFeed(forceCacheBypass = false) {
             const prefetchedData = localStorage.getItem(PREFETCH_KEY);
             if (prefetchedData) {
                localStorage.removeItem(PREFETCH_KEY);
                localStorage.removeItem(PREFETCH_TIMESTAMP_KEY);
                allPosts = JSON.parse(prefetchedData);
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(allPosts));
                return allPosts;
             }
             const cachedData = sessionStorage.getItem(CACHE_KEY); 
             if (cachedData && !forceCacheBypass) {
                allPosts = JSON.parse(cachedData);
                return allPosts;
            }
            try {
                const fetchOptions = forceCacheBypass ? { cache: 'no-cache' } : {};
                const response = await fetch(LIVE_FEED_URL, fetchOptions); 
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (!Array.isArray(data)) throw new Error("Invalid data format.");
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(data)); 
                allPosts = data;
                return allPosts;
            } catch (error) { console.error('Error fetching feed:', error); return []; }
        }

        async function loadMorePosts(isFullRefresh = false) {
             const loadMoreBtn = document.getElementById('load-more-btn');
             if (!loadMoreBtn) return;

             // Recalculate how many posts are ALREADY visible
             loadedPostsCount = document.querySelectorAll('#live-feed .live-post').length;

             if (isFullRefresh) {
                animatedPosts.clear();
                sessionStorage.removeItem('animatedLivePosts');
                pinnedPostContainer.innerHTML = '';
                liveFeed.innerHTML = '';
                loadedPostsCount = 0;
             }

             // Show Loading State
             loadMoreBtn.disabled = true;
             loadMoreBtn.textContent = 'Loading...';

             // CRITICAL FIX: If allPosts is empty (lost from memory), FETCH IT AGAIN
             if (allPosts.length === 0 || isFullRefresh) {
                 const fullFeed = await fetchFullFeed(isFullRefresh);
                 if (fullFeed.length === 0) {
                    liveFeed.innerHTML = '';
                    loadMoreBtn.style.display = 'none'; 
                    noMorePostsMsg.textContent = "No updates have been posted yet."; 
                    noMorePostsMsg.style.display = 'block';
                    return;
                 }
                 
                 const pinned = fullFeed.find(p => p.is_pinned);
                 if (pinned && (isFullRefresh || pinnedPostContainer.innerHTML.trim() === '')) {
                     pinnedPostContainer.innerHTML = '';
                     renderPost(pinned, pinnedPostContainer, false);
                 }
                 allPosts = fullFeed.filter(p => !p.is_pinned); 
             }
            
            if (loadedPostsCount === 0 && liveFeed.innerHTML.includes('loader')) {
                liveFeed.innerHTML = ''; 
            }

            // NOW it is safe to check if we have more to show
            if (loadedPostsCount >= allPosts.length) {
                loadMoreBtn.style.display = 'none'; 
                archiveBtn.style.display = 'inline-block'; 
                noMorePostsMsg.style.display = 'block';
                return;
            }

            const startIndex = loadedPostsCount;
            const limit = (loadedPostsCount === 0) ? INITIAL_LOAD_COUNT : SUBSEQUENT_LOAD_COUNT;
            const endIndex = startIndex + limit;
            const batch = allPosts.slice(startIndex, endIndex);
            
            batch.forEach(post => renderPost(post, liveFeed, false));
            
            loadedPostsCount += batch.length;
            loadSocialScripts();

            if (startIndex === 0) {
                const savedScroll = sessionStorage.getItem('liveFeedScroll');
                if (savedScroll) {
                    setTimeout(() => window.scrollTo(0, parseInt(savedScroll)), 50);
                }
            }

            // Update Button State again after render
            if (loadedPostsCount >= allPosts.length) {
                loadMoreBtn.style.display = 'none'; archiveBtn.style.display = 'inline-block'; noMorePostsMsg.style.display = 'block';
            } else {
                loadMoreBtn.disabled = false; 
                loadMoreBtn.textContent = 'Load Previous Updates'; 
                loadMoreBtn.style.display = 'inline-block'; 
                archiveBtn.style.display = 'none'; 
                noMorePostsMsg.style.display = 'none';
            }
            
            // Fix button handlers after loading
            setTimeout(fixLiveButtonClickHandlers, 100);
        }

        // Expose to window for the inline onclick handler
        window.triggerLoadMoreLivePosts = (e) => {
            if(e) e.preventDefault();
            loadMorePosts(false);
        };
        
        supabaseClient.channel('live_updates_listener')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'live_posts' }, (payload) => {
                sessionStorage.removeItem(CACHE_KEY); 
                localStorage.removeItem(PREFETCH_KEY); 
                const newPostData = payload.new;
                if (payload.eventType === 'INSERT') {
                    if (!newPostData.is_pinned) {
                        renderPost(newPostData, liveFeed, true); 
                        allPosts.unshift(newPostData);
                        loadedPostsCount++;
                        // Fix button handlers for new post
                        setTimeout(fixLiveButtonClickHandlers, 100);
                    } else { loadMorePosts(true); }
                } 
                else if (payload.eventType === 'UPDATE') {
                    const existingElement = document.getElementById(`post-${newPostData.id}`);
                    
                    // Use 'is-pinned' (hyphen) to match your CSS class
                    const currentIsPinned = existingElement ? existingElement.classList.contains('is-pinned') : false;
                    const newIsPinned = newPostData.is_pinned;

                    if (existingElement && newIsPinned !== currentIsPinned) { 
                        loadMorePosts(true); 
                    }
                    else if (existingElement) {
                        // Just update the numbers without reloading
                        const likeCountSpan = existingElement.querySelector(`#like-count-${newPostData.id}`);
                        const viewCountSpan = existingElement.querySelector(`#view-count-${newPostData.id}`);
                        
                        if (likeCountSpan) {
                            const currentLikes = parseInt(likeCountSpan.textContent.replace(/,/g, '')) || 0;
                            animateCountUp(likeCountSpan, currentLikes, newPostData.like_count);
                        }
                        if (viewCountSpan) {
                            const currentViews = parseInt(viewCountSpan.textContent.replace(/,/g, '')) || 0;
                            animateCountUp(viewCountSpan, currentViews, newPostData.view_count);
                        }
                    }
                }
                else if (payload.eventType === 'DELETE') {
                    const elementToRemove = document.getElementById(`post-${payload.old.id}`);
                    if (elementToRemove) elementToRemove.remove();
                    allPosts = allPosts.filter(p => p.id !== payload.old.id);
                    loadedPostsCount = document.querySelectorAll('#live-feed .live-post').length; 
                    if (payload.old.is_pinned) loadMorePosts(true);
                }
            }).subscribe();

        // Setup share button delegation initially
        setupShareButtonDelegation();

        // --- RESTORE LOGIC ---
        const totalPostsOnScreen = document.querySelectorAll('#live-feed .live-post').length;
        
        if (totalPostsOnScreen > 0) {
            const posts = document.querySelectorAll('.live-post');
            const likedPostsSet = new Set(JSON.parse(localStorage.getItem('likedLivePosts') || '[]'));
            
            posts.forEach(postEl => {
                const postId = postEl.id.replace('post-', '');
                const canvasEl = postEl.querySelector(`#like-canvas-${postId}`);
                if (canvasEl) {
                    // Create or restore canvas button instance - this will draw the star immediately with correct like state
                    const canvasButton = new CanvasLikeButton(canvasEl, postId, postEl);
                    postEl.canvasButtonInstance = canvasButton;
                }
            });

            const cachedData = sessionStorage.getItem(CACHE_KEY);
            if (cachedData) { 
                const fullFeed = JSON.parse(cachedData);
                const loadMoreBtn = document.getElementById('load-more-btn');
                allPosts = fullFeed.filter(p => !p.is_pinned); 
                
                if (allPosts.length > 0 && totalPostsOnScreen >= allPosts.length) {
                     if(loadMoreBtn) loadMoreBtn.style.display = 'none'; archiveBtn.style.display = 'inline-block'; noMorePostsMsg.style.display = 'block';
                } else {
                     if(loadMoreBtn) { loadMoreBtn.style.display = 'inline-block'; loadMoreBtn.disabled = false; loadMoreBtn.textContent = 'Load Previous Updates'; }
                }
            } else {
                fetchFullFeed(false).then((data) => {
                     // IMPORTANT: Ensure we count ignoring pinned for button state
                     const loadMoreBtn = document.getElementById('load-more-btn');
                     const feedCount = data.length - (data.find(p=>p.is_pinned)?1:0);
                     if (totalPostsOnScreen >= feedCount) {
                        if(loadMoreBtn) loadMoreBtn.style.display = 'none'; archiveBtn.style.display = 'inline-block'; noMorePostsMsg.style.display = 'block';
                     } else {
                        if(loadMoreBtn) { loadMoreBtn.style.display = 'inline-block'; loadMoreBtn.disabled = false; loadMoreBtn.textContent = 'Load Previous Updates'; }
                     }
                });
            }

            const stuckLoader = liveFeed.querySelector('.loader');
            if (stuckLoader) stuckLoader.remove();

            const savedScroll = sessionStorage.getItem('liveFeedScroll');
            if (savedScroll) {
                setTimeout(() => window.scrollTo(0, parseInt(savedScroll)), 0);
            }

            setTimeout(loadSocialScripts, 100);
            
            // Fix button handlers after restoration
            setTimeout(fixLiveButtonClickHandlers, 200);
        } else {
            setTimeout(() => loadMorePosts(false), 100);
        }
    }

    // Run Immediately
    initLiveFeed();

    // --- ENHANCED EVENT LISTENERS FOR CANVAS RESTORATION ---
    // Run on initial load
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            reinitializeCanvasButtons();
            fixLiveButtonClickHandlers();
        }, 100);
    });

    // Run on Turbo navigation
    document.addEventListener('turbo:load', function() {
        console.log('Turbo:load - reinitializing canvas buttons and fixing click handlers');
        setTimeout(() => {
            reinitializeCanvasButtons();
            fixLiveButtonClickHandlers();
        }, 50);
    });

    // Run when page becomes visible again (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('Page visible - restoring canvas buttons and fixing click handlers');
            setTimeout(() => {
                reinitializeCanvasButtons();
                fixLiveButtonClickHandlers();
            }, 300);
        }
    });

    // Handle browser back/forward navigation
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            console.log('Page restored from bfcache - restoring canvas buttons and fixing click handlers');
            setTimeout(() => {
                reinitializeCanvasButtons();
                fixLiveButtonClickHandlers();
            }, 200);
        }
    });

    // One-time initialization after page load
    setTimeout(function() {
        reinitializeCanvasButtons();
        fixLiveButtonClickHandlers();
    }, 1000);

})();
</script>