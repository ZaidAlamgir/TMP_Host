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
<div class="support-cta-banner">
    <p>Independent journalism is more important than ever. Please consider supporting The Muslim Post today.</p>
    <a href="{{ '/support/' | relative_url }}" class="support-cta-button">Support TMP</a>
</div>

{% assign latest_post = site.posts.first %}

<main class="home-main" style="flex-grow: 1;">
    {% if latest_post %}
    <section class="top-story-section">
        <a href="{{ latest_post.url | relative_url }}" class="top-story-card">
            <div class="top-story-image-wrapper">
                {% comment %} Top story image stays eager for LCP {% endcomment %}
                <img src="{{ latest_post.image | default: 'https://placehold.co/1200x800/e2e8f0/64748b?text=Image+Not+Available' }}" alt="{{ latest_post.image_description | default: 'Top story image' | escape }}">
            </div>
            <div class="top-story-text">
                <p class="top-story-kicker">Latest Report</p>
                <h1 class="top-story-headline">{{ latest_post.title }}</h1>
                <p class="top-story-subheadline">{{ latest_post.subheadline | default: post.content | strip_html | truncatewords: 35 }}</p>
                <div class="top-story-meta">
                    By <span class="top-story-author">{{ latest_post.author | default: "Staff Writer" }}</span> &bull; <span class="top-story-date">{{ latest_post.date | date: "%B %d, %Y" }}</span>
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
    // This script ensures the "Get Started" button points to the login page
    // for users who are not logged in.
    document.addEventListener('turbo:load', () => {
        const getStartedBtn = document.getElementById('cta-get-started');
        if (getStartedBtn) {
            const cachedUser = localStorage.getItem('cachedUser');
            if (!cachedUser) {
                // If user is not logged in, link to the auth page.
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