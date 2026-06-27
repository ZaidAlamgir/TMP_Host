// src/pages/search.json.js
import { getCollection } from 'astro:content';

export async function GET() {
  // 1. Fetch all articles from the src/content/news/ folder
  const allNews = await getCollection('news');
  
  // 2. Sort them by newest date first
  const sortedNews = allNews.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  // 3. Loop through them and build the JSON array
  const searchData = sortedNews.map(post => {
    
    // --- FIX 1: Categories & Tags Logic ---
    // Grab tags and categories (if they exist), combine them, and make them lowercase
    const rawTags = post.data.tags || [];
    const rawCategories = post.data.categories || [];
    // Combine and remove duplicates
    const combinedTags = [...new Set([...rawTags, ...rawCategories])].map(t => t.toLowerCase());
    
    // Determine the category folder for the URL link (defaults to 'general')
    const categoryFolder = combinedTags.length > 0 ? combinedTags[0].replace(/\s+/g, '-') : 'general';

    // --- FIX 2: Broken Images Logic ---
    let imageUrl = post.data.image || '';
    // If there is an image, but it doesn't start with http (absolute) or / (relative), add the slash
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
        imageUrl = '/' + imageUrl;
    }

    return {
      title: post.data.title || '',
      url: `/news/${categoryFolder}/${post.id}`,
      // Converts Date object to string (e.g., "Oct 04, 2025")
      date: new Date(post.data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit'}),
      
      // Joins the combined tags with a comma exactly like your Jekyll filter
      tags: combinedTags.join(', '),
      
      subheadline: post.data.subheadline || '',
      image: imageUrl,
      image_description: post.data.image_description || ''
    };
  });

  // 4. Return the data as a proper JSON API response
  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}