---
layout: default
title: Live Updates
permalink: /live/
description: "Follow the latest live updates, breaking news, and real-time coverage from TMP News."
image: /assets/images/live/TMPnewsliveBanner.webp
extra_css:
  - /assets/style/live.css
extra_js:
  - /assets/js/live.js
---
<div id="fb-root"></div>
<div class="live-container">
    <header class="live-header">
        <h1><div class="live-indicator"><div class="dot"></div></div> Live Updates</h1>
    </header>
    <div id="live-feed-persistence-wrapper" data-turbo-permanent>
        <div id="pinned-post-container"></div>
        <div id="live-feed">
             <div class="loader"></div>
        </div>
    </div>
    <div id="feed-controls" class="text-center mt-8 px-4">
        <button id="load-more-btn" class="professional-btn" onclick="if(window.triggerLoadMoreLivePosts) window.triggerLoadMoreLivePosts(event)">Load Previous Updates</button>
        <a href="https://archive-live.tmpnews.com" id="archive-btn" class="professional-btn" style="display: none;">Check Archive History</a>
        <p id="no-more-posts-msg" class="text-gray-500 font-bold py-4 uppercase text-sm" style="display: none;">End of live coverage.</p>
    </div>
</div>
<div id="bottom-nav-placeholder"></div>