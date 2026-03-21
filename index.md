---
layout: default
title: Home - The Muslim Post
---
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The Muslim Post",
  "url": "https://www.tmpnews.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.tmpnews.com/search.html?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
<style>
.top-story-image-wrapper { position: relative; overflow: hidden; }
.dark-gradient::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%); pointer-events: none; }
.mobile-meta-overlay { position: absolute; bottom: 12px; left: 0; right: 0; padding: 0 1rem; z-index: 2; font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.05em; display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; text-align: center; }
.mobile-meta-overlay .highlight { color: #b80000; }
.desktop-kicker { display: none; }
.desktop-meta { display: none; }
.top-story-text { padding: 0.75rem 1.5rem 1.5rem 1.5rem; display: flex; flex-direction: column; height: 100%; }
.top-story-headline { font-family: 'Merriweather', serif; font-weight: 900; font-size: 1.15rem !important; color: #111827; margin: 0 0 0.5rem 0 !important; line-height: 1.3; letter-spacing: -0.01em; }
.top-story-subheadline-container { 
    position: relative; 
    margin-bottom: 0; 
}
.top-story-subheadline { 
    font-family: 'Inter', sans-serif; 
    font-weight: 400; 
    font-size: 1rem; 
    color: #4b5563; 
    line-height: 24px; 
    margin: 0; 
    height: 72px; 
    overflow: hidden; 
}
.top-story-subheadline-container::after { 
    content: ''; 
    position: absolute; 
    bottom: -30px;
    left: -3rem; 
    right: -3rem; 
    height: 70px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 60%, #ffffff 100%); 
    pointer-events: none; 
    z-index: 1;
}
.top-story-read-more { 
    position: relative; 
    z-index: 2; 
    margin-top: -10px;
    font-family: 'Inter', sans-serif; 
    font-size: 0.9rem; 
    font-weight: 800; 
    color: #000; 
    text-transform: uppercase; 
    display: inline-block; 
}
.top-story-subheadline { font-family: 'Inter', sans-serif; font-weight: 400; font-size: 1rem; color: #4b5563; line-height: 24px; margin: 0; }
.top-story-read-more { font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 800; color: #000; text-transform: uppercase; margin-top: auto; display: inline-block; }
@media (min-width: 768px) {
    .dark-gradient::after { display: none !important; }
    .mobile-meta-overlay { display: none !important; } 
    .top-story-read-more { display: none !important; } 
    .desktop-kicker { display: block; font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 800; color: #b80000; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.5rem 0; }
    .desktop-meta { display: flex; font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600; color: #6b7280; margin-top: auto; padding-top: 1.25rem; border-top: 1px solid #e5e7eb; align-items: center; justify-content: space-between; }
    .top-story-text { padding: 2rem; }
    .top-story-headline { font-size: 2rem !important; margin-bottom: 0.75rem !important; }
    .top-story-subheadline-container { margin-bottom: 1.5rem; }
}
.support-cta-banner{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:1rem;background-color:#000 !important;border-bottom:none !important;padding:0.35rem 1.5rem !important;margin:0 auto 1.5rem auto;max-width:fit-content;border-radius:50px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}
.support-cta-banner p{margin:0 !important;font-family:'Inter',sans-serif;font-size:0.85rem !important;color:#fff !important;font-weight:500}
.support-cta-button{background-color:#facc15 !important;color:#000 !important;padding:0.25rem 0.75rem !important;border-radius:20px !important;font-family:'Inter',sans-serif;font-size:0.75rem !important;font-weight:800 !important;text-decoration:none !important;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;box-shadow:none !important;transition:opacity 0.2s}
.support-cta-button:hover{opacity:0.9;color:#000 !important}
@media (max-width:640px){.support-cta-banner{flex-direction:column;padding:0.75rem 1rem !important;gap:0.5rem;border-radius:0 !important;width:100% !important;max-width:100% !important;margin:0 0 1.5rem 0 !important;box-sizing:border-box}.support-cta-banner p{font-size:0.75rem !important;line-height:1.3;text-align:center}}
</style>
<div class="support-cta-banner">
    <p>Independent journalism is more important than ever. Please consider supporting The Muslim Post today.</p>
    <a href="{{ '/support/' | relative_url }}" class="support-cta-button">Support TMP</a>
</div>
{% assign latest_post = site.posts.first %}
<main class="home-main" style="flex-grow: 1;">
    {% if latest_post %}
    <section class="top-story-section">
        <a href="{{ latest_post.url | relative_url }}" class="top-story-card">
            <div class="top-story-image-wrapper dark-gradient">
                <img src="{{ latest_post.image | default: 'https://placehold.co/1200x800/e2e8f0/64748b?text=Image+Not+Available' }}" alt="{{ latest_post.image_description | default: 'Top story image' | escape }}">
                <div class="mobile-meta-overlay">
                    <span class="highlight">Latest Report</span> &bull; 
                    <span>By {{ latest_post.author | default: "TMP Staff" }}</span> &bull; 
                    <span>{{ latest_post.date | date: "%B %d, %Y" }}</span>
                </div>
            </div>
            <div class="top-story-text">
                <p class="desktop-kicker">Latest Report</p>
                <h1 class="top-story-headline">{{ latest_post.title }}</h1>
                <div class="top-story-subheadline-container">
                    <p class="top-story-subheadline">{{ latest_post.subheadline | default: post.content | strip_html | truncatewords: 35 }}</p>
                </div>
                <span class="top-story-read-more">Read More &#8594;</span>
                <div class="desktop-meta">
                    <span class="top-story-author">By {{ latest_post.author | default: "TMP Staff" }} &bull; {{ latest_post.date | date: "%B %d, %Y" }}</span>
                    <span class="read-more" style="color:#000;font-weight:800;text-transform:uppercase;">Read More &#8594;</span>
                </div>
            </div>
        </a>
    </section>
    {% endif %}
    <div class="content-wrapper">
        <hr class="section-divider">
        <section class="content-section news-section">
            <h2 class="section-title">In the News</h2>
            <p class="section-subtitle">Stay updated with the latest trends, research, and important discussions.</p>
            <div class="news-grid-full">
                <a href="{{ '/news/hub/' | relative_url }}?tag=world-politics" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/3498db/ffffff?text=World+Politics" alt="World Politics" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">World Politics</h3>
                        <p class="news-card-subheadline">Global affairs, international relations, and major political developments across the world.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=indian-politics" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/f1c40f/ffffff?text=Indian+Politics" alt="Indian Politics" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">Indian Politics</h3>
                        <p class="news-card-subheadline">In-depth coverage of the political landscape, policies, and elections within India.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=muslim-world" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/2ecc71/ffffff?text=Muslim+World" alt="Muslim World" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">Muslim World</h3>
                        <p class="news-card-subheadline">Issues, culture, and events concerning Muslim communities globally.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=technology" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/9b59b6/ffffff?text=Technology" alt="Technology" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">Technology</h3>
                        <p class="news-card-subheadline">The latest in AI, gadgets, and digital innovation shaping our future.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=medical-science" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/e74c3c/ffffff?text=Medical+Science" alt="Medical Science" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">Medical Science</h3>
                        <p class="news-card-subheadline">Breakthroughs in health, medicine, and scientific research.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=global-economy" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/1abc9c/ffffff?text=Global+Economy" alt="Global Economy" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">Global Economy</h3>
                        <p class="news-card-subheadline">Analysis of financial markets, trade, and economic policies.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=art-culture" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/e67e22/ffffff?text=Art+%26+Culture" alt="Art & Culture" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">Art & Culture</h3>
                        <p class="news-card-subheadline">Exploring cinema, literature, and the arts from around the world.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=weather" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/8e44ad/ffffff?text=Weather" alt="Weather" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">Weather</h3>
                        <p class="news-card-subheadline">Latest forecasts, climate updates, and weather-related news.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=sports" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/27ae60/ffffff?text=Sports" alt="Sports" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">Sports</h3>
                        <p class="news-card-subheadline">Scores, highlights, and analysis from the world of sports.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=national-news" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/c0392b/ffffff?text=National+News" alt="National News" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">National News</h3>
                        <p class="news-card-subheadline">Key developments and events happening within the country.</p>
                    </div>
                </a>
                <a href="{{ '/news/hub/' | relative_url }}?tag=international-news" class="news-card">
                    <div class="news-card-image-wrapper">
                        <img src="https://placehold.co/600x400/34495e/ffffff?text=International+News" alt="International News" class="news-card-image" loading="lazy">
                    </div>
                    <div class="news-card-text">
                        <h3 class="news-card-headline">International News</h3>
                        <p class="news-card-subheadline">Significant news and stories from across the globe.</p>
                    </div>
                </a>
            </div>
        </section>
        <section class="content-section features-section reveal-on-scroll">
            <h2 class="section-title">Why Join Us?</h2>
            <p class="section-subtitle">A platform designed for sharing knowledge and fostering discussion.</p>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></div>
                    <h3>Share Your Voice</h3>
                    <p>Easily post your articles, research, and opinions for a global audience.</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                    <h3>Engage with Peers</h3>
                    <p>Connect with a community of experts and enthusiasts in various fields.</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 0 0 3.5 12.5"/><path d="M2 12.5a10 10 0 0 0 18.5-1"/></svg></div>
                    <h3>Stay Updated</h3>
                    <p>Follow the latest trends and discussions with our curated news section.</p>
                </div>
            </div>
        </section>
    </div>
    <section class="cta-section">
        <div class="cta-content reveal-on-scroll">
            <h1>Share Your Knowledge</h1>
            <p>Join a community of thinkers, learners, and experts. Discover insightful posts and contribute your own perspective.</p>
            <a id="cta-get-started" href="{{ '/post/' | relative_url }}" class="cta-button">Get Started</a>
        </div>
    </section>
</main>

<script>
    document.addEventListener('turbo:load', () => {
        const getStartedBtn = document.getElementById('cta-get-started');
        if (getStartedBtn) {
            const cachedUser = localStorage.getItem('cachedUser');
            if (!cachedUser) {
                getStartedBtn.href = "{{ 'auth.html' | relative_url }}";
            }
        }
    });
    document.addEventListener('turbo:load', () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        document.querySelectorAll('.reveal-on-scroll').forEach(element => {
            observer.observe(element);
        });
    });
</script>