/**
 * Fetches and caches posts from a Google Apps Script endpoint using persistent localStorage.
 * Renders them into a specified container.
 *
 * @param {string} apiUrl - The URL of the Google Apps Script.
 * @param {string} containerId - The ID of the HTML element to render the posts into.
 * @param {string} loaderId - The ID of the loading spinner element.
 * @param {object} options - Configuration for fetching, e.g., { limit: 3, offset: 0 }.
 * @param {object} observer - The IntersectionObserver instance for animations.
 */
async function fetchAndCachePosts(apiUrl, containerId, loaderId, options, observer) {
    const { limit = 3, offset = 0 } = options;
    const CACHE_KEY = `postsCache_${containerId}_${limit}_${offset}`;
    const CACHE_TIMESTAMP_KEY = `${CACHE_KEY}_timestamp`;
    const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

    const postsContainer = document.getElementById(containerId);
    const loader = document.getElementById(loaderId);

    // --- Caching Logic using localStorage for persistence ---
    // Switched from sessionStorage to localStorage to hold data between app sessions.
    const cachedPosts = localStorage.getItem(CACHE_KEY);
    const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedPosts && cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < CACHE_DURATION_MS) {
        console.log(`Loading posts for '${containerId}' from persistent cache (localStorage).`);
        renderPosts(JSON.parse(cachedPosts), postsContainer, loader, observer, true);
        return;
    }

    // --- Network Fetching Logic ---
    try {
        console.log(`Fetching posts for '${containerId}' from network...`);
        loader.style.display = 'block';
        const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        
        if (data.error) throw new Error(data.message);

        renderPosts(data.posts, postsContainer, loader, observer, false);

        if (data.posts && data.posts.length > 0) {
            // Save to localStorage for persistence across app restarts.
            localStorage.setItem(CACHE_KEY, JSON.stringify(data.posts));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        }

    } catch (error) {
        console.error(`Error fetching posts for '${containerId}':`, error);
        loader.style.display = 'none';
        postsContainer.innerHTML = `<p style="text-align: center; color: red; grid-column: 1 / -1;">Could not load posts at this time.</p>`;
    }
}

/**
 * Renders the post data into the specified container.
 * @param {Array} posts - The array of post objects to render.
 * @param {HTMLElement} container - The container element to inject the HTML into.
 * @param {HTMLElement} loader - The loading spinner element.
 * @param {IntersectionObserver} observer - The observer for animations.
 * @param {boolean} isFromCache - Determines if animations should be applied.
 */
function renderPosts(posts, container, loader, observer, isFromCache) {
    loader.style.display = 'none';

    if (posts && posts.length > 0) {
        container.innerHTML = '';
        posts.forEach((post, index) => {
            const postCard = document.createElement('div');
            postCard.className = isFromCache ? 'post-card' : 'post-card reveal-on-scroll';
            postCard.style.transitionDelay = isFromCache ? '0s' : `${index * 0.1}s`;
            postCard.innerHTML = `
                <div class="post-card-content">
                    <p>${post.content}</p>
                </div>
                <div class="post-card-meta">
                    By <span class="post-card-author">${post.authorName || 'Anonymous'}</span>
                </div>
            `;
            container.appendChild(postCard);
            if (!isFromCache) {
                observer.observe(postCard);
            }
        });
    } else {
        container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No posts have been shared yet. Be the first!</p>';
    }
}
