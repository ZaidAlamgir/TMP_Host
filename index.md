---
layout: default
title: Home - The Muslim Post
---

<section class="hero-section">
<h1 class="reveal-on-scroll">Share Your Knowledge</h1>
<p class="reveal-on-scroll">Join a community of thinkers, learners, and experts. Discover insightful posts and contribute your own perspective.</p>
<a href="{{ 'post.html' | relative_url }}" class="cta-button reveal-on-scroll">Get Started</a>
</section>

<div class="content-wrapper">
<section class="content-section latest-posts-container reveal-on-scroll">
<h2>Latest Posts</h2>
<p class="section-subtitle">Fresh insights and thoughts from our growing community of contributors.</p>

    <div class="posts-grid">
        {% for post in site.posts limit:3 %}
            <a href="{{ post.url | relative_url }}" class="post-card">
                <div class="post-card-content">
                   <h3>{{ post.title }}</h3>
                   <p>{{ post.subheadline | default: post.content | strip_html | truncatewords: 30 }}</p>
                </div>
                <div class="post-card-meta">
                    <span class="post-card-author">{{ post.author | default: "Staff Writer" }}</span>
                    <span class="post-card-date">{{ post.date | date: "%B %d, %Y" }}</span>
                </div>
            </a>
        {% else %}
            <p style="grid-column: 1 / -1; text-align: center;">No posts have been published yet.</p>
        {% endfor %}
    </div>
</section>

<section class="content-section features-section reveal-on-scroll">
    <h2>Why Join Us?</h2>
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

<section class="content-section news-section reveal-on-scroll">
    <h2>In the News</h2>
    <p class="section-subtitle">Stay updated with the latest trends, research, and important discussions.</p>
    <div class="news-grid">
        <a href="news-hub.html?tag=world-politics" class="news-card">
            <div class="news-card-image-wrapper">
                <img src="https://placehold.co/600x400/3498db/ffffff?text=World+Politics" alt="World Politics" class="news-card-image">
            </div>
            <div class="news-card-text">
                <h3 class="news-card-headline">World Politics</h3>
                <p class="news-card-subheadline">Global affairs, international relations, and major political developments across the world.</p>
            </div>
        </a>
        <a href="news-hub.html?tag=indian-politics" class="news-card">
            <div class="news-card-image-wrapper">
                <img src="https://placehold.co/600x400/f1c40f/ffffff?text=Indian+Politics" alt="Indian Politics" class="news-card-image">
            </div>
            <div class="news-card-text">
                <h3 class="news-card-headline">Indian Politics</h3>
                <p class="news-card-subheadline">In-depth coverage of the political landscape, policies, and elections within India.</p>
            </div>
        </a>
        <a href="news-hub.html?tag=muslim-world" class="news-card">
            <div class="news-card-image-wrapper">
                <img src="https://placehold.co/600x400/2ecc71/ffffff?text=Muslim+World" alt="Muslim World" class="news-card-image">
            </div>
            <div class="news-card-text">
                <h3 class="news-card-headline">Muslim World</h3>
                <p class="news-card-subheadline">Issues, culture, and events concerning Muslim communities globally.</p>
            </div>
        </a>
        <a href="news-hub.html?tag=technology" class="news-card">
            <div class="news-card-image-wrapper">
                <img src="https://placehold.co/600x400/9b59b6/ffffff?text=Technology" alt="Technology" class="news-card-image">
            </div>
            <div class="news-card-text">
                <h3 class="news-card-headline">Technology</h3>
                <p class="news-card-subheadline">The latest in AI, gadgets, and digital innovation shaping our future.</p>
            </div>
        </a>
        <a href="news-hub.html?tag=medical-science" class="news-card">
            <div class="news-card-image-wrapper">
                <img src="https://placehold.co/600x400/e74c3c/ffffff?text=Medical+Science" alt="Medical Science" class="news-card-image">
            </div>
            <div class="news-card-text">
                <h3 class="news-card-headline">Medical Science</h3>
                <p class="news-card-subheadline">Breakthroughs in health, medicine, and scientific research.</p>
            </div>
        </a>
        <a href="news-hub.html?tag=global-economy" class="news-card">
            <div class="news-card-image-wrapper">
                <img src="https://placehold.co/600x400/1abc9c/ffffff?text=Global+Economy" alt="Global Economy" class="news-card-image">
            </div>
            <div class="news-card-text">
                <h3 class="news-card-headline">Global Economy</h3>
                <p class="news-card-subheadline">Analysis of financial markets, trade, and economic policies.</p>
            </div>
        </a>
        <a href="news-hub.html?tag=art-culture" class="news-card">
            <div class="news-card-image-wrapper">
                <img src="https://placehold.co/600x400/e67e22/ffffff?text=Art+%26+Culture" alt="Art & Culture" class="news-card-image">
            </div>
            <div class="news-card-text">
                <h3 class="news-card-headline">Art & Culture</h3>
                <p class="news-card-subheadline">Exploring cinema, literature, and the arts from around the world.</p>
            </div>
        </a>
    </div>
</section>

</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach(element => {
            observer.observe(element);
        });
    });
</script>