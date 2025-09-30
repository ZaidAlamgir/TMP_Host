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
    .live-post {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        overflow: hidden;
        padding: 1.5rem;
        border-left: 4px solid #e42626;
    }
    .live-post-headline {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1c1e21;
        margin-bottom: 0.75rem;
    }
    .live-post-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e2e8f0;
    }
    .live-post-author {
        font-size: 0.9rem;
        font-weight: 600;
        color: #606770;
    }
    .live-post-time {
        font-size: 0.9rem;
        font-weight: 600;
        color: #e42626;
    }
    .live-post-content img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .live-post-content p {
        font-size: 1.05rem;
        line-height: 1.7;
        color: #333;
        margin-bottom: 1rem;
    }
</style>

<div id="header-placeholder"></div>

<div class="max-w-3xl mx-auto px-4 pb-8">
    <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-gray-800">Live Coverage</h1>
        <p class="text-lg text-red-600 font-semibold mt-2 flex items-center justify-center">
            <span class="relative flex h-3 w-3 mr-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
            LIVE
        </p>
    </header>

    <div id="live-feed" class="space-y-6">
        {% if site.live_updates and site.live_updates.size > 0 %}
            {% assign updates = site.live_updates | sort: 'date' | reverse %}
        {% else %}
            {% assign updates = "" %}
        {% endif %}
        {% for update in updates %}
            <div class="live-post">
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
                    {{ update.content | markdownify }}
                </div>
            </div>
        {% else %}
            <div class="text-center py-10">
                <p class="text-gray-500">No live updates yet. Check back soon!</p>
            </div>
        {% endfor %}
    </div>
</div>

<div id="bottom-nav-placeholder"></div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="{{ '/assets/header-injector.js' | relative_url }}"></script>
<!-- Note: The <script type="module"> block has been removed as it's no longer needed. -->
