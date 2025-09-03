// Placeholder for future JavaScript functionality
// Example: Toggle mobile navigation or load related articles dynamically
console.log("Page loaded successfully.");

// structured-data.js

const ldJsonScript = document.createElement('script');
ldJsonScript.setAttribute('type', 'application/ld+json');

ldJsonScript.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "India's Oil Imports from Russia Face New Uncertainty Under Trade Policy Changes",
  "image": ["https://example.com/images/india-oil-imports.jpg"], // Replace with your actual image URL
  "datePublished": "2025-08-02",
  "author": {
    "@type": "Person",
    "name": "Sarah Mitchell"
  },
  "publisher": {
    "@type": "Organization",
    "name": "The Muslim Post"
  }
});

document.head.appendChild(ldJsonScript);