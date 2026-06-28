import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Custom plugin to translate Jekyll {% include %} tags into HTML in memory
function jekyllEmbedTranslator() {
  return {
    name: 'jekyll-embed-translator',
    enforce: 'pre', // Runs before Astro parses the markdown
    transform(code, id) {
      if (id.endsWith('.md')) {
        let transformedCode = code;

        // 1. YouTube
        transformedCode = transformedCode.replace(/\{%\s*include\s+youtube-embed\.html\s+id="([^"]+)"(?:\s+caption="([^"]+)")?\s*%\}/g, (match, id, caption) => {
          return `<div class="embed-container">\n<iframe class="embed-responsive" width="100%" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>\n${caption ? `<div class="embed-caption">${caption}</div>` : ''}\n</div>`;
        });

        // 2. Twitter
        transformedCode = transformedCode.replace(/\{%\s*include\s+twitter-embed\.html\s+id="([^"]+)"(?:\s+caption="([^"]+)")?\s*%\}/g, (match, id, caption) => {
          return `<div class="embed-container">\n<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><a href="https://twitter.com/i/status/${id}"></a></blockquote>\n${caption ? `<div class="embed-caption">${caption}</div>` : ''}\n</div>`;
        });

        // 3. TikTok (Handles both 'tiktok' and 'ticktok' spellings)
        transformedCode = transformedCode.replace(/\{%\s*include\s+(?:ticktok|tiktok)-embed\.html\s+username="([^"]+)"\s+id="([^"]+)"(?:\s+caption="([^"]+)")?\s*%\}/g, (match, username, id, caption) => {
          return `<div class="embed-container">\n<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${username}/video/${id}" data-video-id="${id}" style="max-width: 605px; min-width: 325px;"><section><a target="_blank" href="https://www.tiktok.com/@${username}/video/${id}"></a></section></blockquote>\n${caption ? `<div class="embed-caption">${caption}</div>` : ''}\n</div>`;
        });

        // 4. Instagram
        transformedCode = transformedCode.replace(/\{%\s*include\s+instagram-embed\.html\s+id="([^"]+)"(?:\s+caption="([^"]+)")?\s*%\}/g, (match, id, caption) => {
          return `<div class="embed-container">\n<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${id}/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>\n${caption ? `<div class="embed-caption">${caption}</div>` : ''}\n</div>`;
        });

        // 5. Facebook
        transformedCode = transformedCode.replace(/\{%\s*include\s+facebook-embed\.html\s+id="([^"]+)"(?:\s+caption="([^"]+)")?\s*%\}/g, (match, id, caption) => {
          return `<div class="embed-container">\n<div class="fb-post" data-href="https://www.facebook.com/${id}" data-width="500" data-show-text="true"></div>\n${caption ? `<div class="embed-caption">${caption}</div>` : ''}\n</div>`;
        });

        return transformedCode;
      }
    }
  };
}

export default defineConfig({
  site: 'https://www.tmpnews.com',
  integrations: [sitemap()],
  vite: {
    plugins: [jekyllEmbedTranslator()]
  }
});