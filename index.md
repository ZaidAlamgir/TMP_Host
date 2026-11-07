---
layout: default
title: Home - The Muslim Post
description: "The Muslim Post (TMP News) delivers independent news, deep geopolitical analysis, and expert perspectives on World Politics, Indian Politics, and Global Affairs."
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
.support-cta-banner{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:1rem;background-color:#000 !important;border-bottom:none !important;padding:0.35rem 1.5rem !important;margin:0 auto 1.25rem auto;max-width:fit-content;border-radius:50px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}
.support-cta-banner p{margin:0 !important;font-family:'Inter',sans-serif;font-size:0.85rem !important;color:#fff !important;font-weight:500}
.support-cta-button{background-color:#facc15 !important;color:#000 !important;padding:0.25rem 0.75rem !important;border-radius:20px !important;font-family:'Inter',sans-serif;font-size:0.75rem !important;font-weight:800 !important;text-decoration:none !important;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;box-shadow:none !important;transition:opacity 0.2s}
.support-cta-button:hover{opacity:0.9;color:#000 !important}
@media (max-width:640px){.support-cta-banner{flex-direction:column;padding:0.6rem 1rem !important;gap:0.4rem;border-radius:0 !important;width:100% !important;max-width:100% !important;margin:0 0 1rem 0 !important;box-sizing:border-box}.support-cta-banner p{font-size:0.75rem !important;line-height:1.3;text-align:center}}

/* Category Filter Navigation Bar Styling */
.category-filters-nav-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
}

.category-filters-container {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    touch-action: pan-x pinch-zoom;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    user-select: none;
    -webkit-user-select: none;
    padding: 4px 4px 8px 4px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
}

.category-filters-container:active {
    cursor: grabbing;
}

.category-filters-container::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
}

.category-filters {
    display: flex;
    gap: 0.55rem;
    padding: 0 4px;
    white-space: nowrap;
    width: max-content;
    position: relative;
}

.filter-btn {
    flex-shrink: 0;
    scroll-snap-align: center;
    user-select: none;
    -webkit-user-select: none;
    background: #f1f5f9 !important;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 6px 16px;
    border-radius: 9999px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    outline: none;
    -webkit-tap-highlight-color: transparent;
}

.filter-btn:hover {
    background: #e2e8f0 !important;
    color: #0f172a;
    border-color: #cbd5e1;
    transform: translateY(-1px);
}

.filter-btn.active {
    background: #0073e6 !important;
    color: #ffffff !important;
    border-color: #0073e6 !important;
    box-shadow: 0 3px 10px rgba(0, 115, 230, 0.3);
    transform: translateY(-1px);
}

html.dark-mode .filter-btn {
    background: #1e293b !important;
    border-color: #334155;
    color: #94a3b8;
}

html.dark-mode .filter-btn:hover {
    background: #334155 !important;
    color: #ffffff;
    border-color: #475569;
}

html.dark-mode .filter-btn.active {
    background: #0073e6 !important;
    color: #ffffff !important;
    border-color: #0073e6 !important;
    box-shadow: 0 3px 12px rgba(0, 115, 230, 0.45);
}


/* Edge Fade Masks for intuitive swipe cues */
.category-filters-nav-wrapper::before,
.category-filters-nav-wrapper::after {
    content: '';
    position: absolute;
    top: 4px;
    bottom: 8px;
    width: 28px;
    pointer-events: none;
    z-index: 4;
    transition: opacity 0.25s ease;
}

.category-filters-nav-wrapper::before {
    left: 0;
    background: linear-gradient(to right, #ffffff 10%, transparent);
    opacity: 0;
    border-top-left-radius: 9999px;
    border-bottom-left-radius: 9999px;
}

.category-filters-nav-wrapper::after {
    right: 0;
    background: linear-gradient(to left, #ffffff 10%, transparent);
    opacity: 1;
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
}

.category-filters-nav-wrapper.can-scroll-left::before { opacity: 1; }
.category-filters-nav-wrapper.at-scroll-end::after { opacity: 0; }

html.dark-mode .category-filters-nav-wrapper::before {
    background: linear-gradient(to right, #111827 10%, transparent);
}
html.dark-mode .category-filters-nav-wrapper::after {
    background: linear-gradient(to left, #111827 10%, transparent);
}

.explore-hub-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #0073e6;
    color: #ffffff !important;
    padding: 10px 24px;
    border-radius: 9999px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.86rem;
    text-decoration: none;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 12px rgba(0, 115, 230, 0.25);
    transition: all 0.2s ease;
}
.explore-hub-btn:hover {
    background-color: #005bb5;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 115, 230, 0.35);
}

.loader {
    display: none; margin: 1.5rem auto; 
    border: 3px solid #f3f3f3;
    border-top: 3px solid #0073e6; 
    border-radius: 50%;
    width: 30px; height: 30px; 
    animation: spin 1s linear infinite;
}
.loader.visible { display: block; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Compact Subheadline container */
.subheadline-container {
    position: relative;
    max-height: 38px;
    overflow: hidden;
    margin-bottom: 0.35rem;
}
.subheadline-container::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 16px;
    background: linear-gradient(to bottom, rgba(255,255,255,0), #ffffff);
    pointer-events: none;
    z-index: 1;
}
html.dark-mode .subheadline-container::after {
    background: linear-gradient(to bottom, rgba(31,41,55,0), #1f2937);
}
</style>

{% include live-top-widget.html %}

<div class="support-cta-banner">
    <p>Independent journalism is more important than ever. Please consider supporting The Muslim Post today.</p>
    <a href="{{ '/support/' | relative_url }}" class="support-cta-button">Support TMP</a>
</div>

{% assign latest_post = site.posts.first %}
<main class="home-main" style="flex-grow: 1;">
    {% if latest_post %}
    <!-- Brand New Hero Latest Article Card -->
    <section class="top-story-section">
        <a href="{{ latest_post.url | relative_url }}" class="hero-spotlight-card">
            <div class="hero-image-pane">
                <img src="{{ latest_post.image | default: 'https://placehold.co/1200x800/e2e8f0/64748b?text=Image+Not+Available' }}" alt="{{ latest_post.image_description | default: 'Top story image' | escape }}" class="hero-cover-img" loading="eager" fetchpriority="high" decoding="async">
                <div class="hero-live-badge-tag">
                    <span class="hero-pulse-dot"></span>
                    <span>LATEST REPORT</span>
                </div>
            </div>
            <div class="hero-content-pane">
                <div class="hero-meta-row">
                    {% if latest_post.categories.first %}
                    <span class="hero-cat-tag">{{ latest_post.categories.first | replace: '-', ' ' | capitalize }}</span>
                    {% endif %}
                    <time class="hero-post-date"><i class="far fa-calendar-alt mr-1"></i>{{ latest_post.date | date: "%B %d, %Y" }}</time>
                </div>
                <h2 class="hero-spotlight-title">{{ latest_post.title }}</h2>
                <div class="hero-subheadline-container">
                    <p class="hero-spotlight-desc">{{ latest_post.subheadline | default: latest_post.content | strip_html | truncatewords: 28 }}</p>
                </div>
                <div class="hero-action-bar">
                    <div class="hero-author-line">
                        <span class="hero-author-avatar">{{ latest_post.writer | default: latest_post.author | default: 'TMP' | slice: 0 | upcase }}</span>
                        <div class="hero-author-details">
                            <span class="hero-author-name">{{ latest_post.writer | default: latest_post.author | default: 'TMP Staff' }}</span>
                            {% assign hero_words = latest_post.content | number_of_words %}
                            <span class="hero-read-duration">{{ hero_words | divided_by: 200 | plus: 1 }} min read</span>
                        </div>
                    </div>
                    <span class="hero-read-btn">
                        <span>Read More</span> <i class="fas fa-arrow-right ml-1"></i>
                    </span>
                </div>
            </div>
        </a>
    </section>
    {% endif %}

    <div class="content-wrapper">
        <!-- Special Reports 10-Card Random Horizontal Slider (Last 5 Days) -->
        <div class="home-slider-section-wrapper" id="home-slider-section-wrapper">
            <div class="slider-section-header">
                <div class="slider-title-wrapper">
                    <span class="slider-live-dot"></span>
                    <h3 class="slider-section-title">Special Reports</h3>
                    <span class="slider-fresh-badge"><i class="fas fa-bolt"></i> Daily Selection</span>
                </div>
                <div class="slider-nav-controls">
                    <button type="button" class="slider-arrow-btn slider-prev-btn" id="sliderPrevBtn" aria-label="Previous stories">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button type="button" class="slider-arrow-btn slider-next-btn" id="sliderNextBtn" aria-label="Next stories">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div class="slider-track-container" id="homeSliderTrackContainer">
                <div class="slider-track" id="homeSliderTrack">
                    {% for post in site.posts limit: 10 %}
                    <a href="{{ post.url | relative_url }}" class="slide-story-card" title="{{ post.title | escape }}">
                        <div class="slide-card-bg">
                            <img src="{{ post.image | default: 'https://placehold.co/800x500/e2e8f0/64748b?text=News' }}" alt="{{ post.title | escape }}" class="slide-card-img" loading="lazy" decoding="async">
                            <div class="slide-card-overlay"></div>
                            <div class="slide-card-top-tag">
                                <span class="slide-card-badge">{{ post.categories.first | default: 'News' | replace: '-', ' ' | capitalize }}</span>
                            </div>
                        </div>
                        <div class="slide-card-content">
                            <h4 class="slide-card-title">{{ post.title }}</h4>
                            <div class="slide-card-footer">
                                <span class="slide-card-date"><i class="far fa-calendar-alt"></i> {{ post.date | date: "%b %d, %Y" }}</span>
                                {% assign s_words = post.content | number_of_words %}
                                <span class="slide-card-read">{{ s_words | divided_by: 200 | plus: 1 }} min</span>
                            </div>
                        </div>
                    </a>
                    {% endfor %}
                </div>
            </div>
        </div>

        <!-- JSON Data Pool for Random 10 Stories Selection (Last 5 Days) -->
        <script id="home-slider-pool-data" type="application/json">
        [
          {% for post in site.posts limit: 80 %}
          {
            "title": {{ post.title | jsonify }},
            "url": {{ post.url | relative_url | jsonify }},
            "date": {{ post.date | date: "%Y-%m-%d" | jsonify }},
            "display_date": {{ post.date | date: "%b %d, %Y" | jsonify }},
            "image": {{ post.image | default: 'https://placehold.co/800x500/e2e8f0/64748b?text=News' | jsonify }},
            "category": {{ post.categories.first | default: 'News' | replace: '-', ' ' | capitalize | jsonify }},
            "read_time": {% assign p_words = post.content | number_of_words %}{{ p_words | divided_by: 200 | plus: 1 }}
          }{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ]
        </script>

        <hr class="section-divider">
        
        <!-- Live Filterable Latest Reports Grid -->
        <section class="content-section latest-reports-section">
            <div class="section-header-compact">
                <h2 class="section-title">Latest Reports</h2>
            </div>
            
            <div class="category-filters-nav-wrapper" id="home-filters-nav-wrapper">
                <div class="category-filters-container" id="home-filters-container">
                    <div class="category-filters" id="home-filters-bar">
                        <button class="filter-btn active" data-tag="">All</button>
                        <button class="filter-btn" data-tag="world-politics">World Politics</button>
                        <button class="filter-btn" data-tag="indian-politics">Indian Politics</button>
                        <button class="filter-btn" data-tag="muslim-world">Muslim World</button>
                        <button class="filter-btn" data-tag="technology">Technology</button>
                        <button class="filter-btn" data-tag="medical-science">Medical Science</button>
                        <button class="filter-btn" data-tag="global-economy">Global Economy</button>
                        <button class="filter-btn" data-tag="art-culture">Art & Culture</button>
                        <button class="filter-btn" data-tag="weather">Weather</button>
                        <button class="filter-btn" data-tag="sports">Sports</button>
                        <button class="filter-btn" data-tag="national-news">National News</button>
                        <button class="filter-btn" data-tag="international-news">International News</button>
                        <button class="filter-btn" data-tag="history">History</button>
                        <button class="filter-btn" data-tag="indian-muslims">Indian Muslims</button>
                        <button class="filter-btn" data-tag="middle-east">Middle East</button>
                        <button class="filter-btn" data-tag="climate">Climate</button>
                        <button class="filter-btn" data-tag="defense">Defense</button>
                        <button class="filter-btn" data-tag="south-asia">South Asia</button>
                        <button class="filter-btn" data-tag="africa">Africa</button>
                        <button class="filter-btn" data-tag="europe">Europe</button>
                        <button class="filter-btn" data-tag="central-asia">Central Asia</button>
                        <button class="filter-btn" data-tag="crime-alert">Crime Alert</button>
                        <button class="filter-btn" data-tag="south-east-asia">Southeast Asia</button>
                        <button class="filter-btn" data-tag="east-asia">East Asia</button>
                        <button class="filter-btn" data-tag="north-america">North America</button>
                        <button class="filter-btn" data-tag="south-america">South America</button>
                    </div>
                </div>
            </div>
            
            <!-- Horizontal Article Listing: Headline (75%) on left, Photo (25%) on right -->
            <div class="news-grid-full" id="home-articles-grid" style="min-height: 150px;">
                {% for post in site.posts limit: 8 offset: 1 %}
                {% assign post_words = post.content | number_of_words %}
                {% assign post_read_time = post_words | divided_by: 200 | plus: 1 %}
                <a href="{{ post.url | relative_url }}" class="news-card horizontal-news-card">
                    <div class="news-card-text">
                        <div class="news-card-top-row">
                            {% if post.categories.first %}
                            <span class="news-card-category-badge">{{ post.categories.first | replace: '-', ' ' | capitalize }}</span>
                            {% endif %}
                            <span class="news-card-date">{{ post.date | date: "%b %d, %Y" }}</span>
                        </div>
                        <h3 class="news-card-headline">{{ post.title }}</h3>
                        <div class="subheadline-container">
                            <p class="news-card-subheadline">{{ post.subheadline | default: post.content | strip_html | truncatewords: 20 }}</p>
                        </div>
                        <div class="news-card-footer-row">
                            <span class="read-more-text">Read More <i class="fas fa-arrow-right ml-1"></i></span>
                            <span class="news-card-read-time">{{ post_read_time }} min read</span>
                        </div>
                    </div>
                    <div class="news-card-image-wrapper">
                        <img src="{{ post.image | default: 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image' }}" alt="{{ post.image_description | default: post.title | escape }}" class="news-card-image" loading="lazy">
                    </div>
                </a>
                {% endfor %}
            </div>
            <div id="home-loader" class="loader"></div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <a href="{{ '/news/hub/' | relative_url }}" class="explore-hub-btn">Explore Full News Hub <i class="fas fa-arrow-right ml-1.5"></i></a>
            </div>

            <!-- Archive Spotlight 10-Card Random Horizontal Slider (Analysis & History Evergreen Collection) -->
            <div class="home-slider-section-wrapper home-archive-slider-wrapper" id="home-archive-slider-section-wrapper">
                <div class="slider-section-header">
                    <div class="slider-title-wrapper">
                        <span class="slider-live-dot archive-dot"></span>
                        <h3 class="slider-section-title">In-Depth Analysis & History</h3>
                        <span class="slider-fresh-badge archive-fresh-badge"><i class="fas fa-landmark"></i> Evergreen Archive</span>
                    </div>
                    <div class="slider-nav-controls">
                        <button type="button" class="slider-arrow-btn slider-prev-btn" id="archiveSliderPrevBtn" aria-label="Previous archive stories">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button type="button" class="slider-arrow-btn slider-next-btn" id="archiveSliderNextBtn" aria-label="Next archive stories">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <div class="slider-track-container" id="homeArchiveSliderTrackContainer">
                    <div class="slider-track" id="homeArchiveSliderTrack">
                        {% for post in site.posts limit: 10 %}
                        <a href="{{ post.url | relative_url }}" class="slide-story-card" title="{{ post.title | escape }}">
                            <div class="slide-card-bg">
                                <img src="{{ post.image | default: 'https://placehold.co/800x500/e2e8f0/64748b?text=News' }}" alt="{{ post.title | escape }}" class="slide-card-img" loading="lazy" decoding="async">
                                <div class="slide-card-overlay"></div>
                                <div class="slide-card-top-tag">
                                    <span class="slide-card-badge archive-badge">{{ post.categories.first | default: 'Analysis' | replace: '-', ' ' | capitalize }}</span>
                                </div>
                            </div>
                            <div class="slide-card-content">
                                <h4 class="slide-card-title">{{ post.title }}</h4>
                                <div class="slide-card-footer">
                                    <span class="slide-card-date"><i class="fas fa-landmark"></i> {{ post.date | date: "%b %d, %Y" }}</span>
                                    {% assign a_words = post.content | number_of_words %}
                                    <span class="slide-card-read">{{ a_words | divided_by: 200 | plus: 1 }} min</span>
                                </div>
                            </div>
                        </a>
                        {% endfor %}
                    </div>
                </div>
            </div>

            <!-- JSON Data Pool for Random 10 Evergreen Archive Stories (Analysis & History from D1) -->
            <script id="home-archive-slider-pool-data" type="application/json">
[{"title":"Shadian 1975 Massacre: How the PLA Siege Killed 1,600 Hui Muslims Defending Mosques","url":"/news/history/shadian-1975-massacre-how-the-pla-siege-killed-1-600-hui-muslims-defending-mosques/","date":"2026-10-31","display_date":"Oct 31, 2026","image":"https://assets.tmpnews.com/images/shadian-massacre.webp","category":"History","read_time":5,"is_local":true},{"title":"India Loses Regional Influence as Ideology Strains South Asian Ties","url":"/news/analysis-&-in-depth-reports/india-loses-regional-influence-as-ideology-strains-south-asian-ties/","date":"2026-10-24","display_date":"Oct 24, 2026","image":"https://assets.tmpnews.com/images/narendra-modi.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"Grantham Study Links Over 50,000 European Deaths to 2026 Heatwaves","url":"/news/analysis-&-in-depth-reports/grantham-study-links-over-50-000-european-deaths-to-2026-heatwaves/","date":"2026-10-23","display_date":"Oct 23, 2026","image":"https://assets.tmpnews.com/images/europe-summer-heat-map.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"Adityanath Touts Inclusivity as Minority Hate Crimes Surge in India","url":"/news/analysis-&-in-depth-reports/adityanath-touts-inclusivity-as-minority-hate-crimes-surge-in-india/","date":"2026-10-21","display_date":"Oct 21, 2026","image":"https://assets.tmpnews.com/images/ajay-bisht.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"Israeli Researcher Cites 'Ideological Alliance' With India's RSS","url":"/news/analysis-&-in-depth-reports/israeli-researcher-cites-ideological-alliance-with-india-s-rss/","date":"2026-10-19","display_date":"Oct 19, 2026","image":"https://assets.tmpnews.com/images/israeli-researcher-cites-ideological-alliance-with-indias-rss.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"U.S. Expends 19 Years of Patriot Missiles in Seven Months of Iran War","url":"/news/analysis-&-in-depth-reports/u-s-expends-19-years-of-patriot-missiles-in-seven-months-of-iran-war/","date":"2026-10-19","display_date":"Oct 19, 2026","image":"https://assets.tmpnews.com/images/patriot.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"Missile Man of India: Remembering Dr. A.P.J. Abdul Kalam on His Birth Anniversary","url":"/news/history/missile-man-of-india-remembering-dr-a-p-j-abdul-kalam-on-his-birth-anniversary/","date":"2026-10-15","display_date":"Oct 15, 2026","image":"https://assets1.tmpnews.com/images/apj-abdul-kalam.webp","category":"History","read_time":5,"is_local":true},{"title":"India\u2019s Road Network: A Giant of Infrastructure Plagued by a Crisis of Safety","url":"/news/analysis-&-in-depth-reports/india-s-road-network-a-giant-of-infrastructure-plagued-by-a-crisis-of-safety/","date":"2026-10-13","display_date":"Oct 13, 2026","image":"https://assets1.tmpnews.com/images/road-accident-shows-in-pin-board-style-by-tmpnews.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"India Voter Roll Deletions Spark Outrage Over Lack of Reasons","url":"/news/analysis-&-in-depth-reports/india-voter-roll-deletions-spark-outrage-over-lack-of-reasons/","date":"2026-10-09","display_date":"Oct 9, 2026","image":"https://assets1.tmpnews.com/images/sir-irregularities-in-up-sparks-tension-nation-wide.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"North Africa and the Middle East Need Urgent Farm Investment Amid Deepening Crises, FAO Warns","url":"/news/analysis-&-in-depth-reports/north-africa-and-the-middle-east-need-urgent-farm-investment-amid-deepening-crises-fao-warns/","date":"2026-10-08","display_date":"Oct 8, 2026","image":"https://assets1.tmpnews.com/images/tmp-collage.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"WHO Warns of Global Surge in Childhood Obesity as Cases Quadruple Since 1990","url":"/news/analysis-&-in-depth-reports/who-warns-of-global-surge-in-childhood-obesity-as-cases-quadruple-since-1990/","date":"2026-10-08","display_date":"Oct 8, 2026","image":"https://assets1.tmpnews.com/images/obesity.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"The Mysterious 16.18 Lakh Voters Added to Uttar Pradesh\u2019s Electoral Roll","url":"/news/analysis-&-depth-report/the-mysterious-16-18-lakh-voters-added-to-uttar-pradesh-s-electoral-roll/","date":"2026-10-07","display_date":"Oct 7, 2026","image":"https://assets1.tmpnews.com/images/uttarpradesh-mysterious-voters-added.webp","category":"Analysis","read_time":5,"is_local":true},{"title":"Gandhi Jayanti: A Day to Honour Truth and Non-Violence","url":"/news/history/gandhi-jayanti-a-day-to-honour-truth-and-non-violence/","date":"2026-10-02","display_date":"Oct 2, 2026","image":"https://assets1.tmpnews.com/images/mahatma-gandhi.webp","category":"History","read_time":5,"is_local":true},{"title":"Salahuddin Ayyubi Conquers Jerusalem on October 2, 1187","url":"/news/history/salahuddin-ayyubi-conquers-jerusalem-on-october-2-1187/","date":"2026-10-02","display_date":"Oct 2, 2026","image":"https://assets1.tmpnews.com/images/conquest-of-jerusalem.webp","category":"History","read_time":5,"is_local":true},{"title":"The 9M729 Missile: Russia\u2019s Silent Power Shift Beyond the INF Treaty","url":"/news/analysis/the-9m729-missile-russias-silent-power-shift-beyond-the-inf-treaty/","date":"2025-11-02","display_date":"Nov 2, 2025","image":"https://i.ibb.co/67vJX76j/anBn.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"UK Signs \u00a38 Billion Deal to Sell 20 Eurofighter Typhoon Jets to T\u00fcrkiye","url":"/news/analysis/uk-signs-8-billion-deal-to-sell-20-eurofighter-typhoon-jets-to-trkiye/","date":"2025-10-28","display_date":"Oct 28, 2025","image":"https://i.ibb.co/39f4XZ21/kmc-20251028-153127.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Seemanchal Stands With AIMIM: Five-Seat Victory in 2025","url":"/news/analysis/seemanchal-stands-with-aimim-five-seat-victory-in-2025/","date":"2025-11-14","display_date":"Nov 14, 2025","image":"https://i.ibb.co/ddxDyG1/t3e1st7g-asaduddin-owaisi-625x300-23-October-23.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Trump\u2019s Daydreaming About Nigeria","url":"/news/analysis/trumps-daydreaming-about-nigeria/","date":"2025-11-06","display_date":"Nov 6, 2025","image":"https://i.ibb.co/mWTMjx8/4498.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"British Journalist Sami Hamdi to Be Released After Two Weeks in U.S. Immigration Detention","url":"/news/analysis/british-journalist-sami-hamdi-to-be-released-after-two-weeks-in-us-immigration-detention/","date":"2025-11-13","display_date":"Nov 13, 2025","image":"https://i.ibb.co/TxtjS67R/sami-hamdi-airport-660x371.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Scholz Says His Government Fell Over Dispute on \u20ac15 Billion Aid Package for Ukraine","url":"/news/analysis/scholz-says-his-government-fell-over-dispute-on-15-billion-aid-package-for-ukraine/","date":"2025-11-13","display_date":"Nov 13, 2025","image":"https://i.ibb.co/Q7S2XzDL/2023-08-25-141706-1692950003-large.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"BJP\u2019s $800M Bihar Vote Push","url":"/news/analysis/bjps-800m-bihar-vote-push/","date":"2025-11-15","display_date":"Nov 15, 2025","image":"https://i.ibb.co/cS2RKBnx/Narendra-Modi-addressing-to-people-of-Maharashtra-2.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Cameroon Erupts in Violence as 92-Year-Old Paul Biya Secures Contested Eighth Term","url":"/news/analysis/cameroon-erupts-in-violence-as-92-year-old-paul-biya-secures-contested-eighth-term/","date":"2025-10-27","display_date":"Oct 27, 2025","image":"https://i.ibb.co/wr75M2G6/kmc-20251027-153937.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Spain Fines X \u20ac5 Million for Unauthorized Crypto Ads","url":"/news/analysis/spain-fines-x-5-million-for-unauthorized-crypto-ads/","date":"2025-11-13","display_date":"Nov 13, 2025","image":"https://i.ibb.co/9mG7D9gK/Madrid-Edificio-Edison-Comisi-n-Nacional-del-Mercado-de-Valores-2.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Slowing Momentum in Global Stock Markets","url":"/news/analysis/slowing-momentum-in-global-stock-markets/","date":"2025-10-21","display_date":"Oct 21, 2025","image":"https://i.postimg.cc/8CSdSD3C/Background-Eraser-20251021-155307825.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Milei\u2019s Revival Comes at a Price \u2014 U.S. Influence Over Argentina\u2019s Future","url":"/news/analysis/mileis-revival-comes-at-a-price--us-influence-over-argentinas-future/","date":"2025-10-27","display_date":"Oct 27, 2025","image":"https://i.ibb.co/VWFbTBr6/kmc-20251027-134148.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"India\u2019s Muslims: Trapped in Systemic Exclusion","url":"/news/analysis/indias-muslims-trapped-in-systemic-exclusion/","date":"2025-10-31","display_date":"Oct 31, 2025","image":"https://i.ibb.co/JFgKwJ5Z/kmc-20251031-101327.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Rising Ties: Iran and Pakistan Move Closer","url":"/news/analysis/rising-ties-iran-and-pakistan-move-closer/","date":"2025-10-26","display_date":"Oct 26, 2025","image":"https://i.ibb.co/JWHF6Vd1/New-Project-5-8-D765-AD.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"YouTube Erases History: Over 700 Palestinian War Crime Videos Silenced in Coordinated Censorship Campaign","url":"/news/analysis/youtube-erases-history-over-700-palestinian-war-crime-videos-silenced-in-coordinated-censorship-campaign/","date":"2025-11-11","display_date":"Nov 11, 2025","image":"https://i.ibb.co/MwXbsLW/kmc-20251111-200714.webp","category":"History","read_time":5,"is_local":false},{"title":"Teesta Tensions: Bangladesh\u2019s Need, China\u2019s Opportunity","url":"/news/analysis/teesta-tensions-bangladeshs-need-chinas-opportunity/","date":"2025-10-23","display_date":"Oct 23, 2025","image":"https://i.postimg.cc/QdrZWfLk/kmc-20251023-152232.png","category":"Analysis","read_time":5,"is_local":false},{"title":"Al-Zahrawi: The Father of Modern Surgery","url":"/news/analysis/al-zahrawi-the-father-of-modern-surgery/","date":"2025-10-22","display_date":"Oct 22, 2025","image":"https://i.ibb.co/BbbBFnd/kmc-20251022-191009.webp","category":"History","read_time":5,"is_local":false},{"title":"Simorgh Soars: Iran Rises as a New Aerospace Power","url":"/news/analysis/simorgh-soars-iran-rises-as-a-new-aerospace-power/","date":"2025-11-09","display_date":"Nov 9, 2025","image":"https://i.ibb.co/gbnrHSgc/2972968.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Venezuela: The Truth Behind America\u2019s Aggression","url":"/news/analysis/venezuela-the-truth-behind-americas-aggression/","date":"2025-10-25","display_date":"Oct 25, 2025","image":"https://i.ibb.co/xkpgCKT/kmc-20251025-135551.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Iran Unveils Shahed-161 Drone","url":"/news/analysis/iran-unveils-shahed-161-drone/","date":"2025-11-12","display_date":"Nov 12, 2025","image":"https://i.ibb.co/391KtgNj/Screenshot-2025-11-12-17-25-24-80-948cd9899890cbd5c2798760b2b95377.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"How the West Stole Venezuela\u2019s Gold and Blamed the Victim","url":"/news/analysis/how-the-west-stole-venezuelas-gold-and-blamed-the-victim/","date":"2025-11-07","display_date":"Nov 7, 2025","image":"https://i.ibb.co/4nNRRgNB/kmc-20251107-140304.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Sri Lankan Players Seek to Exit Pakistan Tour After Islamabad Bombing Sparks Security Fears","url":"/news/analysis/sri-lankan-players-seek-to-exit-pakistan-tour-after-islamabad-bombing-sparks-security-fears/","date":"2025-11-13","display_date":"Nov 13, 2025","image":"https://i.ibb.co/bj4b8nd1/IMG-20251113-194949-223.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"China\u2019s Yuan Loans Challenge Dollar Dominance","url":"/news/analysis/chinas-yuan-loans-challenge-dollar-dominance/","date":"2025-10-29","display_date":"Oct 29, 2025","image":"https://i.ibb.co/JWhfbwJj/kmc-20251029-142801.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"China\u2019s\u200d\u200c\u200d\u200d\u200c\u200d\u200c\u200d\u200d\u200c New","url":"/news/analysis/chinas-new-flying-wing-drone-stealth-bomber-or-elaborate-decoy/","date":"2025-10-22","display_date":"Oct 22, 2025","image":"https://i.ibb.co/nqF48y1L/kmc-20251023-004154.png","category":"Analysis","read_time":5,"is_local":false},{"title":"From Brotherhood to Betrayal: UAE\u2019s Silence as Israel Destroys Gaza","url":"/news/analysis/from-brotherhood-to-betrayal-uaes-silence-as-israel-destroys-gaza/","date":"2025-10-27","display_date":"Oct 27, 2025","image":"https://i.ibb.co/pjL6CPry/kmc-20251027-215428.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Babar Azam Makes History: Surpasses Virat Kohli in Record-Breaking Win Against South Africa","url":"/news/analysis/babar-azam-makes-history-surpasses-virat-kohli-in-record-breaking-win-against-south-africa/","date":"2025-11-02","display_date":"Nov 2, 2025","image":"https://i.ibb.co/rKBQDbgk/1-i2-D04lfp1-IX-Sai5-Qf-Kpb-A.webp","category":"History","read_time":5,"is_local":false},{"title":"Telegram Founder Unveils \u201cCocoon\u201d for Open AI Computing","url":"/news/analysis/telegram-founder-unveils-cocoon-for-open-ai-computing/","date":"2025-10-30","display_date":"Oct 30, 2025","image":"https://i.ibb.co/nsnNXKFL/kmc-20251030-170730.webp","category":"History","read_time":5,"is_local":false},{"title":"Russia Revives Military Flights to Syria to Reinforce Strategic Ties with Damascus","url":"/news/analysis/russia-revives-military-flights-to-syria-to-reinforce-strategic-ties-with-damascus/","date":"2025-10-31","display_date":"Oct 31, 2025","image":"https://i.ibb.co/MyC7VTnt/IMG-20251031-WA0000.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Deadly Explosion Erupts Near Red Fort Metro","url":"/news/analysis/deadly-explosion-erupts-near-red-fort-metro/","date":"2025-11-11","display_date":"Nov 11, 2025","image":"https://i.ibb.co/qL7193zG/IMG-20251110-214710-699.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"T\u00fcrkiye Moves Closer to National GPS System With Fergani\u2019s Latest Satellite Launch","url":"/news/analysis/trkiye-moves-closer-to-national-gps-system-with-ferganis-latest-satellite-launch/","date":"2025-11-04","display_date":"Nov 4, 2025","image":"https://i.ibb.co/9k3x3FqQ/409612.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Oil Prices Rebound After Falling to Five-Month Lows","url":"/news/analysis/oil-prices-rebound-after-falling-to-five-month-lows/","date":"2025-10-22","display_date":"Oct 22, 2025","image":"https://i.postimg.cc/hv9ffF8P/kmc-20251022-182845.png","category":"Analysis","read_time":5,"is_local":false},{"title":"Australia and Indonesia Sign Landmark Security Pact to Strengthen Indo-Pacific Stability","url":"/news/analysis/australia-and-indonesia-sign-landmark-security-pact-to-strengthen-indo-pacific-stability/","date":"2025-11-12","display_date":"Nov 12, 2025","image":"https://i.ibb.co/gb4LVPkd/signal-2025-11-12-21-52-13-386.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Monarchy Cuts Ties with Prince Andrew","url":"/news/analysis/monarchy-cuts-ties-with-prince-andrew/","date":"2025-10-31","display_date":"Oct 31, 2025","image":"https://i.ibb.co/zT7QXfJm/1536x864-cmsv2-8d9d1566-51f3-524f-8841-f30a3877bd04-9531673.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Colombia\u2019s $3.6B Gripen Deal Marks Historic Leap in Air Power","url":"/news/analysis/colombias-36b-gripen-deal-marks-historic-leap-in-air-power/","date":"2025-11-15","display_date":"Nov 15, 2025","image":"https://i.ibb.co/r2Kj5LKR/photo-1686557068152-d558011164f0.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Arsenal win seven in a row without conceding a goal","url":"/news/analysis/arsenal-win-seven-in-a-row-without-conceding-a-goal/","date":"2025-11-02","display_date":"Nov 2, 2025","image":"https://i.ibb.co/TMyS0QQX/cc7b2470-b50d-11f0-995b-49549025ae43.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Historic Storm: Hurricane Melissa Devastates Jamaica","url":"/news/analysis/historic-storm-hurricane-melissa-devastates-jamaica/","date":"2025-10-28","display_date":"Oct 28, 2025","image":"https://i.ibb.co/39wJVcm7/kmc-20251028-223327.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"The\u200d\u200c\u200d\u200d\u200c\u200d\u200c\u200d\u200d\u200c\u200d\u200c\u200d\u200d\u200c\u200d\u200c\u200d\u200d\u200c Reality Behind India\u2019s \u201cBooming\u201d Economy Under BJP","url":"/news/analysis/the-reality-behind-indias-booming-economy-under-bjp/","date":"2025-10-23","display_date":"Oct 23, 2025","image":"https://i.postimg.cc/cHYbZ8T8/IMG-20251023-WA0007.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Delhi Chokes Again: AQI Crosses 450 Mark","url":"/news/analysis/delhi-chokes-again-aqi-crosses-450-mark/","date":"2025-11-12","display_date":"Nov 12, 2025","image":"https://i.ibb.co/tMqjNSNq/AQ77-X2-GDBBLJDBU2-VSDHJQMXAE.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Britain to Mass-Produce Ukraine\u2019s OCTOPUS Interceptor Drone","url":"/news/analysis/britain-to-mass-produce-ukraines-octopus-interceptor-drone/","date":"2025-10-24","display_date":"Oct 24, 2025","image":"https://i.ibb.co/5X72jty1/IMG-20251024-WA0003.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"The Muslim World Failed Gaza","url":"/news/analysis/the-muslim-world-failed-gaza/","date":"2025-10-20","display_date":"Oct 20, 2025","image":"https://i.postimg.cc/639DLmVR/IMG-20251020-WA0003.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"India Ends Operations at Ayni Air Base in Tajikistan Amid Growing Pakistan Influence in the Region","url":"/news/analysis/india-ends-operations-at-ayni-air-base-in-tajikistan-amid-growing-pakistan-influence-in-the-region/","date":"2025-10-30","display_date":"Oct 30, 2025","image":"https://i.ibb.co/BVqR0D8j/image.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Russia Claims Successful Test of Burevestnik Nuclear-Powered Cruise Missile","url":"/news/analysis/russia-claims-successful-test-of-burevestnik-nuclear-powered-cruise-missile/","date":"2025-10-27","display_date":"Oct 27, 2025","image":"https://i.ibb.co/Pz9ntqFC/IMG-20251027-104943-506.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"The Outstanding Contributions of Muslim Physicians to Medicine","url":"/news/analysis/the-outstanding-contributions-of-muslim-physicians-to-medicine/","date":"2025-10-21","display_date":"Oct 21, 2025","image":"https://i.postimg.cc/MpJLHnrr/Background-Eraser-20251021-161109160.jpg","category":"History","read_time":5,"is_local":false},{"title":"India Defies U.S. Pressure, Resumes Purchase of Russian Crude","url":"/news/analysis/india-defies-us-pressure-resumes-purchase-of-russian-crude/","date":"2025-11-01","display_date":"Nov 1, 2025","image":"https://i.ibb.co/QjDJcgjD/kmc-20251101-123954.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"The Great Colonial Robbery: How Britain Drained India of $45 Trillion","url":"/news/analysis/the-great-colonial-robbery-how-britain-drained-india-of-45-trillion/","date":"2025-11-04","display_date":"Nov 4, 2025","image":"https://i.ibb.co/ZzNCNFXT/kmc-20251101-160309.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Western Hypocrisy on Ukraine War","url":"/news/analysis/western-hypocrisy-on-ukraine-war/","date":"2025-10-04","display_date":"Oct 4, 2025","image":"https://i.postimg.cc/nLkhgbwM/russia-ukraine.png","category":"Analysis","read_time":5,"is_local":false},{"title":"Porsche Faces Financial Setback as Profits Plunge 99% Amid EV Transition","url":"/news/analysis/porsche-faces-financial-setback-as-profits-plunge-99-amid-ev-transition/","date":"2025-10-27","display_date":"Oct 27, 2025","image":"https://i.ibb.co/yFWJnm49/porsche-logo.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"UN Again Urges U.S. to End Its 60-Year Embargo on Cuba","url":"/news/analysis/un-again-urges-us-to-end-its-60-year-embargo-on-cuba/","date":"2025-10-31","display_date":"Oct 31, 2025","image":"https://i.ibb.co/Q7j1qG09/2025-UN-Vote-Cuba-1536x710.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Warning From Berlin: Russia Still Capable of a Rapid, Limited Strike on NATO Soil","url":"/news/analysis/warning-from-berlin-russia-still-capable-of-a-rapid-limited-strike-on-nato-soil/","date":"2025-11-09","display_date":"Nov 9, 2025","image":"https://i.ibb.co/chc2PhrC/00int-russian-troops01-photo-vwpm-article-Large.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"India and China Restore Direct Flights After Five-Year Pause","url":"/news/analysis/india-and-china-restore-direct-flights-after-five-year-pause/","date":"2025-10-27","display_date":"Oct 27, 2025","image":"https://i.ibb.co/k6MHnqXC/1200px-Indi-Go-Airbus-A320neo-F-WWDG-to-VT-ITI-28915135713.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Iran\u2019s\u200d\u200c\u200d\u200d\u200c\u200d\u200c\u200d\u200d\u200c Missile Power: The Rise of a Regional Deterrent","url":"/news/analysis/irans-missile-power-the-rise-of-a-regional-deterrent/","date":"2025-10-24","display_date":"Oct 24, 2025","image":"https://i.ibb.co/QvzMCFHJ/IMG-20251024-WA0002.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"South Korea\u2013UAE $15 Billion Fighter Jet Talks Signal a Major Strategic Shift","url":"/news/world-politics/south-koreauae-15-billion-fighter-jet-talks-signal-a-major-strategic-shift/","date":"2025-11-19","display_date":"Nov 19, 2025","image":"https://media.tmpnews.com/images/A-full-scale-airframe-environmental-testing-of-KF-21-prototype-004.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Elon Musk\u2019s Grokipedia Declares War on Wikipedia\u2019s Dominance in the Knowledge World","url":"/news/analysis/elon-musks-grokipedia-declares-war-on-wikipedias-dominance-in-the-knowledge-world/","date":"2025-10-28","display_date":"Oct 28, 2025","image":"https://i.ibb.co/vCVprfn9/kmc-20251028-144055.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"China Unveils World\u2019s Largest Ion Accelerator \u2014 A Game-Changer for Global Science","url":"/news/analysis/china-unveils-worlds-largest-ion-accelerator--a-game-changer-for-global-science/","date":"2025-11-02","display_date":"Nov 2, 2025","image":"https://i.ibb.co/dJmHmMBg/09ffa213f1974c458e0f36b4452c5097.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Libya Faces New Refugee Wave Amid Sudan War","url":"/news/analysis/libya-faces-new-refugee-wave-amid-sudan-war/","date":"2025-11-11","display_date":"Nov 11, 2025","image":"https://i.ibb.co/pj982QRC/cq5dam-thumbnail-cropped-500-281.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Germany Revives Military Preparedness with Hybrid Service Model","url":"/news/analysis/germany-revives-military-preparedness-with-hybrid-service-model/","date":"2025-11-13","display_date":"Nov 13, 2025","image":"https://i.ibb.co/s9wWdcdB/U-S-Military-personnel-participate-in-trials-for-the-German-Armed-Forces-Proficiency-Badge-9323745.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Zohran Mamdani Makes History as New York\u2019s First Muslim and South Asian Mayor","url":"/news/analysis/zohran-mamdani-makes-history-as-new-yorks-first-muslim-and-south-asian-mayor/","date":"2025-11-05","display_date":"Nov 5, 2025","image":"https://i.ibb.co/NdRJ7HdS/Ali-Getty-Images-2243051184.webp","category":"History","read_time":5,"is_local":false},{"title":"Nowgam Blast Was Accidental, Confirms J&K DGP; Attack Claims Termed Baseless","url":"/news/analysis/nowgam-blast-was-accidental-confirms-jk-dgp-attack-claims-termed-baseless/","date":"2025-11-15","display_date":"Nov 15, 2025","image":"https://i.ibb.co/TMsmwjs8/IMG-20251115-143553-345.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"The\u200d\u200c\u200d\u200d\u200c\u200d\u200c\u200d\u200d\u200c Forgotten Summit of 1974 \u2014 The Rise and Fall of Those Who Dreamed of Arab Unity","url":"/news/analysis/the-forgotten-summit-of-1974--the-rise-and-fall-of-those-who-dreamed-of-arab-unity/","date":"2025-10-24","display_date":"Oct 24, 2025","image":"https://i.ibb.co/yFBfRmtG/kmc-20251024-210733.webp","category":"History","read_time":5,"is_local":false},{"title":"Nobel Prize to Provocation: Machado Pushes for Forceful Removal of Maduro","url":"/news/analysis/nobel-prize-to-provocation-machado-pushes-for-forceful-removal-of-maduro/","date":"2025-11-01","display_date":"Nov 1, 2025","image":"https://i.ibb.co/3mGQFFXf/kmc-20251101-115715.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"India Signs 10-Year Defense Pact with U.S. Amid Trump\u2019s Provocative Remarks \u2014 A Strategic Gain but a Diplomatic Setback","url":"/news/analysis/india-signs-10-year-defense-pact-with-us-amid-trumps-provocative-remarks--a-strategic-gain-but-a-diplomatic-setback/","date":"2025-10-31","display_date":"Oct 31, 2025","image":"https://i.ibb.co/7JrHJGC7/IMG-20251031-133329-301.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Republicans Silent on Trump\u2019s $800M Crypto Surge","url":"/news/analysis/republicans-silent-on-trumps-800m-crypto-surge/","date":"2025-10-29","display_date":"Oct 29, 2025","image":"https://i.ibb.co/jkJv7C2V/kmc-20251029-125014.webp","category":"Analysis","read_time":5,"is_local":false},{"title":"Trump\u2019s \u201cPro-Troop\u201d Image Tested as Administration Fails to Fully Fund Military Salaries","url":"/news/analysis/trumps-pro-troop-image-tested-as-administration-fails-to-fully-fund-military-salaries/","date":"2025-11-02","display_date":"Nov 2, 2025","image":"https://i.ibb.co/CKq3bdqQ/IMG-20251102-224834-814.jpg","category":"Analysis","read_time":5,"is_local":false},{"title":"Google Invests \u20ac5.5B in Germany\u2019s Cloud Expansion","url":"/news/analysis/google-invests-55b-in-germanys-cloud-expansion/","date":"2025-11-12","display_date":"Nov 12, 2025","image":"https://i.ibb.co/j9vzzC91/IMG-20251112-162730-139.webp","category":"Analysis","read_time":5,"is_local":false}]
            </script>
        </section>

        <hr class="section-divider">
        
        <section class="content-section features-section reveal-on-scroll">
            <div class="section-header-compact">
                <h2 class="section-title">Why Join Us?</h2>
                <p class="section-subtitle">An independent platform designed for sharing knowledge, research, and unbiased analysis.</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon-bubble grad-bubble-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </div>
                    <h3 class="feature-title">Share Your Voice</h3>
                    <p class="feature-text">Easily publish your articles, deep-dive research, and opinions for a dedicated global audience.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon-bubble grad-bubble-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3 class="feature-title">Engage with Peers</h3>
                    <p class="feature-text">Connect with a community of geopolitical analysts, scholars, and thoughtful readers worldwide.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon-bubble grad-bubble-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                    </div>
                    <h3 class="feature-title">Stay Ahead</h3>
                    <p class="feature-text">Track breaking global developments and real-time dispatches curated by our independent newsroom.</p>
                </div>
            </div>
        </section>
    </div>

    <section class="cta-section">
        <div class="cta-card reveal-on-scroll">
            <span class="cta-pill-badge"><i class="fas fa-feather-pointed mr-1.5"></i>Contribute to TMP</span>
            <h2 class="cta-heading">Share Your Knowledge</h2>
            <p class="cta-subheading">Join a growing network of global correspondents, researchers, and writers. Publish your perspective and spark meaningful dialogue.</p>
            <a id="cta-get-started" href="{{ '/post/' | relative_url }}" class="cta-button">
                <span>Start Writing</span> <i class="fas fa-arrow-right ml-2"></i>
            </a>
        </div>
    </section>
</main>

<script>
    (function() {
        function initHomePage() {
            const getStartedBtn = document.getElementById('cta-get-started');
            if (getStartedBtn) {
                let cachedUser = null;
                try {
                    cachedUser = localStorage.getItem('cachedUser');
                } catch (e) {
                    console.warn("localStorage is disabled or not accessible:", e);
                }
                if (!cachedUser) {
                    getStartedBtn.href = "{{ 'auth.html' | relative_url }}";
                }
            }
            
            const revealElements = document.querySelectorAll('.reveal-on-scroll');
            if (revealElements.length > 0) {
                if ('IntersectionObserver' in window) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('is-visible');
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.05, rootMargin: "0px 0px 50px 0px" });
                    
                    revealElements.forEach(element => {
                        if (!element.classList.contains('is-visible')) {
                            observer.observe(element);
                        }
                    });
                } else {
                    revealElements.forEach(element => {
                        element.classList.add('is-visible');
                    });
                }
            }

            // Initialize Special Reports 10-Post Random Slider (Fresh Selection < 5 Days)
            initSpotlightSlider();

            // Initialize In-Depth Analysis & History 10-Post Random Slider (D1 Archive Evergreen)
            initArchiveSlider();
        }

        function escapeHtml(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function shuffleArray(arr) {
            const a = arr.slice();
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        // Shared smooth swipe & desktop pointer pan interaction handler
        function setupTrackInteractions(track, prevBtnId, nextBtnId) {
            if (track._interactionsSetup) return;
            track._interactionsSetup = true;

            const prevBtn = document.getElementById(prevBtnId);
            const nextBtn = document.getElementById(nextBtnId);
            const isRTL = document.documentElement.dir === 'rtl' || document.dir === 'rtl';

            function updateNavState() {
                if (!prevBtn || !nextBtn) return;
                const maxScroll = track.scrollWidth - track.clientWidth - 5;
                const cur = Math.abs(track.scrollLeft);
                prevBtn.disabled = cur <= 5;
                nextBtn.disabled = cur >= maxScroll;
                prevBtn.style.opacity = prevBtn.disabled ? '0.35' : '1';
                nextBtn.style.opacity = nextBtn.disabled ? '0.35' : '1';
                prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';
                nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
            }

            if (prevBtn && nextBtn) {
                prevBtn.onclick = () => {
                    const card = track.querySelector('.slide-story-card');
                    const step = card ? (card.offsetWidth + 14) * 2 : track.clientWidth * 0.85;
                    track.scrollBy({ left: isRTL ? step : -step, behavior: 'smooth' });
                };
                nextBtn.onclick = () => {
                    const card = track.querySelector('.slide-story-card');
                    const step = card ? (card.offsetWidth + 14) * 2 : track.clientWidth * 0.85;
                    track.scrollBy({ left: isRTL ? -step : step, behavior: 'smooth' });
                };
                track.addEventListener('scroll', updateNavState, { passive: true });
                updateNavState();
            }

            // Desktop Mouse Drag Panning (Listeners attached only during active drag to eliminate idle overhead)
            let isDown = false;
            let startX = 0;
            let scrollStart = 0;
            let hasMoved = false;

            function onPointerMove(e) {
                if (!isDown) return;
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX) * 1.25;
                if (Math.abs(walk) > 5) {
                    hasMoved = true;
                }
                track.scrollLeft = scrollStart - (isRTL ? -walk : walk);
            }

            function onPointerUp(e) {
                if (isDown) {
                    isDown = false;
                    track.classList.remove('is-dragging');
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', onPointerUp);
                }
            }

            track.addEventListener('pointerdown', (e) => {
                if (e.pointerType !== 'mouse' || e.button !== 0) return;
                isDown = true;
                hasMoved = false;
                startX = e.pageX - track.offsetLeft;
                scrollStart = track.scrollLeft;
                track.classList.add('is-dragging');
                window.addEventListener('pointermove', onPointerMove, { passive: true });
                window.addEventListener('pointerup', onPointerUp, { passive: true });
            });

            // Touch Drag Threshold Tracking (Prevents accidental clicks when swiping on mobile)
            let touchStartX = 0;
            let touchStartY = 0;
            track.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                    hasMoved = false;
                }
            }, { passive: true });

            track.addEventListener('touchmove', (e) => {
                if (e.touches.length === 1) {
                    const diffX = Math.abs(e.touches[0].clientX - touchStartX);
                    const diffY = Math.abs(e.touches[0].clientY - touchStartY);
                    if (diffX > 8 || diffY > 8) {
                        hasMoved = true;
                    }
                }
            }, { passive: true });

            track.addEventListener('click', (e) => {
                if (hasMoved) {
                    e.preventDefault();
                    e.stopPropagation();
                    hasMoved = false;
                }
            }, true);
        }

        // 1. Slider 1: Special Reports (Last 5 Days Selection)
        function initSpotlightSlider() {
            const track = document.getElementById('homeSliderTrack');
            const poolEl = document.getElementById('home-slider-pool-data');
            if (!track || !poolEl) return;

            setupTrackInteractions(track, 'sliderPrevBtn', 'sliderNextBtn');

            let posts = [];
            try {
                posts = JSON.parse(poolEl.textContent || '[]');
            } catch (e) {
                console.error("Failed to parse slider posts pool:", e);
                return;
            }

            if (!Array.isArray(posts) || posts.length === 0) return;

            // Calculate 5-Day window anchored to latest post time
            let maxPostTime = 0;
            posts.forEach(p => {
                if (!p.date) return;
                const t = new Date(p.date + 'T23:59:59Z').getTime();
                if (!isNaN(t) && t > maxPostTime) {
                    maxPostTime = t;
                }
            });

            const refTime = Math.max(Date.now(), maxPostTime);
            const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;
            const cutoffTime = refTime - fiveDaysMs;

            let eligible = posts.filter(p => {
                if (!p.date) return false;
                const t = new Date(p.date + 'T23:59:59Z').getTime();
                return !isNaN(t) && t >= cutoffTime;
            });

            if (eligible.length < 10) {
                eligible = posts.slice(0, Math.max(15, eligible.length));
            }

            const selectedPosts = shuffleArray(eligible).slice(0, 10);

            // Avoid flickering: only update innerHTML if URLs changed
            const existingUrls = Array.from(track.querySelectorAll('.slide-story-card')).map(a => a.getAttribute('href'));
            const newUrls = selectedPosts.map(p => p.url);
            const isIdentical = existingUrls.length === newUrls.length && existingUrls.every((u, i) => u === newUrls[i]);

            if (!isIdentical) {
                track.innerHTML = selectedPosts.map(post => `
                    <a href="${post.url}" class="slide-story-card" title="${escapeHtml(post.title)}">
                        <div class="slide-card-bg">
                            <img src="${post.image}" alt="${escapeHtml(post.title)}" class="slide-card-img" loading="lazy" decoding="async">
                            <div class="slide-card-overlay"></div>
                            <div class="slide-card-top-tag">
                                <span class="slide-card-badge">${escapeHtml(post.category)}</span>
                            </div>
                        </div>
                        <div class="slide-card-content">
                            <h4 class="slide-card-title">${escapeHtml(post.title)}</h4>
                            <div class="slide-card-footer">
                                <span class="slide-card-date"><i class="far fa-calendar-alt"></i> ${escapeHtml(post.display_date)}</span>
                                <span class="slide-card-read">${post.read_time} min</span>
                            </div>
                        </div>
                    </a>
                `).join('');
            }
        }

        // 2. Slider 2: In-Depth Analysis & History (Evergreen D1 Archive Collection)
        function initArchiveSlider() {
            const track = document.getElementById('homeArchiveSliderTrack');
            const poolEl = document.getElementById('home-archive-slider-pool-data');
            if (!track) return;

            setupTrackInteractions(track, 'archiveSliderPrevBtn', 'archiveSliderNextBtn');

            let pool = [];
            if (poolEl) {
                try {
                    pool = JSON.parse(poolEl.textContent || '[]');
                } catch (e) {
                    console.error("Failed to parse archive pool data:", e);
                }
            }

            const isLocal = typeof window !== 'undefined' && window.location && (
                window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' || 
                /^\d+\.\d+\.\d+\.\d+$/.test(window.location.hostname)
            );

            function renderCards(posts) {
                if (!Array.isArray(posts) || posts.length === 0) return;
                const existingUrls = Array.from(track.querySelectorAll('.slide-story-card')).map(a => a.getAttribute('href'));
                const newUrls = posts.map(post => (isLocal && post.is_local === false) ? ('https://www.tmpnews.com' + post.url) : post.url);
                const isIdentical = existingUrls.length === newUrls.length && existingUrls.every((u, i) => u === newUrls[i]);
                if (isIdentical) return;

                track.innerHTML = posts.map(post => {
                    let href = post.url;
                    if (isLocal && post.is_local === false) {
                        href = 'https://www.tmpnews.com' + post.url;
                    }
                    return `
                    <a href="${href}" class="slide-story-card" title="${escapeHtml(post.title)}">
                        <div class="slide-card-bg">
                            <img src="${post.image}" alt="${escapeHtml(post.title)}" class="slide-card-img" loading="lazy" decoding="async">
                            <div class="slide-card-overlay"></div>
                            <div class="slide-card-top-tag">
                                <span class="slide-card-badge archive-badge">${escapeHtml(post.category)}</span>
                            </div>
                        </div>
                        <div class="slide-card-content">
                            <h4 class="slide-card-title">${escapeHtml(post.title)}</h4>
                            <div class="slide-card-footer">
                                <span class="slide-card-date"><i class="fas fa-landmark"></i> ${escapeHtml(post.display_date || post.date)}</span>
                                <span class="slide-card-read">${post.read_time || 5} min</span>
                            </div>
                        </div>
                    </a>
                `}).join('');
            }

            // Immediate render: Select 10 random evergreen archive stories from pool (local + D1)
            if (Array.isArray(pool) && pool.length > 0) {
                const selected = shuffleArray(pool).slice(0, 10);
                renderCards(selected);
            }

            // Edge dynamic sync: On live Cloudflare Pages, fetch fresh random picks from D1
            if (!isLocal && typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
                fetch('/api/archive-spotlight')
                    .then(res => res.ok ? res.json() : null)
                    .then(data => {
                        if (data && Array.isArray(data.posts) && data.posts.length > 0) {
                            let finalPosts = data.posts;
                            if (finalPosts.length < 10 && Array.isArray(pool) && pool.length > 0) {
                                const currentUrls = new Set(finalPosts.map(p => p.url));
                                const remaining = shuffleArray(pool.filter(p => !currentUrls.has(p.url)));
                                finalPosts = finalPosts.concat(remaining.slice(0, 10 - finalPosts.length));
                            }
                            renderCards(finalPosts.slice(0, 10));
                        }
                    })
                    .catch(() => {});
            }
        }

        document.addEventListener('turbo:load', initHomePage);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initHomePage);
        } else {
            initHomePage();
        }
    })();
</script>