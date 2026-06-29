document.addEventListener('turbo:load', () => {
    // Safety: Only run on the post page
    if (!document.getElementById('recentPostsContainer')) return;

    const supabase = window.supabase.createClient('https://yfrqnghduttudqbnodwr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnFuZ2hkdXR0dWRxYm5vZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDc3MTgsImV4cCI6MjA3NDEyMzcxOH0.i7JCX74CnE7pvZnBpCbuz6ajmSgIlA9Mx0FhlPJjzxU');

    // --- CONFIG FOR "FOR YOU" ---
    const FOR_YOU_CONFIG = {
        repoOwner: 'TheMuslimPost', 
        repoName: 'tmp-articles-world-politics',
        repoBranch: 'main',
        articlesPath: 'posts'
    };

    // --- UTILS: Canvas Like Button ---
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

    // --- UTILS: Word Suggester ---
    class WordSuggester {
        constructor(textareaId, suggestionsBoxId, loaderId) {
            this.textarea = document.getElementById(textareaId);
            this.suggestionsBox = document.getElementById(suggestionsBoxId);
            this.loader = document.getElementById(loaderId);
            this.model = null;
            this.dictionary = new Set();
            this.isReady = false;
            this.debounceTimeout = null;
            this.commonNextWords = ['the', 'a', 'is', 'in', 'and', 'with', 'for', 'to', 'that', 'it', 'on', 'as', 'of', 'at', 'by', 'was', 'are', 'from', 'has', 'have', 'an', 'be', 'not', 'this', 'but'];
        }

        async init() {
            if (!this.textarea || !this.suggestionsBox || !this.loader) {
                console.warn("WordSuggester: Missing required elements.");
                return;
            }
            this.loader.style.display = 'block';
            try {
                const dictionary = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
                    .then(res => res.text())
                    .then(text => new Set(text.split('\n')));
                
                this.dictionary = dictionary;
                this.isReady = true;
                this.loader.style.display = 'none';
                this.textarea.addEventListener('input', () => this.onInput());
            } catch (error) {
                console.error("Failed to initialize Word Suggester:", error);
                this.loader.textContent = "Could not load suggestions.";
            }
        }

        onInput() {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                this.generateSuggestions();
            }, 150);
        }

        generateSuggestions() {
            if (!this.isReady || !this.textarea.value) {
                this.suggestionsBox.innerHTML = '';
                return;
            }
            const text = this.textarea.value;
            const lastChar = text.slice(-1);
            if (lastChar === ' ') {
                const shuffled = this.commonNextWords.sort(() => 0.5 - Math.random());
                this.displaySuggestions(shuffled.slice(0, 7), 'predict');
            } else {
                const lastWord = text.trim().split(/\s+/).pop();
                if (lastWord.length < 2) {
                    this.suggestionsBox.innerHTML = '';
                    return;
                }
                let completions = [];
                for (const word of this.dictionary) {
                    if (word.startsWith(lastWord.toLowerCase())) {
                        completions.push(word);
                        if (completions.length >= 50) break;
                    }
                }
                this.displaySuggestions(completions.slice(0, 7), 'complete');
            }
        }

        displaySuggestions(words, type) {
            this.suggestionsBox.innerHTML = '';
            words.forEach(word => {
                const chip = document.createElement('div');
                chip.className = 'suggestion-chip';
                chip.textContent = word;
                chip.onclick = () => this.applySuggestion(word, type);
                this.suggestionsBox.appendChild(chip);
            });
        }

        applySuggestion(word, type) {
            const ta = this.textarea;
            const cursorPosition = ta.selectionStart;
            ta.focus();
            if (type === 'complete') {
                const textBeforeCursor = ta.value.substring(0, cursorPosition);
                const startOfWord = textBeforeCursor.lastIndexOf(' ') + 1;
                ta.setRangeText(word + ' ', startOfWord, cursorPosition, 'end');
            } else {
                const textBeforeCursor = ta.value.substring(0, cursorPosition);
                const textToInsert = (textBeforeCursor.endsWith(' ') || textBeforeCursor.length === 0) ? word + ' ' : ' ' + word + ' ';
                ta.setRangeText(textToInsert, cursorPosition, cursorPosition, 'end');
            }
            ta.dispatchEvent(new Event('input', { bubbles: true }));
            this.suggestionsBox.innerHTML = '';
        }
    }

    let nextPostOffset = 0;
    let isLoading = false;
    let hasMorePosts = true;
    window.currentUser = null;

    // --- HELPER FUNCTIONS ---
    function generateColorForUser(userId) {
        const colors = ['#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab', '#1e88e5', '#039be5', '#00acc1', '#00897b', '#43a047', '#fb8c00', '#f4511e', '#6d4c41', '#546e7a'];
        let hash = 0;
        if (!userId || userId.length === 0) return colors[0];
        for (let i = 0; i < userId.length; i++) {
            const char = userId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return colors[Math.abs(hash % colors.length)];
    }

    function parseMarkdown(text, fileName) {
        const frontmatterMatch = text.match(/---([\s\S]*?)---/);
        const post = { id: fileName };
        if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            post.content = text.substring(frontmatterMatch[0].length).trim();
            frontmatter.split('\n').forEach(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(':').trim().replace(/"/g, '');
                    if (key === 'tags') {
                        post[key] = value.replace(/[\[\]]/g, '').split(',').map(t => t.trim());
                    } else {
                        post[key] = value;
                    }
                }
            });
        } else {
            post.content = text;
        }
        return post;
    }

    function renderPosts(posts, clearExisting = false) {
        const postsFeed = document.getElementById('postsFeed');
        if(clearExisting) postsFeed.innerHTML = '';
        if (!posts || posts.length === 0) {
            if (nextPostOffset === 0) {
                 postsFeed.innerHTML = "<p style='text-align:center; color:#666;'>No posts yet. Be the first to share!</p>";
            }
            return;
        }
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'user-post';
            postElement.setAttribute('data-id', post.id);
            const authorName = post.author_name || 'Writer';
            const authorQualification = post.author_qual || 'Contributor';
            const timestamp = post.created_at;

            const currentUser = window.currentUser;
            const isAuthor = currentUser && currentUser.id === post.user_id;
            const canEdit = isAuthor && currentUser.role === 'writer';
            const isLiked = post.is_liked_by_user;

            const statsHTML = `
                <div class="post-stats" data-post-id="${post.id}">
                    <canvas id="like-canvas-${post.id}" class="like-btn-canvas" width="40" height="40" title="Like"></canvas>
                    <span class="like-count">${post.like_count || 0}</span>
                    <div class="stat-item" title="Views">
                        <i class="far fa-eye"></i> <span>${post.view_count || 0}</span>
                    </div>
                </div>`;

            const shareContainerHTML = `
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
                </div>`;

            let tagsHTML = '';
            if (post.tags && post.tags.length > 0) {
                tagsHTML = '<div class="post-tags-container">';
                post.tags.forEach(tag => {
                    tagsHTML += `<a class="post-tag" data-tag="${tag}">${tag}</a>`;
                });
                tagsHTML += '</div>'
            }

            let contentHTML = '';
            const contentParts = post.content.split('\n\n');
             contentParts.forEach(part => {
                const trimmedPart = part.trim();
                if (trimmedPart.startsWith('![')) {
                    const url = trimmedPart.match(/\((.*?)\)/)?.[1];
                    if (url) contentHTML += `<img src="${url}" class="post-body-image" alt="Post image">`;
                } else if (trimmedPart.startsWith('>')) {
                    contentHTML += `<blockquote class="post-body-quote">${trimmedPart.substring(1).trim()}</blockquote>`;
                } else if (trimmedPart.startsWith('## ')) {
                    contentHTML += `<h3>${trimmedPart.substring(3).trim()}</h3>`;
                } else {
                    contentHTML += `<p>${part}</p>`;
                }
            });

            const editButtonsHTML = canEdit ? `
                <div class="post-actions">
                    <button class="btn-edit" data-post-id="${post.id}">Edit</button>
                    <button class="btn-delete" data-post-id="${post.id}">Delete</button>
                </div>
            ` : '';

            postElement.innerHTML = `
                <div class="post-content">${contentHTML}</div>
                <div class="read-more-container" style="display: none;">
                    <a class="read-more-btn">Read More...</a>
                </div>
                <div class="post-meta">
                    <div class="post-author-details">
                        <div class="post-author">${authorName}</div>
                        <div class="post-qualification">${authorQualification}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        ${editButtonsHTML}
                        <div class="post-timestamp">${new Date(timestamp).toLocaleString()}</div>
                    </div>
                </div>
                <div class="post-footer">
                    ${shareContainerHTML}
                    ${tagsHTML}
                </div>`;
            postsFeed.appendChild(postElement);
            postElement.querySelector('.post-footer').insertAdjacentHTML('afterbegin', statsHTML);

            const canvasEl = document.getElementById(`like-canvas-${post.id}`);
            const canvasButton = new CanvasLikeButton(canvasEl, isLiked);
            postElement.canvasButtonInstance = canvasButton;

            const contentDiv = postElement.querySelector('.post-content');
            if (contentDiv.scrollHeight > 250) {
                contentDiv.classList.add('post-content-preview');
                const readMoreContainer = postElement.querySelector('.read-more-container');
                readMoreContainer.style.display = 'block';
            }
        });
    }

    function renderForYouPosts(posts) {
        const forYouFeed = document.getElementById('forYouFeed');
        forYouFeed.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'user-post';
            postElement.setAttribute('data-id', post.id);

            let contentHTML = '';
            post.content.split('\n\n').forEach(part => {
                const trimmedPart = part.trim();
                if (trimmedPart.startsWith('![')) {
                    const url = trimmedPart.match(/\((.*?)\)/)?.[1];
                    if (url) contentHTML += `<img src="${url}" class="post-body-image" alt="Post image">`;
                } else if (trimmedPart.startsWith('>')) {
                    contentHTML += `<blockquote class="post-body-quote">${trimmedPart.substring(1).trim()}</blockquote>`;
                } else if (trimmedPart.startsWith('## ')) {
                    contentHTML += `<h3>${trimmedPart.substring(3).trim()}</h3>`;
                } else {
                    contentHTML += `<p>${part}</p>`;
                }
            });

            let tagsHTML = '';
            if (post.tags && post.tags.length > 0) {
                tagsHTML = post.tags.map(tag => `<a class="post-tag" data-tag="${tag}">${tag}</a>`).join('');
            }

            postElement.innerHTML = `
                <div class="post-content">${contentHTML}</div>
                <div class="post-meta">
                    <div class="post-author-details">
                        <div class="post-author">${post.author_name || 'Curated Content'}</div>
                        <div class="post-qualification">${post.author_qual || 'From The Muslim Post'}</div>
                    </div>
                    <div class="post-timestamp">${new Date(post.date || Date.now()).toLocaleDateString()}</div>
                </div>
                <div class="post-footer"><div class="post-tags-container">${tagsHTML}</div></div>`;
            forYouFeed.appendChild(postElement);
        });
    }

    // --- MAIN INITIALIZATION ---
    async function initializePage() {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (session?.user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();

            window.currentUser = { ...session.user, role: profile?.role || 'user' };

            // UI LOGIC: If Writer, show FAB
            if (window.currentUser.role === 'writer') {
                const fab = document.getElementById('writerFab');
                if(fab) fab.style.display = 'flex'; // Show FAB
                setupWriterModal(session.user);
            } 
        } 
        // Whether logged in or not, load the feed
        await fetchPosts(0, 5);
        setupInfiniteScroll();
    }

    // --- MODAL & FAB LOGIC ---
    function setupWriterModal(user) {
        const fab = document.getElementById('writerFab');
        const modalOverlay = document.getElementById('writerModalOverlay');
        const closeModalBtn = document.getElementById('closeModalBtn');
        
        // Open Modal
        fab.addEventListener('click', () => {
            modalOverlay.classList.add('open');
            setupPostingInterface(user); 
        });

        // Close Modal
        const closeModal = () => {
            modalOverlay.classList.remove('open');
        };
        closeModalBtn.addEventListener('click', closeModal);
        
        // Close if clicked outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // --- FEED FETCHING (With Localhost Fix) ---
    async function fetchPosts(offset, limit, tags = []) {
        if (isLoading || (!hasMorePosts && tags.length === 0)) return;
        
        isLoading = true;
        const loader = document.getElementById('postsLoader');
        const endMsg = document.getElementById('endOfFeedMessage');
        const feedContainer = document.getElementById('postsFeed');
        
        if(loader) loader.style.display = 'block';
        if(endMsg) endMsg.style.display = 'none';

        try {
            // Check if we are running on localhost
            const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);

            // If Local: Go direct to Firebase (Bypasses missing Cloudflare Function)
            // If Live: Go to '/feed' (Uses Cloudflare Cache)
            const firebaseUrl = isLocal 
                ? 'https://tmp-news-userpost-feed-default-rtdb.asia-southeast1.firebasedatabase.app/live_feed.json'
                : '/feed';
            
            console.log(`Fetching from: ${firebaseUrl}`);

            const response = await fetch(firebaseUrl);
            
            // Handle HTML error (common in Localhost 404s)
            const contentType = response.headers.get('content-type');
            if (!response.ok || (contentType && contentType.includes('text/html'))) {
                throw new Error("Feed API unavailable.");
            }
            
            const feedData = await response.json();
            let posts = feedData.posts || [];

            // FILTER & RENDER
            if (tags.length > 0) {
                posts = posts.filter(p => p.tags && p.tags.some(t => tags.includes(t)));
            }

            // CHECK LIKES
            if (window.currentUser) {
                const postIds = posts.map(p => p.id);
                const { data: myLikes } = await supabase
                    .from('likes')
                    .select('post_id')
                    .eq('user_id', window.currentUser.id)
                    .in('post_id', postIds);

                const likedSet = new Set(myLikes?.map(l => l.post_id) || []);
                posts = posts.map(p => ({ ...p, is_liked_by_user: likedSet.has(p.id) }));
            }

            renderPosts(posts, true); 
            hasMorePosts = false; 
            if(endMsg) endMsg.style.display = 'block';

        } catch (error) {
            console.warn('Feed Error:', error);
            // Don't show error text to user, just log it. Keep UI clean.
            if (feedContainer && feedContainer.innerHTML === '') {
                 feedContainer.innerHTML = `<p style="text-align:center; color:red;">Unable to load feed. Check connection.</p>`;
            }
        } finally {
            isLoading = false;
            if(loader) loader.style.display = 'none';
        }
    }

    // --- FOR YOU POSTS ---
    async function loadForYouPosts() {
        const forYouFeed = document.getElementById('forYouFeed');
        forYouFeed.innerHTML = '<div class="loader" style="display: block;"></div>';

        try {
            const url = `https://api.github.com/repos/${FOR_YOU_CONFIG.repoOwner}/${FOR_YOU_CONFIG.repoName}/contents/${FOR_YOU_CONFIG.articlesPath}?ref=${FOR_YOU_CONFIG.repoBranch}`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
            
            let files = await response.json();
            if (!Array.isArray(files)) throw new Error("Invalid repo response.");

            files = files.filter(f => f.name.endsWith('.md')).slice(0, 20);

            if (files.length === 0) {
                forYouFeed.innerHTML = '<p>No curated stories yet.</p>';
                return;
            }

            const postPromises = files.map(file => 
                fetch(file.download_url).then(res => res.text()).then(text => parseMarkdown(text, file.name))
            );

            const posts = await Promise.all(postPromises);
            renderForYouPosts(posts);

        } catch (error) {
            console.error('For You Error:', error);
            forYouFeed.innerHTML = `<p style="text-align:center; padding:20px;">Check back later for curated stories.</p>`;
        }
    }

    function setupTabSwitcher() {
        const tabs = document.querySelectorAll('.feed-tab');
        const forYouFeed = document.getElementById('forYouFeed');
        const recentPostsContainer = document.getElementById('recentPostsContainer');
        const scrollSentinel = document.getElementById('scrollSentinel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const isForYou = tab.dataset.feed === 'for-you';
                forYouFeed.style.display = isForYou ? 'block' : 'none';
                recentPostsContainer.style.display = isForYou ? 'none' : 'block';
                if(scrollSentinel) scrollSentinel.style.display = isForYou ? 'none' : 'block';

                if (isForYou && forYouFeed.innerHTML === '') {
                    loadForYouPosts();
                }
            });
        });
    }

    function resetAndReloadFeed(tags = []) {
        document.getElementById('postsFeed').innerHTML = '';
        nextPostOffset = 0;
        hasMorePosts = true;
        document.getElementById('endOfFeedMessage').style.display = 'none';
        fetchPosts(0, 5, tags);
    }

    function setupPostingInterface(user) {
        const userInfoContainer = document.getElementById('userInfoContainer');
        const userNameDisplay = document.getElementById('userName');
        const avatar = document.getElementById('userAvatar');

        if (!user || !userInfoContainer) return;

        if(userNameDisplay) userNameDisplay.textContent = user.user_metadata.full_name || user.email;
        if(avatar) {
            avatar.textContent = (user.user_metadata.full_name || user.email || 'U').charAt(0).toUpperCase();
            avatar.style.backgroundColor = generateColorForUser(user.id);
        }

        const postContent = document.getElementById('postContent');
        const DRAFT_KEY = `postDraft_${user.id}`;
        
        const suggester = new WordSuggester('postContent', 'suggestions-box', 'suggestion-loader');
        suggester.init();

        // Clone form to remove old event listeners
        const oldPostForm = document.getElementById('postForm');
        const postForm = oldPostForm.cloneNode(true);
        oldPostForm.parentNode.replaceChild(postForm, oldPostForm);

        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = document.getElementById('submitPost');
            const postTagsInput = document.getElementById('postTags');
            const qualificationInput = document.getElementById('writerQualification');
            const headlineInput = document.getElementById('writerHeadline');
            const firstParagraph = document.getElementById('postContent');
            
            const authorName = document.getElementById('userName').textContent;
            const authorQual = qualificationInput.value.trim();

            if(!authorQual || !firstParagraph.value.trim()){
                alert("Your Qualification and the First Paragraph are required.");
                return;
            }

            submitButton.disabled = true;
            document.getElementById('postSubmitLoader').style.display = 'block';
            
            let finalContent = '';
            const headlineText = headlineInput.value.trim();
            if (headlineText) {
                finalContent += `## ${headlineText}\n\n`;
            }
            finalContent += firstParagraph.value.trim();

            const dynamicBlocks = document.querySelectorAll('.dynamic-block');
            dynamicBlocks.forEach(block => {
                const input = block.querySelector('textarea, input');
                const value = input.value.trim();
                if (!value) return;

                const type = block.dataset.blockType;
                let formattedValue = '';
                if (type === 'image') { 
                    formattedValue = `![Image](${value})`;
                } else if (type === 'quote') {
                    formattedValue = `> ${value}`;
                } else if (type === 'headline') {
                    formattedValue = `## ${value}`;
                } else { // paragraph
                    formattedValue = value;
                }
                finalContent += `\n\n${formattedValue}`;
            });

            const tags = postTagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);

            // --- CALLING THE EDGE FUNCTION ---
            const url = `https://yfrqnghduttudqbnodwr.supabase.co/functions/v1/publish_post`;
            
            // Get the session token
            const { data: { session } } = await supabase.auth.getSession();
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ 
                    content: finalContent, 
                    headline: headlineText,
                    tags: tags,
                    media_url: "" 
                }),
            });
            
            const result = await response.json();

            if (!response.ok) {
                console.error('Error submitting post:', result);
                alert('An error occurred. Details: ' + (result.error || 'Unknown error'));
            } else {
                postContent.value = '';
                headlineInput.value = '';
                qualificationInput.value = '';
                postTagsInput.value = '';
                document.getElementById('dynamic-blocks-container').innerHTML = '';
                document.getElementById('charCounter').textContent = '1000 words remaining';
                localStorage.removeItem(DRAFT_KEY);
                
                // Success! Close modal
                document.getElementById('writerModalOverlay').classList.remove('open');
                // Reload feed to see new post
                resetAndReloadFeed();
            }
            
            document.getElementById('postSubmitLoader').style.display = 'none';
            submitButton.disabled = false;
        });
        
        // Re-attach UI listeners
        const charCounter = document.getElementById('charCounter');
        const submitButton = document.getElementById('submitPost');
        const clearDraftBtn = document.getElementById('clearDraftBtn');
        const WORD_LIMIT = 1000;

        postContent.addEventListener('input', () => {
            const text = postContent.value.trim();
            const words = text === '' ? [] : text.split(/\s+/);
            const wordCount = words.length;
            const remaining = WORD_LIMIT - wordCount;

            if (remaining >= 0) {
                charCounter.textContent = `${remaining} words remaining`;
                charCounter.style.color = '#606770';
                submitButton.disabled = false;
            } else {
                charCounter.textContent = `${Math.abs(remaining)} words over limit`;
                charCounter.style.color = 'red';
                submitButton.disabled = true;
            }
            postContent.style.height = 'auto';
            postContent.style.height = (postContent.scrollHeight) + 'px';

            if (text.length > 0) {
                localStorage.setItem(DRAFT_KEY, text);
                clearDraftBtn.style.display = 'inline-block';
            } else {
                localStorage.removeItem(DRAFT_KEY);
                clearDraftBtn.style.display = 'none';
            }
        });

        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
            postContent.value = savedDraft;
            postContent.dispatchEvent(new Event('input'));
        }

        clearDraftBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to clear your draft?")) {
                postContent.value = '';
                postContent.dispatchEvent(new Event('input'));
            }
        });

        const addBlockBtn = document.getElementById('add-block-btn');
        const blockTypeSelect = document.getElementById('block-type-select');
        const dynamicContainer = document.getElementById('dynamic-blocks-container');

        // Remove old listener
        const newAddBtn = addBlockBtn.cloneNode(true);
        addBlockBtn.parentNode.replaceChild(newAddBtn, addBlockBtn);

        newAddBtn.addEventListener('click', () => {
            const type = blockTypeSelect.value;
            const blockId = `block-${Date.now()}`;
            const blockWrapper = document.createElement('div');
            blockWrapper.className = 'dynamic-block';
            blockWrapper.id = blockId;
            blockWrapper.dataset.blockType = type;

            let innerHTML = `<h3>${type.charAt(0).toUpperCase() + type.slice(1)}</h3><button type="button" class="remove-block-btn" onclick="document.getElementById('${blockId}').remove()">&times;</button>`;

            switch (type) {
                case 'paragraph': innerHTML += `<textarea rows="5" placeholder="Continue..."></textarea>`; break;
                case 'image': innerHTML += `<input type="text" placeholder="https://...">`; break;
                case 'quote': innerHTML += `<textarea rows="3" class="quote-input" placeholder="Quote..."></textarea>`; break;
                case 'headline': innerHTML += `<input type="text" class="headline-input" placeholder="Headline">`; break;
            }
            blockWrapper.innerHTML = innerHTML;
            dynamicContainer.appendChild(blockWrapper);
        });
    }

    function setupInfiniteScroll() {
        const loadMoreObserver = new IntersectionObserver((entries) => {
            const currentTags = document.getElementById('tagSearchInput').value.split(',').map(t => t.trim()).filter(t => t);
            if (entries[0].isIntersecting && hasMorePosts && !isLoading) {
                fetchPosts(nextPostOffset, 5, currentTags);
            }
        }, { rootMargin: '0px 0px 300px 0px' });

        const sentinel = document.getElementById('scrollSentinel');
        if(sentinel) loadMoreObserver.observe(sentinel);
    }

    function setupEventListeners() {
        const postsFeed = document.getElementById('postsFeed');
        postsFeed.addEventListener('click', async (e) => {
            const target = e.target;
            const postElement = target.closest('.user-post');
            if (!postElement) return;

            const editBtn = target.closest('.btn-edit');
            const deleteBtn = target.closest('.btn-delete');
            const likeCanvas = target.closest('.like-btn-canvas');
            const tagLink = target.closest('.post-tag');
            const isPostClick = target.closest('.post-content') || target.closest('.post-meta');
            const readMoreBtn = target.closest('.read-more-btn');

            if (deleteBtn) {
                const postId = deleteBtn.getAttribute('data-post-id');
                if (confirm('Permanently delete this post?')) {
                    const { error } = await supabase.rpc('delete_user_post', {
                        post_id_to_delete: postId,
                        user_id_making_request: window.currentUser.id
                    });
                    if (error) alert(`Error: ${error.message}`);
                    else {
                        postElement.style.opacity = '0';
                        setTimeout(() => postElement.remove(), 300);
                    }
                }
                return;
            }
            
            // (Edit logic omitted for brevity, assumes handled or add back if needed)

            if (tagLink) {
                const tag = tagLink.getAttribute('data-tag');
                document.getElementById('tagSearchInput').value = tag;
                resetAndReloadFeed([tag]);
                return;
            }

            if (likeCanvas) {
                if (!window.currentUser) { alert("Please log in to like."); return; }
                const statsContainer = likeCanvas.closest('.post-stats');
                const postId = parseInt(statsContainer.dataset.postId, 10);
                const canvasButtonInstance = postElement.canvasButtonInstance;
                canvasButtonInstance.triggerClick();
                const likeCountSpan = statsContainer.querySelector('.like-count');
                let currentCount = parseInt(likeCountSpan.textContent);
                supabase.rpc('toggle_like', { 
                    post_id_to_toggle: postId, 
                    user_id_to_check: window.currentUser.id 
                }).then(({ data }) => {
                    if(data) likeCountSpan.textContent = data[0].new_like_count;
                });
            }

            const shareBtn = e.target.closest('.share-btn-main');
            if (shareBtn) {
                shareBtn.closest('.share-container').classList.toggle('active');
                return;
            }

            // Link Clicking (Post Open)
            if (readMoreBtn || (isPostClick && !editBtn && !deleteBtn && !likeCanvas && !tagLink && !shareBtn)) {
                const postId = postElement.getAttribute('data-id');
                const openUrlBase = window.TMP_LINKS ? window.TMP_LINKS.postOpen : '/postopen.html';
                window.location.href = `${openUrlBase}?id=${postId}`;
            }
        });

        const tagSearchInput = document.getElementById('tagSearchInput');
        if (tagSearchInput) {
            let searchDebounce;
            tagSearchInput.addEventListener('input', () => {
                clearTimeout(searchDebounce);
                searchDebounce = setTimeout(() => {
                    const tags = tagSearchInput.value.split(',').map(t => t.trim()).filter(t => t);
                    resetAndReloadFeed(tags);
                }, 300);
            });
        }
    }
    
    // Run
    initializePage();
    setupEventListeners();
    setupTabSwitcher();
});